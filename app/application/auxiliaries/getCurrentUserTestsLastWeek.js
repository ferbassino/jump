import client from "../../api/client";
import getCurrentUserTests from "./getCurrentUserTests";

const getCurrentUserTestsLastWeek = async (userId) => {
  const { allCurrentUserTests } = getCurrentUserTests(userId);
  try {
    // const allTests = await client.get("/api/motion/motionTests");
    // if (allTests.data.success) {
    //   const allCurrentUserTests = allTests.data.motionTests.filter(
    //     (el) => el.userId[0] === user.id
    //   );
    //   return allCurrentUserTests;
    // }
  } catch (error) {
    console.log(error);
  }
};

export default getCurrentUserTestsLastWeek;
