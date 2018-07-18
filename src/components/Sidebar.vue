<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :active-name="menuName" theme="dark" width="auto" :open-names="openNames" @on-select="select">
                <MenuItem name="person">
                    <Icon type="person"></Icon>
                    <span>个人中心</span>
                </MenuItem>
                <MenuItem name="publish">
                    <Icon type="ios-compose-outline"></Icon>
                    <span>发布文章</span>
                </MenuItem>
                <MenuItem name="editor">
                    <Icon type="edit"></Icon>
                    <span>编辑文章</span>
                </MenuItem>
                <MenuItem name="comment">
                    <Icon type="chatbubble-working"></Icon>
                    <Badge dot count='1'>
                        <span>评论管理</span>
                    </Badge>
                </MenuItem>
                <MenuItem name="upload">
                    <Icon type="image"></Icon>
                    <span>图片管理</span>
                </MenuItem>
                <MenuItem name="tag">
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
            <Header v-show="showHeader" style="position: fixed; width: 100%; background: #fff; boxShadow: 0 2px 3px 2px rgba(0,0,0,.1); z-index: 1">
                <Input  icon="ios-search-strong"  placeholder="输入要查找的内容" style="width: 200px; cursor: pointer"></Input>
                <Avatar :src="avatar" size="large" style="position: fixed; right: 20px; top: 12px;"/>
            </Header>
            <Content style="margin: 88px 20px 0; background: #fff; min-height: 600px">
                <keep-alive>
                    <router-view @showheader="changeHeaders" @changeAvatar="changeAvatar" v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </Content>
        </Layout>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            menuName : 'person',
            openNames: [
                'person', 
                'publish',
                'editor',
                'comment',
                'tag'
            ],
            showHeader: true,
            avatar: ''
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.changeMenu() 
        })
    },
    methods: {
        changeAvatar(img_url){
            this.avatar = img_url
        },
        select(name) {
            this.$router.push({path: name})
        },
        changeHeaders(value) {
            this.showHeader = value
        },
        changeMenu() {
            //修改menu显示问题
            let path = this.$route.path; 
            let name = path.substring(1, path.length)
            if(name === "sysadmin") {
                this.menuName = "person";
                this.$router.push({path: '/sysadmin/person'})
            } else {
                let names = name.split('/');
                this.menuName = names[1];
            }
        }
    },
    mounted() {
        this.avatar = sessionStorage.getItem('avatar')
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