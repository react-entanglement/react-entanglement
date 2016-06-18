import React from 'react'
import splitHandlers from '../helpers/split-handlers'
import AdapterType from '../adapters/adapter-type'

export default React.createClass({
  displayName: 'Entanglement.Scatter',

  contextTypes: {
    entanglement: AdapterType
  },

  propTypes: {
    adapter: AdapterType
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

const update = (component) => {
  const { data, handlers } = splitHandlers(component.props)
  const entanglement = component.props.adapter || component.context.entanglement
  const handlerNames = Object.keys(handlers)

  // dismiss previous handlers and register new ones
  component.dismissers = component.dismissers || []
  component.dismissers.forEach((dismisser) => dismisser())
  component.dismissers = handlerNames.map((handlerName) => (
    entanglement.onHandle(
      component.props.name,
      handlerName,
      (args) => handlers[handlerName].apply(component, args)
    )
  ))

  entanglement.render(component.props.name, data, handlerNames)
}

const unmount = (component) => {
  const entanglement = component.props.adapter || component.context.entanglement

  entanglement.unmount(component.props.name)
  component.dismissers.forEach((dismisser) => dismisser())
  component.dismissers = []
}

const validate = (component) => {
  // only do it if NODE_ENV !== production
  // validate if there is a entanglement in the context
  // validate that the props should only have a shallow handlers
}
