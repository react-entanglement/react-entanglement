import React, { PropTypes, Component } from 'react'
import { mount } from 'enzyme'

import Entanglement from './entanglement'

describe('Entanglement', () => {
  it('should expose the library', () => {
    expect(Entanglement).toBeDefined()
  })

  it('should expose the scatter', () => {
    expect(Entanglement.scatter).toBeDefined()
  })

  it('should expose the materialize', () => {
    expect(Entanglement.materialize).toBeDefined()
  })

  it('should expose the default passthroughAdapter', () => {
    expect(Entanglement.passthroughAdapter).toBeDefined()
  })

  describe('integration tests', () => {
    it('should scatter props', () => {
      function Example ({ name }) {
        return <div>Hello {name}!</div>
      }

      const adapter = Entanglement.passthroughAdapter()
      const ScatteredExample = Entanglement.scatter('Example')
      const MaterializedExample = Entanglement.materialize('Example', Example)

      function Main () {
        return (
          <Entanglement adapter={adapter}>
            <ScatteredExample name='Paulo' />
          </Entanglement>
        )
      }

      function Remote () {
        return (
          <Entanglement adapter={adapter}>
            <MaterializedExample />
          </Entanglement>
        )
      }

      const remote = mount(<Remote />)
      mount(<Main />)

      expect(remote.find(Example).text()).toEqual('Hello Paulo!')
    })

    it('should scatter whitelisted context', () => {
      function Example ({ name }, { lastName }) {
        return <div>Hello {name} {lastName}!</div>
      }

      Example.contextTypes = {
        lastName: PropTypes.string
      }

      const adapter = Entanglement.passthroughAdapter()
      const ScatteredExample = Entanglement.scatter('Example', { lastName: PropTypes.string })
      const MaterializedExample = Entanglement.materialize('Example', Example, { lastName: PropTypes.string })

      class Main extends Component {
        getChildContext () {
          return { lastName: 'Ragonha' }
        }

        render () {
          return (
            <Entanglement adapter={adapter}>
              <ScatteredExample name='Paulo' />
            </Entanglement>
          )
        }
      }

      Main.childContextTypes = {
        lastName: PropTypes.string
      }

      function Remote () {
        return (
          <Entanglement adapter={adapter}>
            <MaterializedExample />
          </Entanglement>
        )
      }

      const remote = mount(<Remote />)
      mount(<Main />)

      expect(remote.find(Example).text()).toEqual('Hello Paulo Ragonha!')
    })
  })
})
