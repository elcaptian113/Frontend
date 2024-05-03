
import './NavBar.css';
import brandLogo from './../../images/brandLogo.jpg';
import React from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {Link, useNavigate,} from 'react-router-dom';
import { Logout } from '../../actions/logout';



function NavBar() {

    const nav = useNavigate();

    const role = localStorage.getItem('usertype');
    const username = localStorage.getItem('username');

    const logout = (e) => {

        let user = username;
        let response = Logout(user);
        localStorage.clear();
        if (response){
            nav('/login');
            window.location.reload(false);
        }
    }



  
    if (!username){
        return(
            <div className='navigation-bar'>
            
                <>
                {[false].map((expand) => (
                    <Navbar collapseOnSelect expand="lg" className="mb-3">
                        <Container className='navigation-bar' fluid>
                            <Navbar.Brand className='navigation-bar' as={Link} to="/"><img src={brandLogo} alt="Brand Logo"/></Navbar.Brand>
                            <Navbar.Toggle className='navigation-bar' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="justify-content-start flex-grow-1 pe-3">
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/Register">Register</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
            ))}
            </>
            </div>
        )
    }
    else if (username && role == "ADMIN"){
        return(
            <div className='navigation-bar'>

                <>
                {[false].map((expand) => (
                    <Navbar collapseOnSelect expand="lg" className="mb-3">
                     <Container className='navigation-bar' fluid>
                     <Navbar.Brand className='navigation-bar' as={Link} to="/home"><img src={brandLogo} alt="Brand Logo"/></Navbar.Brand>
                     <Navbar.Toggle className='navigation-bar' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                     <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                    </Nav>
                    <Navbar.Text className="justify-content-end">
                            Signed in as: {localStorage.getItem('username')}
                            <Button onClick={logout}>Logout</Button>
                    </Navbar.Text>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            ))}
            </>
            </div>
        )
    }
    else{
        return(
            <div className='navigation-bar'>
                
                <>
                {[false].map((expand) => (
                    <Navbar collapseOnSelect expand="lg" className="mb-3">
                     <Container className='navigation-bar' fluid>
                     <Navbar.Brand className='navigation-bar' as={Link} to="/profile"><img src={brandLogo} alt="Brand Logo"/></Navbar.Brand>
                     <Navbar.Toggle className='navigation-bar' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                     <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                        <Nav.Link as={Link} to="#">My Learning</Nav.Link>
                        <Nav.Link as={Link} to="/subjects">All Learning</Nav.Link>
                        <Nav.Link as={Link} to="/linkedaccounts">Linked Profiles</Nav.Link>
                    </Nav>
                    <Navbar.Text className="justify-content-right">
                        Signed in as: {localStorage.getItem('username')} 
                        <Button onClick={logout}>Logout</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            ))}
            </>
            </div>
        )
    }
        
}

export default NavBar;