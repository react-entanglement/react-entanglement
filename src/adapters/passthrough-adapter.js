import EventEmitter from 'events'

export default () => {
  const emiter = new EventEmitter()

  return {
    // methods used by the scatter

    unmount: (componentName) => emiter.emit(`unmount:${componentName}`),

    render: (componentName, data, handlerNames) => emiter.emit(`render:${componentName}`, data, handlerNames),

    onHandle: (componentName, handlerName, cb) => {
      const eventName = `handle:${componentName}:${handlerName}`
      emiter.on(eventName, cb)
      return () => emiter.removeListener(eventName, cb)
    },

    // methods used by the materializer

    onUnmount: (componentName, cb) => {
      const eventName = `unmount:${componentName}`
      emiter.on(eventName, cb)
      return () => emiter.removeListener(eventName, cb)
    },

    onRender: (componentName, cb) => {
      const eventName = `render:${componentName}`
      emiter.on(eventName, cb)
      return () => emiter.removeListener(eventName, cb)
    },

    handle: (componentName, handlerName, args) => emiter.emit(`handle:${componentName}:${handlerName}`, args)
  }
}
