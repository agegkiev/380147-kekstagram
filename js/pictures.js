'use strict';

var UserPhotosArray = [];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template').content;
var total = 26;
var img = template.querySelector('img');
var comments = template.querySelector('.picture-comments');
var likes = template.querySelector('.picture-likes');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInRange(0, arr.length)];
}

function createUserPhotosArray(total) {
  for (var i = 1; i <= total; i++) {
    UserPhotosArray[i] = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInRange(25, 200),
      comments: getRandomElement(COMMENTS)
    };
  }
  return UserPhotosArray;
}

var UserPhotosArray = createUserPhotosArray(total);

function createDomElement(numb) {
  img.setAttribute('src', UserPhotosArray[numb].url);
  comments.textContent = UserPhotosArray[numb].comments;
  likes.textContent = UserPhotosArray[numb].likes;
  var element = template.cloneNode(true);
  return element;
}

var fragment = document.createDocumentFragment();

for (var i = 1; i <= total; i++) {
  fragment.appendChild(createDomElement(i));
}

container.appendChild(fragment);

var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');

var galleryImage = gallery.querySelector('.gallery-overlay-image');
var galleryLikes = gallery.querySelector('.likes-count');
var galleryComments = gallery.querySelector('.comments-count');

function createGalleryOverlay(numb) {
  galleryImage.setAttribute('src', UserPhotosArray[numb].url);
  galleryComments.textContent = UserPhotosArray[numb].comments;
  galleryLikes.textContent = UserPhotosArray[numb].likes;
  var element = template.cloneNode(true);
  return element;
}

createGalleryOverlay(1);
