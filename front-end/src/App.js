import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register.js";
import CategoryPage from "./components/CategoryPage";
import EmpToken from "./components/CheckToken/EmpToken";
import CusToken from "./components/CheckToken/CusToken";

function App() {
  return (
    <GlobalStyles>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/my-cart" element={<CusToken />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<EmpToken />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </GlobalStyles>
  );
}

export default App;
