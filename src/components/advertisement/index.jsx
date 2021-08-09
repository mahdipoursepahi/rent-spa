import React from "react";
import { Link } from "react-router-dom";
import PropertyRow from "../propertyRow";
import "./style.scss";

const Advertisement = ({ advertisement, isForOwner, onUpdateAd, onDelete }) => {
  return (
    <div className="advertisement">
      <PropertyRow label="Title" value={advertisement.title} />
      <PropertyRow label="Address" value={advertisement.address} />
      <PropertyRow label="Phone number" value={advertisement.phoneNumber} />
      {isForOwner && (
        <div>
          <button
            className="advertisement__delete-btn"
            onClick={() => onDelete(advertisement._id)}
          >
            Delete
          </button>
          <button
            className="advertisement__update-btn"
            onClick={() => onUpdateAd(advertisement)}
          >
            Update
          </button>
        </div>
      )}
      {!isForOwner && (
        <Link
          to={`/details/${advertisement._id}`}
          className="advertisement__details-btn"
        >
          Details
        </Link>
      )}
    </div>
  );
};

export default Advertisement;
