import axios from 'axios';
import React, { useState } from 'react';
import {
    useForm
} from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const onSubmit = data => {
      console.log(data)
    const eventData = {
      name: data.name,
      img: imageURL
    }
    console.log(eventData)
    const url = `http://localhost:5000/addEvent`;
    
    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(eventData)
    })
    .then(res => console.log('server side response', res))
    
    
  };


  const handleImgUpload = event => {
      console.log(event.target.files[0])
      const imgData = new FormData();
    imgData.set('key', '4b71c669cf5b7cfcc03f31a47c74e09a');
    imgData.append('image', event.target.files[0])
    
    axios.post('https://api.imgbb.com/1/upload', imgData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    return (
       
      <form onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue="New Event" ref={register} /> <br/>
      

      <input name="img" type="file" onChange={handleImgUpload} /> <br/>

      
      <input type="submit" value="Sumbit" />
    </form>
       

    );

}

export default AddEvents;