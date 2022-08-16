import {refresh, createLightBox } from './simpLightBox'
import { fetchImage, perPage } from './fetchGalleries'
import Notiflix from 'notiflix';
import '../css/styles.css';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);
window.addEventListener("scroll", throttle(checkPosition, 250));

const buttonIsHidden = () => loadButton.classList.add('ishidden');
const buttonVisible = () => loadButton.classList.remove('ishidden');

const clearGalleries = () => galleries.innerHTML = '';
const errors = () => Notiflix.Notify.failure('error');


const increment = () => page += 1;
const resetPage = () => page = 1;

let name = '';
let page = 1;

let isLoading = false;
let shouldLoad = true;

buttonIsHidden();

const notification = (response) => {
  const totalPage = Math.ceil(response.totalHits / perPage);
  if (response.totalHits === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    buttonIsHidden();
    clearGalleries();
  } else if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    setTimeout(() => {
      buttonVisible();
    }, 500)
  }else if (page > totalPage){
      buttonIsHidden();
  } 
};

 function onSearchForm(e) {
    e.preventDefault()
   name = e.currentTarget.elements.searchQuery.value;
      buttonIsHidden();  
      resetPage();
      clearGalleries();
      responseData();
      
};

async function responseData() {
    try {
      const collectionGalleries = await fetchImage(name, page);
      notification(collectionGalleries);
      increment(); 
      insertGalleries(collectionGalleries);
      checkPosition();
    } catch (error) {
      errors(error);
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
  createLightBox();
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
  refresh();
};

// // infinity scroll
function checkPosition() {
  // console.log(totalHits)
  const height = galleries.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.pageYOffset;
  const threshold = height - screenHeight / 4;

  const position = scrolled + screenHeight

  if (position >= threshold) {
    scrolling();
// console.log(totalHits)
    
  }
}

function scrolling() {
  // console.log(number)
  // const pageTotal = Math.ceil(number / perPage);
   if (isLoading || !shouldLoad) {
     return;
  }
  
  isLoading = true;
  responseData();
  refresh();
  
   if (  4 ) {
     shouldLoad = false;
     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
     window.removeEventListener("scroll", checkPosition);
     
  }
   isLoading = false;
}