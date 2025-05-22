import { createContext, useEffect, useState} from "react";
import { fetchCategories } from "../Service/CategoryService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function LoadData() {
            const response = await fetchCategories();
            setCategories(response.data);
        }
        LoadData();
    }, []);

    const contextValue = {
        categories,
        setCategories
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}