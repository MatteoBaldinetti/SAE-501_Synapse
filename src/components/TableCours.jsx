import { useState, useEffect } from "react";
import { API_URL } from "../constants/apiConstants";

function TableCours(props) {

    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < props.data.length; i++) {
                const sessionId = props.data[i].id;
                const trainingId = props.data[i].training.id;

                const resInscription = await fetch(`${API_URL}/inscriptions/search?userId=${props.userId}&sessionId=${sessionId}`);
                const jsonInscription = await resInscription.json();

                const resTraining = await fetch(`${API_URL}/trainings/${trainingId}`);
                const jsonTraining = await resTraining.json();

                const formattedJson = {
                    id: i,
                    title: jsonTraining.title,
                    duration: props.data[i].duration,
                    inscirptionDate: jsonInscription[0].inscriptionDate,
                }

                if (isPast(props.data[i].endDate)) {
                    if (props.statusLayout === "termine") {
                        data.push(formattedJson);
                    }
                } else {
                    if (props.statusLayout !== "termine") {
                        data.push(formattedJson);
                    }
                }
            }
            setFormattedData(data);
        }
        fetchData();
    }, [props])

    function isPast(isoDate) {
        return new Date(isoDate) < new Date();
    }

    function formatDateISO(isoDate) {
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} à ${hours}:${minutes}`;
    }

    return (
        <div className="container">
            <div className="row mx-1 p-3 border rounded-top-3 bg-white">
                <div className="col-4">
                    <h6>Nom du cours</h6>
                </div>
                <div className="col-4">
                    <h6>Durée</h6>
                </div>
                <div className="col-4">
                    <h6>Date d'inscription</h6>
                </div>
            </div>
            {formattedData.map((cours) => (
                <div key={cours.id} className="row mx-1 p-3 border bg-white">
                    <div className="col-4">
                        <h6>{cours.title}</h6>
                    </div>
                    <div className="col-4">
                        <h6>{cours.duration}h</h6>
                    </div>
                    <div className="col-4">
                        <h6>{formatDateISO(cours.inscirptionDate)}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TableCours;