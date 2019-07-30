let express = require('express');
let fs = require('fs');
let path = require('path');
let router = express.Router();
let multiparty = require('multiparty');
let apiHelper = require("../common/api-helper");
let config = require("../config/config");

/* 新建 */
//0077003 分页获取赛道的列表
router.post('/pageTrackList', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/pageTrackList";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});

//0077004 关闭或开启赛道
router.post('/closeTrack', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/closeTrack";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});

//0077001 获取新建赛道的相关字段
router.post('/trackEnums', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/trackEnums";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});

//0077002 新建或修改赛道
router.post('/addOrModifyTrack', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/addOrModifyTrack";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});

//007013获取机构信息
router.post('/listSubNormArea', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/matchInfo/listSubNormArea";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});


/* 评审标准 */
//0077009 列出有效赛道
router.post('/listTrack', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/listTrack";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770014 根据赛道id获取专家类型和组别
router.post('/professorTypeAndTypeName', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/professorTypeAndTypeName";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770010 添加通用模板的字段
router.post('/addComTypeField', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/addComTypeField";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770015 删除通用字段接口
router.post('/delComTypeField', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/delComTypeField";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770012 根据塞到id和小组id查找对应的规则
router.post('/groupExistSetting', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/groupExistSetting";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});


/* 专家 */
//0077008 切换赛道获取相应的字段信息
router.post('/professorFieldInfo', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/professorFieldInfo";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//0077005 新增模板的扩展字段
router.post('/addField', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/addField";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//0077006 删除模板的扩展字段
router.post('/delField', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/delField";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//0077007 保存修改模板字段
router.post('/saveTemplateExtendField', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/saveTemplateExtendField";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770020  根据赛道id获取选手的配置字段
router.post('/teamMemberFields', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/teamMemberFields";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});
//00770021  保存选手的配置字段信息
router.post('/saveTeamMemberFields', (req, res)=>{
    let path = config.allUrlSet.url.platformPort1+"match-boot/admin/track/saveTeamMemberFields";
    apiHelper.getPlatformApi(path,null,req,res).then((data)=>{
        res.send(data);
    });
});

module.exports = router;
