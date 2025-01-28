import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home.page";
import { CategoryPage } from "../pages/Category.page";
import { ProductPage } from "../pages/Product.page";
import { NotFoundPage } from "../pages/NotFound.page";
import RequireAuth from "./RequireAuth.jsx";
import { LoginPage } from "../pages/Login.page.jsx";
import { AboutPage } from "../pages/About.page.jsx";
import { AddCategoryPage } from "../pages/AddCategory.page.jsx";
import { AddProductPage } from "../pages/AddProduct.page.jsx";
import { BannerPage } from "../pages/Banner.page.jsx";
import { UserPage } from "../pages/User.page.jsx";
import { AddBannerPage } from "../pages/AddBanner.page.jsx";
import { AddUserPage } from "../pages/AddUser.page.jsx";
import { AddNotiPage } from "../pages/AddNoti.page.jsx";
import { ProfilePage } from "../pages/Profile.page.jsx";
import { NotiPage } from "../pages/Noti.page.jsx";
import { OrderPage } from "../pages/Order.page.jsx";
import { OrderDetailPage } from "../pages/OrderDetail.page.jsx";
import { CustomerPage } from "../pages/Customer.page.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/category"
        element={
          <RequireAuth>
            <CategoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-category"
        element={
          <RequireAuth>
            <AddCategoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-category/:id"
        element={
          <RequireAuth>
            <AddCategoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/product"
        element={
          <RequireAuth>
            <ProductPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-product"
        element={
          <RequireAuth>
            <AddProductPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-product/:id"
        element={
          <RequireAuth>
            <AddProductPage />
          </RequireAuth>
        }
      />
      <Route
        path="/banner"
        element={
          <RequireAuth>
            <BannerPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-banner"
        element={
          <RequireAuth>
            <AddBannerPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-banner/:id"
        element={
          <RequireAuth>
            <AddBannerPage />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        }
      />
      <Route
        path="/order-details"
        element={
          <RequireAuth>
            <OrderDetailPage />
          </RequireAuth>
        }
      />
      <Route
        path="/customer"
        element={
          <RequireAuth>
            <CustomerPage />
          </RequireAuth>
        }
      />
      <Route
        path="/user"
        element={
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-user"
        element={
          <RequireAuth>
            <AddUserPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-user/:id"
        element={
          <RequireAuth>
            <AddUserPage />
          </RequireAuth>
        }
      />
      <Route
        path="/notification"
        element={
          <RequireAuth>
            <NotiPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-noti"
        element={
          <RequireAuth>
            <AddNotiPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add-noti/:id"
        element={
          <RequireAuth>
            <AddNotiPage />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path="/about"
        element={
          <RequireAuth>
            <AboutPage />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
