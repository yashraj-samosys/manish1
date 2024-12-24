var homeController=function(){}

homeController.index=function(req,res){
    req.flash('success', 'Welcome to Refferal App');
    res.render('home/index',{title:'Refferal App'});
}

module.exports=homeController