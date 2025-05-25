import { createContext, useEffect, useState} from "react";
import { fetchCategories } from "../Service/CategoryService.js";
import { fetchItems } from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [auth, setAuth] = useState({
        token : null, 
        role : null
    });

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.itemId === item.itemId);
        if(existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.itemId === item.itemId ? {...cartItem, quantity : cartItem.quantity+1} : cartItem))
        }
        else {
            setCartItems([...cartItems, {...item, quantity : 1}]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item, quantity : newQuantity } : item));
    }

    useEffect(() => {
        async function LoadData() {
            if(localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(localStorage.getItem("token"), localStorage.getItem("role"));
            }
            const response = await fetchCategories();
            const itemsResponse = await fetchItems();
            setCategories(response.data);
            setItemsData(itemsResponse.data);
        }
        LoadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({
            token: token,
            role: role
        });
    }

    const contextValue = {
        categories,
        setCategories,
        auth, 
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}