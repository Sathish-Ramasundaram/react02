export async function fetchNewsApi() {
  await new Promise((r) => setTimeout(r, 1000));

  return [
    "React 19 Released",
    "Redux Toolkit Trending",
    "TypeScript 6 Preview",
  ];
}
