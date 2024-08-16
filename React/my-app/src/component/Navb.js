import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setobj, setprojobj, setteamobj } from "./slicefile";

export default function Navb() {
  const obj = useSelector((state) => state.myobj.obj.login);
  const [Name, setUserName] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState('');
  const empobj = useSelector((state) => state.myobj.obj);

  const RefreshObj = async () => {
    try {
      const uid = empobj.login.username;
      const pwd = empobj.login.password;
      const response = await fetch('https://localhost:7018/ETMS/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, pwd }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.login === undefined) {
          setErr(data.err);
        } else {
          dispatch(setobj(data));
          console.log("data obj set");

          if (data.login.role.role1 === "Associate" || data.login.role.role1 === "Manager") {
            await fetch("https://localhost:7018/ETMS/team?pid=" + data.teamMembers[0].projectId)
              .then(res => res.json())
              .then(d => dispatch(setteamobj(d)));

<<<<<<< HEAD
            await fetch("https://localhost:7018/ETMS/project?pid=" + data.teamMembers[0].projectId)
              .then(res => res.json())
              .then(d => dispatch(setprojobj(d)));
            navigate('/Manager');
            console.log("refreshed obj set");
=======
        await fetch("https://localhost:7018/ETMS/project?pid=" + data.teamMembers[0].projectId)
            .then(res => res.json())
            .then(d => dispatch(setprojobj(d)))
            console.log("refreh obj seted")
>>>>>>> 6868dda68e11d949583f95043ea2014905c4546f
          }
        }
      } else {
        setErr('Login failed. Please try again.');
        console.log('API call failed:', response.status);
      }
    } catch (error) {
      setErr('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  }

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
<<<<<<< HEAD
=======
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

            {
              location.pathname === "/" && (
                <Nav className="ms-auto">

                  <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                  {!obj && (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}

                </Nav>
              )
            }
            {
              location.pathname === "/login" && (
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/about">About Us</Nav.Link>

                </Nav>
              )
            }
            {
              location.pathname === "/about" && (
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
              )
            }
            {
              location.pathname === "/Manager" && (
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
              )
            }
            {
              location.pathname === "/Associate" && (
                <Nav className="me-auto">
                  
                  <Nav.Link as={Link} to="/ViewTeamMembers">Team Members</Nav.Link>
                  <NavDropdown title="Profile" id="view-dropdown">
                    <NavDropdown.Item as={Link} to="/personalDetails">Personal Details</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="#">Change Password</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )
            }
>>>>>>> 6868dda68e11d949583f95043ea2014905c4546f
          </Navbar.Collapse>
          {["Admin", "Manager", "MasterAdmin", "Associate"].includes(userRole) && (
            <Nav className="ms-auto">
              {!["/", "/about"].includes(location.pathname) && <Nav.Link as={Link} to="/">Home</Nav.Link>}
              <Nav.Link className="me-1" onClick={RefreshObj}><u>Refresh</u></Nav.Link>
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
