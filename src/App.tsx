import React, { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './components/GlobalStyles' 
import { lightTheme, darkTheme } from './components/Theme'
import styled from 'styled-components'
import Movie from './components/Movie'
import './App.css';

const Header = styled.section`
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Title = styled.h1`
  color: white;
`

const TogglerContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right: 15px;
`

const ArrowContainer = styled.div`
  position: absolute;
  left: 0;
  margin-left: 15px;
`

const MoviesSection = styled.section`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`

const MoviesContainer = styled.div`
  width: 70vw;
  @media only screen and (max-width: 800px){
    width: 100vw;
  }
`


const MovieSearchInput = styled.input`
  width: 65vw;
  border-radius: 3px;
  border-style: solid;
  border-color: DimGray;
  padding: 5px;
  @media only screen and (max-width: 600px){
    width: 90%;
    padding: 5px;
  }
`

const Main = styled.section`
  background-color: ${props => props.color};
  min-width: 100vw;
  min-height: 100vh;
`

const Container = styled.section`
  margin-top: 30px;
`

const Poster = styled.img`
  margin: 5px;
  @media only screen and (max-width: 800px){
    width: 160px;
    margin-left: 5px;
    margin-right: 2px;
  }
`

function App() {
  const [ theme, setTheme ] = useState('light')
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const [ movies, setMovies ] = useState([])
  const [ selectedMovie, setSelectedMovie ] = useState({})
  const [ error, setError ] = useState()
  const HeaderBackgroundColor = theme === 'light' ? "#60A5FA" : "#1F2937"  

  useEffect(()=> {
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=a8e92388eb2945321442a186305056d9")
      .then(res => res.json())
      .then(
        (result) => setMovies(result.results),
        (error) => setError(error)
      )
  },[])

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const searchTerm = event.currentTarget.value
    performSearch(searchTerm)
  }

  function performSearch(searchTerm: string) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=a8e92388eb2945321442a186305056d9&query=" + searchTerm
    fetch(urlString)
    .then(res => res.json())
    .then(
      (result) => setMovies(result.results),
      (error) => setError(error)
    )
  }


  type MovieType = {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    overview: string,
  }

  const moviesList = movies ? 
    movies.map((movie:MovieType) => {
    let poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path 
    return ( 
      <Link key={movie.id} to="/movie">
        <Poster title={movie.title} onClick={()=>setSelectedMovie(movie)} key={movie.id} src={poster_src} alt={movie.title}/>
      </Link>
    )
  }) : null

  return (
       <Router>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
          <div className="App">
            <Header color={HeaderBackgroundColor}>
            {selectedMovie ?
              <ArrowContainer>
                <Link to="/">
                  <span className="material-icons material-icons-outlined">
                      arrow_back_ios_new
                  </span>
                </Link>
              </ArrowContainer>
              : null
            }
              <Title>
                Movies
              </Title>
              <TogglerContainer onClick={themeToggler}>
                <ThemeToggle mode={theme}/>
              </TogglerContainer>
            </Header>
            <Main>
              <Switch>
                <Route path="/movie">
                  <Movie movie={selectedMovie}/>
                </Route>

                <Route path="/">
                  <Container>
                    <MovieSearchInput type="search" onChange={handleChange} placeholder="Let's look for a movie !"/>
                    <MoviesSection>
                      <MoviesContainer>
                        {moviesList}
                      </MoviesContainer>
                    </MoviesSection>
                  </Container>
                </Route>
              </Switch>
            </Main>
          </div>
        </ThemeProvider>
      </Router>
  );
}

export default App;

