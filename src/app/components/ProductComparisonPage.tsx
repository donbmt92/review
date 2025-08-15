"use client";

import React, { useState } from "react";
import CompareRow, { type CompareItem } from "./CompareRow";
import Image from "next/image";
import AdvertisingDisclosure from "./AdvertisingDisclosure";
import DealPopup from "./DealPopup";

interface ProductComparisonPageProps {
  category: string;
  categoryTitle: string;
  categoryDescription: string;
  items: CompareItem[];
  updatedDate: string;
  breadcrumbPath: string;
  overviewContent: {
    title: string;
    paragraphs: string[];
  };
  topProductsContent: {
    title: string;
    paragraphs: string[];
  };
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  relatedProducts?: Array<{
    title: string;
    url: string;
    image: string;
    alt: string;
  }>;
}

const ProductComparisonPage: React.FC<ProductComparisonPageProps> = ({
  category,
  categoryTitle,
  categoryDescription,
  items,
  updatedDate,
  breadcrumbPath,
  overviewContent,
  topProductsContent,
  faqItems,
  relatedProducts = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Deal Popup */}

      <div className="mx-auto max-w-6xl px-3 sm:px-5 py-4 sm:py-8 text-sm sm:text-base">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-black/60">
          {breadcrumbPath} /{" "}
          <span className="font-bold">{category.toUpperCase()}</span>
        </div>

        {/* Title card */}
        <div className="mt-2 rounded-t-xl border-t border-sky-100 bg-sky-50 p-4 sm:p-6 shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            <span className="inline-block border-b border-black/20 pb-1">
              {categoryTitle}
            </span>
          </h1>
          <p
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
              lineHeight: "1.8rem",
              color: "dimgray",
              whiteSpace: "pre-wrap",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {categoryDescription}
          </p>
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <AdvertisingDisclosure />
            <div className="text-xs sm:text-sm italic text-black/60">
              Updated At{" "}
              <span className="not-italic font-medium">{updatedDate}</span>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-7 space-y-3 sm:space-y-4 ">
          {items.map((it) => (
            <CompareRow key={it.rank} item={it} />
          ))}
        </div>

        {/* Newsletter Subscription Form */}
        <div className="BeeHiveSubscriptionForm_beehive-subscription-form__bZco3">
          <div className="beehive-container">
            <div className="beehive-title-1">Tired of Hunting for Deals?</div>
            <div className="beehive-title-2">
              Get the best daily discounts delivered straight to your inbox
            </div>
            <div className="beehive-subscription-form-container">
              <input
                className="beehive-subscription-form-input"
                type="text"
                placeholder="Your Email Address"
                value=""
              ></input>
              <button className="beehive-subscription-form-button">
                Send Me Deals
              </button>
            </div>
          </div>
        </div>

        {/* Deal Popup Trigger Button */}
        {/* <div className="mt-6 text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🎉 View Special Deals
          </button>
        </div> */}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-6 sm:mt-8">
            <h2 className="also-like-title">You Might Also Like</h2>
            <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
              {relatedProducts.map((product, index) => (
                <a
                  key={index}
                  href={product.url}
                  className="rounded-xl border border-black/10 bg-white p-3 sm:p-4 text-center shadow-sm hover:shadow"
                >
                  <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-scale-down"
                    />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-black/70">
                    {product.title}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="prose prose-sm sm:prose-lg mt-6 sm:mt-8 max-w-none prose-p:my-2 sm:prose-p:my-3 prose-h3:mt-4 sm:prose-h3:mt-6">
          <h3 className="also-like-title">{overviewContent.title}</h3>
          {overviewContent.paragraphs.map((paragraph, index) => (
            <p key={index} className="section-lead">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Top Products */}
        <section className="mt-4 sm:mt-6">
          <h3 className="also-like-title">{topProductsContent.title}</h3>
          <ul className="mt-2 list-disc pl-4 sm:pl-5 text-sm sm:text-base text-black/80">
            {items.slice(0, 3).map((it) => (
              <li key={it.rank}>
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="one-line-title"
                >
                  {it.title}
                </a>
              </li>
            ))}
          </ul>
          {topProductsContent.paragraphs.map((paragraph, index) => (
            <p key={index} className="section-lead">
              {paragraph}
            </p>
          ))}
        </section>
        {/* Deal Popup - Hidden when not open */}
    

        {/* FAQ */}
        <section className="mt-6 sm:mt-8">
          <h3 className="also-like-title">FAQ</h3>
          <div className="mt-2 space-y-2 sm:space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index}>
                <div className="text-sm sm:text-base font-semibold one-line-title">
                  Q: {faq.question}
                </div>
                <p className="text-sm sm:text-base text-black/70 section-lead">
                  A: {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        
      </div>
      {/* Deal Popup - Always render but control visibility internally */}
      {items.length > 0 && (
        <DealPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          product={{
            title: items[0].title,
            image: items[0].image,
            discount: items[0].discount || "Special Offer",
            asin: items[0].url.includes("asin=")
              ? items[0].url.split("asin=")[1]?.split("&")[0] ||
                "B07YMJLTR6"
              : "B07YMJLTR6",
            type: items[0].url.includes("type=")
              ? items[0].url.split("type=")[1]?.split("&")[0] || "LV"
              : "LV",
            prps: items[0].url.includes("prps=")
              ? items[0].url.split("prps=")[1]?.split("&")[0] || ""
              : "",
          }}
        />
      )}  
    </>
  );
};

export default ProductComparisonPage;
