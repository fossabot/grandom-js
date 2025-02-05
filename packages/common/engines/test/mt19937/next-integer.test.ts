import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import MT19937Engine from '../../src/mt19937'

const engine = new MT19937Engine()

describe('MT19937Engine', () => {
  describe('.nextInteger()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(0)).toBeWithin(0.09, 0.12)
      expect(result.of(9)).toBeWithin(0.09, 0.12)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.089)
      expect(result.highestValue).toBeLessThanOrEqual(0.093)
      expect(result.averageValue).toBeWithin(0.089, 0.093)

      expect(result.of(0)).toBeWithin(0.089, 0.093)
      expect(result.of(10)).toBeWithin(0.089, 0.093)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(1)).toBeWithin(0.09, 0.12)
      expect(result.of(10)).toBeWithin(0.09, 0.12)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.13)

      expect(result.of(1)).toBeWithin(0.10, 0.13)
      expect(result.of(9)).toBeWithin(0.10, 0.13)
    })
  })
})
