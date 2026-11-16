// js/archive.page.js
import { fetchblogs } from "./fetchblogs.js";

console.log("[archive] module loaded");

document.addEventListener("DOMContentLoaded", async () => {
    console.log("[archive] DOM ready");

    const container = document.getElementById("recent-blogs");
    if (!container) {
        console.error("[archive] container #recent-blogs NOT FOUND in HTML");
        return;
    }
    console.log("[archive] container found");

    try {
        console.log("[archive] fetching blogs...");
        const blogs = await fetchblogs({ order: "desc" });
        console.log("[archive] fetched blogs:", blogs);

        if (!blogs || blogs.length === 0) {
            container.innerHTML = "<p>No blogs found.</p>";
            return;
        }

        container.innerHTML = blogs.map(renderCard).join("");
        console.log(`[archive] rendered ${blogs.length} card(s)`);
    } catch (err) {
        console.error("[archive] FAILED to fetch blogs:", err);
        container.innerHTML = "<p>Failed to load blogs. Check console.</p>";
    }
});

// Self-contained card renderer — no imports
function renderCard(blog) {
    const preview = stripHTML(blog.content || "").slice(0, 150).trim();
    const date = blog.date ? new Date(blog.date).toDateString() : "Unknown date";

    // ✅ Priority: url → file → slug fallback
    const href = blog.url
        || blog.file
        || `blog.html?slug=${encodeURIComponent(blog.slug || "")}`;

    return `
        <a href="${href}" class="blog-link">
            <article class="blog-card">
                <h2>${blog.title || "Untitled"}</h2>
                <p>${preview ? preview + "…" : "No preview available"}</p>
                <small>${date}</small>
            </article>
        </a>`;
}
function stripHTML(html) {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
