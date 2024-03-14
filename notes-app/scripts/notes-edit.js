'use strict'

const titleElement = document.querySelector('#note-title')
const timestampElement = document.querySelector('#last-edited')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('./index.html')
}

let lastEdit = moment().fromNow()

titleElement.value = note.title
timestampElement.textContent = generateLastEdited(note.updatedAt)
bodyElement.value = note.body

// 1. Setup input event for title
// 2. Update note object and save notes list
// 3. Repeat steps 1-2 for body
// 4. Set up a remove button that remotes notes and sends user back to home page

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    timestampElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    timestampElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('./notes-app/')  
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if (!note) {
            location.assign('./index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        timestampElement.textContent = generateLastEdited(note.updatedAt)
    }
})