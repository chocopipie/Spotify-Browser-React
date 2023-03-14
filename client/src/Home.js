import About from './About'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ControlledCarousel from './ControlledCarousel';

function Home() {
    function Search() {

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
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                                <Form.Select className="w-50" aria-label="Default select example">
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

                    <ControlledCarousel />
                </Col>

            </Row>
        </Container>
  );
}

export default Home;