import React from 'react'
import Entanglement from '.'
import { render } from 'react-dom'

function Dialog ({ items, onClick }) {
  return (
    <div onClick={() => onClick('batata frita', 123)}>
      <h1>Testing...</h1>
      <div>
        <ul>
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

const adapter = Entanglement.passthroughAdapter()

// Remote App

const MaterializedDialog = Entanglement.materialize('Dialog', Dialog)

render((
  <Entanglement adapter={adapter}>
    <MaterializedDialog />
  </Entanglement>
), document.getElementById('remote-app'))

// Local App

const ScatteredDialog = Entanglement.scatter('Dialog')

render((
  <Entanglement adapter={adapter}>
    <ScatteredDialog
      onClick={(value, number) => window.alert('clicked' + value + number)}
      items={['one', 'two', 'three']}
    />
  </Entanglement>
), document.getElementById('main-app'))
