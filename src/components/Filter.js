import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductActions from './../actions';

class List extends Component {

  handleFilter(categoryId) {
    this.props.actions.updateList({
      'category': categoryId
    });
  };

  render() {
    return (
      <div className="filter">
        <div className="category">
          <h2 className="category-header">
            Categories
          </h2>
          <div className="category-content">
            {this.props.filters.map(filter => {
              return (
                <div className="label" onClick={this.handleFilter.bind(this, filter.get('id'))}>{filter.get('label')}</div>
              );
            })}
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

function mapDispatchToProps(dispatch) {
  const actions = {
    ...ProductActions
  };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);