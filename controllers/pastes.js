const Pastes= require("../models/Paste");

exports.getPaste = async (req, res) => {
  try {
    const pasteMessages = await Pastes.findOne({ idx: req.params.idx });
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getAllPastes = async (req, res) => {
  try {
    const userId= req.user.id;
    const pasteMessages = await Pastes.find({userId: userId});
    res.status(200).json(pasteMessages);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createPaste = async (req, res) => {
  const newPaste = new Pastes(req.body);
  newPaste.userId=req.user.id;
  try {
    // Check if ID already exists
    const pasteMessages = await Pastes.findOne({ idx: req.body.idx });

    if (pasteMessages) {
      console.log("Exists");

      throw new Error("pasteid-exists");
    } else {
      await newPaste.save();

      res.status(201).json(newPaste);
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({error: error.message});
  }
};

exports.editPaste = async (req, res) => {

  const editedPaste = req.body;

  try {
    await Pastes.findOneAndUpdate({ idx: req.params.idx }, editedPaste, function (err, doc) {
      if (err) return res.status(500).send({ error: err });

      if (doc) return res.status(200).json('Succesfully Updated.');
      return res.status(404).json('Document not found.');
    });

  } catch (error) {
    res.status(409).json({error: error.message});
  }
};

exports.deletePaste = async(req, res) => {

  try {
    await Pastes.findOneAndDelete({ _id: req.params.idx }, function (err, doc) {
      if (err) return res.status(500).json({ error: err });

      if (doc) return res.status(202).json("Successfully deleted");
      return res.status(404).json('Document not found.');
    });
  } catch (error) {
    res.status(409).json({error: error.message});
  }
};
