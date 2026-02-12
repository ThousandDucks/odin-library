class Book {
  constructor(title, author, pages, readStatus) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  toggleRead() {
    this.readStatus = !this.readStatus;
  }
}

class Library {
  #books = [];

  constructor() {
    this.newBookBtn = document.querySelector("#new-book-btn");
    this.bookForm = document.querySelector("#book-form");

    this.newBookBtn.addEventListener("click", () => this.toggleForm());
    this.bookForm.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  addBook(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    this.#books.push(newBook);
  }

  toggleForm() {
    this.bookForm.style.display = this.bookForm.style.display === "none" ? "block" : "none";
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);
    const readStatus = document.querySelector("#readStatus").checked;

    this.addBook(title, author, pages, readStatus);
    this.displayBooks();

    this.bookForm.reset();
    this.bookForm.style.display = "none";
  }

  displayBooks() {
    const container = document.querySelector("#library");
    container.innerHTML = "";

    this.#books.forEach(book => {
      const card = document.createElement("div");
      const removeBttn = document.createElement("button");
      const info = document.createElement("p");

      const readCheckbox = document.createElement("input");
      const readLabel = document.createElement("label");

      readCheckbox.type = "checkbox";
      readCheckbox.checked = book.readStatus;

      readLabel.textContent = "Read";
      readLabel.prepend(readCheckbox);

      readCheckbox.addEventListener("change", () => book.toggleRead());

      card.classList.add("book-list");
      card.dataset.id = book.id;

      info.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
      removeBttn.textContent = "Remove";

      removeBttn.addEventListener("click", () => {
        this.#books = this.#books.filter(b => b.id !== book.id);
        this.displayBooks();
      });

      card.append(info, readLabel, removeBttn);
      container.appendChild(card);
    });
  }

  addDefaultBooks() {
    this.addBook("1984", "George Orwell", 328, true);
    this.addBook("The Hobbit", "J.R.R. Tolkien", 310, false);
    this.displayBooks();
  }
}

const myLibrary = new Library();
myLibrary.addDefaultBooks();