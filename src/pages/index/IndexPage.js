import React from 'react';
import { Provider } from "react-redux"

import Settings from '../../config.js';
import Auth from '../../services/Auth.js';
import API from '../../utils/API.js';

import Spinner from '../../components/Spinner';

import configureStore from "../../components/FormBuilder/store/configureStore";
import FormBuilder_FormContainer from '../../components/FormBuilder/containers/builder/FormContainer';
let FormBuilder = {
  FormContainer: FormBuilder_FormContainer
};

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fetching: false,
      timeFetching: 0,
            
      error: ''
    };
  }

  render() {
    const linkStyle = {
      fontSize: '18px'
    };

    const store = configureStore({
      notifications: [],
    });

    if (this.state.error) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger">
                <h2>Oh, mamma!</h2>
                <p>{this.state.error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1><i className="fa fa-graduation-cap" /> Hello!</h1>

              <Provider store={store}>
                <FormBuilder.FormContainer />
              </Provider>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default OverviewPage;