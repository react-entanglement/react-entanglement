import { Component } from 'react'
import splitHandlers from '../helpers/split-handlers'
import AdapterType from '../adapters/adapter-type'

export default function scatter({ name, contextTypes = {} }) {
  const update = (component, props, context) => {
    const { data, handlers } = splitHandlers(props)
    const { scatterer } = component.entanglement
    const handlerNames = Object.keys(handlers)

    // dismiss previous handlers and register new ones
    component.dismissers = component.dismissers || []
    component.dismissers.forEach(dismisser => dismisser())
    component.dismissers = handlerNames.map(handlerName =>
      scatterer.addHandlerListener(name, handlerName, args =>
        handlers[handlerName].apply(component, args)
      )
    )

    scatterer.render(name, data, handlerNames, extractContext(context, contextTypes))
  }

  const unmount = component => {
    const { scatterer } = component.entanglement

    scatterer.unmount(name)
    component.dismissers.forEach(dismisser => dismisser())
    component.dismissers = []
  }

  const validate = component => {
    // only do it if NODE_ENV !== production
    // validate if there is a entanglement in the context
    // validate that the props should only have a shallow handlers
  }

  class Scatter extends Component {
    constructor(props, context) {
      super()

      this.entanglement = context.entanglement
      update(this, props, context)
    }

    componentWillUpdate() {
      validate(this)
    }

    componentDidUpdate(_, __, context) {
      this.entanglement = context.entanglement

      update(this, this.props, context)
    }

    componentWillUnmount() {
      unmount(this)
    }

    // the wrapped component will not be rendered here
    render() {
      return false
    }
  }

  Scatter.displayName = `Entanglement.scatter.${name}`

  Scatter.contextTypes = {
    entanglement: AdapterType,
    ...contextTypes,
  }

  return Scatter
}

function extractContext(context, contextTypes) {
  return Object.keys(contextTypes).reduce((acc, key) => ({ ...acc, [key]: context[key] }), {})
}
