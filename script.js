const STORAGE_KEY = "airportPassengersSingleFile";

let passengers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentIndex = passengers.length > 0 ? passengers.length - 1 : -1;

function updateCounter() {
  const counter = document.getElementById("passengerCounter");
  if (passengers.length === 0 || currentIndex === -1) {
    counter.textContent = "0 of 0";
  } else {
    counter.textContent = (currentIndex + 1) + " of " + passengers.length;
  }
}

function savePassengers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passengers));
}

function getFlightPrefix(destination) {
  if (destination === "Dubai") return "DXB";
  if (destination === "Cairo") return "CAI";
  if (destination === "Istanbul") return "IST";
  if (destination === "Doha") return "DOH";
  if (destination === "Jeddah") return "JED";
  return "FLT";
}

function generateSeat(travelClass) {
  if (travelClass === "Business") {
    return Math.floor(Math.random() * 10 + 1) + String.fromCharCode(65 + Math.floor(Math.random() * 4));
  } else {
    return Math.floor(Math.random() * 30 + 11) + String.fromCharCode(65 + Math.floor(Math.random() * 6));
  }
}

function displayPassenger(passenger) {
  document.getElementById("resultName").textContent = passenger.name;
  document.getElementById("resultPassport").textContent = passenger.passport;
  document.getElementById("resultDestination").textContent = passenger.destination;
  document.getElementById("resultAirline").textContent = passenger.airline;
  document.getElementById("resultFlight").textContent = passenger.flightNumber;
  document.getElementById("resultGate").textContent = passenger.gate;
  document.getElementById("resultSeat").textContent = passenger.seat;
  document.getElementById("resultClass").textContent = passenger.travelClass;
  document.getElementById("resultDate").textContent = passenger.flightDate;
  document.getElementById("resultTime").textContent = passenger.flightTime;
  document.getElementById("resultCheckIn").textContent = passenger.checkInTime;

  const baggageBox = document.getElementById("baggageBox");
  baggageBox.textContent = "Baggage Status: " + passenger.baggageStatus;
  baggageBox.className = passenger.baggageClass;

  const statusBox = document.getElementById("statusBox");
  statusBox.textContent = "Status: " + passenger.status;
  statusBox.className = "status checked";

  document.getElementById("passengerName").value = passenger.name;
  document.getElementById("passportNumber").value = passenger.passport;
  document.getElementById("destination").value = passenger.destination;
  document.getElementById("airline").value = passenger.airline;
  document.getElementById("baggageWeight").value = passenger.baggage;
  document.getElementById("travelClass").value = passenger.travelClass;
  document.getElementById("flightDate").value = passenger.flightDate;
  document.getElementById("flightTime").value = passenger.flightTime;

  updateCounter();
}

function generateBoardingPass() {
  const name = document.getElementById("passengerName").value.trim();
  const passport = document.getElementById("passportNumber").value.trim();
  const destination = document.getElementById("destination").value;
  const airline = document.getElementById("airline").value;
  const baggageInput = document.getElementById("baggageWeight").value;
  const travelClass = document.getElementById("travelClass").value;
  const flightDate = document.getElementById("flightDate").value;
  const flightTime = document.getElementById("flightTime").value;

  if (!name || !passport || !destination || !airline || !travelClass || baggageInput === "" || !flightDate || !flightTime) {
    alert("Please fill in all fields.");
    return;
  }

  if (passport.length < 6) {
    alert("Passport number must be at least 6 characters.");
    return;
  }

  const baggage = Number(baggageInput);

  if (baggage < 0) {
    alert("Baggage weight cannot be negative.");
    return;
  }

  const flightPrefix = getFlightPrefix(destination);
  const flightNumber = flightPrefix + Math.floor(Math.random() * 900 + 100);
  const gate = "G" + Math.floor(Math.random() * 20 + 1);
  const seat = generateSeat(travelClass);
  const now = new Date().toLocaleString();

  let baggageStatus = "Normal";
  let baggageClass = "status normal";

  if (baggage > 40) {
    baggageStatus = "Overweight";
    baggageClass = "status overweight";
  }

  const passenger = {
    name: name,
    passport: passport,
    destination: destination,
    airline: airline,
    baggage: baggage,
    travelClass: travelClass,
    flightDate: flightDate,
    flightTime: flightTime,
    flightNumber: flightNumber,
    gate: gate,
    seat: seat,
    baggageStatus: baggageStatus,
    baggageClass: baggageClass,
    status: "Checked-In",
    checkInTime: now
  };

  passengers.push(passenger);
  currentIndex = passengers.length - 1;

  savePassengers();
  displayPassenger(passenger);

  alert("Boarding pass generated successfully!");
}

function showPreviousPassenger() {
  if (passengers.length === 0) {
    alert("No saved passengers.");
    return;
  }

  if (currentIndex > 0) {
    currentIndex--;
    displayPassenger(passengers[currentIndex]);
  } else {
    alert("This is the first passenger.");
  }
}

function showNextPassenger() {
  if (passengers.length === 0) {
    alert("No saved passengers.");
    return;
  }

  if (currentIndex < passengers.length - 1) {
    currentIndex++;
    displayPassenger(passengers[currentIndex]);
  } else {
    alert("This is the last passenger.");
  }
}

function resetForm() {
  document.getElementById("passengerName").value = "";
  document.getElementById("passportNumber").value = "";
  document.getElementById("destination").value = "";
  document.getElementById("airline").value = "";
  document.getElementById("baggageWeight").value = "";
  document.getElementById("travelClass").value = "";
  document.getElementById("flightDate").value = "";
  document.getElementById("flightTime").value = "";
}

function clearBoardingPassOnly() {
  document.getElementById("resultName").textContent = "---";
  document.getElementById("resultPassport").textContent = "---";
  document.getElementById("resultDestination").textContent = "---";
  document.getElementById("resultAirline").textContent = "---";
  document.getElementById("resultFlight").textContent = "---";
  document.getElementById("resultGate").textContent = "---";
  document.getElementById("resultSeat").textContent = "---";
  document.getElementById("resultClass").textContent = "---";
  document.getElementById("resultDate").textContent = "---";
  document.getElementById("resultTime").textContent = "---";
  document.getElementById("resultCheckIn").textContent = "---";

  document.getElementById("baggageBox").textContent = "Baggage Status: ---";
  document.getElementById("baggageBox").className = "status normal";

  document.getElementById("statusBox").textContent = "Status: ---";
  document.getElementById("statusBox").className = "status checked";
}

function clearAllPassengers() {
  if (passengers.length === 0) {
    alert("There are no saved passengers.");
    return;
  }

  const confirmed = confirm("Are you sure you want to delete all saved passengers?");
  if (!confirmed) return;

  passengers = [];
  currentIndex = -1;
  localStorage.removeItem(STORAGE_KEY);
  resetForm();
  clearBoardingPassOnly();
  updateCounter();
}

function printBoardingPass() {
  window.print();
}

window.onload = function () {
  updateCounter();

  if (passengers.length > 0) {
    displayPassenger(passengers[currentIndex]);
  }
};