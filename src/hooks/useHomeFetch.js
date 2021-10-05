// start custom hooks  with "use"

import  { useState, useEffect, useRef } from 'react';
import API from '../API';


// initial state to reset stuffs later
const initialState = {
	page: 0,
	results: [],
	tota_pages: 0,
	tota_results: 0
}

export const useHomeFetch = () => {

	const [searchTerm, setSearchTerm] = useState('');	
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	// console.log(searchTerm);

	const fetchMovies = async (page, searchTerm = '') => {
		try {
			setError(false);
			setLoading(true);

			const movies = await API.fetchMovies(searchTerm, page);
			
			// three dots is ES6 meaning when creating a new object its going to take all the properties from const movies and spread them out inside of the bobect ({...movies, })
			// a new state in react should always be provided with a new value and never be muted otherwise it won't trigger a re-render
			setState( prev => ({
				...movies,
				results: 
				   page > 1 ? [...prev.results, ...movies.results] : [movies.results]
			}))
		} catch (error) {
			setError(true)
		}
		setLoading(false)
	};

	//initial and search
	useEffect( () => {
		setState(initialState)
		fetchMovies(1, searchTerm)
	}, [searchTerm])
	// an empty dependency array so it runs just once on the initial render

	// load more
	// trigger only when the page is actually loading more data
	useEffect(() => {
		if (!isLoadingMore) return;

		// load the next page
		fetchMovies(state.page + 1, searchTerm);
		setIsLoadingMore(false);
	}, [isLoadingMore, searchTerm, state.page]);

	return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore }
}

