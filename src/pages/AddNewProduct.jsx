import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import PhotoUploader from "../components/PhotoUploader";
import { Navigate, useParams } from "react-router-dom";

const AddNewProduct = () => {
  const {id} = useParams();
  console.log('id of AddNew Product',id);
  const [title, setTitle] = useState("");
  const [catagory, setCatagory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirectToProductList, setRedirectToProductList] = useState(false);
  const {action} = useParams();

  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/api/products/myListings/'+id).then(response =>{
       const {data} = response;
       setTitle(data.title);
       setCatagory(data.catagory);
       setPrice(data.price);
       setDescription(data.description);
       setAddedPhotos(data.photos);
       
      })
  },[id])

  async function saveProduct(e) {
    e.preventDefault();
    const productData = { 
      title,
      catagory,
      addedPhotos,
      price,
      description,
    };

    if(id){
      //update
       await axios.put("/api/products/myListings", {
        id,
        ...productData
      });
      setRedirectToProductList(true);
    }else if(id === undefined){
      //newproduct
     await axios.post("/api/products/myListings",  { 
    
      title,
      catagory,
      addedPhotos,
      price,
      description,
    });
      setRedirectToProductList(true);
    }else{      console.log(console.error() )
    }
   
  }

  if (redirectToProductList && action!=='addNewProduct') {
    return <Navigate to={'/api/users/profile/myListings'}></Navigate>;
  }



 

  return (
    <div>
      <form onSubmit={saveProduct}>
      
        <h2 className="text-2xl mt-4">Title:</h2>
        <p className="text-gray-500 text-sm">Name and Model of your product</p>
        <input
          type="text"
          placeholder="Title or Product Name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <h2 className="text-2xl mt-4">Catagory:</h2>
        <p className="text-gray-500 text-sm">Select category</p>

        <div className="grid grid-cols-2 md:grid-cols-6">
          <label
            className="flex border p-4 rounded-2xl gap-2"
            htmlFor="cell Phone"
          >
            <input
              type="radio"
              name="catagory"
              id="cell Phone"
              value="cell Phone"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>

            <span>Cell Phone</span>
          </label>
          <label className="flex border p-4 rounded-2xl gap-2" htmlFor="laptop">
            <input
              type="radio"
              name="catagory"
              id="laptop"
              value="laptop"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>

            <span>Laptop</span>
          </label>
          <label
            className="flex border p-4 rounded-2xl gap-2"
            htmlFor="other electronic gadgeget"
          >
            <input
              type="radio"
              name="catagory"
              id="other electronic gadgeget"
              value="other electronic device"
              onChange={(e) => setCatagory(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Other eletronic device</span>
          </label>
        </div>

        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm">more=better</p>
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div className="py-10 mt-10">
          <h2 className="text-2xl mt-10 ">Price</h2>
          <p className="text-gray-500 text-sm">price in Euro</p>
          <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm"> product details</p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="w-full border my-1 py-2 px-3 rounded-2xl"
        ></textarea>

        <div className="flex justify-center">
          <button className="bg-primary text-white w-100 h-10 px-11 rounded ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
