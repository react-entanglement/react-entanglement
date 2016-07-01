import React from 'react'
import AdapterType from '../adapters/adapter-type'
import Scatter from './scatter'

const ScatterOrRender = (props) => {
  if (props.adapter) {
    return <Scatter {...props} />
  }
  const Component = props.component
  return <Component {...props.props} />
}

ScatterOrRender.displayName = 'Entanglement.ScatterOrRender'
ScatterOrRender.propTypes = {
  adapter: AdapterType,
  component: React.PropTypes.func
}

export default ScatterOrRender
