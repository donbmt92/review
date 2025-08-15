"use client";

import React from "react";
import styles from "./DealPopup.module.css";

interface ProductData {
  title: string;
  image: string;
  discount: string;
  asin: string;
  type: string;
  prps: string;
}

interface DealPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

const DealPopup: React.FC<DealPopupProps> = ({
  isOpen,
  onClose,
  product,
  showOnMobile = true,
  showOnDesktop = true,
}) => {
  const [autoOpen, setAutoOpen] = React.useState(false);

  // Memoize the close handler to prevent unnecessary re-renders
  const handleClose = React.useCallback(() => {
    onClose();
    setAutoOpen(false);
  }, [onClose]);

  // Auto open popup every 10 seconds
  React.useEffect(() => {
    console.log("Setting up timer - popup will open in 10 seconds");
    
    const interval = setInterval(() => {
      console.log("Timer triggered - opening popup");
      setAutoOpen(true);
    }, 10000); // 10 seconds

    return () => {
      console.log("Cleaning up timer");
      clearInterval(interval);
    };
  }, []);

  // Show popup if either manually opened or auto-opened
  const shouldShow = isOpen || autoOpen;
  
  console.log("Popup state:", { isOpen, autoOpen, shouldShow });

  if (!shouldShow) return null;

  // Build URLs for different platforms
  const buildUrl = (platform: "desktop" | "mobile") => {
    const position = platform === "desktop" ? "popup-desktop" : "popup-mobile";
    return `/api/openamzurl?asin=${product.asin}&type=${product.type}&prps=${product.prps}&position=${position}`;
  };

  return (
    <div className={styles.dealPopupContainer}>
      <div className={styles.dealPopupOnLeaveContainer}>
        <div className={styles.popupCenterContainer}>
          <div className={styles.leftSidePopup}>
            <div className={styles.popupTitle}>{product.title}</div>
            <div className={styles.middleTitle}>
              Today's deals will end soon..
            </div>
            <a
              href={buildUrl("desktop")}
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
                <a href={buildUrl("mobile")} rel="nofollow" target="_blank">
                  <span className={styles.text}>
                    <strong className={styles.bold}>{product.discount}</strong>
                  </span>
                </a>
              </p>
              <div className={styles.popUpImgContainer}>
                <img
                  alt={product.title}
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
  );
};

export default React.memo(DealPopup);
