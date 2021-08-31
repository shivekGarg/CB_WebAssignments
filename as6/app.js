const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const savedData = localStorage.getItem('listItems');
if (savedData) {
	list.innerHTML = savedData;
}

function saveChanges(data) {
	localStorage.setItem('listItems', data);
}

const generateTemplate = (todo) => {
	const html = `
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<div>${todo}</div>
				<i class="fas fa-arrow-up up"></i>
				<i class="fas fa-arrow-down down"></i>
				<i class="far fa-trash-alt delete"></i>
			</li>
    `;
	list.innerHTML += html;
	saveChanges(list.innerHTML);
};

addForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const todo = addForm.add.value.trim();

	if (todo.length) {
		generateTemplate(todo);
		addForm.reset();
	}
});

function swapLists(itemA, itemB) {
	if (!itemA || !itemB) {
		return;
	}
	const aTemp = document.createElement('li');
	const bTemp = document.createElement('li');
	list.replaceChild(aTemp, itemA);
	list.replaceChild(bTemp, itemB);
	list.replaceChild(itemB, aTemp);
	list.replaceChild(itemA, bTemp);
}

list.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	} else if (e.target.classList.contains('up')) {
		swapLists(
			e.target.parentElement,
			e.target.parentElement.previousElementSibling
		);
	} else if (e.target.classList.contains('down')) {
		swapLists(
			e.target.parentElement,
			e.target.parentElement.nextElementSibling
		);
	}
	saveChanges(list.innerHTML);
});

const filterTodos = (term) => {
	Array.from(list.children)
		.filter((todo) => !todo.textContent.toLowerCase().includes(term))
		.forEach((todo) => todo.classList.add('filtered'));

	Array.from(list.children)
		.filter((todo) => todo.textContent.toLowerCase().includes(term))
		.forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
	const term = search.value.trim().toLowerCase();
	filterTodos(term);
});
