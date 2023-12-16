const trService = require('../services/services');


async function userLogin(req,res){
    try{
        const result = await trService.userLogin(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function userRegister(req,res){
    try{
        const result = await trService.userRegister(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function getUser(req,res){
    try{
        const result = await trService.getUser(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function deleteUser(req,res){
    try{
        const result = await trService.deleteUser(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function addWallet(req,res){
    try{
        const result = await trService.addWallet(req.body,req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function showWallet(req,res){
    try{
        const result = await trService.showWallet(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function addTransactions(req,res){
    try{
        const result = await trService.addTransactions(req.body,req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function showTransactions(req,res){
    try{
        const result = await trService.showTransactions(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function updateWallet(req,res){
    try{
        const result = await trService.updateWallet(req.body,req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function updateTransactions(req,res){
    try{
        const result = await trService.updateTransactions(req.body,req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function addPayment(req,res){
    try{
        const result = await trService.addPayment(req.body,req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

module.exports = {
    userLogin,
    userRegister,
    getUser,
    deleteUser,
    addWallet,
    showWallet,
    addTransactions,
    showTransactions,
    updateWallet,
    updateTransactions,
    addPayment
}