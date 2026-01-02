import { useState, useEffect } from "react";
import { API_URL } from "../constants/apiConstants";

function TableCours({ data, userId, statusLayout }) {

    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const tempData = [];
            for (let i = 0; i < data.length; i++) {
                const sessionId = data[i].id;
                const trainingId = data[i].training.id;

                const resInscription = await fetch(`${API_URL}/inscriptions/search?userId=${userId}&sessionId=${sessionId}`);
                const jsonInscription = await resInscription.json();

                const resTraining = await fetch(`${API_URL}/trainings/${trainingId}`);
                const jsonTraining = await resTraining.json();

                const formattedJson = {
                    id: i,
                    title: jsonTraining.title,
                    duration: data[i].duration,
                    inscriptionDate: jsonInscription[0]?.inscriptionDate,
                };

                if (statusLayout === "annule" && jsonInscription[0]?.status === "CANCEL") {
                    tempData.push(formattedJson);
                } else if (statusLayout === "termine" && isPast(data[i].endDate)) {
                    tempData.push(formattedJson);
                } else if (statusLayout === "inscrit" && !isPast(data[i].endDate)) {
                    tempData.push(formattedJson);
                }
            }
            setFormattedData(tempData);
        };

        fetchData();
    }, [data, userId, statusLayout]);

    const isPast = (isoDate) => new Date(isoDate) < new Date();

    const formatDateISO = (isoDate) => {
        if (!isoDate) return "-";
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} à ${hours}:${minutes}`;
    };

    // JSX return
    if (formattedData.length === 0) {
        // No courses for this status
        return (
            <h4 className="text-center">
                {statusLayout === "inscrit" && "Vous n'êtes pas encore inscrit à un cours"}
                {statusLayout === "termine" && "Vous n'avez terminé aucun cours"}
                {statusLayout === "annule" && "Vous n'avez annulé aucun cours"}
            </h4>
        );
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
                    <div className="col-4"
                    ><h6>{cours.duration}h</h6>
                    </div>
                    <div className="col-4">
                        <h6>{formatDateISO(cours.inscriptionDate)}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TableCours;