<template>
	<view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view v-for="item in goodsList" :key="item.goods_id" @click="goToDetail(item.goods_id)">
				<!-- 组件 -->
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				query: '', //关键词
				cid: '', //id
				pagenum: 1, //当前页
				pagesize: 10 //每页数量
			},
			// 列表总数
			total: 0,
			// 商品列表
			goodsList: [],
			// 节流阀
			isloading: false
			
		};
	},
	onLoad(options) {
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		this.getGoodsList();
	},
	methods: {
		// 获取商品列表数据
		async getGoodsList(callback) {
			try {
				// 打开节流阀
				this.isloading = true
				const { data: res } = await uni.$http.get(`/api/public/v1/goods/search`, this.queryObj);
				// 新旧数据拼接
				this.goodsList = [...this.goodsList,...res.message.goods];
				this.total = res.message.total
				// 关闭节流阀
				this.isloading = false
				// callback存在 就执行
				callback && callback()
			} catch (e) {
				console.log(e);
				return uni.$showMsg();
			}
		},
		
		// 跳转到详情页面
		goToDetail(id){
			uni.navigateTo({
				url:"/subpkg/goods_detail/goods_detail?goods_id=" + id
			})
		}
	},
	// 上拉加载（内置api）
	onReachBottom(){ 
		if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total){
			return uni.$showMsg('数据加载完毕')
		}
		// 防止发起过多请求
		if(this.isloading ) return
		// 让页码加一 
		this.queryObj.pagenum++
		// 重新获取
		this.getGoodsList()
		
	},
	// 下拉刷新
	onPullDownRefresh(){
		// 重置数据
		this.queryObj.pagenum = 1
		this.total = 0
		this.isloading = false
		this.goodsList  = []
		
		this.getGoodsList(()=>uni.stopPullDownRefresh())
	}
};
</script>

<style lang="scss">

</style>
