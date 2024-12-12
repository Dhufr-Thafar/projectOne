const cars = [];

const getCars = () => {
    return cars;
};

const getModels = () => {
    return ["", "Volvo", "Subaru", "Mercedes", "Audi", "BMW", "Toyota","Honda"];
}

const addCar = (car) => {
    const nextId = cars.length === 0 ? 1: Math.max(...cars.map((car) => car.id))+1;

    const resultCars = {...car, id: nextId};

    cars.push(resultCars);

    return resultCars;
};

const deleteCar = (id) => {
    const idIndex = cars.findIndex(car => car.id == id)

    if(idIndex < 0) 
        throw new Error();
    
    cars.splice(idIndex, 1);
};

const putCar = (id, newCar) => {
    const idIndex = cars.findIndex(car => car.id == id)

    if(idIndex < 0) 
        throw new Error();

    cars[idIndex].make = newCar.make
    cars[idIndex].model = newCar.model
}

module.exports ={
    getCars,
    addCar,
    deleteCar,
    putCar, 
    getModels
};