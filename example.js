// communication adapter

const communicationAdapter = {
  // methods used by the scatter
  unmount: (componentName) => {},
  render: (componentName) => {},
  onHandle: (componentName, handlerName, cb = (args) => {}) => {},

  // methods used by the materializer
  onUnmount: (cb = (componentName) => {}) => {},
  onRender: (cb = (componentName, data, handlerNames) => {}) => {},
  handle: (componentName, handlerName, args) => {}
}

// main application

import { scatter, Entanglement } from 'react-entanglement'
import { render } from 'react-dom'

const ScatteredDialog = scatter('Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <div>
      <PaymentSelector />
      <ScatteredDialog />
    </div>
  </Entanglement>
))

// remote application

import { Entanglement, materialize } from 'react-entanglement'
import { render } from 'react-dom'

import Dialog from './dialog'

const MaterializedDialog = materialize(Dialog, 'Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <MaterializedDialog />
  </Entanglement>
))
