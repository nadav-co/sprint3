import { utils } from '../../../lib/utils.js'
import { storageService } from '../../../services/storage-service.js'

export const keepService = {
    query,
    saveChanges

}

const KEY = 'notes'



var gNotes = [{
        isPinned: true,
        id: utils.makeId(),
        lines: [{
                type: 'NoteText',
                info: 'my first note',
            },
            {
                type: 'NoteText',
                info: 'shahar drinking tea'
            },
            {
                type: 'NoteImg',
                info: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
            },
            {
                type: 'NoteText',
                info: 'shahar drinking tea'
            },
            {
                type: 'NoteImg',
                info: 'data:image/jpeg;base64,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'
            }

        ]
    },
    {
        isPinned: false,
        id: utils.makeId(),
        lines: [{
                type: 'NoteImg',
                info: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            },
            {
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
    if (!notes || !notes.length) notes = gNotes
    gNotes = notes
    storageService.saveToStorage(KEY, gNotes)
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