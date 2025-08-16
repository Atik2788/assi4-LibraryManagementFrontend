import { Link } from "react-router-dom";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import { toast } from "sonner";
import type { Book } from "@/redux/interfaces";



export const Books = () => {

const { data: booksResponse, isLoading, error } = useGetBooksQuery();

const [deleteBook] = useDeleteBookMutation()

const handleDelete = async(id: string) =>{
  if(window.confirm("Are you sure you want to delete this book?")) {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully!");
    } catch (error) {
      if(error instanceof Error){
        toast.error("Failed to delete book." + error.message );
      }
      else {
        toast.error("Failed to delete book.");
      }
    }
  }
};

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error fetching books</div>;

  const books = booksResponse?.data ?? [];


return (
    <div className="md:p-6 p-0">
      <div className="flex justify-between items-center jtc-center">
        <h1 className="text-2xl font-bold mb-4">Books List</h1>
        <Link to={"/add-new-book"}><button className="animated-btn"><span>Add Book</span></button></Link>
      </div>
      <table className="min-w-full bg-white border rounded-md mt-5">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border hidden md:table-cell">Author</th>
            <th className="py-2 px-4 border hidden lg:table-cell">Genre</th>
            <th className="py-2 px-4 border hidden lg:table-cell">ISBN</th>
            <th className="py-2 px-4 border hidden md:table-cell">Copies</th>
            <th className="py-2 px-4 border hidden md:table-cell">Available</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr key={book._id} className="text-center border-b hover:bg-gray-100">
              <td className="py-2 px-4 border ">{book.title}</td>
              <td className="py-2 px-4 border hidden md:table-cell">{book.author}</td>
              <td className="py-2 px-4 border hidden lg:table-cell">{book.genre}</td>
              <td className="py-2 px-4 border hidden lg:table-cell">{book.isbn}</td>
              <td className="py-2 px-4 border hidden md:table-cell">{book.copies}</td>
              <td className="py-2 px-4 border hidden md:table-cell">{book.available? "Yes" : "No"}</td>
              <td className="py-2 px-4 border">
                  <div className="flex items-center space-x-2 gap-2">
                    <Link to={`/books/${book._id}`} className="action-btn">
                      View
                    </Link>
                    <Link to={`/edit-book/${book._id}`} className="action-btn">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="action-btn"
                    >
                      Delete
                    </button>
                    {book.available === false ? (
                        <span className=" inline-flex items-center line-through decoration-red-600 decoration-2">
                          <span className="action-btn text-transparent">
                            Borrow
                          </span>
                        </span>
                      ) : (
                        <Link to={`/borrow/${book._id}`} className="action-btn">
                          Borrow
                        </Link>
                      )}
                  </div>
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

