import React from 'react'
import Entanglement from '../entanglement'
import Button from './button'

const MaterializedButton = Entanglement.materialize('Button', Button)

export default function Remote ({ adapter }) {
  return (
    <Entanglement adapter={adapter}>
      <div>
        <h1>Remote Application</h1>
        <MaterializedButton />
        <pre className='bg-navy code white' style={{ padding: '0 1rem' }}>
        {
          `
<Entanglement adapter={adapter}>
  <MaterializedButton />
</Entanglement>
          `
        }
        </pre>
      </div>
    </Entanglement>
  )
}
