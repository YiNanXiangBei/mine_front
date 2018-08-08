<template>
    <div id="page">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page" 
                v-for="(item, index) in pages" 
                :key="index">{{item}}</a></li>
                <!-- <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                <li><a class="pagination-link" aria-label="Goto page 3">3</a></li>
                <li><a class="pagination-link" aria-label="Goto page 4">4</a></li>
                <li><a class="pagination-link" aria-label="Goto page 5">5</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 6" aria-current="page">6</a></li>
                <li><a class="pagination-link" aria-label="Goto page 7" >7</a></li>
                <li><a class="pagination-link" aria-label="Goto page 8">8</a></li>
                <li><a class="pagination-link" aria-label="Goto page 9">9</a></li>
                <li><a class="pagination-link" aria-label="Goto page 10">10</a></li> -->
            </ul>
        </nav>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            pages: 10,
            currentPage: 1
        }
    },
    props: ['total'],
    methods: {
        onChange() {
            this.$emit('onChange', currentPage)
        }
    },
    mounted() {
        console.log('page')
    }
}
</script>
<style scoped>

</style>


