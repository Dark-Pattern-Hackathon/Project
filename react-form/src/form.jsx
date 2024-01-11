import { useState } from "react";
import axios from "axios";
export default function Form(){

    const [formData,setFormData]=useState({WebSite:'',Topic:'',Description:'',Avoid:''});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        // console.log(formData);
        setFormData((prevFormData)=>{
            return { ...prevFormData, [name]:value,}

    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await axios.post('', formData);
                setFormData({WebSite:'',Topic:'',Description:'',Avoid:''});

                if (response.status === 200) {
                    // Request was successful
                    console.log(response.data.message);
                } else {
                    // Handle errors here
                    console.error('Request failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }

    };
    return(
        <div className="flex-col justify-center mb-40 mt-20 ml-80 left-[300px] w-[800px] h-[500px] shadow-md pt-7 ">
            <div className="text-center text-[20px] font-bold text-3xl">Enter the dark pattern details below.</div>
            
            
            
            <form onSubmit={handleSubmit} id='form'>
            <div>
            <input onChange={handleChange} value={formData.WebSite} name="WebSite" className="outline-none left-10 mt-10 mr-10 text h-10 w-[525px] border-black border-b-[1px] rounded-sm ml-40" placeholder="Enter the Webpage URL"></input>
            </div>
            <div><input onChange={handleChange} value={formData.Topic} name="Topic" className="outline-none w-[525px] mt-7 text h-10 border-black border-b-[1px] rounded-sm ml-40" placeholder="Enter the Topic of Dark Pattern"></input></div>
            <div><input onChange={handleChange} value={formData.Description} name="Description" className="outline-none w-[525px] mt-7 text h-10 border-black border-b-[1px] rounded-sm ml-40" placeholder="Give Description"></input></div>
            <div><input onChange={handleChange} value={formData.Avoid} name="Avoid" className="outline-none w-[525px] mt-7 text h-10 border-black border-b-[1px] rounded-sm ml-40" placeholder="How to get around the pattern"></input></div>

            <button type='submit' className="transition ease-in-out mt-20 h-10 w-40 ml-[350px] text-white bg-black rounded-md hover:bg-white hover:text-black hover:border-black border-[1px] duration-500">Submit</button>
            </form>
        </div>)
    }

