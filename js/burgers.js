class Hamburger {
    constructor(base, stuffing) {
        this.base = base;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    addTopping(topping) {
        this.toppings.indexOf(topping) === -1 ? this.toppings.push(topping) : console.log("Топпинг уже добавлен");
    }

    removeTopping(topping) {
        let idx = this.toppings.indexOf(topping);
        idx === -1 ? console.log("Топпинг отсутствует") : this.toppings.splice(idx, 1);
    }


}

let data = [
    {ingredient: "small", price: 50, calories: 20},
    {ingredient: "big", price: 100, calories: 40},
    {ingredient: "cheese", price: 10, calories: 20},
    {ingredient: "salad", price: 20, calories: 5},
    {ingredient: "potato", price: 15, calories: 10},
    {ingredient: "spices", price: 15, calories: 0},
    {ingredient: "mayonnaise", price: 50, calories: 20}
];

const burger = new Hamburger("big", "cheese");
burger.addTopping("spices");
burger.addTopping("spices");
burger.removeTopping("mayonnaise");
burger.addTopping("mayonnaise");
burger.removeTopping("mayonnaise");

console.log(burger.toppings);