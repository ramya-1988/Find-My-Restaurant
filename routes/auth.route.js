const userRoute = require('../controllers/auth.controller');

module.exports = function (app) {
     
    app.post("/api/restaurant/add", userRoute.addNew);

    app.get("/api/restaurant/", userRoute.fetch);

    app.get("/api/restaurant/categories", userRoute.retrieve);

    app.get("/api/restaurant/categories/categoryName", userRoute.categoryDetails);

    app.get("/api/restaurant/id", userRoute.idDetails);

    app.get("/api/restaurant/rating/ratingValue", userRoute.fetchByRating);

    app.put("/api/restaurant/id", userRoute.updateDetails);

    app.delete("/api/restaurant/id", userRoute.deleteRestaurant);

    app.delete("/api/restaurant/", userRoute.deleteAllRestaurants);
}
