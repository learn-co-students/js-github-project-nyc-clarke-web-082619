document.addEventListener('DOMContentLoaded', () => {
    let searchInput = document.querySelector('#search')
    let searchForm = document.querySelector('#github-form')
    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')

    searchForm.addEventListener('submit', function(event){
        event.preventDefault();
        let searchFor = (searchInput.value);
        fetch(`https://api.github.com/search/users?q=${searchFor}`)
        .then (resp => resp.json())
        .then (username => renderUsers(username))
        

    })

    function renderUsers(username){
        username.items.forEach(function(user){
           let userCard = document.createElement('li')
            // userCard.setAttribute('data-id', user.id)
           userCard.setAttribute('data-name', user.login)
            let userH = document.createElement('h1')
            // userH.setAttribute('id', name)
            userH.innerText = user.login
            let avatar = document.createElement('img')
            avatar.src = user.avatar_url
            let proLink = document.createElement('a')
            proLink.setAttribute('href', user.url)
            proLink.innerText = user.url
            userCard.append(userH)
            userCard.append(avatar)
            userCard.append(proLink)
            userList.append(userCard)
            console.log(userCard)
        })
    }

    userList.addEventListener('click', function(event){
        if(event.target.tagName === 'IMG'){
        accountName = (event.target.parentNode.dataset.name);
        fetch(`https://api.github.com/users/${accountName}/repos`)
        .then(resp => resp.json())
        .then(repos => renderRepos(repos))
        }
        
    })

    function renderRepos(repos){
        repos.forEach(function(repo){
            let repoLi = document.createElement('a')
            repoLi.setAttribute('href', repo.url)
            repoLi.innerText = repo.url
            repoList.append(repoLi)

        })
    }



    
    console.log(searchInput);
})
