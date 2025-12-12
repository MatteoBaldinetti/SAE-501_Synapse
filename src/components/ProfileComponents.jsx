import { useState } from 'react';

import profilePicture from '../assets/images/profile_picture.webp';

function ProfileCompontents({ userEmail, userFirstname, userLastname }) {
    const [modifierProfil, setModifierProfil] = useState(false);

    const handleProfilChangeButtonPress = () => {
        setModifierProfil(true);
    }


    return (
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
                <div className='col-6'>
                    <h5>Nom</h5>
                    <p className='text-secondary'>{userLastname}</p>
                </div>
                <div className='col-6'>
                    <h5>Prénom</h5>
                    <p className='text-secondary'>{userFirstname}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h5>Email</h5>
                    <p className='text-secondary'>{userEmail}</p>
                </div>
                <div className='col-6'>
                    <h5>Mot de passe</h5>
                    <p className='text-secondary'>●●●●●●●●●</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h5>Téléphone</h5>
                    <p className='text-secondary'>+33 6 54 43 09 82</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <button className="btn btn-blue" onClick={handleProfilChangeButtonPress}>Modifier votre profil</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCompontents;