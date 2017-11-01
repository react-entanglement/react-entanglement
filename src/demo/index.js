import React, { Component } from 'react'
import { render } from 'react-dom'
import './index.css'

import logo from './react-entanglement.png'
import Entanglement from '../entanglement'
import Main from './main'
import Remote from './remote'

export default class Demo extends Component {
  componentDidMount() {
    const adapter = Entanglement.passthroughAdapter()

    render(<Main adapter={adapter} />, this.refs.main, () => {
      render(<Remote adapter={adapter} />, this.refs.remote)
    })
  }

  render() {
    return (
      <main>
        <img className="logo" src={logo} />

        <article className="introduction">
          <p>
            Allow the application state to live in a centralized location while components can be
            rendered somewhere else (iframes, separate tabs).
          </p>
          <a
            className="github-button"
            href="https://github.com/react-entanglement/react-entanglement"
            data-style="mega"
            data-count-href="/react-entanglement/react-entanglement/stargazers"
            data-count-api="/repos/react-entanglement/react-entanglement#stargazers_count"
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star react-entanglement/react-entanglement on GitHub"
          >
            Star
          </a>
          <pre>npm install --save react-entanglement</pre>
        </article>

        <article className="main-example">
          <h1>Main application</h1>
          <div className="app" ref="main" />
          <pre>
            {`<Entanglement adapter={adapter}>
  <span>Value: {this.state.value}</span>
  <ScatteredField
    value={this.state.value}
    onChange={(value) => this.setState({ value })}
  />
</Entanglement>`}
          </pre>
        </article>

        <article className="remote-example">
          <h1>Remote application</h1>
          <div className="app" ref="remote" />
          <pre>
            {`<Entanglement adapter={adapter}>
  <MaterializedField />
</Entanglement>`}
          </pre>
        </article>
      </main>
    )
  }
}
