import MainButton from "@/components/elements/buttons/MainButton/MainButton";
import ProtectedRoute from "@/components/elements/protected/ProtectedRoute/ProtectedRoute";
import AdminHomeLayout from "@/components/layouts/admin/home/HomeLayout";
import { UserRole } from "@/models/user";

export default function Page() {
  return (
    <ProtectedRoute userRoles={[UserRole.admin]}>
      <AdminHomeLayout />
    </ProtectedRoute>
  );
}
