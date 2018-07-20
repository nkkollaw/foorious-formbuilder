import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import BuilderPage from './pages/BuilderPage';
import ViewerPage from './pages/ViewerPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={IndexPage} />
          <Route path="/new" component={BuilderPage} />
          <Route path="/view" component={ViewerPage} />
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
