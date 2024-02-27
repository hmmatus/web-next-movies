import ProtectedRoute from "@/components/elements/protected/ProtectedRoute/ProtectedRoute";
import AdminHomeLayout from "@/components/layouts/admin/home/HomeLayout";
import { UserRole } from "@/models/user";

export default async function Page() {
  return (
    <ProtectedRoute userRoles={[UserRole.admin]}>
      <AdminHomeLayout />
    </ProtectedRoute>
  );
}
