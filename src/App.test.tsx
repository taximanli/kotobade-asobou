import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(/Not Wordle/)
  expect(linkElement).toBeInTheDocument()
})
