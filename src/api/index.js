export const fetchList = () =>
  fetch(`http://www.mocky.io/v2/5a24130e2e00001b0a83bf4d`)
    .then(response => {
      return response.json();
});