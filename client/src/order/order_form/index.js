

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import usePost from '../../utilities/use_post.js';
import useFeedback from '../../utilities/use_feedback.js';
import CustomerFinder from '../../components/customer_finder/index.js';
import Loading from '../../components/loading/index.js';
import { API_ORDER_NEW } from '../../utilities/urls_api.js';
import { ROUTE_ORDER_BASE, MAKEURL_ROUTE_ORDER_SINGLE, MAKEURL_ROUTE_ORDER_EDIT } from '../../utilities/urls_routing.js';
import {
    INVALID_NO_CUSTOMER,
    INVALID_NO_SHIPDATE,
    INVALID_NO_PRODUCTS,
} from '../utilities.js';
import ProductTable from './product_table.js';
import ProductSelector from './product_selector.js';

//-- Component definition and hook setup ---------
export default function OrderForm(props) {
    const refOrderForm = useRef();
    const [customer, setCustomer] = useState(props.customer || null);
    const [shipDate, setShipDate] = useState(props.shipDate || null);
    const [products, setProducts] = useState(props.products || []);
    const [warnings, feedback] = useFeedback();
    const [response, postTrigger] = usePost(props.orderUrl || API_ORDER_NEW);
    
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
    function handleProductDelete(speciesId) {
        const newProducts = products.slice();
        const productIndex = newProducts.findIndex(
            product => product.speciesId === speciesId
        );
        newProducts.splice(productIndex, 1);
        setProducts(newProducts);
    }
    function handleProductChange(newProduct) {
        const newProducts = products.slice();
        const productIndex = newProducts.findIndex(
            product => product.speciesId === newProduct.speciesId
        );
        newProducts[productIndex] = newProduct;
        setProducts(newProducts);
    }
    // Form Global
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
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
        const newOrder = {
            customerId: customer.id,
            shipDate: shipDate,
            products: products.map(product => ({
                speciesId: product.speciesId,
                quantity: product.quantity,
            })),
        }
        //
        postTrigger(newOrder);
    }
    
    //-- Loading Display for Data Submission ---------
    if(response.loading) {
        return (<Loading />);
    }
    
    //-- Redirect on Successful Submission -----------
    if(response.data) {
        const routeOrder = MAKEURL_ROUTE_ORDER_SINGLE(response.data.id);
        return (<Redirect to={routeOrder} />);
    }
    
    //-- Initial customer selector display -----------
    let contents;
    if(!customer) {
        contents = (
            <React.Fragment>
                <fieldset>
                    <legend>Customer</legend>
                    <CustomerFinder onSelect={handleSelect} />
                </fieldset>
            </React.Fragment>
        );
    }

    //-- Full order form display ---------------------
    else {
        contents = (
            <React.Fragment>
                <fieldset className="order-form__customer-field">
                    <legend>Customer</legend>
                    <div className="order-form__customer">
                        <div className="order-form__customer-name">{customer.name}</div>
                    </div>
                    <button className="button danger" onClick={handleClear} children="Clear" />
                </fieldset>
                <fieldset>
                    <legend>Ship Date</legend>
                    <input type="date" onChange={handleDateChange} defaultValue={shipDate} />
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
            </React.Fragment>
        );
    }

    //-- Render Component ----------------------------
    let routeCancel = ROUTE_ORDER_BASE;
    if(props.orderId) {
        routeCancel = MAKEURL_ROUTE_ORDER_SINGLE(props.orderId);
    }
    return (
        <form ref={refOrderForm} className="order-form">
            {contents}
            {warnings}
            <div className="button-bar">
                <button
                    className="button"
                    onClick={handleSubmit}
                    type="submit"
                    children="Submit"
                />
                <Link className="button danger" to={routeCancel} children="Cancel" />
            </div>
        </form>
    );
}
