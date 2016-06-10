# React Entanglement

[![Build Status](https://travis-ci.org/pirelenito/react-entanglement.svg)](https://travis-ci.org/pirelenito/react-entanglement)
[![npm version](https://badge.fury.io/js/react-entanglement.svg)](https://badge.fury.io/js/react-entanglement)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A proof-of-concept library to take a React component and render it in another location.

**Warning:** Documentation, API and tests are still in infancy state, so use with care.

## Usage

Install it with:

```bash
npm install react-entanglement
```

### Materialized component

First you need to setup `Entanglement` in the location the component is supposed to be rendered, and configure a `Entanglement.materialize` version of a component (`Dialog` in the example bellow) in the location it is supposed to render:

```js
const MaterializedDialog = Entanglement.materialize(Dialog, 'Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <MaterializedDialog />
  </Entanglement>
), document.getElementById('remote-app'))

```

### Scatered component

Then from any other localion, assuming the `Entanglement` is properly configured, it should be possible to `Entanglement.scatter` a component, making it render in its materialized location.

```js
const ScatteredDialog = Entanglement.scatter('Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <div>
      <ScatteredDialog onClick={(value, number) => window.alert('clicked' + value + number)} />
    </div>
  </Entanglement>
), document.getElementById('main-app'))
```

### Entanglement and communication adapter

Entanglement between the two locations is achieved by using a propper `communicationAdapter`. A default `Entanglement.passthroughCommunicationAdapter` implementation is provided; it can be used if *entanglement* is to be achieved in the same `window`.

But it should be possible to create other *communication adapters* to do *entanglement* using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) or even [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

The `communicationAdapter` signature should be as bellow:

```js
const communicationAdapter = {
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

And open: [http://localhost:3000/demo.html](http://localhost:3000/demo.html)

Or run the unit tests:

```bash
npm test
```

## Kudos

* [Ryan Florence](ryanflorence) for his talk [Hype!](https://youtu.be/z5e7kWSHWTg), where he presented the concept of **portals**;
* [Xavier Via](https://github.com/xaviervia/) for helping finding a name to this project.
