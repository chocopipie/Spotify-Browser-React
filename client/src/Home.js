import About from './About'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ControlledCarousel from './ControlledCarousel';
import { useState } from 'react';
import TrackList from './TrackList';

function Home() {
    const [searchKey, setSearchKey] = useState('');
    const [searchType, setSearchType] = useState('artist');
    const [artistSearch, setArtistSearch] = useState(false);
    const [albumSearch, setAlbumSearch] = useState(false);
    const [trackSearch, setTrackSearch] = useState(false);
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)

    function Search() {
        setIsPending(true) 
        if (searchType === 'artist') {
            setAlbumSearch(false)
            setTrackSearch(false)
            setArtistSearch(true)
        }
        else if (searchType === 'album') {
            setTrackSearch(false)
            setArtistSearch(false)
            setAlbumSearch(true)
        }
        else if (searchType === 'track') {
            setAlbumSearch(false)
            setArtistSearch(false)
            setTrackSearch(true)
        }
        // fetch data
        fetch(`http://localhost:8888/search/${searchType}/${encodeURIComponent(searchKey)}`)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data for that resource')
            }
            return res.json();
        }).then(data => {
            //console.log(data)
            setData(data)
            setIsPending(false);
        }). catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message)
            }
        })
        console.log(searchKey)
        console.log(searchType)
    }

    return (
        <Container>
            <Row>
                <Col lg={7}><About /></Col>
                <Col>
                    <h1>Search Spotify</h1>
                    <Form className="mt-3">
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" required value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="w-50" aria-label="Default select example">
                                    <option value="artist">artist</option>
                                    <option value="album">album</option>
                                    <option value="track">track</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button onClick={Search}>
                            Search
                        </Button>
                    </Form>
                   
                    {isPending === false && artistSearch && data && <ControlledCarousel data={data} searchType={searchType}/>}
                    {isPending === false && albumSearch && data && <ControlledCarousel data={data} searchType={searchType}/>}
                    {isPending === false && trackSearch && data && <TrackList data={data} type="homeTrack" hideAlbum={false} hideArtist={false} />}  
                
                </Col>

            </Row>
        </Container>
  );
}

export default Home;