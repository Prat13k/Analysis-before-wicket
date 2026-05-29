import { fetchblogs } from "./fetchblogs.js";

(async () => {
  try {
    const params    = new URLSearchParams(window.location.search);
    const slug      = params.get("slug");
    const container = document.getElementById("blog-container");

    if (!container) return;

    // find the blog entry in manifest
    const blogs = await fetchblogs();
    const blog  = blogs.find(b => b.slug === slug);

    if (!blog) {
      container.innerHTML = "<h2>Blog not found</h2>";
      return;
    }

    // fetch the actual HTML file
    const htmlResponse = await fetch(blog.file);
    if (!htmlResponse.ok) {
      container.innerHTML = "<h2>Could not load blog post</h2>";
      return;
    }

    const htmlContent = await htmlResponse.text();

    // render it
    container.innerHTML = `
      <article class="full-blog">
        <h1>${blog.title}</h1>
        <small>${new Date(blog.date).toDateString()}</small>
        <div class="blog-body">
          ${htmlContent}
        </div>
      </article>
    `;

  } catch (error) {
    console.error("Error loading blog:", error);
    const container = document.getElementById("blog-container");
    if (container) {
      container.innerHTML = "<p>Failed to load blog. Please try again.</p>";
    }
  }
})();
