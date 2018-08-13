<template>
    <div id="images">
        <Row>
            <Col span="16" offset="3" style="padding-bottom: 40px">
                <Upload
                type="drag"
                :headers="headers"
                :max-size="10240"
                :on-exceeded-size="handleMaxSize"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError"
                :show-upload-list='false'
                :on-progress="processUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                action="http://127.0.0.1:5000/sysadmin/upload_image">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </Col>
            <br>
            
            <Col span="16" offset="3">
                <div id="copy" style="background:#eee;padding: 15px; cursor: pointer" @click="copys()" :data-clipboard-text="imgUrl">
                    <Card :bordered="false">
                        <h3>{{ imgUrl }}</h3>
                    </Card>
                </div>
            </Col>
        </Row>
        
    </div>    
</template>
<script>
import Clipboard from 'clipboard';
export default {
    data() {
        return {
            imgUrl: '',
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        }
    },
    methods: {
        copys () {
            let clipboard = new Clipboard('#copy');
            //复制成功执行的回调
            clipboard.on('success', (e)=> {
                this.$Notice.success({
                    title: '复制成功！',
                    desc:  e.text
                });
                clipboard.destroy();
            });

            //复制失败执行的回调
            clipboard.on('error', (e)=> {
                this.$Notice.error({
                    title: '复制失败！',
                    desc: e.text
                });
                clipboard.destroy();
            });
        },
        uploadSuccess(response, file, fileList) {
            this.$Spin.hide();
            switch(response.code) {
                case 200:
                    //文件上传成功
                    this.imgUrl = response.data.image_url;
                    this.$store.commit('set_token', response.data.token);
                    break;
                case 400:
                    //token验证成功，文件上传失败
                    this.$Notice.error({
                        title: '文件上传失败',
                        desc: '文件  ' + file.name + ' 上传到云存储失败'
                    });
                    break;
                default:
                    //token 验证失败
                    this.$store.commit('del_token');
                    this.$router.replace({path: '/sysadmin/login'});
            }
        },
        uploadError(error, file, fileList) {
            this.$Spin.hide();
            this.$Notice.error({
                title: '文件上传失败',
                desc: '文件上传到云存储失败'
            });
        },
        processUpload(event, file, fileList) {
            fileList = null;
            this.$Spin.show();
        },
        /**
         * 上传文件格式不正确
         */
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请确认上传文件格式是jpg/jpeg/png'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出上传文件最大限制',
                desc: '文件  ' + file.name + ' 太大，请确保上传文件在10M以内'
            });
        }
    }
}
</script>
<style scoped>
#images{
    padding-top: 90px
}
</style>


