export const SEO_CONTENT = {
  appName: "TalkFreeAAC",
  title: "TalkFreeAAC | Free AAC Communication Board & Speech App",
  description:
    "TalkFreeAAC is a free, local-first AAC communication board and speech-generating app for assistive communication, autism communication, classrooms, families, teachers, and therapists.",
  intentClusters: [
    "free AAC app",
    "AAC communication board",
    "speech-generating device",
    "assistive communication",
    "autism communication app",
    "offline AAC",
    "local-first AAC",
    "AAC for schools",
    "communication board",
    "speech therapy communication tool"
  ],
  valueStatements: [
    "Core communication is free.",
    "Communication works locally by default.",
    "The app helps users express needs, emotions, relationships, curiosity, and personality.",
    "Professional insights are optional and do not lock communication."
  ]
};

export function getPageTitle(page = "") {
  if (!page) return SEO_CONTENT.title;
  return `${page} | TalkFreeAAC`;
}

export function getMetaDescription(context = "home") {
  const descriptions = {
    home: SEO_CONTENT.description,
    freeAAC:
      "A free AAC app and communication board designed to help users build sentences, speak phrases, and communicate without a core communication paywall.",
    offline:
      "TalkFreeAAC is designed as a local-first AAC communication app so core communication can work without requiring cloud access.",
    schools:
      "TalkFreeAAC supports classrooms, families, teachers, therapists, and communication teams with free AAC communication and optional professional insights."
  };

  return descriptions[context] || SEO_CONTENT.description;
}
