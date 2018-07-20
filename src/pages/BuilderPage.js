import React from 'react';
import { Provider } from "react-redux"

import Spinner from '../components/Spinner';

import configureStore from "../components/FormBuilder/store/configureStore";
import FormBuilder_Editor from '../components/FormBuilder/containers/builder/FormContainer';
let FormBuilder = {
  Editor: FormBuilder_Editor
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

    // save to localStorage for "viewer" page
    window.localStorage.setItem('foorious:formbuilder:form', JSON.stringify(form));
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
              <FormBuilder.Editor onSubmit={this.handleSubmit} />
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