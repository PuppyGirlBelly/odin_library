class Library {
  constructor() {
    this.books = [];
    this.table = document.getElementById('myLibraryTable');
  }

  add(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
  }

  remove(index) {
    this.books.splice(index, 1);
  }

  display() {
    this.table.textContent = '';

    this.books.forEach((book, index) => {
      const row = this.table.insertRow();
      let cell = row.insertCell();
      let button = book.createDeleteButton(index);
      cell.appendChild(button);

      book.info().forEach((info) => {
        cell = row.insertCell();
        cell.innerText = info;
      });

      cell = row.insertCell();
      button = book.createReadButton(index);
      cell.appendChild(button);
    });
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return [this.title, this.author, this.pages];
  }

  toggleRead() {
    this.read = this.read ? false : true;
  }

  createReadButton() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = this.read ? '✅' : '❎';
    button.type = 'button';

    button.addEventListener('mouseup', () => {
      this.toggleRead();
      lib.display();
    });

    return button;
  }

  createDeleteButton() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = '❌';
    button.type = 'button';

    button.addEventListener('mouseup', () => {
      const i = lib.books.findIndex((book) => this === book);
      lib.remove(i);
      lib.display();
    });

    return button;
  }
}

function getFormInfo() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  return [title, author, pages, read];
}

const addBook = document.getElementById('add-book');
const form = document.querySelector('form');
addBook.addEventListener('mouseup', () => {
  const bookInfo = getFormInfo();
  lib.add(...bookInfo);
  form.reset();
  lib.display();
});
form.addEventListener('submit', () => {
  const bookInfo = getFormInfo();
  lib.add(...bookInfo);
  form.reset();
  lib.display();
});

let lib = new Library();

lib.add('The Hobbit', 'J.R.R. Tolkien', 295, false);
lib.add('All Dogs Have ADHD', 'Kathy Hoopman', 72, true);
lib.add(
  'The Principles of Object-Oriented JavaScript',
  'Nicholas C. Zakas',
  120,
  true
);

lib.display();
