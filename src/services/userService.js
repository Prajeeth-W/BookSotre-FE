import axios from 'axios';

export const getUsers = async() => {
    try {
        const response = await axios.get("http://localhost:9001/user")  ; 
        return await response.data;  
    } catch (error) {
        return error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get("http://localhost:9001/users/"+id);
        return await response.data;
    } catch (error) {
        return error;
    }
}

export const createUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:9001/users",data);
        return await response.data;
    } catch (error) {
        return(error);
    }
}