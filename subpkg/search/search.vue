<template>
	<view>
		<view class="search">
			<!-- 搜索框 -->
			<uni-search-bar class="uni-mt-10" radius="15" placeholder="搜索" bgColor="#EEEEEE" clearButton="auto" cancelButton="none" @input="input" focus="true" />
		</view>

		<!-- 搜索列表 -->
		<!-- 如果搜索列表长度不为0，则展示搜索列表 ，如果为0 则展示搜索历史 -->
		<view class="sugg-list" v-if="serarchList.length !== 0">
			<view class="sugg-item" v-for="(item, i) in serarchList" :key="item.goods_id" @click="goToDetail(item.goods_id)">
				<view class="goods-name">{{ item.goods_name }}</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="deleteSearchHistory"></uni-icons>
			</view>

			<view class="history-list"><uni-tag :text="item" type="primary" v-for="(item, i) in historyList" :key="i" @click="goToGoodsList(item)"></uni-tag></view>
		</view>
		<!-- 	<uni-popup ref="popup" type="center" :animation="true" background-color="#fff">
				<text>Popup</text>
				<button @click="close">关闭</button>
		</uni-popup> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 用户输入的值
			keyWord: '',
			// 定时器
			timer: null,
			// 搜索数据
			serarchList: [],
			// 搜索历史
			historyList: []
		};
	},
	// 刚进来 加载 搜索历史
	onLoad() {
		// 从本地拿到历史数据
		this.historyList = JSON.parse(uni.getStorageSync('historyKw') || '[]');
	},
	methods: {
		// 输入事件
		input(value) {
			// 防抖
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.keyWord = value;
				console.log(value);
				this.getSearchList();
			}, 500);
		},
		// 获取搜索数据
		async getSearchList() {
			if (!this.keyWord) {
				return (this.serarchList = []);
			}

			try {
				const { data: res } = await uni.$http.get(`/api/public/v1/goods/qsearch`, { query: this.keyWord });
				this.serarchList = res.message;
				// 没有数据就提示
				this.serarchList.length === 0 &&
					uni.showToast({
						title: '没有搜索到数据，换一个关键词试试哦',
						duration: 1500,
						icon: 'none'
					});
				this.saveSearchHistory();
			} catch (e) {
				console.log(e);
				return uni.$showMsg();
			}
		},
		// 跳转到详情页面
		goToDetail(id) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
			});
		},
		// 保存搜索关键词历史
		saveSearchHistory() {
			// 去重，并且插入到前面
			this.historyList = [...new Set([this.keyWord, ...this.historyList])];
			// 本地存储
			uni.setStorageSync('historyKw', JSON.stringify(this.historyList));
		},
		// 删除历史记录(全部删除)
		deleteSearchHistory() {
			this.historyList = [];
			// 清除本地存储
			uni.setStorageSync('historyKw', '[]');
		},
		// 点击搜索历史跳转到商品列表页面
		goToGoodsList(kw){
			uni.navigateTo({
				url:"/subpkg/goods_list/goods_list?query=" + kw
			})
		}
	}
};
</script>

<style lang="scss">
// 搜索框
.search {
	position: sticky;
	top: 0;
	z-index: 99;
	background-color: #c00000;
}
// 搜索列表
.sugg-list {
	padding: 0 5px;
	.sugg-item {
		font-size: 12px;
		padding: 12px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

// 搜索历史
.history-box {
	padding: 0 5px;
	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;

		uni-tag {
			margin-top: 15px !important;
			margin-right: 5px !important;
		}
	}
}
</style>
