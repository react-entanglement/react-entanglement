import React, { Component } from 'react'
import Entanglement from '../entanglement'

const ScatteredField = Entanglement.scatter({ name: 'Field' })

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      value: 'Change remotely',
    }
  }

  render() {
    return (
      <Entanglement adapter={this.props.adapter}>
        <span>Value: {this.state.value}</span>
        <ScatteredField value={this.state.value} onChange={value => this.setState({ value })} />
      </Entanglement>
    )
  }
}
