import React from 'react';

import { Link } from 'react-router-dom'

class Layout extends React.Component {
  render() {
    var buttonStyle = {
      padding: '0 1rem',
      fontSize: '1rem',
      lineHeight: '3.5rem',
      verticalAlign: 'middle !important',
      outline: 'none !important'
    };

    const indexButtonClass = 'btn ' + (window.location.pathname == '/' ? 'btn-primary' : 'btn-secondary') + ' align-middle'
    const page1ButtonClass = 'btn ' + (window.location.pathname.indexOf('/edu') === 0 ? 'btn-primary' : 'btn-secondary') + ' align-middle';
    const page2ButtonClass = 'btn ' + (window.location.pathname.indexOf('/users') === 0 ? 'btn-primary' : 'btn-secondary') + ' align-middle';

    return (
      <div>
        <header className="mb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group my-2">
                  <Link to="/" className={indexButtonClass} style={buttonStyle}>
                    HOME
                  </Link>
                  <Link to="/builder/" className={page1ButtonClass} style={buttonStyle}>builder</Link>
                  <Link to="/etc/" className={page2ButtonClass} style={buttonStyle}>etc.</Link>
                </div>                
              </div>
            </div>
          </div>
        </header>

        {this.props.children}

        <footer className="mt-4 mb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">

                <p><small>FOOTER GOES HERE</small></p>

              </div>                
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Layout;