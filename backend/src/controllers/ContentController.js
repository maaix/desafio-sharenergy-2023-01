const Sharenergy = require('../models/SharenergyData');

module.exports = {

    async update(request,response){

        const {id} = request.params;
        const {notes} = request.body;
        const sharenergy = await Sharenergy.findOne({_id : id});


        if (notes){
            sharenergy.notes = notes;
            await sharenergy.save();
        }

        return response.json(sharenergy);
    }


}