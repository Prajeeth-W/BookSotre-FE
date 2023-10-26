import { Link, Outlet } from "react-router-dom";
import { Container, Button, Form, Stack } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
//icons
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const Layout = () => {

    const navigate = useNavigate();

    const moveToCart = () => {     
        navigate("/cart");
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-secondary" sticky="top" >
                <Container>
                    <Navbar.Brand href="/"> 
                        <img 
                            className='shadow-2-strong' 
                            src={require('../components/Layout/logo.PNG')} 
                            alt="logo" width="150" 
                        /> 
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/user">User</Nav.Link>
                            <Nav.Link href="/help">Help</Nav.Link>
                            <Nav.Link href="/books">Books</Nav.Link>

                        </Nav>

                        <div>
                            <Stack direction="horizontal" gap={3}>

                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                                
                                <IconContext.Provider value={{ color: 'cornflowerblue', size: '2em' }}>
                                    <div className="p-2"> <FaUserCircle /> </div>
                                    
                                    <div className="p-2" onClick={() => {
                                        moveToCart()
                                    }}> <FaShoppingCart /> </div>
                                    

                                </IconContext.Provider>

                            </Stack>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Link to="/">Home </Link>
            <Link to="/user">User </Link>
            <Link to="/help">Help </Link> */}

            <Container className="py-4">
                <Outlet />
            </Container>


            <footer className="bg-body-tertiary py-3">
                <Container>
                    (Footer section)
                </Container>

            </footer>
        </div>
    )
}

export default Layout;