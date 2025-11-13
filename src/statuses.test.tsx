import exp from 'constants'
import {
  getGuessStatuses,
  getGuessStatusesPure,
  getStatuses,
  getStatusesPure,
} from './lib/statuses'

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

describe('getStatusesPure with hint mode', () => {
  test('consonant hint', () => {
    const solution = 'かんじん'
    const guesses = ['けんじん', 'かんてん']
    const result = getStatusesPure(guesses, solution, true)
    expect(result['か']).toStrictEqual('correct')
    expect(result['け']).toStrictEqual('consonant')
    expect(result['ん']).toStrictEqual('correct')
    expect(result['じ']).toStrictEqual('correct')
    expect(result['て']).toStrictEqual('absent')

    // without hint
    const resultNoHint = getStatusesPure(guesses, solution, false)
    expect(resultNoHint['か']).toStrictEqual('correct')
    expect(resultNoHint['け']).toStrictEqual('absent')
    expect(resultNoHint['ん']).toStrictEqual('correct')
    expect(resultNoHint['じ']).toStrictEqual('correct')
    expect(resultNoHint['て']).toStrictEqual('absent')
  })

  test('vowel hint', () => {
    const solution = 'ていしき'
    const guesses = ['けいしき', 'かんしき']
    const result = getStatusesPure(guesses, solution, true)
    expect(result['け']).toStrictEqual('vowel')
    expect(result['い']).toStrictEqual('correct')
    expect(result['し']).toStrictEqual('correct')
    expect(result['か']).toStrictEqual('absent')
    expect(result['ん']).toStrictEqual('absent')

    // without hint
    const resultNoHint = getStatusesPure(guesses, solution, false)
    expect(resultNoHint['け']).toStrictEqual('absent')
    expect(resultNoHint['い']).toStrictEqual('correct')
    expect(resultNoHint['し']).toStrictEqual('correct')
    expect(resultNoHint['か']).toStrictEqual('absent')
    expect(resultNoHint['ん']).toStrictEqual('absent')
  })

  test('close hint', () => {
    const solution = 'かんしん'
    const guesses = ['かんじん', 'かんてん']
    const result = getStatusesPure(guesses, solution, true)
    expect(result['か']).toStrictEqual('correct')
    expect(result['ん']).toStrictEqual('correct')
    expect(result['じ']).toStrictEqual('close')
    expect(result['て']).toStrictEqual('absent')

    // without hint
    const resultNoHint = getStatusesPure(guesses, solution, false)
    expect(resultNoHint['か']).toStrictEqual('correct')
    expect(resultNoHint['ん']).toStrictEqual('correct')
    expect(resultNoHint['じ']).toStrictEqual('absent')
    expect(resultNoHint['て']).toStrictEqual('absent')
  })
})

describe('getGuessStatusPure with hint mode', () => {
  test('consonant hint', () => {
    const solution = 'かんじん'
    const guesses = 'けんじん'
    const expectedStatus = ['consonant', 'correct', 'correct', 'correct']
    const result = getGuessStatusesPure(guesses, solution, true)
    expect(result).toStrictEqual(expectedStatus)

    // without hint
    const expectedStatusNoHint = ['absent', 'correct', 'correct', 'correct']
    const resultNoHint = getGuessStatusesPure(guesses, solution, false)
    expect(resultNoHint).toStrictEqual(expectedStatusNoHint)
  })

  test('vowel hint', () => {
    const solution = 'ていしき'
    const guesses = 'けいしき'
    const expectedStatus = ['vowel', 'correct', 'correct', 'correct']
    const result = getGuessStatusesPure(guesses, solution, true)
    expect(result).toStrictEqual(expectedStatus)

    // without hint
    const expectedStatusNoHint = ['absent', 'correct', 'correct', 'correct']
    const resultNoHint = getGuessStatusesPure(guesses, solution, false)
    expect(resultNoHint).toStrictEqual(expectedStatusNoHint)
  })

  test('close hint', () => {
    const solution = 'かんしん'
    const guesses = 'かんじん'
    const expectedStatus = ['correct', 'correct', 'close', 'correct']
    const result = getGuessStatusesPure(guesses, solution, true)
    expect(result).toStrictEqual(expectedStatus)

    // without hint
    const expectedStatusNoHint = ['correct', 'correct', 'absent', 'correct']
    const resultNoHint = getGuessStatusesPure(guesses, solution, false)
    expect(resultNoHint).toStrictEqual(expectedStatusNoHint)
  })
})
