import React from 'react';
import './About.css';
import ourMission from '../../Images/ourMission.jpg';
import ourStory from '../../Images/ourStory.jpg';

const About = () => {
  return (
    <div>
        {/* <Header /> */}
        <div className="about-container">
        <section className='aboutUs'>
            <h2>About Us</h2>
            <p>
                Welcome to BookHub! We are passionate about creating a seamless and intuitive experience for book enthusiasts, students, and professionals alike. Our platform is designed to help you manage your book collections, discover new reads, and keep track of your favorite genres effortlessly.
            </p>
        </section>
        {/* Mission Section */}
        <section className="mission">
            <h2>Our Mission</h2>
            <p>
            Our mission is to empower readers by providing an intuitive platform that simplifies book management and enhances your reading journey.
            </p>
            <img
            src={ourMission}
            alt="Mission"
            className="image"
            />
        </section>

        {/* Features Section */}
        <section className="features">
            <h2>Features</h2>
            <div className="features-grid">
            <div>
                <h3>Comprehensive Catalog</h3>
                <p>Track all your books by title, author, genre, and more.</p>
            </div>
            <div>
                <h3>User-Friendly Interface</h3>
                <p>Easily navigate your collections and find books in seconds.</p>
            </div>
            <div>
                <h3>Advanced Sorting</h3>
                <p>Sort and filter books based on various criteria.</p>
            </div>
            <div>
                <h3>Secure and Reliable</h3>
                <p>Your data is safe and our system is built to last.</p>
            </div>
            </div>
        </section>

        {/* Story Section */}
        <section className="story">
            <h2>Our Story</h2>
            <p>
            Founded by avid readers and tech enthusiasts, our journey began with
            a simple idea: to create a platform that brings book lovers and
            technology together.
            </p>
            <img
            src={ourStory}
            alt="Our Story"
            className="image"
            />
        </section>

        {/* Call to Action */}
        <section className="cta">
            <h2>Join Us</h2>
            <p>
            Become a part of our community. Share feedback, explore features, and
            help us improve. Let's create a better reading experience together!
            </p>
        </section>
        </div>
        {/* <Footer /> */}
    </div>
  );
};

export default About;
