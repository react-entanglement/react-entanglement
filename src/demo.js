import React from 'react'
import { scatter, materialize, Entanglement, passthroughCommunicationAdapter } from '.'
import { render } from 'react-dom'

const Dialog = React.createClass({
  render () {
    return <h1 onClick={() => this.props.onClick('batata frita', 123)}>Hello World</h1>
  }
})

const communicationAdapter = passthroughCommunicationAdapter()

// Remote App

const MaterializedDialog = materialize(Dialog, 'Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <MaterializedDialog />
  </Entanglement>
), document.getElementById('remote-app'))

// Local App

const ScatteredDialog = scatter('Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <div>
      <ScatteredDialog onClick={(value, number) => window.alert('clicked' + value + number)} />
    </div>
  </Entanglement>
), document.getElementById('main-app'))
