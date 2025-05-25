import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { deleteItem } from '../../Service/ItemService.js';
import toast from 'react-hot-toast';

const ItemList = () => {

  const { itemsData, setItemsData, setCategories } = useContext(AppContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredItems = itemsData.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase()));

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const deletedItem = itemsData.find(item => item.itemId === itemId);
        const categoryIdToUpdate = deletedItem?.categoryId;
        const updatedItems = itemsData.filter((item) => item.itemId !== itemId);
        setItemsData(updatedItems);
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.categoryId === categoryIdToUpdate ? { ...category, items: category.items - 1 } : category)
        ); 
        toast.success("Item deleted");
      }
      else {
        toast.error("Unable to delete Item");
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Unable to delete Item");
    }
  }

  return (
    <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text"
            name="keyword"
            id='keyword'
            placeholder='Search by keyword'
            className="form-control"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                {/* <div className="item-image">
                    <img src={item.imgUrl} alt={item.name}
                  </div> */}
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className='mb-0 text-white'>
                    Category: {item.categoryName}
                  </p>
                  <p className='mb-0 text-white'>
                    Brand: {item.brand}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    &#8377;{item.price}
                  </span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList;