<template>
    <div id="images">
        <Row>
            <Col span="16" offset="3" style="padding-bottom: 40px">
                <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </Col>
            <br>
            
            <Col span="16" offset="3">
                <div id="copy" style="background:#eee;padding: 15px; cursor: pointer" @click="copys()" data-clipboard-text="https://www.baidu.com">
                    <Card :bordered="false">
                        <h3>https://www.baidu.com</h3>
                    </Card>
                </div>
            </Col>
        </Row>
        
    </div>    
</template>
<script>
import Clipboard from 'clipboard';
export default {
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
        }
    }
}
</script>
<style scoped>
#images{
    padding-top: 90px
}
</style>


