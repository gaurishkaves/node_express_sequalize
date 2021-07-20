const model = require('../../models')
const Users = model.users


exports.getAllUsers = async (req ,res,next)=>{
    const userData = await Users.findAll()
    return res.send(userData)
}


exports.getUser = async (req ,res,next)=>{
    let userId = req.params.id;
    if(isNaN(userId))
        return res.status(400).send("Invalid User id !")
    const userData = await Users.findOne({where:{'user_id':userId}})

    if(!userData){
        return res.status(404).send("User not found !")
    }else{
        return res.send(userData)
    }


}


exports.addUser = async(req,res,next)=>{
    let data ={};
    data.name = req.body.name
    data.email = req.body.email

    const userData = await Users.create(data);
    if(!userData){
        return res.status(400).send("Error Adding User!")
    }else{
        return res.send(userData)
    }
}

exports.updateUser = async (req ,res,next)=>{
    let userId = req.params.id;
    let data ={};
    data.name = req.body.name
    data.email = req.body.email

    if(isNaN(userId))
        return res.status(400).send("Invalid User id !")
    const userData = await Users.update(data,{where:{'user_id':userId}})

    if(userData==0){
        return res.status(404).send("User not update found !")
    }else{
        console.log(userData)
        return res.send(userData)
    }
}

exports.deleteUser = async (req ,res,next)=>{
    let userId = req.params.id;


    if(isNaN(userId))
        return res.status(400).send("Invalid User id !")
    const userData = await Users.destroy({where:{'user_id':userId}})

    if(!userData){
        return res.status(404).send("User not found !")
    }else{
        return res.status(200).send("User deleted !")
    }
}
