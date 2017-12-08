'use strict';

var UserPhotosArray = [];
var arrShuffle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template').content;
var total = 24;
var img = template.querySelector('img');
var comments = template.querySelector('.picture-comments');
var likes = template.querySelector('.picture-likes');
var fragment = document.createDocumentFragment();
var gallery = document.querySelector('.gallery-overlay');
var galleryImage = gallery.querySelector('.gallery-overlay-image');
var galleryLikes = gallery.querySelector('.likes-count');
var galleryComments = gallery.querySelector('.comments-count');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInRange(0, arr.length)];
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}

arrShuffle = shuffle(arrShuffle);

function createUserPhotosArray() {
  for (var i = 1; i <= total; i++) {
    UserPhotosArray[i] = {
      url: 'photos/' + arrShuffle[i] + '.jpg',
      likes: getRandomInRange(25, 200),
      comments: getRandomElement(COMMENTS)
    };
  }
  return UserPhotosArray;
}

UserPhotosArray = createUserPhotosArray();

function createDomElement(numb) {
  img.setAttribute('src', UserPhotosArray[numb].url);
  comments.textContent = UserPhotosArray[numb].length;
  likes.textContent = UserPhotosArray[numb].likes;
  var element = template.cloneNode(true);
  return element;
}

for (var i = 1; i <= total; i++) {
  fragment.appendChild(createDomElement(i));
}

container.appendChild(fragment);

// gallery.classList.remove('hidden');

function createGalleryOverlay(numb) {
  galleryImage.setAttribute('src', UserPhotosArray[numb].url);
  galleryComments.textContent = getRandomInRange(1, 2);
  galleryLikes.textContent = UserPhotosArray[numb].likes;
  var element = template.cloneNode(true);
  return element;
}

createGalleryOverlay(1);

var picture = document.querySelectorAll('.picture');
for (var j = 0; j < picture.length; j++) {
  picture[j].addEventListener('click', function () {
    gallery.classList.remove('hidden');
    event.preventDefault();
  });
}

var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

galleryOverlayClose.addEventListener('click', function () {
  gallery.classList.add('hidden');
});
