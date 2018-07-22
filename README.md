# Foorious Formbuilder--create your own forms and surveys.

Originally Kinto Formbuilder but doesn't use Kinto anymore, so I renamed it.

The original code was hacked to remove the dependency on Kinto, use Bootstrap 4 instead of 3, Font Awesome instead of Glyphish, and made to be an independent, single component that you can add to any page.

## Installation

Until the code is cleaned up, installing will suck because the old code relies on pretty outdated libraries. For now, include these libs into your `package.json` file (under `dependencies`), the follow the instructions in the "Usage" section:

```json
"prop-types": "^15.6.2",

"redux": "^3.0.5",
"redux-thunk": "^1.0.3",
"react-redux": "^4.0.6",

"string": "^3.3.1",
"urlencode": "^1.1.0",
"uuid": "^2.0.2"
"jsonschema": "^1.2.4",

"riek": "^1.0.2"
"reactstrap": "^6.3.0",
```

## Usage

### Editor

Redux needed:

```js
import React from 'react';
import { Provider } from "react-redux"
```

Import code (in this case I namespaced it this way, might not make sense):

```js
import configureStore from "../components/FormBuilder/store/configureStore";

import FormBuilder_FormContainer from '../components/FormBuilder/containers/builder/FormContainer';
const FormBuilder = {
  Editor: FormBuilder_FormContainer
};
```
Create Redux store (possibly in your render function?):

```js
<Provider store={store}>
  <FormBuilder.Editor onSubmit={handleSubmit} />
</Provider>
```

Add component, `onSubmit` will call your function and pass the form in JSON format (see "JSON" section below):

```js
<Provider store={store}>
  <FormBuilder.Editor onSubmit={handleSubmit} />
</Provider>
```

#### JSON

JSON returned in based on version 0.40 of `react-jsonschema-form` (see https://mozilla-services.github.io/react-jsonschema-form/, https://github.com/mozilla-services/react-jsonschema-form/). Tried upgrading to a newer version, but nothing works. Might make it work in the future, it's not a bad library for this use.

### Viewer

Import:

```js
import React from 'react';
import { Provider } from "react-redux"

import configureStore from "../components/FormBuilder/store/configureStore";

import FormBuilder_UserForm from '../components/FormBuilder/components/UserForm';
const FormBuilder = {
  Viewer: FormBuilder_UserForm
};
```

Pretend data is in `form` (get our JSON from a REST API or whatever):

```js
const schema = form.schema;
const uiSchema = form.uiSchema;
```

Include the component:

```js
<Provider store={store}>
  <FormBuilder.Viewer schema={schema} uiSchema={uiSchema} formData="" onSubmit={this.handleSubmit} />
</Provider>
```

`onSubmit` will call your function and pass the form data in JSON format.

## Roadmap

I *might* need to maintain a survey/form builder and *might* continue working on this. 

If I do, the first thing is to simplify the code: remove Redux, possibly all those `react-jsonschema-form` components, try to upgrade libraries and use classes. 

No idea, though.


