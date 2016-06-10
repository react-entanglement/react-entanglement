import { PropTypes } from 'react'

/**
 * Communication Adapter Type
 */
export default PropTypes.shape({
  unmount: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  onHandle: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  onRender: PropTypes.func.isRequired,
  handle: PropTypes.func.isRequired
})
