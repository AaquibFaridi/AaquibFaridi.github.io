(this.webpackJsonplastArzi=this.webpackJsonplastArzi||[]).push([[19],{454:function(e,t,a){},455:function(e,t,a){},475:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(1),l=a.n(o);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=Object(n.forwardRef)((function(e,t){var a=e.color,n=void 0===a?"currentColor":a,o=e.size,l=void 0===o?24:o,s=c(e,["color","size"]);return r.a.createElement("svg",i({ref:t,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.a.createElement("polyline",{points:"3 6 5 6 21 6"}),r.a.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}))}));s.propTypes={color:l.a.string,size:l.a.oneOfType([l.a.string,l.a.number])},s.displayName="Trash",t.a=s},504:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(1),l=a.n(o);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=Object(n.forwardRef)((function(e,t){var a=e.color,n=void 0===a?"currentColor":a,o=e.size,l=void 0===o?24:o,s=c(e,["color","size"]);return r.a.createElement("svg",i({ref:t,xmlns:"http://www.w3.org/2000/svg",width:l,height:l,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),r.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),r.a.createElement("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),r.a.createElement("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"}))}));s.propTypes={color:l.a.string,size:l.a.oneOfType([l.a.string,l.a.number])},s.displayName="Info",t.a=s},589:function(e,t,a){"use strict";a.r(t);var n=a(18),r=a.n(n),o=a(26),l=a(7),i=a(0),c=a.n(i),s=a(452),u=a(148),d=a(442),m=a(405),f=a(462),b=a(153),p=a(80),h=a(466),v=a.n(h),w=a(8),g=a.n(w),O=a(475),x=a(499),j=a(504),y=a(500),E=a(15),N=a(459),k=(a(455),a(454),a(474)),D=(a(460),a(247),{rows:{selectedHighlighStyle:{backgroundColor:"rgba(115,103,240,.05)",color:"#7367F0 !important",boxShadow:"0 0 1px 0 #7367F0 !important","&:hover":{transform:"translateY(0px) !important"}}}}),S=function(e){var t;return c.a.createElement("div",{className:"data-list-action"},c.a.createElement(O.a,{style:{cursor:(null===(t=e.row.usage)||void 0===t?void 0:t.length)?"no-drop":"pointer"},size:window.screen.width<500?13:20,onClick:function(){var t;!(null===(t=e.row.usage)||void 0===t?void 0:t.length)&&e.setRow()}}))},L=function(e){return c.a.createElement("div",{className:"data-list-action"},window.screen.width>500?c.a.createElement(x.a,{className:"cursor-pointer mr-1",size:window.screen.width<500?13:20,onClick:function(){return e.currentData(e.row)}}):c.a.createElement(j.a,{className:"cursor-pointer mr-1",size:window.screen.width<500?13:20,onClick:function(){return e.currentData(e.row)}}))},z=function(e){return c.a.createElement("div",{className:"data-list-header d-flex justify-content-between"},c.a.createElement("div",{className:"actions-left d-flex"},c.a.createElement(s.a,{color:"white",className:"sort-dropdown mx-50",style:{height:"75%",backgroundColor:"var(--warning)",fontWeight:"bold"},outline:!0,onClick:function(){return e.handleSidebar(!0,!0)}},c.a.createElement("span",{className:"align-middle"},"Add"))),c.a.createElement("div",{className:"actions-right d-flex"},c.a.createElement("div",{className:"filter-section"},c.a.createElement(u.a,{type:"text",style:{height:"75%",borderRadius:"5rem",fontSize:"1rem"},onChange:function(t){return e.handleFilter(t)},placeholder:"Find",className:"placeholder"}))))};t.default=Object(E.b)((function(e){return{dataList:e.dataList,listLoading:e.dataList.totalRecordsLoading}}),(function(e){return{deleteData:function(t){return e(Object(N.b)(t))},updateData:function(t){return e(Object(N.h)(t))},addData:function(t){return e(Object(N.a)(t))},getData:function(t){return e(Object(N.f)(t))},filterData:function(t){return e(Object(N.d)(t))},dataTest:function(){return e({type:"GET_ALL_DATA_LOADING",data:!0})}}}))((function(e){var t=[{name:"Edit",sortable:!1,minWidth:"110px",cell:function(e){return c.a.createElement(L,{row:e,currentData:pe})}},{name:"Name",selector:"name",sortable:!0,maxWidth:"240px",cell:function(e){return c.a.createElement("p",{title:e.name,className:"text-truncate text-bold-500 mb-0"},e.name)}},{name:"Relation",selector:"relation",sortable:!0,width:"170px",cell:function(e){return c.a.createElement("p",{title:null===e||void 0===e?void 0:e.relation,className:"text-truncate text-bold-500 mb-0"},null===e||void 0===e?void 0:e.relation)}},{name:"Contact",selector:"primaryContact",maxWidth:"170px",sortable:!0},{name:"Email",maxWidth:"235px",selector:"email",sortable:!0},{name:"Status",maxWidth:"120px",selector:"unused",sortable:!0,cell:function(e){var t,a;return c.a.createElement("span",{className:(null===(t=e.usage)||void 0===t?void 0:t.length)?"chipused":"chipunused"},(null===(a=e.usage)||void 0===a?void 0:a.length)?"Used":"Unused")}},{name:"",sortable:!1,width:"110px",cell:function(e){return c.a.createElement(S,{row:e,setRow:function(){R(!0),j(e)},deleteRow:me})}}],a=[{name:"Info",sortable:!0,width:"50px",cell:function(e){return c.a.createElement(L,{row:e,currentData:pe})}},{name:"Name",selector:"name",sortable:!0,minWidth:"50px",cell:function(e){return c.a.createElement("p",{style:{fontSize:"10px"},title:e.name,className:"text-truncate text-bold-500 mb-0"},e.name)}},{name:"Relation",selector:"relation",maxWidth:"50px",sortable:!0,cell:function(e){return c.a.createElement("p",{title:null===e||void 0===e?void 0:e.relation,className:"text-truncate text-bold-500 mb-0"},"others"===(null===e||void 0===e?void 0:e.relation)?null===e||void 0===e?void 0:e.relation1:null===e||void 0===e?void 0:e.relation)}},{name:"Trash",sortable:!0,width:"50px",cell:function(e){return c.a.createElement(S,{row:e,currentData:pe,deleteRow:me})}}],n=Object(i.useState)([]),s=Object(l.a)(n,2),u=s[0],h=s[1],w=Object(i.useState)(null),O=Object(l.a)(w,2),x=O[0],j=O[1],E=Object(i.useState)(!1),N=Object(l.a)(E,2),C=N[0],R=N[1],P=Object(i.useState)([]),T=Object(l.a)(P,2),W=T[0],A=T[1],F=Object(i.useState)(""),H=Object(l.a)(F,2),I=H[0],V=H[1],M=Object(i.useState)(!1),U=Object(l.a)(M,2),_=U[0],B=U[1],G=Object(i.useState)(null),J=Object(l.a)(G,2),Y=J[0],q=J[1],K=Object(i.useState)(0),Q=Object(l.a)(K,2),X=Q[0],Z=Q[1],$=Object(i.useState)([]),ee=Object(l.a)($,2),te=ee[0],ae=ee[1],ne=Object(i.useState)(""),re=Object(l.a)(ne,2),oe=re[0],le=re[1],ie=Object(i.useState)(!1),ce=Object(l.a)(ie,2),se=ce[0],ue=ce[1];Object(i.useEffect)((function(){e.dataList.data.length!==u.length&&(h(e.dataList.data),A(e.dataList.filteredData),Z(e.dataList.totalRecords),ae(e.dataList.sortIndex))}),[e.dataList]),Object(i.useEffect)((function(){e.getData(),e.dataTest()}),[]);var de=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];B(e),!0===t&&(q(null),le(t))},me=function(t){e.deleteData(t),e.getData()},fe=function(){var t=Object(o.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return ue(!0),t.prev=1,t.next=4,e.addData(a);case 4:ue(!1),de(!1,!0),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),ue(!1),p.b.error("Add Nominee Failed! Please contact admin");case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),be=function(){var t=Object(o.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!==a.name&&""!==a.relation&&""!==a.email&&""!==a.contact1&&""!==a.address){t.next=4;break}p.b.error("Please Fill All Mandatory Details"),t.next=17;break;case 4:return ue(!0),t.prev=5,t.next=8,e.updateData(a);case 8:e.getData(),ue(!1),de(!1,!0),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(5),ue(!1),p.b.error("Unable to update! Please try again");case 17:case"end":return t.stop()}}),t,null,[[5,13]])})));return function(e){return t.apply(this,arguments)}}(),pe=function(e){q(e),de(!0)};return e.listLoading?c.a.createElement("div",{className:"d-flex justify-content-center"},c.a.createElement(b.a,{color:"warning",size:"lg"})):c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",{className:"warning spacing nodisplay"},"Nominees"),c.a.createElement(d.a,null,c.a.createElement(p.a,null),c.a.createElement(m.a,{sm:"12"},c.a.createElement("div",{className:"data-list ".concat(e.thumbView?"thumb-view":"list-view")},c.a.createElement(f.a,{handleConfirm:function(){me(x),R(!1)},isOpen:C,closeModal:function(){return R(!1)}}),c.a.createElement(v.a,{width:"200",columns:window.screen.width<500?a:t,data:I.length?W:u,noHeader:!0,subHeader:!0,selectableRows:(window.screen.width,!1),responsive:!0,pointerOnHover:!0,selectableRowsHighlight:!0,customStyles:D,subHeaderComponent:c.a.createElement(z,{className:"data-table",handleSidebar:de,handleFilter:function(t){V(t.target.value),e.filterData(t.target.value)},handleRowsPerPage:function(e){},total:X,index:te}),sortIcon:c.a.createElement(y.a,null)}),c.a.createElement(k.a,{show:_,data:Y,updateData:be,addData:fe,isLoading:se,handleSidebar:de,thumbView:e.thumbView,getData:e.getData,dataParams:e.parsedFilter,addNew:oe}),c.a.createElement("div",{className:g()("data-list-overlay",{show:_}),onClick:function(){return de(!1,!0)}})))))}))}}]);