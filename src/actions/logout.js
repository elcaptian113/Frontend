import axios from "../api/axios";


const Logout = async (username) => {
    let response = await axios.delete("/logout", {data: {id:username}}
    ).then(response => {
        return response.data;
    });

    return response;
}

export { Logout }