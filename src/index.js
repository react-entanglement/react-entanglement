import Entanglement from './components/entanglement'
import Materialize from './components/materialize'
import passthroughAdapter from './adapters/passthrough-adapter'
import scatter from './components/scatter'

Entanglement.Materialize = Materialize
Entanglement.passthroughAdapter = passthroughAdapter
Entanglement.scatter = scatter

export default Entanglement
