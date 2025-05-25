import { Route, Routes, useLocation } from 'react-router-dom'
import Menubar from './Components/Menubar/Menubar'
import ManageItems from './Pages/Manage Items/ManageItems'
import ManageCategory from './Pages/Manage Categories/ManageCategory'
import ManageUsers from './Pages/Manage Users/ManageUsers'
import Explore from './Pages/Explore/Explore'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login/Login'

const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/categories" element={<ManageCategory />} />
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App