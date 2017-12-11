import EventEmitter from 'events'

export default () => {
  const emitter = new EventEmitter()

  const renderBuffer = {}

  return {
    scatterer: {
      unmount: componentName => {
        emitter.emit(`unmount:${componentName}`)
      },

      render: (componentName, data, handlerNames, context) => {
        emitter.emit(`render:${componentName}`, data, handlerNames, context)
        renderBuffer[`render:${componentName}`] = [data, handlerNames, context]
      },

      addHandlerListener: (componentName, handlerName, cb) => {
        const eventName = `handle:${componentName}:${handlerName}`
        emitter.on(eventName, cb)
        return () => emitter.removeListener(eventName, cb)
      },
    },

    materializer: {
      addUnmountListener: (componentName, cb) => {
        const eventName = `unmount:${componentName}`
        emitter.on(eventName, cb)
        return () => emitter.removeListener(eventName, cb)
      },
      renderBuffer,
      addRenderListener: (componentName, cb) => {
        const eventName = `render:${componentName}`
        emitter.on(eventName, cb)
        return () => emitter.removeListener(eventName, cb)
      },

      handle: (componentName, handlerName, args) =>
        emitter.emit(`handle:${componentName}:${handlerName}`, args),
    },
  }
}
