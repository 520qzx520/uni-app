<template>
	<view class="goods-item">
		<!-- 左 -->
		<view class="goods-item-left">
			<!--  radio 插槽 -->
			<slot name="slot_select" ></slot>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-right">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
				<!--  number 插槽 -->
				<slot name="slot-number-box" ></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		goods: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			// 默认图片地址
			// 默认的空图片
			defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	methods:{
		
	},
	// 过滤器 保留两位小数
	filters: {
		tofixed(num) {
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	display: flex;
	// width: 750rpx;
	// box-sizing: border-box;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	// 左
	.goods-item-left {
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	// 右
	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
		}
		.goods-info-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price {
				color: #c00000;
				font-size: 16px;
			}
		}
	}
}
</style>
