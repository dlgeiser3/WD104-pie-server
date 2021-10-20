const router = require('express').Router();
const {PieModel} = require('../models');


router.get('/', async (req, res) => { //1

  try { //2
      const allPies = await PieModel.findAll(); //3

      res.status(200).json(allPies);
  } catch (err) {
    res.status(500).json({
        error: err
    })
  }
  
});

router.post('/', async (req, res) => {
  const {nameOfPie, baseOfPie, crust, timeToBake, servings, rating} = req.body; //4

  try { 
  
    const Pie = await PieModel.create({ //5
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      rating
    })
    
    res.status(201).json({ //6
      message: "Pie successfully created!",
      Pie
    })
    
  } catch (err) {
  
    res.status(500).json({
      message: `Failed to create pie: ${err}`
    })
    
  };
});

router.get('/name/:name', async (req, res) => { //7
  //console.log("NAME OF PIE: ", req.params.name)
  try{
    const locatedPie = await PieModel.findOne({
      where: {
        nameOfPie: req.params.name  //8
      }
    })

    res.status(200).json({
      message: "Pies successfully retrieved",
      pie: locatedPie
    })
    
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve pies: ${err}`
    })
  }
});

router.get('/id/:id', async (req, res) => {
 
  //console.log("ID OF PIE: ", req.params.id)
  try{
    const locatedPie = await PieModel.findOne({
      where: {
        id: req.params.id
      }
      
    })
    
    res.status(200).json({
      message: "Pies successfully retrieved",
      pie: locatedPie,

    })
    
  } catch (err) {
    res.status(500).json({
      message: `Failed to retrieve pies: ${err}`
    })
  }
});

router.put('/:id', async (req, res) => {
  const {nameOfPie, baseOfPie, crust, timeToBake, servings, rating} = req.body;

  try {
    const piesUpdated = await PieModel.update(
      {nameOfPie, baseOfPie, crust, timeToBake, servings, rating},
      {where: {id: req.params.id}}
    )

    res.status(200).json({
      message: "Pie successfully updated",
      piesUpdated
    })
  } catch (err) {
    res.status(500).json({
      message: `Failed to update pie: ${err}`
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await PieModel.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({
      message: "Pie successfully delete"
    })
    
  } catch (err) {
    res.status(500).json({
      message: `Failed to delete pie: ${err}`
    })
  }
});

module.exports = router;