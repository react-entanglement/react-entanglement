import React from 'react'
import Entanglement from '../entanglement'

const ScatteredButton = Entanglement.scatter('Button')

export default React.createClass({
  getInitialState () {
    return {
      clicks: 0
    }
  },

  render () {
    return (
      <Entanglement adapter={this.props.adapter}>
        <div>
          <h1>Main Application</h1>

          <p>Clicked: {this.state.clicks}</p>
          <ScatteredButton
            label='Increment'
            onClick={() => this.setState({ clicks: this.state.clicks += 1 })}
          />

          <pre className='bg-navy code white' style={{ padding: '0 1rem' }}>
            {
              `
<Entanglement adapter={adapter}>
  <ScatteredButton
    label='Increment'
    onClick={incrementCount)}
  />
</Entanglement>
              `
            }
          </pre>
        </div>
      </Entanglement>
    )
  }
})
