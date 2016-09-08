import Entanglement from './components/entanglement'
import materialize from './components/materialize'
import passthroughAdapter from './adapters/passthrough-adapter'
import scatter from './components/scatter'

Entanglement.materialize = materialize
Entanglement.passthroughAdapter = passthroughAdapter
Entanglement.scatter = scatter

export default Entanglement
