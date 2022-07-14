import {
	mapGetters
} from 'vuex'

export default {

	computed: {
		...mapGetters('Cart', ['total'])
	},
	// 监听total变化更新 徽标
	watch:{
		total(){
			this.setBadge()
		}
	},

	// 页面一显示就被调用
	onShow() {
		this.setBadge()
	},

	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
