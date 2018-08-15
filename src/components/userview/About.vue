<template>
    <div id="about">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths is-offset-one-fifth">
                        <h1 class="title">关于</h1>
                        <hr>
                        <div class="content">
                            <p>文章关于</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>    
</template>
<script>
export default {
    mounted() {
        let result = {
            title: '长路漫漫',
            desc: '',
            tags: [],
            publish_time: '',
            back_url: 'http://127.0.0.1:5000/image/1534261401.webp'
        }
        this.$emit('loadArticle', result);
    }
}
</script>
<style scoped>
#about {
    min-height: 740px;
}
</style>


