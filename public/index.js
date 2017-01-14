'use strict';

// list of cars useful for ALL exercises
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

/* list of rentals useful for ALL exercises
The `price` is updated from exercice 1
The `commission` is updated from exercice 3
The `options` is useful from exercice 4   */
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

// list of actors for payment useful from exercise 5
var actorsJSON = [{
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
Car.prototype.getId = function(){ return this.id; };
Car.prototype.calculateRentalPrice = function(day,distanceInKm){
  var price = this.calculateTimeCost(day)+this.calculateDistanceCost(distanceInKm);
  return price;
};
Car.prototype.calculateTimeCost = function(day){
  return this.pricePerDay*this.calculatePromotionDailyPriceRate(day)*day;
};
Car.prototype.calculatePromotionDailyPriceRate = function(day){
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
  this.cars = [];
  this.loadDataInJSON(carsJSON);
};
CarRepository.prototype.loadDataInJSON = function(data){
  for(var i = 0; i < data.length; i++){
    this.cars.push(new Car(data[i].id, data[i].vehicule, data[i].pricePerDay, data[i].pricePerKm));
  }
};
CarRepository.prototype.findCarById = function(id){
  for(var i = 0; i < this.cars.length; i++){
    if(this.cars[i].getId() == id){
      return this.cars[i];
    }
  }
  console.log("Unable to find this car ("+id+")");
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
Commission.prototype.getInsurance = function(){ return this.insurance; };
Commission.prototype.getAssistance = function(){ return this.assistance; };
Commission.prototype.getDrivy = function(){ return this.drivy; };
Commission.prototype.calculateCommision = function(price, day){
  var commisionPrice = price*Commission.RATE;
  this.insurance = commisionPrice*Commission.INSURANCE_RATE;
  this.assistance = day*Commission.ROADSIDE_COST_PER_DAY;
  this.drivy = commisionPrice - this.insurance - this.assistance;
}
Commission.prototype.getTotalCommision = function(){
  return this.insurance + this.assistance + this.drivy;
};
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
Rental.DEDUCTIBLE_REDUCTION_PER_DAY = 4;
Rental.DEDUCTIBLE_REDUCTION_WITHOUT = 800;
Rental.DEDUCTIBLE_REDUCTION_WITH = 150;
Rental.prototype.getId = function(){ return this.id; };
Rental.prototype.getPickupDate = function(){ return this.pickupDate; };
Rental.prototype.getReturnDate = function(){ return this.returnDate; };
Rental.prototype.getDistance = function(){ return this.distance; };
Rental.prototype.getPrice = function(){ return this.price; };
Rental.prototype.getCommision = function(){ return this.commission; };
Rental.prototype.calculateRentalPrice = function(){
  var carRepository = new CarRepository();
  // TODO check exception for findCarById
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
};
Rental.prototype.checkDeductibleReductionOption = function(){
  var day = this.calculateReservedTime();
  return (this.options.deductibleReduction) ? Rental.DEDUCTIBLE_REDUCTION_WITH+day*Rental.DEDUCTIBLE_REDUCTION_PER_DAY : Rental.DEDUCTIBLE_REDUCTION_WITHOUT;
};
Rental.prototype.modifyRental = function(pickupDate, returnDate, distance){
  this.pickupDate = pickupDate;
  this.returnDate = returnDate;
  this.distance = distance;
  this.calculateRentalPrice();
  this.calculateCommision();
};

var RentalRepository = function(){
  this.rentals = [];
  this.loadDataInJSON(rentalsJSON);
  this.calculateRentalPrice();
  this.calculateCommision();
};
RentalRepository.prototype.loadDataInJSON = function(data){
  for(var i = 0; i < data.length; i++){
    this.rentals.push(new Rental(data[i].id, new Driver(data[i].driver.firstName, data[i].driver.lastName), data[i].carId, new Date(data[i].pickupDate), new Date(data[i].returnDate), data[i].distance, data[i].options, new Commission()));
  }
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
RentalRepository.prototype.findRentalById = function(id){
  for(var i = 0; i < this.rentals.length; i++){
    if(this.rentals[i].getId() == id){
      return this.rentals[i];
    }
  }
  console.log("Unable to find this rental ("+id+")");
};
RentalRepository.prototype.findRentalIndexById = function(id){
  for(var i = 0; i < this.rentals.length; i++){
    if(this.rentals[i].getId() == id){
      return i;
    }
  }
  console.log("Unable to find this rental ("+id+")");
};
RentalRepository.prototype.modifyRental = function(id, pickupDate, returnDate, distance){
  // TODO check exception for findRentalIndexById
  var index = this.findRentalIndexById(id);
  // NOTE we consider pickupDate <= returnDate
  pickupDate = (typeof pickupDate === 'undefined' || pickupDate === null) ? this.rentals[index].getPickupDate() : new Date(pickupDate);
  returnDate = (typeof returnDate === 'undefined' || returnDate === null) ? this.rentals[index].getReturnDate() : new Date(returnDate);
  distance = (typeof distance === 'undefined' || distance === null || distance <= 0) ? this.rentals[index].getDistance() : distance;
  this.rentals[index].modifyRental(pickupDate, returnDate, distance);
};

/* ======================= ACTOR ================================ */
var Actor = function(rentalId, payments){
  this.rentalId = rentalId;
  this.payments = payments;
};
Actor.prototype.getRentalId = function(){ return this.rentalId; };
Actor.prototype.pay = function(rentalRepository){
  // TODO check exception for findRentalById
  var rental = rentalRepository.findRentalById(this.rentalId);
  var commission = rental.getCommision();
  // NOTE TDA
  for(var i = 0; i < this.payments.length; i++){
    switch(this.payments[i].getWho()){
      case "driver":     this.payments[i].pay(rental.getPrice()+rental.checkDeductibleReductionOption());     break;
      case "owner":      this.payments[i].pay(rental.getPrice()-commission.getTotalCommision());              break;
      case "insurance":  this.payments[i].pay(commission.getInsurance());                                     break;
      case "assistance": this.payments[i].pay(commission.getAssistance());                                    break;
      case "drivy":      this.payments[i].pay(commission.getDrivy()+rental.checkDeductibleReductionOption()); break;
    }
  }
};
Actor.prototype.modify = function(rentalRepository){
  var rental = rentalRepository.findRentalById(this.rentalId);
  var commission = rental.getCommision();
  for(var i = 0; i < this.payments.length; i++){
    var amount = 0;
    switch(this.payments[i].getWho()){
      case "driver": 
        amount = rental.getPrice()+rental.checkDeductibleReductionOption();
        console.log(amount);
        this.payments[i].deltaAmount = amount - this.payments[i].amount;
        break;
      case "owner":
        amount = rental.getPrice()-commission.getTotalCommision();
        this.payments[i].deltaAmount = amount - this.payments[i].amount;
        break;
      case "insurance": 
        amount = commission.getInsurance();
        this.payments[i].deltaAmount = amount - this.payments[i].amount;
        break;
      case "assistance":
        amount = commission.getAssistance();
        this.payments[i].deltaAmount = amount - this.payments[i].amount;
        break;
      case "drivy":
        amount = commission.getDrivy()+rental.checkDeductibleReductionOption();
        this.payments[i].deltaAmount = amount - this.payments[i].amount;
        break;
    }
  }
};

var ActorRepository = function(){
  this.rentalRepository = new RentalRepository();
  this.actors = [];
  this.loadDataInJSON(actorsJSON);
  this.pay();
};
ActorRepository.prototype.loadDataInJSON = function(data){
  for(var i = 0; i < data.length; i++){
    var payments = [];
    for(var j = 0; j < data[i].payment.length; j++){
      payments.push(new Payment(data[i].payment[j].who, data[i].payment[j].type));
    }
    this.actors.push(new Actor(data[i].rentalId, payments));
  }
};
ActorRepository.prototype.pay = function(){
  for(var i = 0; i < this.actors.length; i++){
    this.actors[i].pay(this.rentalRepository);
  }  
};
ActorRepository.prototype.findActorIndexByRentalId = function(id){
  for(var i = 0; i < this.actors.length; i++){
    if(this.actors[i].getRentalId() == id){
      return i;
    }
  }
  console.log("Unable to find this rental ("+id+"");
};
ActorRepository.prototype.modifyActor = function(id){
  // TODO check exception for findActorIndexByRentalId
  var index = this.findActorIndexByRentalId(id);
  this.actors[index].modify(this.rentalRepository);
};
ActorRepository.prototype.doRentalModification = function(data){
  for(var i = 0; i < data.length; i++){
    this.rentalRepository.modifyRental(data[i].rentalId, data[i].pickupDate, data[i].returnDate, data[i].distance);
    this.modifyActor(data[i].rentalId);
  }
};

/* ======================= PAYMENT ============================== */
var Payment = function(who, type){
  this.who = who;
  this.type = type;
  this.amount = 0;
  this.deltaAmount = 0;
};
Payment.prototype.getWho = function(){ return this.who; };
Payment.prototype.pay = function(amount){
  this.amount += amount;
};

// MAIN
var actorRepository = new ActorRepository();

actorRepository.doRentalModification(rentalModifications);
console.log(actorRepository);