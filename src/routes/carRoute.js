const {getCars, addCar, deleteCar, putCar, getModels} = require("../controller/carController");
const express = require("express");

const router = express.Router();

const cars = [];

router.get("/", (req,res) => {
    const cars = getCars();
    res.send({result:cars});
});

router.get("/models", (req,res) => {
    const models = getModels();
    res.send({result:models});
});

router.post("/",(req,res)=> {
    const body=req.body;
    //find out max id in current cars
    const car = addCar(req.body);
    res.send({result: car})
});

router.delete('/:id',(req,res)=>{
    try{
        const {id} = req.params;
        deleteCar(id);
        console.log(cars);
        res.sendStatus(204);
    }catch (e){
        res.sendStatus(404);
    }
});

router.put('/:id',(req,res)=>{
    try{
        const newCar = req.body
        const {id} = req.params;
        putCar(id, newCar);
        console.log(cars);
        res.sendStatus(200);
    }catch (e){
        res.sendStatus(404);
    }
});

module.exports = router;