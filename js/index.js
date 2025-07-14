function $(id) {
    return document.getElementById(id);
}

const body = document.body;
const page = (window.location.pathname.split("/").filter(Boolean).pop()).split('.')[0];

addEventListener('load', () => {
  if (localStorage.getItem('actLang') === null) {
  localStorage.setItem('actLang', 'hu');}

  fetch('/components/navbar.html')
  .then(res => res.text())
  .then(html => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.firstElementChild.querySelector("#langHU").addEventListener("click", () => {setLang("hu")})
    tempDiv.firstElementChild.querySelector("#langEN").addEventListener("click", () => {setLang("en")})

    const navbarLinks = tempDiv.firstElementChild.querySelectorAll(".navbarItem");
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].innerHTML = text[localStorage.getItem("actLang")].navbar[i];
    }

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
      const footerItems = tempDiv.firstElementChild.querySelectorAll(".footerItem");
      for (let i = 0; i < footerItems.length; i++) {
        footerItems[i].innerHTML = text[localStorage.getItem("actLang")].footer[i];
      }

      body.appendChild(tempDiv.firstElementChild);
    });

  fetch('/components/info_Modal.html')
  .then(res => res.text())
  .then(html => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    body.appendChild(tempDiv.firstElementChild);
  });

  fetch('/components/info_Button.html')
    .then(res => res.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.firstElementChild.addEventListener("click", showInfo)
      body.appendChild(tempDiv.firstElementChild);
    });

  setLang(localStorage.getItem("actLang"));
})


function showInfo() {
  const infoDialog = $("infoDialog");
  infoDialog.addEventListener("click", (event) => {
    const rect = infoDialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      infoDialog.close();
    }
  });

  infoDialog.showModal(); 

  let lang = localStorage.getItem("actLang");
  infoDialog.querySelector("#title").innerHTML = text[lang].info[page].title;
  infoDialog.querySelector("#content").innerHTML = text[lang].info[page].content;

}

function setLang(lang) {
  localStorage.setItem("actLang", lang);

  const navbarLinks = document.querySelectorAll(".navbarItem");
  for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].innerHTML = text[lang].navbar[i];
  }
 
 
  const footerItems = document.querySelectorAll(".footerItem");
  for (let i = 0; i < footerItems.length; i++) {
    footerItems[i].innerHTML = text[lang].footer[i];
  }


  if (page == "index") {
    document.querySelector("#title").innerHTML = text[lang].index.title;
    const subTitles = document.querySelectorAll("h5");
    const contents = document.querySelectorAll("p");

    for (let i = 0; i < subTitles.length; i++) {
      subTitles[i].innerHTML = text[lang].index.subTitles[i];
      contents[i].innerHTML = text[lang].index.contents[i];
    }
  }


  if (page == "rps") {

    const rpsButtons = document.querySelectorAll(".rpsBtnItem");
    for (let i = 0; i < rpsButtons.length; i++) {
      rpsButtons[i].innerHTML = text[lang].rps.buttons[i];
    }
    
    const titles = document.querySelectorAll("h1");
    for (let i = 0; i < titles.length; i++) {
      titles[i].innerHTML = text[lang].rps.titles[i];
    }
    const subTitles = document.querySelectorAll("h3");
    for (let i = 0; i < subTitles.length; i++) {
      subTitles[i].innerHTML = text[lang].rps.subTitles[i];
    }

  }

  if (page == "todo") {
    
    const titles = document.querySelectorAll("h1");
    for (let i = 0; i < titles.length; i++) {
      titles[i].innerHTML = text[lang].todo.titles[i];
    }
    const inputNames = document.querySelectorAll(".inputName");
      for (let i = 0; i < inputNames.length; i++) {
      inputNames[i].innerHTML = text[lang].todo.inputData[1];
    }
 
    const inputDates = document.querySelectorAll(".inputDate");
      for (let i = 0; i < inputDates.length; i++) {
      inputDates[i].innerHTML = text[lang].todo.inputData[0];
    }

    document.querySelector("#add").innerHTML = text[lang].todo.buttons[0];

    const deleteButtons = document.querySelectorAll(".btnDone");
      for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].innerHTML = text[lang].todo.buttons[2];
    }
  
    const doneButtons = document.querySelectorAll(".btnEdit");
      for (let i = 0; i < doneButtons.length; i++) {
      doneButtons[i].innerHTML = text[lang].todo.buttons[3];
    }

    const backButtons = document.querySelectorAll(".btnBack");
      for (let i = 0; i < backButtons.length; i++) {
      backButtons[i].innerHTML = text[lang].todo.buttons[1];
    }

    document.querySelectorAll(".progressTitle").forEach(el => el.innerHTML = text[lang].todo.inputData[2]);
    document.querySelectorAll(".deadLine").forEach(el => el.innerHTML = text[lang].todo.inputData[0]);
    document.querySelectorAll(".btnTaskDeleteForAll").forEach(el => el.innerHTML = text[lang].todo.buttons[4]);
  }

  if (page == "weather") {

    document.querySelector("#title").textContent = text[lang].weather.title;
    document.querySelectorAll(".cityName")[0].textContent = text[lang].weather.cityName;
    document.querySelector("#search").innerHTML = text[lang].weather.search;
    document.querySelector("#airQ").innerHTML = text[lang].weather.airQ;
    
    const date = document.querySelectorAll(".day");
    const Wind = document.querySelectorAll(".wind");
    const description = document.querySelectorAll(".description");
    const nightDescription = document.querySelectorAll(".nightDescription");
    for (let i = 0; i < date.length; i++) {
      date[i].textContent = text[lang].weather.day[i];
      Wind[i].textContent = text[lang].weather.wind;
      // let textD = description[i].textContent;
      // console.log(textD)
      // let j = text.en.weather.description.indexOf(textD.trim());
      // console.log(text[lang].weather.description[j] || text.en.weather.description[j])
      // description[i].textContent = text[lang].weather.description[j] || text.en.weather.description[j];


      const data = JSON.parse(localStorage.getItem("weather"));
      const actData = data.forecast.forecastday[i].hour.find(x=>x.time == `${data.forecast.forecastday[i].date} 12:00`)
      let j = text.en.weather.description.indexOf(actData.condition.text.trim());
      
      const descriptionText = text[lang].weather.description[j] || actData.condition.text;
      description[i].textContent = descriptionText;


      const actNightData = data.forecast.forecastday[i].hour.find(x=>x.time == `${data.forecast.forecastday[i].date} 21:00`)
      j = text.en.weather.description.indexOf(actNightData.condition.text.trim());
      
      const nightDescriptionText = text[lang].weather.description[j] || actNightData.condition.text;
      nightDescription[i].textContent = nightDescriptionText;
    }

  }
}