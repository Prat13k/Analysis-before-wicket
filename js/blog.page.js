import { fetchblogs } from "./fetchblogs.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const container = document.getElementById("blog-container");

if (!container) {
  console.debug("blog.page.js loaded on a non-blog page");
  return;
}

(async () => {
  const blogs = await fetchblogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    container.innerHTML = "<h2>Blog not found</h2>";
    return;
  }

  container.innerHTML = `
    <h1>${blog.title}</h1>
    <small>${new Date(blog.created_at).toDateString()}</small>
    <div class="blog-body">
      ${blog.content}
    </div>
  `;

  // Chart (optional)
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
})();
