import React from 'react'
import Entanglement from '.'
import { render } from 'react-dom'

const { Materialize, Scatter, passthroughAdapter } = Entanglement

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

const adapter = passthroughAdapter()

console.log('!!!')
// Remote App
render((
  <Entanglement adapter={adapter}>
    <Materialize
      name='Dialog'
      component={Dialog}
    />
  </Entanglement>
), document.getElementById('remote-app'))

// Local App
render((
  <Entanglement adapter={adapter}>
    <div>
      <Scatter
        name='Dialog'
        props={{
          onClick: (value, number) => window.alert('clicked' + value + number),
          items: ['one', 'two', 'three']
        }}
      />
    </div>
  </Entanglement>
), document.getElementById('main-app'))
