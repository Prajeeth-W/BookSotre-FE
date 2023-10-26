import { useEffect, useState, React } from "react";
import { getBooks } from "../../services/bookService";
import { Row, Col, Button, Table, Modal, Form, FormGroup, FormSelect } from "react-bootstrap";
import { getUsers } from "../../services/userService";
import { createOrder } from "../../services/orderService";

import HomeCarousel from './HomeCarousel';

import CartIcon from "../Cart/CartIcon";
import { MyContext } from "../../MyContext";

const Home = (props) => {

    const [books, setBooks] = useState(null);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(null);
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState(null);

    const [orderData, setOrderData] = useState(null);

    const [text, setText] = useState("First text");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        const fetchBook = async () => {
            const response = await getBooks();
            setBooks(response);
        }

        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response);
        }

        fetchBook();
        fetchUsers();

    }, []);

    const handleOrder = (book) => {
        /* const orderArray = order;
        orderArray.push(book);

        setOrder(orderArray); */

        const updatedArray = [...order, book];

        setOrder(updatedArray);
        console.log(order);

        const updatedTotal = total + book.price;
        setTotal(updatedTotal);


    };

    const handleUser = (event) => {
        setSelectedUser(event.target.value);

        console.log(event.target.value + " Selected User ><<");
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            id: "1",                    //  !!! CHeck this isssue again !!!
            status: status,

            user: {
                id: selectedUser        // යුසර් අයිඩි දුන්නම යුසර් ඩිටෙල්ස් සේරම පෙන්නේ කොහොමද ?
            },
            books: order
        }
        const response = await createOrder(data);

        if (response) {
            handleClose();
            setOrder([]);
            setTotal(0);
        }
        //console.log(response);
    };


    return (
        <div>
            <div>{props.propValue}</div>

            <div>
                <HomeCarousel />

            </div>

            <h1>BOOKS</h1>

            <Row>
                {books && books.map(book => {
                    return (
                        <Col key={book.id}>
                            <div className="book">
                                <h3> {book.title}</h3>
                                <h4>Rs.{book.price}</h4>

                                <Button variant="primary" size="sm" onClick={() => {
                                    handleOrder(book)
                                }}>Add Cart</Button>

                            </div>
                        </Col>
                    )
                })}
            </Row>

            <h2 className="mt-4">Order Detils</h2>

            <Table>
                <thead>
                    <th> Id</th>
                    <th>Item</th>
                    <th className="text-end"> Price</th>
                </thead>

                <tbody>

                    {order && order.map(book => {
                        return (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td className="text-end">{book.price}</td>
                            </tr>
                        )
                    })}

                    <tr className="mt-3">
                        <th colSpan={2}> Total</th>
                        <th className="text-end"> {total}</th>
                    </tr>
                </tbody>

            </Table>

            <div className="text-end">
                <Button variant="primary" onClick={handleShow}> Complete Order</Button>
            </div>

            <Modal show={show} onHide={handleClose} className="m-3">

                <Modal.Header closeButton>
                    <Modal.Title>Order Complete</Modal.Title>
                </Modal.Header>

                <Modal.Body>Please select the user who is creating this order. Set the order status and click on Complete</Modal.Body>

                <Form onSubmit={handleSubmit} className="m-3">
                    <Form.Group >
                        <Form.Label>Select User</Form.Label>
                        <Form.Select onChange={handleUser}>
                            <option value="">Please Select a User</option>

                            {users && users.map((user) => {
                                return (
                                    <option value={user.id} selected={user.id === selectedUser ? 'true' : 'false'}>
                                        {user.userName}
                                    </option>
                                )
                            })}

                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> Set Status</Form.Label>
                        <Form.Select onChange={handleStatus}>
                            <option value="">Select a Status</option>
                            <option value="Pending" selected={status === "Pending" ? 'true' : 'false'}> Pending</option>
                            <option value="Confirmed" selected={status === "Confirmed" ? 'true' : 'false'}> Confirmed</option>

                        </Form.Select>

                    </Form.Group>

                    <Button variant="primary" type="submit" className="text-end" > Save Order</Button>
                </Form>

            </Modal>

            <div>
                <MyContext.Provider value={{ text,setText }}>
                    <CartIcon />
                </MyContext.Provider>
            </div>

        </div>
    )
}

export default Home;