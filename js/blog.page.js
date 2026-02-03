import { fetchblogs } from "./fetchblogs.js";

(async () => {
  try {
    // Get slug from URL
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    // Get container
    const container = document.getElementById("blog-container");

    // Guard: exit safely if not on blog page
    if (!container) {
      console.debug("blog.page.js loaded on a non-blog page");
      return;
    }

    // Fetch all blogs
    const blogs = await fetchblogs();

    // Find matching blog
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
      container.innerHTML = "<h2>Blog not found</h2>";
      return;
    }

    // Render blog
    container.innerHTML = `
      <article class="full-blog">
        <h1>${blog.title}</h1>
        <small>${new Date(blog.created_at).toDateString()}</small>
        <div class="blog-body">
          ${blog.content}
        </div>
      </article>
    `;

    // Optional chart support
    const ctx = document.getElementById("runRateChart");
    if (ctx && window.Chart) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Over 5", "Over 10", "Over 15", "Over 20"],
          datasets: [{
            label: "Run Rate",
            data: [6.2, 7.1, 8.5, 9.3]
          }]
        }
      });
    }

  } catch (error) {
    console.error("Error loading blog:", error);

    const container = document.getElementById("blog-container");
    if (container) {
      container.innerHTML = "<p>Failed to load blog.</p>";
    }
  }
})();
