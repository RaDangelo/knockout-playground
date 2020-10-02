// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
  var self = this;
  self.name = name;
  self.meal = ko.observable(initialMeal);

  self.formattedPrice = ko.computed(function () {
    var price = self.meal().price;
    return price ? "$" + price.toFixed(2) : "None";
  });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
  var self = this;

  // Non-editable catalog data - would come from the server
  self.availableMeals = [
    { mealName: "Standard (sandwich)", price: 0 },
    { mealName: "Premium (lobster)", price: 34.95 },
    { mealName: "Ultimate (whole zebra)", price: 290 },
  ];

  // Editable data
  self.seats = ko.observableArray([
    new SeatReservation("Steve", self.availableMeals[0]),
    new SeatReservation("Bert", self.availableMeals[1]),
  ]);

  // Add seat
  self.addSeat = function () {
    self.seats.push(new SeatReservation("Rafael", self.availableMeals[2]));
  };

  // Remove Seat
  self.removeSeat = function (seat) {
    self.seats.remove(seat);
  };

  // Get Total

  self.totalSurcharge = ko.computed(function () {
    return self.seats().reduce((prev, val) => {
      return val.meal().price + prev;
    }, 0);
  });
}

ko.applyBindings(new ReservationsViewModel());
