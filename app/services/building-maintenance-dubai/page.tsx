import {
  ServiceLanding,
  createServiceMetadata,
} from "../../ServiceLanding";
import { servicePages } from "../../seo-content";

const page = servicePages["building-maintenance-dubai"];

export const metadata = createServiceMetadata(page);

export default function BuildingMaintenancePage() {
  return <ServiceLanding page={page} />;
}
