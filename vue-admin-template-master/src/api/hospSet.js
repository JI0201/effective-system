import request from '@/utils/request'

export default {
  getHospSetList(pageIndex,pageNum,searchObj){
    return request({
        url:`/admin/hosp/hospitalSet/findPageHospitalSets/${pageIndex}/${pageNum}`,
        method:"post",
        data:searchObj
    })
  },
  //删除医院设置
  deleteHospSet(id) {
    return request ({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  //批量删除
  batchHospSet(idList){
   return request({
    url:"/admin/hosp/hospitalSet/batchRemove",
    method:"delete",
    data:idList
   })
  },
  //状态更改
  lockHospSet(id,status){
    return request({
      url:`/admin/hosp/hospitalSet/lockHospSet/${id}/${status}`,
      method:"get"
    })
  },
  //添加医院设置
  saveHospSet(hospitalSet){
    return request({
      url:"/admin/hosp/hospitalSet/saveHospitalSet",
      method:"post",
      data:hospitalSet
    })
  },
  //医院设置id查询功能
  getHospSet(id){
    return request({
      url:`/admin/hosp/hospitalSet/getHospSet/${id}`,
      method:"get"
    })
  },
  //修改医院设置
  updateHospSet(hospitalSet){
    return request({
      url:"/admin/hosp/hospitalSet/updateHospSet",
      method:"post",
      data:hospitalSet
    })
  }
}