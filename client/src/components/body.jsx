/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { fetchPullRequests } from '../actions/prAction';
import '../style/app.css';
import Loader from '../common/loader.jsx';

class Body extends Component {
  constructor(props) {
    const { status, component, team } = props;
    super(props);
    this.state = {
      prLinks: [],
      isChecked: false,
      status,
      component,
      team,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('adsfasdf', nextProps, 'asdfasdf', prevState);
    if (nextProps.status !== prevState.status 
      || nextProps.component !== prevState.component 
      || nextProps.team !== prevState.team
    ) {
      return { isChecked: false, prLinks: [] };
    } return null;
  }

  copyStringToClipboard = (str) => {
    // Create new element
    const el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }

  copyLinksToClipboard = () => {
    const { prLinks } = this.state;
    const prLinksData = [...prLinks];
    this.copyStringToClipboard(prLinksData.join('\n'));
  }

  handleInputChange = (e) => {
    const { prLinks } = this.state;
    let { isChecked } = this.state;
    const { prData } = this.props;
    const prLinksData = [...prLinks];
    prData.forEach((data) => {
      // eslint-disable-next-line no-underscore-dangle
      if (data._id === e.target.value) {
        // eslint-disable-next-line no-param-reassign
        data.isChecked = !data.isChecked;
        const indexOfPrLink = prLinksData.indexOf(data.prLink);
        // eslint-disable-next-line no-unused-expressions
        data.isChecked ? prLinksData.push(data.prLink) : prLinksData.splice(indexOfPrLink, 1);
      }
    });
    if (prLinksData.length === 0) {
      isChecked = false;
    } else if (prLinksData.length === prData.length) {
      isChecked = true;
    }
    this.setState({
      prLinks: prLinksData,
      isChecked,
    }, () => { this.copyLinksToClipboard(); });
  }

  handleInputChangeAll = (e) => {
    const { prLinks, isChecked } = this.state;
    const { prData } = this.props;
    let prLinksData = [...prLinks];
    if (!e.target.checked) {
      prLinksData = [];
    }
    prData.forEach((data) => {
      // eslint-disable-next-line no-param-reassign
      data.isChecked = e.target.checked;
      // eslint-disable-next-line no-unused-expressions
      if (e.target.checked) {
        prLinksData.push(data.prLink);
      }
    });
    this.setState({
      prLinks: prLinksData,
      isChecked: !isChecked,
    }, () => { this.copyLinksToClipboard(); });
  }

  render() {
    const filterReview = (reviewersData) => {
      const usernames = [];
      const reviewers = [];
      // eslint-disable-next-line no-plusplus
      for (let i = (reviewersData.length - 1); i >= 0; i--) {
        if (!usernames.includes(reviewersData[i].username) && !(reviewersData[i].state === 'COMMENTED')) {
          usernames.push(reviewersData[i].username);
          reviewers.push(reviewersData[i]);
        }
      }
      return reviewers;
    };
    const { prData, loadPrResponce } = this.props;
    const { prLinks, isChecked } = this.state;
    return (
      <div>
        {
          (prLinks.length > 0)
            ? (
              <button
                type="button"
                onClick={this.copyLinksToClipboard}
                className="btn btn-outline-primary mb-2"
              >
                Copy links to clipboard
              </button>
            ) : null
        }
        {loadPrResponce
          ? <Loader />
          : (
            <div className="table-responsive-xl tableFixHead">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr className="text-center">
                    <th>
                      <input
                        className="checkbox-input-design mt-2"
                        name="prLinks"
                        type="checkbox"
                        onChange={this.handleInputChangeAll}
                        checked={isChecked}
                      />
                    </th>
                    <th scope="col">PR</th>
                    <th scope="col">Raised By</th>
                    <th scope="col">Jira ID</th>
                    <th scope="col">Repository</th>
                    <th scope="col">Open Date</th>
                    <th scope="col">Close Date</th>
                    <th scope="col">TRT</th>
                    <th scope="col">Reviews</th>
                    <th scope="col">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {prData.map((data) => (
                    data.raisedBy !== 'rhinogram-circleci'
                    && (
                    // eslint-disable-next-line no-underscore-dangle
                      <tr key={data._id}>
                        <td className="text-center">
                          <input
                            className="checkbox-input-design mt-2"
                            name="prLinks"
                            type="checkbox"
                            value={data._id}
                            onChange={this.handleInputChange}
                            checked={data.isChecked}
                          />
                        </td>
                        <td><a target="_blank" href={data.prLink}>{data.prId}</a></td>
                        <td>{data.raisedBy}</td>
                        <td><a target="_blank" href={data.jiraLink}>{data.jiraId}</a></td>
                        <td>{data.component}</td>
                        <td>{moment(data.openDate).format('MM/D/YY h:mm a')}</td>
                        <td className="text-center">{data.closeDate !== null ? moment(data.closeDate).format('MM/D/YY h:mm a') : '--'}</td>
                        <td className="text-center">{data.trt === 'N/A' ? '--' : data.trt}</td>
                        <td>
                          {filterReview(data.reviewers).map((reviewer) => {
                            if (reviewer.state === 'APPROVED') {
                              return (
                                <div>
                                  <span className="text-success mr-2">&#10003;</span>
                                  {reviewer.username}
                                </div>
                              );
                            }
                            if (reviewer.state === 'CHANGES_REQUESTED') {
                              return (
                                <div>
                                  <span className="text-danger mr-2">&#10005;</span>
                                  {reviewer.username}
                                </div>
                              );
                            }
                          })}
                        </td>
                        <td>{data.comments.length}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    );
  }
}

Body.propTypes = {
  fetchPullRequests: PropTypes.func.isRequired,
  prData: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  prData: state.pr.prData,
  loadPrResponce: state.pr.loadPrResponce,
  status: state.pr.status,
  component: state.pr.component,
  team: state.pr.team,
});

const mapDispatchToProps = {
  fetchPullRequests,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
