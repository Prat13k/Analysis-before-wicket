export async function fetchblogs({ limit = null, order = "desc" } = {}) {
  const response = await fetch("./data/manifest.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.status}`);
  }

  let blogs = await response.json();

  // sort by date
  blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });

  if (limit !== null) {
    blogs = blogs.slice(0, limit);
  }

  return blogs;
}
