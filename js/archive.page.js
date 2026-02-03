import { fetchblogs } from "./fetchblogs.js";

const container = document.getElementById("recent-blogs");

if (!container) {
  console.debug("archive.page.js loaded on a non-archive page");
  return;
}

(async () => {
  try {
    const blogs = await fetchblogs();

    if (!Array.isArray(blogs) || blogs.length === 0) {
      container.innerHTML = "<p>No blogs available.</p>";
      return;
    }

    container.innerHTML = blogs
      .map(
        blog => `
          <a href="blog.html?slug=${blog.slug}" class="blog-link">
            <article class="blog-card">
              <h2>${blog.title}</h2>
              <p>${stripHTML(blog.content).slice(0, 120)}...</p>
              <small>${new Date(blog.created_at).toDateString()}</small>
            </article>
          </a>
        `
      )
      .join("");

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Failed to load blogs.</p>";
  }
})();

function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
