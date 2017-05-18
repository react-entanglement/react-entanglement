import { createElement, Component } from 'react'
import AdapterType from '../adapters/adapter-type'

export default function materialize({ name, constructor, contextTypes = {} }) {
  class Materialize extends Component {
    constructor(_, { entanglement }) {
      super()

      this.state = {
        isMounted: false,
        props: {},
        context: {},
      }

      const { materializer } = entanglement

      this.entanglement = entanglement

      this.dismissers = [
        materializer.addRenderListener(name, this.handleRender.bind(this)),
        materializer.addUnmountListener(name, this.handleUnmount.bind(this)),
      ]
    }

    getChildContext() {
      return this.state.context || {}
    }

    componentDidUpdate(_, __, { entanglement }) {
      this.entanglement = entanglement
    }

    componentWillUnmount() {
      this.dismissers.forEach(dismisser => dismisser())
      this.dismissers = []
    }

    handleUnmount() {
      this.setState({ isMounted: false })
    }

    handleRender(data, handlerNames, context) {
      const { materializer } = this.entanglement

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
      return isMounted && createElement(constructor, props)
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
