import React from 'react'
import CommunicationAdapterType from '../communication-adapters/communication-adapter-type'

export default (componentName, Component) => {
  return React.createClass({
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
        entanglement.onRender(componentName, this.handleRender),
        entanglement.onUnmount(componentName, this.handleUnmount)
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
        entanglement.handle(componentName, name, args)
      )

      const props = {
        ...data,
        ...handlerNames.reduce((acc, name) => (
          { ...acc, [name]: buildHandler(name) }
        ), {})
      }

      this.setState({ isMounted: true, props })
    },

    render () {
      const { isMounted, props } = this.state
      return isMounted && <Component {...props} />
    }
  })
}
