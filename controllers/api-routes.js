var db = require('../models');

module.exports = function (app) {

    // Gets last workout
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })

            .catch(err => {
                res.json(err);
            });
    });

    // Creates a new workout
    app.post('/api/workouts', async (req, res) => {
        try {
            const response = await db.Workout.create({ type: 'workout' })
            res.json(response);
        }
        catch (err) {
            console.log("An error occurred while creating your workout", err)
        }
    })

    // Adds an exercise to a workout
    app.put('/api/workouts/:id', ({ body, params }, res) => {
        const workoutID = params.id;
        let savedExercises = [];

        db.Workout.findByIdAndUpdate(workoutID, { $push: { exercises: body } }, function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                res.json(doc);
            }
        })
    })

    app.get('/api/workouts/range', (req, res) => {

        db.Workout.find({})
            // .sort({ _id: 1 })
            // .limit(7)
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
}