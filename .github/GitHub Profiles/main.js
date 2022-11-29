const API_URL = 'https://api.github.com/users/';

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

getUser('ajithkumar33267');

async function getUser(username) {
    const res = await fetch(API_URL + username);
    const resData = await res.json();
    createUserCard(resData);
    getRepos(username);
};

const getRepos = async (username) => {
    const repo = await fetch(API_URL + username + '/repos');
    const repoData = await repo.json();
    addReposToCard(repoData);
};


const addReposToCard = (repos) => {
    const reposEL = document.querySelector('#repos');

    repos.forEach(repo => {
        const reposEl = document.createElement('a');
        reposEl.classList.add('bg-red-500')
        reposEl.classList.add('mx-2')
        reposEl.classList.add('px-2')
        reposEl.classList.add('py-1')
        reposEl.classList.add('rounded-3xl')
        reposEl.href = repo.html_url;
        reposEl.target = '_blank';
        reposEl.innerText = repo.name;
        reposEL.appendChild(reposEl);
    });
};

const createUserCard = (user) => {
    const cardHtml = `
        <div class="flex items-center px-10 py-0 justify-spacebetween flex-row gap-10">
                <div class="w-[150px] min-w-[150px] select-none rounded-full border-8">
                    <img src="${user.avatar_url}" class=" w-full rounded-full" alt="${user.name}">
                </div>
                <div>
                    <h2 class="text-xl font-bold my-2">${user.name}</h2>
                    <p>Bio: ${user.bio}</p>
                    <ul class=" mt-5 flex gap-5 flex-wrap flex-row">
                        <li>Followers: ${user.followers}</li>
                        <li>Following: ${user.following}</li>
                        <li>Public repo: ${user.public_repos}</li>
                        <li>twitter: ${user.twitter_username}</li>
                        <li>location: ${user.location}</li>
                    </ul>
                    <div id="repos" class="repos flex flex-wrap gap-2 py-4">Repositories: </div>
                </div>
            </div>        
    `;
    main.innerHTML = cardHtml;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    }
});