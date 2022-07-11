<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图 区域-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i"><image :src="item.pics_big" @click="preview(i)"></image></swiper-item>
		</swiper>
		<!-- 商品信息区 -->
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="price">￥{{ goods_info.goods_price }}</view>
			<!-- 信息主题 -->
			<view class="goods-info-body">
				<!-- 名字 -->
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 快递 -->
			<view class="yf">快递，免运费</view>
		</view>
		<!-- 富文本 nodes 属性渲染出html节点-->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航组件区域 -->
		<view class="goods_nav"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 详情数据
			goods_info: {},
			// 商品导航
			options: [
				{
					icon: 'headphones',
					text: '客服'
				},
				{
					icon: 'shop',
					text: '店铺',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad(options) {
		const goods_id = options.goods_id;
		this.getGoodsDetail(goods_id);
	},
	methods: {
		// 获取详情数据
		async getGoodsDetail(goods_id) {
			try {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
				this.goods_info = res.message;
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg');
				console.log(res);
			} catch (e) {
				return uni.$showMsg();
			}
		},
		// 预览
		preview(index) {
			uni.previewImage({
				// 预览索引
				current: index,
				// 所有图片url 地址，是一个数组
				urls: this.goods_info.pics.map(x => x.pics_big)
			});
		},
		// 点击商品导航 Nav 判断
		onClick(e) {
			if(e.content.text === '购物车'){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		
		},
		buttonClick(e) {
			console.log(e);
			this.options[2].info++;
		}
	}
};
</script>

<style lang="scss">
.goods-detail-container {
	padding-bottom: 50px;
	// 轮播图
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
	// 详情
	.goods-info-box {
		padding: 10px;
		padding-right: 0;
		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}
		.goods-info-body {
			display: flex;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
				margin-right: 10px;
				text-align: justify;
			}
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	// 商品导航
	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
}
</style>
