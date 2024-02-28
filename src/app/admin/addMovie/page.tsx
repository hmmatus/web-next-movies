import ProtectedRoute from "@/components/elements/protected/ProtectedRoute/ProtectedRoute";
import AddMovieLayout from "@/components/layouts/admin/movie/AddMovie";
import { UserRole } from "@/models/user";

export default async function Page() {
  return (
    <ProtectedRoute userRoles={[UserRole.admin]}>
      <AddMovieLayout />
    </ProtectedRoute>
  );
}
