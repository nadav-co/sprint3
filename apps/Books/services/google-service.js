import { storageService } from "../../../services/storage-service.js"

export const googleService = {
    getGoogleBooks,
}


function getGoogleBooks(value) {
    var books = storageService.loadFromStorage(`${value}-search`)
    if (!books) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${value}`)
            .then(res => res.data.items)
            .then(books => { storageService.saveToStorage(`${value}-search`, books); return books })
            .catch(err => console.log(err))
    }
    return Promise.resolve(books)
}