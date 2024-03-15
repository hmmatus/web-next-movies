import React, { type ReactElement } from "react"
import { type MovieI } from "@/models/movie.model"
import { UserRole } from "@/models/user.model"
import { Colors } from "@/styles/colors"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { Flex, Skeleton, Space } from "antd"
import Image from "next/image"

const HeartIcon = ({ isLiked }: { isLiked: boolean }): ReactElement => {
  const commonStyle = {
    color: Colors.like,
    fontSize: "32px",
  }
  return (
    <div>
      {isLiked ? (
        <HeartFilled style={commonStyle} />
      ) : (
        <HeartOutlined style={commonStyle} />
      )}
    </div>
  )
}

const MovieSkeleton = (): ReactElement => {
  return (
    <Space className="animate-pulse">
      <Skeleton.Image />
      <Skeleton />
      <Skeleton />
    </Space>
  )
}
const MovieCard = ({
  movie,
  loading,
  isLoggedIn,
  userRole,
}: {
  movie: MovieI
  loading: boolean
  isLoggedIn: boolean
  userRole: UserRole
}): ReactElement => {
  const isUser = isLoggedIn && userRole === UserRole.user
  if (loading) {
    return <MovieSkeleton />
  }
  return (
    <Flex vertical className="border w-full h-full">
      <div
        className="relative flex flex-3"
        style={{ width: "100%", minHeight: "500px" }}
      >
        <Image alt={`${movie.title}`} src={movie.image} fill loading="lazy" />
        <div className={`${!isUser ? "hidden" : "absolute"} top-2 left-2`}>
          <HeartIcon isLiked={true} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 justify-between">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p className="self-end underline text-primary cursor-pointer">
          Read More
        </p>
      </div>
    </Flex>
  )
}

export default MovieCard
