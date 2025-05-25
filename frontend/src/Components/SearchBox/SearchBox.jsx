import { useState } from "react";

const SearchBox = ({onSearch}) => {

    const [searchKeyword, setSearchKeyword] = useState("");

    const onChangeHandler = (e) => {
        const text = e.target.value;
        setSearchKeyword(text);
        onSearch(text);
    }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search items.." value={searchKeyword} onChange={onChangeHandler} />
            <span className="input-group-text bg-warning">
                <i className="bi bi-search"></i>
            </span>
        </div>
    )
}

export default SearchBox;