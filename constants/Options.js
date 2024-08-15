export const SelectTravelerList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '✈️', // Airplane Unicode character
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun-loving adventurers, eager to explore new destinations',
        icon: '🏠',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers, enjoying timeless elegance and relaxation.',
        icon: '⛵', // Unicode for a sailboat
        people: '5 to 10 People'
    }
];


export const SelectBudgetOptions= [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average spending',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placename, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNight} nights with each day plan with best time to visit in JSON format.'