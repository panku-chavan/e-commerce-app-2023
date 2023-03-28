import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./components/Route/PrivateRoute";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Dashboard from "./pages/user/Dashboard";



function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>

            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />

        </Routes>
        <Toaster />
      </>
    </>
  )

}

export default App;
