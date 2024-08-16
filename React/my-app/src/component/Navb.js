import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setallprojobj, setclientobj, setobj, setprojobj, setteamobj } from "./slicefile";
import { refreshObj } from "./Refreshobj";

export default function Navb() {
  const obj = useSelector((state) => state.myobj.obj.login);
  const [Name, setUserName] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  
  const empobj = useSelector((state) => state.myobj.obj);
  const [userRole, setUserRole] = useState('');
  

  useEffect(() => {
    if (empobj) {
      setUserName(empobj.firstName || '');
    }
    if (obj && obj.role) {
      setUserRole(obj.role.role1 || '');
    }
  }, [obj, empobj]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setobj({}));
    dispatch(setteamobj({}));
    dispatch(setprojobj({}));
    dispatch(setclientobj({}));
    dispatch(setallprojobj({}));
    setUserName('');
    setUserRole('');
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ zIndex: 1000 }}>
        <Container fluid className="text-dark">
          <Navbar.Brand>ETMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="Admin-navbar-nav" />
          <Navbar.Collapse id="Admin-navbar-nav">
            {obj && ![`/${userRole}`].includes(location.pathname) && (
              <Nav className="me-auto">
                <Nav.Link as={Link} to={`/${userRole}`}>
                  <span className="text-info">{userRole}-Dashboard</span>
                </Nav.Link>
              </Nav>
            )}
            {(location.pathname === "/Admin" || location.pathname === "/MasterAdmin") && (
              <Nav className="me-auto">
                <NavDropdown title="Create" id="create-dropdown">
                  <NavDropdown.Item as={Link} to="/createEmp">Create Employee</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createProject">Create Project</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/createClient">Create Client</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View" id="view-dropdown">
                  <NavDropdown.Item as={Link} to="/viewEmp">View Employee</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/viewProject">View Project</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/viewClient">View Client</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Profile" id="profile-dropdown">
                  <NavDropdown.Item as={Link} to="/personalDetails">Personal Details</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">Change Password</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {location.pathname === "/" && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                {!obj && (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
              </Nav>
            )}
            {location.pathname === "/login" && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              </Nav>
            )}
            {location.pathname === "/about" && (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </Nav>
            )}
            {location.pathname === "/Manager" && (
              <Nav className="me-auto">
                <NavDropdown title="Create Employee" id="create-dropdown">
                  <NavDropdown.Item as={Link} to="/createEmp">Create Employee</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View" id="view-dropdown">
                  <NavDropdown.Item as={Link} to="/ViewTeamMembers">View Team Members</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/viewMyProject">View Project</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Profile" id="view-dropdown">
                  <NavDropdown.Item as={Link} to="/personalDetails">Personal Details</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">Change Password</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {location.pathname === "/Associate" && (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/ViewTeamMembers">Team Members</Nav.Link>
                <NavDropdown title="Profile" id="view-dropdown">
                  <NavDropdown.Item as={Link} to="/personalDetails">Personal Details</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">Change Password</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          
          </Navbar.Collapse>
          {["Admin", "Manager", "MasterAdmin", "Associate"].includes(userRole) && (
            <Nav className="ms-auto">
              {!["/", "/about"].includes(location.pathname) && <Nav.Link as={Link} to="/">Home</Nav.Link>}
              <Nav.Link className="me-1" onClick={() => refreshObj(dispatch, empobj)}><u>Refresh</u></Nav.Link>

              <Nav.Item className="d-flex align-items-center">
                <Navbar.Text className="me-3" style={{ color: "gold" }}>
                  Welcome {Name}
                </Navbar.Text>
                <Button variant="outline-light" className='bg-primary' onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
