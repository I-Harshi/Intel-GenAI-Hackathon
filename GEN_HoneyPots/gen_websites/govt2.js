document.addEventListener('DOMContentLoaded', () => {
  // Sample data for services and news
  const services = [
      {
          title: "Civil Registration",
          description: "Register births, deaths, and marriages online.",
          link: "#"
      },
      {
          title: "Public Health Services",
          description: "Access health information and services available in your area.",
          link: "#"
      },
      {
          title: "Social Welfare Programs",
          description: "Find out about programs available for social assistance.",
          link: "#"
      }
  ];

  const newsArticles = [
      {
          title: "New Initiative for Clean Energy",
          content: "The government has launched a new initiative aimed at promoting clean energy sources.",
          link: "#"
      },
      {
          title: "Health Care Reforms Announced",
          content: "New reforms in health care are set to improve accessibility for all citizens.",
          link: "#"
      }
  ];

  // Populate services
  const serviceList = document.getElementById('service-list');
  services.forEach(service => {
      const serviceDiv = document.createElement('div');
      serviceDiv.className = 'service';
      serviceDiv.innerHTML = `
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <a href="${service.link}">Learn More</a>
      `;
      serviceList.appendChild(serviceDiv);
  });

  // Populate news articles
  const newsList = document.getElementById('news-list');
  newsArticles.forEach(article => {
      const articleDiv = document.createElement('article');
      articleDiv.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.content}</p>
          <a href="${article.link}">Read More</a>
      `;
      newsList.appendChild(articleDiv);
  });

  // Search functionality
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      const filteredServices = services.filter(service =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
      
      serviceList.innerHTML = '';
      filteredServices.forEach(service => {
          const serviceDiv = document.createElement('div');
          serviceDiv.className = 'service';
          serviceDiv.innerHTML = `
              <h3>${service.title}</h3>
              <p>${service.description}</p>
              <a href="${service.link}">Learn More</a>
          `;
          serviceList.appendChild(serviceDiv);
      });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Handle form submission (e.g., send data to a server)
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset(); // Reset the form
  });
});
