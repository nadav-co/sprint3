export const utils = {
    makeId,
    getRndInt
}

function makeId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}