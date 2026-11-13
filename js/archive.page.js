// js/archive.page.js
import { fetchblogs } from "./fetchblogs.js";
import { renderHorizontalCard } from "./index.page.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("recent-blogs");
    if (!container) return;

    try {
        const blogs = await fetchblogs({ order: "desc" }); // no limit → all blogs

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
