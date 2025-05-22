import React from 'react'
import './ManageCategory.css'
import CategoryForm from '../../Components/CategoryForm/CategoryForm'
import CategoryList from '../../Components/CategoryList/CategoryList'

function ManageCategory() {
  return (
    <div className="category-container text-light">
        <div className="left-column">
            <CategoryForm />
        </div>
        <div className="right-column">
            <CategoryList />
        </div>
    </div>
  )
}

export default ManageCategory