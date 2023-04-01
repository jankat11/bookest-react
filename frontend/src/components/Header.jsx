import { Col, Row, Navbar, Nav, Container } from "react-bootstrap";


const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark"  expand="sm">
        <Container >
          <Navbar.Brand className="px-2" href="#home">BOOKEST</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Login</Nav.Link>
              <Nav.Link href="#link">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
