import { utils } from '../../../lib/utils.js'
import { storageService } from '../../../services/storage-service.js'

export const keepService = {
    query,
    saveChanges,
    deleteLine,
    deleteNote,
    addData,
    saveNoteChange,
    getNoteById
}

const KEY = 'notes'


var gNotes = [{
    "isPinned": true,
    "id": "_e5vl1blbd",
    "lines": [{
            "type": "NoteImg",
            "info": "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
        },
        {
            "type": "NoteText",
            "info": "best vacation  ever",
            "id": "_wdzprlrr8"
        }
    ],
    "colors": {
        "borderColor": "rgb(0, 153, 255)",
        "backgroundColor": "#dfebfb"
    }
}, {
    "isPinned": false,
    "id": "_e2u5dopx8",
    "lines": []
}, {
    "isPinned": true,
    "id": "_9j0gfz0wb",
    "lines": [],
    "colors": {
        "borderColor": "rgb(0, 153, 255)",
        "backgroundColor": "#918fff"
    }
}, {
    "isPinned": true,
    "id": "_fhtht88my",
    "lines": [{
        "type": "NoteTodos",
        "info": {
            "label": "Sprint To-Do's",
            "todos": [{
                    "txt": "don't eat",
                    "doneAt": null,
                    "isDone": true
                },
                {
                    "txt": "don't sleep",
                    "doneAt": null,
                    "isDone": true
                },
                {
                    "txt": "don't rave",
                    "doneAt": null,
                    "isDone": true
                },
                {
                    "txt": "repeat",
                    "doneAt": null,
                    "isDone": false
                }
            ]
        }
    }],
    "colors": {
        "borderColor": "#ff8d0a",
        "backgroundColor": "rgb(246, 246, 246)"
    }
}, {
    "isPinned": true,
    "id": "_wc8bnxeso",
    "lines": [{
        "type": "NoteGif",
        "info": "https://external-preview.redd.it/ywTu2NlH_bXTJVzbidGXORR-n_dyCbiTw0kBvSLuKkM.gif?format=mp4&s=904c826e4223fcccb90a39d7c3e726b51b2a238a",
        "id": "_9hpjjzeyn"
    }],
    "colors": {
        "borderColor": "#1ae05f",
        "backgroundColor": "#bdeabf"
    }
}, {
    "isPinned": true,
    "id": "_r5sgzdi8u",
    "lines": []
}, {
    "isPinned": false,
    "id": "_3yi0fk10m",
    "lines": [{
        "type": "NoteImg",
        "info": "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
    }]
}, {
    "isPinned": true,
    "id": "_8z95spc8v",
    "lines": [{
            "type": "NoteGiff",
            "info": "https://external-preview.redd.it/2qZ27mVSpy2FXZqPrKpQmHUgBtVpCZ2lWUvfNm9wmdE.gif?format=mp4&s=0805885ea31999c62d913eab7915939bad2a0620"
        },
        {
            "type": "NoteVideo",
            "info": "https://www.youtube.com/watch?v=7sbbb7Dt3D8",
            "id": "_zr3fr1x9s"
        }
    ]
}, {
    "isPinned": false,
    "id": "_6taxy3tco",
    "lines": [{
            "type": "NoteGif",
            "info": "https://external-preview.redd.it/2qZ27mVSpy2FXZqPrKpQmHUgBtVpCZ2lWUvfNm9wmdE.gif?format=mp4&s=0805885ea31999c62d913eab7915939bad2a0620"
        },
        {
            "type": "NoteTodos",
            "info": {
                "label": "my list",
                "todos": [{
                        "txt": "todo 1",
                        "doneAt": null,
                        "isDone": true
                    },
                    {
                        "txt": "todo 2",
                        "doneAt": null,
                        "isDone": false
                    },
                    {
                        "txt": "todo3",
                        "doneAt": null,
                        "isDone": true
                    }
                ]
            }
        }
    ]
}, {
    "isPinned": false,
    "id": "_3df81i9fk",
    "lines": []
}, {
    "isPinned": false,
    "id": "_w3fboddf7",
    "lines": []
}, {
    "isPinned": false,
    "id": "_95pmi4umn",
    "lines": []
}, {
    "isPinned": false,
    "id": "_txfhaqq1f",
    "lines": []
}, {
    "isPinned": false,
    "id": "_3wvmqccav",
    "lines": [{
            "type": "NoteImg",
            "info": "./assets/img/meme.jpeg",
            "id": "_b3pwuvqd3"
        },
        {
            "type": "NoteText",
            "info": "😭😭😭עד מתי ספרינטים",
            "id": "_ux47xyqm1"
        }
    ]
}, {
    "isPinned": false,
    "id": "_f1s2wbivr",
    "lines": [{
        "type": "NoteImg",
        "info": "./assets/img/meme-2.jpeg"
    }]
}]


function query() {
    var notes = storageService.loadFromStorage(KEY)
    if (!notes || !notes.length) return Promise.resolve(gNotes)
    gNotes = notes
    return Promise.resolve(gNotes)
}

function saveChanges(id, idx, line) {
    const notesCopy = [...gNotes]
    const note = notesCopy[_getIdxById(id)]
    note.lines[idx] = line
    gNotes = notesCopy
    storageService.saveToStorage(KEY, gNotes)
}

function _getIdxById(id) {
    return gNotes.findIndex(note => note.id === id)
}

function getNoteById(id) {
    return gNotes[_getIdxById(id)]
}

function deleteLine(id, idx) {
    const notesCopy = [...gNotes]
    const note = notesCopy[_getIdxById(id)]
    note.lines.splice(idx, 1)
    gNotes = notesCopy
    storageService.saveToStorage(KEY, gNotes)
}

function deleteNote(id) {
    const notesCopy = [...gNotes]
    notesCopy.splice(_getIdxById(id), 1)
    gNotes = notesCopy
    storageService.saveToStorage(KEY, gNotes)
}

function saveNoteChange(note) {
    const notesCopy = [...gNotes]
    let idx = _getIdxById(note.id)
    notesCopy.splice(idx, 1, note)
    gNotes = notesCopy
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function addData(data, id) {
    const notesCopy = [...gNotes]
    if (id) {
        const noteIdx = _getIdxById(id)
        const note = {...notesCopy[noteIdx] }
        data.id = utils.makeId()
        note.lines = [...note.lines, data]
        notesCopy.splice(noteIdx, 1, note)
    } else notesCopy.push({
        isPinned: false,
        id: utils.makeId(),
        lines: [data]
    })
    gNotes = notesCopy
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()

}