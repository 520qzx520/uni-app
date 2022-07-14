<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeState">
			<radio color="#C00000" :checked="checkedTotal" />
			<text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:
			<text class="amount">￥{{checkedGoodsAllPrice}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	name: 'my-settle',
	data() {
		return {};
	},
	methods: {
		// 拿到方法
		...mapMutations('Cart', ['updateAllGoodsState']),
		// 全选与反选
		changeState() {
			this.updateAllGoodsState(!this.checkedTotal);
		}
	},
	computed: {
		...mapGetters('Cart', ['checkedCount', 'checkedTotal','checkedGoodsAllPrice'])
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	// 将背景色从 cyan 改为 white
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;

	.radio {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
	}

	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
}
</style>
