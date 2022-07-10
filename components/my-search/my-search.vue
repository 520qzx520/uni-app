<template>
	<view class="my-search-container" :style="{'background-color':bgCOlor}" @click="searchHandler">
		<view class="my-search-box" :style="{'radius':radius + 'px'}">
			<!-- uni 提供的图标 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-search',
	props:{
		// 背景颜色
		bgCOlor:{
			type:String,
			default:"#C00000"
		},
		// 圆角尺寸
		radius:{
			type:Number,
			default:18
		}
	},
	data() {
		return {};
	},
	methods:{
		searchHandler(){
			// 绑定触发传来的事件函数
			this.$emit('click')
		}
	}
};
</script>

<style lang="scss">
.my-search-container {
	display: flex;
	height: 50px;
	background-color: #c00000;
	align-items: center;
	padding: 0 10px;
	.my-search-box {
		height: 36px;
		background-color: #fff;
		border-radius: 15px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
