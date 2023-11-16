import Layout from "@/components/Layout";
import "@/styles/profile/profile.css";
const ProfileLayout = ({ children }) => {
  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-account-section">
          <h2>@Username</h2>
          <span>Email@gmail.con</span>
        </div>

        <div className="profile-record-section">
          <ul className="nav-records">
            <li>Favorites</li>
            <li>Orders</li>
          </ul>

          <div>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProfileLayout;
