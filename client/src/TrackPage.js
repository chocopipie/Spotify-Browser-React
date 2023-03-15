import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Container from 'react-bootstrap/esm/Container';

const TrackPage = () => {
    const {id} = useParams();
    const {data} = useFetch(`http://localhost:8888/track/${id}`)
    //console.log(data)

    return (
        <Container>
            {data !== null && <div>{data.name}</div>}
        </Container>
    )
}

export default TrackPage;