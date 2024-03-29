import React, { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultImg
    };
  }

  // componentDidMount() {}
  static contextType = RoomContext;
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    // console.log(room);
    if (!room) {
      return (
        <Hero className="defaultHero">
          <Banner
            title={`no such room 
          could be found...`}
          >
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </Hero>
      );
    }
    const {
      breakfast,
      capacity,
      description,
      extras,
      images,
      name,
      pets,
      price,
      size
    } = room;

    const [mainImage, ...defaultImgs] = images;

    return (
      <div>
        <StyledHero img={mainImage || this.state.defaultImg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImgs.map((image, index) => (
              <img key={index} src={image} alt={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity : {capacity} {capacity > 1 ? "people" : "person"}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"} </h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
      </div>
    );
  }
}
