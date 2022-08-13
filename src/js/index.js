import lightBoxPage from './simpLightBox'
import GalleriesApi from './fetchGalleries'
import Notiflix from 'notiflix';
import '../css/styles.css';

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more')
loadButton.classList.add('ishidden');

const galleriesApi = new GalleriesApi();

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);

// let total = 0;
// console.log(total)
async function responseData() {
    try {
      const hits = await galleriesApi.fetchImage();
      // total = 500;
        insertGalleries(hits);
    } catch (error) {
        console.log(error);
    }
};

 function onSearchForm(e) {
    e.preventDefault();

    galleriesApi.nameImage = e.currentTarget.elements.searchQuery.value;
    if (galleriesApi.nameImage === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
   }
    galleriesApi.resetPage();
     clearGalleries(); 
     responseData();
     loadButton.classList.remove('ishidden');     

};

function insertGalleries(list) {
    const imagesItem = galleriesList(list);
    galleries.insertAdjacentHTML('beforeend', imagesItem);
    lightBoxPage.createLightBox();
}

const galleriesList = (list) => list.reduce((acc, items) => acc + imagesMarkup(items), '');

function imagesMarkup(data) {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = data;
    return `
<div class='photo-card'>
  <a href='${largeImageURL}'>
  <img src='${webformatURL}' alt='${tags}' loading='lazy' width='300' height='200' />
  </a> 
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>${likes}
    </p>
    <p class='info-item'>
      <b>Views</b>${views}
    </p>
    <p class='info-item'>
      <b>Comments</b>${comments}
    </p>
    <p class='info-item'>
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`
};

function onLoadButton() {
    responseData();
    lightBoxPage.refresh();
};

// function totalPages(total) {
//     Notiflix.Notify.success(`Hooray! We found ${total} images.`);
// }

const clearGalleries = () => galleries.innerHTML = '';

// const { height: cardHeight } = galleries.firstElementChild.getBoundingClientRect();
// console.log(height)
//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth'
//   });



{/* <div class="container">
  <article class="post">...</article>
  <article class="post">...</article>
  <article class="post">...</article>
  ...
</div> */}