<template>
	<view>
		<!-- 选中收货地址 -->
		<view  class="address-choose-box" v-if="JSON.stringify(address) === '{}'"><button type="primary" size="mini" class="btnChoose">请选择收货地址+</button></view>
		<!-- 渲染收货信息的盒子 -->
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
		  <view class="row1">
		    <view class="row1-left">
		      <view class="username">收货人：<text>{{address.userName}}</text></view>
		    </view>
		    <view class="row1-right">
		      <view class="phone">电话：<text>{{address.telNumber}}</text></view>
		      <uni-icons type="arrowright" size="16"></uni-icons>
		    </view>
		  </view>
		  <view class="row2">
		    <view class="row2-left">收货地址：</view>
		    <view class="row2-right">{{addstr}}</view>
		  </view>
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
	
	name: 'my-address',
	data() {
		return {
			// 收货地址
			// address: {}
		};
	},
	computed: {
		...mapState('userAddress',['address']),
		    // 将 m_user 模块中的 addstr 映射到当前组件中使用			
		...mapGetters('userAddress',['addstr'])
	},
	methods:{
		  // 3.1 把 m_user 模块中的 updateAddress 函数映射到当前组件
		...mapMutations('userAddress', ['updateAddress']),
		async chooseAddress(){
			try{
				// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				    //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
				    const [err, succ] = await uni.chooseAddress().catch(err => err)
				
				    // 2. 用户成功的选择了收货地址
				    if (err === null && succ.errMsg === 'chooseAddress:ok') {
				      // 为 data 里面的收货地址对象赋值
					   // 3.2 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
				      this.updateAddress(succ)
				    }
	 
			}catch(e){
				console.log(e)
			}
			
		}
	}
};
</script>

<style lang="scss">
// 底部边框线的样式
.address-border {
	display: block;
	width: 100%;
	height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;

	// 第一行
	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 5px;
			}
		}
	}

	// 第二行
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
