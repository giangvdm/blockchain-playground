// Get the sha256 hash function.
const crypto = require("crypto"),
    SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

/**
 * Class Block
 */
class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // previous block's hash
    }

    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }

    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

/**
 * Class Blockchain
 */
class Blockchain {
    constructor() {
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 10000;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(block);
        // Adjust difficulty
        this.difficulty += (Date.now() - parseInt(this.getLastBlock().timestamp)) < this.blockTime ? 1 : -1;
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = {Block, Blockchain };
