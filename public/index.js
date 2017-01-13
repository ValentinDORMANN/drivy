'use strict';

//list of cars
//useful for ALL exercises
var carsJSON = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentalsJSON = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

/* ======================= CAR ===============================*/
var Car = function(id, vehicule, pricePerDay, pricePerKm){
  this.id = id;
  this.vehicule = vehicule;
  this.pricePerDay = pricePerDay;
  this.pricePerKm = pricePerKm;
}
Car.prototype.calculateRentalPrice = function(day,km){
  return this.calculateTimeCost(day)+this.calculateDistanceCost(km);
};
Car.prototype.calculateTimeCost = function(day){
  return this.pricePerDay*day;
};
Car.prototype.calculateDistanceCost = function(km){
  return this.pricePerKm*km;
};

var CarRepository = function(){
  this.cars = this.loadDataInJSON(carsJSON);
};
CarRepository.prototype.loadDataInJSON = function(data){
  var cars = [];
  for(var i = 0; i < data.length; i++){
    cars.push(new Car(data[i].id, data[i].vehicule, data[i].pricePerDay, data[i].pricePerKm));
  }
  return cars;
};
CarRepository.prototype.findCarById = function(id){
  for(var i = 0; i < this.cars.length; i++){
    if(this.cars[i].id == id){
      return this.cars[i];
    }
  }
  console.log("Unalble to find this car ("+id+")");
}
/* ======================= DRIVER =============================== */
var Driver = function(firstName, lastName){
  this.firstName = firstName;
  this.LastName = lastName;
}
/* ======================= RENTAL =============================== */
var Rental = function(id, driver, carId, pickupDate, returnDate, distance, options, commission){
  this.id = id;
  this.driver = driver;
  this.carId = carId;
  this.pickupDate = pickupDate;
  this.returnDate = returnDate;
  this.distance = distance;
  this.options = options;
  this.price = 0;
  this.commission = commission;
};
Rental.prototype.calculateReservedTime = function(){
  const conversionRateMsToDay = 60*60*1000;
  var beginDateInMs = this.pickupDate.getTime();
  var endDateInMs = this.returnDate.getTime();
  var elapseTime = beginDateInMs - endDateInMs;
  return Math.ceil(elapseTime%conversionRateMsToDay)+1;
};
Rental.prototype.calculateRentalPrice = function(){
  var carRepository = new CarRepository();
  // TODO check exception for finfCarBiId
  this.price = carRepository.findCarById(this.carId).calculateRentalPrice(this.calculateReservedTime(), this.distance);
  console.log(this.price);
};

var RentalRepository = function(){
  this.rentals = this.loadDataInJSON(rentalsJSON);
  this.calculateRentalPrice();
};
RentalRepository.prototype.loadDataInJSON = function(data){
  var rentals = [];
  for(var i = 0; i < data.length; i++){
    rentals.push(new Rental(data[i].id, new Driver(data[i].firstName, data[i].lastName), data[i].carId, new Date(data[i].pickupDate), new Date(data[i].returnDate), data[i].distance, data[i].option, data[i].commission));
  }
  return rentals;
};
RentalRepository.prototype.calculateRentalPrice = function(){
  for(var i = 0; i < this.rentals.length; i++){
    this.rentals[i].calculateRentalPrice();
  }
};

// MAIN
var carRepository = new CarRepository();
var rentalRepository = new RentalRepository();
console.log(carRepository);
console.log(rentalRepository);