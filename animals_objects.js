"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

const Animals = {
  name: "",
  type: "",
  description: "",
  age: 0
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    let fullname = jsonObject.fullname;
    let animal = Object.create(Animals);
    animal.name = fullname.substring(0, fullname.indexOf(" "));
    animal.type = fullname.substring(
      fullname.lastIndexOf(" ") + 1,
      fullname.length
    );
    animal.description = fullname.substring(
      fullname.indexOf(" "),
      fullname.lastIndexOf(" ")
    );
    animal.description = animal.description.substring(
      animal.description.lastIndexOf(" ") + 1,
      animal.description.length
    );
    animal.age = jsonObject.age;
    // TODO: MISSING CODE HERE !!!
    allAnimals.push(animal);
    console.log(animal);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.description;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
