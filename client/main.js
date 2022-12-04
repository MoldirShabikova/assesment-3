const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneBtn");
const form = document.querySelector("form");
const bookContainer = document.querySelector("#books-container");

const baseUrl = "http://localhost:4000/api/books";

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment").then((res) => {
    const data = res.data;
    alert(data);
  });
};

complimentBtn.addEventListener("click", getCompliment);

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune").then((res) => {
    const data = res.data;
    alert(data);
  });
};

fortuneBtn.addEventListener("click", getFortune);

const getAllBooks = () =>
  axios
    .get(baseUrl)
    .then((res) => {
      const books = res.data;
      displayBooks(books);
    })
    .catch((err) => console.log(err));

const createBook = (body) =>
  axios
    .post(baseUrl, body)
    .then((res) => {
      const books = res.data;
      displayBooks(books);
    })
    .catch((err) => console.log(err));

const deleteBook = (id) =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then((res) => {
      const books = res.data;
      displayBooks(books);
    })
    .catch((err) => console.log(err));

const updateBook = (id, type) =>
  axios
    .put(`${baseUrl}/${id}`, { type })
    .then((res) => {
      const books = res.data;
      displayBooks(books);
    })
    .catch((err) => console.log(err));

function handleSubmit(e) {
  e.preventDefault();

  let bookTitle = document.querySelector("#title");
  let bookAuthor = document.querySelector("#author");
  let bookCoverImg = document.querySelector("#img");
  let bookQuote = document.querySelector("#quote");

  let newBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
    bookCoverImg: bookCoverImg.value,
    bookQuote: bookQuote.value,
  };
  createBook(newBook);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookCoverImg.value = "";
  bookQuote.value = "";
}


function createCard(item) {
    let { title, author, bookCoverImg, bookQuote,id } = item;
    const el = `
      <section class='card'>
          <img src="${bookCoverImg}" alt='${title}'/>
          <h4>${title}</h4>
          <p><b>Author:</b> ${author}</p>
          <div class='btn-wrapper'>
       
          </div>
          <div class='btn-wrapper'>
              <h5><b>Best Quote: </b>${bookQuote}</h5>
              <button class='delete-btn' onclick="deleteBook('${id}')">remove</button>
          </div>
      </section>`;
    bookContainer.innerHTML += el;
  }


function displayBooks(arr) {
  bookContainer.innerHTML = "";
  arr.map((book) => createCard(book));
}

form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", getAllBooks);
