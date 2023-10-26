import axios from "axios";

export const getBooks = async () => {
    try {
        const response = await axios.get("http://localhost:9001/books");
        return response.data;
    } catch (error) {
        return(error);
    }
}