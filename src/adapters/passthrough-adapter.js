import EventEmitter from 'events'

export default () => {
  const emitter = new EventEmitter()

  const buffer = {}

  return {
    scatterer: {
      unmount: componentName => {
        emitter.emit(`unmount:${componentName}`)
      },

      render: (componentName, data, handlerNames, context) => {
        emitter.emit(`render:${componentName}`, data, handlerNames, context)
        buffer[`render:${componentName}`] = [data, handlerNames, context]
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

      addRenderListener: (componentName, cb) => {
        const eventName = `render:${componentName}`
        emitter.on(eventName, cb)
        if (buffer[`render:${componentName}`]) {
          cb(...buffer[`render:${componentName}`]) // eslint-disable-line standard/no-callback-literal
        }
        return () => emitter.removeListener(eventName, cb)
      },

      handle: (componentName, handlerName, args) =>
        emitter.emit(`handle:${componentName}:${handlerName}`, args),
    },
  }
}
