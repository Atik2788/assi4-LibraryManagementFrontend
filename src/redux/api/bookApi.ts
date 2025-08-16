import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BooksApiResponse} from "../features/counter/booksSlice";

export interface singleBook {
    data: Book;
    success: boolean;
    message: string;
}

export interface BorrowedBooksApiResponseForserver {
        book: string,
        quantity: number,
        dueDate: string,
}

export interface BorrowBook{
        title: string,
        isbn: string,
}

export interface BorrowedBookData {
    totalQuantity: number;
    book: BorrowBook;
}

export interface BorrowedBooksApiResponse {
    data: BorrowedBookData[];
    success: boolean;
    message: string;
}



export const booksApi = createApi({
    reducerPath: "booksData",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://librarymanagementbackend-production-2084.up.railway.app", // Replace with your actual API base URL
    }),
    tagTypes: ["books", "borrowedBooks"],

    endpoints: (builder) => ({

        getBooks: builder.query<BooksApiResponse, void>({
        query: () => "/books",
        providesTags: ["books"]
        }),

        getBookById: builder.query<singleBook, string>({
            query: (id) => `/books/${id}`,
            providesTags: ["books"]
        }),

        createBook: builder.mutation<BooksApiResponse, Partial<Book>>({
            query: (newBook) => ({
                url: "/books",
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["books"],
        }),

        updateBook: builder.mutation<BooksApiResponse, Partial<Book>>({
            query: (book) => ({
                url: `/books/${book._id}`,
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ["books"],
        }),

        deleteBook: builder.mutation<BooksApiResponse, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books", "borrowedBooks"],                
        }),

        getBorrowedBooks: builder.query<BorrowedBooksApiResponse, void>({
            query: () => "/borrow",
            providesTags: ["borrowedBooks"]
        }),

        createBorrow: builder.mutation<BorrowedBooksApiResponseForserver, BorrowedBooksApiResponseForserver>({
            query: (newBook) => ({
                url: "/borrow",
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["books", "borrowedBooks"],
        }),

    }),
})

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useCreateBorrowMutation, useGetBorrowedBooksQuery } = booksApi;