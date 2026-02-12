import React from 'react';
import './App.css'; // We'll add styles there

const FallingHearts = React.memo(() => {
    return (
        <div className="hearts-container">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="heart" style={{
                    left: `${Math.random() * 100}vw`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}>
                    ❤️
                </div>
            ))}
        </div>
    );
});

export default FallingHearts;
