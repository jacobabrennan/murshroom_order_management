

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import speciesContext from '../../species/index.js';

//-- Display Product & Edit Quantity -------------
export default function ProductLine({product, onChange, onDelete}) {
    const speciesData = useContext(speciesContext)
    const species = speciesData.list.find(
        candidate => candidate.id === product.speciesId
    );
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
        onDelete(species.id);
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
