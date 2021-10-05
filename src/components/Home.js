import React from 'react';

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'

//components
import HeroImage from './HeroImage';
import Grid from './grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

//hook
import { useHomeFetch } from '../hooks/useHomeFetch'

//image
import NoImage from '../images/no_image.jpg'


const Home = () => {
	const  { state, 
		loading, 
		error, 
		searchTerm, 
		setSearchTerm, 
		setIsLoadingMore 
	} = useHomeFetch()
	
	console.log(state);

	// if (error) return <div>Something went wrong ...</div>

	return(
		<>
			{!searchTerm && state.results[0] ?
			<HeroImage 
				image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`} 
				title={state.results[0].original_title}
				text={state.results[0].overview}
				/> 
			: null}
			<SearchBar setSearchTerm={setSearchTerm} />
			<Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
				{state.results.map((movie) => (
					<Thumb
						key={movie.id}
						clickable
						image={
							movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage
						}
						movieId={movie.id} 
					/>
				))}
			</Grid>
			{/* show spinner if loading is set to true, if set to false do nt display spinner display button instead */}
			{ loading && <Spinner /> }
			
			{/* do not want the button to show on the last page. so check that current page is less than total pages and also check nothing is being loaded cos when the page is loading the spinner should instead be shown*/}
			{state.page < state.total_page && !loading && (
				<Button text= "Load More" callback={() => setIsLoadingMore(true)}/>
			)}
		</>
	) 
}

export default Home