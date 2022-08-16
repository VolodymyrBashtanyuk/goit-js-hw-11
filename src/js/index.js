import lightBoxPage from './simpLightBox'
import GalleriesApi from './fetchGalleries'
import Notiflix from 'notiflix';
import '../css/styles.css';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');
const textNote = document.querySelector('.note');

const galleriesApi = new GalleriesApi();

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);
window.addEventListener("scroll", throttle(checkPosition, 250));

const buttonIsHidden = () => loadButton.classList.add('ishidden');
const textIsHidden = () => textNote.classList.add('ishidden');
const buttonVisible = () => loadButton.classList.remove('ishidden');
const textVisible = () => textNote.classList.remove('ishidden');
const clearGalleries = () => galleries.innerHTML = '';
const errors = () => Notiflix.Notify.failure('error');

let isLoading = false;
let shouldLoad = true;



buttonIsHidden();
textIsHidden();


async function responseData() {
    try {
      const collectionGalleries = await galleriesApi.fetchImage();
      insertGalleries(collectionGalleries);
      notification(collectionGalleries);

    } catch (error) {
      errors(error);
    }
};

 function onSearchForm(e) {
     e.preventDefault();

      galleriesApi.nameImage = e.currentTarget.elements.searchQuery.value;
   if (notification === false) {
      return;
   } else {
     galleriesApi.resetPage();
      clearGalleries();
      responseData();
      buttonIsHidden();
     textIsHidden();
   }
};

const notification = (response) => {
  const page = Math.ceil(response.totalHits / galleriesApi.perPage);
  const pagesApi = galleriesApi.page;
  
  if (response.totalHits === 0 || galleriesApi.name === '') {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    loadButton.classList.add('ishidden');
    textNote.classList.add('ishidden');
    clearGalleries(); 
    return false;
  } else if (pagesApi === 2) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    setTimeout(() => {
      buttonVisible();
    }, 500)
  } else if (pagesApi > page) {
      buttonIsHidden();
      textVisible();
  } 
};

function insertGalleries(galleriesRespons) {
  const imagesItem = galleriesList(galleriesRespons.hits);
  galleries.insertAdjacentHTML('beforeend', imagesItem);

  if (galleriesRespons.totalHits !== 0) {
  const { height: cardHeight } = document.querySelector('.photo-card').firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  })
  };
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
</div>
`
};

function onLoadButton() {
    responseData();
    lightBoxPage.refresh();
};

// infinity scroll
function checkPosition({totalHits}) {

  const height = galleries.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.pageYOffset;
  const threshold = height - screenHeight / 3;

  const position = scrolled + screenHeight

  if (position >= threshold) {
   scrolling(totalHits);
  }
}

function scrolling(number) {
  const page = Math.ceil(number / galleriesApi.page);
   if (isLoading || !shouldLoad) {
     return;
   }
  isLoading = true
  responseData();
  lightBoxPage.refresh()
  let nextPage = galleriesApi.page;

   if (nextPage === page) {
     shouldLoad = false;
    window.removeEventListener("scroll", checkPosition);
    
   }
   isLoading = false;
}