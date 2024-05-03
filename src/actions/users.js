
import api from "../api/api";


const getUsers = async() => {
    let response = await api.get("/users" ).then(response => {
        return response.data;
    });
    
    return response;
};

const getByUserId = async(user) => {
    let response = await api.get("/users/" +  user).then(response => {
        return response.data;
    });
    
    return response;
};

const getByUsername = async(user) => {
    let response = await api.get("/users/username/" +  user).then(response => {
        return response.data;
    });
    
    return response;
};

export { getUsers, getByUserId, getByUsername}