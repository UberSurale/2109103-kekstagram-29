import { bigPictureComments, bigPictureCommentsCount, bigPictureLikes, openUserModal, userBigPictureImage } from './big-picture.js';
import { getRandomDescriptions } from './data.js';

const picturesList = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const showMore = document.querySelector('.comments-loader');
const pictureComment = bigPictureComments.querySelector('.social__comment');


const usersPictures = getRandomDescriptions();

let displayedComments = 5;

const renderMiniatures = () => {
  const picturesFragment = document.createDocumentFragment();
  const commentFragment = document.createDocumentFragment();

  usersPictures.forEach(({ url, description, likes, comment }) => {
    const picturesElement = picturesTemplate.cloneNode(true);
    const pictureImage = picturesElement.querySelector('.picture__img');
    const picturesLikes = picturesElement.querySelector('.picture__likes');
    const pictureComments = picturesElement.querySelector('.picture__comments');

    pictureImage.src = url;
    pictureImage.alt = description;
    picturesLikes.textContent = likes;
    pictureComments.textContent = comment.length;

    picturesList.appendChild(picturesElement);

    const renderComments = () => {
      comment.slice(0, 5).forEach(({ avatar, name, message }) => {
        const commentElement = pictureComment.cloneNode(true);

        const pictureCommentImage = commentElement.querySelector('.social__picture');
        const pictureCommentText = commentElement.querySelector('.social__text');

        pictureCommentImage.src = avatar;
        pictureCommentImage.alt = name;
        pictureCommentText.textContent = message;

        commentFragment.append(commentElement);
      });
    };

    picturesElement.addEventListener('click', (evt) => {
      openUserModal();
      renderComments();

      const miniatureImage = evt.target.closest('.picture__img');

      if (miniatureImage) {
        userBigPictureImage.src = miniatureImage.src;
        bigPictureLikes.textContent = picturesLikes.textContent;
        bigPictureCommentsCount.textContent = pictureComments.textContent;

        bigPictureComments.innerHTML = '';
        bigPictureComments.append(commentFragment);
      }
    });
  });

  picturesList.appendChild(picturesFragment);
};

renderMiniatures();

export {renderMiniatures, picturesList};
