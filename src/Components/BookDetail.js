import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:7000/books/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [id]);

    return (
        <div className="book-details">
        {book ? (
            <div>
                <img
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    className="book-cover"
                />
                <div className="book-info">
                    <h1>{book.title}</h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    {/* <p><strong>Year:</strong> {new Date(book.publicationDate).getFullYear()}-{new Date(book.publicationDate).getMonth() + 1}-{new Date(book.publicationDate).getDate()}</p> */}
                    <p>
                        <strong>Year:</strong>{' '}
                        {format(new Date(book.publicationDate), 'yyyy-MM-dd')}
                    </p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <button className="back-btn" onClick={() => navigate('/')}>
                            Back to Home
                    </button>
                </div>
            </div>
            
        ) : (
            <p>Loading book details...</p>
        )}
    </div>
    );
};

export default BookDetails;
