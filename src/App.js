import React, { useState, useEffect , useCallback, useRef} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const title = useRef();
  const opening = useRef();
  const date = useRef();

  const submitHandler=(event)=>{
    event.preventDefault();
    console.log(title.current.value);
    console.log(opening.current.value);
    console.log(date.current.value);
  }

  const fetchMoviesHandler= useCallback(async ()=>{

    setError(null);
    setIsLoading(true);
    try{
    
    const response = await fetch('https://swapi.py4e.com/api/films');
    if(!response.ok){
      throw new Error('Something went wrong !');
    }
    const data = await response.json();
        const transformedMovies = data.results.map((movieData)=>{
          return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_date
        };
      })
        setMovies(transformedMovies);
        
      }catch(error){
          setError(error.message);
      }
      setIsLoading(false);
    },[]);
    useEffect(()=>{fetchMoviesHandler()},[fetchMoviesHandler]);
    let content = <p>Found no movies</p>;
    if(error){
      content=<p> {error} </p>;
    }
     if(isLoading){
      content = <p>Loading...</p>;
     }
    if(movies.length>0){
      content=<MoviesList movies={movies} />;
    }
    
    

    
  return (
    <React.Fragment>
      <section>
        <form onSubmit={submitHandler}>
          <label>Title</label>
          <input ref={title} type='text'></input><br/><br/>
          <label>Opening Text</label>
          <input ref={opening} type='text'></input><br/><br/>
          <label>Release Date</label>
          <input ref={date} type='date'></input><br/><br/>
          <button >Add Movies</button>
        </form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {content}
      </section>
    </React.Fragment>
  );
}

export default App;
