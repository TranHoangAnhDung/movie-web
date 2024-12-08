import MovieModel from "../model/Movie.js"
import ScreenModel from "../model/Screen.js"
import AccountModel from "../model/Account.js"
import BookingModel from "../model/Booking.js"

            {/* ADMIN ACCESS */}
export const createMovie = async (req, res, next) => {
    try {

        const { title, description, portraitImgUrl, landscapeImgUrl, rating, genre, duration } = req.body

        const newMovie = new MovieModel({ title, description, portraitImgUrl, landscapeImgUrl, rating, genre, duration })
        await newMovie.save()

        res.status(201).json({
            ok: true,
            message: "Movie added successfully"
        });

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const removeMovie = async (req, res, next) => {
    try {

        await MovieModel.findByIdAndDelete(req.body.id)

        res.status(201).json({
            ok: true,
            message: "Movie removed"
        });

    } catch (error) {
        res.json({success: false, message: error.message})
    }
} 

export const updateMovie = async (req,res,next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
    
        const updatedMovie = await MovieModel.findByIdAndUpdate(id, updatedData, {
          new: true,
        });
    
        if (!updatedMovie) {
          return res.status(404).json({ ok: false, message: "Movie not found" });
        }
    
        res.status(200).json({ ok: true, message: "Movie updated successfully", data: updatedMovie });
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
}

export const addCelebToMovie = async (req, res, next) => {
    try {
        const { movieId, celebName, celebRole, celebImage } = req.body;
        const movie = await MovieModel.findById(movieId);
        
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found"
            });
        }
        const newCeleb = {
            celebName,
            celebRole,
            celebImage
        };
        
        movie.cast.push(newCeleb);
        
        await movie.save();

        res.status(201).json({
            ok: true,
            message: "Celeb added successfully"
        });
    }
    catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const createScreen = async (req,res,next) => {
    try {
        const { name, location, seats, city, screenType } = req.body;

        const newScreen = new ScreenModel({
            name,
            location,
            seats,
            city: city.toLowerCase(),
            screenType,
            movieSchedules: []
        });

        await newScreen.save();

        res.status(201).json({
            ok: true,
            message: "Screen added successfully"
        });
    }
    catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const addMovieScheduleToScreen = async (req, res, next) => {
    try {
        const { screenId, movieId, showTime, showDate } = req.body;

        const screen = await ScreenModel.findById(screenId);
        if (!screen) {
            return res.status(404).json({
                ok: false,
                message: "Screen not found"
            });
        }

        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found"
            });
        }

        screen.movieSchedules.push({
            movieId,
            showTime,
            notavailableseats: [],
            showDate
        });

        await screen.save();

        res.status(201).json({
            ok: true,
            message: "Movie schedule added successfully"
        });

    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

            {/* USER ACCESS */}
export const bookTicket = async (req,res,next) => {
    try {
        const { showTime, showDate, movieId, screenId, seats, totalPrice, paymentId, paymentType } = req.body;
        console.log(req.body);

        // You can create a function to verify payment id

        const screen = await ScreenModel.findById(screenId);

        if (!screen) {
            return res.status(404).json({
                ok: false,
                message: "Theatre not found"
            });
        }

        const movieSchedule = screen.movieSchedules.find(schedule => {
            console.log(schedule);
            let showDate1 = new Date(schedule.showDate);
            let showDate2 = new Date(showDate);
            if (showDate1.getDay() === showDate2.getDay() &&
                showDate1.getMonth() === showDate2.getMonth() &&
                showDate1.getFullYear() === showDate2.getFullYear() &&
                schedule.showTime === showTime &&
                schedule.movieId == movieId) {
                return true;
            }
            return false;
        });

        if (!movieSchedule) {
            return res.status(404).json({
                ok: false,
                message: "Movie schedule not found"
            });
        }

        const user = await AccountModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }

        console.log('before newBooking done');

        const newBooking = new BookingModel({ userId: req.userId, showTime, showDate, movieId, screenId, seats, totalPrice, paymentId, paymentType })
        await newBooking.save();

        console.log('newBooking done');

        movieSchedule.notAvailableSeats.push(...seats);
        await screen.save();

        console.log('screen saved');

        user.bookings.push(newBooking._id);
        await user.save();

        console.log('user saved');

        res.status(201).json({
            ok: true,
            message: "Booking successful"
        });

    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getMovies = async (req,res,next) => {
    try {
        const movies = await MovieModel.find();

        res.status(200).json({
            ok: true,
            data: movies,
            message: 'Movies retrieved successfully'
        });
    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getMoviesId = async (req,res,next) => {
    try {
        const movieId = req.params.id;
        
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            ok: true,
            data: movie,
            message: 'Movie retrieved successfully'
        });
    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getScreensByCity = async (req,res,next) => { //:city
    const city = req.params.city.toLowerCase();

    try {
        const screens = await ScreenModel.find({ city });
        if (!screens || screens.length === 0) {
            return res.status(404).json('No screens found in the specified city');
        }

        res.status(200).json({
            ok: true,
            data: screens,
            message: 'Screens retrieved successfully'
        });

    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getScreensByMoviesSchedule = async (req,res,next) => { // /:city/:date/:movieid
    try {
        const city = req.params.city.toLowerCase();
        const date = req.params.date;
        const movieId = req.params.movieid;

        // Retrieve screens for the specified city
        const screens = await ScreenModel.find({ city });
        if (!screens || screens.length === 0) {
            return res.status(404).json('No screens found in the specified city');
        }

        // Filter screens based on the movieId
        // const filteredScreens = screens.filter(screen =>
        //     screen.movieSchedules.some(schedule => schedule.movieId == movieId)
        // );


        let temp = []
        // Filter screens based on the showDate
        const filteredScreens = screens.forEach(screen => {
            // screen 

            screen.movieSchedules.forEach(schedule => {
                let showDate = new Date(schedule.showDate);
                let bodyDate = new Date(date);
                // console.log(showDate , bodyDate);
                if (showDate.getDay() === bodyDate.getDay() &&
                    showDate.getMonth() === bodyDate.getMonth() &&
                    showDate.getFullYear() === bodyDate.getFullYear() &&
                    schedule.movieId == movieId) {
                    temp.push(
                        screen
                    );
                }
            })
        }
        );

        console.log(temp);

        res.status(200).json({
            ok: true,
            data: temp,
            message: 'Screens retrieved successfully'
        })

    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getScheduleByMovies = async (req,res,next) => { // /:screenid/:date/:movieid
    const screenId = req.params.screenid;
    const date = req.params.date;
    const movieId = req.params.movieid;

    const screen = await ScreenModel.findById(screenId);

    if (!screen) {
        return res.status(404).json('Screen not found');
    }

    const movieSchedules = screen.movieSchedules.filter(schedule => {
        let showDate = new Date(schedule.showDate);
        let bodyDate = new Date(date);
        if (showDate.getDay() === bodyDate.getDay() &&
            showDate.getMonth() === bodyDate.getMonth() &&
            showDate.getFullYear() === bodyDate.getFullYear() &&
            schedule.movieId == movieId) {
            return true;
        }
        return false;
    });
    console.log(movieSchedules)

    if (!movieSchedules) {
        return res.status(404).json('Movie schedule not found');
    }

    res.status(200).json({
        ok: true, 
        message: 'Movie schedule retrieved successfully', 
        data: {
            screen,
            movieSchedulesforDate: movieSchedules
    }});
}

export const getUserBookings = async (req,res,next) => {
    try {
        const user = await AccountModel.findById(req.userId).populate('bookings');
        if(!user){
            return res.status(404).json('User not found');
        }

        let bookings = [];
        // user.bookings.forEach(async booking => {
        //     let bookingobj = await Booking.findById(booking._id);
        //     bookings.push(bookingobj);
        // })

        for(let i = 0 ; i < user.bookings.length ; i++){
            let bookingobj = await BookingModel.findById(user.bookings[i]._id);
            bookings.push(bookingobj);
        }

        res.status(200).json({
            ok: true, 
            message: 'User bookings retrieved successfully', 
            data: bookings
        });
        // res.status(200).json(createResponse(true, 'User bookings retrieved successfully', user.bookings));
    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getUserBookingsId = async (req,res,next) => { // /:id
    try {
        const bookingId = req.params.id;
        const booking = await BookingModel.findById(bookingId);

        if(!booking){
            return res.status(404).json('Booking not found');
        }

        res.status(200).json({
            ok: true, 
            message: 'Booking retrieved successfully', 
            data: booking
        });
    }catch (error) {
        res.json({success: false, message: error.message})
    }
}

