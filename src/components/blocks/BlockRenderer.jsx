import HeroBlock from "./HeroBlock";
import FeatureSplitBlock from "./FeatureSplitBlock";
import ProcessGridBlock from "./ProcessGridBlock";
import ServicesGridBlock from "./ServicesGridBlock";
import LogoGridBlock from "./LogoGridBlock";
import BenefitsGridBlock from "./BenefitsGridBlock";
import { normalizeBlockData, normalizeBlockType } from "@/lib/blockData";

export default function BlockRenderer({ block }) {
  const type = normalizeBlockType(block?.type);
  const data = normalizeBlockData(type, block?.data);

  switch (type) {
    case "hero":
      return <HeroBlock data={data} />;

    case "feature_split":
      return <FeatureSplitBlock data={data} />;

    case "process_grid":
      return <ProcessGridBlock data={data} />;

    case "services_grid":
      return <ServicesGridBlock data={data} />;

    case "logo_grid":
      return <LogoGridBlock data={data} />;

    case "benefits_grid":
      return <BenefitsGridBlock data={data} />;

    default:
      return null;
  }
}
