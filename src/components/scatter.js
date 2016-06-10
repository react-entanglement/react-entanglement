import React from 'react'
import splitHandlers from '../helpers/split-handlers'
import CommunicationAdapterType from '../communication-adapters/communication-adapter-type'

export default (componentName) => {
  return React.createClass({
    displayName: `${componentName}Portal`,

    contextTypes: {
      entanglement: CommunicationAdapterType
    },

    componentWillUpdate: validate(componentName),
    componentDidMount: update(componentName),
    componentDidUpdate: update(componentName),
    componentWillUnmount: unmount(componentName),

    // the wrapped component will not be rendered here
    render () { return false }
  })
}

const update = (componentName) => function () {
  const { data, handlers } = splitHandlers(this.props)
  const entanglement = this.context.entanglement
  const handlerNames = Object.keys(handlers)

  // dismiss previous handlers and register new ones
  this.dismissers = this.dismissers || []
  this.dismissers.forEach((dismisser) => dismisser())
  this.dismissers = handlerNames.map((handlerName) => (
    entanglement.onHandle(
      componentName,
      handlerName,
      (args) => handlers[handlerName].apply(this, args)
    )
  ))

  entanglement.render(componentName, data, handlerNames)
}

const unmount = (componentName) => function () {
  this.context.entanglement.unmount(componentName)
  this.dismissers.forEach((dismisser) => dismisser())
  this.dismissers = []
}

const validate = (componentName) => function () {
  // only do it if NODE_ENV !== production
  // validate if there is a entanglement in the context
  // validate that the props should only have a shallow handlers
}
