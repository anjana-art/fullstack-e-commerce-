const express = require("express");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { User, Product } = require("../models/UserModel");
const toId = mongoose.Types.ObjectId;

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductsBySellerId,
} = require("../services/productService");

const productRouter = express.Router();

productRouter.get(" ", async (req, res) => {
  try {
    const product = await getProducts();

    res.send({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

productRouter.post(
  "",
  (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        status: "failure",
        data: "Missing auth token",
      });
    }

    next();
  },
  async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const [tokenType, token] = authorization.split(" ");
      const result = jsonwebtoken.verify(token, "MY_SUPER_STRONG_PASSWORD");

      if (!result) {
        return res.status(401).send({
          status: "failure",
          data: "Invalid auth token",
        });
      }
      req.userId = result.userId;
      req.email = result.email;
      req.permissions = result.permissions;

      next();
    } catch (error) {
      return res.status(401).send({
        status: "failure",
        data: error,
      });
    }
  },
  async (req, res, next) => {
    try {
      const { permissions } = req;
      const PERMISSION_CREATE_PRODUCT = "CREATE_PRODUCT";

      if (!permissions.includes(PERMISSION_CREATE_PRODUCT)) {
        return res.status(403).send({
          status: "failure",
          data: "No permission to create product",
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: "failure",
        data: error,
      });
    }
  },
  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      const newProduct = await createProduct({
        title,
        description,
        price,
      });

      res.send({
        status: "success",
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failure",
        data: error,
      });
    }
  }
);

productRouter.post("/myListings", (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, catagory, addedPhotos, price, description } = req.body;
    const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

    const productInfo = jsonwebtoken.verify(
      token,
      jwtSecret,
      {},
      async (err, userData) => {
        if (err) throw err;
        const seller = userData.id;
        const photos = addedPhotos;
        const productDoc = await createProduct({
          seller,
          title,
          catagory,
          photos,
          price,
          description,
        });
        console.log("created product", productDoc);
      }
    );
    res.json(productInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

productRouter.get("/myListings", (req, res) => {
  const { token } = req.cookies;
  const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    console.log("user seller by id", id);

    const product = await getProductsBySellerId(id);

    console.log(" getting all products product", product);

    res.json(product);

    /*  console.log(userData.id === productDoc.seller);
console.log('userdata.id', userData.id);
console.log('productDoc.seller', productDoc.seller)
  if (id === productDoc.seller.toString()) {

    const product = await getProductById(productDoc._id);
    console.log('product by id', product)

    res.json(product); 
    }else(console.log("error"))*/
  });
});

productRouter.get("/myListings/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getProductById(id));
});

productRouter.put("/myListings", async (req, res) => {
  const { token } = req.cookies;
  const { id, title, catagory, addedPhotos, price, description } = req.body;
  const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

  jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const productDoc = await getProductById(id);

    if (userData.id === productDoc.seller.toString()) {
      const photos = addedPhotos;

/* 
       productDoc.set({
        title,
        catagory,
        photos,
        price,
        description,
      });
      await productDoc.save(); */
      
       const {id} = userData;

     const updated =  await updateProduct({seller:id, title,
      catagory,
      photos,
      price,
      description,}); 
     console.log("Successfully Updated Product:", updated); 

      res.json("ok");
    } else{
      console.log("Not authorized to make a change");
    }
  });
});

module.exports = productRouter;
