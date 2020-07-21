<template>
  <div id="app">
    <cb-button type="warning">测试按钮</cb-button>
    <cb-button class="btn-margin" type="warning" round>警告按钮</cb-button>
    <cb-button class="btn-margin" type="danger" round>危险按钮</cb-button>
    <cb-button class="btn-margin" type="info" icon="iconshanchu" round>删除</cb-button>
    <Icon type="ios-checkmark" />
    <div class="slect-class" style="width: 20%;margin-top: 30px">
        <Form ref="queryForm" :model="queryForm" :rules="queryFormRule" >
            <FormItem label="验证tree多选" prop="queryVal2">
              <UiIvewSelectTree v-model="queryForm.queryVal2" multiple showQuery clearable :treeData="treeData" @on-select-change="multipleChoice"></UiIvewSelectTree>
            </FormItem>
            <FormItem label="验证treeSelect单选" prop="queryVal1">
              <UiIvewSelectTree v-model="queryForm.queryVal1" filterable showQuery clearable :treeData="treeData" @on-select-change="singleChoice"></UiIvewSelectTree>
            </FormItem>
        </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      queryForm: {
        queryVal1: '',
        queryVal2: []
      },
      queryFormRule: {
        queryVal1: [
          {required: true, message: '单选下拉框的值不能为空', trigger: 'change'}
        ],
        queryVal2: [
          {required: true, message: '多选下拉框的值不能为空不能为空', trigger: 'change', type: 'array'}
        ]
      },
      treeData: [
        {
          title: '中国',
          expand: true,
          id: '1',
          children: [
            {
              title: '福建',
              expand: true,
              id: '11',
              children: [
                {
                  id: '111',
                  title: '宁德',
                  expand: true,
                  children: [
                    {
                      id: '111111',
                      title: '福安'
                    },
                    {
                      id: '2222222',
                      title: '寿宁'
                    },
                    {
                      id: '3333333',
                      title: '周宁'
                    }
                  ]
                },
                {
                  id: '112',
                  title: '厦门'
                },
                {
                  id: '1123',
                  title: '福建'
                },
                {
                  id: '1124',
                  title: '泉州'
                },
                {
                  id: '1125',
                  title: '莆田'
                }
              ]
            },
            {
              title: '广东',
              id: '12',
              expand: true,
              children: [
                {
                  id: '121',
                  title: '广州'
                },
                {
                  id: '122',
                  title: '深圳'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    submitBtn(){
      this.$refs.queryForm.validate((valid) => {
        if (valid) {
          console.log('成功')
        }else {
          console.log('失败')
        }
      })
    },
    multipleChoice(_title,_id){
      console.log('_title====', _title)
      console.log('_id====', _id)
      //this.$refs.queryForm.validate('queryVal2')
    },
    singleChoice(){
      //this.$refs.queryForm.validate('queryVal1')
    },
    checkForm() {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app{
    background-color: hotpink;
  }
</style>
