import client from "../../api/client";

const getCurrentUserTests = async (userId) => {
  try {
    const allTests = await client.get("/api/motion/motionTests");
    if (allTests.data.success) {
      const allCurrentUserTests = allTests.data.motionTests.filter(
        (el) => el.userId[0] === userId
      );

      return allCurrentUserTests;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getCurrentUserTests;
