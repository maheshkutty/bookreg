const loadBooks = async () => {
    let books = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        }
    });

    books = await books.json();

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick = deleteBook("${book.isbn}")>Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

const deleteBook = async (isbn) => {
    let delBook = await fetch(`http://localhost:3000/books/${isbn}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
    delBook = await delBook.json();
    document.getElementById('books').innerHTML = "";
    loadBooks();
}


loadBooks();