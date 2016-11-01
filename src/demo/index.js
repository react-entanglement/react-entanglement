import React from 'react'
import { render } from 'react-dom'
import logo from './react-entanglement.png'
import './index.css'

import Entanglement from '../entanglement'
import Main from './main'
import Remote from './remote'

export default React.createClass({
  componentDidMount () {
    const adapter = Entanglement.passthroughAdapter()

    render(<Remote adapter={adapter} />, this.refs.remote, () => {
      render(<Main adapter={adapter} />, this.refs.main)
    })
  },

  render () {
    return <main className='helvetica'>
      <img className='logo' alt='React Entanglement' src={logo} />

      <div className='mw9 center ph3-ns'>
        <div className='cf ph2-ns'>
          <div className='fl w-100 w-50-ns pa2'>
            <div className='pv4' ref='main' />
          </div>
          <div className='fl w-100 w-50-ns pa2'>
            <div className='pv4' ref='remote' />
          </div>
        </div>
      </div>
    </main>
  }
})
