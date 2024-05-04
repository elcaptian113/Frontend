
import api from "../api/api";

// create a record of activity
const addActivity = async (user) => {
    let response = await api.post('/courseactivity', user,{
        headers: {
            'content-type':'application/json'
        }
    }).then(response => {
        return response.data;
    });

    return response;
}

//get all activity by user order newist first
const getActivityByUser = async(user) => {
    let response = await api.get("/courseactivity/user/" +  user).then(response => {
        return response.data;
    });
    
    return response;
};

//get latest activity by user only
const getLatestByUser = async(user) => {
    let response = await api.get("/courseactivity/latest/" +  user).then(response => {
        return response.data;
    });
    
    return response;
};

export { addActivity, getActivityByUser, getLatestByUser }