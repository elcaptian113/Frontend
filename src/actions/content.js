import axios from "../api/axios";


//get all subjects
const getSubjects = async() => {
    let response = await axios.get("/subjects" ).then(response => {
        return response.data;
    });
    
    return response;
};

//get chapter by subject
const getChapterBySubject = async(subject) => {
    let response = await axios.get("chapters/subject/" +  subject).then(response => {
        return response.data;
    });
    
    return response;
};

//get module by subject chapter
const getModuleByChapter = async(chapter) => {
    let response = await axios.get("modules/chapter/" +  chapter).then(response => {
        return response.data;
    });
    
    return response;
};



export { getSubjects, getChapterBySubject, getModuleByChapter }