document.getElementBy("date-filter").addEventListener("change, function()"{
	const selectdate = this.value;
	blogContainer.innerHTL = "";
	current_index = 0;
	
	const filteredblogs = blogs.filter(blog => blog.date >= selectdate);
	
	filteredblogs.slice(0,blogsperpage).forEach(blog => {
		const document.createElement("a");
		a.className = "blogs-card";
		a.innerHTML = '<h3>$(blog.title)</h3><p>${blog.date}</p><p>${blog.content}</p>';
		blogContainer.appendChild(a)
	})
})