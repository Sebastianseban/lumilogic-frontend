import HeroBlock from "./HeroBlock";
import FeatureSplitBlock from "./FeatureSplitBlock";
import ProcessGridBlock from "./ProcessGridBlock";
import ServicesGridBlock from "./ServicesGridBlock";
import LogoGridBlock from "./LogoGridBlock";
import BenefitsGridBlock from "./BenefitsGridBlock";

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} />;

    case "feature_split":
    case "feature-split":
      return <FeatureSplitBlock data={block.data} />;

    case "process_grid":
    case "process-grid":
      return <ProcessGridBlock data={block.data} />;

    case "services_grid":
    case "services-grid":
      return <ServicesGridBlock data={block.data} />;

    case "logo_grid":
    case "logo-grid":
      return <LogoGridBlock data={block.data} />;

    case "benefits_grid":
    case "benefits-grid":
      return <BenefitsGridBlock data={block.data} />;

    default:
      return null;
  }
}