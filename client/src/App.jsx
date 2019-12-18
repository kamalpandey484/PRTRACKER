import React, { Component } from 'react';
import './style/app.css';
import Header from './components/header';
import Body from './components/body';
import Sidebar from './components/sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  handleToggleMenu = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  }

  render() {
    const { toggle } = this.state;
    console.log(toggle);
    return (
      <div className="container-fluid">
        <div className="row">
          {toggle
            ? (
              <div className="col-md-2 bg-info fill-col">
                <Sidebar />
              </div>
            )
            : null}
          <div className={toggle ? 'col-md-10 fill-col' : 'col-md-12 fill-col'}>
            <header>
              <Header handleToggleMenu={this.handleToggleMenu} />
            </header>
            <div className="body-container">
              <Body />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
