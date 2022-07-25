const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
      return [this.title, this.author, this.pages, this.read];
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

function createDeleteButton(index) {
  const button = document.createElement('button');
  button.id = index;
  button.classList.add('btn');
  button.textContent = '❎';
  button.type = 'button';

  button.addEventListener('mouseup', (event) => {
    removeBookFromLibrary(event.target.id);
    // eslint-disable-next-line no-use-before-define
    displayLibraryBooks();
  });

  return button;
}

function createDeleteButton(index) {
  const button = document.createElement('button');
  button.id = index;
  button.classList.add('btn');
  button.textContent = '❎';
  button.type = 'button';

  button.addEventListener('mouseup', (event) => {
    removeBookFromLibrary(event.target.id);
    // eslint-disable-next-line no-use-before-define
    displayLibraryBooks();
  });

  return button;
}

function displayLibraryBooks() {
  const table = document.getElementById('myLibraryTable');
  table.textContent = '';

  myLibrary.forEach((book, index) => {
    const row = table.insertRow();
    let cell = row.insertCell();
    const button = createDeleteButton(index);
    cell.appendChild(button);

    book.info().forEach((info) => {
      cell = row.insertCell();
      cell.innerText = info;
    });
  });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('All Dogs Have ADHD', 'Kathy Hoopman', 72, true);
addBookToLibrary(
  'The Principles of Object-Oriented JavaScript',
  'Nicholas C. Zakas',
  120,
  true
);

displayLibraryBooks();

function getFormInfo() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').value;

  return [title, author, pages, read];
}

const addBook = document.getElementById('add-book');
addBook.addEventListener('mouseup', () => {
  const form = document.querySelector('form');
  const bookInfo = getFormInfo();
  addBookToLibrary(...bookInfo);
  form.reset();
  displayLibraryBooks();
});
