import Entanglement from '.'

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
})
