import React from 'react'
import styled from 'styled-components'

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

function MovieTitle( {title} : {title: string}){
    return <Title>{title}</Title>
}

function MovieOverView( {overview} : {overview: string}){
    return <Overview>{overview}</Overview>
}

function MovieRating( {rating} : {rating: number|string}){
    return <Rating>{rating}/10</Rating>
}

function MoviePoster( {url, alt}: {url: string, alt:string}){
    return <Poster src={url} alt={alt}/>
}

export default function Movie( {movie}:any ) {

    let poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path 

    return (
        <Container>
            <MovieCard>
                <MovieInfos>
                    <MovieTitle title={movie.title}/>
                    <MovieOverView overview={movie.overview}/>
                    <MovieRating rating={movie.vote_average}/>
                </MovieInfos>
                <MoviePoster url={poster_src} alt={movie.title}/>
            </MovieCard>
        </Container>
    )
}
