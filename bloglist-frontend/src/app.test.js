import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe.only('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('only login page is shown if user is not logged in', () => {

    app.update()

    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
  })
})