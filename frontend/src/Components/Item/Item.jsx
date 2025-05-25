import React, { useContext } from 'react'
import './Item.css'
import { AppContext } from '../../Context/AppContext'

const Item = ({itemName, itemPrice, itemBrand, itemId}) => {
  const {addToCart} = useContext(AppContext);
  
  const handleAddToCart = () => {
    addToCart({
      name : itemName,
      price : itemPrice,
      itemId : itemId,
      brand : itemBrand,
      quantity : 1
    })
  }
  return (
    <div className='p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card'>
        <div className="flex-grow-1 ms-2">
            <h6 className='mb-1 text-light'>{itemName}</h6>
            <p className='mb-0 text-light'>{itemBrand}</p>
            <p className='mb-0 text-block badge rounded-pill text-bg-warning'>&#8377;{itemPrice}</p>
        </div>

        <div className="d-flex flex-column justify-content-between align-items-center ms-3" style={{height : '100%'}}>
            <i className="bi bi-cart-plus fs-4 text-warning"></i>
            <button className='btn btn-success btn-sm'
              onClick={handleAddToCart}>
                <i className="bi bi-plus"></i>
            </button>
        </div>
    </div>
  )
}

export default Item