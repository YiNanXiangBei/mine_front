<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <MenuItem name="person">
                    <Icon type="person"></Icon>
                    <span>个人中心</span>
                </MenuItem>
                <MenuItem name="create">
                    <Icon type="ios-compose-outline"></Icon>
                    <span>发布文章</span>
                </MenuItem>
                <MenuItem name="edit">
                    <Icon type="edit"></Icon>
                    <span>编辑文章</span>
                </MenuItem>
                <MenuItem name="comment">
                    <Icon type="chatbubble-working"></Icon>
                    <Badge dot count='1'>
                        <span>评论管理</span>
                    </Badge>
                </MenuItem>
                <MenuItem name="images">
                    <Icon type="image"></Icon>
                    <span>图片管理</span>
                </MenuItem>
                <MenuItem name="tages">
                    <Icon type="ios-pricetag-outline"></Icon>
                    <span>标签管理</span>
                </MenuItem>
                <MenuItem name="home">
                    <Icon type="home"></Icon>
                    <span>返回主页</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{position: 'fixed', width: '100%', background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Input v-model="value4" icon="ios-search-strong"  placeholder="输入要查找的内容" style="width: 200px; cursor: pointer"></Input>
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" style="position: fixed; right: 20px; top: 12px; cursor: pointer"/>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '600px'}">
                Content
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>