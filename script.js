const library = [];

function Book(title, author, pages) {
	this.title = title;
	this.author = author;
	this.pages = pages;
}

function addBook() {
	let title = prompt("Enter book title: ");
	let author = prompt("Enter book author: ");
	let pages = prompt("Enter number of pages: ");

	let book = new Book(title, author, pages);
	library.push(book);
}


const addBtn = document.querySelector("#add");