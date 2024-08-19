let start = document.querySelector(".overlay span");
let overlay = document.querySelector(".overlay ");
let userName = document.querySelector(".info .name span");
let container = document.querySelector(".container");
let cards = Array.from(document.querySelectorAll(".game-holder"));

start.onclick = function () {
  let User = prompt("Write Your Name.");
  if (!User) {
    userName.innerHTML = "Unknown";
  } else {
    userName.innerHTML = User;
  }
  overlay.remove();
  showAllCards();
  setTimeout(hideCards, 2000);
};

function showAllCards() {
  cards.forEach((card) => {
    card.classList.add("flipped");
  });
}

function hideCards() {
  cards.forEach((card) => {
    card.classList.remove("flipped");
  });
}

// let orderRange = [...Array(cards.length).keys()];
// console.log(orderRange);

const randomArray = Array.from({ length: cards.length }, () =>
  Math.floor(Math.random() * cards.length)
);

cards.forEach((card, index) => {
  card.style.order = randomArray[index];

  card.addEventListener("click", function () {
    flipCard(card);
  });
});

function flipCard(card) {
  card.classList.add("flipped");

  let theTwoFlipCard = cards.filter((ele) => ele.classList.contains("flipped"));

  if (theTwoFlipCard.length == 2) {
    handleCardClick();
    checkMatchingCards(theTwoFlipCard[0], theTwoFlipCard[1]);
  }
}

function handleCardClick() {
  container.classList.add("no-clicking");

  setTimeout(() => {
    container.classList.remove("no-clicking");
  }, 1000);
}

function checkMatchingCards(firstCard, secondCard) {
  if (firstCard.dataset.tec == secondCard.dataset.tec) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    document.querySelector(".success").play();
  } else {
    let tries = document.querySelector(".tries span");
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    document.querySelector(".error").play();

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, 1000);
  }
}
