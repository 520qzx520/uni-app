<template>
	<view>
		<!-- 搜索 -->
		<view class="search-box"><my-search @click="goToSearch"></my-search></view>
		<!-- 轮播图区域 -->
		<!-- 圆点、自动轮播、间隔、一张图从开始到结束用的时间、循环 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 渲染item -->
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<!-- navigator点击跳转到子页面（也就是分包）并携带参数 goods_id -->
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"><image :src="item.image_src"></image></navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航栏 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandel(item)"><image :src="item.image_src" class="nav-img"></image></view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 图片 -->
				<view class="floor-img-box">
					<!-- 左侧大盒子   mode="widthFix"  自适应-->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image mode="widthFix" :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image>
					</navigator>
					<!-- 右侧4个图片 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
	mixins: [badgeMix],
	data() {
		return {
			// 轮播图数据
			swiperList: [],
			// 分类导航的数据列表
			navList: [],
			// 楼层图片数据列表
			floorList: []
		};
	},
	// 一进入页面就开始执行
	onLoad() {
		// 调用方法获取轮播图数据
		this.getSwiperList();
		// 获取分类导航数据列表
		this.getNavList();
		// 获取楼层图片数据
		this.getFloorList();
	},
	methods: {
		// 获取轮播图数据
		async getSwiperList() {
			try {
				const { data: res } = await uni.$http.get(`/api/public/v1/home/swiperdata`);
				this.swiperList = res.message;
				// console.log(res);
			} catch (e) {
				return uni.$showMsg();
			}
		},
		// 获取分类导航数据列表
		async getNavList() {
			try {
				const { data: res } = await uni.$http.get(`/api/public/v1/home/catitems`);
				this.navList = res.message;
				// console.log(res);
			} catch (e) {
				console.log(e);
				return uni.$showMsg();
			}
		},
		// 分类列表点击跳转事件
		navClickHandel(item) {
			switch (item.name) {
				// 跳转到tabbar 的分类页面所以用 uni.switchTab 方法
				case '分类':
					uni.switchTab({
						url: '/pages/cate/cate'
					});
					break;
				default:
					break;
			}
		},
		//获取楼层图片数据
		async getFloorList() {
			try {
				const { data: res } = await uni.$http.get(`/api/public/v1/home/floordata`);
				// 对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
					});
				});
				this.floorList = res.message;
				// console.log(res);
			} catch (e) {
				console.log(e);
				return uni.$showMsg();
			}
		},
		// 点击跳转到搜索页面
		goToSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
// 搜索
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
// 轮播图
swiper {
	// 单位为rpx
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
// 分类导航栏
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-item {
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
}

// 楼层区域
.floor-list {
	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		}
	}
}
</style>
