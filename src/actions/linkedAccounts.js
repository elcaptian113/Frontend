
import api from "../api/api";

//get by student id

const getLinkByStudent = async(student) => {
    let response = await api.get("/linkedaccounts/student" +  student).then(response => {
        return response.data;
    });
    
    return response;
};

//get by parent id

const getLinkByParent = async(parent) => {
    let response = await api.get("/linkedaccounts/parent" +  parent).then(response => {
        return response.data;
    });
    
    return response;
};

//create request

const createRequest = async (request) => {
    let response = await api.post("/linkedaccounts", request,{
        headers: {
            'content-type':'multipart/form-data'
        }
    }).then(response => {
        return response.data;
    });

    return response;
}

//approve request (update)

const approveRequest = async (request) => {
    let response = await api.put("/linkedaccounts", request,{
        headers: {
            'content-type':'multipart/form-data'
        }
    }).then(response => {
        return response.data;
    });

    return response;
}

//decline request (delete)
const deleteRequest = async (request) => {
    let response = await api.delete("/linkedaccounts", {data: {id:request}}
    ).then(response => {
        return response.data;
    });

    return response;
}

export { getLinkByParent, getLinkByStudent, createRequest, approveRequest, deleteRequest }