function fetchJSON(url, func) {
	fetch(url)
		.then(response => {
			return response.json();
		}).then(json => {
			if (typeof func === 'function') func(json);
		})
}

function request(data) {
	data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());


	let lastProjectsUl = document.getElementById('js-last-projects');
	let modal = document.getElementById('modal');
	let modalTitle = document.getElementById('title');
	let modalDescription = document.getElementById('description');
	let modalUrl = document.getElementById('url');

	//cerrar modal
	['keydown', 'click'].forEach((eName) => {
		window.addEventListener(eName, (e)=> {
			if(e.keyCode == 27){
				modal.style.visibility = 'hidden';
			}else if (!e.keyCode){
				modal.style.visibility = 'hidden';
			}
		}, true);
	});

	//
	for(let i = 0; i < 10; i += 1){

		let li = document.createElement('li');
		li.className= 'projects';
		let btn = document.createElement('button');
		lastProjectsUl.appendChild(li);
		li.appendChild(btn);
		btn.innerText = data[i].name;
		
		btn.addEventListener('click', ()=>{
			modal.style.visibility = 'visible';
			modalTitle.innerText = data[i].name;
			modalDescription.innerText = data[i].description;
			modalUrl.innerText = data[i].html_url;
			modalUrl.href = data[i].html_url;
			modalUrl.setAttribute('target', '_blank');
		});
	}

}

fetchJSON('https://api.github.com/users/Alizamora/repos', request);
