const search = document.querySelector('.search');
const searchIcon = document.querySelector('.icon-search');
const ul = document.querySelector('ul')
const deleteBtn = document.querySelector('.delete-btn')
const taskInput = document.querySelector('.todo-input');
const form = document.querySelector('.todo-form');
clearBtn = document.querySelector('.clear-tasks');

/** Load Todo from LocalStorage **/

/** End **/


/** Template for adding new todo **/
const template = todo => {

	const newTodo = 
		`<li class="task">
	   		<span class="task-name">${todo}</span>
			<i class="uil uil-trash-alt delete-btn"></i>
  		</li>`
  	ul.innerHTML += newTodo
}
/** End **/


load = () => {
	todoList = localStorage.getItem('tasks') == null ? todoList = [] : JSON.parse(localStorage.getItem('tasks'))

	todoList.forEach(todo => template(todo))
}


/**======== Saving Todo to LocalStorage =======**/
save = todo => {
	if (localStorage.getItem('tasks') == null) {
		todoList = []
	} else {
		todoList = JSON.parse(localStorage.getItem('tasks'))
	}
	todoList.unshift(todo)
	localStorage.setItem('tasks', JSON.stringify(todoList))
}

load()

/**======= Function for adding new todo ========**/

function addTodo(e) {
	e.preventDefault()
	if (taskInput.value) {
		const taskName = taskInput.value.toLowerCase().trim()
		// template(taskName)
		save(taskName)
		clear()
		load()
		form.reset()
	} else {
		border() 
	}
}

form.addEventListener('submit', addTodo)
/** End **/


// change the border color if no input on submit

border = () => {
	reset = () => {
		taskInput.classList.remove('border-red');	
	}
	taskInput.classList.add('border-red');
	setTimeout(reset, 2000)
}
/** End **/



/**======= Function for filtering todos ========**/
filter = (key) => {
	Array.from(ul.children)
		.filter(todo => !(todo.textContent.toLowerCase().includes(key)))
		.forEach(item => item.classList.add('filtered'));

	Array.from(ul.children)
		.filter(todo => todo.textContent.toLowerCase().includes(key))
		.forEach(item => item.classList.remove('filtered'))
}


/**======= Searching todo ========**/

search.addEventListener('keyup', () => {
	key = search.value.trim().toLowerCase()
	filter(key)
})

searchIcon.addEventListener('click', () => {
	key = search.value.trim().toLowerCase()
	filter(key)
})

/**===== Making the defaul clear btn in search input to work ======**/
function onSearch(input) {
	key = input.value.trim().toLowerCase()
	filter(key)
}
/** End **/


/**===== Delete Todo from LS ========**/
deleteFromLS = (target) => { 

	if (localStorage.getItem('tasks') == null) {
			todoList = []
		} else {
			todoList = JSON.parse(localStorage.getItem('tasks'))
	}
		todo = target.parentElement.textContent.trim();
		
		todoList.forEach(target => {
			if (target === todo) {
				targetIndex = todoList.indexOf(target)
				todoList.splice(targetIndex, 1)
			}
		})
		localStorage.setItem('tasks', JSON.stringify(todoList))
}


/**===== Clear the Todos inorder to load from LS ========**/
clear = () => {
	// ul.innerHTML = '';
	 while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}



/**===== Delete Todo from DOM ========**/

ul.addEventListener('click', item => {
	currentTask = item.target
	if (currentTask.classList.contains('delete-btn')) {
		currentTask.parentElement.remove()
		deleteFromLS(currentTask)
	}
})
/** End **/


clearBtn.addEventListener('click', () => {
	clear()
	localStorage.clear()
})


/**======== Adding Press & Hold Popup Later =======**/

let mouseTimer;

function mousedown() {
	mouseup()
	mouseTimer = setTimeout(trigger, 2000);
}

function mouseup() {

	window.clearTimeout(mouseTimer);
}

trigger = () => {
	// The PopUp Options here
}

// task.addEventListener('mousedown', mousedown)
// document.addEventListener('mouseup', mouseup)
/** End **/




