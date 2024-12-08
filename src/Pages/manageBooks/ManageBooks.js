import React, { useState, useEffect } from "react";
import BookList from "../../Components/BookList";
import BookForm from "../../Components/BookForm";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
  const response = await fetch("http://localhost:7000/books/");
    const data = await response.json();  // Parse the response to JSON
    if (Array.isArray(data)) {
      setBooks(data);  // Set books only if the data is an array
    } else {
      throw new Error("Expected an array of books");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (book) => {
    try {
      
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in first.");
        return;
      }

      const response = await fetch("http://localhost:7000/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        const newBook = await response.json();
        console.log("Book added successfully:", newBook);
        setBooks((prevBooks) => [...prevBooks, newBook]);  // Update the book list with the new book
      } else {
        const error = await response.json();
        console.error("Failed to add book:", error.message);
        setError(error.message);
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError("An error occurred while adding the book.");
    }
  };

const updateBook = async (book) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:7000/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error("Failed to update the book.");
    }

    const updatedBook = await response.json(); // Parse the response to get the updated book data

    // Update the books state with the updated book
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    setSelectedBook(null);
  } catch (err) {
    setError(err.message);
  }
};

const deleteBook = async (bookId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:7000/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the book.");
    }

    // Update the books state after deletion
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  } catch (err) {
    setError(err.message);
  }
};


  const handleSave = (book) => {
    selectedBook ? updateBook(book) : addBook(book);
  };

  return (
    <div>
      <h1 class="booklistTitle">List of books</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <BookList books={books} onEdit={setSelectedBook} onDelete={deleteBook} />
          <BookForm 
            onSave={handleSave} 
            selectedBook={selectedBook} 
            clearSelectedBook={() => setSelectedBook(null)} 
          />
        </>
      )}
    </div>
  );
};

export default ManageBooks;
