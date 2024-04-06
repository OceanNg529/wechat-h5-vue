<template>
  <el-drawer
    ref="drawer"
    :with-header="false"
    size="50%"
    :before-close="handleClose"
    :visible.sync="dialogFormVisible"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 100%; padding:10px; height: 100vh;overflow-y: scroll;">

        <el-tabs tab-position="top" style="height: 200px;">
          <el-tab-pane label="基本信息">
            <el-form-item label="question" prop="question">
              <el-input v-model="temp.question" clearable />
            </el-form-item>
            <el-form-item label="answer1" prop="answer1">
              <el-input v-model="temp.answer1" clearable />
            </el-form-item>
            <el-form-item label="answer2" prop="answer2">
              <el-input v-model="temp.answer2" clearable />
            </el-form-item>
            <el-form-item label="answer3" prop="answer3">
              <el-input v-model="temp.answer3" clearable />
            </el-form-item>
            <el-form-item label="answer4" prop="answer4">
              <el-input v-model="temp.answer4" clearable />
            </el-form-item>
            <el-form-item label="right" prop="right">
              <el-input v-model="temp.right" clearable />
            </el-form-item>
            <el-form-item label="text" prop="text">
              <el-input v-model="temp.text" clearable />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="文章详情">
            <el-form-item label="详情" prop="content">
              <el-input v-model="temp.content" rows="20" type="textarea" clearable />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

      </el-form>
      <div class="demo-drawer__footer" style="position:fixed;top:15px;right:30px;">
        <el-button size="mini" @click="$refs.drawer.closeDrawer()">取 消</el-button>
        <el-button size="mini" :loading="btnLoading" type="primary" @click="saveData()">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { getListAll as getListAllCate } from '@/api/categery'
import { getinfo, save } from '@/api/answer'
import myconfig from '@/settings.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'AnswerForm',
  components: {  },
  data() {
    return {
      btnLoading: false,
      cates: null,
      temp: {
        id: 0,
        cate_id: '',
        title: '',
        content: '',
        status: 1,
        sorts: 100,
        img: '',
        question:'',
        answer1:'',
        answer2:'',
        answer3:'',
        answer4:'',
        right:'',
        text:'',
      },
      config: {
        fileName: 'img',
        limit: 1,
        multiple: true,
        accept: 'image/*',
        action: myconfig.uploadUrl.img
      },
      header: {
        'x-access-appid': myconfig.appid,
        'x-access-token': getToken()
      },
      dialogFormVisible: false,
      rules: {}

    }
  },
  computed: {
  },
  watch: {
    dialogFormVisible: function() {
      this.resetTemp()
    },
    temp: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {},
      immediate: true,
      deep: true
    }
  },
  created() {
    this.getCates()
  },
  destroyed() {

  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleClose(done) {
      if (this.btnLoading) {
        return
      }
      this.$confirm('更改将不会被保存，确定要取消吗？')
        .then(_ => {
          this.dialogFormVisible = false
        })
        .catch(_ => {})
    },
    getCates() {
      getListAllCate().then(response => {
        this.cates = response.data.data
      })
    },
    resetTemp() {
      this.temp = {
        id: 0,
        cate_id: '',
        title: '',
        content: '',
        status: 1,
        sorts: 100,
        img: '',
        question:'',
        answer1:'',
        answer2:'',
        answer3:'',
        answer4:'',
        right:'',
        text:'',
      }
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.btnLoading = false
      this.currentIndex = -1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(id) {
      this.dialogFormVisible = true
      this.btnLoading = false
      const _this = this
      getinfo(id).then(response => {
        if (response.status === 1) {
          _this.temp.id = response.data.id
          _this.temp.cate_id = response.data.cate_id
          _this.temp.title = response.data.title
          _this.temp.content = response.data.content
          _this.temp.status = response.data.status
          _this.temp.sorts = response.data.sorts
          _this.temp.img = response.data.img
          _this.temp.question = response.data.question
          _this.temp.answer1 = response.data.answer1
          _this.temp.answer2 = response.data.answer2
          _this.temp.answer3 = response.data.answer3
          _this.temp.answer4 = response.data.answer4
          _this.temp.right = response.data.right
          _this.temp.text = response.data.text
        }
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    saveData() {
      this.btnLoading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const _this = this
          save(this.temp).then(response => {
            if (response.status === 1) {
              if (!_this.temp.id) {
                _this.temp.id = response.data.id
              }
              this.$emit('updateRow', _this.temp)
              _this.dialogFormVisible = false
              _this.$message.success(response.msg)
            } else {
              _this.$message.error(response.msg)
            }
            _this.btnLoading = false
          }).catch((error) => {
            _this.$message.error(error)
            this.btnLoading = false
          })
        } else {
          this.btnLoading = false
        }
      })
    }
  }
}
</script>
