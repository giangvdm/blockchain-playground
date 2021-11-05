const Block = require("./Block.js"),
    Blockchain = require("./Blockchain.js");

const randomstring = require("randomstring");

    // console.log(new Blockchain())

const JangChain = new Blockchain();

for (let i = 0; i < 2; i++) {
    JangChain.addBlock(
        new Block(
            Date.now().toString(),
            {
                from: randomstring.generate(7),
                to: randomstring.generate(7),
                amount: Number((Math.random() * 100).toFixed(2))
            }
        )
    );
}

console.log(JangChain.chain);