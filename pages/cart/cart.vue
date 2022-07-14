<template>
	<view class="cart-container"  v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车列表标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 循环渲染购物车列表 -->
		<!-- uni-swipe-action 是最外层包裹性质的容器 -->
		<uni-swipe-action>
			<block v-for="item in cart" :key="item.goods_id">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
				<uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
					<!-- 自己封装的组件 -->
					<my-goods :goods="item">
						<!--  radio 插槽   -->
						<block slot="slot_select"><radio :checked="item.goods_state" color="#C00000" @click="radioClickHandler({ item })"></radio></block>
						<!-- number插槽 -->
						<block slot="slot-number-box">
							<!-- 默认参数 用$event 占位，和自定义参数 -->
							<uni-number-box :min="1" :value="item.goods_count" @change="changeValue($event, item)" />
						</block>
					</my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	  <!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
	    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
	    <text class="tip-text">空空如也~</text>
	  </view>
</template>

<script>
// 使用mixins
import badgeMix from '@/mixins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';
export default {
	mixins: [badgeMix],
	computed: {
		// 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
		// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
		...mapState('Cart', ['cart'])
	},
	data() {
		return {
			// 显示的文本内容
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}
			]
		};
	},
	methods: {
		...mapMutations('Cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoodsList']),

		// radio 组件的点击事件处理函数
		radioClickHandler(item) {
			const { item: goods } = item;
			goods.goods_state = !goods.goods_state;
			this.updateGoodsState(goods);
			console.log(goods);
		},
		// 加或减商品数量
		changeValue(count, item) {
			item.goods_count = count;
			this.updateGoodsCount(item);
			console.log('返回数值：', count, item);
		},
		// 删除商品
		deleteGoods(item) {
			this.deleteGoodsList(item);
		}
	}
};
</script>

<style lang="scss">
.cart-container {
	padding-bottom: 50px;
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart-title-text {
			margin-left: 10px;
		}
	}
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
// 物车列表标题
</style>
