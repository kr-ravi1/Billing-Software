import { Route, Routes } from 'react-router-dom'
import Menubar from './Components/Menubar/Menubar'
import ManageItems from './Pages/Manage Items/ManageItems'
import ManageCategory from './Pages/Manage Categories/ManageCategory'
import ManageUsers from './Pages/Manage Users/ManageUsers'
import Explore from './Pages/Explore/Explore'
import Dashboard from './Pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/categories" element={<ManageCategory />} />
      </Routes>
    </div>
  )
}

export default App