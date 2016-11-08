import React from 'react'
import Entanglement from '../entanglement'

const ScatteredField = Entanglement.scatter({ name: 'Field' })

export default React.createClass({
  getInitialState () {
    return {
      value: 'Type here!'
    }
  },

  render () {
    return (
      <Entanglement adapter={this.props.adapter}>
        <span>{this.state.value}</span>
        <ScatteredField
          value={this.state.value}
          onChange={(value) => this.setState({ value })}
        />
      </Entanglement>
    )
  }
})
