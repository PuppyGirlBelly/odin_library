const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
      const isRead = this.read ? "have read" : "not read yet";
      return [this.title, this.author, this.pages, isRead];
    };
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function createButton(index) {
  const button = document.createElement("button");
  button.id = index;
  button.classList.add("btn");
  button.textContent = "❎";
  button.type = "button";

  button.addEventListener("mouseup", (event) => {
    removeBookFromLibrary(event.target.id);
    // eslint-disable-next-line no-use-before-define
    displayLibraryBooks();
  });

  return button;
}

function displayLibraryBooks() {
  const table = document.getElementById("myLibraryTable");
  table.textContent = "";

  myLibrary.forEach((book, index) => {
    const row = table.insertRow();
    let cell = row.insertCell();
    const button = createButton(index);
    cell.appendChild(button);

    book.info().forEach((info) => {
      cell = row.insertCell();
      cell.innerText = info;
    });
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("All Dogs Have ADHD", "Kathy Hoopman", 72, true);
addBookToLibrary(
  "The Principles of Object-Oriented JavaScript",
  "Nicholas C. Zakas",
  120,
  true
);

displayLibraryBooks();
