import React from 'react';
import { Provider } from "react-redux"

import Spinner from '../components/Spinner';

import configureStore from "../components/FormBuilder/store/configureStore";
import FormBuilder_UserForm from '../components/FormBuilder/components/UserForm';
let FormBuilder = {
  Viewer: FormBuilder_UserForm
};

class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    let form = window.localStorage.getItem('foorious:formbuilder:form') ? JSON.parse(window.localStorage.getItem('foorious:formbuilder:form')) : null;
    
    this.state = {
      form: form,
      formData: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.setState({
      formData: data
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
            <h1><i className="fa fa-eye" /> View form</h1>
            {
              this.state.form ? (
                <Provider store={store}>
                  <FormBuilder.Viewer schema={this.state.form.schema} uiSchema={this.state.form.uiSchema} formData={this.state.formData} onSubmit={this.handleSubmit} />
                </Provider>
              ) : (
                <h4 className="text-danger mt-3"><i className="fa fa-exclamation-triangle" /> create form first.</h4>
              )
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <h2>Form JSON</h2>
            <code>{JSON.stringify(this.state.formData)}</code>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewerPage;