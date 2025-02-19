import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

//Hooks

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
      keepLogged()
  }, [])


//Handlers

  const keepLogged = async () => { 
  const credentialsJson = window.localStorage.getItem('loggedBlogappUser')
  if (credentialsJson){
    const decodedCredentials = JSON.parse(credentialsJson)
    blogService.setToken(decodedCredentials.token)
    setUser(decodedCredentials)
  }
}

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username, password)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const sendBlog = async (event) => {
    event.preventDefault()
    try {
    const blog = await blogService.create({
      title: title, author: author,url: url
    })
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
   catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }


const blogForm = () => (
  <form onSubmit={sendBlog}>
  <div>
  title
    <input
    type="text"
    value={title}
    name="Title"
    onChange={({ target }) => setTitle(target.value)}
  />
</div>
<div>
  author
    <input
    type="text"
    value={author}
    name="Author"
    onChange={({ target }) => setAuthor(target.value)}
  />
</div>
<div>
  url
    <input
    type="text"
    value={url}
    name="Url"
    onChange={({ target }) => setUrl(target.value)}
  />
</div>
<button type="submit">create</button>
</form>
)

//Render
  if (user === null) {
  return( 
    <div>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>)}

  return(
      <div>
      <h2>blogs</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>{user.name} logged in</p>
      <button onClick={() => {setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')}
      }>logout</button>
      </div>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
}


export default App