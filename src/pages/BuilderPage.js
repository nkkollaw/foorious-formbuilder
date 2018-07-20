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
      form: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    this.setState({
      form
    });
  }

  render() {
    const store = configureStore({
      notifications: [],
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1><i className="fa fa-plus-square" /> New form</h1>

            <Provider store={store}>
              <FormBuilder.FormContainer onSubmit={this.handleSubmit} />
            </Provider>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <h2>Form JSON</h2>
            <code>{JSON.stringify(this.state.form)}</code>
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderPage;