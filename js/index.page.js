import { fetchblogs } from "./js/fetchblogs.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const blogs = await fetchblogs({ mode: "all" });
        const container = document.getElementById("recent-blogs");

        if (!blogs || blogs.length === 0) {
            container.innerHTML = "<p>No blogs found.</p>";
            return;
        }

        container.innerHTML = blogs
            .map(
                blog => `
                <article class="blog-card">
                    <h2>${blog.title}</h2>
                    <p>${blog.content.substring(0, 200)}...</p>
                    <small>${new Date(blog.created_at).toDateString()}</small>
                </article>
                `
            )
            .join("");
    } catch (err) {
        console.error(err);
        document.getElementById("recent-blogs").innerHTML =
            "<p>Failed to load blogs.</p>";
    }
});
