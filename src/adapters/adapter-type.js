import { PropTypes } from 'react'

/**
 * Adapter Type
 */
export default PropTypes.shape({
  scatterer: PropTypes.shape({
    unmount: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    addHandlerListener: PropTypes.func.isRequired
  }),
  materializer: PropTypes.shape({
    addUnmountListener: PropTypes.func.isRequired,
    addRenderListener: PropTypes.func.isRequired,
    handle: PropTypes.func.isRequired
  })
})
