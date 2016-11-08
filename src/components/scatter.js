import React from 'react'
import splitHandlers from '../helpers/split-handlers'
import AdapterType from '../adapters/adapter-type'

export default function scatter (componentName, componentContextTypes = {}) {
  const update = (component) => {
    const { data, handlers } = splitHandlers(component.props)
    const { scatterer } = component.context.entanglement
    const handlerNames = Object.keys(handlers)

    // dismiss previous handlers and register new ones
    component.dismissers = component.dismissers || []
    component.dismissers.forEach((dismisser) => dismisser())
    component.dismissers = handlerNames.map((handlerName) => (
      scatterer.addHandlerListener(
        componentName,
        handlerName,
        (args) => handlers[handlerName].apply(component, args)
      )
    ))

    const context = extractContext(component.context, componentContextTypes)

    scatterer.render(componentName, data, handlerNames, context)
  }

  const unmount = (component) => {
    const { scatterer } = component.context.entanglement

    scatterer.unmount(componentName)
    component.dismissers.forEach((dismisser) => dismisser())
    component.dismissers = []
  }

  const validate = (component) => {
    // only do it if NODE_ENV !== production
    // validate if there is a entanglement in the context
    // validate that the props should only have a shallow handlers
  }

  return React.createClass({
    displayName: `Entanglement.scatter.${componentName}`,

    contextTypes: {
      entanglement: AdapterType,
      ...componentContextTypes
    },

    componentWillUpdate () {
      validate(this)
    },

    componentDidMount () {
      update(this)
    },
    componentDidUpdate () {
      update(this)
    },

    componentWillUnmount () {
      unmount(this)
    },

    // the wrapped component will not be rendered here
    render () { return false }
  })
}

function extractContext (context, componentContextTypes) {
  return Object.keys(componentContextTypes)
    .reduce((acc, key) => ({ ...acc, [key]: context[key] }), {})
}
