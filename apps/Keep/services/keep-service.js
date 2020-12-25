import { utils } from '../../../lib/utils.js'
import { storageService } from '../../../services/storage-service.js'

export const keepService = {
    query,
    saveChanges,
    deleteLine,
    deleteNote,
    addData,
    saveNoteChange
}

const KEY = 'notes'



var gNotes = [
    {
        isPinned: true,
        id: utils.makeId(),
        lines: [{
                id: utils.makeId(),
                type: 'NoteText',
                info: 'my first note',
            },
            {
                id: utils.makeId(),
                type: 'NoteText',
                info: 'shahar drinking tea'
            },
            {
                id: utils.makeId(),
                type: 'NoteImg',
                info: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
            },
            {
                id: utils.makeId(),
                type: 'NoteText',
                info: 'shahar drinking tea'
            },
            {
                id: utils.makeId(),
                type: 'NoteImg',
                info: 'https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini.jpg'
            }

        ]
    },

    {
        isPinned: false,
        id: utils.makeId(),
        lines: [{
                id: utils.makeId(),
                type: 'NoteImg',
                info: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            },
            {
                id: utils.makeId(),
                type: 'NoteTodos',
                info: {
                    label: 'How was it:',
                    todos: [
                        { txt: 'Do that', doneAt: null },
                        { txt: 'Do this', doneAt: 187111111 }
                    ]
                }
            }
        ]

    }, {
        isPinned: false,
        id: utils.makeId(),
        lines: [{
            id: utils.makeId(),
            type: 'NoteTodos',
            info: {
                label: 'second todo:',
                todos: [
                    { txt: 'Do that2', doneAt: null },
                    { txt: 'Do this2', doneAt: 187111111 }
                ]
            }
        }]

    }
]

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