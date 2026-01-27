import { fetchblogs } from "./fetchblogs.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("recent-blogs");

  try {
    const blogs = await fetchblogs(); // default: all blogs

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
              <p>${(blog.content || "").slice(0, 1000)}...</p>
              <time datetime="${blog.created_at}">
                ${new Date(blog.created_at).toDateString()}
              </time>
            </article>
          </a>`
      )
      .join("");

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Failed to load blogs.</p>";
  }
});
