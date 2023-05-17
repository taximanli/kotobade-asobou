import { getGuessStatuses, getStatuses } from './lib/statuses'

describe('Maps statuses correctly', () => {
  test('All correct', () => {
    const answer = 'あいうえ'
    const guess = 'あいうえ'
    const expectedStatus = ['correct', 'correct', 'correct', 'correct']

    expect(getGuessStatuses(guess, answer)).toStrictEqual(expectedStatus)
  })

  test('None correct', () => {
    const answer = 'んんんん'
    const guess = 'あいうえ'
    const expectedStatus = ['absent', 'absent', 'absent', 'absent']

    expect(getGuessStatuses(guess, answer)).toStrictEqual(expectedStatus)
  })

  test('Present twice, hit once', () => {
    const answer = 'んあんあ'
    const guess = 'んんんあ'
    const expectedStatus = ['correct', 'absent', 'correct', 'correct']

    expect(getGuessStatuses(guess, answer)).toStrictEqual(expectedStatus)
  })

  test('Present twice, hit once, missed once', () => {
    const answer = 'んあんあ'
    const guess = 'あーーあ'
    const expectedStatus = ['present', 'absent', 'absent', 'correct']

    expect(getGuessStatuses(guess, answer)).toStrictEqual(expectedStatus)
  })
})

describe('Maps keyboard statuses correctly', () => {
  test('Duplicate kana, first correct, second same vowel', () => {
    const solution = 'けいしき'
    const guesses = ['ていてい']

    const result = getStatuses(guesses, solution)

    expect(result['い']).toStrictEqual('correct')
    expect(result['て']).toStrictEqual('vowel')
  })
})
