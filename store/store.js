import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车的 vuex 模块
import Cart from '@/store/cart.js'
// 导入用户的 vuex 模块
import userAddress from '@/store/user.js'
Vue.use(Vuex)

// 4. 向外共享 Store 的实例对象
export default new Vuex.Store({
	// TODO：挂载 store 模块
	modules: {
		// 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为Cart:Cart 触发对象简写 Cart，例如：
		// 购物车模块中 cart 数组的访问路径是Cart/cart
		Cart,
		userAddress
	}
})
