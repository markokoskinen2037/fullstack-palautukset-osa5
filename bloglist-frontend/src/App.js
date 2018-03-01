import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: "",
      user: null,
      error: null,
      title: "",
      url: "",
      addBlogVisible: false,
      showDetails: false
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log("login successs!!")

      this.setState({ error: "logged in successfully!" })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }


  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      url: this.state.url,
      author: this.state.author,
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: "",
          url: "",
          author: "",
          error: "added new blog:  " + blogObject.title
        })
      })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )


    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    window.location.reload(false);
  }


  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const error = () => (
      <div>
        <p>{this.state.error}</p>
      </div>
    )

    const blogForm = () => {

      const hideWhenVisible = { display: this.state.addBlogVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.addBlogVisible ? '' : 'none' }


      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ addBlogVisible: true })}>Add a new blog</button>
          </div>

          <div style={showWhenVisible}>


            <h2>Luo uusi blogi</h2>

            <form onSubmit={this.addBlog}>
              Title:
              <input
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              URL:
                <input
                value={this.state.url}
                onChange={this.handleUrlChange}
              />
              Author:
              <input
                value={this.state.author}
                onChange={this.handleAuthorChange}
              />
              <button type="submit">tallenna</button>
              <button onClick={e => this.setState({ addBlogVisible: false })}>Cancel addition</button>
            </form>




          </div>

        </div>
      )
    }

    function toggleDetails() {
      console.log("here i am")
      if (this.state.showDetails === true) {
        this.setState({ showDetails: false })
      } else {
        this.setState({ showDetails: true })
      }
    }

    const blogs = () => {

      let blogit = this.state.blogs

      blogit.sort(function (a, b) {
        return b.likes - a.likes;
      });

      return (
        <div>
          <h2>blogs</h2>
          <p>{this.state.user.name} logged in</p> <button onClick={() => this.handleLogout()}>log out</button>
          {blogit.map(blog =>
            <p onClick={e => this.setState({ showDetails: true })}><Blog showDetails={this.state.showDetails} key={blog._id} blog={blog} /></p>
          )}
        </div>
      )
    }








    return (
      <div>

        {this.state.error !== null && error()}

        {this.state.user === null && loginForm()}

        {this.state.user !== null && blogs()}
        {this.state.user !== null && blogForm()}



      </div>
    );
  }
}

export default App;
