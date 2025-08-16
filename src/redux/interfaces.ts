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