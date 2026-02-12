import React from 'react';
import Card from './Card';
import '../css/Features.css';

const Features = () => (
  <section id="features" className="features-root">
    <h2>Features</h2>
    <div className="features-grid">
      <Card
        title="Custom Pages"
        description="Create personalized mini bio pages for cars, garages, and builds."
      />
      <Card
        title="Media & Gallery"
        description="Upload photos and show off builds with a clean gallery."
      />
      <Card
        title="Social Links"
        description="Link to Instagram, YouTube, TikTok, and more with smart icon previews."
      />
      <Card
        title="Theme Customization"
        description="Pick colors and typography to match your brand or garage."
      />
    </div>
  </section>
);

export default Features;
