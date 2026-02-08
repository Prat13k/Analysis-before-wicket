export async function fetchblogs({ limit = null, order = "desc" } = {}) {
  const response = await fetch("./data/blogs.json");
  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.status}`);
  }
  
  // Get raw text and trim to remove trailing whitespace
  const rawText = await response.text();
  const trimmedText = rawText.trim();  // Removes leading/trailing whitespace/newlines
  
  let blogs;
  try {
    blogs = JSON.parse(trimmedText);
  } catch (error) {
    console.error("JSON parsing failed:", error);
    throw new Error("Invalid JSON in blogs.json");
  }

  // sort by date
  /*blogs.sort((a, b) => {
    return order === "desc"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at);
  });*/

  // limit if needed
  if (limit !== null) {
    blogs = blogs.slice(0, limit);
  }

  return blogs;
}
