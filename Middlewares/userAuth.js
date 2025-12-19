const isLogged = (req,res,next)=>{
    if(req.session.user){
        res.redirect("/")
    }else{
        next()
    }
}

const checkLogged = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
}

module.exports = {
    isLogged,
    checkLogged
}