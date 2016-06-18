# <img src='react-entanglement.png' height='128px' title='React Entanglement' />

[![Build Status](https://travis-ci.org/react-entanglement/react-entanglement.svg)](https://travis-ci.org/react-entanglement/react-entanglement)
[![npm version](https://badge.fury.io/js/react-entanglement.svg)](https://badge.fury.io/js/react-entanglement)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A library to take a React component and render it in another location.

## Usage

Install it with:

```bash
npm install react-entanglement
```

### Key concepts

React Entanglement works by taking a component's name and props and **scattering** them over an **adapter** into a target where the **materialization** is done.

### Example with simple API

In some part of the application we prepare the props and select what element to render. Note that in this snippet–where the `Scatter` is used–we don't need a reference to the component that we intend to render, since it's sent via the adapter by name.

```javascript
// scatter.js
import { Scatter } from 'react-entanglement'
import { render } from 'react-dom'

export default (adapter) => {
  render(
    <Scatter
      name='Button'
      props={{
        label: 'Click me',
        onClick: () => alert('remote button was clicked')
      }}
      adapter={adapter}
    />
    , document.createElement('div'))
}
```

> The target needs not to be in the document since in this
> example no rendering will be done.
>
> If you're wondering why using a React component at all then,
> it will be more apparent in the syntax sugar example

Let's place the materialization:

```javascript
// materialize.js
import { Materialize } from 'react-entanglement'
import { render } from 'react-dom'
import Button from './components/Button'

export default (adapter) => {
  render(
    <div>
      <p>You can do what the button suggests:</p>
      <Materialize
        name='Button'
        component={Button}
        adapter={adapter}
      />
    </div>
  , document.getElementById('main-app'))
}
```

### Example with Entanglement sugar

Using a real React component allows you to place the scattering anywhere in the rendering tree. An example use case would be having a component that can either be rendered in place or in an iframe, while the props for it remain the same.

Since the component can be placed anywhere in the rendering tree, the adapter would be required to be passed down as a prop everywhere. Using the `Entanglement` component you can just set the `adapter` once at the root of the tree.

Let's see how the previous example would look like, adding some extra markup so that the point is more obvious:

```javascript
// scatter.js
import Entanglement, { Scatter } from 'react-entanglement'
import { render } from 'react-dom'

export default (adapter, showLocally) => {
  const buttonProps = {
    label: 'Click me',
    onClick: () => alert('button was clicked')
  }

  render(
    <Entanglement adapter={adapter}>
      <p>The following button might appear here or somewhere else.</p>
      <p>Very spooky 👻</p>
      {
        showLocally ?
          : <Button {...buttonProps} />
          ? <Scatter name='Button' props={buttonProps} />
      }
    </Entanglement>
  , document.getElementById('main-app'))
}
```

Something similar can be done in the remote:

```javascript
// materialize.js
import Entanglement, { Materialize } from 'react-entanglement'
import { render } from 'react-dom'
import Button from './components/Button'

export default (adapter) => {
  render(
    <Entanglement adapter={adapter}>
      <div>
        <p>You can do what the button suggests:</p>
        <Materialize
          name='Button'
          component={Button}
        />
      </div>
    </Entanglement>
  , document.getElementById('remote-app'))
}
```

Note how this allows the remote target UI to be controlled and kept in sync with the main application without the need to synchronizing data, instead passing in just the rendering information.

### Entanglement and adapter

Entanglement between the two locations is achieved by using a proper `adapter`. A default `Entanglement.passthroughAdapter` implementation is provided; it can be used if *entanglement* is to be achieved in the same `window`.

But it should be possible to create other *adapters* to do *entanglement* using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) or even [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

The `adapter` signature should be:

```js
const adapter = {
  // methods used by the scatter
  unmount: (componentName) => {},
  render: (componentName, data, handlerNames) => {},
  onHandle: (componentName, handlerName, cb) => {},

  // methods used by the materializer

  onUnmount: (componentName, cb) => {},
  onRender: (componentName, cb) => {},
  handle: (componentName, handlerName, args) => {}
}
```

The methods `onHandle`, `onUnmount` and `onRender` must return a function that can be used to dismiss the listener that was configured using the passed `cb`.

## Development

To try it out locally and help development, start the local server:

```bash
npm start
```

And open:

- [http://localhost:3000/demo.html](http://localhost:3000/demo.html)
- [http://localhost:3000/demo-plain.html](http://localhost:3000/demo-plain.html)

Or run the unit tests:

```bash
npm test
```

## Kudos

* [Ryan Florence](ryanflorence) for his talk [Hype!](https://youtu.be/z5e7kWSHWTg), where he presented the concept of **portals**;
* [Xavier Via](https://github.com/xaviervia/) for helping finding a name to this project.

## Acknowledgements

* The react-entanglement logo is a derivative from the [React logo](https://github.com/facebook/react/blob/master/docs/img/logo.svg).
