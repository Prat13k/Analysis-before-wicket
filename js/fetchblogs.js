export async function fetchblogs({ limit = null, order = "desc" } = {}) {
  const response = await fetch("./data/blogs.json");
  let blogs = await response.json();

  // sort by date
  blogs.sort((a, b) => {
    return order === "desc"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at);
  });

  // limit if needed
  if (limit !== null) {
    blogs = blogs.slice(0, limit);
  }

  return blogs;
}
