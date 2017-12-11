import React, { Component } from 'react'
import AdapterType from '../adapters/adapter-type'

const getDesiredState = (name, materializer) => {
  if (materializer.renderBuffer && materializer.renderBuffer[`render:${name}`] != null) {
    const [data, handlerNames, context] = materializer.renderBuffer[`render:${name}`]

    const buildHandler = handlerName => (...args) => materializer.handle(name, handlerName, args)

    const props = {
      ...data,
      ...handlerNames.reduce(
        (acc, handlerName) => ({ ...acc, [handlerName]: buildHandler(handlerName) }),
        {}
      ),
    }

    return { isMounted: true, props, context }

  }

  return {
    isMounted: false,
    props: {},
    context: {},
  }
}

export default function materialize({ name, constructor, contextTypes = {} }) {
  class Materialize extends Component {
    constructor(props, context) {
      super(props, context)

      const { materializer } = this.context.entanglement

      this.state = getDesiredState(name, materializer)

      this.handleUnmount = this.handleUnmount.bind(this)
      this.handleRender = this.handleRender.bind(this)
    }

    getChildContext() {
      return this.state.context || {}
    }

    componentDidMount() {
      const { materializer } = this.context.entanglement

      this.dismissers = [
        materializer.addRenderListener(name, this.handleRender),
        materializer.addUnmountListener(name, this.handleUnmount),
      ]
    }

    componentWillUnmount() {
      this.dismissers.forEach(dismisser => dismisser())
      this.dismissers = []
    }

    handleUnmount() {
      this.setState({ isMounted: false })
    }

    handleRender(data, handlerNames, context) {
      const { materializer } = this.context.entanglement

      const buildHandler = handlerName => (...args) => materializer.handle(name, handlerName, args)

      const props = {
        ...data,
        ...handlerNames.reduce(
          (acc, handlerName) => ({ ...acc, [handlerName]: buildHandler(handlerName) }),
          {}
        ),
      }

      this.setState({ isMounted: true, props, context })
    }

    render() {
      const { isMounted, props } = this.state
      return isMounted && React.createElement(constructor, props)
    }
  }

  Materialize.displayName = `Entanglement.materialize.${name}`

  Materialize.contextTypes = {
    entanglement: AdapterType,
  }

  Materialize.childContextTypes = {
    entanglement: AdapterType,
    ...contextTypes,
  }

  return Materialize
}
