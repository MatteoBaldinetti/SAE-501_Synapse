import "../../styles/Error403.css";
import { Link } from "react-router-dom";

function Error403() {
  return (
    <div className="error-403 m-5">
      <h1>403</h1>
      <h2>Accès interdit</h2>
      <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
      <Link className="btn btn-primary mt-3 blue-button" to="/">
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default Error403;
