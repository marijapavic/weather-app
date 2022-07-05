import React, { useState } from "react";
import "./input.css"

function Input({ setQuery }) {
    const [city, setCity] = useState("");
    const handleSubmit = e => {
        e.preventDefault()
        if (city !== "") {
        setQuery({ q: city })
        setCity("")
        }
    }
    return (
        <div className="input">
            <form onSubmit={handleSubmit}>
                <input
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                type="text"
                placeholder="Search..."
                />
            </form>
        </div>
    );
}

export default Input;
