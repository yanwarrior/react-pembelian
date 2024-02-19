import {Container, Nav, Navbar } from "react-bootstrap";
import {useContext} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import PropTypes from "prop-types";


const WidgetCommonNavbar = () => {
  const jwt = useJWT()

  const applcation = useContext(ContextApplication);

  const signOut = () => {
    jwt.signOut();
    applcation.setIsAuthenticated(false);
  }

  return (
    <Navbar expand="lg"  bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#">Sistem Pembelians</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {applcation.isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="#/">Barang</Nav.Link>
              <Nav.Link href="#/supplier">Supplier</Nav.Link>
              <Nav.Link href="#/pembelian">Pembelian</Nav.Link>
              <Nav.Link href="#/pembelian/hutang">Hutang</Nav.Link>
              <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}


export default WidgetCommonNavbar;