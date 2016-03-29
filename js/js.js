window.onload = function(){

	// ********************** tag输入部分 ***********************

	//tag部分的变量
	var oTagInput = document.getElementById('tagInput');
	var oNewTags = document.getElementById('newTags');

	var arrValue = [ ];		//用于保存所有用户输入的值;
	var bool = true;		//当用户输入的tag已经存在时，则bool = false；
	
	
	//自定义trim()方法;
	String.prototype.trim = function(){
		var reEx =  /(^\s*)|(\s*$)/g;
		return this.replace(reEx,"");
	}



	//去重方法,每新添加一个子节点时，便与全部原有子节点比较，是否重复
	function deleRepeat(arr,value){

		if(arr.length != 0){
			for(var i=0;i<arr.length;i++){
				if (value == arr[i]) {
					alert("该tag已经存在了喂！")
					return bool = false;
				}else{
					return bool = true;
				}
			}
		}
	}

	//判断数量是否大于10个的方法
	function checkAmount(ele){
		if (arrValue.length >9) {
			arrValue.splice(0,1);
			ele.removeChild(ele.firstChild);
		}
	}
	
	
	//tag输入部分的按键事件
	function tagKeyEvent(){

		if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 44){
			var newDiv = document.createElement('div');
			var valueInput  = oTagInput.value.trim();

			//去重操作
			deleRepeat(arrValue,valueInput);

			if(bool == true && oTagInput.value != ""){
				arrValue.push(valueInput);
				checkAmount(oNewTags);

				newDiv.innerHTML = valueInput;
				oNewTags.appendChild(newDiv);
				oTagInput.value = "";

				//给每个新子节点绑定鼠标移入和移出事件
				newDiv.onmouseover = mouseHover;
				newDiv.onmouseout = mouseLeave;
			}
		}
	}


	//点击即删除该元素
	function clickDele(e){
		var target = e.target;
		if (target.tagName) {
			getIndex(target);
			oNewTags.removeChild(target);
		}
	}


	//删除数组中的元素
	function getIndex(ele){
		for(var i=0; i<arrValue.length;i++){
			if(arrValue[i] == ele){
				arrValue.splice(i,1);
			}
		}
	}

	var initHtml ;
	//鼠标悬停事件
	function mouseHover(e){
		var target = e.target;
		if (target.tagName) {
			target.style.background = 'red';
			initHtml = target.innerHTML;
			target.innerHTML = '删除'+initHtml;
		}
	}

	function mouseLeave(e){
		var target = e.target;
		if (target.tagName) {
			target.style.background = 'rgba(50,100,50,0.7)';
			target.innerHTML = initHtml;
		}
	}

	//事件绑定
	oNewTags.onclick = clickDele;
	oTagInput.onkeypress = tagKeyEvent;



	//	****************************** 	textarea部分 ***********************



	var oBtn = document.getElementById('btn');

	function txtKeyEvent(){

		var oTxtarea = document.getElementById('hobbyInput');
		var oNewHobbies = document.getElementById('newHobbies');
		
		
		//按照回车，逗号，顿号，空格对字符串进行分割，存入数组
		var txtValue = oTxtarea.value;
		var txtArrValue = txtValue.split(/[ |,|，|\r\n|、|　]/);
		
		//对数组进行去重以及去除空白元素""
		txtDeleRepeat(txtArrValue);

		//对数组元素进行trim()处理	ps:我觉得这里进行trim（)是多余的，因为空格是分隔符，元素不会包含空格
		for(var k in txtArrValue){
			txtArrValue[k].trim();
		}

		//判断个数是否大于10
		if(txtArrValue.length > 9){
			txtArrValue.splice(0,txtArrValue.length-10);
		}
	

		//在下方显示
		for(var i=0;i<txtArrValue.length;i++){
			var txtNewDiv = document.createElement('div');
			txtNewDiv.innerHTML = txtArrValue[i];
			oNewHobbies.appendChild(txtNewDiv);
		}

	}


	//对数组进行去重
	function txtDeleRepeat(arr){
		for(var i=0;i<arr.length;i++){
			//去除空白元素
			if(arr[i] == ""){
				arr.splice(i,1);
					
			}	
			
			for(var j=i+1;j<arr.length;j++){
				if(arr[i] == arr[j]){
					for(var k=j;k<arr.length-1;k++){
						arr[k] = arr[k+1];
					}
					arr.pop();
				}
			}
		}
	}


	oBtn.onclick = txtKeyEvent;

}