import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app=express()
const port=process.env.PORT || 3000
app.use(express.json())
let teaData=[]
let nextId=1
//add a new tea
app.post('/teas',(req,res)=>{
    console.log("POST");
    const {name,price}=req.body
    const newTea={id:nextId++,name,price}
    teaData.push(newTea) 
    res.status(201).send(newTea)  
})
//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})
//get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id', (req, res) => {
    console.log("Update request received");
    console.log(req.params.id);

    const index = teaData.findIndex(
        t => t.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send("Tea not found");
    }

    // Update the tea
    teaData[index] = {
        ...teaData[index],
        ...req.body
    };

    res.status(200).json({
        message: "Tea updated successfully",
        updatedTea: teaData[index]
    });
});
//delete tea
app.delete('/teas/:id', (req, res) => {
    console.log("Delete request received");
    console.log(req.params.id);

    const index = teaData.findIndex(
        t => t.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send("Tea not found");
    }

    // Remove the tea from the array
    const deletedTea = teaData.splice(index, 1);

    res.status(200).json({
        message: "Tea deleted successfully",
        deletedTea: deletedTea[0]
    });
});
app.listen(port,()=>{
    console.log(`Server is running at port:${port}...`);
})