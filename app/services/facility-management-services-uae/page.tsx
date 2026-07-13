import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["facility-management-services-uae"];

export const metadata = createServiceMetadata(page);

export default function FacilityManagementPage() {
  return <ServiceLanding page={page} />;
}
