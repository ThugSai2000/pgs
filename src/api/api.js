import axios from "axios"


// const userRegistration = async ()=>{

//         const response=instance.post("/user/register", {fullName,phone,password})
//         return response.data
        
// }

// const addHostel = async () => {
//     const response=instance.post('/hostel/add-hostel',{ownerId,name,image,type,address,email,contactNumber,facilities})
//     return response.data
// }
 
export const addHostel = async (formData) => {
    const { 
      hostelName,
      hostelType,
      address,
      contactNumber,
      email,
      facilities,
      images } = formData;

      const facility = await facilities.map((facility) => facility)
      console.log(facility);
      

      const image = await images.map((image) => image.name)
      console.log(image);
      
      
    const response = await axios.post('/hostel/add-hostel', {
      ownerId : 1,
      name: hostelName,
      images : JSON.stringify(image),
      type: hostelType,
      address: address,
      email: email,
      facilities: JSON.stringify(facilities),
      contactNumber: contactNumber,
    });
    return response.data;
  };
