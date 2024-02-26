import { CinemaI } from "@/models/cinema";

type CinemaCardP = {
  cinema: CinemaI
}
const CinemaCard = ({cinema}:CinemaCardP) => {
  return (
    <div className="w-60 min-h-60 bg-primary">
      <h1>{cinema.name}</h1>
    </div>
  )
}

export default CinemaCard;