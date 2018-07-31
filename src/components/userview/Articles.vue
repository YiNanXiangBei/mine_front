<template>
    <div id="articles">
        <section class="section">
            <div class="container is-fluid">
                <div class="columns is-multiline">
                    <div class="column is-three-quarters">               
                        <div class="columns">
                            <div class="column is-offset-one-fifth is-four-fifths">
                                <section class="section">
                                    <div class="content">
                                        <router-link :to="{path: '/detail_article', query: {tag: 1}}" class="detail-article" tag="div">
                                            <h3 class="title is-spaced">主标题</h3>
                                            <h5 class="subtitle">副标题</h5>
                                            <p>
                                                Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                            </p>
                                           
                                        </router-link>
                                        <p></p>
                                         <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                    <div class="content">
                                        <h3 class="title is-spaced">主标题</h3>
                                        <h5 class="subtitle">副标题</h5>
                                        <p>
                                            Curabitur accumsan turpis pharetra augue tincidunt blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
                                        </p>
                                        <p class="post-meta">Posted by Les1ie on June 6, 2018</p>
                                        <hr>
                                    </div>
                                </section>
                                <section class="section">
                                    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                                    <a class="pagination-previous">Previous</a>
                                    <a class="pagination-next">Next page</a>
                                    <ul class="pagination-list">
                                        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                                        <li><span class="pagination-ellipsis">&hellip;</span></li>
                                        <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                                        <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                                        <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                                        <li><span class="pagination-ellipsis">&hellip;</span></li>
                                        <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
                                    </ul>
                                    </nav>
                                </section>
                            </div>
                        </div>    
                    </div>
                    <div class="column is-hidden-mobile">
                        <section class="section">
                            <div class="box">
                                最热文章
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.detail-article{
    cursor: pointer;
}
articles {
    min-height: 740px;
}
</style>


