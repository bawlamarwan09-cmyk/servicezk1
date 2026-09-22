import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["commercial-kitchen-hood-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

export default function CommercialKitchenHoodCleaningPage() {
  return <ServiceLanding page={page} />;
}
