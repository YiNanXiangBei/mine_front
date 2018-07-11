<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="person" theme="dark" width="auto" :open-names="['person', 'create']" @on-select="select">
                <MenuItem name="person">
                    <Icon type="person"></Icon>
                    <!-- <router-link to="/person" tag="span">个人中心</router-link> -->
                    <span>个人中心</span>
                </MenuItem>
                <MenuItem name="publish">
                    <Icon type="ios-compose-outline"></Icon>
                    <!-- <router-link to="/publish" tag="span">发布文章</router-link> -->
                    <span>发布文章</span>
                </MenuItem>
                <MenuItem name="editor">
                    <Icon type="edit"></Icon>
                    <!-- <router-link to="/editor" tag="span">编辑文章</router-link> -->
                    <span>编辑文章</span>
                </MenuItem>
                <MenuItem name="comment">
                    <Icon type="chatbubble-working"></Icon>
                    <Badge dot count='1'>
                        <!-- <router-link to="/comment" tag="span">评论管理</router-link> -->
                        <span>评论管理</span>
                    </Badge>
                </MenuItem>
                <MenuItem name="upload">
                    <Icon type="image"></Icon>
                    <!-- <router-link to="/upload" tag="span">图片管理</router-link> -->
                    <span>图片管理</span>
                </MenuItem>
                <MenuItem name="tag">
                    <Icon type="ios-pricetag-outline"></Icon>
                    <!-- <router-link to="/tag" tag="span">标签管理</router-link> -->
                    <span>标签管理</span>
                </MenuItem>
                <MenuItem name="home">
                    <Icon type="home"></Icon>
                    <!-- <router-link to="/" tag="span">返回主页</router-link> -->
                    <span>返回主页</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header style="position: fixed; width: 100%; background: #fff; boxShadow: 0 2px 3px 2px rgba(0,0,0,.1); z-index: 1">
                <Input  icon="ios-search-strong"  placeholder="输入要查找的内容" style="width: 200px; cursor: pointer"></Input>
                <div @click="changeAvatar">
                    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" style="position: fixed; right: 20px; top: 12px; cursor: pointer"/>
                </div>
            </Header>
            <Content style="margin: 88px 20px 0; background: #fff; minHeight: 600px">
                <router-view></router-view>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar',
        data() {
            return {

            }
        },
        methods: {
            select(name) {
                this.$router.push({path: name})
            },
            changeAvatar() {
                this.$router.push({path: 'person'})
            }
        }
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
    router-link {
        color: #f5f7f9
    }

</style>