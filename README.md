# JavaScript写一个通用的Toast和Modal

> 前言：作为项目经常会使用到的提示。一般包括toast和modal两种固定的模式。最近接触公司微信小程序项目，发现小程序对toast和modal，都是封装在wx这个对象中。并且在全局都可以使用，遂也希望在我们的前端项目中也封装一个类似的组件，方便使用，易方便后续自己和其他小伙伴维护。
> 


## 微信小程序的toast和modal一览

1. 微信小程序的toast

		wx.showToast({
      		title: '这是微信的Toast'
	   	})
	   	
	   	
![微信toast](https://raw.githubusercontent.com/beyondverage0908/MyMD/master/resoure/wx_show_toast.jpg)

2. 微信小程序modal

		wx.showModal({
      		title: 'wx modal',
      		content: '这是微信modal的content',
    	})

![微信modal](https://raw.githubusercontent.com/beyondverage0908/MyMD/master/resoure/wx_show_modal.jpg)


## 自行实现类微信的提示

目标：

1. **独立性**--不依赖其他现有的js框架，所以所有的UI以及css用原始js实现
2. **简单**--方法调用简单，封装方法到一个对象中，类似wx.showToast({})
3. **适应性**--我们前端项目使用viewport标签进行固定布局，但是viewport的width值却不尽相同(前期留下的问题)，需要适应任意width对应的显示要正常
4. **可配置性**--对于显示toast，modal的title，content，对应的颜色，确认按钮和取消按钮的颜色都可以通过参数配置

实现思路：

> 很简单

> 有一个viewport的概念，需要指导，请自行Google or baidu or bing

1. 找出head所有mata标签中，name="viewport"，最后一个width的大小（即为有效的viewport大小）
2. 计算出1种得到的width和标准的viewport的width比例
3. 创建toast和modal的模版，根据2中的比例，动态设置好css属性
4. 实现显示，隐藏，是否调用回调函数，等逻辑


展示效果：

1. toast效果

		vhs.showToast({
            content: "这是自行封装的toast--巴拉巴拉巴拉巴拉巴拉巴拉",
            complete: function() {
            		console.log("消失的回调函数")
            }
        });
        
        
![vhs_show_toast](https://raw.githubusercontent.com/beyondverage0908/MyMD/master/resoure/vhs_show_toast.jpg)




2. modal效果


        
       	vhs.showModal({
            	title: "提示",
            	content: "这是自行封装的modal--巴拉巴拉",
            	cancelTitle: "取消",
            	cancel: function() {
                	console.log("取消事件回调");
            	},
            	confirmTitle: "确认",
            	confirm: function() {
                	console.log("确认按钮回调");
            	}
        	});



![vhs_show_modal](https://raw.githubusercontent.com/beyondverage0908/MyMD/master/resoure/vhs_show_modal.jpg)




## 使用

1. 引入vhs-modal.js
2. toast 

		/** 使用方式
     	*
     	* vhs.showToast({
     	*       content: "toast内容",
     	*       complete: function() {
     	*           console.log("toast消失回调");
     	*       }
     	*   });
     	*/
     	
3. modal

		/** 使用方式
     	*
     	* vhs.showModal({
     	*       title: "提示",
     	*       content: "modal内容",
     	*       cancelTitle: "取消按钮文本",
     	*       cancel: function() {
     	*           console.log("取消事件回调");
    	*       },
     	*       confirmTitle: "确认按钮文本",
     	*       confirm: function() {
     	*           console.log("确认按钮回调");
     	*       }
     	*   });
     	*/
     	

## 后续

还可以添加更多的配置，例如toast的倒计时配置，还有其他模式的提示，可以后续加入。


## 获取

旨在分享，github -- [vhs-modal.js库](https://github.com/beyondverage0908/vhs-modal/blob/master/vhs-modal.js)

## 意见

如果有更好的意见，欢迎分享。  

不是很好，键盘侠请留情 -- 毕竟还是一个从native开发者边学前端的初试者

## 最后

还是感谢微信小程序的一些设计，给我一种新的思路。

## 问题

1. 如何实现API的人性化提示，在微信小程序，或者其他其他语言，例如Objective-C，Swift，Java中，在方法的调用时候，都能给出很人性化的提示，方便调用方很简单的使用，但是目前没有实现。咨询后被告知--"利用原生JavaScript写的API对方法的提示是弱化的"，是否是这样的？
2. 对参数传递的形式一点思考 

	在js，
	
	1>. `function fun(args1, args2, args3, ....)` 
	
	和 
	
	2>. `function fun({
		args1: "",
		args2: "",
		args3: ""	
	})`
	
由于在js的方法中，如1，参数在不需要的时候，是可以省略的，但是在靠后的参数需要的时候，前面的参数则一定要保留，否则会参数传递错误。这样严重的影响了API的美观，和调用者阅读的感觉。

采用2的方式，虽然在调用时候，需要多写参数的键值，但是可以清晰的让调用者知道，当前的参数/方法的作用。

综上，采用第二种方式
