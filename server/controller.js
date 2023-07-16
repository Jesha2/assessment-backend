const { application } = require("express");

const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
// in controller the arrow functions gets a : instead of = bcoz we are creating objects and the name is key and value is its  function.

module.exports = {

    getComplimentAll:(req,res)=>{
        res.status(200).send(compliments);
    },

    getCompliment: (req, res) => {
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        res.status(200).send(randomCompliment);
    },

    addCompliment: (req, res) =>{
        compliments.push(req.body.newCompliment);
        //console.log(compliments);
        res.status(200).send("Your Compliment :- "+req.body.newCompliment+ "has been added successfully");
    },

    updateCompliment:(req,res)=>{
        console.log("inside update");
        const compliment = req.body.oldCompliment;
        const {newCompliment} = req.body;

        console.log("updating "+ compliment);
        let updateIndex = compliments.indexOf(compliment);
        console.log(updateIndex);
        compliments[updateIndex] = newCompliment;
        console.log("***updated");
        res.status(200).send(compliment +" update was success");
    },

    deleteCompliment:(req,res)=>{
        console.log("inside delete");
        const {compliment} = req.body;
        console.log(compliment);
        let deleteIndex = compliments.indexOf(compliment);
        console.log(deleteIndex);
        compliments.splice(deleteIndex,1);
        console.log("***deleted");
        res.status(200).send(compliment +" Delete was success");

    },

    getFortune: (req, res) => {
        const fortunes = ["All will go well with your new project","A pleasant surprise is waiting for you.","A lifetime of happiness lies ahead of you.","A friend is a present you give yourself.","A smile is your personal welcome mat."];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        res.status(200).send(fortunes[randomIndex]);
    }

}