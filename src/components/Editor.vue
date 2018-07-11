<template>
    <div id="edit">
        <Form label-position="right">

            <Row>
                <Col span="10" offset="3">
                    <FormItem label="日期">
                        <DatePicker  format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>                    
                    </FormItem>
                </Col>
                        
            </Row>
            <Row>
                <Col span="2" offset="3">
                    <Button type="success" long>查询</Button>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="10" offset="3">
                    <Card style="width:100%">
                        <p slot="title">
                            <Icon type="compose"></Icon>
                            Classic film
                        </p>
                        <p>
                            <Tag color="#A569BD">标签二</Tag>
                        </p>
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                            <Icon type="ios-loop-strong"></Icon>
                            Change
                        </a>
                        <ul>
                            <li v-for="item in randomMovieList">
                                <a :href="item.url" target="_blank">{{ item.name }}</a>
                                <span>
                                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                                    {{ item.rate }}
                                </span>
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>

        </Form>
        
    </div>    
</template>
<script>
export default {
    
}
</script>
<style scoped>
#edit{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 16px;
    padding-top: 50px
}
</style>


