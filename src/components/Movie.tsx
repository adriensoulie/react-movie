import React from 'react'
import styled from 'styled-components'

type MovieType = {
    movie: {
        id: number,
        title: string,
        vote_average: number,
        poster_path: string,
        overview: string,
    }
}

const Container = styled.section`
    width: 100vw;
    display: flex;
    justify-content: center;
`

const MovieCard = styled.div`
    display: flex;
    margin: 30px;
    @media only screen and (max-width: 600px){
        display: block;
        margin: 15px;
      }
`

const MovieInfos = styled.div`
    display: block;
    text-align: left;
    width: 50vw;
    @media only screen and (max-width: 600px){
        width: 100%;
    }
`

const Poster = styled.img`
    margin-left: 30px;
    margin-right: 30px;
`
const Title = styled.h1`
`
const Overview = styled.p`
`
const Rating = styled.p`
`

export default function Movie( {movie}:MovieType ) {

    let poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path 
    return (
        <Container>
            <MovieCard>
                <MovieInfos>
                    <Title>{movie.title}</Title>
                    <Overview>{movie.overview}</Overview>
                    <Rating>{movie.vote_average}/10</Rating>
                </MovieInfos>
                <Poster key={movie.id} src={poster_src} alt={movie.title}/>
            </MovieCard>
        </Container>
    )
}
