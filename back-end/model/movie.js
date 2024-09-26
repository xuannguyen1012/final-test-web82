import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    introduce: {
        type: String,
        required: true,
    }
})

const Movie = mongoose.model('movies', movieSchema);

export default Movie;