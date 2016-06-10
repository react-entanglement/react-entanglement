export default (props) => {
  const data = Object.keys(props)
    .filter((key) => typeof props[key] !== 'function')
    .reduce((obj, key) => {
      return { ...obj, [key]: props[key] }
    }, {})

  const handlers = Object.keys(props)
    .filter((key) => typeof props[key] === 'function')
    .reduce((obj, key) => {
      return { ...obj, [key]: props[key] }
    }, {})

  return { data, handlers }
}
