import React from 'react'
import Entanglement from '.'
import { render } from 'react-dom'
import scatterOrRender from './decorators/scatter-or-render'

const { Materialize, ScatterOrRender, passthroughAdapter } = Entanglement

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

const DecoratedDialog = scatterOrRender(Dialog)

const adapter = passthroughAdapter()

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
    <ScatterOrRender
      adapter={adapter}
      component={Dialog}
      name='Dialog'
      props={{
        onClick: (value, number) => window.alert('clicked' + value + number),
        items: ['one', 'two', 'three']
      }}
    />
    <ScatterOrRender
      adapter={undefined}
      component={Dialog}
      name='Dialog'
      props={{
        onClick: (value, number) => window.alert('clicked' + value + number),
        items: ['one', 'two', 'three']
      }}
    />
    <DecoratedDialog
      adapter={adapter}
      items={['one', 'two', 'three']}
      onClick={(value, number) => window.alert('clicked' + value + number)}
    />
    <DecoratedDialog
      adapter={undefined}
      items={['one', 'two', 'three']}
      onClick={(value, number) => window.alert('clicked' + value + number)}
    />
  </div>
), document.getElementById('main-app'))
