import request from '@/utils/request'

export default {
//医院列表
getHospList(page,limit,searchObj){
    return request({
        url:`/admin/hosp/hospital/list/${page}/${limit}`,
        method:"get",
        params:searchObj
    })
},

//根据dictcode查询所有省份
findByDictCode(dictCode){
    return request({
        url:`/admin/cmn/dict/findByDictCode/${dictCode}`,
        method:"get"
    })
},
//根据数据id查询子数据列表
findChildId(id){
    return request({
        url:`/admin/cmn/dict/findChildData/${id}`,
        method:"get"
    })
},
//更新医院上线下线
updateStatus(id,status){
    return request({
        url:`/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
        method:"get"
    })
},
//查看
//查看医院详情
getHospById(id) {
    return request ({
      url: `/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  }
  

}