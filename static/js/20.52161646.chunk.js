(this.webpackJsonplastArzi=this.webpackJsonplastArzi||[]).push([[20],{455:function(e,a,t){},571:function(e,a,t){},601:function(e,a,t){"use strict";t.r(a);var n=t(7),l=t(0),r=t.n(l),o=t(547),c=t(154),s=t(79),i=t(587),d=t(588),m=t(149),u=t.n(m),p=t(415),b=t(589),f=t(590),E=t(591),g=t(444),h=t(476),k=t(15),v=t(18),N=t.n(v),T=t(26),y=t(23),C=t.n(y),S=t(91),O=t(80),j=localStorage.getItem("authtoken"),U=function(e){if(JSON.parse(localStorage.getItem("logInUserData"))){var a=localStorage.getItem("logInUserData")?JSON.parse(localStorage.getItem("logInUserData")):{};return function(){var t=Object(T.a)(N.a.mark((function t(n){return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.a.get("backendapi/diary/list?user=".concat(a._id),{params:e,headers:{Authorization:"Bearer ".concat(j)}}).then((function(a){n({type:"GET_TODOS",todos:a.data,routeParams:e})})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},x=function(e){return function(a){a({type:"COMPLETE_TASK",id:e.id,value:e.isCompleted})}},w=function(e){return function(a){Promise.all([a({type:"STAR_TASK",id:e.id,value:e.isStarred})])}},A=function(e){return function(a){Promise.all([a({type:"IMPORTANT_TASK",id:e.id,value:e.isImportant})])}},P=Object(k.b)((function(e){return console.log("state find",e.todoApp.todo.routeParam),{selectedFilter:e.todoApp.todo.routeParam}}),{changeFilter:function(e){return function(a){a({type:"CHANGE_FILTER",filter:e}),S.a.push("/#/diary/".concat(e)),a(U({filter:e}))}}})((function(e){var a=e.selectedFilter;return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"sidebar-close-icon",onClick:function(){return e.mainSidebar(!1)}},r.a.createElement(p.a,{size:15})),r.a.createElement("div",{className:"todo-app-menu"},r.a.createElement("div",{className:"add-task"},r.a.createElement(s.a.Ripple,{block:!0,className:"btn-block",color:"warning",onClick:function(){e.addTask("open"),e.mainSidebar(!1)}},"Add Notes")),r.a.createElement(u.a,{className:"sidebar-menu-list",options:{wheelPropagation:!1}},r.a.createElement(i.a,{className:"font-medium-1"},r.a.createElement(d.a,{className:"border-0 pt-0",action:!0,onClick:function(){e.changeFilter("all")}},r.a.createElement(b.a,{color:"all"===a?"var(--warning)":"currentColor",size:22}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"all"===a?"var(--warning)":"var(--currentColor)"}},"All"))),r.a.createElement("hr",null),r.a.createElement("h5",{className:"mt-2 mb-1 pt-25"},"Filters"),r.a.createElement(i.a,{className:"font-medium-1"},r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("important")},active:"/diary/important"===e.routerProps.location.pathname,style:{padding:"0.5rem",backgroundColor:"important"===a?"var(--danger)":"",borderTopRightRadius:"0.5rem"}},r.a.createElement(f.a,{size:22}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"var(--currentColor)"}},"Important")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("starred")},style:{padding:"0.5rem",backgroundColor:"starred"===a?"#07ab9e":""},active:"/diary/starred"===e.routerProps.location.pathname},r.a.createElement(E.a,{size:22}),r.a.createElement("span",{className:"align-middle ml-1"},"Bookmark")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("completed")},style:{padding:"0.5rem",backgroundColor:"completed"===a?"#09b6cd":""},active:"/diary/completed"===e.routerProps.location.pathname},r.a.createElement(g.a,{size:22}),r.a.createElement("span",{className:"align-middle ml-1"},"Completed")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("trashed")},style:{padding:"0.5rem",backgroundColor:"trashed"===a?"#e12727":""},active:"/diary/trashed"===e.routerProps.location.pathname},r.a.createElement(h.a,{size:22}),r.a.createElement("span",{className:"align-middle ml-1"},"Trashed"))),r.a.createElement("hr",null),r.a.createElement("h5",{className:"mt-2 mb-1 pt-25"},"Labels"),r.a.createElement(i.a,{className:"font-medium-1"},r.a.createElement(d.a,{type:"button",className:"border-0",onClick:function(){e.changeFilter("personal")}},r.a.createElement("span",{className:"bullet bullet-primary align-middle"}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"personal"===a?"var(--primary)":"var(--currentColor)"}},"Personal")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("professional")}},r.a.createElement("span",{className:"bullet bullet-warning align-middle"}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"professional"===a?"var(--warning)":"var(--currentColor)"}},"Professional")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("others")}},r.a.createElement("span",{className:"bullet bullet-success align-middle"}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"others"===a?"var(--success)":"var(--currentColor)"}},"Others")),r.a.createElement(d.a,{className:"border-0",onClick:function(){e.changeFilter("todo")}},r.a.createElement("span",{className:"bullet bullet-danger align-middle"}),r.a.createElement("span",{className:"align-middle ml-1",style:{color:"todo"===a?"var(--danger)":"var(--currentColor)"}},"TO DO List"))))))})),z=t(452),I=t(436),D=t(580),F=t(464),R=t(442),L=t(592),_=t(147),B=t(148),K=t(450),V=t(593),H=Object(k.b)((function(e){return{app:e.todoApp}}),{getTodos:U,completeTask:x,starTask:w,importantTask:A,trashTask:function(e){return function(a,t){var n=t().todoApp.todo.routeParam;C.a.post("/api/app/todo/trash-todo",e,{headers:{Authorization:"Bearer ".concat(j)}}).then((function(t){return a({type:"TRASH_TASK",id:e})})).then(a(U(n)))}},searchTask:function(e){return function(a){a({type:"SEARCH_TASK",val:e})}}})((function(e){var a,t=Object(l.useState)(!1),o=Object(n.a)(t,2),c=o[0],i=o[1],d=Object(l.useState)(null),m=Object(n.a)(d,2),p=m[0],b=m[1],g=Object(l.useState)([]),k=Object(n.a)(g,2),v=k[0],y=k[1],C=Object(l.useState)(""),S=Object(n.a)(C,2),O=S[0],j=S[1],U=(null===e||void 0===e||null===(a=e.routerProps)||void 0===a?void 0:a.location).pathname;Object(l.useEffect)((function(){e.app.todo.todos&&y(e.app.todo.todos)}),[e.app.todo]),Object(l.useEffect)((function(){x()}),[]);var x=function(){var a=Object(T.a)(N.a.mark((function a(){var t,n;return N.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(U){a.next=2;break}return a.abrupt("return");case 2:return a.next=4,e.getTodos(U);case 4:y(null===e||void 0===e||null===(t=e.app)||void 0===t||null===(n=t.todo)||void 0===n?void 0:n.todos);case 5:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}(),w=e.routerProps.match.params.filter,A=O.length?e.app.todo.filteredTodos:v;if(void 0===A)return r.a.createElement("div",{className:"fallback-spinner vh-100"},r.a.createElement("div",{className:"loading"},r.a.createElement("div",{className:"effect-1 effects"}),r.a.createElement("div",{className:"effect-2 effects"}),r.a.createElement("div",{className:"effect-3 effects"})));var P=A.length>0?A.map((function(a,t){var n={weekday:"short",year:"numeric",month:"short",day:"numeric"},l=new Date(a.createdAt);return r.a.createElement("li",{style:{border:"none",padding:"0",margin:"0 1.6rem"},className:"todo-item ".concat(a.isCompleted?"completed":""),key:t,onClick:function(){e.handleUpdateTask(a)}},r.a.createElement(z.a,{isOpen:c,className:"modal-dialog-centered",backdrop:"static"},r.a.createElement(I.a,null,"Are you sure you want to delete this record?"),r.a.createElement(D.a,null,r.a.createElement(s.a,{color:"primary",className:"button-label",onClick:function(){i(!1)}},"Cancel"),r.a.createElement(s.a,{color:"danger",onClick:function(){i(!1),e.trashTask(p)},className:"button-label"},"Delete"))),r.a.createElement(F.a,{className:"mt-1 mb-0",style:{minHeight:"110px"}},r.a.createElement(R.a,{className:"p-0 d-flex"},r.a.createElement("div",{id:"left-content",className:"w-100 p-1"},window.screen.width<=500?r.a.createElement("div",{id:"top-content",className:"d-block"},r.a.createElement("i",{className:"m-0",style:{fontSize:"1.15rem",fontWeight:"bold"}},a.title),r.a.createElement("p",{style:{fontSize:"1rem"}},l.toLocaleDateString("en-US",n))):r.a.createElement("div",{id:"top-content",className:"d-flex"},r.a.createElement("p",{style:{fontSize:"1.15rem",fontWeight:"bold"}},a.title)),r.a.createElement("div",{id:"bottom-content"},a.desc.length>0?r.a.createElement("p",{className:"todo-desc mb-0",style:{wordBreak:"break-all",whiteSpace:"normal",fontSize:"1.15rem"}},a.desc):"")),r.a.createElement("div",{id:"options"},r.a.createElement("div",{style:{maxHeight:"110px"},className:"d-flex flex-row justify-content-between"},a.isImportant&&r.a.createElement("div",{style:{padding:"0.5rem",backgroundColor:"var(--danger)",borderTopRightRadius:"0.5rem"},onClick:function(t){t.stopPropagation(),e.importantTask(a)}},r.a.createElement(f.a,{size:23,color:"white"})),a.isStarred&&r.a.createElement("div",{style:{padding:"0.5rem",backgroundColor:"#07ab9e"},onClick:function(t){t.stopPropagation(),e.starTask(a)}},r.a.createElement(E.a,{size:23,color:"white"})),"trashed"!==w?r.a.createElement("div",{style:{padding:"0.5rem",backgroundColor:"#e12727"}},r.a.createElement(h.a,{size:23,color:"currentColor",onClick:function(e){e.stopPropagation(),b(a.id),i(!0)}})):null))),r.a.createElement(L.a,{style:{fontSize:"0.8rem"}},"Edited On :",r.a.createElement("span",null,l.toLocaleDateString("en-US",n)))))})):r.a.createElement("p",{className:"p-1 text-center mt-2 font-medium-3 text-bold-500"},"No tasks at this time");return r.a.createElement("div",{className:"content-right h-100"},r.a.createElement("div",{className:"todo-app-area h-100"},r.a.createElement("div",{className:"todo-app-list-wrapper h-100"},r.a.createElement("div",{className:"todo-app-list h-100"},r.a.createElement("div",{className:"app-fixed-search"},r.a.createElement("div",{className:"sidebar-toggle d-inline-block d-lg-none",onClick:function(){return e.mainSidebar(!0)}},r.a.createElement(K.a,{size:24})),r.a.createElement(_.a,{style:{display:"flex",margin:"auto",justifyContent:"center"},className:"position-relative has-icon-left"},r.a.createElement("div",{style:{borderRadius:"1.428rem"}},r.a.createElement("div",{className:"form-control-position"},r.a.createElement(V.a,{size:15})),r.a.createElement(B.a,{style:{width:"100%"},type:"text",placeholder:"Search...",onChange:function(a){return function(a){j(a.target.value),e.searchTask(a.target.value)}(a)},value:O})))),r.a.createElement(u.a,{className:"todo-task-list",options:{wheelPropagation:!1}},r.a.createElement("ul",{className:"todo-task-list-wrapper"},P))))))})),J=t(4),M=t(441),G=t(453),W=t(451),q=t(429),Q=t(58),X=t(594),Y=t(152),Z=t(507),$=t.n(Z),ee=t(512),ae=(t(513),[{value:"Attachment",label:"Attachment",color:"#00B8D9",isFixed:!0},{value:"Scribble",label:"Scribble",color:"#00B8D9",isFixed:!0},{value:"Text",label:"Text",color:"#00B8D9",isFixed:!0},{value:"Video",label:"Video",color:"#0052CC",isFixed:!0},{value:"Voice",label:"Voice",color:"#0052CC",isFixed:!0}]),te=Object(k.b)((function(e){return{app:e.todoApp}}),{completeTask:x,importantTask:A,starTask:w,updateTask:function(e,a,t,n,l,r,o,c){var s={_id:e,title:a,desc:t,taskToUpdate:n,isCompleted:l,isImportant:r,isStarred:o,tags:c},i=C.a.post("/backendapi/diary/update",s,{headers:{Authorization:"Bearer ".concat(j)}});return function(e,a){var t=a().todoApp.todo.routeParam;i.then((function(a){Promise.all([e({type:"UPDATE_TASK",ans:s})]).then((function(){return e(U(t))}))}))}},updateLabel:function(e,a){return function(t,n){t({type:"UPDATE_LABEL",label:a,id:e})}},addNewTask:function(e){return function(a,t){var n=t().todoApp.todo.routeParam,l=JSON.parse(localStorage.getItem("logInUserData"))._id;e.user=l,C.a.post("/backendapi/diary/add",e,{headers:{Authorization:"Bearer ".concat(j)}}).then((function(t){a({type:"ADD_TASK",task:e}),a(U(n)),O.b.success("Note Added Successfully!!")}))}}})((function(e){var a=Object(l.useState)({url:null,blob:null,chunks:null,duration:{h:0,m:0,s:0}}),t=Object(n.a)(a,2),o=t[0],c=t[1],i=Object(l.useState)({title:"",desc:"",tags:[],isCompleted:!1,isImportant:!1,isStarred:!1}),d=Object(n.a)(i,2),m=d[0],b=d[1],h=Object(l.useState)(""),k=Object(n.a)(h,2),v=k[0],N=k[1],T=Object(l.useState)(null),y=Object(n.a)(T,2),C=y[0],S=y[1],O=Object(l.useState)(""),j=Object(n.a)(O,2),U=j[0],x=j[1],w=Object(l.useState)(""),A=Object(n.a)(w,2),P=A[0],z=A[1],I=Object(l.useState)(!1),D=Object(n.a)(I,2),F=D[0],R=D[1],L=Object(l.useState)(!1),K=Object(n.a)(L,2),V=K[0],H=K[1],Z=Object(l.useState)(!1),te=Object(n.a)(Z,2),ne=te[0],le=te[1],re=Object(l.useState)(!1),oe=Object(n.a)(re,2),ce=oe[0],se=oe[1],ie=r.a.createRef();Object(l.useEffect)((function(){if(e.taskToUpdate){var a=e.taskToUpdate,t=a.title,n=a.id,l=a.desc,r=a.isCompleted,o=a.isStarred,c=a.isImportant;S(e.taskToUpdate),null!==n&&le(!0),x(t),z(l),R(r),H(o),se(c)}}),[e.taskToUpdate]);var de=function(e){var a=m.tags;a.includes(e)?a.splice(a.indexOf(e),1):a.push(e),b(Object(J.a)(Object(J.a)({},m),{},{tags:e}))};return r.a.createElement("div",{className:"task-sidebar ".concat(!0===e.addTaskState?"show":"")},r.a.createElement("div",{className:"task-header"},r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("div",{className:"task-type-title text-bold-600"},r.a.createElement("h3",{style:{color:"var(--warning)"}},e.taskToUpdate&&e.taskToUpdate.id?"Update Details":"Enter Details")),r.a.createElement("div",{className:"close-icon"},r.a.createElement(p.a,{className:"cursor-pointer",size:20,onClick:function(){e.addTask("close")}})))),r.a.createElement(u.a,null,r.a.createElement("div",{className:"task-body"},r.a.createElement("div",{className:"d-flex justify-content-between mb-2"},r.a.createElement("div",{className:"mark-complete"},e.taskToUpdate&&e.taskToUpdate.id&&r.a.createElement(Y.a,{color:"primary",className:"user-checkbox",icon:r.a.createElement(g.a,{className:"vx-icon",size:15}),label:"Completed",checked:F,onChange:function(a){e.completeTask(e.taskToUpdate)}})),r.a.createElement("div",{className:"task-actions"},r.a.createElement(f.a,{size:20,className:"mr-50 ".concat(null!==e.taskToUpdate&&ce||m.isImportant?"text-success":""),onClick:function(){null!==e.taskToUpdate?e.importantTask(e.taskToUpdate):b(Object(J.a)(Object(J.a)({},m),{},{isImportant:!m.isImportant}))}}),r.a.createElement(E.a,{size:20,className:"mr-50 ".concat(null!==e.taskToUpdate&&V||m.isStarred?"text-warning":""),onClick:function(){null!==e.taskToUpdate?e.starTask(e.taskToUpdate):b(Object(J.a)(Object(J.a)({},m),{},{isStarred:!m.isStarred}))}}),r.a.createElement(M.a,{className:"d-inline-block"},r.a.createElement(G.a,{tag:"span"},r.a.createElement(X.a,{className:"mr-50",size:20})),r.a.createElement(W.a,{tag:"ul",right:!0},r.a.createElement(q.a,{tag:"li"},r.a.createElement(Y.a,{color:"primary",className:"user-checkbox",icon:r.a.createElement(g.a,{className:"vx-icon",size:12}),label:"Personal",checked:!!(null!==e.taskToUpdate&&e.taskToUpdate.tags.includes("personal")||m.tags.includes("personal")),size:"sm",onChange:function(a){a.stopPropagation(),null!==e.taskToUpdate?e.updateLabel(C.id,"personal"):de("personal")}})),r.a.createElement(q.a,{tag:"li"},r.a.createElement(Y.a,{color:"primary",labelColor:"#ff9f43",className:"user-checkbox",icon:r.a.createElement(g.a,{className:"vx-icon",size:12}),label:"Professional",checked:!!(null!==e.taskToUpdate&&e.taskToUpdate.tags.includes("professional")||m.tags.includes("professional")),size:"sm",onClick:function(e){return e.stopPropagation()},onChange:function(a){a.stopPropagation(),null!==e.taskToUpdate?e.updateLabel(C.id,"professional"):de("professional")}})),r.a.createElement(q.a,{tag:"li"},r.a.createElement(Y.a,{color:"primary",className:"user-checkbox",icon:r.a.createElement(g.a,{className:"vx-icon",size:12}),label:"Others",labelColor:"#25af63",checked:!!(null!==e.taskToUpdate&&e.taskToUpdate.tags.includes("others")||m.tags.includes("others")),size:"sm",onClick:function(e){return e.stopPropagation()},onChange:function(a){a.stopPropagation(),null!==e.taskToUpdate?e.updateLabel(C.id,"others"):de("others")}})),r.a.createElement(q.a,{tag:"li"},r.a.createElement(Y.a,{color:"primary",className:"user-checkbox",labelColor:"#ea5455",icon:r.a.createElement(g.a,{className:"vx-icon",size:12}),label:"TO DO List",checked:!!(null!==e.taskToUpdate&&e.taskToUpdate.tags.includes("todo")||m.tags.includes("todo")),size:"sm",onClick:function(e){return e.stopPropagation()},onChange:function(a){a.stopPropagation(),null!==e.taskToUpdate?e.updateLabel(C.id,"todo"):de("todo")}})))))),r.a.createElement(_.a,{className:"form-label-group"},r.a.createElement(Q.a,{className:"React",classNamePrefix:"select",ref:ie,name:"color",options:ae,isClearable:!0,placeholder:"Select Message Type...",onChange:function(e){N(e?e.value:"")}})),r.a.createElement(_.a,null,r.a.createElement(B.a,{type:"text",placeholder:"Title",value:null!==e.taskToUpdate?U:m.title,onChange:function(a){null!==e.taskToUpdate?x(a.target.value):b(Object(J.a)(Object(J.a)({},m),{},{title:a.target.value}))}})),r.a.createElement(_.a,null,"Video"===v&&r.a.createElement($.a,{onRecordingComplete:function(e){console.log("videoBlob",e)}}),"Voice"===v&&r.a.createElement(ee.a,{record:!0,title:"New recording",audioURL:o.url,showUIAudio:!0,handleAudioStop:function(e){return function(e){c(e)}(e)},handleAudioUpload:function(e){return a=e,void console.log(a);var a},handleRest:function(){c({url:null,blob:null,chunks:null,duration:{h:0,m:0,s:0}})}})),r.a.createElement(_.a,null,r.a.createElement(B.a,{type:"textarea",placeholder:"Description",rows:"5",value:null!==e.taskToUpdate?P:m.desc,onChange:function(a){null!==e.taskToUpdate?z(a.target.value):b(Object(J.a)(Object(J.a)({},m),{},{desc:a.target.value}))}})),r.a.createElement("div",{className:"chip-wrapper my-1 d-flex flex-wrap"},null!==e.taskToUpdate&&e.taskToUpdate.tags&&e.taskToUpdate.tags.length>0?e.taskToUpdate.tags.map((function(e,a){return r.a.createElement("div",{className:"chip mb-0 mr-50",key:a},r.a.createElement("div",{className:"chip-body"},r.a.createElement("span",{className:"chip-text"},r.a.createElement("span",{className:"bullet bullet-".concat("professional"===e?"warning":"others"===e?"success":"todo"===e?"danger":"primary"," bullet-xs")}),r.a.createElement("span",{className:"text-capitalize ml-25"},e))))})):null),r.a.createElement("div",{className:"d-flex justify-content-end",style:{textAlign:"right"}},r.a.createElement(s.a.Ripple,{outline:!0,className:"mr-1 mb-1 button-label",color:"secondary",onClick:function(){e.addTask("close"),e.handleUndoChanges(),b({title:"",desc:"",tags:[],isCompleted:!1,isImportant:!1,isStarred:!1})}},"Cancel")," ",r.a.createElement(s.a.Ripple,{className:"mb-1 button-label",color:"warning",onClick:function(){if(null!==e.taskToUpdate){var a=C.isCompleted,t=C.isImportant,n=C.isStarred,l=C.tags;e.updateTask(C._id,U,P,C,a,t,n,l)}else e.addNewTask(m);e.addTask("close"),b({title:"",desc:"",tags:[],isCompleted:!1,isImportant:!1,isStarred:!1})},disabled:!(U.length&&P||m.title&&m.desc)},ne?"Update":"Add")))))})),ne=(t(456),t(455),t(571),window.matchMedia("(min-width: 992px)"));a.default=function(e){var a=Object(l.useState)(!1),t=Object(n.a)(a,2),s=t[0],i=t[1],d=Object(l.useState)(!1),m=Object(n.a)(d,2),u=m[0],p=m[1],b=Object(l.useState)(null),f=Object(n.a)(b,2),E=f[0],g=f[1],h=Object(l.useState)(null),k=Object(n.a)(h,2),v=k[0],N=k[1],T=function(e){p(e)},y=function(e){"open"===e?i(!0):(i(!1),g(null))};return r.a.createElement("div",null,r.a.createElement(O.a,null),r.a.createElement("h2",{className:"warning spacing nodisplay"},"Secret Diary"),r.a.createElement("div",{className:"todo-application position-relative"},r.a.createElement("div",{className:"app-content-overlay ".concat(s||u?"show":""),onClick:function(){y("close"),T(!1)}}),r.a.createElement(c.a.Consumer,null,(function(a){return r.a.createElement(o.a,{sidebar:r.a.createElement(P,{routerProps:e,addTask:y,mainSidebar:T}),docked:ne.matches,open:u,sidebarClassName:"sidebar-content todo-sidebar d-flex",touch:!1,contentClassName:"sidebar-children d-none",pullRight:"rtl"===a.state.direction})})),r.a.createElement(H,{routerProps:e,handleUpdateTask:function(e){void 0!==e?(i(!0),g(e)):g(null)},mainSidebar:T,prevState:v,clearPrevState:function(){N(!1)}}),r.a.createElement(te,{addTask:y,addTaskState:s,taskToUpdate:E,mainSidebar:T,handleUndoChanges:function(){N(!0)}})))}}}]);