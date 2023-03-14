import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">Spotify Browser</Navbar.Brand>
          <Nav className="ml-auto">
          <Button href="http://localhost:8888/login">Log in</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
 
export default NavBar;