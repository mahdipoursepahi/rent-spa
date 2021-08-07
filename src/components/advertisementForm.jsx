import React, { useEffect, useState, useRef, useMemo } from 'react';
import Joi from "joi";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { toast } from "react-toastify";
import Input from './input';
import { schema, providedConstraints } from '../validations/advertisement';
import { addAdvertisement, getAdvertisements, updateAdvertisement } from "../services/advertisementService";

const AdvertisementForm = ({ updatingAd, onModalClose, setAdvertisements }) => {
    const [data, setData] = useState({
        title: "",
        address: "",
        phoneNumber: "",
        coordinates: {
            lat: 35.7010,
            lng: 51.4054
        }
    });
    const [errors, setErrors] = useState({});
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const position = marker.getLatLng()
                    setData(data => ({ ...data, coordinates: { lat: position.lat, lng: position.lng } }))
                }
            },
        }),
        [],
    )

    useEffect(() => {
        if (updatingAd) {
            setData(data => ({
                title: updatingAd.title,
                address: updatingAd.address,
                phoneNumber: updatingAd.phoneNumber,
                coordinates: { lat: updatingAd.coordinates.lat, lng: updatingAd.coordinates.lng }
            }))
        }
    }, [])

    function validate() {
        const { error } = schema.validate(data, { abortEarly: false })
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors ? errors : null;
    }

    function validateProperty(name, value) {
        const obj = { [name]: value };
        const propertySchema = Joi.object({ [name]: providedConstraints[name] });
        const { error } = propertySchema.validate(obj);
        return error ? error.details[0].message : null;
    };

    function handleChange({ currentTarget }) {
        const { name, value } = currentTarget;
        const errorMessage = validateProperty(name, value);
        setData(data => ({ ...data, [name]: value }));
        setErrors(errors => ({ ...errors, [name]: errorMessage }));
    }

    async function doSubmit() {
        try {
            if (updatingAd) {
                await updateAdvertisement(updatingAd._id, data)
            }
            else {
                await addAdvertisement(data)
            }

            const { data: advertisements } = await getAdvertisements()
            setAdvertisements(advertisements)
            onModalClose()
        } catch ({ response }) {
            if (response && response.status === 400)
                toast.error(response.data);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = validate(schema);
        setErrors(errors ? errors : {});
        if (errors) return;

        doSubmit();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="title"
                label="Title"
                error={errors.title}
                type="text"
                value={data.title}
                placeholder="Title"
                onChange={handleChange}
            />

            <Input
                name="address"
                label="Address"
                error={errors.address}
                type="text"
                value={data.address}
                placeholder="Address"
                onChange={handleChange}
            />

            <Input
                name="phoneNumber"
                label="Phone Number"
                error={errors.phoneNumber}
                type="text"
                value={data.phoneNumber}
                placeholder="Phone Number"
                onChange={handleChange}
            />

            <MapContainer center={updatingAd ? updatingAd.coordinates : data.coordinates} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable
                    eventHandlers={eventHandlers}
                    position={data.coordinates}
                    ref={markerRef} />
            </MapContainer>

            <button type="submit">Save</button>
        </form>
    );
}

export default AdvertisementForm;