import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Home from './containers/Home';

class App extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps({ List }) {
  return {
    List
  };
}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps)(App);
