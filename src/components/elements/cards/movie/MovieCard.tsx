import React, { type ReactElement } from "react"
import { type MovieI } from "@/models/movie.model"
import { type UserRole } from "@/models/user.model"
import { Colors } from "@/styles/colors"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { Skeleton, Space } from "antd"
import Image from "next/image"
import styles from "./style.module.css"
import Link from "next/link"
const HeartIcon = ({ isLiked }: { isLiked: boolean }): ReactElement => {
  const commonStyle = {
    color: Colors.like,
    fontSize: "32px",
  }
  return (
    <div className="cursor-pointer">
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
}: {
  movie: MovieI
  loading: boolean
  isLoggedIn: boolean
  userRole: UserRole
}): ReactElement => {
  if (loading) {
    return <MovieSkeleton />
  }
  return (
    <div className={`${styles.container}`}>
      <Image
        className={`${styles.image}`}
        alt={movie.title}
        src={movie.image}
        fill
      />
      <div className={`${styles.preview}`}>
        <div className="flex justify-between mr-2">
          <h3>{movie.title}</h3>
          <HeartIcon isLiked />
        </div>
        <p>{movie.description}</p>
        <Link
          className="max-w-max"
          href={{
            pathname: "details",
            query: {
              movie: JSON.stringify(movie),
            },
          }}
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
