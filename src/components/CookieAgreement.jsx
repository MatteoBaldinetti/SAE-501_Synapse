import "../styles/CookieAgreement.css";

function CookieAgreement({ visible, onEdit, onConfirm }) {
  if (!visible) return null;

  return (
    <div className="container fixed-bottom me-1 mb-1">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6 p-4 bg-white border rounded-3">
          <div className="container d-flex">
            <div className="row">
              <div className="col-8 text-start text-black">
                <h5>Voulez-vous accepter les cookies ?</h5>
                <p>
                  En utilisant notre site, vous acceptez l'utilisation des
                  cookies pour améliorer votre expérience.
                </p>
              </div>
              <div className="col-4 justify-content-end">
                <button
                  className="btn ca-confirm w-100 mb-1"
                  onClick={onConfirm}
                >
                  Accepter
                </button>
                <button className="btn ca-choose w-100 mt-1" onClick={onEdit}>
                  Choisir les cookies
                </button>
              </div>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}

function editCookiesAgreement() {}

export default CookieAgreement;
