async function fetchblogs({limit = null} = {}){
	mode = "all",
	limit = 5,
	order = "desc"
	} = {}){
		
	let url = `${SUPABASE_URL}/rest/v1/blogs?select = title,content,created_at`;
	url += `&order = created_at.${order}`
	
	if(mode == "recent"){
		url += `&limit=${limit}`;
	}
	
	const response = await fetch(url, {
		headers:{
			apikey: SUPABASE_KEY;
			Authorization: `Bearer ${SUPABASE_KEY}` 
		}
	});
	
	return await response.json();
}
