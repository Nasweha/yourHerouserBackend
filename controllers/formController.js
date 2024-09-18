



const Grievance = require('../models/formSchema'); 
const sendGrievanceEmail = require('../services/sendEmail'); 

// Controller to handle adding a grievance
exports.addForm = async (req, res) => {
  console.log('Inside add grievance request');

  const userId = req.payload; 
  console.log('User ID:', userId);

  const { fullname, emailId, phone, date, address, description } = req.body;

  try {
    
    const grievanceData = {
      fullname,
      emailId,
      phone,
      date,
      address,
      description,
      userId,
      status: '', 
    };

 
    
    const newGrievance = new Grievance(grievanceData);
    await newGrievance.save();

    
    await sendGrievanceEmail(newGrievance);

    
    res.status(201).json({ message: 'Grievance saved successfully', grievance: newGrievance });
  } catch (error) {
    console.error('Error submitting grievance:', error);
    res.status(500).json({ message: 'Error submitting grievance', error: error.message });
  }
};
