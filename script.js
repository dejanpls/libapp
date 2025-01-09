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
let currentEditBook = null;

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

addBook("1984", "George Orwell", 350, false);
addBook("Animal Farm", "George Orwell", 90, true);
addBook("The Godfather", "Mario Puzo", 400, false);
addBook("Gone with the Wind", "Margaret Mitchell", 900, true);
console.log(library);

function addBook(title, author, pages, read) {
	const book = new Book(title, author, pages, read);

	id += 1;
	appendListItem(book);
}

function appendListItem(book) {
	const listItem = document.createElement("li");
	listItem.id = `book-${book.id}`;
	const listText = document.createElement("span");
	const listBtn = document.createElement("button");
	const editBtn = document.createElement("button");

	listItem.appendChild(listText);
	listText.textContent = book.info();
	listText.classList = "info";
	
	listItem.appendChild(editBtn);
	editBtn.textContent = "Edit";
	editBtn.classList = "btn edit";

	listItem.appendChild(listBtn);
	listBtn.textContent = "Delete";
	listBtn.classList = "btn delete";

	list.appendChild(listItem);
	library.push(book);

	listBtn.addEventListener("click", () => {
		// Remove list item from the DOM
		list.removeChild(listItem);
	
		// Remove the book from the library array
		const index = library.findIndex((b) => b.id === book.id);
		if (index > -1) {
			library.splice(index, 1); // Remove the book from the array
		}
	
		console.log(library); // Check the updated library
	});
	

	editBtn.addEventListener('click', () => {
		currentEditBook = book;
		fillModal(book);
		popup.showModal();
	});
}

function clearModal() {
	bookTitle.value = "";
	bookAuthor.value = "";
	bookPages.value = null;
	bookRead.checked = false;
}

function fillModal(book) {
	bookTitle.value = book.title;
	bookAuthor.value = book.author;
	bookPages.value = book.pages;
	bookRead.checked = book.read;
}

// "Show the dialog" button opens the dialog modally
addBtn.addEventListener("click", () => {
	popup.showModal();
	clearModal();
});

// "Close" button closes the dialog
cancelBtn.addEventListener("click", () => {
	popup.close();
});

confirmBtn.addEventListener("click", () => {
    if (currentEditBook) {
        // Update existing book
        currentEditBook.title = bookTitle.value;
        currentEditBook.author = bookAuthor.value;
        currentEditBook.pages = parseInt(bookPages.value);
        currentEditBook.read = bookRead.checked;

        // Update DOM
        const listItem = document.querySelector(`#book-${currentEditBook.id}`);
        listItem.querySelector(".info").textContent = currentEditBook.info();

        currentEditBook = null; // Clear the editing reference
    } else {
        // Add new book
        addBook(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), bookRead.checked);
    }
    popup.close();

	console.log(library);
});