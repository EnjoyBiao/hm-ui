<template>
  <div class="ivu-select ivu-select-default">
    <div tabindex="0" class="ivu-select-selection ivu-form-item-content">
      <div @mouseover="mouseover" @mouseleave.stop="mouseleave">
        <div @click="clickInputShow">
          <div v-for="(item,index) in multipleShowVal" :key="item" class="ivu-tag ivu-tag-checked ">
            <span v-if="multiple" class="ivu-tag-text ">{{ item }}</span>
            <i v-if="multiple" class="ivu-icon ivu-icon-ios-close" @click.stop="removeVal(index)"></i>
          </div>
          <span  v-if="!multiple && queryVal !== ''" class="ivu-select-selected-value">{{ queryVal }}</span>
          <span v-if="multipleHideVal.length === 0 && multiple " class="ivu-select-placeholder" style="">请选择</span>
          <span v-if=" isShowSelectWord && !multiple && !queryVal " class="ivu-select-placeholder" style="">请选择</span>
          <span class="" style="display: none;"></span>
        </div>
        <i :class="'ivu-icon ivu-icon-' + iconVal + ' ivu-select-arrow'" @click="clickIcon"></i>
      </div>
      <div
        @mouseleave="fartherMouseleave"
        v-show="showTree"
        class="ivu-select-dropdown"
        style="max-height: 200px;overflow-y:scroll;z-index:9999;width:100%;"
      >
        <div v-show="showQuery" style="width: 95%;margin-left: 10px;">
          <Input v-model="queryTreeVal" clearable placeholder="请输入筛选条件" @on-change="selectTreeChange" />
        </div>
        <div style="width: 95%;margin-left: 10px;">
          <Tree ref="tree" :data="queryData" :multiple="multiple" @on-select-change="selectChange"></Tree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiIvewSelectTree',
  props: {
    treeData: { // 下拉树数组
      type: Array,
      default: function () {
        return []
      }
    },
    value: { // 指定选中项目的 value 值，可以使用 v-model 双向绑定数据。单选时只接受 String 或 Number，多选时只接受 Array
      type: [String, Array],
      default: function () {
        return this.multiple ? [] : ''
      }
    },
    filterable: { // 是否支持搜索
      type: Boolean
    },
    multiple: { // 是否允许多选
      type: Boolean
    },
    clearable: { // 是否可以清空选项，只在单选时有效
      type: Boolean
    },
    showQuery: { // 是否展示下拉的搜索框
      type: Boolean
    }
  },
  data () {
    return {
      isShowSelectWord: false,
      queryVal: '',
      hideValue: '',
      valueType: 'string',
      selectNode: [],
      multipleShowVal: [],
      multipleHideVal: [],
      showTree: false,
      iconVal: 'ios-arrow-down',
      cloneData: JSON.parse(JSON.stringify(this.treeData)),
      showData: [],
      queryData: [],
      queryTreeVal: ''
    }
  },
  methods: {
    clickIcon () {
      if (this.iconVal === 'ios-close-circle') {
        this.clearVal()
      } else {
        this.showSelectTree()
      }
    },
    pickTree (val) {
      if (this.valueType === 'string') {
        for (let i = 0; i < this.showData.length; i++) {
          if (this.showData[i].value === val) {
            this.showData[i].selected = false
          } else if (this.showData[i].children !== undefined) {
            this.recursionPickTree(val, this.showData[i].children)
          }
        }
      } else {
        for (let j = 0; j < val.length; j++) {
          for (let i = 0; i < this.showData.length; i++) {
            if (this.showData[i].value === val[j]) {
              this.showData[i].selected = false
            } else if (this.showData[i].children !== undefined) {
              this.recursionPickTree(val[j], this.showData[i].children)
            }
          }
        }
      }
    },
    recursionPickTree (val, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === val) {
          data[i].selected = false
        } else if (data[i].children !== undefined && data[i].children.length > 0) {
          this.recursionPickTree(val, data[i].children)
        }
      }
    },
    selectTreeChange () {
      this.queryData = JSON.parse(JSON.stringify(this.showData))
      if (this.queryTreeVal !== '') {
        let removeData = []
        for (let i = 0; i < this.queryData.length; i++) {
          let check = this.recursionTreeData(this.queryTreeVal, this.queryData[i])
          if (!check) {
            removeData.push(i)
          }
        }
        this.queryData = this.queryData.filter((o, index) => {
          return !removeData.includes(index)
        })
      }
    },
    recursionTreeData (query, data) {
      let isCheck = false
      let removeData = []
      // 只验证最底层的节点是否有符合要求的值
      if (data.children !== undefined) {
        for (let i = 0; i < data.children.length; i++) {
          if (!isCheck) {
            isCheck = this.recursionTreeData(query, data.children[i])
            if (!isCheck) {
              removeData.push(i)
            }
          } else {
            if (!this.recursionTreeData(query, data.children[i])) {
              removeData.push(i)
            }
          }
        }
      } else {
        // 验证当前节点是否有符合要求的值
        if (data.title.indexOf(query) !== -1) {
          return true
        } else {
          return false
        }
      }
      data.children = data.children.filter((o, index) => {
        return !removeData.includes(index)
      })
      // 如果子节点中有一个符合要求，则父节点就直接返回true，不做删除，若子节点没有一个符合要求，则再次验证当前的节点
      if (isCheck) {
        return isCheck
      }
      // 表示当前的节点有值在里面
      if (data.title.indexOf(query) !== -1) {
        return true
      } else {
        return false
      }
    },
    clearVal () {
      if (this.clearable && !this.multiple && this.iconVal === 'ios-close-circle') {
        this.pickTree(this.hideValue)
        this.queryVal = ''
        this.hideValue = ''
        this.isShowSelectWord = true
        if (this.showTree) {
          this.iconVal = 'ios-arrow-up'
        } else {
          this.iconVal = 'ios-arrow-down'
        }
        this.$emit('input', '')
      }
    },
    mouseover () {
      if (this.clearable && !this.multiple && this.iconVal !== 'ios-close-circle' && this.hideValue !== '') {
        this.iconVal = 'ios-close-circle'
        this.showTree = true
      }else {
        this.showTree = false
      }
    },
    fartherMouseleave(){
      this.showTree = false
    },
    mouseleave () {
      if (this.clearable && !this.multiple) {
        if (this.showTree) {
          this.iconVal = 'ios-arrow-up'
        } else {
          this.iconVal = 'ios-arrow-down'
        }
      }
    },
    selectChange (obj) {
      let hideVal
      let showVal
      if (this.multiple) {
        this.multipleShowVal = []
        this.multipleHideVal = []
        for (let i = 0; i < obj.length; i++) {
          this.multipleShowVal.push(obj[i].title)
          this.multipleHideVal.push(obj[i].id)
        }
        this.$emit('input', this.multipleHideVal)
        hideVal = this.multipleHideVal
        showVal = this.multipleShowVal
        this.$emit('on-select-change',showVal,hideVal)
      } else {
        if (obj.length === 0) {
          this.queryVal = ''
          this.hideValue = ''
          this.$emit('input', '')
        } else {
          this.queryVal = obj[0].title
          this.hideValue = obj[0].id
          this.$emit('input', obj[0].title)
        }
        this.showTree = false
        this.iconVal = 'ios-arrow-down'
        hideVal = this.hideValue
        showVal = this.queryVal
        this.$emit('on-select-change', this.queryVal, this.hideValue)
      }
    },
    // 点击图标的时候展示树形菜单
    clickInputShow () {
      this.showSelectTree()
    },
    showSelectTree () {
      if (this.showTree) {
        this.showTree = false
      } else {
        this.showTree = true
      }
      if (this.iconVal !== 'ios-close-circle') {
        if (this.iconVal === 'ios-arrow-down') {
          this.iconVal = 'ios-arrow-up'
        } else if (this.iconVal === 'ios-arrow-up') {
          this.iconVal = 'ios-arrow-down'
        }
      }
    },
    // 重置菜单的数据
    resetTreeData () {
      this.cloneData = JSON.parse(JSON.stringify(this.treeData))
    },
    // 多选模式的时候删除节点的数据
    removeVal (index) {
      for (let i = 0; i < this.showData.length; i++) {
        if (this.showData[i].value === this.multipleHideVal[index]) {
          this.hideValue = this.treeData[i].value
          this.queryVal = this.treeData[i].title
          this.showData[i].selected = false
        } else if (this.showData[i].children !== undefined) {
          this.recursionRemoveTreeData(this.showData[i].children, this.multipleHideVal[index])
        }
      }
      this.multipleShowVal.splice(index, 1)
      this.multipleHideVal.splice(index, 1)
    },
    recursionRemoveTreeData (data, val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === val) {
          data[i].selected = false
          return
        } else if (data[i].children !== undefined && data[i].children.length > 0) {
          this.recursionRemoveTreeData(data[i].children, val)
        }
      }
    },
    // 验证当前下拉,单选时候value为string，多选的时候为arry
    checkValueType () {
      if (typeof this.value !== 'string') {
        this.valueType = 'array'
      }
    },
    initQueryMultiple () {
      for (let i = 0; i < this.value.length; i++) {
        for (let j = 0; j < this.cloneData.length; j++) {
          if (this.cloneData[j].value === this.value[i]) {
            this.multipleShowVal.push(this.cloneData[j].title)
            this.multipleHideVal.push(this.cloneData[j].id)
            this.$emit('input', this.multipleHideVal)
            this.cloneData[j].selected = true
            break
          } else if (this.cloneData[j].children !== undefined) {
            this.recursionQueryTreeData(this.cloneData[j].children, this.value[i])
          }
        }
      }
    },
    initQueryVal () {
      this.$emit('input', '')
      this.isShowSelectWord = this.value.length ? false : true
      for (let i = 0; i < this.cloneData.length; i++) {
        if (this.cloneData[i].title === this.value) {
          this.hideValue = this.cloneData[i].id
          this.queryVal = this.cloneData[i].title
          this.$emit('input', this.cloneData[i].id)
          this.cloneData[i].selected = true
          return
        } else if (this.cloneData[i].children !== undefined) {
          this.recursionQueryTreeData(this.cloneData[i].children, this.value)
        }
      }
    },
    recursionQueryTreeData (data, val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === val) {
          // 当前会多选
          if (this.multiple) {
            this.multipleShowVal.push(data[i].title)
            this.multipleHideVal.push(data[i].id)
            this.$emit('input', this.multipleHideVal)
          } else {
            this.hideValue = data[i].id
            this.queryVal = data[i].title
            this.$emit('input', data[i].title)
          }
          data[i].selected = true
        } else if (data[i].children !== undefined) {
          this.recursionQueryTreeData(data[i].children, val)
        }
      }
    }
  },
  mounted () {
    this.checkValueType()
    // 要先初始化选中的数据，再将初始化好的数据赋值给到当前的tree，否则将导致选中的效果显示不出来
    if (this.multiple) { // 多选
      this.initQueryMultiple()
    } else {// 单选
      this.initQueryVal()
    }
    this.showData = JSON.parse(JSON.stringify(this.cloneData))
    this.queryData = this.showData
  }
}
</script>
<style>
  .ivu-select-placeholder {
    display: block;
    height: 30px;
    line-height: 30px;
    color: #c5c8ce;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 22px;
  }

  .ivu-select-selected-value {
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 24px;
  }
</style>
