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
  let bookRating = document.querySelector("#rating");

  let newBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
    bookCoverImg: bookCoverImg.value,
    bookQuote: bookQuote.value,
    rating:bookRating.value
  };
  createBook(newBook);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookCoverImg.value = "";
  bookQuote.value = "";
  bookRating.value =""
}


function createCard(item) {
    let { title, author, bookCoverImg, bookQuote,id, rating } = item;
    const el = `
      <section class='card'>
          <img src="${bookCoverImg}" alt='${title} class="book-cover-image"/>
          <h4>${title}</h4>
          <p><b>Author:</b> ${author}</p>
         
          <div class='btns-container'>
          <button class='btns-container' onclick="updateBook('${id}', 'minus')">-</button>
          <h1 ><b>Rating: </b>${rating}</h1>
          <button class='btns-container' onclick="updateBook('${id}', 'plus')">+</button>
      </div> 
      <h3 class="quote"><b>Best Quote: </b>${bookQuote}</h3>

     
          <button class='delete-btn' onclick="deleteBook('${id}')">remove</button>

      </section>`;
    bookContainer.innerHTML += el;
  }


function displayBooks(arr) {
  bookContainer.innerHTML = "";
  arr.map((book) => createCard(book));
}

form.addEventListener("submit", handleSubmit);

window.addEventListener("DOMContentLoaded", getAllBooks);
