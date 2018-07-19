import React from 'react';
import { Provider } from "react-redux"

import Spinner from '../components/Spinner';

import configureStore from "../components/FormBuilder/store/configureStore";
import FormBuilder_FormContainer from '../components/FormBuilder/containers/builder/FormContainer';
let FormBuilder = {
  FormContainer: FormBuilder_FormContainer
};

class BuilderPage extends React.Component {
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

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1><i className="fa fa-plus-square" />New form</h1>

            <Provider store={store}>
              <FormBuilder.FormContainer />
            </Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderPage;