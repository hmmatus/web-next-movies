export interface CustomFileObject {
  name: string;
  type: string;
  size: number;
}

export interface MovieI {
  title: string;
  description: string;
  image: string;
  stock: number;
  rentAmount: number;
  saleAmount: number;
  availability: number;
  likesCount: number;
}