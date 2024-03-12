import { MovieI } from "@/models/movie.model";
import { UserRole } from "@/models/user.model";
import { Colors } from "@/styles/colors";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Flex, Skeleton, Space } from "antd";
import Image from "next/image";

const HeartIcon = ({ isLiked }: { isLiked: boolean }) => {
  const commonStyle = {
    color: Colors.like,
    fontSize: "32px"
  };
  return (
    <div>
      {isLiked ? (
        <HeartFilled  style={commonStyle} />
      ) : (
        <HeartOutlined  style={commonStyle} />
      )}
    </div>
  );
};

const MovieSkeleton = () => {
  return (
    <Space>
      <Skeleton.Image />
      <Skeleton />
      <Skeleton />
    </Space>
  );
};
const MovieCard = ({
  movie,
  loading,
  isLoggedIn,
  userRole,
}: {
  movie: MovieI;
  loading: boolean;
  isLoggedIn: boolean;
  userRole: UserRole;
}) => {
  const isUser = isLoggedIn && userRole === UserRole.user;
  if (loading) {
    return <MovieSkeleton />;
  }
  return (
    <Flex vertical className="border">
      <div className="relative flex flex-3" style={{width: "100%", height: "500px"}}>
        <Image alt={`${movie.title}`} src={movie.image} fill loading="lazy" />
        <div className={`${!isUser ? "hidden" : "absolute"} top-2 left-2`}>
          <HeartIcon isLiked={true} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p className="self-end underline text-primary cursor-pointer">Read More</p>
      </div>
    </Flex>
  );
};

export default MovieCard;
