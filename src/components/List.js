import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames  from 'classnames';
import queryString from 'query-string';

import ProductActions from './../actions';

class List extends Component {

  componentWillMount() {
    this.props.actions.fetchList();
  }

  clearFilter = () => {
    this.props.actions.updateList();
  };

  render() {
    const listData = this.props.List.get('data');
    const listFetching = this.props.List.get('isFetching');
    const searchedFor = this.props.List.getIn(['data', 'searchedFor']);
    const filterApplied = this.props.List.getIn(['data', 'filterApplied']);
    return (
      [
        <div className="list-header">
          <div className="title">Laceline Shirts</div>
          <div className="filter">
            {(() => {
              if (searchedFor) {
                return (
                  <div className="each">
                    <span className="label">Searched for </span>
                    <span className="text-underline">{this.props.List.getIn(['data', 'searchedFor'])}</span>
                  </div>
                );
              }
            })()}
            {(() => {
              if (filterApplied) {
                return (
                  <div className="each">
                    <span className="label">Category </span>
                    <span className="text-underline">{this.props.List.getIn(['data', 'filterApplied'])}</span>
                  </div>
                );
              }
            })()}
            {(() => {
              if (searchedFor || filterApplied) {
                return (
                  <i className="filter-clear mdi mdi-close-circle" onClick={this.clearFilter} />
                );
              }
            })()}
          </div>
        </div>,
        <div className="items-wrapper">
          {(() => {
            return listData.get('items') && listData.get('items').map((item) => {
                return (
                  <div className="item">
                    <div className="item-wrapper">
                      <span className="heart" />
                      <div className="content">
                        <div className="product-image">
                          <img
                            className="img-responsive"
                            src={item.get('poster')}
                            alt=""/>
                        </div>
                        <div className="details">
                          <div className="name">{item.get('name')}</div>
                          <div className="price">{item.get('price')}</div>
                          <div className="ratings">{item.get('ratings')} star</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          })()}
        </div>
      ]
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
