import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getRequest, postRequest, postRequestFile } from '../services/ApiService';

const userId = sessionStorage.getItem('user_id');


const Profile = () => {

    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage ] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getRequest(`/user/${userId}`);

            if (response && response.status === 200) {
                setUser(response.data);
            }
            console.log("Test >> " + response.data);
        }

        fetchUser();
    }, [])

    const handleFileChange = (event) => {
        setProfileImage(event.target.files[0]);
    }

    const handleUpload = async (event) =>{
        event.preventDefault();
 
        const data = {
            "profileImage": profileImage
        }

        const response = await postRequestFile(`/user/${userId}/profile`,data);

        if(response && response.status === 200){
            setUser(response.data)
        }

    }

    return (
        <>
            <Container>
                <h1>User Profile</h1>
                {user &&
                    <Row>
                        <Col lg={6}>
                            Username :
                        </Col>
                        <Col lg={6}>
                            {user.username}
                        </Col>

                        <Col lg={6}>
                            Email :
                        </Col>
                        <Col lg={6}>
                            {user.email} 
                        </Col>

                        <Col lg={6}>
                            Profile Image :
                        </Col>
                        <Col lg={6}>
                            {/* {user.profileImage} */}
                            <img src = {`http://localhost:9001/uploads/${user.profileImage}`} width={100}/>

                            <Form onSubmit = {handleUpload}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Select Profile Image</Form.Label>
                                    <Form.Control type="file" onChange={handleFileChange}/>
                                </Form.Group>
                                <Button type="submit" variant="primary"> Change </Button>
                            </Form>
                        </Col>

                    </Row>
                }
            </Container>
        </>
    )
}

export default Profile;