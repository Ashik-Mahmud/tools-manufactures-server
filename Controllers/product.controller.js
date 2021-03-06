const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const productCollection = client.db("tools-manufactures").collection("products")

const saveProductData = async (req,res) =>{
   await client.connect();
   const decodedID = req.decoded.uid;
   const uid = req.query.uid;
   const data = req.body;
   if(decodedID === uid){
       const result = await productCollection.insertOne(data);
       if(result.acknowledged){
           res.send({success: true, message:"Product created successfully"})
       }
   }else{
       res.status(403).send({success:false, message:"Forbidden request"})
   }
}

const patchProductData = async (req, res) => {
   await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;   
    const data = req.body;
    const productId = req.query.productId;
    if(userId === decodedID){
        const currentProduct = await productCollection.findOne({_id: ObjectId(productId)});
        const nowAvailableQty = Number(currentProduct?.availableQty);
        const restAvailableQty = nowAvailableQty - Number(data?.orderQty);
        const updateDoc = {
            $set: {
                availableQty: restAvailableQty
            }
        }
        const result = await productCollection.updateOne({_id: ObjectId(productId)}, updateDoc);
        if(result.acknowledged){
            res.send({success: true, message: 'Available Quantity decrease.'})
        }
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
  
}

const patchUpdateStock = async(req, res, next) => {
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    const data = req.body;
  
    if(userId === decodedID){
        const query = {_id: ObjectId(data?.productId)}
        const findProduct = await productCollection.findOne(query);
        const nowAvailableQty = Number(findProduct.availableQty);
        const updateStock = nowAvailableQty + Number(data?.stock)
        const updateDoc = {
            $set:{
                availableQty: updateStock
            }
        }
        const result = await productCollection.updateOne(query, updateDoc)
        if(result.acknowledged){
            res.send({success: true, message:'Update stock successfully done.'})
        }
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}




const getProductData = async (req, res) => {
   await client.connect();

    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    if(decodedID === uid){
        const result = await productCollection.find({}).skip(page * limit).limit(limit).toArray();
        const count = await productCollection.estimatedDocumentCount();
        res.send({success: true, result, count})
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}


const deleteProductData = async (req, res) => {
   await client.connect();

    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    const dltId = req.query.deleteId;
    if(decodedID === uid){
        const query ={_id: ObjectId(dltId)}
        const result = await productCollection.deleteOne(query);
        if(result.acknowledged){
            res.send({success: true, message: "Product deleted successfully"})
        }
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}

const getPurchaseProductData = async (req, res) => {
   await client.connect();

    const decodedID = req.decoded.uid;
    const userId = req.query.uid;
    const purchaseId = req.query.purchaseId;
    
    if(decodedID===userId){
        const query ={_id: ObjectId(purchaseId)}
        const resultOne = await productCollection.findOne(query);
        res.send({success: true, result: resultOne})
    }else{
        res.status(403).send({success: false, message:"Forbidden request"})
    }
}

const getAllProducts = async (req, res) => {
    await client.connect()
    const result = await productCollection.find({}).toArray();
    res.send({success: true, result: result})
}


/* get searched value for users */
const getSearchedProduct = async (req, res) => {
    await client.connect()
    const searchText = req.query.q.toLowerCase();
    const result = await productCollection.find({}).toArray();
    const searchedResult = result.filter(product => product.productName.toLowerCase().includes(searchText));
    res.send({success: true, searchedResult: searchedResult})    
}



module.exports = {saveProductData, getProductData, deleteProductData, getPurchaseProductData, getAllProducts,patchProductData,patchUpdateStock, getSearchedProduct}