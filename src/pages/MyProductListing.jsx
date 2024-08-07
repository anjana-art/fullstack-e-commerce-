import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProfileNav from "../components/ProfileNav";

const MyProductListing = () => {
  const [products, setProducts] = useState([]);
    
  const {id}= useParams();
  console.log({id});

  useEffect(() => {
    axios.get("/api/products/myListings").then(({ data }) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="">
            <ProfileNav/>

            <div className="text-center mt-10 ">
      <Link
        className=" bg-primary text-white py-2 px-6 rounded-full inline-flex  gap-1 "
        to={"/api/products/myListings/addNewProduct"}
      >
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add New Product
      </Link>
      <div className="mt-4  " >
        {products.length > 0 &&
          products.map((product) => (
            <Link to={'/api/products/myListings/'+product._id}
              key={product.id}
              className="flex gap-4  cursor-pointer bg-gray-100 p-4 rounded-2xl m-10 w-90 h-80"
            >
              <div className="flex w-40  h-40 bg-gray-300   shrink-0">
                {product.photos.length > 0 && (
                  <img className="object-cover" src={'http://localhost:5555/uploads/'+product.photos[0]} alt="image here" />
                )}
              </div>
              <div className="grow-0 shrink">
              <h2 className="text-xl"> {product.title}</h2>
              <p className="text-sm mt-2 ">{product.description}</p>
              </div>
              <div className="flex gap-3">
                <h2>Price:</h2>
                <p>{product.price}</p>
              </div>
             
            </Link>
          ))}
      </div>
    </div>

    </div>
   
  );
};

export default MyProductListing;
