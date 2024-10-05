document.addEventListener('DOMContentLoaded', () => {
  const articlesContainer = document.getElementById('articles-container');
  const honeypotInput = document.querySelector('.honeypot-input');

  // Add event listener for creating new articles
  document.getElementById('add-article-button').addEventListener('click', () => {
      const title = document.getElementById('article-title').value.trim();
      const content = document.getElementById('article-content').value.trim();
      const category = document.getElementById('article-category').value.trim();

      if (title && content && category) {
          // Check if the honeypot field is filled
          if (honeypotInput.value !== '') {
              console.warn('Bot detected! Honeypot field is filled.');
              alert('Bot detected! Please contact the admin.');
              return; // Exit the function if a bot is detected
          }

          const articleContainer = document.createElement('article');
          articleContainer.innerHTML = `
              <h3>${title}</h3>
              <p>${content}</p>
              <p><strong>Category:</strong> ${category}</p>
              <button class="comment-button">Comment</button>
              <div class="comments-container" style="display:none;"></div>
              <input type="text" class="comment-input" placeholder="Write a comment..." style="display:none;" />
          `;
          articlesContainer.prepend(articleContainer);

          // Clear input fields
          document.getElementById('article-title').value = '';
          document.getElementById('article-content').value = '';
          document.getElementById('article-category').value = '';

          // Add comment functionality
          const commentButton = articleContainer.querySelector('.comment-button');
          const commentsContainer = articleContainer.querySelector('.comments-container');
          const commentInput = articleContainer.querySelector('.comment-input');

          commentButton.addEventListener('click', () => {
              if (commentInput.style.display === 'none') {
                  commentInput.style.display = 'block';
                  commentButton.textContent = 'Submit Comment';
              } else {
                  const commentText = commentInput.value.trim();
                  if (commentText) {
                      const comment = document.createElement('p');
                      comment.textContent = commentText;
                      commentsContainer.appendChild(comment);
                      commentInput.value = '';
                      commentInput.style.display = 'none';
                      commentButton.textContent = 'Comment';
                  }
              }
              commentsContainer.style.display = 'block';
          });
      } else {
          alert('Please fill in all fields!');
      }
  });
});
