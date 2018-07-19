import React from 'react';
import { Provider } from "react-redux"

import { Link } from 'react-router-dom'

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
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Hello!</h1>

            <p><Link to="/builder/"><i className="fa fa-plus-square" /> new form</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default BuilderPage;