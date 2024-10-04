// Functionality for liking posts
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-button');
  
  likeButtons.forEach((button) => {
      button.addEventListener('click', () => {
          const likeCount = button.nextElementSibling;
          let count = parseInt(likeCount.textContent);
          count++;
          likeCount.textContent = `${count} Likes`;
      });
  });
});
