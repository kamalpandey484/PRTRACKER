/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/app.css';
import {
  fetchPullRequests,
  searchPullRequests,
  postPullRequests,
  setFilters,
} from '../actions/prAction';
import RefreshLoader from '../common/refreshLoader.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'open',
      component: '',
      team: '',
    };
  }

  componentDidMount() {
    const { status } = this.state;
    const { fetchPullRequests } = this.props;
    fetchPullRequests(status);
  }

  handleStatusChange= (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      const { status, component, team } = this.state;
      const { fetchPullRequests, setFilters } = this.props;
      fetchPullRequests(status, component, team);
      setFilters({status, component, team});
    });
  };

  handleSearchChange = (e) => {
    const { searchPullRequests } = this.props;
    // eslint-disable-next-line no-unused-expressions
    (e.target.value.length === 0 || e.target.value.length > 2) ? searchPullRequests(e.target.value) : null;
  };

  handleRefreshData = (e) => {
    e.preventDefault();
    const { postPullRequests } = this.props;
    postPullRequests();
  }


  render() {
    const {
      status, component, team, jiraId,
    } = this.state;
    const {
      loadPrRefreshResponce,
      handleToggleMenu
    } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline col-lg-12">
              <div className="col-lg-9">
                <button
                  type="button"
                  onClick={handleToggleMenu}
                  className="btn btn-info mr-3"
                >
                  <div className="hamburgerMenu" />
                  <div className="hamburgerMenu" />
                  <div className="hamburgerMenu" />
                </button>
                <span className="mr-1">Status</span>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={this.handleStatusChange}
                >
                  <option value="">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <span className="ml-3 mr-1">Repository</span>
                <select
                  className="form-control"
                  name="component"
                  value={component}
                  onChange={this.handleStatusChange}
                >
                  <option value="">All</option>
                  <option value="rhinofront">Rhinofront</option>
                  <option value="rhinoapi">RhinoApi</option>
                  <option value="rhinostyle">RhinoStyle</option>
                  <option value="rhinoaudit">RhinoAudit</option>
                  <option value="rhinoaudit-client">RhinoAudit-Client</option>
                  <option value="rhinopay">RhinoPay</option>
                  <option value="rhinomatic">RhinoMatic</option>
                  <option value="rhinotilities">Rhinotilities</option>
                  <option value="rhinocron">Rhinocron</option>
                </select>
                <span className="ml-3 mr-1">Team</span>
                <select
                  className="form-control"
                  name="team"
                  value={team}
                  onChange={this.handleStatusChange}
                >
                  <option value="">All</option>
                  <option value="rhinoIndia">India</option>
                  <option value="rhinoSouth">South</option>
                </select>
              </div>
              <div className="col-lg-2 input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">RHIN - </span>
                </div>
                {/* <form onSubmit={this.handleSearch} className="form-inline"> */}
                <input
                  className="form-control mr-sm-1"
                  name="jiraId"
                  type="text"
                  value={jiraId}
                  placeholder="eg:1234"
                  onChange={this.handleSearchChange}
                />
                {/* <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                    value="submit"
                  > */}
                {/* Search */}
                {/* </button> */}
                {/* </form> */}
              </div>
              <button
                type="button"
                className="btn btn-info"
                onClick={this.handleRefreshData}
              >
                {loadPrRefreshResponce
                  ? <RefreshLoader />
                  : <span className="font-weight-bold">Refresh</span>}
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadPrRefreshResponce: state.pr.loadPrRefreshResponce,
});

const mapDispatchToProps = {
  fetchPullRequests,
  searchPullRequests,
  postPullRequests,
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
