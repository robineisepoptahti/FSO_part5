import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest'



test('renders Blog title', async () => {
  const mockBlog = {
    author: 'janne',
    title: 'Jannen kirja',
    url: 'www.test.fi'
  }
  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  render(<Blog blog={mockBlog} updateLikes={mockUpdateLikes} removeBlog={mockRemoveBlog} />)
  const author = screen.getByText('janne', { exact: false })
  const title = screen.getByText('Jannen kirja', { exact: false })
  const likes = screen.queryByText('likes', { exact: false })
  const url = screen.queryByText('www.test.fi', { exact: false })
  screen.debug()
  expect(author).toBeDefined()
  expect(title).toBeDefined()
  expect(likes).toBeNull()
  expect(url).toBeNull()
})