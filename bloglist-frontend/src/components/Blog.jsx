import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 const toggle = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    blog.likes = blog.likes + 1
    setLikes(blog.likes)
  }
  
 if (!visible) { 
 return(
 <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggle}>view</button>
  </div>)  
 }
 return (
  <div style={blogStyle}>

  {blog.title} {blog.author}
  <button onClick={toggle}>hide</button><br />
  {blog.url}
  <div style={{display: 'flex',alignItems: 'center'}}>
  <p>likes {blog.likes}</p>
  <button onClick={addLike}>like</button>
  </div>
  {blog.user.name}
</div>)  
}

export default Blog