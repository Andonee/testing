import axios from 'axios'
import { FETCH_COMMENTS, SAVE_COMMENT } from './types'

export function saveComment(comment) {
	return {
		type: SAVE_COMMENT,
		payload: comment,
	}
}

export function fetchComments() {
	const response = axios.get('http://jsonplaceholder.typicode.com/comments')

	return {
		type: FETCH_COMMENTS,
		payload: response,
	}
}
