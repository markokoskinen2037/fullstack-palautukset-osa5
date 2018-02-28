import React from 'react'
const Blog = ({ state, showDetails, blog }) => {



  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }



  return (



    <div>
      
      <p onClick={e => this.setstate}>{blog.title} {blog.author} </p>
    </div>
  )
}

export default Blog