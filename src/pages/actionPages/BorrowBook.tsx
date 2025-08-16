import { useCreateBorrowMutation, useGetBookByIdQuery } from "@/redux/api/bookApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";


export const BorrowBook = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate();

  const { data, isLoading } = useGetBookByIdQuery(id!);
    console.log(data);

    // if is loading then return loading


    const [createBorrow] = useCreateBorrowMutation(); 
    
    const [form, setForm] = useState({
        book: id || "",
        quantity: 1,
        dueDate: ""
    })

    if (isLoading) return <div className="p-4">Loading...</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        try {
            await createBorrow(form).unwrap();
            toast.success("Book borrowed successfully!");
            navigate("/borrow-summary");
        } catch (error) {
            if (error instanceof Error) {
        toast.error("Failed to borrow book. " + error.message);
      } else {
        toast.error("Failed to borrow book. Unknown error");
      }
        }
    }



  return (
    <div className="md:w-xl w-sm mt-10 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Borrow Book</h1>
      <div className="md:flex justify-between items-center">
        <h3 className="font-bold">Book Name: {data?.data.title}</h3>
        <h3 className="font-bold">Author: {data?.data.author}</h3>
      </div>
        <div>{data?.data.available ? 
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantity */}
            <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1 font-medium">
                Quantity
            </label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min={1}
                className="border rounded px-3 py-2"
                required
            />
            </div>

            {/* Due Date */}
            <div className="flex flex-col">
            <label htmlFor="dueDate" className="mb-1 font-medium">
                Due Date
            </label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
            />
            </div>

            {/* Submit button */}
            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
            >
            {isLoading ? "Borrowing..." : "Borrow Book"}
            </button>
            </form>
        </div>
      :
       <div className="flex w-full mx-auto justify-center my-10">
            <span className="text-red-500 text-4xl">Unavailable Copy of books!</span>
       </div>
        
    }  

    </div>

    </div>
  );
};