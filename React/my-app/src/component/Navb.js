import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { decremental, incremental } from "./slicefile";

export default function Navb() {
  const obj = useSelector((state) => state.myobj);
  const [showNavItems, setShowNavItems] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check the current path and update navigation visibility
    if (location.pathname === '/login') {
      setShowNavItems(false);
    } else {
      setShowNavItems(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid className="bg-dark text-white" >
          <Navbar.Brand >ETMS </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse >
          <Nav className="ms-auto">
         <Nav.Link as={Link} to="/" onClick={() => { console.log(obj.id); dispatch(incremental(10)); }}>Home</Nav.Link>
         </Nav>
            {showNavItems && (
              <Nav className="ms-1">
                <Nav.Link as={Link} to="/admin">About Us</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
