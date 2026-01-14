export const generateSlug = (content: string) => {
  const slugBase = content
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${slugBase}-${randomNumber}`;
};
