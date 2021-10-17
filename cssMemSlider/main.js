const slides = document.querySelectorAll('.slide');
const bullets = document.querySelectorAll('.slider-bullet');
const sliderContainer = document.querySelector('.slider-container');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const content = document.querySelector('.slide-text');
let slideStyles = {};
let index = 0;
let width = 0;
const text = ['Сон, как вай-фай, ловит везде - на работе, на улице, в транспорте... Но когда дома легла в кровать - все, "точка доступа не найдена"...', 'Скажите честно, я жирненький? Твои формы не определяют тебя как личность, ты прекрасен вне зависимости от того, сколько ты весишь. То есть жирненький? Да.', 'Оставлять меня в живых, было вашей ошибкой', 'Война войной, а обед по расписанию', 'Сначала подумал, что динозавры', 'Немейский тонкотел - самая спокойная и расслабленная обезьяна, которую я видел. Просто посмотрите на это лицо.']

const activeSlide = (index) => {
  slideStyles = window.getComputedStyle(slides[0]);
  slides.forEach((slide) => {
    slide.classList.remove('active');
  })
  bullets.forEach((bullet) => {
    bullet.classList.remove('active');
  })
  slides[index].classList.add('active');
  bullets[index].classList.add('active');
}

const nextSlide = () => {
  if(index == slides.length-1) {
    index = 0;
    activeSlide(index);
  } else {
    index++;
    activeSlide(index);
  }
}

const prevSlide = () => {
  if(index == 0) {
    index = slides.length-1;
    activeSlide(index);
  } else {
    index--;
    activeSlide(index);
  }
}

const moveLeft = () => {
  nextSlide();
  width = slideStyles.getPropertyValue('width').replace(/px/i, '');
  sliderContainer.style = `transform: translateX(-${width * index}px)`;
  content.innerHTML = `${text[index]}`;
}

const moveRight = () => {
  prevSlide();
  sliderContainer.style = `transform: translateX(-${width * index}px)`;
  content.innerHTML = `${text[index]}`;
}

btnNext.addEventListener('click', moveLeft);
btnPrev.addEventListener('click', moveRight);

bullets.forEach((el, i) => {
  el.addEventListener('mousedown', (event) => {
    console.log(el.childNodes[1])
    el.childNodes[1].classList.add('mousedown');
  })
  el.addEventListener('mouseup', (event) => {
    index = i;
    sliderContainer.style = `transform: translateX(-${width * i}px)`;
    el.childNodes[1].classList.remove('mousedown');
    activeSlide(i);
    content.innerHTML = `${text[i]}`;
  })
})
