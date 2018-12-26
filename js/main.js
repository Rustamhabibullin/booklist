class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBook() {
        const StoredBooks = [
            {
                title: 'Book one',
                author: 'Jhon',
                isbn: '12313'
            },
            {
                title: 'Book two',
                author: 'Sam',
                isbn: '2212'
            }
        ];

        StoredBooks.map(book => {UI.addBook(book)});
    }

    static addBook(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentNode.parentNode.remove();
            UI.addAlert('Book deleted', 'danger');
        }
    }

    static addAlert(message, className) {
        const div = document.createElement('div');
        div.classList = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(()=> {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    UI.displayBook();
});

document.querySelector('#book-form').addEventListener('submit', (e)=> {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const book = new Book(title, author, isbn);
    if(title === '' || author === '' || isbn === '') {
        UI.addAlert('Please fill in all fields', 'danger');
    } else {
        UI.addBook(book);
        UI.addAlert('Book added', 'success');
    }
});

document.querySelector('#book-list').addEventListener('click', (e)=> {
    const target = e.target;
    UI.deleteBook(target);
});
