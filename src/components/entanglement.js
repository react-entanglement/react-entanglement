import React, { Component } from 'react'
import AdapterType from '../adapters/adapter-type'

export default class Entanglement extends Component {
  getChildContext() {
    return {
      entanglement: this.props.adapter,
    }
  }

  render() {
    return <span>{this.props.children}</span>
  }
}

Entanglement.propTypes = {
  adapter: AdapterType,
}

Entanglement.childContextTypes = {
  entanglement: AdapterType,
}
