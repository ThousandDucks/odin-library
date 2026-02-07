let myLibrary = [];

function Book(title, author, pages, readStatus) {
  // the constructor...
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function () {
  this.readStatus = !this.readStatus;
};

function addBookToLibrary(title, author, pages, readStatus) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function displayBooks() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    const removeBttn = document.createElement("button");
    const info = document.createElement("p");
    
    const readCheckbox = document.createElement("input");
    const readLabel = document.createElement("label");

    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.readStatus;

    readLabel.textContent = "Read";
    readLabel.prepend(readCheckbox);

    readCheckbox.addEventListener("change", () => {
      book.toggleRead();   
    });

    card.classList.add("book-list");
    card.dataset.id = book.id;

    info.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
    removeBttn.textContent = "Remove";

    removeBttn.addEventListener("click", () => {
      myLibrary = myLibrary.filter(b => b.id !== book.id);
      displayBooks();
    });

    card.append(info, readLabel,removeBttn);
    container.appendChild(card);
  });
}

const newBookBtn = document.querySelector("#new-book-btn");
const bookForm = document.querySelector("#book-form");

newBookBtn.addEventListener("click", () => {
  if (bookForm.style.display === "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
  }
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = Number(document.querySelector("#pages").value);
  const readStatus = document.querySelector("#readStatus").checked;

  addBookToLibrary(title, author, pages, readStatus);

  displayBooks();

  bookForm.reset();

  bookForm.style.display = "none";
});

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
console.log(myLibrary);

displayBooks();
