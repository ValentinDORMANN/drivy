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
Car.prototype.calculateRentalPrice = function(day,distanceInKm){
  return (this.calculateTimeCost(day)+this.calculateDistanceCost(distanceInKm))*this.calculatePromotionRate(day);
};
Car.prototype.calculateTimeCost = function(day){
  return this.pricePerDay*day;
};
Car.prototype.calculatePromotionRate = function(day){
  var promotionRate = 1;
  if(day >= 10){ promotionRate = 0.5; }
  else if(day >= 4){ promotionRate = 0.7; }
  else if(day >= 1){ promotionRate = 0.9; }
  return promotionRate;
};
Car.prototype.calculateDistanceCost = function(distanceInKm){
  return this.pricePerKm*distanceInKm;
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
/* ======================= COMMISSION ============================ */
var Commission = function(){
  this.insurance = 0;
  this.assistance = 0;
  this.drivy = 0;
};
Commission.RATE = 0.3;
Commission.INSURANCE_RATE = 0.5;
Commission.ROADSIDE_COST_PER_DAY = 1;
Commission.prototype.calculateCommision = function(price, day){
  var commisionPrice = price*Commission.RATE;
  this.insurance = commisionPrice*Commission.INSURANCE_RATE;
  this.assistance = day*Commission.ROADSIDE_COST_PER_DAY;
  this.drivy = commisionPrice - this.insurance - this.assistance;
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
Rental.prototype.calculateRentalPrice = function(){
  var carRepository = new CarRepository();
  // TODO check exception for finfCarBiId
  this.price = carRepository.findCarById(this.carId).calculateRentalPrice(this.calculateReservedTime(), this.distance);
};
Rental.prototype.calculateReservedTime = function(){
  const CONVERSION_TIME_RATE_MS_TO_DAY = 24*60*60*1000;
  var beginDateInMs = this.pickupDate.getTime();
  var endDateInMs = this.returnDate.getTime();
  var elapseTime = endDateInMs - beginDateInMs;
  return Math.ceil(elapseTime/CONVERSION_TIME_RATE_MS_TO_DAY)+1;
};
Rental.prototype.calculateCommision = function(){
  this.commission.calculateCommision(this.price, this.calculateReservedTime());
}

var RentalRepository = function(){
  this.rentals = this.loadDataInJSON(rentalsJSON);
  this.calculateRentalPrice();
  this.calculateCommision();
};
RentalRepository.prototype.loadDataInJSON = function(data){
  var rentals = [];
  for(var i = 0; i < data.length; i++){
    rentals.push(new Rental(data[i].id, new Driver(data[i].firstName, data[i].lastName), data[i].carId, new Date(data[i].pickupDate), new Date(data[i].returnDate), data[i].distance, data[i].option, new Commission()));
  }
  return rentals;
};
RentalRepository.prototype.calculateRentalPrice = function(){
  for(var i = 0; i < this.rentals.length; i++){
    this.rentals[i].calculateRentalPrice();
  }
};
RentalRepository.prototype.calculateCommision = function(){
  for(var i = 0; i < this.rentals.length; i++){
    this.rentals[i].calculateCommision();
  }
};

// MAIN
var carRepository = new CarRepository();
var rentalRepository = new RentalRepository();
console.log(rentalRepository);