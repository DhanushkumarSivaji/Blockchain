const Blockchain =  require('./blockchain')

const bitcoin = new Blockchain()

bitcoin.createNewBlock(1234,"9-04imfgoiokdfs","wrfgu8y32r0")

bitcoin.createNewTransaction(10,"Dha1233443","ku132435")

bitcoin.createNewBlock(123,"34565-04imfgoiokdfs","wrfgu8346ty32r0")

console.log(bitcoin)