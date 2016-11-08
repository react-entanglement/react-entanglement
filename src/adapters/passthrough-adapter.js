import EventEmitter from 'events'

export default () => {
  const emiter = new EventEmitter()

  return {
    scatterer: {
      unmount: (componentName) => emiter.emit(`unmount:${componentName}`),

      render: (componentName, data, handlerNames, context) => {
        emiter.emit(`render:${componentName}`, data, handlerNames, context)
      },

      addHandlerListener: (componentName, handlerName, cb) => {
        const eventName = `handle:${componentName}:${handlerName}`
        emiter.on(eventName, cb)
        return () => emiter.removeListener(eventName, cb)
      }
    },

    materializer: {
      addUnmountListener: (componentName, cb) => {
        const eventName = `unmount:${componentName}`
        emiter.on(eventName, cb)
        return () => emiter.removeListener(eventName, cb)
      },

      addRenderListener: (componentName, cb) => {
        const eventName = `render:${componentName}`
        emiter.on(eventName, cb)
        return () => emiter.removeListener(eventName, cb)
      },

      handle: (componentName, handlerName, args) => emiter.emit(`handle:${componentName}:${handlerName}`, args)
    }
  }
}
