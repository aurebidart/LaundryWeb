fetch("../pages/clients_header.html")
  .then(response => response.text())
  .then(html => {
    const headerContainer = document.getElementById("header-container");
    headerContainer.innerHTML = html;

    switch (window.location.pathname) {
      case "/pages/index.html":
        document.getElementById("home").classList.add("active");
        break;
      case "/pages/services.html":
        document.getElementById("services").classList.add("active");
        break;
      case "/pages/contact.html":
        document.getElementById("contact").classList.add("active");
        break;
      case "/pages/login.html":
        document.getElementById("employee").classList.add("active");
        break;
    }
  })
  .catch(error => {
    console.error("Error al cargar el archivo de encabezado:", error);
  });

fetch("../pages/footer.html")
  .then(response => response.text())
  .then(html => {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = html;
  })
  .catch(error => {
    console.error("Error al cargar el archivo de pie de página:", error);
  });