import React from 'react';
import "./style.scss";

const PropertyRow = ({ label, value }) => {
    return (
        <div className="property-row">
            <span>{label}:</span>
            &nbsp;
            <span>{value}</span>
        </div>
    );
}

export default PropertyRow;