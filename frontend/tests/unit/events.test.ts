import { describe, expect, it } from 'vitest'
import { isPlainPrimaryClick } from '~/utils/events'

const plain = { button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false }

describe('isPlainPrimaryClick', () => {
  it('accepte un clic principal sans modificateur', () => {
    expect(isPlainPrimaryClick(plain)).toBe(true)
  })

  it.each([
    ['Ctrl+clic', { ctrlKey: true }],
    ['Cmd+clic', { metaKey: true }],
    ['Shift+clic', { shiftKey: true }],
    ['Alt+clic', { altKey: true }],
    ['clic molette', { button: 1 }],
    ['clic droit', { button: 2 }],
  ])('laisse le comportement natif pour %s', (_label, override) => {
    expect(isPlainPrimaryClick({ ...plain, ...override })).toBe(false)
  })
})
