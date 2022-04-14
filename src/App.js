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
    const movie ={
      title:title.current.value,
      openingText:opening.current.value,
      releaseDate:date.current.value
    }
    addMovie(movie);
  }

  async function addMovie(movie){
    const response = await fetch('https://react-http-adc70-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const fetchMoviesHandler= useCallback(async ()=>{

    setError(null);
    setIsLoading(true);
    try{
    
    const response = await fetch('https://react-http-adc70-default-rtdb.firebaseio.com/movies.json');
    if(!response.ok){
      throw new Error('Something went wrong !');
    }
    const data = await response.json();
    console.log(data);
    const loadedData = [];
   
    for(const key in data){
      
      loadedData.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      });
    }
       
        setMovies(loadedData);
        
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
      content=<MoviesList  movies={movies} />;
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
