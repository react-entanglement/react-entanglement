import React from 'react'
import Scatter from '../components/scatter'

export default (Component, name = Component.displayName || Component.name) => (props) => (
  props.adapter
    ? <Scatter name={name} adapter={props.adapter} props={props} />
    : <Component {...props} />
)
