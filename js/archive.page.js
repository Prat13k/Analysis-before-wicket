import { fetchblogs } from "./fetchblogs.js";

(async () => {
  try {
    const container = document.getElementById("all-blogs");

    if (!container) {
      console.debug("archive.page.js loaded on a non-archive page - skipping.");
      return;
    }

    const blogs = await fetchblogs();
    blogs.sort((a, b) => b.id - a.id);

    if (!Array.isArray(blogs) || blogs.length === 0) {
      container.innerHTML = "<p>No blogs available.</p>";
      return;
    }

    container.innerHTML = blogs
      .map(blog => {
        const date = blog.date
          ? new Date(blog.date).toDateString()
          : "Unknown date";
        return `
          <a href="blog.html?slug=${blog.slug || 'unknown'}" class="blog-link">
            <article class="blog-card">
              <h2>${blog.title || "Untitled"}</h2>
              <small>${date}</small>
            </article>
          </a>
        `;
      })
      .join("");

  } catch (error) {
    console.error("Error loading archive:", error);
    const container = document.getElementById("all-blogs");
    if (container) {
      container.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
    }
  }
})();
