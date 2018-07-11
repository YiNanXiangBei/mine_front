<template>
    <div id="person">
        <Row>
            <Col span="6" offset="3">
                <label for="">用户名：</label>
                <Input type="text"></Input>
            </Col>
            <Col span="6" offset="3">
                <label for="">密码：</label>
                <Input type="password"></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="6" offset="3">
                <label for="">邮箱：</label>
                <Input type="email"></Input>
            </Col>
            <Col span="6" offset="3">
                <label for="">头像：</label>
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
        </Row>
        <br>
        <Row>
            <Col span="4" offset="3">
                <Button type="success" long>修改</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#person {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 60px;
    z-index: inherit;
}
</style>