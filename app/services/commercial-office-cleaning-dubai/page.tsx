import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["commercial-office-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

export default function CommercialCleaningPage() {
  return <ServiceLanding page={page} />;
}
