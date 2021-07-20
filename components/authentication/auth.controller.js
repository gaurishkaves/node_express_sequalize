
const {login,logout} = require("./auth.service")


exports.login = async (req, res ,next)=>{
    try{
        const {password,email} = req.body
        //const password = req.body.password
        console.log(email)
        //if(!email || !password)
            //show error message
        var data = {"email":email,"password":password};
        console.log(data)
        let response = await login(data);

        res.json({response})

    }catch(error){
        console.log(error)
    }

}

exports.logout = (req,res,next)=>{


}

exports


