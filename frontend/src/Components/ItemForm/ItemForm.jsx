import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext';
import { addItem } from '../../Service/ItemService';
import toast from 'react-hot-toast';

const ItemForm = () => {

    const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
        brand: ""
    })

    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setData({
            name : data.name,
            categoryId : data.categoryId,
            price : data.price,
            description : data.description,
            brand : data.brand
        })

        try{
            const response = await addItem(data);
            if(response.status === 201) {
                setItemsData([...itemsData, response.data]);
                setCategories((prev) => prev.map((category) => category.categoryId === data.categoryId ? {...category, items : category.items+1} : category))
                toast.success('Item Added');
                setData({
                    name : "",
                    categoryId : "",
                    price : "",
                    description : "",
                    brand : "",
                })
            } else {
                toast.error("Unable to add item");
            }
        }
        catch(error) {
            console.error(error);
            toast.error('Unable to add Item');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='item-form-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className='row'>
                    <div className="cord col-md-8 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                {/* <div className="mb-3">
                                    <label htmlFor="image" className='form-label'>
                                        <img src={assets.logo} alt="" width={48} />
                                    </label>
                                    <input type="file" name="image" id="image" className='form-control' hidden />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text"
                                        name='name'
                                        id='name'
                                        className='form-control'
                                        placeholder='Item Name'
                                        onChange={onchangeHandler}
                                        value={data.name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input type="text"
                                        name='brand'
                                        id='brand'
                                        className='form-control'
                                        placeholder='Brand'
                                        onChange={onchangeHandler}
                                        value={data.brand}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor='categoryId'>Category</label>
                                    <select name="categoryId" id="categoryId" className='form-control' onChange={onchangeHandler} value={data.categoryId}>
                                        <option value="">--SELECT CATEGORY--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number"
                                        name='price'
                                        id='price'
                                        className='form-control'
                                        placeholder='&#8377;200.00'
                                        onChange={onchangeHandler}
                                        value={data.price}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows="5"
                                        name='description'
                                        id='description'
                                        className='form-control'
                                        placeholder='Description...'
                                        onChange={onchangeHandler}
                                        value={data.description}
                                    ></textarea>
                                </div>

                                <button type='submit' className='btn btn-warning w-100' disabled={loading}> {loading ? "Loading..." : "Save"} </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemForm