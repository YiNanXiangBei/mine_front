<template>
    <div id="page">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination" v-if="showPages">
            <a class="pagination-previous" :disabled='previousDisabled' @click="previous">Previous</a>
            <a class="pagination-next" :disabled='nextDisabled' @click="next">Next page</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page" 
                v-for="(item, index) in pages" 
                :key="index" 
                :class="{'is-current': item == current}"
                @click="onChange(item)">{{item}}</a></li>
            </ul>
        </nav>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            pages: [],
            current: 1,
            totalPags: 0,
            previousDisabled: true,
            nextDisabled: false,
            isTop: true,
            timer: null,
            showPages: false
        }
    },
    props: ['total'],
    watch: {
        total(val) {
            this.totalPags = Math.ceil(val / 7);
            if (this.totalPags == 1) {
                this.nextDisabled = true;
                this.showPages = false;
            }else if (this.totalPags > 10) {
                this.showPages = true;
                this.pages = this.circleAppend(1, 10);
            } else {
                this.showPages = true;
                this.pages = this.circleAppend(1, this.totalPags);
            }
            
            
        }
    },
    methods: {
        //点击页面触发事件
        onChange(currentPage) {
            // debugger;
            /**总页数小于11，首页为1，尾页为总页数 */
            if (this.totalPags < 11) {
                //如果总页数小于11，直接返回该页数
                this.pages = this.circleAppend(1, this.totalPags);
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
            this.$emit('onChange', currentPage);
            this.scrollToTop();
        },
        //点击前一页按钮触发事件
        previous() {
            this.onChange(this.current -= 1)
        },
        //点击下一页按钮触发事件
        next() {
            this.onChange(this.current += 1)
        },
        //向数组中添加页数范围
        circleAppend(start, end) {
            let pageList = []
            for (let i = start; i <= end; i++) {
                pageList.push(i);
            }
            return pageList;
        },
        scrollToTop() {
            this.timer = setInterval(() =>{
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                var ispeed = Math.floor(-osTop / 7);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                if(osTop == 0 ){
                    clearInterval(this.timer)
                }
                this.isTop = true
            },30)
        }
    },
    mounted() {
        window.onscroll = ()=> {
            if (!this.isTop) {
                clearInterval(this.timer);
            }
            this.isTop = false
        }
    }
}
</script>
<style scoped>

</style>


