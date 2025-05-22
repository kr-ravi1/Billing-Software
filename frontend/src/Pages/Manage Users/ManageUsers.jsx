import React from 'react'
import './ManageUsers.css'
import UserForm from '../../Components/UserForm/UserForm'
import UserList from '../../Components/UserList/UserList'

const ManageUsers = () => {
  return (
    <div className="users-container text-light">
        <div className="left-column">
            <UserForm />
        </div>
        <div className="right-column">
            <UserList />
        </div>
    </div>
  )
}

export default ManageUsers