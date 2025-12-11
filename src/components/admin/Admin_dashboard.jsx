import { useAuth } from "../../contexts/AuthContext";

function AdminDashboard() {
  const { userId, userEmail, userFirstname, userLastname, userType } =
    useAuth();
  return (
    <div>
      <h4>
        Bienvenue, {userFirstname} {userLastname}
      </h4>
    </div>
  );
}

export default AdminDashboard;
