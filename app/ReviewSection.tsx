import { ReviewCarousel } from "./ReviewCarousel";
import { ReviewForm } from "./ReviewForm";

export function ReviewSection() {
  return (
    <section
      id="customer-reviews"
      className="reviews-section section-anchor py-24 md:py-32"
      aria-labelledby="customer-reviews-heading"
      tabIndex={-1}
    >
      <div className="site-shell">
        <div className="reviews-section__intro">
          <p className="section-kicker section-kicker--light">Your experience matters</p>
          <h2 id="customer-reviews-heading" className="section-title mt-5">
            Share honest feedback. Help us serve every space better.
          </h2>
          <p>
            Tell Evolura about your cleaning or maintenance experience. Reviews are
            checked for authenticity, privacy and respectful language before publication.
          </p>
        </div>

        <ReviewForm />
        <ReviewCarousel />
      </div>
    </section>
  );
}

