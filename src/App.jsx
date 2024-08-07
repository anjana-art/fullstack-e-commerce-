import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RagisterPage from "./pages/RagisterPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrders from "./pages/MyOrders";
import MyProductListing from "./pages/MyProductListing";
import MyCart from "./pages/MyCart";
import AddNewProduct from "./pages/AddNewProduct";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProductDetailViewPage from "./pages/ProductDetailViewPage";

axios.defaults.baseURL = "http://localhost:5555";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<IndexPage />}></Route>
          <Route path="/api/users/login" element={<LoginPage />}></Route>
          <Route path="/api/users/register" element={<RagisterPage />}></Route>
          <Route path="/api/users/profile" element={<ProfilePage />}></Route>
          <Route path="/api/users/profile/myListings" element={<MyProductListing />}></Route>
          <Route path="/api/products/myListings" element={<MyProductListing />}></Route>
          <Route path="/api/users/profile/myOrders" element={<MyOrders />}></Route>
          <Route path="/api/users/profile/myCart" element={<MyCart />}></Route>
          <Route path="/api/users/profile/myListings/addNewProduct" element={<AddNewProduct/>}></Route>
          <Route path="/api/products/myListings/addNewProduct" element={<AddNewProduct/>}></Route>
          <Route path="/api/products/myListings/:id" element={<AddNewProduct/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
