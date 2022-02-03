// Search movie
const API_KEY = '715d100a';
const API = 'https://www.omdbapi.com/?apikey=';

const search = document.querySelector("#btn-search")
const movieSearch = document.querySelector("#input-search")

search.onclick = () => {
    const container = document.querySelector("#movies-container")
    container.innerHTML = ""

    fetch(`${API}${API_KEY}&s=${movieSearch.value}`)
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem('search', JSON.stringify(data.Search))
            data.Search.forEach(element => {
                if (element.Poster != "N/A") {
                    createPosterMovie(element, container)
                }
            });

        })
}

const createPosterMovie = (movie, container) => {
    const title = document.createElement('h3')
    title.innerText = movie.Title
    title.setAttribute('class', 'movie__title')

    //img
    const poster = document.createElement('figure')
    poster.setAttribute('class', 'movie__poster')

    const poster_img = document.createElement('img')
    poster_img.setAttribute('src', movie.Poster)
    poster_img.setAttribute('class', 'img movie__poster-img')

    const poster_hover = document.createElement('div')
    poster_hover.setAttribute('class', 'movie__poster-hover')

    const favorite_container = document.createElement('div')
    favorite_container.setAttribute('class', 'movie-favorite')

    if (sessionStorage.getItem('user')) {
        favoriteButton(favorite_container, movie)
    }

    const poster_btn = document.createElement('button')
    poster_btn.innerText = 'View Details'
    poster_btn.setAttribute('class', 'btn hover__btn')
    poster_btn.onclick = () => {
        fetch(`${API}${API_KEY}&i=${movie.imdbID}&plot=full`)
            .then((res) => res.json())
            .then((data) => showMovieDetails(data))
    }

    poster_hover.append(favorite_container, poster_btn)

    poster.append(poster_img, poster_hover)
        //img

    const year = document.createElement('span')
    year.innerText = movie.Year
    year.setAttribute('class', 'movie__year')

    const div = document.createElement('div')
    div.setAttribute('class', 'movie')
    div.append(poster, title, year)

    container.append(div)
}

//Movie details
const showMovieDetails = (movie) => {
    document.querySelector('#title').innerText = movie.Title
    document.querySelector('#year').innerText = movie.Year
    document.querySelector('#director').innerText += ` ${movie.Director}`
    document.querySelector('#poster').setAttribute('src', movie.Poster)
    document.querySelector('#description').innerText = movie.Plot
    document.querySelector('#production').innerText = movie.Production
    document.querySelector('#writer').innerText = movie.Writer
    document.querySelector('#actors').innerText = movie.Actors
    document.querySelector('#awards').innerText = movie.Awards
    document.querySelector('#rated').innerText = movie.Rated
    document.querySelector('#country').innerText = movie.Country

    // muesto el modal
    document.querySelector("#movie-details-modal").classList.add('modal-show')
}

const close_details = document.querySelector('#close-details')
close_details.onclick = () => document.querySelector('#movie-details-modal').classList.remove('modal-show')

// Login
const login = document.querySelector('#login')
login.onclick = () => document.querySelector("#login-modal").classList.add('modal-show')

const close_login = document.querySelector("#close-login")
close_login.onclick = () => document.querySelector("#login-modal").classList.remove('modal-show')

const login_btn = document.querySelector("#login-btn")
login_btn.onclick = () => {
    user = {
        "username": document.querySelector("#username").value,
        "password": document.querySelector("#password").value,
        "favorites": []
    }
    sessionStorage.setItem("user", JSON.stringify(user))

    document.querySelector("#login-modal").classList.remove('modal-show')

    updateMenu()

    const favorites_container = document.querySelectorAll('.movie-favorite')
    if (favorites_container.length > 0) {
        let i = 0
        JSON.parse(localStorage.getItem('search')).forEach((movie) => {
            favoriteButton(favorites_container[i], movie)
            i += 1;
        })
    }


}

const updateMenu = () => {
    const logout = document.createElement("li")
    logout.innerText = "Logout"
    logout.setAttribute("class", "nabvar__menu-item")

    logout.onclick = () => {
        menu.removeChild(logout)
        menu.removeChild(favorites)
        menu.append(login)

        sessionStorage.clear()
        document.querySelectorAll('.movie-favorite').forEach((poster) => poster.remove(document.querySelector('.movie-favorite__btn')))

        document.querySelector("#search-section").append(search_form)
        const container = document.querySelector("#movies-container")
        container.innerHTML = ""

        localStorage.clear()
    }



    const favorites = document.createElement("li")
    favorites.innerText = "Favorites"
    favorites.setAttribute("class", "nabvar__menu-item")
    favorites.onclick = showFavoritesMovies

    const menu = document.querySelector("#menu")
    menu.removeChild(login)
    menu.append(favorites, logout)
}



const search_form = document.querySelector("#search-form")

const home = document.querySelector("#home")
home.onclick = () => {
    document.querySelector("#search-section").append(search_form)
    const container = document.querySelector("#movies-container")
    container.innerHTML = ""
    JSON.parse(localStorage.getItem('search')).forEach((movie) => createPosterMovie(movie, container))

}

const showFavoritesMovies = () => {
    const container = document.querySelector("#movies-container")
    container.innerHTML = ""

    favorite_movies = JSON.parse(sessionStorage.getItem('user')).favorites
    favorite_movies.forEach(movie => createPosterMovie(movie, container))

    document.querySelector("#search-section").removeChild(search_form)
}

const favoriteButton = (container, movie) => {
    const favorite_btn = document.createElement("button")
    favorite_btn.setAttribute('class', 'movie-favorite__btn')
    favorite_btn.innerHTML = `<i class="fas fa-star"></i>`

    user = JSON.parse(sessionStorage.getItem('user'))
    JSON.stringify(user.favorites).includes(JSON.stringify(movie)) ? favorite_btn.style.color = '#FFD700' : favorite_btn.style.color = '#F8F8A6'

    favorite_btn.onclick = () => {
        if (JSON.stringify(user.favorites).includes(JSON.stringify(movie))) {
            console.log(document.querySelector('#movies-container'))
                // document.querySelector('#movies-container').removeChild(container)
            user.favorites.splice(user.favorites.indexOf(movie), 1)
            favorite_btn.style.color = '#F8F8A6'
        } else {
            user.favorites.push(movie)
            favorite_btn.style.color = '#FFD700'
        }
        sessionStorage.setItem('user', JSON.stringify(user))
    }
    container.append(favorite_btn)
}