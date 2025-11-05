import "../styles/Navbar.css"
import smallLogo from '../../public/images/smallLogo.webp'

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand ms-5" href="#">
                    <img src={smallLogo} height={"60vh"} width={"auto"}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <a className="nav-link" aria-current="page" href="#">Accueil</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" aria-current="page" href="#">Cours</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" aria-current="page" href="#">Instructeurs</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" aria-current="page" href="#">À propos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Contact</a>
                        </li>
                    </ul>
                    <button className="btn blue-button me-3" type="submit">Se connecter</button>
                    <button className="btn blue-button-outline" type="submit">S'inscrire</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;