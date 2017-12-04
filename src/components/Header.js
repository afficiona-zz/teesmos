import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import ProductActions from './../actions';

class Header extends Component {

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.actions.updateList({
      'name': this.searchInput.value,
      'category': this.categoryInput.value === '0' ? undefined : this.categoryInput.value
    });
  };

  componentDidMount() {
    this.searchInput.focus();
  };

  render() {
    return (
      <div className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="page-header-wrapper">
                <div className="row">
                  <div className="col-xs-3">
                    <Link to="/" className="brand">
                      Teesmos
                    </Link>
                  </div>
                  <div className="col-xs-6 col-offset-xs-1">
                    <form className="search-box" onSubmit={this.handleSearchSubmit}>
                      <select ref={(input) => {this.categoryInput = input;}} name="" id="" onChange={this.handleSearchSubmit}>
                        <option value="0" selected>All Categories</option>
                        {this.props.filters.map(filter => {
                          return (
                            <option value={filter.get('id')}>{filter.get('label')}</option>
                          );
                        })}
                      </select>
                      <input type="text" placeholder="Enter search term" ref={(input) => {this.searchInput = input;}}/>
                    </form>
                  </div>
                </div>
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

function mapDispatchToProps(dispatch) {
  const actions = {
    ...ProductActions
  };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);