import { CinemaI } from "@/models/cinema";

type CinemaCardP = {
  cinema: CinemaI;
  onClick(): void;
};
const CinemaCard = ({ cinema, onClick }: CinemaCardP) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center w-60 min-h-60 rounded-lg shadow-md hover:border-2 hover:cursor-pointer"
    >
      <h1 className="text-xl font-bold mb-4">{cinema.name}</h1>
      <p className="text-xl">Enter</p>
    </div>
  );
};

export default CinemaCard;
