import { useState, useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'

const TrackList = ({data}) => {
    let hideArtist = false;
    let hideAlbum = false;
    //console.log(data)
    const [dataArray, setDataArray] = useState(null);

    // do once when render
    useEffect(() => {
        setDataArray(data['tracks']['items'])
    }, [])
    //console.log(dataArray)

    //Return duration_ms in X:XX form (and drop ms component)
	function durationStr(duration_ms) {
		let minutes = duration_ms / 60000; //60 sec/min * 100ms/sec
		let seconds = duration_ms / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}

    return (
      <Container>
            {dataArray !== null && <Table className="table table-sm table-light table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Track</th>
                        <th scope="col">Duration</th>
                        {hideArtist === false && <th scope="col">Primary Artist</th>}
                        {hideAlbum === false && <th scope="col">Album</th>}
                    </tr>
                </thead>
                <tbody>
                {dataArray.map((track,index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/track/${track.id}`}>{track.name}</Link>
                        </td>
                        <td>{durationStr(track.duration_ms)}</td>
                        {hideArtist === false && <td>{track.artists[0].name}</td>}
                        {hideAlbum === false && <td>{track.album.name}</td>}
                    </tr>
                ))}
                </tbody>
            </Table>}
      </Container>
    )
  }
   
  export default TrackList;


