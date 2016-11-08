import React from 'react'
import { render } from 'react-dom'
import './index.css'

import logo from './react-entanglement.png'
import Entanglement from '../entanglement'
import Main from './main'
import Remote from './remote'
import Logo from './logo'
import TV from './tv'

export default React.createClass({
  componentDidMount () {
    const adapter = Entanglement.passthroughAdapter()

    render(<Remote adapter={adapter} />, this.refs.remote, () => {
      render(<Main adapter={adapter} />, this.refs.main)
    })
  },

  render () {
    return <main>
      <header>
        <Logo />
        <h1>React Entanglement</h1>
        <p>
          Spooky rendering at a distance
        </p>
        <a className='github-button' href='https://github.com/react-entanglement/react-entanglement' data-style='mega' data-count-href='/react-entanglement/react-entanglement/stargazers' data-count-api='/repos/react-entanglement/react-entanglement#stargazers_count' data-count-aria-label='# stargazers on GitHub' aria-label='Star react-entanglement/react-entanglement on GitHub'>Star</a>
      </header>

      <article className='introduction'>
        <div>
          <p>Allow the application state to live in a centralized location while components can be rendered somewhere else (iframes, separate tabs).</p>

          <pre>npm install --save react-entanglement</pre>
        </div>
      </article>

      <footer>
        <article className='main-example'>
          <h2>Main application</h2>
          <div className='app' ref='main' />
          <pre>
            {
  `<Entanglement adapter={adapter}>
    <span>Value: {this.state.value}</span>
    <ScatteredField
      value={this.state.value}
      onChange={(value) => {
        this.setState({ value })
      }}
    />
  </Entanglement>`
            }
          </pre>
        </article>

        <article className='remote-example'>
          <h2>Remote application</h2>
          <div className='app' ref='remote' />
          <pre>
            {
  `<Entanglement adapter={adapter}>
    <MaterializedField />
  </Entanglement>`
            }
          </pre>
        </article>
      </footer>
    </main>
  }
})
