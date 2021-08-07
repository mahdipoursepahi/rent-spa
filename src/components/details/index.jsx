import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import EmptyView from "../emptyView"
import PropertyRow from "../propertyRow";
import { getAdvertisementById } from "../../services/advertisementService"
import "./style.scss"

const Details = () => {
    const [advertisement, setAdvertisement] = useState({})
    const { id } = useParams()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAdvertisementById(id)
                setAdvertisement(data)
            }
            catch ({ response }) {
                if (response && (response.status === 404 || response.status === 400))
                    toast.error(response.data)
            }
        })();
    }, [])

    return (
        <main>
            {!advertisement ?
                <EmptyView /> :
                <div className="details">
                    <PropertyRow label="Title" value={advertisement.title} />
                    <PropertyRow label="Address" value={advertisement.address} />
                    <PropertyRow label="Phone number" value={advertisement.phoneNumber} />
                </div>
            }
        </main>
    )
}

export default Details;