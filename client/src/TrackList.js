import { useState, useEffect } from "react";
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'

const TrackList = ({data, type, hideAlbum, hideArtist}) => {
    //let hideArtist = false;
    //let hideAlbum = false;
    //console.log(data)
    //console.log(type)
    const [dataArray, setDataArray] = useState(null);

    // do once when render
    useEffect(() => {
        if (type === 'homeTrack')
            setDataArray(data['tracks']['items'])
        else if (type === 'artistTrack')
            setDataArray(data['tracks'])
        else if (type === 'albumTrack')
            setDataArray(data['items'])
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
                            <a href={`/track/${track.id}`}>{track.name}</a>
                        </td>
                        <td>{durationStr(track.duration_ms)}</td>
                        {hideArtist === false && <td><a href={`/artist/${track.artists[0].id}`}>{track.artists[0].name}</a></td>}
                        {hideAlbum === false && <td><a href={`/album/${track.album.id}`}>{track.album.name}</a></td>}
                    </tr>
                ))}
                </tbody>
            </Table>}
      </Container>
    )
  }
   
  export default TrackList;


