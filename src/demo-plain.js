import React from 'react'
import Entanglement from '.'
import { render } from 'react-dom'

const { Materialize, Scatter, passthroughCommunicationAdapter } = Entanglement

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

const adapter = passthroughCommunicationAdapter()

// Remote App
render((
  <Materialize
    name='Dialog'
    component={Dialog}
    adapter={adapter}
  />
), document.getElementById('remote-app'))

// Local App
render((
  <div>
    <Scatter
      adapter={adapter}
      name='Dialog'
      props={{
        onClick: (value, number) => window.alert('clicked' + value + number),
        items: ['one', 'two', 'three']
      }}
    />
  </div>
), document.getElementById('main-app'))
