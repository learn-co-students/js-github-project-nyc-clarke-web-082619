function fetchGit(event, search){
    event.preventDefault();
    return fetch(`https://api.github.com/search/users?q=${search}`, {
        method: "get",
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    }).then(resp => resp.json())
    .then(json => {
        console.log(json.items[0])
        for(let i = 0; i < json.items.length; i++){
            console.log(json.items[i]);
            createList(json.items[i]);
        }
    })
}

function createList(item){
    let userlist = document.getElementById('user-list');
    let list = document.createElement('li');
    list.innerHTML = 
    `<div class = "git-card">
        <li><a href=${item.html_url}>${item.login}</a>
        <img src=${item.avatar_url} width=20px height = 20px> 
        </li>
        </div>
    `
    userlist.append(list);
}

document.addEventListener('submit', ()=> {
    event.preventDefault();
    let search = document.getElementById('search').value;
    fetchGit(event, search);
})