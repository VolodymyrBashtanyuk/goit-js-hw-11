// import { fetchImage } from './fetchGalleries';
import GalleriesApi from './fetchGalleries'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";

import '../css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleries = document.querySelector('.gallery');
const loadButton = document.querySelector('.load-more')
loadButton.classList.add('ishidden');

const galleriesApi = new GalleriesApi();

searchForm.addEventListener('submit', onSearchForm);
loadButton.addEventListener('click', onLoadButton);



function onSearchForm(e) {
    e.preventDefault();

    galleriesApi.nameImage = e.currentTarget.elements.searchQuery.value;
    if (galleriesApi.nameImage === '') {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
    }
    galleriesApi.fetchImage().then(hits => insertGalleries(hits));
    galleriesApi.resetPage();
    loadButton.classList.remove('ishidden');

};


function insertGalleries(list) {
    const imagesItem = galleriesList(list);
    galleries.insertAdjacentHTML('beforeend', imagesItem)
}

const galleriesList = (list) => list.reduce((acc, items) => acc + imagesMarkup(items), '');

function imagesMarkup(data) {
    const {webformatURL,  tags, likes, views, comments, downloads } = data;
return `<div class='photo-card'>
  <img src='${webformatURL}' alt='${tags}' loading='lazy' width='300' height='200' />
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
</div> `
}

function onLoadButton() {
    galleriesApi.fetchImage().then(hits => insertGalleries(hits));
    
}