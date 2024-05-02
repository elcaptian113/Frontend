
import api from "../api/api";


const getUsers = async() => {
    let response = await api.get("/users" ).then(response => {
        return response.data;
    });
    
    return response;
};

export { getUsers}