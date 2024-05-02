
import './NavBar.css';
import logo from './../../images/logo.JPG';
import brandLogo from './../../images/brandLogo.jpg';
import React from 'react';
import {Navbar, Container, Nav, NavDropdown, Form, Button} from 'react-bootstrap';
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
            nav('/');
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
                                    <Nav.Link as={Link} to="/">Login</Nav.Link>
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
                     <Navbar.Brand className='navigation-bar' as={Link} to="/"><img src={brandLogo} alt="Brand Logo"/></Navbar.Brand>
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
                     <Navbar.Brand className='navigation-bar' as={Link} to="/"><img src={brandLogo} alt="Brand Logo"/></Navbar.Brand>
                     <Navbar.Toggle className='navigation-bar' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                     <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-start flex-grow-1 pe-3">
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/subjects">Learn</Nav.Link>
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