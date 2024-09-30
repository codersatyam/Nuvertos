const { Router } = require("express");
const {
  getCompound,
  getAllCompounds,
  updateCompound,
  createCompound

} = require("../controllers/compounds");

const AllRoutes = Router();


AllRoutes.get("/compound/:id", getCompound);
AllRoutes.get("/allcompounds", getAllCompounds);
AllRoutes.post("/updateCompound/:id",updateCompound)
AllRoutes.post("/createCompound", createCompound)


module.exports = AllRoutes;
