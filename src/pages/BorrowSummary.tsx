import { useGetBorrowedBooksQuery } from "@/redux/api/bookApi";
import type { BorrowedBookData } from "@/redux/interfaces";

export const BorrowSummary = () => {

  const { data: borrowedBooks, isLoading, error } = useGetBorrowedBooksQuery();


if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {"message" in error ? error.message : "Something went wrong"}</div>;


  return (
    <div className="mt-20  rounded w-4xl mx-auto bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Borrow Summary</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Quantity Borrowed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {borrowedBooks?.data?.map((data:BorrowedBookData) => (
              <tr key={data.book.isbn} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{data.book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">
                  {data.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
