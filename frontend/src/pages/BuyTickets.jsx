import React, { useEffect,  useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from 'axios'

const BuyTickets = () => {
    const location = useLocation()
    const {movieid, cityname} = useParams()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [movie, setMovie] = useState(null)
    const [theatres, setTheatres] = useState(null)

    const getMovie = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/movie/movies/${movieid}`);
          if (response.data.ok) {
            setMovie(response.data.data);
            console.log(response.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };

    const getTheatres = async (date) => {
        let movieId = movieid
        let city = cityname

        try {
            const response = await axios.get(`http://localhost:8080/api/movie/screensbymovieschedule/${city}/${date}/${movieId}`);
            if (response.data.ok) {
              setMovie(response.data.data);
              console.log(response.data);
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }
        };
    

    useEffect(() => {
        getMovie()
    }, [])
  
    useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])

  return (
    <div>BuyTickets</div>
  )
}

export default BuyTickets