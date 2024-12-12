let cars = [];

clearForm();
populateModelsLookup();
loadCars();

function loadCars() {
  fetch("/cars")
    .then((res) => {
      res.json()
      .then((result) => {
        const resultCars = result.result;
        cars = [...cars, ...resultCars];
        render();
    });
  });
}

function populateModelsLookup() {
  fetch("/cars/models")
    .then((res) => {
      res.json()
      .then((result) => {
        select = document.getElementById("makeInput");

        select.innerHTML = "";

        const models = result.result;

        models.forEach(
          (model) => {
            option = document.createElement("option")
      
            option.value = model
            option.innerText = model
        
            select.appendChild(option)
          }
        )
      });
  }); 
}

function render() {
  // clone the template
  document.querySelector("#card-list").innerHTML = "";

  cars.forEach((item) => {
    const template = document.getElementById("carTemplate").content.cloneNode(true);

    // populate the template
    template.querySelector(".card-title").innerText = item.make;
    template.querySelector(".card-car-body").innerText = item.model;
    // include the populated template into the page
    template.querySelector(".card-remove").addEventListener("click", () => {
      fetch(`/cars/${item.id}`, {
        method: "DELETE",
      }).then(() => {
        const idIndex = cars.map((car) => car.id.toString()).indexOf(item.id.toString());
        cars.splice(idIndex, 1);
        render();
      });
    });

    template.querySelector(".card-edit").addEventListener("click", () => {
      const make = document.getElementById("makeInput").value;
      const model = document.getElementById("modelInput").value;
      
      if(validateForm()) {
        fetch(`/cars/${item.id}`, {
          method: "PUT",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ "make" : make, "model" : model }),
        }).then(() => {
          const idIndex = cars.map((car) => car.id.toString()).indexOf(item.id.toString());

          cars[idIndex].make = make;
          cars[idIndex].model = model;
        
          render();

          clearForm();
        });
      }
    });

    document.querySelector("#card-list").appendChild(template);
  });
}

function onCarSubmit() {
  const make = document.getElementById("makeInput").value;
  const model = document.getElementById("modelInput").value;
  
  if(validateForm()) {
    fetch("/cars", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ "make" : make, "model" : model }),
    }).then((res) => {
      res.json().then((res) => {
        const car = res.result;
        cars.push(car);
        render();
        clearForm()
      });
    });
  }
}

function validateForm() {
  const make = document.getElementById("makeInput").value;
  const model = document.getElementById("modelInput").value;
  
  if(model == '' || make == '')
    return false
  else
    return true
}

function clearForm() {
  document.getElementById("makeInput").value = '';
  document.getElementById("modelInput").value = '';
}
