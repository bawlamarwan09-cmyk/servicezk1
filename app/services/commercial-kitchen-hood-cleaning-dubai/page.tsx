import {
  createServiceMetadata,
} from "../../ServiceLanding";
import { KitchenHoodLanding } from "../../KitchenHoodLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["commercial-kitchen-hood-cleaning-dubai"];

export const metadata = createServiceMetadata(page);

export default function CommercialKitchenHoodCleaningPage() {
  return <KitchenHoodLanding page={page} />;
}
