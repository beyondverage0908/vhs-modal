vhs = {
    /** 使用方式
     *
     * vhs.showToast({
     *       content: "toast内容",
     *       complete: function() {
     *           console.log("toast消失回调");
     *       }
     *   });
     */
    showToast: function(toast) {
        // 动态创建toast模版 - 作为body的子节点
        const that = this;
        var createToastTemplate = function() {

            var scale = that.getValidMetaWidthScale();

            var x = document.getElementsByTagName("body")[0];
            var v = document.createElement("div");
            v.id = "vhs-main-toast";
            v.style.visibility = "hidden";
            v.style.minWidth = "45%";
            v.style.maxWidth = "55%";
            v.style.left = "0";
            v.style.right = "0";
            v.style.marginLeft = "auto";
            v.style.marginRight = "auto";
            v.style.backgroundColor = "#333";
            v.style.color = "#fff";
            v.style.textAlign = "center";
            v.style.borderRadius = 5 * scale + "px";
            v.style.padding = 10 * scale + "px";
            v.style.position = "fixed";
            v.style.zIndex = "10";
            v.style.top = "35%";
            v.style.fontSize = 16 * scale + "px";
            x.appendChild(v);
        };

        // 删除toast模版
        var removeToast = function() {
            var v = document.getElementById("vhs-main-toast");
            v.parentNode.removeChild(v);
        };

        if (toast.content) {
            createToastTemplate();
            var x = document.getElementById("vhs-main-toast");
            x.innerHTML = toast.content;
            x.style.visibility = "visible";
            setTimeout(function(){
                removeToast();
                if (toast.complete) toast.complete();
            }, 3000);
        }
    },
    getValidMetaWidthScale: function() {
        var scale = 1;
        var metaTagList = document.getElementsByTagName('meta');
        var metaContentWidth = 0;
        for(var i = metaTagList.length - 1; i >= 0; i--) {
            var meta = metaTagList[i];
            var content = meta.getAttribute('content');
            if (content == null || content.indexOf("width") == -1 || content == "null") continue;
            var attributeList = content.split(",");
            for (var j = 0, len = attributeList.length; j < len; j++) {
                var attr = attributeList[j];
                if (attr.indexOf("width") == -1) {
                    continue;
                }
                var widthArray = attr.split("=");
                metaContentWidth = widthArray[widthArray.length - 1];
            }
            if (metaContentWidth > 0) {
                break;
            }
        }
        var standardMetaWidth = 375.0;
        if (metaContentWidth != 0) {
            scale = metaContentWidth / standardMetaWidth;
        }
        return scale;
    },

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
    showModal: function(modal) {
        const that = this;
        var createModalTemplate = function() {
            var scale = that.getValidMetaWidthScale();

            var body = document.getElementsByTagName("body")[0];
            var warp = document.createElement("div");
            warp.id = "vhs-modal-warp";
            warp.style.visibility = "visible";
            warp.style.minWidth = "50%";
            warp.style.maxWidth = "66.8%";
            warp.style.backgroundColor = "#f0f0f0";
            warp.style.color = "#333";
            warp.style.textAlign = "center";
            warp.style.borderRadius = 5 * scale + "px";
            warp.style.padding = 10 * scale + "px";
            warp.style.position = "fixed";
            warp.style.zIndex = "10";
            warp.style.left = 0;
            warp.style.right = 0;
            warp.style.marginLeft = "auto";
            warp.style.marginRight = "auto";
            warp.style.bottom = "50%";
            warp.style.fontSize = 15 * scale + "px";
            warp.style.borderStyle = "solid";
            warp.style.borderColor = "#e1e0e4";
            warp.style.borderWidth = "1px";
            body.appendChild(warp);

            var topDiv = document.createElement("div");
            warp.appendChild(topDiv);

            var title = document.createElement("p");
            title.id = "vhs-modal-title";
            topDiv.appendChild(title);

            var content = document.createElement("div");
            content.id = "vhs-modal-content";
            content.style.paddingTop = 15 * scale + "px";
            content.style.paddingBottom = 15 * scale + "px";
            topDiv.appendChild(content);

            var actionDiv = document.createElement("div");
            actionDiv.id = "vhs-modal-action";
            actionDiv.style.bottom = 9 * scale + "px";
            actionDiv.style.width = "100%";
            actionDiv.style.borderTop = "1px solid white";
            warp.appendChild(actionDiv);

            var cancel = document.createElement("div");
            cancel.id = "vhs-modal-cancel";
            cancel.style.marginTop = 10 * scale + "px";
            cancel.style.float = "left";
            cancel.style.width = "50%";
            cancel.style.color = "red";
            actionDiv.appendChild(cancel);

            var confirm = document.createElement("div");
            confirm.id = "vhs-modal-confirm";
            confirm.style.marginTop = 10 * scale + "px";
            confirm.style.float = "right";
            confirm.style.width = "50%";
            actionDiv.appendChild(confirm);
        };

        var removeModal = function() {
            var w = document.getElementById("vhs-modal-warp");
            w.parentNode.removeChild(w);
        };

        if (modal.content) {
            createModalTemplate();
            // 设置title
            var title = document.getElementById("vhs-modal-title");
            title.innerText = modal.title || "提示";

            var content = document.getElementById("vhs-modal-content");
            content.innerText = modal.content;

            var cancel = document.getElementById("vhs-modal-cancel");
            cancel.innerHTML = modal.cancelTitle || "取消";
            cancel.onclick = function() {
                if (modal.cancel) {
                    modal.cancel();
                }
                removeModal();
            };

            var confirm = document.getElementById("vhs-modal-confirm");
            confirm.innerHTML = modal.confirmTitle || "确认";
            confirm.onclick = function() {
                if (modal.confirm) modal.confirm();
                removeModal();
            }
        }
    }
};
