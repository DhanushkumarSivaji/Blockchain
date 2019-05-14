var express  = require('express')
var app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const bitcoin = new Blockchain()
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/blockchain',function(req,res){
    res.send(bitcoin)
})

app.post('/transaction',function(req,res){
   const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient)
   res.send({note: `Transaction will be added in block ${blockIndex}`})
})


app.get('/mine',function(req,res){

    const lastBlock = bitcoin.getLastBlock();
    console.log("lastBlock",lastBlock)
    const previousBlockHash = lastBlock['hash'];
    console.log("previousBlockHash",previousBlockHash)
	const currentBlockData = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock['index'] + 1
    };
    console.log("currentBlockData",currentBlockData)
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    console.log("nonce",nonce)
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    console.log("blockHash",blockHash)
    bitcoin.createNewTransaction(12.5,"00",nodeAddress  )
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    
    res.json({
        note:"New Block Mined Successfully",
        block:newBlock
    })
    
})

app.listen(8888 , function(){
    console.log("server listening on port : 8888")
})