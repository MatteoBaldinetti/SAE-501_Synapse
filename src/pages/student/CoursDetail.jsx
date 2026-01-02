import "../../styles/CoursDetail.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import { useAuth } from "../../contexts/AuthContext";

function CoursDetail() {
    const { userId } = useAuth();
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API_URL}/trainings/${id}`);
            const data = await res.json();
            setData(data);
        };
        fetchData();
    }, []);

    return (
        <div className="blue-background container-fluid">

            <div className="row pt-4 px-4 ms-1 mb-3">
                <div className="col-12 d-flex align-items-center gap-4 cours-header mx-auto">
                    <Link className="btn btn-return" to={"/cours"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={30} viewBox="0 0 576 512"><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 544 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-434.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" /></svg>
                    </Link>
                    <p className="text-secondary m-0">
                        <Link className="text-secondary ariane-link" to={"/cours"}>Cours</Link> / <span className="active-ariane-link">{data.title}</span>
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-10 mx-auto">
                        <h2 className="m-0">{data.title}</h2>

                        <div className="course-header-info d-flex flex-wrap align-items-center gap-4">

                            <p className="text-secondary m-0">{data.description}</p>

                            <div className="icon-text d-flex align-items-center">
                                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#6c757d" d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                </svg>
                                <span className="ms-1 text-secondary">{data.duration}h</span>
                            </div>

                            <div className="icon-text d-flex align-items-center">
                                <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#6c757d" d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l288 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-288 0zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm256 16a112 112 0 1 1 0 224 112 112 0 1 1 0-224zm-16 44c-11 0-20 9-20 20 0 9.7 6.9 17.7 16 19.6l0 48.4-4 0c-11 0-20 9-20 20s9 20 20 20l48 0c11 0 20-9 20-20s-9-20-20-20l-4 0 0-68c0-11-9-20-20-20l-16 0z" />
                                </svg>
                                <span className="ms-1 text-secondary">{data.price}€</span>
                            </div>
                        </div>

                        <h4 className="mt-5">Description</h4>
                        <p>{data.detailedDescription}</p>

                        <div className="image-row">
                            <div className="d-flex justify-content-center align-items-center">
                                <img
                                    src={`${API_URL}/files/download/${data.imgName}`}
                                    alt={data.title}
                                    className="cours-image"
                                />
                            </div>
                        </div>

                        <h4 className="mt-5">Prérequis</h4>
                        <p>{data.prerequisites}</p>
                    </div>
                </div>

                <div className="row pb-5">
                    <div className="col-md-6 d-flex justify-content-center">
                        {userId !== null ? (
                            <Link className="btn btn-login-inscritpion" to={"/cours-payment"} state={data.id}>
                                Incrivez vous à une session
                            </Link>
                        ) : (
                            <Link className="btn btn-login-inscritpion" to={"/login"}>
                                Connectez vous pour vous inscrire à une session
                            </Link>
                        )}
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                            <Link className="btn btn-3d" to={"/3d-viewer"} state={{ modelUrl: '/models/keyboard.glb' }}>
                                Voir les outils en 3D
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursDetail;