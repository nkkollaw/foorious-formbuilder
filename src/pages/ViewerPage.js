import React from 'react';
import { Provider } from "react-redux"

import Spinner from '../components/Spinner';

import configureStore from "../components/FormBuilder/store/configureStore";
import FormBuilder_UserForm from '../components/FormBuilder/components/UserForm';
let FormBuilder = {
  Form: FormBuilder_UserForm
};

class ViewerPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: {
        "form":{
          "error":null,
          "schema":{
            "type":"object",
            "title":"Form label (click to edit)",
            "description":"Form description (click to edit)",
            "properties":{
              "domanda_2-multiline":{
                "type":"string",
                "title":"Domanda #2 (multiline)?",
                "description":"",
                "default":""
              },
              "domanda_1-text":{
                "type":"string",
                "title":"Domanda #1 (text)?",
                "description":"",
                "default":""
              },
              "domanda_3-checkbox":{
                "type":"boolean",
                "title":"Domanda 3 (checkbox)?",
                "default":false
              },
              "domanda_4-scelte":{
                "type":"string",
                "format":"string",
                "title":"Domanda 4 (scelte)?",
                "enum":[
                  "option 1",
                  "option 2",
                  "option 3",
                  "option 4"
                ]
              },
              "question_5-radio":{
                "type":"string",
                "title":"Question 5 (radio)",
                "enum":[
                  "option 1",
                  "option 2",
                  "option 3"
                ]
              },
              "question_6-checkboxes":{
                "type":"array",
                "title":"Question 6 (checkboxes)?",
                "items":{
                  "enum":[
                    "risposta 1",
                    "risposta 2",
                    "risposta 3"
                  ],
                  "type":"string"
                },
                "uniqueItems":true
              },
              "question_7-calendar":{
                "type":"string",
                "format":"date",
                "title":"Question 7 (calendar)?"
              }
            },
            "required":[
              "domanda_1-text"
            ]
          },
          "uiSchema":{
            "ui:order":[
              "domanda_1-text",
              "domanda_2-multiline",
              "domanda_3-checkbox",
              "domanda_4-scelte",
              "question_5-radio",
              "question_6-checkboxes",
              "question_7-calendar"
            ],
            "domanda_2-multiline":{
              "ui:widget":"textarea",
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "description":{
                    "type":"string",
                    "title":"Instructions"
                  },
                  "required":{
                    "type":"boolean"
                  }
                }
              }
            },
            "domanda_1-text":{
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "description":{
                    "type":"string",
                    "title":"Instructions"
                  },
                  "required":{
                    "type":"boolean"
                  }
                }
              }
            },
            "domanda_3-checkbox":{
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "required":{
                    "type":"boolean"
                  }
                }
              }
            },
            "domanda_4-scelte":{
              "ui:widget":"select",
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "required":{
                    "type":"boolean"
                  },
                  "enum":{
                    "type":"array",
                    "title":"Options",
                    "items":{
                      "type":"string"
                    }
                  }
                }
              }
            },
            "question_5-radio":{
              "ui:widget":"radio",
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "required":{
                    "type":"boolean"
                  },
                  "enum":{
                    "type":"array",
                    "title":"Options",
                    "items":{
                      "type":"string"
                    }
                  }
                }
              }
            },
            "question_6-checkboxes":{
              "ui:widget":"checkboxes",
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "required":{
                    "type":"boolean"
                  },
                  "items":{
                    "type":"object",
                    "title":"Choices",
                    "properties":{
                      "enum":{
                        "title":null,
                        "type":"array",
                        "items":{
                          "type":"string"
                        },
                        "default":[
                          "risposta 1",
                          "risposta 2",
                          "risposta 3"
                        ]
                      }
                    }
                  }
                }
              }
            },
            "question_7-calendar":{
              "ui:widget":"alt-date",
              "editSchema":{
                "type":"object",
                "properties":{
                  "title":{
                    "type":"string",
                    "title":"Label"
                  },
                  "required":{
                    "type":"boolean"
                  }
                }
              }
            }
          },
          "formData":{
      
          },
          "currentIndex":7
        }
      }
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

    const schema = this.state.data.form.schema;
    const uiSchema = this.state.data.form.uiSchema;

    console.dir(schema);
    console.dir(uiSchema);

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1><i className="fa fa-plus-square" /> New form</h1>

            <Provider store={store}>
              <FormBuilder.Form schema={schema} uiSchema={uiSchema} onSubmit={this.handleSubmit} />
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

export default ViewerPage;