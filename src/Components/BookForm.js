import React, { useState, useEffect } from "react";
import "./BookForm.css";

const BookForm = ({ onSave, selectedBook, clearSelectedBook }) => {
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    description: "",
    publicationDate: "",
    coverImage: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setBook({
        // id: Date.now(),
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: "",
      });
    }
  }, [selectedBook]);

const validateForm = () => {
    const newErrors = {};
    if (!book.title) newErrors.title = "Title is required.";
    if (!book.author) newErrors.author = "Author is required.";
    if (!book.description) newErrors.description = "Description is required.";
    if (!book.publicationDate) newErrors.publicationDate = "Publication date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      onSave(book);
      setBook({
        id: "",
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-form-container">
      <h2>{selectedBook ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            placeholder="Enter the book title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </label>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            placeholder="Enter the author's name"
          />
           {errors.author && <p className="error">{errors.author}</p>}
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            required
            placeholder="Provide a brief description of the book"
          />
           {errors.description && <p className="error">{errors.description}</p>}
        </label>
        <label htmlFor="publicationDate">
          Publication Date:
          <input
            type="date"
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleChange}
            required
          />
          {errors.publicationDate && <p className="error">{errors.publicationDate}</p>}
        </label>
        <label htmlFor="coverImage">
          Cover Image URL:
          <input
            type="url"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            required
            placeholder="Paste the cover image URL"
          />
          {errors.coverImage && <p className="error">{errors.coverImage}</p>}
        </label>
        {/* {book.coverImage && book.coverImage.startsWith("http") &&( */}
        {book.coverImage && /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(book.coverImage) && (
          <div className="image-preview">
            <img src={book.coverImage} alt="Cover Preview" />
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>{selectedBook ? "Update" : "Add"}</button>
        {selectedBook && (
          <button type="button" onClick={clearSelectedBook}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default BookForm;

