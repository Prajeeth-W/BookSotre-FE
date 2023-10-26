import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import { getRequest, postRequest } from "../../services/ApiService";

const Books = () => {
    const [books, setBooks] = useState(null);

    const [bookName, setBookName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getAllBooks = async () => {
            const response = await getRequest("/books");
            setBooks(response.data);
        }

        getAllBooks();
    }, []);

    const addBook = async (event) => {
        event.preventDefault();

        const data = {
            "title": bookName,
            "qty": qty,
            "price": price,
        }

        const response = await postRequest("/books",data);

        if(response && response.status === 201){
            setBooks([...books,response.data]);
            handleClose();
            setBookName("");
            setPrice(0);
            setQty(0);

        } else {
            //show Error
        }
    }

    return (
        <>
            <Container>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Qty Available</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {books && books.map(book => {
                            return (
                                <tr>  
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.price}</td>
                                    <td>{book.qty}</td>
                                    <td>
                                        <Button variant="secondary" size="sm" >Edit</Button>&nbsp;
                                        <Button variant="danger" size="sm" >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <div className='text-end'>
                    <Button variant='primary' size='sm'onClick={handleShow}>Add Book</Button>
                </div>

            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = {addBook}>
                        <FloatingLabel id = "BookName" label = "Name of the Book" className="mb-3">
                            <Form.Control placeholder="Name of the Book" value={bookName} onChange={(event) => {
                                setBookName(event.target.value)
                            }}/>
                        </FloatingLabel>

                        <FloatingLabel id = "BookPrice" label = "Price" className="mb-3">
                            <Form.Control placeholder="Price" value ={price} onChange={(event) => {
                                setPrice(event.target.value)
                            }}/>
                        </FloatingLabel>

                        <FloatingLabel id = "BookQty" label = "Stock Qty" className="mb-3">
                            <Form.Control placeholder="Stock Qty" value={qty} onChange={(event) => {
                               setQty (event.target.value)
                            }} />
                        </FloatingLabel>

                        <Button type = "submit" variant="primary">Save</Button>
                    </Form>
                </Modal.Body>

                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}

export default Books;