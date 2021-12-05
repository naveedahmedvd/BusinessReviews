const Dummy_Restaurant = {
  name: 'Sizzlers',
  icon: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/0f/ff/4e/sizzler-mermaid-beach.jpg',
  averageRating: 3.0,
  totalReviews: 3,
  address: 'North east, california USA',
  WebsiteURL: "www.sizzlers.com",
  phoneNumber: '(+92) 321-45324823',
  photos: [
    { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80' },
    { url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80' },
    { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
  ],
  timings: [
    'Mon 7:00 AM - 11:00 PM',
    'Tue 7:00 AM - 11:00 PM',
    'Wed 7:00 AM - 11:00 PM',
    'Thu 7:00 AM - 11:00 PM',
    'Fri 7:00 AM - 11:00 PM',
    'Sat 7:00 AM - 11:00 PM',
    'Sun 7:00 AM - 11:00 PM',
  ],
  reviews: [
    {
      user: 'Nicolas Jack',
      avatar: 'NJ',
      location: 'NYC',
      rating: 3.5,
      comments: `Ordered lunch and then some from Unfurl. As somebody else mentioned, this place calls itself a virtual kitchen and it seems there are a number of independent "restaurants" that supply the food for them, so there's a great variety at reasonable prices. I ordered the Ahi Poke Tacos (2 tacos on your choice of corn or flour tortillas, sushi rice, slaw, raw ahi, avocado, edamame, and a sweet soy glaze for $7.99), the Pacific Flank Steak Rice Bowl (crispy onions, cucumbers, roasted corn, edamame, steak, choice of brown or white rice, and a sweet soy glaze for $13.99), and the Bistro Burger with Bacon Jam (an American wagyu patty, bacon jam, cheddar, garlic aioli, lettuce, and tomato on a brioche bun for $12.99). The tacos and burger were really tasty; I especially loved the contrast of the sweet and savory bacon jam on the burger! My hubby would've preferred the burger to be a little less cooked, but I loved it! The ahi in the tacos tasted really fresh, too. The rice bowl will be eaten this evening, but I have no doubt it'll be fantastic, too!
      The delivery was made by Postmates and it was really efficient. They gave me an estimated time of delivery, kept me abreast of where the driver was, and delivered 10 minutes before they said they'd be here. The only thing is, I wish third party delivery services didn't take such a huge cut of the profits from the restaurants.`
    },
    {
      user: 'Andy Flower',
      avatar: 'AF',
      location: 'Dallas',
      rating: 4.0,
      comments: 'Living in the neighborhood, Unfurl is so clutch. You have an array of choices and they continue to add more! My favorites personally are the breakfast sandwiches (yum) the staff is great and friendly which is always a major score.'
    }
  ],
  followedByLoggedInUser: false
};
export const getDummyRestaurants = (id) => {
  return Dummy_Restaurant;
};

export const addReview = (reviewObj) => {
  Dummy_Restaurant.reviews.push({
    user: reviewObj.userName,
    avatar: 'UA',
    location: reviewObj.location,
    rating: reviewObj.rating,
    comments: reviewObj.comments
  });
};

export const toggleFollow = () => {
  Dummy_Restaurant.followedByLoggedInUser = !Dummy_Restaurant.followedByLoggedInUser;
};

//export default getDummyRestaurants;