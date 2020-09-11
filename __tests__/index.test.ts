import { sum } from '~/foo'

describe('sample', () => {
  it('ok', () => {
    const actual = sum(1, 2, 3)
    expect(actual).toBe(6)
  })
})
