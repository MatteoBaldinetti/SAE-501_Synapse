import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProfSidebarCollapsible({ currentSection, onSectionChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useAuth();

  const menuItems = [
    {
      path: "/prof-dashboard",
      section: "formation",
      label: "Tableau de bord",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="me-2"
          style={{ width: "1.5em", height: "1.5em" }}
        >
          <path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z" />
        </svg>
      ),
    },
    {
      path: "/sessions",
      section: "sessions",
      label: "Sessions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="me-2"
          style={{ width: "1.5em", height: "1.5em" }}
        >
          <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
        </svg>
      ),
    },
    {
      path: "/mes-eleves",
      section: "inscriptions",
      label: "Inscriptions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="me-2"
          style={{ width: "1.5em", height: "1.5em" }}
        >
          <path d="M544 144C552.8 144 560 151.2 560 160L560 480C560 488.8 552.8 496 544 496L96 496C87.2 496 80 488.8 80 480L80 160C80 151.2 87.2 144 96 144L544 144zM96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 160C608 124.7 579.3 96 544 96L96 96zM240 312C270.9 312 296 286.9 296 256C296 225.1 270.9 200 240 200C209.1 200 184 225.1 184 256C184 286.9 209.1 312 240 312zM208 352C163.8 352 128 387.8 128 432C128 440.8 135.2 448 144 448L336 448C344.8 448 352 440.8 352 432C352 387.8 316.2 352 272 352L208 352zM408 208C394.7 208 384 218.7 384 232C384 245.3 394.7 256 408 256L488 256C501.3 256 512 245.3 512 232C512 218.7 501.3 208 488 208L408 208zM408 304C394.7 304 384 314.7 384 328C384 341.3 394.7 352 408 352L488 352C501.3 352 512 341.3 512 328C512 314.7 501.3 304 488 304L408 304z" />
        </svg>
      ),
    },
  ];

  const profileItem = {
    path: `/prof-profile/${userId}`,
    section: "profile",
    label: "Mon Profil",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="me-2"
        style={{ width: "1.5em", height: "1.5em" }}
      >
        <path d="M320 128C284.7 128 256 156.7 256 192C256 227.3 284.7 256 320 256C355.3 256 384 227.3 384 192C384 156.7 355.3 128 320 128zM208 192C208 130.1 258.1 80 320 80C381.9 80 432 130.1 432 192C432 253.9 381.9 304 320 304C258.1 304 208 253.9 208 192zM192 416C174.3 416 160 430.3 160 448L160 480C160 497.7 145.7 512 128 512C110.3 512 96 497.7 96 480L96 448C96 394.1 138.1 352 192 352L448 352C501.9 352 544 394.1 544 448L544 480C544 497.7 529.7 512 512 512C494.3 512 480 497.7 480 480L480 448C480 430.3 465.7 416 448 416L192 416z" />
      </svg>
    ),
  };

  const handleItemClick = (item) => {
    if (onSectionChange) {
      // Si on utilise les sections (comme dans CourseContent)
      onSectionChange(item.section);
    } else {
      // Si on utilise la navigation (comme dans ProfDashboard)
      navigate(item.path);
    }
  };

  const isItemActive = (item) => {
    if (currentSection) {
      // Mode section (CourseContent)
      return currentSection === item.section;
    } else {
      // Mode navigation (ProfDashboard)
      return location.pathname === item.path;
    }
  };

  return (
    <div className="col-3 prof-sidebar">
      <div className="profil gestionnaire ms-3">
        <h4>Profil</h4>
        <div
          className={`${
            isItemActive(profileItem) ? "selected-button-prof" : ""
          } d-flex align-items-center p-2 my-2`}
          onClick={() => handleItemClick(profileItem)}
          style={{ cursor: "pointer" }}
        >
          {profileItem.icon}
          <span>{profileItem.label}</span>
        </div>
      </div>
      <div className="gestionnaire ms-3">
        <h4>Gestionnaire</h4>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${
              isItemActive(item) ? "selected-button-prof" : ""
            } d-flex align-items-center p-2 my-2`}
            onClick={() => handleItemClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfSidebarCollapsible;
