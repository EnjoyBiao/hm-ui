<template>
  <transition name="dialog-fade">
  <!-- @click.self只是点自己，防治点击其他元素关闭 -->
    <div class="one-dialog_wrapper" v-show="visible" @click.self="closeClick">
      <div class="one-dialog" :style="{
       width,
       marginTop:top
      }">
        <div class="one-dialog_header">
          <!-- 具名插槽-->
          <slot name="title">
            <span class="one-dialog_title">{{title}}</span>
          </slot>
          <button class="one-dialog_headerbtn" @click="closeClick">
            <i class="basicfont iconclose one-icon-close"></i>
          </button>
        </div>
        <div class="one-dialog_body">
          <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
          <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
          <slot></slot>
        </div>
        <div class="one-dialog_footer" v-if="$slots.foolter">
          <!-- 如果footer不传递内容，则不显示footer -->
           <slot name="foolter"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Dialog',
    props:{
      title:{
        type: String,
        default:'提示'
      },
      width:{
        type: String,
        default: '50%'
      },
      top:{
        type: String,
        default: '15vh'
      },
      visible:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      closeClick(){
        // this.$emit('closeClick',false)
        this.$emit('update:visible',false)
      }
    }
  }
</script>

<style scoped lang="scss">
  .one-dialog_wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background-color: rgba(0,0,0,0.5);
  .one-dialog{
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 30%;
  &_header{
     padding: 20px 20px 10px;
  .one-dialog_title{
    line-height: 24px;
    font-size: 18px;
    color: #303133;
  }
  .one-dialog_headerbtn{
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 16px;
  .one-icon-close{
    color:#909399
  }
  }
  }
  &_body{
     padding: 30px 20px;
     color: #606266;
     font-size: 14px;
     word-break: break-all;
   }
  &_footer{
     padding: 10px 20px 20px;
     text-align: right;
     box-sizing: border-box;
  /*::v-deep .one-button:first-child{*/
    /*margin-right: 20px;*/
  /*}*/
  }
  }
  }
  /*是用动画的话就使用这两个状态 reverse 反转的意思*/
  .dialog-fade-enter-active{
    animation: fade .3s;
  }
  .dialog-fade-leave-active{
    animation: fade .3s reverse;
  }
  @keyframes fade{
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100%{
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
