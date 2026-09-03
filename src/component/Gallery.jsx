import { useState, useEffect, useCallback } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './Gallery.scss';

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

  /**
   * 썸네일 클릭
   */
  const handleThumbnailClick = useCallback((index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, []);

  /**
   * 모달 닫기
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /**
   * 모달 바깥 영역 클릭 시 닫기
   */
  const handleModalClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  }, []);

  /**
   * 모달 열려 있을 때 배경 스크롤 방지
   */
  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="gallery">
      <div className="gallery__inner">

        {/* 타이틀 */}
        <h2>
          GALLERY
        </h2>

        {/* 갤러리 */}
        <div className="gallery__grid">
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

                <img
                  src={image.thumbJpg}
                  alt=""
                  loading="lazy"
                />
              </picture>
            </button>
          ))}
        </div>

      </div>

      {/* 이미지 확대 모달 */}
      {isModalOpen && (
        <div
          className="gallery__modal"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-label="사진 크게 보기"
        >
          <div className="gallery__modal-content">

            {/* 닫기 */}
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

            {/* 확대 이미지 Swiper */}
            <Swiper
  modules={[Navigation, EffectFade]}
  initialSlide={selectedIndex}
  navigation
  effect="slide"
  speed={450}
  className="gallery__modal-swiper"
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
                      loading="lazy"
                    />
                  </picture>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 페이지 번호 */}
            <p className="gallery__modal-counter">
              <span className="gallery__modal-current">
                {selectedIndex + 1}
              </span>

              <span className="gallery__modal-divider">
                /
              </span>

              <span>
                {IMAGES.length}
              </span>
            </p>

          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;