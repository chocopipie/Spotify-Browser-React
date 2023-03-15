import About from './About'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ControlledCarousel from './ControlledCarousel';
import { useState } from 'react';

function Home() {
    const [searchKey, setSearchKey] = useState('');
    const [searchType, setSearchType] = useState('artist');
    const [artistSearch, setArtistSearch] = useState(false);
    const [albumSearch, setAlbumSearch] = useState(false);
    const [trackSearch, setTrackSearch] = useState(false);

    function Search() {
        console.log(searchKey)
        console.log(searchType)
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
        if (searchType === 'track') {
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
            console.log(data)
        }). catch(err => {
            console.log(err.message)
        })
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
                   
                    {artistSearch && <ControlledCarousel />}
                    {albumSearch && <div>hi</div>}
                    {trackSearch && <div>ba</div>}  
                
                </Col>

            </Row>
        </Container>
  );
}

export default Home;