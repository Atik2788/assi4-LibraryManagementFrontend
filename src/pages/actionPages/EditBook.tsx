
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/bookApi";
import type { BackendError } from "../AddBooks";
import type { Book } from "@/redux/interfaces";

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetBookByIdQuery(id!);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [form, setForm] = useState<Book>({
    _id: "",
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
    createdAt: "",
    updatedAt: "",
  });

  // Prefill form with existing book data
  useEffect(() => {
    if (data?.data) {
      setForm(data.data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBook(form).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (error: unknown) {
      
      const err = error as BackendError;

      let msg = "Failed to update book";
      if (err?.data?.errors && Array.isArray(err.data.errors)) {
        msg = err.data.errors.join(", ");
      } else if (err?.data?.message) {
        msg = err.data.message;
      }
      toast.error(msg);
      console.error("Update book error:", err);
    }
  };

  if (isLoading) return <div className="p-4">Loading book details...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load book.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h1 className="text-2xl font-bold mb-6">Edit Book</h1>
  <form onSubmit={handleSubmit} className="space-y-4 ">
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col">
      <label htmlFor="title" className="mb-1 font-medium">Title</label>
      <input
        id="title"
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter book title"
        required
        className="w-full border px-3 py-2 rounded"
      />
        </div>

        <div className="flex flex-col">
          <label htmlFor="author" className="mb-1 font-medium">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="genre" className="mb-1 font-medium">Genre</label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Enter genre"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="isbn" className="mb-1 font-medium">ISBN</label>
          <input
            id="isbn"
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="copies" className="mb-1 font-medium">Copies</label>
          <input
            id="copies"
            type="number"
            name="copies"
            value={form.copies}
            onChange={handleChange}
            min={0}
            placeholder="Number of copies"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="available"
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <label htmlFor="available" className="font-medium">Available</label>
        </div>
    </div>

    <button
      type="submit"
      disabled={isUpdating}
      className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {isUpdating ? "Updating..." : "Update Book"}
    </button>

  </form>
</div>

  );
}
