import ProtectedRoute from "@/components/elements/protected/ProtectedRoute/ProtectedRoute";
import HomeLayout from "@/components/layouts/home/HomeLayout";
import { UserRole } from "@/models/user";
import { cinemaService } from "@/service/cinema/cinemaService";
async function getCinemas(){
  try {
    const result = await cinemaService.getallCinemas();
    return result.results;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export default async function Page(){
  const cinemas = await getCinemas();
  return (
    <ProtectedRoute userRoles={[UserRole.customer]}>
      <HomeLayout cinemas={cinemas}/>
    </ProtectedRoute>
  )
}