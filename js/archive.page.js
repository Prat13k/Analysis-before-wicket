import { fetchblogs } from "./fetchblogs.js";

(async () => {
  try {
    // Get archive container
    const container = document.getElementById("all-blogs");
    console.log("Archive page - Container found:", container);  // Debug: Should log the element or null

    // Guard: exit safely if not on archive page
    if (!container) {
      console.debug("archive.page.js loaded on a non-archive page - skipping blog load.");
      return;
    }

    console.log("Starting blog fetch...");  // Debug log

    // Fetch blogs with error handling
    const blogs = await fetchblogs();
    console.log("Fetched blogs:", blogs);  // Debug log

    if (!Array.isArray(blogs) || blogs.length === 0) {
      container.innerHTML = "<p>No blogs available.</p>";
      console.warn("No blogs to display.");  // Debug log
      return;
    }

    // Render blog cards with fallbacks
    container.innerHTML = blogs
      .map(blog => {
        const preview = stripHTML(blog.content || "").slice(0, 120) || "No preview available";
        const date = blog.created_at ? new Date(blog.created_at).toDateString() : "Unknown date";
        return `
          <a href="blog.html?slug=${blog.slug || 'unknown'}" class="blog-link">
            <article class="blog-card">
              <h2>${blog.title || "Untitled"}</h2>
              <p>${preview}...</p>
              <small>${date}</small>
            </article>
          </a>
        `;
      })
      .join("");

    console.log("Blogs rendered successfully.");  // Debug log

  } catch (error) {
    console.error("Error loading archive:", error);

    // Use the same container for errors
    const container = document.getElementById("all-blogs");
    if (container) {
      container.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
    }
  }
})();

// Utility: remove HTML tags for preview text
function stripHTML(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
