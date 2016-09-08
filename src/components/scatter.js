import React from 'react'
import splitHandlers from '../helpers/split-handlers'
import AdapterType from '../adapters/adapter-type'

export default function scatter (componentName) {
  const update = (component) => {
    const { data, handlers } = splitHandlers(component.props)
    const entanglement = component.context.entanglement
    const handlerNames = Object.keys(handlers)

    // dismiss previous handlers and register new ones
    component.dismissers = component.dismissers || []
    component.dismissers.forEach((dismisser) => dismisser())
    component.dismissers = handlerNames.map((handlerName) => (
      entanglement.onHandle(
        componentName,
        handlerName,
        (args) => handlers[handlerName].apply(component, args)
      )
    ))

    entanglement.render(componentName, data, handlerNames)
  }

  const unmount = (component) => {
    const entanglement = component.context.entanglement

    entanglement.unmount(componentName)
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
      entanglement: AdapterType
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

