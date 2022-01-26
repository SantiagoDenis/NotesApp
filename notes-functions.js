'use strict'

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {

        if (notesJSON !== null) {
            return JSON.parse(notesJSON)
        } else {
            return[]
        }
    } catch (e) {
        return []
    }


}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex( function( note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}


const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a')
    const textElement = document.createElement('p')
    const status = document.createElement('p')

    noteElement.classList.add('list-item')

    textElement.classList.add('list-item__title')

    status.classList.add('list-item__subtitle')

    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        textElement.textContent = 'unnamed note'

    }
    noteElement.appendChild(textElement)

    noteElement.setAttribute('href', `./edit.html#${note.Id}`)

    status.textContent = generateLastEdited(note.updatedAt)
    noteElement.appendChild(status)

    return noteElement
}

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort( (a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }

}

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    
    const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    const notesEl = document.querySelector('#notes')
    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach( (note) => {
            const noteElement = generateNoteDOM(note)
            
            notesEl.appendChild(noteElement)
        })
    }else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }


}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
