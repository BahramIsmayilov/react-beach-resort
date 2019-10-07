import React, { Component } from "react";
import Title from "../components/Title";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    const { loading, featuredRooms: rooms } = this.context;
    const featuredRooms = rooms.map(room => {
      return <Room key={room.id} room={room}></Room>;
    });

    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : featuredRooms}
        </div>
      </section>
    );
  }
}
