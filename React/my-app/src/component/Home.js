import React, { Component } from 'react';
import yourImage from './download.jpeg';
import youImage from './download (1).jpeg';

function Home() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <img 
                    src={youImage}
                    alt="Logo" 
                    style={styles.logo} 
                />
                <nav style={styles.nav}>
                    <a href="#home" style={styles.navLink}>Home</a>
                    <a href="login" style={styles.navLink}>Login</a>
                    <a href="#dashboard" style={styles.navLink}>About</a>
                  
                </nav>
            </header>
            
            <main style={styles.main}>
                <div style={styles.textContainer}>
                    <h1 style={styles.title}>Employee Task Management System</h1>
                    <p style={styles.description}>
                    Developed and maintained an Employee Task Management System to streamline task assignment, tracking, and reporting. The system enhanced team collaboration, 
                    improved project visibility, and increased overall productivity by ensuring efficient task allocation and timely completion.
                    </p>
                </div>
                <div style={styles.imageContainer}>
                    <img 
                        src={yourImage}
                        // alt="Case Study" 
                       style={styles.image} 
                    />
                    
                </div>
            </main>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#fff',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        minHeight: '100vh',
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '50px',
    },
    logo: {
        width: '100px',
        height: '50px',
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    textContainer: {
        maxWidth: '50%',
    },
    title: {
        fontSize: '48px',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        lineHeight: '1.6',
    },
    imageContainer: {
       
        textAlign: 'center',
    },
    image: {

        width: '600px',
        borderRadius: '15px',
    },
    imageCaption: {
        fontSize: '16px',
        marginTop: '10px',
        color: '#ddd',
    },
};

export default Home;
