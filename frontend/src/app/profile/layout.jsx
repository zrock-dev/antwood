import Layout from "@/components/Layout";
import ProfileRenderer from "@/components/profile/ProfileRenderer";
const ProfileLayout = ({ children }) => {
  return (
    <Layout>
    <ProfileRenderer>{children}</ProfileRenderer>
    </Layout>
  );
};
export default ProfileLayout;
