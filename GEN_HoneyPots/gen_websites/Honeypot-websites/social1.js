document.addEventListener('DOMContentLoaded', () => {
  const postButton = document.getElementById('post-button');
  const postContainer = document.getElementById('post-container');

  postButton.addEventListener('click', () => {
      const textarea = document.querySelector('.post-form textarea');
      const honeypot = document.querySelector('.post-form .honeypot');
      const postContent = textarea.value.trim();

      // Check if honeypot field is filled (if it's filled, it's likely a bot)
      if (honeypot.value !== '') {
          console.warn('Bot detected! Honeypot field is filled.');
          return; // Prevent further processing
      }

      if (postContent) {
          const postDiv = document.createElement('div');
          postDiv.classList.add('post');

          postDiv.innerHTML = `
              <h3>You</h3>
              <p>${postContent}</p>
              <button class="like-button">Like</button> <span class="like-count">0 Likes</span>
          `;

          postContainer.prepend(postDiv);
          textarea.value = '';

          // Like button functionality
          const likeButton = postDiv.querySelector('.like-button');
          const likeCount = postDiv.querySelector('.like-count');

          likeButton.addEventListener('click', () => {
              let count = parseInt(likeCount.textContent);
              count++;
              likeCount.textContent = `${count} Likes`;
          });
      } else {
          alert('Please enter something to post!');
      }
  });
});
