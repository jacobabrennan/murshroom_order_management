

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import CustomerFinder from '../components/customer_finder/index.js';
// import usePost from '../utilities/use_post.js';
import speciesContext from '../species/index.js';

//-- Project Constants ---------------------------
// const URL_ORDER_NEW = '/data/order';

//-- Main Component ------------------------------
export default function ViewNew() {
    const [customer, setCustomer] = useState(null);
    const [products, setProducts] = useState([]);
    // Handle Interaction Customer
    function handleSelect(customerSelected) {
        setCustomer(customerSelected);
    }
    function handleClear() {
        setCustomer(null);
    }
    // Handle Interaction Products
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
    //
    if(!customer) {
        return (<CustomerFinder onSelect={handleSelect} />);
    }
    //
    return (
        <div>
            <div>
                <span>Customer Found!: {customer.name}</span>
                <button className="button" onClick={handleClear} children="Clear" />
            </div>
            <div>
                {products.map((product, index) => 
                    <ProductLine
                        key={index}
                        product={product}
                        onChange={handleProductChange}
                        onDelete={handleProductDelete}
                    />
                )}
                <ProductSelector products={products} onSelect={handleProductAdd} />
            </div>
        </div>
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
    function productIncrement() {
        const newProduct = Object.assign({}, product);
        newProduct.quantity += species.amount;
        onChange(newProduct);
    }
    function productReset() {
        const newProduct = Object.assign({}, product);
        newProduct.quantity = species.amount;
        onChange(newProduct);
    }
    function productDelete() {
        onDelete(species.code);
    }
    //
    return (
        <div>
            <span>{species.code}</span>
            <span> - {product.quantity}</span>
            <button
                className="button"
                children={`+${species.amount}`}
                onClick={productIncrement}
            />
            <button
                className="button"
                children="Reset"
                onClick={productReset}
            />
            <button
                className="button secondary"
                children="Delete"
                onClick={productDelete}
            />
        </div>
    );
}
