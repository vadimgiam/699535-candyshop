"use strict";

//Заносим  описание в массивыи переменные.
var NAMES = [
  "Чесночные сливки",
 "Огуречный педант",
  "Молочная хрюша",
  "Грибной шейк",
  "Баклажановое безумие",
  "Паприколу итальяно",
  "Нинзя-удар васаби",
  "Хитрый баклажан",
  "Горчичный вызов",
  "Кедровая липучка",
  "Корманный портвейн",
  "Чилийский задира",
  "Беконовый взрыв",
  "Арахис vs виноград",
  "Сельдерейная душа",
  "Початок в бутылке",
  "Чернющий мистер чеснок",
  "Раша федераша",
  "Кислая мина",
  "Кукурузное утро",
  "Икорный фуршет",
  "Новогоднее настроение",
  "С пивком потянет",
  "Мисс креветка",
  "Бесконечный взрыв",
  "Невинные винные",
  "Бельгийское пенное",
  "Острый язычок"
];

var PICTURES = [
  "img/cards/gum-cedar.jpg",
  "img/cards/gum-chile.jpg",
  "img/cards/gum-eggplant.jpg",
  "img/cards/gum-mustard.jpg",
  "img/cards/gum-portwine.jpg",
  "img/cards/gum-wasabi.jpg",
  "img/cards/ice-cucumber.jpg",
  "img/cards/ice-eggplant.jpg",
  "img/cards/ice-garlic.jpg",
  "img/cards/ice-italian.jpg",
  "img/cards/ice-mushroom.jpg",
  "img/cards/ice-pig.jpg",
  "img/cards/marmalade-beer.jpg",
  "img/cards/marmalade-caviar.jpg",
  "img/cards/marmalade-corn.jpg",
  "img/cards/marmalade-new-year.jpg",
  "img/cards/marmalade-sour.jpg",
  "img/cards/marshmallow-bacon.jpg",
  "img/cards/marshmallow-beer.jpg",
  "img/cards/marshmallow-shrimp.jpg",
  "img/cards/marshmallow-spicy.jpg",
  "img/cards/marshmallow-wine.jpg",
  "img/cards/soda-bacon.jpg",
  "img/cards/soda-celery.jpg",
  "img/cards/soda-cob.jpg",
  "img/cards/soda-garlic.jpg",
  "img/cards/soda-peanut-grapes.jpg",
  "img/cards/soda-russian.jpg"
];

var MIN_AMOUNT = 0;
var MAX_AMOUNT  = 20;

var MIN_PRICE = 100;
var MAX_PRICE = 1500;

var MIN_WEIGHT = 30;
var MAX_WEIGHT = 300;

var MIN_VALUE = 1;
var MAX_VALUE = 5;

var MIN_NUMBER = 10;
var MAX_NUMBER = 900;

var SUGAR_FALSE = 0;
var SUGAR_TRUE = 1;

var MIN_ENERGY = 70;
var MAX_ENERGY = 500;

var CONTENTS = [
  "молоко",
  "сливки",
  "вода",
  "пищевой краситель",
  "патока",
  "ароматизатор бекона",
  "ароматизатор свинца",
  "ароматизатор дуба, идентичный натуральному",
  "ароматизатор картофеля",
  "лимонная кислота",
  "загуститель",
  "эмульгатор",
  "консервант: сорбат калия",
  "посолочная смесь: соль, нитрит натрия",
  "ксилит",
  "карбамид",
  "вилларибо",
  "виллабаджо"
];

//Создаем функцию,которая выводит случайное число в диапазоне

var getRandomNumber = function (min, max){

return min + Math.floor(Math.random() * (max - min));

}

//Создаем функцию, которая генерирует случайные значения.

var getRandomItem = function (items) {

  var index = Math.floor(Math.random() * items.length);
  return items[index];

};
// Функция перемешивания для массива  contents

var shuffle = function (array) {

    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

}

// Создаем функцию,  выдает рандомные из массива для contents.

var getRandomContains = function (items){

var shuffledItems = shuffle(items);
return shuffledItems.slice(0,getRandomNumber(0, shuffledItems.length));
}

//Создаем функцию,которая возвращает пустой объект.

var generateObject = function () {
    return {
      name: getRandomItem(names),
      picture: getRandomItem(pictures),
      amount: getRandomNumber(minAmount, maxAmount),
      price: getRandomNumber(minPrice, maxPrice),
      weight: getRandomNumber(minWeight, maxWeight),
      rating: {
        value: getRandomNumber(minValue, maxValue),
        number: getRandomNumber(minNumber, maxNumber)
      },
      nutritionFacts: {
        sugar: getRandomNumber(sugarFalse, sugarTrue),
        energy: getRandomNumber(minEnergy, maxEnergy),
        contents: getRandomContains(contents).join(",")
      }
    };

    // Создаем функцию, которая выводит массив объектов.
var COUNT_ITEMS = 26;

var generateObjects = function () {
  var objects = [];
  for (i=0; i < COUNT_ITEMS; i++){
    objects.push(generateObject());
  }
return objects;
};

//2. Catalog Cards

var catalogCards = document.querySelector(".catalog__cards");
catalogCards.classList.remove("catalog__cards--load");

var catalogLoad = document.querySelector(".catalog__load");
catalogLoad.classList.add("visually-hidden");

// Cards template, создаем DOM-элементы на основе массива.

var catalogCardsTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

var candyCard = function (CARD){

  var cardElement = catalogCardsTemplate.cloneNode(true);

  var cardTitle = document.querySelector(".card__title");
  var cardImg = document.querySelector(".card__img");
  var cardPrice = document.querySelector(".card__price");
  var cardWeight = document.querySelector(".card__weight");
  var cardRating = document.querySelector(".stars__rating");
  var cardRatingCount = document.querySelector(".star__count");
  var cardCharacteristic = document.querySelector(".card__characteristic");
  var cardComposition = document.querySelector(".card__composition-list");

 // amount
if (amount >= 5 ){
  cardElement.classList.add("card--in-stock");
} else if(1 <= amount < 5) {
  cardElement.classList.add("card--little");
} else if (amount == 0){
  cardElement.classList.add("card--soon");
}

// name
cardTitle.textContent = name;

// img
//cardImg

//Price
cardPrice.textContent = price;
var cardPriceSpan1 = document.createElement("span");
cardPriceSpan1.classList.add("card__currency");
cardPriceSpan1.textContent = " ₽";
cardPrice.appendChild(cardPriceSpan1);

var cardPriceSpan2 = document.createElement("span");
cardPriceSpan2.classList.add("card__weight");
cardPriceSpan2.textContent = "/ " + weight + " Г";
cardPrice.appendChild(cardPriceSpan2);

//rating
if (cardRating.rating.value == 1){
  cardRating.classList.add("stars__rating--one");
}else if(cardRating.rating.value == 2){
  cardRating.classList.add("stars__rating--two");
}else if(cardRating.rating.value == 3){
  cardRating.classList.add("stars__rating--three");
}else if(cardRating.rating.value == 4){
  cardRating.classList.add("stars__rating--four");
}else if(cardRating.rating.value == 5){
  cardRating.classList.add("stars__rating--five");
}

//count
cardRatingCount.textContent = " rating.number ";

//sugar
if(nutritionFacts.sugar == true){
  cardCharacteristic.textContent = "Содержит сахар." + nutritionFacts.energy + "ккал";
}else{
  cardCharacteristic.textContent = "Без сахара." + nutritionFacts.energy + "ккал";
}

cardComposition.textContent = "nutritionFacts.contents";

return cardElement;
};

// Пишем цикл.
var fragment = document.createDocumentFragment();
for(i = 0; i < COUNT_ITEMS; i++){
  fragment.appendChild()
}
