"use client";
import LoadingLayout from "@/components/layouts/loading/LoadingLayout";
import { GetMovieResponseI, MovieI } from "@/models/movie.model";
import { GetMovieFilters } from "@/models/user.model";
import { movieService } from "@/service/movies/movieService";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Modal, Space, Table, TableColumnType } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getMoviesData(
  data: Partial<GetMovieFilters>
): Promise<GetMovieResponseI> {
  const result = await movieService.getMovies(data);
  return result;
}

async function deleteQuery(movie: MovieI) {
  // const result = await movieService.deleteMovie(movie.id);
}
export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [selectedMovie, setSelectedMovie] = useState<MovieI>();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleDelete = (movie: MovieI) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const deleteMovie = (movie: MovieI) => {
    deleteQuery(movie)
  }
  useEffect(() => {
    refetch();
  }, [currentPage]);
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
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Sale Amount",
      dataIndex: "saleAmount",
      key: "saleAmount",
    },
    {
      title: "Stock",
      dataIndex: "rentAmount",
      key: "rentAmount",
    },
    {
      title: "Actions",

      render: (_, record: MovieI) => (
        <div className="flex w-full gap-2">
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </div>
      ),
    },
    {
      className: "font-2xl",
    },
  ];

  if (isLoading) {
    return <LoadingLayout />;
  }
  return (
    <main className="flex flex-col">
      <Button
        type="primary"
        className="flex self-start justify-self-start m-2"
        onClick={handleNewMovie}
      >
        Add Movie
      </Button>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          current: data?.currentPage,
          total: data?.pages,
          onChange: (value: number) => setCurrentPage(value),
        }}
      />
      <Modal
        title={`Delete ${selectedMovie?.title ?? ""}`}
        open={isModalOpen}
        onOk={() => {
          if (selectedMovie) {
            deleteMovie(selectedMovie)
        }}}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>{`Are you sure you want to delete ${selectedMovie?.title}`}</p>
      </Modal>
    </main>
  );
}
