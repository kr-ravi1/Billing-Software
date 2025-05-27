import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Menubar from './Components/Menubar/Menubar'
import ManageItems from './Pages/Manage Items/ManageItems'
import ManageCategory from './Pages/Manage Categories/ManageCategory'
import ManageUsers from './Pages/Manage Users/ManageUsers'
import Explore from './Pages/Explore/Explore'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login/Login'
import OrderHistory from './Pages/Order History/OrderHistory'
import { AppContext } from './Context/AppContext'
import { useContext } from 'react'

const App = () => {
  const location = useLocation();
  const {auth} = useContext(AppContext);

  const LoginRoute = ({element}) => {
    if(auth.token) {
      return <Navigate to="/dashboard" replace/>;
    }
    return element;
  }

  const ProtectedRoutes = ({element, allowedRoles}) => {
    if(!auth.token) return <Navigate to="/login" replace/>;

    if(allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  }

  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ProtectedRoutes element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/items" element={<ProtectedRoutes element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/categories" element={<ProtectedRoutes element={<ManageCategory />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/login' element={<LoginRoute element={<Login />}/>} ></Route>
        <Route path='/orders' element={<OrderHistory />} ></Route>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App