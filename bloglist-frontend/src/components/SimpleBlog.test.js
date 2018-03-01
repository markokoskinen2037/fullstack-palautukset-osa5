import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    test('renders title and author', () => {
        const testBlog = {
            title: "hassunhauska vitsiblogi",
            author: "reiska pekkanen",
            likes: 0
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog} />)

        const contentDiv = simpleBlogComponent.find('.content')


        expect(contentDiv.text()).toContain(testBlog.title)
        expect(contentDiv.text()).toContain(testBlog.author)
    })

    test('renders likes', () => {
        const testBlog = {
            title: "hassunhauska vitsiblogi",
            author: "reiska pekkanen",
            likes: 6
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog} />)

        const contentDiv = simpleBlogComponent.find('.likes')


        expect(contentDiv.text()).toContain(testBlog.likes)
    })
})