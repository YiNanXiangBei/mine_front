<template>
    <div id="publish">
        <Row>
            <Col span="10" offset="3">
                <label for="">标题：</label>
                <Input v-model="value7" size="large" type="text" :autosize="true" maxlength=200 autofocus=true></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="10" offset="3">
                <label for="">描述：</label>
                <Input v-model="value7" size="large" type="text" :autosize="true" maxlength=200></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="10" offset="3">
                <label for="">标签：</label>
                <Input v-model="value7" size="large" type="text" :autosize="true" maxlength=200></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="10" offset="3">
                <label for="">内容：</label>
                <Input v-model="value7" size="large" type="textarea" :autosize="true"></Input>
            </Col>
        </Row>
        <br>
        <Row>
            <Col span="3" offset="3">
                <Button type="success" size="large" long>发布</Button>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>


