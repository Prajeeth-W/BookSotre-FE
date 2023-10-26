import { useEffect, useState } from "react";
import { getUserById, getUsers, createUser } from "../services/userService";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

const User = () => {

    const [users, setUsers] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const userRequest = async () => {
        const res = await getUsers();    //getUsers async function at userService.js
        console.log(await res);
        await setUsers(res);
    }

    useEffect(() => {

        userRequest();

    }, []);

    const getUserDetails = async (id) => {
        const res = await getUserById(id);
        setUserDetail(res);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //validate

        const data = {
            'userName': userName,
            'password': password,
            'email': email
        }

        const res = await createUser(data);
        //console.log(res);
        if(res){
            setUserName("");
            setEmail("");
            setPassword("");

            userRequest();      // commented this in the video 
        }
    }

    return (
        <div>
            <h2>User </h2>

            <Row>
                <Col lg={6}>
                    <ListGroup>
                        {users && users.map((user) => {
                            return (
                                <ListGroup.Item>

                                    <Row>
                                        <Col lg={6}>
                                            {user.userName}
                                        </Col>

                                        <Col lg={6} className="text-end">
                                            <Button type="button" variant="primary" onClick={() => {
                                                getUserDetails(user.id)
                                            }}> Show Details</Button>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>

                </Col>

                <Col lg={6}>
                    <div>
                        <h3>User Details</h3>

                        {userDetail &&
                            <div>
                                <div> User Name : {userDetail.userName} </div>
                                <div> Email : {userDetail.email} </div>
                            </div>
                        }
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text" value={userName} onChange={(event) => {
                                setUserName(event.target.value);
                            }} placeholder="UserName" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event) => {
                                setEmail(event.target.value);
                            }} placeholder="your@email.com" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(event) => {
                                setPassword(event.target.value);
                            }} placeholder="*********" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Save User</Button>
                    </Form>

                </Col>
            </Row>

            {/*             
             {users.map( (user) => {
                return(
                    <div> {user.userName} </div>
                )
            })}
             */}
        </div>
    )
}

export default User;