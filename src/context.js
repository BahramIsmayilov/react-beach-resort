import React, { Component } from "react";
// import items from "./data";
import { client } from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    // contetful data
    client
      .getEntries({
        content_type: "beachResortRoom"
      })
      .then(response => this.formatData(response.items))
      .catch(console.error);
  }

  // componentDidMount() {
  //   // this.getData();
  //   this.formatData(items);
  // }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      // let images = item.fields.images.map(image => image.fields.file.url);
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, id, images };
      return room;
    });

    let featuredRooms = tempItems.filter(room => room.featured === true);
    let maxPrice = Math.max(...tempItems.map(item => item.price));
    let maxSize = Math.max(...tempItems.map(item => item.size));
    this.setState({
      rooms: tempItems,
      featuredRooms,
      sortedRooms: tempItems,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  getRoom = slug => {
    const tempRoom = [...this.state.rooms];
    const room = tempRoom.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    //all the rooms
    let tempRooms = [...rooms];
    //transform value
    capacity = parseInt(capacity);
    price = parseInt(price);
    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    //filter by capacity
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    //change state
    this.setState({
      sortedRooms: tempRooms
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
