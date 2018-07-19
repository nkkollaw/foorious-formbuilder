import React, { Component, PropTypes } from "react";

import {
  getDefaultFormState,
  isMultiSelect,
  isFilesArray,
  isFixedItems,
  allowAdditionalItems,
  optionsList,
  retrieveSchema,
  toIdSchema,
  shouldRender,
  getDefaultRegistry,
  setState
} from "../../utils";
import SelectWidget from "./../widgets/SelectWidget";
import FileWidget from "./../widgets/FileWidget";
import CheckboxesWidget from "./../widgets/CheckboxesWidget";


function ArrayFieldTitle({TitleField, idSchema, title, required}) {
  if (!title) {
    return null;
  }
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
}

function ArrayFieldDescription({DescriptionField, idSchema, description}) {
  if (!description) {
    return null;
  }
  const id = `${idSchema.$id}__description`;
  return <DescriptionField id={id} description={description} />;
}

class ArrayField extends Component {
  static defaultProps = {
    uiSchema: {},
    idSchema: {},
    registry: getDefaultRegistry(),
    required: false,
    disabled: false,
    readonly: false,
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  getStateFromProps(props) {
    const formData = Array.isArray(props.formData) ? props.formData : null;
    const {definitions} = this.props.registry;
    return {
      items: getDefaultFormState(props.schema, formData, definitions) || []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  get itemTitle() {
    const {schema} = this.props;
    return schema.items.title || schema.items.description || "Item";
  }

  isItemRequired(itemsSchema) {
    return itemsSchema.type === "string" && itemsSchema.minLength > 0;
  }

  asyncSetState(state, options={validate: false}) {
    setState(this, state, () => {
      this.props.onChange(this.state.items, options);
    });
  }

  onAddClick = (event) => {
    event.preventDefault();
    const {items} = this.state;
    const {schema, registry} = this.props;
    const {definitions} = registry;
    let itemSchema = schema.items;
    if (isFixedItems(schema) && allowAdditionalItems(schema)) {
      itemSchema = schema.additionalItems;
    }
    this.asyncSetState({
      items: items.concat([
        getDefaultFormState(itemSchema, undefined, definitions)
      ])
    });
  };

  onDropIndexClick = (index) => {
    return (event) => {
      event.preventDefault();
      this.asyncSetState({
        items: this.state.items.filter((_, i) => i !== index)
      }, {validate: true}); // refs #195
    };
  };

  onReorderClick = (index, newIndex) => {
    return (event) => {
      event.preventDefault();
      event.target.blur();
      const {items} = this.state;
      this.asyncSetState({
        items: items.map((item, i) => {
          if (i === newIndex) {
            return items[index];
          } else if (i === index) {
            return items[newIndex];
          } else {
            return item;
          }
        })
      }, {validate: true});
    };
  };

  onChangeForIndex = (index) => {
    return (value) => {
      this.asyncSetState({
        items: this.state.items.map((item, i) => {
          return index === i ? value : item;
        })
      });
    };
  };

  onSelectChange = (value) => {
    this.asyncSetState({items: value});
  };

  render() {
    const {schema, uiSchema} = this.props;
    if (isFilesArray(schema, uiSchema)) {
      return this.renderFiles();
    }
    if (isFixedItems(schema)) {
      return this.renderFixedArray();
    }
    if (isMultiSelect(schema)) {
      return this.renderMultiSelect();
    }
    return this.renderNormalArray();
  }

  renderNormalArray() {
    const {
      schema,
      uiSchema,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly
    } = this.props;
    const title = schema.title || name;
    const {items} = this.state;
    const {definitions, fields} = this.props.registry;
    const {TitleField, DescriptionField} = fields;
    const itemsSchema = retrieveSchema(schema.items, definitions);

    return (
      <fieldset
        className={`field field-array field-array-of-${itemsSchema.type}`}>
        <ArrayFieldTitle
          TitleField={TitleField}
          idSchema={idSchema}
          title={title}
          required={required} />
        {schema.description ?
          <ArrayFieldDescription
            DescriptionField={DescriptionField}
            idSchema={idSchema}
            description={schema.description} /> : null}
        <div className="row array-item-list">{
          items.map((item, index) => {
            const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
            const itemIdPrefix = idSchema.$id + "_" + index;
            const itemIdSchema = toIdSchema(itemsSchema, itemIdPrefix, definitions);
            return this.renderArrayFieldItem({
              index,
              canMoveUp: index > 0,
              canMoveDown: index < items.length - 1,
              itemSchema: itemsSchema,
              itemIdSchema,
              itemErrorSchema,
              itemData: items[index],
              itemUiSchema: uiSchema.items
            });
          })
        }</div>
        <AddButton
          onClick={this.onAddClick} disabled={disabled || readonly} />
      </fieldset>
    );
  }

  renderMultiSelect() {
    const {schema, idSchema, uiSchema, disabled, readonly} = this.props;
    const {items} = this.state;
    const {definitions} = this.props.registry;
    const itemsSchema = retrieveSchema(schema.items, definitions);

    const multipleCheckboxes = uiSchema["ui:widget"] === "checkboxes";
    const Widget = (multipleCheckboxes) ? CheckboxesWidget : SelectWidget;
    return (
      <Widget
        id={idSchema && idSchema.$id}
        multiple
        onChange={this.onSelectChange}
        options={{enumOptions: optionsList(itemsSchema)}}
        schema={schema}
        value={items}
        disabled={disabled}
        readonly={readonly}
      />
    );
  }

  renderFiles() {
    const {schema, idSchema, name, disabled, readonly} = this.props;
    const title = schema.title || name;
    const {items} = this.state;
    return (
      <FileWidget
        id={idSchema && idSchema.$id}
        multiple
        onChange={this.onSelectChange}
        schema={schema}
        title={title}
        value={items}
        disabled={disabled}
        readonly={readonly}
      />
    );
  }

  renderFixedArray() {
    const {
      schema,
      uiSchema,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly
    } = this.props;
    const title = schema.title || name;
    let {items} = this.state;
    const {definitions, fields} = this.props.registry;
    const {TitleField} = fields;
    const itemSchemas = schema.items.map(item =>
      retrieveSchema(item, definitions));
    const additionalSchema = allowAdditionalItems(schema) ?
      retrieveSchema(schema.additionalItems, definitions) : null;

    if (!items || items.length < itemSchemas.length) {
      // to make sure at least all fixed items are generated
      items = items || [];
      items = items.concat(new Array(itemSchemas.length - items.length));
    }

    return (
      <fieldset className="field field-array field-array-fixed-items">
        <ArrayFieldTitle
          TitleField={TitleField}
          idSchema={idSchema}
          title={title}
          required={required} />
        {schema.description ?
          <div className="field-description">{schema.description}</div> : null}
        <div className="row array-item-list">{
          items.map((item, index) => {
            const additional = index >= itemSchemas.length;
            const itemSchema = additional ?
              additionalSchema : itemSchemas[index];
            const itemIdPrefix = idSchema.$id + "_" + index;
            const itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, definitions);
            const itemUiSchema = additional ?
              uiSchema.additionalItems || {} :
              Array.isArray(uiSchema.items) ?
                uiSchema.items[index] : uiSchema.items || {};
            const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;

            return this.renderArrayFieldItem({
              index,
              removable: additional,
              canMoveUp: index >= itemSchemas.length + 1,
              canMoveDown: additional && index < items.length - 1,
              itemSchema,
              itemData: item,
              itemUiSchema,
              itemIdSchema,
              itemErrorSchema
            });
          })
        }</div>
        {
          additionalSchema ? <AddButton
                               onClick={this.onAddClick}
                               disabled={disabled || readonly} /> : null
        }
      </fieldset>
    );
  }

  renderArrayFieldItem({
    index,
    removable=true,
    canMoveUp=true,
    canMoveDown=true,
    itemSchema,
    itemData,
    itemUiSchema,
    itemIdSchema,
    itemErrorSchema
  }) {
    const {SchemaField} = this.props.registry.fields;
    const {disabled, readonly} = this.props;
    const hasToolbar = removable || canMoveUp || canMoveDown;
    const btnStyle = {}; //{flex: 1, paddingLeft: 6, paddingRight: 6, fontWeight: "bold"};

    return (
      <div key={index} className="row array-item pl-3 pr-0" style={{width: '100%'}}>
        <div className={hasToolbar ? "col-10" : "col-12"}>
          <SchemaField
            schema={itemSchema}
            uiSchema={itemUiSchema}
            formData={itemData}
            errorSchema={itemErrorSchema}
            idSchema={itemIdSchema}
            required={this.isItemRequired(itemSchema)}
            onChange={this.onChangeForIndex(index)}
            registry={this.props.registry}
            disabled={this.props.disabled}
            readonly={this.props.readonly} />
        </div>
        {
          hasToolbar ? (
            <div className="col-2 array-item-toolbox text-right pr-0">
              {
                canMoveUp || canMoveDown ? (
                  <div className="btn-group mr-2">
                    <button type="button" className="btn btn-default array-item-move-up"
                      style={btnStyle}
                      tabIndex="-1"
                      disabled={disabled || readonly || !canMoveUp}
                      onClick={this.onReorderClick(index, index - 1)}
                    >⬆</button>
                    <button type="button" className="btn btn-default array-item-move-down"
                      style={btnStyle}
                      tabIndex="-1"
                      disabled={disabled || readonly || !canMoveDown}
                      onClick={this.onReorderClick(index, index + 1)}
                    >⬇</button>
                  </div>
                ): null
              }
              {
                removable ? (
                  <button type="button" className="btn btn-danger array-item-remove"
                    style={btnStyle}
                    tabIndex="-1"
                    disabled={disabled || readonly}
                    onClick={this.onDropIndexClick(index)}
                  >✖</button>
                ) : null
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

function AddButton({onClick, disabled}) {
  return (
    <div className="row">
      <p className="col-2 col-offset-10 array-item-add text-right">
        <button type="button" className="btn btn-info col-12"
                tabIndex="-1" onClick={onClick}
                disabled={disabled} style={{fontWeight: "bold"}}>➕</button>
      </p>
    </div>
  );
}

if (process.env.NODE_ENV !== "production") {
  ArrayField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.array,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ])).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired
    }),
  };
}

export default ArrayField;
