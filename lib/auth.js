module.exports = {
    checkLogin:function(request, response){
        if(request.user)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}