export const createProductController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      messege: "Error while creating product",
      error,
    });
  }
};
