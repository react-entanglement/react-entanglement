import React from 'react'
import CommunicationAdapterType from '../communication-adapters/communication-adapter-type'

export default React.createClass({
  propTypes: {
    adapter: CommunicationAdapterType
  },

  childContextTypes: {
    entanglement: CommunicationAdapterType
  },

  getChildContext () {
    return {
      entanglement: this.props.adapter
    }
  },

  render () {
    return this.props.children
  }
})
