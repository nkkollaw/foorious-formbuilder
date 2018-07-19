import React from 'react';

import Settings from '../../config.js';
import Auth from '../../services/Auth.js';
import API from '../../utils/API.js';

import Spinner from '../../components/Spinner';

// import FormBuilder_Header from '../../components/FormBuilder/Header';
// import FormBuilder_NotificationList from '../../components/FormBuilder/NotificationList';
// import FormBuilder_FieldList from '../../components/FormBuilder/FieldList';
// import FormBuilder_EditableField from '../../components/FormBuilder/EditableField';
// import FormBuilder_FieldPropertiesEditor from '../../components/FormBuilder/FieldPropertiesEditor';
// import FormBuilder_SchemaField from '../../components/FormBuilder/SchemaField';

import FormBuilder_FormContainer from '../../components/FormBuilder/containers/builder/FormContainer';

// namespace formbuilder
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
            <div className="col-6">
              <h1><i className="fa fa-graduation-cap" /> Hello!</h1>

              <FormBuilder.FormContainer />
              {/* <NotificationList />
              <FieldList>
                <Draggable />
                <Draggable />
                ...
              </FieldList />
              <Form>
                <EditableField>
                  <FieldPropertiesEditor /> or <SchemaField />
                </EditableField>
                <Droppable />
              <Form />               */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default OverviewPage;