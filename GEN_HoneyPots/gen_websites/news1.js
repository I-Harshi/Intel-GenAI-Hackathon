document.addEventListener('DOMContentLoaded', () => {
  // Add event listener for creating new articles
  const addArticleForm = document.createElement('div');
  addArticleForm.innerHTML = `
      <h2>Add a New Article</h2>
      <input type="text" id="article-title" placeholder="Article Title" required>
      <textarea id="article-content" placeholder="Article Content" rows="4" required></textarea>
      <button id="add-article-button">Add Article</button>
  `;
  document.querySelector('main').insertBefore(addArticleForm, document.querySelector('main').firstChild);

  // Event listener for the add article button
  document.getElementById('add-article-button').addEventListener('click', () => {
      const title = document.getElementById('article-title').value.trim();
      const content = document.getElementById('article-content').value.trim();

      if (title && content) {
          const articleContainer = document.createElement('article');
          articleContainer.innerHTML = `
              <h3>${title}</h3>
              <p>${content}</p>
              <button class="comment-button">Comment</button>
              <div class="comments-container" style="display:none;"></div>
              <input type="text" class="comment-input" placeholder="Write a comment..." style="display:none;" />
          `;
          document.querySelector('.articles').prepend(articleContainer);

          // Clear input fields
          document.getElementById('article-title').value = '';
          document.getElementById('article-content').value = '';

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
          alert('Please fill in both title and content fields!');
      }
  });
});
