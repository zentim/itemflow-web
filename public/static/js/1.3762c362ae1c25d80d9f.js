webpackJsonp([1],{Dqi8:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-layout",[s("v-flex",[s("div",[e._v("\n      "+e._s(e.user.id)+"\n      "+e._s(e.user.email)+"\n    ")]),e._v(" "),s("v-btn",{staticClass:"primary",on:{click:e.onLogout}},[e._v("Logout")])],1),e._v(" "),s("v-flex",[s("ais-index",{attrs:{"app-id":"latency","api-key":"3d9875e51fbd20c7754e65422f7ce5e1","index-name":"bestbuy"}},[s("ais-search-box"),e._v(" "),s("ais-results",{scopedSlots:e._u([{key:"default",fn:function(e){var t=e.result;return[s("h2",[s("ais-highlight",{attrs:{result:t,"attribute-name":"name"}})],1)]}}])})],1)],1)],1)},staticRenderFns:[]},r=s("VU/8")({computed:{user:function(){return this.$store.getters.user}},methods:{onLogout:function(){this.$store.dispatch("logout"),this.$router.push("/")}}},n,!1,null,null,null);t.default=r.exports}});
//# sourceMappingURL=1.3762c362ae1c25d80d9f.js.map