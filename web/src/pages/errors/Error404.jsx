import "../../styles/Error404.css";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="error-404 m-5">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link className="btn btn-primary mt-3 blue-button" to="/">
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default Error404;
