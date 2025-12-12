import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/apiConstants";
import ProfileCompontents from "../../components/ProfileComponents";
import { useAuth } from "../../contexts/AuthContext";

function Dashboard() {
    const { userId, userEmail, userFirstname, userLastname, userType, userPhone, login, logout, authLoading } = useAuth();

    const [CurrentLayout, SetCurrentLayout] = useState("profile");

    return (
        <div>
            <div className="container-fluid blue-background">
                <div className="row">
                    <div className="col-3 py-5 link-container-background">
                        <div className="gestionnaire mx-3">
                            <h4>Tableau de bord</h4>
                            <div
                                className={`${CurrentLayout === "profile" ? "selected-button" : ""
                                    } d-flex align-items-center p-2 my-2`}
                                onClick={() => SetCurrentLayout("profile")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    className="me-2"
                                    style={{ width: "1.5em", height: "1.5em" }}
                                >
                                    <path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                                </svg>
                                <span>Profile</span>
                            </div>
                            <div
                                className={`${CurrentLayout === "cours" ? "selected-button" : ""} d-flex align-items-center p-2 my-2`}
                                onClick={() => SetCurrentLayout("cours")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    className="me-2"
                                    style={{ width: "1.5em", height: "1.5em" }}
                                >
                                    <path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                                </svg>
                                <span>Cours</span>
                            </div>
                            <div
                                className={`${CurrentLayout === "paiement" ? "selected-button" : ""} d-flex align-items-center p-2 my-2`}
                                onClick={() => SetCurrentLayout("paiement")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    className="me-2"
                                    style={{ width: "1.5em", height: "1.5em" }}
                                >
                                    <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                                </svg>
                                <span>Historique des paiements</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        {CurrentLayout === "profile" && (
                            <div className="p-5">
                                <h2 className="mb-5">Votre profile</h2>
                                <ProfileCompontents userId={userId} userEmail={userEmail} userFirstname={userFirstname} userLastname={userLastname} userPhone={userPhone} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;