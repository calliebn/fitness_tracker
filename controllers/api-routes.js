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

        // Gets all of the saved exercises in the current workout
        db.Workout.find({ _id: WorkoutID })
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutID, { exercises: exercises }, function (err, doc) {
                if (err) {
                    console.log(err)
                }
            })
        }
    })

    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
}