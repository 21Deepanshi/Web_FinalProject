import React from "react";
import './BookList.css';
const BookList = ({ books, onEdit, onDelete }) => {

  return (
    <div>
      {/* Display the list of books */}
      <div className="book-lists">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <div className="book-items">
                  <img
                    src={book.coverImage} // Ensure this image URL is correct
                    alt={book.title}
                    className="book-covers"
                  />
                  <div className="book-detail">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Description: {book.description}</p>
                    <p>Published: {book.publicationDate}</p>
                  </div>
                  <div className="book-actions">
                    <button onClick={() => onEdit(book)}>Edit</button>
                    <button onClick={() => onDelete(book.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookList;
