const mongoose = require("mongoose");
const Product = require('../models/ProductModel');
const ProductModel = require('../models/ProductModel');
const productId = mongoose.Schema.Types.ObjectId


const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

const getProducts = async () => {
  try {
    await mongoose.connect(CONNECTION_URI);

    return await Product.find();
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

const getProductById = async (id) => {
  try {
    await mongoose.connect(CONNECTION_URI);

    return await Product.findById(id);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

const getProductsBySellerId = async ({id}) => {
  try {
    await mongoose.connect(CONNECTION_URI);

    return await ProductModel.find({id});
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}


const createProduct = async ({
  seller,
  title,
  catagory,
  photos,
  price,
  description,
}) => {
  try {
    await mongoose.connect(CONNECTION_URI);

    const product = new ProductModel({
      seller,
      title,
      catagory,
      photos,
      price,
      description,

    });
    await product.save()
  
    return product;
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

 const updateProduct = async (body) => {
  try {
    await mongoose.connect(CONNECTION_URI);

    const product = await ProductModel.updateOne(body);

   
  
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await mongoose.connection.close();
  }
}; 


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductsBySellerId
}
