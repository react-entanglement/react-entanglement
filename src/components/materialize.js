import React from 'react'
import AdapterType from '../adapters/adapter-type'

export default function materialize (componentName, ComponentConstructor, componentContextTypes = {}) {
  return React.createClass({
    displayName: `Entanglement.materialize.${componentName}`,

    contextTypes: {
      entanglement: AdapterType
    },

    childContextTypes: {
      entanglement: AdapterType,
      ...componentContextTypes
    },

    getInitialState () {
      return {
        isMounted: false,
        props: {},
        context: {}
      }
    },

    getChildContext () {
      return this.state.context || {}
    },

    componentDidMount () {
      const { materializer } = this.context.entanglement

      this.dismissers = [
        materializer.addRenderListener(componentName, this.handleRender),
        materializer.addUnmountListener(componentName, this.handleUnmount)
      ]
    },

    componentWillUnmount () {
      this.dismissers.forEach((dismisser) => dismisser())
      this.dismissers = []
    },

    handleUnmount () {
      this.setState({ isMounted: false })
    },

    handleRender (data, handlerNames, context) {
      const { materializer } = this.context.entanglement

      const buildHandler = (name) => (...args) => (
        materializer.handle(componentName, name, args)
      )

      const props = {
        ...data,
        ...handlerNames.reduce((acc, name) => (
          { ...acc, [name]: buildHandler(name) }
        ), {})
      }

      this.setState({ isMounted: true, props, context })
    },

    render () {
      const { isMounted, props } = this.state
      return isMounted && <ComponentConstructor {...props} />
    }
  })
}
