import { createSlice } from '@reduxjs/toolkit'


export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface BooksApiResponse {
  success: boolean;
  message: string;
  data: Book[];
}

export interface BooksState {
    items: BooksApiResponse[];
    loading: boolean;
    error: string | null;
}


const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};


export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
               
    }
})



export default booksSlice.reducer
