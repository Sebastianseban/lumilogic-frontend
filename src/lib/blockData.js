const TYPE_ALIASES = {
  "feature-split": "feature_split",
  "process-grid": "process_grid",
  "services-grid": "services_grid",
  "logo-grid": "logo_grid",
  "benefits-grid": "benefits_grid",
};

export function normalizeBlockType(type) {
  return TYPE_ALIASES[type] || type;
}

export function getDefaultBlockData(type) {
  const normalizedType = normalizeBlockType(type);

  switch (normalizedType) {
    case "hero":
      return {
        heading: "",
        subheading: "",
        description: "",
        ctaText: "",
        ctaLink: "",
        backgroundImage: "",
      };
    case "feature_split":
      return {
        heading: "",
        description: "",
        image: "",
        imagePosition: "right",
        isIcon: false,
      };
    case "services_grid":
      return {
        heading: "",
        description: "",
        services: [],
      };
    case "process_grid":
      return {
        heading: "",
        description: "",
        steps: [],
      };
    case "logo_grid":
      return {
        heading: "",
        logos: [],
      };
    case "benefits_grid":
      return {
        heading: "",
        description: "",
        benefits: [],
      };
    default:
      return {};
  }
}

export function normalizeBlockData(type, data) {
  const normalizedType = normalizeBlockType(type);
  const source = data || {};
  const defaults = getDefaultBlockData(normalizedType);

  switch (normalizedType) {
    case "hero":
      return {
        ...defaults,
        ...source,
      };

    case "feature_split":
      return {
        ...defaults,
        ...source,
        imagePosition: source.imagePosition === "left" ? "left" : "right",
      };

    case "services_grid":
      return {
        ...defaults,
        ...source,
        services: (source.services || []).map((service, index) => ({
          id: service?.id || `service-${index}`,
          title: service?.title || "",
          description: service?.description || "",
          icon: service?.icon || "Box",
        })),
      };

    case "process_grid":
      return {
        ...defaults,
        ...source,
        steps: (source.steps || []).map((step, index) => ({
          id: step?.id || `step-${index}`,
          number: step?.number || "",
          title: step?.title || "",
          description: step?.description || "",
        })),
      };

    case "logo_grid":
      return {
        ...defaults,
        ...source,
        logos: (source.logos || []).map((logo, index) => {
          const imageUrl = logo?.imageUrl || logo?.image || "";
          return {
            id: logo?.id || `logo-${index}`,
            name: logo?.name || "",
            description: logo?.description || "",
            imageUrl,
            image: logo?.image || imageUrl,
          };
        }),
      };

    case "benefits_grid":
      return {
        ...defaults,
        ...source,
        description: source.description || source.subheading || "",
        benefits: (source.benefits || []).map((benefit, index) => ({
          id: benefit?.id || `benefit-${index}`,
          title: benefit?.title || "",
          description: benefit?.description || "",
          icon: benefit?.icon || "CheckCircle",
        })),
      };

    default:
      return {
        ...defaults,
        ...source,
      };
  }
}
