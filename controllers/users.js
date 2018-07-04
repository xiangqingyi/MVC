var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('/users/list');
 return res.redirect('login')
});
// router.post('/login',function(req,res) {
//   //  固定的用户名和密码
// })
router.post('/',function(req,res) {   // 给定的用户名和密码
  const superuser = {
    name:"admin",
    password:"123456"
  }
  if(superuser.name == req.body.name && superuser.password == req.body.password){
    return res.send(200)
  }
    // const sname = req.body.sname
    // superModel.findOne({name:sname},function(error,doc) {
    //   if(error) {
    //     res.send(500)
    //     console.log(error)

    //   }else if(!doc) {
    //     req.session.error = "用户名不存在"
    //     res.send(404)
    //   }else{
    //     if(req.body.spwd !== doc.password){
    //       res.session.error = "密码错误"
    //       res.send(404)
    //     }else{
    //       req.session.super = doc
    //       res.redirect('/user/list')
    //     }
    //   }
    // })
})

// 用户列表
router.get('/list',function(req,res,next) {
  userModel.find(function(err,data) {
    if(err) {
      return console.log(err)
    }
    res.render('UserList',{
      user:data
    })
  })
})

// 用户详情
router.get('/detail/:id',function(req,res) {
  const id = req.params.id;   //和body的区别
  userModel.findOne({_id:id},function(err,data) {
    if(err) {
      return console.log(err)
    }
    res.render('UserDetail',{
      user:data
    })
  })
})


// 添加
router.get('/add',function(req,res,next) {
  res.render('UserAdd')
})
// post
router.post('/add',function(req,res,next) {
  const newUser = new userModel({
    username:req.body.username,
    email:req.body.email
  })
  newUser.save(function(err,data) {
    if(err) {
      return console.log(err)
    }
    res.redirect('/users/list')
  })
})

// 编辑更新用户
router.get('edit/:id',function(req,res,next) {
  const id = req.params.id
  userModel.findOne({_id:id},function(err,data) {
    res.render('UserEdit',{
      user:data
    })
  })
})
router.post('/update',function(req,res,next) {
  const id = req.body.id
  userModel.findById(id,function(err,data){
    if(err) 
    {
      return console.log(err)
    }
    data.username = req.body.username
    data.email = req.body.email
    data.save(function(err) {
      res.redirect('/users/list')
    })
  })
})

// 删除用户
router.delete('/del',function(req,res) {
  const id = req.query.id
  userModel.remove({_id:id},function(err,data) {
    if(err) {
      return console.log(err) 
    }
    res.json({
      code:200,
      msg:'删除成功'
    })
  })
})


module.exports = router;
