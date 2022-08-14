import lightBoxPage from './simpLightBox'
import GalleriesApi from './fetchGalleries'
import Notiflix from 'notiflix';
import InfiniteScroll from 'infinite-scroll';
import '../css/styles.css';

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more');
const textNote = document.querySelector('.note');

loadButton.classList.add('ishidden');
textNote.classList.add('ishidden');



const galleriesApi = new GalleriesApi();

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);



async function responseData() {
    try {
      const collectionGalleries = await galleriesApi.fetchImage();
      insertGalleries(collectionGalleries);
      // notification(collectionGalleries);
    } catch (error) {
      console.log()
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

   }
};

const notification = (response) => {
  const page = Math.ceil(response.totalHits / galleriesApi.perPage);
  const lastRender = galleriesApi.page;
  
  if (response.totalHits === 0 || galleriesApi.nameImage === '') {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    loadButton.classList.add('ishidden');
    textNote.classList.add('ishidden');
    clearGalleries(); 
    return false;
  } else if (galleriesApi.page === 2) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    setTimeout(() => {
       loadButton.classList.remove('ishidden');
    }, 500)
  } else if (lastRender > page) {
    loadButton.classList.add('ishidden');
    textNote.classList.remove('ishidden');
  }
  
};

function insertGalleries(galleriesRespons) {
  notification(galleriesRespons);
  const imagesItem = galleriesList(galleriesRespons.hits);
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
</div>
`
};

function onLoadButton() {
    responseData();
    lightBoxPage.refresh();
};

const clearGalleries = () => galleries.innerHTML = '';

// const { height: cardHeight } = galleries.firstElementChild.getBoundingClientRect();
// console.log( cardHeight)
//   window.scrollBy({
//     top: cardHeight * 5,
//     behavior: 'smooth',
//   })

// new InfiniteScroll('.gallery', {
//   // path: responseData(),
//   // status: '.infinite-scroll-load',
//   button: '.load-more',
//   // loadOnScroll: true,
//   // onInit: function () {
//   //   this.on('append', onLoadButton())
//   // },
//   // prefill: false,
//   // checkLastPage: 20,
//   // scrollThreshold: 20,
// })
// console.log(galleriesApi.constructor(this.page))
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