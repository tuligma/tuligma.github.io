'use strict'

const toDos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleteFilter: false
}

renderTodos(toDos, filters)

// Filters
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(toDos, filters)
})


// Adding Todos
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    const textEl = e.target.elements.addTodo.value.trim()
    e.preventDefault()
    if (textEl.length > 0) {
        toDos.push({
            id: uuidv4(),
            text: textEl,
            completed: false
        })
        saveTodos(toDos)
        renderTodos(toDos, filters)
        e.target.elements.addTodo.value = ''
    }
})

// Show complete Button
document.querySelector('#show-completed').addEventListener('change', (e) => {
    filters.hideCompleteFilter = e.target.checked
    renderTodos(toDos, filters)
})



// Fetch existing todos from localStorage
// getSavedTodos

// Save todos to localStorage
// saveTodos

// Render application todos based on filters
// renderTodos

// Get the DOM elements for an individual note
// generateTodoDOM

// Get the DOM elements for list summary
// generateSummaryDOM