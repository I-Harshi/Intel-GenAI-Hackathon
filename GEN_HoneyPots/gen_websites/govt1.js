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
  const servicesContainer = document.querySelector('.services');
  services.forEach(service => {
      const serviceDiv = document.createElement('div');
      serviceDiv.className = 'service';
      serviceDiv.innerHTML = `
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <a href="${service.link}">Learn More</a>
      `;
      servicesContainer.appendChild(serviceDiv);
  });

  // Populate news articles
  const newsContainer = document.querySelector('.news');
  newsArticles.forEach(article => {
      const articleDiv = document.createElement('article');
      articleDiv.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.content}</p>
          <a href="${article.link}">Read More</a>
      `;
      newsContainer.appendChild(articleDiv);
  });
});
