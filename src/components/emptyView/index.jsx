import React from 'react';
import "./style.scss";
import magnifier from "../../assets/icons/empty-view.svg";

const EmptyView = () => {
    return (
        <div className="empty-view">
            <img src={magnifier} alt="magnifier" />
            <h3>Nothing...</h3>
            <p>No information found...</p>
        </div>
    );
}

export default EmptyView;