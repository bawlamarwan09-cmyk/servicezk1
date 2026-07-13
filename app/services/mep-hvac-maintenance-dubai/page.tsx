import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["mep-hvac-maintenance-dubai"];

export const metadata = createServiceMetadata(page);

export default function MepHvacPage() {
  return <ServiceLanding page={page} />;
}
