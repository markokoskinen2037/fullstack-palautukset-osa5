import React from 'react'
const Blog = ({ toggleDetails, showDetails, blog }) => {



  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  showDetails === true
  console.log(showDetails)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (


    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author} </p>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author} </p>
        <ul>
          <li>Likes: {blog.likes} <button>+1</button></li>
          <li><a href={blog.url}>Click me to read the blog</a></li>
        </ul>
      </div>

    </div>
  )
}

export default Blog