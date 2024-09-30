const { error } = require("winston");
const { compounds } = require("../models"); 
require("dotenv").config();
const AllErrors = require("../domain/allError");
const allError = require("../domain/allError");




const createCompound = async (req, res) => {
  try {
    const {CompoundName, CompounrDescription, strImageSource, strImageAttribution } = req.body
    if(!CompoundName) throw allError.jsonFieldRequired("CompoundName")
    if(!CompounrDescription) throw allError.jsonFieldRequired("CompounrDescription")
    if (!strImageSource) throw allError.jsonFieldRequired("strImageSource")
    if(!strImageAttribution) throw allError.jsonFieldRequired("strImageAttribution")
    const newCompound = await compounds.create({
            CompoundName, CompounrDescription, strImageSource, strImageAttribution
          });
      
          res.status(201).json({ msg: "Success", data: newCompound });

  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
}


// Update the compound
const updateCompound = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "ID parameter is required" });
  }
  const { CompoundName, CompounrDescription, strImageSource } = req.body;
  const updateResBody = {};

    if (CompoundName) {
        updateResBody.CompoundName = CompoundName;
    }
    if (CompounrDescription) {
        updateResBody.CompounrDescription = CompounrDescription;
    }
    if (strImageSource) {
        updateResBody.strImageSource = strImageSource;
    }
  try {
    const compound = await compounds.findByPk(id);
    if (!compound) {
      return res.status(404).json({ msg: "compound not found" });
    }
    const updatedCompund= await compounds.update({
      updateResBody
    },{where : {id:id}});

    res.status(200).json({ msg: "Success", data: updatedCompund });
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};


// Get all compounds
const getAllCompounds = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; 
    const offset = (page - 1) * limit; 
    const allCompounds = await compounds.findAll({
      limit: parseInt(limit, 10), 
      offset: parseInt(offset, 10) 
  });

  const totalCount = await compounds.count();
  const totalPages = Math.ceil(totalCount / limit); 

  res.status(200).json({
      msg: "Success",
      data: allCompounds,
      meta: {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
      }
  });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

// Get compound by ID
const getCompound = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw allError.jsonFieldRequired("id")
    }
    const compoundDetails = await compounds.findOne({where :{id:id}}); 
    res.status(200).json({ msg: "Success", data: compoundDetails });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

module.exports = {
  getCompound,
  getAllCompounds,
  updateCompound,
  createCompound
};
