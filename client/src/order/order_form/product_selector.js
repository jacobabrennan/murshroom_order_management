

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import speciesContext from '../../species/index.js';

//-- Add Product by Species Code -----------------
export default function ProductSelector({products, onSelect}) {
    const speciesData = useContext(speciesContext);
    //
    function handleSelect(eventSelect) {
        const speciesCode = eventSelect.currentTarget.value;
        const productSpecies = speciesData.list.find(
            candidate => candidate.code === speciesCode
        );
        onSelect({
            speciesId: productSpecies.id,
            quantity: productSpecies.amount,
        });
    }
    //
    const productsEmpty = speciesData.list
        .filter(function (species) {
            return !products.find(product => product.speciesId === species.id);
        })
        .map(function (species) {
            return (<option
                key={species.id}
                value={species.code}
                children={`${species.code} - ${species.species}`}
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
