# Foorious Formbuilder--create your own forms and surveys.

Originally Kinto Formbuilder but doesn't use Kinto anymore, so might as well rename it.

The original code was hacked to remove the dependency on Kinto, use Bootstrap 4 instead of 3, Font Awesome instead of Glyphish, and be included as an independent, single component that you can add to any page.

## Usage

## Installation

Might write better instructions later, for now look in package.json, those are the libs you need.

### Requirements

Redux needed:

```js
import React from 'react';
import { Provider } from "react-redux"
```

Import code (in this case I namespaced it this way, might not make sense):

```js
import configureStore from "../components/FormBuilder/store/configureStore";
import FormBuilder_FormContainer from '../components/FormBuilder/containers/builder/FormContainer';
let FormBuilder = {
  FormContainer: FormBuilder_FormContainer
};
```

Add component, `onSubmit` will call your function and pass the form in JSON format (see below):

```js
<Provider store={store}>
  <FormBuilder.FormContainer onSubmit={handleSubmit} />
</Provider>
```

Example of function for `onSubmit`:

```js
function handleSubmit(form) {
   alert(JSON.stringify(form));
}
```

### JSON

JSON returned in based on version 0.40 of `react-jsonschema-form` (see https://mozilla-services.github.io/react-jsonschema-form/, https://github.com/mozilla-services/react-jsonschema-form/). Tried upgrading to a newer version, but nothing works. Might make it work in the future, it's not a bad library for this use.

## Roadmap

I *might* need to maintain a survey/form builder and *might* continue working on this. If I do, the first thing is to simplify the code: remove Redux, possibly all those `react-jsonschema-form` components, try to upgrade libraries and use classes. No idea, though.


