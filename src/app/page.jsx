"use client"

import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import Weather from "./components/Weather"
import Spinner from "./components/Spinner"

export default function Home() {
	const [city, setCity] = useState("")
	const [weather, setWeather] = useState({})
	const [loading, setLoading] = useState(false)

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_kEY}`

	const fetchWeather = (e) => {
		e.preventDefault()
		setLoading(true)
		axios
			.get(url)
			.then((response) => {
				setWeather(response.data)
				setCity("")
				setLoading(false)
			})
			.catch((error) => console.log(error))
	}

	if (loading) {
		return <Spinner />
	} else {
		return (
			<>
				<main>
					{/* overlay */}
					<div className='absolute top-0 left-0 bottom-0 right-0 bg-black/40 z-[1]'></div>

					{/* background image */}
					<Image
						src='https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Background Image'
						layout='fill'
						className='object-cover z-[-1]'
					/>

					{/* Search */}
					<div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
						<form
							onSubmit={fetchWeather}
							className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>
							<div>
								<input
									onChange={(e) => setCity(e.target.value)}
									className='bg-transparent border-none text-white focus:outline-none text-2xl'
									type='text'
									placeholder='Search City'
								/>
							</div>

							<button onClick={fetchWeather}>
								<BsSearch size={20} />
							</button>
						</form>
					</div>

					{/* weather */}
					{weather.main && <Weather data={weather} />}
				</main>
			</>
		)
	}
}
