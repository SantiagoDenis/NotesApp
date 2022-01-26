'use strict'

const updateSpan = document.querySelector('#last-update')

const noteId = location.hash.substring(1)

const notes = getSavedNotes()

const note = notes.find( function(note) {
    return note.Id === noteId
})

if (note === undefined) {
    location.assign('index.html')
}

const noteTitle = document.querySelector('#note-title')
noteTitle.value = note.title
const noteBody = document.querySelector('#note-body')
noteBody.value = note.body
updateSpan.textContent = generateLastEdited(note.updatedAt)
noteTitle.addEventListener('input', function(e) {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    updateSpan.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})
noteBody.addEventListener('input', function(e) {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    updateSpan.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', function() {
    
    getSavedNotes()

    notes.forEach( function(note, index) {
        if (note.Id === noteId) {
            notes.splice(index, 1)
            saveNotes(notes)
        }
    } )
    location.assign('index.html')


})

window.addEventListener('storage', function(e) {

    if (e.key === 'notes') {
        JSON.parse(e.newValue)
    }
})