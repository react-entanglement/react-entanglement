import { createElement, Component } from 'react'
import AdapterType from '../adapters/adapter-type'

export default function materialize({ name, constructor, contextTypes = {} }) {
  class Materialize extends Component {
    constructor() {
      super()

      this.state = {
        isMounted: false,
        props: {},
        context: {},
      }
    }

    getChildContext() {
      return this.state.context || {}
    }

    componentDidMount() {
      const { materializer } = this.context.entanglement

      this.dismissers = [
        materializer.addRenderListener(name, () => this.handleRender()),
        materializer.addUnmountListener(name, () => this.handleUnmount()),
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
