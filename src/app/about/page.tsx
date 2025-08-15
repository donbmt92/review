export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 text-base">
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
        <h1 className="text-[2.25rem] leading-[1.1] font-bold text-[rgba(0,140,255,0.82)] p-0 no-underline mt-[15px] mr-auto mb-[10px] ml-0">About Us</h1>
        <br />
        <div className="text-sm leading-6 text-[var(--textColor1)] whitespace-pre-wrap font-normal pt-6 pr-6 pb-6 pl-0">
          <p>
            Welcome to BuyeReview website! We are a team of experts who are
            passionate about providing consumers with accurate and unbiased
            information to help them make informed decisions when it comes to
            purchasing products and services.
          </p>
          <br />
          <p>
            Our goal is to make your shopping experience easier and more
            enjoyable by providing you with the best possible options available
            in the market. We do extensive research and testing to compare and
            evaluate different products and services based on various factors
            such as price, quality, features, customer reviews, and more.
          </p>
          <br />
          <p>
            Our website offers a comprehensive and easy-to-use comparison tool
            that helps you find the best product or service for your needs. Our
            team is dedicated to providing you with the latest and most accurate
            information, so you can make an informed decision that you&apos;ll
            be happy with.
          </p>
          <br />
          <p>
            We believe in transparency and honesty, which is why we disclose any
            potential conflicts of interest and always strive to provide
            unbiased and impartial reviews. We&apos;re committed to providing
            you with the best possible shopping experience, and we&apos;re here
            to help you every step of the way.
          </p>
          <br />
          <p>
            Thank you for choosing our website as your go-to destination for
            product and service comparisons. If you have any questions or
            feedback, please don&apos;t hesitate to reach out to us.
          </p>
        </div>
      </div>
    </div>
  );
}
