import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [registerEnabled, setRegisterEnabled] = useState(false);

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);

        if (username.length <=5) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);

        if (password.length < 6) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;


        if (email !== "" && regex.test(email)) {
            setRegisterEnabled(true);
        } else {
            setRegisterEnabled(false);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const data = {
            'username': username,
            'password': password,
            'email': email,
        };

        try {
            const response = await axios.post('http://localhost:9001/auth/register',data);
            //console.log(response)

            navigate("/login");
            setError("");
        } catch (error) {
            // console.log(error);
            setError(error.response.data.message)

        }

    }

    return (
        <>
            <Container>
                <div className='login-box shadow-sm rounded'>

                    <div className="text-center mb-5">
                        <h2>User Register</h2>
                    </div>

                    <Form onSubmit={handleRegister} >
                        <FloatingLabel controlId="username" label="Select a Username" className='mb-3'>
                            <Form.Control placeholder='Select a Username' value={username} onChange={handleUsername} />
                        </FloatingLabel>

                        <FloatingLabel controlId="passsword" label="Enter your Password" className='mb-3'>
                            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={handlePassword} />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Enter your Email Address" className="mb-3">
                            <Form.Control type="email" placeholder='Enter your Email Address' value={email} onChange={handleEmail} />
                        </FloatingLabel>

                        {error &&
                            <div className="text-danger mb-3"> {error}</div>
                        }

                        <div className='text-end'>
                            <Button type="submit" varient='primary' disabled={!registerEnabled} > Register </Button>
                        </div>

                    </Form>

                </div>

            </Container>
        </>
    )
}

export default Register;