export async function fetchblogs({ limit = null, order = "desc" } = {}) {
  const base = window.location.origin + 
               window.location.pathname.replace(/\/[^/]*$/, '/');
  
  const response = await fetch(base + "data/manifest.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch manifest: ${response.status}`);
  }

  let blogs = await response.json();

  blogs.sort((a, b) => {
    return order === "desc"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  if (limit !== null) {
    blogs = blogs.slice(0, limit);
  }

  return blogs;
}
