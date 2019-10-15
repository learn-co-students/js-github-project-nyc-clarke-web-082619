const gitForm = document.getElementById('github-form');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repos-list');

gitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchValue = event.target.search.value;
    fetchUserSearch(searchValue);
});

userList.addEventListener('click', (event) => {
    let userName = event.target.innerHTML;
    // console.log(userName);
    fetchUserRepo(userName);
});

function fetchUserSearch(searchValue){
    fetch(`https://api.github.com/search/users?q=${searchValue}`, 
    {
        headers: {Accept: "application/vnd.github.v3+json"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.items)
        showUserSearchResult(data);
    })
    .catch(error => console.log(error.message));
}


function showUserSearchResult(data){
    userList.innerHTML = '';
    data.items.forEach( user => {
        let newUserLi = document.createElement('li');
        newUserLi.innerHTML = user.login;
        userList.appendChild(newUserLi);
    })
}

function fetchUserRepo(name){
    fetch(`https://api.github.com/users/${name}/repos`, 
    {
        headers: {Accept: "application/vnd.github.v3+json"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showRepoResult(data);
    })
    .catch(error => console.log(error.message));
}

function showRepoResult(data){
    repoList.innerHTML = '';
    data.forEach( repo => {
        let newRepoLi = document.createElement('li');
        newRepoLi.innerHTML = repo.html_url;
        repoList.appendChild(newRepoLi);
    })
}



