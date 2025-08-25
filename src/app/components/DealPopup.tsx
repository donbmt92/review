"use client";

import React from "react";
import styles from "./DealPopup.module.css";
import { CompareItem } from "./CompareRow";

interface ProductData {
  title: string;
  image: string;
  discount: string;
  asin: string;
  type: string;
  prps: string;
  category: string;
}

interface DealPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  onProductClick: (product: any, clickType: string) => void;
}

const DealPopup: React.FC<DealPopupProps> = ({
  isOpen,
  onClose,
  product,
  onProductClick,
  showOnMobile = true,
  showOnDesktop = true,
}) => {
  const [autoOpen, setAutoOpen] = React.useState(false);
  const [hasShown, setHasShown] = React.useState(false);

  // Memoize the close handler to prevent unnecessary re-renders
  const handleClose = React.useCallback(() => {
    onClose();
    setAutoOpen(false);
  }, [onClose]);

  // Auto open popup with different timing logic
  React.useEffect(() => {
    const isFirstTime = !localStorage.getItem("popupShown");
    const delay = isFirstTime ? 15000 : 45000; // 5s first time, 45s after

    console.log(
      `Setting up timer - popup will open in ${delay / 1000} seconds (${
        isFirstTime ? "first time" : "subsequent times"
      })`
    );

    const timer = setTimeout(() => {
      console.log("Timer triggered - opening popup");
      setAutoOpen(true);
      setHasShown(true);

      // Mark as shown in localStorage
      if (isFirstTime) {
        localStorage.setItem("popupShown", "true");
      }
    }, delay);

    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, []);

  // Show popup if either manually opened or auto-opened
  const shouldShow = isOpen || autoOpen;

  console.log("Popup state:", { isOpen, autoOpen, shouldShow });

  if (!shouldShow) return null;

  // Build URLs for different platforms
  

  return (
    <div className={styles.dealPopupContainer}>
      <div className={styles.dealPopupOnLeaveContainer}>
        <div className={styles.popupCenterContainer}>
          {/* Mobile Layout */}
          <div className={styles.mobilePopup}>
            {/* Header - Black Section */}
            <div className={styles.mobilePopupHeader}>
              <div className={styles.mobilePopupTitle}>{product.title}</div>
              <div className={styles.mobilePopupRating}>
                <span className={styles.ratingNumber}>9.8</span>
                <div className={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={styles.star}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <button
                className={styles.mobileCloseButton}
                onClick={handleClose}
              >
                ✕
              </button>
            </div>

            {/* Body - White Section */}
            <div className={styles.mobilePopupBody}>
              {/* Discount Badge */}
              <p className={styles.ribbon}>
                <span className={styles.text}>
                  <strong className={styles.bold}>{product.discount}</strong>
                </span>
              </p>

              {/* Product Image */}
              <div className={styles.mobileProductImage}>
                <img
                  onClick={() => onProductClick(product, 'image-popup')}
                  alt={product.title}
                  src={product.image}
                  className={styles.productImg}
                />
              </div>

              {/* CTA Button */}
              <a
                // href={buildUrl("mobile")}
                onClick={() => onProductClick(product, "button-popup")}
                rel="nofollow"
                target="_blank"
                className={styles.mobileCtaButton}
              >
                Check Out Lastest Price{" "}
              </a>
            </div>
          </div>

          {/* Desktop Layout - Keep existing */}
          <div className={styles.desktopPopup}>
            <div className={styles.leftSidePopup}>
              <div className={styles.popupTitle}>{product.title}</div>
              <div className={styles.middleTitle}>
                Today's deals will end soon..
              </div>
              <a
                // href={buildUrl("desktop")}
                onClick={() => onProductClick(product, "button-popup")}
                rel="nofollow"
                target="_blank"
                className={styles.popupBtnClick}
              >
                Check Out Lastest Price{" "}
              </a>
            </div>
            <div className={styles.rightSidePopup}>
              <div className={styles.arrowLeft} />
              <div className={styles.rightBackground}>
                <p className={styles.ribbon}>
                  <a onClick={() => onProductClick(product, 'button-popup')}>
                    <span className={styles.text}>
                      <strong className={styles.bold}>
                        {product.discount}
                      </strong>
                    </span>
                  </a>
                </p>
                <div className={styles.popUpImgContainer}>
                  <img
                    onClick={() => onProductClick(product, 'image-popup')}
                    loading="lazy"
                    width={500}
                    height={500}
                    decoding="async"
                    data-nimg={1}
                    className="ui image"
                    srcSet={`/_next/image?url=${encodeURIComponent(
                      product.image
                    )}&w=640&q=75 1x, /_next/image?url=${encodeURIComponent(
                      product.image
                    )}&w=1080&q=75 2x`}
                    src={`/_next/image?url=${encodeURIComponent(
                      product.image
                    )}&w=1080&q=75`}
                    style={{ color: "transparent", height: "100%" }}
                  />
                </div>
                <div className={styles.closePopup} onClick={handleClose}>
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DealPopup);
