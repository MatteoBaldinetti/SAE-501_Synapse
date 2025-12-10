import { Link } from "react-router-dom";

import "../../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/apiConstants";

function Dashboard() {

    return (
        <div className="blue-background py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Mon tableau de bord</h2>
                    </div>
                    <div className="col-12 mt-5">
                        <h4>Cours suivis</h4>
                    </div>
                </div>
                <div className="row row-cols-4 bg-white border border-black rounded-top">
                    <div className="col pt-3">
                        <p>Nom du cours</p>
                    </div>
                    <div className="col pt-3">
                        <p>Enseignant</p>
                    </div>
                    <div className="col pt-3">
                        <p>Date de début/fin</p>
                    </div>
                    <div className="col pt-3">
                        <p>Status</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;