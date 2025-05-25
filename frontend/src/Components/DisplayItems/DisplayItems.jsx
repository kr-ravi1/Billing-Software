import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';

const DisplayItems = ({selectedCategory}) => {
    const { itemsData } = useContext(AppContext);
    const [searchKeyword, setSearchKeyword] = useState("");

    const filteredItems = itemsData.filter(item => {
        if(!selectedCategory) return true;
        return item.categoryId === selectedCategory;
    }).filter(item => item.name.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center align-items-center mb-4">
                <div></div>
                <div>
                    <SearchBox onSearch={setSearchKeyword} />
                </div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    <div key={index} className='col-md-4 col-sm-6'>
                        <Item itemName={item.name}
                            itemPrice={item.price}
                            itemBrand={item.brand}
                            itemId={item.itemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayItems