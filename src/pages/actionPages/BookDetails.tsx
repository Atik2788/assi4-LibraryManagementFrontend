import { useGetBookByIdQuery } from "@/redux/api/bookApi";
import { useParams, Link } from "react-router-dom";

export const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
  const { data: bookData, isLoading, error } = useGetBookByIdQuery(id!);
  
  const book = bookData?.data;
  console.log(book);

  if (isLoading) return <div className="p-4">Loading book details...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load book.</div>;


  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">{book?.title}</h1>
        <Link
          to="/books"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Books
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p>
            <span className="font-semibold text-gray-700">Author:</span> {book?.author}
          </p>
          <p>
            <span className="font-semibold text-gray-700">ISBN:</span> {book?.isbn}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Copies:</span> {book?.copies}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Available:</span> {book?.available? "Yes" : "No"}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              to={`/edit-book/${book?._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-center"
            >
              Edit Book
            </Link>
            <Link
              to={`/borrow/${book?._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              Borrow Book
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-2">Description</h2>
        <p className="text-gray-700">
          {/* Placeholder description */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
          eros at elit vehicula fermentum. Fusce sit amet augue nec magna
          aliquet feugiat.
        </p>
      </div>
    </div>
  );
};