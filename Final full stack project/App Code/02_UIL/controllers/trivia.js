const bll = require('./../../01_BLL/index');

function addTriviaController(app) {

    app.get("/api/trivia/question/:subject", async(req, res) => {
           let triviaQuery= await bll.getTriviaQuery(req.params.subject);
           res.status(200).send(triviaQuery);
    });

    app.post("/api/trivia/answer", (req, res) => {

    });


}

module.exports = {
    addTriviaController
}