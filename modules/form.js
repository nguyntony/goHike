import ajax from "./ajax.js"
import { corsFix, hiking_api_key, google_api_key, googleUrl, hikingUrl } from "../config.js"
export const userSearchButton = document.querySelector(".user-search")
import { makeCard } from "./makeCard.js"

export const userInput = (evt) => {
    let form = document.querySelector("#form")
    let location = document.querySelector(".user-location")
    let userLocation = location.value
    console.log(userLocation)
    evt.preventDefault();
    form.reset();

    ajax(googleUrl + `&query=${userLocation}`, (location) => {
        let parsedLocation = JSON.parse(location)
        console.log(parsedLocation)
        let userLat = parsedLocation.results[0].geometry.location.lat
        let userLng = parsedLocation.results[0].geometry.location.lng
        console.log(`${userLat}, ${userLng}`)

        ajax(hikingUrl + `&lat=${userLat}&lon=${userLng}&maxDistance=10&maxResults=5`, makeCard)

    })
}

userSearchButton.addEventListener("click", userInput)