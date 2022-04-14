import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  async function deleteHandler(){
      const response = fetch(`https://react-http-adc70-default-rtdb.firebaseio.com/movies.json/`,{
        method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(props.id)
   });
       console.log((await response));
  }
  return (
    <li className={classes.movie}>
      <h2>{props.id}</h2>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
