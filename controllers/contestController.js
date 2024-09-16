const Contest = require('../models/contestModel');

// GET all contests
exports.getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contests', error });
    }
};

// GET a single contest by ID
exports.getContestById = async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id);
        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }
        res.status(200).json(contest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contest', error });
    }
};

// CREATE a new contest
exports.createContest = async (req, res) => {
    console.log(req.body)
    try {
        const newContest = new Contest(req.body);
        await newContest.save();
        res.status(201).json(newContest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating contest', error });
    }
};

// UPDATE a contest by ID
exports.updateContest = async (req, res) => {
    try {
      const contest = await Contest.findById(req.params.id);  // Validate the ID first
      if (!contest) {
        return res.status(404).json({ message: 'Contest not found' });
      }
  
      // Then update the contest if found
      Object.assign(contest, req.body);
      await contest.save();
      res.status(200).json(contest);
    } catch (error) {
      res.status(500).json({ message: 'Error updating contest', error });
    }
  };
  

// DELETE a contest by ID
exports.deleteContest = async (req, res) => {
    try {
        const contest = await Contest.findByIdAndDelete(req.params.id);
        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }
        res.status(200).json({ message: 'Contest deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contest', error });
    }
};


// Controller function to update only the isActive field
exports.updateIsActive = async (req, res) => {
    console.log(req.body)
    const { id } = req.params; // Extracting id from the request params
    const { isActive } = req.body; // Extracting isActive from the request body
    console.log(id, isActive)

    try {
        // Find the contest by ID and update the isActive field
        const contest = await Contest.findByIdAndUpdate(
            id,
            { isActive: isActive }, // Only update the isActive field
            { new: true } // Return the updated contest document
        );

        // If no contest is found, return a 404 error
        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        // Return the updated contest
        res.status(200).json(contest);
        console.log(contest)
    } catch (error) {
        // Handle any errors during the update process
        res.status(500).json({ message: 'Error updating isActive status', error });
    }
};
