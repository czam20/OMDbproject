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
            data.Search.forEach(element => {
                if (element.Poster != "N/A") {
                    const title = document.createElement('h3')
                    title.innerText = element.Title
                    title.setAttribute('class', 'movie__title')

                    const poster = document.createElement('figure')
                    poster.setAttribute('class', 'movie__poster')

                    const poster_img = document.createElement('img')
                    poster_img.setAttribute('src', element.Poster)
                    poster_img.setAttribute('class', 'img movie__poster-img')

                    const poster_hover = document.createElement('div')
                    poster_hover.setAttribute('class', 'movie__poster-hover')

                    const poster_btn = document.createElement('button')
                    poster_btn.innerText = 'View Details'
                    poster_btn.setAttribute('class', 'btn hover__btn')
                    poster_btn.setAttribute('id', 'movie-details-btn')

                    poster_hover.append(poster_btn)

                    poster.append(poster_img, poster_hover)

                    const year = document.createElement('span')
                    year.innerText = element.Year
                    year.setAttribute('class', 'movie__year')

                    const div = document.createElement('div')
                    div.setAttribute('class', 'movie')
                    div.append(poster, title, year)

                    container.append(div)


                    poster_btn.onclick = () => {
                        fetch(`${API}${API_KEY}&i=${element.imdbID}&plot=full`)
                            .then((res) => res.json())
                            .then((data) => {
                                const title = document.querySelector('#title')
                                title.innerText = data.Title

                                const year = document.querySelector('#year')
                                year.innerText = data.Year

                                const director = document.querySelector('#director')
                                director.innerText += ` ${data.Director}`

                                const img = document.querySelector('#poster')
                                img.setAttribute('src', data.Poster)

                                const description = document.querySelector('#description')
                                description.innerText = data.Plot

                                const production = document.querySelector('#production')
                                production.innertext = data.Production

                                const writer = document.querySelector('#writer')
                                writer.innerText = data.Writer

                                const actors = document.querySelector('#actors')
                                actors.innerText = data.Actors

                                const awards = document.querySelector('#awards')
                                awards.innerText = data.Awards

                                const rated = document.querySelector('#rated')
                                rated.innerText = data.Rated

                                const country = document.querySelector('#country')
                                country.innerText = data.Country

                                // muesto el modal
                                const modal = document.querySelector("#modal")
                                modal.classList.add('modal-show')

                            })
                    }
                }
            });
        })
}

const close_btn = document.querySelector('#close-btn')

close_btn.onclick = () => {
    const modal = document.querySelector('#modal')
    modal.classList.remove('modal-show')
}