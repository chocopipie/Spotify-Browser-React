import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from "react";
import TrackList from "./TrackList";
import ControlledCarousel from "./ControlledCarousel";


const ArtistPage = () => {
    const {id} = useParams();
    // fetch data
    const {data} = useFetch(`http://localhost:8888/artist/${id}`)
    const {data: topTrack} = useFetch(`http://localhost:8888/artist-top-tracks/${id}`)
    const {data: similarArtist} = useFetch(`http://localhost:8888/artist-related-artists/${id}`)
    const {data: album} = useFetch(`http://localhost:8888/artist-albums/${id}`)
    // state varibles to render
    const [genre,setGenre] = useState(null)

    useEffect(() => {
       if (data !== null) {
        setGenre(data.genres)
       }
    }, [data])


    return (
        <div className="artist-page mx-3">
            {data !== null && 
            <>
                <Row>
                    <Col lg={5}>
                        <h1>{data.name}</h1>
                        {data.images.length > 0 && <Image src={data.images[0].url} width="500"></Image>}
                        <div className="mt-3">
                            <Button variant="success" href={`${data.external_urls.spotify}`}>Open {data.name} on Spotify</Button>
                        </div>
                    </Col>
                    {genre !== null && genre.length > 0 &&
                    <Col lg={2}>
                        <h3>Genres</h3>
                        <ul>
                        {genre.map((eachGenre, index) => (
                            <li key={index}>{eachGenre}</li>
                        ))}
                        </ul>
                    </Col> }
                    <Col>
                        {topTrack !== null && <TrackList data={topTrack} type="artistTrack" hideAlbum={false} hideArtist={false}/>}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={4}>
                        <h2>Albums</h2>
                        {album !== null && <ControlledCarousel data={album} searchType="artist-album" />}
                    </Col>
                    <Col lg={4} className="mx-auto">
                        <h2>Similar Artists</h2>
                        {similarArtist !== null && <ControlledCarousel data={similarArtist} searchType="similar-artist" />}
                    </Col>
                </Row>
            </>
            }
        </div>
    )
}

export default ArtistPage;