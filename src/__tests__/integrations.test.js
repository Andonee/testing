import React from 'react'
import { mount } from 'enzyme'
import Root from 'Root'
import App from 'components/App'
import moxios from 'moxios'

beforeEach(() => {
	moxios.install()
	moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
		status: 200,
		response: [
			{ name: 'Fetched 1' },
			{ name: 'Fetched 2' },
			{ name: 'Fetched 3' },
		],
	})
})
afterEach(() => {
	moxios.uninstall()
})

it('can fetch a list of comments and display them', done => {
	const wrapped = mount(
		<Root>
			<App />
		</Root>
	)

	wrapped.find('[data-test="fetch-btn"]').simulate('click')

	// Tiny pause to allow moxios "fetch" data
	moxios.wait(() => {
		wrapped.update()
		expect(wrapped.find('li').length).toEqual(3)

		done()
		wrapped.unmount()
	})
})
