import { useState, useEffect } from "react";
import "./AdsBanner.css";

export default function AdsBanner() {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Welcome to FCI Arish",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      link: "#",
      active: true,
      order: 1,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // In a real app, this would fetch from backend/context
  useEffect(() => {
    // Load ads from localStorage or context/backend
    const savedAds = localStorage.getItem("homepageAds");
    if (savedAds) {
      try {
        const parsedAds = JSON.parse(savedAds);
        const activeAds = parsedAds
          .filter((ad) => ad.active)
          .sort((a, b) => a.order - b.order);
        if (activeAds.length > 0) {
          setAds(activeAds);
        }
      } catch (error) {
        console.error("Error loading ads:", error);
      }
    }
  }, []);

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  if (ads.length === 0) return null;

  const currentAd = ads[currentIndex];

  return (
    <div className="ads-banner-container">
      <div className="ads-banner-wrapper">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`ads-slide ${index === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${ad.imageUrl})`,
            }}
          >
            <div className="ads-overlay">
              <div className="ads-content">
                {ad.title && <h2 className="ads-title">{ad.title}</h2>}
                {ad.link && ad.link !== "#" && (
                  <a
                    href={ad.link}
                    className="ads-link-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {ads.length > 1 && (
          <>
            <button
              className="ads-nav-btn ads-prev"
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length)
              }
            >
              ‹
            </button>
            <button
              className="ads-nav-btn ads-next"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % ads.length)}
            >
              ›
            </button>

            <div className="ads-indicators">
              {ads.map((_, index) => (
                <button
                  key={index}
                  className={`ads-indicator ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
