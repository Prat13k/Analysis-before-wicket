import { fetchblogs } from "./fetchblogs.js";

(async () => {
  try {
    // Get archive container
    const container = document.getElementById("all-blogs");

    // Guard: exit safely if not on archive page
    if (!container) {
      console.debug("archive.page.js loaded on a non-archive page");
      return;
    }

    // Fetch blogs
    const blogs = await fetchblogs();

    if (!Array.isArray(blogs) || blogs.length === 0) {
      container.innerHTML = "<p>No blogs available.</p>";
      return;
    }

    // Render blog cards
    container.innerHTML = blogs
      .map(blog => `
        <a href="blog.html?slug=${blog.slug}" class="blog-link">
          <article class="blog-card">
            <h2>${blog.title}</h2>
            <p>${stripHTML(blog.content).slice(0, 120)}...</p>
            <small>${new Date(blog.created_at).toDateString()}</small>
          </article>
        </a>
      `)
      .join("");

  } catch (error) {
    console.error("Error loading archive:", error);

    const container = document.getElementById("recent-blogs");
    if (container) {
      container.innerHTML = "<p>Failed to load blogs.</p>";
    }
  }
})();

// Utility: remove HTML tags for preview text
function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
