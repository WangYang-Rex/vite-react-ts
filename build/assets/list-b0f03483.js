import{r as i,j as o,a as t}from"./index-3d162b52.js";import{I as y,B as c,T as w,P as S,F as d,S as k}from"./fetch-87842fe6.js";import{d as x}from"./dayjs.min-bf0d876a.js";import{U as j,m as p}from"./index-2ed473cf.js";import"./lodash-16a5b9a8.js";import"./InfoCircleFilled-a9fe33cc.js";function P(){const[u,m]=i.useState([]),a=i.useRef({page:1,pageSize:20,count:0}),s=async()=>{let e=await d.post("/file/list.rjson",{page:a.current.page,pageSize:a.current.pageSize});a.current.count=e.count,m(e.list)},f=async e=>{await d.post("/file/delete.rjson",{id:e}),s()};i.useLayoutEffect(()=>{s()},[]);const n=[{title:"文件名称",dataIndex:"filename",key:"filename",width:240,ellipsis:!0},{title:"cdn地址",dataIndex:"cdnurl",key:"cdnurl",ellipsis:!0,render:e=>t("a",{href:e,target:"_blank",rel:"noreferrer",children:e})},{title:"创建时间",dataIndex:"created",key:"created",width:200,ellipsis:!0,render:e=>x(e).format("YYYY-MM-DD HH:mm:ss")},{title:"Action",key:"action",width:180,fixed:"right",render:(e,l)=>t(k,{size:"middle",children:t("a",{onClick:()=>f(l.id),children:"删除"})})}];let r=0;n.map(e=>{r=r+(e.width||200)});const h=e=>{a.current.page=e,s()},g=(e,l)=>{};return o("div",{className:"main JsErrorList",children:[o("div",{className:"content-header",children:["文件名称：",t(y,{className:"mr_12",style:{width:120},onChange:e=>g("filename",e.target.value)}),t(c,{type:"primary",className:"mr_12",onClick:s,children:"查询"}),t(j,{...{name:"file",action:"/file/upload/stream.rjson",method:"POST",listType:"picture",showUploadList:!1,onChange:e=>{e.file.status!=="uploading"&&console.log(e.file,e.fileList),e.file.status==="done"?(console.log(e),p.success("上传成功"),s()):e.file.status==="error"&&p.error(`${e.file.response.data} 上传失败`)}},children:t(c,{type:"primary",children:"上传图片"})})]}),t("div",{className:"content-table",children:t(w,{columns:n,dataSource:u,scroll:{x:r,y:window.innerHeight-200},pagination:!1})}),t("div",{className:"content-footer mt_12",children:t(S,{size:"small",total:a.current.count,onChange:h,current:a.current.page,pageSize:a.current.pageSize,showTotal:e=>`总条数${e}`})})]})}export{P as default};