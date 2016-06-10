import _Entanglement from './components/entanglement'
import _materialize from './components/materialize'
import _passthroughCommunicationAdapter from './communication-adapters/passthrough-communication-adapter'
import _scatter from './components/scatter'

export const Entanglement = _Entanglement
Entanglement.materialize = _materialize
Entanglement.passthroughCommunicationAdapter = _passthroughCommunicationAdapter
Entanglement.scatter = _scatter

export default Entanglement
