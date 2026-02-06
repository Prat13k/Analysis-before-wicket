import { fetchblogs } from "./fetchblogs.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const blogs = await fetchblogs({ limit: 5 });  // Limit to top 5 blogs
        const container = document.getElementById("recent-blogs");

        if (!blogs || blogs.length === 0) {
            container.innerHTML = "<p>No blogs found.</p>";
            return;
        }

        container.innerHTML = blogs
            .map(
                blog => {
                    const preview = stripHTML(blog.content || "").slice(0, 100) || "No preview available";
                    const date = blog.created_at ? new Date(blog.created_at).toDateString() : "Unknown date";
                    return `
                    <a href="blog.html?slug=${blog.slug || 'unknown'}" class="blog-link">
                        <article class="blog-card">
                            <h2>${blog.title || "Untitled"}</h2>
                            <p>${preview}...</p>
                            <small>${date}</small>
                        </article>
                    </a>`;
                }
            )
            .join("");
    } catch (err) {
        console.error(err);
        document.getElementById("recent-blogs").innerHTML =
            "<p>Failed to load blogs.</p>";
    }
});

// Utility: remove HTML tags for preview text
function stripHTML(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
