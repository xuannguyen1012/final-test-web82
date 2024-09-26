import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import multer from 'multer'
import cloudinary from 'cloudinary'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from "./routes/userRoute.js";
import Movie from "./model/movie.js"
dotenv.config();


const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage });

//api endpoints
app.use('/api/user', userRouter);

// thêm danh dách phim
app.post('/movies', async (req, res) => {
    try {
        const { id, name, time, year, image ,introduce } = req.body;
        const movie = await Movie.create({
            id,
            name,
            time,
            year,
            image,
            introduce
        });

        res.status(201).json({
            message: "Thêm danh sách phim thành công",
            data: movie
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: null
        })
    }
})

//lấy danh sách phim
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

// APi sửa phim

app.put('/movies/:id', upload.single('image'), async (req, res) => {
    try {
        const {id} = req.params;
        const {name, time ,year, introduce} = req.body;
        const image = req.file
        const crrmovie = await Movie.findById(id);
        if(!crrmovie) {
            res.status(400).send({
                message: "Not found movie",
                data: null
            })
        } else {
            if(name) crrmovie.name = name;
            if(time) crrmovie.time = time;
            if(year) crrmovie.year = year;
            if(introduce) crrmovie.introduce = introduce;
        }

        if(image) {
            const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
            const result = await cloudinary.uploader.upload(dataUrl, {
                resource_type: 'auto'
            });
            crrmovie.image = result.secure_url;
        }
        await crrmovie.save();
        res.status(201).send({
            message: 'Updated',
            data: crrmovie
        });
    } catch (error) {
        res.status(201).send({
            message: error.message,
            data: null
        });
    }
})

//xoá
app.delete('/movies/:id', async (req, res) => {
    try {
        const {id} = req.params
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(404).send('Movie not found.');

        const publicId = movie.image.split('/').pop().split('.')[0]; 
        await cloudinary.uploader.destroy(publicId);
        // Xóa phim 
        await Movie.findByIdAndDelete(id);
        const remainingMovies = await Movie.find();
        res.send({ 
            message: 'Movie deleted successfully.', 
            remainingMovies 
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data:null
        })
    }
});

//tìm kiếm theo tên phim
app.get('/movies/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const movies = await Movie.find({ name: new RegExp(keyword, 'i') }); // Tìm phim
        res.status(200).send({
            message: "Tìm kiếm thành công",
            data: movies
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data:null
        })
    }
});

//sắp xếp theo năm
app.get('/movies/sorted', async (req, res) => {
    try {
        const { order } = req.query; 
        const sortOrder = order === 'desc' ? -1 : 1; // Xác định thứ tự sắp xếp
        const movies = await Movie.find().sort({ year: sortOrder }); // Sắp xếp theo năm
        res.status(500).send({
            message:"Sắp xếp tăng dần hoặc giảm dần",
            data:movies
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data:null
        })
    }
});



app.get('/', (req,res) => {
    res.send('API Working')
})

app.listen(port , () => {
    console.log("Server is running")
})