import { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/esm/Container';
import useFetch from "./useFetch";

const About = () => {
    const [userName, setUsername] = useState("");
    const [profile, setProfile] = useState("https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png")
    const LoadInfo = () => {
      fetch('http://localhost:8888/me')
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data for that resource')
            }
            return res.json();
        }).then(data => {
            setUsername(data.display_name)
            setProfile(data.images[0].url)
        }). catch(err => {
            console.log(err.message)
        })
    }

    return (
      <Container>
        <div>
          <Button onClick={LoadInfo}>Load info about me</Button>
        </div>
        <Image src={profile} />
        <h3>Logged in user: {userName}</h3>
      </Container>
    )
  }
   
  export default About;


