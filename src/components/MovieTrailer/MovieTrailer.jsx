import React, { Fragment, useState } from 'react'
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';


const MovieTrailer = () => {

    const [video, setVideo] = useState("inception")
    const [videoURL, setVideoURL] = useState("https://youtu.be/sa9l-dTv9Gk")

    //A function to fetch the required URL
    // and storing it inside the
    // videoURL state variable
function handleSearch() {
	movieTrailer(video).then((res) => {
	setVideoURL(res);
	});
}
  return (
    <>
    {/* <Fragment>
        <div className="Container"></div>
        <div className="player">
        <ReactPlayer url={videoURL} controls={true}/>
        </div>
    </Fragment> */}

    <div className="App">
	<div className="search-box">
		<label>
			Search for any movies/shows:
		</label>
		<input type="text" onChange={(e) => { setVideo(e.target.value) }} />

		<button onClick={()=>{handleSearch()}}>
			Search
		</button>
	</div>

	<ReactPlayer url={videoURL} controls={true}/>
	</div>
    </>
  )
}

export default MovieTrailer