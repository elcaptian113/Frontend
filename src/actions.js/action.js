import axios from "../api/axios";
import api from "../api/api";

const Logout = async (username) => {
    let response = await axios.delete("/logout", {data: {id:username}}
    ).then(response => {
        return response.data;
    });

    return response;
}

const getUsers = async() => {
    let response = await api.get("/users" ).then(response => {
        return response.data;
    });
    
    return response;
};

export { Logout, getUsers}