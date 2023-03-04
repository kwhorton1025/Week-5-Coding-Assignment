class Animal {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  describe() {
    return `${this.name} - ${this.quantity}`;
  }
}

class Species {
  constructor(name) {
    this.name = name;
    this.animal = [];
  }

  addAnimal(animal) {
    if (animal instanceof Animal) {
      this.animal.push(animal);
    } else {
      throw new Error(`You can only add an instance of Animal. 
    Argument is not an animal: ${animal}`);
    }
  }

  describe() {
    return `${this.name} - ${this.animal.length}`;
  }
}

class Menu {
  constructor() {
    this.species = [];
    this.selectedSpecies = [];
  }

  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createSpecies();
          break;
        case "2":
          this.viewSpecies();
          break;
        case "3":
          this.deleteSpecies();
          break;
        case "4":
          this.displaySpecies();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Happy Farming!");
  }

  showMainMenuOptions() {
    return prompt(`
        0) Exit
        1) Create a New Species
        2) View a Species
        3) Delete a Species
        4) Display all Species
    `);
  }

  showAnimalMenuOptions(animalInfo) {
    return prompt(`
        0) Back
        1) Add Quantity
        2) Delete Quantity
        -----------------
    ${animalInfo}
    `);
  }

  displaySpecies() {
    let speciesString = "";
    for (let i = 0; i < this.species.length; i++) {
      speciesString += i + ") " + this.species[i].name + "\n";
    }
    alert(speciesString);
  }

  createSpecies() {
    let name = prompt("Enter Name of New Species: ");
    this.species.push(new Species(name));
  }

  viewSpecies() {
    let index = prompt("Enter the index of the species that you want to view:");
    if (index > -1 && index < this.species.length) {
      this.selectedSpecies = this.species[index];
      let description = "Species Name: " + this.selectedSpecies.name + "\n";
      description += " " + this.selectedSpecies.describe() + "\n ";
      for (let i = 0; i < this.selectedSpecies.animal.length; i++) {
        description +=
          i + ") " + this.selectedSpecies.animal[i].describe() + "\n";
      }

      let selection1 = this.showAnimalMenuOptions(description);
      switch (selection1) {
        case "1":
          this.createAnimal();
          break;
        case "2":
          this.deleteAnimal();
      }
    }
  }

  deleteSpecies() {
    let index = prompt(
      "Enter the index of the species that you want to delete: "
    );
    if (index > -1 && index < this.species.length) {
      this.species.splice(index, 1);
    }
  }

  createAnimal() {
    let name = prompt("Enter Animal Name: ");
    let quantity = prompt("Enter Animal Quantity: ");
    this.selectedSpecies.animal.push(new Animal(name, quantity));
  }

  deleteAnimal() {
    let index = prompt(
      "Enter the index of the animal that you want to delete: "
    );
    if (index > -1 && index < this.selectedSpecies.animal.length) {
      this.selectedSpecies.animal.splice(index, 1);
    }
  }
}
let menu = new Menu();
menu.start();
