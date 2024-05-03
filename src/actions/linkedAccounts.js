
import api from "../api/api";

//get by student id and pending status

const getLinkByStudentP = async(student) => {
    let response = await api.get("/linkedaccounts/studentp/" +  student).then(response => {
        return response.data;
    });
    
    return response;
};

//get by parent id and pending status

const getLinkByParentP = async(parent) => {
    let response = await api.get("/linkedaccounts/parentp/" +  parent).then(response => {
        return response.data;
    });
    
    return response;
};

//get by student id and approved status

const getLinkByStudentA = async(student) => {
    let response = await api.get("/linkedaccounts/studenta/" +  student).then(response => {
        return response.data;
    });
    
    return response;
};

//get by parent id and approved status

const getLinkByParentA = async(parent) => {
    let response = await api.get("/linkedaccounts/parenta/" +  parent).then(response => {
        return response.data;
    });
    
    return response;
};

//create request

const createRequest = async (request) => {
    console.log(request);
    let response = await api.post("/linkedaccounts", request,{
        headers: {
            'content-type':'application/json'
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
            'content-type':'application/json'
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

export { getLinkByParentP, getLinkByParentA, getLinkByStudentP, getLinkByStudentA, createRequest, approveRequest, deleteRequest }