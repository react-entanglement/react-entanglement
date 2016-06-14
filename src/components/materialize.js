import React from 'react'
import CommunicationAdapterType from '../communication-adapters/communication-adapter-type'

export default React.createClass({
  displayName: 'Entanglement.Materialize',

  contextTypes: {
    entanglement: CommunicationAdapterType
  },

  getInitialState () {
    return {
      isMounted: false,
      props: {}
    }
  },

  componentDidMount () {
    const entanglement = this.context.entanglement

    this.dismissers = [
      entanglement.onRender(this.props.name, this.handleRender),
      entanglement.onUnmount(this.props.name, this.handleUnmount)
    ]
  },

  componentWillUnmount () {
    this.dismissers.forEach((dismisser) => dismisser())
    this.dismissers = []
  },

  handleUnmount () {
    this.setState({ isMounted: false })
  },

  handleRender (data, handlerNames) {
    const entanglement = this.context.entanglement

    const buildHandler = (name) => (...args) => (
      entanglement.handle(this.props.name, name, args)
    )
    console.log('allasdflads', data)
    const props = {
      ...data.props,
      ...handlerNames.reduce((acc, name) => (
        { ...acc, [name]: buildHandler(name) }
      ), {})
    }

    this.setState({ isMounted: true, props })
  },

  render () {
    const { isMounted, props } = this.state
    return isMounted && <this.props.component {...props} />
  }
})
