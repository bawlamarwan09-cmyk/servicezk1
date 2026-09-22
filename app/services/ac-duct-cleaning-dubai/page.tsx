import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["ac-duct-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

export default function AcDuctCleaningPage() {
  return <ServiceLanding page={page} />;
}
