

//== Order Form ================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import useFeedback from '../utilities/use_feedback.js';
import CustomerFinder from '../components/customer_finder/index.js';
import speciesContext from '../species/index.js';
import Loading from '../components/loading/index.js';
import {
    API_ORDER_NEW,
    INVALID_NO_CUSTOMER,
    INVALID_NO_SHIPDATE,
    INVALID_NO_PRODUCTS,
    ROUTE_ORDER_BASE,
} from './utilities.js';

//-- Project Constants ---------------------------


//== Main Component ============================================================

//-- Component definition and hook setup ---------
export default function ViewNew() {
    const [customer, setCustomer] = useState(null);
    const [shipDate, setShipDate] = useState(null);
    const [warnings, feedback] = useFeedback();
    const [products, setProducts] = useState([]);
    const [response, postTrigger] = usePost(API_ORDER_NEW);
    const refOrderForm = useRef();
    
    //-- Interaction Handlers ------------------------
    // Customer
    function handleSelect(customerSelected) {
        setCustomer(customerSelected);
    }
    function handleClear(eventClick) {
        eventClick.preventDefault();
        setCustomer(null);
    }
    // Ship Date
    function handleDateChange(eventChange) {
        const newDate = eventChange.currentTarget.value;
        setShipDate(newDate);
    }
    // Products
    function handleProductAdd(newProduct) {
        const newProducts = products.slice();
        newProducts.push(newProduct);
        setProducts(newProducts);
    }
    function handleProductDelete(speciesCode) {
        const newProducts = products.slice();
        const productIndex = newProducts.findIndex(
            product => product.species.code === speciesCode
        );
        newProducts.splice(productIndex, 1);
        setProducts(newProducts);
    }
    function handleProductChange(newProduct) {
        const newProducts = products.slice();
        const productIndex = newProducts.findIndex(
            product => product.species.code === newProduct.species.code
        );
        newProducts[productIndex] = newProduct;
        setProducts(newProducts);
    }
    // Form Global
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        //
        const newOrder = {
            customerId: customer.id,
            shipDate: shipDate,
            products: products.map(product => ({
                id: product.species.id,
                quantity: product.quantity,
            })),
        }
        //
        const validationProblems = [];
        if(!customer) { validationProblems.push(INVALID_NO_CUSTOMER);}
        if(!shipDate) { validationProblems.push(INVALID_NO_SHIPDATE);}
        if(!products.length) { validationProblems.push(INVALID_NO_PRODUCTS);}
        if(validationProblems.length) {
            feedback(validationProblems);
            return;
        }
        //
        console.log(newOrder)
        // postTrigger()
    }
    
    //-- Loading Display for Data Submission ---------
    if(response.loading) {
        return (
            <div className="order-form">
                <h1>New Order</h1>
                <Loading />
            </div>
        );
    }
    
    //-- Initial customer selector display -----------
    if(!customer) {
        return (
            <div className="order-form">
                <h1>New Order</h1>
                <fieldset>
                    <legend>Customer</legend>
                    <CustomerFinder onSelect={handleSelect} />
                </fieldset>
            </div>
        );
    }

    //-- Full order form display ---------------------
    return (
        <form ref={refOrderForm} className="order-form">
            <h1>New Order</h1>
            <fieldset className="order-form__customer-field">
                <legend>Customer</legend>
                <div className="order-form__customer">
                    <div className="order-form__customer-name">{customer.name}</div>
                </div>
                <button className="button danger" onClick={handleClear} children="Clear" />
            </fieldset>
            <fieldset>
                <legend>Ship Date</legend>
                <input type="date" onChange={handleDateChange} />
            </fieldset>
            <fieldset>
                <legend>Blocks</legend>
                <ProductTable
                    products={products}
                    onChange={handleProductChange}
                    onDelete={handleProductDelete}
                />
                <ProductSelector products={products} onSelect={handleProductAdd} />
            </fieldset>
            <fieldset>
                {warnings}
                <div className="button-bar">
                    <button
                        className="button"
                        onClick={handleSubmit}
                        type="submit"
                        children="Submit"
                    />
                    <Link
                        className="button danger"
                        to={ROUTE_ORDER_BASE}
                        children="Discard"
                    />
                </div>
            </fieldset>
        </form>
    );
}


//== Sub Components ============================================================

//-- Add Product by Species Code -----------------
function ProductSelector({products, onSelect}) {
    const speciesData = useContext(speciesContext);
    //
    function handleSelect(eventSelect) {
        const speciesCode = eventSelect.currentTarget.value;
        const productSpecies = speciesData.list.find(
            candidate => candidate.code === speciesCode
        );
        onSelect({
            species: productSpecies,
            quantity: productSpecies.amount,
        });
    }
    //
    const productsEmpty = speciesData.list
        .filter(function (species) {
            return !products.find(product => product.species.code === species.code);
        })
        .map(function (species) {
            return (<option
                key={species.id}
                value={species.code}
                children={species.code}
            />);
        });
    //
    if(!productsEmpty.length) {
        return '';
    }
    return (
        <select value="" onChange={handleSelect}>
            <option key={-1} value="" style={{display:'none'}} children="Add Product" />
            {productsEmpty}
        </select>
    );
}

//-- Display Product & Edit Quantity -------------
function ProductLine({product, onChange, onDelete}) {
    const species = product.species;
    function productIncrement(eventClick) {
        eventClick.preventDefault();
        const newProduct = Object.assign({}, product);
        newProduct.quantity += species.amount;
        onChange(newProduct);
    }
    function productReset(eventClick) {
        eventClick.preventDefault();
        const newProduct = Object.assign({}, product);
        newProduct.quantity = species.amount;
        onChange(newProduct);
    }
    function productDelete(eventClick) {
        eventClick.preventDefault();
        onDelete(species.code);
    }
    //
    return (
        <tr className="order-form__product-line">
            <td>{species.code}</td>
            <td>{product.quantity}</td>
            <td><button
                className="button"
                children={`+${species.amount}`}
                onClick={productIncrement}
            /></td>
            <td><button
                className="button"
                children="Reset"
                onClick={productReset}
            /></td>
            <td><button
                className="button danger"
                children="Delete"
                onClick={productDelete}
            /></td>
        </tr>
    );
}

//-- Product Table -------------------------------
function ProductTable({products, onChange, onDelete}) {
    if(!products.length) {
        return '';
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Product Code</th>
                    <th>Quantity</th>
                    <th /><th /><th />
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => 
                    <ProductLine
                        key={index}
                        product={product}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                )}
            </tbody>
        </table>
    );
}
