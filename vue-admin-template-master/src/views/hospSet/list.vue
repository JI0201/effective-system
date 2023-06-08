<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="findList()"
        >查询</el-button
      >
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactsName" label="联系人姓名" />
      <el-table-column prop="contactsPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >
          </el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 0)"
            >锁定</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHostSet(scope.row.id, 1)"
            >取消锁定</el-button
          >
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageNum"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="findList"
    />
  </div>
</template>
</el-table-column>
</el-table>
</div>
</template>


<script>
//引入接口定义的js文件
import hospSet from "@/api/hospSet";

export default {
  //定义变量和初始值
  data() {
    return {
      pageIndex: 1, //当前页
      pageNum: 3, //每页显示记录数
      total: 0, //总记录数
      searchObj: {}, //条件封装
      list: [], //煤业数据集合
      multipleSelection: [], //批量选择中选择的记录列表
    };
  },
  created() {
    //页面渲染之前
    this.findList();
  },
  methods: {
    findList(pageIndex = 1) {
      this.pageIndex = pageIndex;
      hospSet
        .getHospSetList(this.pageIndex, this.pageNum, this.searchObj)
        .then((res) => {
          this.list = res.data.records;
          this.total = res.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        hospSet
          .deleteHospSet(id)
          .then((res) => {
            if ((res.message = "成功")) {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              this.findList();
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: "warning",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    //批量删除
    removeRows() {
      this.$confirm("此操作将永久删除医院是设置信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //遍历数组获取id值
        var idlist = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idlist.push(id);
        }
        //确定执行then方法
        hospSet
          .batchHospSet(idlist)
          .then((res) => {
            if ((res.message = "成功")) {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              this.findList();
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: "warning",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    //复选框获取选择复选框得id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    //锁定和取消锁定
    lockHostSet(id, status) {
      hospSet.lockHospSet(id, status).then((res) => {
        //刷新
        this.findList();
      });
    },
  },
};
</script>