const Sharenergy = require('../models/SharenergyData');

module.exports = {

    async read(request,response){
        
        const priority = request.query;

        const priorityNotes = await Sharenergy.find(priority);

        return response.json(priorityNotes);
    },

    async update(request,response){
        const { id } = request.params;

        const sharenergy = await Sharenergy.findOne({_id : id});

        if(sharenergy.priority){
            sharenergy.priority = false;
        } else {
            sharenergy.priority = true;
        }

        await sharenergy.save();
        return response.json(sharenergy);
    }



}