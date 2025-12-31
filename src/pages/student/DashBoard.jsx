import "../../styles/Dashboard.css";
import { useEffect, useState } from "react";
import ProfileComponents from "../../components/ProfileComponents";
import { useAuth } from "../../contexts/AuthContext";
import TableCours from "../../components/TableCours";
import { API_URL } from "../../constants/apiConstants";
import logo from "../../assets/images/smallLogoPDF.jpeg";

// Pour faire les PDF de la facture
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
    const { userId, userEmail, userFirstname, userLastname, userType, userPhone, userImage, login, logout, authLoading } = useAuth();

    const [currentLayout, SetCurrentLayout] = useState("profile");
    const [courseStatusLayout, setCourseStatusLayout] = useState("inscrit");

    const [userSession, setUserSession] = useState([]);
    const [userEvaluation, setUserEvaluation] = useState([]);
    const [userPayment, setUserPayment] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (currentLayout === "cours") {
                const res = await fetch(`${API_URL}/users/${userId}/sessions`);
                const json = await res.json();
                setUserSession(json);

                const res2 = await fetch(`${API_URL}/results/search?userId=${userId}`);
                const json2 = await res2.json();
                setUserEvaluation(json2);
            }

            if (currentLayout === "paiement") {
                const res = await fetch(`${API_URL}/inscriptions/search?userId=${userId}`);
                const json = await res.json();
                setUserPayment(json.reverse());
            }
        }
        fetchData();
    }, [currentLayout])

    // Reset des layout quand on change
    useEffect(() => {
        setCourseStatusLayout("inscrit");
    }, [currentLayout])

    const formatDateISO = (isoDate) => {
        const date = new Date(isoDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} à ${hours}:${minutes}`;
    }

    const handleDownloadBill = (payment) => {
        // Création du PDF
        const doc = new jsPDF();

        const img = new Image();
        img.src = logo;

        // Taille du logo
        const logoWidth = 30;
        const logoHeight = (img.height * logoWidth) / img.width;

        img.onload = () => {
            // LOGO
            doc.addImage(img, "JPEG", 14, 15, logoWidth, logoHeight);

            // INFO ENTREPRISE
            doc.setFontSize(10);
            doc.text(
                "4 rue de la Paix\n75000 Paris\ncontact@txlforma.com\n+33 6 12 34 56 78",
                14,
                42
            );

            // FACTURE INFO
            doc.setFontSize(16);
            doc.text("FACTURE", 150, 20);

            doc.setFontSize(10);
            doc.text(`Numéro : FAC-${payment.id}`, 150, 28);
            doc.text(`Date : ${formatDateISO(payment.date)}`, 150, 34);

            // CLIENT
            doc.setFontSize(12);
            doc.text("Facturé à :", 14, 70);

            doc.setFontSize(10);
            doc.text(`${userFirstname} ${userLastname}`, 14, 78);
            doc.text(userEmail, 14, 84);
            if (userPhone) doc.text(userPhone, 14, 90);

            // TABLEAU
            autoTable(doc, {
                startY: 105,
                head: [["Formation", "Prix"]],
                body: [[payment.training.title, `${payment.amount} €`]],
                headStyles: { fillColor: [0, 93, 136] },
                styles: { fontSize: 10 }
            });

            // TOTAL
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(12);
            doc.text("Total :", 140, finalY);
            doc.text(`${payment.amount} €`, 170, finalY);

            // FOOTER
            doc.setFontSize(9);
            doc.text(
                "Merci pour votre confiance.\nTXLFORMA - Organisme de formation professionnelle",
                14,
                280
            );

            // SAUVEGARDE
            doc.save(`facture-FAC-${payment.id}.pdf`);
        };
    };

    return (
        <div>
            <div className="container-fluid blue-background">
                <div className="row">
                    <div className="col-3 py-5 link-container-background">
                        <div className="gestionnaire mx-3">
                            <h4>Tableau de bord</h4>
                            <div
                                className={`${currentLayout === "profile" ? "selected-button" : ""
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
                                className={`${currentLayout === "cours" ? "selected-button" : ""} d-flex align-items-center p-2 my-2`}
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
                                className={`${currentLayout === "paiement" ? "selected-button" : ""} d-flex align-items-center p-2 my-2`}
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
                    <div className="col-9 dashboard">
                        {currentLayout === "profile" && (
                            <div className="p-5">
                                <h2 className="mb-5">Votre profile</h2>
                                <ProfileComponents userId={userId} userEmail={userEmail} userFirstname={userFirstname} userLastname={userLastname} userPhone={userPhone} userImage={userImage} logout={logout} />
                            </div>
                        )}

                        {currentLayout === "cours" && (
                            <div className="p-5">
                                <h2 className="mb-5">Vos cours</h2>
                                <div className="d-flex gap-5 mb-4 border-bottom">
                                    <span
                                        className={`cours-tab ${courseStatusLayout === "inscrit" ? "active" : ""}`}
                                        onClick={() => setCourseStatusLayout("inscrit")}
                                    >
                                        Inscrit
                                    </span>

                                    <span
                                        className={`cours-tab ${courseStatusLayout === "termine" ? "active" : ""}`}
                                        onClick={() => setCourseStatusLayout("termine")}
                                    >
                                        Terminé
                                    </span>

                                    <span
                                        className={`cours-tab ${courseStatusLayout === "annule" ? "active" : ""}`}
                                        onClick={() => setCourseStatusLayout("annule")}
                                    >
                                        Annulé
                                    </span>
                                </div>

                                <TableCours data={userSession} userId={userId} statusLayout={courseStatusLayout} />

                                {courseStatusLayout === "termine" && (
                                    <>
                                        <h2 className="my-5 pt-5">Vos évaluations</h2>
                                        {userEvaluation.length > 0 ? (
                                            <div className="container">
                                                <div className="row mx-1 p-3 border rounded-top-3 bg-white">
                                                    <div className="col-4">
                                                        <h6>Nom du cours</h6>
                                                    </div>
                                                    <div className="col-4">
                                                        <h6>Note</h6>
                                                    </div>
                                                    <div className="col-4">
                                                        <h6>Commentaire</h6>
                                                    </div>
                                                </div>
                                                {userEvaluation.map((evaluation) => (
                                                    <div key={evaluation.id} className="row mx-1 p-3 border bg-white">
                                                        <div className="col-4">
                                                            <h6>{evaluation.session.title}</h6>
                                                        </div>
                                                        <div className="col-4">
                                                            <h6>{evaluation.grade}/20</h6>
                                                        </div>
                                                        <div className="col-4">
                                                            <h6>{evaluation.description}</h6>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <h4 className="text-center">Vous n'avez pas encore été évalué</h4>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {currentLayout === "paiement" && (
                            <div className="p-5">
                                <h2 className="mb-5">Vos paiements</h2>
                                {userPayment.length > 0 ? (
                                    <div className="container">
                                        <div className="row mx-1 p-3 border rounded-top-3 bg-white">
                                            <div className="col-3">
                                                <h6>Nom du cours</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6>Montant</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6>Date</h6>
                                            </div>
                                            <div className="col-3">
                                                <h6>Facture</h6>
                                            </div>
                                        </div>
                                        {userPayment.map((payment) => (
                                            <div key={payment.id} className="row mx-1 p-3 border bg-white">
                                                <div className="col-3">
                                                    <h6>{payment.training.title}</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>{payment.amount}€</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>{formatDateISO(payment.date)}</h6>
                                                </div>
                                                <div className="col-3">
                                                    <button
                                                        className="btn btn-blue"
                                                        onClick={() => handleDownloadBill(payment)}
                                                    >
                                                        Télécharger la facture
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h4 className="text-center">Vous n'avez aucun paiement effectué</h4>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;