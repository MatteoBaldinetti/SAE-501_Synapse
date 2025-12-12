import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useRef } from "react";
function AdminDashboard() {
  const { userId, userEmail, userFirstname, userLastname, userType } =
    useAuth();

  const countupRef = useRef(null);
  let nbrUsers = 4384;

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");
    const countUpAnim = new countUpModule.CountUp(countupRef.current, nbrUsers);
    if (!countUpAnim.error) {
      countUpAnim.start();
    } else {
      console.error(countUpAnim.error);
    }
  }

  return (
    <div>
      <h4>
        Bienvenue, {userFirstname} {userLastname}
      </h4>
      <div className="container">
        <div className="row gap-3 flex-nowrap">
          <div className="col-lg-6 col-md-6 col-sm-12 bg-white p-4 rounded-3">
            <h5>Nombre d'utilisateurs</h5>
            <span ref={countupRef}></span>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 bg-white p-4 rounded-3">
            <h5>Nombre de formations</h5>
            <span ref={countupRef}></span>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
