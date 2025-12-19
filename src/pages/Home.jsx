import { Link } from "react-router-dom";
import CookieAgreement from "../components/CookieAgreement.jsx";
import "../styles/Home.css";
import famousCourse1 from "../assets/images/famous_course1.webp";
import famousCourse2 from "../assets/images/famous_course2.webp";
import famousCourse3 from "../assets/images/famous_course3.webp";
import { useEffect, useState } from "react";

function Home() {
  const [showCookieAgreement, setShowCookieAgreement] = useState(false);

  useEffect(() => {
    const setLocalStorage = () => {
      if (
        localStorage.getItem("hasAcceptedCookies") === null ||
        localStorage.getItem("hasAcceptedCookies") === false
      ) {
        setShowCookieAgreement(true);
      }
    };
    setLocalStorage();
  }, []);

  function userAcceptCookies() {
    localStorage.setItem("hasAcceptedCookies", true);
    setShowCookieAgreement(false);
  }

  return (
    <>
      <CookieAgreement
        visible={showCookieAgreement}
        onConfirm={userAcceptCookies}
        onEdit={showCookieAgreement}
      />
      <header className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 id="header-title" className="text-center text-white">
              Libérez votre potentiel grâce à des
              <br />
              cours dispensés par des experts
            </h1>
            <p className="text-white text-center fs-4">
              Rejoignez une communauté dynamique d'apprenants et acquérez des
              compétences très recherchées grâce à nos programmes de formation
              complets.
            </p>
            <div className="d-flex justify-content-center">
              <Link className="btn btn-lg blue-button" to="/cours">
                Voir nos cours
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Cours populaires</h2>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-4">
            <img src={famousCourse1} className="famous-courses-image" />
            <h5 className="mt-4">
              Développement Back : Symfony, Spring Boot, Laravel...
            </h5>
            <p className="text-secondary">
              Maîtrisez les bases du développement back-end et créez des
              applications puissantes.
            </p>
          </div>
          <div className="col-4">
            <img src={famousCourse2} className="famous-courses-image" />
            <h5 className="mt-4">
              Administration système : Windows Server, Linux, Unix...
            </h5>
            <p className="text-secondary">
              Gérez et sécurisez efficacement vos serveurs et systèmes
              d’exploitation.
            </p>
          </div>
          <div className="col-4">
            <img src={famousCourse3} className="famous-courses-image" />
            <h5 className="mt-4">
              Réseaux et télécoms : VLAN, adressage, routage, VPN...
            </h5>
            <p className="text-secondary">
              Apprenez à concevoir et maintenir des réseaux fiables et
              performants.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <h2>Donnez les moyens à votre parcours d'apprentissage</h2>
          </div>
          <div className="col-8 fs-5">
            Chez TXLFORMA, nous nous engageons à fournir une éducation
            accessible et de haute qualité qui permet à chacun d'atteindre ses
            objectifs professionnels.
          </div>
        </div>
        <div className="row mt-4 mb-5 gx-4 gy-4">
          <div className="col-12 col-md-4 d-flex">
            <div className="grey-border-box flex-fill">
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H12H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V10V13C21 14.8856 21 15.8284 20.4142 16.4142C19.8284 17 18.8856 17 17 17H12H7C5.11438 17 4.17157 17 3.58579 16.4142C3 15.8284 3 14.8856 3 13V10V7Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21L11.625 17.5C11.8125 17.25 12.1875 17.25 12.375 17.5L15 21"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 9L12 13"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 7L16 13"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10L8 13"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h5 className="mt-3">Instructeurs experts</h5>
              <p className="text-secondary">
                Apprenez auprès de professionnels expérimentés, passionnés par
                l’enseignement et dédiés à votre réussite.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex">
            <div className="grey-border-box flex-fill">
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <path
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  d="M12,13 C14.209139,13 16,11.209139 16,9 C16,6.790861 14.209139,5 12,5 C9.790861,5 8,6.790861 8,9 C8,11.209139 9.790861,13 12,13 Z M6,22 L6,19 C6,15.6862915 8.6862915,13 12,13 C15.3137085,13 18,15.6862915 18,19 L18,22 M13,5 C13.4037285,3.33566165 15.0151447,2 17,2 C19.172216,2 20.98052,3.790861 21,6 C20.98052,8.209139 19.172216,10 17,10 L16,10 L17,10 C20.287544,10 23,12.6862915 23,16 L23,18 M11,5 C10.5962715,3.33566165 8.98485529,2 7,2 C4.82778404,2 3.01948003,3.790861 3,6 C3.01948003,8.209139 4.82778404,10 7,10 L8,10 L7,10 C3.71245602,10 1,12.6862915 1,16 L1,18"
                ></path>
              </svg>
              <h5 className="mt-3">Communauté collaborative</h5>
              <p className="text-secondary">
                Connectez-vous avec d’autres apprenants, partagez vos idées et
                construisez un réseau d’entraide.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex">
            <div className="grey-border-box flex-fill">
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="16"
                  r="3"
                  stroke="#000000"
                  strokeWidth="1.5"
                ></circle>
                <path
                  d="M12 19.2599L9.73713 21.4293C9.41306 21.74 9.25102 21.8953 9.1138 21.9491C8.80111 22.0716 8.45425 21.9667 8.28977 21.7C8.21758 21.583 8.19509 21.3719 8.1501 20.9496C8.1247 20.7113 8.112 20.5921 8.07345 20.4922C7.98715 20.2687 7.80579 20.0948 7.57266 20.0121C7.46853 19.9751 7.3442 19.963 7.09553 19.9386C6.65512 19.8955 6.43491 19.8739 6.31283 19.8047C6.03463 19.647 5.92529 19.3145 6.05306 19.0147C6.10913 18.8832 6.27116 18.7278 6.59523 18.4171L8.07345 16.9999L9.1138 15.9596"
                  stroke="#000000"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M12 19.2599L14.2629 21.4294C14.5869 21.7401 14.749 21.8954 14.8862 21.9492C15.1989 22.0717 15.5457 21.9668 15.7102 21.7001C15.7824 21.5831 15.8049 21.372 15.8499 20.9497C15.8753 20.7113 15.888 20.5921 15.9265 20.4923C16.0129 20.2688 16.1942 20.0949 16.4273 20.0122C16.5315 19.9752 16.6558 19.9631 16.9045 19.9387C17.3449 19.8956 17.5651 19.874 17.6872 19.8048C17.9654 19.6471 18.0747 19.3146 17.9469 19.0148C17.8909 18.8832 17.7288 18.7279 17.4048 18.4172L15.9265 17L15 16.0735"
                  stroke="#000000"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M17.3197 17.9957C19.2921 17.9748 20.3915 17.8512 21.1213 17.1213C22 16.2426 22 14.8284 22 12V9M7 17.9983C4.82497 17.9862 3.64706 17.8897 2.87868 17.1213C2 16.2426 2 14.8284 2 12L2 8C2 5.17157 2 3.75736 2.87868 2.87868C3.75736 2 5.17157 2 8 2L16 2C18.8284 2 20.2426 2 21.1213 2.87868C21.6112 3.36857 21.828 4.02491 21.9239 5"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M9 6L15 6"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M7 9.5H9M17 9.5H12.5"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
              <h5 className="mt-3">Certificats reconnus par l’industrie</h5>
              <p className="text-secondary">
                Obtenez des certificats reconnus par les entreprises leaders et
                valorisez votre expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
