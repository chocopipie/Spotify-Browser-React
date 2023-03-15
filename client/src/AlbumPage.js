import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Container from 'react-bootstrap/esm/Container';

const AlbumPage = () => {
    const {id} = useParams();
    const {data} = useFetch(`http://localhost:8888/album/${id}`)
    //console.log(data)

    return (
        <Container>
            {data !== null && <div>{data.name}</div>}
        </Container>
    )
}

export default AlbumPage;