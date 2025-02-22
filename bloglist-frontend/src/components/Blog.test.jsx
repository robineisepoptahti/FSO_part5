import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import user from '../../../bloglist_backend/models/user'


describe('Blog component tests', () => {
  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  const mockBlog = {
    author: 'janne',
    title: 'Jannen kirja',
    url: 'www.test.fi',
    likes: 5,
    user: {
      name: 'jannesson',
      username: 'janskuli'
    }
  }
  test('renders Blog title', async () => {
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

  test('see if likes and url are rendered after opening expanded view', async () => {
    render(<Blog blog={mockBlog} updateLikes={mockUpdateLikes} removeBlog={mockRemoveBlog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likes = screen.getByText('likes', { exact: false })
    const url = screen.getByText('www.test.fi', { exact: false })
    screen.debug()
    expect(likes).toBeDefined()
    expect(url).toBeDefined()
  })
})