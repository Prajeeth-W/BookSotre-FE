import axios from "axios";

const base_url = "http://localhost:9001";
const token = sessionStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` ;

export const getRequest = async (path) => {
    try {
        const response = await axios.get(base_url+path);
        return response;
    } catch (error) {
        if(error.response.status === 401) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("user_id");

            window.location.href = "/login";
        }
    }
}

export const postRequest = async (path,data) => {
    try {
        const response = await axios.post(base_url+path,data);
        return response;
    } catch (error) {
        if(error.response.status === 401) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("user_id");
            
            window.location.href = "/login";
        }
    }
}

export const postRequestFile = async (path,data) => {
    try {
        const response = await axios.post(base_url+path,data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    } catch (error) {
      
        
    }
}
