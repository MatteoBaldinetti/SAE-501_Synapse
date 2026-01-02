import "../../styles/CoursPayment.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import { useAuth } from "../../contexts/AuthContext";

function CoursPayment() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const location = useLocation();
  const id = location.state;

  const [data, setData] = useState([]);
  const [payment, setPayment] = useState("card");
  const [displayPayment, setDisplayPayment] = useState("card");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [billingInfo, setBillingInfo] = useState({
    company: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
  });

  const [sameAddress, setSameAddress] = useState(false);

  const [cardData, setCardData] = useState({
    number: "",
    exp: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= HANDLERS ================= */

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    if (id === "postalCode") {
      newValue = newValue.replace(/\D/g, "").slice(0, 5);
    }

    if (id === "phone") {
      let digits = newValue.replace(/\D/g, "").slice(0, 10);
      newValue = digits.replace(/(\d{2})(?=\d)/g, "$1 ");
    }

    setPersonalInfo((prev) => ({ ...prev, [id]: newValue }));

    if (
      sameAddress &&
      ["address1", "address2", "postalCode", "city"].includes(id)
    ) {
      setBillingInfo((prev) => ({ ...prev, [id]: newValue }));
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "postalCode") {
      newValue = newValue.replace(/\D/g, "").slice(0, 5);
    }

    setBillingInfo((prev) => ({ ...prev, [name]: newValue }));
  };

  const toggleSameAddress = () => {
    const newValue = !sameAddress;
    setSameAddress(newValue);

    if (newValue) {
      setBillingInfo({
        company: "",
        address1: personalInfo.address1,
        address2: personalInfo.address2,
        postalCode: personalInfo.postalCode,
        city: personalInfo.city,
      });
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      let digits = value.replace(/\D/g, "").slice(0, 16);
      digits = digits.replace(/(.{4})/g, "$1 ").trim();
      setCardData((prev) => ({ ...prev, number: digits }));
    } else if (name === "cvc") {
      let digits = value.replace(/\D/g, "").slice(0, 3);
      setCardData((prev) => ({ ...prev, cvc: digits }));
    }
  };

  const handleCardDate = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardData((prev) => ({ ...prev, exp: value }));
  };

  const changePayment = (method) => {
    if (method === payment) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPayment(method);
      setDisplayPayment(method);
      setIsTransitioning(false);
    }, 300);
  };

  /* ================= VALIDATION ================= */

  const isFormValid = () => {
    const requiredPersonalFields = [
      "firstName",
      "lastName",
      "address1",
      "postalCode",
      "city",
      "email",
    ];

    for (const field of requiredPersonalFields) {
      if (!personalInfo[field]?.trim()) return false;
    }

    if (!sameAddress) {
      const requiredBillingFields = ["address1", "postalCode", "city"];
      for (const field of requiredBillingFields) {
        if (!billingInfo[field]?.trim()) return false;
      }
    }

    if (payment === "card") {
      if (
        cardData.number.replace(/\s/g, "").length !== 16 ||
        cardData.cvc.length !== 3 ||
        cardData.exp.length !== 5
      ) {
        return false;
      }
    }

    if (Object.keys(errors).length > 0) return false;

    return true;
  };

  /* ================= PAYMENT ================= */

  const handlePayment = async () => {
    if (!isFormValid()) return;

    const session = await fetch(
      `${API_URL}/sessions/search?userId=${userId}&trainingId=${data.id}`
    );
    const sessionJson = await session.json();

    const inscription = {
      inscriptionDate: new Date().toISOString(),
      status: "CONFIRM",
      date: sessionJson[0].endDate,
      amount: data.price,
      user: { id: userId },
      session: { id: sessionJson[0].id },
      training: { id: data.id },
    };

    await fetch(`${API_URL}/inscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inscription),
    });

    navigate("/payment-confirmation");
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/trainings/${id}`);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const newErrors = {};

    if (personalInfo.postalCode && personalInfo.postalCode.length !== 5)
      newErrors.postalCode = "Code postal invalide";

    if (personalInfo.email && !/^\S+@\S+\.\S+$/.test(personalInfo.email))
      newErrors.email = "Email invalide";

    if (
      personalInfo.phone &&
      personalInfo.phone.replace(/\s/g, "").length !== 10
    )
      newErrors.phone = "Téléphone invalide";

    if (cardData.number && cardData.number.replace(/\s/g, "").length !== 16)
      newErrors.number = "Numéro de carte invalide";

    if (cardData.cvc && cardData.cvc.length !== 3)
      newErrors.cvc = "CVC invalide";

    setErrors(newErrors);
  }, [personalInfo, cardData]);

  /* ================= JSX ================= */

  const renderDrawer = (method) => {
    if (method === "card") {
      return (
        <>
          <h6>Carte bancaire</h6>
          <div className="mb-3">
            <label className="form-label">Numéro de carte</label>
            <input
              type="text"
              className={`form-control ${errors.number ? "is-invalid" : ""}`}
              name="number"
              value={cardData.number}
              onChange={handleCardChange}
            />
            {errors.number && (
              <div className="invalid-feedback">{errors.number}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date d'expiration</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM/AA"
                value={cardData.exp}
                onChange={handleCardDate}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">CVC</label>
              <input
                type="text"
                className={`form-control ${errors.cvc ? "is-invalid" : ""}`}
                name="cvc"
                value={cardData.cvc}
                onChange={handleCardChange}
              />
              {errors.cvc && (
                <div className="invalid-feedback">{errors.cvc}</div>
              )}
            </div>
          </div>
        </>
      );
    }

    if (method === "paypal") {
      return (
        <>
          <h6>PayPal</h6>
          <p className="text-secondary">
            Vous serez redirigé vers PayPal pour finaliser votre paiement.
          </p>
          <button className="btn btn-light border">
            Se connecter à PayPal
          </button>
        </>
      );
    }

    if (method === "googlepay") {
      return (
        <>
          <h6>Google Pay</h6>
          <p className="text-secondary">
            Vous serez redirigé vers Google Pay pour finaliser votre paiement.
          </p>
          <button className="btn btn-dark">Google Pay</button>
        </>
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8 px-5 left-scroll-container">
          <div className="row pt-4 px-1 mb-3">
            <div className="col-12 d-flex align-items-center gap-4 cours-header mx-auto">
              <Link className="btn btn-return" to={`/cours-detail/${data.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={30}
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#ffffff"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 544 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-434.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"
                  />
                </svg>
              </Link>
              <p className="text-secondary m-0">
                <Link className="text-secondary ariane-link" to={"/cours"}>
                  Cours
                </Link>{" "}
                /{" "}
                <Link
                  className="text-secondary ariane-link"
                  to={`/cours-detail/${id}`}
                >
                  {data.title}
                </Link>{" "}
                / <span className="active-ariane-link">Paiement</span>
              </p>
            </div>
          </div>
          <h2 className="pt-5">Paiement</h2>
          <hr className="my-4" />
          <h4 className="ps-5">1. Informations personnelles</h4>
          <div className="card m-5 p-4 shadow-sm mt-3">
            <form>
              <p className="text-end mb-0">
                <span className="text-danger">*</span> obligatoire
              </p>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Nom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    required
                    value={personalInfo.firstName}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Prénom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    required
                    value={personalInfo.lastName}
                    onChange={handlePersonalChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Adresse <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  placeholder="Rue et numéro"
                  required
                  value={personalInfo.address1}
                  onChange={handlePersonalChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Complément d'adresse</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Appartement, étage, etc."
                  value={personalInfo.address2}
                  onChange={handlePersonalChange}
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Code postal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.postalCode ? "is-invalid" : ""
                      }`}
                    id="postalCode"
                    required
                    value={personalInfo.postalCode}
                    onChange={handlePersonalChange}
                  />
                  {errors.postalCode && (
                    <div className="invalid-feedback">{errors.postalCode}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Ville <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    required
                    value={personalInfo.city}
                    onChange={handlePersonalChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""
                      }`}
                    id="email"
                    required
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""
                      }`}
                    id="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <hr className="my-4" />
          <h4 className="ps-5">2. Adresse de facturation</h4>
          <div className="card m-5 p-4 shadow-sm mt-3">
            <form>
              <div className="row">
                <div className="col-8">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sameAddress"
                      checked={sameAddress}
                      onChange={toggleSameAddress}
                    />
                    <label className="form-check-label" htmlFor="sameAddress">
                      Utiliser la même adresse que les informations personnelles
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <p className="text-end mb-0">
                    <span className="text-danger">*</span> obligatoire
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Entreprise</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={billingInfo.company}
                  onChange={handleBillingChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Adresse <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address1"
                  placeholder="Rue et numéro"
                  required
                  disabled={sameAddress}
                  value={billingInfo.address1}
                  onChange={handleBillingChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Complément d'adresse</label>
                <input
                  type="text"
                  className="form-control"
                  name="address2"
                  placeholder="Appartement, étage, etc."
                  disabled={sameAddress}
                  value={billingInfo.address2}
                  onChange={handleBillingChange}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Code postal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    required
                    disabled={sameAddress}
                    value={billingInfo.postalCode}
                    onChange={handleBillingChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Ville <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    required
                    disabled={sameAddress}
                    value={billingInfo.city}
                    onChange={handleBillingChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <hr className="my-4" />
          <div className="px-5 mb-5">
            <h4>3. Mode de paiement</h4>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="card"
                value="card"
                onChange={() => changePayment("card")}
                checked={payment === "card"}
              />
              <label className="form-check-label" htmlFor="card">
                Carte bancaire
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="paypal"
                onChange={() => changePayment("paypal")}
                checked={payment === "paypal"}
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="googlepay"
                value="googlepay"
                onChange={() => changePayment("googlepay")}
                checked={payment === "googlepay"}
              />
              <label className="form-check-label" htmlFor="googlepay">
                Google Pay
              </label>
            </div>

            <div className="payment-wrapper">
              {isTransitioning && (
                <div className="payment-card fade-out">
                  {renderDrawer(displayPayment)}
                </div>
              )}
              {!isTransitioning && (
                <div className="payment-card fade-in">
                  {renderDrawer(payment)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-4 bg-body-tertiary right-fixed">
          <div className="row px-5">
            <h3 className="mt-5 mb-4">Récapitulatif de la commande</h3>
            <p>Prix HT : {data.price * 0.95}€</p>
            <p>TVA (5%) : {data.price * 0.05}€</p>
            <hr className="total-separator" />
            <p className="fw-bold">Total : {data.price}€</p>
            <p className="small-text text-secondary">
              En validant votre achat, vous acceptez ces{" "}
              <Link className="cgu-link" to={"/cgu"}>
                Conditions générales d'utilisation
              </Link>
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-payment d-flex align-items-center justify-content-center gap-2" onClick={handlePayment} disabled={!isFormValid()}>
                <svg
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#ffffff"
                    d="M400 192h-24v-72C376 53.8 322.2 0 256 0S136 53.8 136 120v72H112c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48zM184 120c0-39.7 32.3-72 72-72s72 32.3 72 72v72H184v-72zm216 344c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v224z"
                  />
                </svg>
                Payer {data.price}€
              </button>
              
            </div>
            <p className="mt-4 fw-bold text-center">
              Garantie satisfait ou remboursé de 30 jours
            </p>
            <p className="text-center text-secondary">
              Vous n'êtes pas satisfait ? Obtenez un remboursement intégral dans
              un délai de 30 jours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursPayment;
