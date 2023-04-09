const { isValidObjectId } = require('mongoose');
const newUser = require('../models/user.model');

/* Add New Restaurant */


exports.addNew = async (req, res) => {


    const userObj = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        imageURL: req.body.imageURL,
        location: req.body.location,
        phone: req.body.phone,
        rating: req.body.rating
    };

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }


    try {
        const user = await newUser.create(userObj);
        res.status(200).send({
            name: user.name,
            description: user.description,
            category: user.category,
            imageURL: user.imageURL,
            location: user.location,
            phone: user.phone,
            rating: user.rating
        });

    }

    catch (err) {
        console.log("Error creating User", err);
        res.status(500).send({
            message: "Some error occurred while creating the Restaurant"
        });
    }

}

/* Fetching all the Restaurants */

exports.fetch = async (req, res) => {

    try {
        const allRestaurants = await newUser.find();

        if (allRestaurants.length === 0) {
            return res.status(404).send({
                message: "No Restaurants found."
            });
        }

        return res.status(200).send({
            allRestaurants, message: "Restaurants fetched successfully."
        });

    }
    catch (err) {
        console.log("Error creating User", err);
        res.status(500).send({
            message: "Some error occured while fetching the Restaurants."
        });
    }
}


/* Retrieving the different categories of Restaurants */

exports.retrieve = async (req, res) => {

    try {
        const categories = await newUser.distinct('category');

        if (categories.length === 0) {
            return res.status(200).send([]);
        }
        res.status(200).send({
            categories, message: "Categories retrieved successfully"
        });
    }
    catch (err) {
        console.log("Error creating User", err);
        res.status(500).send({
            message: "Some error occurred while fetching Categories"
        });
    }
}

/* Fetching the details of all the restaurants for a particular category */

exports.categoryDetails = async (req, res) => {
    try {
        const categoryName = req.query.category;
        const categories = await newUser.find({ category: categoryName });

        if (categories.length > 0 && categories[0].category === "Takeout") {
            return res.status(200).send(categories);
        } else if (categories.length > 0 && categories[0].category === "dineout") {
            return res.status(200).send(categories);
        } else {
            return res.status(200).send([]);
        }
    } catch (err) {
        console.log("Error fetching restaurant details", err);
        res.status(500).send({
            message: "Some error occurred while fetching the Restaurant."
        });
    }
}

/* Fetch the details of the restaurant with the given ID */

exports.idDetails = async (req, res) => {

    try {

        const details = await newUser.findById(req.query.id);

        if (!details || details.length === 0) {
            return res.status(404).send({
                message: "No Restaurant found with the given ID"
            });
        }

        return res.status(200).send(details);
    }
    catch (err) {
        console.log("Error fetching restaurant details with ID", err);
        res.status(500).send({
            message: "Some error occurred while fetching the Restaurant with the given ID."
        });
    }

}

/*Fetch rhe details of the restaurants with rating >= 4 */

exports.fetchByRating = async (req, res) => {

    try {
        const { ratingValue } = req.query;
        const ratingBy = await newUser.find({ rating: { $gte: ratingValue } });

        if (!ratingValue) {
            return res.status(200).send([]);
        }

        return res.status(200).send({
            ratingBy, message: "Restaurants fetched successfully based on rating."
        });
    }



    catch (err) {
        console.log("Error fetching restaurant details with rating", err);
        res.status(500).send({
            message: "Some error occurred while fetching the Restaurant with rating."
        });
    }
}


/* Update the Restaurant details by using ID */

exports.updateDetails = async (req, res) => {

    try {

        const { id } = req.query;
        const { name, description, category, imageURL, location, phone, rating } = req.body;

        if (!id || !name || !description || !category || !imageURL || !location || !phone || !rating) {
            return res.status(400).send({
                message: "Restaurant Data is required."
            });
        }

        const updatedAt = await newUser.findByIdAndUpdate(id, { name, description, category, imageURL, location, phone, rating });
        if (!updatedAt) {
            return res.status(200).send({
                message: "No Restaurant found for given ID."
            });
        }
        return res.status(200).send({
            updatedAt, message: "Restaurant updated successfully."
        });
    }
    catch (err) {
        console.log("Error throws while updating the restaurant details", err);
        res.status(500).send({
            message: "Some error occurred while fetching the Restaurant."
        });
    }
}

/* Delete the restaurants by using ID */

exports.deleteRestaurant = async (req, res) => {

    try {

        const id = req.query.id;
        //const updates = req.body;
        const restaurant = await newUser.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).send({
                restaurant: "null",
                message: "Restaurant deleted successfully."
            });
        }
        return res.status(200).send({
            restaurant,
            message: "Restaurant deleted successfully."
        });
    }
    catch (err) {
        console.log("Error throws while deleting the restaurant", err);
        res.status(500).send({
            message: "Some error occurred while deleting the Restaurant."
        });
    }
}

/* Delete all existing restaurants */

exports.deleteAllRestaurants = async (req, res) => {

    try {

        const restaurants = await newUser.deleteMany({});
        if (restaurants.deletedCount === 0) {
            return res.status(404).send({
                restaurants: {
                    acknowledged: true,
                    deletedCount: restaurants.deletedCount
                },
                message: "Restaurants deleted successfully."
            });
        }
        return res.status(200).send({
            restaurants: {
                acknowledged: true,
                deletedCount: restaurants.deletedCount
            },
            message: "Restaurants deleted successfully."
        });
    }
    catch (err) {
        console.log("Error throws while deleting the restaurant", err);
        res.status(500).send({
            message: "Some error occurred while deleting the Restaurant."
        });
    }
}