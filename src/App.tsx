import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { Books } from "./pages/Books";
import { AddBooks } from "./pages/AddBooks";
import { BookDetails, } from "./pages/actionPages/BookDetails";
import EditBook from "./pages/actionPages/EditBook";
import { Toaster } from "sonner";
import "./App.css";
import { BorrowBook } from "./pages/actionPages/BorrowBook";
import { BorrowSummary } from "./pages/BorrowSummary";
import Footer from "./pages/Footer";

function App() {


  return (
    <Router>
      <div className="bubble-background flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/create-book" element={<AddBooks />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/add-new-book" element={<AddBooks />} />
            <Route path="/borrow/:id" element={<BorrowBook />} />
            <Route path="/borrow-summary" element={<BorrowSummary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
