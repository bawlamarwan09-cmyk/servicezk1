import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["deep-post-construction-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

export default function DeepCleaningPage() {
  return <ServiceLanding page={page} />;
}
