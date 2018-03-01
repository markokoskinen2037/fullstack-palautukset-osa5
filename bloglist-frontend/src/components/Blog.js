import React from 'react'
import PropTypes from 'prop-types'




const Blog = ({ toggleDetails, showDetails, blog }) => {

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

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
          <li>Likes: {blog.likes} <button >+1</button></li>
          <li><a href={blog.url}>Click me to read the blog</a></li>
        </ul>
      </div>

    </div>
  )


Blog.PropTypes = {
  toggleDetails: PropTypes.func.isRequired,
  showDetails : PropTypes.bool.isRequired,
  blog : PropTypes.object.isRequired
}

}



export default Blog