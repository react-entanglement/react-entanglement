import React from 'react'
import Entanglement from '.'
import { render } from 'react-dom'

const Dialog = React.createClass({
  render () {
    return <div onClick={() => this.props.onClick('batata frita', 123)}>
      <h1>Testing...</h1>
      <div>
        {this.props.children}
      </div>
    </div>
  }
})

const communicationAdapter = Entanglement.passthroughCommunicationAdapter()

// Remote App

const MaterializedDialog = Entanglement.materialize(Dialog, 'Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <MaterializedDialog />
  </Entanglement>
), document.getElementById('remote-app'))

// Local App

const ScatteredDialog = Entanglement.scatter('Dialog')

render((
  <Entanglement communicationAdapter={communicationAdapter}>
    <div>
      <ScatteredDialog onClick={(value, number) => window.alert('clicked' + value + number)}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </ScatteredDialog>
    </div>
  </Entanglement>
), document.getElementById('main-app'))
