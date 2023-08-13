module.exports = {
    checkLogin:function(request, response){
        if(request.session.isLogin)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}