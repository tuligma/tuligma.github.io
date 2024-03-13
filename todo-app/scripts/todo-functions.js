'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('toDos')
    
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (toDos) => {
    localStorage.setItem('toDos', JSON.stringify(toDos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch =  todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleteFilter || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const leftTodo = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''

    todoEl.appendChild(generateSummaryDOM(leftTodo))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => todoEl.appendChild(generateTodoDOM(todo)))
    } else {
        const noTodo = document.createElement('p')
        noTodo.classList.add('empty-message')
        noTodo.textContent = 'No to-dos to show'
        todoEl.appendChild(noTodo)
    }
}

// Remove todo by id
const removeTodo = (id) => {
    const removeIndex = toDos.findIndex((todo) => todo.id === id)

    if (removeIndex > -1) {
        return toDos.splice(removeIndex, 1)
    }
}

const toggleTodo = function (id) {
    const todo = toDos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}


// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // Set checkbox with attribute
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos(toDos)
        renderTodos(toDos, filters)
    })


    // Set todo title text
    textEl.textContent = todo.text
    containerEl.appendChild(textEl)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Set remove todo button 
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(toDos)
        renderTodos(toDos, filters)
    })


    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (leftTodo) => {
    const toDosSummary = document.createElement('h2')
    toDosSummary.classList.add('list-title')
    const plural = leftTodo.length <= 1 ? '' : 's' 
    toDosSummary.textContent = `You have ${leftTodo.length} todo${plural} left!`
    return toDosSummary
}