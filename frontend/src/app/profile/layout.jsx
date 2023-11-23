import NormalLayout from "@/components/layouts/NormalLayout";
import ProfileRenderer from "@/components/profile/ProfileRenderer";
const ProfileLayout = ({ children }) => {
  return (
    <NormalLayout>
      <ProfileRenderer>{children}</ProfileRenderer>
    </NormalLayout>
  );
};
export default ProfileLayout;
