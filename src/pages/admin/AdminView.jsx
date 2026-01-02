import { useState } from "react";
import "../../styles/AdminDashboard.css";
import AdminFormation from "../../components/admin/AdminFormation";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminSession from "../../components/admin/AdminSession";
import AdminAccounts from "../../components/admin/AdminAccounts";
import AdminInstructors from "../../components/admin/AdminInstructors";
import AdminPlaces from "../../components/admin/AdminPlaces";
import ProfileComponents from "../../components/ProfileComponents";
import { useAuth } from "../../contexts/AuthContext";

function AdminView() {
  const [CurrentLayout, SetCurrentLayout] = useState("dashboard");
  const {
    userId,
    userEmail,
    userFirstname,
    userLastname,
    userPhone,
    userImage,
    logout,
  } = useAuth();

  document.title = "Admin - Dashboard";

  return (
    <div className="admin-view">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-3">
            <div className="profil gestionnaire ms-3">
              <h4>Profil</h4>
              <div
                className={`${
                  CurrentLayout === "profile" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("profile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M320 128C284.7 128 256 156.7 256 192C256 227.3 284.7 256 320 256C355.3 256 384 227.3 384 192C384 156.7 355.3 128 320 128zM208 192C208 130.1 258.1 80 320 80C381.9 80 432 130.1 432 192C432 253.9 381.9 304 320 304C258.1 304 208 253.9 208 192zM192 416C174.3 416 160 430.3 160 448L160 480C160 497.7 145.7 512 128 512C110.3 512 96 497.7 96 480L96 448C96 394.1 138.1 352 192 352L448 352C501.9 352 544 394.1 544 448L544 480C544 497.7 529.7 512 512 512C494.3 512 480 497.7 480 480L480 448C480 430.3 465.7 416 448 416L192 416z" />
                </svg>
                <span>Mon Profil</span>
              </div>
            </div>
            <div className="gestionnaire ms-3">
              <h4>Gestionnaire</h4>
              <div
                className={`${
                  CurrentLayout === "dashboard" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z" />
                </svg>
                <span>Tableau de bord</span>
              </div>
              <div
                className={`${
                  CurrentLayout === "formation" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("formation")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                </svg>
                <span>Formations</span>
              </div>
              <div
                className={`${
                  CurrentLayout === "sessions" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("sessions")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                </svg>
                <span>Sessions</span>
              </div>
              <div
                className={`${
                  CurrentLayout === "instructors" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("instructors")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M544 144C552.8 144 560 151.2 560 160L560 480C560 488.8 552.8 496 544 496L96 496C87.2 496 80 488.8 80 480L80 160C80 151.2 87.2 144 96 144L544 144zM96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 160C608 124.7 579.3 96 544 96L96 96zM240 312C270.9 312 296 286.9 296 256C296 225.1 270.9 200 240 200C209.1 200 184 225.1 184 256C184 286.9 209.1 312 240 312zM208 352C163.8 352 128 387.8 128 432C128 440.8 135.2 448 144 448L336 448C344.8 448 352 440.8 352 432C352 387.8 316.2 352 272 352L208 352zM408 208C394.7 208 384 218.7 384 232C384 245.3 394.7 256 408 256L488 256C501.3 256 512 245.3 512 232C512 218.7 501.3 208 488 208L408 208zM408 304C394.7 304 384 314.7 384 328C384 341.3 394.7 352 408 352L488 352C501.3 352 512 341.3 512 328C512 314.7 501.3 304 488 304L408 304z" />
                </svg>
                <span>Enseignants</span>
              </div>
              <div
                className={`${
                  CurrentLayout === "accounts" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("accounts")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M448 112C456.8 112 464 119.2 464 128L464 512C464 520.8 456.8 528 448 528L160 528C151.2 528 144 520.8 144 512L144 128C144 119.2 151.2 112 160 112L448 112zM160 64C124.7 64 96 92.7 96 128L96 512C96 547.3 124.7 576 160 576L448 576C483.3 576 512 547.3 512 512L512 128C512 92.7 483.3 64 448 64L160 64zM304 312C334.9 312 360 286.9 360 256C360 225.1 334.9 200 304 200C273.1 200 248 225.1 248 256C248 286.9 273.1 312 304 312zM272 352C227.8 352 192 387.8 192 432C192 440.8 199.2 448 208 448L400 448C408.8 448 416 440.8 416 432C416 387.8 380.2 352 336 352L272 352zM576 144C576 135.2 568.8 128 560 128C551.2 128 544 135.2 544 144L544 208C544 216.8 551.2 224 560 224C568.8 224 576 216.8 576 208L576 144zM560 256C551.2 256 544 263.2 544 272L544 336C544 344.8 551.2 352 560 352C568.8 352 576 344.8 576 336L576 272C576 263.2 568.8 256 560 256zM576 400C576 391.2 568.8 384 560 384C551.2 384 544 391.2 544 400L544 464C544 472.8 551.2 480 560 480C568.8 480 576 472.8 576 464L576 400z" />
                </svg>
                <span>Comptes</span>
              </div>
              <div
                className={`${
                  CurrentLayout === "places" ? "selected-button" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => SetCurrentLayout("places")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M320 0C261.9 0 213.3 48.6 213.3 106.7C213.3 176 320 320 320 320C320 320 426.7 176 426.7 106.7C426.7 48.6 378.1 0 320 0zM320 160C293.5 160 272 138.5 272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160zM0 416C0 398.3 14.3 384 32 384L608 384C625.7 384 640 398.3 640 416C640 433.7 625.7 448 608 448L32 448C14.3 448 0 433.7 0 416zM64 512C64 494.3 78.3 480 96 480L544 480C561.7 480 576 494.3 576 512C576 529.7 561.7 544 544 544L96 544C78.3 544 64 529.7 64 512z" />
                </svg>
                <span>Lieux</span>
              </div>
            </div>
          </div>
          <div className="col-9">
            {CurrentLayout === "dashboard" && <AdminDashboard />}
            {CurrentLayout === "formation" && <AdminFormation />}
            {CurrentLayout === "sessions" && <AdminSession />}
            {CurrentLayout === "accounts" && <AdminAccounts />}
            {CurrentLayout === "instructors" && <AdminInstructors />}
            {CurrentLayout === "places" && <AdminPlaces />}
            {CurrentLayout === "profile" && (
              <ProfileComponents
                userId={userId}
                userEmail={userEmail}
                userFirstname={userFirstname}
                userLastname={userLastname}
                userPhone={userPhone}
                userImage={userImage}
                logout={logout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminView;
