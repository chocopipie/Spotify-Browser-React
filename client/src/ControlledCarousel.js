import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom'

function ControlledCarousel({data, searchType}) {
  //console.log(data)
  //console.log(searchType)
  //console.log(data['artists']['items'])
  const [index, setIndex] = useState(0);
  const [dataArray, setDataArray] = useState(null);
  const [category, setCategory] = useState(null) 
  // do once when render
  useEffect(() => {
    if (searchType === 'artist') {
      setDataArray(data['artists']['items'])
      setCategory('artist')
    } else if (searchType === 'album') {
      setDataArray(data['albums']['items'])
      setCategory('album')
    } else if (searchType === 'similar-artist') {
      setDataArray(data['artists'])
      setCategory('artist')
    } else if (searchType === 'artist-album') {
      setDataArray(data['items'])
      setCategory('album')
    }
  }, [])
  //console.log(dataArray)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel">
      {dataArray !== null && <Carousel activeIndex={index} onSelect={handleSelect}>
        {dataArray.map((item,index) => (
          <Carousel.Item key={index}>
            {item.images.length > 0 &&
              <a href={`/${category}/${item.id}`}><img
              className="d-block w-100"
              src={item.images[0].url}
              alt="First slide"
              /></a>
            }
            <Carousel.Caption>
              <h3>{item.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      }
    </div>
  );
}

export default ControlledCarousel;