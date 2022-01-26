'use strict'

let notes = getSavedNotes()


const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#create-note').addEventListener('click', function(e) {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        createdAt: timestamp,
        Id: id,
        title: '',
        body: '',
        updatedAt: timestamp,
    })
    saveNotes(notes)

    location.assign(`./edit.html#${id}`)

})      

document.querySelector('#filter-by').addEventListener('change', function(e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})


window.addEventListener('storage', function(e) {
    if (e.key = 'notes') {
        notes = JSON.parse(e.newValue)
        
        note = notes.find( function(note) {
            return note.Id === noteId
        })
        
        if (note === undefined) {
            location.assign('index.html')
        }
        noteTitle.value = note.title
        noteBody.value = note.body
        updateSpan.textContent = generateLastEdited(note.updatedAt)
    }
})

window.addEventListener('storage', function(e) {

    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)

        renderNotes(notes, filters)
    }
})

