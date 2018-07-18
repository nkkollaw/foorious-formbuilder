import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Layout from './pages/Layout';

import IndexPage from './pages/index/IndexPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={IndexPage} />
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
