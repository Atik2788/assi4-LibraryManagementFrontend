import { useCreateBookMutation } from "@/redux/api/bookApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // optional for notifications

export interface BackendError {
  data?: {
    message?: string;
    errors?: string[];
  };
}

export const AddBooks = () => {
  const navigate = useNavigate();

  const [createBook, { isLoading }] = useCreateBookMutation();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

      const { name, value, type } = e.target;

  // checkbox হলে checked use করো
  const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;


  setForm((prev) => ({
    ...prev,
    [name]: val,
  }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(form);
      await createBook(form).unwrap();
      toast.success("Book created successfully!");
      navigate("/books"); // redirect to book list
    } 
    
    catch (err: unknown) {
      let msg = "Failed to create book";

      const error = err as BackendError; // type assertion

      if (error?.data?.errors && Array.isArray(error.data.errors)) {
        msg = error.data.errors.join(", ");
      } else if (error?.data?.message) {
        msg = error.data.message;
      }

      toast.error(msg); // toaster now shows proper message
      console.error("Create book error:", error);
    }


  };

  return (
    <div className="w-full max-w-3xl mt-10 mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="copies"
          value={form.copies}
          onChange={handleChange}
          // min={1}
          placeholder="Copies"
          className="w-full border px-3 py-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Creating..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};
