const title = document.querySelector('#title');
const author = document.querySelector('#author')
const isbn = document.querySelector('#isbn')


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI {
    static displayBooks() {
        const storeBooks = Store.getBooks();

        const books = storeBooks;
        books.forEach(book => {
            return UI.addBookListTo(book);
        });
    };
    static addBookListTo(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        list.appendChild(row);
    };
};

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    };

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books))
    }
};

document.addEventListener('DOMContentLoaded', UI.displayBooks)

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();


    const titleVal = title.value;
    const authorVal = author.value;
    const isbnVal = isbn.value;

    // Validate 
    if (titleVal === '' || authorVal === '' || isbnVal === '') {

        title.classList.add('warning');
        author.classList.add('warning');
        isbn.classList.add('warning');

        title.placeholder = 'Please fill this field !'
        author.placeholder = 'Please fill this field !'
        isbn.placeholder = 'Please fill this field !'
    }
    else {

        const book = new Book(titleVal, authorVal, isbnVal);

        UI.addBookListTo(book);

        Store.addBook(book);

        // Clearing Inputs
        title.value = '';
        author.value = '';
        isbn.value = '';

        title.classList.remove('warning');
        author.classList.remove('warning');
        isbn.classList.remove('warning');

        title.placeholder = ''
        author.placeholder = ''
        isbn.placeholder = ''

    }
})

document.querySelector('#book-list').addEventListener('click', (e) => {
    if (e.target.className === 'delete-btn') {
        e.target.parentElement.parentElement.remove();
        Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
    }
});

