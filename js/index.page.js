// js/index.page.js
import { fetchblogs } from "./fetchblogs.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("recent-blogs");
    if (!container) return;

    try {
        const blogs = await fetchblogs({ limit: 6, order: "desc" });

        if (!blogs || blogs.length === 0) {
            container.innerHTML = "<p>No blogs found.</p>";
            return;
        }

        container.innerHTML = blogs.map(renderHorizontalCard).join("");
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load blogs.</p>";
    }
});

// ---------- Shared helpers ----------
export function renderHorizontalCard(blog) {
    const preview = stripHTML(blog.content || "").slice(0, 150).trim();
    const date = blog.date ? new Date(blog.date).toDateString() : "Unknown date";
    const slug = blog.slug || "unknown";

    return `
        <a href="blog.html?slug=${encodeURIComponent(slug)}" class="blog-link">
            <article class="blog-card">
                <h2>${blog.title || "Untitled"}</h2>
                <p>${preview ? preview + "…" : "No preview available"}</p>
                <small>${date}</small>
            </article>
        </a>`;
}

export function stripHTML(html) {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
