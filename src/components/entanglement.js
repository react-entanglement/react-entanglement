import React from 'react'
import CommunicationAdapterType from '../communication-adapters/communication-adapter-type'

export default React.createClass({
  propTypes: {
    communicationAdapter: CommunicationAdapterType
  },

  childContextTypes: {
    entanglement: CommunicationAdapterType
  },

  getChildContext () {
    return {
      entanglement: this.props.communicationAdapter
    }
  },

  render () {
    return this.props.children
  }
})
