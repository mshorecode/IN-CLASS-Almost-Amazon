import { booksOnSale, getBooks, searchBooks } from '../api/bookData';
import { signOut } from '../utils/auth';
import { emptyBooks, showBooks } from '../pages/books';
import { favoriteAuthors, getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale().then(showBooks);
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks().then(showBooks);
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors().then(showAuthors);
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    favoriteAuthors().then(showAuthors);
  });

  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    if (e.keyCode === 13) {
      searchBooks(searchValue)
        .then((search) => {
          if (search.length) {
            showBooks(search);
          } else {
            emptyBooks();
          }
        });

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
