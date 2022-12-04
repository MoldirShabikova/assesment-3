module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) =>{
        const fortunes = ["All will go well with your new project!", "A pleasant surprise is waiting for you!", "A lifetime of happiness lies ahead of you", "A truly rich life contains love and art in abundance", "One can never fill another’s shoes, rather he must outgrow the old shoes!", "You are almost there!"];

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    }
}