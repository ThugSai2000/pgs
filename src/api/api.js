import axios from "axios"

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://192.168.29.110:5000/api'
  });
  
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const userRegistration = async ()=>{

        const response=instance.post("/user/register", {fullName,phone,password})
        return response.data
        
}

const addHostel = async () => {
    const response=instance.post('/hostel/add-hostel',{ownerId,name,image,type,address,email,contactNumber,facilities})
    return response.data
}