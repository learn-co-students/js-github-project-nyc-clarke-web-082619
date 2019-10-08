document.addEventListener("DOMContentLoaded", () => {
    function getUsers(){
        // let response;
        // event.preventDefault();
        // let searchTerm = document.getElementById("search").value;
        // console.log(fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        // .then(response => response.json()));
        event.preventDefault();
        let searchTerm = document.getElementById("search").value;
        if (searchTerm !== ""){
            let response = fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
           // console.log(data.items)
            displayUsers(data.items);
        })

        }
    }

    function displayUsers(json){
        //console.log(json);
        for (const elem of json){
            let userList = document.getElementById('user-list');
            let user = document.createElement('li');
            let userlink = document.createElement('a');

            let username = elem.login;
            let avatarUrl = elem.avatar_url;
            let htmlUrl = elem.html_url;
            //let usernameNode = document.createTextNode('username');
            let imgNode = document.createElement('img');
            let br = document.createElement('br');

            imgNode.src = avatarUrl;
            //imgNode.setAttribute('onclick', `displayRepos(${username})`);
            imgNode.addEventListener('click', function(){
                displayRepos(username)});
            imgNode.height = '100';
            imgNode.width = '100';

            //usernameNode.textContent = username;

            userlink.href = htmlUrl;
            userlink.textContent = username;

            user.id = username;

            //user.appendChild(usernameNode);

            user.appendChild(userlink);
            user.appendChild(imgNode);

            userList.appendChild(user);
            userList.appendChild(br);
        }
        
    }

    function displayRepos(username){
        repoList = document.getElementById('repos-list');
        console.log(repoList.children);
        // if (!(repos === undefined) && !(repos.length === 0) ){
        //     for (child in repos){
        //         //console.log(child);
        //     }
        // }
        while(repoList.firstChild){
            repoList.removeChild(repoList.firstChild);
        }
        //user = document.getElementById(username);
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            getReposInfo(json)
        })
    }

    function getReposInfo(json){
        for (elem of json){
            repo = document.createElement('li');
            repoName = document.createTextNode(elem.full_name);
            repo.appendChild(repoName);
            repoList.appendChild(repo);
        }
    }

    document.getElementById("github-form").addEventListener("submit", getUsers);
});