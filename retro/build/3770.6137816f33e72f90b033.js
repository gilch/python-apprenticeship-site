(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[3770],{64831:(e,t,n)=>{"use strict";n.d(t,{L:()=>i,q:()=>r});var s=n(66065);const i=new s.Token("@jupyterlite/kernel:IKernels"),r=new s.Token("@jupyterlite/kernelspec:IKernelSpecs")},33770:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>M});var s=n(66065);const i=new s.Token("@jupyterlite/contents:IContents");var r=n(78548),a=n(13240),o=n(58137),c=n(75486),l=n.n(c);const d="JupyterLite Storage";class h{constructor(){this._serverContents=new Map,this._isDisposed=!1,this._fileChanged=new o.Signal(this),this._storage=l().createInstance({name:d,description:"Offline Storage for Notebooks and Files",storeName:"files",version:1}),this._counters=l().createInstance({name:d,description:"Store the current file suffix counters",storeName:"counters",version:1}),this._checkpoints=l().createInstance({name:d,description:"Offline Storage for Checkpoints",storeName:"checkpoints",version:1})}get fileChanged(){return this._fileChanged}get isDisposed(){return this._isDisposed}get serverSettings(){return a.ServerConnection.makeSettings()}dispose(){throw new Error("Method not implemented.")}async newUntitled(e){var t,n,s;const i=null!==(t=null==e?void 0:e.path)&&void 0!==t?t:"",r=null!==(n=null==e?void 0:e.type)&&void 0!==n?n:"notebook",a=(new Date).toISOString(),o=i?`${i}/`:"";let c,l="";switch(r){case"directory":l+=`Untitled Folder${await this._incrementCounter("directory")||""}`,c={name:l,path:`${o}${l}`,last_modified:a,created:a,format:"text",mimetype:"",content:null,size:void 0,writable:!0,type:"directory"};break;case"file":{const t=null!==(s=null==e?void 0:e.ext)&&void 0!==s?s:".txt";l+=`untitled${await this._incrementCounter("file")||""}${t}`,c={name:l,path:`${o}${l}`,last_modified:a,created:a,format:"text",mimetype:"text/plain",content:"",size:0,writable:!0,type:"file"};break}default:l+=`Untitled${await this._incrementCounter("notebook")||""}.ipynb`,c={name:l,path:`${o}${l}`,last_modified:a,created:a,format:"json",mimetype:"application/json",content:p.EMPTY_NB,size:JSON.stringify(p.EMPTY_NB).length,writable:!0,type:"notebook"}}const d=`${o}${l}`;return await this._storage.setItem(d,c),c}async copy(e,t){let n=r.PathExt.basename(e);for(t=""===t?"":`${t.slice(1)}/`;await this.get(`${t}${n}`,{content:!0});){const e=r.PathExt.extname(n),t=n.replace(e,"");n=`${t} (copy)${e}`}const s=`${t}${n}`;let i=await this.get(e,{content:!0});return i={...i,name:n,path:s},await this._storage.setItem(s,i),i}async get(e,t){if(""===(e=decodeURIComponent(e.replace(/^\//,""))))return await this.getFolder(e);const n=await this._storage.getItem(e),s=await this.getServerContents(e,t),i=n||s;if(!i)throw Error(`Could not find file with path ${e}`);if(!(null==t?void 0:t.content))return{...i,content:null,size:void 0};if("directory"===i.type){const t=new Map;await this._storage.iterate(((n,s)=>{const i=n;s===`${e}/${i.name}`&&t.set(i.name,i)}));const n=s?s.content:Array.from((await this.getServerDirectory(e)).values());for(const e of n)t.has(e.name)||t.set(e.name,e);const a=[...t.values()];return{name:r.PathExt.basename(e),path:e,last_modified:i.last_modified,created:i.created,format:"json",mimetype:"application/json",content:a,size:void 0,writable:!0,type:"directory"}}return i}async getFolder(e){const t=new Map;await this._storage.iterate(((e,n)=>{if(n.includes("/"))return;const s=e;t.set(s.path,s)}));for(const n of(await this.getServerDirectory(e)).values())t.has(n.path)||t.set(n.path,n);return{name:"",path:e,last_modified:new Date(0).toISOString(),created:new Date(0).toISOString(),format:"json",mimetype:"application/json",content:Array.from(t.values()),size:void 0,writable:!0,type:"directory"}}async getServerDirectory(e){const t=this._serverContents.get(e)||new Map;if(!this._serverContents.has(e)){const n=r.URLExt.join(r.PageConfig.getBaseUrl(),"api/contents",e,"all.json");try{const e=await fetch(n),s=JSON.parse(await e.text());for(const e of s.content)t.set(e.name,e)}catch(e){console.warn(`don't worry, about ${e}... nothing's broken. if there had been a\n          file at ${n}, you might see some more files.`)}this._serverContents.set(e,t)}return t}async getServerContents(e,t){const n=r.PathExt.basename(e);let s=(await this.getServerDirectory(r.URLExt.join(e,".."))).get(n)||{name:n,path:e,last_modified:new Date(0).toISOString(),created:new Date(0).toISOString(),format:"text",mimetype:"text/plain",type:"file",writable:!0,content:null};if(null==t?void 0:t.content)if("directory"===s.type){const t=await this.getServerDirectory(e);s={...s,content:Array.from(t.values())}}else{const t=r.URLExt.join(r.PageConfig.getBaseUrl(),"files",e),n=await fetch(t);if(!n.ok)return null;const i=s.mimetype||n.headers.get("Content-Type");s="notebook"===s.type||-1!==(null==i?void 0:i.indexOf("json"))||e.match(/\.(ipynb|[^/]*json[^/]*)$/)?{...s,content:await n.json(),format:"json",mimetype:s.mimetype||"application/json"}:"image/svg+xml"===i||-1!==i.indexOf("text")?{...s,content:await n.text(),format:"text",mimetype:i||"text/plain"}:{...s,content:btoa(String.fromCharCode(...new Uint8Array(await n.arrayBuffer()))),format:"base64",mimetype:i||"octet/stream"}}return s}async rename(e,t){const n=decodeURIComponent(e),s=await this.get(n,{content:!0});if(!s)throw Error(`Could not find file with path ${n}`);const i=(new Date).toISOString(),a=r.PathExt.basename(t),o={...s,name:a,path:t,last_modified:i};if(await this._storage.setItem(t,o),await this._storage.removeItem(n),await this._checkpoints.removeItem(n),"directory"===s.type){let n;for(n of s.content)await this.rename(r.URLExt.join(e,n.name),r.URLExt.join(t,n.name))}return o}async save(e,t={}){var n;let s=await this.get(e);s||(s=await this.newUntitled({path:e}));const i=(new Date).toISOString();s={...s,...t,last_modified:i};const a=r.PathExt.extname(null!==(n=t.name)&&void 0!==n?n:"");if(t.content&&"base64"===t.format){const e=atob(t.content),n=".ipynb"===a;s={...s,content:n?JSON.parse(e):e,format:n?"json":"text",type:n?"notebook":"file"}}return await this._storage.setItem(e,s),s}async delete(e){e=decodeURIComponent(e);const t=[];await this._storage.iterate(((n,s)=>{(s===e||s.startsWith(`${e}/`))&&t.push(s)})),await Promise.all(t.map((async e=>Promise.all([this._storage.removeItem(e),this._checkpoints.removeItem(e)]))))}async createCheckpoint(e){var t;const n=await this.get(e,{content:!0}),s=(null!==(t=await this._checkpoints.getItem(e))&&void 0!==t?t:[]).filter((e=>!!e));return s.push(n),s.length>5&&s.splice(0,s.length-5),await this._checkpoints.setItem(e,s),{id:""+(s.length-1),last_modified:n.last_modified}}async listCheckpoints(e){return(await this._checkpoints.getItem(e)||[]).filter((e=>!!e)).map(((e,t)=>({id:t.toString(),last_modified:e.last_modified})))}async restoreCheckpoint(e,t){const n=(await this._checkpoints.getItem(e)||[])[parseInt(t)];await this._storage.setItem(e,n)}async deleteCheckpoint(e,t){const n=await this._checkpoints.getItem(e)||[],s=parseInt(t);n.splice(s,1),await this._checkpoints.setItem(e,n)}addDrive(e){throw new Error("Method not implemented.")}localPath(e){throw new Error("Method not implemented.")}normalize(e){throw new Error("Method not implemented.")}resolvePath(e,t){throw new Error("Method not implemented.")}driveName(e){throw new Error("Method not implemented.")}getModelDBFactory(e){throw new Error("Method not implemented.")}getDownloadUrl(e){throw new Error("Method not implemented.")}async _incrementCounter(e){var t;const n=(null!==(t=await this._counters.getItem(e))&&void 0!==t?t:-1)+1;return await this._counters.setItem(e,n),n}}var p;!function(e){e.EMPTY_NB={metadata:{orig_nbformat:4},nbformat_minor:4,nbformat:4,cells:[]}}(p||(p={}));var m=n(39338),u=n(67411),f=n(79988),w=n(4810);class g{constructor(e){this._kernels=new m.ObservableMap,this._clients=new m.ObservableMap,this._kernelClients=new m.ObservableMap;const{kernelspecs:t}=e;this._kernelspecs=t}async startNew(e){const{id:t,name:n}=e,i=this._kernelspecs.factories.get(n);if(!i)return{id:t,name:n};const r=new w.WU,a=(e,t,n)=>{var s;const i=this._kernels.get(e);if(!i)throw Error(`No kernel ${e}`);this._clients.set(t,n),null===(s=this._kernelClients.get(e))||void 0===s||s.add(t),n.on("message",(async e=>{let t;if(e instanceof ArrayBuffer)e=new Uint8Array(e).buffer,t=(0,u.deserialize)(e);else{if("string"!=typeof e)return;t=(0,u.deserialize)(e)}"input_reply"===t.header.msg_type?i.handleMessage(t):(async e=>{await r.runExclusive((async()=>{await i.handleMessage(e)}))})(t)}));const a=()=>{var n;this._clients.delete(t),null===(n=this._kernelClients.get(e))||void 0===n||n.delete(t)};i.disposed.connect(a),n.onclose=a},o=null!=t?t:s.UUID.uuid4(),c=`${g.WS_BASE_URL}api/kernels/${o}/channels`,l=this._kernels.get(o);if(l)return{id:l.id,name:l.name};const d=await i({id:o,sendMessage:e=>{const t=e.header.session,n=this._clients.get(t);if(!n)return void console.warn(`Trying to send message on removed socket for kernel ${o}`);const s=(0,u.serialize)(e);if("iopub"!==e.channel)n.send(s);else{const e=this._kernelClients.get(o);null==e||e.forEach((e=>{var t;null===(t=this._clients.get(e))||void 0===t||t.send(s)}))}},name:n});await d.ready,this._kernels.set(o,d),this._kernelClients.set(o,new Set);const h=new f.Server(c);return h.on("connection",(e=>{var t;const n=null!==(t=new URL(e.url).searchParams.get("session_id"))&&void 0!==t?t:"";a(o,n,e)})),h.on("close",(()=>{this._clients.keys().forEach((e=>{var t;const n=this._clients.get(e);(null==n?void 0:n.readyState)===f.WebSocket.CLOSED&&(this._clients.delete(e),null===(t=this._kernelClients.get(o))||void 0===t||t.delete(e))}))})),d.disposed.connect((()=>{h.close(),this._kernels.delete(o),this._kernelClients.delete(o)})),{id:d.id,name:d.name}}async restart(e){const t=this._kernels.get(e);if(!t)throw Error(`Kernel ${e} does not exist`);const{id:n,name:s}=t;return t.dispose(),this.startNew({id:n,name:s})}async shutdown(e){var t;null===(t=this._kernels.delete(e))||void 0===t||t.dispose()}}!function(e){e.WS_BASE_URL=r.PageConfig.getBaseUrl().replace(/^http/,"ws")}(g||(g={}));class v{constructor(e){this._specs=new Map,this._factories=new Map}get specs(){return 0===this._specs.size?null:{default:"python",kernelspecs:Object.fromEntries(this._specs)}}get factories(){return this._factories}register(e){const{spec:t,create:n}=e;this._specs.set(t.name,t),this._factories.set(t.name,n)}}var _=n(64831),y=n(52075);const k=new s.Token("@jupyterlite/session:ISessions");var S=n(79028);class C{constructor(e){this._sessions=[],this._kernels=e.kernels}async get(e){const t=this._sessions.find((t=>t.id===e));if(!t)throw Error(`Session ${e} not found`);return t}async list(){return this._sessions}async patch(e){const{id:t,path:n,name:s}=e,i=this._sessions.findIndex((e=>e.id===t)),r=this._sessions[i];if(!r)throw Error(`Session ${t} not found`);const a={...r,path:null!=n?n:r.path,name:null!=s?s:r.name};return this._sessions[i]=a,a}async startNew(e){var t,n,i;const{path:r,name:a}=e,o=this._sessions.find((e=>e.name===a));if(o)return o;const c=null!==(n=null===(t=e.kernel)||void 0===t?void 0:t.name)&&void 0!==n?n:"",l=null!==(i=e.id)&&void 0!==i?i:s.UUID.uuid4(),d=await this._kernels.startNew({id:l,name:c}),h={id:l,path:r,name:null!=a?a:r,type:"notebook",kernel:{id:d.id,name:d.name}};return this._sessions.push(h),h}async shutdown(e){var t;const n=this._sessions.find((t=>t.id===e));if(!n)throw Error(`Session ${e} not found`);const s=null===(t=n.kernel)||void 0===t?void 0:t.id;s&&await this._kernels.shutdown(s),S.ArrayExt.removeFirstOf(this._sessions,n)}}const b=new s.Token("@jupyterlite/settings:ISettings");var x,I=n(96111);class E{constructor(){this._storage=l().createInstance({name:"JupyterLite Storage",description:"Offline Storage for Settings",storeName:"settings",version:1})}async get(e){let t=(await this.getAll()).settings.find((t=>t.id===e));return t||(t=await this._getFederated(e)),t}async getAll(){var e;const t=null!==(e=r.PageConfig.getOption("settingsUrl"))&&void 0!==e?e:"/",n=await(await fetch(r.URLExt.join(t,"all.json"))).json();return{settings:await Promise.all(n.map((async e=>{var t;const{id:n}=e,s=null!==(t=await this._storage.getItem(n))&&void 0!==t?t:e.raw;return{...x.override(e),raw:s,settings:I.parse(s)}})))}}async save(e,t){await this._storage.setItem(e,t)}async _getFederated(e){var t;const[n,s]=e.split(":");if(!x.isFederated(n))return;const i=r.PageConfig.getOption("fullLabextensionsUrl"),a=r.URLExt.join(i,n,"schemas",n,`${s}.json`),o=r.URLExt.join(i,n,"package.json"),c=await(await fetch(a)).json(),l=await(await fetch(o)).json(),d=null!==(t=await this._storage.getItem(e))&&void 0!==t?t:"{}",h=I.parse(d)||{};return x.override({id:e,raw:d,schema:c,settings:h,version:l.version||"3.0.8"})}}!function(e){const t=JSON.parse(r.PageConfig.getOption("settingsOverrides")||"{}");e.isFederated=function(e){let t;try{t=JSON.parse(r.PageConfig.getOption("federated_extensions"))}catch{return!1}for(const{name:n}of t)if(n===e)return!0;return!1},e.override=function(e){if(t[e.id]){e.schema.properties||(e.schema.properties={});for(const[n,s]of Object.entries(t[e.id]||{}))e.schema.properties[n].default=s}return e}}(x||(x={}));const j={id:"@jupyterlite/server-extension:contents",autoStart:!0,provides:i,activate:e=>new h},U={id:"@jupyterlite/server-extension:kernels",autoStart:!0,provides:_.L,requires:[_.q],activate:(e,t)=>new g({kernelspecs:t})},$={id:"@jupyterlite/server-extension:kernelspec",autoStart:!0,provides:_.q,activate:e=>new v({})},O={id:"@jupyterlite/server-extension:sessions",autoStart:!0,provides:k,requires:[_.L],activate:(e,t)=>new C({kernels:t})},M=[j,U,$,{id:"@jupyterlite/server-extension:server",autoStart:!0,requires:[i,_.L,_.q,k,b],activate:(e,t,n,s,i,r)=>{const a=new y.JupyterServer({contents:t,kernels:n,kernelspecs:s,sessions:i,settings:r}),o=new y.LiteServiceManager({server:a});e.registerServiceManager(o)}},O,{id:"@jupyterlite/server-extension:settings",autoStart:!0,provides:b,activate:e=>new E}]}}]);
//# sourceMappingURL=3770.6137816f33e72f90b033.js.map