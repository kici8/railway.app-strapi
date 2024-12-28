export default {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // Generate a unique code for the room
    const generateRoomCode = async () => {
      let isUnique = false;
      let code;

      while (!isUnique) {
        // casual number of 7 or 8 digits
        code = Math.floor(1000000 + Math.random() * 9000000).toString();

        // Check if the code exist
        const existingRoom = await strapi.entityService.findMany(
          "api::room.room",
          {
            filters: { code: code },
          }
        );

        isUnique = existingRoom.length === 0;
      }

      return code;
    };

    // replace the coda data with the generated one
    data.code = await generateRoomCode();
  },
};
