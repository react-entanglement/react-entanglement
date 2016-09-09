# <img src='react-entanglement.png' height='128px' title='React Entanglement' />

[![Build Status](https://travis-ci.org/react-entanglement/react-entanglement.svg)](https://travis-ci.org/react-entanglement/react-entanglement)
[![npm version](https://badge.fury.io/js/react-entanglement.svg)](https://badge.fury.io/js/react-entanglement)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

**Scatter** a component from your main React rendering tree and render it as an **entangled** component somewhere else.

Its main goal it to allow the application state to live in a centralized location while components can be rendered somewhere else (iframes, separate tabs).

## Installation

Install the [npm package](https://www.npmjs.com/package/react-entanglement):

```bash
npm install react-entanglement
```

## API

### `Entanglement`

This components setup the infrastructure that allows a component in its children tree to be **scattered** to a separated **entangled** tree.

Entanglement between the two rendering trees is achieved by using a proper `adapter`. A default `Entanglement.passthroughAdapter` implementation is provided; it can be used if *entanglement* is to be achieved in the same `window`.

Using that adapter a simple implementation would be:

```jsx
import React from 'react'
import { render } from 'react-dom'

import Entanglement from 'react-entanglement'

render((
  <Entanglement adapter={Entanglement.passthroughAdapter()}>
    { /* any children component here can be scattered */ }
  </Entanglement>
), document.getElementById('app'))
```

### `Entanglement.scatter`

Once the basic communication and entanglement is setup, we can start **scattering** components. So imagine you have an application with a dialog that is normaly render as:

```jsx
import React from 'react'
import { render } from 'react-dom'

import Entanglement from 'react-entanglement'

render((
  <Entanglement adapter={Entanglement.passthroughAdapter()}>
    <Dialog
      onClick={(value, number) => window.alert('clicked' + value + number)}
      items={['one', 'two', 'three']}
    />
  </Entanglement>
), document.getElementById('app'))
```

The only change we need to do to allow this component to be rendered is create a **scattered* version of it:

```jsx
const ScatteredDialog = Entanglement.scatter('Dialog')
```

And render it instead:

```jsx
<Entanglement adapter={Entanglement.passthroughAdapter()}>
  <ScatteredDialog
    onClick={(value, number) => window.alert('clicked' + value + number)}
    items={['one', 'two', 'three']}
  />
</Entanglement>
```

### `Entanglement.materialize`

Given there is a **scattered** component, we can create an **entanglement** in a separated rendered tree and **materialize** the component:

```jsx
import React from 'react'
import { render } from 'react-dom'
import Entanglement from 'react-entanglement'
import Dialog from './dialog'

const MaterializedDialog = Entanglement.materialize('Dialog', Dialog)

render((
  <Entanglement adapter={Entanglement.passthroughAdapter()}>
    <MaterializedDialog />
  </Entanglement>
), document.getElementById('remote-app'))
```

## Adapters

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
