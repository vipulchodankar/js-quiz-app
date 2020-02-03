define("./workbox-3aad0c8a.js",["exports"],(function(e){"use strict";try{self["workbox:core:5.0.0"]&&_()}catch(e){}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[t.prefix,e,t.suffix].filter(e=>e&&e.length>0).join("-"),s=e=>e||n(t.precache),i=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href},c=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class r extends Error{constructor(e,t){super(c(e,t)),this.name=e,this.details=t}}const o=new Set;const a=(e,t)=>e.filter(e=>t in e),l=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:i=[]})=>{const c=await self.caches.open(e),r=await h({plugins:i,request:t,mode:"read"});let o=await c.match(r,s);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;o=await i.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:r})}return o},u=async({request:e,response:t,event:n,plugins:s=[]})=>{let i=t,c=!1;for(let t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(i=await s.call(t,{request:e,response:i,event:n}),!i)break}return c||(i=i&&200===i.status?i:void 0),i||null},h=async({request:e,mode:t,plugins:n=[]})=>{const s=a(n,"cacheKeyWillBeUsed");let i=e;for(const e of s)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},f=async({cacheName:e,request:t,response:n,event:s,plugins:c=[],matchOptions:f})=>{const w=await h({plugins:c,request:t,mode:"write"});if(!n)throw new r("cache-put-with-no-response",{url:i(w.url)});let d=await u({event:s,plugins:c,response:n,request:w});if(!d)return;const p=await self.caches.open(e),y=a(c,"cacheDidUpdate");let g=y.length>0?await l({cacheName:e,matchOptions:f,request:w}):null;try{await p.put(w,d)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of o)await e()}(),e}for(let t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:g,newResponse:d,request:w})},w=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=a(s,"fetchDidFail"),c=i.length>0?e.clone():null;try{for(let t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}let o=e.clone();try{let i;i="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(i=await e.fetchDidSucceed.call(e,{event:n,request:o,response:i}));return i}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:o.clone()});throw e}};let d;async function p(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(s):s,c=function(){if(void 0===d){const e=new Response("");if("body"in e)try{new Response(e.body),d=!0}catch(e){d=!1}d=!1}return d}()?n.body:await n.blob();return new Response(c,i)}try{self["workbox:precaching:5.0.0"]&&_()}catch(e){}function y(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),i=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:i.href}}class g{constructor(e){this.t=s(e),this.s=new Map,this.i=new Map,this.o=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=y(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.s.has(s)&&this.s.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this.s.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.o.has(e)&&this.o.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this.o.set(e,n.integrity)}if(this.s.set(s,e),this.i.set(s,i),t.length>0){const e="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],i=await self.caches.open(this.t),c=await i.keys(),r=new Set(c.map(e=>e.url));for(const[e,t]of this.s)r.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map(({cacheKey:n,url:s})=>{const i=this.o.get(n),c=this.i.get(s);return this.l({cacheKey:n,cacheMode:c,event:e,integrity:i,plugins:t,url:s})});return await Promise.all(o),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this.t),t=await e.keys(),n=new Set(this.s.values()),s=[];for(const i of t)n.has(i.url)||(await e.delete(i),s.push(i.url));return{deletedURLs:s}}async l({cacheKey:e,url:t,cacheMode:n,event:s,plugins:i,integrity:c}){const o=new Request(t,{integrity:c,cache:n,credentials:"same-origin"});let a,l=await w({event:s,plugins:i,request:o});for(const e of i||[])"cacheWillUpdate"in e&&(a=e);if(!(a?await a.cacheWillUpdate({event:s,request:o,response:l}):l.status<400))throw new r("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await p(l)),await f({event:s,plugins:i,response:l,request:e===t?o:new Request(e),cacheName:this.t,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.s}getCachedURLs(){return[...this.s.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.s.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this.t)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this.t,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let R;const q=()=>(R||(R=new g),R);const U=(e,t)=>{const n=q().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:i}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const r=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield r.href,n&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=n,yield e.href}if(s){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let m=!1;function v(e){m||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:i}={})=>{const c=s();self.addEventListener("fetch",s=>{const r=U(s.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:i});if(!r)return;let o=self.caches.open(c).then(e=>e.match(r)).then(e=>e||fetch(r));s.respondWith(o)})})(e),m=!0)}const L=[],x={get:()=>L,add(e){L.push(...e)}},K=e=>{const t=q(),n=x.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},M=e=>{const t=q();e.waitUntil(t.activate())};e.precacheAndRoute=function(e,t){!function(e){q().addToCacheList(e),e.length>0&&(self.addEventListener("install",K),self.addEventListener("activate",M))}(e),v(t)}}));
//# sourceMappingURL=workbox-3aad0c8a.js.map
