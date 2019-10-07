import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { withRoomConsumer, RoomConsumer } from "../context";
import Loading from "./Loading";
import Title from "./Title";

function RoomContainer({ context }) {
  const { loading, rooms, sortedRooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList sortedRooms={sortedRooms} />
    </>
  );
}
export default withRoomConsumer(RoomContainer);

// import React from "react";
// import RoomFilter from "./RoomFilter";
// import RoomList from "./RoomList";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";

// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, rooms, sortedRooms } = value;
//         console.log(loading, rooms, sortedRooms);
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <div>
//             Hello from Room Container
//             <RoomFilter rooms={rooms} />
//             <RoomList sortedRooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
