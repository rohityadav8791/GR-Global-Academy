import React from 'react';
import { schoolData } from '../data/schoolData';
import './styles/Gallery.css';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const filtered = activeCategory === 'All'
    ? schoolData.gallery
    : schoolData.gallery.filter(g => g.category === activeCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Photo Gallery</span>
          <h2>School Gallery</h2>
          <div className="accent-bar"></div>
          <p>A glimpse of campus life, classrooms, laboratories, sports, and celebrations.</p>
        </div>

        <div className="gallery-filters">
          {schoolData.galleryCategories.map((cat, index) => (
            <button
              key={index}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="gallery-item card"
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
            >
              <div className="image-wrap" style={{ height: '260px' }}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="image-badge">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        {lightboxOpen && selectedImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>×</button>
              <div className="image-wrap" style={{ height: '500px', width: '100%' }}>
                <img src={selectedImage.image} alt={selectedImage.alt} />
              </div>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
