import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState } from "react";

const TrackPage = () => {
    const {id} = useParams();
    const {data} = useFetch(`http://localhost:8888/track/${id}`)
    //console.log(data)
    const {data: audioFeature} = useFetch(`http://localhost:8888/track-audio-features/${id}`)
    const [audioFeatureList, setAudioFeatureList] = useState({danceability: 0, energy: 0, speechiness: 0, acousticness: 0, instrumentalness: 0, liveness: 0, valence: 0})
    //console.log(audioFeatureList)

    useEffect(() => {
        if (audioFeature !== null) {
            setAudioFeatureList({danceability: audioFeature.danceability, energy: audioFeature.energy, speechiness: audioFeature.speechiness, acousticness: audioFeature.acousticness, instrumentalness: audioFeature.instrumentalness, liveness: audioFeature.liveness, valence: audioFeature.valence})
        }
    }, [audioFeature])

    //Return duration_ms in X:XX form (and drop ms component)
	function durationStr(duration_ms) {
		let minutes = duration_ms / 60000; //60 sec/min * 100ms/sec
		let seconds = duration_ms / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}

    function percentageString(percent) {
		return (percent*100).toFixed() + '%';
	}

    return (
        <div className="artist-page mx-3">
            {data !== null && audioFeatureList !== null && 
            <>
                <Row>
                    <Col lg={5}>
                        <h1>{data.name}</h1>
                        <p>
                            Track on <a href={`/album/${data.album.id}`}>{data.album.name}</a>
                        </p>
                        <div className="mt-2">
                            Artist: <a href={`/artist/${data.artists[0].id}`}>{data.artists[0].name}</a>
                        </div>
                        <div className="mt-2">
                            {durationStr(data.duration_ms)}
                        </div>
                        <div className="mt-3">
                            <Button variant="success" href={`${data.external_urls.spotify}`}>Open {data.name} on Spotify</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="mt-5">
                            {Object.keys(audioFeatureList).map((audio, id) => <ProgressBar key={id} variant="success" label={`${audio}:${percentageString(audioFeatureList[audio])}`} className="mt-2" now={audioFeatureList[audio]*100}/>)}
                        </div>
                    </Col>
                </Row>
            </>
            }
        </div>
    )
}

export default TrackPage;