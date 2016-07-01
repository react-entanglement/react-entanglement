import _Entanglement from './components/entanglement'
import _materialize from './components/materialize'
import _passthroughAdapter from './adapters/passthrough-adapter'
import _scatter from './components/scatter'
import _scatterOrRender from './components/scatter-or-render'

export const Entanglement = _Entanglement
Entanglement.Materialize = _materialize
Entanglement.passthroughAdapter = _passthroughAdapter
Entanglement.Scatter = _scatter
Entanglement.ScatterOrRender = _scatterOrRender

export default Entanglement
