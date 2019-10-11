document.addEventListener('DOMContentLoaded', function(){
    let userList = document.getElementById('user-list');
    let repoList = document.getElementById('repos-list');
//start of get users
    function getUsers(event){
        event.preventDefault();

        let searchTerm = document.getElementById('search').value;
        if (searchTerm !== ""){
            fetch(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(resp => {
                return resp.json();
            })
            .then(info => {
                renderUsers(info.items); 
            })
            
        }
    }
    //end of get users : start of render users
   function renderUsers(userInfo){
    //clears page
    if (userList.children){
        while(userList.firstChild){
            userList.firstChild.remove();
        }
    }

    for(const usr of userInfo){
        let user = document.createElement('li');
        user.innerText = `user name: ${usr.login}, `;
        let aTag = document.createElement('a');
        aTag.setAttribute('href', usr.html_url);
        aTag.href = usr.html_url;
        aTag.textContent = 'profile';
        user.appendChild(aTag);
        let img = document.createElement('img');
        img.src = usr.avatar_url;
        img.id = usr.login;
        user.appendChild(img);
        let br = document.createElement('br');
        user.appendChild(br);
        userList.appendChild(user);
    }
    userList.addEventListener('click', function(e){
        getRepo(event);
    })
   }
   //end of render user : start of get repos
   function getRepo(event){
    event.preventDefault();
    //clears the screen
    if (userList.children){
        while(userList.firstChild){
            userList.firstChild.remove();
        }
    }

    if (event.target.tagName === 'IMG'){
        let username = event.target.id;
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(resp =>{
            return resp.json();
        })
        .then(info =>{ 
            renderRepo(info);
        })
    }
   }
   //end of get repos : start of render repos
   function renderRepo(info){
       //clears page
    if (repoList.children){
        while(repoList.firstChild){
            repoList.firstChild.remove();
        }
    }
    let header = document.createElement('h1');
    header.innerText = `${info[0].owner.login}'s Repositories: \b`
    repoList.appendChild(header);
    for(const index of info){ 
        let userRepo = document.createElement('li');
        userRepo.innerText = index.name;
        repoList.appendChild(userRepo);
    }
   }
    
    document.getElementById('github-form').addEventListener('submit', function(event){
        getUsers(event);
    })
})
