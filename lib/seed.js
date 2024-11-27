export const tripSeedData = [
  {
    flight: "AI302",
    from: "Delhi",
    to: "Mumbai",
    flightName: "Air India",
    arrivalTime: new Date(Date.now() + 15 * 60 * 60 * 1000), // 2 hours from now
    departureTime: new Date(Date.now() + 13* 60 * 60 * 1000), // 1 hour from now
    price: {
      economy: 3500,
      business: 12000
    },
    capacity: {
      economy: 150,
      business: 20
    },
    booked: {
      economy: 35,
      business: 5
    },
    status: "scheduled",
  },
  {
    flight: "SG101",
    from: "Bengaluru",
    to: "Hyderabad",
    flightName: "SpiceJet",
    arrivalTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    departureTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000), // 2.5 hours from now
    price: {
      economy: 2500,
      business: 8000
    },
    capacity: {
      economy: 180,
      business: 25
    },
    booked: {
      economy: 70,
      business: 10
    },
    status: "scheduled",
  },
  {
    flight: "6E405",
    from: "Kolkata",
    to: "Chennai",
    flightName: "IndiGo",
    arrivalTime: new Date(Date.now() + 21* 60 * 60 * 1000), // 4 hours from now
    departureTime: new Date(Date.now() + 15* 60 * 60 * 1000), // 3.5 hours from now
    price: {
      economy: 4000,
      business: 15000
    },
    capacity: {
      economy: 200,
      business: 30
    },
    booked: {
      economy: 50,
      business: 8
    },
    status: "scheduled",
  },
  {
    flight: "UK874",
    from: "Jaipur",
    to: "Goa",
    flightName: "Vistara",
    arrivalTime: new Date(Date.now() + 25 * 60 * 60 * 1000), // 5 hours from now
    departureTime: new Date(Date.now() + 20 * 60 * 60 * 1000), // 4.5 hours from now
    price: {
      economy: 5000,
      business: 18000
    },
    capacity: {
      economy: 160,
      business: 22
    },
    booked: {
      economy: 90,
      business: 12
    },
    status: "scheduled",
  },
  {
    flight: "AI522",
    from: "Ahmedabad",
    to: "Pune",
    flightName: "Air India",
    arrivalTime: new Date(Date.now() + 19 * 60 * 60 * 1000), // 6 hours from now
    departureTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 5.5 hours from now
    price: {
      economy: 3000,
      business: 10000
    },
    capacity: {
      economy: 170,
      business: 25
    },
    booked: {
      economy: 60,
      business: 15
    },
    status: "scheduled",
  }
];

