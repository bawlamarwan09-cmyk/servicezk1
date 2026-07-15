export type ApprovedReview = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  service: string | null;
  createdAt: string | null;
};

export type ReviewFieldName =
  | "name"
  | "email"
  | "rating"
  | "review"
  | "service"
  | "consentToPublish";

export type ReviewFieldErrors = Partial<Record<ReviewFieldName, string>>;

