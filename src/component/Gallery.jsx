import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useScrollReveal from "../hooks/useScrollReveal";

import "swiper/css";
import "swiper/css/navigation";
import "./Gallery.scss";

const IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  index: i,

  thumbWebp: `${process.env.PUBLIC_URL}/gallery/thumb/gallery${i + 1}.webp`,
  thumbJpg: `${process.env.PUBLIC_URL}/gallery/thumb/gallery${i + 1}.jpg`,

  originalWebp: `${process.env.PUBLIC_URL}/gallery/original/gallery${i + 1}.webp`,
  originalJpg: `${process.env.PUBLIC_URL}/gallery/original/gallery${i + 1}.jpg`,
}));

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const handleThumbnailClick = useCallback((index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="gallery">
      <div className="gallery__inner">
        <h2 ref={titleRef}>GALLERY</h2>

        <div ref={gridRef} className="gallery__grid">
          {IMAGES.map((image) => (
            <button
              key={image.id}
              type="button"
              className="gallery__thumb"
              onClick={() => handleThumbnailClick(image.index)}
              aria-label={`${image.index + 1}번째 사진 크게 보기`}
            >
              <picture>
                <source
                  srcSet={image.thumbWebp}
                  type="image/webp"
                />

                <img src={image.thumbJpg} alt="" />
              </picture>
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="gallery__modal"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-label="사진 크게 보기"
        >
          <div className="gallery__modal-content">
            <button
              type="button"
              className="gallery__modal-close"
              onClick={handleCloseModal}
              aria-label="닫기"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5L19 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation]}
              initialSlide={selectedIndex}
              navigation
              speed={450}
              className="gallery__modal-swiper"
              preventInteractionOnTransition={true}
              onSlideChange={(swiper) => {
                setSelectedIndex(swiper.activeIndex);
              }}
            >
              {IMAGES.map((image) => (
                <SwiperSlide key={`modal-${image.id}`}>
                  <picture>
                    <source
                      srcSet={image.originalWebp}
                      type="image/webp"
                    />

                    <img
                      src={image.originalJpg}
                      alt={`${image.index + 1}번째 사진`}
                    />
                  </picture>
                </SwiperSlide>
              ))}
            </Swiper>

            <p className="gallery__modal-counter">
              <span className="gallery__modal-current">
                {selectedIndex + 1}
              </span>
              <span className="gallery__modal-divider">/</span>
              <span>{IMAGES.length}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;