<template>
  <div v-cloak>
<!-- 【按钮式popover】 -->
<!-- 
  <mu-raised-button icon="menu" slot="right" ref="button" @click="toggle"></mu-raised-button>
  <mu-popover :open="open" :trigger="trigger">
    <mu-menu>
      <mu-menu-item title="数据库接入" ></mu-menu-item>
      <mu-menu-item title="数据视图" ></mu-menu-item>
      <mu-menu-item title="EXCEL导入" ></mu-menu-item>
    </mu-menu>
  </mu-popover>
-->
<!-- 【侧边fixed菜单栏】 -->
<!--
<mu-drawer open="open" class="leftPanel">
<mu-list>
  <mu-list-item title="主题1" toggleNested>
	<mu-list-item slot="nested" title="模块1">
	</mu-list-item>
  </mu-list-item>
</mu-list>
</mu-drawer>
-->
<!-- 【自动补全输入框】 -->
<!-- 
<mu-auto-complete icon="search" hintText="请随便输入点啥" :dataSource="dataSource" ></mu-auto-complete>
-->
<!-- 【+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++】 -->

<!-- 【标题】 -->
 
<!-- 【主题及主题模板列表】 -->
  <mu-row gutter>
    <mu-col class="left" width="100" tablet="20" desktop="20">
		<!-- 【列表】 -->
		<mu-appbar>
	<mu-flat-button color="white" label="主题" slot="left"/>
	<!-- 【新增数据源】 -->
</mu-appbar>
		<mu-list>
		<mu-list-item v-for="(x,index) in Appdata.source.db.theme" :title="x.name" :key="index" toggleNested >
		<mu-list-item slot="nested" v-for="(i,name) in x.item" :title="name" :key="name">
        <mu-icon slot="left" value="grade"></mu-icon>
		</mu-list-item>
	    </mu-list-item>
		</mu-list>
	</mu-col>
    <mu-col width="100" tablet="80" desktop="80">
	<!-- 【嵌套 grid】 -->
	<mu-row gutter>
	<mu-col width="100" tablet="45" desktop="33">
	<!-- 【搜索】 -->
	<mu-text-field hintText="搜索数据源"></mu-text-field>
	</mu-col>
    <mu-col width="100" tablet="55" desktop="40">
    
  
	<mu-raised-button class="demo-raised-button" label="删除选中" icon="delete" disabled/>
	<mu-flat-button label="撤销" icon="menu" primary></mu-flat-button>
	
	<mu-icon-menu
      icon="menu"
    >
      <mu-menu-item title="数据库接入" ></mu-menu-item>
      <mu-menu-item title="数据视图" ></mu-menu-item>
      <mu-menu-item title="EXCEL导入" ></mu-menu-item>
    </mu-icon-menu>
	</mu-col>
	
	</mu-row>
	<!-- 【嵌套 grid】 -->
		<!-- 【表格】 -->
      <mu-table fixedHeader
    enableSelectAll multiSelectable
    selectable showCheckbox>
		<mu-thead slot="header">
		  <mu-tr>
			<mu-th v-for="(i,index) in Appdata.source.db.db[0]" :key="index" v-text="index == 'editable'? '权限' : index == 'memberId'? '公司Id' : index == 'themeId'? '主题Id' : index == 'itemId'? '模块Id' : index == 'onz'? '开启状态' : index "></mu-th>
			<mu-th>操作</mu-th>
		  </mu-tr>
		</mu-thead>
		<mu-tbody>
		  <mu-tr v-for="(i,index) in Appdata.source.db.db" :key="index">
			<mu-td v-for="(v,vindex) in i" v-text="vindex == 'editable' ? v=='1'?'yes':'no' : vindex == 'onz' ? v=='1'?'开启':'关闭' : v" :key="vindex"></mu-td>
			<mu-td><mu-icon-button icon="menu" @click="toTable(index)" /></mu-td>
		  </mu-tr>
		</mu-tbody>
	  </mu-table>
	    <mu-pagination :total="Appdata.source.total.db * 10" :current="pagination.current"  @pageChange="handleClick">
		</mu-pagination>
		
	</mu-col>
  </mu-row>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'dbSource',
  data () {
    return {
		pagination:{
			current:1,
			total:1
		}
    }
  },
  methods: {
    handleClick (newIndex) {
		console.log(newIndex)
    },
	toTable(index){
		console.log(index)
	}
  },
  props:["Appdata"],
  mounted(){
	//this.trigger = this.$refs.button.$el
	console.log(location.search);
	//socket
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] {
  display: none;
}
.left{
	box-shadow: 0 2px 3px rgba(0,0,0,.156863), 0 3px 3px rgba(0,0,0,.227451);
}
.mu-pagination{
	justify-content: center;
}
.searchField{
	
}
</style>
