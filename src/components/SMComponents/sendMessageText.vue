<template>
  <div class="wrapper-1">
    <textarea :id="id" :value="value"></textarea>
    <div class="loading-btn-wrapper" v-show="loading">
      <img class="image" src="">
      <div class="loading">
        <div class="btn"   v-loading="loading"
             element-loading-text="图片正在上传"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(255,255,255,0.9)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  // Import TinyMCE
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/modern/theme';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/link';
  import $ from 'jquery'
  import {uploadFile} from '../../api/index.js'
  const INIT = 0;
  const CHANGED = 2;
  let EDITOR = null;
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      setting: {}
    },
    watch: {
      value: function (val) {
        console.log('init ' + val)
        if (this.status == INIT || tinymce.activeEditor.getContent() != val){
          tinymce.activeEditor.setContent(val);
        }
        this.status = CHANGED
      }
    },
    created () {
    },
    data: function () {
      return {
        loading: false,
        status: INIT,
        id: 'editor-'+new Date().getMilliseconds(),
      }
    },
    methods: {
      //插入文本内容
      insertContent (content) {
        EDITOR.insertContent(content)
      },
      //清除文本内容
      clearContent () {
        EDITOR.setContent('')
      },
      //设置文本内容
      setEditorContent (html) {
        EDITOR.setContent(html)
      },
      //上传文件
      async upload (file) {
        this.loading = true
        let result = await uploadFile(file)
        console.log(result)
        if (result.success) {
          $('.image').attr('src', '')
          this.loading = false
          return  await Promise.resolve(result.data)
        }
      }
    },
    mounted: function () {
      const _this = this;
      const setting =
        {
          selector:'#'+_this.id,
          language:"zh_CN",
          language_url:"/static/langs/zh_CN.js",
          skin_url: "/static/skins/lightgray",
          toolbar: false,
          menubar: '',
          init_instance_callback:function(editor) {
            EDITOR = editor;
            console.log("Editor: " + editor.id + " is now initialized.");
            setTimeout(() => {
              $('.mce-last').css({"border-width": '0'})
              $('.mce-edit-area').css({"border-width": "0 0 0"})
              $('.mce-tinymce.mce-container.mce-panel').css({"border-width": '0'})
            }, 20)
            editor.on('input change undo redo', () => {
              let content = editor.getContent()
              _this.$emit('input', content);
            });
          },
          plugins:'',
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          setup: function (editor) {
            function insertImage () {
              let form = document.createElement('form')
              let input = document.createElement('input')
              $(input).attr('type', 'file')
              $(input).attr('name', 'file')
              $(form).append(input)
              $(input).on('change', function () {
                let filePath = $(this).val()
                let size = this.files[0].size
                console.log(size)
                if(!(/(jpg|png|JPG|PNG|jpeg|JPEG)/.test(filePath))) {
                  _this.$message({
                    type:  'warning',
                    showClose: true,
                    message: '请上传jpg,png,jpeg格式的图片！'
                  })
                } else {
                  if (size > 10485760) {
                    _this.$message({
                      type: 'warning',
                      showClose: true,
                      message: '上传图片的大小不能超过10M'
                    })
                  } else {
                    let fr = new FileReader()
                    fr.readAsDataURL(input.files[0])
                    fr.onload = function () {
                      $('.image').attr('src', this.result)
                      _this.upload(this.result).then((url) => {
                        let img = `<img src="${url}" style="display:block; margin-left: 50%; transform:translateX(-50%);margin-top: 20px;margin-bottom: 20px;max-width:600px!important"><br>`
                        editor.insertContent(img)
                      })
                    }
                  }
                }
              })
              input.click()
            }

            editor.addButton('image', {
              tooltip: '插入图片',
              onclick: insertImage
            })
          }
        };
      Object.assign(setting,_this.setting)

      tinymce.init(setting);

    }
  }

</script>

<style scoped>
  .wrapper-1 {
    width: 100%;
    position: relative;
    padding-right: 2px;
  }
  .image {
    max-width: 610px!important;
    max-height: 258px!important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .loading-btn-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
  .btn {
    height: 100%;
    width: 100%;
  }
</style>

