import "../../styles/Error401.css";
import { Link } from "react-router-dom";

function Error401() {
  return (
    <div className="error-401 m-5">
      <h1>401</h1>
      <h2>Non identifié</h2>
      <p>Vous n'êtes pas identifié pour accéder à cette page.</p>
      <Link className="btn btn-primary mt-3 blue-button" to="/">
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default Error401;
