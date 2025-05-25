import React from 'react'
import './Category.css';

const Category = ({categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick}) => {
  return (
    <div className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover" 
    style={{background: bgColor, cursor : 'pointer'}}
    onClick={onClick}
    >
        <div>
            <h6 className='text-white mb-0'>{categoryName}</h6>
            <p className='text-white mb-0'>{numberOfItems}{numberOfItems > 1 ? " items" : " item"}</p>
            {isSelected && <div className='active-category'> </div>}
        </div>
    </div>
  )
}

export default Category