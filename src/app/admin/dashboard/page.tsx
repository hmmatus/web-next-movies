"use client";
import LoadingLayout from "@/components/layouts/loading/LoadingLayout";
import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { GetMovieFilters } from "@/models/user.model";
import { movieService } from "@/service/movies/movieService";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Space, Table, TableColumnType } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const columns: TableColumnType<MovieI>[] = [
  {
    title: "Image",
    dataIndex: "image",
    width: 200,
    render: (_, record: MovieI) => (
      <div className="relative w-full h-80">
        <Image src={record.image} fill alt={"Logo image"} />
      </div>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Stock",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Actions",

    render: (_, record: MovieI) => (
      <div className="flex w-full gap-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    ),
  },
];

async function getMoviesData(
  data: Partial<GetMovieFilters>
): Promise<GetMovieResponseI> {
  const result = await movieService.getMovies(data);
  return result;
}
export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["moviesData"],
    queryFn: () =>
      getMoviesData({
        currentPage: currentPage,
        limit: 3,
      }),
    retry: 2,
    enabled: true,
  });
  const handleNewMovie = () => {
    router.push("/admin/dashboard/addMovie");
  };
  useEffect(() => {
    refetch();
  }, [currentPage]);

  if (isLoading) {
    return <LoadingLayout />;
  }
  return (
    <Space className="flex flex-col">
      <Button onClick={handleNewMovie}>Add Movie</Button>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={{
          current: data?.currentPage,
          total: data?.pages,
          onChange: (value: number) => setCurrentPage(value),
        }}
      />
    </Space>
  );
}
