let data;
let pagesArr = [];
let idxOfPage;

const hero_img = document.querySelector('.hero__img');
const hero_img_geo = document.querySelector('.hero__img--geology');


const path = window.location.pathname;
const page = path.split("/").pop().split('.html')[0];

async function init() {
  const res = await fetch('../../data.json');
  data = await res.json();
  showNav(data);
  idxOfPage = getPagesArr(data);
  showDesc(data, "overview", idxOfPage);
  initImg(data, idxOfPage);
  displayInfo(data, idxOfPage);
}

init();

// ========== ARRAY OF PAGE NAMES ==========
function getPagesArr(data) {

  for (let i = 0; i < data.length; i++) {
    
    if (data[i].name === 'Mercury') {
      data[i].name = 'index';
    }
    pagesArr.push(data[i].name);
  }
  idxOfPage = pagesArr.indexOf(page);
  return idxOfPage;
}

// ========== DISPLAY NAV ==========
const nav__list = document.querySelector('.nav__list');

function showNav(names) {
  nav__list.innerHTML = '';

  names.forEach(list => {
    const { name, color } = list;

    const linkEl = document.createElement('a');
    linkEl.classList.add('nav__link');
    linkEl.href = `${name === 'Mercury' ? 'index' : name}.html`;

    linkEl.innerHTML = `
      <span class="nav__bullet" style="background-color:${color.bullet};"></span><li class="nav__item">${name}<img src="./assets/icon-chevron.svg" alt="chevron" class="nav__arrow"></li>
    `
    nav__list.append(linkEl);
  });
}


// ========== DESCRIPTION OF THE PLANET ==========
function showDesc(data, topicID, idx) {
  const text_box = document.querySelector('.hero__text-box');
  const { name, overview, structure, geology} = data[idx];

  text_box.innerHTML = '';

  const boxEl = document.createElement('div');

  let topic = overview;
  if (topicID === "structure") {
    topic = structure;
  } else if (topicID === "geology") {
    topic = geology;
  }

  boxEl.innerHTML = `
    <h1 class="hero__title">${name === 'index' ? 'Mercury' : name}</h1>
    <p class="hero__desc">${topic.content}</p>
    <p class="hero__source">Source : <a class="hero__link" href="${topic.source}" target="_blank" rel="noopener noreferrer">Wikipedia <img class="hero__icon" src="./assets/icon-source.svg" alt="source"></a></p>
  `
  text_box.appendChild(boxEl);
}


// ========== PLANET IMAGE ==========
const btnNode = document.querySelectorAll('.hero__btn');

function showImg(e, data, idx) {
  let btn_id = e.target.id;
  const { images } = data[idx];
  hero_img.classList.add(`${btn_id}`);
  hero_img_geo.classList.add(`${btn_id}`);
  e.target.classList.add('btn--active');
  
  if (btn_id === 'structure') {
    hero_img.style.backgroundImage = `url(${images.internal})`;
  } else if (btn_id === 'geology') {
    hero_img.style.backgroundImage = `url(${images.planet})`;
    hero_img_geo.style.backgroundImage = `url(${images.geology})`;
    hero_img_geo.style.display = 'block';
  } else {
    hero_img.style.backgroundImage = `url(${images.planet})`;
  }

  for (let i = 0; i < btnNode.length; i++) {
    if (btnNode[i].id !== btn_id) {
      btnNode[i].classList.remove('btn--active');
      hero_img.classList.remove(`${btnNode[i].id}`);
      hero_img_geo.classList.remove(`${btnNode[i].id}`);
    }
  }

  return btn_id;
}

// ========== DISPLAY INFO ==========
function displayInfo(data, idx) {
  const info_box = document.querySelector('.info__container');
  const { rotation, revolution, radius, temperature } = data[idx];

  info_box.innerHTML = '';

  const boxEl = document.createElement('div');
  boxEl.className = 'info__box container flex';


  boxEl.innerHTML = `
    <div class="info__card flex col">
      <h2 class="info__title">rotation time</h2>
      <h3 class="info__info">${rotation}</h3>
    </div>
    <div class="info__card flex col">
      <h2 class="info__title">revolution time</h2>
      <h3 class="info__info">${revolution}</h3>
    </div>
    <div class="info__card flex col">
      <h2 class="info__title">radius</h2>
      <h3 class="info__info">${radius}</h3>
    </div>
    <div class="info__card flex col">
      <h2 class="info__title">average temp.</h2>
      <h3 class="info__info">${temperature}</h3>
    </div>
  `
  info_box.appendChild(boxEl);

}



// ========== INIT PLANET IMAGE ==========
function initImg(data, idx) {
  const { images } = data[idx];
  
  hero_img.style.backgroundImage = `url(${images.planet})`;
}


// ========== EVENT LISTENERS ==========
btnNode.forEach(btn => btn.addEventListener('click', (e) => {
  const active_id = showImg(e, data, idxOfPage);
  showDesc(data, active_id, idxOfPage);
}));

const btn_toggle = document.querySelector('#btn__toggle');

btn_toggle.addEventListener('click', () => {
  document.querySelector('.nav__list').classList.toggle('show');
  document.querySelector('.hero__btn-box').classList.toggle('hide');
})

