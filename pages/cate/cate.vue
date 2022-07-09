<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区 -->
			<scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh+'px'}">
				<block v-for="(item,i) in cateList"  :key="item.cat_id">
					<view :class="['left-scroll-view-item',i === active ? 'active' :'']" @click="activeChange(i)">{{item.cat_name}}</view>
				</block>
				
			
			</scroll-view>
			<!-- 右侧的滑动区 -->
			<scroll-view scroll-y="true" :style="{height: wh+ 'px'}" :scroll-top="scrollTop">
				
				<view class="cate-level2" v-if=" item2.children" v-for="item2 in cateLevel2" :key="item2.cat_id">
					<!-- 二级分类 -->
					<view class="cate-level2-title">
						{{item2.cat_name}}
					</view>
					<!-- 三级分类 -->
					<view class="cate-level3-list">
						<view class="cate-level3-item"  v-for="item3 in item2.children" :key="item3.cat_id" @click="goToGoodsList(item3.cat_id)">
							<image :src="item3.cat_icon"></image>
							<text>{{ item3.cat_name}}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh:0,
				// 左侧菜单栏
				cateList:[],
				// 高亮激活
				active:0,
				// 二级分类
				cateLevel2:[],
				// 用于切换 为0
				scrollTop: 0
			};
		},
		onLoad(){
			// 小程序的api,获取设备信息
			const sysInfo = uni.getSystemInfoSync()
			// 获取可用高度
			this.wh = sysInfo.windowHeight
			
			// 获取左侧菜单栏数据
			this.getCateList()
			
		},
		methods:{
			// 获取左侧菜单数据
			async getCateList(){
				try{
					const {data:res} = await uni.$http.get(`/api/public/v1/categories`)
					// 一级分类
					this.cateList = res.message
					// 二级
					this.cateLevel2 = res.message[0].children
				    console.log(res)
				}catch(e){
					console.log(e)
					return uni.$showMsg();
				}
			},
			// 点击切换菜单
			activeChange(index){
				// 高亮
				this.active = index
				// 重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				
				this.scrollTop = 0
			},
			
			// 跳转到商品列表页面
			goToGoodsList(id){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
		//  滑动区(左右滑动区)
	.scroll-view-container{
		display: flex;
		.left-scroll-view{
			width: 120px;
			.left-scroll-view-item{
				background-color: #F7F7F7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				// 激活样式
				&.active{
					position: relative;
					background-color: #ffffff;
					&::before{
						content: '';
						display: block;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translate(0,-50%);
						width: 3px;
						height: 30px;
						background-color: #ff1a1d;
					}
				}
			}
		}
	}
	// 二级分类
	.cate-level2{
		.cate-level2-title{
			font-size: 14px;
			text-align: center;
			font-weight: bold;
			padding: 15px 0;
		}
	}
	// 三级分类
	.cate-level3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-level3-item{
			display: flex;
			margin-bottom: 15px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.333%;
			image{
				width:60px;
				height: 60px;
			}
			text{
				padding-top: 5px;
				font-size: 12px;
			}
		}
	}
</style>
