export default {
	namespaced: true,


	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		// 从本地获取或者为空
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	actions: {},

	mutations: {
		// 加入购物车
		addToCart(state, goods) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (!findResult) {
				// 如果购物车中没有这件商品，则直接 push
				state.cart.push(goods)
			} else {
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count++
			}
			// 调用保存到本地的方法
			this.commit('Cart/saveToStorage')
		},
		// 保存在本地方法
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},

		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			// console.log(goods)
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			// 有对应的商品信息对象
			if (findResult) {
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('Cart/saveToStorage')
			}
		},
		// 更新数量 goods_count
		updateGoodsCount(state, goods) {
			console.log(goods)
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
			}
			this.commit('Cart/saveToStorage')

		},

		// 删除商品 过滤
		deleteGoodsList(state, goods) {
			console.log(goods)
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('Cart/saveToStorage')
		},
		
		// 全选与反选
		updateAllGoodsState(state,newState){
			state.cart.forEach(x=>x.goods_state = newState)
			// 存储本地
			this.commit('Cart/saveToStorage')
		}
	},

	// 模块的 getters 属性
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			let c = 0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品总数量进行累加
		// reduce() 的返回值就是已勾选的商品的总数量
		checkedCount(state) {
			return state.cart
				.filter(x => x.goods_state)
				.reduce((total, item) => {
					return total += item.goods_count
				}, 0)
		},
		
		// 检查全选
		checkedTotal(state){
		return	state.cart.every((item)=>{
				console.log(item.goods_state)
				return item.goods_state === true
			})
		},
		// 总价格
		checkedGoodsAllPrice(state){
			return state.cart
			.filter(x=>x.goods_state)
			.reduce((total,item)=>{
				return total += item.goods_price * item.goods_count
			},0)
			.toFixed(2) //保留两位小数
		}
	}
}
