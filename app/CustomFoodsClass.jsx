export default class CustomFoods
{
    #calories = 0;
    #foodProtein = 0;
    #foodCarbs = 0;
    #foodFats = 0;
    #name = '';

    constructor(_foodProtein, _foodCarbs, _foodFats, _name)
    {
        this.#calories = _foodProtein*4 + _foodCarbs*4 + _foodFats*9;
        this.#foodProtein = _foodProtein;
        this.#foodCarbs = _foodCarbs;
        this.#foodFats = _foodFats;
        this.#name = _name;
    }

    getName()
    {
        return this.#name;
    }
    getCalories()
    {
        return this.#calories;
    }
    getProtein()
    {
        return this.#foodProtein;
    }
    getCarbs()
    {
        return this.#foodCarbs;
    }
    getFats()
    {
        return this.#foodFats;
    }
    display()
    {
        console.log(this.#calories);
        console.log(this.#foodProtein);
        console.log(this.#foodCarbs);
        console.log(this.#foodFats);
        console.log(this.#name);
    }
};

