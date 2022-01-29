import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { WORDLE_TITLE } from './constants/strings'

test('renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(WORDLE_TITLE)
  expect(linkElement).toBeInTheDocument()
})
