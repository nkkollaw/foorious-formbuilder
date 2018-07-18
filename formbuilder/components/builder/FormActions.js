import React from "react";
import FieldListDropdown from "./FieldListDropdown";
import {Button, ButtonToolbar, ButtonGroup}  from "reactstrap";

export default function FormActions(props) {
  const onClick = (event) => {
    props.publishForm(({collection, adminToken}) => {
      props.history.pushState(null, `/builder/published/${adminToken}`);
    });
  };

  let saveIconClass;
  if (props.status == "pending") {
    saveIconClass = "fa fa-circle-notch fa-spin";
  } else {
    saveIconClass = "fa fa-save";
  }

  return (
    <div>
      <ButtonToolbar className="builder-inner-actions">
        <FieldListDropdown className="pull-right" {...props}>
          <i className="fa fa-plus" />
          Add a field
        </FieldListDropdown>
      </ButtonToolbar>
      <ButtonGroup className="pull-right">
        <Button onClick={() => confirm("This action will reset all unsaved changes, Are you sure?") && props.resetForm()}>
          <i className="fa fa-times" />
          Reset <span className="hidden-xs">form</span>
        </Button>
        <Button bsStyle="success" onClick={onClick}>
          <i className={`${saveIconClass}`} />
          Save your form
        </Button>
      </ButtonGroup>
    </div>
  );
}
