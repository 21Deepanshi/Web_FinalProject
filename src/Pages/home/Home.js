import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar';
const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    // Fetch books data
    useEffect(() => {
        fetch('http://localhost:7000/books/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data);
                setFilteredBooks(data);
            })
            .catch((error) => console.error('Error fetching books:', error));
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setFilteredBooks(books); 
        } else {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.publicationDate.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    };

    const handleViewDetails = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div className="homepage">
            <SearchBar onSearch={handleSearch} /> 
            
            <section className="bookList">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book.id} className="bookItem">
                            <img
                                src={book.coverImage}
                                alt={`Cover of ${book.title}`}
                                className="bookCover"
                            />
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <button
                                className="view-details-btn"
                                onClick={() => handleViewDetails(book.id)}
                            >
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </section>
        </div>
    );
};

export default HomePage;
