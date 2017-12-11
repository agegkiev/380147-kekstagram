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
var picture = template.querySelector('.picture');

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
  for (var i = 0; i <= total; i++) {
    var index = arrShuffle[i];
    UserPhotosArray[i] = {
      url: 'photos/' + index + '.jpg',
      likes: getRandomInRange(25, 200),
      comments: getRandomElement(COMMENTS),
      index: index
    };
  }
  return UserPhotosArray;
}

UserPhotosArray = createUserPhotosArray();

function createDomElement(obj) {
  img.setAttribute('src', obj.url);
  comments.textContent = obj.length;
  likes.textContent = obj.likes;
  picture.dataset.index = obj.index;
  var element = template.cloneNode(true);
  return element;
}

for (var i = 0; i <= total; i++) {
  fragment.appendChild(createDomElement(UserPhotosArray[i]));
}

container.appendChild(fragment);

function createGalleryOverlay(obj) {
  galleryImage.setAttribute('src', obj.url);
  galleryComments.textContent = getRandomInRange(1, 2);
  galleryLikes.textContent = obj.likes;
  gallery.classList.remove('hidden');
}

function showPopupImage(e) {
  e.preventDefault();
  var target = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
  var targetIndex = target.dataset.index;
  var currentObject = UserPhotosArray.find(function (elem) {
    if (elem.index === +targetIndex) {
      return elem;
    }
  });
  createGalleryOverlay(currentObject);
}

container.addEventListener('click', showPopupImage);

container.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    showPopupImage(e);
  }
});

container.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    gallery.classList.add('hidden');
  }
});

var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

galleryOverlayClose.addEventListener('click', function () {
  gallery.classList.add('hidden');
});

galleryOverlayClose.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    gallery.classList.add('hidden');
  }
});
