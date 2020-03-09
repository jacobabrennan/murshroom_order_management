

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ProductLine from './product_line.js';

//-- Product Table -------------------------------
export default function ProductTable({products, onChange, onDelete}) {
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
