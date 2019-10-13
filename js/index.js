document.addEventListener("DOMContentLoaded", function() {
   
    function getUsers() {
        event.preventDefault()
        const searchInput = document.getElementById('search').value
            return fetch(`https://api.github.com/search/users?q=${searchInput}`) 
                .then(resp => {return resp.json()})
                .then(userData => { renderUsers(userData.items)}) 
            
    }

    function renderRepos(user) {
        const reposList = document.getElementById('repos-list')
        for (const item of userData) {
        reposList.innerHTML += `<li>${item.full_name}</li>`
        }
    }

    function getRepos(username) {
        return fetch(`https://api.github.com/users/${username}/repos`) 
        .then(resp => {return resp.json()})
        .then(userData => { renderRepos(userData)}) 
}    

    function renderUsers(userData) {
        const userList = document.getElementById('user-list')
        for (const item of userData) {
            userList.innerHTML += 
            `<h2>${item.login}</h2><br>
            <img src='${item.avatar_url}'><br>
            <a href="${item.html_url}">Profile Link</a><br>`}
    }


    const submitForm = document.getElementById('github-form')

    submitForm.addEventListener('submit', getUsers)
    getUsers()
    

})


