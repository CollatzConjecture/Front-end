document.addEventListener("DOMContentLoaded", function () {
  const inputForm = document.getElementById("inputBook");
  inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    inputBook();
  });

  const searchBook = document.getElementById("searchSubmit");
  searchBook.addEventListener("click", function (event) {
    event.preventDefault();
    searchSelectedBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const book = [];
const RENDER_EVENT = "render-book";

function inputBook() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;

  const generateID = generateId();
  const bookObject = generateBookObject(
    generateID,
    bookTitle,
    bookAuthor,
    bookYear,
    false
  );
  book.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBook = document.getElementById("uncompletedBook");
  uncompletedBook.innerHTML = "";

  const completedBook = document.getElementById("completedBook");
  completedBook.innerHTML = "";

  for (const listBook of book) {
    const readBook = makeBook(listBook);

    if (!listBook.isCompleted) {
      uncompletedBook.append(readBook);
    } else {
      completedBook.append(readBook);
    }
  }
});

function generateBookObject(id, bookTitle, bookAuthor, bookYear, isCompleted) {
  return {
    id,
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted,
  };
}

function makeBook(toReadBook) {
  const newBookTitle = document.createElement("h3");
  newBookTitle.innerHTML = toReadBook.bookTitle;
  newBookTitle.classList.add("title");

  const newBookAuthor = document.createElement("p");
  newBookAuthor.innerHTML = toReadBook.bookAuthor;

  const newBookYear = document.createElement("p");
  newBookYear.innerHTML = toReadBook.bookYear;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");

  textContainer.append(newBookTitle, newBookAuthor, newBookYear);

  const container = document.createElement("div");
  container.classList.add("item");
  container.append(textContainer);
  container.setAttribute("id", `listBook-${toReadBook.id}`);

  if (toReadBook.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.innerHTML = "Belum selesai dibaca";

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(toReadBook.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.innerHTML = "Hapus Buku";

    deleteButton.addEventListener("click", function () {
      removeBookList(toReadBook.id);
    });

    container.append(undoButton, deleteButton);
  } else {
    const doneButton = document.createElement("button");
    doneButton.classList.add("doneBtn");
    doneButton.innerHTML = "Selesai Dibaca";

    doneButton.addEventListener("click", function () {
      addBookList(toReadBook.id);
    });

    const deleteButton2 = document.createElement("button");
    deleteButton2.classList.add("deleteBtn");
    deleteButton2.innerHTML = "Hapus Buku";

    deleteButton2.addEventListener("click", function () {
      removeBookList(toReadBook.id);
    });

    container.append(doneButton, deleteButton2);
  }

  return container;
}

function addBookList(toReadId) {
  const toDoBook = findBook(toReadId);

  if (toDoBook == null) return;

  toDoBook.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(toReadId) {
  for (const todoItem of book) {
    if (todoItem.id === toReadId) {
      return todoItem;
    }
  }
  return null;
}

function removeBookList(toReadId) {
  const toDoTarget = findTodoIndex(toReadId);

  if (toDoTarget === -1) return;

  book.splice(toDoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(toReadId) {
  const todoTarget = findBook(toReadId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findTodoIndex(toReadId) {
  for (const index in book) {
    if (book[index].id === toReadId) {
      return index;
    }
  }

  return -1;
}

const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "BOOKSHELF_APPS";

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(book);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      book.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function searchSelectedBook() { 
  const bookTitleSearched = document.getElementById("searchBookTitle").value;
  const input = bookTitleSearched.toUpperCase();
  const items = document.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {
    const title = items[i].querySelector(".title");
    if (title.textContent.toUpperCase().includes(input)) {
      items[i].classList.remove("hidden");
    } else {
      items[i].classList.add("hidden");
    }
  }
  // const resultBook = book.filter((list) => list.bookTitle == bookTitleSearched);
  // console.log(resultBook);
};