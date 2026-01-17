document.addEventListener("DOMContentLoaded", async()=> {
	try{
		const blogs = await fetchblogs({mode: "all"});
		const container = document.getElementbyId("recent-blogs");
		
		container.innerHTML = blogs.map(blog => 
			<article>
				<h2>${blog.title}</h2>
				<p>${blog.content.substring(0,200)}...</p>
				<small>${new Date(blog.created_at).toDateString()}</small>
			</article>
		).join("");
	} 
	catch(err){
		console.error(err);
		document.getElementById("all-blogs").innerHTML = "Failed to load blogs";
	}
});
