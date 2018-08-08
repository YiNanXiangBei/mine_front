<template>
    <div id="page">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous" :disabled='previousDisabled' @click="previous">Previous</a>
            <a class="pagination-next" :disabled='nextDisabled' @click="next">Next page</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page" 
                v-for="(item, index) in pages" 
                :key="index" 
                :class="{'is-current': item == current}"
                @click="onChange(item)">{{item}}</a></li>
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
            pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            current: 1,
            totalPags: 16,
            previousDisabled: true,
            nextDisabled: false
        }
    },
    props: ['total'],
    methods: {
        //点击页面触发事件
        onChange(currentPage) {
            /**总页数小于11，首页为1，尾页为总页数 */
            if (this.totalPags < 11) {
                //如果总页数小于11，直接返回该页数
                this.pages = this.circleAppend(1, this.totalPags);
                return currentPage;
            } else {
                let begin = currentPage - 5;
                let end = currentPage + 4;
                if (begin > 1 && end < this.totalPags) {
                    //看不到首尾页数阶段
                    this.pages = this.circleAppend(begin, end);
                } else if(begin <= 1 && end < this.totalPags) {
                    //看得到开始值，看不到结束值
                    this.pages = this.circleAppend(1, 10);
                } else if(begin > 1 && end >= this.totalPags) {
                    //看不到开始值，看得到结束值
                    this.pages = this.circleAppend(this.totalPags - 9, this.totalPags);
                } else {
                    //看得到开始值，看得到结束值
                    this.pages = this.circleAppend(1, this.totalPags);
                }
            }
            //判断previous是否失效
            if (currentPage == 1) {
                this.previousDisabled = true;
            } else {
                this.previousDisabled = false;
            }
            //判断next是否失效
            if (currentPage == this.totalPags) {
                this.nextDisabled = true;
            } else {
                this.nextDisabled = false;
            }
            this.current = currentPage;
            this.$emit('onChange', currentPage)
        },
        //点击前一页按钮触发事件
        previous() {
            this.onChange(this.current -= 1)
        },
        //点击下一页按钮触发事件
        next() {
            this.onChange(this.current += 1)
        },
        circleAppend(start, end) {
            let pageList = []
            for (let i = start; i <= end; i++) {
                pageList.push(i);
            }
            return pageList;
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped>

</style>


