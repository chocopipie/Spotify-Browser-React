import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import TrackList from "./TrackList";

const AlbumPage = () => {
    const {id} = useParams();
    const {data} = useFetch(`http://localhost:8888/album/${id}`)
    const {data: tracks} = useFetch(`http://localhost:8888/album-tracks/${id}`)
    console.log(data)
    //console.log(tracks)
    return (
        <div className="artist-page mx-3">
            {data !== null && 
            <>
                <Row>
                    <Col lg={5}>
                        <h1>{data.name}</h1>
                        {data.images.length > 0 && <Image src={data.images[0].url} width="500"></Image>}
                        <div className="mt-2">
                            Artist: <a href={`/artist/${data.artists[0].id}`}>{data.artists[0].name}</a>
                        </div>
                        <div className="mt-3">
                            <Button variant="success" href={`${data.external_urls.spotify}`}>Open {data.name} on Spotify</Button>
                        </div>
                    </Col>
                    <Col>
                        {tracks !== null && <TrackList data={tracks} type="albumTrack" hideAlbum={true} hideArtist={true} />}
                    </Col>
                </Row>
            </>
            }
        </div>
    )
}

export default AlbumPage;