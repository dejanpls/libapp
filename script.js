const addBtn = document.querySelector("#add");

const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const popup = document.querySelector("dialog");

let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookPages = document.querySelector("#bookPages");
let bookRead = document.querySelector("#bookRead");

const list = document.querySelector("#books");

const library = [];
let id = 1;

function Book(title, author, pages, read) {
	this.id = id; // incremented upon every book addition
	
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function () {
	let read = this.read ? "Read: Yes" : "Read: No";
	return this.title + " by " + this.author + ". Pages: " + this.pages + ". " + read;
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBook() {
	let title = bookTitle.value;
	let author = bookAuthor.value;
	let pages = parseInt(bookPages.value);
	let read = bookRead.checked;

	let book = new Book(title, author, pages, read);

	appendListItem(book);
	id += 1;
}

function appendListItem(book) {
	const listItem = document.createElement("li");
	const listText = document.createElement("span");
	const listBtn = document.createElement("button");

	listText.textContent = book.info();
	listItem.appendChild(listText);

	listItem.appendChild(listBtn);
	listBtn.textContent = "Delete";
	listBtn.classList = "btn delete";

	list.appendChild(listItem);
	library.push(book);
	console.log(library);

	listBtn.addEventListener('click', () => {
		list.removeChild(listItem);
		library.pop(book.id);
		console.log(library);
	});
}

// "Show the dialog" button opens the dialog modally
addBtn.addEventListener("click", () => {
	popup.showModal();
});

// "Close" button closes the dialog
cancelBtn.addEventListener("click", () => {
	popup.close();
});

confirmBtn.addEventListener('click', () => {
	addBook();
});