export const generateRoomID = () => {
    let roomID = "";
    const chars =
      "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    const maxPos = chars.length;
  
    for (let i = 0; i < 8; i++) {
      roomID += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return roomID;
};