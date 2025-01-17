const addBtn = document.querySelector("#add");

const themeMode = document.getElementById("theme");
const search = document.getElementById("search");
const searchPopup = document.getElementById("searchLibrary");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("bookSearch");

const searchInfo = document.getElementById("searchInfo");
let matches = 0; // search result matches

const popup = document.querySelector("#bookDialog");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const deletePopup = document.querySelector("#confirmDelete");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");

const libraryEmptySection = document.querySelector("#emptyLibrarySection");

cancelBtn.classList = "btn";
confirmBtn.classList = "btn confirm";
cancelDeleteBtn.classList = "btn";
confirmDeleteBtn.classList = "btn confirm";

let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookPages = document.querySelector("#bookPages");
let bookRead = document.querySelector("#bookRead");

const card = document.querySelector("#books");

const wrapper = document.querySelector("div.wrapper");
const menuContainer = document.querySelector("div.menu-container");
const footerContainer = document.querySelector("div.footer");
const emptyLibraryContainer = document.querySelector("#emptyLibrarySection");

const WHITE = "rgb(255, 255, 255)";
const DARKGREEN = "rgb(19, 41, 61)";
const LIGHTBLUE	= "rgb(89, 149, 218)";
const DARKBLUE = "rgb(1, 42, 74)";

const library = [];

let id = 1;
let currentEditBook = null;
let deleteCurrentBook = false;

function Book(title, author, pages, read) {
	this.id = id; // incremented upon every book addition

	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.isRead = function () {
	return this.read ? '<span class="material-icons">done_all</span>' : '<span class="material-icons">remove_done</span>';
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

Book.prototype.getTitle = function () {
	return this.title;
};

Book.prototype.getAuthor = function () {
	return `By ${this.author}`;
};

Book.prototype.getPages = function () {
	return `${this.pages} pages`;
}

function addBook(title, author, pages, read) {
	const book = new Book(title, author, pages, read);

	id += 1;
	appendListItem(book);
}

function appendListItem(book) {
	const cardItem = document.createElement("div");
	cardItem.id = `book-${book.id}`;
	cardItem.classList = "card";

	const titleText = document.createElement("h2");
	const authorText = document.createElement("h3");
	const pagesText = document.createElement("p");

	const updateBtn = document.createElement("button");

	const btnContainer = document.createElement("div");
	btnContainer.classList = "btn-container";

	const deleteBtn = document.createElement("button");
	const readBtn = document.createElement("button");
	readBtn.classList = "btn button";

	cardItem.appendChild(titleText);
	titleText.textContent = book.getTitle();
	titleText.classList = "info title";

	cardItem.appendChild(authorText);
	authorText.textContent = book.getAuthor();
	authorText.classList = "info author";

	cardItem.appendChild(pagesText);
	pagesText.textContent = book.getPages();
	pagesText.classList = "info pages";

	cardItem.appendChild(updateBtn);
	// updateBtn.textContent = "Edit";
	updateBtn.innerHTML = '<span class="material-icons">more_vert</span>';
	updateBtn.classList = "btn edit";

	btnContainer.appendChild(readBtn);
	readBtn.innerHTML = book.isRead();
	readBtn.classList = "btn read";

	btnContainer.appendChild(deleteBtn);
	// deleteBtn.textContent = "Delete";
	deleteBtn.textContent = "Delete";
	deleteBtn.classList = "btn delete";

	cardItem.appendChild(btnContainer);

	card.appendChild(cardItem);
	library.push(book);

	deleteBtn.addEventListener("click", () => {
		deleteCurrentBook = book;
		deletePopup.showModal();
	});

	updateBtn.addEventListener('click', () => {
		currentEditBook = book;
		fillModal(book);
		popup.showModal();
	});

	readBtn.addEventListener('click', () => {
		book.toggleRead();
		updateBookList(book);
	});

	if (library.length === 1) {
		libraryEmptySection.classList = "hidden";
	}
}

// For debugging
addBook("1984", "George Orwell", 350, false);
addBook("To Kill a Mockingbird", "Harper Lee", 281, true);
addBook("Pride and Prejudice", "Jane Austen", 279, false);
addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBook("Moby-Dick", "Herman Melville", 635, false);
addBook("War and Peace", "Leo Tolstoy", 1225, false);
addBook("The Catcher in the Rye", "J.D. Salinger", 214, true);
addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
addBook("Fahrenheit 451", "Ray Bradbury", 249, true);
addBook("Brave New World", "Aldous Huxley", 268, false);
addBook("Crime and Punishment", "Fyodor Dostoevsky", 671, true);
addBook("The Grapes of Wrath", "John Steinbeck", 464, false);
addBook("Ulysses", "James Joyce", 730, false);
addBook("The Brothers Karamazov", "Fyodor Dostoevsky", 824, true);
addBook("Animal Farm", "George Orwell", 112, true);
addBook("Jane Eyre", "Charlotte Brontë", 500, false);

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

function updateBookList(book) {
	const listItem = document.querySelector(`#book-${book.id}`);
	listItem.querySelector(".title").textContent = book.getTitle();
	listItem.querySelector(".author").textContent = book.getAuthor();
	listItem.querySelector(".pages").textContent = book.getPages();

	listItem.querySelector(".read").innerHTML = book.isRead(); // update toggle button
}

// "Show the dialog" button opens the dialog modally
addBtn.addEventListener("click", () => {
	popup.showModal();
	clearModal();
});

// "Close" button closes the dialog
cancelBtn.addEventListener("click", () => {
	popup.close();
	currentEditBook = null;
});

cancelDeleteBtn.addEventListener('click', () => {
	deletePopup.close();
	deleteCurrentBook = null;
});

confirmDeleteBtn.addEventListener('click', () => {
	if (deleteCurrentBook) {
		const cardItem = document.querySelector(`#book-${deleteCurrentBook.id}`);
		card.removeChild(cardItem);

		const index = library.findIndex((b) => b.id === deleteCurrentBook.id);
		if (index > -1) {
			library.splice(index, 1); // Remove the book from the array
		}
	}
	deleteCurrentBook = null; // Clear the delete reference
	deletePopup.close();

	if (library.length === 0) {
		libraryEmptySection.classList = "display";
	}

	console.log(library);
});

confirmBtn.addEventListener("click", () => {
	const form = document.querySelector('form');

	if (form.checkValidity()) {
		if (currentEditBook) {
			// Update existing book
			currentEditBook.title = bookTitle.value;
			currentEditBook.author = bookAuthor.value;
			currentEditBook.pages = parseInt(bookPages.value);
			currentEditBook.read = bookRead.checked;

			// Update DOM
			updateBookList(currentEditBook);

			currentEditBook = null; // Clear the editing reference
		} else {
			// Add new book
			addBook(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), bookRead.checked);
		}
		popup.close();
		console.log(library);
	} else {
		form.reportValidity();
	}
});

themeMode.addEventListener('click', () => {
	wrapper.style.backgroundColor = getComputedStyle(wrapper).backgroundColor === WHITE ? DARKGREEN : WHITE;
	menuContainer.style.backgroundColor = getComputedStyle(menuContainer).backgroundColor === DARKBLUE ? LIGHTBLUE : DARKBLUE;
	footerContainer.style.backgroundColor = getComputedStyle(footerContainer).backgroundColor === DARKBLUE ? LIGHTBLUE : DARKBLUE;
	emptyLibraryContainer.style.color = getComputedStyle(emptyLibraryContainer).color === WHITE ? "rgb(1, 79, 134)" : WHITE;
	themeMode.textContent = themeMode.textContent === 'dark_mode' ? 'light_mode' : 'dark_mode';
	searchPopup.style.backgroundColor = getComputedStyle(searchPopup).backgroundColor === LIGHTBLUE ? DARKBLUE : LIGHTBLUE;
});

search.addEventListener('click', () => {
	searchPopup.style.visibility = searchPopup.style.visibility === "visible" ? "hidden" : "visible";
	search.textContent = search.textContent === 'close' ? 'search' : 'close';
	searchInfo.style.display = "none";
	searchInput.focus();
	
	if (search.textContent === 'close') searchInput.value = '';

	const items = card.querySelectorAll("div.card");
	Array.from(items).forEach((item) => item.style.display = "flex"); // show all books again

});

searchBtn.addEventListener('click', () => {

	const items = card.querySelectorAll("div.card");
	const keywords = searchInput.value.split(/\s+/); // split by spaces

	if (searchInput.value !== '' && library.length > 0) {		
		
		Array.from(items).forEach((item) => {
			const itemName = item.firstChild.textContent;
			
			if (keywords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(itemName))) {
				item.style.display = "flex";
				matches += 1;
			} else {
				item.style.display = "none";
			}
		});
		matches < 1 ? searchInfo.style.display = "flex" : searchInfo.style.display = "none";
		matches = 0;
	}
});