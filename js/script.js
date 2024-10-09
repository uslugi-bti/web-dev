function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const body = document.querySelector("body");
const headerMenu = document.querySelector(".header__menu");
const headerBody = document.querySelector(".header__list");
const headerLinks = document.querySelectorAll(".header__item>a");

headerMenu.addEventListener("click", function () {
    body.classList.toggle("lock");
    headerBody.classList.toggle("active");
    headerMenu.classList.toggle("active");
});

for (let i = 0; i < headerLinks.length; i++) {
    headerLinks[i].addEventListener("click", function (event) {
        body.classList.remove("lock");
        headerBody.classList.remove("active");
        headerMenu.classList.remove("active");
        event.preventDefault();
    });
}
window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
        document.querySelector("header").classList.add("active");
    }
    if (window.scrollY < 30) {
        document.querySelector("header").classList.remove("active");
    }
});
const blockTitles = document.querySelectorAll(".nums__title>h1");
const blockColumns = document.querySelectorAll(".nums__item");
const arrTexts = [];
const animationDone = [];

for (let i = 0; i < blockTitles.length; i++) {
    var blockTitlesText = Number(blockTitles[i].id);
    arrTexts.push(blockTitlesText);
    animationDone.push(false);
}

var animateCounter = function (element, endValue) {
    let startValue = 0;
    let duration = 1500;
    let startTime;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            const value = Math.floor(startValue + (endValue - startValue) * progress);
            element.textContent = value;
            requestAnimationFrame(step);
        } else {
            element.textContent = endValue;
        }
    }

    requestAnimationFrame(step);
};

var increment = function () {
    for (let i = 0; i < blockColumns.length; i++) {
        var blockColumnTop = blockColumns[i].getBoundingClientRect().top;
        var koef = 2;

        if (blockColumnTop < window.innerHeight - (blockColumns[i].clientHeight / koef) && blockColumnTop > 0 && !animationDone[i]) {
            blockTitles[i].classList.add("active");
            animateCounter(blockTitles[i], arrTexts[i]);
            animationDone[i] = true;
        }
    }
}

window.addEventListener("load", increment);
window.addEventListener("scroll", increment);