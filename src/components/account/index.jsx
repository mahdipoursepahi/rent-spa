import React, { useState, useEffect } from "react";
import EmptyView from "../emptyView";
import Advertisement from "../advertisement";
import Modal from "../modal";
import AdvertisementForm from "../advertisementForm";
import {
  getUserAdvertisements,
  deleteAdvertisement,
} from "../../services/advertisementService";
import "./style.scss";

const Account = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [updatingAd, setUpdatingAd] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await getUserAdvertisements(user._id);
      setAdvertisements(data);
    })();
  }, []);

  function handleUpdate(ad) {
    setUpdatingAd(ad);
    setIsOpen(true);
  }

  async function handleDelete(id) {
    await deleteAdvertisement(id);
    setAdvertisements((ads) => ads.filter((ad) => ad._id !== id));
  }

  function closeModal() {
    setUpdatingAd(null);
    setIsOpen(false);
  }

  return (
    <>
      <header className="account-header">
        <span className="account-header__item">{user?.name}</span>
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Advertisement registration
        </button>
      </header>

      {advertisements.length === 0 ? (
        <EmptyView />
      ) : (
        <main className="advertisements">
          {advertisements.map((ad) => (
            <Advertisement
              key={ad._id}
              advertisement={ad}
              isForOwner
              onUpdateAd={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </main>
      )}

      <Modal isOpen={isOpen} onModalClose={closeModal}>
        <AdvertisementForm
          updatingAd={updatingAd}
          onModalClose={closeModal}
          setAdvertisements={setAdvertisements}
        />
      </Modal>
    </>
  );
};

export default Account;
