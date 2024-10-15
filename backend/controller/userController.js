const User = require('../models').User;

async  function getUsers(req,  res)
{
    try{
        const users =  await User.findAll();
        res.status(200).json({'status' : true,  'message' : 'success',  data : users}); // Respond with the list of users
    }
    catch (error) {
        console.log("error loaction controller/Users.js(getUsers)", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getUsers }; // Export the functions
