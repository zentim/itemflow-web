webpackJsonp([9],{"myl/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{title:"",message:"",content:[],labels:[],onCreate:!1}},computed:{formIsValid:function(){return""!==this.title}},methods:{onCreateFlow:function(){if(this.formIsValid){for(var t=this.content,e=[],s=0;s<t.length;s++)e.push({id:t[s].id,type:t[s].type,title:t[s].title,message:t[s].message});for(var a=this.labels,l=[],o=0;o<a.length;o++)l.push({id:a[o].id,type:a[o].type,title:a[o].title,message:a[o].message});var n={title:this.title,message:this.message,content:e,labels:l};this.$store.dispatch("createFlow",n),this.onCreate=!0,this.$router.push("/flows")}}},beforeRouteLeave:function(t,e,s){this.onCreate?s():window.confirm("Do you really want to leave? you have unsaved changes!")?s():s(!1)}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{attrs:{row:""}},[s("h2",[t._v("Create a new Flow")]),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("form",{on:{submit:function(e){e.preventDefault(),t.onCreateFlow(e)}}},[s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("v-text-field",{attrs:{name:"title",label:"Title",id:"title",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1),t._v(" "),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("v-text-field",{attrs:{name:"message",label:"Message",id:"message"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1)],1),t._v(" "),s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("h4",[t._v("Content:")]),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[s("flow-content",{attrs:{content:t.content},on:{"update:content":function(e){t.content=e}}})],1)],1)],1),t._v(" "),s("v-layout",{attrs:{row:"","mt-5":""}},[s("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("v-divider",{staticClass:"my-3"}),t._v(" "),s("h4",[t._v("Labels:")]),t._v(" "),s("app-labels",{attrs:{labels:t.labels},on:{"update:labels":function(e){t.labels=e}}})],1)],1),t._v(" "),s("v-layout",{attrs:{"mt-5":""}},[s("v-flex",{staticClass:"text-xs-center text-sm-right",attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("v-btn",{staticClass:"primary",attrs:{disabled:!t.formIsValid,type:"submit"}},[t._v("Create Flow")])],1)],1)],1)])],1)],1)},staticRenderFns:[]},o=s("VU/8")(a,l,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=9.105b1dfd58a3b36c6e1b.js.map