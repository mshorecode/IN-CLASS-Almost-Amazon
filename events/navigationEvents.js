import { booksOnSale, getBooks, searchBooks } from '../api/bookData';
import { signOut } from '../utils/auth';
import { emptyBooks, showBooks } from '../pages/books';
import { favoriteAuthors, getAuthors } from '../api/authorData';
import { emptyAuthors, showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then((array) => {
      if (array.length) {
        showBooks(array);
      } else {
        emptyBooks();
      }
    });
  });

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then((array) => {
      if (array.length) {
        showAuthors(array);
      } else {
        emptyAuthors();
      }
    });
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    favoriteAuthors().then(showAuthors);
  });

  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();

    if (e.keyCode === 13) {
      searchBooks(searchValue, user.uid)
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
