import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import FoodCatalog from "./pages/FoodCatalog";
import ChefsCatalog from "./pages/ChefsCatalog";
import ChefDetails from "./pages/ChefDetails";
import DishDetails from "./pages/DishDetails";
import Checkout from "./pages/Checkout";
import AIAssistant from "./pages/AIAssistant";
import DashboardCustomer from "./pages/customer/DashboardCustomer";
import SettingsCustomer from "./pages/customer/SettingsCustomer";
import DashboardChef from "./pages/chef/Dashboard";
import AddDish from "./pages/chef/AddDish";
import OrdersChef from "./pages/chef/OrdersChef";
import SettingsChef from "./pages/chef/SettingsChef";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            {/* <Route path="/chef-catalog" element={<ChefsCatalog />}></Route> */}
            <Route path="/cuisines/:cuisineId" element={<ChefsCatalog />} />
            <Route path="/food-catalog" element={<FoodCatalog />}></Route>
            <Route path="/chefs/:chefId" element={<ChefDetails />}></Route>
            <Route path="/dishes/:id" element={<DishDetails />}></Route>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/ai-assistant" element={<AIAssistant />}></Route>
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <DashboardCustomer />
                </ProtectedRoute>
              }
            ></Route>
            {/* <Route
              path="/customer/settings"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <SettingsCustomer />
                </ProtectedRoute>
              }
            ></Route> */}
            <Route
              path="/chef/dashboard"
              element={
                <ProtectedRoute allowedRoles={["chef"]}>
                  <DashboardChef />
                </ProtectedRoute>
              }
            ></Route>
            {/* <Route
              path="/chef/addDish"
              element={
                <ProtectedRoute allowedRoles={["chef"]}>
                  <AddDish />
                </ProtectedRoute>
              }
            ></Route> */}
            {/* <Route
              path="/chef/orders"
              element={
                <ProtectedRoute allowedRoles={["chef"]}>
                  <OrdersChef />
                </ProtectedRoute>
              }
            ></Route> */}
            {/* <Route
              path="/chef/settings"
              element={
                <ProtectedRoute allowedRoles={["chef"]}>
                  <SettingsChef />
                </ProtectedRoute>
              }
            ></Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
