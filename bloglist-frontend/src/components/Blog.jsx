import { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
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
  <button>like</button>
  </div>
  {blog.user.name}
</div>)  
}

export default Blog