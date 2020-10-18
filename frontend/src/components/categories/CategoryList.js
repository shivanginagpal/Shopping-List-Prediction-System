import React, { Component } from 'react';
import { hostaddress } from "../auth/settings";
import CustomerNavbar from "../customer/CustomerNavbar";
import '../items/ItemsList.css';





const category = (props) => {
    return (
        <select id="category_dropdown" onChange={(event) => {
            props.func(event.target.value);
        }}>
            {props.categoriesList.map((category) => <option key={category._id}>{category.name}</option>)}
        </select>
    )
}

export default category;