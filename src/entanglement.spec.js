import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { equal, ok } from 'assert'
import Entanglement from './entanglement'

describe('Entanglement', () => {
  it('should expose the library', () => {
    ok(Entanglement != null)
  })

  it('should expose the scatter', () => {
    ok(Entanglement.scatter != null)
  })

  it('should expose the materialize', () => {
    ok(Entanglement.materialize != null)
  })

  it('should expose the default passthroughAdapter', () => {
    ok(Entanglement.passthroughAdapter != null)
  })

  describe('integration tests', () => {
    it('should scatter props', () => {
      function Example({ name }) {
        return <div id="example">Hello {name}!</div>
      }

      const adapter = Entanglement.passthroughAdapter()
      const ScatteredExample = Entanglement.scatter({ name: 'Example' })
      const MaterializedExample = Entanglement.materialize({
        name: 'Example',
        constructor: Example,
      })

      function Main() {
        return (
          <Entanglement adapter={adapter}>
            <ScatteredExample name="Paulo" />
          </Entanglement>
        )
      }

      function Remote() {
        return (
          <Entanglement adapter={adapter}>
            <MaterializedExample />
          </Entanglement>
        )
      }

      const remote = document.createElement('div')
      const main = document.createElement('div')

      render(<Remote />, remote)
      render(<Main />, main)

      equal(remote.querySelector('#example').innerText, 'Hello Paulo!')
    })

    it('should scatter whitelisted context', () => {
      function Example({ name }, { lastName }) {
        return (
          <div id="example">
            Hello {name} {lastName}!
          </div>
        )
      }

      Example.contextTypes = {
        lastName: PropTypes.string,
      }

      const adapter = Entanglement.passthroughAdapter()
      const ScatteredExample = Entanglement.scatter({
        name: 'Example',
        contextTypes: { lastName: PropTypes.string },
      })
      const MaterializedExample = Entanglement.materialize({
        name: 'Example',
        constructor: Example,
        contextTypes: { lastName: PropTypes.string },
      })

      class Main extends Component {
        getChildContext() {
          return { lastName: 'Ragonha' }
        }

        render() {
          return (
            <Entanglement adapter={adapter}>
              <ScatteredExample name="Paulo" />
            </Entanglement>
          )
        }
      }

      Main.childContextTypes = {
        lastName: PropTypes.string,
      }

      function Remote() {
        return (
          <Entanglement adapter={adapter}>
            <MaterializedExample />
          </Entanglement>
        )
      }

      const remote = document.createElement('div')
      const main = document.createElement('div')

      render(<Remote />, remote)
      render(<Main />, main)

      equal(remote.querySelector('#example').innerText, 'Hello Paulo Ragonha!')
    })
  })
})
