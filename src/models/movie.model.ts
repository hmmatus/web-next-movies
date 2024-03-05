import * as yup from "yup";
export const movieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  stock: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  rentAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  saleAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  availability: yup.string().required(),
  image: yup.string().required(),
});

interface LikeI {
  idUser: string;
}
export interface MovieI extends yup.InferType<typeof movieSchema> {
  id: string;
  likes: LikeI[];
}

export interface GetMovieResponseI {
  data:        MovieI[];
  currentPage: number;
  pages:       number;
}
