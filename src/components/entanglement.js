import React from 'react'
import AdapterType from '../adapters/adapter-type'

export default React.createClass({
  propTypes: {
    adapter: AdapterType
  },

  childContextTypes: {
    entanglement: AdapterType
  },

  getChildContext () {
    return {
      entanglement: this.props.adapter
    }
  },

  render () {
    return <span>{this.props.children}</span>
  }
})
