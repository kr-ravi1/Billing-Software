import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { addCategory } from '../../Service/CategoryService.js'
import { toast } from 'react-hot-toast';
import { AppContext } from '../../Context/AppContext.jsx';


const CategoryForm = () => {

    const [loading, setLoading] = useState(false);
    // const [image, setImage] = useState(false);
    const {categories, setCategories} = useContext(AppContext);
    const [data, setData] = useState({
        name: '',
        description: '',
        bgColor: '#2c2c2c',
    });

    useEffect(() => {
        console.log(data);
    }, [data])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setData({
            name : data.name,
            description : data.description,
            bgColor : data.bgColor
        })

        try{
            const response = await addCategory(data);
            if(response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success('Category Created');
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                })
            }
        }
        catch(error) {
            console.error(error);
            toast.error('Unable to create category');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-2 mt-2">
            <div className='row'>
                <div className="cord col-md-8 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            {/* <div className="mb-3">
                                <label htmlFor="image" className='form-label'>
                                    <img src={assets.upload} alt="" width={48} />
                                </label>
                                <input type="file" name="image" id="image" className='form-control' hidden />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Category</label>
                                <input type="text"
                                    name='name' id='name'
                                    className='form-control'
                                    placeholder='Category Name'
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea rows="5"
                                    name='description'
                                    id='description'
                                    className='form-control'
                                    placeholder='Description...'
                                    onChange={onChangeHandler}
                                    value={data.description}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className='form-label'>Background Color</label>
                                <br />
                                <input type="color"
                                    name='bgColor'
                                    id='bgColor'
                                    placeholder='#2c2c2c'
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                />
                            </div>
                            <button type='submit' className='btn btn-warning w-100' disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm