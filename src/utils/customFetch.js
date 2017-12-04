/* eslint promise/catch-or-return: 0, prefer-promise-reject-errors: 0, no-plusplus: 0 */

import _partial from 'lodash/partial';

// Ref: https://github.com/jonbern/fetch-retry/blob/master/index.js
const customFetch = (url, options) => {
  const { retries = 0, ...restOptions } = options;
  return new Promise((resolve, reject) => {
    // Helper method which will reject if retries complete or
    // recursively call fetch
    const handleError = (n, response) => {
      if (n > 0) {
        wrappedFetch(--n); // eslint-disable-line no-use-before-define
      } else if (response instanceof Error) {
        reject({});
      } else {
        reject(response);
      }
    };
    const wrappedFetch = n => {
      fetch(url, restOptions).then(response => {
        // Handle api success/error
        if (response.ok) {
          // Parse the success response and then resolve the response
          response.json().then(resolve);
        } else {
          // Handle actual api errors, server unavailable, non-json errors
          response.json().then(
            _partial(handleError, n), // Handle all api errors with valid json response
            _partial(handleError, n) // Handle json parsing errors if page is not JSON.parse'able
          );
        }
      }, _partial(handleError, n)); // Handle thrown api errors (cors/internet unavailable)
    };
    wrappedFetch(retries);
  });
};

export default customFetch;
