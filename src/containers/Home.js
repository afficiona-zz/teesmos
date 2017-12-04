import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './../components/Header';
import Filter from './../components/Filter';
import List from './../components/List';

class Home extends Component {

  render() {
    const filters = this.props.List.getIn(['data', 'filters']);
    return (
      <div className="list-page">
        <Header filters={filters} />
        <div className="list-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-xs-3">
                {(() => {
                  if (filters) {
                    return (
                      <Filter filters={filters} />
                    )
                  }
                })()}
              </div>
              <div className="col-xs-9">
                <List />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ List }) {
  return {
    List
  };
}

export default connect(mapStateToProps)(Home);