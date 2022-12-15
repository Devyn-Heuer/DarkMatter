const productWindow = document.querySelector(".products");
const track = document.querySelector(".slider-track");
const nextButton = document.querySelector(".slider-button--right");
const previousButton = document.querySelector(".slider-button--left");
const dotIndex = document.querySelector(".slider-index");
const twitterBlock = document.querySelector(".twitter-feed");
const twitterIcon = document.querySelector(".twitter-icon");
const tweets = document.querySelectorAll(".tweet-faces");
const dots = Array.from(dotIndex.children);

const slideWidth = "450";
const slides = Array.from(track.children);
let slidePosition = 1;

function setSlidePosition(slide, index) {
  slide.style.left = slideWidth * index - slideWidth + "px";
}

function getSlidePosition(position) {
  if (position < 0) {
    position += 3;
  } else if (position > 2) {
    position -= 3;
  }
  return position;
}

function slideRight() {
  let position = getSlidePosition(slidePosition + 1);
  slides.forEach(function (slide, i) {
    slideRightAnimation(1, slides[getSlidePosition(i + position)], i);
    dots[i].classList.remove("current-slide");
  });
  dots[position].classList.add("current-slide");
  slidePosition = position;
}

function slideLeft() {
  let position = getSlidePosition(slidePosition - 1);
  slides.forEach(function (slide, i) {
    slideLeftAnimation(1, slides[getSlidePosition(i + position)], i);
    dots[i].classList.remove("current-slide");
  });
  dots[position].classList.add("current-slide");
  slidePosition = position;
}

function slideLeftAnimation(duration, slide, pos) {
  let frameCount = 0;
  let d = slideWidth / Math.round((1000 * duration) / 60);
  let distance = slideWidth;
  var animation = setInterval(function () {
    frameCount++;
    distance -= d;
    if (frameCount >= Math.round((1000 * duration) / 60)) {
      clearInterval(animation);
    }
    // console.log(distance);
    slide.style.left = slideWidth * pos - distance - slideWidth + "px";
  }, Math.round((1000 * duration) / 60));
}

function slideRightAnimation(duration, slide, pos) {
  let frameCount = 0;
  let d = slideWidth / Math.round((1000 * duration) / 60);
  let distance = slideWidth;
  var animation = setInterval(function () {
    frameCount++;
    distance -= d;
    if (frameCount >= Math.round((1000 * duration) / 60)) {
      clearInterval(animation);
    }
    // console.log(distance);
    slide.style.left = slideWidth * pos + distance - slideWidth + "px";
  }, Math.round((1000 * duration) / 60));
}

function setCurrentSlide(position) {
  position = getSlidePosition(position);
  // console.log(position - slidePosition);
  slides.forEach(function (slide, i) {
    slides[getSlidePosition(i + position)].style.left =
      slideWidth * i - slideWidth + "px";
    dots[i].classList.remove("current-slide");
  });
  dots[slidePosition].classList.add("current-slide");
  slidePosition = position;
}

// automatic slide
let autoSlide = true;
setInterval(function () {
  if (autoSlide) {
    slideRight();
  }
}, 2500);

productWindow.addEventListener("mouseover", function (evt) {
  autoSlide = false;
});

productWindow.addEventListener("mouseout", function (evt) {
  autoSlide = true;
});
// automatic slide end

previousButton.addEventListener("click", function (evt) {
  slideLeft();
});

nextButton.addEventListener("click", function (evt) {
  slideRight();
});

// Click the dots
dotIndex.addEventListener("click", function (evt) {
  const choice = evt.target.closest("button");
  if (!choice) return;

  dots.forEach(function (dot, i) {
    dot.classList.remove("current-slide");
    if (dot == choice) {
      slidePosition = i;
      setCurrentSlide(slidePosition);
    }
  });
});

// Twitter Section
twitterBlock.addEventListener("mouseover", () => {
  twitterIcon.style.opacity = 0;
  tweets.forEach(function (post, index) {
    post.style.opacity = 1;
  });
});

twitterBlock.addEventListener("mouseout", () => {
  twitterIcon.style.opacity = 1;
  tweets.forEach(function (post, index) {
    post.style.opacity = 0;
  });
});

// ajax attempt || blocked by cors
$.ajax({
  url: "https://api.twitter.com/2/tweets/search/recent?query=frozen custard&max_results=10&tweet.fields=author_id,conversation_id,created_at,geo,id,lang,source,text&user.fields=created_at,description,entities,id,location,name,url,usernamewww.google.com",
  method: "GET",
  headers: { Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAP3YkQEAAAAA0rYY43rKL8WIeJdyeY8Aey10T8o%3DNMG9g7bDCy415NQPKTTrKKXHLzIgAQH44pQO65gNoGLpmucQba"},
  async: false,
}).done(function (data) {
  console.log(data);
});

slides.forEach(setSlidePosition);
setCurrentSlide(1);
