function $(id) {
    return document.getElementById(id);
}

const body = document.body;


addEventListener('load', () => {
    fetch('/components/navbar.html')
    .then(res => res.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      body.insertBefore(tempDiv.firstElementChild, body.firstChild);
      setActiveNavLink();
    });

    function setActiveNavLink() {
    const links = document.querySelectorAll(".navbar a.nav-link");
    const currentPath = window.location.pathname;

    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  fetch('/components/footer.html')
    .then(res => res.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      body.appendChild(tempDiv.firstElementChild);
    });

})