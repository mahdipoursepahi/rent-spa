import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import EmptyView from '../emptyView';
import Advertisement from '../advertisement';
import { getAdvertisements } from "../../services/advertisementService";
import { logout } from "../../services/authService";
import logo from "../../assets/images/rent-image.png";
import "./style.scss";

function HomeHeader({ user }) {
    function handleLogout() {
        logout();
        window.location = "/"
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="logo" />

            {user && <>
                <span className="header__item">{user.name}</span>
                <Link to="/account" className="header__item">Advertisement registration</Link>
                <span
                    className="header__item"
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogout}
                >Log out</span>
            </>
            }

            {!user && <>
                <Link to="/login" className="header__item header__link">Log in</Link>
            </>
            }
        </header>
    );
}

const Home = ({ user }) => {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await getAdvertisements();
            setAdvertisements(data);
        })();
    }, []);

    return (
        <>
            <HomeHeader user={user} />
            <main className="advertisements">
                {advertisements.length === 0 ?
                    <EmptyView /> :
                    advertisements.map(ad =>
                        <Advertisement
                            key={ad._id}
                            advertisement={ad}
                        />
                    )}
            </main>
        </>
    );
}

export default Home;