import { useState, useEffect } from 'react';
import { API_URL } from "../constants/apiConstants";
import { useAuth } from "../contexts/AuthContext";
import profilePicture from '../assets/images/profile_picture.webp';
import ConfirmationDeleteModal from './ConfirmationDeleteModal';

function ProfileComponents({ userId, userEmail, userFirstname, userLastname, userPhone }) {

    const { updateContext } = useAuth();

    const [modifierProfil, setModifierProfil] = useState(false);

    const [lastnameInput, setLastnameInput] = useState(userLastname);
    const [firstnameInput, setFirstnameInput] = useState(userFirstname);
    const [emailInput, setEmailInput] = useState(userEmail);
    const [phoneInput, setPhoneInput] = useState(userPhone ?? "");
    const [showPopUpDelete, setShowPopUpDelete] = useState(false);

    const [errors, setErrors] = useState({});

    const handleProfilChangeButtonPress = () => {
        setModifierProfil(true);
    };

    const handleUpdateProfileButtonPress = async () => {
        const previousPlayer = await fetch(`${API_URL}/users/${userId}`);
        const jsonPreviousPlayer = await previousPlayer.json();

        const updatedPlayer = {
            id: userId,
            firstname: firstnameInput,
            lastname: lastnameInput,
            email: emailInput,
            password: jsonPreviousPlayer.password,
            type: jsonPreviousPlayer.type,
            phoneNumber: phoneInput,
        }

        const res = await fetch(`${API_URL}/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPlayer),
        });

        updateContext(updatedPlayer.id, updatedPlayer.email, updatedPlayer.firstname, updatedPlayer.lastname, updatedPlayer.type, updatedPlayer.phoneNumber)

        setModifierProfil(false);
    }

    const handleDeleteProfileButtonPress = () => {
        setShowPopUpDelete(true);
    }

    const handleDeleteProfile = async () => {
        console.log(`${API_URL}/users/${userId}`)
        const res = await fetch(`${API_URL}/users/${userId}`, {
            method: "DELETE",
        });

        console.log(res)
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let newValue = value;

        if (id === "phone") {
            let digits = newValue.replace(/\D/g, "").slice(0, 10);
            newValue = digits.replace(/(\d{2})(?=\d)/g, "$1 ");
            setPhoneInput(newValue);
            return;
        }

        if (id === "email") setEmailInput(newValue);

        if (id === "lastname") setLastnameInput(newValue);
        if (id === "firstname") setFirstnameInput(newValue);
    };

    useEffect(() => {
        const newErrors = {};

        if (emailInput && !/^\S+@\S+\.\S+$/.test(emailInput)) {
            newErrors.email = "Email invalide";
        }

        if (phoneInput && phoneInput.replace(/\s/g, "").length !== 10) {
            newErrors.phone = "Téléphone invalide";
        }

        setErrors(newErrors);
    }, [emailInput, phoneInput]);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <img src={profilePicture} width={110} className="me-4" />
                        <div>
                            <h4 className="mb-0">{userFirstname} {userLastname}</h4>
                            <p className="mb-0 text-secondary">{userEmail}</p>
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-6 mb-3'>
                        <h5>Nom</h5>
                        {modifierProfil ? (
                            <input
                                type="text"
                                id="lastname"
                                value={lastnameInput}
                                onChange={handleInputChange}
                                className="form-control pe-5"
                                required
                            />
                        ) : (
                            <p className='text-secondary'>{userLastname}</p>
                        )}
                    </div>

                    <div className='col-6 mb-3'>
                        <h5>Prénom</h5>
                        {modifierProfil ? (
                            <input
                                type="text"
                                id="firstname"
                                value={firstnameInput}
                                onChange={handleInputChange}
                                className="form-control pe-5"
                                required
                            />
                        ) : (
                            <p className='text-secondary'>{userFirstname}</p>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-6'>
                        <h5>Email</h5>
                        {modifierProfil ? (
                            <>
                                <input
                                    type="email"
                                    id="email"
                                    value={emailInput}
                                    onChange={handleInputChange}
                                    className={`form-control pe-5 ${errors.email ? "is-invalid" : ""}`}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </>
                        ) : (
                            <p className='text-secondary'>{userEmail}</p>
                        )}
                    </div>

                    <div className='col-6'>
                        <h5>Mot de passe</h5>
                        {modifierProfil ? (
                            <div className="mt-3">
                                <a className="text-secondary text-decoration-none link-pointer">
                                    Modifier votre mot de passe ?
                                </a>
                            </div>
                        ) : (
                            <p className='text-secondary'>●●●●●●●●●</p>
                        )}
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-6'>
                        <h5>Téléphone</h5>
                        {modifierProfil ? (
                            <>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phoneInput}
                                    onChange={handleInputChange}
                                    className={`form-control pe-5 ${errors.phone ? "is-invalid" : ""}`}
                                    placeholder="Non obligatoire"
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </>
                        ) : (
                            <p className='text-secondary'>
                                {userPhone ? userPhone : "Non renseigné"}
                            </p>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        {modifierProfil ? (
                            <button className="btn btn-blue" onClick={handleUpdateProfileButtonPress}>
                                Mettre à jour les données
                            </button>
                        ) : (
                            <button className="btn btn-blue" onClick={handleProfilChangeButtonPress}>
                                Modifier votre profil
                            </button>
                        )}

                    </div>
                    <div className='col-4'>
                        <button className="btn btn-delete" onClick={handleDeleteProfileButtonPress}>
                            Supprimer le compte
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationDeleteModal
                visible={showPopUpDelete}
                onClose={() => setShowPopUpDelete(false)}
                onConfirm={handleDeleteProfile}
            />
        </>
    );
}

export default ProfileComponents;