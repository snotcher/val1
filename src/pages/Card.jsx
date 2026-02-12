import React from 'react';
import '../css/Features.css'; // to keep styles in one place

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
