var UDOC={};UDOC.B=function(){var N=new Uint8Array(4),B=N.buffer,D=new Int16Array(B),e=new Uint16Array(B),_=new Int32Array(B),l=new Uint32Array(B),V=new Float32Array(B);
return{readShort:function(W,s){N[0]=W[s];N[1]=W[s+1];return D[0]},readUshort:function(W,s){N[0]=W[s];
N[1]=W[s+1];return e[0]},readInt:function(W,s){N[0]=W[s];N[1]=W[s+1];N[2]=W[s+2];N[3]=W[s+3];return _[0]},readUint:function(W,s){N[0]=W[s];
N[1]=W[s+1];N[2]=W[s+2];N[3]=W[s+3];return l[0]},readUintBE:function(W,s){N[3]=W[s];N[2]=W[s+1];N[1]=W[s+2];
N[0]=W[s+3];return l[0]},readFloat:function(W,s){N[0]=W[s];N[1]=W[s+1];N[2]=W[s+2];N[3]=W[s+3];return V[0]},readASCII:function(W,s,p){var n="";
for(var v=0;v<p;v++)n+=String.fromCharCode(W[s+v]);return n}}}();UDOC.G={concat:function(N,B){for(var D=0;
D<B.cmds.length;D++)N.cmds.push(B.cmds[D]);for(var D=0;D<B.crds.length;D++)N.crds.push(B.crds[D])},getBB:function(N){var B=1e99,D=1e99,e=-B,_=-D;
for(var l=0;l<N.length;l+=2){var V=N[l],W=N[l+1];if(V<B)B=V;if(V>e)e=V;if(W<D)D=W;if(W>_)_=W}return[B,D,e,_]},rectToPath:function(N){return{cmds:["M","L","L","L","Z"],crds:[N[0],N[1],N[2],N[1],N[2],N[3],N[0],N[3]]}},insideBox:function(N,B){return B[0]<=N[0]&&B[1]<=N[1]&&N[2]<=B[2]&&N[3]<=B[3]},isBox:function(N,B){var D=function(g,U){for(var O=0;
O<8;O+=2){var G=!0;for(var M=0;M<8;M++)if(Math.abs(U[M]-g[M+O&7])>=2){G=!1;break}if(G)return!0}return!1},l=!1;
if(N.cmds.length>10)return!1;var e=N.cmds.join(""),_=N.crds;if(e=="MLLLZ"&&_.length==8||(e=="MLLLLZ"||e=="MLLLL")&&_.length==10){if(_.length==10)_=_.slice(0,8);
if(B==null){B=[_[0],_[1],_[0],_[1]];for(var V=0;V<_.length;V+=2){var W=_[V],p=_[V+1];if(W<B[0])B[0]=W;
if(p<B[1])B[1]=p;if(B[2]<W)B[2]=W;if(B[3]<p)B[3]=p}}var n=B[0],h=B[1],v=B[2],i=B[3];if(!l)l=D(_,[n,h,v,h,v,i,n,i]);
if(!l)l=D(_,[n,i,v,i,v,h,n,h])}return l},boxArea:function(N){var B=N[2]-N[0],D=N[3]-N[1];return B*D},newPath:function(N){N.pth={cmds:[],crds:[]}},moveTo:function(N,B,D){var e=UDOC.M.multPoint(N.ctm,[B,D]),_=N.pth,l=_.cmds.length;
if(l!=0&&_.cmds[l-1]=="M"){_.cmds.pop();_.crds.pop();_.crds.pop()}N.pth.cmds.push("M");N.pth.crds.push(e[0],e[1]);
N.cpos=e},lineTo:function(N,B,D){var e=UDOC.M.multPoint(N.ctm,[B,D]);if(N.cpos[0]==e[0]&&N.cpos[1]==e[1])return;
N.pth.cmds.push("L");N.pth.crds.push(e[0],e[1]);N.cpos=e},curveTo:function(N,B,D,e,_,l,V){var W;if(N.pth.cmds.length==0)UDOC.G.moveTo(N,0,0);
W=UDOC.M.multPoint(N.ctm,[B,D]);B=W[0];D=W[1];W=UDOC.M.multPoint(N.ctm,[e,_]);e=W[0];_=W[1];W=UDOC.M.multPoint(N.ctm,[l,V]);
l=W[0];V=W[1];N.cpos=W;N.pth.cmds.push("C");N.pth.crds.push(B,D,e,_,l,V)},quadCurveTo:function(N,B,D,e,_){var l;
if(N.pth.cmds.length==0)UDOC.G.moveTo(N,0,0);l=UDOC.M.multPoint(N.ctm,[B,D]);B=l[0];D=l[1];l=UDOC.M.multPoint(N.ctm,[e,_]);
e=l[0];_=l[1];N.cpos=l;N.pth.cmds.push("Q");N.pth.crds.push(B,D,e,_)},closePath:function(N){N.pth.cmds.push("Z")},arc:function(N,B,D,e,_,l,V){if(V)while(l>_)l-=2*Math.PI;
else while(l<_)l+=2*Math.PI;var W=(l-_)/4,s=Math.cos(W/2),p=-Math.sin(W/2),n=(4-s)/3,h=p==0?p:(1-s)*(3-s)/(3*p),v=n,i=-h,g=s,H=-p,U=[s,p],G=[n,h],M=[v,i],E=[g,H],F={cmds:[N.pth.cmds.length==0?"M":"L"],crds:[s,p]},a=[1,0,0,1,0,0];
for(var k=0;k<4;k++){G=UDOC.M.multPoint(a,G);M=UDOC.M.multPoint(a,M);E=UDOC.M.multPoint(a,E);F.crds.push(G[0],G[1],M[0],M[1],E[0],E[1]);
F.cmds.push("C");if(k==0)UDOC.M.rotate(a,-W)}var b=[e,0,0,e,B,D];UDOC.M.rotate(a,-_+W/2);UDOC.M.concat(a,b);
UDOC.M.multArray(a,F.crds);UDOC.M.multArray(N.ctm,F.crds);UDOC.G.concat(N.pth,F);var D=F.crds.pop();
B=F.crds.pop();N.cpos=[B,D]},drawRect:function(N,B,D,e,_){UDOC.G.moveTo(N,B,D);UDOC.G.lineTo(N,B+e,D);
UDOC.G.lineTo(N,B+e,D+_);UDOC.G.lineTo(N,B,D+_);UDOC.G.closePath(N)},toPoly:function(N){if(N.cmds[0]!="M"||N.cmds[N.cmds.length-1]!="Z")return null;
for(var B=1;B<N.cmds.length-1;B++)if(N.cmds[B]!="L")return null;var D=[],e=N.crds.length;if(N.crds[0]==N.crds[e-2]&&N.crds[1]==N.crds[e-1])e-=2;
for(var B=0;B<e;B+=2)D.push([N.crds[B],N.crds[B+1]]);if(UDOC.G.polyArea(N.crds)<0)D.reverse();return D},fromPoly:function(N){var B={cmds:[],crds:[]};
for(var D=0;D<N.length;D++){B.crds.push(N[D][0],N[D][1]);B.cmds.push(D==0?"M":"L")}B.cmds.push("Z");
return B},polyArea:function(N){if(N.length<6)return 0;var B=N.length-2,D=(N[0]-N[B])*(N[B+1]+N[1]);for(var e=0;
e<B;e+=2)D+=(N[e+2]-N[e])*(N[e+1]+N[e+3]);return-D*.5},polyClip:function(N,B){var D,e,_,l,V=function(v){return(e[0]-D[0])*(v[1]-D[1])>(e[1]-D[1])*(v[0]-D[0])},W=function(){var v=[D[0]-e[0],D[1]-e[1]],i=[_[0]-l[0],_[1]-l[1]],g=D[0]*e[1]-D[1]*e[0],H=_[0]*l[1]-_[1]*l[0],U=1/(v[0]*i[1]-v[1]*i[0]);
return[(g*i[0]-H*v[0])*U,(g*i[1]-H*v[1])*U]},s=N,p,n;D=B[B.length-1];for(n in B){var e=B[n],h=s;s=[];
_=h[h.length-1];for(p in h){var l=h[p];if(V(l)){if(!V(_)){s.push(W())}s.push(l)}else if(V(_)){s.push(W())}_=l}D=e}return s}};
UDOC.M={getScale:function(N){return Math.sqrt(Math.abs(N[0]*N[3]-N[1]*N[2]))},translate:function(N,B,D){UDOC.M.concat(N,[1,0,0,1,B,D])},rotate:function(N,B){UDOC.M.concat(N,[Math.cos(B),-Math.sin(B),Math.sin(B),Math.cos(B),0,0])},scale:function(N,B,D){UDOC.M.concat(N,[B,0,0,D,0,0])},concat:function(N,B){var D=N[0],e=N[1],_=N[2],l=N[3],V=N[4],W=N[5];
N[0]=D*B[0]+e*B[2];N[1]=D*B[1]+e*B[3];N[2]=_*B[0]+l*B[2];N[3]=_*B[1]+l*B[3];N[4]=V*B[0]+W*B[2]+B[4];
N[5]=V*B[1]+W*B[3]+B[5]},invert:function(N){var B=N[0],D=N[1],e=N[2],_=N[3],l=N[4],V=N[5],W=B*_-D*e;
N[0]=_/W;N[1]=-D/W;N[2]=-e/W;N[3]=B/W;N[4]=(e*V-_*l)/W;N[5]=(D*l-B*V)/W},multPoint:function(N,B){var D=B[0],e=B[1];
return[D*N[0]+e*N[2]+N[4],D*N[1]+e*N[3]+N[5]]},multArray:function(N,B){for(var D=0;D<B.length;D+=2){var e=B[D],_=B[D+1];
B[D]=e*N[0]+_*N[2]+N[4];B[D+1]=e*N[1]+_*N[3]+N[5]}}};UDOC.C={srgbGamma:function(N){return N<.0031308?12.92*N:1.055*Math.pow(N,1/2.4)-.055},cmykToRgb:function(N){var B=N[0],e=N[1],_=N[2],l=N[3],V=255+B*(-4.387332384609988*B+54.48615194189176*e+18.82290502165302*_+212.25662451639585*l+-285.2331026137004)+e*(1.7149763477362134*e-5.6096736904047315*_+-17.873870861415444*l-5.497006427196366)+_*(-2.5217340131683033*_-21.248923337353073*l+17.5119270841813)+l*(-21.86122147463605*l-189.48180835922747),W=255+B*(8.841041422036149*B+60.118027045597366*e+6.871425592049007*_+31.159100130055922*l+-79.2970844816548)+e*(-15.310361306967817*e+17.575251261109482*_+131.35250912493976*l-190.9453302588951)+_*(4.444339102852739*_+9.8632861493405*l-24.86741582555878)+l*(-20.737325471181034*l-187.80453709719578),s=255+B*(.8842522430003296*B+8.078677503112928*e+30.89978309703729*_-.23883238689178934*l+-14.183576799673286)+e*(10.49593273432072*e+63.02378494754052*_+50.606957656360734*l-112.23884253719248)+_*(.03296041114873217*_+115.60384449646641*l+-193.58209356861505)+l*(-22.33816807309886*l-180.12613974708367);
return[Math.max(0,Math.min(1,V/255)),Math.max(0,Math.min(1,W/255)),Math.max(0,Math.min(1,s/255))]},labToRgb:function(N){var B=903.3,D=.008856,e=N[0],l=N[1],V=N[2],W=(e+16)/116,s=W*W*W,p=W-V/200,h=p*p*p,v=l/500+W,i=v*v*v,g=h>D?h:(116*p-16)/B,H=s>D?s:(116*W-16)/B,U=i>D?i:(116*v-16)/B,O=U*96.72,G=H*100,M=g*81.427,E=[O/100,G/100,M/100],F=[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],a=[F[0]*E[0]+F[1]*E[1]+F[2]*E[2],F[3]*E[0]+F[4]*E[1]+F[5]*E[2],F[6]*E[0]+F[7]*E[1]+F[8]*E[2]];
for(var Z=0;Z<3;Z++)a[Z]=Math.max(0,Math.min(1,UDOC.C.srgbGamma(a[Z])));return a}};UDOC.getState=function(N){return{font:UDOC.getFont(),dd:{flat:1},ca:1,colr:[0,0,0],space:"/DeviceGray",CA:1,COLR:[0,0,0],sspace:"/DeviceGray",bmode:"/Normal",SA:!1,OPM:0,AIS:!1,OP:!1,op:!1,SMask:"/None",lwidth:1,lcap:0,ljoin:0,mlimit:10,SM:.1,doff:0,dash:[],ctm:[1,0,0,1,0,0],cpos:[0,0],pth:{cmds:[],crds:[]},cpth:N?UDOC.G.rectToPath(N):null,cpstack:[]}};
UDOC.getFont=function(){return{Tc:0,Tw:0,Th:100,Tl:0,Tf:"Helvetica-Bold",Tfs:1,Tmode:0,Trise:0,Tk:0,Tal:0,Tun:0,Tm:[1,0,0,1,0,0],Tlm:[1,0,0,1,0,0],Trm:[1,0,0,1,0,0]}};
function FromPS(){}FromPS.Parse=function(N,B){N=new Uint8Array(N);var D=0,l=null,V=null,U=!0;while(!(N[D]==37&&N[D+1]==33))D++;
var e=FromPS.B.readASCII(N,D,N.length-D),_=e.split(/[\n\r]+/);for(var W=0;W<_.length;W++){var s=_[W].trim();
if(s.charAt(0)=="%"){s=s.slice(1);while(s.charAt(0)=="%")s=s.slice(1);var p=s.split(":");if(p[0]=="BoundingBox"){l=p[1].trim().split(/[ ]+/).map(parseFloat)}if(s.indexOf("!PS-Adobe-3.0 EPSF-3.0")!=-1)V=s;
if(s.indexOf("!PS-Adobe-2.0 EPSF-1.2")!=-1)V=s}}if(V==null||l==null)l=[0,0,595,842];var n=[],h=FromPS._getDictStack([],{}),v=[{typ:"file",val:{buff:N,off:D}}],i=[],g=FromPS._getEnv(l),H=Date.now();
while(U)U=FromPS.step(n,h,v,i,g,B);if(g.pgOpen)B.ShowPage();B.Done();console.log(Date.now()-H)};FromPS._getDictStack=function(N,B){var D="def undef known begin end currentfile currentdict currentpacking setpacking currentoverprint setoverprint currentglobal setglobal gcheck currentsystemparams setsystemparams currentuserparams setuserparams currentpagedevice setpagedevice currentflat currentlinewidth currentdash currentpoint currentscreen setscreen currenthalftone currentblackgeneration currentundercolorremoval currentcolortransfer internaldict dict string readstring readhexstring readline getinterval putinterval token array aload astore length maxlength matrix count mark counttomark cleartomark dictstack countdictstack makepattern makefont scalefont stringwidth setfont currentcolorspace setcolorspace setcolor _setHSB_ currentgray currentrgbcolor setlinewidth setstrokeadjust setflat setlinecap setlinejoin setmiterlimit setdash clip eoclip clippath pathbbox newpath stroke fill eofill shfill closepath flattenpath showpage print _drawRect_ moveto lineto curveto arc arcn show ashow xshow yshow xyshow widthshow awidthshow charpath cshow rmoveto rlineto rcurveto translate rotate scale concat concatmatrix invertmatrix currentmatrix defaultmatrix setmatrix limitcheck save restore clipsave cliprestore gsave grestore grestoreall usertime readtime flush flushfile readonly executeonly findresource resourcestatus defineresource undefineresource resourceforall image imagemask colorimage xcheck status cachestatus setcachelimit type if ifelse exec stopped stop dup exch copy roll index anchorsearch pop put get load where store repeat for forall pathforall loop exit bind cvi cvr cvs cvx cvn cvlit add sub mul div idiv bitshift mod exp atan neg abs floor ceiling round truncate sqrt ln sin cos srand rand == transform itransform dtransform idtransform eq ge gt le lt ne and or not filter begincmap endcmap begincodespacerange endcodespacerange beginbfrange endbfrange beginbfchar endbfchar".split(" ").concat(N),e="image colorimage repeat for forall loop".split(" ");
for(var _=0;_<e.length;_++)D.push(e[_]+"---");FromPS._myOps=FromPS.makeProcs({CIDSystemInfo:"/CIDSystemInfo",findfont:"/Font findresource",definefont:"/Font defineresource",undefinefont:"/Font undefineresource",selectfont:"exch findfont exch scalefont setfont",rectfill:"gsave newpath _drawRect_  fill   grestore",rectstroke:"gsave newpath _drawRect_  stroke grestore",rectclip:"newpath _drawRect_  clip newpath",setgray:"/DeviceGray setcolorspace setcolor",setrgbcolor:"/DeviceRGB  setcolorspace setcolor",sethsbcolor:"/DeviceRGB  setcolorspace _setHSB_",setcmykcolor:"/DeviceCMYK setcolorspace setcolor",setpattern:"/Pattern    setcolorspace setcolor"});
for(var l in FromPS._myOps)D.push(l);var V=B,W={},p={},n={},h={};W.systemdict={typ:"dict",val:W};W.globaldict={typ:"dict",val:p};
W.userdict={typ:"dict",val:n};W.statusdict={typ:"dict",val:h};W.GlobalFontDirectory=W.SharedFontDirectory={typ:"dict",val:{}};
W.FontDirectory={typ:"dict",val:{}};W.$error={typ:"dict",val:{}};W.errordict={typ:"dict",val:FromPS.makeProcs({handleerror:""})};
W.null={typ:"null",val:null};W.true={typ:"boolean",val:!0};W.false={typ:"boolean",val:!1};W.product={typ:"string",val:FromPS.makeStr("Photopea")};
W.version={typ:"string",val:[51]};W.languagelevel={typ:"integer",val:3};for(var _=0;_<D.length;_++)W[D[_]]={typ:"operator",val:D[_]};
for(var v in V)W[v]=V[v];return[W,p,n]};FromPS._getEnv=function(N){var B={bb:N,gst:UDOC.getState(N),packing:!1,overprint:!1,global:!1,systemparams:{MaxPatternCache:{type:"integer",val:5e3}},userparams:{},pagedevice:{PageSize:{typ:"array",val:[{typ:"real",val:N[2]},{typ:"real",val:N[3]}]}},cmnum:0,fnt:null,res:{},pgOpen:!1,funs:FromPS.makeProcs({blackgeneration:"",undercolorremoval:"pop 0"})},D;
D="Font CIDFont CMap FontSet Form Pattern ProcSet Halftone ColorRendering IdiomSet InkParams TrapParams OutputDevice ControlLanguage Localization PDL HWOptions".split(" ");
for(var e=0;e<D.length;e++)B.res[D[e]]={typ:"dict",val:{},maxl:1e3};D=["Encoding","ColorSpace"];for(var e=0;
e<D.length;e++)B.res[D[e]]={typ:"array",val:[]};B.res.Category={typ:"dict",val:B.res};B.res.ColorSpace.val=[{typ:"array",val:[{typ:"name",val:"/DeviceRGB"}]},{typ:"array",val:[{typ:"name",val:"/DeviceCMYK"}]},{typ:"array",val:[{typ:"name",val:"/DeviceGray"}]}];
for(var e=0;e<D.length;e++)B.res[D[e]]={typ:"dict",val:{},maxl:1e3};return B};FromPS.makeProcs=function(N){var B={};
for(var D in N){var e=N[D].replace(/  +/g," ").split(" ");B[D]={typ:"procedure",val:[]};for(var _=0;
_<e.length;_++)B[D].val.push({typ:"name",val:e[_]})}return B};FromPS.addProc=function(N,B){if(N.val.length==0)return;
if(N.typ!="procedure"){console.log(N);throw N.typ}B.push({typ:"procedure",val:N.val,off:0})};FromPS.stepC=0;
FromPS._f32=new Float32Array(1);FromPS.step=function(N,B,D,e,_,l,V,W){var s=Date.now(),p=FromPS._f32,n=FromPS.getToken,h=_.gst,v=n(D,B),H=!1;
if(v==null)return!1;if(W&&v.typ=="string"&&FromPS.readStr(v.val)=="def")v={typ:"operator",val:"def"};
var i=v.typ,g=v.val;if(g=="NaN"||g=="INF")i="integer";if(isNaN(h.cpos[0]))throw"e";if(H)console.log(v,N.slice(0));
if("integer real dict boolean string array procedure null file".split(" ").indexOf(i)!=-1){N.push(v);
return!0}if(i!="name"&&i!="operator")throw"e";if(g.charAt(0)=="/"){N.push(v)}else if(g=="undefined")return!0;
else if(g.startsWith("II*"))return!1;else if(g=="{"){var U=[],O={typ:"procedure",val:[]},G=n(D,B);while(!0){if(G.val=="{"){var M={typ:"procedure",val:[]};
O.val.push(M);U.push(O);O=M}else if(G.val=="}"){if(U.length==0)break;O=U.pop()}else O.val.push(G);G=n(D,B)}N.push(O)}else if(g=="["||g=="<<")N.push({typ:"mark"});
else if(g=="]"||g==">>"){var E=[];while(N.length!=0){var F=N.pop();if(F.typ=="mark")break;E.push(F)}E.reverse();
if(g=="]")N.push({typ:"array",val:E});else{var a={};for(var Z=0;Z<E.length;Z+=2)a[E[Z].val.slice(1)]=E[Z+1];
N.push({typ:"dict",val:a,maxl:1e3})}}else{var T=FromPS.getFromStacks(g,B);if(H)console.log("---",T);
if(T==null){if(W)return!1;else{console.log("unknown operator",g,N,B);throw"e"}}else if(T.typ=="procedure")FromPS.addProc(T,D);
else if("array string dict null integer real boolean state name file".split(" ").indexOf(T.typ)!=-1)N.push(T);
else if(T.typ=="operator"){var k=T.val,b="known if ifelse currentpacking setpacking dict dup begin end put bind def undef where pop get exec ge stop stopped cvr string not and".split(" ");
if(FromPS._myOps[k]){FromPS.addProc(FromPS._myOps[k],D)}else if(k=="flattenpath"||k=="limitcheck"){}else if(k=="def"){var A=N.pop(),c=N.pop();
if(c==null&&W)return!1;c=FromPS.getDKey(c);B[B.length-1][c]=A}else if(k=="undef"||k=="known"){var S=FromPS.getDKey(N.pop()),bY=N.pop(),aZ=bY.val;
if(k=="undef")delete aZ[S];else N.push({typ:"boolean",val:bY.typ!="null"&&aZ[S]!=null})}else if(k=="internaldict"){var P=N.pop().val;
N.push({typ:"dict",val:{},maxl:1e3})}else if(k=="dict"){var P=N.pop().val;N.push({typ:"dict",val:{},maxl:P})}else if(k=="string"){var P=N.pop().val;
N.push({typ:"string",val:new Array(P)})}else if(k=="readstring"||k=="readhexstring"){var o=N.pop(),P=o.val.length,a4=N.pop(),w=FromPS.GetFile(a4).val;
if(k=="readstring"){for(var Z=0;Z<P;Z++)o.val[Z]=w.buff[w.off+Z];w.off+=P}else FromPS.readHex(w,P,o.val);
N.push(o,{typ:"boolean",val:!0})}else if(k=="readline"){var o=N.pop(),w=FromPS.GetFile(N.pop()).val,Z=0;
if(FromPS.isEOL(w.buff[w.off]))w.off++;while(Z<o.val.length){var ci=w.buff[w.off];w.off++;if(ci==null)throw"e";
if(FromPS.isEOL(ci)){if(w.buff[w.off]==10)w.off++;break}o.val[Z]=ci;Z++}N.push({typ:"string",val:o.val.slice(0,Z)});
N.push({typ:"boolean",val:!0})}else if(k=="getinterval"){var bJ=N.pop().val,ca=N.pop().val,bF=N.pop(),I=[];
if(bF.typ=="string"||bF.typ=="array")for(var Z=0;Z<bJ;Z++)I.push(bF.val[ca+Z]);else throw"e";N.push({typ:bF.typ,val:I})}else if(k=="putinterval"){var bF=N.pop(),ca=N.pop().val,ct=N.pop();
if(ca+bF.val.length>=ct.val.length){}else if(bF.typ=="string")for(var Z=0;Z<bF.val.length;Z++)ct.val[ca+Z]=bF.val[Z];
else throw"e"}else if(k=="token"){var bF=N.pop();if(bF.typ!="string")throw"e";var E=[];for(var Z=0;Z<bF.val.length;
Z++){var bR=bF.val[Z];if(bR==null)break;E.push(bR)}var c3={buff:new Uint8Array(E),off:0},v=n([{typ:"file",val:c3}],B),ax=[];
for(var Z=c3.off;Z<E.length;Z++)ax.push(E[Z]);N.push({typ:"string",val:ax},v,{typ:"boolean",val:!0})}else if(k=="array"){var P=N.pop().val;
N.push({typ:"array",val:new Array(P)})}else if(k=="aload"){var F=N.pop(),E=F.val;for(var Z=0;Z<E.length;
Z++)N.push(E[Z]);N.push(F)}else if(k=="astore"){var F=N.pop(),E=F.val;for(var Z=0;Z<E.length;Z++)E[E.length-1-Z]=N.pop();
N.push(F)}else if(k=="length"){var F=N.pop(),i=F.typ,P=0;if(i=="array")P=F.val.length;else if(i=="procedure")P=F.val.length;
else if(i=="dict")P=Object.keys(F.val).length;else if(i=="string")P=F.val.length;else{console.log(F);
throw"e"}N.push({typ:"integer",val:P})}else if(k=="maxlength"){var a3=N.pop();N.push({typ:"integer",val:a3.maxl})}else if(k=="matrix"){N.push({typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")})}else if(k=="count"){N.push({typ:"integer",val:N.length})}else if(k=="mark"){N.push({typ:"mark"})}else if(k=="counttomark"||k=="cleartomark"){var ag=0;
while(ag<N.length&&N[N.length-1-ag].typ!="mark")ag++;if(k=="cleartomark")for(var Z=0;Z<ag+1;Z++)N.pop();
else N.push({typ:"integer",val:ag})}else if(k=="dictstack"){var E=N.pop();for(var Z=0;Z<B.length;Z++)E.val[Z]={typ:"dict",val:B[Z],maxl:1e3};
N.push(E)}else if(k=="countdictstack"){var bo=0;for(var Z=0;Z<N.length;Z++)if(N[Z].typ=="dict")bo++;
N.push({typ:"integer",val:bo})}else if(k=="begin"){var F=N.pop(),aZ=F.val;if(aZ==null||F.typ!="dict"){console.log(F,B);
throw"e"}B.push(aZ)}else if(k=="end"){B.pop()}else if(k=="currentfile"){var c7;for(var Z=D.length-1;
Z>=0;Z--)if(D[Z].typ=="file"){c7=D[Z];break}N.push({typ:"file",val:c7.val})}else if(k=="currentdict"){var aZ=B[B.length-1];
N.push({typ:"dict",val:aZ,maxl:1e3})}else if("currentpacking currentoverprint currentglobal currentsystemparams currentuserparams currentpagedevice".split(" ").indexOf(k)!=-1){var A=_[k.slice(7)];
N.push({typ:typeof A=="boolean"?"boolean":"dict",val:A})}else if(k=="gcheck"){var y=N.pop();N.push({typ:"boolean",val:!1})}else if("setpacking setoverprint setglobal setsystemparams setuserparams setpagedevice".split(" ").indexOf(k)!=-1){_[k.slice(3)]=N.pop().val}else if(k=="currentflat"){N.push({typ:"real",val:1})}else if(k=="currentlinewidth"){N.push({typ:"real",val:h.lwidth})}else if(k=="currentdash"){N.push({typ:"array",val:FromPS.makeArr(h.dash,"integer")},{typ:"real",val:h.doff})}else if(k=="currentpoint"){var c9=h.ctm.slice(0);
UDOC.M.invert(c9);var bg=UDOC.M.multPoint(c9,h.cpos);N.push({typ:"real",val:bg[0]},{typ:"real",val:bg[1]})}else if(k=="currentscreen"){N.push({typ:"int",val:60},{typ:"real",val:0},{typ:"real",val:0})}else if(k=="setscreen"){N.pop();
N.pop();N.pop()}else if(k=="currenthalftone"){N.push({typ:"dict",val:{},maxl:1e3})}else if(k=="currentblackgeneration"||k=="currentundercolorremoval"){N.push(_.funs[k.slice(7)])}else if(k=="currentcolortransfer"){for(var Z=0;
Z<4;Z++)N.push(_.funs.blackgeneration)}else if(k=="findresource"){var ao=N.pop().val.slice(1),bj=N.pop(),S=bj.val.slice(1),aI;
if(ao=="Font"){_.res[ao].val[S]={typ:"dict",val:{FontType:{typ:"integer",val:1},FontMatrix:{typ:"array",val:FromPS.makeArr([1,0,0,1,0,0],"real")},FontName:bj,FID:{typ:"fontID",val:Math.floor(Math.random()*16777215)},Encoding:{typ:"array",val:[]},FontBBox:{typ:"array",val:FromPS.makeArr([0,0,1,1],"real")},PaintType:{typ:"integer",val:0}}}}if(ao=="Category"&&S=="Generic")aI={typ:"dict",val:{},maxl:1e3};
else if((ao=="ProcSet"||ao=="Procset")&&S=="CIDInit")aI={typ:"dict",val:{},maxl:1e3};else aI=_.res[ao].val[S];
if(aI==null)throw"e";N.push(aI)}else if(k=="resourcestatus"){var ao=N.pop().val.slice(1),S=N.pop().val.slice(1),aI=_.res[ao].val[S];
if(aI){N.push({typ:"integer",val:1});N.push({typ:"integer",val:Object.keys(aI.val).length})}N.push({typ:"boolean",val:aI!=null})}else if(k=="defineresource"){var ao=N.pop().val.slice(1),aH=N.pop(),S=N.pop().val.slice(1);
_.res[ao].val[S]=aH;N.push(aH)}else if(k=="undefineresource"){var ao=N.pop().val.slice(1),S=N.pop().val.slice(1);
delete _.res[ao].val[S]}else if(k=="resourceforall"){var ao=N.pop().val.slice(1),bS=N.pop().val,c1=N.pop(),b4=N.pop().val;
if(b4.length!=1||b4[0]!=42)throw"e";var cB=_.res[ao].val;for(var S in cB){var o=bS.slice(0);for(var Z=0;
Z<S.length;Z++)o[Z]=S[Z];FromPS.addProc(c1,D);FromPS.addProc({typ:"procedure",val:[{typ:"string",val:o}]},D)}}else if(k=="image"||k=="colorimage"){var a5,bv,aN,bA,a8=1,br=!1,m=[],top=N.pop();
N.push(top);if(k=="image"&&top.typ=="dict"){var bI=N.pop().val;a5=bI.Width.val;bv=bI.Height.val;aN=bI.BitsPerComponent.val;
bA=FromPS.readArr(bI.ImageMatrix.val);a8=bI.NComponents?bI.NComponents.val:1;br=bI.MultipleDataSources?bI.MultipleDataSources.val:!1;
m=bI.DataSource.val;if(bI.DataSource.typ=="file")m=[bI.DataSource]}else{if(k=="colorimage"){a8=N.pop().val;
br=N.pop().val}if(br){m[2]=N.pop();m[1]=N.pop();m[0]=N.pop()}else m=[N.pop()];var bA=FromPS.readArr(N.pop().val),aN=N.pop().val,bv=N.pop().val,a5=N.pop().val}if(a8!=1&&a8!=3&&a8!=4)throw"unsupported number of channels "+a8;
if(aN!=8)throw"unsupported bits per channel: "+aN;var t=new Uint8Array(a5*bv*4);for(var Z=0;Z<t.length;
Z++)t[Z]=255;D.push({typ:"name",val:k+"---",ctx:[a5,bv,aN,bA,a8,br,t,0,m]});if(m[0].typ=="procedure")for(var Z=0;
Z<m.length;Z++)FromPS.addProc(m[Z],D)}else if(k=="image---"||k=="colorimage---"){var ab=v.ctx,a5=ab[0],bv=ab[1],aN=ab[2],bA=ab[3],a8=ab[4],br=ab[5],t=ab[6],b5=ab[7],m=ab[8],bK=0;
if(br){for(Z=0;Z<a8;Z++){var a7=m[Z];if(a7.typ=="procedure")a7=N.pop().val;else a7=a7.val;bK=a7.length;
if(a8==4)for(var am=0;am<bK;am++)t[(b5+am)*4+3-Z]=a7[am];if(a8==3)for(var am=0;am<bK;am++)t[(b5+am)*4+2-Z]=a7[am]}}else{var a7;
if(m[0].typ=="file")a7=FromPS.GetFile(m[0]).val.buff;else a7=N.pop().val;bK=Math.floor(a7.length/3);
for(var am=0;am<bK;am++){var bE=am*3,be=(b5+am)*4;t[be+0]=a7[bE+0];t[be+1]=a7[bE+1];t[be+2]=a7[bE+2]}}b5+=bK;
FromPS.checkPageStarted(_,l);if(b5==a5*bv){var cf=1/255;if(h.space=="/DeviceCMYK")for(var Z=0;Z<t.length;
Z+=4){var aV=[t[Z]*cf,t[Z+1]*cf,t[Z+2]*cf,t[Z+3]*cf],aU=UDOC.C.cmykToRgb(aV);t[Z]=aU[0]*255;t[Z+1]=aU[1]*255;
t[Z+2]=aU[2]*255;t[Z+3]=255}var a1=h.ctm.slice(),aX=bA.slice(0);UDOC.M.invert(aX);var bG=[a5,0,0,-bv,0,bv];
UDOC.M.concat(bG,aX);UDOC.M.concat(h.ctm,bG);l.PutImage(h,t,a5,bv);h.ctm=a1}else{ab[7]=b5;D.push(v);
if(m[0].typ=="procedure")for(var Z=0;Z<m.length;Z++)FromPS.addProc(m[Z],D)}}else if(k=="makepattern"){var Q=N.pop().val,a3=N.pop().val;
N.push({typ:"array",val:[a3,JSON.parse(JSON.stringify(Q))]})}else if(k=="makefont"||k=="scalefont"){var b1=k=="makefont",ab=N.pop().val;
if(b1)ab=FromPS.readArr(ab);var bi=JSON.parse(JSON.stringify(N.pop())),ay=FromPS.readArr(bi.val.FontMatrix.val);
if(b1)UDOC.M.concat(ay,ab);else UDOC.M.scale(ay,ab,ab);bi.val.FontMatrix.val=FromPS.makeArr(ay);N.push(bi)}else if(k=="stringwidth"||k=="charpath"){if(k=="charpath")N.pop();
var ck=N.pop().val,o=FromPS.readStr(ck),ae=UDOC.M.getScale(h.font.Tm)/UDOC.M.getScale(h.ctm),ac=.55*ae*o.length;
if(k=="stringwidth")N.push({typ:"real",val:ac},{typ:"real",val:0});else UDOC.G.drawRect(h,0,0,ac,ae)}else if(k=="setfont"){var bi=N.pop().val;
h.font.Tf=bi.FontName.val.slice(1);h.font.Tm=FromPS.readArr(bi.FontMatrix.val)}else if(k=="setlinewidth")h.lwidth=N.pop().val;
else if(k=="setstrokeadjust")h.SA=N.pop().val;else if(k=="setlinecap")h.lcap=N.pop().val;else if(k=="setlinejoin")h.ljoin=N.pop().val;
else if(k=="setmiterlimit")h.mlimit=N.pop().val;else if(k=="setflat")h.dd.flat=N.pop();else if(k=="setdash"){h.doff=N.pop().val;
h.dash=FromPS.readArr(N.pop().val)}else if(k=="show"||k=="ashow"||k=="xshow"||k=="yshow"||k=="xyshow"||k=="widthshow"||k=="awidthshow"){if(k=="xshow"||k=="xyshow"||k=="yshow")N.pop();
var ck=N.pop().val,o=FromPS.readStr(ck);if(k=="awidthshow"){N.pop();N.pop();N.pop();N.pop()}if(k=="widthshow"){N.pop();
N.pop();N.pop()}if(k=="ashow"){N.pop();N.pop()}var aY=h.ctm;h.ctm=aY.slice(0);h.ctm[4]=h.cpos[0];h.ctm[5]=h.cpos[1];
FromPS.checkPageStarted(_,l);l.PutText(h,o,o.length*.55);h.cpos[0]+=o.length*UDOC.M.getScale(aY)*UDOC.M.getScale(h.font.Tm)*.55;
h.ctm=aY}else if(k=="cshow"){N.pop();N.pop()}else if(k=="currentcolorspace"){N.push({typ:"array",val:[{typ:"name",val:h.space}]})}else if(k=="setcolorspace"){var c0=N.pop();
h.space=c0.val;if(c0.typ=="array")h.space=c0.val[0].val;else if(c0.typ=="name")h.space=c0.val;else{console.log(c0);
throw"e"}}else if(k=="setcolor"||k=="_setHSB_"){var cj;if(h.space=="/Pattern"){var aV=N.pop();if(aV.typ!="array")throw"e";
var bg=aV.val,Q=FromPS.readArr(bg[1]);UDOC.M.concat(Q,h.ctm);cj=FromPS.getPSShadingFill(bg[0].Shading,Q)}else if(h.space=="/DeviceGray"){var cC=FromPS.nrm(N.pop().val);
cj=[cC,cC,cC]}else if(k=="_setHSB_"){var y=N.pop().val,aJ=N.pop().val,bv=N.pop().val,aD,cC,aq,Z,bc,bg,aW,ar;
Z=Math.floor(bv*6);bc=bv*6-Z;bg=y*(1-aJ);aW=y*(1-bc*aJ);ar=y*(1-(1-bc)*aJ);switch(Z%6){case 0:aD=y,cC=ar,aq=bg;
break;case 1:aD=aW,cC=y,aq=bg;break;case 2:aD=bg,cC=y,aq=ar;break;case 3:aD=bg,cC=aW,aq=y;break;case 4:aD=ar,cC=bg,aq=y;
break;case 5:aD=y,cC=bg,aq=aW;break}cj=[FromPS.nrm(aD),FromPS.nrm(cC),FromPS.nrm(aq)]}else if(h.space=="/DeviceRGB"){var aq=N.pop().val,cC=N.pop().val,aD=N.pop().val;
cj=[FromPS.nrm(aD),FromPS.nrm(cC),FromPS.nrm(aq)]}else if(h.space=="/DeviceCMYK"){var a2=N.pop().val,b3=N.pop().val,Q=N.pop().val,aw=N.pop().val;
cj=UDOC.C.cmykToRgb([aw,Q,b3,a2])}else throw h.space;if(cj)h.colr=h.COLR=cj}else if(k=="currentrgbcolor"){for(var Z=0;
Z<3;Z++)N.push({typ:"real",val:h.colr[Z]})}else if(k=="currentgray"){N.push({typ:"real",val:(h.colr[0]+h.colr[1]+h.colr[2])/3})}else if(k=="clip"||k=="eoclip"){var aK=UDOC.G.getBB(h.pth.crds),aj=UDOC.G.getBB(h.cpth.crds);
if(UDOC.G.isBox(h.pth,aK)&&UDOC.G.insideBox(aj,aK)){}else if(UDOC.G.isBox(h.cpth,aj)&&UDOC.G.insideBox(aK,aj)){h.cpth=JSON.parse(JSON.stringify(h.pth))}else{var cb=UDOC.G.toPoly(h.pth),bk=UDOC.G.toPoly(h.cpth);
if(cb&&bk){var bg=UDOC.G.polyClip(cb,bk);if(bg.length!=0)h.cpth=UDOC.G.fromPoly(bg);else console.log("strange intersection of polygons")}else{h.cpth=JSON.parse(JSON.stringify(h.pth))}}}else if(k=="clippath"){h.pth=JSON.parse(JSON.stringify(h.cpth))}else if(k=="pathbbox"){var bs=h.pth.crds,bP=UDOC.G.getBB(bs);
bs=[bP[0],bP[1],bP[2],bP[1],bP[0],bP[3],bP[2],bP[3]];var c9=h.ctm.slice(0);UDOC.M.invert(c9);UDOC.M.multArray(c9,bs);
bP=UDOC.G.getBB(bs);p[0]=bP[0];bP[0]=p[0];p[0]=bP[1];bP[1]=p[0];p[0]=bP[2];bP[2]=p[0];p[0]=bP[3];bP[3]=p[0];
bP=FromPS.makeArr(bP,"real");N.push(bP[0],bP[1],bP[2],bP[3])}else if(k=="newpath")UDOC.G.newPath(h);
else if(k=="stroke"){FromPS.checkPageStarted(_,l);l.Stroke(h);UDOC.G.newPath(h)}else if(k=="shfill"){var c6=h.colr,b8=h.pth,bg=N.pop().val,Q=h.ctm.slice(0);
h.colr=FromPS.getPSShadingFill({typ:"dict",val:bg,maxl:1e3},Q);FromPS.checkPageStarted(_,l);h.pth=h.cpth;
h.cpth=UDOC.G.rectToPath(_.bb);l.Fill(h);h.colr=c6;h.pth=b8}else if(k=="fill"||k=="eofill"){FromPS.checkPageStarted(_,l);
l.Fill(h,k=="eofill");UDOC.G.newPath(h)}else if(k=="showpage"){FromPS.checkPageStarted(_,l);l.ShowPage();
var as=h.font;h=_.gst=UDOC.getState(_.bb);h.font=as;_.pgOpen=!1}else if(k=="print"){var ck=N.pop().val,o=FromPS.readStr(ck);
l.Print(o)}else if(k=="_drawRect_"){var bv=N.pop();if(bv.typ!="real"&&bv.typ!="integer")throw"e";bv=bv.val;
var a5=N.pop().val,b3=N.pop().val,a6=N.pop().val;UDOC.G.drawRect(h,a6,b3,a5,bv)}else if(k=="closepath")UDOC.G.closePath(h);
else if(k=="moveto"||k=="lineto"){var b3=N.pop().val,a6=N.pop().val;if(k=="moveto")UDOC.G.moveTo(h,a6,b3);
else UDOC.G.lineTo(h,a6,b3)}else if(k=="rmoveto"||k=="rlineto"){var b3=N.pop().val,a6=N.pop().val,c9=h.ctm.slice(0);
UDOC.M.invert(c9);var bg=UDOC.M.multPoint(c9,h.cpos);b3+=bg[1];a6+=bg[0];if(k=="rmoveto")UDOC.G.moveTo(h,a6,b3);
else UDOC.G.lineTo(h,a6,b3)}else if(k=="curveto"){var bW=N.pop().val,al=N.pop().val,bD=N.pop().val,ap=N.pop().val,cr=N.pop().val,az=N.length==0?0:N.pop().val;
UDOC.G.curveTo(h,az,cr,ap,bD,al,bW)}else if(k=="arc"||k=="arcn"){var bM=N.pop().val,bp=N.pop().val,aD=N.pop().val,b3=N.pop().val,a6=N.pop().val;
UDOC.G.arc(h,a6,b3,aD,bp*Math.PI/180,bM*Math.PI/180,k=="arcn")}else if(k=="concat"){var Q=FromPS.readArr(N.pop().val);
UDOC.M.concat(Q,h.ctm);h.ctm=Q}else if(["translate","scale","rotate"].indexOf(k)!=-1){var y=N.pop(),Q,a6,b3;
if(y.typ=="array"){Q=FromPS.readArr(y.val);b3=N.pop().val}else{Q=[1,0,0,1,0,0];b3=y.val}if(k!="rotate")a6=N.pop().val;
if(k=="translate")UDOC.M.translate(Q,a6,b3);if(k=="scale")UDOC.M.scale(Q,a6,b3);if(k=="rotate")UDOC.M.rotate(Q,-b3*Math.PI/180);
if(y.typ=="array")N.push({typ:"array",val:FromPS.makeArr(Q,"real")});else{UDOC.M.concat(Q,h.ctm);h.ctm=Q}}else if(k=="concatmatrix"){var bu=FromPS.readArr,aR=bu(N.pop().val),cl=bu(N.pop().val),a9=bu(N.pop().val),Q=a9.slice(0);
UDOC.M.concat(Q,cl);Q=FromPS.makeArr(Q,"real");N.push({typ:"array",val:Q})}else if(k=="invertmatrix"){var bu=FromPS.readArr,cl=bu(N.pop().val),a9=bu(N.pop().val),Q=a9.slice(0);
UDOC.M.invert(Q);Q=FromPS.makeArr(Q,"real");N.push({typ:"array",val:Q})}else if(k=="currentmatrix"||k=="defaultmatrix"){var Q=N.pop(),aA=FromPS.makeArr(k=="currentmatrix"?h.ctm:[1,0,0,1,0,0],"real");
for(var Z=0;Z<6;Z++)Q.val[Z]=aA[Z];N.push(Q)}else if(k=="setmatrix"){h.ctm=FromPS.readArr(N.pop().val)}else if(k=="cvi"){var F=N.pop(),y=F.val,I=0;
if(F.typ=="real")I=Math.round(y);else if(F.typ=="integer")I=y;else throw"unknown type "+F.typ;N.push({typ:"integer",val:I})}else if(k=="cvr"){var F=N.pop(),y=F.val,I=0;
if(F.typ=="real")I=y;else if(F.typ=="integer")I=y;else if(F.typ=="string")I=parseFloat(FromPS.readStr(y));
else throw"unknown type "+F.typ;N.push({typ:"real",val:I})}else if(k=="cvs"){var o=N.pop(),cy=N.pop(),A="";
o.val=[];N.push(o);if(cy.typ=="real"||cy.typ=="integer"){if(Math.abs(Math.round(cy.val)-cy.val)<1e-6)A=Math.round(cy.val)+".0";
else A=(Math.round(cy.val*1e6)/1e6).toString()}else if(cy.typ=="name")A=cy.val;else throw"unknown var type: "+cy.typ;
for(var Z=0;Z<A.length;Z++)o.val[Z]=A.charCodeAt(Z)}else if(k=="cvx"){var F=N.pop(),by;if(F.typ=="array")by={typ:"procedure",val:F.val};
else if(F.typ=="name")by={typ:"name",val:F.val.slice(1)};else if(F.typ=="string"){by={typ:"file",val:{off:0,buff:new Uint8Array(F.val)}}}else{console.log(F);
throw F.typ}N.push(by)}else if(k=="cvlit"){var T=N.pop();if(T.typ=="procedure")N.push({typ:"array",val:T.val});
else N.push(T)}else if(k=="cvn"){N.push({typ:"name",val:FromPS.readStr(N.pop().val)})}else if("add sub mul div idiv bitshift mod exp atan".split(" ").indexOf(k)!=-1){var b2=N.pop(),aB=N.pop(),x=aB.val,j=b2.val,I=0,R="";
if(k=="add"||k=="sub"||k=="mul")R=aB.typ=="real"||b2.typ=="real"?"real":"integer";else if(k=="div"||k=="atan"||k=="exp")R="real";
else if(k=="mod"||k=="idiv"||k=="bitshift")R="integer";if(aB.typ=="real"){p[0]=x;x=p[0]}if(b2.typ=="real"){p[0]=j;
j=p[0]}if(k=="add")I=x+j;if(k=="sub")I=x-j;if(k=="mul")I=x*j;if(k=="div")I=x/j;if(k=="idiv")I=~~(x/j);
if(k=="bitshift")I=j>0?x<<j:x>>>-j;if(k=="mod")I=x%j;if(k=="exp")I=Math.pow(x,j);if(k=="atan")I=Math.atan2(x,j)*180/Math.PI;
if(R=="real"){p[0]=I;I=p[0]}N.push({typ:R,val:I})}else if("neg abs floor ceiling round truncate sqrt ln sin cos".split(" ").indexOf(k)!=-1){var aB=N.pop(),x=aB.val,I=0,R="";
if(k=="neg"||k=="abs"||k=="truncate"||k=="floor"||k=="ceiling"||k=="round")R=aB.typ;else if(k=="sqrt"||k=="sin"||k=="cos"||k=="ln")R="real";
if(aB.typ=="real"){p[0]=x;x=p[0]}if(k=="neg")I=-x;if(k=="abs")I=Math.abs(x);if(k=="floor")I=Math.floor(x);
if(k=="ceiling")I=Math.ceil(x);if(k=="round")I=Math.round(x);if(k=="truncate")I=Math.trunc(x);if(k=="sqrt")I=Math.sqrt(x);
if(k=="ln")I=Math.log(x);if(k=="sin")I=Math.sin(x*Math.PI/180);if(k=="cos")I=Math.cos(x*Math.PI/180);
if(k=="ln"&&x<=0)throw"e";if(R=="real"){p[0]=I;I=p[0]}N.push({typ:R,val:I})}else if("eq ge gt le lt ne".split(" ").indexOf(k)!=-1){var b2=N.pop(),aB=N.pop(),$=aB.typ,cA=b2.typ,x=aB.val,j=b2.val,I=!1;
if(k=="eq"||k=="ne"){var cw=aB.typ==b2.typ;if(cw&&["integer","real","name","null","dict"].indexOf($)!=-1)I=x==j;
else if($=="real"&&cA=="integer"||cA=="real"&&$=="integer")I=x==j;else if(!cw&&(aB.typ=="null"||b2.typ=="null"))I=!1;
else if(cw&&aB.typ=="string"){if(x.length!=j.length)I=!1;else{I=!0;for(var Z=0;Z<x.length;Z++)if(x[Z]!=j[Z])I=!1}}else{console.log(k,aB,b2,aB.val==b2.val);
throw"e"}if(k=="ne")I=!I}else if(k=="ge")I=x>=j;else if(k=="gt")I=x>j;else if(k=="le")I=x<=j;else if(k=="lt")I=x<j;
N.push({typ:"boolean",val:I})}else if(["and","or"].indexOf(k)!=-1){var Y=N.pop(),f=N.pop(),j=f.val,u=Y.val,q=f.typ=="integer",I;
if(k=="and")I=q?j&u:j&&u;if(k=="or")I=q?j|u:j||u;N.push({typ:q?"integer":"boolean",val:I})}else if(k=="not"){var aq=N.pop(),y=aq.val,q=aq.typ=="integer",I=q?~y:!y;
N.push({typ:q?"integer":"boolean",val:I})}else if(k=="if"){var c1=N.pop(),X=N.pop().val;if(X)FromPS.addProc(c1,D)}else if(k=="ifelse"){var aE=N.pop(),cm=N.pop(),X=N.pop().val;
FromPS.addProc(X?cm:aE,D)}else if(k=="exec"||k=="stopped"){var T=N.pop();if(k=="stopped")FromPS.addProc({typ:"procedure",val:[{typ:"boolean",val:!1}]},D);
if(T.typ=="procedure")FromPS.addProc(T,D);else if(T.typ=="name"||T.typ=="operator"||T.typ=="integer"||T.typ=="real"||T.typ=="array")FromPS.addProc({typ:"procedure",val:[T]},D);
else{console.log(T);throw"unknown executable type: "+T.typ}}else if(k=="stop"){var C=D[D.length-1];if(C.typ=="procedure"&&C.off!=0)D.pop()}else if(k=="dup"){var y=N.pop();
N.push(y,y)}else if(k=="exch"){N.push(N.pop(),N.pop())}else if(k=="copy"){var bo=N.pop();if(bo.typ=="integer"){var bQ=[];
for(var Z=0;Z<bo.val;Z++)bQ[bo.val-1-Z]=N.pop();for(var Z=0;Z<bo.val;Z++)N.push(bQ[Z]);for(var Z=0;Z<bo.val;
Z++)N.push(bQ[Z])}else if(bo.typ=="array"){var Q=N.pop().val;for(var Z=0;Z<Q.length;Z++){bo.val[Z]=Q[Z];
if(Q[Z].val==null){console.log(B);throw"e"}}N.push(bo)}else if(bo.typ=="dict"){var Q=N.pop().val;for(var J in Q){bo.val[J]=Q[J]}N.push(bo)}else throw"e"}else if(k=="roll"){var am=N.pop().val,bo=N.pop().val,bQ=[];
for(var Z=0;Z<bo;Z++)bQ.push(N.pop());bQ.reverse();am=(bo+am)%bo;for(var Z=0;Z<am;Z++)bQ.unshift(bQ.pop());
for(var Z=0;Z<bo;Z++)N.push(bQ[Z])}else if(k=="index"){var bo=N.pop().val;N.push(N[N.length-1-bo])}else if(k=="anchorsearch"){var L=N.pop(),bX=N.pop(),bT=L.val,o=bX.val,bq=!0;
if(bT.length<=o.length){for(var Z=0;Z<bT.length;Z++)if(bT[Z]!=o[Z])bq=!1}else bq=!1;if(bq)N.push({typ:"string",val:o.slice(bT.length)},L);
else N.push(bX);N.push({typ:"boolean",val:bq})}else if(k=="transform"||k=="itransform"||k=="dtransform"||k=="idtransform"){var Q=N.pop(),b3=0,a6=0;
if(Q.typ=="array"){Q=FromPS.readArr(Q.val);b3=N.pop().val}else{b3=Q.val;Q=h.ctm.slice(0)}if(k=="itransform"||k=="idtransform"){UDOC.M.invert(Q)}a6=N.pop().val;
if(k.endsWith("dtransform")){Q[4]=0;Q[5]=0}var bB=UDOC.M.multPoint(Q,[a6,b3]);N.push({typ:"real",val:bB[0]},{typ:"real",val:bB[1]})}else if(k=="pop"||k=="srand"||k=="=="){N.pop()}else if(k=="rand"){N.push({typ:"integer",val:Math.floor(Math.random()*2147483647)})}else if(k=="put"){var g=N.pop(),F=N.pop(),T=N.pop(),R=T.typ;
if(R=="array"){if(F.typ!="integer")throw"e";T.val[F.val]=g}else if(R=="dict"){var c=FromPS.getDKey(F);
T.val[c]=g}else if(R=="string")T.val[F.val]=g.val;else throw R+" e"}else if(k=="get"){var F=N.pop(),T=N.pop(),R=T.typ;
if(R=="string")N.push({typ:"integer",val:T.val[F.val]});else if(R=="array"){var A=T.val[F.val];if(A==null)throw"e";
N.push(A)}else if(R=="dict"){var a2=FromPS.getDKey(F),y=T.val[a2];if(y==null){throw"e"}else N.push(y)}else throw"getting from unknown type "+T.typ}else if(k=="load"){var S=N.pop().val.slice(1),g=FromPS.getFromStacks(S,B);
if(g==null){console.log(S,B);throw"e"}N.push(g)}else if(k=="where"){var S=N.pop().val.slice(1),aZ=FromPS.where(S,B);
if(aZ!=null)N.push({typ:"dict",val:aZ,maxl:1e3});N.push({typ:"boolean",val:aZ!=null})}else if(k=="store"){var g=N.pop(),S=N.pop().val.slice(1),aZ=FromPS.where(S,B);
if(aZ==null)aZ=B[B.length-1];aZ[S]=g}else if(k=="repeat"){var c1=N.pop(),ai=N.pop().val;D.push({typ:"name",val:k+"---",ctx:{proc:c1,cur:0,cnt:ai}})}else if(k=="repeat---"){var z=v.ctx;
if(z.cur<z.cnt){D.push(v);FromPS.addProc(z.proc,D);z.cur++}}else if(k=="for"){var c1=N.pop(),aP=N.pop(),bw=N.pop(),bf=N.pop();
D.push({typ:"name",val:k+"---",ctx:{proc:c1,isInt:bf.typ=="integer"&&bw.typ=="integer",init:bf.val,inc:bw.val,limit:aP.val}})}else if(k=="for---"){var z=v.ctx;
if(z.isInt){if(z.inc>0&&z.init<=z.limit||z.inc<0&&z.init>=z.limit){D.push(v);FromPS.addProc(z.proc,D);
N.push({typ:"integer",val:z.init});z.init+=z.inc}}else{var K=new Float32Array(1);K[0]=z.limit;z.limit=K[0];
K[0]=z.inc;z.inc=K[0];K[0]=z.init;if(z.inc>0&&K[0]<=z.limit||z.inc<0&&K[0]>=z.limit){D.push(v);FromPS.addProc(z.proc,D);
N.push({typ:"real",val:K[0]});K[0]+=z.inc;z.init=K[0]}}}else if(k=="loop"){var c1=N.pop();D.push({typ:"name",val:k+"---",ctx:{proc:c1}})}else if(k=="loop---"){var z=v.ctx;
D.push(v);FromPS.addProc(z.proc,D)}else if(k=="pathforall"){var r=N.pop(),b7=N.pop(),bb=N.pop(),bn=N.pop()}else if(k=="forall"){var c1=N.pop(),T=N.pop(),z=[c1,T,0];
D.push({typ:"name",val:k+"---",ctx:z})}else if(k=="forall---"){var z=v.ctx,c1=z[0],T=z[1],Z=z[2];if(T.typ=="dict"){var bx=Object.keys(T.val);
if(Z<bx.length){D.push(v);FromPS.addProc(c1,D);N.push({typ:"name",val:"/"+bx[Z]});var A=T.val[bx[Z]];
if(A==null)throw"e";N.push(A==null?{typ:"null",val:null}:A);z[2]++}}else if(T.typ=="procedure"||T.typ=="array"){if(Z<T.val.length){D.push(v);
FromPS.addProc(c1,D);var bd=T.val[Z];N.push(bd==null?{typ:"null",val:null}:bd);z[2]++}}else{console.log(c1,T);
throw"forall: unknown type: "+T.typ}}else if(k=="exit"){var Z=D.length-1;while(Z!=0&&(D[Z].typ!="name"||!D[Z].val.endsWith("---")))Z--;
if(Z!=0)while(D.length>Z)D.pop()}else if(k=="bind"){}else if(k=="xcheck"){var T=N.pop(),i=T.typ;N.push({typ:"boolean",val:i=="procedure"})}else if(k=="status"){var o=N.pop();
N.push({typ:"boolean",val:!1})}else if(k=="cachestatus"){for(var Z=0;Z<7;Z++)N.push({typ:"integer",val:5e3})}else if(k=="setcachelimit"){N.pop()}else if(k=="type"){var F=N.pop(),a0={name:"nametype",dict:"dicttype",boolean:"booleantype",procedure:"operatortype",string:"stringtype",null:"nulltype",integer:"integertype",array:"arraytype",operator:"operatortype",real:"realtype"};
if(a0[F.typ]==null){console.log(F);throw F.typ}N.push({typ:"name",val:"/"+a0[F.typ]})}else if(k=="save"){N.push({typ:"state",val:JSON.parse(JSON.stringify(h))})}else if(k=="restore"){h=_.gst=N.pop().val}else if(k=="clipsave"){h.cpstack.push(JSON.parse(JSON.stringify(h.cpth)))}else if(k=="cliprestore"){h.cpath=h.cpstack.pop()}else if(k=="gsave"){e.push(JSON.parse(JSON.stringify(h)))}else if(k=="grestore"){if(e.length!=0)h=_.gst=e.pop();
else h=UDOC.getState()}else if(k=="grestoreall"){while(e.length!=0)h=_.gst=e.pop()}else if(k=="usertime"||k=="realtime")N.push({typ:"integer",val:k=="usertime"?Date.now()-s:Date.now()});
else if(k=="flush"||k=="readonly"||k=="executeonly"){}else if(k=="flushfile"){FromPS.GetFile(N.pop())}else if(k=="filter"){var aa=N.pop().val,aG;
if(aa=="/SubFileDecode"){var o=N.pop();if(o.typ!="string")throw"e";var bJ=N.pop().val;o=o.val;aG=[aa,o,bJ]}else aG=[aa];
var cg=N.pop();N.push({typ:"file",val:{buff:new Uint8Array,off:0},_flt:aG,_src:cg})}else if(k=="begincmap"||k=="endcmap"){}else if(k=="begincodespacerange"||k=="beginbfrange"||k=="beginbfchar"){_.cmnum=N.pop().val}else if(k=="endcodespacerange"||k=="endbfrange"||k=="endbfchar"){var r=k=="endbfrange"?3:2,cq=k.slice(3),aZ=B[B.length-1],aN=0;
if(aZ[cq]==null)aZ[cq]=[];for(var Z=0;Z<_.cmnum;Z++){var c2=[];for(var am=r-1;am>=0;am--){var cc=N.pop(),aT=cc.val,A;
if(cc.typ=="string"){A=FromPS.strToInt(aT);if(am==0)aN=aT.length}else{A=[];for(var a2=0;a2<aT.length;
a2++)A.push(FromPS.strToInt(aT[a2].val))}c2[am]=A}aZ[cq]=aZ[cq].concat(c2)}if(k!="endcodespacerange")aZ.bpc=aN}else if(V)V(k,N,B,D,e,_,l);
else{console.log(g,k);console.log(B,N);throw"e"}}else throw T.typ}return!0};FromPS.strToInt=function(N){var B=0;
for(var D=0;D<N.length;D++)B=B<<8|N[D];return B};FromPS.getDKey=function(N){if(N.typ=="name")return N.val.slice(1);
if(N.typ=="string")return FromPS.readStr(N.val);return N.val};FromPS.GetFile=function(N){if(N._flt==null||N.val.off<N.val.buff.length)return N;
FromPS.GetFile(N._src);var B=N._src.val,D=N._flt,e=D[0],_;if(e=="/ASCII85Decode")_=FromPS.F.ASCII85Decode(B);
else if(e=="/RunLengthDecode")_=FromPS.F.RunLengthDecode(B);else if(e=="/FlateDecode")_=FromPS.F.FlateDecode(B);
else if(e=="/LZWDecode")_=FromPS.F.LZWDecode(B);else if(e=="/SubFileDecode"){var V=D[1],W=D[2],s=B.off,p=0;
while(s<B.buff.length){var n=0;while(n<V.length&&B.buff[s+n]==V[n])n++;if(n==V.length){if(p==W)break;
p++}s++}_=B.buff.slice(B.off,s);B.off=s}else throw e;N.val={buff:_,off:0};return N};FromPS.checkPageStarted=function(N,B){if(!N.pgOpen){B.StartPage(N.bb[0],N.bb[1],N.bb[2],N.bb[3]);
N.pgOpen=!0}};FromPS.getPSShadingFill=function(N,B){function D(_){var l,V=_.typ,W=_.val;if(V=="dict"){l={};
for(var s in W)l["/"+s]=D(W[s])}else if(V=="array"){l=[];for(var p=0;p<W.length;p++)l.push(D(W[p]))}else if(V=="string"){l="";
for(var p=0;p<W.length;p++)l+=String.fromCharCode(W[p])}else if(["boolean","integer","real","name"].indexOf(V)!=-1)l=W;
else if(V=="procedure"){var n="";for(var p=0;p<W.length;p++)n+=W[p].val+" ";n="{ "+n+"}";var h=new Uint8Array(n.length);
for(var p=0;p<n.length;p++)h[p]=n.charCodeAt(p);l={"/FunctionType":4,"/Domain":[0,1],"/Range":[0,1,0,1,0,1,0,1],"/Length":n.length,stream:h}}else{console.log(_);
throw"e"}return l}var e=D(N);return FromPS.getShadingFill(e,B)};FromPS.F={HexDecode:function(N){var B=[];
FromPS.readHex(N,1e9,B);return new Uint8Array(B)},ASCII85Decode:function(N){var B=[85*85*85*85,85*85*85,85*85,85,1],D=[],e=0,_=0,l=N.off,V=N.buff,W=V.length;
while(!0){var p=V[l++];if(FromPS.isWhite(p)){}else if(p==126){if(e!=0){if(e==3){D.push(_>>>24&255)}if(e==4){D.push(_>>>24&255);
D.push(_>>>16&255)}var n=5-e<<3,h=_>>>n&255;_=_&(1<<n)-1;if(_!=0)h++;D.push(h)}N.off=l+1;return new Uint8Array(D)}else if(p==122){D.push(0);
D.push(0);D.push(0);D.push(0)}else{_+=(p-33)*B[e];e++;if(e==5){D.push(_>>>24&255);D.push(_>>>16&255);
D.push(_>>>8&255);D.push(_>>>0&255);e=0;_=0}}}},RunLengthDecode:function(N){var B=[],D=N.off,e=N.buff.length;
while(D<e){var _=N.buff[D];D++;if(_==128){break}if(_<128){for(var l=0;l<_+1;l++)B.push(N.buff[D+l]);
D+=_+1}else{for(var l=0;l<257-_;l++)B.push(N.buff[D]);D++}}N.off=D;return new Uint8Array(B)},FlateDecode:function(N){var B=N.buff,D=new Uint8Array(B.buffer,B.byteOffset+N.off+2,B.length-2),e=pako.inflateRaw(D);
return e},LZWDecode:function(N){var B=new Uint8Array((N.buff.length-N.off)*20),D=UTIF.decode._decodeLZW(N.buff,N.off,B,0);
return B.slice(0,D)},_myLZW:function(){var N={},B=function(e,_,l,V,W){for(var p=0;p<W;p+=4){l[V+p]=e[_+p];
l[V+p+1]=e[_+p+1];l[V+p+2]=e[_+p+2];l[V+p+3]=e[_+p+3]}},D=function(e,_,l,V){if(!N.c){var W=new Uint32Array(65535),p=new Uint16Array(65535),n=new Uint8Array(2e6);
for(var h=0;h<256;h++){n[h<<2]=h;W[h]=h<<2;p[h]=1}N.c=[W,p,n]}var v=N.c[0],i=N.c[1],n=N.c[2],H=258,U=258<<2,O=9,G=_<<3,M=256,E=257,F=0,a=0,b=0;
while(!0){F=e[G>>>3]<<16|e[G+8>>>3]<<8|e[G+16>>>3];a=F>>24-(G&7)-O&(1<<O)-1;G+=O;if(a==E)break;if(a==M){O=9;
H=258;U=258<<2;F=e[G>>>3]<<16|e[G+8>>>3]<<8|e[G+16>>>3];a=F>>24-(G&7)-O&(1<<O)-1;G+=O;if(a==E)break;
l[V]=a;V++}else if(a<H){var S=v[a],bY=i[a];B(n,S,l,V,bY);V+=bY;if(b>=H){v[H]=U;n[v[H]]=S[0];i[H]=1;U=U+1+3&~3;
H++}else{v[H]=U;var P=v[b],o=i[b];B(n,P,n,U,o);n[U+o]=n[S];o++;i[H]=o;H++;U=U+o+3&~3}if(H+1==1<<O)O++}else{if(b>=H){v[H]=U;
i[H]=0;H++}else{v[H]=U;var P=v[b],o=i[b];B(n,P,n,U,o);n[U+o]=n[U];o++;i[H]=o;H++;B(n,U,l,V,o);V+=o;U=U+o+3&~3}if(H+1==1<<O)O++}b=a}return V};
return D}()};FromPS.B={readUshort:function(N,B){return N[B]<<8|N[B+1]},readUint:function(N,B){return N[B]*(256*256*256)+(N[B+1]<<16|N[B+2]<<8|N[B+3])},readASCII:function(N,B,D){var e="";
for(var _=0;_<D;_++)e+=String.fromCharCode(N[B+_]);return e}};FromPS.nrm=function(N){return Math.max(0,Math.min(1,N))};
FromPS.makeArr=function(N,B){var D=[];for(var e=0;e<N.length;e++)D.push({typ:B,val:N[e]});return D};
FromPS.readArr=function(N){var B=[];for(var D=0;D<N.length;D++)B.push(N[D].val);return B};FromPS.makeStr=function(N){var B=[];
for(var D=0;D<N.length;D++)B.push(N.charCodeAt(D));return B};FromPS.readStr=function(N){var B="";for(var D=0;
D<N.length;D++)B+=String.fromCharCode(N[D]);return B};FromPS.getFromStacks=function(N,B){var D=B.length-1;
while(D>=0){if(B[D][N]!=null)return B[D][N];D--}return null};FromPS.where=function(N,B){var D=B.length-1;
while(D>=0){if(B[D][N]!=null)return B[D];D--}return null};FromPS.skipWhite=function(N){var B=N.off,D=N.buff,e=FromPS.isWhite;
while(e(D[B])||D[B]==37){while(e(D[B]))B++;if(D[B]==37){while(B<D.length&&!FromPS.isEOL(D[B]))B++;B++}}N.off=B};
FromPS.getToken=function(N,B){if(N.length==0)return null;var D=N[N.length-1];if(D.typ=="procedure"){var e=D.val[D.off];
D.off++;if(D.off==D.val.length)N.pop();return e}if(D.typ=="name"){N.pop();return D}var _=FromPS.getFToken(D.val,B);
while(_==null&&N.length>1){N.pop();if(N.length!=0)_=FromPS.getFToken(N[N.length-1].val,B)}return _};
FromPS.getFToken=function(N,B){FromPS.skipWhite(N);var D=FromPS.isWhite,e=FromPS.isSpecl,_=N.off,l=N.buff,V=null;
if(_>=l.length)return null;var W=l[_],p=String.fromCharCode(W);_++;if(p=="("){var n=0,h=_;while(!(l[h]==41&&n==0)){var v=l[h];
if(v==40)n++;else if(v==41)n--;else if(v==92)h++;h++}var i=[];for(var g=0;g<h-_;g++)i.push(l[_+g]);_=h+1;
i=FromPS.getString(i);V={typ:"string",val:i}}else if(p=="{"||p=="}"||p=="["||p=="]"){V={typ:"name",val:p}}else if(p=="<"&&l[_]==60||p==">"&&l[_]==62){V={typ:"name",val:p=="<"?"<<":">>"};
_++}else if(p=="<"){var i;if(l[_]=="~".charCodeAt(0)){N.off=_+1;var H=FromPS.F.ASCII85Decode(N);i=[];
for(var g=0;g<H.length;g++)i.push(H[g]);_=N.off}else{var h=_;while(l[h]!=62)h++;var i=[];FromPS.readHex({buff:l,off:_},1e9,i);
_=h+1}V={typ:"string",val:i}}else{var h=_;while(h<l.length&&!D(l[h])&&(!e(l[h])||l[h]==47&&l[h-1]==47&&h==_&&B))h++;
var U=FromPS.B.readASCII(l,_-1,h-_+1);_=h;var O=parseFloat(U);if(!1){}else if(U=="true"||U=="false")V={typ:"boolean",val:U=="true"};
else if(!isNaN(O)){var G=new Float32Array(1);G[0]=O;O=G[0];V={typ:U.indexOf(".")==-1?"integer":"real",val:O}}else{if(U.slice(0,2)=="//"&&B){var M=U.slice(2),E=FromPS.getFromStacks(M,B);
if(E!=null)V=E;else V={typ:"name",val:U}}else V={typ:"name",val:U}}}N.off=_;return V};FromPS.isSpecl=function(N){return[40,41,60,62,91,93,123,125,37,47].indexOf(N)!=-1};
FromPS.isWhite=function(N){return N==0||N==9||N==10||N==12||N==13||N==32};FromPS.isEOL=function(N){return N==10||N==13};
FromPS.getString=function(N){var B=[],D="n,r,t,b,f,\\,(,), ,/".split(","),e=["\n","\r","\t","\b","\f","\\","(",")"," ","/"];
for(var _=0;_<N.length;_++){var l=N[_],V=String.fromCharCode(l);if(V=="\\"){var W=String.fromCharCode(N[_+1]);
_++;if(W=="\r"||W=="\n")continue;var p=D.indexOf(W);if(p!=-1)B.push(e[p].charCodeAt(0));else{var n=W+String.fromCharCode(N[_+1])+String.fromCharCode(N[_+2]);
_+=2;B.push(parseInt(n,8))}}else B.push(l)}return B};FromPS.makeString=function(N){var B="n r t b f \\ ( )".split(" "),D=["\n","\r","\t","\b","\f","\\","(",")"],e=[];
for(var _=0;_<N.length;_++){var l=N[_],V=D.indexOf(String.fromCharCode(l));if(V==-1)e.push(l);else e.push(92,B[V].charCodeAt(0))}return e};
FromPS.readHex=function(N,B,D){var e=0,_=-1,l=N.off,V=N.buff.length;while(e!=B&&l<V){var W=N.buff[l],n=0;
l++;if(47<W&&W<58)n=W-48;else if(96<W&&W<103)n=10+W-97;else if(64<W&&W<71)n=10+W-65;else if(W==62)break;
else if(FromPS.isWhite(W))continue;else throw"e";if(_==-1)_=n;else{D[e]=_<<4|n;_=-1;e++}}N.off=l};FromPS.getShadingFill=function(N,B){var D=N["/ShadingType"],e=N["/ColorSpace"],_=N["/Extend"],l=N["/Coords"]?N["/Coords"].slice(0):null,V="",s;
if(_==null)_=[!1,!1];if(D==2)V="lin";else if(D==3)V="rad";else{console.log("Unknown shading type",D);
return}var W=N["/Function"];if(W instanceof Array){var p=W.length,n;for(var h=0;h<p;h++){var v=FromPS.getGrad(W[h],"/DeviceGray");
if(h==0)n=v;else{var g=n.length;for(var H=0;H<g;H++)n[H][1][h]=v[H][1][0]}}if(e=="/DeviceCMYK")for(var h=0;
h<n.length;h++)n[h][1]=UDOC.C.cmykToRgb(n[h][1]);s=n}else s=FromPS.getGrad(W,e);if(V=="rad"&&l[2]>l[5]){l=l.slice(3).concat(l.slice(0,3));
_.reverse();s.reverse();for(var h=0;h<s.length;h++)s[h][0]=1-s[h][0]}if(!_[0]&&V!="rad"){var U=s[0];
U[0]+=.002;s.unshift([.001,U[1].slice(),0])}if(!_[1]){var U=s[s.length-1];U[0]-=.002;s.push([0,999,U[1].slice(),0])}var O={typ:V,mat:B,grad:s,crds:l};
return O};FromPS.getGrad=function(N,B){var D=FromPS._normColor,e=N["/Functions"],_=N["/FunctionType"],l=N["/Bounds"],V=N["/Encode"],W;
if(_==0){W=[];var s=Math.min(4,N["/Size"][0]);for(var p=0;p<=s;p++)W.push([p/s,D(N,[p/s],B)])}else if(_==2)W=[[0,D(N,[0],B)],[1,D(N,[1],B)]];
else if(_==3){var n=0;W=[];if(l.length==0||l[0]>0)W.push([0,D(e[0],[V[0]],B)]);for(var p=0;p<l.length;
p++)W.push([l[p],D(e[p],[V[2*p+1]],B)]);if(l.length==0||l[l.length-1]<1)W.push([1,D(e[e.length-1],[V[V.length-1]],B)])}else if(_==4){W=[];
for(var p=0;p<5;p++)W.push([p/5,D(N,[p/5],B)])}return W};FromPS._normColor=function(N,B,D){var e="/DeviceCMYK",_="/DeviceRGB",l,V=FromPS.Func(N,B);
if(D[3]&&D[3]["/Length"]){V=FromPS.Func(D[3],V);if(D[2]==e||V.length==4)l=e;else if(D[2]==_)l=_;else if(D[2]&&D[2][0]=="/Lab")l="/Lab";
else if(D[2]&&D[2][1]&&D[2][1]["/Alternate"]&&D[2][1]["/Alternate"][0]=="/Lab")l="/Lab";else if(D[2]&&D[2][1]&&D[2][1]["/Alternate"]&&D[2][1]["/Alternate"]==_)l=_;
else{console.log(V,D);throw"unknown color profile"}}else if(D[0]=="/ICCBased"&&D[1]){var W=D[1]["/N"];
if(W==4)l=e;else if(W==3)l=_;else throw W}else if(D[0]=="/Separation"){V=FromPS._readSeparation(D,V[0]);
l=_}else if(D.length==1)l=D[0];else if(D[0]=="/Lab")l="/Lab";else if(D[2]==e)l=e;else l=D;if(l==_)V=V;
else if(l==e)V=UDOC.C.cmykToRgb(V);else if(l=="/DeviceGray")V=[V[0],V[0],V[0]];else if(l=="/Lab")V=UDOC.C.labToRgb(V);
else throw"Unknown color space "+l;return V};FromPS._readSeparation=function(N,B){var D=FromPS.Func(N[3],[B]),e;
if(N&&N[2]=="/DeviceCMYK")e=UDOC.C.cmykToRgb(D);else if(N&&N[2]=="/DeviceGray")e=[D[0],D[0],D[0]];else if(N&&N[2]&&N[2][0]&&N[2][0]=="/Lab")e=UDOC.C.labToRgb(D);
else{e=D}return e};FromPS.Func=function(N,B){var D=FromPS.intp,e=N["/Domain"],_=N["/Range"],V=N["/FunctionType"],W=[];
for(var s=0;s<B.length;s++)B[s]=Math.max(e[2*s],Math.min(e[2*s+1],B[s]));if(V==0){var p=N["/Encode"],n=N["/Size"],h=N["/Decode"],v=_.length/2;
if(p==null)p=[0,n[0]-1];if(h==null)h=_;for(var s=0;s<B.length;s++){var g=D(B[s],e[2*s],e[2*s+1],p[2*s],p[2*s+1]);
B[s]=Math.max(0,Math.min(n[s]-1,g))}var H=N["/DataSource"];for(var U=0;U<v;U++){var O=Math.round(B[0]),G;
if(H)G=H.charCodeAt(v*O+U);else G=FromPS.GS(N)[v*O+U];G=D(G,0,255,h[2*U],h[2*U+1]);W.push(G)}}else if(V==2){var M=N["/C0"],E=N["/C1"],F=N["/N"];
if(M==null)M=[0];if(E==null)E=[1];var O=B[0];for(var s=0;s<M.length;s++)W[s]=M[s]+Math.pow(O,F)*(E[s]-M[s])}else if(V==4){var a=FromPS._getEnv([0,0,0,0]),A=!0;
a.pgOpen=!0;var T=[],k=[],H=FromPS._getDictStack([],{}),b=[];b.push({typ:"file",val:{buff:FromPS.GS(N),off:0}});
while(A)A=FromPS.step(k,H,b,T,a,{},FromPS.operator);var c=k.pop();c.off=0;b.push(c);for(var s=0;s<B.length;
s++)k.push({typ:"real",val:B[s]});A=!0;while(A)A=FromPS.step(k,H,b,T,a,{},FromPS.operator);for(var s=0;
s<k.length;s++)W.push(k[s].val)}if(_)for(var s=0;s<W.length;s++)W[s]=Math.max(_[2*s],Math.min(_[2*s+1],W[s]));
return W};FromPS.intp=function(N,B,D,e,_){return e+(N-B)*(_-e)/(D-B)};FromPS.GS=function(N){if(N.stream==null){var B=N.buff;
delete N.buff;var D=N["/Filter"],e=N["/DecodeParms"];if(D!=null){var _=typeof D=="string"?[D]:D,l=!1;
for(var V=0;V<_.length;V++){var W=_[V],p={buff:B,off:0};if(W=="/FlateDecode"){B=FromPS.F.FlateDecode(p)}else if(W=="/RunLengthDecode"){B=FromPS.F.RunLengthDecode(p)}else if(W=="/LZWDecode"){B=FromPS.F.LZWDecode(p)}else if(W=="/ASCIIHexDecode"){B=FromPS.F.HexDecode(p)}else if(W=="/ASCII85Decode"||W=="/A85"){B=FromPS.F.ASCII85Decode(p)}else if(W=="/DCTDecode"||W=="/CCITTFaxDecode"||W=="/JPXDecode"||W=="/JBIG2Decode"){l=!0}else{console.log(W,B);
throw"e"}}if(!l)delete N["/Filter"]}if(e!=null){if(e instanceof Array)e=e[0];if(e&&e["/Predictor"]!=null&&e["/Predictor"]!=1){var n=e["/Columns"],h=e["/Colors"]?e["/Colors"]:1,v=h*n,i=B.length/(v+1);
FromPS._filterZero(B,0,n,i,h);B=B.slice(0,i*v)}}N.stream=B}return N.stream};FromPS._filterZero=function(N,B,D,e,_){var l=_*D,V=FromPS._paeth;
for(var s=0;s<e;s++){var p=B+s*l,n=p+s+1,h=N[n-1];if(h==0)for(var v=0;v<l;v++)N[p+v]=N[n+v];else if(h==1){for(var v=0;
v<_;v++)N[p+v]=N[n+v];for(var v=_;v<l;v++)N[p+v]=N[n+v]+N[p+v-_]&255}else if(s==0){for(var v=0;v<_;v++)N[p+v]=N[n+v];
if(h==2)for(var v=_;v<l;v++)N[p+v]=N[n+v]&255;if(h==3)for(var v=_;v<l;v++)N[p+v]=N[n+v]+(N[p+v-_]>>1)&255;
if(h==4)for(var v=_;v<l;v++)N[p+v]=N[n+v]+V(N[p+v-_],0,0)&255}else{if(h==2){for(var v=0;v<l;v++)N[p+v]=N[n+v]+N[p+v-l]&255}if(h==3){for(var v=0;
v<_;v++)N[p+v]=N[n+v]+(N[p+v-l]>>1)&255;for(var v=_;v<l;v++)N[p+v]=N[n+v]+(N[p+v-l]+N[p+v-_]>>1)&255}if(h==4){for(var v=0;
v<_;v++)N[p+v]=N[n+v]+V(0,N[p+v-l],0)&255;for(var v=_;v<l;v++)N[p+v]=N[n+v]+V(N[p+v-_],N[p+v-l],N[p+v-_-l])&255}}}return N};
FromPS._paeth=function(N,B,D){var e=N+B-D,_=Math.abs(e-N),l=Math.abs(e-B),V=Math.abs(e-D);if(_<=l&&_<=V)return N;
else if(l<=V)return B;return D};function FromPDF(){}FromPDF.indexOfXref=function(N){var B=N.length-3;
while(FromPS.B.readASCII(N,B,3)!="%%E")B--;while(N[B-1]==37)B--;var D=B;B--;while(FromPS.isEOL(N[B])||N[B]==32)B--;
while(!FromPS.isEOL(N[B])&&N[B]!=32)B--;B++;var e=parseInt(FromPS.B.readASCII(N,B,D-B));if(isNaN(e))throw"no xref";
return e};FromPDF.Parse=function(N,B){N=new Uint8Array(N);var D=0;while(N[D]==32)D++;if(D!=0)N=new Uint8Array(N.buffer,N.byteOffset+D,N.length-D);
var e=FromPDF.indexOfXref(N),_=[],l=FromPDF.readXrefTrail(N,e,_),V=-1;for(var W=0;W<_.length;W++)if(_[W]==null)V=W;
if(l==null||V!=-1){console.log("PDF is broken, trying to rebuild");while(_.length!=0)_.pop();l=FromPDF.brokenXrefTrail(N,_)}if(l["/Encrypt"]){alert("Encrypted PDFs are not supported yet.");
return}var p={buff:N,off:0},n=l["/Root"];if(n.typ=="ref")l["/Root"]=FromPDF.getIndirect(n.ind,n.gen,p,_);
var h=l["/Root"]["/Pages"];if(h.typ=="ref")l["/Root"]["/Pages"]=FromPDF.getIndirect(h.ind,h.gen,p,_);
var v=[l["/Root"]["/Pages"]];while(v.length!=0){var i=v.pop();if(i["/Kids"]){var g=i["/Kids"];for(var W=0;
W<g.length;W++){if(g[W].typ=="ref")g[W]=FromPDF.getIndirect(g[W].ind,g[W].gen,p,_);FromPDF.solveIndirects(g[W],p,_);
v.push(g[W])}}}var H=Date.now();FromPDF.render(l["/Root"],B,l);B.Done()};FromPDF.solveIndirects=function(N,B,D){if(typeof N=="object")for(var e in N)if(e.startsWith("/")){if(N[e]&&N[e].typ=="ref"&&D[N[e].ind])N[e]=FromPDF.getIndirect(N[e].ind,N[e].gen,B,D);
FromPDF.solveIndirects(N[e],B,D)}};FromPDF.render=function(N,B,D){var e="CS cs SCN scn SC sc sh Do gs ID EI cm y v B B* BT ET Tj TJ Tf Tm Td T* Tc Tw Tz TL Tr Ts MP DP BMC BDC EMC BX EX ri".split(" "),_={J:"setlinecap",j:"setlinejoin",w:"setlinewidth",d:"setdash",M:"setmiterlimit",i:"setflat",q:"gsave",Q:"grestore",m:"moveto",l:"lineto",c:"curveto",h:"closepath",re:"_drawRect_",W:"clip","W*":"eoclip",f:"fill",F:"fill","f*":"eofill",S:"stroke",b:"h B","b*":"h B*",n:"newpath",RG:"/DeviceRGB  CS SCN",rg:"/DeviceRGB  cs scn",G:"/DeviceGray CS SCN",g:"/DeviceGray cs scn",K:"/DeviceCMYK CS SCN",k:"/DeviceCMYK cs scn",TD:"dup neg TL Td","\"":"exch Tc exch Tw '","'":"T* Tj",s:"h S",BI:"/BI"},V=0;
_=FromPS.makeProcs(_);var l=[N["/Pages"]];while(l.length!=0){var W=l.pop();if(W["/Kids"]){var s=W["/Kids"];
for(var p=s.length-1;p>=0;p--)l.push(s[p]);continue}var n=W["/MediaBox"];if(n==null)n=N["/Pages"]["/MediaBox"];
V+=(n[2]-n[0])*(n[3]-n[1])}var l=[N["/Pages"]],h=-1,v=[-1e9,1e9];while(l.length!=0){var W=l.pop();if(W["/Kids"]){var s=W["/Kids"];
for(var p=s.length-1;p>=0;p--)l.push(s[p]);continue}h++;if(h<v[0])continue;if(W["/Resources"]==null)W["/Resources"]=N["/Pages"]["/Resources"];
var i=W["/Contents"];if(i==null)continue;if(i.length==null)i=[i];var g=W["/Rotate"]!=null&&(W["/Rotate"]+36e3)%360==90,n=W["/MediaBox"];
if(n==null)n=N["/Pages"]["/MediaBox"];if(g)n=[n[0],n[1],n[3],n[2]];var H=FromPS._getEnv(n);H.pgOpen=!0;
var U=[],O=[],G=FromPS._getDictStack(e,_),M=[];if(g){UDOC.M.rotate(H.gst.ctm,Math.PI/2);UDOC.M.translate(H.gst.ctm,0,n[3])}B.StartPage(n[0],n[1],n[2],n[3],V);
if(D["/Encrypt"]){if(l.length==0)alert("Encrypted PDF is not supported yet.")}else for(var E=0;E<i.length;
E++){if(i[E].buff==null||i[E]["/Length"]==0)continue;var F=FromPS.GS(i[E]),a=F.length-1,Z=!0;while(F[a]==0)a--;
F=new Uint8Array(F.buffer,F.byteOffset,a+1);M.push({typ:"file",val:{buff:F,off:0,extra:W,clgrp:!1}});
while(Z){Z=FromPS.step(O,G,M,U,H,B,FromPDF.operator)}}B.ShowPage();if(h>=v[1])break}};FromPDF.addCmd=function(N,B,D){var e=N.length,_=new Uint8Array(e);
for(var l=0;l<e;l++)_[l]=N.charCodeAt(l);B.push({typ:"file",val:{buff:_,off:0,extra:D}})};FromPDF._pushForm=function(N,B,D,e){var _=B["/Matrix"];
if(e)FromPDF.addCmd("Q",N,B);if(_){var l=_.slice(0);UDOC.M.invert(l);FromPDF.addCmd(l.join(" ")+" cm",N,B)}N.push({typ:"file",val:{buff:FromPS.GS(B),off:0,extra:B,clgrp:D}});
if(_)FromPDF.addCmd(_.join(" ")+" cm",N,B);if(e)FromPDF.addCmd("q",N,B)};FromPDF.operator=function(N,B,D,e,_,l,V){var W=l.gst,s=e.length-1;
while(e[s].typ!="file")s--;var p=e[s].val,n=p.extra["/Resources"];if(N=="Do"){var h=B.pop().val,v=n["/XObject"][h],i=v["/Subtype"];
if(i=="/Form"){var g=v["/Group"],H=!1;if(g!=null){H=!0}if(v["/Resources"]==null)v["/Resources"]=n;FromPDF._pushForm(e,v,H)}else if(i=="/Image"){var U=v["/Width"],O=v["/Height"],G=v["/ColorSpace"],M=v["/SMask"],E=FromPDF.getImage(v),F=FromPDF.getJBIG2Glob(v),Z,T;
if(M&&M["/Width"]){var k=M["/Width"],b=M["/Height"];if(k!=U||b!=O){var A=new Uint32Array(k*b),c=new Uint32Array(E.buffer.slice(E.byteOffset,E.byteOffset+4));
A.fill(c[0]);U=k;O=b;E=new Uint8Array(A.buffer)}Z=FromPDF.getImage(v["/SMask"]);T=FromPDF.getJBIG2Glob(v["/SMask"])}if(v["/ImageMask"]==!0){Z=E;
T=F;E=new Uint8Array(U*O*4);F=null;var S=W.colr[0]*255,bY=W.colr[1]*255,aZ=W.colr[2]*255;for(var P=0;
P<U*O*4;P+=4){E[P]=S;E[P+1]=bY;E[P+2]=aZ;E[P+3]=255}}if(E&&E.byteOffset!=0)E=E.slice(0);if(Z&&Z.byteOffset!=0)Z=Z.slice(0);
V.PutImage(W,E,U,O,Z,F,T)}else console.log("Unknown XObject",i)}else if(N=="gs"){if(B.length==0)return;
var o=B.pop().val,a4=n["/ExtGState"][o];for(var w in a4){var ci=a4[w];if(w=="/Type")continue;else if(w=="/CA")W.CA=p.clgrp?W.CA*ci:ci;
else if(w=="/ca")W.ca=p.clgrp?W.ca*ci:ci;else if(w=="/BM"){if(!p.clgrp||W.bmode=="/Normal")W.bmode=ci}else if(w=="/LC")W.lcap=ci;
else if(w=="/LJ")W.ljoin=ci;else if(w=="/LW")W.lwidth=ci;else if(w=="/ML")W.mlimit=ci;else if(w=="/SA")W.SA=ci;
else if(w=="/OPM")W.OPM=ci;else if(w=="/AIS")W.AIS=ci;else if(w=="/OP")W.OP=ci;else if(w=="/op")W.op=ci;
else if(w=="/SMask"){W.SMask=""}else if(w=="/SM")W.SM=ci;else if(w=="/HT"||w=="/TR"){}else console.log("Unknown gstate property: ",w,ci)}}else if(N=="ID"){var bJ={};
while(!0){var ci=B.pop().val;if(ci=="/BI")break;bJ[B.pop().val]=ci}p.off++;var U=bJ["/W"],O=bJ["/H"],ca=U*O,E=new Uint8Array(ca*4),G=bJ["/CS"],bF=bJ["/BPC"],I=p.off,ct=p.buff;
while(!FromPS.isWhite(ct[I])||ct[I+1]!=69||ct[I+2]!=73||!FromPS.isWhite(ct[I+3]))I++;var bR=ct.slice(p.off,I);
p.off+=bR.length;if(bJ["/F"]=="/Fl"){var c3={buff:bR,"/Filter":"/FlateDecode"};if(bJ["/DP"]){var ax=c3["/DecodeParms"]={},a3=["Predictor","Columns","Colors"];
for(var P=0;P<3;P++)if(bJ["/DP"][a3[P]])ax["/"+a3[P]]=bJ["/DP"][a3[P]].val}bR=FromPS.GS(c3);delete bJ["/F"];
delete bJ["/DP"]}if(G=="/G"&&bJ["/F"]==null){FromPDF.plteImage(bR,0,E,null,U,O,bF)}else if(G=="/RGB"&&bJ["/F"]==null&&bR.length==U*O*3){for(var P=0;
P<ca;P++){var ag=P*3,bo=P*4;E[bo]=bR[ag];E[bo+1]=bR[ag+1];E[bo+2]=bR[ag+2];E[bo+3]=255}}else if(G&&G[0].typ!=null){FromPDF.plteImage(bR,0,E,G[3].val,U,O,bF)}else E=bR;
V.PutImage(W,E,U,O)}else if(N=="n"||N=="BT"||N=="EI"){}else if(N=="ET"){W.font.Tm=[1,0,0,1,0,0];W.font.Tlm=W.font.Tm.slice(0)}else if(N=="y"||N=="v"){var c7=W.ctm.slice(0);
UDOC.M.invert(c7);var w=UDOC.M.multPoint(c7,W.cpos),y=B.pop().val,c9=B.pop().val,bg=B.pop().val,ao=B.pop().val;
if(N=="y")UDOC.G.curveTo(W,ao,bg,c9,y,c9,y);else UDOC.G.curveTo(W,w[0],w[1],ao,bg,c9,y)}else if(N=="B"||N=="B*"){V.Fill(W,N=="B*");
V.Stroke(W);UDOC.G.newPath(W)}else if(N=="cm"||N=="Tm"){var bj=[];for(var P=0;P<6;P++)bj.push(B.pop().val);
bj.reverse();if(N=="cm"){UDOC.M.concat(bj,W.ctm);W.ctm=bj}else{W.font.Tm=bj;W.font.Tlm=bj.slice(0)}}else if(N=="Td"||N=="T*"){var aI=0,aH=0;
if(N=="T*"){aI=0;aH=-W.font.Tl}else{aH=B.pop().val;aI=B.pop().val}var bS=[1,0,0,1,aI,aH];UDOC.M.concat(bS,W.font.Tlm);
W.font.Tm=bS;W.font.Tlm=bS.slice(0)}else if(N=="Tf"){var c1=B.pop().val,b4=B.pop().val;W.font.Tf=b4;
W.font.Tfs=c1}else if(N=="Tj"||N=="TJ"){var cB=B.pop();if(cB.typ=="string")cB=[cB];else cB=cB.val;var a5=W.font.Tf,b4=n["/Font"][a5];
if(b4==null)b4=n["/Font"][a5.replace("_","#5F")];var bv=W.font.Tfs/1e3,aN=function(Q,b1){var bi=[1,0,0,1,b1,0];
UDOC.M.concat(bi,Q.Tm);Q.Tm=bi};for(var P=0;P<cB.length;P++){if(cB[P].typ!="string"){if(P==0)aN(W.font,-bv*cB[P].val);
continue}var bA=FromPDF.getString(cB[P].val,b4);if(cB[P+1]&&cB[P+1].typ!="string"){var a8=cB[P+1].val;
bA[1]+=-a8;if(-900<a8&&a8<-100)bA[0]+=" "}W.font.Tf=bA[2];V.PutText(W,bA[0],bA[1]/1e3);W.font.Tf=a5;
aN(W.font,bv*bA[1])}}else if(N=="Tc")W.font.Tc=B.pop().val;else if(N=="Tw")W.font.Tw=B.pop().val;else if(N=="Tz")W.font.Th=B.pop().val;
else if(N=="TL")W.font.Tl=B.pop().val;else if(N=="Tr")W.font.Tmode=B.pop().val;else if(N=="Ts")W.font.Trise=B.pop().val;
else if(N=="CS"||N=="cs"){var G=B.pop().val;if(N=="CS")W.sspace=G;else W.space=G}else if(N=="SCN"||N=="scn"||N=="SC"||N=="sc"){var br=N=="SCN"||N=="SC",m=br?W.sspace:W.space,G,bI=null,t=n?n["/ColorSpace"]:null;
if(t!=null&&t[m]!=null){if(t[m][1]&&t[m][1]["/Alternate"])G=t[m][1]["/Alternate"];else G=typeof t[m]=="string"?t[m]:t[m][0]}else G=m;
if(G=="/DeviceN"){var ab=t[m],b5=ab[1].length;for(var P=0;P<b5;P++)B.pop();bI=[1,0,0]}else if(G=="/Lab"||G=="/DeviceRGB"||G=="/CalRGB"||G=="/ICCBased"&&t[m][1]["/N"]==3){bI=[B.pop().val,B.pop().val,B.pop().val];
bI.reverse()}else if(G=="/DeviceCMYK"||G=="/ICCBased"&&t[m][1]["/N"]==4){var bK=[B.pop().val,B.pop().val,B.pop().val,B.pop().val];
bK.reverse();bI=UDOC.C.cmykToRgb(bK)}else if(G=="/DeviceGray"||G=="/CalGray"||G=="/ICCBased"&&t[m][1]["/N"]==1){var a7=FromPS.nrm(B.pop().val);
bI=[a7,a7,a7]}else if(G=="/Separation"){bI=FromPS._readSeparation(t[m],B.pop().val)}else if(G=="/Indexed"){var am=FromPDF.getPalette(t[m]),bE=B.pop().val*3;
bI=[am[bE]/255,am[bE+1]/255,am[bE+2]/255]}else if(G=="/Pattern"){var be=n["/Pattern"][B.pop().val],cf=be["/PatternType"];
if(cf==1){console.log("tile pattern");FromPDF._pushForm(e,be,H,!0);return}var aV=be["/Matrix"];if(aV==null)aV=[1,0,0,1,0,0];
bI=FromPS.getShadingFill(be["/Shading"],aV);if(bI==null)bI=[0,0,0]}else{console.log(m,G,t,n);throw"e"}if(br)W.COLR=bI;
else W.colr=bI}else if(N=="sh"){var aU=n["/Shading"][B.pop().val],a1=W.colr,aX=W.pth;W.pth=W.cpth;W.cpth=UDOC.G.rectToPath(l.bb);
W.colr=FromPS.getShadingFill(aU,W.ctm.slice(0));if(W.colr==null)W.colr=[0,0,0];V.Fill(W);W.colr=a1;W.pth=aX}else if(N=="MP"||N=="BMC"||N=="ri"){B.pop()}else if(N=="DP"||N=="BDC"){B.pop();
B.pop()}else if(N=="EMC"||N=="BX"||N=="EX"){}else throw"Unknown operator",N};FromPDF.getJBIG2Glob=function(N){var B=N;
B=B["/DecodeParms"];if(B==null)return null;if(B.length!=null)B=B[0];B=B["/JBIG2Globals"];if(B==null)return null;
return FromPS.GS(B)};FromPDF.getImage=function(N){var B=N["/Width"],D=N["/Height"],e=B*D,_=FromPS.GS(N),l=N["/Filter"],V=N["/ColorSpace"],s=N["/BitsPerComponent"],p=N["/Matte"],n=N.image;
if(n==null){var h=N["/Mask"];if(V&&V[0]=="/Indexed"){var v=FromPDF.getPalette(V),i=new Uint8Array(e*4);
FromPDF.plteImage(_,0,i,v,B,D,s,h);n=i}else if(l==null&&(V==null||V=="/DeviceGray")){var v=[0,0,0,255,255,255],i=new Uint8Array(e*4);
if(N["/Decode"]&&N["/Decode"][0]==1){v.reverse()}if(N["/ImageMask"]==!0)v.reverse();FromPDF.plteImage(_,0,i,s==1?v:null,B,D,s,h);
n=i}else if(l==null&&V&&(V=="/DeviceCMYK"||V[0]=="/ICCBased"&&V[1]&&V[1]["/N"]==4)){var i=new Uint8Array(e*4),g=[0,0,0,0];
for(var H=0;H<e;H++){var U=H*4;g[0]=_[U]*(1/255);g[1]=_[U+1]*(1/255);g[2]=_[U+2]*(1/255);g[3]=_[U+3]*(1/255);
var O=UDOC.C.cmykToRgb(g);i[U]=~~(O[0]*255+.5);i[U+1]=~~(O[1]*255+.5);i[U+2]=~~(O[2]*255+.5);i[U+3]=255}n=i}else if(l==null){var G=Math.round(255/((1<<s)-1)),M=Math.ceil(B*3*s/8),i=new Uint8Array(e*4);
i.fill(255);var G=Math.round(255/((1<<s)-1));for(var E=0;E<D;E++){var F=M*E;for(var Z=0;Z<B;Z++){var U=(E*B+Z)*4,k=3*Z;
i[U]=FromPDF.getBitNum(_,F,k,s)*G;i[U+1]=FromPDF.getBitNum(_,F,k+1,s)*G;i[U+2]=FromPDF.getBitNum(_,F,k+2,s)*G}}n=i}else{n=_}if(p&&p.join("")!="000"){var b=Math.round(p[0]*255),A=Math.round(p[1]*255),c=Math.round(p[2]*255);
for(var H=0;H<n.length;H+=4){n[H]=Math.max(n[H],b);n[H+1]=Math.max(n[H+1],A);n[H+2]=Math.max(n[H+2],c)}}N.image=n}return n};
FromPDF.getPalette=function(N){var B;if(N[3].length!=null){var D=N[3];B=new Uint8Array(256*3);for(var e=0;
e<D.length;e++)B[e]=D.charCodeAt(e)}else B=FromPS.GS(N[3]);if(N[1]=="/DeviceCMYK"||N[1]&&N[1][1]&&N[1][1]["/N"]==4){var _=B,B=new Uint8Array(256*3);
for(var e=0;e<256;e++){var l=e<<2,V=l-e,W=UDOC.C.cmykToRgb([_[l]/255,_[l+1]/255,_[l+2]/255,_[l+3]/255]);
B[V]=W[0]*255;B[V+1]=W[1]*255;B[V+2]=W[2]*255}}return B};FromPDF.plteImage=function(N,B,D,e,_,l,V,s){var p=Math.round(255/((1<<V)-1)),n=Math.ceil(_*V/8);
for(var h=0;h<l;h++){var v=B+n*h;for(var i=0;i<_;i++){var g=FromPDF.getBitNum(N,v,i,V),H=h*_+i<<2;if(e){var U=g*3;
D[H]=e[U];D[H+1]=e[U+1];D[H+2]=e[U+2]}else{var O=g*p;D[H]=O;D[H+1]=O;D[H+2]=O}D[H+3]=255;if(s&&s[0]<=g&&g<=s[1])D[H+3]=0}}};
FromPDF.getBitNum=function(N,B,D,e){var _=0;if(e==8)_=N[B+D];else if(e==4)_=N[B+(D>>1)]>>(1-(D&1)<<2)&15;
else if(e==2)_=N[B+(D>>2)]>>(3-(D&3)<<1)&3;else if(e==1)_=N[B+(D>>3)]>>(7-(D&7)<<0)&1;return _};FromPDF.getString=function(N,B){var D=B["/Subtype"],e="",_=0,l=null,V=B["/ToUnicode"],W=B["/Encoding"],s=B,bY;
if(V!=null&&typeof V!="object")V=null;if(D=="/Type0")s=B["/DescendantFonts"][0];if(V!=null)e=FromPDF.toUnicode(N,V);
else if(W=="/WinAnsiEncoding")e=FromPDF.encFromMap(N,FromPDF._win1252);else if(W=="/MacRomanEncoding")e=FromPDF.encFromMap(N,FromPDF._macRoman);
else if(D=="/Type0"){var p=0,n=s["/CIDSystemInfo"]["/Ordering"];if(n=="Identity")p=0;else if(n=="Japan1")p=31;
else if(n=="GB1")p=31;else if(n=="CNS1")p=31;else if(n=="Korea1")p=31;else{console.log("unknown ordering",n);
p=0}for(var h=0;h<N.length;h+=2){var i=N[h]<<8|N[h+1];e+=String.fromCharCode(i+p)}}else if(W!=null&&W["/Type"]=="/Encoding"){var g=W["/Differences"],H=W["/BaseEncoding"],U=null,e="";
if(H=="/WinAnsiEncoding")U=FromPDF._win1252;if(H=="/MacRomanEncoding")U=FromPDF._macRoman;for(var O=0;
O<N.length;O++){var M=N[O],E=-5,F=!1;if(g)for(var h=0;h<g.length;h++){if(typeof g[h]=="string"){if(M==E){e+=FromPDF.fromCName(g[h].slice(1));
F=!0;break}E++}else E=g[h]}if(!F&&U!=null){var a=U.indexOf(M);if(a!=-1)M=String.fromCharCode(U[a+1]);
e+=String.fromCharCode(M)}else if(!F)e+=String.fromCharCode(M)}}else{e=FromPS.readStr(N)}if(D=="/Type0"){var Z=s["/W"];
if(Z&&Z.length==0)Z=null;if(Z==null){_=e.length*1e3*.4;console.log("approximating word widths")}else for(var O=0;
O<N.length;O+=2){var T=N[O]<<8|N[O+1],k=!1;for(var h=0;h<Z.length;h+=2){var b=Z[h],A=Z[h+1];if(A.length){if(0<=T-b&&T-b<A.length){_+=A[T-b];
k=!0}}else{if(b<=T&&T<=A){_+=Z[h+2];k=!0}h++}}if(!k)_+=Z[1][0]}}else if(D=="/Type1"||D=="/Type3"||D=="/TrueType"){var c=B["/FirstChar"],Z=B["/Widths"];
if(Z)for(var O=0;O<N.length;O++)_+=Z[N[O]-c];else{_=e.length*1e3*.4;console.log("approximating word width")}}else throw"unknown font type";
var S=s["/FontDescriptor"],aZ=["","2","3"];for(var O=0;O<3;O++)if(S&&S["/FontFile"+aZ[O]])bY="/FontFile"+aZ[O];
if(S){if(S.psName)l=S.psName;else if(bY){var P=FromPS.GS(S[bY]);if(bY!=null&&P&&FromPS.B.readUint(P,0)==65536)l=S.psName=FromPDF._psName(P)}}if(l==null&&B["/BaseFont"])l=B["/BaseFont"].slice(1);
if(l==null||l=="")l="DejaVuSans";return[e,_,l]};FromPDF._psName=function(N){var B=FromPS.B.readUshort,D=B(N,4),e=0;
for(var _=0;_<D;_++){var l=FromPS.B.readASCII(N,12+_*16,4),V=FromPS.B.readUint(N,12+_*16+8);if(l=="name"){e=V;
break}}if(e==0)return null;var W=B(N,e+2),p=e+6,n=e+6;for(var _=0;_<W;_++){var h=B(N,n),v=B(N,n+2),i=B(N,n+4),g=B(N,n+6),H=B(N,n+8),U=B(N,n+10),O;
n+=12;var M=p+W*12+U;if(v==1||v==10||v==3||h==3&&v==0){O="";for(var E=1;E<H;E+=2)O+=String.fromCharCode(N[M+E])}else if(v==0||v==2)O=FromPS.B.readASCII(N,M,H);
if(g==6&&O!=null&&O.slice(0,3)!="OTS")return O.replace(/\s/g,"")}return null};FromPDF.encFromMap=function(N,B){var D="";
for(var e=0;e<N.length;e++){var _=N[e],l=B.indexOf(_);if(l!=-1)_=B[l+1];D+=String.fromCharCode(_)}return D};
FromPDF._win1252=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
FromPDF._macRoman=[128,196,129,197,130,199,131,201,132,209,133,214,134,220,135,225,136,224,137,226,138,228,139,227,140,229,141,231,142,233,143,232,144,234,145,235,146,237,147,236,148,238,149,239,150,241,151,243,152,242,153,244,154,246,155,245,156,250,157,249,158,251,159,252,160,8224,161,176,162,162,163,163,164,167,165,8226,166,182,167,223,168,174,169,169,170,8482,171,180,172,168,173,9824,174,198,175,216,176,8734,177,177,178,8804,179,8805,180,165,181,181,182,8706,183,8721,184,8719,185,960,186,8747,187,170,188,186,189,937,190,230,191,248,192,191,193,161,194,172,195,8730,196,402,197,8776,198,8710,199,171,200,187,201,8230,202,160,203,192,204,195,205,213,206,338,207,339,208,8211,209,8212,210,8220,211,8221,212,8216,213,8217,214,247,215,9674,216,255,217,376,218,8260,219,8364,220,8249,221,8250,222,64257,223,64258,224,8225,225,183,226,8218,227,8222,228,8240,229,194,230,202,231,193,232,203,233,200,234,205,235,206,236,207,237,204,238,211,239,212,240,63743,241,210,242,218,243,219,244,217,245,305,246,710,247,732,248,175,249,728,250,729,251,730,252,184,253,733,254,731,255,711];
FromPDF.fromCName=function(N){if(N=="f_f_i")return"ffi";if(N.length==1)return N;if(N.slice(0,3)=="uni")return String.fromCharCode(parseInt(N.slice(3),16));
var B={space:32,exclam:33,quotedbl:34,numbersign:35,dollar:36,percent:37,ampersand:38,quotesingle:39,parenleft:40,parenright:41,asterisk:42,plus:43,comma:44,hyphen:45,period:46,slash:47,zero:48,one:49,two:50,three:51,four:52,five:53,six:54,seven:55,eight:56,nine:57,colon:58,semicolon:59,less:60,equal:61,at:64,bracketleft:91,bracketright:93,underscore:95,braceleft:123,braceright:125,dieresis:168,circlecopyrt:169,copyright:169,registered:174,degree:176,plusminus:177,periodcentered:183,Eacute:201,Adieresis:196,adieresis:228,Udieresis:220,germandbls:223,udieresis:252,Odieresis:214,ntilde:241,odieresis:246,Cacute:262,cacute:263,Ccaron:268,ccaron:269,Dcroat:272,dcroat:273,Ecaron:283,ecaron:283,dotlessi:305,Scaron:352,scaron:353,Tcaron:356,tcaron:357,Zcaron:381,zcaron:382,alpha:945,phi:966,endash:8211,emdash:8212,asteriskmath:8727,quoteright:8217,quotedblbase:8222,ellipsis:8230,quotedblleft:8220,quotedblright:8221,bullet:8226,minus:8706,fi:64257,fl:64258},D=B[N];
if(D==null){if(N.charAt(0)!="g")console.log("unknown character "+N);return N}return String.fromCharCode(D)};
FromPDF.toUnicode=function(N,B){var D=B.cmap,e="",_;if(D==null){var l={buff:FromPS.GS(B),off:0},V=[],W=FromPS._getDictStack({}),s=[{typ:"file",val:l}],p=[],n=FromPS._getEnv([0,0,1,1]),h=!0;
n.pgOpen=!0;while(h)h=FromPS.step(V,W,s,p,n,null,FromPS.operator,!0);D=n.res.CMap.val;B.cmap=D}for(var v in D){D=D[v].val;
break}var i=D.bfrange,g=D.bfchar,U=D.bpc;for(var O=0;O<N.length;O+=U){var M=N[O],E=!1;if(U==2)M=M<<8|N[O+1];
if(!E&&i)for(var F=0;F<i.length;F+=3){var a=i[F],Z=i[F+1],T=i[F+2];if(a<=M&&M<=Z){if(a==Z&&T==0){}else if(T.length==null)M+=T-a;
else M=T[M-a];E=!0;break}}if(!E&&g)for(var F=0;F<g.length;F+=2)if(g[F]==M){M=g[F+1];E=!0;break}if(M>65535)e+=String.fromCharCode(M>>>16);
e+=String.fromCharCode(M)}return e};FromPDF.brokenXrefTrail=function(N,B){function D(i,g){var H=g;while(48<=i[g]&&i[g]<=57)g++;
return FromPS.B.readASCII(i,H,g-H)}var e,_=N.length;for(var l=0;l<_;l++){if(FromPS.isEOL(N[l])){var V=l;
while(FromPS.isWhite(N[V]))V++;var W=D(N,V);if(W!=""){V+=W.length;while(FromPS.isWhite(N[V]))V++;var p=D(N,V);
if(p!=""){V+=p.length;while(FromPS.isWhite(N[V]))V++;if(FromPS.B.readASCII(N,V,3)=="obj"){var n=parseInt(W),h=parseInt(p);
B[n]={off:l+1,gen:h,chr:"n"};l=V}}}else if(N[V]==116&&N[V+1]==114&&FromPS.B.readASCII(N,V,7)=="trailer"){if(e==null)e=FromPDF._readTrailer(N,V+7,B)}else if(N[V]==115&&N[V+1]==116&&FromPS.B.readASCII(N,V,9)=="startxref"){V+=10;
while(FromPS.isWhite(N[V]))V++;var v=parseInt(D(N,V));if(v!=0&&e==null)e=FromPDF.readXrefTrail(N,v,B)}}}return e};
FromPDF._readTrailer=function(N,B,D){var e={buff:N,off:B},_=FromPDF.readObject(e,e,D);if(_["/Prev"])FromPDF.readXrefTrail(N,_["/Prev"],D);
return _};FromPDF.readXrefTrail=function(N,B,D){var e=FromPS.B.readASCII(N,B,4);if(e=="xref"){var _=B+4;
if(N[_]==13)_++;if(N[_]==10)_++;while(!0){if(FromPS.B.readASCII(N,_,7)=="trailer"){_+=7;if(N[_]==13)_++;
if(N[_]==10)_++;break}var l=_;while(!FromPS.isEOL(N[_]))_++;var V=FromPS.B.readASCII(N,l,_-l);V=V.split(" ");
var W=parseInt(V[0]),s=parseInt(V[1]);if(N[_]==13)_++;if(N[_]==10)_++;for(var p=0;p<s;p++){var n=W+p;
if(D[n]==null)D[n]={off:parseInt(FromPS.B.readASCII(N,_,10)),gen:parseInt(FromPS.B.readASCII(N,_+11,5)),chr:FromPS.B.readASCII(N,_+17,1),val:null,opn:!1};
if(N[_+16]!=32)return null;_+=20}}return FromPDF._readTrailer(N,_,D)}else{var _=B,h=_+32;while(_<h&&FromPS.B.readASCII(N,_,2)!="<<")_++;
if(FromPS.B.readASCII(N,_,2)=="<<"){var v={buff:N,off:_},g=FromPDF.readObject(v,v,null),H=0,U=FromPS.GS(g),O=g["/W"],G=g["/Index"],M=[],p=0;
if(G){for(p=0;p<G.length;p+=2){for(var E=0;E<G[p+1];E++)M.push(G[p]+E)}}p=0;while(H<U.length){var F=FromPDF.getInt(U,H,O[0]),_=0,k=0,b="n";
H+=O[0];var Z=FromPDF.getInt(U,H,O[1]);H+=O[1];var T=FromPDF.getInt(U,H,O[2]);H+=O[2];if(F==0){_=Z;k=T;
b="f"}if(F==1){_=Z;k=T;b="n"}if(F==2){_=Z;k=T;b="s"}D[G?M[p]:p]={off:_,gen:k,chr:b,val:null,opn:!1};
p++}if(g["/Prev"])FromPDF.readXrefTrail(N,g["/Prev"],D);if(g["/Encrypt"])return g;var A={buff:N,off:0},c=["/Root","/Info"];
for(p=0;p<c.length;p++){var S=c[p],bY=g[S];if(bY&&bY.typ=="ref")g[S]=FromPDF.getIndirect(bY.ind,bY.gen,A,D)}return g}else return null}};
FromPDF.getInt=function(N,D,e){if(e==0)return 0;if(e==1)return N[D];if(e==2)return N[D]<<8|N[D+1];if(e==3)return N[D]<<16|N[D+1]<<8|N[D+2];
if(e==4)return N[D]<<24|N[D+1]<<16|N[D+2]<<8|N[D+3];while(e>4){e--;D++}return N[D]<<24|N[D+1]<<16|N[D+2]<<8|N[D+3]};
FromPDF.getIndirect=function(N,B,D,e){var _=e[N],W;if(_.chr=="f")return null;if(_.val!=null)return _.val;
if(_.opn)return{typ:"ref",ind:N,gen:B};_.opn=!0;var l=D.off;if(_.chr=="s"){var p=FromPDF.getIndirect(_.off,_.gen,D,e),n={buff:FromPS.GS(p),off:0},h=0,v=0;
while(h!=N){h=FromPS.getFToken(n).val;v=FromPS.getFToken(n).val}n.off=v+p["/First"];W=FromPDF.readObject(n,D,e)}else{D.off=_.off;
var i=FromPS.getFToken(D);if(i.val!="<<"){var g=FromPS.getFToken(D),H=FromPS.getFToken(D)}else D.off-=2;
W=FromPDF.readObject(D,D,e)}_.val=W;D.off=l;_.opn=!1;return W};FromPDF.readObject=function(N,B,D){var e=FromPS.getFToken(N);
if(e.typ=="integer"){var _=N.off,l=FromPS.getFToken(N);if(l&&l.typ=="integer"){FromPS.skipWhite(N);if(N.buff[N.off]==82){N.off++;
if(D&&D[e.val])return FromPDF.getIndirect(e.val,l.val,B,D);else return{typ:"ref",ind:e.val,gen:l.val}}}N.off=_}if(e.val=="<<")return FromPDF.readDict(N,B,D);
if(e.val=="[")return FromPDF.readArra(N,B,D);if(e.typ=="string"){var V="";for(var W=0;W<e.val.length;
W++)V+=String.fromCharCode(e.val[W]);return V}if(e.typ=="name"&&e.val==">>")throw"e";return e.val};FromPDF.readDict=function(N,B,D){var e={};
while(!0){var _=N.off,l=FromPS.getFToken(N);if(l.typ=="name"&&l.val==">>")break;N.off=_;var V=FromPDF.readObject(N,B,D),W=FromPDF.readObject(N,B,D);
e[V]=W}if(e["/Length"]!=null&&e["/CFM"]==null){var s=e["/Length"];if(s.typ&&s.typ=="ref")throw"e";var p=FromPS.getFToken(N);
if(N.buff[N.off]==32)N.off++;if(N.buff[N.off]==13)N.off++;if(N.buff[N.off]==10)N.off++;if(N.off+s>N.buff.length){console.log("too big /Length of a stream",s,N.buff.length-N.off,N.off);
s=N.buff.length-N.off}e.buff=new Uint8Array(N.buff.buffer,N.buff.byteOffset+N.off,s);N.off+=s;FromPS.getFToken(N)}return e};
FromPDF.readArra=function(N,B,D){var e=[];while(!0){var _=N.off,l=FromPS.getFToken(N);if(l.typ=="name"&&l.val=="]")return e;
N.off=_;var V=FromPDF.readObject(N,B,D);e.push(V)}};var FromWMF=function(){var N=0,B=53,D=55,e=258,_=259,l=260,V=261,W=262,s=263,p=264,n=295,h=313,v=322,i=329,g=513,H=521,U=529,O=531,G=532,M=544,E=552,F=561,a=564,Z=804,T=805,k=522,b=523,A=524,c=525,S=526,bY=527,aZ=1040,P=1042,o=1045,a4=1046,w=1048,ci=1049,bJ=1065,ca=1078,bF=1313,I=1336,ct=1352,bR=1051,c3=1055,ax=1564,a3=1565,ag=30,bo=2074,c7=2851,y=1574,c9=298,bg=299,ao=300,bj=301,aI=302,aH=2071,bS=2096,c1=2338,b4=2610,cB=3379,a5=2368,bv=2881,aN=3907,bA=496,a8=247,br=505,m=762,bI=763,t=764,ab=1791,b5=1,bK=2,a7=3,am=4,bE=5,be=6,cf=7,aV=8,aU=9,a1=10,aX=11,bG=12,Q=13,b1=14,bi=15,ay=16,ck=17,ae=18,ac=19,aY=20,c0=21,cj=22,cC=23,aJ=24,aD=25,aq=26,bc=27,aW=28,ar=29,a2=30,b3=31,aw=32,aK=33,aj=34,cb=35,bk=37,bs=38,bP=42,c6=256,b8=258,as=512,a6=513,bW=514,al=2049,bD=3073,ap=4096,cr=4097,az=4098,bM=4110,bp=4111,bu=4112,aR=4115,cl=4116,a9=4117,aA=4118,cy=4119,by=4120,b2=4121,aB=4122,d=4568,x=UDOC.B;
function j(Y,f){Y=new Uint8Array(Y);var u=0,q={fill:!1,strk:!1,bb:[0,0,600,600],lbb:[0,0,600,600],scl:1,fnt:{nam:"Arial",hgh:25,und:!1,orn:0,chrst:0},tclr:[0,0,0],talg:0},X=x.readShort,aE=x.readUshort,cm=x.readUint,C=cm(Y,0),aP=0;
if(C==2596720087){u=6;var bQ=X(Y,u+8);q.scl=120/bQ;for(var J=0;J<4;J++){q.bb[J]=Math.round(X(Y,u)*q.scl);
u+=2}u+=2;u+=6}f.StartPage(q.bb[0],q.bb[1],q.bb[2],q.bb[3]);var L=UDOC.getState(q.bb),bX=aE(Y,u);u+=2;
var bT=aE(Y,u);u+=2;var ce=aE(Y,u);u+=2;var bq=cm(Y,u);u+=4;var bB=aE(Y,u);u+=2;var ai=cm(Y,u);u+=4;
var bB=aE(Y,u);u+=2;var z=[];while(!0){var bw=cm(Y,u)<<1,b7=null;u+=4;var bf=aE(Y,u);u+=2;var K=bf,r=u;
if(!1){}else if(K==N)break;else if(K==y){var bb=aE(Y,u);r+=2;var bn=bb;console.log(K,bn)}else if(K==_||K==W||K==e){}else if(K==bj){var bx=aE(Y,r);
r+=2;var bd=z[bx];if(bd.t=="br"){q.fill=bd.stl!=1;if(bd.stl==0){}else if(bd.stl==1){}else throw bd.stl+" e";
L.colr=bd.clr}else if(bd.t=="pn"){var a0=bd.stl&7;q.strk=a0!=5;if(a0==0||a0==6)L.lwidth=bd.px;else if(a0==5){}else throw a0+" e";
if((bd.stl&4096)!=0)L.ljoin=2;else if((bd.stl&8192)!=0)L.ljoin=0;else L.ljoin=1;L.COLR=bd.clr}else if(bd.t=="fn"){q.fnt=bd;
L.font.Tf=bd.nam;L.font.Tfs=Math.abs(bd.hgh);L.font.Tun=bd.und}else throw"e"}else if(K==bA){var bx=aE(Y,r);
r+=2;z[bx]=null}else if(K==b||K==A){var aa=K==b?0:2;q.lbb[aa+1]=X(Y,r);r+=2;q.lbb[aa]=X(Y,r);r+=2;$(q,L)}else if(K==t){b7={t:"br"};
b7.stl=aE(Y,r);r+=2;b7.clr=[Y[r]/255,Y[r+1]/255,Y[r+2]/255];r+=4;b7.htc=aE(Y,r);r+=2}else if(K==m){b7={t:"pn"};
b7.stl=aE(Y,r);r+=2;b7.px=X(Y,r);r+=2;b7.py=X(Y,r);r+=2;b7.clr=[Y[r]/255,Y[r+1]/255,Y[r+2]/255];r+=4}else if(K==bI){b7={t:"fn",nam:""};
b7.hgh=X(Y,r);r+=2;r+=2*2;b7.orn=X(Y,r)/10;r+=2;var aG=X(Y,r);r+=2;b7.und=Y[r+1];r+=2;b7.stk=Y[r];b7.chrst=Y[u+1];
r+=2;r+=4;while(Y[r]!=0){b7.nam+=String.fromCharCode(Y[r]);r++}if(aG>500)b7.nam+="-Bold"}else if(K==a8){b7={t:"pl"}}else if(K==H)q.tclr=[Y[r]/255,Y[r+1]/255,Y[r+2]/255];
else if(K==aI)q.talg=aE(Y,r);else if(K==G){UDOC.G.moveTo(L,X(Y,r+2),X(Y,r))}else if(K==O){if(L.pth.cmds.length==0){var cg=L.ctm.slice(0);
UDOC.M.invert(cg);var cq=UDOC.M.multPoint(cg,L.cpos);UDOC.G.moveTo(L,cq[0],cq[1])}UDOC.G.lineTo(L,X(Y,r+2),X(Y,r));
var c2=q.fill;q.fill=!1;cA(f,L,q);q.fill=c2}else if(K==I){var cc=aE(Y,r);r+=2;var aT=r;r+=cc*2;for(var J=0;
J<cc;J++){var at=aE(Y,aT+J*2);r=cw(Y,r,at,L,!0)}cA(f,L,q)}else if(K==Z||K==T){var at=aE(Y,r);r+=2;r=cw(Y,r,at,L,K==Z);
var c2=q.fill;q.fill=c2&&K==Z;cA(f,L,q);q.fill=c2}else if(K==bR||K==w){var au=X(Y,r);r+=2;var bL=X(Y,r);
r+=2;var bh=X(Y,r);r+=2;var aS=X(Y,r);r+=2;if(K==bR){UDOC.G.moveTo(L,aS,bh);UDOC.G.lineTo(L,bL,bh);UDOC.G.lineTo(L,bL,au);
UDOC.G.lineTo(L,aS,au)}else{var af=(aS+bL)/2,an=(bh+au)/2;UDOC.G.arc(L,af,an,(au-bh)/2,0,2*Math.PI,!1)}UDOC.G.closePath(L);
var c2=q.fill;q.fill=!0;cA(f,L,q);q.fill=c2}else if(K==aN||K==bv||K==a5){var a$=cm(Y,r),aF,cp;r+=4;if(K==aN){var bO=aE(Y,r);
r+=2}if(K!=a5){cp=X(Y,r);r+=2;aF=X(Y,r);r+=2}var cv=X(Y,r);r+=2;var c8=X(Y,r);r+=2;var ba=X(Y,r);r+=2;
var bC=X(Y,r);r+=2;var cu=X(Y,r);r+=2;var ah=X(Y,r);r+=2;if(K==a5){aF=bC;cp=ba}var aM=R(Y,r);if(aM.length>aF*cp*4)aM=aM.slice(0,aF*cp*4);
var av=L.ctm.slice(0);L.ctm=[1,0,0,1,0,0];UDOC.M.scale(L.ctm,bC,-ba);UDOC.M.translate(L.ctm,ah,cu+ba);
UDOC.M.concat(L.ctm,av);f.PutImage(L,aM,aF,cp);L.ctm=av}else if(K==b4){var aQ=X(Y,r),bz="";r+=2;var aC=X(Y,r);
r+=2;L.font.Tm=[1,0,0,-1,0,0];UDOC.M.rotate(L.font.Tm,q.fnt.orn*Math.PI/180);UDOC.M.translate(L.font.Tm,aC,aQ);
var ak=q.talg;if((ak&6)==6)L.font.Tal=2;else if((ak&7)==0)L.font.Tal=0;else throw ak+" e";if((ak&24)==24){}else if((ak&24)==0)UDOC.M.translate(L.font.Tm,0,L.font.Tfs);
else throw"e";var cd=aE(Y,r);r+=2;var a_=aE(Y,r);r+=2;if(a_&4)r+=8;for(var J=0;J<cd;J++){var bt=Y[r+J];
if(bt>127){J++;bt=bt<<8|Y[r+J]}bz+=String.fromCharCode(bt)}var b9=L.colr;L.colr=q.tclr;f.PutText(L,bz,bz.length*L.font.Tfs*.5);
L.colr=b9}else if(K==a6){}else{console.log(K.toString(16),bw)}if(b7!=null){var aO=0;while(z[aO]!=null)aO++;
z[aO]=b7}u+=bw-6}f.ShowPage();f.Done()}function R(Y,f){var u=x.readShort,q=x.readUshort,X=x.readUint,aE=X(Y,f),cm,C,bQ;
f+=4;if(aE==12)throw"e";else{cm=X(Y,f);f+=4;C=X(Y,f);f+=4;var J=q(Y,f);f+=2;if(J!=1)throw"e";var L=q(Y,f);
f+=2;if(L!=1&&L!=24&&L!=32)throw L+" e";var bX=X(Y,f);f+=4;if(bX!=0)throw"e";var bT=X(Y,f);f+=4;var ce=X(Y,f);
f+=4;var bq=X(Y,f);f+=4;bQ=X(Y,f);f+=4;var bB=X(Y,f);f+=4}var ai=cm*C,z=new Uint8Array(ai*4),aP=Math.floor((cm*J*L+31&~31)/8);
if(L==1)for(var bw=0;bw<C;bw++){var bf=f+bQ*4+(C-1-bw)*aP;for(var K=0;K<cm;K++){var r=bw*cm+K<<2,b7=Y[bf+(K>>>3)]>>>7-(K&7)&1;
z[r]=Y[f+b7*4+2];z[r+1]=Y[f+b7*4+1];z[r+2]=Y[f+b7*4+0];z[r+3]=255}}if(L==24){for(var bw=0;bw<C;bw++)for(var K=0;
K<cm;K++){var r=bw*cm+K<<2,bb=f+(C-1-bw)*aP+K*3;z[r]=Y[bb+2];z[r+1]=Y[bb+1];z[r+2]=Y[bb+0];z[r+3]=255}}if(L==32){for(var bw=0;
bw<C;bw++)for(var K=0;K<cm;K++){var r=bw*cm+K<<2,bb=f+(C-1-bw)*aP+K*4;z[r]=Y[bb+2];z[r+1]=Y[bb+1];z[r+2]=Y[bb+0];
z[r+3]=Y[bb+3]}}return z}function $(Y,f){var u=[1,0,0,1,0,0],q=Y.lbb,X=Y.bb;UDOC.M.translate(u,-q[0],-q[1]);
UDOC.M.scale(u,1/q[2],1/q[3]);UDOC.M.scale(u,X[2]-X[0],X[3]-X[1]);UDOC.M.translate(u,X[0],X[1]);f.ctm=u}function cA(Y,f,u){if(u.fill)Y.Fill(f,!1);
if(u.strk&&f.lwidth!=0)Y.Stroke(f,!1);UDOC.G.newPath(f)}function cw(Y,f,u,q,X){var aE=x.readShort;for(var cm=0;
cm<u;cm++){var C=aE(Y,f);f+=2;var bQ=aE(Y,f);f+=2;if(cm==0)UDOC.G.moveTo(q,C,bQ);else UDOC.G.lineTo(q,C,bQ)}if(X)UDOC.G.closePath(q);
return f}return{Parse:j}}(),FromEMF=function(){var N=1,B=2,D=3,e=4,_=5,l=6,V=7,W=8,s=9,p=10,n=11,h=12,v=13,i=14,g=15,H=16,U=17,O=18,G=19,M=20,E=21,F=22,a=23,Z=24,T=25,k=26,b=27,A=28,c=29,S=30,bY=31,aZ=32,P=33,o=34,a4=35,w=36,ci=37,bJ=38,ca=39,bF=40,I=41,ct=42,bR=43,c3=44,ax=45,a3=46,ag=47,bo=48,c7=49,y=50,c9=51,bg=52,ao=53,bj=54,aI=55,aH=56,bS=57,c1=58,b4=59,cB=60,a5=61,bv=62,aN=63,bA=64,a8=65,br=66,m=67,bI=68,t=70,ab=71,b5=72,bK=73,a7=74,am=75,bE=76,be=77,cf=78,aV=79,aU=80,a1=81,aX=82,bG=83,Q=84,b1=85,bi=86,ay=87,ck=88,ae=89,ac=90,aY=91,c0=92,cj=93,cC=94,aJ=95,aD=96,aq=97,bc=98,aW=99,ar=100,a2=101,b3=102,aw=103,aK=104,aj=105,cb=106,bk=108,bs=109,bP=110,c6=111,b8=112,as=113,a6=114,bW=115,al=116,bD=118,ap=119,cr=120,az=121,bM=122,bp=UDOC.B,bu=null,aR=13369376,cl=15597702,a9=8913094;
function aA(d,x){d=new Uint8Array(d);var j=0,R={fill:!1,strk:!1,bb:[0,0,1,1],wbb:[0,0,1,1],fnt:{nam:"Arial",hgh:25,und:!1,orn:0},tclr:[0,0,0],talg:0},$,cA=[],cw=[],Y=bp.readShort,f=bp.readUshort,u=bp.readInt,q=bp.readUint,X=bp.readFloat,aE=0;
while(!0){var cm=q(d,j),L=null,bX=0;j+=4;var C=cm,bQ=q(d,j);j+=4;var J=j;if(!1){}else if(C==i){break}else if(C==N){R.bb=cy(d,J);
J+=16;x.StartPage(R.bb[0],R.bb[1],R.bb[2],R.bb[3]);$=UDOC.getState(R.bb)}else if(C==P)cw.push(JSON.stringify($),JSON.stringify(R));
else if(C==o){var bT=u(d,J);J+=4;while(bT<-1){cw.pop();cw.pop();bT++}R=JSON.parse(cw.pop());$=JSON.parse(cw.pop())}else if(C==m){$.cpth=JSON.parse(JSON.stringify($.pth))}else if(C==S){var ce=cy(d,J);
J+=16;var bq=$.pth;$.pth={cmds:[],crds:[]};UDOC.G.drawRect($,ce[0],ce[1],ce[2]-ce[0],ce[3]-ce[1]);$.cpth=$.pth;
$.pth=bq}else if([U,G,O,bc,M,am].indexOf(C)!=-1){}else if(C==c1)$.mlimit=q(d,J);else if(C==Z)R.tclr=[d[J]/255,d[J+1]/255,d[J+2]/255];
else if(C==F)R.talg=q(d,J);else if(C==n||C==h){if(R.vbb==null)R.vbb=[];var ai=C==h?0:2;R.vbb[ai]=u(d,J);
J+=4;R.vbb[ai+1]=u(d,J);J+=4;if(C==n)by(R,$)}else if(C==s||C==p){var ai=C==p?0:2;R.wbb[ai]=u(d,J);J+=4;
R.wbb[ai+1]=u(d,J);J+=4;if(C==s)by(R,$)}else if(C==t){var z=q(d,J);J+=4}else if(C==ci){var aP=q(d,J);
J+=4;if(aP==2147483648){R.fill=!0;$.colr=[1,1,1]}else if(aP==2147483653){R.fill=!1}else if(aP==2147483655){R.strk=!0;
R.lwidth=1;$.COLR=[0,0,0]}else if(aP==2147483656){R.strk=!1}else if(aP==2147483661){}else if(aP==2147483662){}else{var bw=cA[aP];
if(bw.t=="b"){R.fill=bw.stl!=1;if(bw.stl==0){}else if(bw.stl==1){}else throw bw.stl+" e";$.colr=bw.clr}else if(bw.t=="p"){R.strk=bw.stl!=5;
$.lwidth=bw.wid;$.COLR=bw.clr}else if(bw.t=="f"){R.fnt=bw;$.font.Tf=bw.nam;$.font.Tfs=Math.abs(bw.hgh);
$.font.Tun=bw.und}else throw"e"}}else if(C==bF){var aP=q(d,J);J+=4;if(cA[aP]!=null)cA[aP]=null;else throw"e"}else if(C==ca){bX=q(d,J);
J+=4;L={t:"b"};L.stl=q(d,J);J+=4;L.clr=[d[J]/255,d[J+1]/255,d[J+2]/255];J+=4;L.htc=q(d,J);J+=4}else if(C==cC){bX=q(d,J);
J+=4;console.log("unsupported pattern brush");L={t:"b"};L.stl=0}else if(C==bJ||C==aJ){bX=q(d,J);J+=4;
L={t:"p"};if(C==aJ){J+=16;L.stl=q(d,J);J+=4;L.wid=q(d,J);J+=4;J+=4}else{L.stl=q(d,J);J+=4;L.wid=q(d,J);
J+=4;J+=4}L.clr=[d[J]/255,d[J+1]/255,d[J+2]/255];J+=4}else if(C==aX){bX=q(d,J);J+=4;L={t:"f",nam:""};
L.hgh=u(d,J);J+=4;J+=4*2;L.orn=u(d,J)/10;J+=4;var bf=q(d,J);J+=4;L.und=d[J+1];L.stk=d[J+2];J+=4*2;while(f(d,J)!=0){L.nam+=String.fromCharCode(f(d,J));
J+=2}if(bf>500)L.nam+="-Bold"}else if(C==Q){J+=16;var K=q(d,J),cq="";J+=4;var r=X(d,J);J+=4;var b7=X(d,J);
J+=4;var bb=u(d,J);J+=4;var bn=u(d,J);J+=4;var bx=$.ctm.slice(0);if(K==1)$.ctm=[1,0,0,1,0,0];$.font.Tm=[1,0,0,-1,0,0];
UDOC.M.rotate($.font.Tm,R.fnt.orn*Math.PI/180);UDOC.M.translate($.font.Tm,bb,bn);var bd=R.talg;if((bd&6)==6)$.font.Tal=2;
else if((bd&7)==0)$.font.Tal=0;else throw bd+" e";if((bd&24)==24){}else if((bd&24)==0)UDOC.M.translate($.font.Tm,0,$.font.Tfs);
else console.log("unknown alignment",bd);var a0=q(d,J);J+=4;var aa=q(d,J);J+=4;var aG=q(d,J);J+=4;J+=16;
var cg=q(d,J);J+=4;aa+=j-8;for(var c2=0;c2<a0;c2++){var cc=f(d,aa+c2*2);cq+=String.fromCharCode(cc)}var aT=$.colr;
$.colr=R.tclr;x.PutText($,cq,cq.length*$.font.Tfs*.5);$.colr=aT;$.ctm=bx}else if(C==b4){UDOC.G.newPath($)}else if(C==cB){}else if(C==a5)UDOC.G.closePath($);
else if(C==b){UDOC.G.moveTo($,u(d,J),u(d,J+4))}else if(C==bj){if($.pth.cmds.length==0){var at=$.ctm.slice(0);
UDOC.M.invert(at);var au=UDOC.M.multPoint(at,$.cpos);UDOC.G.moveTo($,au[0],au[1])}UDOC.G.lineTo($,u(d,J),u(d,J+4))}else if(C==D||C==bi||C==e||C==ay||C==l||C==ae){J+=16;
var bL=C==D||C==bi,bh=C==l||C==ae,aS=q(d,J);J+=4;if(!bh)UDOC.G.newPath($);J=aB(d,J,aS,$,C==bi||C==ay||C==ae?2:4,bL,bh);
if(!bh)b2(x,$,R,bL)}else if(C==aY){J+=16;var bL=!0,bh=!1,af=q(d,J);J+=4;J+=4;var an=J;J+=af*4;if(!bh)UDOC.G.newPath($);
for(var c2=0;c2<af;c2++){var a$=f(d,an+c2*4);J=aB(d,J,a$,$,2,bL,bh)}if(!bh)b2(x,$,R,bL)}else if(C==B||C==b1||C==_||C==ck){J+=16;
var bO=C==b1||C==ck,aF=bO?Y:u,cp=bO?2:4,aS=q(d,J);J+=4;if(!(C==_||C==ck)){UDOC.G.moveTo($,aF(d,J),aF(d,J+cp));
J+=2*cp;aS--}while(aS>0){UDOC.G.curveTo($,aF(d,J),aF(d,J+cp),aF(d,J+2*cp),aF(d,J+3*cp),aF(d,J+4*cp),aF(d,J+5*cp));
J+=6*cp;aS-=3}}else if(C==bR||C==ct){UDOC.G.newPath($);var ce=cy(d,J);if(C==bR){UDOC.G.drawRect($,ce[0],ce[1],ce[2]-ce[0],ce[3]-ce[1])}else{var cv=(ce[0]+ce[2])/2,c8=(ce[1]+ce[3])/2;
UDOC.G.arc($,cv,c8,(ce[2]-ce[0])/2,0,2*Math.PI,!1)}UDOC.G.closePath($);b2(x,$,R,!0)}else if(C==bv)x.Fill($,!1);
else if(C==bA)x.Stroke($);else if(C==aN){x.Fill($,!1);x.Stroke($)}else if(C==a4||C==w){var ba=[];for(var c2=0;
c2<6;c2++)ba.push(X(d,J+c2*4));J+=24;if(C==a4)$.ctm=ba;else{var K=q(d,J);J+=4;if(K==2){var bC=$.ctm;
$.ctm=ba;UDOC.M.concat($.ctm,bC)}else if(K==4)$.ctm=ba;else throw K}}else if(C==E){var cu=q(d,J);J+=4}else if(C==a1){var ce=cy(d,J);
J+=16;var ah=u(d,J);J+=4;var aM=u(d,J);J+=4;var av=u(d,J);J+=4;var aQ=u(d,J);J+=4;var aC=u(d,J);J+=4;
var ak=u(d,J);J+=4;var a_=q(d,J)+j-8;J+=4;var bz=q(d,J);J+=4;var bt=q(d,J)+j-8;J+=4;var b9=q(d,J);J+=4;
var aO=q(d,J);J+=4;if(aO!=0)throw"e";var bl=q(d,J);J+=4;if(bl!=aR&&bl!=cl&&bl!=a9)throw bl.toString(16);
var b$=u(d,J);J+=4;var aL=u(d,J);J+=4;var ch=q(d,a_);a_+=4;if(ch!=40)throw ch;var b_=q(d,a_);a_+=4;var b6=q(d,a_);
a_+=4;if(b_!=aC||b6!=ak)throw"e";var bV=f(d,a_);a_+=2;if(bV!=1)throw"e";var cx=f(d,a_);a_+=2;if(cx!=1&&cx!=4&&cx!=8&&cx!=16&&cx!=24&&cx!=32)throw cx+" e";
var bm=q(d,a_);a_+=4;if(bm!=0)throw bm+" e";var cn=q(d,a_);a_+=4;var bN=q(d,a_);a_+=4;var cs=q(d,a_);
a_+=4;var c4=q(d,a_);a_+=4;var bZ=q(d,a_);a_+=4;if(bZ!=0)throw bZ;var bU=Math.floor((b_*bV*cx+31&~31)/8),c5=new Uint8Array(b_*b6*4);
if(cx==1){for(var c8=0;c8<b6;c8++)for(var cv=0;cv<b_;cv++){var cz=c8*b_+cv<<2,aP=(d[bt+(b6-1-c8)*bU+(cv>>>3)]>>>7-(cv&7)&1)<<2;
c5[cz]=d[a_+aP+2];c5[cz+1]=d[a_+aP+1];c5[cz+2]=d[a_+aP+0];c5[cz+3]=255}}else if(cx==8){for(var c8=0;
c8<b6;c8++)for(var cv=0;cv<b_;cv++){var cz=c8*b_+cv<<2,aP=d[bt+(b6-1-c8)*bU+cv]<<2;c5[cz]=d[a_+aP+2];
c5[cz+1]=d[a_+aP+1];c5[cz+2]=d[a_+aP+0];c5[cz+3]=255}}else if(cx==16){for(var c8=0;c8<b6;c8++)for(var cv=0;
cv<b_;cv++){var cz=c8*b_+cv<<2,ad=bt+(b6-1-c8)*bU+cv*2,b0=d[ad+1]<<8|d[ad];c5[cz]=(b0>>>10&31)*(255/31);
c5[cz+1]=(b0>>>5&31)*(255/31);c5[cz+2]=(b0>>>0&31)*(255/31);c5[cz+3]=255}}else if(cx==24){for(var c8=0;
c8<b6;c8++)for(var cv=0;cv<b_;cv++){var cz=c8*b_+cv<<2,ad=bt+(b6-1-c8)*bU+cv*3;c5[cz]=d[ad+2];c5[cz+1]=d[ad+1];
c5[cz+2]=d[ad+0];c5[cz+3]=255}}else if(cx==32){for(var c8=0;c8<b6;c8++)for(var cv=0;cv<b_;cv++){var cz=c8*b_+cv<<2,ad=bt+(b6-1-c8)*bU+cv*4;
c5[cz]=d[ad+2];c5[cz+1]=d[ad+1];c5[cz+2]=d[ad+0];c5[cz+3]=d[ad+3]}}else console.log("unsupported bit depth",cx,b_,b6);
var bH=$.ctm.slice(0);$.ctm=[1,0,0,1,0,0];UDOC.M.scale($.ctm,b$,-aL);UDOC.M.translate($.ctm,ah,aM+aL);
UDOC.M.concat($.ctm,bH);if(bl==cl)bu=c5;else if(bl==a9)x.PutImage($,c5,b_,b6,bu);else x.PutImage($,c5,b_,b6);
$.ctm=bH}else{console.log("unknown command",C,bQ)}if(L!=null)cA[bX]=L;j+=bQ-8}x.ShowPage();x.Done()}function cy(d,x){var j=[];
for(var R=0;R<4;R++)j[R]=bp.readInt(d,x+R*4);return j}function by(d,x){var j=[1,0,0,1,0,0],R=d.wbb,$=d.bb,cA=d.vbb&&d.vbb.length==4?d.vbb:d.bb;
UDOC.M.translate(j,-R[0],-R[1]);UDOC.M.scale(j,1/R[2],1/R[3]);UDOC.M.scale(j,cA[2],cA[3]);x.ctm=j}function b2(d,x,j,R){if(j.fill&&R)d.Fill(x,!1);
if(j.strk&&x.lwidth!=0)d.Stroke(x)}function aB(d,x,j,R,$,cA,cw){var Y=$==2?bp.readShort:bp.readInt;for(var f=0;
f<j;f++){var u=Y(d,x);x+=$;var q=Y(d,x);x+=$;if(f==0&&!cw)UDOC.G.moveTo(R,u,q);else UDOC.G.lineTo(R,u,q)}if(cA)UDOC.G.closePath(R);
return x}return{Parse:aA}}(),FromDXF=function(){var N=function(){this.bb=[1e9,1e9,-1e9,-1e9]};N.prototype={StartPage:function(){},PutText:function(){},PutImage:function(){},Stroke:function(W){this.checkPath(W.pth.crds)},Fill:function(W){this.checkPath(W.pth.crds)},PutText:function(W,s,p,n){var h=[0,0,p*W.font.Tfs,0,0,-W.font.Tfs,0,W.font.Tfs];
if(n){h[2]=n[0];h[5]=-n[1]}UDOC.M.multArray(W.ctm,h);UDOC.M.multArray(W.font.Tm,h);this.checkPath(h)},checkPath:function(W){var s=this.bb;
for(var p=0;p<W.length;p+=2){var n=W[p],h=W[p+1];s[0]=Math.min(s[0],n);s[1]=Math.min(s[1],h);s[2]=Math.max(s[2],n);
s[3]=Math.max(s[3],h)}},ShowPage:function(){},Done:function(){}};function B(W,s){W=new Uint8Array(W);
var p=0,n=new TextDecoder().decode(W),h=n.split("\n"),H=2e3,U=100;for(var v=0;v<h.length;v++)h[v]=h[v].trim();
while(h[h.length-1]=="")h.pop();var i=new N;D(h,i);var g=i.bb,O=(H-U*2)/(g[2]-g[0]),G=Math.round((g[3]-g[1])*O+U*2),M=[0,0,H,G],E=UDOC.getState(M);
E.lwidth=1/O;E.ctm=[O,0,0,-O,U-g[0]*O,-U+g[1]*O+G];D(h,s,E,M)}function D(W,s,p,n){if(p==null){n=[0,0,1e3,1e3];
p=UDOC.getState(n)}s.StartPage(n[0],n[1],n[2],n[3]);var h={tabs:{LTYPE:{}},blocks:{}};_(W,s,p,h,0,W.length);
s.ShowPage();s.Done()}function e(W,s){if(W.startsWith("%%u")){W=W.slice(3);s.font.Tun=1}W=W.split("\\P").join("\n");
W=W.split("%%d").join("'");W=W.split("{").join("");W=W.split("}").join("");while(!0){var p=W.indexOf("\\U+");
if(p==-1)break;W=W.slice(0,p)+String.fromCharCode(parseInt(W.slice(p+3,p+7),16))+W.slice(p+7)}while(!0){var p=W.indexOf("\\"),n=W.indexOf(";");
if(p==-1||n==-1)break;var h=W.slice(p+1,n);if(h.startsWith("pi"))h=" ".repeat(.5*parseFloat(h.slice(2)));
else h="";W=W.slice(0,p)+h+W.slice(n+1)}return W}function _(W,s,p,n,h,v,i){var g,H,U;while(h<v){var O=parseInt(W[h++]),G=W[h++],M=[10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44,45,46,47,48,49,50,51,52,53,62,70,71,72,73,74,90,370].indexOf(O)!=-1,E=g=="LWPOLYLINE"&&(O==10||O==20||O==30)||g=="LTYPE"&&O==49||g=="SPLINE"&&(O==10||O==20||O==30||O==40)||g=="OLE2FRAME"&&O==310;
if(M)G=parseFloat(G);if(O==999){}else if(G=="SECTION")i=-1;else if(G=="ENDSEC"){}else if(i==-1)i=G;else if(G=="EOF"){}else if(i=="HEADER"){}else if(i=="CLASSES"){}else if(i=="TABLES"||i=="BLOCKS"){if(O==0){g=G;
H={};continue}if(E){if(H[O]==null)H[O]=[];H[O].push(G)}else{H[O]=G}if(W[h]!="0")continue;if(g=="LTYPE"){if(n.tabs[g][H[2]]!=null)throw"e";
n.tabs[g][H[2]]=H}else if(g=="BLOCK"){U=n.blocks[H[2]]=[h]}else if(g=="ENDBLK"){U[1]=h-2;U=null}}else if(i=="ENTITIES"){if(O==0){g=G;
H={}}else{if(E){if(H[O]==null)H[O]=[];H[O].push(G)}else{H[O]=G}}if(W[h]!="0")continue;if(U==null){p.colr=[0,0,0];
p.ca=1;p.COLR=[0,0,0];p.dash=[];if(H[62]!=null&&H[62]!=256){var F={c0:[0,0,0],c1:[1,0,0],c2:[1,1,0],c4:[0,1,1],c5:[0,0,1],c7:[0,0,0],c8:[0,0,0],c242:[.64,0,.16],c250:[0,0,0]}["c"+H[62]];
if(F)p.COLR=F;else{p.COLR=[0,1,0];console.log(g+" "+H[62])}}if(H[6]!=null){var a=n.tabs.LTYPE[H[6]];
if(a[49]!=null){var Z=a[49].slice(0);for(var T=0;T<Z.length;T++)Z[T]=Math.abs(Z[T])*(H[48]?H[48]:1);
p.dash=Z}}if(H[8]=="H")p.dash=[.1,.02];UDOC.G.newPath(p)}var k=-1/3.17;if(g=="LINE"){var b=(H[30]?H[30]:0)*k,A=(H[31]?H[31]:0)*k;
UDOC.G.moveTo(p,H[10]+b,H[20]-b);UDOC.G.lineTo(p,H[11]+A,H[21]-A);s.Stroke(p,!1)}else if(g=="POLYLINE"){U=[H,[]]}else if(g=="VERTEX"){U[1].push(H)}else if(g=="SEQEND"){if(U==null)continue;
var c=U[0],S=U[1],bY=S.length,aZ=c[70]==1?bY+1:bY;UDOC.G.moveTo(p,S[0][10],S[0][20]);for(var T=1;T<aZ;
T++){var P=S[T%bY][10],o=S[T%bY][20],a4=S[T-1][42];if(a4==null)a4=0;if(a4==0)UDOC.G.lineTo(p,P,o);else{var w=S[T-1],ci=w[10],bJ=w[20],ca=P-ci,I=o-bJ,ct=-a4*Math.PI/2,bR=.42,c3=Math.sin(ct),ax=Math.cos(ct),a3=ax*ca-c3*I,ag=c3*ca+ax*I,bo=ax*ca+c3*I,c7=-c3*ca+ax*I;
UDOC.G.curveTo(p,ci+bR*a3,bJ+bR*ag,P-bR*bo,o-bR*c7,P,o)}}s.Stroke(p,!1);U=null}else if(g=="OLE2FRAME"){var y=57,c9=295,bg=H[310].join(""),ao=c9*y,bj=new Uint8Array(bg.length>>>1);
for(var T=0;T<bj.length;T++)bj[T]=parseInt(bg.slice(T*2,T*2+2),16);var aI=new Float64Array(bj.slice(2,2+12*8).buffer),aH=new Uint8Array(ao*4);
new Uint32Array(aH.buffer).fill(4281563135);var bS=p.ctm,c1=[1,0,0,1,0,0],b4=H[11]-H[10],cB=H[21]-H[20];
UDOC.M.scale(c1,b4,cB);UDOC.M.translate(c1,H[10],H[20]);UDOC.M.concat(c1,p.ctm);p.ctm=c1;s.PutImage(p,aH,c9,y);
p.ctm=bS}else if(g=="INSERT"){var a5=n.blocks[H[2]],bv=p.ctm.slice(0),c1=[1,0,0,1,0,0];if(H[50]!=null)UDOC.M.rotate(c1,H[50]*Math.PI/180);
if(H[41]!=null)UDOC.M.scale(c1,H[41],H[42]);UDOC.M.translate(c1,H[10],H[20]);UDOC.M.concat(c1,p.ctm);
p.ctm=c1;_(W,s,p,n,a5[0],a5[1],i);p.ctm=bv}else if(g=="--VIEWPORT"){console.log(H);p.COLR=[1,0,0];UDOC.G.moveTo(p,H[10],H[20]);
UDOC.G.lineTo(p,H[10]+5,H[20]+5);s.Stroke(p,!1)}else if(g=="--DIMENSION"){var aN=H[70]&7;if(aN==0){console.log(H);
p.COLR=[0,.3,.6];var ca=0,I=0;UDOC.G.moveTo(p,H[13]+ca,H[23]+I);UDOC.G.lineTo(p,H[14]+ca,H[24]+I);s.Stroke(p,!1)}}else if(g=="3DFACE"||g=="SOLID"){var b=H[30]*k,A=H[31]*k,bA=H[32]*k,a8=H[33]*k;
UDOC.G.moveTo(p,H[10]+b,H[20]-b);UDOC.G.lineTo(p,H[11]+A,H[21]-A);UDOC.G.lineTo(p,H[12]+bA,H[22]-bA);
UDOC.G.lineTo(p,H[13]+a8,H[23]-a8);UDOC.G.closePath(p);if(g=="3DFACE"){p.colr=[Math.random(),Math.random(),Math.random()];
p.ca=.5}s.Fill(p,!1)}else if(g=="LWPOLYLINE"){for(var T=0;T<H[90];T++){var br=T==0?UDOC.G.moveTo:UDOC.G.lineTo;
br(p,H[10][T],H[20][T])}if(H[70]==1)UDOC.G.closePath(p);s.Stroke(p,!1)}else if(g=="CIRCLE"){UDOC.G.arc(p,H[10],H[20],H[40],0,Math.PI*2);
s.Stroke(p,!1)}else if(g=="ELLIPSE"){var m=p.ctm.slice(0),bI=H[10],t=H[20],ca=H[11],I=H[21],ab=Math.sqrt(ca*ca+I*I),c1=[1,0,0,1,0,0];
UDOC.M.scale(c1,1,H[40]);UDOC.M.rotate(c1,-Math.atan2(I,ca));UDOC.M.translate(c1,bI,t);UDOC.M.concat(c1,p.ctm);
p.ctm=c1;UDOC.G.arc(p,0,0,ab,H[41],H[42]);s.Stroke(p,!1);p.ctm=m}else if(g=="ARC"){UDOC.G.arc(p,H[10],H[20],H[40],H[50]*Math.PI/180,H[51]*Math.PI/180);
s.Stroke(p,!1)}else if(g=="SPLINE"){var b5=H[10],bK=H[20],a7=H[40].slice(0),am=b5.length-1;UDOC.G.moveTo(p,b5[0],bK[0]);
if(H[71]==3&&H[73]==4){UDOC.G.curveTo(p,b5[1],bK[1],b5[2],bK[2],b5[3],bK[3])}else{var bE=-1e6,be=1e6;
for(var T=0;T<a7.length;T++){var cf=a7[T];if(cf<be)be=cf;if(cf>bE)bE=cf}for(var T=0;T<a7.length;T++){a7[T]=(a7[T]-be)/(bE-be)}var bY=b5.length*10;
for(var aV=1;aV<bY;aV++){var aU=aV/bY,a1=l(b5,bK,H[71],a7,aU);UDOC.G.lineTo(p,a1[0],a1[1])}UDOC.G.lineTo(p,b5[b5.length-1],bK[bK.length-1])}if(H[70]&1)UDOC.G.closePath(p);
s.Stroke(p,!1)}else if(g=="--ATTDEF"||g=="ATTRIB"||g=="TEXT"||g=="MTEXT"){p.font.Tun=0;p.font.Tal=0;
p.font.Tm=[1,0,0,1,0,0];if(H[50])UDOC.M.rotate(p.font.Tm,-H[50]*Math.PI/180);UDOC.M.translate(p.font.Tm,H[10],H[20]);
p.font.Tfs=H[40];var bg=H[g=="ATTDEF"?3:1],bG=null;bg=e(bg,p);var aX=H[71]==null?0:(H[71]-1)%3;p.font.Tal=[0,2,1][aX];
if(g=="MTEXT"&&H[41]!=null&&H[41]!=0){var Q=bg.length*p.font.Tfs/H[41];Q=Math.max(Q,bg.split("\n").length);
bG=[H[41],Q*p.font.Tfs*1.5];if(aX==0){}else if(aX==2){UDOC.M.translate(p.font.Tm,-H[41],0)}else if(aX==1){UDOC.M.translate(p.font.Tm,-H[41]/2,0)}else console.log("unknown align",H)}else if(g=="MTEXT"&&H[71]!=null){if(H[71]<=3)UDOC.M.translate(p.font.Tm,0,-p.font.Tfs*.8);
else if(H[71]<=6)UDOC.M.translate(p.font.Tm,0,-p.font.Tfs*.4)}s.PutText(p,bg,bg.length*.5,bG)}else console.log("unknown command",g)}else if(i=="OBJECTS"){}else if(i=="ACDSDATA"){}else{console.log(i,O,G);
throw i}}}function l(W,s,p,n,h){var v=0,i=0;for(var g=0;g<W.length;g++){var H=V(g,p,n,h);v+=W[g]*H;i+=s[g]*H}return[v,i]}function V(W,p,n,h){var v=new Float64Array(p+1),i,g,U=n.Length-1;
if(W==0&&h==n[0]||W==U-p-1&&h==n[U])return 1;if(h<n[W]||h>=n[W+p+1])return 0;for(var O=0;O<=p;O++){if(h>=n[W+O]&&h<n[W+O+1])v[O]=1;
else v[O]=0}for(var G=1;G<=p;G++){if(v[0]==0)i=0;else i=(h-n[W])*v[0]/(n[W+G]-n[W]);for(var O=0;O<p-G+1;
O++){var M=n[W+O+1],F=n[W+O+G+1];if(v[O+1]==0){v[O]=i;i=0}else{g=v[O+1]/(F-M);v[O]=i+(F-h)*g;i=(h-M)*g}}}return v[0]}return{Parse:B}}(),ToPDF=function(){function N(){this._res={"/Font":{},"/XObject":{},"/ExtGState":{},"/Pattern":{}};
this._xr=[null,{"/Type":"/Catalog","/Pages":{typ:"ref",ind:2}},{"/Type":"/Pages","/Kids":[],"/Count":0},this._res];
this._bnds=[];this._cont="";this._gst=B()}function B(){return{colr:"[0,0,0]",COLR:"[0,0,0]",lcap:"0",ljoin:"0",lwidth:"1",mlimit:"10",dash:"[]",doff:"0",bmode:"/Normal",CA:"1",ca:"1"}}N.prototype.StartPage=function(G,M,E,F){this._bnds=[G,M,E,F]};
N.prototype.Stroke=function(G){if(G.CA==0)return;this.setGState(G,!0);this._cont+=" S\n"};N.prototype.Fill=function(G,M){if(G.ca==0)return;
this.setGState(G,!0);this._cont+=" f\n"};function D(G){return""+parseFloat(G.toFixed(2))}function e(G){return""+parseFloat(G.toFixed(3))}function _(G){return Math.sqrt(Math.abs(G[0]*G[3]-G[1]*G[2]))}function l(G){var M=G.map(D).join(" ");
if(M=="1 0 0 1 0 0")return"";return M+" cm "}function V(G,M){if(G.length!=M.length)return!1;for(var E=0;
E<G.length;E++)if(G[E]!=M[E])return!1;return!0}function W(G){var M=[[255,216,255],[0,0,0,12,106,80,32,32],[0,0,0,0,48,0,1,0]],E=["/DCTDecode","/JPXDecode","/JBIG2Decode"];
for(var F=0;F<M.length;F++){var a=M[F],Z=!0;for(var T=0;T<a.length;T++)Z=Z&&G[T]==a[T];if(Z)return E[F]}}N.prototype.setGState=function(G,M){var E=this._gst,F={};
for(var a in G)F[a]=typeof G[a]=="string"?G[a]:JSON.stringify(G[a]);var Z=_(G.ctm),T=G.dash.slice(0);
for(var k=0;k<T.length;k++)T[k]=D(T[k]*Z);var b=this._cont;if(E.lcap!=F.lcap)b+=G.lcap+" J ";if(E.ljoin!=F.ljoin)b+=G.ljoin+" j ";
if(E.lwidth!=F.lwidth)b+=D(G.lwidth*Z)+" w ";if(E.mlimit!=F.mlimit)b+=D(G.mlimit)+" M ";if(E.dash!=F.dash||E.doff!=F.doff)b+="["+T.join(" ")+"] "+G.doff+" d ";
if(E.COLR!=F.COLR)b+=s(G.COLR,!1,this._res);if(E.colr!=F.colr)b+=s(G.colr,!0,this._res);var A=this._res["/ExtGState"];
if(E.bmode!=F.bmode){var c=F.bmode;if(A[c]==null)A[c]={"/Type":"/ExtGState","/BM":G.bmode};b+=c+" gs "}if(E.CA!=F.CA){var c="/Alpha"+Math.round(255*F.CA);
if(A[c]==null)A[c]={"/Type":"/ExtGState","/CA":G.CA};b+=c+" gs "}if(E.ca!=F.ca){var c="/alpha"+Math.round(255*F.ca);
if(A[c]==null)A[c]={"/Type":"/ExtGState","/ca":G.ca};b+=c+" gs "}if(M)b+=p(G.pth);this._cont=b;this._gst=F};
function s(G,M,E){if(G.length!=null)return G.map(e).join(" ")+" "+(M?"rg":"RG")+" \n";else{var F=E["/Pattern"],a=G,Z="/P"+(i(F)+1),T={"/ShadingType":a.typ=="lin"?2:3,"/ColorSpace":"/DeviceRGB","/Extend":[!0,!0],"/Function":n(a.grad),"/Coords":a.crds};
F[Z]={"/Type":"/Pattern","/PatternType":2,"/Matrix":a.mat,"/Shading":T};return"/Pattern "+(M?"cs "+Z+" scn ":"CS "+Z+" SCN ")}}function p(G){var M=0,E="",F=D;
for(var a=0;a<G.cmds.length;a++){var Z=G.cmds[a];if(Z=="M"){for(var T=0;T<2;T++)E+=F(G.crds[M++])+" ";
E+="m "}else if(Z=="L"){for(var T=0;T<2;T++)E+=F(G.crds[M++])+" ";E+="l "}else if(Z=="C"){for(var T=0;
T<6;T++)E+=F(G.crds[M++])+" ";E+="c "}else if(Z=="Z"){E+="h "}else throw Z}return E}function n(G){G=G.slice(0);
if(G[0][0]!=0)G.unshift(JSON.parse(JSON.stringify(G[0])));if(G[G.length-1][0]!=1)G.unshift(JSON.parse(JSON.stringify(G[G.length-1])));
G[0][0]=0;G[G.length-1][0]=1;var M=[],E=[],F=[0,1],a=h;if(G.length==2)return a(G[0][1],G[1][1]);E.push(a(G[0][1],G[1][1]));
for(var Z=1;Z<G.length-1;Z++){M.push(G[Z][0]);E.push(a(G[Z][1],G[Z+1][1]));F.push(0,1)}return{"/FunctionType":3,"/Encode":F,"/Domain":[0,1],"/Bounds":M,"/Functions":E}}function h(G,M){return{"/FunctionType":2,"/C0":G,"/C1":M,"/Domain":[0,1],"/N":1}}N.prototype.PutText=function(G,M,E,F){this.setGState(G,!1);
var a=this.addFont(G.font.Tf,F);this._cont+="q ";this._cont+=l(G.ctm);this._cont+=l(G.font.Tm);this._cont+="BT  "+a+" "+D(G.font.Tfs)+" Tf  0 0 Td  (";
var Z=[];if(F==null){var T=[128,8364,130,8218,131,402,132,8222,133,8230,134,8224,135,8225,136,710,137,8240,138,352,139,8249,140,338,142,381,145,8216,146,8217,147,8220,148,8221,149,8226,150,8211,151,8212,152,732,153,8482,154,353,155,8250,156,339,158,382,159,376];
for(var k=0;k<M.length;k++){var b=M.charCodeAt(k);if(b>255){var A=T.indexOf(b);Z.push(A==-1?32:T[A-1])}else Z.push(b)}}else{for(var k=0;
k<M.length;k++){var b=M.charCodeAt(k);Z.push(b&255)}}Z=FromPS.makeString(Z);for(var k=0;k<Z.length;k++)this._cont+=String.fromCharCode(Z[k]);
this._cont+=") Tj  ET ";this._cont+=" Q\n"};N.prototype.PutImage=function(G,M,E,F,Z){if(M.length==E*F*4&&Z==null){var T=E*F,k=new Uint8Array(T),b=255;
for(var A=0;A<T;A++){k[A]=M[(A<<2)+3];b&=M[(A<<2)+3]}if(b!=255)Z=k}var c=this.addImage(M,E,F,Z);this.setGState(G,!1);
this._cont+="q "+l(G.ctm);this._cont+=c+" Do  Q\n"};N.prototype.ShowPage=function(){H(this._xr,this._cont,this._bnds);
this._cont="";this._gst=B()};N.prototype.Print=function(G){};N.prototype.Done=function(){var G=this._res;
for(var M in G)if(Object.keys(G[M])==0)delete G[M];this.buffer=U(this._xr)};N.prototype.addImage=function(G,M,E,F){var Z;
if(F){var T=F;if(F.length==M*E*4){T=new Uint8Array(M*E);for(var k=0;k<T.length;k++)T[k]=F[(k<<2)+1]}Z=this.addImage(T,M,E,null)}var b=W(G),A=G;
if(G.length==M*E*4){A=new Uint8Array(M*E*3);for(var k=0;k<G.length;k+=4){var c=3*(k>>2);A[c]=G[k+0];
A[c+1]=G[k+1];A[c+2]=G[k+2]}}var S=this._res["/XObject"];for(var bY in S){var aZ=this._xr[S[bY].ind],P=aZ["/SMask"],o=P!=null?1:0,a4=Z!=null?1:0;
if(!V(aZ.stream,A)||o+a4==1)continue;if(o+a4==2&&!V(this._xr[P.ind].stream,T))continue;return bY}var bY="/I"+(i(S)+1);
S[bY]={typ:"ref",ind:this._xr.length};var w={"/Type":"/XObject","/Subtype":"/Image","/BitsPerComponent":8,"/ColorSpace":G.length==M*E||b=="/DCTDecode"&&v(G)&&v(G).comps==1?"/DeviceGray":"/DeviceRGB","/Height":E,"/Width":M,stream:A};
if(b!=null)w["/Filter"]=W(G);if(F){w["/SMask"]={typ:"ref",ind:this._xr.length-1}}this._xr.push(w);return bY};
function v(G){var M=0;while(M<G.length){while(G[M]==255)M++;var E=G[M];M++;if(E==216)continue;if(E==217)break;
if(208<=E&&E<=215)continue;if(E==1)continue;var F=(G[M]<<8|G[M+1])-2;M+=2;if(E==192)return{bpp:G[M],w:G[M+1]<<8|G[M+2],h:G[M+3]<<8|G[M+4],comps:G[M+5]};
M+=F}}function i(G){var M;for(var E in G)M=E;return M==null?0:parseInt(M.slice(2))}function g(G){var M=G.toLowerCase(),E="Helvetica Helvetica-Bold Helvetica-Oblique Helvetica-BoldOblique Times-Roman Times-Bold Times-Italic Times-BoldItalic".split(" "),F=0;
if(M.indexOf("sans")!=-1)F=0;else if(M.indexOf("serif")!=-1)F=4;var a=M.indexOf("bold")!=-1,Z=M.indexOf("italic")!=-1||M.indexOf("oblique")!=-1||M.endsWith("-it");
if(a&&Z)F+=3;else if(Z)F+=2;else if(a)F+=1;return E[F]}N.prototype.addFont=function(G,M){G=g(G);G="/"+G;
var E=this._res["/Font"];for(var F in E)if(E[F]["/BaseFont"]==G)return F;var F="/F"+(i(E)+1),a={"/Type":"/Font","/Subtype":"/Type1","/BaseFont":G,"/Encoding":"/WinAnsiEncoding"};
if(M!=null){var Z="/CIDInit /ProcSet findresource begin \t12 dict begin \tbegincmap \t/CIDSystemInfo \t<<  /Registry (Adobe) \t/Ordering (UCS) \t/Supplement 0 \t>> def \t/CMapName /Adobe-Identity-UCS def \t/CMapType 2 def \t1 begincodespacerange \t<0000> <FFFF> \tendcodespacerange \t1 beginbfchar \t<0001> <200B> \tendbfchar \tendcmap \tCMapName currentdict /CMap defineresource pop \tend \tend",T=new Uint8Array(Z.length);
for(var k=0;k<Z.length;k++)T[k]=Z.charCodeAt(k);a["/Subtype"]="/TrueType";delete a["/Encoding"];a["/FirstChar"]=0;
a["/Widths"]=[];for(var k=0;k<256;k++)a["/Widths"].push(500);a["/LastChar"]=a["/Widths"].length-1;a["/FontDescriptor"]={"/Ascent":905,"/CapHeight":1010,"/Descent":211,"/Flags":4,"/FontBBox":[-627,-376,2e3,1011],"/FontName":G,"/ItalicAngle":0,"/StemV":80,"/Type":"/FontDescriptor","/FontFile2":{stream:new Uint8Array(M)}}}E[F]=a;
return F};function H(G,M,E){var F=G.length;G[2]["/Kids"].push({typ:"ref",ind:F});G[2]["/Count"]++;G.push({"/Type":"/Page","/Parent":{typ:"ref",ind:2},"/Resources":{typ:"ref",ind:3},"/MediaBox":E,"/Contents":{typ:"ref",ind:F+1}});
G.push({stream:M})}function U(G){var M={file:new O,off:0},E=N.write,F=[];E(M,"%PDF-1.1\n");for(var a=1;
a<G.length;a++){F.push(M.off);E(M,a+" 0 obj\n");N.writeDict(M,G[a],0);E(M,"\nendobj\n")}var Z=M.off;
E(M,"xref\n");E(M,"0 "+G.length+"\n");E(M,"0000000000 65535 f \n");for(var a=0;a<F.length;a++){var T=F[a]+"";
while(T.length<10)T="0"+T;E(M,T+" 00000 n \n")}E(M,"trailer\n");N.writeDict(M,{"/Root":{typ:"ref",ind:1},"/Size":G.length},0);
E(M,"\nstartxref\n"+Z+"\n%%EOF\n");return M.file.data.buffer.slice(0,M.off)}N.write=function(G,M){G.file.req(G.off,M.length);
for(var E=0;E<M.length;E++)G.file.data[G.off+E]=M.charCodeAt(E);G.off+=M.length};N._tab="    ";N.spc=function(G){var M="";
for(var E=0;E<G;E++)M+=N._tab;return M};N.writeValue=function(G,M,E){var a=N.write;if(!1){}else if(typeof M=="string")a(G,M);
else if(typeof M=="number")a(G,""+M);else if(typeof M=="boolean")a(G,""+M);else if(M.typ!=null)a(G,M.ind+" 0 R");
else if(M instanceof Array)N.writeArray(G,M,E+1);else if(M instanceof Object)N.writeDict(G,M,E+1);else{console.log(M);
throw"e"}};N.writeDict=function(G,M,E){var F=N.write,a=N.spc,Z=M.stream;if(Z){if(typeof Z=="string"){var T=new Uint8Array(Z.length);
for(var k=0;k<Z.length;k++)T[k]=Z.charCodeAt(k);Z=T}if(M["/Filter"]==null){M["/Filter"]="/FlateDecode";
Z=pako.deflate(Z)}}F(G,"<<\n");for(var b in M){if(b.charAt(0)!="/")continue;F(G,a(E+1)+b+" ");N.writeValue(G,M[b],E);
F(G,"\n")}if(Z)F(G,a(E+1)+"/Length "+Z.length+"\n");F(G,a(E)+">>");if(Z){F(G,a(E)+"\nstream\n");G.file.req(G.off,Z.length);
for(var k=0;k<Z.length;k++)G.file.data[G.off+k]=Z[k];G.off+=Z.length;F(G,a(E)+"\nendstream")}};N.writeArray=function(G,M,E){var F=N.write;
F(G,"[ ");for(var a=0;a<M.length;a++){N.writeValue(G,M[a],E+1);if(a!=M.length-1)F(G," ")}F(G," ]")};
var O=function(){this.size=16;this.data=new Uint8Array(16)};O.prototype.req=function(G,M){if(G+M<=this.size)return;
var E=this.size;while(G+M>this.size)this.size*=2;var F=new Uint8Array(this.size);for(var a=0;a<E;a++)F[a]=this.data[a];
this.data=F};return N}();function ToEMF(){this._file={file:new ToEMF.MFile,off:0};this._lstw=0;this._curx=0;
this._curh=0;this._recs=0;this._lenp=0;this._objs={};this._tabl=1;this._stkf=0;this._tclr=0;this._curt={p:-1,b:-1,t:-1};
this._inited=!1}ToEMF.prototype.StartPage=function(N,B,D,e){this._check();var _=this._file,V=ToEMF.B.writeUint,W=ToEMF.B.writeInt;
this._curh=Math.max(this._curh,e*10);if(!this._inited){this._inited=!0;this._addRec("HEADER",88);ToEMF._writeHeadBox(_,[N,B,D,e]);
_.off+=32;ToEMF.B.writeASCII(_.file,_.off," EMF");_.off+=4;V(_.file,_.off,65536);_.off+=4;this._lenp=_.off;
_.off+=4+4+4;_.off+=4+4+4;W(_.file,_.off,1440);_.off+=4;W(_.file,_.off,900);_.off+=4;W(_.file,_.off,508);
_.off+=4;W(_.file,_.off,318);_.off+=4;this._trsf([.1,0,0,.1,0,0]);this._addRec("SETBKMODE",12);V(_.file,_.off,1);
_.off+=4;this._addRec("SETTEXTALIGN",12);V(_.file,_.off,24);_.off+=4}else{this._curx+=this._lstw;ToEMF._writeHeadBox(_,[0,0,this._curx+D,Math.round(this._curh/10)])}this._lstw=D};
ToEMF.prototype.Stroke=function(N){this._draw(N,1)};ToEMF.prototype.Fill=function(N,B){this._draw(N,2)};
ToEMF.prototype.PutImage=function(N,B,D,e,_){var l=B.length;if((l&3)!=0)l+=4-(l&3);var V=[1,0,0,-1,0,1];
UDOC.M.concat(V,N.ctm);UDOC.M.scale(V,10,10);UDOC.M.scale(V,1,-1);UDOC.M.translate(V,this._curx,this._curh);
this._trsf(V);var s=this._file,p=ToEMF.B.writeUint,n=ToEMF.B.writeInt,h=ToEMF.B.writeUshort,i=8+16+14*4;
this._addRec("STRETCHDIBITS",i+40+l);s.off+=16;n(s.file,s.off,Math.round(0));s.off+=4;n(s.file,s.off,Math.round(0));
s.off+=4;s.off+=8;n(s.file,s.off,D);s.off+=4;n(s.file,s.off,e);s.off+=4;p(s.file,s.off,i);s.off+=4;p(s.file,s.off,40);
s.off+=4;p(s.file,s.off,i+40);s.off+=4;p(s.file,s.off,B.length);s.off+=4;s.off+=4;p(s.file,s.off,13369376);
s.off+=4;n(s.file,s.off,Math.round(1));s.off+=4;n(s.file,s.off,Math.round(1));s.off+=4;n(s.file,s.off,40);
s.off+=4;n(s.file,s.off,D);s.off+=4;n(s.file,s.off,e);s.off+=4;h(s.file,s.off,1);s.off+=2;h(s.file,s.off,32);
s.off+=2;n(s.file,s.off,0);s.off+=4;n(s.file,s.off,B.length);s.off+=4;n(s.file,s.off,3800);s.off+=4;
n(s.file,s.off,3800);s.off+=4;s.off+=8;s.file.req(s.off,B.length);if(B.length==D*e*4){for(var g=0;g<e;
g++)for(var H=0;H<D;H++){var U=g*D+H<<2,O=s.off+((e-1-g)*D+H<<2);s.file.data[O]=B[U+2];s.file.data[O+1]=B[U+1];
s.file.data[O+2]=B[U];s.file.data[O+3]=B[U+3]}}else for(var G=0;G<B.length;G++)s.file.data[s.off+G]=B[G];
s.off+=l;UDOC.M.invert(V);this._trsf(V)};ToEMF.prototype.PutText=function(N,B,D){var e=B.length,g;if((e&1)==1)e++;
this._check();var _=this._file,V=ToEMF.B.writeUint,W=ToEMF.B.writeInt,s=ToEMF.B.writeUshort,p=ToEMF.B.writeFloat,n=ToEMF._color(N.colr);
if(n!=this._tclr){this._addRec("SETTEXTCOLOR",12);V(_.file,_.off,n);_.off+=4;this._tclr=n}this._setTool("f",[N.font.Tf,Math.round(N.font.Tfs*10)]);
var h=10*(N.ctm[4]+this._curx),v=this._curh-10*N.ctm[5],i=Math.abs(N.ctm[1])>.05;if(i){g=N.ctm.slice(0);
g[1]*=-1;g[2]*=-1;g[4]=h;g[5]=v;h=v=0;this._trsf(g)}var H=8+16+12+4*6+16;this._addRec("EXTTEXTOUTW",H+e*2);
_.off+=16;V(_.file,_.off,2);_.off+=4;p(_.file,_.off,31.25);_.off+=4;p(_.file,_.off,31.25);_.off+=4;W(_.file,_.off,Math.round(h));
_.off+=4;W(_.file,_.off,Math.round(v));_.off+=4;V(_.file,_.off,B.length);_.off+=4;V(_.file,_.off,H);
_.off+=4;V(_.file,_.off,0);_.off+=4;_.off+=16;V(_.file,_.off,0);_.off+=4;for(var U=0;U<B.length;U++)s(_.file,_.off+U*2,B.charCodeAt(U));
_.off+=2*e;if(i){UDOC.M.invert(g);this._trsf(g)}};ToEMF.prototype.ShowPage=function(){this._check()};
ToEMF.prototype.Done=function(){this._check();var N=this._file,B=ToEMF.B.writeUint;this._addRec("EOF",20);
B(N.file,N.off,0);N.off+=4;B(N.file,N.off,16);N.off+=4;B(N.file,N.off,20);N.off+=4;B(N.file,this._lenp,N.off);
B(N.file,this._lenp+4,this._recs);B(N.file,this._lenp+8,this._tabl);this.buffer=N.file.data.buffer.slice(0,N.off)};
ToEMF.prototype._check=function(){var N=this._file,B=this._stkf;if(B==0)return;if(B==1)this._addRec("STROKEPATH",24);
if(B==2)this._addRec("FILLPATH",24);if(B==3)this._addRec("STROKEANDFILLPATH",24);N.off+=16;this._stkf=0};
ToEMF.prototype._addRec=function(N,B){var D=this._file,e=ToEMF.B.writeUint;this._recs++;e(D.file,D.off,ToEMF.C["EMR_"+N]);
D.off+=4;e(D.file,D.off,B);D.off+=4};ToEMF.prototype._trsf=function(N){var B=this._file,D=ToEMF.B.writeInt;
this._addRec("MODIFYWORLDTRANSFORM",36);for(var e=0;e<N.length;e++){ToEMF.B.writeFloat(B.file,B.off,N[e]);
B.off+=4}D(B.file,B.off,2);B.off+=4};ToEMF._writeHeadBox=function(N,B){var D=N.off;N.off=8;ToEMF._writeBox(N,B);
var e=1/72*25.4*100;ToEMF._writeBox(N,[0,0,Math.round((B[2]-B[0])*e),Math.round((B[3]-B[1])*e)]);N.off=D};
ToEMF._writeBox=function(N,B){for(var D=0;D<4;D++){ToEMF.B.writeInt(N.file,N.off,B[D]);N.off+=4}};ToEMF.prototype._draw=function(N,B){var D=this._file,e=ToEMF.B.writeUint,_=ToEMF.B.writeInt,V=N.pth,W=JSON.stringify(V);
if(this._cpth!=W)this._check();if(B==1)this._setTool("p",[N.COLR,N.lwidth,N.ljoin]);else this._setTool("b",[N.colr]);
if(this._cpth==W){this._stkf+=B}else{var s={M:["MOVETOEX",1],L:["LINETO",1],C:["POLYBEZIERTO",3],Z:["CLOSEFIGURE",0]},p=0,n=V.cmds.length;
this._addRec("BEGINPATH",8);for(var h=0;h<n;h++){var v=V.cmds[h],i=s[v],O=1;if(i==null)throw v+" e";
var g=i[1]*2,H=i[0],U=8+4*g;while(!0){if(h+O<n&&V.cmds[h+O]==v)O++;else break}var G=v=="C"||v=="L"&&O>1;
if(G){g*=O;if(v=="L")H="POLYLINETO";U=8+20+4*g}this._addRec(H,U);if(G){D.off+=16;e(D.file,D.off,O*i[1]);
D.off+=4;h+=O-1}for(var M=0;M<g;M+=2){_(D.file,D.off,Math.round(10*(V.crds[p]+this._curx)));D.off+=4;
p++;_(D.file,D.off,Math.round(this._curh-10*V.crds[p]));D.off+=4;p++}}this._addRec("ENDPATH",8);this._cpth=W;
this._stkf=B}};ToEMF.prototype._setTool=function(N,B){var D=this._file,e=ToEMF.B.writeUint,_=ToEMF.B.writeInt,V=N+JSON.stringify(B),W=this._objs[V];
if(W==null){W=this._objs[V]=this._tabl;this._tabl++;if(N=="b")this._addRec("CREATEBRUSHINDIRECT",24);
if(N=="p")this._addRec("CREATEPEN",28);if(N=="f")this._addRec("EXTCREATEFONTINDIRECTW",104);e(D.file,D.off,W);
D.off+=4;if(N=="b"||N=="p"){if(N=="p"){e(D.file,D.off,0);D.off+=4;var s=Math.round(B[1]*10);e(D.file,D.off,s);
D.off+=4;e(D.file,D.off,s);D.off+=4}else{e(D.file,D.off,0);D.off+=4}e(D.file,D.off,ToEMF._color(B[0]));
D.off+=4;if(N=="b"){e(D.file,D.off,0);D.off+=4}}if(N=="f"){var p=B[0],n=p.toLowerCase().indexOf("bold")!=-1;
if(p.endsWith("-Bold"))p=p.slice(0,p.length-5);_(D.file,D.off,-B[1]);D.off+=4;D.off+=12;e(D.file,D.off,n?700:400);
D.off+=4;e(D.file,D.off,0);D.off+=4;e(D.file,D.off,262151);D.off+=4;for(var h=0;h<p.length;h++)ToEMF.B.writeUshort(D.file,D.off+h*2,p.charCodeAt(h));
D.off+=64}}if(this._curt[N]!=W){this._addRec("SELECTOBJECT",12);e(D.file,D.off,W);D.off+=4;this._curt[N]=W}};
ToEMF._color=function(N){var B=Math.round(N[0]*255),D=Math.round(N[1]*255),e=Math.round(N[2]*255);return e<<16|D<<8|B<<0};
ToEMF.B=function(){var N=new Uint8Array(4),B=N.buffer,D=new Int16Array(B),e=new Uint16Array(B),_=new Int32Array(B),l=new Uint32Array(B),V=new Float32Array(B);
return{writeShort:function(W,s,p){D[0]=p;W.req(s,2);var n=W.data;n[s]=N[0];n[s+1]=N[1]},writeUshort:function(W,s,p){e[0]=p;
W.req(s,2);var n=W.data;n[s]=N[0];n[s+1]=N[1]},writeInt:function(W,s,p){_[0]=p;W.req(s,4);var n=W.data;
n[s]=N[0];n[s+1]=N[1];n[s+2]=N[2];n[s+3]=N[3]},writeUint:function(W,s,p){l[0]=p;W.req(s,4);var n=W.data;
n[s]=N[0];n[s+1]=N[1];n[s+2]=N[2];n[s+3]=N[3]},writeFloat:function(W,s,p){V[0]=p;W.req(s,4);var n=W.data;
n[s]=N[0];n[s+1]=N[1];n[s+2]=N[2];n[s+3]=N[3]},writeASCII:function(W,s,p){W.req(s,p.length);for(var n=0;
n<p.length;n++)W.data[s+n]=p.charCodeAt(n)}}}();ToEMF.MFile=function(){this.size=16;this.data=new Uint8Array(16)};
ToEMF.MFile.prototype.req=function(N,B){if(N+B<=this.size)return;var D=this.size;while(N+B>this.size)this.size*=2;
var e=new Uint8Array(this.size);for(var _=0;_<D;_++)e[_]=this.data[_];this.data=e};ToEMF.C={EMR_HEADER:1,EMR_POLYBEZIER:2,EMR_POLYGON:3,EMR_POLYLINE:4,EMR_POLYBEZIERTO:5,EMR_POLYLINETO:6,EMR_POLYPOLYLINE:7,EMR_POLYPOLYGON:8,EMR_SETWINDOWEXTEX:9,EMR_SETWINDOWORGEX:10,EMR_SETVIEWPORTEXTEX:11,EMR_SETVIEWPORTORGEX:12,EMR_SETBRUSHORGEX:13,EMR_EOF:14,EMR_SETPIXELV:15,EMR_SETMAPPERFLAGS:16,EMR_SETMAPMODE:17,EMR_SETBKMODE:18,EMR_SETPOLYFILLMODE:19,EMR_SETROP2:20,EMR_SETSTRETCHBLTMODE:21,EMR_SETTEXTALIGN:22,EMR_SETCOLORADJUSTMENT:23,EMR_SETTEXTCOLOR:24,EMR_SETBKCOLOR:25,EMR_OFFSETCLIPRGN:26,EMR_MOVETOEX:27,EMR_SETMETARGN:28,EMR_EXCLUDECLIPRECT:29,EMR_INTERSECTCLIPRECT:30,EMR_SCALEVIEWPORTEXTEX:31,EMR_SCALEWINDOWEXTEX:32,EMR_SAVEDC:33,EMR_RESTOREDC:34,EMR_SETWORLDTRANSFORM:35,EMR_MODIFYWORLDTRANSFORM:36,EMR_SELECTOBJECT:37,EMR_CREATEPEN:38,EMR_CREATEBRUSHINDIRECT:39,EMR_DELETEOBJECT:40,EMR_ANGLEARC:41,EMR_ELLIPSE:42,EMR_RECTANGLE:43,EMR_ROUNDRECT:44,EMR_ARC:45,EMR_CHORD:46,EMR_PIE:47,EMR_SELECTPALETTE:48,EMR_CREATEPALETTE:49,EMR_SETPALETTEENTRIES:50,EMR_RESIZEPALETTE:51,EMR_REALIZEPALETTE:52,EMR_EXTFLOODFILL:53,EMR_LINETO:54,EMR_ARCTO:55,EMR_POLYDRAW:56,EMR_SETARCDIRECTION:57,EMR_SETMITERLIMIT:58,EMR_BEGINPATH:59,EMR_ENDPATH:60,EMR_CLOSEFIGURE:61,EMR_FILLPATH:62,EMR_STROKEANDFILLPATH:63,EMR_STROKEPATH:64,EMR_FLATTENPATH:65,EMR_WIDENPATH:66,EMR_SELECTCLIPPATH:67,EMR_ABORTPATH:68,EMR_COMMENT:70,EMR_FILLRGN:71,EMR_FRAMERGN:72,EMR_INVERTRGN:73,EMR_PAINTRGN:74,EMR_EXTSELECTCLIPRGN:75,EMR_BITBLT:76,EMR_STRETCHBLT:77,EMR_MASKBLT:78,EMR_PLGBLT:79,EMR_SETDIBITSTODEVICE:80,EMR_STRETCHDIBITS:81,EMR_EXTCREATEFONTINDIRECTW:82,EMR_EXTTEXTOUTA:83,EMR_EXTTEXTOUTW:84,EMR_POLYBEZIER16:85,EMR_POLYGON16:86,EMR_POLYLINE16:87,EMR_POLYBEZIERTO16:88,EMR_POLYLINETO16:89,EMR_POLYPOLYLINE16:90,EMR_POLYPOLYGON16:91,EMR_POLYDRAW16:92,EMR_CREATEMONOBRUSH:93,EMR_CREATEDIBPATTERNBRUSHPT:94,EMR_EXTCREATEPEN:95,EMR_POLYTEXTOUTA:96,EMR_POLYTEXTOUTW:97,EMR_SETICMMODE:98,EMR_CREATECOLORSPACE:99,EMR_SETCOLORSPACE:100,EMR_DELETECOLORSPACE:101,EMR_GLSRECORD:102,EMR_GLSBOUNDEDRECORD:103,EMR_PIXELFORMAT:104,EMR_DRAWESCAPE:105,EMR_EXTESCAPE:106,EMR_SMALLTEXTOUT:108,EMR_FORCEUFIMAPPING:109,EMR_NAMEDESCAPE:110,EMR_COLORCORRECTPALETTE:111,EMR_SETICMPROFILEA:112,EMR_SETICMPROFILEW:113,EMR_ALPHABLEND:114,EMR_SETLAYOUT:115,EMR_TRANSPARENTBLT:116,EMR_GRADIENTFILL:118,EMR_SETLINKEDUFIS:119,EMR_SETTEXTJUSTIFICATION:120,EMR_COLORMATCHTOTARGETW:121,EMR_CREATECOLORSPACEW:122};
ToEMF.K=[];(function(){var N,B,D;N=ToEMF.C;B=ToEMF.K;D=4;for(var e in N)B[N[e]]=e.slice(D)}());var ToDXF=function(){var N;
function B(){this.buffer=null}B.prototype.StartPage=function(){if(N==null)N=[0,"SECTION",2,"ENTITIES"]};
B.prototype.ShowPage=function(){};B.prototype.Done=function(){N.push(0,"ENDSEC",0,"EOF","");var D=N.join("\n"),e=new Uint8Array(D.length);
this.buffer=e.buffer;for(var _=0;_<D.length;_++)e[_]=D.charCodeAt(_);N=null};B.prototype.PutImage=function(){};
B.prototype.PutText=function(D,e,_){while(e.endsWith("\n"))e=e.slice(0,e.length-1);N.push(0,"MTEXT");
N.push(40,D.font.Tfs);N.push(10,D.ctm[4],20,D.ctm[5]);N.push(1,e)};B.prototype.Fill=function(D){this.Stroke(D)};
B.prototype.Stroke=function(D){var e=D.pth.cmds,_=D.pth.crds,l=0,V=0,W=0,s=0,p=0;for(var n=0;n<e.length;
n++){var h=e[n];if(h=="M"){W=_[p++];s=_[p++];l=W;V=s}else if(h=="L"||h=="Z"){if(h=="Z"&&W==l&&s==V)continue;
N.push(0,"LINE",10,W,20,s);if(h=="L"){W=_[p++];s=_[p++]}else{W=l;s=V}N.push(11,W,21,s)}else if(h=="C"){N.push(0,"SPLINE");
N.push(210,0,220,0,230,0);N.push(70,8,71,3,72,8,73,4,74,0,42,0,43,0);for(var v=0;v<8;v++)N.push(40,v<4?0:1);
N.push(10,W,20,s);for(var v=0;v<3;v++){W=_[p++];s=_[p++];N.push(10,W,20,s)}}}};return B}()/* pako 1.0.5 nodeca/pako */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pako=t()}}(function(){return function t(e,a,i){function n(s,o){if(!a[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=a[s]={exports:{}};e[s][0].call(d.exports,function(t){var a=e[s][1][t];return n(a?a:t)},d,d.exports,t,e,a,i)}return a[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=l.assign({level:w,method:v,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=o.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==b)throw new Error(d[a]);if(e.header&&o.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===_.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=o.deflateSetDictionary(this.strm,n),a!==b)throw new Error(d[a]);this._dict_set=!0}}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}function s(t,e){return e=e||{},e.gzip=!0,n(t,e)}var o=t("./zlib/deflate"),l=t("./utils/common"),h=t("./utils/strings"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=Object.prototype.toString,u=0,c=4,b=0,g=1,m=2,w=-1,p=0,v=8;i.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:e===!0?c:u,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===_.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new l.Buf8(r),n.next_out=0,n.avail_out=r),a=o.deflate(n,i),a!==g&&a!==b)return this.onEnd(a),this.ended=!0,!1;0!==n.avail_out&&(0!==n.avail_in||i!==c&&i!==m)||("string"===this.options.to?this.onData(h.buf2binstring(l.shrinkBuf(n.output,n.next_out))):this.onData(l.shrinkBuf(n.output,n.next_out)))}while((n.avail_in>0||0===n.avail_out)&&a!==g);return i===c?(a=o.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===b):i!==m||(this.onEnd(b),n.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===b&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=i,a.deflate=n,a.deflateRaw=r,a.gzip=s},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";function i(t){if(!(this instanceof i))return new i(t);this.options=o.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0===(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var a=s.inflateInit2(this.strm,e.windowBits);if(a!==h.Z_OK)throw new Error(d[a]);this.header=new _,s.inflateGetHeader(this.strm,this.header)}function n(t,e){var a=new i(e);if(a.push(t,!0),a.err)throw a.msg||d[a.err];return a.result}function r(t,e){return e=e||{},e.raw=!0,n(t,e)}var s=t("./zlib/inflate"),o=t("./utils/common"),l=t("./utils/strings"),h=t("./zlib/constants"),d=t("./zlib/messages"),f=t("./zlib/zstream"),_=t("./zlib/gzheader"),u=Object.prototype.toString;i.prototype.push=function(t,e){var a,i,n,r,d,f,_=this.strm,c=this.options.chunkSize,b=this.options.dictionary,g=!1;if(this.ended)return!1;i=e===~~e?e:e===!0?h.Z_FINISH:h.Z_NO_FLUSH,"string"==typeof t?_.input=l.binstring2buf(t):"[object ArrayBuffer]"===u.call(t)?_.input=new Uint8Array(t):_.input=t,_.next_in=0,_.avail_in=_.input.length;do{if(0===_.avail_out&&(_.output=new o.Buf8(c),_.next_out=0,_.avail_out=c),a=s.inflate(_,h.Z_NO_FLUSH),a===h.Z_NEED_DICT&&b&&(f="string"==typeof b?l.string2buf(b):"[object ArrayBuffer]"===u.call(b)?new Uint8Array(b):b,a=s.inflateSetDictionary(this.strm,f)),a===h.Z_BUF_ERROR&&g===!0&&(a=h.Z_OK,g=!1),a!==h.Z_STREAM_END&&a!==h.Z_OK)return this.onEnd(a),this.ended=!0,!1;_.next_out&&(0!==_.avail_out&&a!==h.Z_STREAM_END&&(0!==_.avail_in||i!==h.Z_FINISH&&i!==h.Z_SYNC_FLUSH)||("string"===this.options.to?(n=l.utf8border(_.output,_.next_out),r=_.next_out-n,d=l.buf2string(_.output,n),_.next_out=r,_.avail_out=c-r,r&&o.arraySet(_.output,_.output,n,r,0),this.onData(d)):this.onData(o.shrinkBuf(_.output,_.next_out)))),0===_.avail_in&&0===_.avail_out&&(g=!0)}while((_.avail_in>0||0===_.avail_out)&&a!==h.Z_STREAM_END);return a===h.Z_STREAM_END&&(i=h.Z_FINISH),i===h.Z_FINISH?(a=s.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===h.Z_OK):i!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),_.avail_out=0,!0)},i.prototype.onData=function(t){this.chunks.push(t)},i.prototype.onEnd=function(t){t===h.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=i,a.inflate=n,a.inflateRaw=r,a.ungzip=n},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(var i in a)a.hasOwnProperty(i)&&(t[i]=a[i])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)return void t.set(e.subarray(a,a+i),n);for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(i=0,e=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),n=0,e=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";function i(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}var n=t("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var o=new n.Buf8(256),l=0;l<256;l++)o[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;o[254]=o[254]=1,a.string2buf=function(t){var e,a,i,r,s,o=t.length,l=0;for(r=0;r<o;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),l+=a<128?1:a<2048?2:a<65536?3:4;for(e=new n.Buf8(l),s=0,r=0;s<l;r++)a=t.charCodeAt(r),55296===(64512&a)&&r+1<o&&(i=t.charCodeAt(r+1),56320===(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),r++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},a.buf2binstring=function(t){return i(t,t.length)},a.binstring2buf=function(t){for(var e=new n.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,n,r,s,l=e||t.length,h=new Array(2*l);for(n=0,a=0;a<l;)if(r=t[a++],r<128)h[n++]=r;else if(s=o[r],s>4)h[n++]=65533,a+=s-1;else{for(r&=2===s?31:3===s?15:7;s>1&&a<l;)r=r<<6|63&t[a++],s--;s>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return i(h,n)},a.utf8border=function(t,e){var a;for(e=e||t.length,e>t.length&&(e=t.length),a=e-1;a>=0&&128===(192&t[a]);)a--;return a<0?e:0===a?e:a+o[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";function i(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){s=a>2e3?2e3:a,a-=s;do n=n+e[i++]|0,r=r+n|0;while(--s);n%=65521,r%=65521}return n|r<<16|0}e.exports=i},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";function i(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}function n(t,e,a,i){var n=r,s=i+a;t^=-1;for(var o=i;o<s;o++)t=t>>>8^n[255&(t^e[o])];return t^-1}var r=i();e.exports=n},{}],8:[function(t,e,a){"use strict";function i(t,e){return t.msg=D[e],e}function n(t){return(t<<1)-(t>4?9:0)}function r(t){for(var e=t.length;--e>=0;)t[e]=0}function s(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(R.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function o(t,e){C._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,s(t.strm)}function l(t,e){t.pending_buf[t.pending++]=e}function h(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function d(t,e,a,i){var n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,R.arraySet(e,t.input,t.next_in,n,a),1===t.state.wrap?t.adler=N(t.adler,e,n,a):2===t.state.wrap&&(t.adler=O(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)}function f(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+dt,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do if(a=e,h[a+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do;while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=dt-(_-r),r=_-dt,i>s){if(t.match_start=e,s=i,i>=o)break;u=h[r+s-1],c=h[r+s]}}while((e=f[e&d])>l&&0!==--n);return s<=t.lookahead?s:t.lookahead}function _(t){var e,a,i,n,r,s=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-ft)){R.arraySet(t.window,t.window,s,s,0),t.match_start-=s,t.strstart-=s,t.block_start-=s,a=t.hash_size,e=a;do i=t.head[--e],t.head[e]=i>=s?i-s:0;while(--a);a=s,e=a;do i=t.prev[--e],t.prev[e]=i>=s?i-s:0;while(--a);n+=s}if(0===t.strm.avail_in)break;if(a=d(t.strm,t.window,t.strstart+t.lookahead,n),t.lookahead+=a,t.lookahead+t.insert>=ht)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+ht-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<ht)););}while(t.lookahead<ft&&0!==t.strm.avail_in)}function u(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_(t),0===t.lookahead&&e===I)return vt;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,o(t,!1),0===t.strm.avail_out))return vt;if(t.strstart-t.block_start>=t.w_size-ft&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.strstart>t.block_start&&(o(t,!1),0===t.strm.avail_out)?vt:vt}function c(t,e){for(var a,i;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a)),t.match_length>=ht)if(i=C._tr_tally(t,t.strstart-t.match_start,t.match_length-ht),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=ht){t.match_length--;do t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart;while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function b(t,e){for(var a,i,n;;){if(t.lookahead<ft){if(_(t),t.lookahead<ft&&e===I)return vt;if(0===t.lookahead)break}if(a=0,t.lookahead>=ht&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=ht-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=f(t,a),t.match_length<=5&&(t.strategy===q||t.match_length===ht&&t.strstart-t.match_start>4096)&&(t.match_length=ht-1)),t.prev_length>=ht&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-ht,i=C._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-ht),t.lookahead-=t.prev_length-1,t.prev_length-=2;do++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+ht-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart);while(0!==--t.prev_length);if(t.match_available=0,t.match_length=ht-1,t.strstart++,i&&(o(t,!1),0===t.strm.avail_out))return vt}else if(t.match_available){if(i=C._tr_tally(t,0,t.window[t.strstart-1]),i&&o(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return vt}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=C._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<ht-1?t.strstart:ht-1,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function g(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=dt){if(_(t),t.lookahead<=dt&&e===I)return vt;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=ht&&t.strstart>0&&(n=t.strstart-1,i=s[n],i===s[++n]&&i===s[++n]&&i===s[++n])){r=t.strstart+dt;do;while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=dt-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=ht?(a=C._tr_tally(t,1,t.match_length-ht),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function m(t,e){for(var a;;){if(0===t.lookahead&&(_(t),0===t.lookahead)){if(e===I)return vt;break}if(t.match_length=0,a=C._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(o(t,!1),0===t.strm.avail_out))return vt}return t.insert=0,e===F?(o(t,!0),0===t.strm.avail_out?yt:xt):t.last_lit&&(o(t,!1),0===t.strm.avail_out)?vt:kt}function w(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function p(t){t.window_size=2*t.w_size,r(t.head),t.max_lazy_match=Z[t.level].max_lazy,t.good_match=Z[t.level].good_length,t.nice_match=Z[t.level].nice_length,t.max_chain_length=Z[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=ht-1,t.match_available=0,t.ins_h=0}function v(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=V,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new R.Buf16(2*ot),this.dyn_dtree=new R.Buf16(2*(2*rt+1)),this.bl_tree=new R.Buf16(2*(2*st+1)),r(this.dyn_ltree),r(this.dyn_dtree),r(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new R.Buf16(lt+1),this.heap=new R.Buf16(2*nt+1),r(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new R.Buf16(2*nt+1),r(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function k(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=Q,e=t.state,e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?ut:wt,t.adler=2===e.wrap?0:1,e.last_flush=I,C._tr_init(e),H):i(t,K)}function y(t){var e=k(t);return e===H&&p(t.state),e}function x(t,e){return t&&t.state?2!==t.state.wrap?K:(t.state.gzhead=e,H):K}function z(t,e,a,n,r,s){if(!t)return K;var o=1;if(e===Y&&(e=6),n<0?(o=0,n=-n):n>15&&(o=2,n-=16),r<1||r>$||a!==V||n<8||n>15||e<0||e>9||s<0||s>W)return i(t,K);8===n&&(n=9);var l=new v;return t.state=l,l.strm=t,l.wrap=o,l.gzhead=null,l.w_bits=n,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=r+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ht-1)/ht),l.window=new R.Buf8(2*l.w_size),l.head=new R.Buf16(l.hash_size),l.prev=new R.Buf16(l.w_size),l.lit_bufsize=1<<r+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new R.Buf8(l.pending_buf_size),l.d_buf=1*l.lit_bufsize,l.l_buf=3*l.lit_bufsize,l.level=e,l.strategy=s,l.method=a,y(t)}function B(t,e){return z(t,e,V,tt,et,J)}function S(t,e){var a,o,d,f;if(!t||!t.state||e>L||e<0)return t?i(t,K):K;if(o=t.state,!t.output||!t.input&&0!==t.avail_in||o.status===pt&&e!==F)return i(t,0===t.avail_out?P:K);if(o.strm=t,a=o.last_flush,o.last_flush=e,o.status===ut)if(2===o.wrap)t.adler=0,l(o,31),l(o,139),l(o,8),o.gzhead?(l(o,(o.gzhead.text?1:0)+(o.gzhead.hcrc?2:0)+(o.gzhead.extra?4:0)+(o.gzhead.name?8:0)+(o.gzhead.comment?16:0)),l(o,255&o.gzhead.time),l(o,o.gzhead.time>>8&255),l(o,o.gzhead.time>>16&255),l(o,o.gzhead.time>>24&255),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,255&o.gzhead.os),o.gzhead.extra&&o.gzhead.extra.length&&(l(o,255&o.gzhead.extra.length),l(o,o.gzhead.extra.length>>8&255)),o.gzhead.hcrc&&(t.adler=O(t.adler,o.pending_buf,o.pending,0)),o.gzindex=0,o.status=ct):(l(o,0),l(o,0),l(o,0),l(o,0),l(o,0),l(o,9===o.level?2:o.strategy>=G||o.level<2?4:0),l(o,zt),o.status=wt);else{var _=V+(o.w_bits-8<<4)<<8,u=-1;u=o.strategy>=G||o.level<2?0:o.level<6?1:6===o.level?2:3,_|=u<<6,0!==o.strstart&&(_|=_t),_+=31-_%31,o.status=wt,h(o,_),0!==o.strstart&&(h(o,t.adler>>>16),h(o,65535&t.adler)),t.adler=1}if(o.status===ct)if(o.gzhead.extra){for(d=o.pending;o.gzindex<(65535&o.gzhead.extra.length)&&(o.pending!==o.pending_buf_size||(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending!==o.pending_buf_size));)l(o,255&o.gzhead.extra[o.gzindex]),o.gzindex++;o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),o.gzindex===o.gzhead.extra.length&&(o.gzindex=0,o.status=bt)}else o.status=bt;if(o.status===bt)if(o.gzhead.name){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.name.length?255&o.gzhead.name.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.gzindex=0,o.status=gt)}else o.status=gt;if(o.status===gt)if(o.gzhead.comment){d=o.pending;do{if(o.pending===o.pending_buf_size&&(o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),s(t),d=o.pending,o.pending===o.pending_buf_size)){f=1;break}f=o.gzindex<o.gzhead.comment.length?255&o.gzhead.comment.charCodeAt(o.gzindex++):0,l(o,f)}while(0!==f);o.gzhead.hcrc&&o.pending>d&&(t.adler=O(t.adler,o.pending_buf,o.pending-d,d)),0===f&&(o.status=mt)}else o.status=mt;if(o.status===mt&&(o.gzhead.hcrc?(o.pending+2>o.pending_buf_size&&s(t),o.pending+2<=o.pending_buf_size&&(l(o,255&t.adler),l(o,t.adler>>8&255),t.adler=0,o.status=wt)):o.status=wt),0!==o.pending){if(s(t),0===t.avail_out)return o.last_flush=-1,H}else if(0===t.avail_in&&n(e)<=n(a)&&e!==F)return i(t,P);if(o.status===pt&&0!==t.avail_in)return i(t,P);if(0!==t.avail_in||0!==o.lookahead||e!==I&&o.status!==pt){var c=o.strategy===G?m(o,e):o.strategy===X?g(o,e):Z[o.level].func(o,e);if(c!==yt&&c!==xt||(o.status=pt),c===vt||c===yt)return 0===t.avail_out&&(o.last_flush=-1),H;if(c===kt&&(e===U?C._tr_align(o):e!==L&&(C._tr_stored_block(o,0,0,!1),e===T&&(r(o.head),0===o.lookahead&&(o.strstart=0,o.block_start=0,o.insert=0))),s(t),0===t.avail_out))return o.last_flush=-1,H}return e!==F?H:o.wrap<=0?j:(2===o.wrap?(l(o,255&t.adler),l(o,t.adler>>8&255),l(o,t.adler>>16&255),l(o,t.adler>>24&255),l(o,255&t.total_in),l(o,t.total_in>>8&255),l(o,t.total_in>>16&255),l(o,t.total_in>>24&255)):(h(o,t.adler>>>16),h(o,65535&t.adler)),s(t),o.wrap>0&&(o.wrap=-o.wrap),0!==o.pending?H:j)}function E(t){var e;return t&&t.state?(e=t.state.status,e!==ut&&e!==ct&&e!==bt&&e!==gt&&e!==mt&&e!==wt&&e!==pt?i(t,K):(t.state=null,e===wt?i(t,M):H)):K}function A(t,e){var a,i,n,s,o,l,h,d,f=e.length;if(!t||!t.state)return K;if(a=t.state,s=a.wrap,2===s||1===s&&a.status!==ut||a.lookahead)return K;for(1===s&&(t.adler=N(t.adler,e,f,0)),a.wrap=0,f>=a.w_size&&(0===s&&(r(a.head),a.strstart=0,a.block_start=0,a.insert=0),d=new R.Buf8(a.w_size),R.arraySet(d,e,f-a.w_size,a.w_size,0),e=d,f=a.w_size),o=t.avail_in,l=t.next_in,h=t.input,t.avail_in=f,t.next_in=0,t.input=e,_(a);a.lookahead>=ht;){i=a.strstart,n=a.lookahead-(ht-1);do a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+ht-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++;while(--n);a.strstart=i,a.lookahead=ht-1,_(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=ht-1,a.match_available=0,t.next_in=l,t.input=h,t.avail_in=o,a.wrap=s,H}var Z,R=t("../utils/common"),C=t("./trees"),N=t("./adler32"),O=t("./crc32"),D=t("./messages"),I=0,U=1,T=3,F=4,L=5,H=0,j=1,K=-2,M=-3,P=-5,Y=-1,q=1,G=2,X=3,W=4,J=0,Q=2,V=8,$=9,tt=15,et=8,at=29,it=256,nt=it+1+at,rt=30,st=19,ot=2*nt+1,lt=15,ht=3,dt=258,ft=dt+ht+1,_t=32,ut=42,ct=69,bt=73,gt=91,mt=103,wt=113,pt=666,vt=1,kt=2,yt=3,xt=4,zt=3;Z=[new w(0,0,0,0,u),new w(4,4,8,4,c),new w(4,5,16,8,c),new w(4,6,32,32,c),new w(4,4,16,16,b),new w(8,16,32,32,b),new w(8,16,128,128,b),new w(8,32,128,256,b),new w(32,128,258,1024,b),new w(32,258,258,4096,b)],a.deflateInit=B,a.deflateInit2=z,a.deflateReset=y,a.deflateResetKeep=k,a.deflateSetHeader=x,a.deflate=S,a.deflateEnd=E,a.deflateSetDictionary=A,a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";function i(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}e.exports=i},{}],10:[function(t,e,a){"use strict";var i=30,n=12;e.exports=function(t,e){var a,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S,E,A;a=t.state,r=t.next_in,E=t.input,s=r+(t.avail_in-5),o=t.next_out,A=t.output,l=o-(e-t.avail_out),h=o+(t.avail_out-257),d=a.dmax,f=a.wsize,_=a.whave,u=a.wnext,c=a.window,b=a.hold,g=a.bits,m=a.lencode,w=a.distcode,p=(1<<a.lenbits)-1,v=(1<<a.distbits)-1;t:do{g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=m[b&p];e:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,0===y)A[o++]=65535&k;else{if(!(16&y)){if(0===(64&y)){k=m[(65535&k)+(b&(1<<y)-1)];continue e}if(32&y){a.mode=n;break t}t.msg="invalid literal/length code",a.mode=i;break t}x=65535&k,y&=15,y&&(g<y&&(b+=E[r++]<<g,g+=8),x+=b&(1<<y)-1,b>>>=y,g-=y),g<15&&(b+=E[r++]<<g,g+=8,b+=E[r++]<<g,g+=8),k=w[b&v];a:for(;;){if(y=k>>>24,b>>>=y,g-=y,y=k>>>16&255,!(16&y)){if(0===(64&y)){k=w[(65535&k)+(b&(1<<y)-1)];continue a}t.msg="invalid distance code",a.mode=i;break t}if(z=65535&k,y&=15,g<y&&(b+=E[r++]<<g,g+=8,g<y&&(b+=E[r++]<<g,g+=8)),z+=b&(1<<y)-1,z>d){t.msg="invalid distance too far back",a.mode=i;break t}if(b>>>=y,g-=y,y=o-l,z>y){if(y=z-y,y>_&&a.sane){t.msg="invalid distance too far back",a.mode=i;break t}if(B=0,S=c,0===u){if(B+=f-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}else if(u<y){if(B+=f+u-y,y-=u,y<x){x-=y;do A[o++]=c[B++];while(--y);if(B=0,u<x){y=u,x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}}}else if(B+=u-y,y<x){x-=y;do A[o++]=c[B++];while(--y);B=o-z,S=A}for(;x>2;)A[o++]=S[B++],A[o++]=S[B++],A[o++]=S[B++],x-=3;x&&(A[o++]=S[B++],x>1&&(A[o++]=S[B++]))}else{B=o-z;do A[o++]=A[B++],A[o++]=A[B++],A[o++]=A[B++],x-=3;while(x>2);x&&(A[o++]=A[B++],x>1&&(A[o++]=A[B++]))}break}}break}}while(r<s&&o<h);x=g>>3,r-=x,g-=x<<3,b&=(1<<g)-1,t.next_in=r,t.next_out=o,t.avail_in=r<s?5+(s-r):5-(r-s),t.avail_out=o<h?257+(h-o):257-(o-h),a.hold=b,a.bits=g}},{}],11:[function(t,e,a){"use strict";function i(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function n(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new w.Buf16(320),this.work=new w.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=T,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new w.Buf32(bt),e.distcode=e.distdyn=new w.Buf32(gt),e.sane=1,e.back=-1,Z):N}function s(t){var e;return t&&t.state?(e=t.state,e.wsize=0,e.whave=0,e.wnext=0,r(t)):N}function o(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=(e>>4)+1,e<48&&(e&=15)),e&&(e<8||e>15)?N:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,s(t))):N}function l(t,e){var a,i;return t?(i=new n,t.state=i,i.window=null,a=o(t,e),a!==Z&&(t.state=null),a):N}function h(t){return l(t,wt)}function d(t){if(pt){var e;for(g=new w.Buf32(512),m=new w.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(y(z,t.lens,0,288,g,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;y(B,t.lens,0,32,m,0,t.work,{bits:5}),pt=!1}t.lencode=g,t.lenbits=9,t.distcode=m,t.distbits=5}function f(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new w.Buf8(r.wsize)),i>=r.wsize?(w.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(n=r.wsize-r.wnext,n>i&&(n=i),w.arraySet(r.window,e,a-i,n,r.wnext),i-=n,i?(w.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}function _(t,e){var a,n,r,s,o,l,h,_,u,c,b,g,m,bt,gt,mt,wt,pt,vt,kt,yt,xt,zt,Bt,St=0,Et=new w.Buf8(4),At=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return N;a=t.state,a.mode===X&&(a.mode=W),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,c=l,b=h,xt=Z;t:for(;;)switch(a.mode){case T:if(0===a.wrap){a.mode=W;break}for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(2&a.wrap&&35615===_){a.check=0,Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0),_=0,u=0,a.mode=F;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&_)<<8)+(_>>8))%31){t.msg="incorrect header check",a.mode=_t;break}if((15&_)!==U){t.msg="unknown compression method",a.mode=_t;break}if(_>>>=4,u-=4,yt=(15&_)+8,0===a.wbits)a.wbits=yt;else if(yt>a.wbits){t.msg="invalid window size",a.mode=_t;break}a.dmax=1<<yt,t.adler=a.check=1,a.mode=512&_?q:X,_=0,u=0;break;case F:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.flags=_,(255&a.flags)!==U){t.msg="unknown compression method",a.mode=_t;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=_t;break}a.head&&(a.head.text=_>>8&1),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=L;case L:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.time=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,Et[2]=_>>>16&255,Et[3]=_>>>24&255,a.check=v(a.check,Et,4,0)),_=0,u=0,a.mode=H;case H:for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.head&&(a.head.xflags=255&_,a.head.os=_>>8),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0,a.mode=j;case j:if(1024&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length=_,a.head&&(a.head.extra_len=_),512&a.flags&&(Et[0]=255&_,Et[1]=_>>>8&255,a.check=v(a.check,Et,2,0)),_=0,u=0}else a.head&&(a.head.extra=null);a.mode=K;case K:if(1024&a.flags&&(g=a.length,g>l&&(g=l),g&&(a.head&&(yt=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),w.arraySet(a.head.extra,n,s,g,yt)),512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,a.length-=g),a.length))break t;a.length=0,a.mode=M;case M:if(2048&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.name+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=P;case P:if(4096&a.flags){if(0===l)break t;g=0;do yt=n[s+g++],a.head&&yt&&a.length<65536&&(a.head.comment+=String.fromCharCode(yt));while(yt&&g<l);if(512&a.flags&&(a.check=v(a.check,n,g,s)),l-=g,s+=g,yt)break t}else a.head&&(a.head.comment=null);a.mode=Y;case Y:if(512&a.flags){for(;u<16;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(65535&a.check)){t.msg="header crc mismatch",a.mode=_t;break}_=0,u=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=X;break;case q:for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}t.adler=a.check=i(_),_=0,u=0,a.mode=G;case G:if(0===a.havedict)return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,C;t.adler=a.check=1,a.mode=X;case X:if(e===E||e===A)break t;case W:if(a.last){_>>>=7&u,u-=7&u,a.mode=ht;break}for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}switch(a.last=1&_,_>>>=1,u-=1,3&_){case 0:a.mode=J;break;case 1:if(d(a),a.mode=at,e===A){_>>>=2,u-=2;break t}break;case 2:a.mode=$;break;case 3:t.msg="invalid block type",a.mode=_t}_>>>=2,u-=2;break;case J:for(_>>>=7&u,u-=7&u;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if((65535&_)!==(_>>>16^65535)){t.msg="invalid stored block lengths",a.mode=_t;break}if(a.length=65535&_,_=0,u=0,a.mode=Q,e===A)break t;case Q:a.mode=V;case V:if(g=a.length){if(g>l&&(g=l),g>h&&(g=h),0===g)break t;w.arraySet(r,n,s,g,o),l-=g,s+=g,h-=g,o+=g,a.length-=g;break}a.mode=X;break;case $:
for(;u<14;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(a.nlen=(31&_)+257,_>>>=5,u-=5,a.ndist=(31&_)+1,_>>>=5,u-=5,a.ncode=(15&_)+4,_>>>=4,u-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=_t;break}a.have=0,a.mode=tt;case tt:for(;a.have<a.ncode;){for(;u<3;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.lens[At[a.have++]]=7&_,_>>>=3,u-=3}for(;a.have<19;)a.lens[At[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,zt={bits:a.lenbits},xt=y(x,a.lens,0,19,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid code lengths set",a.mode=_t;break}a.have=0,a.mode=et;case et:for(;a.have<a.nlen+a.ndist;){for(;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(wt<16)_>>>=gt,u-=gt,a.lens[a.have++]=wt;else{if(16===wt){for(Bt=gt+2;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_>>>=gt,u-=gt,0===a.have){t.msg="invalid bit length repeat",a.mode=_t;break}yt=a.lens[a.have-1],g=3+(3&_),_>>>=2,u-=2}else if(17===wt){for(Bt=gt+3;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=3+(7&_),_>>>=3,u-=3}else{for(Bt=gt+7;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=gt,u-=gt,yt=0,g=11+(127&_),_>>>=7,u-=7}if(a.have+g>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=_t;break}for(;g--;)a.lens[a.have++]=yt}}if(a.mode===_t)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=_t;break}if(a.lenbits=9,zt={bits:a.lenbits},xt=y(z,a.lens,0,a.nlen,a.lencode,0,a.work,zt),a.lenbits=zt.bits,xt){t.msg="invalid literal/lengths set",a.mode=_t;break}if(a.distbits=6,a.distcode=a.distdyn,zt={bits:a.distbits},xt=y(B,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,zt),a.distbits=zt.bits,xt){t.msg="invalid distances set",a.mode=_t;break}if(a.mode=at,e===A)break t;case at:a.mode=it;case it:if(l>=6&&h>=258){t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,k(t,b),o=t.next_out,r=t.output,h=t.avail_out,s=t.next_in,n=t.input,l=t.avail_in,_=a.hold,u=a.bits,a.mode===X&&(a.back=-1);break}for(a.back=0;St=a.lencode[_&(1<<a.lenbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(mt&&0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.lencode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,a.length=wt,0===mt){a.mode=lt;break}if(32&mt){a.back=-1,a.mode=X;break}if(64&mt){t.msg="invalid literal/length code",a.mode=_t;break}a.extra=15&mt,a.mode=nt;case nt:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.length+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=rt;case rt:for(;St=a.distcode[_&(1<<a.distbits)-1],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(0===(240&mt)){for(pt=gt,vt=mt,kt=wt;St=a.distcode[kt+((_&(1<<pt+vt)-1)>>pt)],gt=St>>>24,mt=St>>>16&255,wt=65535&St,!(pt+gt<=u);){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}_>>>=pt,u-=pt,a.back+=pt}if(_>>>=gt,u-=gt,a.back+=gt,64&mt){t.msg="invalid distance code",a.mode=_t;break}a.offset=wt,a.extra=15&mt,a.mode=st;case st:if(a.extra){for(Bt=a.extra;u<Bt;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}a.offset+=_&(1<<a.extra)-1,_>>>=a.extra,u-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=_t;break}a.mode=ot;case ot:if(0===h)break t;if(g=b-h,a.offset>g){if(g=a.offset-g,g>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=_t;break}g>a.wnext?(g-=a.wnext,m=a.wsize-g):m=a.wnext-g,g>a.length&&(g=a.length),bt=a.window}else bt=r,m=o-a.offset,g=a.length;g>h&&(g=h),h-=g,a.length-=g;do r[o++]=bt[m++];while(--g);0===a.length&&(a.mode=it);break;case lt:if(0===h)break t;r[o++]=a.length,h--,a.mode=it;break;case ht:if(a.wrap){for(;u<32;){if(0===l)break t;l--,_|=n[s++]<<u,u+=8}if(b-=h,t.total_out+=b,a.total+=b,b&&(t.adler=a.check=a.flags?v(a.check,r,b,o-b):p(a.check,r,b,o-b)),b=h,(a.flags?_:i(_))!==a.check){t.msg="incorrect data check",a.mode=_t;break}_=0,u=0}a.mode=dt;case dt:if(a.wrap&&a.flags){for(;u<32;){if(0===l)break t;l--,_+=n[s++]<<u,u+=8}if(_!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=_t;break}_=0,u=0}a.mode=ft;case ft:xt=R;break t;case _t:xt=O;break t;case ut:return D;case ct:default:return N}return t.next_out=o,t.avail_out=h,t.next_in=s,t.avail_in=l,a.hold=_,a.bits=u,(a.wsize||b!==t.avail_out&&a.mode<_t&&(a.mode<ht||e!==S))&&f(t,t.output,t.next_out,b-t.avail_out)?(a.mode=ut,D):(c-=t.avail_in,b-=t.avail_out,t.total_in+=c,t.total_out+=b,a.total+=b,a.wrap&&b&&(t.adler=a.check=a.flags?v(a.check,r,b,t.next_out-b):p(a.check,r,b,t.next_out-b)),t.data_type=a.bits+(a.last?64:0)+(a.mode===X?128:0)+(a.mode===at||a.mode===Q?256:0),(0===c&&0===b||e===S)&&xt===Z&&(xt=I),xt)}function u(t){if(!t||!t.state)return N;var e=t.state;return e.window&&(e.window=null),t.state=null,Z}function c(t,e){var a;return t&&t.state?(a=t.state,0===(2&a.wrap)?N:(a.head=e,e.done=!1,Z)):N}function b(t,e){var a,i,n,r=e.length;return t&&t.state?(a=t.state,0!==a.wrap&&a.mode!==G?N:a.mode===G&&(i=1,i=p(i,e,r,0),i!==a.check)?O:(n=f(t,e,r,r))?(a.mode=ut,D):(a.havedict=1,Z)):N}var g,m,w=t("../utils/common"),p=t("./adler32"),v=t("./crc32"),k=t("./inffast"),y=t("./inftrees"),x=0,z=1,B=2,S=4,E=5,A=6,Z=0,R=1,C=2,N=-2,O=-3,D=-4,I=-5,U=8,T=1,F=2,L=3,H=4,j=5,K=6,M=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,tt=18,et=19,at=20,it=21,nt=22,rt=23,st=24,ot=25,lt=26,ht=27,dt=28,ft=29,_t=30,ut=31,ct=32,bt=852,gt=592,mt=15,wt=mt,pt=!0;a.inflateReset=s,a.inflateReset2=o,a.inflateResetKeep=r,a.inflateInit=h,a.inflateInit2=l,a.inflate=_,a.inflateEnd=u,a.inflateGetHeader=c,a.inflateSetDictionary=b,a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var i=t("../utils/common"),n=15,r=852,s=592,o=0,l=1,h=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],f=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],u=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,c,b,g,m,w){var p,v,k,y,x,z,B,S,E,A=w.bits,Z=0,R=0,C=0,N=0,O=0,D=0,I=0,U=0,T=0,F=0,L=null,H=0,j=new i.Buf16(n+1),K=new i.Buf16(n+1),M=null,P=0;for(Z=0;Z<=n;Z++)j[Z]=0;for(R=0;R<c;R++)j[e[a+R]]++;for(O=A,N=n;N>=1&&0===j[N];N--);if(O>N&&(O=N),0===N)return b[g++]=20971520,b[g++]=20971520,w.bits=1,0;for(C=1;C<N&&0===j[C];C++);for(O<C&&(O=C),U=1,Z=1;Z<=n;Z++)if(U<<=1,U-=j[Z],U<0)return-1;if(U>0&&(t===o||1!==N))return-1;for(K[1]=0,Z=1;Z<n;Z++)K[Z+1]=K[Z]+j[Z];for(R=0;R<c;R++)0!==e[a+R]&&(m[K[e[a+R]]++]=R);if(t===o?(L=M=m,z=19):t===l?(L=d,H-=257,M=f,P-=257,z=256):(L=_,M=u,z=-1),F=0,R=0,Z=C,x=g,D=O,I=0,k=-1,T=1<<O,y=T-1,t===l&&T>r||t===h&&T>s)return 1;for(;;){B=Z-I,m[R]<z?(S=0,E=m[R]):m[R]>z?(S=M[P+m[R]],E=L[H+m[R]]):(S=96,E=0),p=1<<Z-I,v=1<<D,C=v;do v-=p,b[x+(F>>I)+v]=B<<24|S<<16|E|0;while(0!==v);for(p=1<<Z-1;F&p;)p>>=1;if(0!==p?(F&=p-1,F+=p):F=0,R++,0===--j[Z]){if(Z===N)break;Z=e[a+m[R]]}if(Z>O&&(F&y)!==k){for(0===I&&(I=O),x+=C,D=Z-I,U=1<<D;D+I<N&&(U-=j[D+I],!(U<=0));)D++,U<<=1;if(T+=1<<D,t===l&&T>r||t===h&&T>s)return 1;k=F&y,b[k]=O<<24|D<<16|x-g|0}}return 0!==F&&(b[x+F]=Z-I<<24|64<<16|0),w.bits=O,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";function i(t){for(var e=t.length;--e>=0;)t[e]=0}function n(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function s(t){return t<256?lt[t]:lt[256+(t>>>7)]}function o(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function l(t,e,a){t.bi_valid>W-a?(t.bi_buf|=e<<t.bi_valid&65535,o(t,t.bi_buf),t.bi_buf=e>>W-t.bi_valid,t.bi_valid+=a-W):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function h(t,e,a){l(t,a[2*e],a[2*e+1])}function d(t,e){var a=0;do a|=1&t,t>>>=1,a<<=1;while(--e>0);return a>>>1}function f(t){16===t.bi_valid?(o(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}function _(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=X;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<G;a++)i=t.heap[a],r=l[2*l[2*i+1]+1]+1,r>c&&(r=c,b++),l[2*i+1]=r,i>h||(t.bl_count[r]++,s=0,i>=u&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(b>0);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)n=t.heap[--a],n>h||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}function u(t,e,a){var i,n,r=new Array(X+1),s=0;for(i=1;i<=X;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=d(r[o]++,o))}}function c(){var t,e,a,i,r,s=new Array(X+1);for(a=0,i=0;i<K-1;i++)for(dt[i]=a,t=0;t<1<<et[i];t++)ht[a++]=i;for(ht[a-1]=i,r=0,i=0;i<16;i++)for(ft[i]=r,t=0;t<1<<at[i];t++)lt[r++]=i;for(r>>=7;i<Y;i++)for(ft[i]=r<<7,t=0;t<1<<at[i]-7;t++)lt[256+r++]=i;for(e=0;e<=X;e++)s[e]=0;for(t=0;t<=143;)st[2*t+1]=8,t++,s[8]++;for(;t<=255;)st[2*t+1]=9,t++,s[9]++;for(;t<=279;)st[2*t+1]=7,t++,s[7]++;for(;t<=287;)st[2*t+1]=8,t++,s[8]++;for(u(st,P+1,s),t=0;t<Y;t++)ot[2*t+1]=5,ot[2*t]=d(t,5);_t=new n(st,et,M+1,P,X),ut=new n(ot,at,0,Y,X),ct=new n(new Array(0),it,0,q,J)}function b(t){var e;for(e=0;e<P;e++)t.dyn_ltree[2*e]=0;for(e=0;e<Y;e++)t.dyn_dtree[2*e]=0;for(e=0;e<q;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*Q]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function g(t){t.bi_valid>8?o(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function m(t,e,a,i){g(t),i&&(o(t,a),o(t,~a)),N.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}function w(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function p(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&w(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!w(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function v(t,e,a){var i,n,r,o,d=0;if(0!==t.last_lit)do i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],n=t.pending_buf[t.l_buf+d],d++,0===i?h(t,n,e):(r=ht[n],h(t,r+M+1,e),o=et[r],0!==o&&(n-=dt[r],l(t,n,o)),i--,r=s(i),h(t,r,a),o=at[r],0!==o&&(i-=ft[r],l(t,i,o)));while(d<t.last_lit);h(t,Q,e)}function k(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=G,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)n=t.heap[++t.heap_len]=h<2?++h:0,r[2*n]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;a>=1;a--)p(t,r,a);n=l;do a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],p(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,p(t,r,1);while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],_(t,e),u(r,h,t.bl_count)}function y(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*V]++):o<=10?t.bl_tree[2*$]++:t.bl_tree[2*tt]++,o=0,r=n,0===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function x(t,e,a){var i,n,r=-1,s=e[1],o=0,d=7,f=4;for(0===s&&(d=138,f=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<d&&n===s)){if(o<f){do h(t,n,t.bl_tree);while(0!==--o)}else 0!==n?(n!==r&&(h(t,n,t.bl_tree),o--),h(t,V,t.bl_tree),l(t,o-3,2)):o<=10?(h(t,$,t.bl_tree),l(t,o-3,3)):(h(t,tt,t.bl_tree),l(t,o-11,7));o=0,r=n,0===s?(d=138,f=3):n===s?(d=6,f=3):(d=7,f=4)}}function z(t){var e;for(y(t,t.dyn_ltree,t.l_desc.max_code),y(t,t.dyn_dtree,t.d_desc.max_code),k(t,t.bl_desc),e=q-1;e>=3&&0===t.bl_tree[2*nt[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}function B(t,e,a,i){var n;for(l(t,e-257,5),l(t,a-1,5),l(t,i-4,4),n=0;n<i;n++)l(t,t.bl_tree[2*nt[n]+1],3);x(t,t.dyn_ltree,e-1),x(t,t.dyn_dtree,a-1)}function S(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return D;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return I;for(e=32;e<M;e++)if(0!==t.dyn_ltree[2*e])return I;return D}function E(t){bt||(c(),bt=!0),t.l_desc=new r(t.dyn_ltree,_t),t.d_desc=new r(t.dyn_dtree,ut),t.bl_desc=new r(t.bl_tree,ct),t.bi_buf=0,t.bi_valid=0,b(t)}function A(t,e,a,i){l(t,(T<<1)+(i?1:0),3),m(t,e,a,!0)}function Z(t){l(t,F<<1,3),h(t,Q,st),f(t)}function R(t,e,a,i){var n,r,s=0;t.level>0?(t.strm.data_type===U&&(t.strm.data_type=S(t)),k(t,t.l_desc),k(t,t.d_desc),s=z(t),n=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=n&&(n=r)):n=r=a+5,a+4<=n&&e!==-1?A(t,e,a,i):t.strategy===O||r===n?(l(t,(F<<1)+(i?1:0),3),v(t,st,ot)):(l(t,(L<<1)+(i?1:0),3),B(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),v(t,t.dyn_ltree,t.dyn_dtree)),b(t),i&&g(t)}function C(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(ht[a]+M+1)]++,t.dyn_dtree[2*s(e)]++),t.last_lit===t.lit_bufsize-1}var N=t("../utils/common"),O=4,D=0,I=1,U=2,T=0,F=1,L=2,H=3,j=258,K=29,M=256,P=M+1+K,Y=30,q=19,G=2*P+1,X=15,W=16,J=7,Q=256,V=16,$=17,tt=18,et=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],at=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],it=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],nt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],rt=512,st=new Array(2*(P+2));i(st);var ot=new Array(2*Y);i(ot);var lt=new Array(rt);i(lt);var ht=new Array(j-H+1);i(ht);var dt=new Array(K);i(dt);var ft=new Array(Y);i(ft);var _t,ut,ct,bt=!1;a._tr_init=E,a._tr_stored_block=A,a._tr_flush_block=R,a._tr_tally=C,a._tr_align=Z},{"../utils/common":3}],15:[function(t,e,a){"use strict";function i(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}e.exports=i},{}],"/":[function(t,e,a){"use strict";var i=t("./lib/utils/common").assign,n=t("./lib/deflate"),r=t("./lib/inflate"),s=t("./lib/zlib/constants"),o={};i(o,n,r,s),e.exports=o},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});
/**
 * @license
 * Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PDFJS;

(function(PDFJS) {
    "use strict";
	
var JpegError = (function JpegErrorClosure() {
  function JpegError(msg) {
    this.message = 'JPEG error: ' + msg;
  }

  JpegError.prototype = new Error();
  JpegError.prototype.name = 'JpegError';
  JpegError.constructor = JpegError;

  return JpegError;
})();
	
	var JpegImage = (function JpegImageClosure() {
  // prettier-ignore
  var dctZigZag = new Uint8Array([
     0,
     1,  8,
    16,  9,  2,
     3, 10, 17, 24,
    32, 25, 18, 11, 4,
     5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13,  6,
     7, 14, 21, 28, 35, 42, 49, 56,
    57, 50, 43, 36, 29, 22, 15,
    23, 30, 37, 44, 51, 58,
    59, 52, 45, 38, 31,
    39, 46, 53, 60,
    61, 54, 47,
    55, 62,
    63
  ]);

  var dctCos1 = 4017; // cos(pi/16)
  var dctSin1 = 799; // sin(pi/16)
  var dctCos3 = 3406; // cos(3*pi/16)
  var dctSin3 = 2276; // sin(3*pi/16)
  var dctCos6 = 1567; // cos(6*pi/16)
  var dctSin6 = 3784; // sin(6*pi/16)
  var dctSqrt2 = 5793; // sqrt(2)
  var dctSqrt1d2 = 2896; // sqrt(2) / 2

  // eslint-disable-next-line no-shadow
  function JpegImage({ decodeTransform = null, colorTransform = -1 } = {}) {
    this._decodeTransform = decodeTransform;
    this._colorTransform = colorTransform;
  }

  function buildHuffmanTable(codeLengths, values) {
    var k = 0,
      code = [],
      i,
      j,
      length = 16;
    while (length > 0 && !codeLengths[length - 1]) {
      length--;
    }
    code.push({ children: [], index: 0 });
    var p = code[0],
      q;
    for (i = 0; i < length; i++) {
      for (j = 0; j < codeLengths[i]; j++) {
        p = code.pop();
        p.children[p.index] = values[k];
        while (p.index > 0) {
          p = code.pop();
        }
        p.index++;
        code.push(p);
        while (code.length <= i) {
          code.push((q = { children: [], index: 0 }));
          p.children[p.index] = q.children;
          p = q;
        }
        k++;
      }
      if (i + 1 < length) {
        // p here points to last code
        code.push((q = { children: [], index: 0 }));
        p.children[p.index] = q.children;
        p = q;
      }
    }
    return code[0].children;
  }

  function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
  }

  function decodeScan(
    data,
    offset,
    frame,
    components,
    resetInterval,
    spectralStart,
    spectralEnd,
    successivePrev,
    successive,
    parseDNLMarker = false
  ) {
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;

    const startOffset = offset;
    let bitsData = 0,
      bitsCount = 0;

    function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return (bitsData >> bitsCount) & 1;
      }
      bitsData = data[offset++];
      if (bitsData === 0xff) {
        var nextByte = data[offset++];
        if (nextByte) {
          if (nextByte === /* DNL = */ 0xdc && parseDNLMarker) {
            offset += 2; // Skip marker length.

            const scanLines = readUint16(data, offset);
            offset += 2;
            if (scanLines > 0 && scanLines !== frame.scanLines) {
              throw new DNLMarkerError(
                "Found DNL marker (0xFFDC) while parsing scan data",
                scanLines
              );
            }
          } else if (nextByte === /* EOI = */ 0xd9) {
            if (parseDNLMarker) {
              // NOTE: only 8-bit JPEG images are supported in this decoder.
              const maybeScanLines = blockRow * 8;
              // Heuristic to attempt to handle corrupt JPEG images with too
              // large `scanLines` parameter, by falling back to the currently
              // parsed number of scanLines when it's at least one order of
              // magnitude smaller than expected (fixes issue10880.pdf).
              if (maybeScanLines > 0 && maybeScanLines < frame.scanLines / 10) {
                throw new DNLMarkerError(
                  "Found EOI marker (0xFFD9) while parsing scan data, " +
                    "possibly caused by incorrect `scanLines` parameter",
                  maybeScanLines
                );
              }
            }
            throw new EOIMarkerError(
              "Found EOI marker (0xFFD9) while parsing scan data"
            );
          }
          throw new JpegError(
            `unexpected marker ${((bitsData << 8) | nextByte).toString(16)}`
          );
        }
        // unstuff 0
      }
      bitsCount = 7;
      return bitsData >>> 7;
    }

    function decodeHuffman(tree) {
      var node = tree;
      while (true) {
        node = node[readBit()];
        switch (typeof node) {
          case "number":
            return node;
          case "object":
            continue;
        }
        throw new JpegError("invalid huffman sequence");
      }
    }

    function receive(length) {
      var n = 0;
      while (length > 0) {
        n = (n << 1) | readBit();
        length--;
      }
      return n;
    }

    function receiveAndExtend(length) {
      if (length === 1) {
        return readBit() === 1 ? 1 : -1;
      }
      var n = receive(length);
      if (n >= 1 << (length - 1)) {
        return n;
      }
      return n + (-1 << length) + 1;
    }

    function decodeBaseline(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t);
      component.blockData[blockOffset] = component.pred += diff;
      var k = 1;
      while (k < 64) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] = receiveAndExtend(s);
        k++;
      }
    }

    function decodeDCFirst(component, blockOffset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
      component.blockData[blockOffset] = component.pred += diff;
    }

    function decodeDCSuccessive(component, blockOffset) {
      component.blockData[blockOffset] |= readBit() << successive;
    }

    var eobrun = 0;
    function decodeACFirst(component, blockOffset) {
      if (eobrun > 0) {
        eobrun--;
        return;
      }
      var k = spectralStart,
        e = spectralEnd;
      while (k <= e) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
          r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            eobrun = receive(r) + (1 << r) - 1;
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[blockOffset + z] =
          receiveAndExtend(s) * (1 << successive);
        k++;
      }
    }

    var successiveACState = 0,
      successiveACNextValue;
    function decodeACSuccessive(component, blockOffset) {
      var k = spectralStart;
      var e = spectralEnd;
      var r = 0;
      var s;
      var rs;
      while (k <= e) {
        const offsetZ = blockOffset + dctZigZag[k];
        const sign = component.blockData[offsetZ] < 0 ? -1 : 1;
        switch (successiveACState) {
          case 0: // initial state
            rs = decodeHuffman(component.huffmanTableAC);
            s = rs & 15;
            r = rs >> 4;
            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r);
                successiveACState = 4;
              } else {
                r = 16;
                successiveACState = 1;
              }
            } else {
              if (s !== 1) {
                throw new JpegError("invalid ACn encoding");
              }
              successiveACNextValue = receiveAndExtend(s);
              successiveACState = r ? 2 : 3;
            }
            continue;
          case 1: // skipping r zero items
          case 2:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              r--;
              if (r === 0) {
                successiveACState = successiveACState === 2 ? 3 : 0;
              }
            }
            break;
          case 3: // set value for a zero item
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              component.blockData[offsetZ] =
                successiveACNextValue << successive;
              successiveACState = 0;
            }
            break;
          case 4: // eob
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            }
            break;
        }
        k++;
      }
      if (successiveACState === 4) {
        eobrun--;
        if (eobrun === 0) {
          successiveACState = 0;
        }
      }
    }

    let blockRow = 0;
    function decodeMcu(component, decode, mcu, row, col) {
      var mcuRow = (mcu / mcusPerLine) | 0;
      var mcuCol = mcu % mcusPerLine;
      blockRow = mcuRow * component.v + row;
      var blockCol = mcuCol * component.h + col;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    function decodeBlock(component, decode, mcu) {
      blockRow = (mcu / component.blocksPerLine) | 0;
      var blockCol = mcu % component.blocksPerLine;
      const blockOffset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, blockOffset);
    }

    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;
    if (progressive) {
      if (spectralStart === 0) {
        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
      } else {
        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
      }
    } else {
      decodeFn = decodeBaseline;
    }

    var mcu = 0,
      fileMarker;
    var mcuExpected;
    if (componentsLength === 1) {
      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    } else {
      mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }

    var h, v;
    while (mcu <= mcuExpected) {
      // reset interval stuff
      var mcuToRead = resetInterval
        ? Math.min(mcuExpected - mcu, resetInterval)
        : mcuExpected;

      // The `mcuToRead === 0` case should only occur when all of the expected
      // MCU data has been already parsed, i.e. when `mcu === mcuExpected`, but
      // some corrupt JPEG images contain more data than intended and we thus
      // want to skip over any extra RSTx markers below (fixes issue11794.pdf).
      if (mcuToRead > 0) {
        for (i = 0; i < componentsLength; i++) {
          components[i].pred = 0;
        }
        eobrun = 0;

        if (componentsLength === 1) {
          component = components[0];
          for (n = 0; n < mcuToRead; n++) {
            decodeBlock(component, decodeFn, mcu);
            mcu++;
          }
        } else {
          for (n = 0; n < mcuToRead; n++) {
            for (i = 0; i < componentsLength; i++) {
              component = components[i];
              h = component.h;
              v = component.v;
              for (j = 0; j < v; j++) {
                for (k = 0; k < h; k++) {
                  decodeMcu(component, decodeFn, mcu, j, k);
                }
              }
            }
            mcu++;
          }
        }
      }

      // find marker
      bitsCount = 0;
      fileMarker = findNextFileMarker(data, offset);
      if (!fileMarker) {
        break; // Reached the end of the image data without finding any marker.
      }
      if (fileMarker.invalid) {
        // Some bad images seem to pad Scan blocks with e.g. zero bytes, skip
        // past those to attempt to find a valid marker (fixes issue4090.pdf).
        const partialMsg = mcuToRead > 0 ? "unexpected" : "excessive";
        warn(
          `decodeScan - ${partialMsg} MCU data, current marker is: ${fileMarker.invalid}`
        );
        offset = fileMarker.offset;
      }
      if (fileMarker.marker >= 0xffd0 && fileMarker.marker <= 0xffd7) {
        // RSTx
        offset += 2;
      } else {
        break;
      }
    }

    return offset - startOffset;
  }

  // A port of poppler's IDCT method which in turn is taken from:
  //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
  //   'Practical Fast 1-D DCT Algorithms with 11 Multiplications',
  //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
  //   988-991.
  function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable,
      blockData = component.blockData;
    var v0, v1, v2, v3, v4, v5, v6, v7;
    var p0, p1, p2, p3, p4, p5, p6, p7;
    var t;

    if (!qt) {
      throw new JpegError("missing required Quantization Table.");
    }

    // inverse DCT on rows
    for (var row = 0; row < 64; row += 8) {
      // gather block data
      p0 = blockData[blockBufferOffset + row];
      p1 = blockData[blockBufferOffset + row + 1];
      p2 = blockData[blockBufferOffset + row + 2];
      p3 = blockData[blockBufferOffset + row + 3];
      p4 = blockData[blockBufferOffset + row + 4];
      p5 = blockData[blockBufferOffset + row + 5];
      p6 = blockData[blockBufferOffset + row + 6];
      p7 = blockData[blockBufferOffset + row + 7];

      // dequant p0
      p0 *= qt[row];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 512) >> 10;
        p[row] = t;
        p[row + 1] = t;
        p[row + 2] = t;
        p[row + 3] = t;
        p[row + 4] = t;
        p[row + 5] = t;
        p[row + 6] = t;
        p[row + 7] = t;
        continue;
      }
      // dequant p1 ... p7
      p1 *= qt[row + 1];
      p2 *= qt[row + 2];
      p3 *= qt[row + 3];
      p4 *= qt[row + 4];
      p5 *= qt[row + 5];
      p6 *= qt[row + 6];
      p7 *= qt[row + 7];

      // stage 4
      v0 = (dctSqrt2 * p0 + 128) >> 8;
      v1 = (dctSqrt2 * p4 + 128) >> 8;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 128) >> 8;
      v7 = (dctSqrt1d2 * (p1 + p7) + 128) >> 8;
      v5 = p3 << 4;
      v6 = p5 << 4;

      // stage 3
      v0 = (v0 + v1 + 1) >> 1;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p[row] = v0 + v7;
      p[row + 7] = v0 - v7;
      p[row + 1] = v1 + v6;
      p[row + 6] = v1 - v6;
      p[row + 2] = v2 + v5;
      p[row + 5] = v2 - v5;
      p[row + 3] = v3 + v4;
      p[row + 4] = v3 - v4;
    }

    // inverse DCT on columns
    for (var col = 0; col < 8; ++col) {
      p0 = p[col];
      p1 = p[col + 8];
      p2 = p[col + 16];
      p3 = p[col + 24];
      p4 = p[col + 32];
      p5 = p[col + 40];
      p6 = p[col + 48];
      p7 = p[col + 56];

      // check for all-zero AC coefficients
      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = (dctSqrt2 * p0 + 8192) >> 14;
        // Convert to 8-bit.
        if (t < -2040) {
          t = 0;
        } else if (t >= 2024) {
          t = 255;
        } else {
          t = (t + 2056) >> 4;
        }
        blockData[blockBufferOffset + col] = t;
        blockData[blockBufferOffset + col + 8] = t;
        blockData[blockBufferOffset + col + 16] = t;
        blockData[blockBufferOffset + col + 24] = t;
        blockData[blockBufferOffset + col + 32] = t;
        blockData[blockBufferOffset + col + 40] = t;
        blockData[blockBufferOffset + col + 48] = t;
        blockData[blockBufferOffset + col + 56] = t;
        continue;
      }

      // stage 4
      v0 = (dctSqrt2 * p0 + 2048) >> 12;
      v1 = (dctSqrt2 * p4 + 2048) >> 12;
      v2 = p2;
      v3 = p6;
      v4 = (dctSqrt1d2 * (p1 - p7) + 2048) >> 12;
      v7 = (dctSqrt1d2 * (p1 + p7) + 2048) >> 12;
      v5 = p3;
      v6 = p5;

      // stage 3
      // Shift v0 by 128.5 << 5 here, so we don't need to shift p0...p7 when
      // converting to UInt8 range later.
      v0 = ((v0 + v1 + 1) >> 1) + 4112;
      v1 = v0 - v1;
      t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
      v3 = t;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = v4 - v6;
      v7 = (v7 + v5 + 1) >> 1;
      v5 = v7 - v5;

      // stage 2
      v0 = (v0 + v3 + 1) >> 1;
      v3 = v0 - v3;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = v1 - v2;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p0 = v0 + v7;
      p7 = v0 - v7;
      p1 = v1 + v6;
      p6 = v1 - v6;
      p2 = v2 + v5;
      p5 = v2 - v5;
      p3 = v3 + v4;
      p4 = v3 - v4;

      // Convert to 8-bit integers.
      if (p0 < 16) {
        p0 = 0;
      } else if (p0 >= 4080) {
        p0 = 255;
      } else {
        p0 >>= 4;
      }
      if (p1 < 16) {
        p1 = 0;
      } else if (p1 >= 4080) {
        p1 = 255;
      } else {
        p1 >>= 4;
      }
      if (p2 < 16) {
        p2 = 0;
      } else if (p2 >= 4080) {
        p2 = 255;
      } else {
        p2 >>= 4;
      }
      if (p3 < 16) {
        p3 = 0;
      } else if (p3 >= 4080) {
        p3 = 255;
      } else {
        p3 >>= 4;
      }
      if (p4 < 16) {
        p4 = 0;
      } else if (p4 >= 4080) {
        p4 = 255;
      } else {
        p4 >>= 4;
      }
      if (p5 < 16) {
        p5 = 0;
      } else if (p5 >= 4080) {
        p5 = 255;
      } else {
        p5 >>= 4;
      }
      if (p6 < 16) {
        p6 = 0;
      } else if (p6 >= 4080) {
        p6 = 255;
      } else {
        p6 >>= 4;
      }
      if (p7 < 16) {
        p7 = 0;
      } else if (p7 >= 4080) {
        p7 = 255;
      } else {
        p7 >>= 4;
      }

      // store block data
      blockData[blockBufferOffset + col] = p0;
      blockData[blockBufferOffset + col + 8] = p1;
      blockData[blockBufferOffset + col + 16] = p2;
      blockData[blockBufferOffset + col + 24] = p3;
      blockData[blockBufferOffset + col + 32] = p4;
      blockData[blockBufferOffset + col + 40] = p5;
      blockData[blockBufferOffset + col + 48] = p6;
      blockData[blockBufferOffset + col + 56] = p7;
    }
  }

  function buildComponentData(frame, component) {
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var computationBuffer = new Int16Array(64);

    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        quantizeAndInverse(component, offset, computationBuffer);
      }
    }
    return component.blockData;
  }

  function findNextFileMarker(data, currentPos, startPos = currentPos) {
    const maxPos = data.length - 1;
    var newPos = startPos < currentPos ? startPos : currentPos;

    if (currentPos >= maxPos) {
      return null; // Don't attempt to read non-existent data and just return.
    }
    var currentMarker = readUint16(data, currentPos);
    if (currentMarker >= 0xffc0 && currentMarker <= 0xfffe) {
      return {
        invalid: null,
        marker: currentMarker,
        offset: currentPos,
      };
    }
    var newMarker = readUint16(data, newPos);
    while (!(newMarker >= 0xffc0 && newMarker <= 0xfffe)) {
      if (++newPos >= maxPos) {
        return null; // Don't attempt to read non-existent data and just return.
      }
      newMarker = readUint16(data, newPos);
    }
    return {
      invalid: currentMarker.toString(16),
      marker: newMarker,
      offset: newPos,
    };
  }

  JpegImage.prototype = {
    parse(data, { dnlScanLines = null } = {}) {
      function readDataBlock() {
        const length = readUint16(data, offset);
        offset += 2;
        let endOffset = offset + length - 2;

        var fileMarker = findNextFileMarker(data, endOffset, offset);
        if (fileMarker && fileMarker.invalid) {
          warn(
            "readDataBlock - incorrect length, current marker is: " +
              fileMarker.invalid
          );
          endOffset = fileMarker.offset;
        }

        var array = data.subarray(offset, endOffset);
        offset += array.length;
        return array;
      }

      function prepareComponents(frame) {
        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
        for (var i = 0; i < frame.components.length; i++) {
          component = frame.components[i];
          var blocksPerLine = Math.ceil(
            (Math.ceil(frame.samplesPerLine / 8) * component.h) / frame.maxH
          );
          var blocksPerColumn = Math.ceil(
            (Math.ceil(frame.scanLines / 8) * component.v) / frame.maxV
          );
          var blocksPerLineForMcu = mcusPerLine * component.h;
          var blocksPerColumnForMcu = mcusPerColumn * component.v;

          var blocksBufferSize =
            64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
          component.blockData = new Int16Array(blocksBufferSize);
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
        }
        frame.mcusPerLine = mcusPerLine;
        frame.mcusPerColumn = mcusPerColumn;
      }

      var offset = 0;
      var jfif = null;
      var adobe = null;
      var frame, resetInterval;
      let numSOSMarkers = 0;
      var quantizationTables = [];
      var huffmanTablesAC = [],
        huffmanTablesDC = [];

      let fileMarker = readUint16(data, offset);
      offset += 2;
      if (fileMarker !== /* SOI (Start of Image) = */ 0xffd8) {
        throw new JpegError("SOI not found");
      }
      fileMarker = readUint16(data, offset);
      offset += 2;

      markerLoop: while (fileMarker !== /* EOI (End of Image) = */ 0xffd9) {
        var i, j, l;
        switch (fileMarker) {
          case 0xffe0: // APP0 (Application Specific)
          case 0xffe1: // APP1
          case 0xffe2: // APP2
          case 0xffe3: // APP3
          case 0xffe4: // APP4
          case 0xffe5: // APP5
          case 0xffe6: // APP6
          case 0xffe7: // APP7
          case 0xffe8: // APP8
          case 0xffe9: // APP9
          case 0xffea: // APP10
          case 0xffeb: // APP11
          case 0xffec: // APP12
          case 0xffed: // APP13
          case 0xffee: // APP14
          case 0xffef: // APP15
          case 0xfffe: // COM (Comment)
            var appData = readDataBlock();

            if (fileMarker === 0xffe0) {
              // 'JFIF\x00'
              if (
                appData[0] === 0x4a &&
                appData[1] === 0x46 &&
                appData[2] === 0x49 &&
                appData[3] === 0x46 &&
                appData[4] === 0
              ) {
                jfif = {
                  version: { major: appData[5], minor: appData[6] },
                  densityUnits: appData[7],
                  xDensity: (appData[8] << 8) | appData[9],
                  yDensity: (appData[10] << 8) | appData[11],
                  thumbWidth: appData[12],
                  thumbHeight: appData[13],
                  thumbData: appData.subarray(
                    14,
                    14 + 3 * appData[12] * appData[13]
                  ),
                };
              }
            }
            // TODO APP1 - Exif
            if (fileMarker === 0xffee) {
              // 'Adobe'
              if (
                appData[0] === 0x41 &&
                appData[1] === 0x64 &&
                appData[2] === 0x6f &&
                appData[3] === 0x62 &&
                appData[4] === 0x65
              ) {
                adobe = {
                  version: (appData[5] << 8) | appData[6],
                  flags0: (appData[7] << 8) | appData[8],
                  flags1: (appData[9] << 8) | appData[10],
                  transformCode: appData[11],
                };
              }
            }
            break;

          case 0xffdb: // DQT (Define Quantization Tables)
            const quantizationTablesLength = readUint16(data, offset);
            offset += 2;
            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
            var z;
            while (offset < quantizationTablesEnd) {
              var quantizationTableSpec = data[offset++];
              var tableData = new Uint16Array(64);
              if (quantizationTableSpec >> 4 === 0) {
                // 8 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = data[offset++];
                }
              } else if (quantizationTableSpec >> 4 === 1) {
                // 16 bit values
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = readUint16(data, offset);
                  offset += 2;
                }
              } else {
                throw new JpegError("DQT - invalid table spec");
              }
              quantizationTables[quantizationTableSpec & 15] = tableData;
            }
            break;

          case 0xffc0: // SOF0 (Start of Frame, Baseline DCT)
          case 0xffc1: // SOF1 (Start of Frame, Extended DCT)
          case 0xffc2: // SOF2 (Start of Frame, Progressive DCT)
            if (frame) {
              throw new JpegError("Only single frame JPEGs supported");
            }
            offset += 2; // Skip marker length.

            frame = {};
            frame.extended = fileMarker === 0xffc1;
            frame.progressive = fileMarker === 0xffc2;
            frame.precision = data[offset++];
            const sofScanLines = readUint16(data, offset);
            offset += 2;
            frame.scanLines = dnlScanLines || sofScanLines;
            frame.samplesPerLine = readUint16(data, offset);
            offset += 2;
            frame.components = [];
            frame.componentIds = {};
            var componentsCount = data[offset++],
              componentId;
            var maxH = 0,
              maxV = 0;
            for (i = 0; i < componentsCount; i++) {
              componentId = data[offset];
              var h = data[offset + 1] >> 4;
              var v = data[offset + 1] & 15;
              if (maxH < h) {
                maxH = h;
              }
              if (maxV < v) {
                maxV = v;
              }
              var qId = data[offset + 2];
              l = frame.components.push({
                h,
                v,
                quantizationId: qId,
                quantizationTable: null, // See comment below.
              });
              frame.componentIds[componentId] = l - 1;
              offset += 3;
            }
            frame.maxH = maxH;
            frame.maxV = maxV;
            prepareComponents(frame);
            break;

          case 0xffc4: // DHT (Define Huffman Tables)
            const huffmanLength = readUint16(data, offset);
            offset += 2;
            for (i = 2; i < huffmanLength; ) {
              var huffmanTableSpec = data[offset++];
              var codeLengths = new Uint8Array(16);
              var codeLengthSum = 0;
              for (j = 0; j < 16; j++, offset++) {
                codeLengthSum += codeLengths[j] = data[offset];
              }
              var huffmanValues = new Uint8Array(codeLengthSum);
              for (j = 0; j < codeLengthSum; j++, offset++) {
                huffmanValues[j] = data[offset];
              }
              i += 17 + codeLengthSum;

              (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[
                huffmanTableSpec & 15
              ] = buildHuffmanTable(codeLengths, huffmanValues);
            }
            break;

          case 0xffdd: // DRI (Define Restart Interval)
            offset += 2; // Skip marker length.

            resetInterval = readUint16(data, offset);
            offset += 2;
            break;

          case 0xffda: // SOS (Start of Scan)
            // A DNL marker (0xFFDC), if it exists, is only allowed at the end
            // of the first scan segment and may only occur once in an image.
            // Furthermore, to prevent an infinite loop, do *not* attempt to
            // parse DNL markers during re-parsing of the JPEG scan data.
            const parseDNLMarker = ++numSOSMarkers === 1 && !dnlScanLines;

            offset += 2; // Skip marker length.

            var selectorsCount = data[offset++];
            var components = [],
              component;
            for (i = 0; i < selectorsCount; i++) {
              const index = data[offset++];
              var componentIndex = frame.componentIds[index];
              component = frame.components[componentIndex];
              component.index = index;
              var tableSpec = data[offset++];
              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
              components.push(component);
            }
            var spectralStart = data[offset++];
            var spectralEnd = data[offset++];
            var successiveApproximation = data[offset++];
            try {
              var processed = decodeScan(
                data,
                offset,
                frame,
                components,
                resetInterval,
                spectralStart,
                spectralEnd,
                successiveApproximation >> 4,
                successiveApproximation & 15,
                parseDNLMarker
              );
              offset += processed;
            } catch (ex) {
              if (ex instanceof DNLMarkerError) {
                warn(`${ex.message} -- attempting to re-parse the JPEG image.`);
                return this.parse(data, { dnlScanLines: ex.scanLines });
              } else if (ex instanceof EOIMarkerError) {
                warn(`${ex.message} -- ignoring the rest of the image data.`);
                break markerLoop;
              }
              throw ex;
            }
            break;

          case 0xffdc: // DNL (Define Number of Lines)
            // Ignore the marker, since it's being handled in `decodeScan`.
            offset += 4;
            break;

          case 0xffff: // Fill bytes
            if (data[offset] !== 0xff) {
              // Avoid skipping a valid marker.
              offset--;
            }
            break;

          default:
            // Could be incorrect encoding -- the last 0xFF byte of the previous
            // block could have been eaten by the encoder, hence we fallback to
            // `startPos = offset - 3` when looking for the next valid marker.
            const nextFileMarker = findNextFileMarker(
              data,
              /* currentPos = */ offset - 2,
              /* startPos = */ offset - 3
            );
            if (nextFileMarker && nextFileMarker.invalid) {
              warn(
                "JpegImage.parse - unexpected data, current marker is: " +
                  nextFileMarker.invalid
              );
              offset = nextFileMarker.offset;
              break;
            }
            if (offset >= data.length - 1) {
              warn(
                "JpegImage.parse - reached the end of the image data " +
                  "without finding an EOI marker (0xFFD9)."
              );
              break markerLoop;
            }
            throw new JpegError(
              "JpegImage.parse - unknown marker: " + fileMarker.toString(16)
            );
        }
        fileMarker = readUint16(data, offset);
        offset += 2;
      }

      this.width = frame.samplesPerLine;
      this.height = frame.scanLines;
      this.jfif = jfif;
      this.adobe = adobe;
      this.components = [];
      for (i = 0; i < frame.components.length; i++) {
        component = frame.components[i];

        // Prevent errors when DQT markers are placed after SOF{n} markers,
        // by assigning the `quantizationTable` entry after the entire image
        // has been parsed (fixes issue7406.pdf).
        var quantizationTable = quantizationTables[component.quantizationId];
        if (quantizationTable) {
          component.quantizationTable = quantizationTable;
        }

        this.components.push({
          index: component.index,
          output: buildComponentData(frame, component),
          scaleX: component.h / frame.maxH,
          scaleY: component.v / frame.maxV,
          blocksPerLine: component.blocksPerLine,
          blocksPerColumn: component.blocksPerColumn,
        });
      }
      this.numComponents = this.components.length;
      return undefined;
    },

    _getLinearizedBlockData(width, height, isSourcePDF = false) {
      var scaleX = this.width / width,
        scaleY = this.height / height;

      var component, componentScaleX, componentScaleY, blocksPerScanline;
      var x, y, i, j, k;
      var index;
      var offset = 0;
      var output;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint8ClampedArray(dataLength);
      var xScaleBlockOffset = new Uint32Array(width);
      var mask3LSB = 0xfffffff8; // used to clear the 3 LSBs
      let lastComponentScaleX;

      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;
        output = component.output;
        blocksPerScanline = (component.blocksPerLine + 1) << 3;
        // Precalculate the `xScaleBlockOffset`. Since it doesn't depend on the
        // component data, that's only necessary when `componentScaleX` changes.
        if (componentScaleX !== lastComponentScaleX) {
          for (x = 0; x < width; x++) {
            j = 0 | (x * componentScaleX);
            xScaleBlockOffset[x] = ((j & mask3LSB) << 3) | (j & 7);
          }
          lastComponentScaleX = componentScaleX;
        }
        // linearize the blocks of the component
        for (y = 0; y < height; y++) {
          j = 0 | (y * componentScaleY);
          index = (blocksPerScanline * (j & mask3LSB)) | ((j & 7) << 3);
          for (x = 0; x < width; x++) {
            data[offset] = output[index + xScaleBlockOffset[x]];
            offset += numComponents;
          }
        }
      }

      // decodeTransform contains pairs of multiplier (-256..256) and additive
      let transform = this._decodeTransform;

      // In PDF files, JPEG images with CMYK colour spaces are usually inverted
      // (this can be observed by extracting the raw image data).
      // Since the conversion algorithms (see below) were written primarily for
      // the PDF use-cases, attempting to use `JpegImage` to parse standalone
      // JPEG (CMYK) images may thus result in inverted images (see issue 9513).
      //
      // Unfortunately it's not (always) possible to tell, from the image data
      // alone, if it needs to be inverted. Thus in an attempt to provide better
      // out-of-box behaviour when `JpegImage` is used standalone, default to
      // inverting JPEG (CMYK) images if and only if the image data does *not*
      // come from a PDF file and no `decodeTransform` was passed by the user.
      if (!isSourcePDF && numComponents === 4 && !transform) {
        // prettier-ignore
        transform = new Int32Array([
          -256, 255, -256, 255, -256, 255, -256, 255]);
      }

      if (transform) {
        for (i = 0; i < dataLength; ) {
          for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
            data[i] = ((data[i] * transform[k]) >> 8) + transform[k + 1];
          }
        }
      }
      return data;
    },

    get _isColorConversionNeeded() {
      if (this.adobe) {
        // The adobe transform marker overrides any previous setting.
        return !!this.adobe.transformCode;
      }
      if (this.numComponents === 3) {
        if (this._colorTransform === 0) {
          // If the Adobe transform marker is not present and the image
          // dictionary has a 'ColorTransform' entry, explicitly set to `0`,
          // then the colours should *not* be transformed.
          return false;
        } else if (
          this.components[0].index === /* "R" = */ 0x52 &&
          this.components[1].index === /* "G" = */ 0x47 &&
          this.components[2].index === /* "B" = */ 0x42
        ) {
          // If the three components are indexed as RGB in ASCII
          // then the colours should *not* be transformed.
          return false;
        }
        return true;
      }
      // `this.numComponents !== 3`
      if (this._colorTransform === 1) {
        // If the Adobe transform marker is not present and the image
        // dictionary has a 'ColorTransform' entry, explicitly set to `1`,
        // then the colours should be transformed.
        return true;
      }
      return false;
    },

    _convertYccToRgb: function convertYccToRgb(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 3) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = Y - 179.456 + 1.402 * Cr;
        data[i + 1] = Y + 135.459 - 0.344 * Cb - 0.714 * Cr;
        data[i + 2] = Y - 226.816 + 1.772 * Cb;
      }
      return data;
    },

    _convertYcckToRgb: function convertYcckToRgb(data) {
      var Y, Cb, Cr, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          -122.67195406894 +
          Cb *
            (-6.60635669420364e-5 * Cb +
              0.000437130475926232 * Cr -
              5.4080610064599e-5 * Y +
              0.00048449797120281 * k -
              0.154362151871126) +
          Cr *
            (-0.000957964378445773 * Cr +
              0.000817076911346625 * Y -
              0.00477271405408747 * k +
              1.53380253221734) +
          Y *
            (0.000961250184130688 * Y -
              0.00266257332283933 * k +
              0.48357088451265) +
          k * (-0.000336197177618394 * k + 0.484791561490776);

        data[offset++] =
          107.268039397724 +
          Cb *
            (2.19927104525741e-5 * Cb -
              0.000640992018297945 * Cr +
              0.000659397001245577 * Y +
              0.000426105652938837 * k -
              0.176491792462875) +
          Cr *
            (-0.000778269941513683 * Cr +
              0.00130872261408275 * Y +
              0.000770482631801132 * k -
              0.151051492775562) +
          Y *
            (0.00126935368114843 * Y -
              0.00265090189010898 * k +
              0.25802910206845) +
          k * (-0.000318913117588328 * k - 0.213742400323665);

        data[offset++] =
          -20.810012546947 +
          Cb *
            (-0.000570115196973677 * Cb -
              2.63409051004589e-5 * Cr +
              0.0020741088115012 * Y -
              0.00288260236853442 * k +
              0.814272968359295) +
          Cr *
            (-1.53496057440975e-5 * Cr -
              0.000132689043961446 * Y +
              0.000560833691242812 * k -
              0.195152027534049) +
          Y *
            (0.00174418132927582 * Y -
              0.00255243321439347 * k +
              0.116935020465145) +
          k * (-0.000343531996510555 * k + 0.24165260232407);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    _convertYcckToCmyk: function convertYcckToCmyk(data) {
      var Y, Cb, Cr;
      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = 434.456 - Y - 1.402 * Cr;
        data[i + 1] = 119.541 - Y + 0.344 * Cb + 0.714 * Cr;
        data[i + 2] = 481.816 - Y - 1.772 * Cb;
        // K in data[i + 3] is unchanged
      }
      return data;
    },

    _convertCmykToRgb: function convertCmykToRgb(data) {
      var c, m, y, k;
      var offset = 0;
      for (var i = 0, length = data.length; i < length; i += 4) {
        c = data[i];
        m = data[i + 1];
        y = data[i + 2];
        k = data[i + 3];

        data[offset++] =
          255 +
          c *
            (-0.00006747147073602441 * c +
              0.0008379262121013727 * m +
              0.0002894718188643294 * y +
              0.003264231057537806 * k -
              1.1185611867203937) +
          m *
            (0.000026374107616089405 * m -
              0.00008626949158638572 * y -
              0.0002748769067499491 * k -
              0.02155688794978967) +
          y *
            (-0.00003878099212869363 * y -
              0.0003267808279485286 * k +
              0.0686742238595345) -
          k * (0.0003361971776183937 * k + 0.7430659151342254);

        data[offset++] =
          255 +
          c *
            (0.00013596372813588848 * c +
              0.000924537132573585 * m +
              0.00010567359618683593 * y +
              0.0004791864687436512 * k -
              0.3109689587515875) +
          m *
            (-0.00023545346108370344 * m +
              0.0002702845253534714 * y +
              0.0020200308977307156 * k -
              0.7488052167015494) +
          y *
            (0.00006834815998235662 * y +
              0.00015168452363460973 * k -
              0.09751927774728933) -
          k * (0.00031891311758832814 * k + 0.7364883807733168);

        data[offset++] =
          255 +
          c *
            (0.000013598650411385307 * c +
              0.00012423956175490851 * m +
              0.0004751985097583589 * y -
              0.0000036729317476630422 * k -
              0.05562186980264034) +
          m *
            (0.00016141380598724676 * m +
              0.0009692239130725186 * y +
              0.0007782692450036253 * k -
              0.44015232367526463) +
          y *
            (5.068882914068769e-7 * y +
              0.0017778369011375071 * k -
              0.7591454649749609) -
          k * (0.0003435319965105553 * k + 0.7063770186160144);
      }
      // Ensure that only the converted RGB data is returned.
      return data.subarray(0, offset);
    },

    getData({ width, height, forceRGB = false, isSourcePDF = false }) {
      if (this.numComponents > 4) {
        throw new JpegError("Unsupported color mode");
      }
      // Type of data: Uint8ClampedArray(width * height * numComponents)
      var data = this._getLinearizedBlockData(width, height, isSourcePDF);

      if (this.numComponents === 1 && forceRGB) {
        var dataLength = data.length;
        var rgbData = new Uint8ClampedArray(dataLength * 3);
        var offset = 0;
        for (var i = 0; i < dataLength; i++) {
          var grayColor = data[i];
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
        }
        return rgbData;
      } else if (this.numComponents === 3 && this._isColorConversionNeeded) {
        return this._convertYccToRgb(data);
      } else if (this.numComponents === 4) {
        if (this._isColorConversionNeeded) {
          if (forceRGB) {
            return this._convertYcckToRgb(data);
          }
          return this._convertYcckToCmyk(data);
        } else if (forceRGB) {
          return this._convertCmykToRgb(data);
        }
      }
      return data;
    },
  };

  return JpegImage;
})();


	"use strict";
    var ArithmeticDecoder = function ArithmeticDecoderClosure() {
  var QeTable = [{
    qe: 0x5601,
    nmps: 1,
    nlps: 1,
    switchFlag: 1
  }, {
    qe: 0x3401,
    nmps: 2,
    nlps: 6,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 3,
    nlps: 9,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 4,
    nlps: 12,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 5,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 38,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 7,
    nlps: 6,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 8,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 9,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 10,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 11,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 12,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 13,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 29,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 15,
    nlps: 14,
    switchFlag: 1
  }, {
    qe: 0x5401,
    nmps: 16,
    nlps: 14,
    switchFlag: 0
  }, {
    qe: 0x5101,
    nmps: 17,
    nlps: 15,
    switchFlag: 0
  }, {
    qe: 0x4801,
    nmps: 18,
    nlps: 16,
    switchFlag: 0
  }, {
    qe: 0x3801,
    nmps: 19,
    nlps: 17,
    switchFlag: 0
  }, {
    qe: 0x3401,
    nmps: 20,
    nlps: 18,
    switchFlag: 0
  }, {
    qe: 0x3001,
    nmps: 21,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2801,
    nmps: 22,
    nlps: 19,
    switchFlag: 0
  }, {
    qe: 0x2401,
    nmps: 23,
    nlps: 20,
    switchFlag: 0
  }, {
    qe: 0x2201,
    nmps: 24,
    nlps: 21,
    switchFlag: 0
  }, {
    qe: 0x1C01,
    nmps: 25,
    nlps: 22,
    switchFlag: 0
  }, {
    qe: 0x1801,
    nmps: 26,
    nlps: 23,
    switchFlag: 0
  }, {
    qe: 0x1601,
    nmps: 27,
    nlps: 24,
    switchFlag: 0
  }, {
    qe: 0x1401,
    nmps: 28,
    nlps: 25,
    switchFlag: 0
  }, {
    qe: 0x1201,
    nmps: 29,
    nlps: 26,
    switchFlag: 0
  }, {
    qe: 0x1101,
    nmps: 30,
    nlps: 27,
    switchFlag: 0
  }, {
    qe: 0x0AC1,
    nmps: 31,
    nlps: 28,
    switchFlag: 0
  }, {
    qe: 0x09C1,
    nmps: 32,
    nlps: 29,
    switchFlag: 0
  }, {
    qe: 0x08A1,
    nmps: 33,
    nlps: 30,
    switchFlag: 0
  }, {
    qe: 0x0521,
    nmps: 34,
    nlps: 31,
    switchFlag: 0
  }, {
    qe: 0x0441,
    nmps: 35,
    nlps: 32,
    switchFlag: 0
  }, {
    qe: 0x02A1,
    nmps: 36,
    nlps: 33,
    switchFlag: 0
  }, {
    qe: 0x0221,
    nmps: 37,
    nlps: 34,
    switchFlag: 0
  }, {
    qe: 0x0141,
    nmps: 38,
    nlps: 35,
    switchFlag: 0
  }, {
    qe: 0x0111,
    nmps: 39,
    nlps: 36,
    switchFlag: 0
  }, {
    qe: 0x0085,
    nmps: 40,
    nlps: 37,
    switchFlag: 0
  }, {
    qe: 0x0049,
    nmps: 41,
    nlps: 38,
    switchFlag: 0
  }, {
    qe: 0x0025,
    nmps: 42,
    nlps: 39,
    switchFlag: 0
  }, {
    qe: 0x0015,
    nmps: 43,
    nlps: 40,
    switchFlag: 0
  }, {
    qe: 0x0009,
    nmps: 44,
    nlps: 41,
    switchFlag: 0
  }, {
    qe: 0x0005,
    nmps: 45,
    nlps: 42,
    switchFlag: 0
  }, {
    qe: 0x0001,
    nmps: 45,
    nlps: 43,
    switchFlag: 0
  }, {
    qe: 0x5601,
    nmps: 46,
    nlps: 46,
    switchFlag: 0
  }];
  function ArithmeticDecoder(data, start, end) {
    this.data = data;
    this.bp = start;
    this.dataEnd = end;
    this.chigh = data[start];
    this.clow = 0;
    this.byteIn();
    this.chigh = this.chigh << 7 & 0xFFFF | this.clow >> 9 & 0x7F;
    this.clow = this.clow << 7 & 0xFFFF;
    this.ct -= 7;
    this.a = 0x8000;
  }
  ArithmeticDecoder.prototype = {
    byteIn: function ArithmeticDecoder_byteIn() {
      var data = this.data;
      var bp = this.bp;
      if (data[bp] === 0xFF) {
        var b1 = data[bp + 1];
        if (b1 > 0x8F) {
          this.clow += 0xFF00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += data[bp] << 9;
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xFF00;
        this.ct = 8;
        this.bp = bp;
      }
      if (this.clow > 0xFFFF) {
        this.chigh += this.clow >> 16;
        this.clow &= 0xFFFF;
      }
    },
    readBit: function ArithmeticDecoder_readBit(contexts, pos) {
      var cx_index = contexts[pos] >> 1,
          cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;
      if (this.chigh < qeIcx) {
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;
        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }
        if (a < qeIcx) {
          d = 1 ^ cx_mps;
          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }
          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }
      do {
        if (this.ct === 0) {
          this.byteIn();
        }
        a <<= 1;
        this.chigh = this.chigh << 1 & 0xFFFF | this.clow >> 15 & 1;
        this.clow = this.clow << 1 & 0xFFFF;
        this.ct--;
      } while ((a & 0x8000) === 0);
      this.a = a;
      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  };
  return ArithmeticDecoder;
}();


	
	"use strict";
   var JpxImage = function JpxImageClosure() {
  var SubbandsGainLog2 = {
    'LL': 0,
    'LH': 1,
    'HL': 1,
    'HH': 2
  };
  function JpxImage() {
    this.failOnCorruptedImage = false;
  }
  JpxImage.prototype = {
    parse: function JpxImage_parse(data) {
      var head = readUint16(data, 0);
      if (head === 0xFF4F) {
        this.parseCodestream(data, 0, data.length);
        return;
      }
      var position = 0,
          length = data.length;
      while (position < length) {
        var headerSize = 8;
        var lbox = readUint32(data, position);
        var tbox = readUint32(data, position + 4);
        position += headerSize;
        if (lbox === 1) {
          lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
          position += 8;
          headerSize += 8;
        }
        if (lbox === 0) {
          lbox = length - position + headerSize;
        }
        if (lbox < headerSize) {
          error('JPX Error: Invalid box field size');
        }
        var dataLength = lbox - headerSize;
        var jumpDataLength = true;
        switch (tbox) {
          case 0x6A703268:
            jumpDataLength = false;
            break;
          case 0x636F6C72:
            var method = data[position];
            if (method === 1) {
              var colorspace = readUint32(data, position + 3);
              switch (colorspace) {
                case 16:
                case 17:
                case 18:
                  break;
                default:
                  warn('Unknown colorspace ' + colorspace);
                  break;
              }
            } else if (method === 2) {
              info('ICC profile not supported');
            }
            break;
          case 0x6A703263:
            this.parseCodestream(data, position, position + dataLength);
            break;
          case 0x6A502020:
            if (readUint32(data, position) !== 0x0d0a870a) {
              warn('Invalid JP2 signature');
            }
            break;
          case 0x6A501A1A:
          case 0x66747970:
          case 0x72726571:
          case 0x72657320:
          case 0x69686472:
            break;
          default:
            var headerType = String.fromCharCode(tbox >> 24 & 0xFF, tbox >> 16 & 0xFF, tbox >> 8 & 0xFF, tbox & 0xFF);
            warn('Unsupported header type ' + tbox + ' (' + headerType + ')');
            break;
        }
        if (jumpDataLength) {
          position += dataLength;
        }
      }
    },
    parseImageProperties: function JpxImage_parseImageProperties(stream) {
      var newByte = stream.getByte();
      while (newByte >= 0) {
        var oldByte = newByte;
        newByte = stream.getByte();
        var code = oldByte << 8 | newByte;
        if (code === 0xFF51) {
          stream.skip(4);
          var Xsiz = stream.getInt32() >>> 0;
          var Ysiz = stream.getInt32() >>> 0;
          var XOsiz = stream.getInt32() >>> 0;
          var YOsiz = stream.getInt32() >>> 0;
          stream.skip(16);
          var Csiz = stream.getUint16();
          this.width = Xsiz - XOsiz;
          this.height = Ysiz - YOsiz;
          this.componentsCount = Csiz;
          this.bitsPerComponent = 8;
          return;
        }
      }
      error('JPX Error: No size marker found in JPX stream');
    },
    parseCodestream: function JpxImage_parseCodestream(data, start, end) {
      var context = {};
      var doNotRecover = false;
      try {
        var position = start;
        while (position + 1 < end) {
          var code = readUint16(data, position);
          position += 2;
          var length = 0,
              j,
              sqcd,
              spqcds,
              spqcdSize,
              scalarExpounded,
              tile;
          switch (code) {
            case 0xFF4F:
              context.mainHeader = true;
              break;
            case 0xFFD9:
              break;
            case 0xFF51:
              length = readUint16(data, position);
              var siz = {};
              siz.Xsiz = readUint32(data, position + 4);
              siz.Ysiz = readUint32(data, position + 8);
              siz.XOsiz = readUint32(data, position + 12);
              siz.YOsiz = readUint32(data, position + 16);
              siz.XTsiz = readUint32(data, position + 20);
              siz.YTsiz = readUint32(data, position + 24);
              siz.XTOsiz = readUint32(data, position + 28);
              siz.YTOsiz = readUint32(data, position + 32);
              var componentsCount = readUint16(data, position + 36);
              siz.Csiz = componentsCount;
              var components = [];
              j = position + 38;
              for (var i = 0; i < componentsCount; i++) {
                var component = {
                  precision: (data[j] & 0x7F) + 1,
                  isSigned: !!(data[j] & 0x80),
                  XRsiz: data[j + 1],
                  YRsiz: data[j + 1]
                };
                calculateComponentDimensions(component, siz);
                components.push(component);
              }
              context.SIZ = siz;
              context.components = components;
              calculateTileGrids(context, components);
              context.QCC = [];
              context.COC = [];
              break;
            case 0xFF5C:
              length = readUint16(data, position);
              var qcd = {};
              j = position + 2;
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcd.noQuantization = spqcdSize === 8;
              qcd.scalarExpounded = scalarExpounded;
              qcd.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                var spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcd.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCD = qcd;
              } else {
                context.currentTile.QCD = qcd;
                context.currentTile.QCC = [];
              }
              break;
            case 0xFF5D:
              length = readUint16(data, position);
              var qcc = {};
              j = position + 2;
              var cqcc;
              if (context.SIZ.Csiz < 257) {
                cqcc = data[j++];
              } else {
                cqcc = readUint16(data, j);
                j += 2;
              }
              sqcd = data[j++];
              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;
                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;
                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;
                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }
              qcc.noQuantization = spqcdSize === 8;
              qcc.scalarExpounded = scalarExpounded;
              qcc.guardBits = sqcd >> 5;
              spqcds = [];
              while (j < length + position) {
                spqcd = {};
                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }
                spqcds.push(spqcd);
              }
              qcc.SPqcds = spqcds;
              if (context.mainHeader) {
                context.QCC[cqcc] = qcc;
              } else {
                context.currentTile.QCC[cqcc] = qcc;
              }
              break;
            case 0xFF52:
              length = readUint16(data, position);
              var cod = {};
              j = position + 2;
              var scod = data[j++];
              cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
              cod.sopMarkerUsed = !!(scod & 2);
              cod.ephMarkerUsed = !!(scod & 4);
              cod.progressionOrder = data[j++];
              cod.layersCount = readUint16(data, j);
              j += 2;
              cod.multipleComponentTransform = data[j++];
              cod.decompositionLevelsCount = data[j++];
              cod.xcb = (data[j++] & 0xF) + 2;
              cod.ycb = (data[j++] & 0xF) + 2;
              var blockStyle = data[j++];
              cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
              cod.resetContextProbabilities = !!(blockStyle & 2);
              cod.terminationOnEachCodingPass = !!(blockStyle & 4);
              cod.verticalyStripe = !!(blockStyle & 8);
              cod.predictableTermination = !!(blockStyle & 16);
              cod.segmentationSymbolUsed = !!(blockStyle & 32);
              cod.reversibleTransformation = data[j++];
              if (cod.entropyCoderWithCustomPrecincts) {
                var precinctsSizes = [];
                while (j < length + position) {
                  var precinctsSize = data[j++];
                  precinctsSizes.push({
                    PPx: precinctsSize & 0xF,
                    PPy: precinctsSize >> 4
                  });
                }
                cod.precinctsSizes = precinctsSizes;
              }
              var unsupported = [];
              if (cod.selectiveArithmeticCodingBypass) {
                unsupported.push('selectiveArithmeticCodingBypass');
              }
              if (cod.resetContextProbabilities) {
                unsupported.push('resetContextProbabilities');
              }
              if (cod.terminationOnEachCodingPass) {
                unsupported.push('terminationOnEachCodingPass');
              }
              if (cod.verticalyStripe) {
                unsupported.push('verticalyStripe');
              }
              if (cod.predictableTermination) {
                unsupported.push('predictableTermination');
              }
              if (unsupported.length > 0) {
                doNotRecover = true;
                throw new Error('Unsupported COD options (' + unsupported.join(', ') + ')');
              }
              if (context.mainHeader) {
                context.COD = cod;
              } else {
                context.currentTile.COD = cod;
                context.currentTile.COC = [];
              }
              break;
            case 0xFF90:
              length = readUint16(data, position);
              tile = {};
              tile.index = readUint16(data, position + 2);
              tile.length = readUint32(data, position + 4);
              tile.dataEnd = tile.length + position - 2;
              tile.partIndex = data[position + 8];
              tile.partsCount = data[position + 9];
              context.mainHeader = false;
              if (tile.partIndex === 0) {
                tile.COD = context.COD;
                tile.COC = context.COC.slice(0);
                tile.QCD = context.QCD;
                tile.QCC = context.QCC.slice(0);
              }
              context.currentTile = tile;
              break;
            case 0xFF93:
              tile = context.currentTile;
              if (tile.partIndex === 0) {
                initializeTile(context, tile.index);
                buildPackets(context);
              }
              length = tile.dataEnd - position;
              parseTilePackets(context, data, position, length);
              break;
            case 0xFF55:
            case 0xFF57:
            case 0xFF58:
            case 0xFF64:
              length = readUint16(data, position);
              break;
            case 0xFF53:
              throw new Error('Codestream code 0xFF53 (COC) is ' + 'not implemented');
            default:
              throw new Error('Unknown codestream code: ' + code.toString(16));
          }
          position += length;
        }
      } catch (e) {
        if (doNotRecover || this.failOnCorruptedImage) {
          error('JPX Error: ' + e.message);
        } else {
          warn('JPX: Trying to recover from: ' + e.message);
        }
      }
      this.tiles = transformComponents(context);
      this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
      this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
      this.componentsCount = context.SIZ.Csiz;
    }
  };
  function calculateComponentDimensions(component, siz) {
    component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
    component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
    component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
    component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
    component.width = component.x1 - component.x0;
    component.height = component.y1 - component.y0;
  }
  function calculateTileGrids(context, components) {
    var siz = context.SIZ;
    var tile,
        tiles = [];
    var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
    var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
    for (var q = 0; q < numYtiles; q++) {
      for (var p = 0; p < numXtiles; p++) {
        tile = {};
        tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
        tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
        tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
        tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
        tile.width = tile.tx1 - tile.tx0;
        tile.height = tile.ty1 - tile.ty0;
        tile.components = [];
        tiles.push(tile);
      }
    }
    context.tiles = tiles;
    var componentsCount = siz.Csiz;
    for (var i = 0, ii = componentsCount; i < ii; i++) {
      var component = components[i];
      for (var j = 0, jj = tiles.length; j < jj; j++) {
        var tileComponent = {};
        tile = tiles[j];
        tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
        tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
        tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
        tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
        tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
        tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
        tile.components[i] = tileComponent;
      }
    }
  }
  function getBlocksDimensions(context, component, r) {
    var codOrCoc = component.codingStyleParameters;
    var result = {};
    if (!codOrCoc.entropyCoderWithCustomPrecincts) {
      result.PPx = 15;
      result.PPy = 15;
    } else {
      result.PPx = codOrCoc.precinctsSizes[r].PPx;
      result.PPy = codOrCoc.precinctsSizes[r].PPy;
    }
    result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
    result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
    return result;
  }
  function buildPrecincts(context, resolution, dimensions) {
    var precinctWidth = 1 << dimensions.PPx;
    var precinctHeight = 1 << dimensions.PPy;
    var isZeroRes = resolution.resLevel === 0;
    var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
    var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
    var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
    var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
    var numprecincts = numprecinctswide * numprecinctshigh;
    resolution.precinctParameters = {
      precinctWidth: precinctWidth,
      precinctHeight: precinctHeight,
      numprecinctswide: numprecinctswide,
      numprecinctshigh: numprecinctshigh,
      numprecincts: numprecincts,
      precinctWidthInSubband: precinctWidthInSubband,
      precinctHeightInSubband: precinctHeightInSubband
    };
  }
  function buildCodeblocks(context, subband, dimensions) {
    var xcb_ = dimensions.xcb_;
    var ycb_ = dimensions.ycb_;
    var codeblockWidth = 1 << xcb_;
    var codeblockHeight = 1 << ycb_;
    var cbx0 = subband.tbx0 >> xcb_;
    var cby0 = subband.tby0 >> ycb_;
    var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
    var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
    var precinctParameters = subband.resolution.precinctParameters;
    var codeblocks = [];
    var precincts = [];
    var i, j, codeblock, precinctNumber;
    for (j = cby0; j < cby1; j++) {
      for (i = cbx0; i < cbx1; i++) {
        codeblock = {
          cbx: i,
          cby: j,
          tbx0: codeblockWidth * i,
          tby0: codeblockHeight * j,
          tbx1: codeblockWidth * (i + 1),
          tby1: codeblockHeight * (j + 1)
        };
        codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
        codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
        codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
        codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
        var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
        var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
        precinctNumber = pi + pj * precinctParameters.numprecinctswide;
        codeblock.precinctNumber = precinctNumber;
        codeblock.subbandType = subband.type;
        codeblock.Lblock = 3;
        if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
          continue;
        }
        codeblocks.push(codeblock);
        var precinct = precincts[precinctNumber];
        if (precinct !== undefined) {
          if (i < precinct.cbxMin) {
            precinct.cbxMin = i;
          } else if (i > precinct.cbxMax) {
            precinct.cbxMax = i;
          }
          if (j < precinct.cbyMin) {
            precinct.cbxMin = j;
          } else if (j > precinct.cbyMax) {
            precinct.cbyMax = j;
          }
        } else {
          precincts[precinctNumber] = precinct = {
            cbxMin: i,
            cbyMin: j,
            cbxMax: i,
            cbyMax: j
          };
        }
        codeblock.precinct = precinct;
      }
    }
    subband.codeblockParameters = {
      codeblockWidth: xcb_,
      codeblockHeight: ycb_,
      numcodeblockwide: cbx1 - cbx0 + 1,
      numcodeblockhigh: cby1 - cby0 + 1
    };
    subband.codeblocks = codeblocks;
    subband.precincts = precincts;
  }
  function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    var subbands = resolution.subbands;
    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;
      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];
        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }
        precinctCodeblocks.push(codeblock);
      }
    }
    return {
      layerNumber: layerNumber,
      codeblocks: precinctCodeblocks
    };
  }
  function LayerResolutionComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var l = 0,
        r = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; l < layersCount; l++) {
        for (; r <= maxDecompositionLevelsCount; r++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        r = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionLayerComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;
    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }
    var r = 0,
        l = 0,
        i = 0,
        k = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; l < layersCount; l++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }
            k = 0;
          }
          i = 0;
        }
        l = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ResolutionPositionComponentLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var l, r, c, p;
    var maxDecompositionLevelsCount = 0;
    for (c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
    }
    var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);
    for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
      var maxNumPrecincts = 0;
      for (c = 0; c < componentsCount; ++c) {
        var resolutions = tile.components[c].resolutions;
        if (r < resolutions.length) {
          maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
        }
      }
      maxNumPrecinctsInLevel[r] = maxNumPrecincts;
    }
    l = 0;
    r = 0;
    c = 0;
    p = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; p < maxNumPrecinctsInLevel[r]; p++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }
            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;
            if (p >= numprecincts) {
              continue;
            }
            for (; l < layersCount;) {
              var packet = createPacket(resolution, p, l);
              l++;
              return packet;
            }
            l = 0;
          }
          c = 0;
        }
        p = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function PositionComponentResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var precinctsIterationSizes = precinctsSizes;
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; py < precinctsIterationSizes.maxNumHigh; py++) {
        for (; px < precinctsIterationSizes.maxNumWide; px++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          c = 0;
        }
        px = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function ComponentPositionResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;
    this.nextPacket = function JpxImage_nextPacket() {
      for (; c < componentsCount; ++c) {
        var component = tile.components[c];
        var precinctsIterationSizes = precinctsSizes.components[c];
        var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
        for (; py < precinctsIterationSizes.maxNumHigh; py++) {
          for (; px < precinctsIterationSizes.maxNumWide; px++) {
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsIterationSizes.resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
              if (k === null) {
                continue;
              }
              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }
              l = 0;
            }
            r = 0;
          }
          px = 0;
        }
        py = 0;
      }
      error('JPX Error: Out of packets');
    };
  }
  function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
    var posX = pxIndex * precinctIterationSizes.minWidth;
    var posY = pyIndex * precinctIterationSizes.minHeight;
    if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
      return null;
    }
    var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
    return posX / sizeInImageScale.height + startPrecinctRowIndex;
  }
  function getPrecinctSizesInImageScale(tile) {
    var componentsCount = tile.components.length;
    var minWidth = Number.MAX_VALUE;
    var minHeight = Number.MAX_VALUE;
    var maxNumWide = 0;
    var maxNumHigh = 0;
    var sizePerComponent = new Array(componentsCount);
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var sizePerResolution = new Array(decompositionLevelsCount + 1);
      var minWidthCurrentComponent = Number.MAX_VALUE;
      var minHeightCurrentComponent = Number.MAX_VALUE;
      var maxNumWideCurrentComponent = 0;
      var maxNumHighCurrentComponent = 0;
      var scale = 1;
      for (var r = decompositionLevelsCount; r >= 0; --r) {
        var resolution = component.resolutions[r];
        var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
        var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
        minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
        minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
        maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
        maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
        sizePerResolution[r] = {
          width: widthCurrentResolution,
          height: heightCurrentResolution
        };
        scale <<= 1;
      }
      minWidth = Math.min(minWidth, minWidthCurrentComponent);
      minHeight = Math.min(minHeight, minHeightCurrentComponent);
      maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
      maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
      sizePerComponent[c] = {
        resolutions: sizePerResolution,
        minWidth: minWidthCurrentComponent,
        minHeight: minHeightCurrentComponent,
        maxNumWide: maxNumWideCurrentComponent,
        maxNumHigh: maxNumHighCurrentComponent
      };
    }
    return {
      components: sizePerComponent,
      minWidth: minWidth,
      minHeight: minHeight,
      maxNumWide: maxNumWide,
      maxNumHigh: maxNumHigh
    };
  }
  function buildPackets(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var componentsCount = siz.Csiz;
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var resolutions = [];
      var subbands = [];
      for (var r = 0; r <= decompositionLevelsCount; r++) {
        var blocksDimensions = getBlocksDimensions(context, component, r);
        var resolution = {};
        var scale = 1 << decompositionLevelsCount - r;
        resolution.trx0 = Math.ceil(component.tcx0 / scale);
        resolution.try0 = Math.ceil(component.tcy0 / scale);
        resolution.trx1 = Math.ceil(component.tcx1 / scale);
        resolution.try1 = Math.ceil(component.tcy1 / scale);
        resolution.resLevel = r;
        buildPrecincts(context, resolution, blocksDimensions);
        resolutions.push(resolution);
        var subband;
        if (r === 0) {
          subband = {};
          subband.type = 'LL';
          subband.tbx0 = Math.ceil(component.tcx0 / scale);
          subband.tby0 = Math.ceil(component.tcy0 / scale);
          subband.tbx1 = Math.ceil(component.tcx1 / scale);
          subband.tby1 = Math.ceil(component.tcy1 / scale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolution.subbands = [subband];
        } else {
          var bscale = 1 << decompositionLevelsCount - r + 1;
          var resolutionSubbands = [];
          subband = {};
          subband.type = 'HL';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'LH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'HH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          resolution.subbands = resolutionSubbands;
        }
      }
      component.resolutions = resolutions;
      component.subbands = subbands;
    }
    var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
    switch (progressionOrder) {
      case 0:
        tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
        break;
      case 1:
        tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
        break;
      case 2:
        tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
        break;
      case 3:
        tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
        break;
      case 4:
        tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
        break;
      default:
        error('JPX Error: Unsupported progression order ' + progressionOrder);
    }
  }
  function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer,
        bufferSize = 0,
        skipNextBit = false;
    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;
        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }
        if (b === 0xFF) {
          skipNextBit = true;
        }
      }
      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }
    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xFF && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xFF && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }
      return false;
    }
    function skipBytes(count) {
      position += count;
    }
    function alignToByte() {
      bufferSize = 0;
      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }
    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }
      if (readBits(1) === 0) {
        return 2;
      }
      var value = readBits(2);
      if (value < 3) {
        return value + 3;
      }
      value = readBits(5);
      if (value < 31) {
        return value + 6;
      }
      value = readBits(7);
      return value + 37;
    }
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;
    while (position < dataLength) {
      alignToByte();
      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        skipBytes(4);
      }
      var packet = packetsIterator.nextPacket();
      if (!readBits(1)) {
        continue;
      }
      var layerNumber = packet.layerNumber;
      var queue = [],
          codeblock;
      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;
        if (codeblock['included'] !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;
          if (precinct['inclusionTree'] !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }
          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();
                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }
        if (!codeblockIncluded) {
          continue;
        }
        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();
              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }
          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }
        var codingpasses = readCodingpasses();
        while (readBits(1)) {
          codeblock.Lblock++;
        }
        var codingpassesLog2 = log2(codingpasses);
        var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock: codeblock,
          codingpasses: codingpasses,
          dataLength: codedDataLength
        });
      }
      alignToByte();
      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }
      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;
        if (codeblock['data'] === undefined) {
          codeblock.data = [];
        }
        codeblock.data.push({
          data: data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }
    return position;
  }
  function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
    var x0 = subband.tbx0;
    var y0 = subband.tby0;
    var width = subband.tbx1 - subband.tbx0;
    var codeblocks = subband.codeblocks;
    var right = subband.type.charAt(0) === 'H' ? 1 : 0;
    var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;
    for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
      var codeblock = codeblocks[i];
      var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
      var blockHeight = codeblock.tby1_ - codeblock.tby0_;
      if (blockWidth === 0 || blockHeight === 0) {
        continue;
      }
      if (codeblock['data'] === undefined) {
        continue;
      }
      var bitModel, currentCodingpassType;
      bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
      currentCodingpassType = 2;
      var data = codeblock.data,
          totalLength = 0,
          codingpasses = 0;
      var j, jj, dataItem;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        totalLength += dataItem.end - dataItem.start;
        codingpasses += dataItem.codingpasses;
      }
      var encodedData = new Uint8Array(totalLength);
      var position = 0;
      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
        encodedData.set(chunk, position);
        position += chunk.length;
      }
      var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
      bitModel.setDecoder(decoder);
      for (j = 0; j < codingpasses; j++) {
        switch (currentCodingpassType) {
          case 0:
            bitModel.runSignificancePropagationPass();
            break;
          case 1:
            bitModel.runMagnitudeRefinementPass();
            break;
          case 2:
            bitModel.runCleanupPass();
            if (segmentationSymbolUsed) {
              bitModel.checkSegmentationSymbol();
            }
            break;
        }
        currentCodingpassType = (currentCodingpassType + 1) % 3;
      }
      var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
      var sign = bitModel.coefficentsSign;
      var magnitude = bitModel.coefficentsMagnitude;
      var bitsDecoded = bitModel.bitsDecoded;
      var magnitudeCorrection = reversible ? 0 : 0.5;
      var k, n, nb;
      position = 0;
      var interleave = subband.type !== 'LL';
      for (j = 0; j < blockHeight; j++) {
        var row = offset / width | 0;
        var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
        for (k = 0; k < blockWidth; k++) {
          n = magnitude[position];
          if (n !== 0) {
            n = (n + magnitudeCorrection) * delta;
            if (sign[position] !== 0) {
              n = -n;
            }
            nb = bitsDecoded[position];
            var pos = interleave ? levelOffset + (offset << 1) : offset;
            if (reversible && nb >= mb) {
              coefficients[pos] = n;
            } else {
              coefficients[pos] = n * (1 << mb - nb);
            }
          }
          offset++;
          position++;
        }
        offset += width - blockWidth;
      }
    }
  }
  function transformTile(context, tile, c) {
    var component = tile.components[c];
    var codingStyleParameters = component.codingStyleParameters;
    var quantizationParameters = component.quantizationParameters;
    var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
    var spqcds = quantizationParameters.SPqcds;
    var scalarExpounded = quantizationParameters.scalarExpounded;
    var guardBits = quantizationParameters.guardBits;
    var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
    var precision = context.components[c].precision;
    var reversible = codingStyleParameters.reversibleTransformation;
    var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
    var subbandCoefficients = [];
    var b = 0;
    for (var i = 0; i <= decompositionLevelsCount; i++) {
      var resolution = component.resolutions[i];
      var width = resolution.trx1 - resolution.trx0;
      var height = resolution.try1 - resolution.try0;
      var coefficients = new Float32Array(width * height);
      for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
        var mu, epsilon;
        if (!scalarExpounded) {
          mu = spqcds[0].mu;
          epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
        } else {
          mu = spqcds[b].mu;
          epsilon = spqcds[b].epsilon;
          b++;
        }
        var subband = resolution.subbands[j];
        var gainLog2 = SubbandsGainLog2[subband.type];
        var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
        var mb = guardBits + epsilon - 1;
        copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
      }
      subbandCoefficients.push({
        width: width,
        height: height,
        items: coefficients
      });
    }
    var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
    return {
      left: component.tcx0,
      top: component.tcy0,
      width: result.width,
      height: result.height,
      items: result.items
    };
  }
  function transformComponents(context) {
    var siz = context.SIZ;
    var components = context.components;
    var componentsCount = siz.Csiz;
    var resultImages = [];
    for (var i = 0, ii = context.tiles.length; i < ii; i++) {
      var tile = context.tiles[i];
      var transformedTiles = [];
      var c;
      for (c = 0; c < componentsCount; c++) {
        transformedTiles[c] = transformTile(context, tile, c);
      }
      var tile0 = transformedTiles[0];
      var out = new Uint8Array(tile0.items.length * componentsCount);
      var result = {
        left: tile0.left,
        top: tile0.top,
        width: tile0.width,
        height: tile0.height,
        items: out
      };
      var shift, offset, max, min, maxK;
      var pos = 0,
          j,
          jj,
          y0,
          y1,
          y2,
          r,
          g,
          b,
          k,
          val;
      if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
        var fourComponents = componentsCount === 4;
        var y0items = transformedTiles[0].items;
        var y1items = transformedTiles[1].items;
        var y2items = transformedTiles[2].items;
        var y3items = fourComponents ? transformedTiles[3].items : null;
        shift = components[0].precision - 8;
        offset = (128 << shift) + 0.5;
        max = 255 * (1 << shift);
        maxK = max * 0.5;
        min = -maxK;
        var component0 = tile.components[0];
        var alpha01 = componentsCount - 3;
        jj = y0items.length;
        if (!component0.codingStyleParameters.reversibleTransformation) {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            r = y0 + 1.402 * y2;
            g = y0 - 0.34413 * y1 - 0.71414 * y2;
            b = y0 + 1.772 * y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        } else {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            g = y0 - (y2 + y1 >> 2);
            r = g + y2;
            b = g + y1;
            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
          }
        }
        if (fourComponents) {
          for (j = 0, pos = 3; j < jj; j++, pos += 4) {
            k = y3items[j];
            out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
          }
        }
      } else {
        for (c = 0; c < componentsCount; c++) {
          var items = transformedTiles[c].items;
          shift = components[c].precision - 8;
          offset = (128 << shift) + 0.5;
          max = 127.5 * (1 << shift);
          min = -max;
          for (pos = c, j = 0, jj = items.length; j < jj; j++) {
            val = items[j];
            out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
            pos += componentsCount;
          }
        }
      }
      resultImages.push(result);
    }
    return resultImages;
  }
  function initializeTile(context, tileIndex) {
    var siz = context.SIZ;
    var componentsCount = siz.Csiz;
    var tile = context.tiles[tileIndex];
    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
      component.quantizationParameters = qcdOrQcc;
      var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
      component.codingStyleParameters = codOrCoc;
    }
    tile.codingStyleDefaultParameters = context.currentTile.COD;
  }
  var TagTree = function TagTreeClosure() {
    function TagTree(width, height) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width: width,
          height: height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    TagTree.prototype = {
      reset: function TagTree_reset(i, j) {
        var currentLevel = 0,
            value = 0,
            level;
        while (currentLevel < this.levels.length) {
          level = this.levels[currentLevel];
          var index = i + j * level.width;
          if (level.items[index] !== undefined) {
            value = level.items[index];
            break;
          }
          level.index = index;
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        currentLevel--;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        this.currentLevel = currentLevel;
        delete this.value;
      },
      incrementValue: function TagTree_incrementValue() {
        var level = this.levels[this.currentLevel];
        level.items[level.index]++;
      },
      nextLevel: function TagTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        currentLevel--;
        if (currentLevel < 0) {
          this.value = value;
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return TagTree;
  }();
  var InclusionTree = function InclusionTreeClosure() {
    function InclusionTree(width, height, defaultValue) {
      var levelsLength = log2(Math.max(width, height)) + 1;
      this.levels = [];
      for (var i = 0; i < levelsLength; i++) {
        var items = new Uint8Array(width * height);
        for (var j = 0, jj = items.length; j < jj; j++) {
          items[j] = defaultValue;
        }
        var level = {
          width: width,
          height: height,
          items: items
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }
    InclusionTree.prototype = {
      reset: function InclusionTree_reset(i, j, stopValue) {
        var currentLevel = 0;
        while (currentLevel < this.levels.length) {
          var level = this.levels[currentLevel];
          var index = i + j * level.width;
          level.index = index;
          var value = level.items[index];
          if (value === 0xFF) {
            break;
          }
          if (value > stopValue) {
            this.currentLevel = currentLevel;
            this.propagateValues();
            return false;
          }
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }
        this.currentLevel = currentLevel - 1;
        return true;
      },
      incrementValue: function InclusionTree_incrementValue(stopValue) {
        var level = this.levels[this.currentLevel];
        level.items[level.index] = stopValue + 1;
        this.propagateValues();
      },
      propagateValues: function InclusionTree_propagateValues() {
        var levelIndex = this.currentLevel;
        var level = this.levels[levelIndex];
        var currentValue = level.items[level.index];
        while (--levelIndex >= 0) {
          level = this.levels[levelIndex];
          level.items[level.index] = currentValue;
        }
      },
      nextLevel: function InclusionTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        level.items[level.index] = 0xFF;
        currentLevel--;
        if (currentLevel < 0) {
          return false;
        }
        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return InclusionTree;
  }();
  var BitModel = function BitModelClosure() {
    var UNIFORM_CONTEXT = 17;
    var RUNLENGTH_CONTEXT = 18;
    var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
    var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
    var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);
    function BitModel(width, height, subband, zeroBitPlanes, mb) {
      this.width = width;
      this.height = height;
      this.contextLabelTable = subband === 'HH' ? HHContextLabel : subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel;
      var coefficientCount = width * height;
      this.neighborsSignificance = new Uint8Array(coefficientCount);
      this.coefficentsSign = new Uint8Array(coefficientCount);
      this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
      this.processingFlags = new Uint8Array(coefficientCount);
      var bitsDecoded = new Uint8Array(coefficientCount);
      if (zeroBitPlanes !== 0) {
        for (var i = 0; i < coefficientCount; i++) {
          bitsDecoded[i] = zeroBitPlanes;
        }
      }
      this.bitsDecoded = bitsDecoded;
      this.reset();
    }
    BitModel.prototype = {
      setDecoder: function BitModel_setDecoder(decoder) {
        this.decoder = decoder;
      },
      reset: function BitModel_reset() {
        this.contexts = new Int8Array(19);
        this.contexts[0] = 4 << 1 | 0;
        this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
        this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
      },
      setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
        var neighborsSignificance = this.neighborsSignificance;
        var width = this.width,
            height = this.height;
        var left = column > 0;
        var right = column + 1 < width;
        var i;
        if (row > 0) {
          i = index - width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (row + 1 < height) {
          i = index + width;
          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }
          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }
          neighborsSignificance[i] += 0x04;
        }
        if (left) {
          neighborsSignificance[index - 1] += 0x01;
        }
        if (right) {
          neighborsSignificance[index + 1] += 0x01;
        }
        neighborsSignificance[index] |= 0x80;
      },
      runSignificancePropagationPass: function BitModel_runSignificancePropagationPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var neighborsSignificance = this.neighborsSignificance;
        var processingFlags = this.processingFlags;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processedInverseMask = ~1;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        for (var i0 = 0; i0 < height; i0 += 4) {
          for (var j = 0; j < width; j++) {
            var index = i0 * width + j;
            for (var i1 = 0; i1 < 4; i1++, index += width) {
              var i = i0 + i1;
              if (i >= height) {
                break;
              }
              processingFlags[index] &= processedInverseMask;
              if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision) {
                var sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contribution, sign0, sign1, significance1;
        var contextLabel, decoded;
        significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;
        if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
          sign1 = coefficentsSign[index + 1];
          if (significance1) {
            sign0 = coefficentsSign[index - 1];
            contribution = 1 - sign1 - sign0;
          } else {
            contribution = 1 - sign1 - sign1;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - 1];
          contribution = 1 - sign0 - sign0;
        } else {
          contribution = 0;
        }
        var horizontalContribution = 3 * contribution;
        significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;
        if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
          sign1 = coefficentsSign[index + width];
          if (significance1) {
            sign0 = coefficentsSign[index - width];
            contribution = 1 - sign1 - sign0 + horizontalContribution;
          } else {
            contribution = 1 - sign1 - sign1 + horizontalContribution;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - width];
          contribution = 1 - sign0 - sign0 + horizontalContribution;
        } else {
          contribution = horizontalContribution;
        }
        if (contribution >= 0) {
          contextLabel = 9 + contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel);
        } else {
          contextLabel = 9 - contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
        }
        return decoded;
      },
      runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var neighborsSignificance = this.neighborsSignificance;
        var contexts = this.contexts;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var length = width * height;
        var width4 = width * 4;
        for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
          indexNext = Math.min(length, index0 + width4);
          for (var j = 0; j < width; j++) {
            for (var index = index0 + j; index < indexNext; index += width) {
              if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = 16;
              if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                processingFlags[index] ^= firstMagnitudeBitMask;
                var significance = neighborsSignificance[index] & 127;
                contextLabel = significance === 0 ? 15 : 14;
              }
              var bit = decoder.readBit(contexts, contextLabel);
              coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      runCleanupPass: function BitModel_runCleanupPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var neighborsSignificance = this.neighborsSignificance;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var oneRowDown = width;
        var twoRowsDown = width * 2;
        var threeRowsDown = width * 3;
        var iNext;
        for (var i0 = 0; i0 < height; i0 = iNext) {
          iNext = Math.min(i0 + 4, height);
          var indexBase = i0 * width;
          var checkAllEmpty = i0 + 3 < height;
          for (var j = 0; j < width; j++) {
            var index0 = indexBase + j;
            var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
            var i1 = 0,
                index = index0;
            var i = i0,
                sign;
            if (allEmpty) {
              var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);
              if (!hasSignificantCoefficent) {
                bitsDecoded[index0]++;
                bitsDecoded[index0 + oneRowDown]++;
                bitsDecoded[index0 + twoRowsDown]++;
                bitsDecoded[index0 + threeRowsDown]++;
                continue;
              }
              i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
              if (i1 !== 0) {
                i = i0 + i1;
                index += i1 * width;
              }
              sign = this.decodeSignBit(i, j, index);
              coefficentsSign[index] = sign;
              coefficentsMagnitude[index] = 1;
              this.setNeighborsSignificance(i, j, index);
              processingFlags[index] |= firstMagnitudeBitMask;
              index = index0;
              for (var i2 = i0; i2 <= i; i2++, index += width) {
                bitsDecoded[index]++;
              }
              i1++;
            }
            for (i = i0 + i1; i < iNext; i++, index += width) {
              if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }
              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);
              if (decision === 1) {
                sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }
              bitsDecoded[index]++;
            }
          }
        }
      },
      checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
        var decoder = this.decoder;
        var contexts = this.contexts;
        var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
        if (symbol !== 0xA) {
          error('JPX Error: Invalid segmentation symbol');
        }
      }
    };
    return BitModel;
  }();
  var Transform = function TransformClosure() {
    function Transform() {}
    Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
      var ll = subbands[0];
      for (var i = 1, ii = subbands.length; i < ii; i++) {
        ll = this.iterate(ll, subbands[i], u0, v0);
      }
      return ll;
    };
    Transform.prototype.extend = function extend(buffer, offset, size) {
      var i1 = offset - 1,
          j1 = offset + 1;
      var i2 = offset + size - 2,
          j2 = offset + size;
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1] = buffer[j1];
      buffer[j2] = buffer[i2];
    };
    Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
      var llWidth = ll.width,
          llHeight = ll.height,
          llItems = ll.items;
      var width = hl_lh_hh.width;
      var height = hl_lh_hh.height;
      var items = hl_lh_hh.items;
      var i, j, k, l, u, v;
      for (k = 0, i = 0; i < llHeight; i++) {
        l = i * 2 * width;
        for (j = 0; j < llWidth; j++, k++, l += 2) {
          items[l] = llItems[k];
        }
      }
      llItems = ll.items = null;
      var bufferPadding = 4;
      var rowBuffer = new Float32Array(width + 2 * bufferPadding);
      if (width === 1) {
        if ((u0 & 1) !== 0) {
          for (v = 0, k = 0; v < height; v++, k += width) {
            items[k] *= 0.5;
          }
        }
      } else {
        for (v = 0, k = 0; v < height; v++, k += width) {
          rowBuffer.set(items.subarray(k, k + width), bufferPadding);
          this.extend(rowBuffer, bufferPadding, width);
          this.filter(rowBuffer, bufferPadding, width);
          items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
        }
      }
      var numBuffers = 16;
      var colBuffers = [];
      for (i = 0; i < numBuffers; i++) {
        colBuffers.push(new Float32Array(height + 2 * bufferPadding));
      }
      var b,
          currentBuffer = 0;
      ll = bufferPadding + height;
      if (height === 1) {
        if ((v0 & 1) !== 0) {
          for (u = 0; u < width; u++) {
            items[u] *= 0.5;
          }
        }
      } else {
        for (u = 0; u < width; u++) {
          if (currentBuffer === 0) {
            numBuffers = Math.min(width - u, numBuffers);
            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                colBuffers[b][l] = items[k + b];
              }
            }
            currentBuffer = numBuffers;
          }
          currentBuffer--;
          var buffer = colBuffers[currentBuffer];
          this.extend(buffer, bufferPadding, height);
          this.filter(buffer, bufferPadding, height);
          if (currentBuffer === 0) {
            k = u - numBuffers + 1;
            for (l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                items[k + b] = colBuffers[b][l];
              }
            }
          }
        }
      }
      return {
        width: width,
        height: height,
        items: items
      };
    };
    return Transform;
  }();
  var IrreversibleTransform = function IrreversibleTransformClosure() {
    function IrreversibleTransform() {
      Transform.call(this);
    }
    IrreversibleTransform.prototype = Object.create(Transform.prototype);
    IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n, current, next;
      var alpha = -1.586134342059924;
      var beta = -0.052980118572961;
      var gamma = 0.882911075530934;
      var delta = 0.443506852043971;
      var K = 1.230174104914001;
      var K_ = 1 / K;
      j = offset - 3;
      for (n = len + 4; n--; j += 2) {
        x[j] *= K_;
      }
      j = offset - 2;
      current = delta * x[j - 1];
      for (n = len + 3; n--; j += 2) {
        next = delta * x[j + 1];
        x[j] = K * x[j] - current - next;
        if (n--) {
          j += 2;
          current = delta * x[j + 1];
          x[j] = K * x[j] - current - next;
        } else {
          break;
        }
      }
      j = offset - 1;
      current = gamma * x[j - 1];
      for (n = len + 2; n--; j += 2) {
        next = gamma * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = gamma * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      j = offset;
      current = beta * x[j - 1];
      for (n = len + 1; n--; j += 2) {
        next = beta * x[j + 1];
        x[j] -= current + next;
        if (n--) {
          j += 2;
          current = beta * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }
      if (len !== 0) {
        j = offset + 1;
        current = alpha * x[j - 1];
        for (n = len; n--; j += 2) {
          next = alpha * x[j + 1];
          x[j] -= current + next;
          if (n--) {
            j += 2;
            current = alpha * x[j + 1];
            x[j] -= current + next;
          } else {
            break;
          }
        }
      }
    };
    return IrreversibleTransform;
  }();
  var ReversibleTransform = function ReversibleTransformClosure() {
    function ReversibleTransform() {
      Transform.call(this);
    }
    ReversibleTransform.prototype = Object.create(Transform.prototype);
    ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n;
      for (j = offset, n = len + 1; n--; j += 2) {
        x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
      }
      for (j = offset + 1, n = len; n--; j += 2) {
        x[j] += x[j - 1] + x[j + 1] >> 1;
      }
    };
    return ReversibleTransform;
  }();
  return JpxImage;
}();

	
	"use strict";
    
	var Jbig2Image = function Jbig2ImageClosure() {
  function ContextCache() {}
  ContextCache.prototype = {
    getContexts: function (id) {
      if (id in this) {
        return this[id];
      }
      return this[id] = new Int8Array(1 << 16);
    }
  };
  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }
  DecodingContext.prototype = {
    get decoder() {
      var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
      return shadow(this, 'decoder', decoder);
    },
    get contextCache() {
      var cache = new ContextCache();
      return shadow(this, 'contextCache', cache);
    }
  };
  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;
    function readBits(length) {
      var v = 0;
      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
        v = v << 1 | bit;
      }
      return v >>> 0;
    }
    var sign = readBits(1);
    var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
    return sign === 0 ? value : value > 0 ? -value : null;
  }
  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts('IAID');
    var prev = 1;
    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = prev << 1 | bit;
    }
    if (codeLength < 31) {
      return prev & (1 << codeLength) - 1;
    }
    return prev & 0x7FFFFFFF;
  }
  var SegmentTypes = ['SymbolDictionary', null, null, null, 'IntermediateTextRegion', null, 'ImmediateTextRegion', 'ImmediateLosslessTextRegion', null, null, null, null, null, null, null, null, 'patternDictionary', null, null, null, 'IntermediateHalftoneRegion', null, 'ImmediateHalftoneRegion', 'ImmediateLosslessHalftoneRegion', null, null, null, null, null, null, null, null, null, null, null, null, 'IntermediateGenericRegion', null, 'ImmediateGenericRegion', 'ImmediateLosslessGenericRegion', 'IntermediateGenericRefinementRegion', null, 'ImmediateGenericRefinementRegion', 'ImmediateLosslessGenericRefinementRegion', null, null, null, null, 'PageInformation', 'EndOfPage', 'EndOfStripe', 'EndOfFile', 'Profiles', 'Tables', null, null, null, null, null, null, null, null, 'Extension'];
  var CodingTemplates = [[{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: 2,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -3,
    y: -1
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }]];
  var RefinementTemplates = [{
    coding: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }, {
    coding: [{
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }];
  var ReusedContexts = [0x9B25, 0x0795, 0x00E5, 0x0195];
  var RefinementReusedContexts = [0x0020, 0x0008];
  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var contextLabel,
        i,
        j,
        pixel,
        row,
        row1,
        row2,
        bitmap = [];
    var OLD_PIXEL_MASK = 0x7BF7;
    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = i < 1 ? row : bitmap[i - 1];
      row2 = i < 2 ? row : bitmap[i - 2];
      contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);
        contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }
    return bitmap;
  }
  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
    if (mmr) {
      error('JBIG2 error: MMR encoding is not supported');
    }
    if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }
    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);
    template.sort(function (a, b) {
      return a.y - b.y || a.x - b.x;
    });
    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0,
        minX = 0,
        maxX = 0,
        minY = 0;
    var c, k;
    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);
      if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << templateLength - 1 - k;
      } else {
        changingTemplateEntries.push(k);
      }
    }
    var changingEntriesLength = changingTemplateEntries.length;
    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);
    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << templateLength - 1 - k;
    }
    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;
    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var ltp = 0,
        j,
        i0,
        j0,
        contextLabel = 0,
        bit,
        shift;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          bitmap.push(row);
          continue;
        }
      }
      row = new Uint8Array(row);
      bitmap.push(row);
      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }
        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          contextLabel = contextLabel << 1 & reuseMask;
          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];
            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          contextLabel = 0;
          shift = templateLength - 1;
          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];
            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];
              if (i0 >= 0) {
                bit = bitmap[i0][j0];
                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;
    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }
    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;
    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }
    var referenceTemplate = RefinementTemplates[templateIndex].reference;
    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }
    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);
    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }
    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;
    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');
    var ltp = 0;
    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;
        if (ltp) {
          error('JBIG2 error: prediction is not supported');
        }
      }
      var row = new Uint8Array(width);
      bitmap.push(row);
      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;
        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];
          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | bitmap[i0][j0];
          }
        }
        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] + offsetY;
          j0 = j + referenceTemplateX[k] + offsetX;
          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
          }
        }
        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }
    return bitmap;
  }
  function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = decodeInteger(contextCache, 'IADH', decoder);
      currentHeight += deltaHeight;
      var currentWidth = 0;
      while (true) {
        var deltaWidth = decodeInteger(contextCache, 'IADW', decoder);
        if (deltaWidth === null) {
          break;
        }
        currentWidth += deltaWidth;
        var bitmap;
        if (refinement) {
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);
          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, 'IARDX', decoder);
            var rdy = decodeInteger(contextCache, 'IARDY', decoder);
            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
          }
        } else {
          bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
        }
        newSymbols.push(bitmap);
      }
    }
    var exportedSymbols = [];
    var flags = [],
        currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;
    while (flags.length < totalSymbolsLength) {
      var runLength = decodeInteger(contextCache, 'IAEX', decoder);
      while (runLength--) {
        flags.push(currentFlag);
      }
      currentFlag = !currentFlag;
    }
    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }
    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }
    return exportedSymbols;
  }
  function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext) {
    if (huffman) {
      error('JBIG2 error: huffman is not supported');
    }
    var bitmap = [];
    var i, row;
    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);
      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }
      bitmap.push(row);
    }
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = -decodeInteger(contextCache, 'IADT', decoder);
    var firstS = 0;
    i = 0;
    while (i < numberOfSymbolInstances) {
      var deltaT = decodeInteger(contextCache, 'IADT', decoder);
      stripT += deltaT;
      var deltaFirstS = decodeInteger(contextCache, 'IAFS', decoder);
      firstS += deltaFirstS;
      var currentS = firstS;
      do {
        var currentT = stripSize === 1 ? 0 : decodeInteger(contextCache, 'IAIT', decoder);
        var t = stripSize * stripT + currentT;
        var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement && decodeInteger(contextCache, 'IARI', decoder);
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;
        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder);
          var rdh = decodeInteger(contextCache, 'IARDH', decoder);
          var rdx = decodeInteger(contextCache, 'IARDX', decoder);
          var rdy = decodeInteger(contextCache, 'IARDY', decoder);
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
        }
        var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight);
        var offsetS = currentS - (referenceCorner & 2 ? symbolWidth : 0);
        var s2, t2, symbolRow;
        if (transposed) {
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[s2];
            var maxWidth = Math.min(width - offsetT, symbolWidth);
            switch (combinationOperator) {
              case 0:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }
                break;
              case 2:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];
            if (!row) {
              continue;
            }
            symbolRow = symbolBitmap[t2];
            switch (combinationOperator) {
              case 0:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }
                break;
              case 2:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }
                break;
              default:
                error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
            }
          }
          currentS += symbolWidth - 1;
        }
        i++;
        var deltaS = decodeInteger(contextCache, 'IADS', decoder);
        if (deltaS === null) {
          break;
        }
        currentS += deltaS + dsOffset;
      } while (true);
    }
    return bitmap;
  }
  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = readUint32(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;
    if (!SegmentTypes[segmentType]) {
      error('JBIG2 error: invalid segment type: ' + segmentType);
    }
    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = referredFlags >> 5 & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;
    if (referredFlags === 7) {
      referredToCount = readUint32(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = referredToCount + 7 >> 3;
      retainBits[0] = data[position++];
      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      error('JBIG2 error: invalid referred-to flags');
    }
    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
    var referredTo = [];
    var i, ii;
    for (i = 0; i < referredToCount; i++) {
      var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? readUint16(data, position) : readUint32(data, position);
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }
    segmentHeader.referredTo = referredTo;
    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = readUint32(data, position);
      position += 4;
    }
    segmentHeader.length = readUint32(data, position);
    position += 4;
    if (segmentHeader.length === 0xFFFFFFFF) {
      if (segmentType === 38) {
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);
        if (!genericRegionMmr) {
          searchPattern[0] = 0xFF;
          searchPattern[1] = 0xAC;
        }
        searchPattern[2] = genericRegionInfo.height >>> 24 & 0xFF;
        searchPattern[3] = genericRegionInfo.height >> 16 & 0xFF;
        searchPattern[4] = genericRegionInfo.height >> 8 & 0xFF;
        searchPattern[5] = genericRegionInfo.height & 0xFF;
        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;
          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }
          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }
        if (segmentHeader.length === 0xFFFFFFFF) {
          error('JBIG2 error: segment end was not found');
        }
      } else {
        error('JBIG2 error: invalid unknown segment length');
      }
    }
    segmentHeader.headerEnd = position;
    return segmentHeader;
  }
  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;
    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };
      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }
      segments.push(segment);
      if (segmentHeader.type === 51) {
        break;
      }
    }
    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }
    return segments;
  }
  function readRegionSegmentInformation(data, start) {
    return {
      width: readUint32(data, start),
      height: readUint32(data, start + 4),
      x: readUint32(data, start + 8),
      y: readUint32(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }
  var RegionSegmentInformationFieldLength = 17;
  function processSegment(segment, visitor) {
    var header = segment.header;
    var data = segment.data,
        position = segment.start,
        end = segment.end;
    var args, at, i, atLength;
    switch (header.type) {
      case 0:
        var dictionary = {};
        var dictionaryFlags = readUint16(data, position);
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
        dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
        dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
        dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = dictionaryFlags >> 10 & 3;
        dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
        position += 2;
        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.at = at;
        }
        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          dictionary.refinementAt = at;
        }
        dictionary.numberOfExportedSymbols = readUint32(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = readUint32(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo, data, position, end];
        break;
      case 6:
      case 7:
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = readUint16(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.stripSize = 1 << (textRegionSegmentFlags >> 2 & 3);
        textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
        textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
        textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
        textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
        if (textRegion.huffman) {
          var textRegionHuffmanFlags = readUint16(data, position);
          position += 2;
          textRegion.huffmanFS = textRegionHuffmanFlags & 3;
          textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
          textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
          textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
          textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
          textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
          textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
          textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 14);
        }
        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];
          for (i = 0; i < 2; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          textRegion.refinementAt = at;
        }
        textRegion.numberOfSymbolInstances = readUint32(data, position);
        position += 4;
        if (textRegion.huffman) {
          error('JBIG2 error: huffman is not supported');
        }
        args = [textRegion, header.referredTo, data, position, end];
        break;
      case 38:
      case 39:
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];
          for (i = 0; i < atLength; i++) {
            at.push({
              x: readInt8(data, position),
              y: readInt8(data, position + 1)
            });
            position += 2;
          }
          genericRegion.at = at;
        }
        args = [genericRegion, data, position, end];
        break;
      case 48:
        var pageInfo = {
          width: readUint32(data, position),
          height: readUint32(data, position + 4),
          resolutionX: readUint32(data, position + 8),
          resolutionY: readUint32(data, position + 12)
        };
        if (pageInfo.height === 0xFFFFFFFF) {
          delete pageInfo.height;
        }
        var pageSegmentFlags = data[position + 16];
        readUint16(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
        pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;
      case 49:
        break;
      case 50:
        break;
      case 51:
        break;
      case 62:
        break;
      default:
        error('JBIG2 error: segment type ' + header.typeName + '(' + header.type + ') is not implemented');
    }
    var callbackName = 'on' + header.typeName;
    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }
  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }
  function parseJbig2(data, start, end) {
    var position = start;
    if (data[position] !== 0x97 || data[position + 1] !== 0x4A || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0D || data[position + 5] !== 0x0A || data[position + 6] !== 0x1A || data[position + 7] !== 0x0A) {
      error('JBIG2 error: invalid header');
    }
    var header = {};
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);
    if (!(flags & 2)) {
      header.numberOfPages = readUint32(data, position);
      position += 4;
    }
    readSegments(header, data, position, end);
    error('Not implemented');
  }
  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();
    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }
    return visitor.buffer;
  }
  function SimpleSegmentVisitor() {}
  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = info.width + 7 >> 3;
      var buffer = new Uint8Array(rowSize * info.height);
      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xFF;
        }
      }
      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width,
          height = regionInfo.height;
      var rowSize = pageInfo.width + 7 >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 = 128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;
      switch (combinationOperator) {
        case 0:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        case 2:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;
            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }
              mask >>= 1;
              if (!mask) {
                mask = 128;
                offset++;
              }
            }
            offset0 += rowSize;
          }
          break;
        default:
          error('JBIG2 error: operator ' + combinationOperator + ' is not supported');
      }
    },
    onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
      var huffmanTables;
      if (dictionary.huffman) {
        error('JBIG2 error: huffman is not supported');
      }
      var symbols = this.symbols;
      if (!symbols) {
        this.symbols = symbols = {};
      }
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext);
    },
    onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
      var regionInfo = region.info;
      var huffmanTables;
      var symbols = this.symbols;
      var inputSymbols = [];
      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
      }
      var symbolCodeLength = log2(inputSymbols.length);
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    }
  };
  function Jbig2Image() {}
  Jbig2Image.prototype = {
    parseChunks: function Jbig2Image_parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    }
  };
  return Jbig2Image;
}();


	
	
	
	function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
            n <<= 1;
            i++;
        }
        return i;
    }
    function readInt8(data, start) {
        return data[start] << 24 >> 24;
    }
    function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
    }
    function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
    }
    function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
        });
        return value;
    }
    var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
    };
    var warn = function() {
        console.warn.apply(console, arguments);
    };
    var info = function() {
        console.info.apply(console, arguments);
    };
    Jbig2Image.prototype.parse = function parseJbig2(data) {
        var position = 0, end = data.length;
        if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
            error("JBIG2 error: invalid header");
        }
        var header = {};
        position += 8;
        var flags = data[position++];
        header.randomAccess = !(flags & 1);
        if (!(flags & 2)) {
            header.numberOfPages = readUint32(data, position);
            position += 4;
        }
        var visitor = this.parseChunks([ {
            data: data,
            start: position,
            end: end
        } ]);
        var width = visitor.currentPageInfo.width;
        var height = visitor.currentPageInfo.height;
        var bitPacked = visitor.buffer;
        var data = new Uint8Array(width * height);
        var q = 0, k = 0;
        for (var i = 0; i < height; i++) {
            var mask = 0, buffer;
            for (var j = 0; j < width; j++) {
                if (!mask) {
                    mask = 128;
                    buffer = bitPacked[k++];
                }
                data[q++] = buffer & mask ? 0 : 255;
                mask >>= 1;
            }
        }
        this.width = width;
        this.height = height;
        this.data = data;
    };
    PDFJS.JpegImage = JpegImage;
    PDFJS.JpxImage = JpxImage;
    PDFJS.Jbig2Image = Jbig2Image;
})(PDFJS || (PDFJS = {}));


;(function(){var o,X=0,e=null,n=null;o=window.FFT={};var f={o:function(G){if(G!==0&&(G&G-1)===0){X=G;
f.B();f.q();f.i()}else{throw new Error("init: radix-2 required")}},X:function(G,B){f.G(G,B,1)},e:function(G,B){var j=1/X;
f.G(G,B,-1);for(var q=0;q<X;q++){G[q]*=j;B[q]*=j}},n:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;
m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];q[Z]=B[Z+i]}f.X(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;
C<X;C++){for(var a=0;a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.X(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];
B[i]=q[r]}}},f:function(G,B){var j=[],q=[],i=0;for(var m=0;m<X;m++){i=m*X;for(var Z=0;Z<X;Z++){j[Z]=G[Z+i];
q[Z]=B[Z+i]}f.e(j,q);for(var p=0;p<X;p++){G[p+i]=j[p];B[p+i]=q[p]}}for(var C=0;C<X;C++){for(var a=0;
a<X;a++){i=C+a*X;j[a]=G[i];q[a]=B[i]}f.e(j,q);for(var r=0;r<X;r++){i=C+r*X;G[i]=j[r];B[i]=q[r]}}},G:function(G,B,j){var q,i,m,Z,p,C,a,r,M,R=X>>2;
for(var P=0;P<X;P++){Z=e[P];if(P<Z){p=G[P];G[P]=G[Z];G[Z]=p;p=B[P];B[P]=B[Z];B[Z]=p}}for(var y=1;y<X;
y<<=1){i=0;q=X/(y<<1);for(var x=0;x<y;x++){C=n[i+R];a=j*n[i];for(var t=x;t<X;t+=y<<1){m=t+y;r=C*G[m]+a*B[m];
M=C*B[m]-a*G[m];G[m]=G[t]-r;G[t]+=r;B[m]=B[t]-M;B[t]+=M}i+=q}}},B:function(){var G=Uint32Array;if(X<=256)G=Uint8Array;
else if(X<=65536)G=Uint16Array;e=new G(X);n=new Float64Array(X*1.25)},j:function(){},q:function(){var G=0,B=0,q=0;
e[0]=0;while(++G<X){q=X>>1;while(q<=B){B-=q;q>>=1}B+=q;e[G]=B}},i:function(){var G=X>>1,B=X>>2,j=X>>3,q=G+B,i=Math.sin(Math.PI/X),m=2*i*i,Z=Math.sqrt(m*(2-m)),p=n[B]=1,C=n[0]=0;
i=2*m;for(var a=1;a<j;a++){p-=m;m+=i*p;C+=Z;Z-=i*C;n[a]=C;n[B-a]=p}if(j!==0){n[j]=Math.sqrt(.5)}for(var r=0;
r<B;r++){n[G-r]=n[r]}for(var M=0;M<q;M++){n[M+G]=-n[M]}}};o.init=f.o;o.fft2d=f.n;o.ifft2d=f.f}.call(this));
	
(function(r){"object"===typeof exports&&"undefined"!==typeof module?module.exports=r():"function"===typeof define&&define.amd?define([],r):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).acorn=r()})(function(){return function a(l,f,c){function g(d,n){if(!f[d]){if(!l[d]){var e="function"==typeof require&&require;if(!n&&e)return e(d,!0);if(b)return b(d,!0);e=Error("Cannot find module '"+d+"'");throw e.code="MODULE_NOT_FOUND",e;}e=f[d]={exports:{}};
l[d][0].call(e.exports,function(b){var e=l[d][1][b];return g(e?e:b)},e,e.exports,a,l,f,c)}return f[d].exports}for(var b="function"==typeof require&&require,d=0;d<c.length;d++)g(c[d]);return g}({1:[function(a,l,f){var c=a("./tokentype");a=a("./state").Parser.prototype;a.checkPropClash=function(b,c){if(!(6<=this.options.ecmaVersion&&(b.computed||b.method||b.shorthand))){var d=b.key;switch(d.type){case "Identifier":var a=d.name;break;case "Literal":a=String(d.value);break;default:return}var e=b.kind;
if(6<=this.options.ecmaVersion)"__proto__"===a&&"init"===e&&(c.proto&&this.raiseRecoverable(d.start,"Redefinition of __proto__ property"),c.proto=!0);else{a="$"+a;var m=c[a];m?(a="init"!==e,(!this.strict&&!a||!m[e])&&a^m.init||this.raiseRecoverable(d.start,"Redefinition of property")):m=c[a]={init:!1,get:!1,set:!1};m[e]=!0}}};a.parseExpression=function(b,a){var d=this.start,n=this.startLoc,e=this.parseMaybeAssign(b,a);if(this.type===c.types.comma){d=this.startNodeAt(d,n);for(d.expressions=[e];this.eat(c.types.comma);)d.expressions.push(this.parseMaybeAssign(b,
a));return this.finishNode(d,"SequenceExpression")}return e};a.parseMaybeAssign=function(b,a,h){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield();var d=!1;a||(a={shorthandAssign:0,trailingComma:0},d=!0);var e=this.start,m=this.startLoc;if(this.type==c.types.parenL||this.type==c.types.name)this.potentialArrowAt=this.start;var p=this.parseMaybeConditional(b,a);h&&(p=h.call(this,p,e,m));if(this.type.isAssign)return d&&this.checkPatternErrors(a,!0),h=this.startNodeAt(e,m),h.operator=
this.value,h.left=this.type===c.types.eq?this.toAssignable(p):p,a.shorthandAssign=0,this.checkLVal(p),this.next(),h.right=this.parseMaybeAssign(b),this.finishNode(h,"AssignmentExpression");d&&this.checkExpressionErrors(a,!0);return p};a.parseMaybeConditional=function(b,a){var d=this.start,n=this.startLoc,e=this.parseExprOps(b,a);return this.checkExpressionErrors(a)?e:this.eat(c.types.question)?(d=this.startNodeAt(d,n),d.test=e,d.consequent=this.parseMaybeAssign(),this.expect(c.types.colon),d.alternate=
this.parseMaybeAssign(b),this.finishNode(d,"ConditionalExpression")):e};a.parseExprOps=function(b,c){var a=this.start,d=this.startLoc,e=this.parseMaybeUnary(c,!1);return this.checkExpressionErrors(c)?e:this.parseExprOp(e,a,d,-1,b)};a.parseExprOp=function(b,a,h,n,e){var d=this.type.binop;if(null!=d&&(!e||this.type!==c.types._in)&&d>n){var p=this.type===c.types.logicalOR||this.type===c.types.logicalAND,g=this.value;this.next();var k=this.start,q=this.startLoc,d=this.parseExprOp(this.parseMaybeUnary(null,
!1),k,q,d,e);b=this.buildBinary(a,h,b,d,g,p);return this.parseExprOp(b,a,h,n,e)}return b};a.buildBinary=function(b,c,a,n,e,m){b=this.startNodeAt(b,c);b.left=a;b.operator=e;b.right=n;return this.finishNode(b,m?"LogicalExpression":"BinaryExpression")};a.parseMaybeUnary=function(b,a){var d=this.start,n=this.startLoc;if(this.type.prefix){var e=this.startNode();var m=this.type===c.types.incDec;e.operator=this.value;e.prefix=!0;this.next();e.argument=this.parseMaybeUnary(null,!0);this.checkExpressionErrors(b,
!0);m?this.checkLVal(e.argument):this.strict&&"delete"===e.operator&&"Identifier"===e.argument.type?this.raiseRecoverable(e.start,"Deleting local variable in strict mode"):a=!0;m=this.finishNode(e,m?"UpdateExpression":"UnaryExpression")}else{m=this.parseExprSubscripts(b);if(this.checkExpressionErrors(b))return m;for(;this.type.postfix&&!this.canInsertSemicolon();)e=this.startNodeAt(d,n),e.operator=this.value,e.prefix=!1,e.argument=m,this.checkLVal(m),this.next(),m=this.finishNode(e,"UpdateExpression")}return!a&&
this.eat(c.types.starstar)?this.buildBinary(d,n,m,this.parseMaybeUnary(null,!1),"**",!1):m};a.parseExprSubscripts=function(b){var c=this.start,a=this.startLoc,n=this.parseExprAtom(b),e="ArrowFunctionExpression"===n.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);return this.checkExpressionErrors(b)||e?n:this.parseSubscripts(n,c,a)};a.parseSubscripts=function(b,a,h,n){for(var e;;)if(this.eat(c.types.dot))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseIdent(!0),e.computed=!1,
b=this.finishNode(e,"MemberExpression");else if(this.eat(c.types.bracketL))e=this.startNodeAt(a,h),e.object=b,e.property=this.parseExpression(),e.computed=!0,this.expect(c.types.bracketR),b=this.finishNode(e,"MemberExpression");else if(!n&&this.eat(c.types.parenL))e=this.startNodeAt(a,h),e.callee=b,e.arguments=this.parseExprList(c.types.parenR,!1),b=this.finishNode(e,"CallExpression");else if(this.type===c.types.backQuote)e=this.startNodeAt(a,h),e.tag=b,e.quasi=this.parseTemplate(),b=this.finishNode(e,
"TaggedTemplateExpression");else return b};a.parseExprAtom=function(b){var a=this.potentialArrowAt==this.start;switch(this.type){case c.types._super:this.inFunction||this.raise(this.start,"'super' outside of function or class");case c.types._this:return b=this.type===c.types._this?"ThisExpression":"Super",a=this.startNode(),this.next(),this.finishNode(a,b);case c.types.name:b=this.start;var h=this.startLoc,n=this.parseIdent(this.type!==c.types.name);return a&&!this.canInsertSemicolon()&&this.eat(c.types.arrow)?
this.parseArrowExpression(this.startNodeAt(b,h),[n]):n;case c.types.regexp:return b=this.value,a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case c.types.num:case c.types.string:return this.parseLiteral(this.value);case c.types._null:case c.types._true:case c.types._false:return a=this.startNode(),a.value=this.type===c.types._null?null:this.type===c.types._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case c.types.parenL:return this.parseParenAndDistinguishExpression(a);
case c.types.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(c.types.bracketR,!0,!0,b),this.finishNode(a,"ArrayExpression");case c.types.braceL:return this.parseObj(!1,b);case c.types._function:return a=this.startNode(),this.next(),this.parseFunction(a,!1);case c.types._class:return this.parseClass(this.startNode(),!1);case c.types._new:return this.parseNew();case c.types.backQuote:return this.parseTemplate();default:this.unexpected()}};a.parseLiteral=function(b){var a=
this.startNode();a.value=b;a.raw=this.input.slice(this.start,this.end);this.next();return this.finishNode(a,"Literal")};a.parseParenExpression=function(){this.expect(c.types.parenL);var b=this.parseExpression();this.expect(c.types.parenR);return b};a.parseParenAndDistinguishExpression=function(b){var a=this.start,h=this.startLoc;if(6<=this.options.ecmaVersion){this.next();for(var n=this.start,e=this.startLoc,m=[],p=!0,g={shorthandAssign:0,trailingComma:0},k=void 0,q=void 0;this.type!==c.types.parenR;)if(p?
p=!1:this.expect(c.types.comma),this.type===c.types.ellipsis){k=this.start;m.push(this.parseParenItem(this.parseRest()));break}else this.type!==c.types.parenL||q||(q=this.start),m.push(this.parseMaybeAssign(!1,g,this.parseParenItem));var p=this.start,f=this.startLoc;this.expect(c.types.parenR);if(b&&!this.canInsertSemicolon()&&this.eat(c.types.arrow))return this.checkPatternErrors(g,!0),q&&this.unexpected(q),this.parseParenArrowList(a,h,m);m.length||this.unexpected(this.lastTokStart);k&&this.unexpected(k);
this.checkExpressionErrors(g,!0);1<m.length?(b=this.startNodeAt(n,e),b.expressions=m,this.finishNodeAt(b,"SequenceExpression",p,f)):b=m[0]}else b=this.parseParenExpression();return this.options.preserveParens?(a=this.startNodeAt(a,h),a.expression=b,this.finishNode(a,"ParenthesizedExpression")):b};a.parseParenItem=function(b){return b};a.parseParenArrowList=function(b,a,c){return this.parseArrowExpression(this.startNodeAt(b,a),c)};var g=[];a.parseNew=function(){var b=this.startNode(),a=this.parseIdent(!0);
if(6<=this.options.ecmaVersion&&this.eat(c.types.dot))return b.meta=a,b.property=this.parseIdent(!0),"target"!==b.property.name&&this.raiseRecoverable(b.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(b.start,"new.target can only be used in functions"),this.finishNode(b,"MetaProperty");var a=this.start,h=this.startLoc;b.callee=this.parseSubscripts(this.parseExprAtom(),a,h,!0);this.eat(c.types.parenL)?b.arguments=this.parseExprList(c.types.parenR,
!1):b.arguments=g;return this.finishNode(b,"NewExpression")};a.parseTemplateElement=function(){var b=this.startNode();b.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value};this.next();b.tail=this.type===c.types.backQuote;return this.finishNode(b,"TemplateElement")};a.parseTemplate=function(){var b=this.startNode();this.next();b.expressions=[];var a=this.parseTemplateElement();for(b.quasis=[a];!a.tail;)this.expect(c.types.dollarBraceL),b.expressions.push(this.parseExpression()),
this.expect(c.types.braceR),b.quasis.push(a=this.parseTemplateElement());this.next();return this.finishNode(b,"TemplateLiteral")};a.parseObj=function(b,a){var d=this.startNode(),n=!0,e={};d.properties=[];for(this.next();!this.eat(c.types.braceR);){if(n)n=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var m=this.startNode(),p=void 0,g=void 0,k=void 0;if(6<=this.options.ecmaVersion){m.method=!1;m.shorthand=!1;if(b||a)g=this.start,k=this.startLoc;b||(p=this.eat(c.types.star))}this.parsePropertyName(m);
this.parsePropertyValue(m,b,p,g,k,a);this.checkPropClash(m,e);d.properties.push(this.finishNode(m,"Property"))}return this.finishNode(d,b?"ObjectPattern":"ObjectExpression")};a.parsePropertyValue=function(b,a,h,n,e,m){this.eat(c.types.colon)?(b.value=a?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,m),b.kind="init"):6<=this.options.ecmaVersion&&this.type===c.types.parenL?(a&&this.unexpected(),b.kind="init",b.method=!0,b.value=this.parseMethod(h)):5<=this.options.ecmaVersion&&
!b.computed&&"Identifier"===b.key.type&&("get"===b.key.name||"set"===b.key.name)&&this.type!=c.types.comma&&this.type!=c.types.braceR?((h||a)&&this.unexpected(),b.kind=b.key.name,this.parsePropertyName(b),b.value=this.parseMethod(!1),b.value.params.length!==("get"===b.kind?0:1)&&(a=b.value.start,"get"===b.kind?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")),"set"===b.kind&&"RestElement"===b.value.params[0].type&&this.raiseRecoverable(b.value.params[0].start,
"Setter cannot use rest params")):6<=this.options.ecmaVersion&&!b.computed&&"Identifier"===b.key.type?(b.kind="init",a?((this.keywords.test(b.key.name)||(this.strict?this.reservedWordsStrictBind:this.reservedWords).test(b.key.name)||this.inGenerator&&"yield"==b.key.name)&&this.raiseRecoverable(b.key.start,"Binding "+b.key.name),b.value=this.parseMaybeDefault(n,e,b.key)):this.type===c.types.eq&&m?(m.shorthandAssign||(m.shorthandAssign=this.start),b.value=this.parseMaybeDefault(n,e,b.key)):b.value=
b.key,b.shorthand=!0):this.unexpected()};a.parsePropertyName=function(b){if(6<=this.options.ecmaVersion){if(this.eat(c.types.bracketL))return b.computed=!0,b.key=this.parseMaybeAssign(),this.expect(c.types.bracketR),b.key;b.computed=!1}return b.key=this.type===c.types.num||this.type===c.types.string?this.parseExprAtom():this.parseIdent(!0)};a.initFunction=function(b){b.id=null;6<=this.options.ecmaVersion&&(b.generator=!1,b.expression=!1)};a.parseMethod=function(b){var a=this.startNode(),h=this.inGenerator;
this.inGenerator=b;this.initFunction(a);this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1);6<=this.options.ecmaVersion&&(a.generator=b);this.parseFunctionBody(a,!1);this.inGenerator=h;return this.finishNode(a,"FunctionExpression")};a.parseArrowExpression=function(b,a){var c=this.inGenerator;this.inGenerator=!1;this.initFunction(b);b.params=this.toAssignableList(a,!0);this.parseFunctionBody(b,!0);this.inGenerator=c;return this.finishNode(b,"ArrowFunctionExpression")};
a.parseFunctionBody=function(b,a){var d=a&&this.type!==c.types.braceL;if(d)b.body=this.parseMaybeAssign(),b.expression=!0;else{var n=this.inFunction,e=this.labels;this.inFunction=!0;this.labels=[];b.body=this.parseBlock(!0);b.expression=!1;this.inFunction=n;this.labels=e}this.strict||!d&&b.body.body.length&&this.isUseStrict(b.body.body[0])?(d=this.strict,this.strict=!0,b.id&&this.checkLVal(b.id,!0),this.checkParams(b),this.strict=d):a&&this.checkParams(b)};a.checkParams=function(b){for(var a={},c=
0;c<b.params.length;c++)this.checkLVal(b.params[c],!0,a)};a.parseExprList=function(b,a,h,n){for(var e=[],d=!0;!this.eat(b);){if(d)d=!1;else if(this.expect(c.types.comma),a&&this.afterTrailingComma(b))break;if(h&&this.type===c.types.comma)var p=null;else this.type===c.types.ellipsis?(p=this.parseSpread(n),this.type===c.types.comma&&n&&!n.trailingComma&&(n.trailingComma=this.lastTokStart)):p=this.parseMaybeAssign(!1,n);e.push(p)}return e};a.parseIdent=function(b){var a=this.startNode();b&&"never"==
this.options.allowReserved&&(b=!1);this.type===c.types.name?(!b&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(this.value)&&(6<=this.options.ecmaVersion||-1==this.input.slice(this.start,this.end).indexOf("\\"))&&this.raiseRecoverable(this.start,"The keyword '"+this.value+"' is reserved"),!b&&this.inGenerator&&"yield"===this.value&&this.raiseRecoverable(this.start,"Can not use 'yield' as identifier inside a generator"),a.name=this.value):b&&this.type.keyword?a.name=this.type.keyword:
this.unexpected();this.next();return this.finishNode(a,"Identifier")};a.parseYield=function(){var b=this.startNode();this.next();this.type==c.types.semi||this.canInsertSemicolon()||this.type!=c.types.star&&!this.type.startsExpr?(b.delegate=!1,b.argument=null):(b.delegate=this.eat(c.types.star),b.argument=this.parseMaybeAssign());return this.finishNode(b,"YieldExpression")}},{"./state":10,"./tokentype":14}],2:[function(a,l,f){function c(b,a){for(var e=65536,c=0;c<a.length;c+=2){e+=a[c];if(e>b)return!1;
e+=a[c+1];if(e>=b)return!0}}f.__esModule=!0;f.isIdentifierStart=function(b,a){return 65>b?36===b:91>b?!0:97>b?95===b:123>b?!0:65535>=b?170<=b&&g.test(String.fromCharCode(b)):!1===a?!1:c(b,d)};f.isIdentifierChar=function(a,e){return 48>a?36===a:58>a?!0:65>a?!1:91>a?!0:97>a?95===a:123>a?!0:65535>=a?170<=a&&b.test(String.fromCharCode(a)):!1===e?!1:c(a,d)||c(a,h)};f.reservedWords={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
5:"class enum extends super const export import",6:"enum",7:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"};f.keywords={5:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",6:"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super"};
a="\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0-\u08b4\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fd5\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ad\ua7b0-\ua7b7\ua7f7-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab65\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var g=new RegExp("["+a+"]"),b=new RegExp("["+a+"\u200c\u200d\u00b7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d01-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1cf8\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]");
a=null;var d=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,99,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,287,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,1288,
921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,16481,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,1340,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],h=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,
41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,168,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,316,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,20855,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,3617,6,792618,239]},{}],3:[function(a,l,f){f.__esModule=!0;f.parse=function(a,b){return(new c.Parser(b,a)).parse()};f.parseExpressionAt=function(a,b,d){a=new c.Parser(d,a,b);a.nextToken();
return a.parseExpression()};f.tokenizer=function(a,b){return new c.Parser(b,a)};var c=a("./state");a("./parseutil");a("./statement");a("./lval");a("./expression");a("./location");f.Parser=c.Parser;f.plugins=c.plugins;l=a("./options");f.defaultOptions=l.defaultOptions;l=a("./locutil");f.Position=l.Position;f.SourceLocation=l.SourceLocation;f.getLineInfo=l.getLineInfo;l=a("./node");f.Node=l.Node;l=a("./tokentype");f.TokenType=l.TokenType;f.tokTypes=l.types;l=a("./tokencontext");f.TokContext=l.TokContext;
f.tokContexts=l.types;l=a("./identifier");f.isIdentifierChar=l.isIdentifierChar;f.isIdentifierStart=l.isIdentifierStart;l=a("./tokenize");f.Token=l.Token;a=a("./whitespace");f.isNewLine=a.isNewLine;f.lineBreak=a.lineBreak;f.lineBreakG=a.lineBreakG;f.version="3.1.0"},{"./expression":1,"./identifier":2,"./location":4,"./locutil":5,"./lval":6,"./node":7,"./options":8,"./parseutil":9,"./state":10,"./statement":11,"./tokencontext":12,"./tokenize":13,"./tokentype":14,"./whitespace":16}],4:[function(a,l,
f){l=a("./state");var c=a("./locutil");a=l.Parser.prototype;a.raise=function(a,b){var d=c.getLineInfo(this.input,a);b+=" ("+d.line+":"+d.column+")";var h=new SyntaxError(b);h.pos=a;h.loc=d;h.raisedAt=this.pos;throw h;};a.raiseRecoverable=a.raise;a.curPosition=function(){if(this.options.locations)return new c.Position(this.curLine,this.pos-this.lineStart)}},{"./locutil":5,"./state":10}],5:[function(a,l,f){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function");
}f.__esModule=!0;f.getLineInfo=function(a,c){for(var d=1,e=0;;){g.lineBreakG.lastIndex=e;var m=g.lineBreakG.exec(a);if(m&&m.index<c)++d,e=m.index+m[0].length;else return new b(d,c-e)}};var g=a("./whitespace"),b=function(){function a(b,d){c(this,a);this.line=b;this.column=d}a.prototype.offset=function(b){return new a(this.line,this.column+b)};return a}();f.Position=b;f.SourceLocation=function h(a,b,m){c(this,h);this.start=b;this.end=m;null!==a.sourceFile&&(this.source=a.sourceFile)}},{"./whitespace":16}],
6:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./util");a=l.Parser.prototype;a.toAssignable=function(a,c){if(6<=this.options.ecmaVersion&&a)switch(a.type){case "Identifier":case "ObjectPattern":case "ArrayPattern":break;case "ObjectExpression":a.type="ObjectPattern";for(var b=0;b<a.properties.length;b++){var d=a.properties[b];"init"!==d.kind&&this.raise(d.key.start,"Object pattern can't contain getter or setter");this.toAssignable(d.value,c)}break;case "ArrayExpression":a.type=
"ArrayPattern";this.toAssignableList(a.elements,c);break;case "AssignmentExpression":if("="===a.operator)a.type="AssignmentPattern",delete a.operator;else{this.raise(a.left.end,"Only '=' operator can be used for specifying default value.");break}case "AssignmentPattern":"YieldExpression"===a.right.type&&this.raise(a.right.start,"Yield expression cannot be a default value");break;case "ParenthesizedExpression":a.expression=this.toAssignable(a.expression,c);break;case "MemberExpression":if(!c)break;
default:this.raise(a.start,"Assigning to rvalue")}return a};a.toAssignableList=function(a,c){var b=a.length;if(b){var d=a[b-1];if(d&&"RestElement"==d.type)--b;else if(d&&"SpreadElement"==d.type){d.type="RestElement";var e=d.argument;this.toAssignable(e,c);"Identifier"!==e.type&&"MemberExpression"!==e.type&&"ArrayPattern"!==e.type&&this.unexpected(e.start);--b}c&&"RestElement"===d.type&&"Identifier"!==d.argument.type&&this.unexpected(d.argument.start)}for(d=0;d<b;d++)(e=a[d])&&this.toAssignable(e,
c);return a};a.parseSpread=function(a){var b=this.startNode();this.next();b.argument=this.parseMaybeAssign(a);return this.finishNode(b,"SpreadElement")};a.parseRest=function(a){var b=this.startNode();this.next();b.argument=a?this.type===c.types.name?this.parseIdent():this.unexpected():this.type===c.types.name||this.type===c.types.bracketL?this.parseBindingAtom():this.unexpected();return this.finishNode(b,"RestElement")};a.parseBindingAtom=function(){if(6>this.options.ecmaVersion)return this.parseIdent();
switch(this.type){case c.types.name:return this.parseIdent();case c.types.bracketL:var a=this.startNode();this.next();a.elements=this.parseBindingList(c.types.bracketR,!0,!0);return this.finishNode(a,"ArrayPattern");case c.types.braceL:return this.parseObj(!0);default:this.unexpected()}};a.parseBindingList=function(a,d,h,n){for(var b=[],m=!0;!this.eat(a);)if(m?m=!1:this.expect(c.types.comma),d&&this.type===c.types.comma)b.push(null);else if(h&&this.afterTrailingComma(a))break;else if(this.type===
c.types.ellipsis){d=this.parseRest(n);this.parseBindingListItem(d);b.push(d);this.type===c.types.comma&&this.raise(this.start,"Comma is not permitted after the rest element");this.expect(a);break}else{var p=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(p);b.push(p)}return b};a.parseBindingListItem=function(a){return a};a.parseMaybeDefault=function(a,d,h){h=h||this.parseBindingAtom();if(6>this.options.ecmaVersion||!this.eat(c.types.eq))return h;a=this.startNodeAt(a,d);
a.left=h;a.right=this.parseMaybeAssign();return this.finishNode(a,"AssignmentPattern")};a.checkLVal=function(a,c,h){switch(a.type){case "Identifier":this.strict&&this.reservedWordsStrictBind.test(a.name)&&this.raiseRecoverable(a.start,(c?"Binding ":"Assigning to ")+a.name+" in strict mode");h&&(g.has(h,a.name)&&this.raiseRecoverable(a.start,"Argument name clash"),h[a.name]=!0);break;case "MemberExpression":c&&this.raiseRecoverable(a.start,(c?"Binding":"Assigning to")+" member expression");break;case "ObjectPattern":for(var b=
0;b<a.properties.length;b++)this.checkLVal(a.properties[b].value,c,h);break;case "ArrayPattern":for(b=0;b<a.elements.length;b++){var e=a.elements[b];e&&this.checkLVal(e,c,h)}break;case "AssignmentPattern":this.checkLVal(a.left,c,h);break;case "RestElement":this.checkLVal(a.argument,c,h);break;case "ParenthesizedExpression":this.checkLVal(a.expression,c,h);break;default:this.raise(a.start,(c?"Binding":"Assigning to")+" rvalue")}}},{"./state":10,"./tokentype":14,"./util":15}],7:[function(a,l,f){function c(a,
b,c,e){a.type=b;a.end=c;this.options.locations&&(a.loc.end=e);this.options.ranges&&(a.range[1]=c);return a}f.__esModule=!0;l=a("./state");var g=a("./locutil"),b=function h(a,b,c){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.type="";this.start=b;this.end=0;a.options.locations&&(this.loc=new g.SourceLocation(a,c));a.options.directSourceFile&&(this.sourceFile=a.options.directSourceFile);a.options.ranges&&(this.range=[b,0])};f.Node=b;a=l.Parser.prototype;a.startNode=
function(){return new b(this,this.start,this.startLoc)};a.startNodeAt=function(a,c){return new b(this,a,c)};a.finishNode=function(a,b){return c.call(this,a,b,this.lastTokEnd,this.lastTokEndLoc)};a.finishNodeAt=function(a,b,e,m){return c.call(this,a,b,e,m)}},{"./locutil":5,"./state":10}],8:[function(a,l,f){function c(a,c){return function(e,m,d,h,k,q){e={type:e?"Block":"Line",value:m,start:d,end:h};a.locations&&(e.loc=new b.SourceLocation(this,k,q));a.ranges&&(e.range=[d,h]);c.push(e)}}f.__esModule=
!0;f.getOptions=function(a){var b={},e;for(e in d)b[e]=a&&g.has(a,e)?a[e]:d[e];null==b.allowReserved&&(b.allowReserved=5>b.ecmaVersion);g.isArray(b.onToken)&&function(){var a=b.onToken;b.onToken=function(b){return a.push(b)}}();g.isArray(b.onComment)&&(b.onComment=c(b,b.onComment));return b};var g=a("./util"),b=a("./locutil"),d={ecmaVersion:6,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,
locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}};f.defaultOptions=d},{"./locutil":5,"./util":15}],9:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace");a=l.Parser.prototype;a.isUseStrict=function(a){return 5<=this.options.ecmaVersion&&"ExpressionStatement"===a.type&&"Literal"===a.expression.type&&"use strict"===a.expression.raw.slice(1,-1)};a.eat=function(a){return this.type===a?(this.next(),
!0):!1};a.isContextual=function(a){return this.type===c.types.name&&this.value===a};a.eatContextual=function(a){return this.value===a&&this.eat(c.types.name)};a.expectContextual=function(a){this.eatContextual(a)||this.unexpected()};a.canInsertSemicolon=function(){return this.type===c.types.eof||this.type===c.types.braceR||g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))};a.insertSemicolon=function(){if(this.canInsertSemicolon()){if(this.options.onInsertedSemicolon)this.options.onInsertedSemicolon(this.lastTokEnd,
this.lastTokEndLoc);return!0}};a.semicolon=function(){this.eat(c.types.semi)||this.insertSemicolon()||this.unexpected()};a.afterTrailingComma=function(a){if(this.type==a){if(this.options.onTrailingComma)this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc);this.next();return!0}};a.expect=function(a){this.eat(a)||this.unexpected()};a.unexpected=function(a){this.raise(null!=a?a:this.start,"Unexpected token")};a.checkPatternErrors=function(a,c){var b=a&&a.trailingComma;if(!c)return!!b;
b&&this.raise(b,"Comma is not permitted after the rest element")};a.checkExpressionErrors=function(a,c){var b=a&&a.shorthandAssign;if(!c)return!!b;b&&this.raise(b,"Shorthand property assignments are valid only in destructuring patterns")}},{"./state":10,"./tokentype":14,"./whitespace":16}],10:[function(a,l,f){function c(a){return new RegExp("^("+a.replace(/ /g,"|")+")$")}f.__esModule=!0;var g=a("./identifier"),b=a("./tokentype"),d=a("./whitespace"),h=a("./options"),n={};f.plugins=n;a=function(){function a(e,
p,f){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");this.options=e=h.getOptions(e);this.sourceFile=e.sourceFile;this.keywords=c(g.keywords[6<=e.ecmaVersion?6:5]);var k=e.allowReserved?"":g.reservedWords[e.ecmaVersion]+("module"==e.sourceType?" await":"");this.reservedWords=c(k);k=(k?k+" ":"")+g.reservedWords.strict;this.reservedWordsStrict=c(k);this.reservedWordsStrictBind=c(k+" "+g.reservedWords.strictBind);this.input=String(p);this.containsEsc=!1;this.loadPlugins(e.plugins);
f?(this.pos=f,this.lineStart=Math.max(0,this.input.lastIndexOf("\n",f)),this.curLine=this.input.slice(0,this.lineStart).split(d.lineBreak).length):(this.pos=this.lineStart=0,this.curLine=1);this.type=b.types.eof;this.value=null;this.start=this.end=this.pos;this.startLoc=this.endLoc=this.curPosition();this.lastTokEndLoc=this.lastTokStartLoc=null;this.lastTokStart=this.lastTokEnd=this.pos;this.context=this.initialContext();this.exprAllowed=!0;this.strict=this.inModule="module"===e.sourceType;this.potentialArrowAt=
-1;this.inFunction=this.inGenerator=!1;this.labels=[];0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2)}a.prototype.isKeyword=function(a){return this.keywords.test(a)};a.prototype.isReservedWord=function(a){return this.reservedWords.test(a)};a.prototype.extend=function(a,b){this[a]=b(this[a])};a.prototype.loadPlugins=function(a){for(var b in a){var c=n[b];if(!c)throw Error("Plugin '"+b+"' not found");c(this,a[b])}};a.prototype.parse=function(){var a=this.options.program||
this.startNode();this.nextToken();return this.parseTopLevel(a)};return a}();f.Parser=a},{"./identifier":2,"./options":8,"./tokentype":14,"./whitespace":16}],11:[function(a,l,f){var c=a("./tokentype");l=a("./state");var g=a("./whitespace"),b=a("./identifier");a=l.Parser.prototype;a.parseTopLevel=function(a){var b=!0;a.body||(a.body=[]);for(;this.type!==c.types.eof;){var e=this.parseStatement(!0,!0);a.body.push(e);b&&(this.isUseStrict(e)&&this.setStrict(!0),b=!1)}this.next();6<=this.options.ecmaVersion&&
(a.sourceType=this.options.sourceType);return this.finishNode(a,"Program")};var d={kind:"loop"},h={kind:"switch"};a.isLet=function(){if(this.type!==c.types.name||6>this.options.ecmaVersion||"let"!=this.value)return!1;g.skipWhiteSpace.lastIndex=this.pos;var a=g.skipWhiteSpace.exec(this.input),a=this.pos+a[0].length,d=this.input.charCodeAt(a);if(91===d||123==d)return!0;if(b.isIdentifierStart(d,!0)){for(d=a+1;b.isIdentifierChar(this.input.charCodeAt(d,!0));++d);a=this.input.slice(a,d);if(!this.isKeyword(a))return!0}return!1};
a.parseStatement=function(a,b){var e=this.type,d=this.startNode(),k=void 0;this.isLet()&&(e=c.types._var,k="let");switch(e){case c.types._break:case c.types._continue:return this.parseBreakContinueStatement(d,e.keyword);case c.types._debugger:return this.parseDebuggerStatement(d);case c.types._do:return this.parseDoStatement(d);case c.types._for:return this.parseForStatement(d);case c.types._function:return!a&&6<=this.options.ecmaVersion&&this.unexpected(),this.parseFunctionStatement(d);case c.types._class:return a||
this.unexpected(),this.parseClass(d,!0);case c.types._if:return this.parseIfStatement(d);case c.types._return:return this.parseReturnStatement(d);case c.types._switch:return this.parseSwitchStatement(d);case c.types._throw:return this.parseThrowStatement(d);case c.types._try:return this.parseTryStatement(d);case c.types._const:case c.types._var:return k=k||this.value,a||"var"==k||this.unexpected(),this.parseVarStatement(d,k);case c.types._while:return this.parseWhileStatement(d);case c.types._with:return this.parseWithStatement(d);
case c.types.braceL:return this.parseBlock();case c.types.semi:return this.parseEmptyStatement(d);case c.types._export:case c.types._import:return this.options.allowImportExportEverywhere||(b||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),e===c.types._import?this.parseImport(d):this.parseExport(d);default:var k=this.value,m=this.parseExpression();return e===c.types.name&&
"Identifier"===m.type&&this.eat(c.types.colon)?this.parseLabeledStatement(d,k,m):this.parseExpressionStatement(d,m)}};a.parseBreakContinueStatement=function(a,b){var e="break"==b;this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.label=null:this.type!==c.types.name?this.unexpected():(a.label=this.parseIdent(),this.semicolon());for(var d=0;d<this.labels.length;++d){var k=this.labels[d];if(null==a.label||k.name===a.label.name){if(null!=k.kind&&(e||"loop"===k.kind))break;if(a.label&&e)break}}d===
this.labels.length&&this.raise(a.start,"Unsyntactic "+b);return this.finishNode(a,e?"BreakStatement":"ContinueStatement")};a.parseDebuggerStatement=function(a){this.next();this.semicolon();return this.finishNode(a,"DebuggerStatement")};a.parseDoStatement=function(a){this.next();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();this.expect(c.types._while);a.test=this.parseParenExpression();6<=this.options.ecmaVersion?this.eat(c.types.semi):this.semicolon();return this.finishNode(a,
"DoWhileStatement")};a.parseForStatement=function(a){this.next();this.labels.push(d);this.expect(c.types.parenL);if(this.type===c.types.semi)return this.parseFor(a,null);var b=this.isLet();if(this.type===c.types._var||this.type===c.types._const||b){var e=this.startNode(),b=b?"let":this.value;this.next();this.parseVar(e,!0,b);this.finishNode(e,"VariableDeclaration");return!(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))||1!==e.declarations.length||"var"!==b&&e.declarations[0].init?
this.parseFor(a,e):this.parseForIn(a,e)}e={shorthandAssign:0,trailingComma:0};b=this.parseExpression(!0,e);if(this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of"))return this.checkPatternErrors(e,!0),this.toAssignable(b),this.checkLVal(b),this.parseForIn(a,b);this.checkExpressionErrors(e,!0);return this.parseFor(a,b)};a.parseFunctionStatement=function(a){this.next();return this.parseFunction(a,!0)};a.parseIfStatement=function(a){this.next();a.test=this.parseParenExpression();
a.consequent=this.parseStatement(!1);a.alternate=this.eat(c.types._else)?this.parseStatement(!1):null;return this.finishNode(a,"IfStatement")};a.parseReturnStatement=function(a){this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function");this.next();this.eat(c.types.semi)||this.insertSemicolon()?a.argument=null:(a.argument=this.parseExpression(),this.semicolon());return this.finishNode(a,"ReturnStatement")};a.parseSwitchStatement=function(a){this.next();
a.discriminant=this.parseParenExpression();a.cases=[];this.expect(c.types.braceL);this.labels.push(h);for(var b,e=!1;this.type!=c.types.braceR;)if(this.type===c.types._case||this.type===c.types._default){var d=this.type===c.types._case;b&&this.finishNode(b,"SwitchCase");a.cases.push(b=this.startNode());b.consequent=[];this.next();d?b.test=this.parseExpression():(e&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),e=!0,b.test=null);this.expect(c.types.colon)}else b||this.unexpected(),
b.consequent.push(this.parseStatement(!0));b&&this.finishNode(b,"SwitchCase");this.next();this.labels.pop();return this.finishNode(a,"SwitchStatement")};a.parseThrowStatement=function(a){this.next();g.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw");a.argument=this.parseExpression();this.semicolon();return this.finishNode(a,"ThrowStatement")};var n=[];a.parseTryStatement=function(a){this.next();a.block=this.parseBlock();a.handler=
null;if(this.type===c.types._catch){var b=this.startNode();this.next();this.expect(c.types.parenL);b.param=this.parseBindingAtom();this.checkLVal(b.param,!0);this.expect(c.types.parenR);b.body=this.parseBlock();a.handler=this.finishNode(b,"CatchClause")}a.finalizer=this.eat(c.types._finally)?this.parseBlock():null;a.handler||a.finalizer||this.raise(a.start,"Missing catch or finally clause");return this.finishNode(a,"TryStatement")};a.parseVarStatement=function(a,b){this.next();this.parseVar(a,!1,
b);this.semicolon();return this.finishNode(a,"VariableDeclaration")};a.parseWhileStatement=function(a){this.next();a.test=this.parseParenExpression();this.labels.push(d);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"WhileStatement")};a.parseWithStatement=function(a){this.strict&&this.raise(this.start,"'with' in strict mode");this.next();a.object=this.parseParenExpression();a.body=this.parseStatement(!1);return this.finishNode(a,"WithStatement")};a.parseEmptyStatement=
function(a){this.next();return this.finishNode(a,"EmptyStatement")};a.parseLabeledStatement=function(a,b,d){for(var e=0;e<this.labels.length;++e)this.labels[e].name===b&&this.raise(d.start,"Label '"+b+"' is already declared");for(var k=this.type.isLoop?"loop":this.type===c.types._switch?"switch":null,e=this.labels.length-1;0<=e;e--){var q=this.labels[e];if(q.statementStart==a.start)q.statementStart=this.start,q.kind=k;else break}this.labels.push({name:b,kind:k,statementStart:this.start});a.body=this.parseStatement(!0);
this.labels.pop();a.label=d;return this.finishNode(a,"LabeledStatement")};a.parseExpressionStatement=function(a,b){a.expression=b;this.semicolon();return this.finishNode(a,"ExpressionStatement")};a.parseBlock=function(a){var b=this.startNode(),e=!0,d=void 0;b.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){var k=this.parseStatement(!0);b.body.push(k);e&&a&&this.isUseStrict(k)&&(d=this.strict,this.setStrict(this.strict=!0));e=!1}!1===d&&this.setStrict(!1);return this.finishNode(b,
"BlockStatement")};a.parseFor=function(a,b){a.init=b;this.expect(c.types.semi);a.test=this.type===c.types.semi?null:this.parseExpression();this.expect(c.types.semi);a.update=this.type===c.types.parenR?null:this.parseExpression();this.expect(c.types.parenR);a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,"ForStatement")};a.parseForIn=function(a,b){var e=this.type===c.types._in?"ForInStatement":"ForOfStatement";this.next();a.left=b;a.right=this.parseExpression();this.expect(c.types.parenR);
a.body=this.parseStatement(!1);this.labels.pop();return this.finishNode(a,e)};a.parseVar=function(a,b,d){a.declarations=[];for(a.kind=d;;){var e=this.startNode();this.parseVarId(e);this.eat(c.types.eq)?e.init=this.parseMaybeAssign(b):"const"!==d||this.type===c.types._in||6<=this.options.ecmaVersion&&this.isContextual("of")?"Identifier"==e.id.type||b&&(this.type===c.types._in||this.isContextual("of"))?e.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):
this.unexpected();a.declarations.push(this.finishNode(e,"VariableDeclarator"));if(!this.eat(c.types.comma))break}return a};a.parseVarId=function(a){a.id=this.parseBindingAtom();this.checkLVal(a.id,!0)};a.parseFunction=function(a,b,d){this.initFunction(a);6<=this.options.ecmaVersion&&(a.generator=this.eat(c.types.star));var e=this.inGenerator;this.inGenerator=a.generator;if(b||this.type===c.types.name)a.id=this.parseIdent();this.parseFunctionParams(a);this.parseFunctionBody(a,d);this.inGenerator=e;
return this.finishNode(a,b?"FunctionDeclaration":"FunctionExpression")};a.parseFunctionParams=function(a){this.expect(c.types.parenL);a.params=this.parseBindingList(c.types.parenR,!1,!1,!0)};a.parseClass=function(a,b){this.next();this.parseClassId(a,b);this.parseClassSuper(a);var e=this.startNode(),d=!1;e.body=[];for(this.expect(c.types.braceL);!this.eat(c.types.braceR);)if(!this.eat(c.types.semi)){var k=this.startNode(),q=this.eat(c.types.star),h=this.type===c.types.name&&"static"===this.value;this.parsePropertyName(k);
k["static"]=h&&this.type!==c.types.parenL;k["static"]&&(q&&this.unexpected(),q=this.eat(c.types.star),this.parsePropertyName(k));k.kind="method";h=!1;if(!k.computed){var f=k.key;q||"Identifier"!==f.type||this.type===c.types.parenL||"get"!==f.name&&"set"!==f.name||(h=!0,k.kind=f.name,f=this.parsePropertyName(k));!k["static"]&&("Identifier"===f.type&&"constructor"===f.name||"Literal"===f.type&&"constructor"===f.value)&&(d&&this.raise(f.start,"Duplicate constructor in the same class"),h&&this.raise(f.start,
"Constructor can't have get/set modifier"),q&&this.raise(f.start,"Constructor can't be a generator"),k.kind="constructor",d=!0)}this.parseClassMethod(e,k,q);h&&(k.value.params.length!==("get"===k.kind?0:1)&&(q=k.value.start,"get"===k.kind?this.raiseRecoverable(q,"getter should have no params"):this.raiseRecoverable(q,"setter should have exactly one param")),"set"===k.kind&&"RestElement"===k.value.params[0].type&&this.raise(k.value.params[0].start,"Setter cannot use rest params"))}a.body=this.finishNode(e,
"ClassBody");return this.finishNode(a,b?"ClassDeclaration":"ClassExpression")};a.parseClassMethod=function(a,b,c){b.value=this.parseMethod(c);a.body.push(this.finishNode(b,"MethodDefinition"))};a.parseClassId=function(a,b){a.id=this.type===c.types.name?this.parseIdent():b?this.unexpected():null};a.parseClassSuper=function(a){a.superClass=this.eat(c.types._extends)?this.parseExprSubscripts():null};a.parseExport=function(a){this.next();if(this.eat(c.types.star))return this.expectContextual("from"),
a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected(),this.semicolon(),this.finishNode(a,"ExportAllDeclaration");if(this.eat(c.types._default)){var b=this.type==c.types.parenL,e=this.parseMaybeAssign(),d=!0;b||"FunctionExpression"!=e.type&&"ClassExpression"!=e.type||(d=!1,e.id&&(e.type="FunctionExpression"==e.type?"FunctionDeclaration":"ClassDeclaration"));a.declaration=e;d&&this.semicolon();return this.finishNode(a,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())a.declaration=
this.parseStatement(!0),a.specifiers=[],a.source=null;else{a.declaration=null;a.specifiers=this.parseExportSpecifiers();if(this.eatContextual("from"))a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected();else{for(b=0;b<a.specifiers.length;b++)(this.keywords.test(a.specifiers[b].local.name)||this.reservedWords.test(a.specifiers[b].local.name))&&this.unexpected(a.specifiers[b].local.start);a.source=null}this.semicolon()}return this.finishNode(a,"ExportNamedDeclaration")};a.shouldParseExportStatement=
function(){return this.type.keyword||this.isLet()};a.parseExportSpecifiers=function(){var a=[],b=!0;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;var d=this.startNode();d.local=this.parseIdent(this.type===c.types._default);d.exported=this.eatContextual("as")?this.parseIdent(!0):d.local;a.push(this.finishNode(d,"ExportSpecifier"))}return a};a.parseImport=function(a){this.next();this.type===c.types.string?
(a.specifiers=n,a.source=this.parseExprAtom()):(a.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),a.source=this.type===c.types.string?this.parseExprAtom():this.unexpected());this.semicolon();return this.finishNode(a,"ImportDeclaration")};a.parseImportSpecifiers=function(){var a=[],b=!0;if(this.type===c.types.name){var d=this.startNode();d.local=this.parseIdent();this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportDefaultSpecifier"));if(!this.eat(c.types.comma))return a}if(this.type===
c.types.star)return d=this.startNode(),this.next(),this.expectContextual("as"),d.local=this.parseIdent(),this.checkLVal(d.local,!0),a.push(this.finishNode(d,"ImportNamespaceSpecifier")),a;for(this.expect(c.types.braceL);!this.eat(c.types.braceR);){if(b)b=!1;else if(this.expect(c.types.comma),this.afterTrailingComma(c.types.braceR))break;d=this.startNode();d.imported=this.parseIdent(!0);this.eatContextual("as")?d.local=this.parseIdent():(d.local=d.imported,this.isKeyword(d.local.name)&&this.unexpected(d.local.start),
this.reservedWordsStrict.test(d.local.name)&&this.raise(d.local.start,"The keyword '"+d.local.name+"' is reserved"));this.checkLVal(d.local,!0);a.push(this.finishNode(d,"ImportSpecifier"))}return a}},{"./identifier":2,"./state":10,"./tokentype":14,"./whitespace":16}],12:[function(a,l,f){f.__esModule=!0;l=a("./state");var c=a("./tokentype"),g=a("./whitespace");a=function h(a,b,c,f){if(!(this instanceof h))throw new TypeError("Cannot call a class as a function");this.token=a;this.isExpr=!!b;this.preserveSpace=
!!c;this.override=f};f.TokContext=a;var b={b_stat:new a("{",!1),b_expr:new a("{",!0),b_tmpl:new a("${",!0),p_stat:new a("(",!1),p_expr:new a("(",!0),q_tmpl:new a("`",!0,!0,function(a){return a.readTmplToken()}),f_expr:new a("function",!0)};f.types=b;f=l.Parser.prototype;f.initialContext=function(){return[b.b_stat]};f.braceIsBlock=function(a){if(a===c.types.colon){var f=this.curContext();if(f===b.b_stat||f===b.b_expr)return!f.isExpr}return a===c.types._return?g.lineBreak.test(this.input.slice(this.lastTokEnd,
this.start)):a===c.types._else||a===c.types.semi||a===c.types.eof||a===c.types.parenR?!0:a==c.types.braceL?this.curContext()===b.b_stat:!this.exprAllowed};f.updateContext=function(a){var b,e=this.type;e.keyword&&a==c.types.dot?this.exprAllowed=!1:(b=e.updateContext)?b.call(this,a):this.exprAllowed=e.beforeExpr};c.types.parenR.updateContext=c.types.braceR.updateContext=function(){if(1==this.context.length)this.exprAllowed=!0;else{var a=this.context.pop();a===b.b_stat&&this.curContext()===b.f_expr?
(this.context.pop(),this.exprAllowed=!1):this.exprAllowed=a===b.b_tmpl?!0:!a.isExpr}};c.types.braceL.updateContext=function(a){this.context.push(this.braceIsBlock(a)?b.b_stat:b.b_expr);this.exprAllowed=!0};c.types.dollarBraceL.updateContext=function(){this.context.push(b.b_tmpl);this.exprAllowed=!0};c.types.parenL.updateContext=function(a){this.context.push(a===c.types._if||a===c.types._for||a===c.types._with||a===c.types._while?b.p_stat:b.p_expr);this.exprAllowed=!0};c.types.incDec.updateContext=
function(){};c.types._function.updateContext=function(a){!a.beforeExpr||a===c.types.semi||a===c.types._else||a===c.types.colon&&this.curContext()===b.b_stat||this.context.push(b.f_expr);this.exprAllowed=!1};c.types.backQuote.updateContext=function(){this.curContext()===b.q_tmpl?this.context.pop():this.context.push(b.q_tmpl);this.exprAllowed=!1}},{"./state":10,"./tokentype":14,"./whitespace":16}],13:[function(a,l,f){function c(a,b,c,d){try{return new RegExp(a,b)}catch(t){if(void 0!==c)throw t instanceof
SyntaxError&&d.raise(c,"Error parsing regular expression: "+t.message),t;}}function g(a){if(65535>=a)return String.fromCharCode(a);a-=65536;return String.fromCharCode((a>>10)+55296,(a&1023)+56320)}f.__esModule=!0;var b=a("./identifier"),d=a("./tokentype");l=a("./state");var h=a("./locutil"),n=a("./whitespace"),e=function k(a){if(!(this instanceof k))throw new TypeError("Cannot call a class as a function");this.type=a.type;this.value=a.value;this.start=a.start;this.end=a.end;a.options.locations&&(this.loc=
new h.SourceLocation(a,a.startLoc,a.endLoc));a.options.ranges&&(this.range=[a.start,a.end])};f.Token=e;a=l.Parser.prototype;var m="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages);a.next=function(){if(this.options.onToken)this.options.onToken(new e(this));this.lastTokEnd=this.end;this.lastTokStart=this.start;this.lastTokEndLoc=this.endLoc;this.lastTokStartLoc=this.startLoc;this.nextToken()};a.getToken=function(){this.next();return new e(this)};"undefined"!==
typeof Symbol&&(a[Symbol.iterator]=function(){var a=this;return{next:function(){var b=a.getToken();return{done:b.type===d.types.eof,value:b}}}});a.setStrict=function(a){this.strict=a;if(this.type===d.types.num||this.type===d.types.string){this.pos=this.start;if(this.options.locations)for(;this.pos<this.lineStart;)this.lineStart=this.input.lastIndexOf("\n",this.lineStart-2)+1,--this.curLine;this.nextToken()}};a.curContext=function(){return this.context[this.context.length-1]};a.nextToken=function(){var a=
this.curContext();a&&a.preserveSpace||this.skipSpace();this.start=this.pos;this.options.locations&&(this.startLoc=this.curPosition());if(this.pos>=this.input.length)return this.finishToken(d.types.eof);if(a.override)return a.override(this);this.readToken(this.fullCharCodeAtPos())};a.readToken=function(a){return b.isIdentifierStart(a,6<=this.options.ecmaVersion)||92===a?this.readWord():this.getTokenFromCode(a)};a.fullCharCodeAtPos=function(){var a=this.input.charCodeAt(this.pos);if(55295>=a||57344<=
a)return a;var b=this.input.charCodeAt(this.pos+1);return(a<<10)+b-56613888};a.skipBlockComment=function(){var a=this.options.onComment&&this.curPosition(),b=this.pos,c=this.input.indexOf("*/",this.pos+=2);-1===c&&this.raise(this.pos-2,"Unterminated comment");this.pos=c+2;if(this.options.locations){n.lineBreakG.lastIndex=b;for(var d=void 0;(d=n.lineBreakG.exec(this.input))&&d.index<this.pos;)++this.curLine,this.lineStart=d.index+d[0].length}if(this.options.onComment)this.options.onComment(!0,this.input.slice(b+
2,c),b,this.pos,a,this.curPosition())};a.skipLineComment=function(a){for(var b=this.pos,c=this.options.onComment&&this.curPosition(),d=this.input.charCodeAt(this.pos+=a);this.pos<this.input.length&&10!==d&&13!==d&&8232!==d&&8233!==d;)++this.pos,d=this.input.charCodeAt(this.pos);if(this.options.onComment)this.options.onComment(!1,this.input.slice(b+a,this.pos),b,this.pos,c,this.curPosition())};a.skipSpace=function(){a:for(;this.pos<this.input.length;){var a=this.input.charCodeAt(this.pos);switch(a){case 32:case 160:++this.pos;
break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos;this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break a}break;default:if(8<a&&14>a||5760<=a&&n.nonASCIIwhitespace.test(String.fromCharCode(a)))++this.pos;else break a}}};a.finishToken=function(a,b){this.end=this.pos;this.options.locations&&
(this.endLoc=this.curPosition());var c=this.type;this.type=a;this.value=b;this.updateContext(c)};a.readToken_dot=function(){var a=this.input.charCodeAt(this.pos+1);if(48<=a&&57>=a)return this.readNumber(!0);var b=this.input.charCodeAt(this.pos+2);if(6<=this.options.ecmaVersion&&46===a&&46===b)return this.pos+=3,this.finishToken(d.types.ellipsis);++this.pos;return this.finishToken(d.types.dot)};a.readToken_slash=function(){var a=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,
this.readRegexp()):61===a?this.finishOp(d.types.assign,2):this.finishOp(d.types.slash,1)};a.readToken_mult_modulo_exp=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;a=42===a?d.types.star:d.types.modulo;7<=this.options.ecmaVersion&&42===b&&(++c,a=d.types.starstar,b=this.input.charCodeAt(this.pos+2));return 61===b?this.finishOp(d.types.assign,c+1):this.finishOp(a,c)};a.readToken_pipe_amp=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?this.finishOp(124===a?d.types.logicalOR:
d.types.logicalAND,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(124===a?d.types.bitwiseOR:d.types.bitwiseAND,1)};a.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(d.types.assign,2):this.finishOp(d.types.bitwiseXOR,1)};a.readToken_plus_min=function(a){var b=this.input.charCodeAt(this.pos+1);return b===a?45==b&&62==this.input.charCodeAt(this.pos+2)&&n.lineBreak.test(this.input.slice(this.lastTokEnd,this.pos))?(this.skipLineComment(3),this.skipSpace(),
this.nextToken()):this.finishOp(d.types.incDec,2):61===b?this.finishOp(d.types.assign,2):this.finishOp(d.types.plusMin,1)};a.readToken_lt_gt=function(a){var b=this.input.charCodeAt(this.pos+1),c=1;if(b===a)return c=62===a&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+c)?this.finishOp(d.types.assign,c+1):this.finishOp(d.types.bitShift,c);if(33==b&&60==a&&45==this.input.charCodeAt(this.pos+2)&&45==this.input.charCodeAt(this.pos+3))return this.inModule&&this.unexpected(),
this.skipLineComment(4),this.skipSpace(),this.nextToken();61===b&&(c=2);return this.finishOp(d.types.relational,c)};a.readToken_eq_excl=function(a){var b=this.input.charCodeAt(this.pos+1);return 61===b?this.finishOp(d.types.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===a&&62===b&&6<=this.options.ecmaVersion?(this.pos+=2,this.finishToken(d.types.arrow)):this.finishOp(61===a?d.types.eq:d.types.prefix,1)};a.getTokenFromCode=function(a){switch(a){case 46:return this.readToken_dot();case 40:return++this.pos,
this.finishToken(d.types.parenL);case 41:return++this.pos,this.finishToken(d.types.parenR);case 59:return++this.pos,this.finishToken(d.types.semi);case 44:return++this.pos,this.finishToken(d.types.comma);case 91:return++this.pos,this.finishToken(d.types.bracketL);case 93:return++this.pos,this.finishToken(d.types.bracketR);case 123:return++this.pos,this.finishToken(d.types.braceL);case 125:return++this.pos,this.finishToken(d.types.braceR);case 58:return++this.pos,this.finishToken(d.types.colon);case 63:return++this.pos,
this.finishToken(d.types.question);case 96:if(6>this.options.ecmaVersion)break;++this.pos;return this.finishToken(d.types.backQuote);case 48:a=this.input.charCodeAt(this.pos+1);if(120===a||88===a)return this.readRadixNumber(16);if(6<=this.options.ecmaVersion){if(111===a||79===a)return this.readRadixNumber(8);if(98===a||66===a)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(a);case 47:return this.readToken_slash();
case 37:case 42:return this.readToken_mult_modulo_exp(a);case 124:case 38:return this.readToken_pipe_amp(a);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(a);case 60:case 62:return this.readToken_lt_gt(a);case 61:case 33:return this.readToken_eq_excl(a);case 126:return this.finishOp(d.types.prefix,1)}this.raise(this.pos,"Unexpected character '"+g(a)+"'")};a.finishOp=function(a,b){var c=this.input.slice(this.pos,this.pos+b);this.pos+=b;return this.finishToken(a,
c)};var p=!!c("\uffff","u");a.readRegexp=function(){for(var a=this,b=void 0,e=void 0,f=this.pos;;){this.pos>=this.input.length&&this.raise(f,"Unterminated regular expression");var g=this.input.charAt(this.pos);n.lineBreak.test(g)&&this.raise(f,"Unterminated regular expression");if(b)b=!1;else{if("["===g)e=!0;else if("]"===g&&e)e=!1;else if("/"===g&&!e)break;b="\\"===g}++this.pos}b=this.input.slice(f,this.pos);++this.pos;e=this.readWord1();g=b;if(e){var h=/^[gim]*$/;6<=this.options.ecmaVersion&&(h=
/^[gimuy]*$/);h.test(e)||this.raise(f,"Invalid regular expression flag");0<=e.indexOf("u")&&!p&&(g=g.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(b,c,d){c=Number("0x"+c);1114111<c&&a.raise(f+d+3,"Code point out of bounds");return"x"}),g=g.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"))}h=null;m||(c(g,void 0,f,this),h=c(b,e));return this.finishToken(d.types.regexp,{pattern:b,flags:e,value:h})};a.readInt=function(a,b){for(var c=this.pos,d=0,e=0,f=null==b?Infinity:b;e<f;++e){var k=this.input.charCodeAt(this.pos),
k=97<=k?k-97+10:65<=k?k-65+10:48<=k&&57>=k?k-48:Infinity;if(k>=a)break;++this.pos;d=d*a+k}return this.pos===c||null!=b&&this.pos-c!==b?null:d};a.readRadixNumber=function(a){this.pos+=2;var c=this.readInt(a);null==c&&this.raise(this.start+2,"Expected number in radix "+a);b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");return this.finishToken(d.types.num,c)};a.readNumber=function(a){var c=this.pos,e=!1,f=48===this.input.charCodeAt(this.pos);a||
null!==this.readInt(10)||this.raise(c,"Invalid number");a=this.input.charCodeAt(this.pos);46===a&&(++this.pos,this.readInt(10),e=!0,a=this.input.charCodeAt(this.pos));if(69===a||101===a)a=this.input.charCodeAt(++this.pos),43!==a&&45!==a||++this.pos,null===this.readInt(10)&&this.raise(c,"Invalid number"),e=!0;b.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");a=this.input.slice(c,this.pos);var k=void 0;e?k=parseFloat(a):f&&1!==a.length?/[89]/.test(a)||
this.strict?this.raise(c,"Invalid number"):k=parseInt(a,8):k=parseInt(a,10);return this.finishToken(d.types.num,k)};a.readCodePoint=function(){if(123===this.input.charCodeAt(this.pos)){6>this.options.ecmaVersion&&this.unexpected();var a=++this.pos;var b=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos);++this.pos;1114111<b&&this.raise(a,"Code point out of bounds")}else b=this.readHexChar(4);return b};a.readString=function(a){for(var b="",c=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,
"Unterminated string constant");var e=this.input.charCodeAt(this.pos);if(e===a)break;92===e?(b+=this.input.slice(c,this.pos),b+=this.readEscapedChar(!1),c=this.pos):(n.isNewLine(e)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}b+=this.input.slice(c,this.pos++);return this.finishToken(d.types.string,b)};a.readTmplToken=function(){for(var a="",b=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var c=this.input.charCodeAt(this.pos);if(96===
c||36===c&&123===this.input.charCodeAt(this.pos+1)){if(this.pos===this.start&&this.type===d.types.template){if(36===c)return this.pos+=2,this.finishToken(d.types.dollarBraceL);++this.pos;return this.finishToken(d.types.backQuote)}a+=this.input.slice(b,this.pos);return this.finishToken(d.types.template,a)}if(92===c)a+=this.input.slice(b,this.pos),a+=this.readEscapedChar(!0),b=this.pos;else if(n.isNewLine(c)){a+=this.input.slice(b,this.pos);++this.pos;switch(c){case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:a+="\n";break;default:a+=String.fromCharCode(c)}this.options.locations&&(++this.curLine,this.lineStart=this.pos);b=this.pos}else++this.pos}};a.readEscapedChar=function(a){var b=this.input.charCodeAt(++this.pos);++this.pos;switch(b){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return g(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\x0B";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&
++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(48<=b&&55>=b){var b=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],c=parseInt(b,8);255<c&&(b=b.slice(0,-1),c=parseInt(b,8));"0"!==b&&(this.strict||a)&&this.raise(this.pos-2,"Octal literal in strict mode");this.pos+=b.length-1;return String.fromCharCode(c)}return String.fromCharCode(b)}};a.readHexChar=function(a){var b=this.pos;a=this.readInt(16,a);null===a&&this.raise(b,"Bad character escape sequence");
return a};a.readWord1=function(){this.containsEsc=!1;for(var a="",c=!0,d=this.pos,e=6<=this.options.ecmaVersion;this.pos<this.input.length;){var f=this.fullCharCodeAtPos();if(b.isIdentifierChar(f,e))this.pos+=65535>=f?1:2;else if(92===f)this.containsEsc=!0,a+=this.input.slice(d,this.pos),d=this.pos,117!=this.input.charCodeAt(++this.pos)&&this.raise(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos,f=this.readCodePoint(),(c?b.isIdentifierStart:b.isIdentifierChar)(f,e)||this.raise(d,
"Invalid Unicode escape"),a+=g(f),d=this.pos;else break;c=!1}return a+this.input.slice(d,this.pos)};a.readWord=function(){var a=this.readWord1(),b=d.types.name;(6<=this.options.ecmaVersion||!this.containsEsc)&&this.keywords.test(a)&&(b=d.keywords[a]);return this.finishToken(b,a)}},{"./identifier":2,"./locutil":5,"./state":10,"./tokentype":14,"./whitespace":16}],14:[function(a,l,f){function c(a,c){return new b(a,{beforeExpr:!0,binop:c})}function g(a){var c=1>=arguments.length||void 0===arguments[1]?
{}:arguments[1];c.keyword=a;h[a]=d["_"+a]=new b(a,c)}f.__esModule=!0;var b=function e(a){var b=1>=arguments.length||void 0===arguments[1]?{}:arguments[1];if(!(this instanceof e))throw new TypeError("Cannot call a class as a function");this.label=a;this.keyword=b.keyword;this.beforeExpr=!!b.beforeExpr;this.startsExpr=!!b.startsExpr;this.isLoop=!!b.isLoop;this.isAssign=!!b.isAssign;this.prefix=!!b.prefix;this.postfix=!!b.postfix;this.binop=b.binop||null;this.updateContext=null};f.TokenType=b;a={beforeExpr:!0};
l={startsExpr:!0};var d={num:new b("num",l),regexp:new b("regexp",l),string:new b("string",l),name:new b("name",l),eof:new b("eof"),bracketL:new b("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new b("]"),braceL:new b("{",{beforeExpr:!0,startsExpr:!0}),braceR:new b("}"),parenL:new b("(",{beforeExpr:!0,startsExpr:!0}),parenR:new b(")"),comma:new b(",",a),semi:new b(";",a),colon:new b(":",a),dot:new b("."),question:new b("?",a),arrow:new b("=>",a),template:new b("template"),ellipsis:new b("...",a),backQuote:new b("`",
l),dollarBraceL:new b("${",{beforeExpr:!0,startsExpr:!0}),eq:new b("=",{beforeExpr:!0,isAssign:!0}),assign:new b("_=",{beforeExpr:!0,isAssign:!0}),incDec:new b("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new b("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:c("||",1),logicalAND:c("&&",2),bitwiseOR:c("|",3),bitwiseXOR:c("^",4),bitwiseAND:c("&",5),equality:c("==/!=",6),relational:c("</>",7),bitShift:c("<</>>",8),plusMin:new b("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),
modulo:c("%",10),star:c("*",10),slash:c("/",10),starstar:new b("**",{beforeExpr:!0})};f.types=d;var h={};f.keywords=h;g("break");g("case",a);g("catch");g("continue");g("debugger");g("default",a);g("do",{isLoop:!0,beforeExpr:!0});g("else",a);g("finally");g("for",{isLoop:!0});g("function",l);g("if");g("return",a);g("switch");g("throw",a);g("try");g("var");g("const");g("while",{isLoop:!0});g("with");g("new",{beforeExpr:!0,startsExpr:!0});g("this",l);g("super",l);g("class");g("extends",a);g("export");
g("import");g("null",l);g("true",l);g("false",l);g("in",{beforeExpr:!0,binop:7});g("instanceof",{beforeExpr:!0,binop:7});g("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("void",{beforeExpr:!0,prefix:!0,startsExpr:!0});g("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},{}],15:[function(a,l,f){f.__esModule=!0;f.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};f.has=function(a,f){return Object.prototype.hasOwnProperty.call(a,f)}},{}],16:[function(a,l,f){f.__esModule=
!0;f.isNewLine=function(a){return 10===a||13===a||8232===a||8233==a};a=/\r\n?|\n|\u2028|\u2029/;f.lineBreak=a;f.lineBreakG=new RegExp(a.source,"g");f.nonASCIIwhitespace=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;f.skipWhiteSpace=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g},{}]},{},[3])(3)});
var UPNG = {};

	

UPNG.toRGBA8 = function(out)
{
	var w = out.width, h = out.height;
	if(out.tabs.acTL==null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
	
	var frms = [];
	if(out.frames[0].data==null) out.frames[0].data = out.data;
	
	var len = w*h*4, img = new Uint8Array(len), empty = new Uint8Array(len), prev=new Uint8Array(len);
	for(var i=0; i<out.frames.length; i++)
	{
		var frm = out.frames[i];
		var fx=frm.rect.x, fy=frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
		var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw,fh, out);
		
		if(i!=0) for(var j=0; j<len; j++) prev[j]=img[j];
		
		if     (frm.blend==0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.blend==1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
		
		frms.push(img.buffer.slice(0));
		
		if     (frm.dispose==0) {}
		else if(frm.dispose==1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
		else if(frm.dispose==2) for(var j=0; j<len; j++) img[j]=prev[j];
	}
	return frms;
}
UPNG.toRGBA8.decodeImage = function(data, w, h, out)
{
	var area = w*h, bpp = UPNG.decode._getBPP(out);
	var bpl = Math.ceil(w*bpp/8);	// bytes per line

	var bf = new Uint8Array(area*4), bf32 = new Uint32Array(bf.buffer);
	var ctype = out.ctype, depth = out.depth;
	var rs = UPNG._bin.readUshort;
	
	//console.log(ctype, depth);
	var time = Date.now();

	if     (ctype==6) { // RGB + alpha
		var qarea = area<<2;
		if(depth== 8) for(var i=0; i<qarea;i+=4) {  bf[i] = data[i];  bf[i+1] = data[i+1];  bf[i+2] = data[i+2];  bf[i+3] = data[i+3]; }
		if(depth==16) for(var i=0; i<qarea;i++ ) {  bf[i] = data[i<<1];  }
	}
	else if(ctype==2) {	// RGB
		var ts=out.tabs["tRNS"];
		if(ts==null) {
			if(depth== 8) for(var i=0; i<area; i++) {  var ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];  }
			if(depth==16) for(var i=0; i<area; i++) {  var ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];  }
		}
		else {  var tr=ts[0], tg=ts[1], tb=ts[2];
			if(depth== 8) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];
				if(data[ti]   ==tr && data[ti+1]   ==tg && data[ti+2]   ==tb) bf[qi+3] = 0;  }
			if(depth==16) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];
				if(rs(data,ti)==tr && rs(data,ti+2)==tg && rs(data,ti+4)==tb) bf[qi+3] = 0;  }
		}
	}
	else if(ctype==3) {	// palette
		var p=out.tabs["PLTE"], ap=out.tabs["tRNS"], tl=ap?ap.length:0;
		//console.log(p, ap);
		if(depth==1) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>3)]>>(7-((i&7)<<0)))& 1), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==2) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>2)]>>(6-((i&3)<<1)))& 3), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==4) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>1)]>>(4-((i&1)<<2)))&15), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==8) for(var i=0; i<area; i++ ) {  var qi=i<<2, j=data[i]                      , cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
	}
	else if(ctype==4) {	// gray + alpha
		if(depth== 8)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<1, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+1];  }
		if(depth==16)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<2, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+2];  }
	}
	else if(ctype==0) {	// gray
		var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
		for(var y=0; y<h; y++) {
			var off = y*bpl, to = y*w;
			if     (depth== 1) for(var x=0; x<w; x++) {  var gr=255*((data[off+(x>>>3)]>>>(7 -((x&7)   )))& 1), al=(gr==tr*255)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 2) for(var x=0; x<w; x++) {  var gr= 85*((data[off+(x>>>2)]>>>(6 -((x&3)<<1)))& 3), al=(gr==tr* 85)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 4) for(var x=0; x<w; x++) {  var gr= 17*((data[off+(x>>>1)]>>>(4 -((x&1)<<2)))&15), al=(gr==tr* 17)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth== 8) for(var x=0; x<w; x++) {  var gr=data[off+     x], al=(gr                 ==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			else if(depth==16) for(var x=0; x<w; x++) {  var gr=data[off+(x<<1)], al=(rs(data,off+(x<<1))==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		}
	}
	//console.log(Date.now()-time);
	return bf;
}



UPNG.decode = function(buff)
{
	var data = new Uint8Array(buff), offset = 8, bin = UPNG._bin, rUs = bin.readUshort, rUi = bin.readUint;
	var out = {tabs:{}, frames:[]};
	var dd = new Uint8Array(data.length), doff = 0;	 // put all IDAT data into it
	var fd, foff = 0;	// frames
	
	var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) if(data[i]!=mgck[i]) throw "The input is not a PNG file!";

	while(offset<data.length)
	{
		var len  = bin.readUint(data, offset);  offset += 4;
		var type = bin.readASCII(data, offset, 4);  offset += 4;
		//console.log(type,len);
		
		if     (type=="IHDR")  {  UPNG.decode._IHDR(data, offset, out);  }
		else if(type=="iCCP")  {
			var off = offset;  while(data[off]!=0) off++;
			var nam = bin.readASCII(data,offset,off-offset);
			var cpr = data[off+1];
			var fil = data.slice(off+2,offset+len);
			out.tabs[type] = UPNG.decode._inflate(fil);
		}
		else if(type=="CgBI")  {  out.tabs[type] = data.slice(offset,offset+4);  }
		else if(type=="IDAT") {
			for(var i=0; i<len; i++) dd[doff+i] = data[offset+i];
			doff += len;
		}
		else if(type=="acTL")  {
			out.tabs[type] = {  num_frames:rUi(data, offset), num_plays:rUi(data, offset+4)  };
			fd = new Uint8Array(data.length);
		}
		else if(type=="fcTL")  {
			if(foff!=0) {  var fr = out.frames[out.frames.length-1];
				fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
			}
			var rct = {x:rUi(data, offset+12),y:rUi(data, offset+16),width:rUi(data, offset+4),height:rUi(data, offset+8)};
			var del = rUs(data, offset+22);  del = rUs(data, offset+20) / (del==0?100:del);
			var frm = {rect:rct, delay:Math.round(del*1000), dispose:data[offset+24], blend:data[offset+25]};
			//console.log(frm);
			out.frames.push(frm);
		}
		else if(type=="fdAT") {
			for(var i=0; i<len-4; i++) fd[foff+i] = data[offset+i+4];
			foff += len-4;
		}
		else if(type=="pHYs") {
			out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset+4), data[offset+8]];
		}
		else if(type=="cHRM") {
			out.tabs[type] = [];
			for(var i=0; i<8; i++) out.tabs[type].push(bin.readUint(data, offset+i*4));
		}
		else if(type=="tEXt" || type=="zTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = bin.nextZero(data, offset);
			var keyw = bin.readASCII(data, offset, nz-offset);
			var text, tl=offset+len-nz-1;
			if(type=="tEXt") text = bin.readASCII(data, nz+1, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(nz+2,nz+2+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="iTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = 0, off = offset;
			nz = bin.nextZero(data, off);
			var keyw = bin.readASCII(data, off, nz-off);  off = nz + 1;
			var cflag = data[off], cmeth = data[off+1];  off+=2;
			nz = bin.nextZero(data, off);
			var ltag = bin.readASCII(data, off, nz-off);  off = nz + 1;
			nz = bin.nextZero(data, off);
			var tkeyw = bin.readUTF8(data, off, nz-off);  off = nz + 1;
			var text, tl=len-(off-offset);
			if(cflag==0) text  = bin.readUTF8(data, off, tl);
			else {
				var bfr = UPNG.decode._inflate(data.slice(off,off+tl));
				text = bin.readUTF8(bfr,0,bfr.length);
			}
			out.tabs[type][keyw] = text;
		}
		else if(type=="PLTE") {
			out.tabs[type] = bin.readBytes(data, offset, len);
		}
		else if(type=="hIST") {
			var pl = out.tabs["PLTE"].length/3;
			out.tabs[type] = [];  for(var i=0; i<pl; i++) out.tabs[type].push(rUs(data, offset+i*2));
		}
		else if(type=="tRNS") {
			if     (out.ctype==3) out.tabs[type] = bin.readBytes(data, offset, len);
			else if(out.ctype==0) out.tabs[type] = rUs(data, offset);
			else if(out.ctype==2) out.tabs[type] = [ rUs(data,offset),rUs(data,offset+2),rUs(data,offset+4) ];
			//else console.log("tRNS for unsupported color type",out.ctype, len);
		}
		else if(type=="gAMA") out.tabs[type] = bin.readUint(data, offset)/100000;
		else if(type=="sRGB") out.tabs[type] = data[offset];
		else if(type=="bKGD")
		{
			if     (out.ctype==0 || out.ctype==4) out.tabs[type] = [rUs(data, offset)];
			else if(out.ctype==2 || out.ctype==6) out.tabs[type] = [rUs(data, offset), rUs(data, offset+2), rUs(data, offset+4)];
			else if(out.ctype==3) out.tabs[type] = data[offset];
		}
		else if(type=="IEND") {
			break;
		}
		//else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }
		offset += len;
		var crc = bin.readUint(data, offset);  offset += 4;
	}
	if(foff!=0) {  var fr = out.frames[out.frames.length-1];
		fr.data = UPNG.decode._decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);
	}	
	out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
	
	delete out.compress;  delete out.interlace;  delete out.filter;
	return out;
}

UPNG.decode._decompress = function(out, dd, w, h) {
	var time = Date.now();
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), buff = new Uint8Array((bpl+1+out.interlace)*h);
	if(out.tabs["CgBI"]) dd = UPNG.inflateRaw(dd,buff);
	else                 dd = UPNG.decode._inflate(dd,buff);
	//console.log(dd.length, buff.length);
	//console.log(Date.now()-time);

	var time=Date.now();
	if     (out.interlace==0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);
	else if(out.interlace==1) dd = UPNG.decode._readInterlace(dd, out);
	//console.log(Date.now()-time);
	return dd;
}

UPNG.decode._inflate = function(data, buff) {  var out=UPNG["inflateRaw"](new Uint8Array(data.buffer, 2,data.length-6),buff);  return out;  }
UPNG.inflateRaw=function(){var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;
if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;
if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);
var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;
w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;
h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;
c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;
d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);
I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;
if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);
d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};
H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};
H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;
if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);
n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;
while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};
H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;
var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];
b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);
while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;
n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};
H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};
H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};
H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;
return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();
(function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;
V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;
N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];
N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);
H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);
n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()


UPNG.decode._readInterlace = function(data, out)
{
	var w = out.width, h = out.height;
	var bpp = UPNG.decode._getBPP(out), cbpp = bpp>>3, bpl = Math.ceil(w*bpp/8);
	var img = new Uint8Array( h * bpl );
	var di = 0;

	var starting_row  = [ 0, 0, 4, 0, 2, 0, 1 ];
	var starting_col  = [ 0, 4, 0, 2, 0, 1, 0 ];
	var row_increment = [ 8, 8, 8, 4, 4, 2, 2 ];
	var col_increment = [ 8, 8, 4, 4, 2, 2, 1 ];

	var pass=0;
	while(pass<7)
	{
		var ri = row_increment[pass], ci = col_increment[pass];
		var sw = 0, sh = 0;
		var cr = starting_row[pass];  while(cr<h) {  cr+=ri;  sh++;  }
		var cc = starting_col[pass];  while(cc<w) {  cc+=ci;  sw++;  }
		var bpll = Math.ceil(sw*bpp/8);
		UPNG.decode._filterZero(data, out, di, sw, sh);

		var y=0, row = starting_row[pass];
		while(row<h)
		{
			var col = starting_col[pass];
			var cdi = (di+y*bpll)<<3;

			while(col<w)
			{
				if(bpp==1) {
					var val = data[cdi>>3];  val = (val>>(7-(cdi&7)))&1;
					img[row*bpl + (col>>3)] |= (val << (7-((col&7)<<0)));
				}
				if(bpp==2) {
					var val = data[cdi>>3];  val = (val>>(6-(cdi&7)))&3;
					img[row*bpl + (col>>2)] |= (val << (6-((col&3)<<1)));
				}
				if(bpp==4) {
					var val = data[cdi>>3];  val = (val>>(4-(cdi&7)))&15;
					img[row*bpl + (col>>1)] |= (val << (4-((col&1)<<2)));
				}
				if(bpp>=8) {
					var ii = row*bpl+col*cbpp;
					for(var j=0; j<cbpp; j++) img[ii+j] = data[(cdi>>3)+j];
				}
				cdi+=bpp;  col+=ci;
			}
			y++;  row += ri;
		}
		if(sw*sh!=0) di += sh * (1 + bpll);
		pass = pass + 1;
	}
	return img;
}

UPNG.decode._getBPP = function(out) {
	var noc = [1,null,3,1,2,null,4][out.ctype];
	return noc * out.depth;
}

UPNG.decode._filterZero = function(data, out, off, w, h)
{
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), paeth = UPNG.decode._paeth;
	bpp = Math.ceil(bpp/8);
	
	var i,di, type=data[off], x=0;
	
	if(type>1) data[off]=[0,0,1][type-2];  
	if(type==3) for(x=bpp; x<bpl; x++) data[x+1] = (data[x+1] + (data[x+1-bpp]>>>1) )&255;

	for(var y=0; y<h; y++)  {
		i = off+y*bpl; di = i+y+1;
		type = data[di-1]; x=0;

		if     (type==0)   for(; x<bpl; x++) data[i+x] = data[di+x];
		else if(type==1) { for(; x<bpp; x++) data[i+x] = data[di+x];
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpp]);  }
		else if(type==2) { for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpl]);  }
		else if(type==3) { for(; x<bpp; x++) data[i+x] = (data[di+x] + ( data[i+x-bpl]>>>1));
			               for(; x<bpl; x++) data[i+x] = (data[di+x] + ((data[i+x-bpl]+data[i+x-bpp])>>>1) );  }
		else             { for(; x<bpp; x++) data[i+x] = (data[di+x] + paeth(0, data[i+x-bpl], 0));
						   for(; x<bpl; x++) data[i+x] = (data[di+x] + paeth(data[i+x-bpp], data[i+x-bpl], data[i+x-bpp-bpl]) );  }
	}
	return data;
}

UPNG.decode._paeth = function(a,b,c)
{
	var p = a+b-c, pa = (p-a), pb = (p-b), pc = (p-c);
	if (pa*pa <= pb*pb && pa*pa <= pc*pc)  return a;
	else if (pb*pb <= pc*pc)  return b;
	return c;
}

UPNG.decode._IHDR = function(data, offset, out)
{
	var bin = UPNG._bin;
	out.width  = bin.readUint(data, offset);  offset += 4;
	out.height = bin.readUint(data, offset);  offset += 4;
	out.depth     = data[offset];  offset++;
	out.ctype     = data[offset];  offset++;
	out.compress  = data[offset];  offset++;
	out.filter    = data[offset];  offset++;
	out.interlace = data[offset];  offset++;
}

UPNG._bin = {
	nextZero   : function(data,p)  {  while(data[p]!=0) p++;  return p;  },
	readUshort : function(buff,p)  {  return (buff[p]<< 8) | buff[p+1];  },
	writeUshort: function(buff,p,n){  buff[p] = (n>>8)&255;  buff[p+1] = n&255;  },
	readUint   : function(buff,p)  {  return (buff[p]*(256*256*256)) + ((buff[p+1]<<16) | (buff[p+2]<< 8) | buff[p+3]);  },
	writeUint  : function(buff,p,n){  buff[p]=(n>>24)&255;  buff[p+1]=(n>>16)&255;  buff[p+2]=(n>>8)&255;  buff[p+3]=n&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	readBytes  : function(buff,p,l){  var arr = [];   for(var i=0; i<l; i++) arr.push(buff[p+i]);   return arr;  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UPNG._bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UPNG._bin.readASCII(buff, p, l);  }
		return  ns;
	}
}
UPNG._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode)
{
	var w = Math.min(sw,tw), h = Math.min(sh,th);
	var si=0, ti=0;
	for(var y=0; y<h; y++)
		for(var x=0; x<w; x++)
		{
			if(xoff>=0 && yoff>=0) {  si = (y*sw+x)<<2;  ti = (( yoff+y)*tw+xoff+x)<<2;  }
			else                   {  si = ((-yoff+y)*sw-xoff+x)<<2;  ti = (y*tw+x)<<2;  }
			
			if     (mode==0) {  tb[ti] = sb[si];  tb[ti+1] = sb[si+1];  tb[ti+2] = sb[si+2];  tb[ti+3] = sb[si+3];  }
			else if(mode==1) {
				var fa = sb[si+3]*(1/255), fr=sb[si]*fa, fg=sb[si+1]*fa, fb=sb[si+2]*fa; 
				var ba = tb[ti+3]*(1/255), br=tb[ti]*ba, bg=tb[ti+1]*ba, bb=tb[ti+2]*ba; 
				
				var ifa=1-fa, oa = fa+ba*ifa, ioa = (oa==0?0:1/oa);
				tb[ti+3] = 255*oa;  
				tb[ti+0] = (fr+br*ifa)*ioa;  
				tb[ti+1] = (fg+bg*ifa)*ioa;   
				tb[ti+2] = (fb+bb*ifa)*ioa;  
			}
			else if(mode==2){	// copy only differences, otherwise zero
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) {  tb[ti]=0;  tb[ti+1]=0;  tb[ti+2]=0;  tb[ti+3]=0;  }
				else {  tb[ti]=fr;  tb[ti+1]=fg;  tb[ti+2]=fb;  tb[ti+3]=fa;  }
			}
			else if(mode==3){	// check if can be blended
				var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2]; 
				var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2]; 
				if(fa==ba && fr==br && fg==bg && fb==bb) continue;
				//if(fa!=255 && ba!=0) return false;
				if(fa<220 && ba>20) return false;
			}
		}
	return true;
}


UPNG.encode = function(bufs, w, h, ps, dels, tabs, forbidPlte)
{
	if(ps==null) ps=0;
	if(forbidPlte==null) forbidPlte = false;

	var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte,false]);
	UPNG.encode.compressPNG(nimg, -1);
	
	return UPNG.encode._main(nimg, w, h, dels, tabs);
}

UPNG.encodeLL = function(bufs, w, h, cc, ac, depth, dels, tabs) {
	var nimg = {  ctype: 0 + (cc==1 ? 0 : 2) + (ac==0 ? 0 : 4),      depth: depth,  frames: []  };
	
	var time = Date.now();
	var bipp = (cc+ac)*depth, bipl = bipp * w;
	for(var i=0; i<bufs.length; i++)
		nimg.frames.push({  rect:{x:0,y:0,width:w,height:h},  img:new Uint8Array(bufs[i]), blend:0, dispose:1, bpp:Math.ceil(bipp/8), bpl:Math.ceil(bipl/8)  });
	
	UPNG.encode.compressPNG(nimg, 0, true);
	
	var out = UPNG.encode._main(nimg, w, h, dels, tabs);
	return out;
}

UPNG.encode._main = function(nimg, w, h, dels, tabs) {
	if(tabs==null) tabs={};
	var crc = UPNG.crc.crc, wUi = UPNG._bin.writeUint, wUs = UPNG._bin.writeUshort, wAs = UPNG._bin.writeASCII;
	var offset = 8, anim = nimg.frames.length>1, pltAlpha = false;
	
	var cicc;
	
	var leng = 8 + (16+5+4) /*+ (9+4)*/ + (anim ? 20 : 0);
	if(tabs["sRGB"]!=null) leng += 8+1+4;
	if(tabs["pHYs"]!=null) leng += 8+9+4;
	if(tabs["iCCP"]!=null) {  cicc = pako.deflate(tabs["iCCP"]);  leng += 8 + 11 + 2 + cicc.length;  }
	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		for(var i=0; i<dl; i++) if((nimg.plte[i]>>>24)!=255) pltAlpha = true;
		leng += (8 + dl*3 + 4) + (pltAlpha ? (8 + dl*1 + 4) : 0);
	}
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) leng += 38;
		leng += fr.cimg.length + 12;
		if(j!=0) leng+=4;
	}
	leng += 12; 
	
	var data = new Uint8Array(leng);
	var wr=[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) data[i]=wr[i];
	
	wUi(data,offset, 13);     offset+=4;
	wAs(data,offset,"IHDR");  offset+=4;
	wUi(data,offset,w);  offset+=4;
	wUi(data,offset,h);  offset+=4;
	data[offset] = nimg.depth;  offset++;  // depth
	data[offset] = nimg.ctype;  offset++;  // ctype
	data[offset] = 0;  offset++;  // compress
	data[offset] = 0;  offset++;  // filter
	data[offset] = 0;  offset++;  // interlace
	wUi(data,offset,crc(data,offset-17,17));  offset+=4; // crc

	// 13 bytes to say, that it is sRGB
	if(tabs["sRGB"]!=null) {
		wUi(data,offset, 1);      offset+=4;
		wAs(data,offset,"sRGB");  offset+=4;
		data[offset] = tabs["sRGB"];  offset++;
		wUi(data,offset,crc(data,offset-5,5));  offset+=4; // crc
	}
	if(tabs["iCCP"]!=null) {
		var sl = 11+2+cicc.length;
		wUi(data,offset, sl);  offset+=4;
		wAs(data,offset,"iCCP");  offset+=4;
		wAs(data,offset,"ICC profile");  offset+=11;  offset+=2;
		data.set(cicc, offset);  offset+=cicc.length;
		wUi(data,offset,crc(data,offset-(sl+4),sl+4));  offset+=4; // crc
	}
	if(tabs["pHYs"]!=null) {
		wUi(data,offset, 9);      offset+=4;
		wAs(data,offset,"pHYs");  offset+=4;
		wUi(data,offset, tabs["pHYs"][0]);      offset+=4;
		wUi(data,offset, tabs["pHYs"][1]);      offset+=4;
		data[offset]=tabs["pHYs"][2];			offset++;
		wUi(data,offset,crc(data,offset-13,13));  offset+=4; // crc
	}

	if(anim) {
		wUi(data,offset, 8);      offset+=4;
		wAs(data,offset,"acTL");  offset+=4;
		wUi(data,offset, nimg.frames.length);     offset+=4;
		wUi(data,offset, tabs["loop"]!=null?tabs["loop"]:0);      offset+=4;
		wUi(data,offset,crc(data,offset-12,12));  offset+=4; // crc
	}

	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		wUi(data,offset, dl*3);  offset+=4;
		wAs(data,offset,"PLTE");  offset+=4;
		for(var i=0; i<dl; i++){
			var ti=i*3, c=nimg.plte[i], r=(c)&255, g=(c>>>8)&255, b=(c>>>16)&255;
			data[offset+ti+0]=r;  data[offset+ti+1]=g;  data[offset+ti+2]=b;
		}
		offset+=dl*3;
		wUi(data,offset,crc(data,offset-dl*3-4,dl*3+4));  offset+=4; // crc

		if(pltAlpha) {
			wUi(data,offset, dl);  offset+=4;
			wAs(data,offset,"tRNS");  offset+=4;
			for(var i=0; i<dl; i++)  data[offset+i]=(nimg.plte[i]>>>24)&255;
			offset+=dl;
			wUi(data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc
		}
	}
	
	var fi = 0;
	for(var j=0; j<nimg.frames.length; j++)
	{
		var fr = nimg.frames[j];
		if(anim) {
			wUi(data, offset, 26);     offset+=4;
			wAs(data, offset,"fcTL");  offset+=4;
			wUi(data, offset, fi++);   offset+=4;
			wUi(data, offset, fr.rect.width );   offset+=4;
			wUi(data, offset, fr.rect.height);   offset+=4;
			wUi(data, offset, fr.rect.x);   offset+=4;
			wUi(data, offset, fr.rect.y);   offset+=4;
			wUs(data, offset, dels[j]);   offset+=2;
			wUs(data, offset,  1000);   offset+=2;
			data[offset] = fr.dispose;  offset++;	// dispose
			data[offset] = fr.blend  ;  offset++;	// blend
			wUi(data,offset,crc(data,offset-30,30));  offset+=4; // crc
		}
				
		var imgd = fr.cimg, dl = imgd.length;
		wUi(data,offset, dl+(j==0?0:4));     offset+=4;
		var ioff = offset;
		wAs(data,offset,(j==0)?"IDAT":"fdAT");  offset+=4;
		if(j!=0) {  wUi(data, offset, fi++);  offset+=4;  }
		data.set(imgd,offset);
		offset += dl;
		wUi(data,offset,crc(data,ioff,offset-ioff));  offset+=4; // crc
	}

	wUi(data,offset, 0);     offset+=4;
	wAs(data,offset,"IEND");  offset+=4;
	wUi(data,offset,crc(data,offset-4,4));  offset+=4; // crc

	return data.buffer;
}

UPNG.encode.compressPNG = function(out, filter, levelZero) {
	for(var i=0; i<out.frames.length; i++) {
		var frm = out.frames[i], nw=frm.rect.width, nh=frm.rect.height;
		var fdata = new Uint8Array(nh*frm.bpl+nh);
		frm.cimg = UPNG.encode._filterZero(frm.img,nh,frm.bpp,frm.bpl,fdata, filter, levelZero);
	}
}



UPNG.encode.compress = function(bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
{
	//var time = Date.now();
	var onlyBlend = prms[0], evenCrd = prms[1], forbidPrev = prms[2], minBits = prms[3], forbidPlte = prms[4], dither=prms[5];
	
	var ctype = 6, depth = 8, alphaAnd=255
	
	for(var j=0; j<bufs.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
		var img = new Uint8Array(bufs[j]), ilen = img.length;
		for(var i=0; i<ilen; i+=4) alphaAnd &= img[i+3];
	}
	var gotAlpha = (alphaAnd!=255);
	
	//console.log("alpha check", Date.now()-time);  time = Date.now();
	
	//var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"
	var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
	//console.log("framize", Date.now()-time);  time = Date.now();
	
	var cmap={}, plte=[], inds=[]; 
	
	if(ps!=0) {
		var nbufs = [];  for(var i=0; i<frms.length; i++) nbufs.push(frms[i].img.buffer);
		
		var abuf = UPNG.encode.concatRGBA(nbufs), qres = UPNG.quantize(abuf, ps);
		
		for(var i=0; i<qres.plte.length; i++) plte.push(qres.plte[i].est.rgba);
		
		var cof = 0;
		for(var i=0; i<frms.length; i++) {  
			var frm=frms[i], bln=frm.img.length, ind = new Uint8Array(qres.inds.buffer, cof>>2, bln>>2);  inds.push(ind);
			var bb = new Uint8Array(qres.abuf,cof,bln);
			
			//console.log(frm.img, frm.width, frm.height);
			//var time = Date.now();
			if(dither) UPNG.encode.dither(frm.img, frm.rect.width, frm.rect.height, plte, bb, ind);
			//console.log(Date.now()-time);
			frm.img.set(bb);  cof+=bln;  
		}
		
		//console.log("quantize", Date.now()-time);  time = Date.now();
	}
	else {
		// what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
		for(var j=0; j<frms.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
			var frm = frms[j], img32 = new Uint32Array(frm.img.buffer), nw=frm.rect.width, ilen = img32.length;
			var ind = new Uint8Array(ilen);  inds.push(ind);
			for(var i=0; i<ilen; i++) {
				var c = img32[i];
				if     (i!=0 && c==img32[i- 1]) ind[i]=ind[i-1];
				else if(i>nw && c==img32[i-nw]) ind[i]=ind[i-nw];
				else {
					var cmc = cmap[c];
					if(cmc==null) {  cmap[c]=cmc=plte.length;  plte.push(c);  if(plte.length>=300) break;  }
					ind[i]=cmc;
				}
			}
		}
		//console.log("make palette", Date.now()-time);  time = Date.now();
	}
	
	var cc=plte.length; //console.log("colors:",cc);
	if(cc<=256 && forbidPlte==false) {
		if(cc<= 2) depth=1;  else if(cc<= 4) depth=2;  else if(cc<=16) depth=4;  else depth=8;
		depth =  Math.max(depth, minBits);
	}
	
	for(var j=0; j<frms.length; j++)
	{
		var frm = frms[j], nx=frm.rect.x, ny=frm.rect.y, nw=frm.rect.width, nh=frm.rect.height;
		var cimg = frm.img, cimg32 = new Uint32Array(cimg.buffer);
		var bpl = 4*nw, bpp=4;
		if(cc<=256 && forbidPlte==false) {
			bpl = Math.ceil(depth*nw/8);
			var nimg = new Uint8Array(bpl*nh);
			var inj = inds[j];
			for(var y=0; y<nh; y++) {  var i=y*bpl, ii=y*nw;
				if     (depth==8) for(var x=0; x<nw; x++) nimg[i+(x)   ]   =  (inj[ii+x]             );
				else if(depth==4) for(var x=0; x<nw; x++) nimg[i+(x>>1)]  |=  (inj[ii+x]<<(4-(x&1)*4));
				else if(depth==2) for(var x=0; x<nw; x++) nimg[i+(x>>2)]  |=  (inj[ii+x]<<(6-(x&3)*2));
				else if(depth==1) for(var x=0; x<nw; x++) nimg[i+(x>>3)]  |=  (inj[ii+x]<<(7-(x&7)*1));
			}
			cimg=nimg;  ctype=3;  bpp=1;
		}
		else if(gotAlpha==false && frms.length==1) {	// some next "reduced" frames may contain alpha for blending
			var nimg = new Uint8Array(nw*nh*3), area=nw*nh;
			for(var i=0; i<area; i++) { var ti=i*3, qi=i*4;  nimg[ti]=cimg[qi];  nimg[ti+1]=cimg[qi+1];  nimg[ti+2]=cimg[qi+2];  }
			cimg=nimg;  ctype=2;  bpp=3;  bpl=3*nw;
		}
		frm.img=cimg;  frm.bpl=bpl;  frm.bpp=bpp;
	}
	//console.log("colors => palette indices", Date.now()-time);  time = Date.now();
	
	return {ctype:ctype, depth:depth, plte:plte, frames:frms  };
}
UPNG.encode.framize = function(bufs,w,h,alwaysBlend,evenCrd,forbidPrev) {
	/*  DISPOSE
	    - 0 : no change
		- 1 : clear to transparent
		- 2 : retstore to content before rendering (previous frame disposed)
		BLEND
		- 0 : replace
		- 1 : blend
	*/
	var frms = [];
	for(var j=0; j<bufs.length; j++) {
		var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
		var nimg;
		
		var nx=0, ny=0, nw=w, nh=h, blend=alwaysBlend?1:0;
		if(j!=0) {
			var tlim = (forbidPrev || alwaysBlend || j==1 || frms[j-2].dispose!=0)?1:2, tstp = 0, tarea = 1e9;
			for(var it=0; it<tlim; it++)
			{
				var pimg = new Uint8Array(bufs[j-1-it]), p32 = new Uint32Array(bufs[j-1-it]);
				var mix=w,miy=h,max=-1,may=-1;
				for(var y=0; y<h; y++) for(var x=0; x<w; x++) {
					var i = y*w+x;
					if(cimg32[i]!=p32[i]) {
						if(x<mix) mix=x;  if(x>max) max=x;
						if(y<miy) miy=y;  if(y>may) may=y;
					}
				}
				if(max==-1) mix=miy=max=may=0;
				if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
				var sarea = (max-mix+1)*(may-miy+1);
				if(sarea<tarea) {
					tarea = sarea;  tstp = it;
					nx = mix; ny = miy; nw = max-mix+1; nh = may-miy+1;
				}
			}
			
			// alwaysBlend: pokud zjistÃ­m, Å¾e blendit nelze, nastavÃ­m pÅ™edchozÃ­mu snÃ­mku dispose=1. ZajistÃ­m, aby obsahoval mÅ¯j obdÃ©lnÃ­k.
			var pimg = new Uint8Array(bufs[j-1-tstp]);
			if(tstp==1) frms[j-1].dispose = 2;
			
			nimg = new Uint8Array(nw*nh*4);
			UPNG._copyTile(pimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			
			blend =  UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 3) ? 1 : 0;
			if(blend==1) UPNG.encode._prepareDiff(cimg,w,h,nimg,{x:nx,y:ny,width:nw,height:nh});
			else         UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			//UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, blend==1?2:0);
		}
		else nimg = cimg.slice(0);	// img may be rewritten further ... don't rewrite input
		
		frms.push({rect:{x:nx,y:ny,width:nw,height:nh}, img:nimg, blend:blend, dispose:0});
	}
	
	
	if(alwaysBlend) for(var j=0; j<frms.length; j++) {
		var frm = frms[j];  if(frm.blend==1) continue;
		var r0 = frm.rect, r1 = frms[j-1].rect
		var miX = Math.min(r0.x, r1.x), miY = Math.min(r0.y, r1.y);
		var maX = Math.max(r0.x+r0.width, r1.x+r1.width), maY = Math.max(r0.y+r0.height, r1.y+r1.height);
		var r = {x:miX, y:miY, width:maX-miX, height:maY-miY};
		
		frms[j-1].dispose = 1;
		if(j-1!=0) 
		UPNG.encode._updateFrame(bufs, w,h,frms, j-1,r, evenCrd);
		UPNG.encode._updateFrame(bufs, w,h,frms, j  ,r, evenCrd);
	}
	var area = 0;
	if(bufs.length!=1) for(var i=0; i<frms.length; i++) {
		var frm = frms[i];
		area += frm.rect.width*frm.rect.height;
		//if(i==0 || frm.blend!=1) continue;
		//var ob = new Uint8Array(
		//console.log(frm.blend, frm.dispose, frm.rect);
	}
	//if(area!=0) console.log(area);
	return frms;
}
UPNG.encode._updateFrame = function(bufs, w,h, frms, i, r, evenCrd) {
	var U8 = Uint8Array, U32 = Uint32Array;
	var pimg = new U8(bufs[i-1]), pimg32 = new U32(bufs[i-1]), nimg = i+1<bufs.length ? new U8(bufs[i+1]):null;
	var cimg = new U8(bufs[i]), cimg32 = new U32(cimg.buffer);
	
	var mix=w,miy=h,max=-1,may=-1;
	for(var y=0; y<r.height; y++) for(var x=0; x<r.width; x++) {
		var cx = r.x+x, cy = r.y+y;
		var j = cy*w+cx, cc = cimg32[j];
		// no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.
		if(cc==0 || (frms[i-1].dispose==0 && pimg32[j]==cc && (nimg==null || nimg[j*4+3]!=0))/**/) {}
		else {
			if(cx<mix) mix=cx;  if(cx>max) max=cx;
			if(cy<miy) miy=cy;  if(cy>may) may=cy;
		}
	}
	if(max==-1) mix=miy=max=may=0;
	if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
	r = {x:mix, y:miy, width:max-mix+1, height:may-miy+1};
	
	var fr = frms[i];  fr.rect = r;  fr.blend = 1;  fr.img = new Uint8Array(r.width*r.height*4);
	if(frms[i-1].dispose==0) {
		UPNG._copyTile(pimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
		UPNG.encode._prepareDiff(cimg,w,h,fr.img,r);
		//UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 2);
	}
	else
		UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
}
UPNG.encode._prepareDiff = function(cimg, w,h, nimg, rec) {
	UPNG._copyTile(cimg,w,h, nimg,rec.width,rec.height, -rec.x,-rec.y, 2);
	/*
	var n32 = new Uint32Array(nimg.buffer);
	var og = new Uint8Array(rec.width*rec.height*4), o32 = new Uint32Array(og.buffer);
	UPNG._copyTile(cimg,w,h, og,rec.width,rec.height, -rec.x,-rec.y, 0);
	for(var i=4; i<nimg.length; i+=4) {
		if(nimg[i-1]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)-1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}
	for(var i=nimg.length-8; i>0; i-=4) {
		if(nimg[i+7]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)+1]) {
			n32[i>>>2]=o32[i>>>2];
			//var j = i, c=p32[(i>>>2)-1];
			//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
		}
	}*/
}

UPNG.encode._filterZero = function(img,h,bpp,bpl,data, filter, levelZero)
{
	var fls = [], ftry=[0,1,2,3,4];
	if     (filter!=-1)             ftry=[filter];
	else if(h*bpl>500000 || bpp==1) ftry=[0];
	var opts;  if(levelZero) opts={level:0};
	
	
	var CMPR = (data.length>10e6 && UZIP!=null) ? UZIP : pako;
	
	var time = Date.now();
	for(var i=0; i<ftry.length; i++) {
		for(var y=0; y<h; y++) UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
		//var nimg = new Uint8Array(data.length);
		//var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
		//var dfl = pako["deflate"](data), dl=dfl.length-4;
		//var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
		//console.log(crc, UZIP.adler(data,2,data.length-6));
		fls.push(CMPR["deflate"](data,opts));
	}
	
	var ti, tsize=1e9;
	for(var i=0; i<fls.length; i++) if(fls[i].length<tsize) {  ti=i;  tsize=fls[i].length;  }
	return fls[ti];
}
UPNG.encode._filterLine = function(data, img, y, bpl, bpp, type)
{
	var i = y*bpl, di = i+y, paeth = UPNG.decode._paeth
	data[di]=type;  di++;

	if(type==0) {
		if(bpl<500) for(var x=0; x<bpl; x++) data[di+x] = img[i+x];
		else data.set(new Uint8Array(img.buffer,i,bpl),di);
	}
	else if(type==1) {
		for(var x=  0; x<bpp; x++) data[di+x] =  img[i+x];
		for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]-img[i+x-bpp]+256)&255;
	}
	else if(y==0) {
		for(var x=  0; x<bpp; x++) data[di+x] = img[i+x];

		if(type==2) for(var x=bpp; x<bpl; x++) data[di+x] = img[i+x];
		if(type==3) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - (img[i+x-bpp]>>1) +256)&255;
		if(type==4) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - paeth(img[i+x-bpp], 0, 0) +256)&255;
	}
	else {
		if(type==2) { for(var x=  0; x<bpl; x++) data[di+x] = (img[i+x]+256 - img[i+x-bpl])&255;  }
		if(type==3) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - (img[i+x-bpl]>>1))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - ((img[i+x-bpl]+img[i+x-bpp])>>1))&255;  }
		if(type==4) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - paeth(0, img[i+x-bpl], 0))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - paeth(img[i+x-bpp], img[i+x-bpl], img[i+x-bpp-bpl]))&255;  }
	}
}

UPNG.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UPNG.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UPNG.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}


UPNG.quantize = function(abuf, ps)
{	
	var sb = new Uint8Array(abuf), tb = sb.slice(0), tb32 = new Uint32Array(tb.buffer);
	
	var KD = UPNG.quantize.getKDtree(tb, ps);
	var root = KD[0], leafs = KD[1];
	
	var planeDst = UPNG.quantize.planeDst;
	var len=sb.length;
		
	var inds = new Uint8Array(len>>2), nd;
	if(sb.length<20e6)  // precise, but slow :(
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = UPNG.quantize.getNearest(root, r, g, b, a);
			inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
		}
	else 
		for(var i=0; i<len; i+=4) {
			var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);
			
			nd = root;  while(nd.left) nd = (planeDst(nd.est,r,g,b,a)<=0) ? nd.left : nd.right;
			inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
		}
	return {  abuf:tb.buffer, inds:inds, plte:leafs  };
}

UPNG.quantize.getKDtree = function(nimg, ps, err) {
	if(err==null) err = 0.0001;
	var nimg32 = new Uint32Array(nimg.buffer);
	
	var root = {i0:0, i1:nimg.length, bst:null, est:null, tdst:0, left:null, right:null };  // basic statistic, extra statistic
	root.bst = UPNG.quantize.stats(  nimg,root.i0, root.i1  );  root.est = UPNG.quantize.estats( root.bst );
	var leafs = [root];
	
	while(leafs.length<ps)
	{
		var maxL = 0, mi=0;
		for(var i=0; i<leafs.length; i++) if(leafs[i].est.L > maxL) {  maxL=leafs[i].est.L;  mi=i;  }
		if(maxL<err) break;
		var node = leafs[mi];
		
		var s0 = UPNG.quantize.splitPixels(nimg,nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
		var s0wrong = (node.i0>=s0 || node.i1<=s0);
		//console.log(maxL, leafs.length, mi);
		if(s0wrong) {  node.est.L=0;  continue;  }
		
		
		var ln = {i0:node.i0, i1:s0, bst:null, est:null, tdst:0, left:null, right:null };  ln.bst = UPNG.quantize.stats( nimg, ln.i0, ln.i1 );  
		ln.est = UPNG.quantize.estats( ln.bst );
		var rn = {i0:s0, i1:node.i1, bst:null, est:null, tdst:0, left:null, right:null };  rn.bst = {R:[], m:[], N:node.bst.N-ln.bst.N};
		for(var i=0; i<16; i++) rn.bst.R[i] = node.bst.R[i]-ln.bst.R[i];
		for(var i=0; i< 4; i++) rn.bst.m[i] = node.bst.m[i]-ln.bst.m[i];
		rn.est = UPNG.quantize.estats( rn.bst );
		
		node.left = ln;  node.right = rn;
		leafs[mi]=ln;  leafs.push(rn);
	}
	leafs.sort(function(a,b) {  return b.bst.N-a.bst.N;  });
	for(var i=0; i<leafs.length; i++) leafs[i].ind=i;
	return [root, leafs];
}

UPNG.quantize.getNearest = function(nd, r,g,b,a)
{
	if(nd.left==null) {  nd.tdst = UPNG.quantize.dist(nd.est.q,r,g,b,a);  return nd;  }
	var planeDst = UPNG.quantize.planeDst(nd.est,r,g,b,a);
	
	var node0 = nd.left, node1 = nd.right;
	if(planeDst>0) {  node0=nd.right;  node1=nd.left;  }
	
	var ln = UPNG.quantize.getNearest(node0, r,g,b,a);
	if(ln.tdst<=planeDst*planeDst) return ln;
	var rn = UPNG.quantize.getNearest(node1, r,g,b,a);
	return rn.tdst<ln.tdst ? rn : ln;
}
UPNG.quantize.planeDst = function(est, r,g,b,a) {  var e = est.e;  return e[0]*r + e[1]*g + e[2]*b + e[3]*a - est.eMq;  }
UPNG.quantize.dist     = function(q,   r,g,b,a) {  var d0=r-q[0], d1=g-q[1], d2=b-q[2], d3=a-q[3];  return d0*d0+d1*d1+d2*d2+d3*d3;  }

UPNG.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq)
{
	var vecDot = UPNG.quantize.vecDot;
	i1-=4;
	var shfs = 0;
	while(i0<i1)
	{
		while(vecDot(nimg, i0, e)<=eMq) i0+=4;
		while(vecDot(nimg, i1, e)> eMq) i1-=4;
		if(i0>=i1) break;
		
		var t = nimg32[i0>>2];  nimg32[i0>>2] = nimg32[i1>>2];  nimg32[i1>>2]=t;
		
		i0+=4;  i1-=4;
	}
	while(vecDot(nimg, i0, e)>eMq) i0-=4;
	return i0+4;
}
UPNG.quantize.vecDot = function(nimg, i, e)
{
	return nimg[i]*e[0] + nimg[i+1]*e[1] + nimg[i+2]*e[2] + nimg[i+3]*e[3];
}
UPNG.quantize.stats = function(nimg, i0, i1){
	var R = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,0,0];
	var m = [0,0,0,0];
	var N = (i1-i0)>>2;
	for(var i=i0; i<i1; i+=4)
	{
		var r = nimg[i]*(1/255), g = nimg[i+1]*(1/255), b = nimg[i+2]*(1/255), a = nimg[i+3]*(1/255);
		//var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];
		m[0]+=r;  m[1]+=g;  m[2]+=b;  m[3]+=a;
		
		R[ 0] += r*r;  R[ 1] += r*g;  R[ 2] += r*b;  R[ 3] += r*a;  
		               R[ 5] += g*g;  R[ 6] += g*b;  R[ 7] += g*a; 
		                              R[10] += b*b;  R[11] += b*a;  
		                                             R[15] += a*a;  
	}
	R[4]=R[1];  R[8]=R[2];  R[9]=R[6];  R[12]=R[3];  R[13]=R[7];  R[14]=R[11];
	
	return {R:R, m:m, N:N};
}
UPNG.quantize.estats = function(stats){
	var R = stats.R, m = stats.m, N = stats.N;
	
	// when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)
	var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = (N==0 ? 0 : 1/N);
	var Rj = [
		R[ 0] - m0*m0*iN,  R[ 1] - m0*m1*iN,  R[ 2] - m0*m2*iN,  R[ 3] - m0*m3*iN,  
		R[ 4] - m1*m0*iN,  R[ 5] - m1*m1*iN,  R[ 6] - m1*m2*iN,  R[ 7] - m1*m3*iN,
		R[ 8] - m2*m0*iN,  R[ 9] - m2*m1*iN,  R[10] - m2*m2*iN,  R[11] - m2*m3*iN,  
		R[12] - m3*m0*iN,  R[13] - m3*m1*iN,  R[14] - m3*m2*iN,  R[15] - m3*m3*iN 
	];
	
	var A = Rj, M = UPNG.M4;
	var b = [Math.random(),Math.random(),Math.random(),Math.random()], mi = 0, tmi = 0;
	
	if(N!=0)
	for(var i=0; i<16; i++) {
		b = M.multVec(A, b);  tmi = Math.sqrt(M.dot(b,b));  b = M.sml(1/tmi,  b);
		if(i!=0 && Math.abs(tmi-mi)<1e-9) break;  mi = tmi;
	}	
	//b = [0,0,1,0];  mi=N;
	var q = [m0*iN, m1*iN, m2*iN, m3*iN];
	var eMq255 = M.dot(M.sml(255,q),b);
	
	return {  Cov:Rj, q:q, e:b, L:mi,  eMq255:eMq255, eMq : M.dot(b,q),
				rgba: (((Math.round(255*q[3])<<24) | (Math.round(255*q[2])<<16) |  (Math.round(255*q[1])<<8) | (Math.round(255*q[0])<<0))>>>0)  };
}
UPNG.M4 = {
	multVec : function(m,v) {
			return [
				m[ 0]*v[0] + m[ 1]*v[1] + m[ 2]*v[2] + m[ 3]*v[3],
				m[ 4]*v[0] + m[ 5]*v[1] + m[ 6]*v[2] + m[ 7]*v[3],
				m[ 8]*v[0] + m[ 9]*v[1] + m[10]*v[2] + m[11]*v[3],
				m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3]
			];
	},
	dot : function(x,y) {  return  x[0]*y[0]+x[1]*y[1]+x[2]*y[2]+x[3]*y[3];  },
	sml : function(a,y) {  return [a*y[0],a*y[1],a*y[2],a*y[3]];  }
}

UPNG.encode.concatRGBA = function(bufs) {
	var tlen = 0;
	for(var i=0; i<bufs.length; i++) tlen += bufs[i].byteLength;
	var nimg = new Uint8Array(tlen), noff=0;
	for(var i=0; i<bufs.length; i++) {
		var img = new Uint8Array(bufs[i]), il = img.length;
		for(var j=0; j<il; j+=4) {  
			var r=img[j], g=img[j+1], b=img[j+2], a = img[j+3];
			if(a==0) r=g=b=0;
			nimg[noff+j]=r;  nimg[noff+j+1]=g;  nimg[noff+j+2]=b;  nimg[noff+j+3]=a;  }
		noff += il;
	}
	return nimg.buffer;
}

UPNG.encode.dither = function(sb, w, h, plte, tb, oind) {
	
	function addErr(er, tg, ti, f) {
		tg[ti]+=(er[0]*f)>>4;  tg[ti+1]+=(er[1]*f)>>4;  tg[ti+2]+=(er[2]*f)>>4;  tg[ti+3]+=(er[3]*f)>>4;  
	}
	function N(x) {  return Math.max(0, Math.min(255, x));  }
	function D(a,b) {  var dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2], da=a[3]-b[3];  return (dr*dr + dg*dg + db*db + da*da);  }
	
	
	var pc=plte.length, nplt = [], rads=[];
	for(var i=0; i<pc; i++) {
		var c = plte[i];
		nplt.push([((c>>>0)&255), ((c>>>8)&255), ((c>>>16)&255), ((c>>>24)&255)]);
	}
	for(var i=0; i<pc; i++) {
		var ne=0xffffffff, ni=0;
		for(var j=0; j<pc; j++) {  var ce=D(nplt[i],nplt[j]);  if(j!=i && ce<ne) {  ne=ce;  ni=j;  }  }
		var hd = Math.sqrt(ne)/2;
		rads[i] = ~~(hd*hd);
	}
		
	var tb32 = new Uint32Array(tb.buffer);
	var err = new Int16Array(w*h*4);
	
	for(var y=0; y<h; y++) {
		for(var x=0; x<w; x++) {
			var i = (y*w+x)*4;
			
			var cc = [N(sb[i]+err[i]), N(sb[i+1]+err[i+1]), N(sb[i+2]+err[i+2]), N(sb[i+3]+err[i+3])];
			
			var ni=0, nd = 0xffffff;
			for(var j=0; j<pc; j++) {
				var cd = D(cc,nplt[j]);
				if(cd<nd) {  nd=cd;  ni=j;  }
			}  
			
			//ni = oind[i>>2];
			var nc = nplt[ni];
			var er = [cc[0]-nc[0], cc[1]-nc[1], cc[2]-nc[2], cc[3]-nc[3]];
			
			//addErr(er, err, i+4, 16);
			
			//*
			if(x!=w-1) addErr(er, err, i+4    , 7);
			if(y!=h-1) {
				if(x!=  0) addErr(er, err, i+4*w-4, 3);
				           addErr(er, err, i+4*w  , 5);
				if(x!=w-1) addErr(er, err, i+4*w+4, 1);  //*/
			}
		
			oind[i>>2] = ni;  tb32[i>>2] = plte[ni];
		}
	}
}


var UTEX=function(){function d(_,t,T,x,S){var X=new Uint8Array(4*4*4);for(var a=0;a<S;a+=4)for(var P=0;
P<x;P+=4){v(_,t,X);Y(T,x,S,P,a,X);t+=8}return t}function a0(_,t,T,x,S){var X=new Uint8Array(4*4*4);for(var a=0;
a<S;a+=4)for(var P=0;P<x;P+=4){v(_,t+8,X);Y(T,x,S,P,a,X);t+=16}return t}function ad(_,t,T,x,S){var X=new Uint8Array(4*4*4);
for(var a=0;a<S;a+=4)for(var P=0;P<x;P+=4){V(_,t,X);Y(T,x,S,P,a,X);t+=8}return t}function K(_,t,T,x,S){var X=new Uint8Array(16*4);
for(var a=0;a<T;a+=4)for(var P=0;P<t;P+=4){N(_,t,T,P,a,X);i(x,S,X);S+=8}return S}function s(_,t,T,x,S){var X={V:t*8},a=new Uint8Array(4*4*4);
for(var P=0;P<S;P+=4)for(var $=0;$<x;$+=4){V(_,t+8,a);for(var g=0;g<64;g+=4){var u=a3(_,X,4);a[g+3]=255*(u/15)}Y(T,x,S,$,P,a);
t+=16;X.V+=64}return t}function L(_,t){var T=[_,t];if(_>t)T.push(6/7*_+1/7*t,5/7*_+2/7*t,4/7*_+3/7*t,3/7*_+4/7*t,2/7*_+5/7*t,1/7*_+6/7*t);
else T.push(4/5*_+1/5*t,3/5*_+2/5*t,2/5*_+3/5*t,1/5*_+4/5*t,0,255);return T}function y(_,t,T,x,S){var X=L(_[t],_[t+1]);
T.V+=16;for(var a=0;a<64;a+=4){var P=a3(_,T,3);x[a+S]=X[P]}}function Q(_,t,T,x,S){var X={V:t*8},a=new Uint8Array(4*4*4);
a.fill(255);for(var P=0;P<S;P+=4)for(var $=0;$<x;$+=4){y(_,t,X,a,1);t+=8;y(_,t,X,a,0);t+=8;Y(T,x,S,$,P,a)}return t}function E(_,t,T,x,S){var X={V:t*8},a=new Uint8Array(4*4*4);
for(var P=0;P<S;P+=4)for(var $=0;$<x;$+=4){V(_,t+8,a);y(_,t,X,a,3);X.V+=64;Y(T,x,S,$,P,a);t+=16}return t}function b(_,t,T,x,S){var X=new Uint8Array(16*4);
for(var a=0;a<T;a+=4)for(var P=0;P<t;P+=4){N(_,t,T,P,a,X);var $=X[3],g=X[3];for(var u=7;u<64;u+=4){var e=X[u];
if(e<$)$=e;else if(g<e)g=e}x[S]=g;x[S+1]=$;S+=2;var o=L(g,$),z=S+2<<3;for(var u=0;u<64;u+=32){var H=0,z=0;
for(var F=0;F<32;F+=4){var C=0,w=500,e=X[u+F+3];for(var M=0;M<8;M++){var h=Math.abs(o[M]-e);if(h<w){w=h;
C=M}}H=H|C<<z;z+=3}x[S]=H;x[S+1]=H>>8;x[S+2]=H>>16;S+=3}i(x,S,X);S+=8}return S}var r=new Uint8Array(16);
function v(_,t,T){var x=_[t+1]<<8|_[t],S=_[t+3]<<8|_[t+2],X=(x&31)*(255/31),a=(x>>>5&31)*(255/31),P=(x>>10)*(255/31),$=(S&31)*(255/31),g=(S>>>5&63)*(255/63),u=(S>>11)*(255/31),e=r;
e[0]=Z(P);e[1]=Z(a);e[2]=Z(X);e[3]=255;e[12]=Z(u);e[13]=Z(g);e[14]=Z($);e[15]=255;var o=2/3,z=1-o;e[4]=Z(o*P+z*u);
e[5]=Z(o*a+z*g);e[6]=Z(o*X+z*$);e[7]=255;o=1/3;z=1-o;e[8]=Z(o*P+z*u);e[9]=Z(o*a+z*g);e[10]=Z(o*X+z*$);
e[11]=255;O(_,T,e,t)}function V(_,t,T){var x=_[t+1]<<8|_[t],S=_[t+3]<<8|_[t+2],X=(x&31)*(255/31),a=(x>>>5&63)*(255/63),P=(x>>11)*(255/31),$=(S&31)*(255/31),g=(S>>>5&63)*(255/63),u=(S>>11)*(255/31),e=r;
e[0]=Z(P);e[1]=Z(a);e[2]=Z(X);e[3]=255;e[4]=Z(u);e[5]=Z(g);e[6]=Z($);e[7]=255;if(S<x){var o=2/3,z=1-o;
e[8]=Z(o*P+z*u);e[9]=Z(o*a+z*g);e[10]=Z(o*X+z*$);e[11]=255;o=1/3;z=1-o;e[12]=Z(o*P+z*u);e[13]=Z(o*a+z*g);
e[14]=Z(o*X+z*$);e[15]=255}else{var o=1/2,z=1-o;e[8]=Z(o*P+z*u);e[9]=Z(o*a+z*g);e[10]=Z(o*X+z*$);e[11]=255;
e[12]=0;e[13]=0;e[14]=0;e[15]=0}O(_,T,e,t)}function Z(_){return~~(.5+_)}function m(_,t,T){return Z(_*(31/255))<<11|~~(.45+t*(63/255))<<5|Z(T*(31/255))}function i(_,t,T){var x=al,S=an(T),X=T[S>>8],a=T[(S>>8)+1],P=T[(S>>8)+2],$=T[S&255],g=T[(S&255)+1],u=T[(S&255)+2],e=m(X,a,P),o=m($,g,u);
if(e<o){var z=e;e=o;o=z}var P=Z((e&31)*(255/31)),a=Z((e>>>5&63)*(255/63)),X=Z((e>>11)*(255/31)),u=Z((o&31)*(255/31)),g=Z((o>>>5&63)*(255/63)),$=Z((o>>11)*(255/31));
_[t+0]=e&255;_[t+1]=e>>8;_[t+2]=o&255;_[t+3]=o>>8;var H=2/3,F=1-H,C=Z(H*X+F*$),w=Z(H*a+F*g),M=Z(H*P+F*u);
H=1/3;F=1-H;var h=Z(H*X+F*$),ai=Z(H*a+F*g),f=Z(H*P+F*u),p=t*8+32;for(var G=0;G<64;G+=4){var D=T[G],c=T[G+1],ak=T[G+2],aa=x(D,c,ak,X,a,P),a9=x(D,c,ak,$,g,u),I=x(D,c,ak,C,w,M),k=x(D,c,ak,h,ai,f),a5=Math.min(aa,Math.min(a9,Math.min(I,k))),l=0;
if(a5==a9)l=1;else if(a5==I)l=2;else if(a5==k)l=3;_[p>>3]|=l<<(p&7);p+=2}}function O(_,t,T,x){var S=x+4<<3;
for(var X=0;X<64;X+=4){var a=_[S>>3]>>(S&7)&3;S+=2;a=a<<2;t[X]=T[a];t[X+1]=T[a+1];t[X+2]=T[a+2];t[X+3]=T[a+3]}}function N(_,t,T,x,S,X){for(var a=0;
a<4;a++){var P=(S+a)*t+x<<2,$=a<<4;X[$+0]=_[P+0];X[$+1]=_[P+1];X[$+2]=_[P+2];X[$+3]=_[P+3];X[$+4]=_[P+4];
X[$+5]=_[P+5];X[$+6]=_[P+6];X[$+7]=_[P+7];X[$+8]=_[P+8];X[$+9]=_[P+9];X[$+10]=_[P+10];X[$+11]=_[P+11];
X[$+12]=_[P+12];X[$+13]=_[P+13];X[$+14]=_[P+14];X[$+15]=_[P+15]}}function Y(_,t,T,x,S,X){for(var a=0;
a<4;a++){var P=(S+a)*t+x<<2,$=a<<4;_[P+0]=X[$+0];_[P+1]=X[$+1];_[P+2]=X[$+2];_[P+3]=X[$+3];_[P+4]=X[$+4];
_[P+5]=X[$+5];_[P+6]=X[$+6];_[P+7]=X[$+7];_[P+8]=X[$+8];_[P+9]=X[$+9];_[P+10]=X[$+10];_[P+11]=X[$+11];
_[P+12]=X[$+12];_[P+13]=X[$+13];_[P+14]=X[$+14];_[P+15]=X[$+15]}}var J="0011001100110011 0001000100010001 0111011101110111 0001001100110111 0000000100010011 0011011101111111 0001001101111111 0000000100110111 0000000000010011 0011011111111111 0000000101111111 0000000000010111 0001011111111111 0000000011111111 0000111111111111 0000000000001111 0000100011101111 0111000100000000 0000000010001110 0111001100010000 0011000100000000 0000100011001110 0000000010001100 0111001100110001 0011000100010000 0000100010001100 0110011001100110 0011011001101100 0001011111101000 0000111111110000 0111000110001110 0011100110011100 0101010101010101 0000111100001111 0101101001011010 0011001111001100 0011110000111100 0101010110101010 0110100101101001 0101101010100101 0111001111001110 0001001111001000 0011001001001100 0011101111011100 0110100110010110 0011110011000011 0110011010011001 0000011001100000 0100111001000000 0010011100100000 0000001001110010 0000010011100100 0110110010010011 0011011011001001 0110001110011100 0011100111000110 0110110011001001 0110001100111001 0111111010000001 0001100011100111 0000111100110011 0011001111110000 0010001011101110 0100010001110111".split(" "),a4="0011001102212222 0001001122112221 0000200122112211 0222002200110111 0000000011221122 0011001100220022 0022002211111111 0011001122112211 0000000011112222 0000111111112222 0000111122222222 0012001200120012 0112011201120112 0122012201220122 0011011211221222 0011200122002220 0001001101121122 0111001120012200 0000112211221122 0022002200221111 0111011102220222 0001000122212221 0000001101220122 0000110022102210 0122012200110000 0012001211222222 0110122112210110 0000011012211221 0022110211020022 0110011020022222 0011012201220011 0000200022112221 0000000211221222 0222002200120011 0011001200220222 0120012001200120 0000111122220000 0120120120120120 0120201212010120 0011220011220011 0011112222000011 0101010122222222 0000000021212121 0022112200221122 0022001100220011 0220122102201221 0101222222220101 0000212121212121 0101010101012222 0222011102220111 0002111200021112 0000211221122112 0222011101110222 0002111211120002 0110011001102222 0000000021122112 0110011022222222 0022001100110022 0022112211220022 0000000000002112 0002000100020001 0222122202221222 0101222222222222 0111201122012220".split(" "),n=[[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,8,0],[0,8,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,8,0],[0,2,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,8,0],[0,2,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,6,0],[0,6,0],[0,2,0],[0,6,0],[0,8,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,15,0],[0,2,0],[0,2,0],[0,15,0]],ao=[[0,3,15],[0,3,8],[0,15,8],[0,15,3],[0,8,15],[0,3,15],[0,15,3],[0,15,8],[0,8,15],[0,8,15],[0,6,15],[0,6,15],[0,6,15],[0,5,15],[0,3,15],[0,3,8],[0,3,15],[0,3,8],[0,8,15],[0,15,3],[0,3,15],[0,3,8],[0,6,15],[0,10,8],[0,5,3],[0,8,15],[0,8,6],[0,6,10],[0,8,15],[0,5,15],[0,15,10],[0,15,8],[0,8,15],[0,15,3],[0,3,15],[0,5,10],[0,6,10],[0,10,8],[0,8,9],[0,15,10],[0,15,6],[0,3,15],[0,15,8],[0,5,15],[0,15,3],[0,15,6],[0,15,6],[0,15,8],[0,3,15],[0,15,3],[0,5,15],[0,5,15],[0,5,15],[0,8,15],[0,5,15],[0,10,15],[0,5,15],[0,10,15],[0,8,15],[0,13,15],[0,15,3],[0,12,15],[0,3,15],[0,3,8]];
function a7(_,t,T,x,S){var X=a3,a={V:0},P=new Uint8Array(4*4*4),$=[null,null,[0,21,43,64],[0,9,18,27,37,46,55,64],[0,4,9,13,17,21,26,30,34,38,43,47,51,55,60,64]],g=[null,null,J,a4],u=[null,null,n,ao];
for(var e=0;e<S;e+=4)for(var o=0;o<x;o+=4){var z=0,a5="0000000000000000";while((_[t]>>z&1)!=1)z++;a.V=(t<<3)+z+1;
var H=z==4||z==5?X(_,a,2):0,F=z==4?X(_,a,1):0,C=[4,6,6,6,0,0,0,6][z],w=X(_,a,C),M=[4,6,5,7,5,7,7,5][z],h=[0,0,0,0,6,8,7,5][z],ai=[1,1,0,1,0,0,1,1][z],f=[6,4,6,4,2,2,2,4][z],p=[];
for(var G=0;G<4;G++){var D=G==3?h:M;for(var c=0;c<f;c++)p[G*f+c]=X(_,a,D)}for(var c=0;c<f;c++){if(z==1&&(c&1)==1)a.V--;
var ak=X(_,a,ai);for(var G=0;G<3;G++)p[G*f+c]=p[G*f+c]<<ai|ak;if(h!=0)p[3*f+c]=p[3*f+c]<<ai|ak}M+=ai;
if(h!=0)h+=ai;for(var G=0;G<4;G++){var D=G==3?h:M,aa=D==0?0:1/((1<<D)-1);for(var c=0;c<f;c++)p[G*f+c]*=aa}if(h==0)for(var c=0;
c<f;c++)p[3*f+c]=1;var a9=[3,2,3,2,1,1,1,2][z],I=[3,3,2,2,2,2,4,2][z],k=[0,0,0,0,3,2,0,0][z],l=[0,0,0];
if(a9!=1){a5=g[a9][w];l=u[a9][w]}var aj=a.V,af=aj+16*I-a9;if(F==1){var ac=aj;aj=af;af=ac;ac=I;I=k;k=ac}var a1=$[I];
a.V=aj;for(var G=0;G<64;G+=4){var R=a5.charCodeAt(G>>2)-48,ae=l[R]==G>>2?1:0,a8=X(_,a,I-ae),W=a1[a8]/64,ab=(1-W)*p[0*f+2*R+0]+W*p[0*f+2*R+1],ap=(1-W)*p[1*f+2*R+0]+W*p[1*f+2*R+1],ag=(1-W)*p[2*f+2*R+0]+W*p[2*f+2*R+1],am=(1-W)*p[3*f+2*R+0]+W*p[3*f+2*R+1];
P[G]=ab*255;P[G+1]=ap*255;P[G+2]=ag*255;P[G+3]=am*255}a1=$[k];a.V=af;if(k!=0)for(var G=0;G<64;G+=4){var R=a5.charCodeAt(G>>2)-48,ae=l[R]==G>>2?1:0,a8=X(_,a,k-ae),W=a1[a8]/64,am=(1-W)*p[3*f+2*R+0]+W*p[3*f+2*R+1];
P[G+3]=am*255}q(P,H);Y(T,x,S,o,e,P);t+=16}return t}function q(_,t){if(t==0)return;for(var T=0;T<64;T+=4){var x=_[T],S=_[T+1],X=_[T+2],a=_[T+3];
if(t==1){var P=a;a=x;x=P}if(t==2){var P=a;a=S;S=P}if(t==3){var P=a;a=X;X=P}_[T]=x;_[T+1]=S;_[T+2]=X;
_[T+3]=a}}function a3(_,t,T){var x=0,S=T;while(T!=0){x=x|j(_,t)<<S-T;T--}return x}function j(_,t){var T=t.V;
t.V++;return _[T>>3]>>(T&7)&1}function A(_,t,T){var x=t>>1,S=T>>1,X=new Uint8Array(x*S*4);for(var a=0;
a<S;a++)for(var P=0;P<x;P++){var $=a*x+P<<2,g=(a<<1)*t+(P<<1)<<2,u=_[g+3],e=_[g+7],o=_[g]*u+_[g+4]*e,z=_[g+1]*u+_[g+5]*e,H=_[g+2]*u+_[g+6]*e;
g+=t<<2;var F=_[g+3],C=_[g+7];o+=_[g]*F+_[g+4]*C;z+=_[g+1]*F+_[g+5]*C;H+=_[g+2]*F+_[g+6]*C;var w=u+e+F+C+2>>2,p=w==0?0:.25/w;
X[$]=~~(o*p+.5);X[$+1]=~~(z*p+.5);X[$+2]=~~(H*p+.5);X[$+3]=w}return X}function al(_,t,T,x,S,X){return(_-x)*(_-x)+(t-S)*(t-S)+(T-X)*(T-X)}function an(_){var t=al,T=0,x=0;
for(var S=0;S<64;S+=4){var X=_[S],a=_[S+1],P=_[S+2];for(var $=S+4;$<64;$+=4){var g=t(X,a,P,_[$],_[$+1],_[$+2]);
if(g>x){x=g;T=S<<8|$}}}return T}var aq=new ArrayBuffer(4),B=new Uint8Array(aq),ah=new Uint32Array(aq),a6=new Uint16Array(aq),a2={c:function(_,t){B[0]=_[t+0];
B[1]=_[t+1];return a6[0]},a:function(_,t){B[0]=_[t+0];B[1]=_[t+1];B[2]=_[t+2];B[3]=_[t+3];return ah[0]},$:function(_,t,T){ah[0]=T;
_[t+0]=B[0];_[t+1]=B[1];_[t+2]=B[2];_[t+3]=B[3]},f:function(_,t,T){var x="";for(var S=0;S<T;S++)x+=String.fromCharCode(_[t+S]);
return x},X:function(_,t,T){for(var x=0;x<T.length;x++)_[t+x]=T.charCodeAt(x)}};return{r:ad,T:s,Y:E,O:Q,R:a7,P:d,F:a0,K:K,b:b,s:A,p:a2}}();
UTEX.DDS=function(){var d={G:1,J:2,W:4,D:8,u:4096,i:131072,I:524288,o:8388608,h:1,M:2,_:4,N:64,Z:512,l:131072,j:8,L:4194304,q:4096};
function a0(E){var b=new Uint8Array(E),r=0,v=UTEX.p.f(b,r,4),V,Z,m;r+=4;V=K(b,r);r+=124;Z=V.g;if(Z.Q&d._&&Z.k=="DX10"){m=Q(b,r);
r+=20}var i=V.width,O=V.height,N=[],Y=Z.k,J=Z.e,a4={DXT1:"BC1",DXT3:"BC2",DXT5:"BC3",DX10:"BC7",ATI2:"BC5"};
if(a4[Y])Y=a4[Y];if(m){var n=m.H;if(70<=n&&n<=72)Y="BC1";else if(73<=n&&n<=75)Y="BC2";else if(76<=n&&n<=78)Y="BC3";
else if(97<=n&&n<=99)Y="BC7";else console.log("Unknown DX10 format",n)}var a7=Math.max(1,V.S);for(var q=0;
q<a7;q++){var a3=i*O,j=a3*4,A=new Uint8Array(j);if(!1){}else if(Y=="BC1")r=UTEX.r(b,r,A,i,O);else if(Y=="BC2")r=UTEX.T(b,r,A,i,O);
else if(Y=="BC3")r=UTEX.Y(b,r,A,i,O);else if(Y=="BC5")r=UTEX.O(b,r,A,i,O);else if(Y=="BC7")r=UTEX.R(b,r,A,i,O);
else if(Y=="ATC ")r=UTEX.P(b,r,A,i,O);else if(Y=="ATCA")r=UTEX.F(b,r,A,i,O);else if(Y=="ATCI")r=UTEX.F(b,r,A,i,O);
else if(Z.Q&d.h&&Z.Q&d.N){var an=Z.w,aq=255/an,B=Z.t,a6=255/B,a2=Z.d,_=255/a2,t=Z.C,T=255/t;if(J==32){for(var x=0;
x<j;x+=4){var S=b[r+x+3]<<24|b[r+x+2]<<16|b[r+x+1]<<8|b[r+x];A[x+0]=(S&an)*aq;A[x+1]=(S&B)*a6;A[x+2]=(S&a2)*_;
A[x+3]=(S&t)*T}r+=j}else if(J==16){for(var x=0;x<j;x+=4){var S=b[r+(x>>1)+1]<<8|b[r+(x>>1)];A[x+0]=(S&an)*aq;
A[x+1]=(S&B)*a6;A[x+2]=(S&a2)*_;A[x+3]=(S&t)*T}r+=j>>>1}else throw"unknown bit count "+J}else if(Z.Q&d.M||Z.Q&d.h||Z.Q&d.l){if(J==8){if(Z.Q&d.M){for(var x=0;
x<j;x+=4)A[x+3]=b[r+(x>>2)]}else{A.fill(255);for(var x=0;x<j;x+=4)A[x]=A[x+1]=A[x+2]=b[r+(x>>2)]}r+=j>>>2}else throw"unknown bit count "+J}else if(Z.Q&d.N&&J==24){for(var x=0;
x<a3;x++){var X=x*4,a=x*3;A[X+0]=b[r+a];A[X+1]=b[r+a+1];A[X+2]=b[r+a+2];A[X+3]=255}}else{console.log("unknown texture format, head flags: ",V.Q.toString(2),"pixelFormat flags: ",Z.Q.toString(2));
throw"e"}N.push({width:i,height:O,image:A.buffer});i=i>>>1;O=O>>>1}return N}function ad(E,b,r,v){if(v==null)v=[!0,!0];
var E=new Uint8Array(E),V=255,Y=0,J=0;for(var Z=3;Z<E.length;Z+=4)V&=E[Z];var m=V<250,i=v[0],O=v[1],N=new Uint8Array(124+b*r*6);
UTEX.p.X(N,Y,"DDS ");Y+=4;s(N,b,r,m,i,O,Y);Y+=124;while(b*r!=0){if(O){if(m)Y=UTEX.b(E,b,r,N,Y);else Y=UTEX.K(E,b,r,N,Y)}else{N.set(E,Y);
Y+=E.length}E=UTEX.s(E,b,r);b=b>>1;r=r>>1;J++;if(!i)break}N[28]=J;return N.buffer.slice(0,Y)}function K(E,b){var r={},v=UTEX.p.a;
b+=4;r.Q=v(E,b);b+=4;r.height=v(E,b);b+=4;r.width=v(E,b);b+=4;r.pitch=v(E,b);b+=4;r.depth=v(E,b);b+=4;
r.S=v(E,b);b+=4;b+=11*4;r.g=L(E,b);b+=32;r.A=v(E,b);b+=4;r.B=v(E,b);b+=4;r.a6=v(E,b);b+=4;r.a3=v(E,b);
b+=4;b+=4;return r}function s(E,b,r,v,V,Z,m){var i=UTEX.p.$,O=d.G|d.J|d.W|d.u;O|=d.i|(Z?d.I:d.D);var N=(V?d.L:0)|d.q|(V?d.j:0),Y=(b*r>>>1)*(v?2:1),J=v?1:0;
if(!Z)Y=b*r*4;i(E,m,124);m+=4;i(E,m,O);m+=4;i(E,m,r);m+=4;i(E,m,b);m+=4;i(E,m,Y);m+=4;i(E,m,J);m+=4;
i(E,m,10);m+=4;m+=11*4;y(E,v,Z,m);m+=32;i(E,m,N);m+=4;m+=4*4}function L(E,b){var r={},v=UTEX.p.a;b+=4;
r.Q=v(E,b);b+=4;r.k=UTEX.p.f(E,b,4);b+=4;r.e=v(E,b);b+=4;r.w=v(E,b);b+=4;r.t=v(E,b);b+=4;r.d=v(E,b);
b+=4;r.C=v(E,b);b+=4;return r}function y(E,b,r,v){var V=UTEX.p.$,Z=r?d._:d.h|d.N;V(E,v,32);v+=4;V(E,v,Z);
v+=4;UTEX.p.X(E,v,r?b?"DXT5":"DXT1":"    ");v+=4;if(!r){V(E,v,32);for(var m=0;m<4;m++)V(E,v+4+m*4,255<<m*8)}v+=5*4}function Q(E,b){var r={},v=UTEX.p.a;
r.H=v(E,b);b+=4;r.a8=v(E,b);b+=4;r.a1=v(E,b);b+=4;r.a0=v(E,b);b+=4;r.a4=v(E,b);b+=4;return r}return{encode:ad,decode:a0}}();
UTEX.VTF=function(){var d={};function a0(K){var s=new Uint8Array(K),L=0,y={};L=ad(s,L,y);var Q=y.n,E=y.m;
if(Q*E!=0){var b=new Uint8Array(Q*E*4);L=UTEX.r(s,L,b,Q,E)}var r=y.z,v=y.v,V=[];for(var Z=0;Z<v;Z++){var m=y.width>>>v-1-Z,i=y.height>>>v-1-Z;
for(var O=0;O<y.frames;O++){var b=new Uint8Array(m*i*4);if(r==0||r==12){var N=L,Y=r==0?[0,1,2,3]:[2,1,0,3],J=Y[0],a4=Y[1],n=Y[2],a7=Y[3];
for(var q=0;q<b.length;q+=4){b[q+J]=s[N++];b[q+a4]=s[N++];b[q+n]=s[N++];b[q+a7]=s[N++]}L+=m*i*4}else if(r==2){for(var q=0;
q<b.length;q+=4){b[q]=s[L++];b[q+1]=s[L++];b[q+2]=s[L++];b[q+3]=255}}else if(r==13)L=UTEX.r(s,L,b,m,i);
else if(r==14)L=UTEX.T(s,L,b,m,i);else if(r==15)L=UTEX.Y(s,L,b,m,i);else throw r;V.push({width:m,height:i,image:b.buffer})}}return V}function ad(K,s,L){var y=UTEX.p.a,Q=UTEX.p.c,E=UTEX.p.f(K,s,4);
s+=4;var b=y(K,s);s+=4;var r=y(K,s);s+=4;var v=y(K,s);s+=4;L.width=Q(K,s);s+=2;L.height=Q(K,s);s+=2;
L.Q=y(K,s);s+=4;L.frames=Q(K,s);s+=2;L.a2=Q(K,s);s+=2;s+=4;s+=12;s+=4;s+=4;L.z=y(K,s);s+=4;L.v=K[s++];
L.a5=y(K,s);s+=4;L.n=K[s++];L.m=K[s++];if(r>=2){L.depth=Q(K,s);s+=2;if(r>=3){s+=3;L.a7=y(K,s);s+=4}}return v}return{decode:a0}}();
	
(function(){var u={};if(typeof module=="object"){module.exports=u}else{self.UTIF=u}var b3=typeof require==="function"?require("pako"):self.pako;
function aN(){if(typeof process=="undefined"||process.env.NODE_ENV=="development")console.log.apply(console,arguments)}(function(u,b3){(function(){"use strict";
var w=function v(){function w(T){this.message="JPEG error: "+T}w.prototype=new Error;w.prototype.name="JpegError";
w.constructor=w;return w}(),m=function Q(){var T=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),t=4017,C=799,E=3406,K=2276,G=1567,L=3784,y=5793,s=2896;
function m(j){if(j==null)j={};if(j.w==null)j.w=-1;this.V=j.n;this.N=j.w}function h(j,A){var X=0,P=[],H,n,B=16,l;
while(B>0&&!j[B-1]){B--}P.push({children:[],index:0});var g=P[0];for(H=0;H<B;H++){for(n=0;n<j[H];n++){g=P.pop();
g.children[g.index]=A[X];while(g.index>0){g=P.pop()}g.index++;P.push(g);while(P.length<=H){P.push(l={children:[],index:0});
g.children[g.index]=l.children;g=l}X++}if(H+1<B){P.push(l={children:[],index:0});g.children[g.index]=l.children;
g=l}}return P[0].children}function a(j,A,X){return 64*((j.P+1)*A+X)}function f(j,A,X,P,H,n,B,l,g,O){if(O==null)O=!1;
var c=X.m,o=X.Z,i=A,x=0,J=0,$=0,W=0,z,M=0,b,U,Z,k,a5,aV,aE=0,ax,am,aU,ai;function S(){if(J>0){J--;return x>>J&1}x=j[A++];
if(x===255){var a8=j[A++];if(a8){if(a8===220&&O){A+=2;var ao=V(j,A);A+=2;if(ao>0&&ao!==X.s){throw new DNLMarkerError("Found DNL marker (0xFFDC) while parsing scan data",ao)}}else if(a8===217){if(O){var b1=M*8;
if(b1>0&&b1<X.s/10){throw new DNLMarkerError("Found EOI marker (0xFFD9) while parsing scan data, "+"possibly caused by incorrect `scanLines` parameter",b1)}}throw new EOIMarkerError("Found EOI marker (0xFFD9) while parsing scan data")}throw new w("unexpected marker")}}J=7;
return x>>>7}function aS(a8){var ao=a8;while(!0){ao=ao[S()];switch(typeof ao){case"number":return ao;
case"object":continue}throw new w("invalid huffman sequence")}}function a6(a8){var a5=0;while(a8>0){a5=a5<<1|S();
a8--}return a5}function ap(a8){if(a8===1){return S()===1?1:-1}var a5=a6(a8);if(a5>=1<<a8-1){return a5}return a5+(-1<<a8)+1}function a$(b,a8){var ao=aS(b.J),b1=ao===0?0:ap(ao),k=1;
b.D[a8]=b.Q+=b1;while(k<64){var aY=aS(b.i),aB=aY&15,ah=aY>>4;if(aB===0){if(ah<15){break}k+=16;continue}k+=ah;
var b5=T[k];b.D[a8+b5]=ap(aB);k++}}function an(b,a8){var ao=aS(b.J),b1=ao===0?0:ap(ao)<<g;b.D[a8]=b.Q+=b1}function aF(b,a8){b.D[a8]|=S()<<g}function aQ(b,a8){if($>0){$--;
return}var k=n,ao=B;while(k<=ao){var b1=aS(b.i),aY=b1&15,aB=b1>>4;if(aY===0){if(aB<15){$=a6(aB)+(1<<aB)-1;
break}k+=16;continue}k+=aB;var ah=T[k];b.D[a8+ah]=ap(aY)*(1<<g);k++}}function av(b,a8){var k=n,ao=B,b1=0,aY,aB;
while(k<=ao){var ah=a8+T[k],b5=b.D[ah]<0?-1:1;switch(W){case 0:aB=aS(b.i);aY=aB&15;b1=aB>>4;if(aY===0){if(b1<15){$=a6(b1)+(1<<b1);
W=4}else{b1=16;W=1}}else{if(aY!==1){throw new w("invalid ACn encoding")}z=ap(aY);W=b1?2:3}continue;case 1:case 2:if(b.D[ah]){b.D[ah]+=b5*(S()<<g)}else{b1--;
if(b1===0){W=W===2?3:0}}break;case 3:if(b.D[ah]){b.D[ah]+=b5*(S()<<g)}else{b.D[ah]=z<<g;W=0}break;case 4:if(b.D[ah]){b.D[ah]+=b5*(S()<<g)}break}k++}if(W===4){$--;
if($===0){W=0}}}function aK(b,a8,aE,ao,b1){var aY=aE/c|0,aB=aE%c;M=aY*b.A+ao;var ah=aB*b.h+b1,b5=a(b,M,ah);
a8(b,b5)}function aH(b,a8,aE){M=aE/b.P|0;var ao=aE%b.P,b1=a(b,M,ao);a8(b,b1)}var aG=P.length;if(o){if(n===0){aV=l===0?an:aF}else{aV=l===0?aQ:av}}else{aV=a$}if(aG===1){am=P[0].P*P[0].c}else{am=c*X.R}while(aE<=am){var aA=H?Math.min(am-aE,H):am;
if(aA>0){for(U=0;U<aG;U++){P[U].Q=0}$=0;if(aG===1){b=P[0];for(a5=0;a5<aA;a5++){aH(b,aV,aE);aE++}}else{for(a5=0;
a5<aA;a5++){for(U=0;U<aG;U++){b=P[U];aU=b.h;ai=b.A;for(Z=0;Z<ai;Z++){for(k=0;k<aU;k++){aK(b,aV,aE,Z,k)}}}aE++}}}J=0;
ax=R(j,A);if(!ax){break}if(ax.u){var aj=aA>0?"unexpected":"excessive";A=ax.offset}if(ax.M>=65488&&ax.M<=65495){A+=2}else{break}}return A-i}function e(j,A,X){var P=j.$,H=j.D,n,B,l,g,O,c,o,i,x,J,$,W,z,M,b,aD,U;
if(!P){throw new w("missing required Quantization Table.")}for(var Z=0;Z<64;Z+=8){x=H[A+Z];J=H[A+Z+1];
$=H[A+Z+2];W=H[A+Z+3];z=H[A+Z+4];M=H[A+Z+5];b=H[A+Z+6];aD=H[A+Z+7];x*=P[Z];if((J|$|W|z|M|b|aD)===0){U=y*x+512>>10;
X[Z]=U;X[Z+1]=U;X[Z+2]=U;X[Z+3]=U;X[Z+4]=U;X[Z+5]=U;X[Z+6]=U;X[Z+7]=U;continue}J*=P[Z+1];$*=P[Z+2];W*=P[Z+3];
z*=P[Z+4];M*=P[Z+5];b*=P[Z+6];aD*=P[Z+7];n=y*x+128>>8;B=y*z+128>>8;l=$;g=b;O=s*(J-aD)+128>>8;i=s*(J+aD)+128>>8;
c=W<<4;o=M<<4;n=n+B+1>>1;B=n-B;U=l*L+g*G+128>>8;l=l*G-g*L+128>>8;g=U;O=O+o+1>>1;o=O-o;i=i+c+1>>1;c=i-c;
n=n+g+1>>1;g=n-g;B=B+l+1>>1;l=B-l;U=O*K+i*E+2048>>12;O=O*E-i*K+2048>>12;i=U;U=c*C+o*t+2048>>12;c=c*t-o*C+2048>>12;
o=U;X[Z]=n+i;X[Z+7]=n-i;X[Z+1]=B+o;X[Z+6]=B-o;X[Z+2]=l+c;X[Z+5]=l-c;X[Z+3]=g+O;X[Z+4]=g-O}for(var k=0;
k<8;++k){x=X[k];J=X[k+8];$=X[k+16];W=X[k+24];z=X[k+32];M=X[k+40];b=X[k+48];aD=X[k+56];if((J|$|W|z|M|b|aD)===0){U=y*x+8192>>14;
if(U<-2040){U=0}else if(U>=2024){U=255}else{U=U+2056>>4}H[A+k]=U;H[A+k+8]=U;H[A+k+16]=U;H[A+k+24]=U;
H[A+k+32]=U;H[A+k+40]=U;H[A+k+48]=U;H[A+k+56]=U;continue}n=y*x+2048>>12;B=y*z+2048>>12;l=$;g=b;O=s*(J-aD)+2048>>12;
i=s*(J+aD)+2048>>12;c=W;o=M;n=(n+B+1>>1)+4112;B=n-B;U=l*L+g*G+2048>>12;l=l*G-g*L+2048>>12;g=U;O=O+o+1>>1;
o=O-o;i=i+c+1>>1;c=i-c;n=n+g+1>>1;g=n-g;B=B+l+1>>1;l=B-l;U=O*K+i*E+2048>>12;O=O*E-i*K+2048>>12;i=U;U=c*C+o*t+2048>>12;
c=c*t-o*C+2048>>12;o=U;x=n+i;aD=n-i;J=B+o;b=B-o;$=l+c;M=l-c;W=g+O;z=g-O;if(x<16){x=0}else if(x>=4080){x=255}else{x>>=4}if(J<16){J=0}else if(J>=4080){J=255}else{J>>=4}if($<16){$=0}else if($>=4080){$=255}else{$>>=4}if(W<16){W=0}else if(W>=4080){W=255}else{W>>=4}if(z<16){z=0}else if(z>=4080){z=255}else{z>>=4}if(M<16){M=0}else if(M>=4080){M=255}else{M>>=4}if(b<16){b=0}else if(b>=4080){b=255}else{b>>=4}if(aD<16){aD=0}else if(aD>=4080){aD=255}else{aD>>=4}H[A+k]=x;
H[A+k+8]=J;H[A+k+16]=$;H[A+k+24]=W;H[A+k+32]=z;H[A+k+40]=M;H[A+k+48]=b;H[A+k+56]=aD}}function D(j,A){var X=A.P,P=A.c,H=new Int16Array(64);
for(var n=0;n<P;n++){for(var B=0;B<X;B++){var l=a(A,n,B);e(A,l,H)}}return A.D}function R(j,A,X){if(X==null)X=A;
var P=j.length-1,H=X<A?X:A;if(A>=P){return null}var n=V(j,A);if(n>=65472&&n<=65534){return{u:null,M:n,offset:A}}var B=V(j,H);
while(!(B>=65472&&B<=65534)){if(++H>=P){return null}B=V(j,H)}return{u:n.toString(16),M:B,offset:H}}m.prototype={parse(j,A){if(A==null)A={};
var X=A.F,P=0,H=null,n=null,B,l,g=0;function O(){var ah=V(j,P);P+=2;var b5=P+ah-2,J=R(j,b5,P);if(J&&J.u){b5=J.offset}var as=j.subarray(P,b5);
P+=as.length;return as}function c(B){var ah=Math.ceil(B.o/8/B.X),b5=Math.ceil(B.s/8/B.B);for(var $=0;
$<B.W.length;$++){aQ=B.W[$];var as=Math.ceil(Math.ceil(B.o/8)*aQ.h/B.X),a3=Math.ceil(Math.ceil(B.s/8)*aQ.A/B.B),b7=ah*aQ.h,aZ=b5*aQ.A,b4=64*aZ*(b7+1);
aQ.D=new Int16Array(b4);aQ.P=as;aQ.c=a3}B.m=ah;B.R=b5}var o=[],i=[],x=[],J=V(j,P);P+=2;if(J!==65496){throw new w("SOI not found")}J=V(j,P);
P+=2;markerLoop:while(J!==65497){var $,W,z;switch(J){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var M=O();
if(J===65504){if(M[0]===74&&M[1]===70&&M[2]===73&&M[3]===70&&M[4]===0){H={version:{d:M[5],T:M[6]},K:M[7],j:M[8]<<8|M[9],H:M[10]<<8|M[11],S:M[12],I:M[13],C:M.subarray(14,14+3*M[12]*M[13])}}}if(J===65518){if(M[0]===65&&M[1]===100&&M[2]===111&&M[3]===98&&M[4]===101){n={version:M[5]<<8|M[6],k:M[7]<<8|M[8],q:M[9]<<8|M[10],a:M[11]}}}break;
case 65499:var b=V(j,P),aD;P+=2;var U=b+P-2;while(P<U){var Z=j[P++],k=new Uint16Array(64);if(Z>>4===0){for(W=0;
W<64;W++){aD=T[W];k[aD]=j[P++]}}else if(Z>>4===1){for(W=0;W<64;W++){aD=T[W];k[aD]=V(j,P);P+=2}}else{throw new w("DQT - invalid table spec")}o[Z&15]=k}break;
case 65472:case 65473:case 65474:if(B){throw new w("Only single frame JPEGs supported")}P+=2;B={};B.G=J===65473;
B.Z=J===65474;B.precision=j[P++];var a5=V(j,P),aV,aE=0,ax=0;P+=2;B.s=X||a5;B.o=V(j,P);P+=2;B.W=[];B._={};
var am=j[P++];for($=0;$<am;$++){aV=j[P];var aU=j[P+1]>>4,ai=j[P+1]&15;if(aE<aU){aE=aU}if(ax<ai){ax=ai}var S=j[P+2];
z=B.W.push({h:aU,A:ai,L:S,$:null});B._[aV]=z-1;P+=3}B.X=aE;B.B=ax;c(B);break;case 65476:var aS=V(j,P);
P+=2;for($=2;$<aS;){var a6=j[P++],ap=new Uint8Array(16),a$=0;for(W=0;W<16;W++,P++){a$+=ap[W]=j[P]}var an=new Uint8Array(a$);
for(W=0;W<a$;W++,P++){an[W]=j[P]}$+=17+a$;(a6>>4===0?x:i)[a6&15]=h(ap,an)}break;case 65501:P+=2;l=V(j,P);
P+=2;break;case 65498:var aF=++g===1&&!X,aQ;P+=2;var av=j[P++],aK=[];for($=0;$<av;$++){var aH=j[P++],aG=B._[aH];
aQ=B.W[aG];aQ.index=aH;var aA=j[P++];aQ.J=x[aA>>4];aQ.i=i[aA&15];aK.push(aQ)}var aj=j[P++],a8=j[P++],ao=j[P++];
try{var b1=f(j,P,B,aK,l,aj,a8,ao>>4,ao&15,aF);P+=b1}catch(ex){if(ex instanceof DNLMarkerError){return this.parse(j,{F:ex.s})}else if(ex instanceof EOIMarkerError){break markerLoop}throw ex}break;
case 65500:P+=4;break;case 65535:if(j[P]!==255){P--}break;default:var aY=R(j,P-2,P-3);if(aY&&aY.u){P=aY.offset;
break}if(P>=j.length-1){break markerLoop}throw new w("JpegImage.parse - unknown marker: "+J.toString(16))}J=V(j,P);
P+=2}this.width=B.o;this.height=B.s;this.g=H;this.b=n;this.W=[];for($=0;$<B.W.length;$++){aQ=B.W[$];
var aB=o[aQ.L];if(aB){aQ.$=aB}this.W.push({index:aQ.index,e:D(B,aQ),l:aQ.h/B.X,t:aQ.A/B.B,P:aQ.P,c:aQ.c})}this.p=this.W.length;
return undefined},Y(j,A,X){if(X==null)X=!1;var P=this.width/j,H=this.height/A,n,B,l,g,O,c,o,i,x,J,$=0,W,z=this.W.length,M=j*A*z,b=new Uint8ClampedArray(M),aD=new Uint32Array(j),U=4294967288,Z;
for(o=0;o<z;o++){n=this.W[o];B=n.l*P;l=n.t*H;$=o;W=n.e;g=n.P+1<<3;if(B!==Z){for(O=0;O<j;O++){i=0|O*B;
aD[O]=(i&U)<<3|i&7}Z=B}for(c=0;c<A;c++){i=0|c*l;J=g*(i&U)|(i&7)<<3;for(O=0;O<j;O++){b[$]=W[J+aD[O]];
$+=z}}}var k=this.V;if(!X&&z===4&&!k){k=new Int32Array([-256,255,-256,255,-256,255,-256,255])}if(k){for(o=0;
o<M;){for(i=0,x=0;i<z;i++,o++,x+=2){b[o]=(b[o]*k[x]>>8)+k[x+1]}}}return b},get f(){if(this.b){return!!this.b.a}if(this.p===3){if(this.N===0){return!1}else if(this.W[0].index===82&&this.W[1].index===71&&this.W[2].index===66){return!1}return!0}if(this.N===1){return!0}return!1},z:function aq(j){var A,X,P;
for(var H=0,n=j.length;H<n;H+=3){A=j[H];X=j[H+1];P=j[H+2];j[H]=A-179.456+1.402*P;j[H+1]=A+135.459-.344*X-.714*P;
j[H+2]=A-226.816+1.772*X}return j},O:function Y(j){var A,X,P,H,n=0;for(var B=0,l=j.length;B<l;B+=4){A=j[B];
X=j[B+1];P=j[B+2];H=j[B+3];j[n++]=-122.67195406894+X*(-660635669420364e-19*X+.000437130475926232*P-54080610064599e-18*A+.00048449797120281*H-.154362151871126)+P*(-.000957964378445773*P+.000817076911346625*A-.00477271405408747*H+1.53380253221734)+A*(.000961250184130688*A-.00266257332283933*H+.48357088451265)+H*(-.000336197177618394*H+.484791561490776);
j[n++]=107.268039397724+X*(219927104525741e-19*X-.000640992018297945*P+.000659397001245577*A+.000426105652938837*H-.176491792462875)+P*(-.000778269941513683*P+.00130872261408275*A+.000770482631801132*H-.151051492775562)+A*(.00126935368114843*A-.00265090189010898*H+.25802910206845)+H*(-.000318913117588328*H-.213742400323665);
j[n++]=-20.810012546947+X*(-.000570115196973677*X-263409051004589e-19*P+.0020741088115012*A-.00288260236853442*H+.814272968359295)+P*(-153496057440975e-19*P-.000132689043961446*A+.000560833691242812*H-.195152027534049)+A*(.00174418132927582*A-.00255243321439347*H+.116935020465145)+H*(-.000343531996510555*H+.24165260232407)}return j.subarray(0,n)},r:function b0(j){var A,X,P;
for(var H=0,n=j.length;H<n;H+=4){A=j[H];X=j[H+1];P=j[H+2];j[H]=434.456-A-1.402*P;j[H+1]=119.541-A+.344*X+.714*P;
j[H+2]=481.816-A-1.772*X}return j},U:function p(j){var A,X,P,H,n=0;for(var B=0,l=j.length;B<l;B+=4){A=j[B];
X=j[B+1];P=j[B+2];H=j[B+3];j[n++]=255+A*(-6747147073602441e-20*A+.0008379262121013727*X+.0002894718188643294*P+.003264231057537806*H-1.1185611867203937)+X*(26374107616089404e-21*X-8626949158638572e-20*P-.0002748769067499491*H-.02155688794978967)+P*(-3878099212869363e-20*P-.0003267808279485286*H+.0686742238595345)-H*(.0003361971776183937*H+.7430659151342254);
j[n++]=255+A*(.00013596372813588848*A+.000924537132573585*X+.00010567359618683593*P+.0004791864687436512*H-.3109689587515875)+X*(-.00023545346108370344*X+.0002702845253534714*P+.0020200308977307156*H-.7488052167015494)+P*(6834815998235662e-20*P+.00015168452363460973*H-.09751927774728933)-H*(.0003189131175883281*H+.7364883807733168);
j[n++]=255+A*(13598650411385308e-21*A+.00012423956175490851*X+.0004751985097583589*P-36729317476630424e-22*H-.05562186980264034)+X*(.00016141380598724676*X+.0009692239130725186*P+.0007782692450036253*H-.44015232367526463)+P*(5.068882914068769e-7*P+.0017778369011375071*H-.7591454649749609)-H*(.0003435319965105553*H+.7063770186160144)}return j.subarray(0,n)},getData:function(j){var A=j.width,X=j.height,P=j.forceRGB,H=j.isSourcePDF;
if(this.p>4){throw new w("Unsupported color mode")}var n=this.Y(A,X,H);if(this.p===1&&P){var B=n.length,l=new Uint8ClampedArray(B*3),g=0;
for(var O=0;O<B;O++){var c=n[O];l[g++]=c;l[g++]=c;l[g++]=c}return l}else if(this.p===3&&this.f){return this.z(n)}else if(this.p===4){if(this.f){if(P){return this.O(n)}return this.r(n)}else if(P){return this.U(n)}}return n}};
return m}();function N(T,t){return T[t]<<24>>24}function V(T,t){return T[t]<<8|T[t+1]}function r(T,t){return(T[t]<<24|T[t+1]<<16|T[t+2]<<8|T[t+3])>>>0}u.JpegDecoder=m}());
u.encodeImage=function(w,m,v,Q){var V={t256:[m],t257:[v],t258:[8,8,8,8],t259:[1],t262:[2],t273:[1e3],t277:[4],t278:[v],t279:[m*v*4],t282:[[72,1]],t283:[[72,1]],t284:[1],t286:[[0,1]],t287:[[0,1]],t296:[1],t305:["Photopea (UTIF.js)"],t338:[1]};
if(Q)for(var r in Q)V[r]=Q[r];var T=new Uint8Array(u.encode([V])),t=new Uint8Array(w),C=new Uint8Array(1e3+m*v*4);
for(var r=0;r<T.length;r++)C[r]=T[r];for(var r=0;r<t.length;r++)C[1e3+r]=t[r];return C.buffer};u.encode=function(w){var m=!1,v=new Uint8Array(2e4),Q=4,N=m?u._binLE:u._binBE,V=8;
v[0]=v[1]=m?73:77;N.writeUshort(v,2,42);N.writeUint(v,Q,V);Q+=4;for(var r=0;r<w.length;r++){var T=u._writeIFD(N,u._types.basic,v,V,w[r]);
V=T[1];if(r<w.length-1){if((V&3)!=0)V+=4-(V&3);N.writeUint(v,T[0],V)}}return v.slice(0,V).buffer};u.decode=function(w,m){if(m==null)m={parseMN:!0,debug:!1};
var v=new Uint8Array(w),Q=0,N=u._binBE.readASCII(v,Q,2);Q+=2;var V=N=="II"?u._binLE:u._binBE,r=V.readUshort(v,Q);
Q+=2;var T=V.readUint(v,Q);Q+=4;var t=[];while(!0){var C=V.readUshort(v,T),E=V.readUshort(v,T+4);if(C!=0)if(E<1||13<E){aN("error in TIFF");
break}u._readIFD(V,v,T,t,0,m);T=V.readUint(v,T+2+C*12);if(T==0)break}return t};u.decodeImage=function(w,m,v){if(m.data)return;
var Q=new Uint8Array(w),N=u._binBE.readASCII(Q,0,2),T,d=0;if(m.t256==null)return;m.isLE=N=="II";m.width=m.t256[0];
m.height=m.t257[0];var V=m.t259?m.t259[0]:1,r=m.t266?m.t266[0]:1;if(m.t284&&m.t284[0]==2)aN("PlanarConfiguration 2 should not be used!");
if(V==7&&m.t258&&m.t258.length>3)m.t258=m.t258.slice(0,3);if(m.t258)T=Math.min(32,m.t258[0])*m.t258.length;
else T=m.t277?m.t277[0]:1;if(V==1&&m.t279!=null&&m.t278&&m.t262[0]==32803){T=Math.round(m.t279[0]*8/(m.width*m.t278[0]))}var t=Math.ceil(m.width*T/8)*8,C=m.t273;
if(C==null)C=m.t324;var E=m.t279;if(V==1&&C.length==1)E=[m.height*(t>>>3)];if(E==null)E=m.t325;var K=new Uint8Array(m.height*(t>>>3));
if(m.t322!=null){var G=m.t322[0],L=m.t323[0],y=Math.floor((m.width+G-1)/G),_=Math.floor((m.height+L-1)/L),s=new Uint8Array(Math.ceil(G*L*T/8)|0);
for(var h=0;h<_;h++)for(var a=0;a<y;a++){var D=h*y+a;for(var R=0;R<s.length;R++)s[R]=0;u.decode._decompress(m,v,Q,C[D],E[D],V,s,0,r);
if(V==6)K=s;else u._copyTile(s,Math.ceil(G*T/8)|0,L,K,Math.ceil(m.width*T/8)|0,m.height,Math.ceil(a*G*T/8)|0,h*L)}d=K.length*8}else{var aq=m.t278?m.t278[0]:m.height;
aq=Math.min(aq,m.height);for(var D=0;D<C.length;D++){u.decode._decompress(m,v,Q,C[D],E[D],V,K,Math.ceil(d/8)|0,r);
d+=t*aq}d=Math.min(d,K.length*8)}m.data=new Uint8Array(K.buffer,0,Math.ceil(d/8)|0)};u.decode._decompress=function(w,m,v,Q,N,V,r,T,t){if(!1){}else if(V==1)for(var C=0;
C<N;C++)r[T+C]=v[Q+C];else if(V==3)u.decode._decodeG3(v,Q,N,r,T,w.width,t,w.t292?(w.t292[0]&1)==1:!1);
else if(V==4)u.decode._decodeG4(v,Q,N,r,T,w.width,t);else if(V==5)u.decode._decodeLZW(v,Q,N,r,T,8);else if(V==6)u.decode._decodeOldJPEG(w,v,Q,N,r,T);
else if(V==7||V==34892)u.decode._decodeNewJPEG(w,v,Q,N,r,T);else if(V==8||V==32946){var E=new Uint8Array(v.buffer,Q,N),K=b3.inflate(E);
for(var d=0;d<K.length;d++)r[T+d]=K[d]}else if(V==9)u.decode._decodeVC5(v,Q,N,r,T);else if(V==32767)u.decode._decodeARW(w,v,Q,N,r,T);
else if(V==32773)u.decode._decodePackBits(v,Q,N,r,T);else if(V==32809)u.decode._decodeThunder(v,Q,N,r,T);
else if(V==34713)u.decode._decodeNikon(w,m,v,Q,N,r,T);else aN("Unknown compression",V);var G=w.t258?Math.min(32,w.t258[0]):1,L=w.t277?w.t277[0]:1,y=G*L>>>3,_=w.t278?w.t278[0]:w.height,s=Math.ceil(G*L*w.width/8);
if(G==16&&!w.isLE&&w.t33422==null)for(var h=0;h<_;h++){var a=T+h*s;for(var f=1;f<s;f+=2){var D=r[a+f];
r[a+f]=r[a+f-1];r[a+f-1]=D}}if(w.t317&&w.t317[0]==2){for(var h=0;h<_;h++){var R=T+h*s;if(G==16)for(var C=y;
C<s;C+=2){var aq=(r[R+C+1]<<8|r[R+C])+(r[R+C-y+1]<<8|r[R+C-y]);r[R+C]=aq&255;r[R+C+1]=aq>>>8&255}else if(L==3)for(var C=3;
C<s;C+=3){r[R+C]=r[R+C]+r[R+C-3]&255;r[R+C+1]=r[R+C+1]+r[R+C-2]&255;r[R+C+2]=r[R+C+2]+r[R+C-1]&255}else for(var C=y;
C<s;C++)r[R+C]=r[R+C]+r[R+C-y]&255}}};u.decode._decodeVC5=u.decode._decodeVC5=function(){var w=[1,0,1,0,2,2,1,1,3,7,1,2,5,25,1,3,6,48,1,4,6,54,1,5,7,111,1,8,7,99,1,6,7,105,12,0,7,107,1,7,8,209,20,0,8,212,1,9,8,220,1,10,9,393,1,11,9,394,32,0,9,416,1,12,9,427,1,13,10,887,1,18,10,784,1,14,10,790,1,15,10,835,60,0,10,852,1,16,10,885,1,17,11,1571,1,19,11,1668,1,20,11,1669,100,0,11,1707,1,21,11,1772,1,22,12,3547,1,29,12,3164,1,24,12,3166,1,25,12,3140,1,23,12,3413,1,26,12,3537,1,27,12,3539,1,28,13,7093,1,35,13,6283,1,30,13,6331,1,31,13,6335,180,0,13,6824,1,32,13,7072,1,33,13,7077,320,0,13,7076,1,34,14,12565,1,36,14,12661,1,37,14,12669,1,38,14,13651,1,39,14,14184,1,40,15,28295,1,46,15,28371,1,47,15,25320,1,42,15,25336,1,43,15,25128,1,41,15,27300,1,44,15,28293,1,45,16,50259,1,48,16,50643,1,49,16,50675,1,50,16,56740,1,53,16,56584,1,51,16,56588,1,52,17,113483,1,61,17,113482,1,60,17,101285,1,55,17,101349,1,56,17,109205,1,57,17,109207,1,58,17,100516,1,54,17,113171,1,59,18,202568,1,62,18,202696,1,63,18,218408,1,64,18,218412,1,65,18,226340,1,66,18,226356,1,67,18,226358,1,68,19,402068,1,69,19,405138,1,70,19,405394,1,71,19,436818,1,72,19,436826,1,73,19,452714,1,75,19,452718,1,76,19,452682,1,74,20,804138,1,77,20,810279,1,78,20,810790,1,79,20,873638,1,80,20,873654,1,81,20,905366,1,82,20,905430,1,83,20,905438,1,84,21,1608278,1,85,21,1620557,1,86,21,1621582,1,87,21,1621583,1,88,21,1747310,1,89,21,1810734,1,90,21,1810735,1,91,21,1810863,1,92,21,1810879,1,93,22,3621725,1,99,22,3621757,1,100,22,3241112,1,94,22,3494556,1,95,22,3494557,1,96,22,3494622,1,97,22,3494623,1,98,23,6482227,1,102,23,6433117,1,101,23,6989117,1,103,23,6989119,1,105,23,6989118,1,104,23,7243449,1,106,23,7243512,1,107,24,13978233,1,111,24,12964453,1,109,24,12866232,1,108,24,14486897,1,113,24,13978232,1,110,24,14486896,1,112,24,14487026,1,114,24,14487027,1,115,25,25732598,1,225,25,25732597,1,189,25,25732596,1,188,25,25732595,1,203,25,25732594,1,202,25,25732593,1,197,25,25732592,1,207,25,25732591,1,169,25,25732590,1,223,25,25732589,1,159,25,25732522,1,235,25,25732579,1,152,25,25732575,1,192,25,25732489,1,179,25,25732573,1,201,25,25732472,1,172,25,25732576,1,149,25,25732488,1,178,25,25732566,1,120,25,25732571,1,219,25,25732577,1,150,25,25732487,1,127,25,25732506,1,211,25,25732548,1,125,25,25732588,1,158,25,25732486,1,247,25,25732467,1,238,25,25732508,1,163,25,25732552,1,228,25,25732603,1,183,25,25732513,1,217,25,25732587,1,168,25,25732520,1,122,25,25732484,1,128,25,25732562,1,249,25,25732505,1,187,25,25732504,1,186,25,25732483,1,136,25,25928905,1,181,25,25732560,1,255,25,25732500,1,230,25,25732482,1,135,25,25732555,1,233,25,25732568,1,222,25,25732583,1,145,25,25732481,1,134,25,25732586,1,167,25,25732521,1,248,25,25732518,1,209,25,25732480,1,243,25,25732512,1,216,25,25732509,1,164,25,25732547,1,140,25,25732479,1,157,25,25732544,1,239,25,25732574,1,191,25,25732564,1,251,25,25732478,1,156,25,25732546,1,139,25,25732498,1,242,25,25732557,1,133,25,25732477,1,162,25,25732515,1,213,25,25732584,1,165,25,25732514,1,212,25,25732476,1,227,25,25732494,1,198,25,25732531,1,236,25,25732530,1,234,25,25732529,1,117,25,25732528,1,215,25,25732527,1,124,25,25732526,1,123,25,25732525,1,254,25,25732524,1,253,25,25732523,1,148,25,25732570,1,218,25,25732580,1,146,25,25732581,1,147,25,25732569,1,224,25,25732533,1,143,25,25732540,1,184,25,25732541,1,185,25,25732585,1,166,25,25732556,1,132,25,25732485,1,129,25,25732563,1,250,25,25732578,1,151,25,25732501,1,119,25,25732502,1,193,25,25732536,1,176,25,25732496,1,245,25,25732553,1,229,25,25732516,1,206,25,25732582,1,144,25,25732517,1,208,25,25732558,1,137,25,25732543,1,241,25,25732466,1,237,25,25732507,1,190,25,25732542,1,240,25,25732551,1,131,25,25732554,1,232,25,25732565,1,252,25,25732475,1,171,25,25732493,1,205,25,25732492,1,204,25,25732491,1,118,25,25732490,1,214,25,25928904,1,180,25,25732549,1,126,25,25732602,1,182,25,25732539,1,175,25,25732545,1,141,25,25732559,1,138,25,25732537,1,177,25,25732534,1,153,25,25732503,1,194,25,25732606,1,160,25,25732567,1,121,25,25732538,1,174,25,25732497,1,246,25,25732550,1,130,25,25732572,1,200,25,25732474,1,170,25,25732511,1,221,25,25732601,1,196,25,25732532,1,142,25,25732519,1,210,25,25732495,1,199,25,25732605,1,155,25,25732535,1,154,25,25732499,1,244,25,25732510,1,220,25,25732600,1,195,25,25732607,1,161,25,25732604,1,231,25,25732473,1,173,25,25732599,1,226,26,51465122,1,116,26,51465123,0,1],v,Q,N,V=[3,3,3,3,2,2,2,1,1,1],r=24576,T=16384,t=8192,C=T|t;
function E(e){var D=e[1],Y=e[0][D>>>3]>>>7-(D&7)&1;e[1]++;return Y}function K(e,D){if(v==null){v={};
for(var Y=0;Y<w.length;Y+=4)v[w[Y+1]]=w.slice(Y,Y+4)}var p=E(e),j=v[p];while(j==null){p=p<<1|E(e);j=v[p]}var A=j[3];
if(A!=0)A=E(e)==0?A:-A;D[0]=j[2];D[1]=A}function d(e,D){for(var Y=0;Y<D;Y++){if((e&1)==1)e++;e=e>>>1}return e}function G(e,D){return e>>D}function L(e,D,Y,p,j,A){D[Y]=G(G(11*e[j]-4*e[j+A]+e[j+A+A]+4,3)+e[p],1);
D[Y+A]=G(G(5*e[j]+4*e[j+A]-e[j+A+A]+4,3)-e[p],1)}function y(e,D,Y,p,j,A){var P=e[j-A]-e[j+A],H=e[j],l=e[p];
D[Y]=G(G(P+4,3)+H+l,1);D[Y+A]=G(G(-P+4,3)+H-l,1)}function _(e,D,Y,p,j,A){D[Y]=G(G(5*e[j]+4*e[j-A]-e[j-A-A]+4,3)+e[p],1);
D[Y+A]=G(G(11*e[j]-4*e[j-A]+e[j-A-A]+4,3)-e[p],1)}function h(e){e=e<0?0:e>4095?4095:e;e=N[e]>>>2;return e}function a(e,D,Y,p,j){p=new Uint16Array(p.buffer);
var A=Date.now(),P=u._binBE,H=D+Y,l,o,b8,x,ac,$,ae,W,z,ad,aL,a1,M,a_,b,aM,q,F;D+=4;while(D<H){var I=P.readShort(e,D),Z=P.readUshort(e,D+2);
D+=4;if(I==12)l=Z;else if(I==20)o=Z;else if(I==21)b8=Z;else if(I==48)x=Z;else if(I==53)ac=Z;else if(I==35)$=Z;
else if(I==62)ae=Z;else if(I==101)W=Z;else if(I==109)z=Z;else if(I==84)ad=Z;else if(I==106)aL=Z;else if(I==107)a1=Z;
else if(I==108)M=Z;else if(I==102)a_=Z;else if(I==104)b=Z;else if(I==105)aM=Z;else{var k=I<0?-I:I,aa=k&65280,at=0;
if(k&C){if(k&t){at=Z&65535;at+=(k&255)<<16}else{at=Z&65535}}if((k&r)==r){if(q==null){q=[];for(var aW=0;
aW<4;aW++)q[aW]=new Int16Array((o>>>1)*(b8>>>1));F=new Int16Array((o>>>1)*(b8>>>1));Q=new Int16Array(1024);
for(var aW=0;aW<1024;aW++){var a9=aW-512,a2=Math.abs(a9),l=Math.floor(768*a2*a2*a2/(255*255*255))+a2;
Q[aW]=Math.sign(a9)*l}N=new Uint16Array(4096);var a5=(1<<16)-1;for(var aW=0;aW<4096;aW++){var aV=aW,aX=a5*(Math.pow(113,aV/4095)-1)/112;
N[aW]=Math.min(aX,a5)}}var aR=q[ae],aE=d(o,1+V[x]),am=d(b8,1+V[x]);if(x==0){for(var S=0;S<am;S++)for(var ap=0;
ap<aE;ap++){var a$=D+(S*aE+ap)*2;aR[S*(o>>>1)+ap]=e[a$]<<8|e[a$+1]}}else{var an=[e,D*8],aF=[],av=0,aK=aE*am,aH=[0,0],aG=0,Z=0;
while(av<aK){K(an,aH);aG=aH[0];Z=aH[1];while(aG>0){aF[av++]=Z;aG--}}var aA=(x-1)%3,aj=aA!=1?aE:0,a8=aA!=0?am:0;
for(var S=0;S<am;S++){var ao=(S+a8)*(o>>>1)+aj,b1=S*aE;for(var ap=0;ap<aE;ap++)aR[ao+ap]=Q[aF[b1+ap]+512]*ac}if(aA==2){var b=o>>>1,aY=aE*2,aB=am*2;
for(var S=0;S<am;S++){for(var ap=0;ap<aY;ap++){var aW=S*2*b+ap,ah=S*b+ap,b5=am*b+ah;if(S==0)L(aR,F,aW,b5,ah,b);
else if(S==am-1)_(aR,F,aW,b5,ah,b);else y(aR,F,aW,b5,ah,b)}}var as=aR;aR=F;F=as;for(var S=0;S<aB;S++){for(var ap=0;
ap<aE;ap++){var aW=S*b+2*ap,ah=S*b+ap,b5=aE+ah;if(ap==0)L(aR,F,aW,b5,ah,1);else if(ap==aE-1)_(aR,F,aW,b5,ah,1);
else y(aR,F,aW,b5,ah,1)}}var as=aR;aR=F;F=as;var a3=[],b7=2-~~((x-1)/3);for(var aZ=0;aZ<3;aZ++)a3[aZ]=z>>14-aZ*2&3;
var b4=a3[b7];if(b4!=0)for(var S=0;S<aB;S++)for(var ap=0;ap<aY;ap++){var aW=S*b+ap;aR[aW]=aR[aW]<<b4}}}if(x==9&&ae==3){var aC=q[0],ag=q[1],ak=q[2],ab=q[3];
for(var S=0;S<b8;S+=2)for(var ap=0;ap<o;ap+=2){var b6=S*o+ap,a$=(S>>>1)*(o>>>1)+(ap>>>1),aw=aC[a$],aP=ag[a$]-2048,aI=ak[a$]-2048,ar=ab[a$]-2048,af=(aP<<1)+aw,a4=(aI<<1)+aw,aJ=aw+ar,ay=aw-ar;
p[b6]=h(af);p[b6+1]=h(aJ);p[b6+o]=h(ay);p[b6+o+1]=h(a4)}}D+=at*4}else if(k==16388){D+=at*4}else if(aa==8192||aa==8448||aa==9216){}else throw k.toString(16)}}console.log(Date.now()-A)}return a}();
u.decode._ljpeg_diff=function(w,m,v){var Q=u.decode._getbithuff,N,V;N=Q(w,m,v[0],v);V=Q(w,m,N,0);if((V&1<<N-1)==0)V-=(1<<N)-1;
return V};u.decode._decodeARW=function(w,m,v,Q,N,V){var r=w.t256[0],T=w.t257[0],t=w.t258[0],C=w.isLE?u._binLE:u._binBE,E=r*T==Q||r*T*1.5==Q,h,s,p,j,A,X,P,H,n,L,B;
if(!E){T+=8;var K=[v,0,0,0],d=new Uint16Array(32770),G=[3857,3856,3599,3342,3085,2828,2571,2314,2057,1800,1543,1286,1029,772,771,768,514,513],L,y,_,s,h,a=0,f=u.decode._ljpeg_diff;
d[0]=15;for(_=L=0;L<18;L++){var e=32768>>>(G[L]>>>8);for(var y=0;y<e;y++)d[++_]=G[L]}for(s=r;s--;)for(h=0;
h<T+1;h+=2){if(h==T)h=1;a+=f(m,K,d);if(h<T){var D=a&4095;u.decode._putsF(N,(h*r+s)*t,D<<16-t)}}return}if(r*T*1.5==Q){for(var L=0;
L<Q;L+=3){var R=m[v+L+0],aq=m[v+L+1],Y=m[v+L+2];N[V+L]=aq<<4|R>>>4;N[V+L+1]=R<<4|Y>>>4;N[V+L+2]=Y<<4|aq>>>4}return}var b0=new Uint16Array(16),l=new Uint8Array(r+1);
for(h=0;h<T;h++){for(var g=0;g<r;g++)l[g]=m[v++];for(B=0,s=0;s<r-30;B+=16){j=2047&(p=C.readUint(l,B));
A=2047&p>>>11;X=15&p>>>22;P=15&p>>>26;for(H=0;H<4&&128<<H<=j-A;H++);for(n=30,L=0;L<16;L++)if(L==X)b0[L]=j;
else if(L==P)b0[L]=A;else{b0[L]=((C.readUshort(l,B+(n>>3))>>>(n&7)&127)<<H)+A;if(b0[L]>2047)b0[L]=2047;
n+=7}for(L=0;L<16;L++,s+=2){var D=b0[L]<<1;u.decode._putsF(N,(h*r+s)*t,D<<16-t)}s-=s&1?1:31}}};u.decode._decodeNikon=function(w,m,v,Q,N,V,r){var T=[[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,5,4,3,6,2,7,1,0,8,9,11,10,12],[0,0,1,5,1,1,1,1,1,1,2,0,0,0,0,0,0,57,90,56,39,22,5,4,3,2,1,0,11,12,12],[0,0,1,4,2,3,1,2,0,0,0,0,0,0,0,0,0,5,4,6,3,7,2,8,1,9,0,10,11,12],[0,0,1,4,3,1,1,1,1,1,2,0,0,0,0,0,0,5,6,4,7,8,3,9,2,1,0,10,11,12,13,14],[0,0,1,5,1,1,1,1,1,1,1,2,0,0,0,0,0,8,92,75,58,41,7,6,5,4,3,2,1,0,13,14],[0,0,1,4,2,2,3,1,2,0,0,0,0,0,0,0,0,7,6,8,5,9,4,10,3,11,12,2,0,1,13,14]],t=w.t256[0],C=w.t257[0],E=w.t258[0],K=0,d=0,G=u.decode._make_decoder,L=u.decode._getbithuff,y=m[0].exifIFD.makerNote,_=y.t150?y.t150:y.t140,s=0,h=_[s++],a=_[s++],Y=0,D,p,j,A,X,P,H=0;
if(h==73||a==88)s+=2110;if(h==70)K=2;if(E==14)K+=3;var f=[[0,0],[0,0]],e=w.isLE?u._binLE:u._binBE;for(var D=0;
D<2;D++)for(var R=0;R<2;R++){f[D][R]=e.readShort(_,s);s+=2}var aq=1<<E&32767,b0=e.readShort(_,s);s+=2;
if(b0>1)Y=Math.floor(aq/(b0-1));if(h==68&&a==32&&Y>0)d=e.readShort(_,562);var n=[0,0],B=G(T[K]),l=[Q,0,0,0];
for(H=p=0;p<C;p++){if(d&&p==d){B=G(T[K+1])}for(j=0;j<t;j++){D=L(v,l,B[0],B);A=D&15;X=D>>>4;P=(L(v,l,A-X,0)<<1)+1<<X>>>1;
if((P&1<<A-1)==0)P-=(1<<A)-(X==0?1:0);if(j<2)n[j]=f[p&1][j]+=P;else n[j&1]+=P;var g=Math.min(Math.max(n[j&1],0),(1<<E)-1),O=(p*t+j)*E;
u.decode._putsF(V,O,g<<16-E)}}};u.decode._putsF=function(w,m,v){v=v<<8-(m&7);var Q=m>>>3;w[Q]|=v>>>16;
w[Q+1]|=v>>>8;w[Q+2]|=v};u.decode._getbithuff=function(w,m,v,Q){var N=0,V=u.decode._get_byte,r,T=m[0],t=m[1],C=m[2],E=m[3];
if(v==0||C<0)return 0;while(!E&&C<v&&(r=w[T++])!=-1&&!(E=N&&r==255&&w[T++])){t=(t<<8)+r;C+=8}r=t<<32-C>>>32-v;
if(Q){C-=Q[r+1]>>>8;r=Q[r+1]&255}else C-=v;if(C<0)throw"e";m[0]=T;m[1]=t;m[2]=C;m[3]=E;return r};u.decode._make_decoder=function(w){var m,v,Q,V,r,T=[],t=17;
for(m=16;m!=0&&!w[m];m--);T[0]=m;for(Q=v=1;v<=m;v++)for(V=0;V<w[v];V++,++t)for(r=0;r<1<<m-v;r++)if(Q<=1<<m)T[Q++]=v<<8|w[t];
return T};u.decode._decodeNewJPEG=function(w,m,v,Q,N,V){Q=Math.min(Q,m.length-v);var r=w.t347,T=r?r.length:0,t=new Uint8Array(T+Q);
if(r){var C=216,E=217,K=0;for(var d=0;d<T-1;d++){if(r[d]==255&&r[d+1]==E)break;t[K++]=r[d]}var G=m[v],L=m[v+1];
if(G!=255||L!=C){t[K++]=G;t[K++]=L}for(var d=2;d<Q;d++)t[K++]=m[v+d]}else for(var d=0;d<Q;d++)t[d]=m[v+d];
if(w.t262[0]==32803||w.t259[0]==7&&w.t262[0]==34892){var y=w.t258[0],_=u.LosslessJpegDecode(t),s=_.length;
if(!1){}else if(y==16){if(w.isLE)for(var d=0;d<s;d++){N[V+(d<<1)]=_[d]&255;N[V+(d<<1)+1]=_[d]>>>8}else for(var d=0;
d<s;d++){N[V+(d<<1)]=_[d]>>>8;N[V+(d<<1)+1]=_[d]&255}}else if(y==14||y==12){var h=16-y;for(var d=0;d<s;
d++)u.decode._putsF(N,d*y,_[d]<<h)}else if(y==8){for(var d=0;d<s;d++)N[V+d]=_[d]}else throw new Error("unsupported bit depth "+y)}else{var a=new u.JpegDecoder;
a.parse(t);var f=a.getData({width:a.width,height:a.height,forceRGB:!0,isSourcePDF:!1});for(var d=0;d<f.length;
d++)N[V+d]=f[d]}if(w.t262[0]==6)w.t262[0]=2};u.decode._decodeOldJPEGInit=function(w,m,v,Q){var N=216,V=217,r=219,T=196,t=221,C=192,E=218,K=0,d=0,G,L,y=!1,_,s,h,a=w.t513,f=a?a[0]:0,e=w.t514,D=e?e[0]:0,R=w.t324||w.t273||a,aq=w.t530,Y=0,b0=0,p=w.t277?w.t277[0]:1,j=w.t515;
if(R){d=R[0];y=R.length>1}if(!y){if(m[v]==255&&m[v+1]==N)return{jpegOffset:v};if(a!=null){if(m[v+f]==255&&m[v+f+1]==N)K=v+f;
else aN("JPEGInterchangeFormat does not point to SOI");if(e==null)aN("JPEGInterchangeFormatLength field is missing");
else if(f>=d||f+D<=d)aN("JPEGInterchangeFormatLength field value is invalid");if(K!=null)return{jpegOffset:K}}}if(aq!=null){Y=aq[0];
b0=aq[1]}if(a!=null)if(e!=null)if(D>=2&&f+D<=d){if(m[v+f+D-2]==255&&m[v+f+D-1]==N)G=new Uint8Array(D-2);
else G=new Uint8Array(D);for(_=0;_<G.length;_++)G[_]=m[v+f+_];aN("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables")}else aN("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
if(G==null){var A=0,X=[];X[A++]=255;X[A++]=N;var P=w.t519;if(P==null)throw new Error("JPEGQTables tag is missing");
for(_=0;_<P.length;_++){X[A++]=255;X[A++]=r;X[A++]=0;X[A++]=67;X[A++]=_;for(s=0;s<64;s++)X[A++]=m[v+P[_]+s]}for(h=0;
h<2;h++){var H=w[h==0?"t520":"t521"];if(H==null)throw new Error((h==0?"JPEGDCTables":"JPEGACTables")+" tag is missing");
for(_=0;_<H.length;_++){X[A++]=255;X[A++]=T;var n=19;for(s=0;s<16;s++)n+=m[v+H[_]+s];X[A++]=n>>>8;X[A++]=n&255;
X[A++]=_|h<<4;for(s=0;s<16;s++)X[A++]=m[v+H[_]+s];for(s=0;s<n;s++)X[A++]=m[v+H[_]+16+s]}}X[A++]=255;
X[A++]=C;X[A++]=0;X[A++]=8+3*p;X[A++]=8;X[A++]=w.height>>>8&255;X[A++]=w.height&255;X[A++]=w.width>>>8&255;
X[A++]=w.width&255;X[A++]=p;if(p==1){X[A++]=1;X[A++]=17;X[A++]=0}else for(_=0;_<3;_++){X[A++]=_+1;X[A++]=_!=0?17:(Y&15)<<4|b0&15;
X[A++]=_}if(j!=null&&j[0]!=0){X[A++]=255;X[A++]=t;X[A++]=0;X[A++]=4;X[A++]=j[0]>>>8&255;X[A++]=j[0]&255}G=new Uint8Array(X)}var B=-1;
_=0;while(_<G.length-1){if(G[_]==255&&G[_+1]==C){B=_;break}_++}if(B==-1){var l=new Uint8Array(G.length+10+3*p);
l.set(G);var g=G.length;B=G.length;G=l;G[g++]=255;G[g++]=C;G[g++]=0;G[g++]=8+3*p;G[g++]=8;G[g++]=w.height>>>8&255;
G[g++]=w.height&255;G[g++]=w.width>>>8&255;G[g++]=w.width&255;G[g++]=p;if(p==1){G[g++]=1;G[g++]=17;G[g++]=0}else for(_=0;
_<3;_++){G[g++]=_+1;G[g++]=_!=0?17:(Y&15)<<4|b0&15;G[g++]=_}}if(m[d]==255&&m[d+1]==E){var O=m[d+2]<<8|m[d+3];
L=new Uint8Array(O+2);L[0]=m[d];L[1]=m[d+1];L[2]=m[d+2];L[3]=m[d+3];for(_=0;_<O-2;_++)L[_+4]=m[d+_+4]}else{L=new Uint8Array(2+6+2*p);
var c=0;L[c++]=255;L[c++]=E;L[c++]=0;L[c++]=6+2*p;L[c++]=p;if(p==1){L[c++]=1;L[c++]=0}else for(_=0;_<3;
_++){L[c++]=_+1;L[c++]=_<<4|_}L[c++]=0;L[c++]=63;L[c++]=0}return{jpegOffset:v,tables:G,sosMarker:L,sofPosition:B}};
u.decode._decodeOldJPEG=function(w,m,v,Q,N,V){var r,T,t,C,E,K=u.decode._decodeOldJPEGInit(w,m,v,Q);if(K.jpegOffset!=null){T=v+Q-K.jpegOffset;
C=new Uint8Array(T);for(r=0;r<T;r++)C[r]=m[K.jpegOffset+r]}else{t=K.tables.length;C=new Uint8Array(t+K.sosMarker.length+Q+2);
C.set(K.tables);E=t;C[K.sofPosition+5]=w.height>>>8&255;C[K.sofPosition+6]=w.height&255;C[K.sofPosition+7]=w.width>>>8&255;
C[K.sofPosition+8]=w.width&255;if(m[v]!=255||m[v+1]!=SOS){C.set(K.sosMarker,E);E+=sosMarker.length}for(r=0;
r<Q;r++)C[E++]=m[v+r];C[E++]=255;C[E++]=EOI}var d=new u.JpegDecoder;d.parse(C);var G=d.getData({width:d.width,height:d.height,forceRGB:!0,isSourcePDF:!1});
for(var r=0;r<G.length;r++)N[V+r]=G[r];if(w.t262&&w.t262[0]==6)w.t262[0]=2};u.decode._decodePackBits=function(w,m,v,Q,N){var V=new Int8Array(w.buffer),r=new Int8Array(Q.buffer),T=m+v;
while(m<T){var t=V[m];m++;if(t>=0&&t<128)for(var C=0;C<t+1;C++){r[N]=V[m];N++;m++}if(t>=-127&&t<0){for(var C=0;
C<-t+1;C++){r[N]=V[m];N++}m++}}};u.decode._decodeThunder=function(w,m,v,Q,N){var V=[0,1,0,-1],r=[0,1,2,3,0,-3,-2,-1],T=m+v,t=N*2,C=0;
while(m<T){var E=w[m],K=E>>>6,d=E&63;m++;if(K==3){C=d&15;Q[t>>>1]|=C<<4*(1-t&1);t++}if(K==0)for(var G=0;
G<d;G++){Q[t>>>1]|=C<<4*(1-t&1);t++}if(K==2)for(var G=0;G<2;G++){var L=d>>>3*(1-G)&7;if(L!=4){C+=r[L];
Q[t>>>1]|=C<<4*(1-t&1);t++}}if(K==1)for(var G=0;G<3;G++){var L=d>>>2*(2-G)&3;if(L!=2){C+=V[L];Q[t>>>1]|=C<<4*(1-t&1);
t++}}}};u.decode._dmap={"1":0,"011":1,"000011":2,"0000011":3,"010":-1,"000010":-2,"0000010":-3};u.decode._lens=function(){var w=function(t,C,E,K){for(var d=0;
d<C.length;d++)t[C[d]]=E+d*K},m="00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101,"+"101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010,"+"00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010,"+"00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100",v="0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000,"+"0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001,"+"000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111,"+"000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111",Q="11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110,"+"011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011",N="0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100,"+"0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010,"+"0000001011011,0000001100100,0000001100101",V="00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
m=m.split(",");v=v.split(",");Q=Q.split(",");N=N.split(",");V=V.split(",");var r={},T={};w(r,m,0,1);
w(r,Q,64,64);w(r,V,1792,64);w(T,v,0,1);w(T,N,64,64);w(T,V,1792,64);return[r,T]}();u.decode._decodeG4=function(w,m,v,Q,N,V,r){var T=u.decode,t=m<<3,C=0,E="",K=[],d=[],L=0,y=0,_=0,s=0,h=0,f=0,e=0,D="",R=0;
for(var G=0;G<V;G++)d.push(0);d=T._makeDiff(d);var aq=Math.ceil(V/8)*8;while(t>>>3<m+v){s=T._findDiff(d,L+(L==0?0:1),1-f),h=T._findDiff(d,s,f);
var Y=0;if(r==1)Y=w[t>>>3]>>>7-(t&7)&1;if(r==2)Y=w[t>>>3]>>>(t&7)&1;t++;E+=Y;if(D=="H"){if(T._lens[f][E]!=null){var b0=T._lens[f][E];
E="";C+=b0;if(b0<64){T._addNtimes(K,C,f);L+=C;f=1-f;C=0;R--;if(R==0)D=""}}}else{if(E=="0001"){E="";T._addNtimes(K,h-L,f);
L=h}if(E=="001"){E="";D="H";R=2}if(T._dmap[E]!=null){y=s+T._dmap[E];T._addNtimes(K,y-L,f);L=y;E="";f=1-f}}if(K.length==V&&D==""){T._writeBits(K,Q,N*8+e*aq);
f=0;e++;L=0;d=T._makeDiff(K);K=[]}}};u.decode._findDiff=function(w,m,v){for(var Q=0;Q<w.length;Q+=2)if(w[Q]>=m&&w[Q+1]==v)return w[Q]};
u.decode._makeDiff=function(w){var m=[];if(w[0]==1)m.push(0,1);for(var v=1;v<w.length;v++)if(w[v-1]!=w[v])m.push(v,w[v]);
m.push(w.length,0,w.length,1);return m};u.decode._decodeG3=function(w,m,v,Q,N,V,r,T){var t=u.decode,C=m<<3,E=0,K="",d=[],G=[],y=0,_=0,s=0,h=0,f=0,e=0,R="",aq=0,Y=!0;
for(var L=0;L<V;L++)d.push(0);var D=-1,b0=Math.ceil(V/8)*8;while(C>>>3<m+v){h=t._findDiff(G,y+(y==0?0:1),1-e),f=t._findDiff(G,h,e);
var p=0;if(r==1)p=w[C>>>3]>>>7-(C&7)&1;if(r==2)p=w[C>>>3]>>>(C&7)&1;C++;K+=p;if(Y){if(t._lens[e][K]!=null){var j=t._lens[e][K];
K="";E+=j;if(j<64){t._addNtimes(d,E,e);e=1-e;E=0}}}else{if(R=="H"){if(t._lens[e][K]!=null){var j=t._lens[e][K];
K="";E+=j;if(j<64){t._addNtimes(d,E,e);y+=E;e=1-e;E=0;aq--;if(aq==0)R=""}}}else{if(K=="0001"){K="";t._addNtimes(d,f-y,e);
y=f}if(K=="001"){K="";R="H";aq=2}if(t._dmap[K]!=null){_=h+t._dmap[K];t._addNtimes(d,_-y,e);y=_;K="";
e=1-e}}}if(K.endsWith("000000000001")){if(D>=0)t._writeBits(d,Q,N*8+D*b0);if(T){if(r==1)Y=(w[C>>>3]>>>7-(C&7)&1)==1;
if(r==2)Y=(w[C>>>3]>>>(C&7)&1)==1;C++}K="";e=0;D++;y=0;G=t._makeDiff(d);d=[]}}if(d.length==V)t._writeBits(d,Q,N*8+D*b0)};
u.decode._addNtimes=function(w,m,v){for(var Q=0;Q<m;Q++)w.push(v)};u.decode._writeBits=function(w,m,v){for(var Q=0;
Q<w.length;Q++)m[v+Q>>>3]|=w[Q]<<7-(v+Q&7)};u.decode._decodeLZW=u.decode._decodeLZW=function(){var w,v,Q,N,V=0,r=0,T=0,t=0,C=function(){var h=w>>>3,f=v[h]<<16|v[h+1]<<8|v[h+2],e=f>>>24-(w&7)-r&(1<<r)-1;
w+=r;return e},E=new Uint32Array(4096*4),K=0,d=function(h){if(h==K)return;K=h;T=1<<h;t=T+1;for(var f=0;
f<t+1;f++){E[4*f]=E[4*f+3]=f;E[4*f+1]=65535;E[4*f+2]=1}},G=function(h){r=h+1;V=t+1},L=function(h){var f=h<<2,e=E[f+2],D=N+e-1;
while(f!=65535){Q[D--]=E[f];f=E[f+1]}N+=e},y=function(h,f){var e=V<<2,D=h<<2;E[e]=E[(f<<2)+3];E[e+1]=D;
E[e+2]=E[D+2]+1;E[e+3]=E[D+3];V++;if(V+1==1<<r&&r!=12)r++},_=function(h,f,e,D,aq,Y){w=f<<3;v=h;Q=D;N=aq;
var p=f+e<<3,j=0,A=0;d(Y);G(Y);while(w<p&&(j=C())!=t){if(j==T){G(Y);j=C();if(j==t)break;L(j)}else{if(j<V){L(j);
y(A,j)}else{y(A,A);L(V-1)}}A=j}return N};return _}();u.tags={};u._types=function(){var w=new Array(250);
w.fill(0);w=w.concat([0,0,0,0,4,3,3,3,3,3,0,0,3,0,0,0,3,0,0,2,2,2,2,4,3,0,0,3,4,4,3,3,5,5,3,2,5,5,0,0,0,0,4,4,0,0,3,3,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,2,3,5,5,3,0,3,3,4,4,4,3,4,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var m={33432:2,33434:5,33437:5,34665:4,34850:3,34853:4,34855:3,34864:3,34866:4,36864:7,36867:2,36868:2,37121:7,37377:10,37378:5,37380:10,37381:5,37383:3,37384:3,37385:3,37386:5,37510:7,37520:2,37521:2,37522:2,40960:7,40961:3,40962:4,40963:4,40965:4,41486:5,41487:5,41488:3,41985:3,41986:3,41987:3,41988:5,41989:3,41990:3,41993:3,41994:3,41995:7,41996:3,42032:2,42033:2,42034:5,42036:2,42037:2,59932:7};
return{basic:{main:w,rest:m},gps:{main:[1,2,5,2,5,1,5,5,0,9],rest:{18:2,29:2}}}}();u._readIFD=function(w,m,v,Q,N,V){var r=w.readUshort(m,v);
v+=2;var T={};if(V.debug)aN("   ".repeat(N),Q.length-1,">>>----------------");for(var t=0;t<r;t++){var C=w.readUshort(m,v);
v+=2;var E=w.readUshort(m,v);v+=2;var K=w.readUint(m,v);v+=4;var d=w.readUint(m,v);v+=4;var G=[];if(E==1||E==7){G=new Uint8Array(m.buffer,K<5?v-4:d,K)}if(E==2){var L=K<5?v-4:d,y=m[L],_=Math.max(0,Math.min(K-1,m.length-L));
if(y<128||_==0)G.push(w.readASCII(m,L,_));else G=new Uint8Array(m.buffer,L,_)}if(E==3){for(var s=0;s<K;
s++)G.push(w.readUshort(m,(K<3?v-4:d)+2*s))}if(E==4||E==13){for(var s=0;s<K;s++)G.push(w.readUint(m,(K<2?v-4:d)+4*s))}if(E==5||E==10){var h=E==5?w.readUint:w.readInt;
for(var s=0;s<K;s++)G.push([h(m,d+s*8),h(m,d+s*8+4)])}if(E==8){for(var s=0;s<K;s++)G.push(w.readShort(m,(K<3?v-4:d)+2*s))}if(E==9){for(var s=0;
s<K;s++)G.push(w.readInt(m,(K<2?v-4:d)+4*s))}if(E==11){for(var s=0;s<K;s++)G.push(w.readFloat(m,d+s*4))}if(E==12){for(var s=0;
s<K;s++)G.push(w.readDouble(m,d+s*8))}if(K!=0&&G.length==0){aN(C,"unknown TIFF tag type: ",E,"num:",K);
if(t==0)return;continue}if(V.debug)aN("   ".repeat(N),C,E,u.tags[C],G);T["t"+C]=G;if(C==330&&T.t272&&T.t272[0]=="DSLR-A100"){}else if(C==330||C==34665||C==34853||C==50740&&w.readUshort(m,w.readUint(G,0))<300||C==61440){var a=C==50740?[w.readUint(G,0)]:G,f=[];
for(var s=0;s<a.length;s++)u._readIFD(w,m,a[s],f,N+1,V);if(C==330)T.subIFD=f;if(C==34665)T.exifIFD=f[0];
if(C==34853)T.gpsiIFD=f[0];if(C==50740)T.dngPrvt=f[0];if(C==61440)T.fujiIFD=f[0]}if(C==37500&&V.parseMN){var e=G;
if(w.readASCII(e,0,5)=="Nikon")T.makerNote=u.decode(e.slice(10).buffer)[0];else if(w.readUshort(m,d)<300&&w.readUshort(m,d+4)<=12){var D=[];
u._readIFD(w,m,d,D,N+1,V);T.makerNote=D[0]}}}Q.push(T);if(V.debug)aN("   ".repeat(N),"<<<---------------");
return v};u._writeIFD=function(w,m,v,Q,N){var V=Object.keys(N),r=V.length;if(N.exifIFD)r--;if(N.gpsiIFD)r--;
w.writeUshort(v,Q,r);Q+=2;var T=Q+r*12+4;for(var t=0;t<V.length;t++){var C=V[t];if(C=="t34665"||C=="t34853")continue;
if(C=="exifIFD")C="t34665";if(C=="gpsiIFD")C="t34853";var E=parseInt(C.slice(1)),K=m.main[E];if(K==null)K=m.rest[E];
if(K==null||K==0)throw new Error("unknown type of tag: "+E);var d=N[C];if(E==34665){var G=u._writeIFD(w,m,v,T,N.exifIFD);
d=[T];T=G[1]}if(E==34853){var G=u._writeIFD(w,u._types.gps,v,T,N.gpsiIFD);d=[T];T=G[1]}if(K==2)d=d[0]+"\0";
var L=d.length;w.writeUshort(v,Q,E);Q+=2;w.writeUshort(v,Q,K);Q+=2;w.writeUint(v,Q,L);Q+=4;var y=[-1,1,1,2,4,8,0,1,0,4,8,0,8][K]*L,_=Q;
if(y>4){w.writeUint(v,Q,T);_=T}if(K==1||K==7){for(var s=0;s<L;s++)v[_+s]=d[s]}else if(K==2){w.writeASCII(v,_,d)}else if(K==3){for(var s=0;
s<L;s++)w.writeUshort(v,_+2*s,d[s])}else if(K==4){for(var s=0;s<L;s++)w.writeUint(v,_+4*s,d[s])}else if(K==5||K==10){var h=K==5?w.writeUint:w.writeInt;
for(var s=0;s<L;s++){var a=d[s],f=a[0],e=a[1];if(f==null)throw"e";h(v,_+8*s,f);h(v,_+8*s+4,e)}}else if(K==9){for(var s=0;
s<L;s++)w.writeInt(v,_+4*s,d[s])}else if(K==12){for(var s=0;s<L;s++)w.writeDouble(v,_+8*s,d[s])}else throw K;
if(y>4){y+=y&1;T+=y}Q+=4}return[Q,T]};u.toRGBA8=function(w,m){var v=w.width,Q=w.height,V=v*Q,r=V*4,T=w.data,t=new Uint8Array(V*4),C=w.t262?w.t262[0]:2,E=w.t258?Math.min(32,w.t258[0]):1;
if(w.t262==null&&E==1)C=0;if(!1){}else if(C==0){var K=Math.ceil(E*v/8);for(var d=0;d<Q;d++){var G=d*K,L=d*v;
if(E==1)for(var y=0;y<v;y++){var _=L+y<<2,s=T[G+(y>>3)]>>7-(y&7)&1;t[_]=t[_+1]=t[_+2]=(1-s)*255;t[_+3]=255}if(E==4)for(var y=0;
y<v;y++){var _=L+y<<2,s=T[G+(y>>1)]>>4-4*(y&1)&15;t[_]=t[_+1]=t[_+2]=(15-s)*17;t[_+3]=255}if(E==8)for(var y=0;
y<v;y++){var _=L+y<<2,s=T[G+y];t[_]=t[_+1]=t[_+2]=255-s;t[_+3]=255}}}else if(C==1){var h=w.t258?w.t258.length:1,K=Math.ceil(h*E*v/8);
if(m==null)m=1/256;for(var d=0;d<Q;d++){var G=d*K,L=d*v;if(E==1)for(var y=0;y<v;y++){var _=L+y<<2,s=T[G+(y>>3)]>>7-(y&7)&1;
t[_]=t[_+1]=t[_+2]=s*255;t[_+3]=255}if(E==2)for(var y=0;y<v;y++){var _=L+y<<2,s=T[G+(y>>2)]>>6-2*(y&3)&3;
t[_]=t[_+1]=t[_+2]=s*85;t[_+3]=255}if(E==8)for(var y=0;y<v;y++){var _=L+y<<2,s=T[G+y*h];t[_]=t[_+1]=t[_+2]=s;
t[_+3]=255}if(E==16)for(var y=0;y<v;y++){var _=L+y<<2,f=G+2*y,s=T[f+1]<<8|T[f];t[_]=t[_+1]=t[_+2]=Math.min(255,~~(s*m));
t[_+3]=255}}}else if(C==2){var h=w.t258?w.t258.length:3;if(E==8){if(h==4)for(var y=0;y<r;y++)t[y]=T[y];
if(h==3)for(var y=0;y<V;y++){var _=y<<2,D=y*3;t[_]=T[D];t[_+1]=T[D+1];t[_+2]=T[D+2];t[_+3]=255}}else{if(h==4)for(var y=0;
y<V;y++){var _=y<<2,D=y*8+1;t[_]=T[D];t[_+1]=T[D+2];t[_+2]=T[D+4];t[_+3]=T[D+6]}if(h==3)for(var y=0;
y<V;y++){var _=y<<2,D=y*6+1;t[_]=T[D];t[_+1]=T[D+2];t[_+2]=T[D+4];t[_+3]=255}}}else if(C==3){var R=w.t320,h=w.t258?w.t258.length:1,K=Math.ceil(h*E*v/8),aq=1<<E;
for(var d=0;d<Q;d++)for(var Y=0;Y<v;Y++){var y=d*v+Y,_=y<<2,b0=0,p=d*K;if(!1){}else if(E==1)b0=T[p+(Y>>>3)]>>>7-(Y&7)&1;
else if(E==2)b0=T[p+(Y>>>2)]>>>6-2*(Y&3)&3;else if(E==4)b0=T[p+(Y>>>1)]>>>4-4*(Y&1)&15;else if(E==8)b0=T[p+Y*h];
else throw E;t[_]=R[b0]>>8;t[_+1]=R[aq+b0]>>8;t[_+2]=R[aq+aq+b0]>>8;t[_+3]=255}}else if(C==5){var h=w.t258?w.t258.length:4,j=h>4?1:0;
for(var y=0;y<V;y++){var _=y<<2,A=y*h,X=255-T[A],P=255-T[A+1],H=255-T[A+2],n=(255-T[A+3])*(1/255);t[_]=~~(X*n+.5);
t[_+1]=~~(P*n+.5);t[_+2]=~~(H*n+.5);t[_+3]=255*(1-j)+T[A+4]*j}}else if(C==6&&w.t278){var B=w.t278[0];
for(var d=0;d<Q;d+=B){var y=d*v,g=B*v;for(var O=0;O<g;O++){var _=4*(y+O),A=3*y+4*(O>>>1),H=T[A+(O&1)],c=T[A+2]-128,al=T[A+3]-128,o=H+((al>>2)+(al>>3)+(al>>5)),i=H-((c>>2)+(c>>4)+(c>>5))-((al>>1)+(al>>3)+(al>>4)+(al>>5)),b8=H+(c+(c>>1)+(c>>2)+(c>>6));
t[_]=Math.max(0,Math.min(255,o));t[_+1]=Math.max(0,Math.min(255,i));t[_+2]=Math.max(0,Math.min(255,b8));
t[_+3]=255}}}else aN("Unknown Photometric interpretation: "+C);return t};u.replaceIMG=function(w){if(w==null)w=document.getElementsByTagName("img");
var m=["tif","tiff","dng","cr2","nef"];for(var v=0;v<w.length;v++){var Q=w[v],N=Q.getAttribute("src");
if(N==null)continue;var r=N.split(".").pop().toLowerCase();if(m.indexOf(r)==-1)continue;var T=new XMLHttpRequest;
u._xhrs.push(T);u._imgs.push(Q);T.open("GET",N);T.responseType="arraybuffer";T.onload=u._imgLoaded;T.send()}};
u._xhrs=[];u._imgs=[];u._imgLoaded=function(w){var v=u._xhrs.indexOf(w.target),Q=u._imgs[v];u._xhrs.splice(v,1);
u._imgs.splice(v,1);Q.setAttribute("src",u.bufferToURI(w.target.response))};u.bufferToURI=function(w){var m=u.decode(w),v=m,Q=0,N=v[0];
if(m[0].subIFD)v=v.concat(m[0].subIFD);for(var V=0;V<v.length;V++){var r=v[V];if(r.t258==null||r.t258.length<3)continue;
var T=r.t256*r.t257;if(T>Q){Q=T;N=r}}u.decodeImage(w,N,m);var t=u.toRGBA8(N),C=N.width,E=N.height,K=document.createElement("canvas");
K.width=C;K.height=E;var d=K.getContext("2d"),G=new ImageData(new Uint8ClampedArray(t.buffer),C,E);d.putImageData(G,0,0);
return K.toDataURL()};u._binBE={nextZero:function(w,m){while(w[m]!=0)m++;return m},readUshort:function(w,m){return w[m]<<8|w[m+1]},readShort:function(w,m){var v=u._binBE.ui8;
v[0]=w[m+1];v[1]=w[m+0];return u._binBE.i16[0]},readInt:function(w,m){var v=u._binBE.ui8;v[0]=w[m+3];
v[1]=w[m+2];v[2]=w[m+1];v[3]=w[m+0];return u._binBE.i32[0]},readUint:function(w,m){var v=u._binBE.ui8;
v[0]=w[m+3];v[1]=w[m+2];v[2]=w[m+1];v[3]=w[m+0];return u._binBE.ui32[0]},readASCII:function(w,m,v){var Q="";
for(var N=0;N<v;N++)Q+=String.fromCharCode(w[m+N]);return Q},readFloat:function(w,m){var v=u._binBE.ui8;
for(var Q=0;Q<4;Q++)v[Q]=w[m+3-Q];return u._binBE.fl32[0]},readDouble:function(w,m){var v=u._binBE.ui8;
for(var Q=0;Q<8;Q++)v[Q]=w[m+7-Q];return u._binBE.fl64[0]},writeUshort:function(w,m,v){w[m]=v>>8&255;
w[m+1]=v&255},writeInt:function(w,m,v){var Q=u._binBE.ui8;u._binBE.i32[0]=v;w[m+3]=Q[0];w[m+2]=Q[1];
w[m+1]=Q[2];w[m+0]=Q[3]},writeUint:function(w,m,v){w[m]=v>>24&255;w[m+1]=v>>16&255;w[m+2]=v>>8&255;w[m+3]=v>>0&255},writeASCII:function(w,m,v){for(var Q=0;
Q<v.length;Q++)w[m+Q]=v.charCodeAt(Q)},writeDouble:function(w,m,v){u._binBE.fl64[0]=v;for(var Q=0;Q<8;
Q++)w[m+Q]=u._binBE.ui8[7-Q]}};u._binBE.ui8=new Uint8Array(8);u._binBE.i16=new Int16Array(u._binBE.ui8.buffer);
u._binBE.i32=new Int32Array(u._binBE.ui8.buffer);u._binBE.ui32=new Uint32Array(u._binBE.ui8.buffer);
u._binBE.fl32=new Float32Array(u._binBE.ui8.buffer);u._binBE.fl64=new Float64Array(u._binBE.ui8.buffer);
u._binLE={nextZero:u._binBE.nextZero,readUshort:function(w,m){return w[m+1]<<8|w[m]},readShort:function(w,m){var v=u._binBE.ui8;
v[0]=w[m+0];v[1]=w[m+1];return u._binBE.i16[0]},readInt:function(w,m){var v=u._binBE.ui8;v[0]=w[m+0];
v[1]=w[m+1];v[2]=w[m+2];v[3]=w[m+3];return u._binBE.i32[0]},readUint:function(w,m){var v=u._binBE.ui8;
v[0]=w[m+0];v[1]=w[m+1];v[2]=w[m+2];v[3]=w[m+3];return u._binBE.ui32[0]},readASCII:u._binBE.readASCII,readFloat:function(w,m){var v=u._binBE.ui8;
for(var Q=0;Q<4;Q++)v[Q]=w[m+Q];return u._binBE.fl32[0]},readDouble:function(w,m){var v=u._binBE.ui8;
for(var Q=0;Q<8;Q++)v[Q]=w[m+Q];return u._binBE.fl64[0]},writeUshort:function(w,m,v){w[m]=v&255;w[m+1]=v>>8&255},writeInt:function(w,m,v){var Q=u._binBE.ui8;
u._binBE.i32[0]=v;w[m+0]=Q[0];w[m+1]=Q[1];w[m+2]=Q[2];w[m+3]=Q[3]},writeUint:function(w,m,v){w[m]=v>>>0&255;
w[m+1]=v>>>8&255;w[m+2]=v>>>16&255;w[m+3]=v>>>24&255},writeASCII:u._binBE.writeASCII};u._copyTile=function(w,m,v,Q,N,V,r,T){var t=Math.min(m,N-r),C=Math.min(v,V-T);
for(var E=0;E<C;E++){var K=(T+E)*N+r,d=E*m;for(var G=0;G<t;G++)Q[K+G]=w[d+G]}};u.LosslessJpegDecode=function(){var w,m,v,Q,N,V,T,C,E,K;
function d(){return w[m++]}function L(){return w[m++]<<8|w[m++]}function y(){var n=d(),B=[0,0,0,255],l=[],g=8;
for(var O=0;O<16;O++)l[O]=d();for(var O=0;O<16;O++){for(var c=0;c<l[O];c++){var al=_(B,0,O+1,1);B[al+3]=d()}}var o=new Uint8Array(1<<g);
E[n]=[new Uint8Array(B),o];for(var O=0;O<1<<g;O++){var i=g,b8=O,aT=0,x=0;while(B[aT+3]==255&&i!=0){x=b8>>--i&1;
aT=B[aT+x]}o[O]=aT}}function _(n,B,l,g){if(n[B+3]!=255)return 0;if(l==0)return B;for(var O=0;O<2;O++){if(n[B+O]==0){n[B+O]=n.length;
n.push(0,0,g,255)}var c=_(n,n[B+O],l-1,g+1);if(c!=0)return c}return 0}function s(n){var B=n.e,l=n.c;
while(B<25&&n.a<n.d){var g=n.data[n.a++];if(!n.b)n.a+=g+1>>>8;l=l<<8|g;B+=8}n.e=B;n.c=l}function h(n,B){if(B.e<n)s(B);
return B.c>>(B.e-=n)&65535>>16-n}function a(n,B){var l=n[0],g=0,O=255,c=0;if(B.e<16)s(B);var al=B.c>>B.e-8&255;
g=n[1][al];O=l[g+3];B.e-=l[g+2];while(O==255){c=B.c>>--B.e&1;g=l[g+c];O=l[g+3]}return O}function f(n,B){if(n<32768>>16-B)n+=-(1<<B)+1;
return n}function D(n,B){var l=a(n,B);if(l==0)return 0;if(l==16)return-32768;var g=h(l,B);return f(g,l)}function p(n,B,l){var g=V,O=Q,c=T,al=K;
for(var o=0;o<g;o++){n[o]=D(al[o],l)+(1<<v-1)}for(var i=g;i<B;i+=g){for(var o=0;o<g;o++)n[i+o]=D(al[o],l)+n[i+o-g]}var b8=B;
for(var aT=1;aT<O;aT++){for(var o=0;o<g;o++){n[b8+o]=D(al[o],l)+n[b8+o-B]}for(var i=g;i<B;i+=g){for(var o=0;
o<g;o++){var x=b8+i+o,ac=n[x-g],J=0;if(c==0)J=0;else if(c==1)J=ac;else if(c==2)J=n[x-B];else if(c==3)J=n[x-B-g];
else if(c==4)J=ac+(n[x-B]-n[x-B-g]);else if(c==5)J=ac+(n[x-B]-n[x-B-g]>>>1);else if(c==6)J=n[x-B]+(ac-n[x-B-g]>>>1);
else if(c==7)J=ac+n[x-B]>>>1;else throw c;n[x]=J+D(al[o],l)}}b8+=B}}function A(n,B){return f(h(n,B),n)}function P(n,B,l){var g=w.length-m;
for(var O=0;O<g;O+=4){var c=w[m+O];w[m+O]=w[m+O+3];w[m+O+3]=c;var c=w[m+O+1];w[m+O+1]=w[m+O+2];w[m+O+2]=c}var al=K[0];
for(var o=0;o<Q;o++){var i=32768,b8=32768;for(var aT=0;aT<B;aT+=2){var x=a(al,l),ac=a(al,l);if(x!=0)i+=A(x,l);
if(ac!=0)b8+=A(ac,l);n[o*B+aT]=i&65535;n[o*B+aT+1]=b8&65535}}}function H(n){w=n;m=0;E=[],K=[];if(L()!=65496)throw"e";
while(!0){var B=L();if(B==65535){m--;continue}var l=L();if(B==65475){v=d();Q=L();N=L();V=d();C=[];for(var g=0;
g<V;g++){var O=d(),c=d();if(c!=17)throw"e";var al=d();if(al!=0)throw"e";C[O]=g}}else if(B==65476){var o=m+l-2;
while(m<o)y()}else if(B==65498){m++;for(var g=0;g<V;g++){var i=d();K[C[i]]=E[d()>>>4]}T=d();m+=2;break}else{m+=l-2}}var b8=v>8?Uint16Array:Uint8Array,aT=N*V,x=new b8(Q*aT),ac={e:0,c:0,b:T==8,a:m,data:w,d:w.length};
if(ac.b)P(x,aT,ac);else p(x,aT,ac);return x}return H}();(function(){var w=0,m=1,v=2,Q=3,N=4,V=5,T=6,t=7,C=8,K=9,d=10,G=11,L=12,y=13,s=14,h=15,f=16,e=17,D=18;
function R(z){var q=u._binBE.readUshort,U={m:q(z,0),f:z[2],r:z[3],a:z[4],d:q(z,5),t:q(z,7),h:q(z,9),n:q(z,11),v:z[13],p:q(z,14)};
if(U.m!=18771||U.f>1||U.d<6||U.d%6||U.h<768||U.h%24||U.n!=768||U.t<U.n||U.t%U.n||U.t-U.h>=U.n||U.v>16||U.v!=U.t/U.n||U.v!=Math.ceil(U.h/U.n)||U.p!=U.d/6||U.a!=12&&U.a!=14&&U.a!=16||U.r!=16&&U.r!=0){throw"Invalid data"}if(U.f==0){throw"Not implemented. We need this file!"}U.o=U.r==16;
U.c=(U.o?U.n*2/3:U.n>>>1)|0;U.g=U.c+2;U.q=64;U.j=(1<<U.a)-1;U.w=4*U.a;return U}function aq(z,q){var U=new Array(q.v),F=16+4*q.v;
for(var I=0,Z=16;I<q.v;Z+=4){var k=u._binBE.readUint(z,Z);U[I]=z.slice(F,F+k);U[I].l=0;U[I].s=0;F+=k;
I++}if(F!=z.length)throw"Invalid data";return U}function b0(z,q){for(var U=-q[4],F=0;U<=q[4];F++,U++){z[F]=U<=-q[3]?-4:U<=-q[2]?-3:U<=-q[1]?-2:U<-q[0]?-1:U<=q[0]?0:U<q[1]?1:U<q[2]?2:U<q[3]?3:4}}function p(z,q,U){var F=[q,3*q+18,5*q+67,7*q+276,U];
z.k=q;z.i=(F[4]+2*q)/(2*q+1)+1|0;z.b=Math.ceil(Math.log2(z.i));z.e=9;b0(z.u,F)}function A(z){var q={u:new Int8Array(2<<z.a)};
p(q,0,z.j);return q}function X(z){var q=[[],[],[]],U=Math.max(2,z.i+32>>>6);for(var F=0;F<3;F++){for(var I=0;
I<41;I++){q[F][I]=[U,1]}}return q}function P(z){for(var q=-1,U=0;!U;q++){U=z[z.l]>>>7-z.s&1;z.s++;z.s&=7;
if(!z.s)z.l++}return q}function H(z,q){var U=0,F=8-z.s,I=z.l,Z=z.s;if(q){if(q>=F){do{U<<=F;q-=F;U|=z[z.l]&(1<<F)-1;
z.l++;F=8}while(q>=8)}if(q){U<<=q;F-=q;U|=z[z.l]>>>F&(1<<q)-1}z.s=8-F}return U}function n(z,q){var U=0;
if(q<z){while(U<=14&&q<<++U<z);}return U}function i(z,q,U,F,I,Z,k,aa){if(aa==null)aa=0;var at=Z+1,au=at%2,aO=0,aW=0,a9=0,b2,a2,az=F[I],a5=F[I-1],aV=F[I-2][at],aX=a5[at-1],aR=a5[at],aE=a5[at+1],ax=az[at-1],am=az[at+1],aU=Math.abs,ai,S,aS,a6;
if(au){ai=aU(aE-aR);S=aU(aV-aR);aS=aU(aX-aR)}if(au){a6=ai>aS&&S<ai?aV+aX:ai<aS&&S<aS?aV+aE:aE+aX;a6=a6+2*aR>>>2;
if(aa){az[at]=a6;return}b2=q.e*q.u[z.j+aR-aV]+q.u[z.j+aX-aR]}else{a6=aR>aX&&aR>aE||aR<aX&&aR<aE?am+ax+2*aR>>>2:ax+am>>>1;
b2=q.e*q.u[z.j+aR-aX]+q.u[z.j+aX-ax]}a2=aU(b2);var ap=P(U);if(ap<z.w-q.b-1){var a$=n(k[a2][0],k[a2][1]);
a9=H(U,a$)+(ap<<a$)}else{a9=H(U,q.b)+1}a9=a9&1?-1-(a9>>>1):a9>>>1;k[a2][0]+=aU(a9);if(k[a2][1]==z.q){k[a2][0]>>>=1;
k[a2][1]>>>=1}k[a2][1]++;a6=b2<0?a6-a9:a6+a9;if(z.f){if(a6<0)a6+=q.i;else if(a6>z.j)a6-=q.i}az[at]=a6>=0?Math.min(a6,z.j):0}function b8(z,q,U){var F=z[0].length;
for(var I=q;I<=U;I++){z[I][0]=z[I-1][1];z[I][F-1]=z[I-1][F-2]}}function ac(z){b8(z,t,L);b8(z,v,N);b8(z,h,e)}function J(z,q,U,F,I,Z,k,aa,at,au,aO,aW,a9){var b2=0,a2=1,az=I<y&&I>N;
while(a2<z.c){if(b2<z.c){i(z,q,U,F,I,b2,k[at],z.o&&(az&&au||!az&&(aO||(b2&aW)==a9)));i(z,q,U,F,Z,b2,k[at],z.o&&(!az&&au||az&&(aO||(b2&aW)==a9)));
b2+=2}if(b2>8){i(z,q,U,F,I,a2,aa[at]);i(z,q,U,F,Z,a2,aa[at]);a2+=2}}ac(F)}function ae(z,q,U,F,I,Z){J(z,q,U,F,v,t,I,Z,0,0,1,0,8);
J(z,q,U,F,C,h,I,Z,1,0,1,0,8);J(z,q,U,F,Q,K,I,Z,2,1,0,3,0);J(z,q,U,F,d,f,I,Z,0,0,0,3,2);J(z,q,U,F,N,G,I,Z,1,0,0,3,2);
J(z,q,U,F,L,e,I,Z,2,1,0,3,0)}function W(z,q,U,F,I,Z){var k=Z.length,aa=z.n;if(I+1==z.v)aa=z.h-I*z.n;
var at=6*z.h*F+I*z.n;for(var au=0;au<6;au++){for(var aO=0;aO<aa;aO++){var aW=Z[au%k][aO%k],a9;if(aW==0){a9=v+(au>>>1)}else if(aW==2){a9=h+(au>>>1)}else{a9=t+au}var b2=z.o?(aO*2/3&2147483646|aO%3&1)+(aO%3>>>1):aO>>>1;
q[at+aO]=U[a9][b2+1]}at+=z.h}}u._decompressRAF=function(z,q){var U=R(z),F=aq(z,U),I=A(U),Z=new Int16Array(U.h*U.d);
if(q==null){q=U.o?[[1,1,0,1,1,2],[1,1,2,1,1,0],[2,0,1,0,2,1],[1,1,2,1,1,0],[1,1,0,1,1,2],[0,2,1,2,0,1]]:[[0,1],[3,2]]}var k=[[w,Q],[m,N],[V,G],[T,L],[y,f],[s,e]],aa=[];
for(var at=0;at<D;at++){aa[at]=new Uint16Array(U.g)}for(var au=0;au<U.v;au++){var aO=X(I),aW=X(I);for(var at=0;
at<D;at++){for(var a9=0;a9<U.g;a9++){aa[at][a9]=0}}for(var b2=0;b2<U.p;b2++){ae(U,I,F[au],aa,aO,aW);
for(var at=0;at<6;at++){for(var a9=0;a9<U.g;a9++){aa[k[at][0]][a9]=aa[k[at][1]][a9]}}W(U,Z,aa,b2,au,q);
for(var at=v;at<D;at++){if([V,T,y,s].indexOf(at)==-1){for(var a9=0;a9<U.g;a9++){aa[at][a9]=0}}}ac(aa)}}return Z}}())}(u,b3))}())// (c) Dean McNamee <dean@gmail.com>, 2013.
//
// https://github.com/deanm/omggif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
// including animation and compression.  It does not rely on any specific
// underlying system, so should run in the browser, Node, or Plask.

"use strict";

function GifWriter(buf, width, height, gopts) {
  var p = 0;

  var gopts = gopts === undefined ? { } : gopts;
  var loop_count = gopts.loop === undefined ? null : gopts.loop;
  var global_palette = gopts.palette === undefined ? null : gopts.palette;

  if (width <= 0 || height <= 0 || width > 65535 || height > 65535)
    throw new Error("Width/Height invalid.");

  function check_palette_and_num_colors(palette) {
    var num_colors = palette.length;
    if (num_colors < 2 || num_colors > 256 ||  num_colors & (num_colors-1)) {
      throw new Error(
          "Invalid code/color length, must be power of 2 and 2 .. 256.");
    }
    return num_colors;
  }

  // - Header.
  buf[p++] = 0x47; buf[p++] = 0x49; buf[p++] = 0x46;  // GIF
  buf[p++] = 0x38; buf[p++] = 0x39; buf[p++] = 0x61;  // 89a

  // Handling of Global Color Table (palette) and background index.
  var gp_num_colors_pow2 = 0;
  var background = 0;
  if (global_palette !== null) {
    var gp_num_colors = check_palette_and_num_colors(global_palette);
    while (gp_num_colors >>= 1) ++gp_num_colors_pow2;
    gp_num_colors = 1 << gp_num_colors_pow2;
    --gp_num_colors_pow2;
    if (gopts.background !== undefined) {
      background = gopts.background;
      if (background >= gp_num_colors)
        throw new Error("Background index out of range.");
      // The GIF spec states that a background index of 0 should be ignored, so
      // this is probably a mistake and you really want to set it to another
      // slot in the palette.  But actually in the end most browsers, etc end
      // up ignoring this almost completely (including for dispose background).
      if (background === 0)
        throw new Error("Background index explicitly passed as 0.");
    }
  }

  // - Logical Screen Descriptor.
  // NOTE(deanm): w/h apparently ignored by implementations, but set anyway.
  buf[p++] = width & 0xff; buf[p++] = width >> 8 & 0xff;
  buf[p++] = height & 0xff; buf[p++] = height >> 8 & 0xff;
  // NOTE: Indicates 0-bpp original color resolution (unused?).
  buf[p++] = (global_palette !== null ? 0x80 : 0) |  // Global Color Table Flag.
             gp_num_colors_pow2;  // NOTE: No sort flag (unused?).
  buf[p++] = background;  // Background Color Index.
  buf[p++] = 0;  // Pixel aspect ratio (unused?).

  // - Global Color Table
  if (global_palette !== null) {
    for (var i = 0, il = global_palette.length; i < il; ++i) {
      var rgb = global_palette[i];
      buf[p++] = rgb >> 16 & 0xff;
      buf[p++] = rgb >> 8 & 0xff;
      buf[p++] = rgb & 0xff;
    }
  }

  if (loop_count !== null) {  // Netscape block for looping.
    if (loop_count < 0 || loop_count > 65535)
      throw new Error("Loop count invalid.");
    // Extension code, label, and length.
    buf[p++] = 0x21; buf[p++] = 0xff; buf[p++] = 0x0b;
    // NETSCAPE2.0
    buf[p++] = 0x4e; buf[p++] = 0x45; buf[p++] = 0x54; buf[p++] = 0x53;
    buf[p++] = 0x43; buf[p++] = 0x41; buf[p++] = 0x50; buf[p++] = 0x45;
    buf[p++] = 0x32; buf[p++] = 0x2e; buf[p++] = 0x30;
    // Sub-block
    buf[p++] = 0x03; buf[p++] = 0x01;
    buf[p++] = loop_count & 0xff; buf[p++] = loop_count >> 8 & 0xff;
    buf[p++] = 0x00;  // Terminator.
  }


  var ended = false;

  this.addFrame = function(x, y, w, h, indexed_pixels, opts) {
    if (ended === true) { --p; ended = false; }  // Un-end.

    opts = opts === undefined ? { } : opts;

    // TODO(deanm): Bounds check x, y.  Do they need to be within the virtual
    // canvas width/height, I imagine?
    if (x < 0 || y < 0 || x > 65535 || y > 65535)
      throw new Error("x/y invalid.");

    if (w <= 0 || h <= 0 || w > 65535 || h > 65535)
      throw new Error("Width/Height invalid.");

    if (indexed_pixels.length < w * h)
      throw new Error("Not enough pixels for the frame size.");

    var using_local_palette = true;
    var palette = opts.palette;
    if (palette === undefined || palette === null) {
      using_local_palette = false;
      palette = global_palette;
    }

    if (palette === undefined || palette === null)
      throw new Error("Must supply either a local or global palette.");

    var num_colors = check_palette_and_num_colors(palette);

    // Compute the min_code_size (power of 2), destroying num_colors.
    var min_code_size = 0;
    while (num_colors >>= 1) ++min_code_size;
    num_colors = 1 << min_code_size;  // Now we can easily get it back.

    var delay = opts.delay === undefined ? 0 : opts.delay;

    // From the spec:
    //     0 -   No disposal specified. The decoder is
    //           not required to take any action.
    //     1 -   Do not dispose. The graphic is to be left
    //           in place.
    //     2 -   Restore to background color. The area used by the
    //           graphic must be restored to the background color.
    //     3 -   Restore to previous. The decoder is required to
    //           restore the area overwritten by the graphic with
    //           what was there prior to rendering the graphic.
    //  4-7 -    To be defined.
    // NOTE(deanm): Dispose background doesn't really work, apparently most
    // browsers ignore the background palette index and clear to transparency.
    var disposal = opts.disposal === undefined ? 0 : opts.disposal;
    if (disposal < 0 || disposal > 3)  // 4-7 is reserved.
      throw new Error("Disposal out of range.");

    var use_transparency = false;
    var transparent_index = 0;
    if (opts.transparent !== undefined && opts.transparent !== null) {
      use_transparency = true;
      transparent_index = opts.transparent;
      if (transparent_index < 0 || transparent_index >= num_colors)
        throw new Error("Transparent color index.");
    }

    if (disposal !== 0 || use_transparency || delay !== 0) {
      // - Graphics Control Extension
      buf[p++] = 0x21; buf[p++] = 0xf9;  // Extension / Label.
      buf[p++] = 4;  // Byte size.

      buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
      buf[p++] = delay & 0xff; buf[p++] = delay >> 8 & 0xff;
      buf[p++] = transparent_index;  // Transparent color index.
      buf[p++] = 0;  // Block Terminator.
    }

    // - Image Descriptor
    buf[p++] = 0x2c;  // Image Seperator.
    buf[p++] = x & 0xff; buf[p++] = x >> 8 & 0xff;  // Left.
    buf[p++] = y & 0xff; buf[p++] = y >> 8 & 0xff;  // Top.
    buf[p++] = w & 0xff; buf[p++] = w >> 8 & 0xff;
    buf[p++] = h & 0xff; buf[p++] = h >> 8 & 0xff;
    // NOTE: No sort flag (unused?).
    // TODO(deanm): Support interlace.
    buf[p++] = using_local_palette === true ? (0x80 | (min_code_size-1)) : 0;

    // - Local Color Table
    if (using_local_palette === true) {
      for (var i = 0, il = palette.length; i < il; ++i) {
        var rgb = palette[i];
        buf[p++] = rgb >> 16 & 0xff;
        buf[p++] = rgb >> 8 & 0xff;
        buf[p++] = rgb & 0xff;
      }
    }

    p = GifWriterOutputLZWCodeStream(
            buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);

    return p;
  };

  this.end = function() {
    if (ended === false) {
      buf[p++] = 0x3b;  // Trailer.
      ended = true;
    }
    return p;
  };

  this.getOutputBuffer = function() { return buf; };
  this.setOutputBuffer = function(v) { buf = v; };
  this.getOutputBufferPosition = function() { return p; };
  this.setOutputBufferPosition = function(v) { p = v; };
}

// Main compression routine, palette indexes -> LZW code stream.
// |index_stream| must have at least one entry.
function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
  buf[p++] = min_code_size;
  var cur_subblock = p++;  // Pointing at the length field.

  var clear_code = 1 << min_code_size;
  var code_mask = clear_code - 1;
  var eoi_code = clear_code + 1;
  var next_code = eoi_code + 1;

  var cur_code_size = min_code_size + 1;  // Number of bits per code.
  var cur_shift = 0;
  // We have at most 12-bit codes, so we should have to hold a max of 19
  // bits here (and then we would write out).
  var cur = 0;

  function emit_bytes_to_buffer(bit_block_size) {
    while (cur_shift >= bit_block_size) {
      buf[p++] = cur & 0xff;
      cur >>= 8; cur_shift -= 8;
      if (p === cur_subblock + 256) {  // Finished a subblock.
        buf[cur_subblock] = 255;
        cur_subblock = p++;
      }
    }
  }

  function emit_code(c) {
    cur |= c << cur_shift;
    cur_shift += cur_code_size;
    emit_bytes_to_buffer(8);
  }

  // I am not an expert on the topic, and I don't want to write a thesis.
  // However, it is good to outline here the basic algorithm and the few data
  // structures and optimizations here that make this implementation fast.
  // The basic idea behind LZW is to build a table of previously seen runs
  // addressed by a short id (herein called output code).  All data is
  // referenced by a code, which represents one or more values from the
  // original input stream.  All input bytes can be referenced as the same
  // value as an output code.  So if you didn't want any compression, you
  // could more or less just output the original bytes as codes (there are
  // some details to this, but it is the idea).  In order to achieve
  // compression, values greater then the input range (codes can be up to
  // 12-bit while input only 8-bit) represent a sequence of previously seen
  // inputs.  The decompressor is able to build the same mapping while
  // decoding, so there is always a shared common knowledge between the
  // encoding and decoder, which is also important for "timing" aspects like
  // how to handle variable bit width code encoding.
  //
  // One obvious but very important consequence of the table system is there
  // is always a unique id (at most 12-bits) to map the runs.  'A' might be
  // 4, then 'AA' might be 10, 'AAA' 11, 'AAAA' 12, etc.  This relationship
  // can be used for an effecient lookup strategy for the code mapping.  We
  // need to know if a run has been seen before, and be able to map that run
  // to the output code.  Since we start with known unique ids (input bytes),
  // and then from those build more unique ids (table entries), we can
  // continue this chain (almost like a linked list) to always have small
  // integer values that represent the current byte chains in the encoder.
  // This means instead of tracking the input bytes (AAAABCD) to know our
  // current state, we can track the table entry for AAAABC (it is guaranteed
  // to exist by the nature of the algorithm) and the next character D.
  // Therefor the tuple of (table_entry, byte) is guaranteed to also be
  // unique.  This allows us to create a simple lookup key for mapping input
  // sequences to codes (table indices) without having to store or search
  // any of the code sequences.  So if 'AAAA' has a table entry of 12, the
  // tuple of ('AAAA', K) for any input byte K will be unique, and can be our
  // key.  This leads to a integer value at most 20-bits, which can always
  // fit in an SMI value and be used as a fast sparse array / object key.

  // Output code for the current contents of the index buffer.
  var ib_code = index_stream[0] & code_mask;  // Load first input index.
  var code_table = { };  // Key'd on our 20-bit "tuple".

  emit_code(clear_code);  // Spec says first code should be a clear code.

  // First index already loaded, process the rest of the stream.
  for (var i = 1, il = index_stream.length; i < il; ++i) {
    var k = index_stream[i] & code_mask;
    var cur_key = ib_code << 8 | k;  // (prev, k) unique tuple.
    var cur_code = code_table[cur_key];  // buffer + k.

    // Check if we have to create a new code table entry.
    if (cur_code === undefined) {  // We don't have buffer + k.
      // Emit index buffer (without k).
      // This is an inline version of emit_code, because this is the core
      // writing routine of the compressor (and V8 cannot inline emit_code
      // because it is a closure here in a different context).  Additionally
      // we can call emit_byte_to_buffer less often, because we can have
      // 30-bits (from our 31-bit signed SMI), and we know our codes will only
      // be 12-bits, so can safely have 18-bits there without overflow.
      // emit_code(ib_code);
      cur |= ib_code << cur_shift;
      cur_shift += cur_code_size;
      while (cur_shift >= 8) {
        buf[p++] = cur & 0xff;
        cur >>= 8; cur_shift -= 8;
        if (p === cur_subblock + 256) {  // Finished a subblock.
          buf[cur_subblock] = 255;
          cur_subblock = p++;
        }
      }

      if (next_code === 4096) {  // Table full, need a clear.
        emit_code(clear_code);
        next_code = eoi_code + 1;
        cur_code_size = min_code_size + 1;
        code_table = { };
      } else {  // Table not full, insert a new entry.
        // Increase our variable bit code sizes if necessary.  This is a bit
        // tricky as it is based on "timing" between the encoding and
        // decoder.  From the encoders perspective this should happen after
        // we've already emitted the index buffer and are about to create the
        // first table entry that would overflow our current code bit size.
        if (next_code >= (1 << cur_code_size)) ++cur_code_size;
        code_table[cur_key] = next_code++;  // Insert into code table.
      }

      ib_code = k;  // Index buffer to single input k.
    } else {
      ib_code = cur_code;  // Index buffer to sequence in code table.
    }
  }

  emit_code(ib_code);  // There will still be something in the index buffer.
  emit_code(eoi_code);  // End Of Information.

  // Flush / finalize the sub-blocks stream to the buffer.
  emit_bytes_to_buffer(1);

  // Finish the sub-blocks, writing out any unfinished lengths and
  // terminating with a sub-block of length 0.  If we have already started
  // but not yet used a sub-block it can just become the terminator.
  if (cur_subblock + 1 === p) {  // Started but unused.
    buf[cur_subblock] = 0;
  } else {  // Started and used, write length and additional terminator block.
    buf[cur_subblock] = p - cur_subblock - 1;
    buf[p++] = 0;
  }
  return p;
};

var UGIF=function(){var a=function(){var j,F,c,b,H=0,k=0,Z=0,P=0,l=function(){var R=j>>>3,i=F[R+2]<<16|F[R+1]<<8|F[R],M=i>>>(j&7)&(1<<k)-1;
j+=k;return M},e=new Uint32Array(4096*4),V=0,W=function(R){if(R==V)return;V=R;Z=1<<R;P=Z+1;for(var i=0;
i<P+1;i++){e[4*i]=e[4*i+3]=i;e[4*i+1]=65535;e[4*i+2]=1}},G=function(R){k=R+1;H=P+1},Q=function(R){var i=R<<2,M=e[i+2],v=b+M-1;
while(i!=65535){c[v--]=e[i];i=e[i+1]}b+=M},L=function(R,i){var M=H<<2,v=R<<2;e[M]=e[(i<<2)+3];e[M+1]=v;
e[M+2]=e[v+2]+1;e[M+3]=e[v+3];H++;if(H==1<<k&&k!=12)k++},s=function(R,i,M,v,t,q){j=i<<3;F=R;c=v;b=t;
var g=i+M<<3,r=0,p=0;W(q);G(q);while(j<g&&(r=l())!=P){if(r==Z){G(q);r=l();if(r==P)break;Q(r)}else{if(r<H){Q(r);
L(p,r)}else{L(p,p);Q(H-1)}}p=r}return b};return s}(),O,f,E=new Uint8Array(128),B=function(){return O[f++]},A=function(){var j=O[f+1]<<8|O[f];
f+=2;return j},U=function(){while(O[f]!=0)f+=1+O[f];f++},d=function(j){O=new Uint8Array(j);f=6;var F=A(),c=A(),b=B(),H=B(),k=B(),Z=b>>>7,P=b>>>4&7,X=b>>>3&1,l=b>>>0&7,m=f,e=0,V,W=0,G=0,C=0,z=260;
if(Z==1)f+=3*(1<<l+1);var T=[];while(f+1<O.length){var Q=B();if(Q==33){var L=B();if(L==249){var s=B(),b=B();
W=b>>>2&7;G=A();z=B();if((b&1)==0)z=260;B()}else if(L==254){U()}else if(L==255){U()}else throw L}else if(Q==44){var R=A(),i=A(),M=A(),v=A(),t=B(),q=t>>>7;
C=t>>>6&1;if(q==1){var l=t>>>0&7;e=f;f+=3*(1<<l+1)}V={x:R,y:i,a:M,O:v,f:W,delay:G,B:z,A:e==0?m:e,U:C};
T.push(V);e=0}else if(Q<=8){var M=V.a,v=V.O,S=M*v,Y=0;if(E.length<S*1.2)E=new Uint8Array(~~(S*1.3));
while(f<O.length&&O[f]!=0){var J=B();for(var g=0;g<J;g++)E[Y+g]=O[f+g];Y+=J;f+=J}if(f>=O.length){alert("Some frames are damaged.");
T.pop();break}B();V.d=new Uint8Array(S);var r=a(E,0,Y,V.d,0,Q)}else if(Q==59)break;else throw Q}return{width:F,height:c,data:O,frames:T}};
function D(j,F,O,c,b,H,k,Z){for(var P=0;P<k;P++){var X=b[H+P];if(X!=Z){var l=F+P<<2,m=c+X*3;j[l]=O[m];
j[l+1]=O[m+1];j[l+2]=O[m+2];j[l+3]=255}}}var w=function(j){var F=j.frames,c=j.width,b=j.height,H=new Uint8Array(c*b*4),k,Z=[],O=j.data;
for(var P=0;P<F.length;P++){var X=F[P],l=X.x,m=X.y,e=X.a,T=X.O,V=X.f;if(V==3){if(k==null)k=H.slice(0);
else k.set(H)}var W=[];if(X.U==1){for(var G=0;G<T;G+=8)W.push(G);for(var G=4;G<T;G+=8)W.push(G);for(var G=2;
G<T;G+=4)W.push(G);for(var G=1;G<T;G+=2)W.push(G)}var C=X.d,z=X.A,Q=X.B,L=X.U;for(var G=0;G<T;G++){var s=L==0?G:W[G];
D(H,(s+m)*c+l,O,z,C,G*e,e,Q)}Z.push(H.slice(0).buffer);if(V<2){}else if(V==2){for(var G=0;G<T;G++){var R=((m+G)*c+l)*4;
H.fill(0,R,R+e*4)}}else if(V==3)H.set(k)}return Z};return{decode:d,toRGBA8:w}}()/**
 * Gauss-Jordan elimination
 */

var linear = (function(){
/**
 * Used internally to solve systems
 * If you want to solve A.x = B,
 * choose data=A and mirror=B.
 * mirror can be either an array representing a vector
 * or an array of arrays representing a matrix.
 */
function Mat(data, mirror) {
  // Clone the original matrix
  this.data = new Array(data.length);
  for (var i=0, cols=data[0].length; i<data.length; i++) {
    this.data[i] = new Array(cols);
    for(var j=0; j<cols; j++) {
      this.data[i][j] = data[i][j];
    }
  }

  if (mirror) {
    if (typeof mirror[0] !== "object") {
      for (var i=0; i<mirror.length; i++) {
        mirror[i] = [mirror[i]];
      }
    }
    this.mirror = new Mat(mirror);
  }
}

/**
 * Swap lines i and j in the matrix
 */
Mat.prototype.swap = function (i, j) {
  if (this.mirror) this.mirror.swap(i,j);
  var tmp = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = tmp;
}

/**
 * Multiply line number i by l
 */
Mat.prototype.multline = function (i, l) {
  if (this.mirror) this.mirror.multline(i,l);
  var line = this.data[i];
  for (var k=line.length-1; k>=0; k--) {
    line[k] *= l;
  }
}

/**
 * Add line number j multiplied by l to line number i
 */
Mat.prototype.addmul = function (i, j, l) {
  if (this.mirror) this.mirror.addmul(i,j,l);
  var lineI = this.data[i], lineJ = this.data[j];
  for (var k=lineI.length-1; k>=0; k--) {
    lineI[k] = lineI[k] + l*lineJ[k];
  }
}

/**
 * Tests if line number i is composed only of zeroes
 */
Mat.prototype.hasNullLine = function (i) {
  for (var j=0; j<this.data[i].length; j++) {
    if (this.data[i][j] !== 0) {
      return false;
    }
  }
  return true;
}

Mat.prototype.gauss = function() {
  var pivot = 0,
      lines = this.data.length,
      columns = this.data[0].length,
      nullLines = [];

  for (var j=0; j<columns; j++) {
    // Find the line on which there is the maximum value of column j
    var maxValue = 0, maxLine = 0;
    for (var k=pivot; k<lines; k++) {
      var val = this.data[k][j];
      if (Math.abs(val) > Math.abs(maxValue)) {
        maxLine = k;
        maxValue = val;
      } 
    }
    if (maxValue === 0) {
      // The matrix is not invertible. The system may still have solutions.
      nullLines.push(pivot);
    } else {
      // The value of the pivot is maxValue
      this.multline(maxLine, 1/maxValue);
      this.swap(maxLine, pivot);
      for (var i=0; i<lines; i++) {
        if (i !== pivot) {
          this.addmul(i, pivot, -this.data[i][j]);
        }
      }
    }
    pivot++;
  }

  // Check that the system has null lines where it should
  for (var i=0; i<nullLines.length; i++) {
    if (!this.mirror.hasNullLine(nullLines[i])) {
      throw new Error("singular matrix");
    }
  }
  return this.mirror.data;
}

/**
 * Solves A.x = b
 * @param A
 * @param b
 * @return x
 */
 var exports = {};
exports.solve = function solve(A, b) {
  var result = new Mat(A,b).gauss();
  if (result.length > 0 && result[0].length === 1) {
    // Convert Nx1 matrices to simple javascript arrays
    for (var i=0; i<result.length; i++) result[i] = result[i][0];
  }
  return result;
}

function identity(n) {
  var id = new Array(n);
  for (var i=0; i<n; i++) {
    id[i] = new Array(n);
    for (var j=0; j<n; j++) {
      id[i][j] = (i === j) ? 1 : 0;
    }
  }
  return id;
}

/**
 * invert a matrix
 */
exports.invert = function invert(A) {
  return new Mat(A, identity(A.length)).gauss();
}

return exports;
})();

var Typr=function(){var Q={};Q.parse=function(O){var X=function(q,I,P,E){var T=Q.B,x=Q.T,p={cmap:x.h,head:x.head,hhea:x.aV,maxp:x.aI,hmtx:x.aZ,name:x.name,"OS/2":x.D,post:x.aO,loca:x.a7,kern:x._,glyf:x.H,"CFF ":x.K,CBLC:x.ab,CBDT:x.aW,"SVG ":x.b3,COLR:x.a$,CPAL:x.b7,sbix:x.aR},C={_data:q,_index:I,_offset:P};
for(var t in p){var i=Q.findTable(q,t,P);if(i){var F=i[0],B=E[F];if(B==null)B=p[t].W(q,F,i[1],C);C[t]=E[F]=B}}return C},T=Q.B,q=new Uint8Array(O),E={},z=T.A(q,0,4);
if(z=="ttcf"){var P=4,m=T.I(q,P);P+=2;var s=T.I(q,P);P+=2;var d=T.b(q,P);P+=4;var Z=[];for(var f=0;f<d;
f++){var e=T.b(q,P);P+=4;Z.push(X(q,f,e,E))}return Z}else return[X(q,0,0,E)]};Q.findTable=function(O,X,T){var q=Q.B,E=q.I(O,T+4),z=T+12;
for(var P=0;P<E;P++){var s=q.A(O,z,4),d=q.b(O,z+4),Z=q.b(O,z+8),f=q.b(O,z+12);if(s==X)return[Z,f];z+=16}return null};
Q.T={};Q.B={J:function(O,X){return(O[X]<<8|O[X+1])+(O[X+2]<<8|O[X+3])/(256*256+4)},B:function(O,X){var T=Q.B.l(O,X);
return T/16384},e:function(O,X){var T=Q.B.Y.X;T[0]=O[X+3];T[1]=O[X+2];T[2]=O[X+1];T[3]=O[X];return Q.B.Y.b4[0]},L:function(O,X){var T=Q.B.Y.X;
T[0]=O[X];return Q.B.Y.aQ[0]},l:function(O,X){var T=Q.B.Y.X;T[1]=O[X];T[0]=O[X+1];return Q.B.Y.a8[0]},I:function(O,X){return O[X]<<8|O[X+1]},aG:function(O,X,T){O[X]=T>>8&255;
O[X+1]=T&255},ac:function(O,X,T){var q=[];for(var E=0;E<T;E++){var z=Q.B.I(O,X+E*2);q.push(z)}return q},b:function(O,X){var T=Q.B.Y.X;
T[3]=O[X];T[2]=O[X+1];T[1]=O[X+2];T[0]=O[X+3];return Q.B.Y.a_[0]},a4:function(O,X,T){O[X]=T>>24&255;
O[X+1]=T>>16&255;O[X+2]=T>>8&255;O[X+3]=T>>0&255},S:function(O,X){return Q.B.b(O,X)*(4294967295+1)+Q.B.b(O,X+4)},A:function(O,X,T){var q="";
for(var E=0;E<T;E++)q+=String.fromCharCode(O[X+E]);return q},am:function(O,X,T){for(var q=0;q<T.length;
q++)O[X+q]=T.charCodeAt(q)},F:function(O,X,T){var q="";for(var E=0;E<T;E++){var z=O[X++]<<8|O[X++];q+=String.fromCharCode(z)}return q},aY:window.TextDecoder?new window.TextDecoder:null,ba:function(O,X,T){var q=Q.B.aY;
if(q&&X==0&&T==O.length)return q.decode(O);return Q.B.A(O,X,T)},P:function(O,X,T){var q=[];for(var E=0;
E<T;E++)q.push(O[X+E]);return q},az:function(O,X,T){var q=[];for(var E=0;E<T;E++)q.push(String.fromCharCode(O[X+E]));
return q},Y:function(){var O=new ArrayBuffer(8);return{a6:O,aQ:new Int8Array(O),X:new Uint8Array(O),a8:new Int16Array(O),a3:new Uint16Array(O),b4:new Int32Array(O),a_:new Uint32Array(O)}}()};
Q.T.K={W:function(O,X,T){var q=Q.B,E=Q.T.K;O=new Uint8Array(O.buffer,X,T);X=0;var z=O[X];X++;var P=O[X];
X++;var m=O[X];X++;var s=O[X];X++;var d=[];X=E.N(O,X,d);var Z=[];for(var f=0;f<d.length-1;f++)Z.push(q.A(O,X+d[f],d[f+1]-d[f]));
X+=d[d.length-1];var e=[];X=E.N(O,X,e);var I=[];for(var f=0;f<e.length-1;f++)I.push(E.k(O,X+e[f],X+e[f+1]));
X+=e[e.length-1];var x=I[0],p=[];X=E.N(O,X,p);var C=[];for(var f=0;f<p.length-1;f++)C.push(q.A(O,X+p[f],p[f+1]-p[f]));
X+=p[p.length-1];E.T(O,X,x);if(x.CharStrings)x.CharStrings=E.P(O,x.CharStrings);if(x.ROS){X=x.FDArray;
var t=[];X=E.N(O,X,t);x.FDArray=[];for(var f=0;f<t.length-1;f++){var M=E.k(O,X+t[f],X+t[f+1]);E.G(O,M,C);
x.FDArray.push(M)}X+=t[t.length-1];X=x.FDSelect;x.FDSelect=[];var i=O[X];X++;if(i==3){var F=q.I(O,X);
X+=2;for(var f=0;f<F+1;f++){x.FDSelect.push(q.I(O,X),O[X+2]);X+=3}}else throw i}if(x.charset)x.charset=E.b6(O,x.charset,x.CharStrings.length);
E.G(O,x,C);return x},G:function(O,X,T){var q=Q.T.K,E;if(X.Private){E=X.Private[1];X.Private=q.k(O,E,E+X.Private[0]);
if(X.Private.Subrs)q.T(O,E+X.Private.Subrs,X.Private)}for(var z in X)if("FamilyName FontName FullName Notice version Copyright".split(" ").indexOf(z)!=-1)X[z]=T[X[z]-426+35]},T:function(O,X,T){T.Subrs=Q.T.K.P(O,X);
var q,E=T.Subrs.length+1;if(!1)q=0;else if(E<1240)q=107;else if(E<33900)q=1131;else q=32768;T.Bias=q},P:function(O,X){var T=Q.B,q=[];
X=Q.T.K.N(O,X,q);var E=[],z=q.length-1,P=O.byteOffset+X;for(var m=0;m<z;m++){var s=q[m];E.push(new Uint8Array(O.buffer,P+s,q[m+1]-s))}return E},a5:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],a9:function(O,X){for(var T=0;
T<O.charset.length;T++)if(O.charset[T]==X)return T;return-1},d:function(O,X){if(X<0||X>255)return-1;
return Q.T.K.a9(O,Q.T.K.a5[X])},b6:function(O,X,T){var q=Q.B,E=[".notdef"],z=O[X];X++;if(z==0){for(var P=0;
P<T;P++){var s=q.I(O,X);X+=2;E.push(s)}}else if(z==1||z==2){while(E.length<T){var s=q.I(O,X),d=0;X+=2;
if(z==1){d=O[X];X++}else{d=q.I(O,X);X+=2}for(var P=0;P<=d;P++){E.push(s);s++}}}else throw"error: format: "+z;
return E},N:function(O,X,T){var q=Q.B,E=q.I(O,X)+1;X+=2;var z=O[X];X++;if(z==1)for(var P=0;P<E;P++)T.push(O[X+P]);
else if(z==2)for(var P=0;P<E;P++)T.push(q.I(O,X+P*2));else if(z==3)for(var P=0;P<E;P++)T.push(q.b(O,X+P*3-1)&16777215);
else if(z==4)for(var P=0;P<E;P++)T.push(q.b(O,X+P*4));else if(E!=1)throw"unsupported offset size: "+z+", count: "+E;
X+=E*z;return X-1},ah:function(O,X,T){var q=Q.B,E=O[X],z=O[X+1],P=O[X+2],m=O[X+3],s=O[X+4],d=1,Z=null,f=null;
if(E<=20){Z=E;d=1}if(E==12){Z=E*100+z;d=2}if(21<=E&&E<=27){Z=E;d=1}if(E==28){f=q.l(O,X+1);d=3}if(29<=E&&E<=31){Z=E;
d=1}if(32<=E&&E<=246){f=E-139;d=1}if(247<=E&&E<=250){f=(E-247)*256+z+108;d=2}if(251<=E&&E<=254){f=-(E-251)*256-z-108;
d=2}if(E==255){f=q.e(O,X+1)/65535;d=5}T.aj=f!=null?f:"o"+Z;T.size=d},ao:function(O,X,T){var q=X+T,E=Q.B,z=[];
while(X<q){var P=O[X],m=O[X+1],s=O[X+2],d=O[X+3],Z=O[X+4],f=1,e=null,I=null;if(P<=20){e=P;f=1}if(P==12){e=P*100+m;
f=2}if(P==19||P==20){e=P;f=2}if(21<=P&&P<=27){e=P;f=1}if(P==28){I=E.l(O,X+1);f=3}if(29<=P&&P<=31){e=P;
f=1}if(32<=P&&P<=246){I=P-139;f=1}if(247<=P&&P<=250){I=(P-247)*256+m+108;f=2}if(251<=P&&P<=254){I=-(P-251)*256-m-108;
f=2}if(P==255){I=E.e(O,X+1)/65535;f=5}z.push(I!=null?I:"o"+e);X+=f}return z},k:function(O,X,T){var q=Q.B,E={},z=[];
while(X<T){var P=O[X],m=O[X+1],s=O[X+2],d=O[X+3],Z=O[X+4],f=1,e=null,I=null;if(P==28){I=q.l(O,X+1);f=3}if(P==29){I=q.e(O,X+1);
f=5}if(32<=P&&P<=246){I=P-139;f=1}if(247<=P&&P<=250){I=(P-247)*256+m+108;f=2}if(251<=P&&P<=254){I=-(P-251)*256-m-108;
f=2}if(P==255){I=q.e(O,X+1)/65535;f=5;throw"unknown number"}if(P==30){var x=[],M="";f=1;while(!0){var p=O[X+f];
f++;var C=p>>4,t=p&15;if(C!=15)x.push(C);if(t!=15)x.push(t);if(t==15)break}var i=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"];
for(var F=0;F<x.length;F++)M+=i[x[F]];I=parseFloat(M)}if(P<=21){var B="version Notice FullName FamilyName Weight FontBBox BlueValues OtherBlues FamilyBlues FamilyOtherBlues StdHW StdVW escape UniqueID XUID charset Encoding CharStrings Private Subrs defaultWidthX nominalWidthX".split(" ");
e=B[P];f=1;if(P==12){var B="Copyright isFixedPitch ItalicAngle UnderlinePosition UnderlineThickness PaintType CharstringType FontMatrix StrokeWidth BlueScale BlueShift BlueFuzz StemSnapH StemSnapV ForceBold   LanguageGroup ExpansionFactor initialRandomSeed SyntheticBase PostScript BaseFontName BaseFontBlend       ROS CIDFontVersion CIDFontRevision CIDFontType CIDCount UIDBase FDArray FDSelect FontName".split(" ");
e=B[m];f=2}}if(e!=null){E[e]=z.length==1?z[0]:z;z=[]}else z.push(I);X+=f}return E}};Q.T.h={W:function(O,X,T){var q={g:[],n:{},aw:X};
O=new Uint8Array(O.buffer,X,T);X=0;var E=X,z=Q.B,P=z.I,m=Q.T.h,s=P(O,X);X+=2;var d=P(O,X);X+=2;var Z=[];
for(var f=0;f<d;f++){var e=P(O,X);X+=2;var I=P(O,X);X+=2;var x=z.b(O,X);X+=4;var p="p"+e+"e"+I,C=Z.indexOf(x);
if(C==-1){C=q.g.length;var t={};Z.push(x);var M=t.b1=P(O,x);if(M==0)t=m.a0(O,x,t);else if(M==4)t=m.a2(O,x,t);
else if(M==6)t=m.ad(O,x,t);else if(M==12)t=m.aB(O,x,t);q.g.push(t)}if(q.n[p]!=null)console.log("multiple tables for one platform+encoding: "+p);
q.n[p]=C}return q},a0:function(O,X,T){var q=Q.B;X+=2;var E=q.I(O,X);X+=2;var z=q.I(O,X);X+=2;T.map=[];
for(var P=0;P<E-6;P++)T.map.push(O[X+P]);return T},a2:function(O,X,T){var q=Q.B,E=q.I,z=q.ac,P=X;X+=2;
var m=E(O,X);X+=2;var s=E(O,X);X+=2;var d=E(O,X);X+=2;var Z=d>>>1;T.au=E(O,X);X+=2;T.af=E(O,X);X+=2;
T.aS=E(O,X);X+=2;T.at=z(O,X,Z);X+=Z*2;X+=2;T.av=z(O,X,Z);X+=Z*2;T.aa=[];for(var f=0;f<Z;f++){T.aa.push(q.l(O,X));
X+=2}T.V=z(O,X,Z);X+=Z*2;T.C=z(O,X,P+m-X>>>1);return T},ad:function(O,X,T){var q=Q.B,E=X;X+=2;var z=q.I(O,X);
X+=2;var P=q.I(O,X);X+=2;T.aL=q.I(O,X);X+=2;var m=q.I(O,X);X+=2;T.C=[];for(var s=0;s<m;s++){T.C.push(q.I(O,X));
X+=2}return T},aB:function(O,X,T){var q=Q.B,E=q.b,z=X;X+=4;var P=E(O,X);X+=4;var m=E(O,X);X+=4;var s=E(O,X)*3;
X+=4;var d=T.a1=new Uint32Array(s);for(var Z=0;Z<s;Z+=3){d[Z]=E(O,X+(Z<<2));d[Z+1]=E(O,X+(Z<<2)+4);d[Z+2]=E(O,X+(Z<<2)+8)}return T}};
Q.T.ab={W:function(O,X,T){var q=Q.B,E=X,z=q.I(O,X);X+=2;var P=q.I(O,X);X+=2;var m=q.b(O,X);X+=4;var s=[];
for(var d=0;d<m;d++){var Z=q.b(O,X);X+=4;var f=q.b(O,X);X+=4;var e=q.b(O,X);X+=4;X+=4;X+=2*12;var I=q.I(O,X);
X+=2;var x=q.I(O,X);X+=2;X+=4;var p=E+Z;for(var C=0;C<3;C++){var t=q.I(O,p);p+=2;var M=q.I(O,p);p+=2;
var i=q.b(O,p);p+=4;var F=M-t+1,B=E+Z+i,U=q.I(O,B);B+=2;if(U!=1)throw U;var J=q.I(O,B);B+=2;var w=q.b(O,B);
B+=4;var V=[];for(var y=0;y<F;y++){var v=q.b(O,B+y*4);V.push(w+v)}s.push([t,M,J,V])}}return s}};Q.T.aW={W:function(O,X,T){var q=Q.B,E=X;
return new Uint8Array(O.buffer,O.byteOffset+X,T)}};Q.T.H={W:function(O,X,T,q){var E=[],z=q.maxp.numGlyphs;
for(var P=0;P<z;P++)E.push(null);return E},aH:function(O,X){var T=Q.B,q=O._data,E=O.loca;if(E[X]==E[X+1])return null;
var P=Q.findTable(q,"glyf",O._offset)[0]+E[X],m={};m.p=T.l(q,P);P+=2;m.aK=T.l(q,P);P+=2;m.ag=T.l(q,P);
P+=2;m.b5=T.l(q,P);P+=2;m.aM=T.l(q,P);P+=2;if(m.aK>=m.b5||m.ag>=m.aM)return null;if(m.p>0){m.o=[];for(var s=0;
s<m.p;s++){m.o.push(T.I(q,P));P+=2}var d=T.I(q,P),C=0,t=0;P+=2;if(q.length-P<d)return null;m.as=T.P(q,P,d);
P+=d;var Z=m.o[m.p-1]+1;m.r=[];for(var s=0;s<Z;s++){var f=q[P];P++;m.r.push(f);if((f&8)!=0){var e=q[P];
P++;for(var I=0;I<e;I++){m.r.push(f);s++}}}m.j=[];for(var s=0;s<Z;s++){var x=(m.r[s]&2)!=0,p=(m.r[s]&16)!=0;
if(x){m.j.push(p?q[P]:-q[P]);P++}else{if(p)m.j.push(0);else{m.j.push(T.l(q,P));P+=2}}}m.Z=[];for(var s=0;
s<Z;s++){var x=(m.r[s]&4)!=0,p=(m.r[s]&32)!=0;if(x){m.Z.push(p?q[P]:-q[P]);P++}else{if(p)m.Z.push(0);
else{m.Z.push(T.l(q,P));P+=2}}}for(var s=0;s<Z;s++){C+=m.j[s];t+=m.Z[s];m.j[s]=C;m.Z[s]=t}}else{var M=1<<0,i=1<<1,F=1<<2,B=1<<3,w=1<<4,V=1<<5,y=1<<6,v=1<<7,A=1<<8,W=1<<9,c=1<<10,Y=1<<11,N=1<<12,G;
m.M=[];do{G=T.I(q,P);P+=2;var H={q:{$:1,b8:0,aD:0,v:1,aE:0,b9:0},aA:-1,b2:-1};m.M.push(H);H.aP=T.I(q,P);
P+=2;if(G&M){var u=T.l(q,P);P+=2;var h=T.l(q,P);P+=2}else{var u=T.L(q,P);P++;var h=T.L(q,P);P++}if(G&i){H.q.aE=u;
H.q.b9=h}else{H.aA=u;H.b2=h}if(G&B){H.q.$=H.q.v=T.B(q,P);P+=2}else if(G&y){H.q.$=T.B(q,P);P+=2;H.q.v=T.B(q,P);
P+=2}else if(G&v){H.q.$=T.B(q,P);P+=2;H.q.b8=T.B(q,P);P+=2;H.q.aD=T.B(q,P);P+=2;H.q.v=T.B(q,P);P+=2}}while(G&V);
if(G&A){var al=T.I(q,P);P+=2;m.aF=[];for(var s=0;s<al;s++){m.aF.push(q[P]);P++}}}return m}};Q.T.head={W:function(O,X,T){var q=Q.B,E={},z=q.J(O,X);
X+=4;E.fontRevision=q.J(O,X);X+=4;var P=q.b(O,X);X+=4;var m=q.b(O,X);X+=4;E.flags=q.I(O,X);X+=2;E.unitsPerEm=q.I(O,X);
X+=2;E.created=q.S(O,X);X+=8;E.modified=q.S(O,X);X+=8;E.xMin=q.l(O,X);X+=2;E.yMin=q.l(O,X);X+=2;E.xMax=q.l(O,X);
X+=2;E.yMax=q.l(O,X);X+=2;E.macStyle=q.I(O,X);X+=2;E.lowestRecPPEM=q.I(O,X);X+=2;E.fontDirectionHint=q.l(O,X);
X+=2;E.indexToLocFormat=q.l(O,X);X+=2;E.glyphDataFormat=q.l(O,X);X+=2;return E}};Q.T.aV={W:function(O,X,T){var q=Q.B,E={},z=q.J(O,X);
X+=4;var P="ascender descender lineGap advanceWidthMax minLeftSideBearing minRightSideBearing xMaxExtent caretSlopeRise caretSlopeRun caretOffset res0 res1 res2 res3 metricDataFormat numberOfHMetrics".split(" ");
for(var m=0;m<P.length;m++){var s=P[m],d=s=="advanceWidthMax"||s=="numberOfHMetrics"?q.I:q.l;E[s]=d(O,X+m*2)}return E}};
Q.T.aZ={W:function(O,X,T,q){var E=Q.B,z=[],P=[],m=q.maxp.numGlyphs,s=q.hhea.numberOfHMetrics,d=0,Z=0,f=0;
while(f<s){d=E.I(O,X+(f<<2));Z=E.l(O,X+(f<<2)+2);z.push(d);P.push(Z);f++}while(f<m){z.push(d);P.push(Z);
f++}return{ar:z,aC:P}}};Q.T._={W:function(O,X,T,q){var E=Q.B,z=Q.T._,P=E.I(O,X);if(P==1)return z.aT(O,X,T,q);
var m=E.I(O,X+2);X+=4;var s={s:[],f:[]};for(var d=0;d<m;d++){X+=2;var T=E.I(O,X);X+=2;var Z=E.I(O,X);
X+=2;var f=Z>>>8;f&=15;if(f==0)X=z.U(O,X,s)}return s},aT:function(O,X,T,q){var E=Q.B,z=Q.T._,P=E.J(O,X),m=E.b(O,X+4);
X+=8;var s={s:[],f:[]};for(var d=0;d<m;d++){var T=E.b(O,X);X+=4;var Z=E.I(O,X);X+=2;var f=E.I(O,X);X+=2;
var e=Z&255;if(e==0)X=z.U(O,X,s)}return s},U:function(O,X,T){var q=Q.B,E=q.I,z=-1,P=E(O,X),m=E(O,X+2),s=E(O,X+4),d=E(O,X+6);
X+=8;for(var Z=0;Z<P;Z++){var f=E(O,X);X+=2;var e=E(O,X);X+=2;var I=q.l(O,X);X+=2;if(f!=z){T.s.push(f);
T.f.push({ae:[],aN:[]})}var x=T.f[T.f.length-1];x.ae.push(e);x.aN.push(I);z=f}return X}};Q.T.a7={W:function(O,X,T,q){var E=Q.B,z=[],P=q.head.indexToLocFormat,m=q.maxp.numGlyphs+1;
if(P==0)for(var s=0;s<m;s++)z.push(E.I(O,X+(s<<1))<<1);if(P==1)for(var s=0;s<m;s++)z.push(E.b(O,X+(s<<2)));
return z}};Q.T.aI={W:function(O,X,T){var q=Q.B,E=q.I,z={},P=q.b(O,X);X+=4;z.numGlyphs=E(O,X);X+=2;return z}};
Q.T.name={W:function(O,X,T){var q=Q.B,E={},z=q.I(O,X),B="postScriptName",J;X+=2;var P=q.I(O,X);X+=2;
var m=q.I(O,X);X+=2;var s="copyright fontFamily fontSubfamily ID fullName version postScriptName trademark manufacturer designer description urlVendor urlDesigner licence licenceURL --- typoFamilyName typoSubfamilyName compatibleFull sampleText postScriptCID wwsFamilyName wwsSubfamilyName lightPalette darkPalette".split(" "),d=X,Z=q.I;
for(var f=0;f<P;f++){var e=Z(O,X),i;X+=2;var I=Z(O,X);X+=2;var x=Z(O,X);X+=2;var p=Z(O,X);X+=2;var C=Z(O,X);
X+=2;var t=Z(O,X);X+=2;var M=d+P*12+t;if(!1){}else if(e==0)i=q.F(O,M,C/2);else if(e==3&&I==0)i=q.F(O,M,C/2);
else if(I==0)i=q.A(O,M,C);else if(I==1)i=q.F(O,M,C/2);else if(I==3)i=q.F(O,M,C/2);else if(I==4)i=q.F(O,M,C/2);
else if(I==5)i=q.F(O,M,C/2);else if(I==10)i=q.F(O,M,C/2);else if(e==1){i=q.A(O,M,C);console.log("reading unknown MAC encoding "+I+" as ASCII")}else{console.log("unknown encoding "+I+", platformID: "+e);
i=q.A(O,M,C)}var F="p"+e+","+x.toString(16);if(E[F]==null)E[F]={};E[F][s[p]]=i;E[F]._lang=x}for(var U in E)if(E[U][B]!=null&&E[U]._lang==1033)return E[U];
for(var U in E)if(E[U][B]!=null&&E[U]._lang==0)return E[U];for(var U in E)if(E[U][B]!=null&&E[U]._lang==3084)return E[U];
for(var U in E)if(E[U][B]!=null)return E[U];for(var U in E){J=E[U];break}console.log("returning name table with languageID "+J.aX);
if(J[B]==null&&J.ID!=null)J[B]=J.ID;return J}};Q.T.D={W:function(O,X,T){var q=Q.B,E=q.I(O,X);X+=2;var z=Q.T.D,P={};
if(E==0)z.a(O,X,P);else if(E==1)z.m(O,X,P);else if(E==2||E==3||E==4)z.aJ(O,X,P);else if(E==5)z.an(O,X,P);
else throw"unknown OS/2 table version: "+E;return P},a:function(O,X,T){var q=Q.B;T.xAvgCharWidth=q.l(O,X);
X+=2;T.usWeightClass=q.I(O,X);X+=2;T.usWidthClass=q.I(O,X);X+=2;T.fsType=q.I(O,X);X+=2;T.ySubscriptXSize=q.l(O,X);
X+=2;T.ySubscriptYSize=q.l(O,X);X+=2;T.ySubscriptXOffset=q.l(O,X);X+=2;T.ySubscriptYOffset=q.l(O,X);
X+=2;T.ySuperscriptXSize=q.l(O,X);X+=2;T.ySuperscriptYSize=q.l(O,X);X+=2;T.ySuperscriptXOffset=q.l(O,X);
X+=2;T.ySuperscriptYOffset=q.l(O,X);X+=2;T.yStrikeoutSize=q.l(O,X);X+=2;T.yStrikeoutPosition=q.l(O,X);
X+=2;T.sFamilyClass=q.l(O,X);X+=2;T.panose=q.P(O,X,10);X+=10;T.ulUnicodeRange1=q.b(O,X);X+=4;T.ulUnicodeRange2=q.b(O,X);
X+=4;T.ulUnicodeRange3=q.b(O,X);X+=4;T.ulUnicodeRange4=q.b(O,X);X+=4;T.achVendID=q.A(O,X,4);X+=4;T.fsSelection=q.I(O,X);
X+=2;T.usFirstCharIndex=q.I(O,X);X+=2;T.usLastCharIndex=q.I(O,X);X+=2;T.sTypoAscender=q.l(O,X);X+=2;
T.sTypoDescender=q.l(O,X);X+=2;T.sTypoLineGap=q.l(O,X);X+=2;T.usWinAscent=q.I(O,X);X+=2;T.usWinDescent=q.I(O,X);
X+=2;return X},m:function(O,X,T){var q=Q.B;X=Q.T.D.a(O,X,T);T.ulCodePageRange1=q.b(O,X);X+=4;T.ulCodePageRange2=q.b(O,X);
X+=4;return X},aJ:function(O,X,T){var q=Q.B,E=q.I;X=Q.T.D.m(O,X,T);T.sxHeight=q.l(O,X);X+=2;T.sCapHeight=q.l(O,X);
X+=2;T.usDefault=E(O,X);X+=2;T.usBreak=E(O,X);X+=2;T.usMaxContext=E(O,X);X+=2;return X},an:function(O,X,T){var q=Q.B.I;
X=Q.T.D.aJ(O,X,T);T.usLowerOpticalPointSize=q(O,X);X+=2;T.usUpperOpticalPointSize=q(O,X);X+=2;return X}};
Q.T.aO={W:function(O,X,T){var q=Q.B,E={};E.version=q.J(O,X);X+=4;E.italicAngle=q.J(O,X);X+=4;E.underlinePosition=q.l(O,X);
X+=2;E.underlineThickness=q.l(O,X);X+=2;return E}};Q.T.b3={W:function(O,X,T){var q=Q.B,E={entries:[]},z=X,P=q.I(O,X);
X+=2;var m=q.b(O,X);X+=4;var s=q.b(O,X);X+=4;X=m+z;var d=q.I(O,X);X+=2;for(var Z=0;Z<d;Z++){var f=q.I(O,X);
X+=2;var e=q.I(O,X);X+=2;var I=q.b(O,X);X+=4;var x=q.b(O,X);X+=4;var p=new Uint8Array(O.buffer,z+I+m,x),C=q.ba(p,0,p.length);
for(var t=f;t<=e;t++){E.entries[t]=C}}return E}};Q.T.aR={W:function(O,X,T,q){var E=q.maxp.numGlyphs,z=X,P=Q.B,m=P.b(O,X+4),s=[];
for(var d=m-1;d<m;d++){var Z=z+P.b(O,X+8+d*4);for(var f=0;f<E;f++){var e=P.b(O,Z+4+f*4),I=P.b(O,Z+4+f*4+4);
if(e==I){s[f]=null;continue}var x=Z+e,p=P.A(O,x+4,4);if(p!="png ")throw p;s[f]=new Uint8Array(O.buffer,O.byteOffset+x+8,I-e-8)}}return s}};
Q.T.a$={W:function(O,X,T){var q=Q.B,E=X;X+=2;var z=q.I(O,X);X+=2;var P=q.b(O,X);X+=4;var m=q.b(O,X);
X+=4;var s=q.I(O,X);X+=2;var d={},Z=E+P;for(var f=0;f<z;f++){d["g"+q.I(O,Z)]=[q.I(O,Z+2),q.I(O,Z+4)];
Z+=6}var e=[];Z=E+m;for(var f=0;f<s;f++){e.push(q.I(O,Z),q.I(O,Z+2));Z+=4}return[d,e]}};Q.T.b7={W:function(O,X,T){var q=Q.B,E=X,z=q.I(O,X);
X+=2;if(z==0){var P=q.I(O,X);X+=2;var m=q.I(O,X);X+=2;var s=q.I(O,X);X+=2;var d=q.b(O,X);X+=4;return new Uint8Array(O.buffer,E+d,s*4)}else throw z}};
Q.U={shape:function(O,X,T){var q=function(O,E,x,T){var p=E[x],C=E[x+1],t=O.kern;if(t){var M=t.s.indexOf(p);
if(M!=-1){var i=t.f[M].ae.indexOf(C);if(i!=-1)return[0,0,t.f[M].aN[i],0]}}return[0,0,0,0]},E=[],d=0,Z=0;
for(var z=0;z<X.length;z++){var P=X.codePointAt(z);if(P>65535)z++;E.push(Q.U.codeToGlyph(O,P))}var s=[];
for(var z=0;z<E.length;z++){var f=q(O,E,z,T),e=E[z],I=O.hmtx.ar[e]+f[2];s.push({g:e,cl:z,dx:0,dy:0,ax:I,ay:0});
d+=I}return s},shapeToPath:function(O,X,T){var q={u:[],Q:[]},E=0,z=0;for(var P=0;P<X.length;P++){var s=X[P],d=Q.U.glyphToPath(O,s.g),Z=d.crds;
for(var f=0;f<Z.length;f+=2){q.Q.push(Z[f]+E+s.dx);q.Q.push(Z[f+1]+z+s.dy)}if(T)q.u.push(T);for(var f=0;
f<d.cmds.length;f++)q.u.push(d.cmds[f]);var e=q.u.length;if(T)if(e!=0&&q.u[e-1]!="X")q.u.push("X");E+=s.ax;
z+=s.ay}return{cmds:q.u,crds:q.Q}},codeToGlyph:function(){function O(z,P,s){var Z=0,f=~~(z.length/P);
while(Z+1!=f){var e=Z+(f-Z>>>1);if(z[e*P]<=s)Z=e;else f=e}return Z*P}var X=[9,10,11,12,13,32,133,160,5760,6158,8232,8233,8239,8288,12288,65279],T={};
for(var q=0;q<X.length;q++)T[X[q]]=1;for(var q=8192;q<=8205;q++)T[q]=1;function E(z,P){if(z._ctab==null){var s=z.cmap,d=-1,Z="p3e10 p0e4 p3e1 p1e0 p0e3 p0e1 p3e0 p3e5".split(" ");
for(var q=0;q<Z.length;q++)if(s.n[Z[q]]!=null){d=s.n[Z[q]];break}if(d==-1)throw"no familiar platform and encoding!";
z._ctab=s.g[d]}var f=z._ctab,e=f.b1,I=-1;if(e==0){if(P>=f.map.length)I=0;else I=f.map[P]}else if(e==4){var x=f.at;
I=0;if(P<=x[x.length-1]){var p=O(x,1,P);if(x[p]<P)p++;if(P>=f.av[p]){var C=0;if(f.V[p]!=0)C=f.C[P-f.av[p]+(f.V[p]>>1)-(f.V.length-p)];
else C=P+f.aa[p];I=C&65535}}}else if(e==6){var t=P-f.aL,M=f.C;if(t<0||t>=M.length)I=0;else I=M[t]}else if(e==12){var i=f.a1;
I=0;if(P<=i[i.length-2]){var q=O(i,3,P);if(i[q]<=P&&P<=i[q+1]){I=i[q+2]+(P-i[q])}}}else throw"unknown cmap table format "+f.b1;
var F=z["SVG "],B=z.loca;if(I!=0&&z["CFF "]==null&&(F==null||F.entries[I]==null)&&B&&B[I]==B[I+1]&&T[P]==null)I=0;
return I}return E}(),glyphToPath:function(O,X,T){var q={u:[],Q:[]},E=O["SVG "],z=O["CFF "],P=O.COLR,m=O.CBLC,s=O.CBDT,d=O.sbix,Z=window.UPNG,f=Q.U,e=null;
if(m&&Z)for(var I=0;I<m.length;I++)if(m[I][0]<=X&&X<=m[I][1])e=m[I];if(e||d&&d[X]){if(e&&e[2]!=17)throw"not a PNG";
if(O.__tmp==null)O.__tmp={};var x=O.__tmp["g"+X];if(x==null){var p,C,M="";if(d){p=d[X];C=p.length}else{var t=e[3][X-e[0]]+5;
C=s[t+1]<<16|s[t+2]<<8|s[t+3];t+=4;p=new Uint8Array(s.buffer,s.byteOffset+t,C)}for(var I=0;I<C;I++)M+=String.fromCharCode(p[I]);
x=O.__tmp["g"+X]="data:image/png;base64,"+btoa(M)}q.u.push(x);var i=O.head.unitsPerEm*1.15,F=Math.round(i),B=Math.round(i),U=Math.round(-B*.15);
q.Q.push(0,B+U,F,B+U,F,U,0,U)}else if(E&&E.entries[X]){var J=E.entries[X];if(J!=null){if(typeof J=="string"){J=f.SVG.aq(J);
E.entries[X]=J}q=J}}else if(T!=!0&&P&&P[0]["g"+X]&&P[0]["g"+X][1]>1){function w(u){var h=u.toString(16);
return(h.length==1?"0":"")+h}var V=O.CPAL,y=P[0]["g"+X];for(var I=0;I<y[1];I++){var v=y[0]+I,A=P[1][2*v],W=P[1][2*v+1]*4,c=Q.U.glyphToPath(O,A,A==X),Y="#"+w(V[W+2])+w(V[W+1])+w(V[W+0]);
q.u.push(Y);q.u=q.u.concat(c.cmds);q.Q=q.Q.concat(c.crds);q.u.push("X")}}else if(z){var N=z.Private,G={x:0,y:0,stack:[],i:0,O:!1,width:N?N.defaultWidthX:0,open:!1};
if(z.ROS){var H=0;while(z.FDSelect[H+2]<=X)H+=2;N=z.FDArray[z.FDSelect[H+1]].Private}f._drawCFF(z.CharStrings[X],G,z,N,q)}else if(O.glyf){f._drawGlyf(X,O,q)}return{cmds:q.u,crds:q.Q}},_drawGlyf:function(O,X,T){var q=X.glyf[O];
if(q==null)q=X.glyf[O]=Q.T.H.aH(X,O);if(q!=null){if(q.p>-1)Q.U._simpleGlyph(q,T);else Q.U._compoGlyph(q,X,T)}},_simpleGlyph:function(O,X){var T=Q.U.P;
for(var q=0;q<O.p;q++){var E=q==0?0:O.o[q-1]+1,z=O.o[q];for(var P=E;P<=z;P++){var s=P==E?z:P-1,d=P==z?E:P+1,Z=O.r[P]&1,f=O.r[s]&1,e=O.r[d]&1,I=O.j[P],p=O.Z[P];
if(P==E){if(Z){if(f)T.w(X,O.j[s],O.Z[s]);else{T.w(X,I,p);continue}}else{if(f)T.w(X,O.j[s],O.Z[s]);else T.w(X,Math.floor((O.j[s]+I)*.5),Math.floor((O.Z[s]+p)*.5))}}if(Z){if(f)T.c(X,I,p)}else{if(e)T.aU(X,I,p,O.j[d],O.Z[d]);
else T.aU(X,I,p,Math.floor((I+O.j[d])*.5),Math.floor((p+O.Z[d])*.5))}}T.R(X)}},_compoGlyph:function(O,X,T){for(var q=0;
q<O.M.length;q++){var E={u:[],Q:[]},z=O.M[q];Q.U._drawGlyf(z.aP,X,E);var P=z.q;for(var m=0;m<E.Q.length;
m+=2){var d=E.Q[m],Z=E.Q[m+1];T.Q.push(d*P.$+Z*P.aD+P.aE);T.Q.push(d*P.b8+Z*P.v+P.b9)}for(var m=0;m<E.u.length;
m++)T.u.push(E.u[m])}},pathToSVG:function(O,X){var T=O.cmds,q=O.crds,z=0;if(X==null)X=5;var E=[],P={M:2,L:2,Q:4,C:6};
for(var m=0;m<T.length;m++){var s=T[m],d=z+(P[s]?P[s]:0);E.push(s);while(z<d){var Z=q[z++];E.push(parseFloat(Z.toFixed(X))+(z==d?"":" "))}}return E.join("")},SVGToPath:function(O){var X={u:[],Q:[]};
Q.U.SVG.ap(O,X);return{cmds:X.u,crds:X.Q}},pathToContext:function(){var O,X;function T(q,E){var z=0,P=q.cmds,m=q.crds;
for(var s=0;s<P.length;s++){var d=P[s];if(d=="M"){E.moveTo(m[z],m[z+1]);z+=2}else if(d=="L"){E.lineTo(m[z],m[z+1]);
z+=2}else if(d=="C"){E.bezierCurveTo(m[z],m[z+1],m[z+2],m[z+3],m[z+4],m[z+5]);z+=6}else if(d=="Q"){E.quadraticCurveTo(m[z],m[z+1],m[z+2],m[z+3]);
z+=4}else if(d[0]=="d"){var Z=window.UPNG,f=m[z],e=m[z+1],I=m[z+2],x=m[z+3],p=m[z+4],C=m[z+5],t=m[z+6],M=m[z+7];
z+=8;if(Z==null){E.moveTo(f,e);E.lineTo(I,x);E.lineTo(p,C);E.lineTo(t,M);E.closePath();continue}E.save();
var i=I-f,F=x-e,B=Math.sqrt(i*i+F*F),U=Math.atan2(F,i),J=t-f,w=M-e,V=Math.sqrt(J*J+w*w),y=Math.sign(i*w-F*J),v=atob(d.slice(22)),A=[];
for(var W=0;W<v.length;W++)A[W]=v.charCodeAt(W);var c=Z.decode(new Uint8Array(A)),Y=c.width,N=c.height,G=new Uint8Array(Z.toRGBA8(c)[0]);
if(O==null){O=document.createElement("canvas");X=O.getContext("2d")}if(O.width!=Y||O.height!=N){O.width=Y;
O.height=N}X.putImageData(new ImageData(new Uint8ClampedArray(G.buffer),Y,N),0,0);E.translate(f,e);E.rotate(U);
E.scale(B*(Y/N)/Y,y*V/N);E.drawImage(O,0,0);E.restore()}else if(d.charAt(0)=="#"||d.charAt(0)=="r"){E.beginPath();
E.fillStyle=d}else if(d.charAt(0)=="O"&&d!="OX"){E.beginPath();var H=d.split("-");E.lineWidth=parseFloat(H[2]);
E.strokeStyle=H[1]}else if(d=="Z"){E.closePath()}else if(d=="X"){E.fill()}else if(d=="OX"){E.stroke()}}}return T}(),P:{w:function(O,X,T){O.u.push("M");
O.Q.push(X,T)},c:function(O,X,T){O.u.push("L");O.Q.push(X,T)},z:function(O,X,T,q,E,z,P){O.u.push("C");
O.Q.push(X,T,q,E,z,P)},aU:function(O,X,T,q,E){O.u.push("Q");O.Q.push(X,T,q,E)},R:function(O){O.u.push("Z")}},_drawCFF:function(O,X,T,q,E){var z=X.stack,P=X.i,m=X.O,s=X.width,d=X.open,Z=0,f=X.x,e=X.y,I=0,p=0,C=0,t=0,M=0,i=0,F=0,B=0,w=0,V=0,y=Q.T.K,v=Q.U.P,A=q.nominalWidthX,W={aj:0,size:0};
while(Z<O.length){y.ah(O,Z,W);var c=W.aj;Z+=W.size;if(!1){}else if(c=="o1"||c=="o18"){var Y;Y=z.length%2!==0;
if(Y&&!m){s=z.shift()+A}P+=z.length>>1;z.length=0;m=!0}else if(c=="o3"||c=="o23"){var Y;Y=z.length%2!==0;
if(Y&&!m){s=z.shift()+A}P+=z.length>>1;z.length=0;m=!0}else if(c=="o4"){if(z.length>1&&!m){s=z.shift()+A;
m=!0}if(d)v.R(E);e+=z.pop();v.w(E,f,e);d=!0}else if(c=="o5"){while(z.length>0){f+=z.shift();e+=z.shift();
v.c(E,f,e)}}else if(c=="o6"||c=="o7"){var N=z.length,G=c=="o6";for(var H=0;H<N;H++){var u=z.shift();
if(G)f+=u;else e+=u;G=!G;v.c(E,f,e)}}else if(c=="o8"||c=="o24"){var N=z.length,h=0;while(h+6<=N){I=f+z.shift();
p=e+z.shift();C=I+z.shift();t=p+z.shift();f=C+z.shift();e=t+z.shift();v.z(E,I,p,C,t,f,e);h+=6}if(c=="o24"){f+=z.shift();
e+=z.shift();v.c(E,f,e)}}else if(c=="o11")break;else if(c=="o1234"||c=="o1235"||c=="o1236"||c=="o1237"){if(c=="o1234"){I=f+z.shift();
p=e;C=I+z.shift();t=p+z.shift();w=C+z.shift();V=t;M=w+z.shift();i=t;F=M+z.shift();B=e;f=F+z.shift();
v.z(E,I,p,C,t,w,V);v.z(E,M,i,F,B,f,e)}if(c=="o1235"){I=f+z.shift();p=e+z.shift();C=I+z.shift();t=p+z.shift();
w=C+z.shift();V=t+z.shift();M=w+z.shift();i=V+z.shift();F=M+z.shift();B=i+z.shift();f=F+z.shift();e=B+z.shift();
z.shift();v.z(E,I,p,C,t,w,V);v.z(E,M,i,F,B,f,e)}if(c=="o1236"){I=f+z.shift();p=e+z.shift();C=I+z.shift();
t=p+z.shift();w=C+z.shift();V=t;M=w+z.shift();i=t;F=M+z.shift();B=i+z.shift();f=F+z.shift();v.z(E,I,p,C,t,w,V);
v.z(E,M,i,F,B,f,e)}if(c=="o1237"){I=f+z.shift();p=e+z.shift();C=I+z.shift();t=p+z.shift();w=C+z.shift();
V=t+z.shift();M=w+z.shift();i=V+z.shift();F=M+z.shift();B=i+z.shift();if(Math.abs(F-f)>Math.abs(B-e)){f=F+z.shift()}else{e=B+z.shift()}v.z(E,I,p,C,t,w,V);
v.z(E,M,i,F,B,f,e)}}else if(c=="o14"){if(z.length>0&&z.length!=4&&!m){s=z.shift()+T.nominalWidthX;m=!0}if(z.length==4){var al=0,R=z.shift(),S=z.shift(),a3=z.shift(),ao=z.shift(),at=y.d(T,a3),au=y.d(T,ao);
Q.U._drawCFF(T.CharStrings[at],X,T,q,E);X.x=R;X.y=S;Q.U._drawCFF(T.CharStrings[au],X,T,q,E)}if(d){v.R(E);
d=!1}}else if(c=="o19"||c=="o20"){var Y;Y=z.length%2!==0;if(Y&&!m){s=z.shift()+A}P+=z.length>>1;z.length=0;
m=!0;Z+=P+7>>3}else if(c=="o21"){if(z.length>2&&!m){s=z.shift()+A;m=!0}e+=z.pop();f+=z.pop();if(d)v.R(E);
v.w(E,f,e);d=!0}else if(c=="o22"){if(z.length>1&&!m){s=z.shift()+A;m=!0}f+=z.pop();if(d)v.R(E);v.w(E,f,e);
d=!0}else if(c=="o25"){while(z.length>6){f+=z.shift();e+=z.shift();v.c(E,f,e)}I=f+z.shift();p=e+z.shift();
C=I+z.shift();t=p+z.shift();f=C+z.shift();e=t+z.shift();v.z(E,I,p,C,t,f,e)}else if(c=="o26"){if(z.length%2){f+=z.shift()}while(z.length>0){I=f;
p=e+z.shift();C=I+z.shift();t=p+z.shift();f=C;e=t+z.shift();v.z(E,I,p,C,t,f,e)}}else if(c=="o27"){if(z.length%2){e+=z.shift()}while(z.length>0){I=f+z.shift();
p=e;C=I+z.shift();t=p+z.shift();f=C+z.shift();e=t;v.z(E,I,p,C,t,f,e)}}else if(c=="o10"||c=="o29"){var k=c=="o10"?q:T;
if(z.length==0){console.log("error: empty stack")}else{var n=z.pop(),K=k.Subrs[n+k.Bias];X.x=f;X.y=e;
X.i=P;X.O=m;X.width=s;X.open=d;Q.U._drawCFF(K,X,T,q,E);f=X.x;e=X.y;P=X.i;m=X.O;s=X.width;d=X.open}}else if(c=="o30"||c=="o31"){var N,L=z.length,h=0,r=c=="o31";
N=L&~2;h+=L-N;while(h<N){if(r){I=f+z.shift();p=e;C=I+z.shift();t=p+z.shift();e=t+z.shift();if(N-h==5){f=C+z.shift();
h++}else f=C;r=!1}else{I=f;p=e+z.shift();C=I+z.shift();t=p+z.shift();f=C+z.shift();if(N-h==5){e=t+z.shift();
h++}else e=t;r=!0}v.z(E,I,p,C,t,f,e);h+=4}}else if((c+"").charAt(0)=="o"){console.log("Unknown operation: "+c,O);
throw c}else z.push(c)}X.x=f;X.y=e;X.i=P;X.O=m;X.width=s;X.open=d},SVG:function(){var O={b0:function(Z){return Math.sqrt(Math.abs(Z[0]*Z[3]-Z[1]*Z[2]))},translate:function(Z,e,I){O.concat(Z,[1,0,0,1,e,I])},rotate:function(Z,e){O.concat(Z,[Math.cos(e),-Math.sin(e),Math.sin(e),Math.cos(e),0,0])},scale:function(Z,e,I){O.concat(Z,[e,0,0,I,0,0])},concat:function(Z,e){var I=Z[0],x=Z[1],p=Z[2],C=Z[3],t=Z[4],M=Z[5];
Z[0]=I*e[0]+x*e[2];Z[1]=I*e[1]+x*e[3];Z[2]=p*e[0]+C*e[2];Z[3]=p*e[1]+C*e[3];Z[4]=t*e[0]+M*e[2]+e[4];
Z[5]=t*e[1]+M*e[3]+e[5]},al:function(Z){var e=Z[0],I=Z[1],x=Z[2],p=Z[3],C=Z[4],t=Z[5],M=e*p-I*x;Z[0]=p/M;
Z[1]=-I/M;Z[2]=-x/M;Z[3]=e/M;Z[4]=(x*t-p*C)/M;Z[5]=(I*C-e*t)/M},ak:function(Z,e){var I=e[0],p=e[1];return[I*Z[0]+p*Z[2]+Z[4],I*Z[1]+p*Z[3]+Z[5]]},ai:function(Z,e){for(var I=0;
I<e.length;I+=2){var x=e[I],p=e[I+1];e[I]=x*Z[0]+p*Z[2]+Z[4];e[I+1]=x*Z[1]+p*Z[3]+Z[5]}}};function X(Z,f,e){var I=[],x=0,p=0,C=0;
while(!0){var t=Z.indexOf(f,p),M=Z.indexOf(e,p);if(t==-1&&M==-1)break;if(M==-1||t!=-1&&t<M){if(C==0){I.push(Z.slice(x,t).trim());
x=t+1}C++;p=t+1}else if(t==-1||M!=-1&&M<t){C--;if(C==0){I.push(Z.slice(x,M).trim());x=M+1}p=M+1}}return I}function T(Z){var f=X(Z,"{","}"),e={};
for(var I=0;I<f.length;I+=2){var x=f[I].split(",");for(var p=0;p<x.length;p++){var C=x[p].trim();if(e[C]==null)e[C]="";
e[C]+=f[I+1]}}return e}function q(Z){var f=X(Z,"(",")"),e=[1,0,0,1,0,0];for(var I=0;I<f.length;I+=2){var x=e;
e=E(f[I],f[I+1]);O.concat(e,x)}return e}function E(Z,f){var e=[1,0,0,1,0,0],I=!0;for(var x=0;x<f.length;
x++){var p=f.charAt(x);if(p==","||p==" ")I=!0;else if(p=="."){if(!I){f=f.slice(0,x)+","+f.slice(x);x++}I=!1}else if(p=="-"&&x>0&&f[x-1]!="e"){f=f.slice(0,x)+" "+f.slice(x);
x++;I=!0}}f=f.split(/\s*[\s,]\s*/).map(parseFloat);if(!1){}else if(Z=="translate"){if(f.length==1)O.translate(e,f[0],0);
else O.translate(e,f[0],f[1])}else if(Z=="scale"){if(f.length==1)O.scale(e,f[0],f[0]);else O.scale(e,f[0],f[1])}else if(Z=="rotate"){var C=0,t=0;
if(f.length!=1){C=f[1];t=f[2]}O.translate(e,-C,-t);O.rotate(e,-Math.PI*f[0]/180);O.translate(e,C,t)}else if(Z=="matrix")e=f;
else console.log("unknown transform: ",Z);return e}function z(Z){var f={u:[],Q:[]};if(Z==null)return f;
var e=new DOMParser,I=e.parseFromString(Z,"image/svg+xml"),x=I.getElementsByTagName("svg")[0],p=x.getAttribute("viewBox");
if(p)p=p.trim().split(" ").map(parseFloat);else p=[0,0,1e3,1e3];P(x.children,f);for(var C=0;C<f.Q.length;
C+=2){var t=f.Q[C],M=f.Q[C+1];t-=p[0];M-=p[1];M=-M;f.Q[C]=t;f.Q[C+1]=M}return f}function P(Z,f,e){for(var I=0;
I<Z.length;I++){var x=Z[I],p=x.tagName,C=x.getAttribute("fill");if(C==null)C=e;if(p=="g"){var t={Q:[],u:[]};
P(x.children,t,C);var M=x.getAttribute("transform");if(M){var i=q(M);O.ai(i,t.Q)}f.Q=f.Q.concat(t.Q);
f.u=f.u.concat(t.u)}else if(p=="path"||p=="circle"||p=="ellipse"){f.u.push(C?C:"#000000");var F;if(p=="path")F=x.getAttribute("d");
if(p=="circle"||p=="ellipse"){var B=[0,0,0,0],U=["cx","cy","rx","ry","r"];for(var J=0;J<5;J++){var w=x.getAttribute(U[J]);
if(w){w=parseFloat(w);if(J<4)B[J]=w;else B[2]=B[3]=w}}var V=B[0],y=B[1],v=B[2],A=B[3];F=["M",V-v,y,"a",v,A,0,1,0,v*2,0,"a",v,A,0,1,0,-v*2,0].join(" ")}d(F,f);
f.u.push("X")}else if(p=="defs"){}else console.log(p,x)}}function m(Z){var f=[],e=0,I=!1,x="",p="",C="",t=0;
while(e<Z.length){var M=Z.charCodeAt(e),i=Z.charAt(e);e++;var F=48<=M&&M<=57||i=="."||i=="-"||i=="+"||i=="e"||i=="E";
if(I){if((i=="+"||i=="-")&&p!="e"||i=="."&&x.indexOf(".")!=-1||F&&(C=="a"||C=="A")&&(t%7==3||t%7==4)){f.push(parseFloat(x));
t++;x=i}else if(F)x+=i;else{f.push(parseFloat(x));t++;if(i!=","&&i!=" "){f.push(i);C=i;t=0}I=!1}}else{if(F){x=i;
I=!0}else if(i!=","&&i!=" "){f.push(i);C=i;t=0}}p=i}if(I)f.push(parseFloat(x));return f}function s(Z,f,e){var I=f;
while(I<Z.length){if(typeof Z[I]=="string")break;I+=e}return(I-f)/e}function d(Z,f){var e=m(Z),I=0,x=0,p=0,C=0,t=0,M=f.Q.length,i={M:2,L:2,H:1,V:1,T:2,S:4,A:7,Q:4,C:6},F=f.u,B=f.Q;
while(I<e.length){var w=e[I];I++;var V=w.toUpperCase();if(V=="Z"){F.push("Z");x=C;p=t}else{var y=i[V],v=s(e,I,y);
for(var A=0;A<v;A++){if(A==1&&V=="M"){w=w==V?"L":"l";V="L"}var W=0,c=0;if(w!=V){W=x;c=p}if(!1){}else if(V=="M"){x=W+e[I++];
p=c+e[I++];F.push("M");B.push(x,p);C=x;t=p}else if(V=="L"){x=W+e[I++];p=c+e[I++];F.push("L");B.push(x,p)}else if(V=="H"){x=W+e[I++];
F.push("L");B.push(x,p)}else if(V=="V"){p=c+e[I++];F.push("L");B.push(x,p)}else if(V=="Q"){var Y=W+e[I++],N=c+e[I++],G=W+e[I++],H=c+e[I++];
F.push("Q");B.push(Y,N,G,H);x=G;p=H}else if(V=="T"){var u=Math.max(B.length-(F[F.length-1]=="Q"?4:2),M),Y=x+x-B[u],N=p+p-B[u+1],G=W+e[I++],H=c+e[I++];
F.push("Q");B.push(Y,N,G,H);x=G;p=H}else if(V=="C"){var Y=W+e[I++],N=c+e[I++],G=W+e[I++],H=c+e[I++],h=W+e[I++],R=c+e[I++];
F.push("C");B.push(Y,N,G,H,h,R);x=h;p=R}else if(V=="S"){var u=Math.max(B.length-(F[F.length-1]=="C"?4:2),M),Y=x+x-B[u],N=p+p-B[u+1],G=W+e[I++],H=c+e[I++],h=W+e[I++],R=c+e[I++];
F.push("C");B.push(Y,N,G,H,h,R);x=h;p=R}else if(V=="A"){var Y=x,N=p,S=e[I++],_=e[I++],a3=e[I++]*(Math.PI/180),ao=e[I++],at=e[I++],G=W+e[I++],H=c+e[I++];
if(G==x&&H==p&&S==0&&_==0)continue;var au=(Y-G)/2,k=(N-H)/2,n=Math.cos(a3),K=Math.sin(a3),L=n*au+K*k,r=-K*au+n*k,a5=S*S,a9=_*_,ag=L*L,a1=r*r,a0=(a5*a9-a5*a1-a9*ag)/(a5*a1+a9*ag),ad=(ao!=at?1:-1)*Math.sqrt(Math.max(a0,0)),af=ad*(S*r)/_,an=-ad*(_*L)/S,ap=n*af-K*an+(Y+G)/2,ah=K*af+n*an+(N+H)/2,ak=function(D,$,o,j){var ar=Math.sqrt(D*D+$*$),b=Math.sqrt(o*o+j*j),a6=(D*o+$*j)/(ar*b);
return(D*j-$*o>=0?1:-1)*Math.acos(Math.max(-1,Math.min(1,a6)))},as=(L-af)/S,a7=(r-an)/_,a2=ak(1,0,as,a7),ab=ak(as,a7,(-L-af)/S,(-r-an)/_);
ab=ab%(2*Math.PI);var aj=function(ae,x,p,D,$,o,j){var ar=function(a,l){var aq=Math.sin(l),u=Math.cos(l),l=a[0],a8=a[1],aa=a[2],Z=a[3];
a[0]=l*u+a8*aq;a[1]=-l*aq+a8*u;a[2]=aa*u+Z*aq;a[3]=-aa*aq+Z*u},b=function(a,l){for(var A=0;A<l.length;
A+=2){var x=l[A],p=l[A+1];l[A]=a[0]*x+a[2]*p+a[4];l[A+1]=a[1]*x+a[3]*p+a[5]}},a6=function(a,l){for(var A=0;
A<l.length;A++)a.push(l[A])},am=function(a,D){a6(a.u,D.u);a6(a.Q,D.Q)};if(j)while(o>$)o-=2*Math.PI;else while(o<$)o+=2*Math.PI;
var ai=(o-$)/4,ac=Math.cos(ai/2),a4=-Math.sin(ai/2),Y=(4-ac)/3,N=a4==0?a4:(1-ac)*(3-ac)/(3*a4),G=Y,H=-N,h=ac,R=-a4,y=[Y,N,G,H,h,R],f={u:["C","C","C","C"],Q:y.slice(0)},g=[1,0,0,1,0,0];
ar(g,-ai);for(var A=0;A<3;A++){b(g,y);a6(f.Q,y)}ar(g,-$+ai/2);g[0]*=D;g[1]*=D;g[2]*=D;g[3]*=D;g[4]=x;
g[5]=p;b(g,f.Q);b(ae.ay,f.Q);am(ae.ax,f)},ae={ax:f,ay:[S*n,S*K,-_*K,_*n,ap,ah]};aj(ae,0,0,1,a2,a2+ab,at==0);
x=G;p=H}else console.log("Unknown SVG command "+w)}}}}return{cssMap:T,readTrnf:q,ap:d,aq:z}}(),initHB:function(O,X){var T=function(q){var E=0;
if((q&4294967295-(1<<7)+1)==0){E=1}else if((q&4294967295-(1<<11)+1)==0){E=2}else if((q&4294967295-(1<<16)+1)==0){E=3}else if((q&4294967295-(1<<21)+1)==0){E=4}return E};
fetch(O).then(function(q){return q.arrayBuffer()}).then(function(q){return WebAssembly.instantiate(q)}).then(function(q){console.log("HB ready");
var E=q.instance.exports,z=E.memory,P,m,s,d,Z,f,e,I;Q.U.shapeHB=function(){var x=function(C){var t=E.hb_buffer_get_length(C),M=[],i=E.hb_buffer_get_glyph_infos(C,0)>>>2,F=E.hb_buffer_get_glyph_positions(C,0)>>>2;
for(var B=0;B<t;++B){var U=i+B*5,J=F+B*5;M.push({g:m[U+0],cl:m[U+2],ax:s[J+0],ay:s[J+1],dx:s[J+2],dy:s[J+3]})}return M},p;
return function(C,t,M){var i=C._data,F=C.name.postScriptName,B=z.buffer.byteLength,U=2*i.length+t.length*16+4e6,W=0,c=0;
if(B<U){z.grow((U-B>>>16)+4)}P=new Uint8Array(z.buffer);m=new Uint32Array(z.buffer);s=new Int32Array(z.buffer);
if(d!=F){if(Z!=null){E.hb_blob_destroy(Z);E.free(f);E.hb_face_destroy(e);E.hb_font_destroy(I)}f=E.malloc(i.byteLength);
P.set(i,f);Z=E.hb_blob_create(f,i.byteLength,2,0,0);e=E.hb_face_create(Z,0);I=E.hb_font_create(e);d=F}if(window.TextEncoder==null){alert("Your browser is too old. Please, update it.");
return}if(p==null)p=new window.TextEncoder("utf8");var J=E.hb_buffer_create(),w=p.encode(t),V=w.length,y=E.malloc(V);
P.set(w,y);E.hb_buffer_add_utf8(J,y,V,0,V);E.free(y);E.hb_buffer_set_direction(J,M?4:5);E.hb_buffer_guess_segment_properties(J);
E.hb_shape(I,J,0,0);var v=x(J);E.hb_buffer_destroy(J);var A=v.slice(0);if(!M)A.reverse();for(var Y=1;
Y<A.length;Y++){var N=A[Y],G=N.cl;while(!0){var H=t.codePointAt(W),u=T(H);if(c+u<=G){c+=u;W+=H<=65535?1:2}else break}N.cl=W}return v}}();
X()})}};return Q}()


var UZIP = {};
if(typeof module == "object") module.exports = UZIP;


UZIP["parse"] = function(buf, onlyNames)	// ArrayBuffer
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint, o = 0, out = {};
	var data = new Uint8Array(buf);
	var eocd = data.length-4;
	
	while(rUi(data, eocd)!=0x06054b50) eocd--;
	
	var o = eocd;
	o+=4;	// sign  = 0x06054b50
	o+=4;  // disks = 0;
	var cnu = rUs(data, o);  o+=2;
	var cnt = rUs(data, o);  o+=2;
			
	var csize = rUi(data, o);  o+=4;
	var coffs = rUi(data, o);  o+=4;
	
	o = coffs;
	for(var i=0; i<cnu; i++)
	{
		var sign = rUi(data, o);  o+=4;
		o += 4;  // versions;
		o += 4;  // flag + compr
		var time = UZIP._readTime(data,o);  o += 4;  // time
		
		var crc32 = rUi(data, o);  o+=4;
		var csize = rUi(data, o);  o+=4;
		var usize = rUi(data, o);  o+=4;
		
		var nl = rUs(data, o), el = rUs(data, o+2), cl = rUs(data, o+4);  o += 6;  // name, extra, comment
		o += 8;  // disk, attribs
		
		var roff = rUi(data, o);  o+=4;
		o += nl + el + cl;
		
		UZIP._readLocal(data, roff, out, csize, usize, onlyNames);
	}
	//console.log(out);
	return out;
}

UZIP._readTime = function(data,o) {
	var time = UZIP.bin.readUshort(data,o), date = UZIP.bin.readUshort(data,o+2);
	var year = 1980+(date>>>9);
	var mont = (date>>>5)&15;
	var day  = (date)&31;
	//console.log(year,mont,day);
	
	var hour = (time>>>11);
	var minu = (time>>> 5)&63;
	var seco = 2*(time&31);
	
	var stamp = new Date(year,mont,day,hour,minu,seco).getTime();
	
	//console.log(date,time);
	//UZIP._writeTime(data,o,stamp);
	return stamp;
}
UZIP._writeTime = function(data,o,stamp) {
	var dt = new Date(stamp);
	var date = ((dt.getFullYear()-1980)<<9) | ((dt.getMonth()+1)<<5) | dt.getDate();
	var time = (dt.getHours()<<11) | (dt.getMinutes()<<5) | (dt.getSeconds()>>>1);
	UZIP.bin.writeUshort(data,o,time);
	UZIP.bin.writeUshort(data,o+2,date);
}


UZIP._readLocal = function(data, o, out, csize, usize, onlyNames)
{
	var rUs = UZIP.bin.readUshort, rUi = UZIP.bin.readUint;
	var sign  = rUi(data, o);  o+=4;
	var ver   = rUs(data, o);  o+=2;
	var gpflg = rUs(data, o);  o+=2;
	//if((gpflg&8)!=0) throw "unknown sizes";
	var cmpr  = rUs(data, o);  o+=2;
	
	var time  = UZIP._readTime(data,o);  o+=4;
	
	var crc32 = rUi(data, o);  o+=4;
	//var csize = rUi(data, o);  o+=4;
	//var usize = rUi(data, o);  o+=4;
	o+=8;
		
	var nlen  = rUs(data, o);  o+=2;
	var elen  = rUs(data, o);  o+=2;
		
	var name =  (gpflg&2048)==0 ? UZIP.bin.readIBM(data,o,nlen) : UZIP.bin.readUTF8(data, o, nlen);  o+=nlen;  //console.log(name);
	o += elen;
			
	//console.log(sign.toString(16), ver, gpflg, cmpr, crc32.toString(16), "csize, usize", csize, usize, nlen, elen, name, o);
	if(onlyNames) {  out[name]={size:usize, csize:csize};  return;  }   
	var file = new Uint8Array(data.buffer, o);
	if(false) {}
	else if(cmpr==0) out[name] = new Uint8Array(file.buffer.slice(o, o+csize));
	else if(cmpr==8) {
		var buf = new Uint8Array(usize);  UZIP.inflateRaw(file, buf);
		/*var nbuf = pako["inflateRaw"](file);
		if(usize>8514000) {
			//console.log(PUtils.readASCII(buf , 8514500, 500));
			//console.log(PUtils.readASCII(nbuf, 8514500, 500));
		}
		for(var i=0; i<buf.length; i++) if(buf[i]!=nbuf[i]) {  console.log(buf.length, nbuf.length, usize, i);  throw "e";  }
		*/
		out[name] = buf;
	}
	else throw "unknown compression method: "+cmpr;
}

UZIP.inflateRaw = function(file, buf) {  return UZIP.F.inflate(file, buf);  }
UZIP.inflate    = function(file, buf) { 
	var CMF = file[0], FLG = file[1];
	var CM = (CMF&15), CINFO = (CMF>>>4);
	//console.log(CM, CINFO,CMF,FLG);
	return UZIP.inflateRaw(new Uint8Array(file.buffer, file.byteOffset+2, file.length-6), buf);  
}
UZIP.deflate    = function(data, opts/*, buf, off*/) {
	if(opts==null) opts={level:6};
	var off=0, buf=new Uint8Array(50+Math.floor(data.length*1.1));
	buf[off]=120;  buf[off+1]=156;  off+=2;
	off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	var crc = UZIP.adler(data, 0, data.length);
	buf[off+0]=((crc>>>24)&255); 
	buf[off+1]=((crc>>>16)&255); 
	buf[off+2]=((crc>>> 8)&255); 
	buf[off+3]=((crc>>> 0)&255); 	
	return new Uint8Array(buf.buffer, 0, off+4);
}
UZIP.deflateRaw = function(data, opts) {
	if(opts==null) opts={level:6};
	var buf=new Uint8Array(50+Math.floor(data.length*1.1));
	var off = UZIP.F.deflateRaw(data, buf, off, opts.level);
	return new Uint8Array(buf.buffer, 0, off);
}


UZIP.encode = function(obj, noCmpr) {
	if(noCmpr==null) noCmpr=false;
	var tot = 0, wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var zpd = {};
	for(var p in obj) {  var cpr = !UZIP._noNeed(p) && !noCmpr, buf = obj[p], crc = UZIP.crc.crc(buf,0,buf.length); 
		zpd[p] = {  cpr:cpr, usize:buf.length, crc:crc, file: (cpr ? UZIP.deflateRaw(buf) : buf)  };  }
	
	for(var p in zpd) tot += zpd[p].file.length + 30 + 46 + 2*UZIP.bin.sizeUTF8(p);
	tot +=  22;
	
	var data = new Uint8Array(tot), o = 0;
	var fof = []
	
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 0);
	}
	var i=0, ioff = o;
	for(var p in zpd) {
		var file = zpd[p];  fof.push(o);
		o = UZIP._writeHeader(data, o, p, file, 1, fof[i++]);		
	}
	var csize = o-ioff;
	
	wUi(data, o, 0x06054b50);  o+=4;
	o += 4;  // disks
	wUs(data, o, i);  o += 2;
	wUs(data, o, i);  o += 2;	// number of c d records
	wUi(data, o, csize);  o += 4;
	wUi(data, o, ioff );  o += 4;
	o += 2;
	return data.buffer;
}
// no need to compress .PNG, .ZIP, .JPEG ....
UZIP._noNeed = function(fn) {  var ext = fn.split(".").pop().toLowerCase();  return "png,jpg,jpeg,zip".indexOf(ext)!=-1;  }

UZIP._writeHeader = function(data, o, p, obj, t, roff)
{
	// it is a task of a user to provide valid file names
	//var bad = "#%&{}\<>*?$'\":@+`|=";
	//for(var i=0; i<p.length; i++) if(bad.indexOf(p[i])!=-1) p = p.slice(0,i)+"_"+p.slice(i+1);
	
	var wUi = UZIP.bin.writeUint, wUs = UZIP.bin.writeUshort;
	var file = obj.file;
	
	wUi(data, o, t==0 ? 0x04034b50 : 0x02014b50);  o+=4; // sign
	if(t==1) o+=2;  // ver made by
	wUs(data, o, 20);  o+=2;	// ver
	wUs(data, o,  2048);  o+=2;    // gflip
	wUs(data, o,  obj.cpr?8:0);  o+=2;	// cmpr
		
	UZIP._writeTime(data,o,Date.now());  o+=4;//wUi(data, o,  0);  o+=4;	// time		
	wUi(data, o, obj.crc);  o+=4;	// crc32
	wUi(data, o, file.length);  o+=4;	// csize
	wUi(data, o, obj.usize);  o+=4;	// usize
		
	wUs(data, o, UZIP.bin.sizeUTF8(p));  o+=2;	// nlen
	wUs(data, o, 0);  o+=2;	// elen
	
	if(t==1) {
		o += 2;  // comment length
		o += 2;  // disk number
		o += 6;  // attributes
		wUi(data, o, roff);  o+=4;	// usize
	}
	var nlen = UZIP.bin.writeUTF8(data, o, p);  o+= nlen;	
	if(t==0) {  data.set(file, o);  o += file.length;  }
	return o;
}





UZIP.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }    
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UZIP.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UZIP.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}
UZIP.adler = function(data,o,len) {
	var a = 1, b = 0;
	var off = o, end=o+len;
	while(off<end) {
		var eend = Math.min(off+5552, end);
		while(off<eend) {
			a += data[off++];
			b += a;
		}
		a=a%65521;
		b=b%65521;
	}
    return (b << 16) | a;
}

UZIP.bin = {
	readUshort : function(buff,p)  {  return (buff[p]) | (buff[p+1]<<8);  },
	writeUshort: function(buff,p,n){  buff[p] = (n)&255;  buff[p+1] = (n>>8)&255;  },
	readUint   : function(buff,p)  {  return (buff[p+3]*(256*256*256)) + ((buff[p+2]<<16) | (buff[p+1]<< 8) | buff[p]);  },
	writeUint  : function(buff,p,n){  buff[p]=n&255;  buff[p+1]=(n>>8)&255;  buff[p+2]=(n>>16)&255;  buff[p+3]=(n>>24)&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readIBM  : function(buff, p, l) {
		var codes = [
			0xc7, 0xfc, 0xe9, 0xe2, 0xe4, 0xe0, 0xe5, 0xe7, 0xea,   0xeb, 0xe8, 0xef, 0xee, 0xec, 0xc4, 0xc5,
			0xc9, 0xe6, 0xc6, 0xf4, 0xf6, 0xf2, 0xfb, 0xf9, 0xff,   0xd6, 0xdc, 0xa2, 0xa3, 0xa5, 0xa7, 0x192,
			0xe1, 0xed, 0xf3, 0xfa, 0xf1, 0xd1, 0xaa, 0xba, 0xbf, 0x2310, 0xac, 0xbd, 0xbc, 0xa1, 0xab, 0xbb
		]
		var out = "";
		for(var i=0; i<l; i++) {
			var cc = buff[p+i];
			if     (cc<0x80) cc = cc;
			else if(cc<0xb0) cc = codes[cc-0x80];
			else             cc = 32;
			out += String.fromCharCode(cc);
		}
		return out;
	},
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UZIP.bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UZIP.bin.readASCII(buff, p, l);  }
		return  ns;
	},
	writeUTF8 : function(buff, p, str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  buff[p+i] = (     code     );  i++;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  buff[p+i] = (192|(code>> 6));  buff[p+i+1] = (128|((code>> 0)&63));  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  buff[p+i] = (224|(code>>12));  buff[p+i+1] = (128|((code>> 6)&63));  buff[p+i+2] = (128|((code>>0)&63));  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  buff[p+i] = (240|(code>>18));  buff[p+i+1] = (128|((code>>12)&63));  buff[p+i+2] = (128|((code>>6)&63));  buff[p+i+3] = (128|((code>>0)&63)); i+=4;  }
			else throw "e";
		}
		return i;
	},
	sizeUTF8 : function(str) {
		var strl = str.length, i=0;
		for(var ci=0; ci<strl; ci++)
		{
			var code = str.charCodeAt(ci);
			if     ((code&(0xffffffff-(1<< 7)+1))==0) {  i++ ;  }
			else if((code&(0xffffffff-(1<<11)+1))==0) {  i+=2;  }
			else if((code&(0xffffffff-(1<<16)+1))==0) {  i+=3;  }
			else if((code&(0xffffffff-(1<<21)+1))==0) {  i+=4;  }
			else throw "e";
		}
		return i;
	}
}









UZIP.F = {};

UZIP.F.deflateRaw = function(data, out, opos, lvl) {	
	var opts = [
	/*
		 ush good_length; /* reduce lazy search above this match length 
		 ush max_lazy;    /* do not perform lazy search above this match length 
         ush nice_length; /* quit search above this match length 
	*/
	/*      good lazy nice chain */
	/* 0 */ [ 0,   0,   0,    0,0],  /* store only */
	/* 1 */ [ 4,   4,   8,    4,0], /* max speed, no lazy matches */
	/* 2 */ [ 4,   5,  16,    8,0],
	/* 3 */ [ 4,   6,  16,   16,0],

	/* 4 */ [ 4,  10,  16,   32,0],  /* lazy matches */
	/* 5 */ [ 8,  16,  32,   32,0],
	/* 6 */ [ 8,  16, 128,  128,0],
	/* 7 */ [ 8,  32, 128,  256,0],
	/* 8 */ [32, 128, 258, 1024,1],
	/* 9 */ [32, 258, 258, 4096,1]]; /* max compression */
	
	var opt = opts[lvl];
	
	
	var U = UZIP.F.U, goodIndex = UZIP.F._goodIndex, hash = UZIP.F._hash, putsE = UZIP.F._putsE;
	var i = 0, pos = opos<<3, cvrd = 0, dlen = data.length;
	
	if(lvl==0) {
		while(i<dlen) {   var len = Math.min(0xffff, dlen-i);
			putsE(out, pos, (i+len==dlen ? 1 : 0));  pos = UZIP.F._copyExact(data, i, len, out, pos+8);  i += len;  }
		return pos>>>3;
	}

	var lits = U.lits, strt=U.strt, prev=U.prev, li=0, lc=0, bs=0, ebits=0, c=0, nc=0;  // last_item, literal_count, block_start
	if(dlen>2) {  nc=UZIP.F._hash(data,0);  strt[nc]=0;  }
	var nmch=0,nmci=0;
	
	for(i=0; i<dlen; i++)  {
		c = nc;
		//*
		if(i+1<dlen-2) {
			nc = UZIP.F._hash(data, i+1);
			var ii = ((i+1)&0x7fff);
			prev[ii]=strt[nc];
			strt[nc]=ii;
		} //*/
		if(cvrd<=i) {
			if((li>14000 || lc>26697) && (dlen-i)>100) {
				if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
				pos = UZIP.F._writeBlock(((i==dlen-1) || (cvrd==dlen))?1:0, lits, li, ebits, data,bs,i-bs, out, pos);  li=lc=ebits=0;  bs=i;
			}
			
			var mch = 0;
			//if(nmci==i) mch= nmch;  else 
			if(i<dlen-2) mch = UZIP.F._bestMatch(data, i, prev, c, Math.min(opt[2],dlen-i), opt[3]);
			/*
			if(mch!=0 && opt[4]==1 && (mch>>>16)<opt[1] && i+1<dlen-2) {
				nmch = UZIP.F._bestMatch(data, i+1, prev, nc, opt[2], opt[3]);  nmci=i+1;
				//var mch2 = UZIP.F._bestMatch(data, i+2, prev, nnc);  //nmci=i+1;
				if((nmch>>>16)>(mch>>>16)) mch=0;
			}//*/
			var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
			if(mch!=0) { 
				var len = mch>>>16, dst = mch&0xffff;  //if(i-dst<0) throw "e";
				var lgi = goodIndex(len, U.of0);  U.lhst[257+lgi]++; 
				var dgi = goodIndex(dst, U.df0);  U.dhst[    dgi]++;  ebits += U.exb[lgi] + U.dxb[dgi]; 
				lits[li] = (len<<23)|(i-cvrd);  lits[li+1] = (dst<<16)|(lgi<<8)|dgi;  li+=2;
				cvrd = i + len;  
			}
			else {	U.lhst[data[i]]++;  }
			lc++;
		}
	}
	if(bs!=i || data.length==0) {
		if(cvrd<i) {  lits[li]=i-cvrd;  li+=2;  cvrd=i;  }
		pos = UZIP.F._writeBlock(1, lits, li, ebits, data,bs,i-bs, out, pos);  li=0;  lc=0;  li=lc=ebits=0;  bs=i;
	}
	while((pos&7)!=0) pos++;
	return pos>>>3;
}
UZIP.F._bestMatch = function(data, i, prev, c, nice, chain) {
	var ci = (i&0x7fff), pi=prev[ci];  
	//console.log("----", i);
	var dif = ((ci-pi + (1<<15)) & 0x7fff);  if(pi==ci || c!=UZIP.F._hash(data,i-dif)) return 0;
	var tl=0, td=0;  // top length, top distance
	var dlim = Math.min(0x7fff, i);
	while(dif<=dlim && --chain!=0 && pi!=ci /*&& c==UZIP.F._hash(data,i-dif)*/) {
		if(tl==0 || (data[i+tl]==data[i+tl-dif])) {
			var cl = UZIP.F._howLong(data, i, dif);
			if(cl>tl) {  
				tl=cl;  td=dif;  if(tl>=nice) break;    //* 
				if(dif+2<cl) cl = dif+2;
				var maxd = 0; // pi does not point to the start of the word
				for(var j=0; j<cl-2; j++) {
					var ei =  (i-dif+j+ (1<<15)) & 0x7fff;
					var li = prev[ei];
					var curd = (ei-li + (1<<15)) & 0x7fff;
					if(curd>maxd) {  maxd=curd;  pi = ei; }
				}  //*/
			}
		}
		
		ci=pi;  pi = prev[ci];
		dif += ((ci-pi + (1<<15)) & 0x7fff);
	}
	return (tl<<16)|td;
}
UZIP.F._howLong = function(data, i, dif) {
	if(data[i]!=data[i-dif] || data[i+1]!=data[i+1-dif] || data[i+2]!=data[i+2-dif]) return 0;
	var oi=i, l = Math.min(data.length, i+258);  i+=3;
	//while(i+4<l && data[i]==data[i-dif] && data[i+1]==data[i+1-dif] && data[i+2]==data[i+2-dif] && data[i+3]==data[i+3-dif]) i+=4;
	while(i<l && data[i]==data[i-dif]) i++;
	return i-oi;
}
UZIP.F._hash = function(data, i) {
	return (((data[i]<<8) | data[i+1])+(data[i+2]<<4))&0xffff;
	//var hash_shift = 0, hash_mask = 255;
	//var h = data[i+1] % 251;
	//h = (((h << 8) + data[i+2]) % 251);
	//h = (((h << 8) + data[i+2]) % 251);
	//h = ((h<<hash_shift) ^ (c) ) & hash_mask;
	//return h | (data[i]<<8);
	//return (data[i] | (data[i+1]<<8));
}
//UZIP.___toth = 0;
UZIP.saved = 0;
UZIP.F._writeBlock = function(BFINAL, lits, li, ebits, data,o0,l0, out, pos) {
	var U = UZIP.F.U, putsF = UZIP.F._putsF, putsE = UZIP.F._putsE;
	
	//*
	var T, ML, MD, MH, numl, numd, numh, lset, dset;  U.lhst[256]++;
	T = UZIP.F.getTrees(); ML=T[0]; MD=T[1]; MH=T[2]; numl=T[3]; numd=T[4]; numh=T[5]; lset=T[6]; dset=T[7];
	
	var cstSize = (((pos+3)&7)==0 ? 0 : 8-((pos+3)&7)) + 32 + (l0<<3);
	var fxdSize = ebits + UZIP.F.contSize(U.fltree, U.lhst) + UZIP.F.contSize(U.fdtree, U.dhst);
	var dynSize = ebits + UZIP.F.contSize(U.ltree , U.lhst) + UZIP.F.contSize(U.dtree , U.dhst);
	dynSize    += 14 + 3*numh + UZIP.F.contSize(U.itree, U.ihst) + (U.ihst[16]*2 + U.ihst[17]*3 + U.ihst[18]*7);
	
	for(var j=0; j<286; j++) U.lhst[j]=0;   for(var j=0; j<30; j++) U.dhst[j]=0;   for(var j=0; j<19; j++) U.ihst[j]=0;
	//*/
	var BTYPE = (cstSize<fxdSize && cstSize<dynSize) ? 0 : ( fxdSize<dynSize ? 1 : 2 );
	putsF(out, pos, BFINAL);  putsF(out, pos+1, BTYPE);  pos+=3;
	
	var opos = pos;
	if(BTYPE==0) {
		while((pos&7)!=0) pos++;
		pos = UZIP.F._copyExact(data, o0, l0, out, pos);
	}
	else {
		var ltree, dtree;
		if(BTYPE==1) {  ltree=U.fltree;  dtree=U.fdtree;  }
		if(BTYPE==2) {	
			UZIP.F.makeCodes(U.ltree, ML);  UZIP.F.revCodes(U.ltree, ML);
			UZIP.F.makeCodes(U.dtree, MD);  UZIP.F.revCodes(U.dtree, MD);
			UZIP.F.makeCodes(U.itree, MH);  UZIP.F.revCodes(U.itree, MH);
			
			ltree = U.ltree;  dtree = U.dtree;
			
			putsE(out, pos,numl-257);  pos+=5;  // 286
			putsE(out, pos,numd-  1);  pos+=5;  // 30
			putsE(out, pos,numh-  4);  pos+=4;  // 19
			
			for(var i=0; i<numh; i++) putsE(out, pos+i*3, U.itree[(U.ordr[i]<<1)+1]);   pos+=3* numh;
			pos = UZIP.F._codeTiny(lset, U.itree, out, pos);
			pos = UZIP.F._codeTiny(dset, U.itree, out, pos);
		}
		
		var off=o0;
		for(var si=0; si<li; si+=2) {
			var qb=lits[si], len=(qb>>>23), end = off+(qb&((1<<23)-1));
			while(off<end) pos = UZIP.F._writeLit(data[off++], ltree, out, pos);
			
			if(len!=0) {
				var qc = lits[si+1], dst=(qc>>16), lgi=(qc>>8)&255, dgi=(qc&255);
				pos = UZIP.F._writeLit(257+lgi, ltree, out, pos);
				putsE(out, pos, len-U.of0[lgi]);  pos+=U.exb[lgi];
				
				pos = UZIP.F._writeLit(dgi, dtree, out, pos);
				putsF(out, pos, dst-U.df0[dgi]);  pos+=U.dxb[dgi];  off+=len;
			}
		}
		pos = UZIP.F._writeLit(256, ltree, out, pos);
	}
	//console.log(pos-opos, fxdSize, dynSize, cstSize);
	return pos;
}
UZIP.F._copyExact = function(data,off,len,out,pos) {
	var p8 = (pos>>>3);
	out[p8]=(len);  out[p8+1]=(len>>>8);  out[p8+2]=255-out[p8];  out[p8+3]=255-out[p8+1];  p8+=4;
	out.set(new Uint8Array(data.buffer, off, len), p8);
	//for(var i=0; i<len; i++) out[p8+i]=data[off+i];
	return pos + ((len+4)<<3);
}
/*
	Interesting facts:
	- decompressed block can have bytes, which do not occur in a Huffman tree (copied from the previous block by reference)
*/

UZIP.F.getTrees = function() {
	var U = UZIP.F.U;
	var ML = UZIP.F._hufTree(U.lhst, U.ltree, 15);
	var MD = UZIP.F._hufTree(U.dhst, U.dtree, 15);
	var lset = [], numl = UZIP.F._lenCodes(U.ltree, lset);
	var dset = [], numd = UZIP.F._lenCodes(U.dtree, dset);
	for(var i=0; i<lset.length; i+=2) U.ihst[lset[i]]++;
	for(var i=0; i<dset.length; i+=2) U.ihst[dset[i]]++;
	var MH = UZIP.F._hufTree(U.ihst, U.itree,  7);
	var numh = 19;  while(numh>4 && U.itree[(U.ordr[numh-1]<<1)+1]==0) numh--;
	return [ML, MD, MH, numl, numd, numh, lset, dset];
}
UZIP.F.getSecond= function(a) {  var b=[];  for(var i=0; i<a.length; i+=2) b.push  (a[i+1]);  return b;  }
UZIP.F.nonZero  = function(a) {  var b= "";  for(var i=0; i<a.length; i+=2) if(a[i+1]!=0)b+=(i>>1)+",";  return b;  }
UZIP.F.contSize = function(tree, hst) {  var s=0;  for(var i=0; i<hst.length; i++) s+= hst[i]*tree[(i<<1)+1];  return s;  }
UZIP.F._codeTiny = function(set, tree, out, pos) {
	for(var i=0; i<set.length; i+=2) {
		var l = set[i], rst = set[i+1];  //console.log(l, pos, tree[(l<<1)+1]);
		pos = UZIP.F._writeLit(l, tree, out, pos);
		var rsl = l==16 ? 2 : (l==17 ? 3 : 7);
		if(l>15) {  UZIP.F._putsE(out, pos, rst, rsl);  pos+=rsl;  }
	}
	return pos;
}
UZIP.F._lenCodes = function(tree, set) {
	var len=tree.length;  while(len!=2 && tree[len-1]==0) len-=2;  // when no distances, keep one code with length 0
	for(var i=0; i<len; i+=2) {
		var l = tree[i+1], nxt = (i+3<len ? tree[i+3]:-1),  nnxt = (i+5<len ? tree[i+5]:-1),  prv = (i==0 ? -1 : tree[i-1]);
		if(l==0 && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 138);
			if(zc<11) set.push(17, zc-3);
			else set.push(18, zc-11);
			i += zc*2-2;
		}
		else if(l==prv && nxt==l && nnxt==l) {
			var lz = i+5;
			while(lz+2<len && tree[lz+2]==l) lz+=2;
			var zc = Math.min((lz+1-i)>>>1, 6);
			set.push(16, zc-3);
			i += zc*2-2;
		}
		else set.push(l, 0);
	}
	return len>>>1;
}
UZIP.F._hufTree   = function(hst, tree, MAXL) {
	var list=[], hl = hst.length, tl=tree.length, i=0;
	for(i=0; i<tl; i+=2) {  tree[i]=0;  tree[i+1]=0;  }	
	for(i=0; i<hl; i++) if(hst[i]!=0) list.push({lit:i, f:hst[i]});
	var end = list.length, l2=list.slice(0);
	if(end==0) return 0;  // empty histogram (usually for dist)
	if(end==1) {  var lit=list[0].lit, l2=lit==0?1:0;  tree[(lit<<1)+1]=1;  tree[(l2<<1)+1]=1;  return 1;  }
	list.sort(function(a,b){return a.f-b.f;});
	var a=list[0], b=list[1], i0=0, i1=1, i2=2;  list[0]={lit:-1,f:a.f+b.f,l:a,r:b,d:0};
	while(i1!=end-1) {
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  a=list[i0++];  }  else {  a=list[i2++];  }
		if(i0!=i1 && (i2==end || list[i0].f<list[i2].f)) {  b=list[i0++];  }  else {  b=list[i2++];  }
		list[i1++]={lit:-1,f:a.f+b.f, l:a,r:b};
	}
	var maxl = UZIP.F.setDepth(list[i1-1], 0);
	if(maxl>MAXL) {  UZIP.F.restrictDepth(l2, MAXL, maxl);  maxl = MAXL;  }
	for(i=0; i<end; i++) tree[(l2[i].lit<<1)+1]=l2[i].d;
	return maxl;
}

UZIP.F.setDepth  = function(t, d) {
	if(t.lit!=-1) {  t.d=d;  return d;  }
	return Math.max( UZIP.F.setDepth(t.l, d+1),  UZIP.F.setDepth(t.r, d+1) );
}

UZIP.F.restrictDepth = function(dps, MD, maxl) {
	var i=0, bCost=1<<(maxl-MD), dbt=0;
	dps.sort(function(a,b){return b.d==a.d ? a.f-b.f : b.d-a.d;});
	
	for(i=0; i<dps.length; i++) if(dps[i].d>MD) {  var od=dps[i].d;  dps[i].d=MD;  dbt+=bCost-(1<<(maxl-od));  }  else break;
	dbt = dbt>>>(maxl-MD);
	while(dbt>0) {  var od=dps[i].d;  if(od<MD) {  dps[i].d++;  dbt-=(1<<(MD-od-1));  }  else  i++;  }
	for(; i>=0; i--) if(dps[i].d==MD && dbt<0) {  dps[i].d--;  dbt++;  }  if(dbt!=0) console.log("debt left");
}

UZIP.F._goodIndex = function(v, arr) {
	var i=0;  if(arr[i|16]<=v) i|=16;  if(arr[i|8]<=v) i|=8;  if(arr[i|4]<=v) i|=4;  if(arr[i|2]<=v) i|=2;  if(arr[i|1]<=v) i|=1;  return i;
}
UZIP.F._writeLit = function(ch, ltree, out, pos) {
	UZIP.F._putsF(out, pos, ltree[ch<<1]);
	return pos+ltree[(ch<<1)+1];
}








UZIP.F.inflate = function(data, buf) {
	var u8=Uint8Array;
	if(data[0]==3 && data[1]==0) return (buf ? buf : new u8(0));
	var F=UZIP.F, bitsF = F._bitsF, bitsE = F._bitsE, decodeTiny = F._decodeTiny, makeCodes = F.makeCodes, codes2map=F.codes2map, get17 = F._get17;
	var U = F.U;
	
	var noBuf = (buf==null);
	if(noBuf) buf = new u8((data.length>>>2)<<3);
	
	var BFINAL=0, BTYPE=0, HLIT=0, HDIST=0, HCLEN=0, ML=0, MD=0; 	
	var off = 0, pos = 0;
	var lmap, dmap;
	
	while(BFINAL==0) {		
		BFINAL = bitsF(data, pos  , 1);
		BTYPE  = bitsF(data, pos+1, 2);  pos+=3;
		//console.log(BFINAL, BTYPE);
		
		if(BTYPE==0) {
			if((pos&7)!=0) pos+=8-(pos&7);
			var p8 = (pos>>>3)+4, len = data[p8-4]|(data[p8-3]<<8);  //console.log(len);//bitsF(data, pos, 16), 
			if(noBuf) buf=UZIP.F._check(buf, off+len);
			buf.set(new u8(data.buffer, data.byteOffset+p8, len), off);
			//for(var i=0; i<len; i++) buf[off+i] = data[p8+i];
			//for(var i=0; i<len; i++) if(buf[off+i] != data[p8+i]) throw "e";
			pos = ((p8+len)<<3);  off+=len;  continue;
		}
		if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));  // really not enough in many cases (but PNG and ZIP provide buffer in advance)
		if(BTYPE==1) {  lmap = U.flmap;  dmap = U.fdmap;  ML = (1<<9)-1;  MD = (1<<5)-1;   }
		if(BTYPE==2) {
			HLIT  = bitsE(data, pos   , 5)+257;  
			HDIST = bitsE(data, pos+ 5, 5)+  1;  
			HCLEN = bitsE(data, pos+10, 4)+  4;  pos+=14;
			
			var ppos = pos;
			for(var i=0; i<38; i+=2) {  U.itree[i]=0;  U.itree[i+1]=0;  }
			var tl = 1;
			for(var i=0; i<HCLEN; i++) {  var l=bitsE(data, pos+i*3, 3);  U.itree[(U.ordr[i]<<1)+1] = l;  if(l>tl)tl=l;  }     pos+=3*HCLEN;  //console.log(itree);
			makeCodes(U.itree, tl);
			codes2map(U.itree, tl, U.imap);
			
			lmap = U.lmap;  dmap = U.dmap;
			
			pos = decodeTiny(U.imap, (1<<tl)-1, HLIT+HDIST, data, pos, U.ttree);
			var mx0 = F._copyOut(U.ttree,    0, HLIT , U.ltree);  ML = (1<<mx0)-1;
			var mx1 = F._copyOut(U.ttree, HLIT, HDIST, U.dtree);  MD = (1<<mx1)-1;
			
			//var ml = decodeTiny(U.imap, (1<<tl)-1, HLIT , data, pos, U.ltree); ML = (1<<(ml>>>24))-1;  pos+=(ml&0xffffff);
			makeCodes(U.ltree, mx0);
			codes2map(U.ltree, mx0, lmap);
			
			//var md = decodeTiny(U.imap, (1<<tl)-1, HDIST, data, pos, U.dtree); MD = (1<<(md>>>24))-1;  pos+=(md&0xffffff);
			makeCodes(U.dtree, mx1);
			codes2map(U.dtree, mx1, dmap);
		}
		//var ooff=off, opos=pos;
		while(true) {
			var code = lmap[get17(data, pos) & ML];  pos += code&15;
			var lit = code>>>4;  //U.lhst[lit]++;  
			if((lit>>>8)==0) {  buf[off++] = lit;  }
			else if(lit==256) {  break;  }
			else {
				var end = off+lit-254;
				if(lit>264) { var ebs = U.ldef[lit-257];  end = off + (ebs>>>3) + bitsE(data, pos, ebs&7);  pos += ebs&7;  }
				//UZIP.F.dst[end-off]++;
				
				var dcode = dmap[get17(data, pos) & MD];  pos += dcode&15;
				var dlit = dcode>>>4;
				var dbs = U.ddef[dlit], dst = (dbs>>>4) + bitsF(data, pos, dbs&15);  pos += dbs&15;
				
				//var o0 = off-dst, stp = Math.min(end-off, dst);
				//if(stp>20) while(off<end) {  buf.copyWithin(off, o0, o0+stp);  off+=stp;  }  else
				//if(end-dst<=off) buf.copyWithin(off, off-dst, end-dst);  else
				//if(dst==1) buf.fill(buf[off-1], off, end);  else
				if(noBuf) buf=UZIP.F._check(buf, off+(1<<17));
				while(off<end) {  buf[off]=buf[off++-dst];    buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  buf[off]=buf[off++-dst];  }   
				off=end;
				//while(off!=end) {  buf[off]=buf[off++-dst];  }
			}
		}
		//console.log(off-ooff, (pos-opos)>>>3);
	}
	//console.log(UZIP.F.dst);
	//console.log(tlen, dlen, off-tlen+tcnt);
	return buf.length==off ? buf : buf.slice(0,off);
}
UZIP.F._check=function(buf, len) {
	var bl=buf.length;  if(len<=bl) return buf;
	var nbuf = new Uint8Array(Math.max(bl<<1,len));  nbuf.set(buf,0);
	//for(var i=0; i<bl; i+=4) {  nbuf[i]=buf[i];  nbuf[i+1]=buf[i+1];  nbuf[i+2]=buf[i+2];  nbuf[i+3]=buf[i+3];  }
	return nbuf;
}

UZIP.F._decodeTiny = function(lmap, LL, len, data, pos, tree) {
	var bitsE = UZIP.F._bitsE, get17 = UZIP.F._get17;
	var i = 0;
	while(i<len) {
		var code = lmap[get17(data, pos)&LL];  pos+=code&15;
		var lit = code>>>4; 
		if(lit<=15) {  tree[i]=lit;  i++;  }
		else {
			var ll = 0, n = 0;
			if(lit==16) {
				n = (3  + bitsE(data, pos, 2));  pos += 2;  ll = tree[i-1];
			}
			else if(lit==17) {
				n = (3  + bitsE(data, pos, 3));  pos += 3;
			}
			else if(lit==18) {
				n = (11 + bitsE(data, pos, 7));  pos += 7;
			}
			var ni = i+n;
			while(i<ni) {  tree[i]=ll;  i++; }
		}
	}
	return pos;
}
UZIP.F._copyOut = function(src, off, len, tree) {
	var mx=0, i=0, tl=tree.length>>>1;
	while(i<len) {  var v=src[i+off];  tree[(i<<1)]=0;  tree[(i<<1)+1]=v;  if(v>mx)mx=v;  i++;  }
	while(i<tl ) {  tree[(i<<1)]=0;  tree[(i<<1)+1]=0;  i++;  }
	return mx;
}

UZIP.F.makeCodes = function(tree, MAX_BITS) {  // code, length
	var U = UZIP.F.U;
	var max_code = tree.length;
	var code, bits, n, i, len;
	
	var bl_count = U.bl_count;  for(var i=0; i<=MAX_BITS; i++) bl_count[i]=0;
	for(i=1; i<max_code; i+=2) bl_count[tree[i]]++;
	
	var next_code = U.next_code;	// smallest code for each length
	
	code = 0;
	bl_count[0] = 0;
	for (bits = 1; bits <= MAX_BITS; bits++) {
		code = (code + bl_count[bits-1]) << 1;
		next_code[bits] = code;
	}
	
	for (n = 0; n < max_code; n+=2) {
		len = tree[n+1];
		if (len != 0) {
			tree[n] = next_code[len];
			next_code[len]++;
		}
	}
}
UZIP.F.codes2map = function(tree, MAX_BITS, map) {
	var max_code = tree.length;
	var U=UZIP.F.U, r15 = U.rev15;
	for(var i=0; i<max_code; i+=2) if(tree[i+1]!=0)  {
		var lit = i>>1;
		var cl = tree[i+1], val = (lit<<4)|cl; // :  (0x8000 | (U.of0[lit-257]<<7) | (U.exb[lit-257]<<4) | cl);
		var rest = (MAX_BITS-cl), i0 = tree[i]<<rest, i1 = i0 + (1<<rest);
		//tree[i]=r15[i0]>>>(15-MAX_BITS);
		while(i0!=i1) {
			var p0 = r15[i0]>>>(15-MAX_BITS);
			map[p0]=val;  i0++;
		}
	}
}
UZIP.F.revCodes = function(tree, MAX_BITS) {
	var r15 = UZIP.F.U.rev15, imb = 15-MAX_BITS;
	for(var i=0; i<tree.length; i+=2) {  var i0 = (tree[i]<<(MAX_BITS-tree[i+1]));  tree[i] = r15[i0]>>>imb;  }
}

// used only in deflate
UZIP.F._putsE= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);                        }
UZIP.F._putsF= function(dt, pos, val   ) {  val = val<<(pos&7);  var o=(pos>>>3);  dt[o]|=val;  dt[o+1]|=(val>>>8);  dt[o+2]|=(val>>>16);  }

UZIP.F._bitsE= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8)                        )>>>(pos&7))&((1<<length)-1);  }
UZIP.F._bitsF= function(dt, pos, length) {  return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16))>>>(pos&7))&((1<<length)-1);  }
/*
UZIP.F._get9 = function(dt, pos) {
	return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8))>>>(pos&7))&511;
} */
UZIP.F._get17= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) )>>>(pos&7);
}
UZIP.F._get25= function(dt, pos) {	// return at least 17 meaningful bytes
	return (dt[pos>>>3] | (dt[(pos>>>3)+1]<<8) | (dt[(pos>>>3)+2]<<16) | (dt[(pos>>>3)+3]<<24) )>>>(pos&7);
}
UZIP.F.U = function(){
	var u16=Uint16Array, u32=Uint32Array;
	return {
		next_code : new u16(16),
		bl_count  : new u16(16),
		ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],
		of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],
		exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],
		ldef : new u16(32),
		df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],
		dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],
		ddef : new u32(32),
		flmap: new u16(  512),  fltree: [],
		fdmap: new u16(   32),  fdtree: [],
		lmap : new u16(32768),  ltree : [],  ttree:[],
		dmap : new u16(32768),  dtree : [],
		imap : new u16(  512),  itree : [],
		//rev9 : new u16(  512)
		rev15: new u16(1<<15),
		lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),
		lits : new u32(15000),
		strt : new u16(1<<16),
		prev : new u16(1<<15)
	};  
} ();

(function(){	
	var U = UZIP.F.U;
	var len = 1<<15;
	for(var i=0; i<len; i++) {
		var x = i;
		x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));
		x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));
		x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));
		x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));
		U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;
	}
	
	function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }
	
	for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }
	
	pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);
	/*
	var i = 0;
	for(; i<=143; i++) U.fltree.push(0,8);
	for(; i<=255; i++) U.fltree.push(0,9);
	for(; i<=279; i++) U.fltree.push(0,7);
	for(; i<=287; i++) U.fltree.push(0,8);
	*/
	UZIP.F.makeCodes(U.fltree, 9);
	UZIP.F.codes2map(U.fltree, 9, U.flmap);
	UZIP.F.revCodes (U.fltree, 9)
	
	pushV(U.fdtree,32,5);
	//for(i=0;i<32; i++) U.fdtree.push(0,5);
	UZIP.F.makeCodes(U.fdtree, 5);
	UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
	UZIP.F.revCodes (U.fdtree, 5)
	
	pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);
	/*
	for(var i=0; i< 19; i++) U.itree.push(0,0);
	for(var i=0; i<286; i++) U.ltree.push(0,0);
	for(var i=0; i< 30; i++) U.dtree.push(0,0);
	for(var i=0; i<320; i++) U.ttree.push(0,0);
	*/
})()


var paper=function(t,e){var i=(t=t||require("./node/self.js")).window,n=t.document,r=new function(){function t(t,e,r,s,a){function u(n,u){"string"==typeof(u=u||(u=o(e,n))&&(u.get?u:u.value))&&"#"===u[0]&&(u=t[u.substring(1)]||u);var c,f="function"==typeof u,d=u,_=a||f&&!u.base?u&&u.get?n in t:t[n]:null;a&&_||(f&&_&&(u.base=_),f&&!1!==s&&(c=n.match(/^([gs]et|is)(([A-Z])(.*))$/))&&(l[c[3].toLowerCase()+c[4]]=c[2]),d&&!f&&d.get&&"function"==typeof d.get&&i.isPlainObject(d)||(d={value:d,writable:!0}),(o(t,n)||{configurable:!0}).configurable&&(d.configurable=!0,d.enumerable=null!=r?r:!c),h(t,n,d))}var l={};if(e){for(var c in e)e.hasOwnProperty(c)&&!n.test(c)&&u(c);for(var c in l){var f=l[c],d=t["set"+f],_=t["get"+f]||d&&t["is"+f];!_||!0!==s&&0!==_.length||u(c,{get:_,set:d})}}return t}function i(){for(var t=0,e=arguments.length;t<e;t++){var i=arguments[t];i&&c(this,i)}return this}var n=/^(statics|enumerable|beans|preserve)$/,r=[],s=r.slice,a=Object.create,o=Object.getOwnPropertyDescriptor,h=Object.defineProperty,u=r.forEach||function(t,e){for(var i=0,n=this.length;i<n;i++)t.call(e,this[i],i,this)},l=function(t,e){for(var i in this)this.hasOwnProperty(i)&&t.call(e,this[i],i,this)},c=Object.assign||function(t){for(var e=1,i=arguments.length;e<i;e++){var n=arguments[e];for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])}return t},f=function(t,e,i){if(t){var n=o(t,"length");(n&&"number"==typeof n.value?u:l).call(t,e,i=i||t)}return i};return t(i,{inject:function(e){if(e){var i=!0===e.statics?e:e.statics,n=e.beans,r=e.preserve;i!==e&&t(this.prototype,e,e.enumerable,n,r),t(this,i,null,n,r)}for(var s=1,a=arguments.length;s<a;s++)this.inject(arguments[s]);return this},extend:function(){for(var e,i,n,r=this,s=0,o=arguments.length;s<o&&(!e||!i);s++)n=arguments[s],e=e||n.initialize,i=i||n.prototype;return e=e||function(){r.apply(this,arguments)},i=e.prototype=i||a(this.prototype),h(i,"constructor",{value:e,writable:!0,configurable:!0}),t(e,this),arguments.length&&this.inject.apply(e,arguments),e.base=r,e}}).inject({enumerable:!1,initialize:i,set:i,inject:function(){for(var e=0,i=arguments.length;e<i;e++){var n=arguments[e];n&&t(this,n,n.enumerable,n.beans,n.preserve)}return this},extend:function(){var t=a(this);return t.inject.apply(t,arguments)},each:function(t,e){return f(this,t,e)},clone:function(){return new this.constructor(this)},statics:{set:c,each:f,create:a,define:h,describe:o,clone:function(t){return c(new t.constructor,t)},isPlainObject:function(t){var e=null!=t&&t.constructor;return e&&(e===Object||e===i||"Object"===e.name)},pick:function(t,i){return t!==e?t:i},slice:function(t,e,i){return s.call(t,e,i)}}})};"undefined"!=typeof module&&(module.exports=r),r.inject({enumerable:!1,toString:function(){return null!=this._id?(this._class||"Object")+(this._name?" '"+this._name+"'":" @"+this._id):"{ "+r.each(this,function(t,e){if(!/^_/.test(e)){var i=typeof t;this.push(e+": "+("number"===i?h.instance.number(t):"string"===i?"'"+t+"'":t))}},[]).join(", ")+" }"},getClassName:function(){return this._class||""},importJSON:function(t){return r.importJSON(t,this)},exportJSON:function(t){return r.exportJSON(this,t)},toJSON:function(){return r.serialize(this)},set:function(t,e){return t&&r.filter(this,t,e,this._prioritize),this}},{beans:!1,statics:{exports:{},extend:function t(){var e=t.base.apply(this,arguments),i=e.prototype._class;return i&&!r.exports[i]&&(r.exports[i]=e),e},equals:function(t,e){if(t===e)return!0;if(t&&t.equals)return t.equals(e);if(e&&e.equals)return e.equals(t);if(t&&e&&"object"==typeof t&&"object"==typeof e){if(Array.isArray(t)&&Array.isArray(e)){if((n=t.length)!==e.length)return!1;for(;n--;)if(!r.equals(t[n],e[n]))return!1}else{var i=Object.keys(t),n=i.length;if(n!==Object.keys(e).length)return!1;for(;n--;){var s=i[n];if(!e.hasOwnProperty(s)||!r.equals(t[s],e[s]))return!1}}return!0}return!1},read:function(t,i,n,s){if(this===r){var a=this.peek(t,i);return t.__index++,a}var o=this.prototype,h=o._readIndex,u=i||h&&t.__index||0,l=t.length,c=t[u];if(s=s||l-u,c instanceof this||n&&n.readNull&&null==c&&s<=1)return h&&(t.__index=u+1),c&&n&&n.clone?c.clone():c;if(c=r.create(o),h&&(c.__read=!0),c=c.initialize.apply(c,u>0||u+s<l?r.slice(t,u,u+s):t)||c,h){t.__index=u+c.__read;var f=c.__filtered;f&&(t.__filtered=f,c.__filtered=e),c.__read=e}return c},peek:function(t,e){return t[t.__index=e||t.__index||0]},remain:function(t){return t.length-(t.__index||0)},readList:function(t,e,i,n){for(var r,s=[],a=e||0,o=n?a+n:t.length,h=a;h<o;h++)s.push(Array.isArray(r=t[h])?this.read(r,0,i):this.read(t,h,i,1));return s},readNamed:function(t,i,n,s,a){var o=this.getNamed(t,i),h=o!==e;if(h){var u=t.__filtered;u||((u=t.__filtered=r.create(t[0])).__unfiltered=t[0]),u[i]=e}var l=h?[o]:t;return this.read(l,n,s,a)},getNamed:function(t,i){var n=t[0];if(t._hasObject===e&&(t._hasObject=1===t.length&&r.isPlainObject(n)),t._hasObject)return i?n[i]:t.__filtered||n},hasNamed:function(t,e){return!!this.getNamed(t,e)},filter:function(t,i,n,r){function s(r){if(!(n&&r in n||a&&r in a)){var s=i[r];s!==e&&(t[r]=s)}}var a;if(r){for(var o,h={},u=0,l=r.length;u<l;u++)(o=r[u])in i&&(s(o),h[o]=!0);a=h}return Object.keys(i.__unfiltered||i).forEach(s),t},isPlainValue:function(t,e){return r.isPlainObject(t)||Array.isArray(t)||e&&"string"==typeof t},serialize:function(t,e,i,n){e=e||{};var s,a=!n;if(a&&(e.formatter=new h(e.precision),n={length:0,definitions:{},references:{},add:function(t,e){var i="#"+t._id,n=this.references[i];if(!n){this.length++;var r=e.call(t),s=t._class;s&&r[0]!==s&&r.unshift(s),this.definitions[i]=r,n=this.references[i]=[i]}return n}}),t&&t._serialize){s=t._serialize(e,n);var o=t._class;!o||t._compactSerialize||!a&&i||s[0]===o||s.unshift(o)}else if(Array.isArray(t)){s=[];for(var u=0,l=t.length;u<l;u++)s[u]=r.serialize(t[u],e,i,n)}else if(r.isPlainObject(t)){s={};for(var c=Object.keys(t),u=0,l=c.length;u<l;u++){var f=c[u];s[f]=r.serialize(t[f],e,i,n)}}else s="number"==typeof t?e.formatter.number(t,e.precision):t;return a&&n.length>0?[["dictionary",n.definitions],s]:s},deserialize:function(t,e,i,n,s){var a=t,o=!i,h=o&&t&&t.length&&"dictionary"===t[0][0];if(i=i||{},Array.isArray(t)){var u=t[0],l="dictionary"===u;if(1==t.length&&/^#/.test(u))return i.dictionary[u];a=[];for(var c=(u=r.exports[u])?1:0,f=t.length;c<f;c++)a.push(r.deserialize(t[c],e,i,l,h));if(u){var d=a;e?a=e(u,d,o||s):(a=r.create(u.prototype),u.apply(a,d))}}else if(r.isPlainObject(t)){a={},n&&(i.dictionary=a);for(var _ in t)a[_]=r.deserialize(t[_],e,i)}return h?a[1]:a},exportJSON:function(t,e){var i=r.serialize(t,e);return e&&0==e.asString?i:JSON.stringify(i)},importJSON:function(t,e){return r.deserialize("string"==typeof t?JSON.parse(t):t,function(t,i,n){var s=n&&e&&e.constructor===t,a=s?e:r.create(t.prototype);if(1===i.length&&a instanceof w&&(s||!(a instanceof b))){var o=i[0];r.isPlainObject(o)&&(o.insert=!1)}return(s?a.set:t).apply(a,i),s&&(e=null),a})},splice:function(t,i,n,r){var s=i&&i.length,a=n===e;(n=a?t.length:n)>t.length&&(n=t.length);for(u=0;u<s;u++)i[u]._index=n+u;if(a)return t.push.apply(t,i),[];var o=[n,r];i&&o.push.apply(o,i);for(var h=t.splice.apply(t,o),u=0,l=h.length;u<l;u++)h[u]._index=e;for(var u=n+s,l=t.length;u<l;u++)t[u]._index=u;return h},capitalize:function(t){return t.replace(/\b[a-z]/g,function(t){return t.toUpperCase()})},camelize:function(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})},hyphenate:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});var s={on:function(t,e){if("string"!=typeof t)r.each(t,function(t,e){this.on(e,t)},this);else{var i=this._eventTypes,n=i&&i[t],s=this._callbacks=this._callbacks||{};-1===(s=s[t]=s[t]||[]).indexOf(e)&&(s.push(e),n&&n.install&&1===s.length&&n.install.call(this,t))}return this},off:function(t,e){if("string"==typeof t){var i,n=this._eventTypes,s=n&&n[t],a=this._callbacks&&this._callbacks[t];return a&&(!e||-1!==(i=a.indexOf(e))&&1===a.length?(s&&s.uninstall&&s.uninstall.call(this,t),delete this._callbacks[t]):-1!==i&&a.splice(i,1)),this}r.each(t,function(t,e){this.off(e,t)},this)},once:function(t,e){return this.on(t,function(){e.apply(this,arguments),this.off(t,e)})},emit:function(t,e){var i=this._callbacks&&this._callbacks[t];if(!i)return!1;var n=r.slice(arguments,1),s=e&&e.target&&!e.currentTarget;i=i.slice(),s&&(e.currentTarget=this);for(var a=0,o=i.length;a<o;a++)if(0==i[a].apply(this,n)){e&&e.stop&&e.stop();break}return s&&delete e.currentTarget,!0},responds:function(t){return!(!this._callbacks||!this._callbacks[t])},attach:"#on",detach:"#off",fire:"#emit",_installEvents:function(t){var e=this._eventTypes,i=this._callbacks,n=t?"install":"uninstall";if(e)for(var r in i)if(i[r].length>0){var s=e[r],a=s&&s[n];a&&a.call(this,r)}},statics:{inject:function t(e){var i=e._events;if(i){var n={};r.each(i,function(t,i){var s="string"==typeof t,a=s?t:i,o=r.capitalize(a),h=a.substring(2).toLowerCase();n[h]=s?{}:t,a="_"+a,e["get"+o]=function(){return this[a]},e["set"+o]=function(t){var e=this[a];e&&this.off(h,e),t&&this.on(h,t),this[a]=t}}),e._eventTypes=n}return t.base.apply(this,arguments)}}},a=r.extend({_class:"PaperScope",initialize:function e(){paper=this,this.settings=new r({applyMatrix:!0,insertItems:!0,handleSize:4,hitTolerance:0}),this.project=null,this.projects=[],this.tools=[],this._id=e._id++,e._scopes[this._id]=this;var i=e.prototype;if(!this.support){var n=Q.getContext(1,1)||{};i.support={nativeDash:"setLineDash"in n||"mozDash"in n,nativeBlendModes:tt.nativeModes},Q.release(n)}if(!this.agent){var s=t.navigator.userAgent.toLowerCase(),a=(/(darwin|win|mac|linux|freebsd|sunos)/.exec(s)||[])[0],o="darwin"===a?"mac":a,h=i.agent=i.browser={platform:o};o&&(h[o]=!0),s.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,function(t,e,i,n,r){if(!h.chrome){var s="opera"===e?n:/^(node|trident)$/.test(e)?r:i;h.version=s,h.versionNumber=parseFloat(s),e="trident"===e?"msie":e,h.name=e,h[e]=!0}}),h.chrome&&delete h.webkit,h.atom&&delete h.chrome}},version:"0.11.5",getView:function(){var t=this.project;return t&&t._view},getPaper:function(){return this},execute:function(t,e){paper.PaperScript.execute(t,this,e),U.updateFocus()},install:function(t){var e=this;r.each(["project","view","tool"],function(i){r.define(t,i,{configurable:!0,get:function(){return e[i]}})});for(var i in this)!/^_/.test(i)&&this[i]&&(t[i]=this[i])},setup:function(t){return paper=this,this.project=new y(t),this},createCanvas:function(t,e){return Q.getCanvas(t,e)},activate:function(){paper=this},clear:function(){for(var t=this.projects,e=this.tools,i=t.length-1;i>=0;i--)t[i].remove();for(i=e.length-1;i>=0;i--)e[i].remove()},remove:function(){this.clear(),delete a._scopes[this._id]},statics:new function(){function t(t){return t+="Attribute",function(e,i){return e[t](i)||e[t]("data-paper-"+i)}}return{_scopes:{},_id:0,get:function(t){return this._scopes[t]||null},getAttribute:t("get"),hasAttribute:t("has")}}}),o=r.extend(s,{initialize:function(t){this._scope=paper,this._index=this._scope[this._list].push(this)-1,!t&&this._scope[this._reference]||this.activate()},activate:function(){if(!this._scope)return!1;var t=this._scope[this._reference];return t&&t!==this&&t.emit("deactivate"),this._scope[this._reference]=this,this.emit("activate",t),!0},isActive:function(){return this._scope[this._reference]===this},remove:function(){return null!=this._index&&(r.splice(this._scope[this._list],null,this._index,1),this._scope[this._reference]==this&&(this._scope[this._reference]=null),this._scope=null,!0)},getView:function(){return this._scope.getView()}}),h=r.extend({initialize:function(t){this.precision=r.pick(t,5),this.multiplier=Math.pow(10,this.precision)},number:function(t){return this.precision<16?Math.round(t*this.multiplier)/this.multiplier:t},pair:function(t,e,i){return this.number(t)+(i||",")+this.number(e)},point:function(t,e){return this.number(t.x)+(e||",")+this.number(t.y)},size:function(t,e){return this.number(t.width)+(e||",")+this.number(t.height)},rectangle:function(t,e){return this.point(t,e)+(e||",")+this.size(t,e)}});h.instance=new h;var u=new function(){function t(t,e,i){return t<e?e:t>i?i:t}function e(t,e,i){function n(t){var e=134217729*t,i=t-e+e;return[i,t-i]}var r=e*e-t*i,a=e*e+t*i;if(3*s(r)<a){var o=n(t),h=n(e),u=n(i),l=e*e,c=t*i;r=l-c+(h[0]*h[0]-l+2*h[0]*h[1]+h[1]*h[1]-(o[0]*u[0]-c+o[0]*u[1]+o[1]*u[0]+o[1]*u[1]))}return r}function i(){var t=Math.max.apply(Math,arguments);return t&&(t<1e-8||t>1e8)?o(2,-Math.round(h(t))):0}var n=[[.5773502691896257],[0,.7745966692414834],[.33998104358485626,.8611363115940526],[0,.5384693101056831,.906179845938664],[.2386191860831969,.6612093864662645,.932469514203152],[0,.4058451513773972,.7415311855993945,.9491079123427585],[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],[0,.3242534234038089,.6133714327005904,.8360311073266358,.9681602395076261],[.14887433898163122,.4333953941292472,.6794095682990244,.8650633666889845,.9739065285171717],[0,.26954315595234496,.5190961292068118,.7301520055740494,.8870625997680953,.978228658146057],[.1252334085114689,.3678314989981802,.5873179542866175,.7699026741943047,.9041172563704749,.9815606342467192],[0,.2304583159551348,.44849275103644687,.6423493394403402,.8015780907333099,.9175983992229779,.9841830547185881],[.10805494870734367,.31911236892788974,.5152486363581541,.6872929048116855,.827201315069765,.9284348836635735,.9862838086968123],[0,.20119409399743451,.3941513470775634,.5709721726085388,.7244177313601701,.8482065834104272,.937273392400706,.9879925180204854],[.09501250983763744,.2816035507792589,.45801677765722737,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499]],r=[[1],[.8888888888888888,.5555555555555556],[.6521451548625461,.34785484513745385],[.5688888888888889,.47862867049936647,.23692688505618908],[.46791393457269104,.3607615730481386,.17132449237917036],[.4179591836734694,.3818300505051189,.27970539148927664,.1294849661688697],[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626],[.3302393550012598,.31234707704000286,.26061069640293544,.1806481606948574,.08127438836157441],[.29552422471475287,.26926671930999635,.21908636251598204,.1494513491505806,.06667134430868814],[.2729250867779006,.26280454451024665,.23319376459199048,.18629021092773426,.1255803694649046,.05566856711617366],[.24914704581340277,.2334925365383548,.20316742672306592,.16007832854334622,.10693932599531843,.04717533638651183],[.2325515532308739,.22628318026289723,.2078160475368885,.17814598076194574,.13887351021978725,.09212149983772845,.04048400476531588],[.2152638534631578,.2051984637212956,.18553839747793782,.15720316715819355,.12151857068790319,.08015808715976021,.03511946033175186],[.2025782419255613,.19843148532711158,.1861610000155622,.16626920581699392,.13957067792615432,.10715922046717194,.07036604748810812,.03075324199611727],[.1894506104550685,.18260341504492358,.16915651939500254,.14959598881657674,.12462897125553388,.09515851168249279,.062253523938647894,.027152459411754096]],s=Math.abs,a=Math.sqrt,o=Math.pow,h=Math.log2||function(t){return Math.log(t)*Math.LOG2E};return{EPSILON:1e-12,MACHINE_EPSILON:1.12e-16,CURVETIME_EPSILON:1e-8,GEOMETRIC_EPSILON:1e-7,TRIGONOMETRIC_EPSILON:1e-8,KAPPA:4*(a(2)-1)/3,isZero:function(t){return t>=-1e-12&&t<=1e-12},clamp:t,integrate:function(t,e,i,s){for(var a=n[s-2],o=r[s-2],h=.5*(i-e),u=h+e,l=0,c=s+1>>1,f=1&s?o[l++]*t(u):0;l<c;){var d=h*a[l];f+=o[l++]*(t(u+d)+t(u-d))}return h*f},findRoot:function(e,i,n,r,a,o,h){for(var u=0;u<o;u++){var l=e(n),c=l/i(n),f=n-c;if(s(c)<h){n=f;break}l>0?(a=n,n=f<=r?.5*(r+a):f):(r=n,n=f>=a?.5*(r+a):f)}return t(n,r,a)},solveQuadratic:function(n,r,o,h,u,l){var c,f=1/0;if(s(n)<1e-12){if(s(r)<1e-12)return s(o)<1e-12?-1:0;c=-o/r}else{var d=e(n,r*=-.5,o);if(d&&s(d)<1.12e-16){var _=i(s(n),s(r),s(o));_&&(d=e(n*=_,r*=_,o*=_))}if(d>=-1.12e-16){var g=d<0?0:a(d),v=r+(r<0?-g:g);0===v?f=-(c=o/n):(c=v/n,f=o/v)}}var p=0,m=null==u,y=u-1e-12,w=l+1e-12;return isFinite(c)&&(m||c>y&&c<w)&&(h[p++]=m?c:t(c,u,l)),f!==c&&isFinite(f)&&(m||f>y&&f<w)&&(h[p++]=m?f:t(f,u,l)),p},solveCubic:function(e,n,r,h,l,c,f){function d(t){var i=e*(_=t);p=(i+(g=i+n))*_+(v=g*_+r),m=v*_+h}var _,g,v,p,m,y=i(s(e),s(n),s(r),s(h));if(y&&(e*=y,n*=y,r*=y,h*=y),s(e)<1e-12)e=n,g=r,v=h,_=1/0;else if(s(h)<1e-12)g=n,v=r,_=0;else{d(-n/e/3);var w=m/e,x=o(s(w),1/3),b=w<0?-1:1,C=-p/e,S=C>0?1.324717957244746*Math.max(x,a(C)):x,P=_-b*S;if(P!==_){do{d(P),P=0===p?_:_-m/p/(1+1.12e-16)}while(b*P>b*_);s(e)*_*_>s(h/_)&&(g=((v=-h/_)-r)/_)}}var I=u.solveQuadratic(e,g,v,l,c,f),M=null==c;return isFinite(_)&&(0===I||I>0&&_!==l[0]&&_!==l[1])&&(M||_>c-1e-12&&_<f+1e-12)&&(l[I++]=M?_:t(_,c,f)),I}}},l={_id:1,_pools:{},get:function(t){if(t){var e=this._pools[t];return e||(e=this._pools[t]={_id:1}),e._id++}return this._id++}},c=r.extend({_class:"Point",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"x"in a?this._set(a.x||0,a.y||0):"width"in a?this._set(a.width||0,a.height||0):"angle"in a?(this._set(a.length||0,0),this.setAngle(a.angle||0)):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.x=t,this.y=e,this},equals:function(t){return this===t||t&&(this.x===t.x&&this.y===t.y||Array.isArray(t)&&this.x===t[0]&&this.y===t[1])||!1},clone:function(){return new c(this.x,this.y)},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y)]},getLength:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setLength:function(t){if(this.isZero()){var e=this._angle||0;this._set(Math.cos(e)*t,Math.sin(e)*t)}else{var i=t/this.getLength();u.isZero(i)&&this.getAngle(),this._set(this.x*i,this.y*i)}},getAngle:function(){return 180*this.getAngleInRadians.apply(this,arguments)/Math.PI},setAngle:function(t){this.setAngleInRadians.call(this,t*Math.PI/180)},getAngleInDegrees:"#getAngle",setAngleInDegrees:"#setAngle",getAngleInRadians:function(){if(arguments.length){var t=c.read(arguments),e=this.getLength()*t.getLength();if(u.isZero(e))return NaN;var i=this.dot(t)/e;return Math.acos(i<-1?-1:i>1?1:i)}return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x)},setAngleInRadians:function(t){if(this._angle=t,!this.isZero()){var e=this.getLength();this._set(Math.cos(t)*e,Math.sin(t)*e)}},getQuadrant:function(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3}},{beans:!1,getDirectedAngle:function(){var t=c.read(arguments);return 180*Math.atan2(this.cross(t),this.dot(t))/Math.PI},getDistance:function(){var t=c.read(arguments),e=t.x-this.x,i=t.y-this.y,n=e*e+i*i;return r.read(arguments)?n:Math.sqrt(n)},normalize:function(t){t===e&&(t=1);var i=this.getLength(),n=0!==i?t/i:0,r=new c(this.x*n,this.y*n);return n>=0&&(r._angle=this._angle),r},rotate:function(t,e){if(0===t)return this.clone();t=t*Math.PI/180;var i=e?this.subtract(e):this,n=Math.sin(t),r=Math.cos(t);return i=new c(i.x*r-i.y*n,i.x*n+i.y*r),e?i.add(e):i},transform:function(t){return t?t._transformPoint(this):this},add:function(){var t=c.read(arguments);return new c(this.x+t.x,this.y+t.y)},subtract:function(){var t=c.read(arguments);return new c(this.x-t.x,this.y-t.y)},multiply:function(){var t=c.read(arguments);return new c(this.x*t.x,this.y*t.y)},divide:function(){var t=c.read(arguments);return new c(this.x/t.x,this.y/t.y)},modulo:function(){var t=c.read(arguments);return new c(this.x%t.x,this.y%t.y)},negate:function(){return new c(-this.x,-this.y)},isInside:function(){return g.read(arguments).contains(this)},isClose:function(){var t=c.read(arguments),e=r.read(arguments);return this.getDistance(t)<=e},isCollinear:function(){var t=c.read(arguments);return c.isCollinear(this.x,this.y,t.x,t.y)},isColinear:"#isCollinear",isOrthogonal:function(){var t=c.read(arguments);return c.isOrthogonal(this.x,this.y,t.x,t.y)},isZero:function(){var t=u.isZero;return t(this.x)&&t(this.y)},isNaN:function(){return isNaN(this.x)||isNaN(this.y)},isInQuadrant:function(t){return this.x*(t>1&&t<4?-1:1)>=0&&this.y*(t>2?-1:1)>=0},dot:function(){var t=c.read(arguments);return this.x*t.x+this.y*t.y},cross:function(){var t=c.read(arguments);return this.x*t.y-this.y*t.x},project:function(){var t=c.read(arguments),e=t.isZero()?0:this.dot(t)/t.dot(t);return new c(t.x*e,t.y*e)},statics:{min:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.min(t.x,e.x),Math.min(t.y,e.y))},max:function(){var t=c.read(arguments),e=c.read(arguments);return new c(Math.max(t.x,e.x),Math.max(t.y,e.y))},random:function(){return new c(Math.random(),Math.random())},isCollinear:function(t,e,i,n){return Math.abs(t*n-e*i)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))},isOrthogonal:function(t,e,i,n){return Math.abs(t*i+e*n)<=1e-8*Math.sqrt((t*t+e*e)*(i*i+n*n))}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new c(e(this.x),e(this.y))}},{})),f=c.extend({initialize:function(t,e,i,n){this._x=t,this._y=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._x=t,this._y=e,i||this._owner[this._setter](this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner[this._setter](this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner[this._setter](this)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){return"setPosition"===this._setter?4:0}}),d=r.extend({_class:"Size",_readIndex:!0,initialize:function(t,e){var i=typeof t,n=this.__read,r=0;if("number"===i){var s="number"==typeof e;this._set(t,s?e:t),n&&(r=s?2:1)}else if("undefined"===i||null===t)this._set(0,0),n&&(r=null===t?1:0);else{var a="string"===i?t.split(/[\s,]+/)||[]:t;r=1,Array.isArray(a)?this._set(+a[0],+(a.length>1?a[1]:a[0])):"width"in a?this._set(a.width||0,a.height||0):"x"in a?this._set(a.x||0,a.y||0):(this._set(0,0),r=0)}return n&&(this.__read=r),this},set:"#initialize",_set:function(t,e){return this.width=t,this.height=e,this},equals:function(t){return t===this||t&&(this.width===t.width&&this.height===t.height||Array.isArray(t)&&this.width===t[0]&&this.height===t[1])||!1},clone:function(){return new d(this.width,this.height)},toString:function(){var t=h.instance;return"{ width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.width),e.number(this.height)]},add:function(){var t=d.read(arguments);return new d(this.width+t.width,this.height+t.height)},subtract:function(){var t=d.read(arguments);return new d(this.width-t.width,this.height-t.height)},multiply:function(){var t=d.read(arguments);return new d(this.width*t.width,this.height*t.height)},divide:function(){var t=d.read(arguments);return new d(this.width/t.width,this.height/t.height)},modulo:function(){var t=d.read(arguments);return new d(this.width%t.width,this.height%t.height)},negate:function(){return new d(-this.width,-this.height)},isZero:function(){var t=u.isZero;return t(this.width)&&t(this.height)},isNaN:function(){return isNaN(this.width)||isNaN(this.height)},statics:{min:function(t,e){return new d(Math.min(t.width,e.width),Math.min(t.height,e.height))},max:function(t,e){return new d(Math.max(t.width,e.width),Math.max(t.height,e.height))},random:function(){return new d(Math.random(),Math.random())}}},r.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new d(e(this.width),e(this.height))}},{})),_=d.extend({initialize:function(t,e,i,n){this._width=t,this._height=e,this._owner=i,this._setter=n},_set:function(t,e,i){return this._width=t,this._height=e,i||this._owner[this._setter](this),this},getWidth:function(){return this._width},setWidth:function(t){this._width=t,this._owner[this._setter](this)},getHeight:function(){return this._height},setHeight:function(t){this._height=t,this._owner[this._setter](this)}}),g=r.extend({_class:"Rectangle",_readIndex:!0,beans:!0,initialize:function(t,i,n,s){var a,o=typeof t;if("number"===o?(this._set(t,i,n,s),a=4):"undefined"===o||null===t?(this._set(0,0,0,0),a=null===t?1:0):1===arguments.length&&(Array.isArray(t)?(this._set.apply(this,t),a=1):t.x!==e||t.width!==e?(this._set(t.x||0,t.y||0,t.width||0,t.height||0),a=1):t.from===e&&t.to===e&&(this._set(0,0,0,0),r.filter(this,t),a=1)),a===e){var h,u,l=c.readNamed(arguments,"from"),f=r.peek(arguments),_=l.x,g=l.y;if(f&&f.x!==e||r.hasNamed(arguments,"to")){var v=c.readNamed(arguments,"to");h=v.x-_,u=v.y-g,h<0&&(_=v.x,h=-h),u<0&&(g=v.y,u=-u)}else{var p=d.read(arguments);h=p.width,u=p.height}this._set(_,g,h,u),a=arguments.__index;var m=arguments.__filtered;m&&(this.__filtered=m)}return this.__read&&(this.__read=a),this},set:"#initialize",_set:function(t,e,i,n){return this.x=t,this.y=e,this.width=i,this.height=n,this},clone:function(){return new g(this.x,this.y,this.width,this.height)},equals:function(t){var e=r.isPlainValue(t)?g.read(arguments):t;return e===this||e&&this.x===e.x&&this.y===e.y&&this.width===e.width&&this.height===e.height||!1},toString:function(){var t=h.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+", width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y),e.number(this.width),e.number(this.height)]},getPoint:function(t){return new(t?c:f)(this.x,this.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.x=t.x,this.y=t.y},getSize:function(t){return new(t?d:_)(this.width,this.height,this,"setSize")},_fw:1,_fh:1,setSize:function(){var t=d.read(arguments),e=this._sx,i=this._sy,n=t.width,r=t.height;e&&(this.x+=(this.width-n)*e),i&&(this.y+=(this.height-r)*i),this.width=n,this.height=r,this._fw=this._fh=1},getLeft:function(){return this.x},setLeft:function(t){if(!this._fw){var e=t-this.x;this.width-=.5===this._sx?2*e:e}this.x=t,this._sx=this._fw=0},getTop:function(){return this.y},setTop:function(t){if(!this._fh){var e=t-this.y;this.height-=.5===this._sy?2*e:e}this.y=t,this._sy=this._fh=0},getRight:function(){return this.x+this.width},setRight:function(t){if(!this._fw){var e=t-this.x;this.width=.5===this._sx?2*e:e}this.x=t-this.width,this._sx=1,this._fw=0},getBottom:function(){return this.y+this.height},setBottom:function(t){if(!this._fh){var e=t-this.y;this.height=.5===this._sy?2*e:e}this.y=t-this.height,this._sy=1,this._fh=0},getCenterX:function(){return this.x+this.width/2},setCenterX:function(t){this._fw||.5===this._sx?this.x=t-this.width/2:(this._sx&&(this.x+=2*(t-this.x)*this._sx),this.width=2*(t-this.x)),this._sx=.5,this._fw=0},getCenterY:function(){return this.y+this.height/2},setCenterY:function(t){this._fh||.5===this._sy?this.y=t-this.height/2:(this._sy&&(this.y+=2*(t-this.y)*this._sy),this.height=2*(t-this.y)),this._sy=.5,this._fh=0},getCenter:function(t){return new(t?c:f)(this.getCenterX(),this.getCenterY(),this,"setCenter")},setCenter:function(){var t=c.read(arguments);return this.setCenterX(t.x),this.setCenterY(t.y),this},getArea:function(){return this.width*this.height},isEmpty:function(){return 0===this.width||0===this.height},contains:function(t){return t&&t.width!==e||4===(Array.isArray(t)?t:arguments).length?this._containsRectangle(g.read(arguments)):this._containsPoint(c.read(arguments))},_containsPoint:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e<=this.x+this.width&&i<=this.y+this.height},_containsRectangle:function(t){var e=t.x,i=t.y;return e>=this.x&&i>=this.y&&e+t.width<=this.x+this.width&&i+t.height<=this.y+this.height},intersects:function(){var t=g.read(arguments),e=r.read(arguments)||0;return t.x+t.width>this.x-e&&t.y+t.height>this.y-e&&t.x<this.x+this.width+e&&t.y<this.y+this.height+e},intersect:function(){var t=g.read(arguments),e=Math.max(this.x,t.x),i=Math.max(this.y,t.y),n=Math.min(this.x+this.width,t.x+t.width),r=Math.min(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},unite:function(){var t=g.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x+t.width),r=Math.max(this.y+this.height,t.y+t.height);return new g(e,i,n-e,r-i)},include:function(){var t=c.read(arguments),e=Math.min(this.x,t.x),i=Math.min(this.y,t.y),n=Math.max(this.x+this.width,t.x),r=Math.max(this.y+this.height,t.y);return new g(e,i,n-e,r-i)},expand:function(){var t=d.read(arguments),e=t.width,i=t.height;return new g(this.x-e/2,this.y-i/2,this.width+e,this.height+i)},scale:function(t,i){return this.expand(this.width*t-this.width,this.height*(i===e?t:i)-this.height)}},r.each([["Top","Left"],["Top","Right"],["Bottom","Left"],["Bottom","Right"],["Left","Center"],["Top","Center"],["Right","Center"],["Bottom","Center"]],function(t,e){var i=t.join(""),n=/^[RL]/.test(i);e>=4&&(t[1]+=n?"Y":"X");var r=t[n?0:1],s=t[n?1:0],a="get"+r,o="get"+s,h="set"+r,u="set"+s,l="set"+i;this["get"+i]=function(t){return new(t?c:f)(this[a](),this[o](),this,l)},this[l]=function(){var t=c.read(arguments);this[h](t.x),this[u](t.y)}},{beans:!0})),v=g.extend({initialize:function(t,e,i,n,r,s){this._set(t,e,i,n,!0),this._owner=r,this._setter=s},_set:function(t,e,i,n,r){return this._x=t,this._y=e,this._width=i,this._height=n,r||this._owner[this._setter](this),this}},new function(){var t=g.prototype;return r.each(["x","y","width","height"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._dontNotify||this._owner[this._setter](this)}},r.each(["Point","Size","Center","Left","Top","Right","Bottom","CenterX","CenterY","TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],function(e){var i="set"+e;this[i]=function(){this._dontNotify=!0,t[i].apply(this,arguments),this._dontNotify=!1,this._owner[this._setter](this)}},{isSelected:function(){return!!(2&this._owner._selection)},setSelected:function(t){var e=this._owner;e._changeSelection&&e._changeSelection(2,t)}}))}),p=r.extend({_class:"Matrix",initialize:function t(e,i){var n=arguments.length,r=!0;if(n>=6?this._set.apply(this,arguments):1===n||2===n?e instanceof t?this._set(e._a,e._b,e._c,e._d,e._tx,e._ty,i):Array.isArray(e)?this._set.apply(this,i?e.concat([i]):e):r=!1:n?r=!1:this.reset(),!r)throw new Error("Unsupported matrix parameters");return this},set:"#initialize",_set:function(t,e,i,n,r,s,a){return this._a=t,this._b=e,this._c=i,this._d=n,this._tx=r,this._ty=s,a||this._changed(),this},_serialize:function(t,e){return r.serialize(this.getValues(),t,!0,e)},_changed:function(){var t=this._owner;t&&(t._applyMatrix?t.transform(null,!0):t._changed(9))},clone:function(){return new p(this._a,this._b,this._c,this._d,this._tx,this._ty)},equals:function(t){return t===this||t&&this._a===t._a&&this._b===t._b&&this._c===t._c&&this._d===t._d&&this._tx===t._tx&&this._ty===t._ty},toString:function(){var t=h.instance;return"[["+[t.number(this._a),t.number(this._c),t.number(this._tx)].join(", ")+"], ["+[t.number(this._b),t.number(this._d),t.number(this._ty)].join(", ")+"]]"},reset:function(t){return this._a=this._d=1,this._b=this._c=this._tx=this._ty=0,t||this._changed(),this},apply:function(t,e){var i=this._owner;return!!i&&(i.transform(null,!0,r.pick(t,!0),e),this.isIdentity())},translate:function(){var t=c.read(arguments),e=t.x,i=t.y;return this._tx+=e*this._a+i*this._c,this._ty+=e*this._b+i*this._d,this._changed(),this},scale:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});return e&&this.translate(e),this._a*=t.x,this._b*=t.x,this._c*=t.y,this._d*=t.y,e&&this.translate(e.negate()),this._changed(),this},rotate:function(t){t*=Math.PI/180;var e=c.read(arguments,1),i=e.x,n=e.y,r=Math.cos(t),s=Math.sin(t),a=i-i*r+n*s,o=n-i*s-n*r,h=this._a,u=this._b,l=this._c,f=this._d;return this._a=r*h+s*l,this._b=r*u+s*f,this._c=-s*h+r*l,this._d=-s*u+r*f,this._tx+=a*h+o*l,this._ty+=a*u+o*f,this._changed(),this},shear:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0});e&&this.translate(e);var i=this._a,n=this._b;return this._a+=t.y*this._c,this._b+=t.y*this._d,this._c+=t.x*i,this._d+=t.x*n,e&&this.translate(e.negate()),this._changed(),this},skew:function(){var t=c.read(arguments),e=c.read(arguments,0,{readNull:!0}),i=Math.PI/180,n=new c(Math.tan(t.x*i),Math.tan(t.y*i));return this.shear(n,e)},append:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=t._a,o=t._c,h=t._b,u=t._d,l=t._tx,c=t._ty;this._a=a*i+h*r,this._c=o*i+u*r,this._b=a*n+h*s,this._d=o*n+u*s,this._tx+=l*i+c*r,this._ty+=l*n+c*s,e||this._changed()}return this},prepend:function(t,e){if(t){var i=this._a,n=this._b,r=this._c,s=this._d,a=this._tx,o=this._ty,h=t._a,u=t._c,l=t._b,c=t._d,f=t._tx,d=t._ty;this._a=h*i+u*n,this._c=h*r+u*s,this._b=l*i+c*n,this._d=l*r+c*s,this._tx=h*a+u*o+f,this._ty=l*a+c*o+d,e||this._changed()}return this},appended:function(t){return this.clone().append(t)},prepended:function(t){return this.clone().prepend(t)},invert:function(){var t=this._a,e=this._b,i=this._c,n=this._d,r=this._tx,s=this._ty,a=t*n-e*i,o=null;return a&&!isNaN(a)&&isFinite(r)&&isFinite(s)&&(this._a=n/a,this._b=-e/a,this._c=-i/a,this._d=t/a,this._tx=(i*s-n*r)/a,this._ty=(e*r-t*s)/a,o=this),o},inverted:function(){return this.clone().invert()},concatenate:"#append",preConcatenate:"#prepend",chain:"#appended",_shiftless:function(){return new p(this._a,this._b,this._c,this._d,0,0)},_orNullIfIdentity:function(){return this.isIdentity()?null:this},isIdentity:function(){return 1===this._a&&0===this._b&&0===this._c&&1===this._d&&0===this._tx&&0===this._ty},isInvertible:function(){var t=this._a*this._d-this._c*this._b;return t&&!isNaN(t)&&isFinite(this._tx)&&isFinite(this._ty)},isSingular:function(){return!this.isInvertible()},transform:function(t,e,i){return arguments.length<3?this._transformPoint(c.read(arguments)):this._transformCoordinates(t,e,i)},_transformPoint:function(t,e,i){var n=t.x,r=t.y;return e||(e=new c),e._set(n*this._a+r*this._c+this._tx,n*this._b+r*this._d+this._ty,i)},_transformCoordinates:function(t,e,i){for(var n=0,r=2*i;n<r;n+=2){var s=t[n],a=t[n+1];e[n]=s*this._a+a*this._c+this._tx,e[n+1]=s*this._b+a*this._d+this._ty}return e},_transformCorners:function(t){var e=t.x,i=t.y,n=e+t.width,r=i+t.height,s=[e,i,n,i,n,r,e,r];return this._transformCoordinates(s,s,4)},_transformBounds:function(t,e,i){for(var n=this._transformCorners(t),r=n.slice(0,2),s=r.slice(),a=2;a<8;a++){var o=n[a],h=1&a;o<r[h]?r[h]=o:o>s[h]&&(s[h]=o)}return e||(e=new g),e._set(r[0],r[1],s[0]-r[0],s[1]-r[1],i)},inverseTransform:function(){return this._inverseTransform(c.read(arguments))},_inverseTransform:function(t,e,i){var n=this._a,r=this._b,s=this._c,a=this._d,o=this._tx,h=this._ty,u=n*a-r*s,l=null;if(u&&!isNaN(u)&&isFinite(o)&&isFinite(h)){var f=t.x-this._tx,d=t.y-this._ty;e||(e=new c),l=e._set((f*a-d*s)/u,(d*n-f*r)/u,i)}return l},decompose:function(){var t,e,i,n=this._a,r=this._b,s=this._c,a=this._d,o=n*a-r*s,h=Math.sqrt,u=Math.atan2,l=180/Math.PI;if(0!==n||0!==r){var f=h(n*n+r*r);t=Math.acos(n/f)*(r>0?1:-1),e=[f,o/f],i=[u(n*s+r*a,f*f),0]}else if(0!==s||0!==a){var d=h(s*s+a*a);t=Math.asin(s/d)*(a>0?1:-1),e=[o/d,d],i=[0,u(n*s+r*a,d*d)]}else t=0,i=e=[0,0];return{translation:this.getTranslation(),rotation:t*l,scaling:new c(e),skewing:new c(i[0]*l,i[1]*l)}},getValues:function(){return[this._a,this._b,this._c,this._d,this._tx,this._ty]},getTranslation:function(){return new c(this._tx,this._ty)},getScaling:function(){return(this.decompose()||{}).scaling},getRotation:function(){return(this.decompose()||{}).rotation},applyToContext:function(t){this.isIdentity()||t.transform(this._a,this._b,this._c,this._d,this._tx,this._ty)}},r.each(["a","b","c","d","tx","ty"],function(t){var e=r.capitalize(t),i="_"+t;this["get"+e]=function(){return this[i]},this["set"+e]=function(t){this[i]=t,this._changed()}},{})),m=r.extend({_class:"Line",initialize:function(t,e,i,n,r){var s=!1;arguments.length>=4?(this._px=t,this._py=e,this._vx=i,this._vy=n,s=r):(this._px=t.x,this._py=t.y,this._vx=e.x,this._vy=e.y,s=i),s||(this._vx-=this._px,this._vy-=this._py)},getPoint:function(){return new c(this._px,this._py)},getVector:function(){return new c(this._vx,this._vy)},getLength:function(){return this.getVector().getLength()},intersect:function(t,e){return m.intersect(this._px,this._py,this._vx,this._vy,t._px,t._py,t._vx,t._vy,!0,e)},getSide:function(t,e){return m.getSide(this._px,this._py,this._vx,this._vy,t.x,t.y,!0,e)},getDistance:function(t){return Math.abs(this.getSignedDistance(t))},getSignedDistance:function(t){return m.getSignedDistance(this._px,this._py,this._vx,this._vy,t.x,t.y,!0)},isCollinear:function(t){return c.isCollinear(this._vx,this._vy,t._vx,t._vy)},isOrthogonal:function(t){return c.isOrthogonal(this._vx,this._vy,t._vx,t._vy)},statics:{intersect:function(t,e,i,n,r,s,a,o,h,l){h||(i-=t,n-=e,a-=r,o-=s);var f=i*o-n*a;if(!u.isZero(f)){var d=t-r,_=e-s,g=(a*_-o*d)/f,v=(i*_-n*d)/f;if(l||-1e-12<g&&g<1+1e-12&&-1e-12<v&&v<1+1e-12)return l||(g=g<=0?0:g>=1?1:g),new c(t+g*i,e+g*n)}},getSide:function(t,e,i,n,r,s,a,o){a||(i-=t,n-=e);var h=r-t,l=h*n-(s-e)*i;return!o&&u.isZero(l)&&(l=(h*i+h*i)/(i*i+n*n))>=0&&l<=1&&(l=0),l<0?-1:l>0?1:0},getSignedDistance:function(t,e,i,n,r,s,a){return a||(i-=t,n-=e),0===i?n>0?r-t:t-r:0===n?i<0?s-e:e-s:((r-t)*n-(s-e)*i)/Math.sqrt(i*i+n*n)},getDistance:function(t,e,i,n,r,s,a){return Math.abs(m.getSignedDistance(t,e,i,n,r,s,a))}}}),y=o.extend({_class:"Project",_list:"projects",_reference:"project",_compactSerialize:!0,initialize:function(t){o.call(this,!0),this._children=[],this._namedChildren={},this._activeLayer=null,this._currentStyle=new V(null,null,this),this._view=U.create(this,t||Q.getCanvas(1,1)),this._selectionItems={},this._selectionCount=0,this._updateVersion=0},_serialize:function(t,e){return r.serialize(this._children,t,!0,e)},_changed:function(t,e){if(1&t){var i=this._view;i&&(i._needsUpdate=!0,!i._requested&&i._autoUpdate&&i.requestUpdate())}var n=this._changes;if(n&&e){var r=this._changesById,s=e._id,a=r[s];a?a.flags|=t:n.push(r[s]={item:e,flags:t})}},clear:function(){for(var t=this._children,e=t.length-1;e>=0;e--)t[e].remove()},isEmpty:function(){return!this._children.length},remove:function t(){return!!t.base.call(this)&&(this._view&&this._view.remove(),!0)},getView:function(){return this._view},getCurrentStyle:function(){return this._currentStyle},setCurrentStyle:function(t){this._currentStyle.set(t)},getIndex:function(){return this._index},getOptions:function(){return this._scope.settings},getLayers:function(){return this._children},getActiveLayer:function(){return this._activeLayer||new b({project:this,insert:!0})},getSymbolDefinitions:function(){var t=[],e={};return this.getItems({class:P,match:function(i){var n=i._definition,r=n._id;return e[r]||(e[r]=!0,t.push(n)),!1}}),t},getSymbols:"getSymbolDefinitions",getSelectedItems:function(){var t=this._selectionItems,e=[];for(var i in t){var n=t[i],r=n._selection;1&r&&n.isInserted()?e.push(n):r||this._updateSelection(n)}return e},_updateSelection:function(t){var e=t._id,i=this._selectionItems;t._selection?i[e]!==t&&(this._selectionCount++,i[e]=t):i[e]===t&&(this._selectionCount--,delete i[e])},selectAll:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)t[e].setFullySelected(!0)},deselectAll:function(){var t=this._selectionItems;for(var e in t)t[e].setFullySelected(!1)},addLayer:function(t){return this.insertLayer(e,t)},insertLayer:function(t,e){if(e instanceof b){e._remove(!1,!0),r.splice(this._children,[e],t,0),e._setProject(this,!0);var i=e._name;i&&e.setName(i),this._changes&&e._changed(5),this._activeLayer||(this._activeLayer=e)}else e=null;return e},_insertItem:function(t,i,n){return i=this.insertLayer(t,i)||(this._activeLayer||this._insertItem(e,new b(w.NO_INSERT),!0)).insertChild(t,i),n&&i.activate&&i.activate(),i},getItems:function(t){return w._getItems(this,t)},getItem:function(t){return w._getItems(this,t,null,null,!0)[0]||null},importJSON:function(t){this.activate();var e=this._activeLayer;return r.importJSON(t,e&&e.isEmpty()&&e)},removeOn:function(t){var e=this._removeSets;if(e){"mouseup"===t&&(e.mousedrag=null);var i=e[t];if(i){for(var n in i){var r=i[n];for(var s in e){var a=e[s];a&&a!=i&&delete a[r._id]}r.remove()}e[t]=null}}},draw:function(t,e,i){this._updateVersion++,t.save(),e.applyToContext(t);for(var n=this._children,s=new r({offset:new c(0,0),pixelRatio:i,viewMatrix:e.isIdentity()?null:e,matrices:[new p],updateMatrix:!0}),a=0,o=n.length;a<o;a++)n[a].draw(t,s);if(t.restore(),this._selectionCount>0){t.save(),t.strokeWidth=1;var h=this._selectionItems,u=this._scope.settings.handleSize,l=this._updateVersion;for(var f in h)h[f]._drawSelection(t,e,u,h,l);t.restore()}}}),w=r.extend(s,{statics:{extend:function t(e){return e._serializeFields&&(e._serializeFields=r.set({},this.prototype._serializeFields,e._serializeFields)),t.base.apply(this,arguments)},NO_INSERT:{insert:!1}},_class:"Item",_name:null,_applyMatrix:!0,_canApplyMatrix:!0,_canScaleStroke:!1,_pivot:null,_visible:!0,_blendMode:"normal",_opacity:1,_locked:!1,_guide:!1,_clipMask:!1,_selection:0,_selectBounds:!0,_selectChildren:!1,_serializeFields:{name:null,applyMatrix:null,matrix:new p,pivot:null,visible:!0,blendMode:"normal",opacity:1,locked:!1,guide:!1,clipMask:!1,selected:!1,data:{}},_prioritize:["applyMatrix"]},new function(){var t=["onMouseDown","onMouseUp","onMouseDrag","onClick","onDoubleClick","onMouseMove","onMouseEnter","onMouseLeave"];return r.each(t,function(t){this._events[t]={install:function(t){this.getView()._countItemEvent(t,1)},uninstall:function(t){this.getView()._countItemEvent(t,-1)}}},{_events:{onFrame:{install:function(){this.getView()._animateItem(this,!0)},uninstall:function(){this.getView()._animateItem(this,!1)}},onLoad:{},onError:{}},statics:{_itemHandlers:t}})},{initialize:function(){},_initialize:function(t,i){var n=t&&r.isPlainObject(t),s=n&&!0===t.internal,a=this._matrix=new p,o=n&&t.project||paper.project,h=paper.settings;return this._id=s?null:l.get(),this._parent=this._index=null,this._applyMatrix=this._canApplyMatrix&&h.applyMatrix,i&&a.translate(i),a._owner=this,this._style=new V(o._currentStyle,this,o),s||n&&0==t.insert||!h.insertItems&&(!n||!0!==t.insert)?this._setProject(o):(n&&t.parent||o)._insertItem(e,this,!0),n&&t!==w.NO_INSERT&&this.set(t,{internal:!0,insert:!0,project:!0,parent:!0}),n},_serialize:function(t,e){function i(i){for(var a in i){var o=s[a];r.equals(o,"leading"===a?1.2*i.fontSize:i[a])||(n[a]=r.serialize(o,t,"data"!==a,e))}}var n={},s=this;return i(this._serializeFields),this instanceof x||i(this._style._defaults),[this._class,n]},_changed:function(t){var i=this._symbol,n=this._parent||i,r=this._project;8&t&&(this._bounds=this._position=this._decomposed=this._globalMatrix=e),n&&40&t&&w._clearBoundsCache(n),2&t&&w._clearBoundsCache(this),r&&r._changed(t,this),i&&i._changed(t)},getId:function(){return this._id},getName:function(){return this._name},setName:function(t){if(this._name&&this._removeNamed(),t===+t+"")throw new Error("Names consisting only of numbers are not supported.");var i=this._getOwner();if(t&&i){var n=i._children,r=i._namedChildren;(r[t]=r[t]||[]).push(this),t in n||(n[t]=this)}this._name=t||e,this._changed(128)},getStyle:function(){return this._style},setStyle:function(t){this.getStyle().set(t)}},r.each(["locked","visible","blendMode","opacity","guide"],function(t){var e=r.capitalize(t),i="_"+t,n={locked:128,visible:137};this["get"+e]=function(){return this[i]},this["set"+e]=function(e){e!=this[i]&&(this[i]=e,this._changed(n[t]||129))}},{}),{beans:!0,getSelection:function(){return this._selection},setSelection:function(t){if(t!==this._selection){this._selection=t;var e=this._project;e&&(e._updateSelection(this),this._changed(129))}},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){if(this._selectChildren)for(var t=this._children,e=0,i=t.length;e<i;e++)if(t[e].isSelected())return!0;return!!(1&this._selection)},setSelected:function(t){if(this._selectChildren)for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setSelected(t);this._changeSelection(1,t)},isFullySelected:function(){var t=this._children,e=!!(1&this._selection);if(t&&e){for(var i=0,n=t.length;i<n;i++)if(!t[i].isFullySelected())return!1;return!0}return e},setFullySelected:function(t){var e=this._children;if(e)for(var i=0,n=e.length;i<n;i++)e[i].setFullySelected(t);this._changeSelection(1,t)},isClipMask:function(){return this._clipMask},setClipMask:function(t){this._clipMask!=(t=!!t)&&(this._clipMask=t,t&&(this.setFillColor(null),this.setStrokeColor(null)),this._changed(129),this._parent&&this._parent._changed(1024))},getData:function(){return this._data||(this._data={}),this._data},setData:function(t){this._data=t},getPosition:function(t){var e=this._position,i=t?c:f;if(!e){var n=this._pivot;e=this._position=n?this._matrix._transformPoint(n):this.getBounds().getCenter(!0)}return new i(e.x,e.y,this,"setPosition")},setPosition:function(){this.translate(c.read(arguments).subtract(this.getPosition(!0)))},getPivot:function(){var t=this._pivot;return t?new f(t.x,t.y,this,"setPivot"):null},setPivot:function(){this._pivot=c.read(arguments,0,{clone:!0,readNull:!0}),this._position=e}},r.each({getStrokeBounds:{stroke:!0},getHandleBounds:{handle:!0},getInternalBounds:{internal:!0}},function(t,e){this[e]=function(e){return this.getBounds(e,t)}},{beans:!0,getBounds:function(t,e){var i=e||t instanceof p,n=r.set({},i?e:t,this._boundsOptions);n.stroke&&!this.getStrokeScaling()||(n.cacheItem=this);var s=this._getCachedBounds(i&&t,n).rect;return arguments.length?s:new v(s.x,s.y,s.width,s.height,this,"setBounds")},setBounds:function(){var t=g.read(arguments),e=this.getBounds(),i=this._matrix,n=new p,r=t.getCenter();n.translate(r),t.width==e.width&&t.height==e.height||(i.isInvertible()||(i.set(i._backup||(new p).translate(i.getTranslation())),e=this.getBounds()),n.scale(0!==e.width?t.width/e.width:0,0!==e.height?t.height/e.height:0)),r=e.getCenter(),n.translate(-r.x,-r.y),this.transform(n)},_getBounds:function(t,e){var i=this._children;return i&&i.length?(w._updateBoundsCache(this,e.cacheItem),w._getBounds(i,t,e)):new g},_getBoundsCacheKey:function(t,e){return[t.stroke?1:0,t.handle?1:0,e?1:0].join("")},_getCachedBounds:function(t,e,i){t=t&&t._orNullIfIdentity();var n=e.internal&&!i,r=e.cacheItem,s=n?null:this._matrix._orNullIfIdentity(),a=r&&(!t||t.equals(s))&&this._getBoundsCacheKey(e,n),o=this._bounds;if(w._updateBoundsCache(this._parent||this._symbol,r),a&&o&&a in o)return{rect:(f=o[a]).rect.clone(),nonscaling:f.nonscaling};var h=this._getBounds(t||s,e),u=h.rect||h,l=this._style,c=h.nonscaling||l.hasStroke()&&!l.getStrokeScaling();if(a){o||(this._bounds=o={});var f=o[a]={rect:u.clone(),nonscaling:c,internal:n}}return{rect:u,nonscaling:c}},_getStrokeMatrix:function(t,e){var i=this.getStrokeScaling()?null:e&&e.internal?this:this._parent||this._symbol&&this._symbol._item,n=i?i.getViewMatrix().invert():t;return n&&n._shiftless()},statics:{_updateBoundsCache:function(t,e){if(t&&e){var i=e._id,n=t._boundsCache=t._boundsCache||{ids:{},list:[]};n.ids[i]||(n.list.push(e),n.ids[i]=e)}},_clearBoundsCache:function(t){var i=t._boundsCache;if(i){t._bounds=t._position=t._boundsCache=e;for(var n=0,r=i.list,s=r.length;n<s;n++){var a=r[n];a!==t&&(a._bounds=a._position=e,a._boundsCache&&w._clearBoundsCache(a))}}},_getBounds:function(t,e,i){var n=1/0,r=-n,s=n,a=r,o=!1;i=i||{};for(var h=0,u=t.length;h<u;h++){var l=t[h];if(l._visible&&!l.isEmpty()){var c=l._getCachedBounds(e&&e.appended(l._matrix),i,!0),f=c.rect;n=Math.min(f.x,n),s=Math.min(f.y,s),r=Math.max(f.x+f.width,r),a=Math.max(f.y+f.height,a),c.nonscaling&&(o=!0)}}return{rect:isFinite(n)?new g(n,s,r-n,a-s):new g,nonscaling:o}}}}),{beans:!0,_decompose:function(){return this._applyMatrix?null:this._decomposed||(this._decomposed=this._matrix.decompose())},getRotation:function(){var t=this._decompose();return t?t.rotation:0},setRotation:function(t){var e=this.getRotation();if(null!=e&&null!=t){var i=this._decomposed;this.rotate(t-e),i&&(i.rotation=t,this._decomposed=i)}},getScaling:function(){var t=this._decompose(),e=t&&t.scaling;return new f(e?e.x:1,e?e.y:1,this,"setScaling")},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});if(t&&e&&!t.equals(e)){var i=this.getRotation(),n=this._decomposed,r=new p,s=this.getPosition(!0);r.translate(s),i&&r.rotate(i),r.scale(e.x/t.x,e.y/t.y),i&&r.rotate(-i),r.translate(s.negate()),this.transform(r),n&&(n.scaling=e,this._decomposed=n)}},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},getGlobalMatrix:function(t){var e=this._globalMatrix,i=this._project._updateVersion;if(e&&e._updateVersion!==i&&(e=null),!e){e=this._globalMatrix=this._matrix.clone();var n=this._parent;n&&e.prepend(n.getGlobalMatrix(!0)),e._updateVersion=i}return t?e:e.clone()},getViewMatrix:function(){return this.getGlobalMatrix().prepend(this.getView()._matrix)},getApplyMatrix:function(){return this._applyMatrix},setApplyMatrix:function(t){(this._applyMatrix=this._canApplyMatrix&&!!t)&&this.transform(null,!0)},getTransformContent:"#getApplyMatrix",setTransformContent:"#setApplyMatrix"},{getProject:function(){return this._project},_setProject:function(t,e){if(this._project!==t){this._project&&this._installEvents(!1),this._project=t;for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._setProject(t);e=!0}e&&this._installEvents(!0)},getView:function(){return this._project._view},_installEvents:function t(e){t.base.call(this,e);for(var i=this._children,n=0,r=i&&i.length;n<r;n++)i[n]._installEvents(e)},getLayer:function(){for(var t=this;t=t._parent;)if(t instanceof b)return t;return null},getParent:function(){return this._parent},setParent:function(t){return t.addChild(this)},_getOwner:"#getParent",getChildren:function(){return this._children},setChildren:function(t){this.removeChildren(),this.addChildren(t)},getFirstChild:function(){return this._children&&this._children[0]||null},getLastChild:function(){return this._children&&this._children[this._children.length-1]||null},getNextSibling:function(){var t=this._getOwner();return t&&t._children[this._index+1]||null},getPreviousSibling:function(){var t=this._getOwner();return t&&t._children[this._index-1]||null},getIndex:function(){return this._index},equals:function(t){return t===this||t&&this._class===t._class&&this._style.equals(t._style)&&this._matrix.equals(t._matrix)&&this._locked===t._locked&&this._visible===t._visible&&this._blendMode===t._blendMode&&this._opacity===t._opacity&&this._clipMask===t._clipMask&&this._guide===t._guide&&this._equals(t)||!1},_equals:function(t){return r.equals(this._children,t._children)},clone:function(t){var i=new this.constructor(w.NO_INSERT),n=this._children,s=r.pick(t?t.insert:e,t===e||!0===t),a=r.pick(t?t.deep:e,!0);n&&i.copyAttributes(this),n&&!a||i.copyContent(this),n||i.copyAttributes(this),s&&i.insertAbove(this);var o=this._name,h=this._parent;if(o&&h){for(var n=h._children,u=o,l=1;n[o];)o=u+" "+l++;o!==u&&i.setName(o)}return i},copyContent:function(t){for(var e=t._children,i=0,n=e&&e.length;i<n;i++)this.addChild(e[i].clone(!1),!0)},copyAttributes:function(t,e){this.setStyle(t._style);for(var i=["_locked","_visible","_blendMode","_opacity","_clipMask","_guide"],n=0,s=i.length;n<s;n++){var a=i[n];t.hasOwnProperty(a)&&(this[a]=t[a])}e||this._matrix.set(t._matrix,!0),this.setApplyMatrix(t._applyMatrix),this.setPivot(t._pivot),this.setSelection(t._selection);var o=t._data,h=t._name;this._data=o?r.clone(o):null,h&&this.setName(h)},rasterize:function(t,i){var n=this.getStrokeBounds(),s=(t||this.getView().getResolution())/72,a=n.getTopLeft().floor(),o=n.getBottomRight().ceil(),h=new d(o.subtract(a)),u=new S(w.NO_INSERT);if(!h.isZero()){var l=Q.getCanvas(h.multiply(s)),c=l.getContext("2d"),f=(new p).scale(s).translate(a.negate());c.save(),f.applyToContext(c),this.draw(c,new r({matrices:[f]})),c.restore(),u.setCanvas(l)}return u.transform((new p).translate(a.add(h.divide(2))).scale(1/s)),(i===e||i)&&u.insertAbove(this),u},contains:function(){return!!this._contains(this._matrix._inverseTransform(c.read(arguments)))},_contains:function(t){var e=this._children;if(e){for(var i=e.length-1;i>=0;i--)if(e[i].contains(t))return!0;return!1}return t.isInside(this.getInternalBounds())},isInside:function(){return g.read(arguments).contains(this.getBounds())},_asPathItem:function(){return new L.Rectangle({rectangle:this.getInternalBounds(),matrix:this._matrix,insert:!1})},intersects:function(t,e){return t instanceof w&&this._asPathItem().getIntersections(t._asPathItem(),null,e,!0).length>0}},new function(){function t(){return this._hitTest(c.read(arguments),M.getOptions(arguments))}function e(){var t=c.read(arguments),e=M.getOptions(arguments),i=[];return this._hitTest(t,r.set({all:i},e)),i}function i(t,e,i,n){var r=this._children;if(r)for(var s=r.length-1;s>=0;s--){var a=r[s],o=a!==n&&a._hitTest(t,e,i);if(o&&!e.all)return o}return null}return y.inject({hitTest:t,hitTestAll:e,_hitTest:i}),{hitTest:t,hitTestAll:e,_hitTestChildren:i}},{_hitTest:function(t,e,i){function n(t){return t&&_&&!_(t)&&(t=null),t&&e.all&&e.all.push(t),t}function s(e,i){var n=i?l["get"+i]():g.getPosition();if(t.subtract(n).divide(u).length<=1)return new M(e,g,{name:i?r.hyphenate(i):e,point:n})}if(this._locked||!this._visible||this._guide&&!e.guides||this.isEmpty())return null;var a=this._matrix,o=i?i.appended(a):this.getGlobalMatrix().prepend(this.getView()._matrix),h=Math.max(e.tolerance,1e-12),u=e._tolerancePadding=new d(L._getStrokePadding(h,a._shiftless().invert()));if(!(t=a._inverseTransform(t))||!this._children&&!this.getBounds({internal:!0,stroke:!0,handle:!0}).expand(u.multiply(2))._containsPoint(t))return null;var l,c,f=!(e.guides&&!this._guide||e.selected&&!this.isSelected()||e.type&&e.type!==r.hyphenate(this._class)||e.class&&!(this instanceof e.class)),_=e.match,g=this,v=e.position,p=e.center,m=e.bounds;if(f&&this._parent&&(v||p||m)){if((p||m)&&(l=this.getInternalBounds()),!(c=v&&s("position")||p&&s("center","Center"))&&m)for(var y=["TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],w=0;w<8&&!c;w++)c=s("bounds",y[w]);c=n(c)}return c||(c=this._hitTestChildren(t,e,o)||f&&n(this._hitTestSelf(t,e,o,this.getStrokeScaling()?null:o._shiftless().invert()))||null),c&&c.point&&(c.point=a.transform(c.point)),c},_hitTestSelf:function(t,e){if(e.fill&&this.hasFill()&&this._contains(t))return new M("fill",this)},matches:function(t,e){function i(t,e){for(var n in t)if(t.hasOwnProperty(n)){var s=t[n],a=e[n];if(r.isPlainObject(s)&&r.isPlainObject(a)){if(!i(s,a))return!1}else if(!r.equals(s,a))return!1}return!0}var n=typeof t;if("object"===n){for(var s in t)if(t.hasOwnProperty(s)&&!this.matches(s,t[s]))return!1;return!0}if("function"===n)return t(this);if("match"===t)return e(this);var a=/^(empty|editable)$/.test(t)?this["is"+r.capitalize(t)]():"type"===t?r.hyphenate(this._class):this[t];if("class"===t){if("function"==typeof e)return this instanceof e;a=this._class}if("function"==typeof e)return!!e(a);if(e){if(e.test)return e.test(a);if(r.isPlainObject(e))return i(e,a)}return r.equals(a,e)},getItems:function(t){return w._getItems(this,t,this._matrix)},getItem:function(t){return w._getItems(this,t,this._matrix,null,!0)[0]||null},statics:{_getItems:function t(e,i,n,s,a){if(!s){var o="object"==typeof i&&i,h=o&&o.overlapping,u=o&&o.inside,l=(w=h||u)&&g.read([w]);s={items:[],recursive:o&&!1!==o.recursive,inside:!!u,overlapping:!!h,rect:l,path:h&&new L.Rectangle({rectangle:l,insert:!1})},o&&(i=r.filter({},i,{recursive:!0,inside:!0,overlapping:!0}))}var c=e._children,f=s.items;n=(l=s.rect)&&(n||new p);for(var d=0,_=c&&c.length;d<_;d++){var v=c[d],m=n&&n.appended(v._matrix),y=!0;if(l){var w=v.getBounds(m);if(!l.intersects(w))continue;l.contains(w)||s.overlapping&&(w.contains(l)||s.path.intersects(v,m))||(y=!1)}if(y&&v.matches(i)&&(f.push(v),a))break;if(!1!==s.recursive&&t(v,i,m,s,a),a&&f.length>0)break}return f}}},{importJSON:function(t){var e=r.importJSON(t,this);return e!==this?this.addChild(e):e},addChild:function(t){return this.insertChild(e,t)},insertChild:function(t,e){var i=e?this.insertChildren(t,[e]):null;return i&&i[0]},addChildren:function(t){return this.insertChildren(this._children.length,t)},insertChildren:function(t,e){var i=this._children;if(i&&e&&e.length>0){for(var n={},s=(e=r.slice(e)).length-1;s>=0;s--){var a=(l=e[s])&&l._id;!l||n[a]?e.splice(s,1):(l._remove(!1,!0),n[a]=!0)}r.splice(i,e,t,0);for(var o=this._project,h=o._changes,s=0,u=e.length;s<u;s++){var l=e[s],c=l._name;l._parent=this,l._setProject(o,!0),c&&l.setName(c),h&&l._changed(5)}this._changed(11)}else e=null;return e},_insertItem:"#insertChild",_insertAt:function(t,e){var i=t&&t._getOwner(),n=t!==this&&i?this:null;return n&&(n._remove(!1,!0),i._insertItem(t._index+e,n)),n},insertAbove:function(t){return this._insertAt(t,1)},insertBelow:function(t){return this._insertAt(t,0)},sendToBack:function(){var t=this._getOwner();return t?t._insertItem(0,this):null},bringToFront:function(){var t=this._getOwner();return t?t._insertItem(e,this):null},appendTop:"#addChild",appendBottom:function(t){return this.insertChild(0,t)},moveAbove:"#insertAbove",moveBelow:"#insertBelow",addTo:function(t){return t._insertItem(e,this)},copyTo:function(t){return this.clone(!1).addTo(t)},reduce:function(t){var e=this._children;if(e&&1===e.length){var i=e[0].reduce(t);return this._parent?(i.insertAbove(this),this.remove()):i.remove(),i}return this},_removeNamed:function(){var t=this._getOwner();if(t){var e=t._children,i=t._namedChildren,n=this._name,r=i[n],s=r?r.indexOf(this):-1;-1!==s&&(e[n]==this&&delete e[n],r.splice(s,1),r.length?e[n]=r[0]:delete i[n])}},_remove:function(t,e){var i=this._getOwner(),n=this._project,s=this._index;return!!i&&(this._name&&this._removeNamed(),null!=s&&(n._activeLayer===this&&(n._activeLayer=this.getNextSibling()||this.getPreviousSibling()),r.splice(i._children,null,s,1)),this._installEvents(!1),t&&n._changes&&this._changed(5),e&&i._changed(11,this),this._parent=null,!0)},remove:function(){return this._remove(!0,!0)},replaceWith:function(t){var e=t&&t.insertBelow(this);return e&&this.remove(),e},removeChildren:function(t,e){if(!this._children)return null;t=t||0,e=r.pick(e,this._children.length);for(var i=r.splice(this._children,null,t,e-t),n=i.length-1;n>=0;n--)i[n]._remove(!0,!1);return i.length>0&&this._changed(11),i},clear:"#removeChildren",reverseChildren:function(){if(this._children){this._children.reverse();for(var t=0,e=this._children.length;t<e;t++)this._children[t]._index=t;this._changed(11)}},isEmpty:function(){var t=this._children;return!t||!t.length},isEditable:function(){for(var t=this;t;){if(!t._visible||t._locked)return!1;t=t._parent}return!0},hasFill:function(){return this.getStyle().hasFill()},hasStroke:function(){return this.getStyle().hasStroke()},hasShadow:function(){return this.getStyle().hasShadow()},_getOrder:function(t){function e(t){var e=[];do{e.unshift(t)}while(t=t._parent);return e}for(var i=e(this),n=e(t),r=0,s=Math.min(i.length,n.length);r<s;r++)if(i[r]!=n[r])return i[r]._index<n[r]._index?1:-1;return 0},hasChildren:function(){return this._children&&this._children.length>0},isInserted:function(){return!!this._parent&&this._parent.isInserted()},isAbove:function(t){return-1===this._getOrder(t)},isBelow:function(t){return 1===this._getOrder(t)},isParent:function(t){return this._parent===t},isChild:function(t){return t&&t._parent===this},isDescendant:function(t){for(var e=this;e=e._parent;)if(e===t)return!0;return!1},isAncestor:function(t){return!!t&&t.isDescendant(this)},isSibling:function(t){return this._parent===t._parent},isGroupedWith:function(t){for(var e=this._parent;e;){if(e._parent&&/^(Group|Layer|CompoundPath)$/.test(e._class)&&t.isDescendant(e))return!0;e=e._parent}return!1}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getPosition(!0)))}},{translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},transform:function(t,e,i,n){var r=this._matrix,s=t&&!t.isIdentity(),a=(e||this._applyMatrix)&&(!r.isIdentity()||s||e&&i&&this._children);if(!s&&!a)return this;if(s){!t.isInvertible()&&r.isInvertible()&&(r._backup=r.getValues()),r.prepend(t,!0);var o=this._style,h=o.getFillColor(!0),u=o.getStrokeColor(!0);h&&h.transform(t),u&&u.transform(t)}if(a&&(a=this._transformContent(r,i,n))){var l=this._pivot;l&&r._transformPoint(l,l,!0),r.reset(!0),n&&this._canApplyMatrix&&(this._applyMatrix=!0)}var c=this._bounds,f=this._position;(s||a)&&this._changed(9);var d=s&&c&&t.decompose();if(d&&d.skewing.isZero()&&d.rotation%90==0){for(var _ in c){var g=c[_];if(g.nonscaling)delete c[_];else if(a||!g.internal){var v=g.rect;t._transformBounds(v,v)}}this._bounds=c;var p=c[this._getBoundsCacheKey(this._boundsOptions||{})];p&&(this._position=p.rect.getCenter(!0))}else s&&f&&this._pivot&&(this._position=t._transformPoint(f,f));return this},_transformContent:function(t,e,i){var n=this._children;if(n){for(var r=0,s=n.length;r<s;r++)n[r].transform(t,!0,e,i);return!0}},globalToLocal:function(){return this.getGlobalMatrix(!0)._inverseTransform(c.read(arguments))},localToGlobal:function(){return this.getGlobalMatrix(!0)._transformPoint(c.read(arguments))},parentToLocal:function(){return this._matrix._inverseTransform(c.read(arguments))},localToParent:function(){return this._matrix._transformPoint(c.read(arguments))},fitBounds:function(t,e){t=g.read(arguments);var i=this.getBounds(),n=i.height/i.width,r=t.height/t.width,s=(e?n>r:n<r)?t.width/i.width:t.height/i.height,a=new g(new c,new d(i.width*s,i.height*s));a.setCenter(t.getCenter()),this.setBounds(a)}}),{_setStyles:function(t,e,i){var n=this._style,r=this._matrix;if(n.hasFill()&&(t.fillStyle=n.getFillColor().toCanvasStyle(t,r)),n.hasStroke()){t.strokeStyle=n.getStrokeColor().toCanvasStyle(t,r),t.lineWidth=n.getStrokeWidth();var s=n.getStrokeJoin(),a=n.getStrokeCap(),o=n.getMiterLimit();if(s&&(t.lineJoin=s),a&&(t.lineCap=a),o&&(t.miterLimit=o),paper.support.nativeDash){var h=n.getDashArray(),u=n.getDashOffset();h&&h.length&&("setLineDash"in t?(t.setLineDash(h),t.lineDashOffset=u):(t.mozDash=h,t.mozDashOffset=u))}}if(n.hasShadow()){var l=e.pixelRatio||1,f=i._shiftless().prepend((new p).scale(l,l)),d=f.transform(new c(n.getShadowBlur(),0)),_=f.transform(this.getShadowOffset());t.shadowColor=n.getShadowColor().toCanvasStyle(t),t.shadowBlur=d.getLength(),t.shadowOffsetX=_.x,t.shadowOffsetY=_.y}},draw:function(t,e,i){var n=this._updateVersion=this._project._updateVersion;if(this._visible&&0!==this._opacity){var r=e.matrices,s=e.viewMatrix,a=this._matrix,o=r[r.length-1].appended(a);if(o.isInvertible()){s=s?s.appended(o):o,r.push(o),e.updateMatrix&&(o._updateVersion=n,this._globalMatrix=o);var h,u,l,c=this._blendMode,f=this._opacity,d="normal"===c,_=tt.nativeModes[c],g=d&&1===f||e.dontStart||e.clip||(_||d&&f<1)&&this._canComposite(),v=e.pixelRatio||1;if(!g){var p=this.getStrokeBounds(s);if(!p.width||!p.height)return;l=e.offset,u=e.offset=p.getTopLeft().floor(),h=t,t=Q.getContext(p.getSize().ceil().add(1).multiply(v)),1!==v&&t.scale(v,v)}t.save();var m=i?i.appended(a):this._canScaleStroke&&!this.getStrokeScaling(!0)&&s,y=!g&&e.clipItem,w=!m||y;if(g?(t.globalAlpha=f,_&&(t.globalCompositeOperation=c)):w&&t.translate(-u.x,-u.y),w&&(g?a:s).applyToContext(t),y&&e.clipItem.draw(t,e.extend({clip:!0})),m){t.setTransform(v,0,0,v,0,0);var x=e.offset;x&&t.translate(-x.x,-x.y)}this._draw(t,e,s,m),t.restore(),r.pop(),e.clip&&!e.dontFinish&&t.clip(),g||(tt.process(c,t,h,f,u.subtract(l).multiply(v)),Q.release(t),e.offset=l)}}},_isUpdated:function(t){var e=this._parent;if(e instanceof N)return e._isUpdated(t);var i=this._updateVersion===t;return!i&&e&&e._visible&&e._isUpdated(t)&&(this._updateVersion=t,i=!0),i},_drawSelection:function(t,e,i,n,r){var s=this._selection,a=1&s,o=2&s||a&&this._selectBounds,h=4&s;if(this._drawSelected||(a=!1),(a||o||h)&&this._isUpdated(r)){var u,l=this.getSelectedColor(!0)||(u=this.getLayer())&&u.getSelectedColor(!0),c=e.appended(this.getGlobalMatrix(!0)),f=i/2;if(t.strokeStyle=t.fillStyle=l?l.toCanvasStyle(t):"#009dec",a&&this._drawSelected(t,c,n),h){var d=this.getPosition(!0),_=d.x,g=d.y;t.beginPath(),t.arc(_,g,f,0,2*Math.PI,!0),t.stroke();for(var v=[[0,-1],[1,0],[0,1],[-1,0]],p=f,m=i+1,y=0;y<4;y++){var w=v[y],x=w[0],b=w[1];t.moveTo(_+x*p,g+b*p),t.lineTo(_+x*m,g+b*m),t.stroke()}}if(o){var C=c._transformCorners(this.getInternalBounds());t.beginPath();for(y=0;y<8;y++)t[y?"lineTo":"moveTo"](C[y],C[++y]);t.closePath(),t.stroke();for(y=0;y<8;y++)t.fillRect(C[y]-f,C[++y]-f,i,i)}}},_canComposite:function(){return!1}},r.each(["down","drag","up","move"],function(t){this["removeOn"+r.capitalize(t)]=function(){var e={};return e[t]=!0,this.removeOn(e)}},{removeOn:function(t){for(var e in t)if(t[e]){var i="mouse"+e,n=this._project,r=n._removeSets=n._removeSets||{};r[i]=r[i]||{},r[i][this._id]=this}return this}})),x=w.extend({_class:"Group",_selectBounds:!1,_selectChildren:!0,_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||this.addChildren(Array.isArray(t)?t:arguments)},_changed:function t(i){t.base.call(this,i),1026&i&&(this._clipItem=e)},_getClipItem:function(){var t=this._clipItem;if(t===e){t=null;for(var i=this._children,n=0,r=i.length;n<r;n++)if(i[n]._clipMask){t=i[n];break}this._clipItem=t}return t},isClipped:function(){return!!this._getClipItem()},setClipped:function(t){var e=this.getFirstChild();e&&e.setClipMask(t)},_getBounds:function t(e,i){var n=this._getClipItem();return n?n._getCachedBounds(e&&e.appended(n._matrix),r.set({},i,{stroke:!1})):t.base.call(this,e,i)},_hitTestChildren:function t(e,i,n){var r=this._getClipItem();return(!r||r.contains(e))&&t.base.call(this,e,i,n,r)},_draw:function(t,e){var i=e.clip,n=!i&&this._getClipItem();e=e.extend({clipItem:n,clip:!1}),i?(t.beginPath(),e.dontStart=e.dontFinish=!0):n&&n.draw(t,e.extend({clip:!0}));for(var r=this._children,s=0,a=r.length;s<a;s++){var o=r[s];o!==n&&o.draw(t,e)}}}),b=x.extend({_class:"Layer",initialize:function(){x.apply(this,arguments)},_getOwner:function(){return this._parent||null!=this._index&&this._project},isInserted:function t(){return this._parent?t.base.call(this):null!=this._index},activate:function(){this._project._activeLayer=this},_hitTestSelf:function(){}}),C=w.extend({_class:"Shape",_applyMatrix:!1,_canApplyMatrix:!1,_canScaleStroke:!0,_serializeFields:{type:null,size:null,radius:null},initialize:function(t,e){this._initialize(t,e)},_equals:function(t){return this._type===t._type&&this._size.equals(t._size)&&r.equals(this._radius,t._radius)},copyContent:function(t){this.setType(t._type),this.setSize(t._size),this.setRadius(t._radius)},getType:function(){return this._type},setType:function(t){this._type=t},getShape:"#getType",setShape:"#setType",getSize:function(){var t=this._size;return new _(t.width,t.height,this,"setSize")},setSize:function(){var t=d.read(arguments);if(this._size){if(!this._size.equals(t)){var e=this._type,i=t.width,n=t.height;"rectangle"===e?this._radius.set(d.min(this._radius,t.divide(2))):"circle"===e?(i=n=(i+n)/2,this._radius=i/2):"ellipse"===e&&this._radius._set(i/2,n/2),this._size._set(i,n),this._changed(9)}}else this._size=t.clone()},getRadius:function(){var t=this._radius;return"circle"===this._type?t:new _(t.width,t.height,this,"setRadius")},setRadius:function(t){var e=this._type;if("circle"===e){if(t===this._radius)return;i=2*t;this._radius=t,this._size._set(i,i)}else if(t=d.read(arguments),this._radius){if(this._radius.equals(t))return;if(this._radius.set(t),"rectangle"===e){var i=d.max(this._size,t.multiply(2));this._size.set(i)}else"ellipse"===e&&this._size._set(2*t.width,2*t.height)}else this._radius=t.clone();this._changed(9)},isEmpty:function(){return!1},toPath:function(t){var i=new(L[r.capitalize(this._type)])({center:new c,size:this._size,radius:this._radius,insert:!1});return i.copyAttributes(this),paper.settings.applyMatrix&&i.setApplyMatrix(!0),(t===e||t)&&i.insertAbove(this),i},toShape:"#clone",_asPathItem:function(){return this.toPath(!1)},_draw:function(t,e,i,n){var r=this._style,s=r.hasFill(),a=r.hasStroke(),o=e.dontFinish||e.clip,h=!n;if(s||a||o){var u=this._type,l=this._radius,c="circle"===u;if(e.dontStart||t.beginPath(),h&&c)t.arc(0,0,l,0,2*Math.PI,!0);else{var f=c?l:l.width,d=c?l:l.height,_=this._size,g=_.width,v=_.height;if(h&&"rectangle"===u&&0===f&&0===d)t.rect(-g/2,-v/2,g,v);else{var p=g/2,m=v/2,y=.44771525016920644,w=f*y,x=d*y,b=[-p,-m+d,-p,-m+x,-p+w,-m,-p+f,-m,p-f,-m,p-w,-m,p,-m+x,p,-m+d,p,m-d,p,m-x,p-w,m,p-f,m,-p+f,m,-p+w,m,-p,m-x,-p,m-d];n&&n.transform(b,b,32),t.moveTo(b[0],b[1]),t.bezierCurveTo(b[2],b[3],b[4],b[5],b[6],b[7]),p!==f&&t.lineTo(b[8],b[9]),t.bezierCurveTo(b[10],b[11],b[12],b[13],b[14],b[15]),m!==d&&t.lineTo(b[16],b[17]),t.bezierCurveTo(b[18],b[19],b[20],b[21],b[22],b[23]),p!==f&&t.lineTo(b[24],b[25]),t.bezierCurveTo(b[26],b[27],b[28],b[29],b[30],b[31])}}t.closePath()}o||!s&&!a||(this._setStyles(t,e,i),s&&(t.fill(r.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),a&&t.stroke())},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0),n=this._style,r=e.stroke&&n.hasStroke()&&n.getStrokeWidth();return t&&(i=t._transformBounds(i)),r?i.expand(L._getStrokePadding(r,this._getStrokeMatrix(t,e))):i}},new function(){function t(t,e,i){var n=t._radius;if(!n.isZero())for(var r=t._size.divide(2),s=1;s<=4;s++){var a=new c(s>1&&s<4?-1:1,s>2?-1:1),o=a.multiply(r),h=o.subtract(a.multiply(n));if(new g(i?o.add(a.multiply(i)):o,h).contains(e))return{point:h,quadrant:s}}}function e(t,e,i,n){var r=t.divide(e);return(!n||r.isInQuadrant(n))&&r.subtract(r.normalize()).multiply(e).divide(i).length<=1}return{_contains:function e(i){if("rectangle"===this._type){var n=t(this,i);return n?i.subtract(n.point).divide(this._radius).getLength()<=1:e.base.call(this,i)}return i.divide(this.size).getLength()<=.5},_hitTestSelf:function i(n,r,s,a){var o=!1,h=this._style,u=r.stroke&&h.hasStroke(),l=r.fill&&h.hasFill();if(u||l){var c=this._type,f=this._radius,d=u?h.getStrokeWidth()/2:0,_=r._tolerancePadding.add(L._getStrokePadding(d,!h.getStrokeScaling()&&a));if("rectangle"===c){var v=_.multiply(2),p=t(this,n,v);if(p)o=e(n.subtract(p.point),f,_,p.quadrant);else{var m=new g(this._size).setCenter(0,0),y=m.expand(v),w=m.expand(v.negate());o=y._containsPoint(n)&&!w._containsPoint(n)}}else o=e(n,f,_)}return o?new M(u?"stroke":"fill",this):i.base.apply(this,arguments)}}},{statics:new function(){function t(t,e,i,n,s){var a=new C(r.getNamed(s),e);return a._type=t,a._size=i,a._radius=n,a}return{Circle:function(){var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return t("circle",e,new d(2*i),i,arguments)},Rectangle:function(){var e=g.readNamed(arguments,"rectangle"),i=d.min(d.readNamed(arguments,"radius"),e.getSize(!0).divide(2));return t("rectangle",e.getCenter(!0),e.getSize(!0),i,arguments)},Ellipse:function(){var e=C._readEllipse(arguments),i=e.radius;return t("ellipse",e.center,i.multiply(2),i,arguments)},_readEllipse:function(t){var e,i;if(r.hasNamed(t,"radius"))e=c.readNamed(t,"center"),i=d.readNamed(t,"radius");else{var n=g.readNamed(t,"rectangle");e=n.getCenter(!0),i=n.getSize(!0).divide(2)}return{center:e,radius:i}}}}}),S=w.extend({_class:"Raster",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!1,handle:!1},_serializeFields:{crossOrigin:null,source:null},_prioritize:["crossOrigin"],initialize:function(t,i){if(!this._initialize(t,i!==e&&c.read(arguments,1))){var r="string"==typeof t?n.getElementById(t):t;r?this.setImage(r):this.setSource(t)}this._size||(this._size=new d,this._loaded=!1)},_equals:function(t){return this.getSource()===t.getSource()},copyContent:function(t){var e=t._image,i=t._canvas;if(e)this._setImage(e);else if(i){var n=Q.getCanvas(t._size);n.getContext("2d").drawImage(i,0,0),this._setImage(n)}this._crossOrigin=t._crossOrigin},getSize:function(){var t=this._size;return new _(t?t.width:0,t?t.height:0,this,"setSize")},setSize:function(){var t=d.read(arguments);if(!t.equals(this._size))if(t.width>0&&t.height>0){var e=this.getElement();this._setImage(Q.getCanvas(t)),e&&this.getContext(!0).drawImage(e,0,0,t.width,t.height)}else this._canvas&&Q.release(this._canvas),this._size=t.clone()},getWidth:function(){return this._size?this._size.width:0},setWidth:function(t){this.setSize(t,this.getHeight())},getHeight:function(){return this._size?this._size.height:0},setHeight:function(t){this.setSize(this.getWidth(),t)},getLoaded:function(){return this._loaded},isEmpty:function(){var t=this._size;return!t||0===t.width&&0===t.height},getResolution:function(){var t=this._matrix,e=new c(0,0).transform(t),i=new c(1,0).transform(t).subtract(e),n=new c(0,1).transform(t).subtract(e);return new d(72/i.getLength(),72/n.getLength())},getPpi:"#getResolution",getImage:function(){return this._image},setImage:function(t){function e(t){var e=i.getView(),n=t&&t.type||"load";e&&i.responds(n)&&(paper=e._scope,i.emit(n,new G(t)))}var i=this;this._setImage(t),this._loaded?setTimeout(e,0):t&&Z.add(t,{load:function(n){i._setImage(t),e(n)},error:e})},_setImage:function(t){this._canvas&&Q.release(this._canvas),t&&t.getContext?(this._image=null,this._canvas=t,this._loaded=!0):(this._image=t,this._canvas=null,this._loaded=!!(t&&t.src&&t.complete)),this._size=new d(t?t.naturalWidth||t.width:0,t?t.naturalHeight||t.height:0),this._context=null,this._changed(521)},getCanvas:function(){if(!this._canvas){var t=Q.getContext(this._size);try{this._image&&t.drawImage(this._image,0,0),this._canvas=t.canvas}catch(e){Q.release(t)}}return this._canvas},setCanvas:"#setImage",getContext:function(t){return this._context||(this._context=this.getCanvas().getContext("2d")),t&&(this._image=null,this._changed(513)),this._context},setContext:function(t){this._context=t},getSource:function(){var t=this._image;return t&&t.src||this.toDataURL()},setSource:function(e){var i=new t.Image,n=this._crossOrigin;n&&(i.crossOrigin=n),i.src=e,this.setImage(i)},getCrossOrigin:function(){var t=this._image;return t&&t.crossOrigin||this._crossOrigin||""},setCrossOrigin:function(t){this._crossOrigin=t;var e=this._image;e&&(e.crossOrigin=t)},getElement:function(){return this._canvas||this._loaded&&this._image}},{beans:!1,getSubCanvas:function(){var t=g.read(arguments),e=Q.getContext(t.getSize());return e.drawImage(this.getCanvas(),t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.canvas},getSubRaster:function(){var t=g.read(arguments),e=new S(w.NO_INSERT);return e._setImage(this.getSubCanvas(t)),e.translate(t.getCenter().subtract(this.getSize().divide(2))),e._matrix.prepend(this._matrix),e.insertAbove(this),e},toDataURL:function(){var t=this._image,e=t&&t.src;if(/^data:/.test(e))return e;var i=this.getCanvas();return i?i.toDataURL.apply(i,arguments):null},drawImage:function(t){var e=c.read(arguments,1);this.getContext(!0).drawImage(t,e.x,e.y)},getAverageColor:function(t){var e,i;if(t?t instanceof A?(i=t,e=t.getBounds()):"object"==typeof t&&("width"in t?e=new g(t):"x"in t&&(e=new g(t.x-.5,t.y-.5,1,1))):e=this.getBounds(),!e)return null;var n=Math.min(e.width,32),s=Math.min(e.height,32),a=S._sampleContext;a?a.clearRect(0,0,33,33):a=S._sampleContext=Q.getContext(new d(32)),a.save();var o=(new p).scale(n/e.width,s/e.height).translate(-e.x,-e.y);o.applyToContext(a),i&&i.draw(a,new r({clip:!0,matrices:[o]})),this._matrix.applyToContext(a);var h=this.getElement(),u=this._size;h&&a.drawImage(h,-u.width/2,-u.height/2),a.restore();for(var l=a.getImageData(.5,.5,Math.ceil(n),Math.ceil(s)).data,c=[0,0,0],f=0,_=0,v=l.length;_<v;_+=4){var m=l[_+3];f+=m,m/=255,c[0]+=l[_]*m,c[1]+=l[_+1]*m,c[2]+=l[_+2]*m}for(_=0;_<3;_++)c[_]/=f;return f?F.read(c):null},getPixel:function(){var t=c.read(arguments),e=this.getContext().getImageData(t.x,t.y,1,1).data;return new F("rgb",[e[0]/255,e[1]/255,e[2]/255],e[3]/255)},setPixel:function(){var t=c.read(arguments),e=F.read(arguments),i=e._convert("rgb"),n=e._alpha,r=this.getContext(!0),s=r.createImageData(1,1),a=s.data;a[0]=255*i[0],a[1]=255*i[1],a[2]=255*i[2],a[3]=null!=n?255*n:255,r.putImageData(s,t.x,t.y)},createImageData:function(){var t=d.read(arguments);return this.getContext().createImageData(t.width,t.height)},getImageData:function(){var t=g.read(arguments);return t.isEmpty()&&(t=new g(this._size)),this.getContext().getImageData(t.x,t.y,t.width,t.height)},setImageData:function(t){var e=c.read(arguments,1);this.getContext(!0).putImageData(t,e.x,e.y)},_getBounds:function(t,e){var i=new g(this._size).setCenter(0,0);return t?t._transformBounds(i):i},_hitTestSelf:function(t){if(this._contains(t)){var e=this;return new M("pixel",e,{offset:t.add(e._size.divide(2)).round(),color:{get:function(){return e.getPixel(this.offset)}}})}},_draw:function(t){var e=this.getElement();e&&(t.globalAlpha=this._opacity,t.drawImage(e,-this._size.width/2,-this._size.height/2))},_canComposite:function(){return!0}}),P=w.extend({_class:"SymbolItem",_applyMatrix:!1,_canApplyMatrix:!1,_boundsOptions:{stroke:!0},_serializeFields:{symbol:null},initialize:function(t,i){this._initialize(t,i!==e&&c.read(arguments,1))||this.setDefinition(t instanceof I?t:new I(t))},_equals:function(t){return this._definition===t._definition},copyContent:function(t){this.setDefinition(t._definition)},getDefinition:function(){return this._definition},setDefinition:function(t){this._definition=t,this._changed(9)},getSymbol:"#getDefinition",setSymbol:"#setDefinition",isEmpty:function(){return this._definition._item.isEmpty()},_getBounds:function(t,e){var i=this._definition._item;return i._getCachedBounds(i._matrix.prepended(t),e)},_hitTestSelf:function(t,e,i){var n=this._definition._item._hitTest(t,e,i);return n&&(n.item=this),n},_draw:function(t,e){this._definition._item.draw(t,e)}}),I=r.extend({_class:"SymbolDefinition",initialize:function(t,e){this._id=l.get(),this.project=paper.project,t&&this.setItem(t,e)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._class,this._item],t,!1,e)})},_changed:function(t){8&t&&w._clearBoundsCache(this),1&t&&this.project._changed(t)},getItem:function(){return this._item},setItem:function(t,e){t._symbol&&(t=t.clone()),this._item&&(this._item._symbol=null),this._item=t,t.remove(),t.setSelected(!1),e||t.setPosition(new c),t._symbol=this,this._changed(9)},getDefinition:"#getItem",setDefinition:"#setItem",place:function(t){return new P(this,t)},clone:function(){return new I(this._item.clone(!1))},equals:function(t){return t===this||t&&this._item.equals(t._item)||!1}}),M=r.extend({_class:"HitResult",initialize:function(t,e,i){this.type=t,this.item=e,i&&this.inject(i)},statics:{getOptions:function(t){var e=t&&r.read(t);return r.set({type:null,tolerance:paper.settings.hitTolerance,fill:!e,stroke:!e,segments:!e,handles:!1,ends:!1,position:!1,center:!1,bounds:!1,guides:!1,selected:!1},e)}}}),T=r.extend({_class:"Segment",beans:!0,_selection:0,initialize:function(t,i,n,r,s,a){var o,h,u,l,c=arguments.length;c>0&&(null==t||"object"==typeof t?1===c&&t&&"point"in t?(o=t.point,h=t.handleIn,u=t.handleOut,l=t.selection):(o=t,h=i,u=n,l=r):(o=[t,i],h=n!==e?[n,r]:null,u=s!==e?[s,a]:null)),new z(o,this,"_point"),new z(h,this,"_handleIn"),new z(u,this,"_handleOut"),l&&this.setSelection(l)},_serialize:function(t,e){var i=this._point,n=this._selection,s=n||this.hasHandles()?[i,this._handleIn,this._handleOut]:i;return n&&s.push(n),r.serialize(s,t,!0,e)},_changed:function(t){var e=this._path;if(e){var i,n=e._curves,r=this._index;n&&(t&&t!==this._point&&t!==this._handleIn||!(i=r>0?n[r-1]:e._closed?n[n.length-1]:null)||i._changed(),t&&t!==this._point&&t!==this._handleOut||!(i=n[r])||i._changed()),e._changed(25)}},getPoint:function(){return this._point},setPoint:function(){this._point.set(c.read(arguments))},getHandleIn:function(){return this._handleIn},setHandleIn:function(){this._handleIn.set(c.read(arguments))},getHandleOut:function(){return this._handleOut},setHandleOut:function(){this._handleOut.set(c.read(arguments))},hasHandles:function(){return!this._handleIn.isZero()||!this._handleOut.isZero()},isSmooth:function(){var t=this._handleIn,e=this._handleOut;return!t.isZero()&&!e.isZero()&&t.isCollinear(e)},clearHandles:function(){this._handleIn._set(0,0),this._handleOut._set(0,0)},getSelection:function(){return this._selection},setSelection:function(t){var e=this._selection,i=this._path;this._selection=t=t||0,i&&t!==e&&(i._updateSelection(this,e,t),i._changed(129))},_changeSelection:function(t,e){var i=this._selection;this.setSelection(e?i|t:i&~t)},isSelected:function(){return!!(7&this._selection)},setSelected:function(t){this._changeSelection(7,t)},getIndex:function(){return this._index!==e?this._index:null},getPath:function(){return this._path||null},getCurve:function(){var t=this._path,e=this._index;return t?(e>0&&!t._closed&&e===t._segments.length-1&&e--,t.getCurves()[e]||null):null},getLocation:function(){var t=this.getCurve();return t?new O(t,this===t._segment1?0:1):null},getNext:function(){var t=this._path&&this._path._segments;return t&&(t[this._index+1]||this._path._closed&&t[0])||null},smooth:function(t,i,n){var r=t||{},s=r.type,a=r.factor,o=this.getPrevious(),h=this.getNext(),u=(o||this)._point,l=this._point,f=(h||this)._point,d=u.getDistance(l),_=l.getDistance(f);if(s&&"catmull-rom"!==s){if("geometric"!==s)throw new Error("Smoothing method '"+s+"' not supported.");if(o&&h){var g=u.subtract(f),v=a===e?.4:a,p=v*d/(d+_);i||this.setHandleIn(g.multiply(p)),n||this.setHandleOut(g.multiply(p-v))}}else{var m=a===e?.5:a,y=Math.pow(d,m),w=y*y,x=Math.pow(_,m),b=x*x;if(!i&&o){var C=2*b+3*x*y+w,S=3*x*(x+y);this.setHandleIn(0!==S?new c((b*u._x+C*l._x-w*f._x)/S-l._x,(b*u._y+C*l._y-w*f._y)/S-l._y):new c)}if(!n&&h){var C=2*w+3*y*x+b,S=3*y*(y+x);this.setHandleOut(0!==S?new c((w*f._x+C*l._x-b*u._x)/S-l._x,(w*f._y+C*l._y-b*u._y)/S-l._y):new c)}}},getPrevious:function(){var t=this._path&&this._path._segments;return t&&(t[this._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._index},isLast:function(){var t=this._path;return t&&this._index===t._segments.length-1||!1},reverse:function(){var t=this._handleIn,e=this._handleOut,i=t.clone();t.set(e),e.set(i)},reversed:function(){return new T(this._point,this._handleOut,this._handleIn)},remove:function(){return!!this._path&&!!this._path.removeSegment(this._index)},clone:function(){return new T(this._point,this._handleIn,this._handleOut)},equals:function(t){return t===this||t&&this._class===t._class&&this._point.equals(t._point)&&this._handleIn.equals(t._handleIn)&&this._handleOut.equals(t._handleOut)||!1},toString:function(){var t=["point: "+this._point];return this._handleIn.isZero()||t.push("handleIn: "+this._handleIn),this._handleOut.isZero()||t.push("handleOut: "+this._handleOut),"{ "+t.join(", ")+" }"},transform:function(t){this._transformCoordinates(t,new Array(6),!0),this._changed()},interpolate:function(t,e,i){var n=1-i,r=i,s=t._point,a=e._point,o=t._handleIn,h=e._handleIn,u=e._handleOut,l=t._handleOut;this._point._set(n*s._x+r*a._x,n*s._y+r*a._y,!0),this._handleIn._set(n*o._x+r*h._x,n*o._y+r*h._y,!0),this._handleOut._set(n*l._x+r*u._x,n*l._y+r*u._y,!0),this._changed()},_transformCoordinates:function(t,e,i){var n=this._point,r=i&&this._handleIn.isZero()?null:this._handleIn,s=i&&this._handleOut.isZero()?null:this._handleOut,a=n._x,o=n._y,h=2;return e[0]=a,e[1]=o,r&&(e[h++]=r._x+a,e[h++]=r._y+o),s&&(e[h++]=s._x+a,e[h++]=s._y+o),t&&(t._transformCoordinates(e,e,h/2),a=e[0],o=e[1],i?(n._x=a,n._y=o,h=2,r&&(r._x=e[h++]-a,r._y=e[h++]-o),s&&(s._x=e[h++]-a,s._y=e[h++]-o)):(r||(e[h++]=a,e[h++]=o),s||(e[h++]=a,e[h++]=o))),e}}),z=c.extend({initialize:function(t,i,n){var r,s,a;if(t)if((r=t[0])!==e)s=t[1];else{var o=t;(r=o.x)===e&&(r=(o=c.read(arguments)).x),s=o.y,a=o.selected}else r=s=0;this._x=r,this._y=s,this._owner=i,i[n]=this,a&&this.setSelected(!0)},_set:function(t,e){return this._x=t,this._y=e,this._owner._changed(this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner._changed(this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner._changed(this)},isZero:function(){var t=u.isZero;return t(this._x)&&t(this._y)},isSelected:function(){return!!(this._owner._selection&this._getSelection())},setSelected:function(t){this._owner._changeSelection(this._getSelection(),t)},_getSelection:function(){var t=this._owner;return this===t._point?1:this===t._handleIn?2:this===t._handleOut?4:0}}),k=r.extend({_class:"Curve",beans:!0,initialize:function(t,e,i,n,r,s,a,o){var h,u,l,c,f,d,_=arguments.length;3===_?(this._path=t,h=e,u=i):_?1===_?"segment1"in t?(h=new T(t.segment1),u=new T(t.segment2)):"point1"in t?(l=t.point1,f=t.handle1,d=t.handle2,c=t.point2):Array.isArray(t)&&(l=[t[0],t[1]],c=[t[6],t[7]],f=[t[2]-t[0],t[3]-t[1]],d=[t[4]-t[6],t[5]-t[7]]):2===_?(h=new T(t),u=new T(e)):4===_?(l=t,f=e,d=i,c=n):8===_&&(l=[t,e],c=[a,o],f=[i-t,n-e],d=[r-a,s-o]):(h=new T,u=new T),this._segment1=h||new T(l,null,f),this._segment2=u||new T(c,d,null)},_serialize:function(t,e){return r.serialize(this.hasHandles()?[this.getPoint1(),this.getHandle1(),this.getHandle2(),this.getPoint2()]:[this.getPoint1(),this.getPoint2()],t,!0,e)},_changed:function(){this._length=this._bounds=e},clone:function(){return new k(this._segment1,this._segment2)},toString:function(){var t=["point1: "+this._segment1._point];return this._segment1._handleOut.isZero()||t.push("handle1: "+this._segment1._handleOut),this._segment2._handleIn.isZero()||t.push("handle2: "+this._segment2._handleIn),t.push("point2: "+this._segment2._point),"{ "+t.join(", ")+" }"},classify:function(){return k.classify(this.getValues())},remove:function(){var t=!1;if(this._path){var e=this._segment2,i=e._handleOut;(t=e.remove())&&this._segment1._handleOut.set(i)}return t},getPoint1:function(){return this._segment1._point},setPoint1:function(){this._segment1._point.set(c.read(arguments))},getPoint2:function(){return this._segment2._point},setPoint2:function(){this._segment2._point.set(c.read(arguments))},getHandle1:function(){return this._segment1._handleOut},setHandle1:function(){this._segment1._handleOut.set(c.read(arguments))},getHandle2:function(){return this._segment2._handleIn},setHandle2:function(){this._segment2._handleIn.set(c.read(arguments))},getSegment1:function(){return this._segment1},getSegment2:function(){return this._segment2},getPath:function(){return this._path},getIndex:function(){return this._segment1._index},getNext:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return!this._segment1._index},isLast:function(){var t=this._path;return t&&this._segment1._index===t._curves.length-1||!1},isSelected:function(){return this.getPoint1().isSelected()&&this.getHandle1().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected()},setSelected:function(t){this.getPoint1().setSelected(t),this.getHandle1().setSelected(t),this.getHandle2().setSelected(t),this.getPoint2().setSelected(t)},getValues:function(t){return k.getValues(this._segment1,this._segment2,t)},getPoints:function(){for(var t=this.getValues(),e=[],i=0;i<8;i+=2)e.push(new c(t[i],t[i+1]));return e}},{getLength:function(){return null==this._length&&(this._length=k.getLength(this.getValues(),0,1)),this._length},getArea:function(){return k.getArea(this.getValues())},getLine:function(){return new m(this._segment1._point,this._segment2._point)},getPart:function(t,e){return new k(k.getPart(this.getValues(),t,e))},getPartLength:function(t,e){return k.getLength(this.getValues(),t,e)},divideAt:function(t){return this.divideAtTime(t&&t.curve===this?t.time:this.getTimeAt(t))},divideAtTime:function(t,e){var i=null;if(t>=1e-8&&t<=1-1e-8){var n=k.subdivide(this.getValues(),t),r=n[0],s=n[1],a=e||this.hasHandles(),o=this._segment1,h=this._segment2,u=this._path;a&&(o._handleOut._set(r[2]-r[0],r[3]-r[1]),h._handleIn._set(s[4]-s[6],s[5]-s[7]));var l=r[6],f=r[7],d=new T(new c(l,f),a&&new c(r[4]-l,r[5]-f),a&&new c(s[2]-l,s[3]-f));u?(u.insert(o._index+1,d),i=this.getNext()):(this._segment2=d,this._changed(),i=new k(d,h))}return i},splitAt:function(t){var e=this._path;return e?e.splitAt(t):null},splitAtTime:function(t){return this.splitAt(this.getLocationAtTime(t))},divide:function(t,i){return this.divideAtTime(t===e?.5:i?t:this.getTimeAt(t))},split:function(t,i){return this.splitAtTime(t===e?.5:i?t:this.getTimeAt(t))},reversed:function(){return new k(this._segment2.reversed(),this._segment1.reversed())},clearHandles:function(){this._segment1._handleOut._set(0,0),this._segment2._handleIn._set(0,0)},statics:{getValues:function(t,e,i,n){var r=t._point,s=t._handleOut,a=e._handleIn,o=e._point,h=r.x,u=r.y,l=o.x,c=o.y,f=n?[h,u,h,u,l,c,l,c]:[h,u,h+s._x,u+s._y,l+a._x,c+a._y,l,c];return i&&i._transformCoordinates(f,f,4),f},subdivide:function(t,i){var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],u=t[6],l=t[7];i===e&&(i=.5);var c=1-i,f=c*n+i*s,d=c*r+i*a,_=c*s+i*o,g=c*a+i*h,v=c*o+i*u,p=c*h+i*l,m=c*f+i*_,y=c*d+i*g,w=c*_+i*v,x=c*g+i*p,b=c*m+i*w,C=c*y+i*x;return[[n,r,f,d,m,y,b,C],[b,C,w,x,v,p,u,l]]},getMonoCurves:function(t,e){var i=[],n=e?0:1,r=t[n+0],s=t[n+2],a=t[n+4],o=t[n+6];if(r>=s==s>=a&&s>=a==a>=o||k.isStraight(t))i.push(t);else{var h=3*(s-a)-r+o,l=2*(r+a)-4*s,c=s-r,f=[],d=u.solveQuadratic(h,l,c,f,1e-8,1-1e-8);if(d){f.sort();var _=f[0],g=k.subdivide(t,_);i.push(g[0]),d>1&&(_=(f[1]-_)/(1-_),g=k.subdivide(g[1],_),i.push(g[0])),i.push(g[1])}else i.push(t)}return i},solveCubic:function(t,e,i,n,r,s){var a=t[e],o=t[e+2],h=t[e+4],l=t[e+6],c=0;if(!(a<i&&l<i&&o<i&&h<i||a>i&&l>i&&o>i&&h>i)){var f=3*(o-a),d=3*(h-o)-f,_=l-a-f-d;c=u.solveCubic(_,d,f,a-i,n,r,s)}return c},getTimeOf:function(t,e){var i=new c(t[0],t[1]),n=new c(t[6],t[7]);if(null===(e.isClose(i,1e-12)?0:e.isClose(n,1e-12)?1:null))for(var r=[e.x,e.y],s=[],a=0;a<2;a++)for(var o=k.solveCubic(t,a,r[a],s,0,1),h=0;h<o;h++){var u=s[h];if(e.isClose(k.getPoint(t,u),1e-7))return u}return e.isClose(i,1e-7)?0:e.isClose(n,1e-7)?1:null},getNearestTime:function(t,e){function i(i){if(i>=0&&i<=1){var n=e.getDistance(k.getPoint(t,i),!0);if(n<u)return u=n,l=i,!0}}if(k.isStraight(t)){var n=t[0],r=t[1],s=t[6]-n,a=t[7]-r,o=s*s+a*a;if(0===o)return 0;var h=((e.x-n)*s+(e.y-r)*a)/o;return h<1e-12?0:h>.999999999999?1:k.getTimeOf(t,new c(n+h*s,r+h*a))}for(var u=1/0,l=0,f=0;f<=100;f++)i(f/100);for(var d=.005;d>1e-8;)i(l-d)||i(l+d)||(d/=2);return l},getPart:function(t,e,i){var n=e>i;if(n){var r=e;e=i,i=r}return e>0&&(t=k.subdivide(t,e)[1]),i<1&&(t=k.subdivide(t,(i-e)/(1-e))[0]),n?[t[6],t[7],t[4],t[5],t[2],t[3],t[0],t[1]]:t},isFlatEnough:function(t,e){var i=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],h=t[6],u=t[7],l=3*r-2*i-h,c=3*s-2*n-u,f=3*a-2*h-i,d=3*o-2*u-n;return Math.max(l*l,f*f)+Math.max(c*c,d*d)<=16*e*e},getArea:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7];return 3*((h-i)*(n+s)-(o-e)*(r+a)+r*(e-s)-n*(i-a)+h*(s+e/3)-o*(a+i/3))/20},getBounds:function(t){for(var e=t.slice(0,2),i=e.slice(),n=[0,0],r=0;r<2;r++)k._addBounds(t[r],t[r+2],t[r+4],t[r+6],r,0,e,i,n);return new g(e[0],e[1],i[0]-e[0],i[1]-e[1])},_addBounds:function(t,e,i,n,r,s,a,o,h){function l(t,e){var i=t-e,n=t+e;i<a[r]&&(a[r]=i),n>o[r]&&(o[r]=n)}s/=2;var c=a[r]-s,f=o[r]+s;if(t<c||e<c||i<c||n<c||t>f||e>f||i>f||n>f)if(e<t!=e<n&&i<t!=i<n)l(t,s),l(n,s);else{var d=3*(e-i)-t+n,_=2*(t+i)-4*e,g=e-t,v=u.solveQuadratic(d,_,g,h);l(n,0);for(var p=0;p<v;p++){var m=h[p],y=1-m;1e-8<=m&&m<=1-1e-8&&l(y*y*y*t+3*y*y*m*e+3*y*m*m*i+m*m*m*n,s)}}}}},r.each(["getBounds","getStrokeBounds","getHandleBounds"],function(t){this[t]=function(){this._bounds||(this._bounds={});var e=this._bounds[t];return e||(e=this._bounds[t]=L[t]([this._segment1,this._segment2],!1,this._path)),e.clone()}},{}),r.each({isStraight:function(t,e,i,n){if(e.isZero()&&i.isZero())return!0;var r=n.subtract(t);if(r.isZero())return!1;if(r.isCollinear(e)&&r.isCollinear(i)){var s=new m(t,n);if(s.getDistance(t.add(e))<1e-7&&s.getDistance(n.add(i))<1e-7){var a=r.dot(r),o=r.dot(e)/a,h=r.dot(i)/a;return o>=0&&o<=1&&h<=0&&h>=-1}}return!1},isLinear:function(t,e,i,n){var r=n.subtract(t).divide(3);return e.equals(r)&&i.negate().equals(r)}},function(t,e){this[e]=function(e){var i=this._segment1,n=this._segment2;return t(i._point,i._handleOut,n._handleIn,n._point,e)},this.statics[e]=function(e,i){var n=e[0],r=e[1],s=e[6],a=e[7];return t(new c(n,r),new c(e[2]-n,e[3]-r),new c(e[4]-s,e[5]-a),new c(s,a),i)}},{statics:{},hasHandles:function(){return!this._segment1._handleOut.isZero()||!this._segment2._handleIn.isZero()},hasLength:function(t){return(!this.getPoint1().equals(this.getPoint2())||this.hasHandles())&&this.getLength()>(t||0)},isCollinear:function(t){return t&&this.isStraight()&&t.isStraight()&&this.getLine().isCollinear(t.getLine())},isHorizontal:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).y)<1e-8},isVertical:function(){return this.isStraight()&&Math.abs(this.getTangentAtTime(.5).x)<1e-8}}),{beans:!1,getLocationAt:function(t,e){return this.getLocationAtTime(e?t:this.getTimeAt(t))},getLocationAtTime:function(t){return null!=t&&t>=0&&t<=1?new O(this,t):null},getTimeAt:function(t,e){return k.getTimeAt(this.getValues(),t,e)},getParameterAt:"#getTimeAt",getOffsetAtTime:function(t){return this.getPartLength(0,t)},getLocationOf:function(){return this.getLocationAtTime(this.getTimeOf(c.read(arguments)))},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getTimeOf:function(){return k.getTimeOf(this.getValues(),c.read(arguments))},getParameterOf:"#getTimeOf",getNearestLocation:function(){var t=c.read(arguments),e=this.getValues(),i=k.getNearestTime(e,t),n=k.getPoint(e,i);return new O(this,i,n,null,t.getDistance(n))},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t}},new function(){var t=["getPoint","getTangent","getNormal","getWeightedTangent","getWeightedNormal","getCurvature"];return r.each(t,function(t){this[t+"At"]=function(e,i){var n=this.getValues();return k[t](n,i?e:k.getTimeAt(n,e))},this[t+"AtTime"]=function(e){return k[t](this.getValues(),e)}},{statics:{_evaluateMethods:t}})},new function(){function t(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=9*(n-s)+3*(t[6]-e),h=6*(e+s)-12*n,u=3*(n-e),l=9*(r-a)+3*(t[7]-i),c=6*(i+a)-12*r,f=3*(r-i);return function(t){var e=(o*t+h)*t+u,i=(l*t+c)*t+f;return Math.sqrt(e*e+i*i)}}function i(t,e){return Math.max(2,Math.min(16,Math.ceil(32*Math.abs(e-t))))}function n(t,e,i,n){if(null==e||e<0||e>1)return null;var r=t[0],s=t[1],a=t[2],o=t[3],h=t[4],l=t[5],f=t[6],d=t[7],_=u.isZero;_(a-r)&&_(o-s)&&(a=r,o=s),_(h-f)&&_(l-d)&&(h=f,l=d);var g,v,p=3*(a-r),m=3*(h-a)-p,y=f-r-p-m,w=3*(o-s),x=3*(l-o)-w,b=d-s-w-x;if(0===i)g=0===e?r:1===e?f:((y*e+m)*e+p)*e+r,v=0===e?s:1===e?d:((b*e+x)*e+w)*e+s;else{if(e<1e-8?(g=p,v=w):e>1-1e-8?(g=3*(f-h),v=3*(d-l)):(g=(3*y*e+2*m)*e+p,v=(3*b*e+2*x)*e+w),n){0===g&&0===v&&(e<1e-8||e>1-1e-8)&&(g=h-a,v=l-o);var C=Math.sqrt(g*g+v*v);C&&(g/=C,v/=C)}if(3===i){var h=6*y*e+2*m,l=6*b*e+2*x,S=Math.pow(g*g+v*v,1.5);g=0!==S?(g*l-v*h)/S:0,v=0}}return 2===i?new c(v,-g):new c(g,v)}return{statics:{classify:function(t){function i(t,i,n){var r=i!==e,s=r&&i>0&&i<1,a=r&&n>0&&n<1;return!r||(s||a)&&("loop"!==t||s&&a)||(t="arch",s=a=!1),{type:t,roots:s||a?s&&a?i<n?[i,n]:[n,i]:[s?i:n]:null}}var n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],h=t[5],l=t[6],c=t[7],f=s*(r-c)+a*(l-n)+n*c-r*l,d=3*(o*(a-r)+h*(n-s)+s*r-a*n),_=d-f,g=_-f+(n*(c-h)+r*(o-l)+l*h-c*o),v=Math.sqrt(g*g+_*_+d*d),p=0!==v?1/v:0,m=u.isZero;if(g*=p,_*=p,d*=p,m(g))return m(_)?i(m(d)?"line":"quadratic"):i("serpentine",d/(3*_));var y=3*_*_-4*g*d;if(m(y))return i("cusp",_/(2*g));var w=y>0?Math.sqrt(y/3):Math.sqrt(-y),x=2*g;return i(y>0?"serpentine":"loop",(_+w)/x,(_-w)/x)},getLength:function(n,r,s,a){if(r===e&&(r=0),s===e&&(s=1),k.isStraight(n)){var o=n;s<1&&(o=k.subdivide(o,s)[0],r/=s),r>0&&(o=k.subdivide(o,r)[1]);var h=o[6]-o[0],l=o[7]-o[1];return Math.sqrt(h*h+l*l)}return u.integrate(a||t(n),r,s,i(r,s))},getTimeAt:function(n,r,s){if(s===e&&(s=r<0?1:0),0===r)return s;var a=Math.abs,o=r>0,h=o?s:0,l=o?1:s,c=t(n),f=k.getLength(n,h,l,c),d=a(r)-f;if(a(d)<1e-12)return o?l:h;if(d>1e-12)return null;var _=r/f,g=0;return u.findRoot(function(t){return g+=u.integrate(c,s,t,i(s,t)),s=t,g-r},c,s+_,h,l,32,1e-12)},getPoint:function(t,e){return n(t,e,0,!1)},getTangent:function(t,e){return n(t,e,1,!0)},getWeightedTangent:function(t,e){return n(t,e,1,!1)},getNormal:function(t,e){return n(t,e,2,!0)},getWeightedNormal:function(t,e){return n(t,e,2,!1)},getCurvature:function(t,e){return n(t,e,3,!1).x},getPeaks:function(t){var e=t[0],i=t[1],n=t[2],r=t[3],s=t[4],a=t[5],o=3*n-e-3*s+t[6],h=3*e-6*n+3*s,l=-3*e+3*n,c=3*r-i-3*a+t[7],f=3*i-6*r+3*a,d=-3*i+3*r,_=[];return u.solveCubic(9*(o*o+c*c),9*(o*h+f*c),2*(h*h+f*f)+3*(l*o+d*c),l*h+f*d,_,1e-8,1-1e-8),_.sort()}}}},new function(){function t(t,e,i,n,r,s,a){var o=!a&&i.getPrevious()===r,h=!a&&i!==r&&i.getNext()===r;if(null!==n&&n>=(o?1e-8:0)&&n<=(h?1-1e-8:1)&&null!==s&&s>=(h?1e-8:0)&&s<=(o?1-1e-8:1)){var u=new O(i,n,null,a),l=new O(r,s,null,a);u._intersection=l,l._intersection=u,e&&!e(u)||O.insert(t,u,!0)}}function e(r,s,a,o,h,u,l,c,f,d,_,g,v){if(++f>=4096||++c>=40)return f;var p,y,w=s[0],x=s[1],b=s[6],C=s[7],S=m.getSignedDistance,P=S(w,x,b,C,s[2],s[3]),I=S(w,x,b,C,s[4],s[5]),M=P*I>0?.75:4/9,T=M*Math.min(0,P,I),z=M*Math.max(0,P,I),O=S(w,x,b,C,r[0],r[1]),A=S(w,x,b,C,r[2],r[3]),L=S(w,x,b,C,r[4],r[5]),N=S(w,x,b,C,r[6],r[7]),B=i(O,A,L,N),D=B[0],j=B[1];if(0===P&&0===I&&0===O&&0===A&&0===L&&0===N||null==(p=n(D,j,T,z))||null==(y=n(D.reverse(),j.reverse(),T,z)))return f;var E=d+(_-d)*p,F=d+(_-d)*y;if(Math.max(v-g,F-E)<1e-9){var R=(E+F)/2,q=(g+v)/2;t(h,u,l?o:a,l?q:R,l?a:o,l?R:q)}else if(r=k.getPart(r,p,y),y-p>.8)if(F-E>v-g){R=(E+F)/2;f=e(s,(V=k.subdivide(r,.5))[0],o,a,h,u,!l,c,f,g,v,E,R),f=e(s,V[1],o,a,h,u,!l,c,f,g,v,R,F)}else{var V=k.subdivide(s,.5),q=(g+v)/2;f=e(V[0],r,o,a,h,u,!l,c,f,g,q,E,F),f=e(V[1],r,o,a,h,u,!l,c,f,q,v,E,F)}else f=v-g>=1e-9?e(s,r,o,a,h,u,!l,c,f,g,v,E,F):e(r,s,a,o,h,u,l,c,f,E,F,g,v);return f}function i(t,e,i,n){var r,s=[0,t],a=[1/3,e],o=[2/3,i],h=[1,n],u=e-(2*t+n)/3,l=i-(t+2*n)/3;if(u*l<0)r=[[s,a,h],[s,o,h]];else{var c=u/l;r=[c>=2?[s,a,h]:c<=.5?[s,o,h]:[s,a,o,h],[s,h]]}return(u||l)<0?r.reverse():r}function n(t,e,i,n){return t[0][1]<i?r(t,!0,i):e[0][1]>n?r(e,!1,n):t[0][0]}function r(t,e,i){for(var n=t[0][0],r=t[0][1],s=1,a=t.length;s<a;s++){var o=t[s][0],h=t[s][1];if(e?h>=i:h<=i)return h===i?o:n+(i-r)*(o-n)/(h-r);n=o,r=h}return null}function s(t,e,i,n,r){var s=u.isZero;if(s(n)&&s(r)){var a=k.getTimeOf(t,new c(e,i));return null===a?[]:[a]}for(var o=Math.atan2(-r,n),h=Math.sin(o),l=Math.cos(o),f=[],d=[],_=0;_<8;_+=2){var g=t[_]-e,v=t[_+1]-i;f.push(g*l-v*h,g*h+v*l)}return k.solveCubic(f,1,0,d,0,1),d}function a(e,i,n,r,a,o,h){for(var u=i[0],l=i[1],c=s(e,u,l,i[6]-u,i[7]-l),f=0,d=c.length;f<d;f++){var _=c[f],g=k.getPoint(e,_),v=k.getTimeOf(i,g);null!==v&&t(a,o,h?r:n,h?v:_,h?n:r,h?_:v)}}function o(e,i,n,r,s,a){var o=m.intersect(e[0],e[1],e[6],e[7],i[0],i[1],i[6],i[7]);o&&t(s,a,n,k.getTimeOf(e,o),r,k.getTimeOf(i,o))}function h(i,n,r,s,h,u){var l=Math.min,d=Math.max;if(d(i[0],i[2],i[4],i[6])+1e-12>l(n[0],n[2],n[4],n[6])&&l(i[0],i[2],i[4],i[6])-1e-12<d(n[0],n[2],n[4],n[6])&&d(i[1],i[3],i[5],i[7])+1e-12>l(n[1],n[3],n[5],n[7])&&l(i[1],i[3],i[5],i[7])-1e-12<d(n[1],n[3],n[5],n[7])){var _=f(i,n);if(_)for(x=0;x<2;x++){var g=_[x];t(h,u,r,g[0],s,g[1],!0)}else{var v=k.isStraight(i),p=k.isStraight(n),m=v&&p,y=v&&!p,w=h.length;if((m?o:v||p?a:e)(y?n:i,y?i:n,y?s:r,y?r:s,h,u,y,0,0,0,1,0,1),!m||h.length===w)for(var x=0;x<4;x++){var b=x>>1,C=1&x,S=6*b,P=6*C,I=new c(i[S],i[S+1]),M=new c(n[P],n[P+1]);I.isClose(M,1e-12)&&t(h,u,r,b,s,C)}}}return h}function l(e,i,n,r){var s=k.classify(e);if("loop"===s.type){var a=s.roots;t(n,r,i,a[0],i,a[1])}return n}function f(t,e){function i(t){var e=t[6]-t[0],i=t[7]-t[1];return e*e+i*i}var n=Math.abs,r=m.getDistance,s=k.isStraight(t),a=k.isStraight(e),o=s&&a,h=i(t)<i(e),u=h?e:t,l=h?t:e,f=u[0],d=u[1],_=u[6]-f,g=u[7]-d;if(r(f,d,_,g,l[0],l[1],!0)<1e-7&&r(f,d,_,g,l[6],l[7],!0)<1e-7)!o&&r(f,d,_,g,u[2],u[3],!0)<1e-7&&r(f,d,_,g,u[4],u[5],!0)<1e-7&&r(f,d,_,g,l[2],l[3],!0)<1e-7&&r(f,d,_,g,l[4],l[5],!0)<1e-7&&(s=a=o=!0);else if(o)return null;if(s^a)return null;for(var v=[t,e],p=[],y=0;y<4&&p.length<2;y++){var w=1&y,x=1^w,b=y>>1,C=k.getTimeOf(v[w],new c(v[x][b?6:0],v[x][b?7:1]));if(null!=C){var S=w?[b,C]:[C,b];(!p.length||n(S[0]-p[0][0])>1e-8&&n(S[1]-p[0][1])>1e-8)&&p.push(S)}if(y>2&&!p.length)break}if(2!==p.length)p=null;else if(!o){var P=k.getPart(t,p[0][0],p[1][0]),I=k.getPart(e,p[0][1],p[1][1]);(n(I[2]-P[2])>1e-7||n(I[3]-P[3])>1e-7||n(I[4]-P[4])>1e-7||n(I[5]-P[5])>1e-7)&&(p=null)}return p}return{getIntersections:function(t){var e=this.getValues(),i=t&&t!==this&&t.getValues();return i?h(e,i,this,t,[]):l(e,this,[])},statics:{getOverlaps:f,getIntersections:function(t,e,i,n,r,s){var a=!e;a&&(e=t);for(var o,u,c=t.length,f=e.length,d=[],_=[],g=0;g<f;g++)d[g]=e[g].getValues(r);for(g=0;g<c;g++){var v=t[g],p=a?d[g]:v.getValues(n),m=v.getPath();m!==u&&(u=m,o=[],_.push(o)),a&&l(p,v,o,i);for(var y=a?g+1:0;y<f;y++){if(s&&o.length)return o;h(p,d[y],v,e[y],o,i)}}o=[];for(var g=0,w=_.length;g<w;g++)o.push.apply(o,_[g]);return o},getCurveLineIntersections:s}}}),O=r.extend({_class:"CurveLocation",initialize:function(t,e,i,n,r){if(e>=.99999999){var s=t.getNext();s&&(e=0,t=s)}this._setCurve(t),this._time=e,this._point=i||t.getPointAtTime(e),this._overlap=n,this._distance=r,this._intersection=this._next=this._previous=null},_setCurve:function(t){var e=t._path;this._path=e,this._version=e?e._version:0,this._curve=t,this._segment=null,this._segment1=t._segment1,this._segment2=t._segment2},_setSegment:function(t){this._setCurve(t.getCurve()),this._segment=t,this._time=t===this._segment1?0:1,this._point=t._point.clone()},getSegment:function(){var t=this._segment;if(!t){var e=this.getCurve(),i=this.getTime();0===i?t=e._segment1:1===i?t=e._segment2:null!=i&&(t=e.getPartLength(0,i)<e.getPartLength(i,1)?e._segment1:e._segment2),this._segment=t}return t},getCurve:function(){function t(t){var e=t&&t.getCurve();if(e&&null!=(i._time=e.getTimeOf(i._point)))return i._setCurve(e),e}var e=this._path,i=this;return e&&e._version!==this._version&&(this._time=this._offset=this._curveOffset=this._curve=null),this._curve||t(this._segment)||t(this._segment1)||t(this._segment2.getPrevious())},getPath:function(){var t=this.getCurve();return t&&t._path},getIndex:function(){var t=this.getCurve();return t&&t.getIndex()},getTime:function(){var t=this.getCurve(),e=this._time;return t&&null==e?this._time=t.getTimeOf(this._point):e},getParameter:"#getTime",getPoint:function(){return this._point},getOffset:function(){var t=this._offset;if(null==t){t=0;var e=this.getPath(),i=this.getIndex();if(e&&null!=i)for(var n=e.getCurves(),r=0;r<i;r++)t+=n[r].getLength();this._offset=t+=this.getCurveOffset()}return t},getCurveOffset:function(){var t=this._curveOffset;if(null==t){var e=this.getCurve(),i=this.getTime();this._curveOffset=t=null!=i&&e&&e.getPartLength(0,i)}return t},getIntersection:function(){return this._intersection},getDistance:function(){return this._distance},divide:function(){var t=this.getCurve(),e=t&&t.divideAtTime(this.getTime());return e&&this._setSegment(e._segment1),e},split:function(){var t=this.getCurve(),e=t._path,i=t&&t.splitAtTime(this.getTime());return i&&this._setSegment(e.getLastSegment()),i},equals:function(t,e){var i=this===t;if(!i&&t instanceof O){var n=this.getCurve(),r=t.getCurve(),s=n._path;if(s===r._path){var a=Math.abs,o=a(this.getOffset()-t.getOffset()),h=!e&&this._intersection,u=!e&&t._intersection;i=(o<1e-7||s&&a(s.getLength()-o)<1e-7)&&(!h&&!u||h&&u&&h.equals(u,!0))}}return i},toString:function(){var t=[],e=this.getPoint(),i=h.instance;e&&t.push("point: "+e);var n=this.getIndex();null!=n&&t.push("index: "+n);var r=this.getTime();return null!=r&&t.push("time: "+i.number(r)),null!=this._distance&&t.push("distance: "+i.number(this._distance)),"{ "+t.join(", ")+" }"},isTouching:function(){var t=this._intersection;if(t&&this.getTangent().isCollinear(t.getTangent())){var e=this.getCurve(),i=t.getCurve();return!(e.isStraight()&&i.isStraight()&&e.getLine().intersect(i.getLine()))}return!1},isCrossing:function(){function t(t,e){var i=t.getValues(),n=k.classify(i).roots||k.getPeaks(i),r=n.length,s=e&&r>1?n[r-1]:r>0?n[0]:.5;c.push(k.getLength(i,e?s:0,e?1:s)/2)}function e(t,e,i){return e<i?t>e&&t<i:t>e||t<i}var i=this._intersection;if(!i)return!1;var n=this.getTime(),r=i.getTime(),s=n>=1e-8&&n<=1-1e-8,a=r>=1e-8&&r<=1-1e-8;if(s&&a)return!this.isTouching();var o=this.getCurve(),h=n<1e-8?o.getPrevious():o,u=i.getCurve(),l=r<1e-8?u.getPrevious():u;if(n>1-1e-8&&(o=o.getNext()),r>1-1e-8&&(u=u.getNext()),!(h&&o&&l&&u))return!1;var c=[];s||(t(h,!0),t(o,!1)),a||(t(l,!0),t(u,!1));var f=this.getPoint(),d=Math.min.apply(Math,c),_=s?o.getTangentAtTime(n):o.getPointAt(d).subtract(f),g=s?_.negate():h.getPointAt(-d).subtract(f),v=a?u.getTangentAtTime(r):u.getPointAt(d).subtract(f),p=a?v.negate():l.getPointAt(-d).subtract(f),m=g.getAngle(),y=_.getAngle(),w=p.getAngle(),x=v.getAngle();return!!(s?e(m,w,x)^e(y,w,x)&&e(m,x,w)^e(y,x,w):e(w,m,y)^e(x,m,y)&&e(w,y,m)^e(x,y,m))},hasOverlap:function(){return!!this._overlap}},r.each(k._evaluateMethods,function(t){var e=t+"At";this[t]=function(){var t=this.getCurve(),i=this.getTime();return null!=i&&t&&t[e](i,!0)}},{preserve:!0}),new function(){function t(t,e,i){function n(i,n){for(var s=i+n;s>=-1&&s<=r;s+=n){var a=t[(s%r+r)%r];if(!e.getPoint().isClose(a.getPoint(),1e-7))break;if(e.equals(a))return a}return null}for(var r=t.length,s=0,a=r-1;s<=a;){var o,h=s+a>>>1,u=t[h];if(i&&(o=e.equals(u)?u:n(h,-1)||n(h,1)))return e._overlap&&(o._overlap=o._intersection._overlap=!0),o;var l=e.getPath(),c=u.getPath();(l!==c?l._id-c._id:e.getIndex()+e.getTime()-(u.getIndex()+u.getTime()))<0?a=h-1:s=h+1}return t.splice(s,0,e),e}return{statics:{insert:t,expand:function(e){for(var i=e.slice(),n=e.length-1;n>=0;n--)t(i,e[n]._intersection,!1);return i}}}}),A=w.extend({_class:"PathItem",_selectBounds:!1,_canScaleStroke:!0,beans:!0,initialize:function(){},statics:{create:function(t){var e,i,n;if(r.isPlainObject(t)?(i=t.segments,e=t.pathData):Array.isArray(t)?i=t:"string"==typeof t&&(e=t),i){var s=i[0];n=s&&Array.isArray(s[0])}else e&&(n=(e.match(/m/gi)||[]).length>1||/z\s*\S+/i.test(e));return new(n?N:L)(t)}},_asPathItem:function(){return this},isClockwise:function(){return this.getArea()>=0},setClockwise:function(t){this.isClockwise()!=(t=!!t)&&this.reverse()},setPathData:function(t){function e(t,e){var i=+n[t];return o&&(i+=h[e]),i}function i(t){return new c(e(t,"x"),e(t+1,"y"))}var n,r,s,a=t&&t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),o=!1,h=new c,u=new c;this.clear();for(var l=0,f=a&&a.length;l<f;l++){var _=a[l],g=_[0],v=g.toLowerCase(),p=(n=_.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g))&&n.length;switch(o=g===v,"z"!==r||/[mz]/.test(v)||this.moveTo(h),v){case"m":case"l":for(var m="m"===v,y=0;y<p;y+=2)this[m?"moveTo":"lineTo"](h=i(y)),m&&(u=h,m=!1);s=h;break;case"h":case"v":var w="h"===v?"x":"y";h=h.clone();for(y=0;y<p;y++)h[w]=e(y,w),this.lineTo(h);s=h;break;case"c":for(y=0;y<p;y+=6)this.cubicCurveTo(i(y),s=i(y+2),h=i(y+4));break;case"s":for(y=0;y<p;y+=4)this.cubicCurveTo(/[cs]/.test(r)?h.multiply(2).subtract(s):h,s=i(y),h=i(y+2)),r=v;break;case"q":for(y=0;y<p;y+=4)this.quadraticCurveTo(s=i(y),h=i(y+2));break;case"t":for(y=0;y<p;y+=2)this.quadraticCurveTo(s=/[qt]/.test(r)?h.multiply(2).subtract(s):h,h=i(y)),r=v;break;case"a":for(y=0;y<p;y+=7)this.arcTo(h=i(y+5),new d(+n[y],+n[y+1]),+n[y+2],+n[y+4],+n[y+3]);break;case"z":this.closePath(1e-12),h=u}r=v}},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_contains:function(t){var e=t.isInside(this.getBounds({internal:!0,handle:!0}))?this._getWinding(t):{};return e.onPath||!!("evenodd"===this.getFillRule()?1&e.windingL||1&e.windingR:e.winding)},getIntersections:function(t,e,i,n){var r=this===t||!t,s=this._matrix._orNullIfIdentity(),a=r?s:(i||t._matrix)._orNullIfIdentity();return r||this.getBounds(s).intersects(t.getBounds(a),1e-12)?k.getIntersections(this.getCurves(),!r&&t.getCurves(),e,s,a,n):[]},getCrossings:function(t){return this.getIntersections(t,function(t){return t.hasOverlap()||t.isCrossing()})},getNearestLocation:function(){for(var t=c.read(arguments),e=this.getCurves(),i=1/0,n=null,r=0,s=e.length;r<s;r++){var a=e[r].getNearestLocation(t);a._distance<i&&(i=a._distance,n=a)}return n},getNearestPoint:function(){var t=this.getNearestLocation.apply(this,arguments);return t?t.getPoint():t},interpolate:function(t,e,i){var n=!this._children,r=n?"_segments":"_children",s=t[r],a=e[r],o=this[r];if(!s||!a||s.length!==a.length)throw new Error("Invalid operands in interpolate() call: "+t+", "+e);var h=o.length,u=a.length;if(h<u)for(var l=n?T:L,c=h;c<u;c++)this.add(new l);else h>u&&this[n?"removeSegments":"removeChildren"](u,h);for(c=0;c<u;c++)o[c].interpolate(s[c],a[c],i);n&&(this.setClosed(t._closed),this._changed(9))},compare:function(t){var e=!1;if(t){var i=this._children||[this],n=t._children?t._children.slice():[t],r=i.length,s=n.length,a=[],o=0;e=!0;for(var h=r-1;h>=0&&e;h--){var u=i[h];e=!1;for(var l=s-1;l>=0&&!e;l--)u.compare(n[l])&&(a[l]||(a[l]=!0,o++),e=!0)}e=e&&o===s}return e}}),L=A.extend({_class:"Path",_serializeFields:{segments:[],closed:!1},initialize:function(t){this._closed=!1,this._segments=[],this._version=0;var i=Array.isArray(t)?"object"==typeof t[0]?t:arguments:!t||t.size!==e||t.x===e&&t.point===e?null:arguments;i&&i.length>0?this.setSegments(i):(this._curves=e,this._segmentSelection=0,i||"string"!=typeof t||(this.setPathData(t),t=null)),this._initialize(!i&&t)},_equals:function(t){return this._closed===t._closed&&r.equals(this._segments,t._segments)},copyContent:function(t){this.setSegments(t._segments),this._closed=t._closed},_changed:function t(i){if(t.base.call(this,i),8&i){if(this._length=this._area=e,16&i)this._version++;else if(this._curves)for(var n=0,r=this._curves.length;n<r;n++)this._curves[n]._changed()}else 32&i&&(this._bounds=e)},getStyle:function(){var t=this._parent;return(t instanceof N?t:this)._style},getSegments:function(){return this._segments},setSegments:function(t){var i=this.isFullySelected(),n=t&&t.length;if(this._segments.length=0,this._segmentSelection=0,this._curves=e,n){var r=t[n-1];"boolean"==typeof r&&(this.setClosed(r),n--),this._add(T.readList(t,0,{},n))}i&&this.setFullySelected(!0)},getFirstSegment:function(){return this._segments[0]},getLastSegment:function(){return this._segments[this._segments.length-1]},getCurves:function(){var t=this._curves,e=this._segments;if(!t){var i=this._countCurves();t=this._curves=new Array(i);for(var n=0;n<i;n++)t[n]=new k(this,e[n],e[n+1]||e[0])}return t},getFirstCurve:function(){return this.getCurves()[0]},getLastCurve:function(){var t=this.getCurves();return t[t.length-1]},isClosed:function(){return this._closed},setClosed:function(t){if(this._closed!=(t=!!t)){if(this._closed=t,this._curves){var e=this._curves.length=this._countCurves();t&&(this._curves[e-1]=new k(this,this._segments[e-1],this._segments[0]))}this._changed(25)}}},{beans:!0,getPathData:function(t,e){function i(e,i){if(e._transformCoordinates(t,g),n=g[0],r=g[1],v)p.push("M"+_.pair(n,r)),v=!1;else if(o=g[2],u=g[3],o===n&&u===r&&l===s&&c===a){if(!i){var h=n-s,f=r-a;p.push(0===h?"v"+_.number(f):0===f?"h"+_.number(h):"l"+_.pair(h,f))}}else p.push("c"+_.pair(l-s,c-a)+" "+_.pair(o-s,u-a)+" "+_.pair(n-s,r-a));s=n,a=r,l=g[4],c=g[5]}var n,r,s,a,o,u,l,c,f=this._segments,d=f.length,_=new h(e),g=new Array(6),v=!0,p=[];if(!d)return"";for(var m=0;m<d;m++)i(f[m]);return this._closed&&d>0&&(i(f[0],!0),p.push("z")),p.join("")},isEmpty:function(){return!this._segments.length},_transformContent:function(t){for(var e=this._segments,i=new Array(6),n=0,r=e.length;n<r;n++)e[n]._transformCoordinates(t,i,!0);return!0},_add:function(t,e){for(var i=this._segments,n=this._curves,r=t.length,s=null==e,e=s?i.length:e,a=0;a<r;a++){var o=t[a];o._path&&(o=t[a]=o.clone()),o._path=this,o._index=e+a,o._selection&&this._updateSelection(o,0,o._selection)}if(s)i.push.apply(i,t);else{i.splice.apply(i,[e,0].concat(t));for(var a=e+r,h=i.length;a<h;a++)i[a]._index=a}if(n){var u=this._countCurves(),l=e>0&&e+r-1===u?e-1:e,c=l,f=Math.min(l+r,u);t._curves&&(n.splice.apply(n,[l,0].concat(t._curves)),c+=t._curves.length);for(a=c;a<f;a++)n.splice(a,0,new k(this,null,null));this._adjustCurves(l,f)}return this._changed(25),t},_adjustCurves:function(t,e){for(var i,n=this._segments,r=this._curves,s=t;s<e;s++)(i=r[s])._path=this,i._segment1=n[s],i._segment2=n[s+1]||n[0],i._changed();(i=r[this._closed&&!t?n.length-1:t-1])&&(i._segment2=n[t]||n[0],i._changed()),(i=r[e])&&(i._segment1=n[e],i._changed())},_countCurves:function(){var t=this._segments.length;return!this._closed&&t>0?t-1:t},add:function(t){return arguments.length>1&&"number"!=typeof t?this._add(T.readList(arguments)):this._add([T.read(arguments)])[0]},insert:function(t,e){return arguments.length>2&&"number"!=typeof e?this._add(T.readList(arguments,1),t):this._add([T.read(arguments,1)],t)[0]},addSegment:function(){return this._add([T.read(arguments)])[0]},insertSegment:function(t){return this._add([T.read(arguments,1)],t)[0]},addSegments:function(t){return this._add(T.readList(t))},insertSegments:function(t,e){return this._add(T.readList(e),t)},removeSegment:function(t){return this.removeSegments(t,t+1)[0]||null},removeSegments:function(t,e,i){t=t||0,e=r.pick(e,this._segments.length);var n=this._segments,s=this._curves,a=n.length,o=n.splice(t,e-t),h=o.length;if(!h)return o;for(l=0;l<h;l++){var u=o[l];u._selection&&this._updateSelection(u,u._selection,0),u._index=u._path=null}for(var l=t,c=n.length;l<c;l++)n[l]._index=l;if(s){for(var f=t>0&&e===a+(this._closed?1:0)?t-1:t,l=(s=s.splice(f,h)).length-1;l>=0;l--)s[l]._path=null;i&&(o._curves=s.slice(1)),this._adjustCurves(f,f)}return this._changed(25),o},clear:"#removeSegments",hasHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)if(t[e].hasHandles())return!0;return!1},clearHandles:function(){for(var t=this._segments,e=0,i=t.length;e<i;e++)t[e].clearHandles()},getLength:function(){if(null==this._length){for(var t=this.getCurves(),e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();this._length=e}return this._length},getArea:function(){var t=this._area;if(null==t){var e=this._segments,i=this._closed;t=0;for(var n=0,r=e.length;n<r;n++){var s=n+1===r;t+=k.getArea(k.getValues(e[n],e[s?0:n+1],null,s&&!i))}this._area=t}return t},isFullySelected:function(){var t=this._segments.length;return this.isSelected()&&t>0&&this._segmentSelection===7*t},setFullySelected:function(t){t&&this._selectSegments(!0),this.setSelected(t)},setSelection:function t(e){1&e||this._selectSegments(!1),t.base.call(this,e)},_selectSegments:function(t){var e=this._segments,i=e.length,n=t?7:0;this._segmentSelection=n*i;for(var r=0;r<i;r++)e[r]._selection=n},_updateSelection:function(t,e,i){t._selection=i,(this._segmentSelection+=i-e)>0&&this.setSelected(!0)},divideAt:function(t){var e,i=this.getLocationAt(t);return i&&(e=i.getCurve().divideAt(i.getCurveOffset()))?e._segment1:null},splitAt:function(t){var e=this.getLocationAt(t),i=e&&e.index,n=e&&e.time;n>1-1e-8&&(i++,n=0);var r=this.getCurves();if(i>=0&&i<r.length){n>=1e-8&&r[i++].divideAtTime(n);var s,a=this.removeSegments(i,this._segments.length,!0);return this._closed?(this.setClosed(!1),s=this):((s=new L(w.NO_INSERT)).insertAbove(this),s.copyAttributes(this)),s._add(a,0),this.addSegment(a[0]),s}return null},split:function(t,i){var n,r=i===e?t:(n=this.getCurves()[t])&&n.getLocationAtTime(i);return null!=r?this.splitAt(r):null},join:function(t,e){var i=e||0;if(t&&t!==this){var n=t._segments,r=this.getLastSegment(),s=t.getLastSegment();if(!s)return this;r&&r._point.isClose(s._point,i)&&t.reverse();var a=t.getFirstSegment();if(r&&r._point.isClose(a._point,i))r.setHandleOut(a._handleOut),this._add(n.slice(1));else{var o=this.getFirstSegment();o&&o._point.isClose(a._point,i)&&t.reverse(),s=t.getLastSegment(),o&&o._point.isClose(s._point,i)?(o.setHandleIn(s._handleIn),this._add(n.slice(0,n.length-1),0)):this._add(n.slice())}t._closed&&this._add([n[0]]),t.remove()}var h=this.getFirstSegment(),u=this.getLastSegment();return h!==u&&h._point.isClose(u._point,i)&&(h.setHandleIn(u._handleIn),u.remove(),this.setClosed(!0)),this},reduce:function(t){for(var e=this.getCurves(),i=t&&t.simplify,n=i?1e-7:0,r=e.length-1;r>=0;r--){var s=e[r];!s.hasHandles()&&(!s.hasLength(n)||i&&s.isCollinear(s.getNext()))&&s.remove()}return this},reverse:function(){this._segments.reverse();for(var t=0,e=this._segments.length;t<e;t++){var i=this._segments[t],n=i._handleIn;i._handleIn=i._handleOut,i._handleOut=n,i._index=t}this._curves=null,this._changed(9)},flatten:function(t){for(var e=new B(this,t||.25,256,!0).parts,i=e.length,n=[],r=0;r<i;r++)n.push(new T(e[r].curve.slice(0,2)));!this._closed&&i>0&&n.push(new T(e[i-1].curve.slice(6))),this.setSegments(n)},simplify:function(t){var e=new D(this).fit(t||2.5);return e&&this.setSegments(e),!!e},smooth:function(t){function i(t,e){var i=t&&t.index;if(null!=i){var r=t.path;if(r&&r!==n)throw new Error(t._class+" "+i+" of "+r+" is not part of "+n);e&&t instanceof k&&i++}else i="number"==typeof t?t:e;return Math.min(i<0&&h?i%o:i<0?i+o:i,o-1)}var n=this,r=t||{},s=r.type||"asymmetric",a=this._segments,o=a.length,h=this._closed,u=h&&r.from===e&&r.to===e,l=i(r.from,0),c=i(r.to,o-1);if(l>c)if(h)l-=o;else{var f=l;l=c,c=f}if(/^(?:asymmetric|continuous)$/.test(s)){var d="asymmetric"===s,_=Math.min,g=c-l+1,v=g-1,p=u?_(g,4):1,m=p,y=p,w=[];if(h||(m=_(1,l),y=_(1,o-c-1)),(v+=m+y)<=1)return;for(var x=0,b=l-m;x<=v;x++,b++)w[x]=a[(b<0?b+o:b)%o]._point;for(var C=w[0]._x+2*w[1]._x,S=w[0]._y+2*w[1]._y,P=2,I=v-1,M=[C],T=[S],z=[P],O=[],A=[],x=1;x<v;x++){var L=x<I,N=L?1:d?1:2,B=L?4:d?2:7,D=L?4:d?3:8,j=L?2:d?0:1,E=N/P;P=z[x]=B-E,C=M[x]=D*w[x]._x+j*w[x+1]._x-E*C,S=T[x]=D*w[x]._y+j*w[x+1]._y-E*S}O[I]=M[I]/z[I],A[I]=T[I]/z[I];for(x=v-2;x>=0;x--)O[x]=(M[x]-O[x+1])/z[x],A[x]=(T[x]-A[x+1])/z[x];O[v]=(3*w[v]._x-O[I])/2,A[v]=(3*w[v]._y-A[I])/2;for(var x=m,F=v-y,b=l;x<=F;x++,b++){var R=a[b<0?b+o:b],q=R._point,V=O[x]-q._x,H=A[x]-q._y;(u||x<F)&&R.setHandleOut(V,H),(u||x>m)&&R.setHandleIn(-V,-H)}}else for(x=l;x<=c;x++)a[x<0?x+o:x].smooth(r,!u&&x===l,!u&&x===c)},toShape:function(t){function i(t,e){var i=l[t],n=i.getNext(),r=l[e],s=r.getNext();return i._handleOut.isZero()&&n._handleIn.isZero()&&r._handleOut.isZero()&&s._handleIn.isZero()&&n._point.subtract(i._point).isCollinear(s._point.subtract(r._point))}function n(t){var e=l[t],i=e.getNext(),n=e._handleOut,r=i._handleIn;if(n.isOrthogonal(r)){var s=e._point,a=i._point,o=new m(s,n,!0).intersect(new m(a,r,!0),!0);return o&&u.isZero(n.getLength()/o.subtract(s).getLength()-.5522847498307936)&&u.isZero(r.getLength()/o.subtract(a).getLength()-.5522847498307936)}return!1}function r(t,e){return l[t]._point.getDistance(l[e]._point)}if(!this._closed)return null;var s,a,o,h,l=this._segments;if(!this.hasHandles()&&4===l.length&&i(0,2)&&i(1,3)&&function(t){var e=l[t],i=e.getPrevious(),n=e.getNext();return i._handleOut.isZero()&&e._handleIn.isZero()&&e._handleOut.isZero()&&n._handleIn.isZero()&&e._point.subtract(i._point).isOrthogonal(n._point.subtract(e._point))}(1)?(s=C.Rectangle,a=new d(r(0,3),r(0,1)),h=l[1]._point.add(l[2]._point).divide(2)):8===l.length&&n(0)&&n(2)&&n(4)&&n(6)&&i(1,5)&&i(3,7)?(s=C.Rectangle,o=(a=new d(r(1,6),r(0,3))).subtract(new d(r(0,7),r(1,2))).divide(2),h=l[3]._point.add(l[4]._point).divide(2)):4===l.length&&n(0)&&n(1)&&n(2)&&n(3)&&(u.isZero(r(0,2)-r(1,3))?(s=C.Circle,o=r(0,2)/2):(s=C.Ellipse,o=new d(r(2,0)/2,r(3,1)/2)),h=l[1]._point),s){var c=this.getPosition(!0),f=new s({center:c,size:a,radius:o,insert:!1});return f.copyAttributes(this,!0),f._matrix.prepend(this._matrix),f.rotate(h.subtract(c).getAngle()+90),(t===e||t)&&f.insertAbove(this),f}return null},toPath:"#clone",compare:function t(e){if(!e||e instanceof N)return t.base.call(this,e);var i=this.getCurves(),n=e.getCurves(),r=i.length,s=n.length;if(!r||!s)return r==s;for(var a,o,h=i[0].getValues(),u=[],l=0,c=0,f=0;f<s;f++){g=n[f].getValues();if(u.push(g),v=k.getOverlaps(h,g)){a=!f&&v[0][0]>0?s-1:f,o=v[0][1];break}}for(var d,_=Math.abs,g=u[a];h&&g;){var v=k.getOverlaps(h,g);if(v&&_(v[0][0]-c)<1e-8){1===(c=v[1][0])&&(h=++l<r?i[l].getValues():null,c=0);var p=v[0][1];if(_(p-o)<1e-8){if(d||(d=[a,p]),1===(o=v[1][1])&&(++a>=s&&(a=0),g=u[a]||n[a].getValues(),o=0),!h)return d[0]===a&&d[1]===o;continue}}break}return!1},_hitTestSelf:function(t,e,i,n){function r(e,i){return t.subtract(e).divide(i).length<=1}function s(t,i,n){if(!e.selected||i.isSelected()){var s=t._point;if(i!==s&&(i=i.add(s)),r(i,x))return new M(n,g,{segment:t,point:i})}}function a(t,i){return(i||e.segments)&&s(t,t._point,"segment")||!i&&e.handles&&(s(t,t._handleIn,"handle-in")||s(t,t._handleOut,"handle-out"))}function o(t){f.add(t)}function h(e){var i=y||e._index>0&&e._index<m-1;if("round"===(i?u:l))return r(e._point,x);if(f=new L({internal:!0,closed:!0}),i?e.isSmooth()||L._addBevelJoin(e,u,P,c,null,n,o,!0):"square"===l&&L._addSquareCap(e,l,P,null,n,o,!0),!f.isEmpty()){var s;return f.contains(t)||(s=f.getNearestLocation(t))&&r(s.getPoint(),w)}}var u,l,c,f,d,_,g=this,v=this.getStyle(),p=this._segments,m=p.length,y=this._closed,w=e._tolerancePadding,x=w,b=e.stroke&&v.hasStroke(),C=e.fill&&v.hasFill(),S=e.curves,P=b?v.getStrokeWidth()/2:C&&e.tolerance>0||S?0:null;if(null!==P&&(P>0?(u=v.getStrokeJoin(),l=v.getStrokeCap(),c=v.getMiterLimit(),x=x.add(L._getStrokePadding(P,n))):u=l="round"),!e.ends||e.segments||y){if(e.segments||e.handles)for(T=0;T<m;T++)if(_=a(p[T]))return _}else if(_=a(p[0],!0)||a(p[m-1],!0))return _;if(null!==P){if(d=this.getNearestLocation(t)){var I=d.getTime();0===I||1===I&&m>1?h(d.getSegment())||(d=null):r(d.getPoint(),x)||(d=null)}if(!d&&"miter"===u&&m>1)for(var T=0;T<m;T++){var z=p[T];if(t.getDistance(z._point)<=c*P&&h(z)){d=z.getLocation();break}}}return!d&&C&&this._contains(t)||d&&!b&&!S?new M("fill",this):d?new M(b?"stroke":"curve",this,{location:d,point:d.getPoint()}):null}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this.getLocationAt(e);return i&&i[t]()}},{beans:!1,getLocationOf:function(){for(var t=c.read(arguments),e=this.getCurves(),i=0,n=e.length;i<n;i++){var r=e[i].getLocationOf(t);if(r)return r}return null},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getLocationAt:function(t){if("number"==typeof t){for(var e=this.getCurves(),i=0,n=0,r=e.length;n<r;n++){var s=i,a=e[n];if((i+=a.getLength())>t)return a.getLocationAt(t-s)}if(e.length>0&&t<=this.getLength())return new O(e[e.length-1],1)}else if(t&&t.getPath&&t.getPath()===this)return t;return null}}),new function(){function t(t,e,i,n){function r(e){var i=h[e],n=h[e+1];s==i&&a==n||(t.beginPath(),t.moveTo(s,a),t.lineTo(i,n),t.stroke(),t.beginPath(),t.arc(i,n,o,0,2*Math.PI,!0),t.fill())}for(var s,a,o=n/2,h=new Array(6),u=0,l=e.length;u<l;u++){var c=e[u],f=c._selection;if(c._transformCoordinates(i,h),s=h[0],a=h[1],2&f&&r(2),4&f&&r(4),t.fillRect(s-o,a-o,n,n),!(1&f)){var d=t.fillStyle;t.fillStyle="#ffffff",t.fillRect(s-o+1,a-o+1,n-2,n-2),t.fillStyle=d}}}function e(t,e,i){function n(e){if(i)e._transformCoordinates(i,_),r=_[0],s=_[1];else{var n=e._point;r=n._x,s=n._y}if(g)t.moveTo(r,s),g=!1;else{if(i)h=_[2],u=_[3];else{f=e._handleIn;h=r+f._x,u=s+f._y}h===r&&u===s&&l===a&&c===o?t.lineTo(r,s):t.bezierCurveTo(l,c,h,u,r,s)}if(a=r,o=s,i)l=_[4],c=_[5];else{var f=e._handleOut;l=a+f._x,c=o+f._y}}for(var r,s,a,o,h,u,l,c,f=e._segments,d=f.length,_=new Array(6),g=!0,v=0;v<d;v++)n(f[v]);e._closed&&d>0&&n(f[0])}return{_draw:function(t,i,n,r){function s(t){return c[(t%f+f)%f]}var a=i.dontStart,o=i.dontFinish||i.clip,h=this.getStyle(),u=h.hasFill(),l=h.hasStroke(),c=h.getDashArray(),f=!paper.support.nativeDash&&l&&c&&c.length;if(a||t.beginPath(),(u||l&&!f||o)&&(e(t,this,r),this._closed&&t.closePath()),!o&&(u||l)&&(this._setStyles(t,i,n),u&&(t.fill(h.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),l)){if(f){a||t.beginPath();var d,_=new B(this,.25,32,!1,r),g=_.length,v=-h.getDashOffset(),p=0;for(v%=g;v>0;)v-=s(p--)+s(p--);for(;v<g;)d=v+s(p++),(v>0||d>0)&&_.drawPart(t,Math.max(v,0),Math.max(d,0)),v=d+s(p++)}t.stroke()}},_drawSelected:function(i,n){i.beginPath(),e(i,this,n),i.stroke(),t(i,this._segments,n,paper.settings.handleSize)}}},new function(){function t(t){var e=t._segments;if(!e.length)throw new Error("Use a moveTo() command first");return e[e.length-1]}return{moveTo:function(){var t=this._segments;1===t.length&&this.removeSegment(0),t.length||this._add([new T(c.read(arguments))])},moveBy:function(){throw new Error("moveBy() is unsupported on Path items.")},lineTo:function(){this._add([new T(c.read(arguments))])},cubicCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this);r.setHandleOut(e.subtract(r._point)),this._add([new T(n,i.subtract(n))])},quadraticCurveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.cubicCurveTo(e.add(n.subtract(e).multiply(1/3)),e.add(i.subtract(e).multiply(1/3)),i)},curveTo:function(){var e=c.read(arguments),i=c.read(arguments),n=r.pick(r.read(arguments),.5),s=1-n,a=t(this)._point,o=e.subtract(a.multiply(s*s)).subtract(i.multiply(n*n)).divide(2*n*s);if(o.isNaN())throw new Error("Cannot put a curve through points with parameter = "+n);this.quadraticCurveTo(o,i)},arcTo:function(){var e,i,n,s,a=Math.abs,o=Math.sqrt,h=t(this),l=h._point,f=c.read(arguments),_=r.peek(arguments);if("boolean"==typeof(x=r.pick(_,!0)))var g=(C=l.add(f).divide(2)).add(C.subtract(l).rotate(x?-90:90));else if(r.remain(arguments)<=2)g=f,f=c.read(arguments);else{var v=d.read(arguments),y=u.isZero;if(y(v.width)||y(v.height))return this.lineTo(f);var w=r.read(arguments),x=!!r.read(arguments),b=!!r.read(arguments),C=l.add(f).divide(2),S=(W=l.subtract(C).rotate(-w)).x,P=W.y,I=a(v.width),M=a(v.height),z=I*I,k=M*M,O=S*S,A=P*P,L=o(O/z+A/k);if(L>1&&(z=(I*=L)*I,k=(M*=L)*M),L=(z*k-z*A-k*O)/(z*A+k*O),a(L)<1e-12&&(L=0),L<0)throw new Error("Cannot create an arc with the given arguments");e=new c(I*P/M,-M*S/I).multiply((b===x?-1:1)*o(L)).rotate(w).add(C),i=(n=(s=(new p).translate(e).rotate(w).scale(I,M))._inverseTransform(l)).getDirectedAngle(s._inverseTransform(f)),!x&&i>0?i-=360:x&&i<0&&(i+=360)}if(g){var N=new m(l.add(g).divide(2),g.subtract(l).rotate(90),!0),B=new m(g.add(f).divide(2),f.subtract(g).rotate(90),!0),D=new m(l,f),j=D.getSide(g);if(!(e=N.intersect(B,!0))){if(!j)return this.lineTo(f);throw new Error("Cannot create an arc with the given arguments")}i=(n=l.subtract(e)).getDirectedAngle(f.subtract(e));var E=D.getSide(e);0===E?i=j*a(i):j===E&&(i+=i<0?360:-360)}for(var F=a(i),R=F>=360?4:Math.ceil((F-1e-7)/90),q=i/R,V=q*Math.PI/360,H=4/3*Math.sin(V)/(1+Math.cos(V)),Z=[],U=0;U<=R;U++){var W=f,G=null;if(U<R&&(G=n.rotate(90).multiply(H),s?(W=s._transformPoint(n),G=s._transformPoint(n.add(G)).subtract(W)):W=e.add(n)),U){var J=n.rotate(-90).multiply(H);s&&(J=s._transformPoint(n.add(J)).subtract(W)),Z.push(new T(W,J,G))}else h.setHandleOut(G);n=n.rotate(q)}this._add(Z)},lineBy:function(){var e=c.read(arguments),i=t(this)._point;this.lineTo(i.add(e))},curveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=r.read(arguments),s=t(this)._point;this.curveTo(s.add(e),s.add(i),n)},cubicCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=c.read(arguments),r=t(this)._point;this.cubicCurveTo(r.add(e),r.add(i),r.add(n))},quadraticCurveBy:function(){var e=c.read(arguments),i=c.read(arguments),n=t(this)._point;this.quadraticCurveTo(n.add(e),n.add(i))},arcBy:function(){var e=t(this)._point,i=e.add(c.read(arguments)),n=r.pick(r.peek(arguments),!0);"boolean"==typeof n?this.arcTo(i,n):this.arcTo(i,e.add(c.read(arguments)))},closePath:function(t){this.setClosed(!0),this.join(this,t)}}},{_getBounds:function(t,e){var i=e.handle?"getHandleBounds":e.stroke?"getStrokeBounds":"getBounds";return L[i](this._segments,this._closed,this,t,e)},statics:{getBounds:function(t,e,i,n,r,s){function a(t){t._transformCoordinates(n,h);for(var e=0;e<2;e++)k._addBounds(u[e],u[e+4],h[e+2],h[e],e,s?s[e]:0,l,c,f);var i=u;u=h,h=i}var o=t[0];if(!o)return new g;for(var h=new Array(6),u=o._transformCoordinates(n,new Array(6)),l=u.slice(0,2),c=l.slice(),f=new Array(2),d=1,_=t.length;d<_;d++)a(t[d]);return e&&a(o),new g(l[0],l[1],c[0]-l[0],c[1]-l[1])},getStrokeBounds:function(t,e,i,n,r){function s(t){v=v.include(t)}function a(t){v=v.unite(x.setCenter(t._point.transform(n)))}function o(t,e){"round"===e||t.isSmooth()?a(t):L._addBevelJoin(t,e,p,w,n,f,s)}function h(t,e){"round"===e?a(t):L._addSquareCap(t,e,p,n,f,s)}var u=i.getStyle(),l=u.hasStroke(),c=u.getStrokeWidth(),f=l&&i._getStrokeMatrix(n,r),_=l&&L._getStrokePadding(c,f),v=L.getBounds(t,e,i,n,r,_);if(!l)return v;for(var p=c/2,m=u.getStrokeJoin(),y=u.getStrokeCap(),w=u.getMiterLimit(),x=new g(new d(_)),b=t.length-(e?0:1),C=1;C<b;C++)o(t[C],m);return e?o(t[0],m):b>0&&(h(t[0],y),h(t[t.length-1],y)),v},_getStrokePadding:function(t,e){if(!e)return[t,t];var i=new c(t,0).transform(e),n=new c(0,t).transform(e),r=i.getAngleInRadians(),s=i.getLength(),a=n.getLength(),o=Math.sin(r),h=Math.cos(r),u=Math.tan(r),l=Math.atan2(a*u,s),f=Math.atan2(a,u*s);return[Math.abs(s*Math.cos(l)*h+a*Math.sin(l)*o),Math.abs(a*Math.sin(f)*h+s*Math.cos(f)*o)]},_addBevelJoin:function(t,e,i,n,r,s,a,o){var h=t.getCurve(),u=h.getPrevious(),l=h.getPoint1().transform(r),f=u.getNormalAtTime(1).multiply(i).transform(s),d=h.getNormalAtTime(0).multiply(i).transform(s);if(f.getDirectedAngle(d)<0&&(f=f.negate(),d=d.negate()),o&&a(l),a(l.add(f)),"miter"===e){var _=new m(l.add(f),new c(-f.y,f.x),!0).intersect(new m(l.add(d),new c(-d.y,d.x),!0),!0);_&&l.getDistance(_)<=n*i&&a(_)}a(l.add(d))},_addSquareCap:function(t,e,i,n,r,s,a){var o=t._point.transform(n),h=t.getLocation(),u=h.getNormal().multiply(0===h.getTime()?i:-i).transform(r);"square"===e&&(a&&(s(o.subtract(u)),s(o.add(u))),o=o.add(u.rotate(-90))),s(o.add(u)),s(o.subtract(u))},getHandleBounds:function(t,e,i,n,r){var s,a,o=i.getStyle();if(r.stroke&&o.hasStroke()){var h=i._getStrokeMatrix(n,r),u=o.getStrokeWidth()/2,l=u;"miter"===o.getStrokeJoin()&&(l=u*o.getMiterLimit()),"square"===o.getStrokeCap()&&(l=Math.max(l,u*Math.SQRT2)),s=L._getStrokePadding(u,h),a=L._getStrokePadding(l,h)}for(var c=new Array(6),f=1/0,d=-f,_=f,v=d,p=0,m=t.length;p<m;p++){t[p]._transformCoordinates(n,c);for(var y=0;y<6;y+=2){var w=y?s:a,x=w?w[0]:0,b=w?w[1]:0,C=c[y],S=c[y+1],P=C-x,I=C+x,M=S-b,T=S+b;P<f&&(f=P),I>d&&(d=I),M<_&&(_=M),T>v&&(v=T)}}return new g(f,_,d-f,v-_)}}});L.inject({statics:new function(){function t(t,e,i){var n=r.getNamed(i),s=new L(n&&0==n.insert&&w.NO_INSERT);return s._add(t),s._closed=e,s.set(n,{insert:!0})}function e(e,i,r){for(var s=new Array(4),a=0;a<4;a++){var o=n[a];s[a]=new T(o._point.multiply(i).add(e),o._handleIn.multiply(i),o._handleOut.multiply(i))}return t(s,!0,r)}var i=.5522847498307936,n=[new T([-1,0],[0,i],[0,-i]),new T([0,-1],[-i,0],[i,0]),new T([1,0],[0,-i],[0,i]),new T([0,1],[i,0],[-i,0])];return{Line:function(){return t([new T(c.readNamed(arguments,"from")),new T(c.readNamed(arguments,"to"))],!1,arguments)},Circle:function(){var t=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"radius");return e(t,new d(i),arguments)},Rectangle:function(){var e,n=g.readNamed(arguments,"rectangle"),r=d.readNamed(arguments,"radius",0,{readNull:!0}),s=n.getBottomLeft(!0),a=n.getTopLeft(!0),o=n.getTopRight(!0),h=n.getBottomRight(!0);if(!r||r.isZero())e=[new T(s),new T(a),new T(o),new T(h)];else{var u=(r=d.min(r,n.getSize(!0).divide(2))).width,l=r.height,c=u*i,f=l*i;e=[new T(s.add(u,0),null,[-c,0]),new T(s.subtract(0,l),[0,f]),new T(a.add(0,l),null,[0,-f]),new T(a.add(u,0),[-c,0],null),new T(o.subtract(u,0),null,[c,0]),new T(o.add(0,l),[0,-f],null),new T(h.subtract(0,l),null,[0,f]),new T(h.subtract(u,0),[c,0])]}return t(e,!0,arguments)},RoundRectangle:"#Rectangle",Ellipse:function(){var t=C._readEllipse(arguments);return e(t.center,t.radius,arguments)},Oval:"#Ellipse",Arc:function(){var t=c.readNamed(arguments,"from"),e=c.readNamed(arguments,"through"),i=c.readNamed(arguments,"to"),n=r.getNamed(arguments),s=new L(n&&0==n.insert&&w.NO_INSERT);return s.moveTo(t),s.arcTo(e,i),s.set(n)},RegularPolygon:function(){for(var e=c.readNamed(arguments,"center"),i=r.readNamed(arguments,"sides"),n=r.readNamed(arguments,"radius"),s=360/i,a=i%3==0,o=new c(0,a?-n:n),h=a?-1:.5,u=new Array(i),l=0;l<i;l++)u[l]=new T(e.add(o.rotate((l+h)*s)));return t(u,!0,arguments)},Star:function(){for(var e=c.readNamed(arguments,"center"),i=2*r.readNamed(arguments,"points"),n=r.readNamed(arguments,"radius1"),s=r.readNamed(arguments,"radius2"),a=360/i,o=new c(0,-1),h=new Array(i),u=0;u<i;u++)h[u]=new T(e.add(o.rotate(a*u).multiply(u%2?s:n)));return t(h,!0,arguments)}}}});var N=A.extend({_class:"CompoundPath",_serializeFields:{children:[]},beans:!0,initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||("string"==typeof t?this.setPathData(t):this.addChildren(Array.isArray(t)?t:arguments))},insertChildren:function t(e,i){var n=i,s=n[0];s&&"number"==typeof s[0]&&(n=[n]);for(var a=i.length-1;a>=0;a--){var o=n[a];n!==i||o instanceof L||(n=r.slice(n)),Array.isArray(o)?n[a]=new L({segments:o,insert:!1}):o instanceof N&&(n.splice.apply(n,[a,1].concat(o.removeChildren())),o.remove())}return t.base.call(this,e,n)},reduce:function t(e){for(var i=this._children,n=i.length-1;n>=0;n--)(r=i[n].reduce(e)).isEmpty()&&r.remove();if(!i.length){var r=new L(w.NO_INSERT);return r.copyAttributes(this),r.insertAbove(this),this.remove(),r}return t.base.call(this)},isClosed:function(){for(var t=this._children,e=0,i=t.length;e<i;e++)if(!t[e]._closed)return!1;return!0},setClosed:function(t){for(var e=this._children,i=0,n=e.length;i<n;i++)e[i].setClosed(t)},getFirstSegment:function(){var t=this.getFirstChild();return t&&t.getFirstSegment()},getLastSegment:function(){var t=this.getLastChild();return t&&t.getLastSegment()},getCurves:function(){for(var t=this._children,e=[],i=0,n=t.length;i<n;i++)e.push.apply(e,t[i].getCurves());return e},getFirstCurve:function(){var t=this.getFirstChild();return t&&t.getFirstCurve()},getLastCurve:function(){var t=this.getLastChild();return t&&t.getLastCurve()},getArea:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getArea();return e},getLength:function(){for(var t=this._children,e=0,i=0,n=t.length;i<n;i++)e+=t[i].getLength();return e},getPathData:function(t,e){for(var i=this._children,n=[],r=0,s=i.length;r<s;r++){var a=i[r],o=a._matrix;n.push(a.getPathData(t&&!o.isIdentity()?t.appended(o):t,e))}return n.join("")},_hitTestChildren:function t(e,i,n){return t.base.call(this,e,i.class===L||"path"===i.type?i:r.set({},i,{fill:!1}),n)},_draw:function(t,e,i,n){var r=this._children;if(r.length){e=e.extend({dontStart:!0,dontFinish:!0}),t.beginPath();for(var s=0,a=r.length;s<a;s++)r[s].draw(t,e,n);if(!e.clip){this._setStyles(t,e,i);var o=this._style;o.hasFill()&&(t.fill(o.getFillRule()),t.shadowColor="rgba(0,0,0,0)"),o.hasStroke()&&t.stroke()}}},_drawSelected:function(t,e,i){for(var n=this._children,r=0,s=n.length;r<s;r++){var a=n[r],o=a._matrix;i[a._id]||a._drawSelected(t,o.isIdentity()?e:e.appended(o))}}},new function(){function t(t,e){var i=t._children;if(e&&!i.length)throw new Error("Use a moveTo() command first");return i[i.length-1]}return r.each(["lineTo","cubicCurveTo","quadraticCurveTo","curveTo","arcTo","lineBy","cubicCurveBy","quadraticCurveBy","curveBy","arcBy"],function(e){this[e]=function(){var i=t(this,!0);i[e].apply(i,arguments)}},{moveTo:function(){var e=t(this),i=e&&e.isEmpty()?e:new L(w.NO_INSERT);i!==e&&this.addChild(i),i.moveTo.apply(i,arguments)},moveBy:function(){var e=t(this,!0),i=e&&e.getLastSegment(),n=c.read(arguments);this.moveTo(i?n.add(i._point):n)},closePath:function(e){t(this,!0).closePath(e)}})},r.each(["reverse","flatten","simplify","smooth"],function(t){this[t]=function(e){for(var i,n=this._children,r=0,s=n.length;r<s;r++)i=n[r][t](e)||i;return i}},{}));A.inject(new function(){function t(t,e){var i=t.clone(!1).reduce({simplify:!0}).transform(null,!0,!0);return e?i.resolveCrossings().reorient("nonzero"===i.getFillRule(),!0):i}function i(t,e,i,n,r){var s=new N(w.NO_INSERT);return s.addChildren(t,!0),s=s.reduce({simplify:e}),r&&0==r.insert||s.insertAbove(n&&i.isSibling(n)&&i.getIndex()<n.getIndex()?n:i),s.copyAttributes(i,!0),s}function n(e,n,r,a){function o(t){for(var e=0,i=t.length;e<i;e++){var n=t[e];w.push.apply(w,n._segments),x.push.apply(x,n.getCurves()),n._overlapsOnly=!0}}if(a&&(0==a.trace||a.stroke)&&/^(subtract|intersect)$/.test(r))return s(e,n,r);var u=t(e,!0),c=n&&e!==n&&t(n,!0),_=p[r];_[r]=!0,c&&(_.subtract||_.exclude)^c.isClockwise()^u.isClockwise()&&c.reverse();var g,v=l(O.expand(u.getCrossings(c))),m=u._children||[u],y=c&&(c._children||[c]),w=[],x=[];if(v.length){o(m),y&&o(y);for(var b=0,C=v.length;b<C;b++)f(v[b]._segment,u,c,x,_);for(var b=0,C=w.length;b<C;b++){var S=w[b],P=S._intersection;S._winding||f(S,u,c,x,_),P&&P._overlap||(S._path._overlapsOnly=!1)}g=d(w,_)}else g=h(y?m.concat(y):m.slice(),function(t){return!!_[t]});return i(g,!0,e,n,a)}function s(e,n,r){function s(t){if(!c[t._id]&&(l||o.contains(t.getPointAt(t.getLength()/2))^u))return f.unshift(t),c[t._id]=!0}for(var a=t(e),o=t(n),h=a.getCrossings(o),u="subtract"===r,l="divide"===r,c={},f=[],d=h.length-1;d>=0;d--){var _=h[d].split();_&&(s(_)&&_.getFirstSegment().setHandleIn(0,0),a.getLastSegment().setHandleOut(0,0))}return s(a),i(f,!1,e,n)}function a(t,e){for(var i=t;i;){if(i===e)return;i=i._previous}for(;t._next&&t._next!==e;)t=t._next;if(!t._next){for(;e._previous;)e=e._previous;t._next=e,e._previous=t}}function o(t){for(var e=t.length-1;e>=0;e--)t[e].clearHandles()}function h(t,e,i){var n=t&&t.length;if(n){var s=r.each(t,function(t,e){this[t._id]={container:null,winding:t.isClockwise()?1:-1,index:e}},{}),a=t.slice().sort(function(t,e){return v(e.getArea())-v(t.getArea())}),o=a[0];null==i&&(i=o.isClockwise());for(var h=0;h<n;h++){for(var u=a[h],l=s[u._id],c=u.getInteriorPoint(),f=0,d=h-1;d>=0;d--){var _=a[d];if(_.contains(c)){var g=s[_._id];f=g.winding,l.winding+=f,l.container=g.exclude?g.container:_;break}}if(e(l.winding)===e(f))l.exclude=!0,t[l.index]=null;else{var p=l.container;u.setClockwise(p?!p.isClockwise():i)}}}return t}function l(t,e,i){function n(t){return t._path._id+"."+t._segment1._index}for(var r,s,h,u=e&&[],l=!1,c=i||[],f=i&&{},d=(i&&i.length)-1;d>=0;d--)(y=i[d])._path&&(f[n(y)]=!0);for(d=t.length-1;d>=0;d--){var _,g=t[d],v=g._time,p=v,m=e&&!e(g),y=g._curve;if(y&&(y!==s?(l=!y.hasHandles()||f&&f[n(y)],r=[],h=null,s=y):h>=1e-8&&(v/=h)),m)r&&r.push(g);else{if(e&&u.unshift(g),h=p,v<1e-8)_=y._segment1;else if(v>1-1e-8)_=y._segment2;else{var w=y.divideAtTime(v,!0);l&&c.push(y,w),_=w._segment1;for(var x=r.length-1;x>=0;x--){var b=r[x];b._time=(b._time-v)/(1-v)}}g._setSegment(_);var C=_._intersection,S=g._intersection;if(C){a(C,S);for(var P=C;P;)a(P._intersection,C),P=P._next}else _._intersection=S}}return i||o(c),u||t}function c(t,e,i,n,r){function s(s){var a=s[l+0],h=s[l+6];if(!(p<_(a,h)||p>g(a,h))){var f=s[u+0],v=s[u+2],x=s[u+4],b=s[u+6];if(a!==h){var I=p===a?0:p===h?1:y>g(f,v,x,b)||w<_(f,v,x,b)?1:k.solveCubic(s,l,p,T,0,1)>0?T[0]:1,z=0===I?f:1===I?b:k.getPoint(s,I)[i?"y":"x"],O=a>h?1:-1,A=o[l]>o[l+6]?1:-1,L=o[u+6];return p!==a?(z<y?C+=O:z>w?S+=O:P=!0,z>d-m&&z<d+m&&(M/=2)):(O!==A?f<y?C+=O:f>w&&(S+=O):f!=L&&(L<w&&z>w?(S+=O,P=!0):L>y&&z<y&&(C+=O,P=!0)),M=0),o=s,!r&&z>y&&z<w&&0===k.getTangent(s,I)[i?"x":"y"]&&c(t,e,!i,n,!0)}(f<w&&b>y||b<w&&f>y)&&(P=!0)}}function a(t){var e=t[l+0],n=t[l+2],r=t[l+4],a=t[l+6];if(p<=g(e,n,r,a)&&p>=_(e,n,r,a))for(var o,h=t[u+0],c=t[u+2],f=t[u+4],d=t[u+6],v=y>g(h,c,f,d)||w<_(h,c,f,d)?[t]:k.getMonoCurves(t,i),m=0,x=v.length;m<x;m++)if(o=s(v[m]))return o}for(var o,h,u=i?1:0,l=1^u,f=[t.x,t.y],d=f[u],p=f[l],m=1e-6,y=d-1e-9,w=d+1e-9,x=0,b=0,C=0,S=0,P=!1,I=!1,M=1,T=[],z=0,O=e.length;z<O;z++){var A,L=e[z],N=L._path,B=L.getValues();if(!(z&&e[z-1]._path===N||(o=null,N._closed||(h=k.getValues(N.getLastCurve().getSegment2(),L.getSegment1(),null,!n))[l]!==h[l+6]&&(o=h),o))){o=B;for(var D=N.getLastCurve();D&&D!==L;){var j=D.getValues();if(j[l]!==j[l+6]){o=j;break}D=D.getPrevious()}}if(A=a(B))return A;if(z+1===O||e[z+1]._path!==N){if(h&&(A=a(h)))return A;!P||C||S||(C=S=N.isClockwise(n)^i?1:-1),x+=C,b+=S,C=S=0,P&&(I=!0,P=!1),h=null}}return x=v(x),b=v(b),{winding:g(x,b),windingL:x,windingR:b,quality:M,onPath:I}}function f(t,e,i,n,r){var s=[],a=t,o=0;do{d=(y=t.getCurve()).getLength();s.push({segment:t,curve:y,length:d}),o+=d,t=t.getNext()}while(t&&!t._intersection&&t!==a);for(var h=[.5,.25,.75],l={winding:0,quality:-1},f=0;f<h.length&&l.quality<.5;f++)for(var d=o*h[f],_=0,g=s.length;_<g;_++){var p=s[_],m=p.length;if(d<=m){var y=p.curve,w=y._path,x=w._parent,b=x instanceof N?x:w,C=u.clamp(y.getTimeAt(d),1e-8,1-1e-8),S=y.getPointAtTime(C),P=v(y.getTangentAtTime(C).y)<Math.SQRT1_2,I=r.subtract&&i&&(b===e&&i._getWinding(S,P,!0).winding||b===i&&!e._getWinding(S,P,!0).winding)?{winding:0,quality:1}:c(S,n,P,!0);I.quality>l.quality&&(l=I);break}d-=m}for(_=s.length-1;_>=0;_--)s[_].segment._winding=l}function d(t,e){function i(t){var i;return!(!t||t._visited||e&&(!e[(i=t._winding||{}).winding]||e.unite&&2===i.winding&&i.windingL&&i.windingR))}function n(t){if(t)for(var e=0,i=s.length;e<i;e++)if(t===s[e])return!0;return!1}function r(t){for(var e=t._segments,i=0,n=e.length;i<n;i++)e[i]._visited=!0}var s,a=[];t.sort(function(t,e){var i=t._intersection,n=e._intersection,r=!(!i||!i._overlap),s=!(!n||!n._overlap),a=t._path,o=e._path;return r^s?r?1:-1:!i^!n?i?1:-1:a!==o?a._id-o._id:t._index-e._index});for(var o=0,h=t.length;o<h;o++){var u,l,c,f=t[o],d=i(f),_=null,g=!1,v=!0,p=[];if(d&&f._path._overlapsOnly){var m=f._path,y=f._intersection._segment._path;m.compare(y)&&(m.getArea()&&a.push(m.clone(!1)),r(m),r(y),d=!1)}for(;d;){var x=!_,b=function(t,e){function r(r,a){for(;r&&r!==a;){var o=r._segment,u=o&&o._path;if(u){var l=o.getNext()||u.getFirstSegment(),c=l._intersection;o!==t&&(n(o)||n(l)||l&&i(o)&&(i(l)||c&&i(c._segment)))&&h.push(o),e&&s.push(o)}r=r._next}}var a=t._intersection,o=a,h=[];if(e&&(s=[t]),a){for(r(a);a&&a._prev;)a=a._prev;r(a,o)}return h}(f,x),C=b.shift(),S=!(g=!x&&(n(f)||n(C)))&&C;if(x&&(_=new L(w.NO_INSERT),u=null),g){(f.isFirst()||f.isLast())&&(v=f._path._closed),f._visited=!0;break}if(S&&u&&(p.push(u),u=null),u||(S&&b.push(f),u={start:_._segments.length,crossings:b,visited:l=[],handleIn:c}),S&&(f=C),!i(f)){_.removeSegments(u.start);for(var P=0,I=l.length;P<I;P++)l[P]._visited=!1;l.length=0;do{(f=u&&u.crossings.shift())&&f._path||(f=null,(u=p.pop())&&(l=u.visited,c=u.handleIn))}while(u&&!i(f));if(!f)break}var M=f.getNext();_.add(new T(f._point,c,M&&f._handleOut)),f._visited=!0,l.push(f),f=M||f._path.getFirstSegment(),c=M&&M._handleIn}g&&(v&&(_.getFirstSegment().setHandleIn(c),_.setClosed(v)),0!==_.getArea()&&a.push(_))}return a}var _=Math.min,g=Math.max,v=Math.abs,p={unite:{1:!0,2:!0},intersect:{2:!0},subtract:{1:!0},exclude:{1:!0,"-1":!0}};return{_getWinding:function(t,e,i){return c(t,this.getCurves(),e,i)},unite:function(t,e){return n(this,t,"unite",e)},intersect:function(t,e){return n(this,t,"intersect",e)},subtract:function(t,e){return n(this,t,"subtract",e)},exclude:function(t,e){return n(this,t,"exclude",e)},divide:function(t,e){return e&&(0==e.trace||e.stroke)?s(this,t,"divide"):i([this.subtract(t,e),this.intersect(t,e)],!0,this,t,e)},resolveCrossings:function(){function t(t,e){var i=t&&t._intersection;return i&&i._overlap&&i._path===e}var e=this._children,i=e||[this],n=!1,s=!1,a=this.getIntersections(null,function(t){return t.hasOverlap()&&(n=!0)||t.isCrossing()&&(s=!0)}),h=n&&s&&[];if(a=O.expand(a),n)for(var u=l(a,function(t){return t.hasOverlap()},h),c=u.length-1;c>=0;c--){var f=u[c],_=f._path,g=f._segment,v=g.getPrevious(),p=g.getNext();t(v,_)&&t(p,_)&&(g.remove(),v._handleOut._set(0,0),p._handleIn._set(0,0),v===g||v.getCurve().hasLength()||(p._handleIn.set(v._handleIn),v.remove()))}s&&(l(a,n&&function(t){var e=t.getCurve(),i=t.getSegment(),n=t._intersection,r=n._curve,s=n._segment;if(e&&r&&e._path&&r._path)return!0;i&&(i._intersection=null),s&&(s._intersection=null)},h),h&&o(h),i=d(r.each(i,function(t){this.push.apply(this,t._segments)},[])));var m,y=i.length;return y>1&&e?(i!==e&&this.setChildren(i),m=this):1!==y||e||(i[0]!==this&&this.setSegments(i[0].removeSegments()),m=this),m||((m=new N(w.NO_INSERT)).addChildren(i),(m=m.reduce()).copyAttributes(this),this.replaceWith(m)),m},reorient:function(t,i){var n=this._children;return n&&n.length?this.setChildren(h(this.removeChildren(),function(e){return!!(t?e:1&e)},i)):i!==e&&this.setClockwise(i),this},getInteriorPoint:function(){var t=this.getBounds().getCenter(!0);if(!this.contains(t)){for(var e=this.getCurves(),i=t.y,n=[],r=[],s=0,a=e.length;s<a;s++){var o=e[s].getValues(),h=o[1],u=o[3],l=o[5],c=o[7];if(i>=_(h,u,l,c)&&i<=g(h,u,l,c))for(var f=k.getMonoCurves(o),d=0,v=f.length;d<v;d++){var p=f[d],m=p[1],y=p[7];if(m!==y&&(i>=m&&i<=y||i>=y&&i<=m)){var w=i===m?p[0]:i===y?p[6]:1===k.solveCubic(p,1,i,r,0,1)?k.getPoint(p,r[0]).x:(p[0]+p[6])/2;n.push(w)}}}n.length>1&&(n.sort(function(t,e){return t-e}),t.x=(n[0]+n[1])/2)}return t}}});var B=r.extend({_class:"PathFlattener",initialize:function(t,e,i,n,r){function s(t,e){var i=k.getValues(t,e,r);h.push(i),a(i,t._index,0,1)}function a(t,i,r,s){if(!(s-r>c)||n&&k.isStraight(t)||k.isFlatEnough(t,e||.25)){var o=t[6]-t[0],h=t[7]-t[1],f=Math.sqrt(o*o+h*h);f>0&&(l+=f,u.push({offset:l,curve:t,index:i,time:s}))}else{var d=k.subdivide(t,.5),_=(r+s)/2;a(d[0],i,r,_),a(d[1],i,_,s)}}for(var o,h=[],u=[],l=0,c=1/(i||32),f=t._segments,d=f[0],_=1,g=f.length;_<g;_++)s(d,o=f[_]),d=o;t._closed&&s(o,f[0]),this.curves=h,this.parts=u,this.length=l,this.index=0},_get:function(t){for(var e,i=this.parts,n=i.length,r=this.index;e=r,r&&!(i[--r].offset<t););for(;e<n;e++){var s=i[e];if(s.offset>=t){this.index=e;var a=i[e-1],o=a&&a.index===s.index?a.time:0,h=a?a.offset:0;return{index:s.index,time:o+(s.time-o)*(t-h)/(s.offset-h)}}}return{index:i[n-1].index,time:1}},drawPart:function(t,e,i){for(var n=this._get(e),r=this._get(i),s=n.index,a=r.index;s<=a;s++){var o=k.getPart(this.curves[s],s===n.index?n.time:0,s===r.index?r.time:1);s===n.index&&t.moveTo(o[0],o[1]),t.bezierCurveTo.apply(t,o.slice(2))}}},r.each(k._evaluateMethods,function(t){this[t+"At"]=function(e){var i=this._get(e);return k[t](this.curves[i.index],i.time)}},{})),D=r.extend({initialize:function(t){for(var e,i=this.points=[],n=t._segments,r=t._closed,s=0,a=n.length;s<a;s++){var o=n[s].point;e&&e.equals(o)||i.push(e=o.clone())}r&&(i.unshift(i[i.length-1]),i.push(i[1])),this.closed=r},fit:function(t){var e=this.points,i=e.length,n=null;return i>0&&(n=[new T(e[0])],i>1&&(this.fitCubic(n,t,0,i-1,e[1].subtract(e[0]),e[i-2].subtract(e[i-1])),this.closed&&(n.shift(),n.pop()))),n},fitCubic:function(t,e,i,n,r,s){var a=this.points;if(n-i!=1){for(var o,h=this.chordLengthParameterize(i,n),u=Math.max(e,e*e),l=!0,c=0;c<=4;c++){var f=this.generateBezier(i,n,h,r,s),d=this.findMaxError(i,n,f,h);if(d.error<e&&l)return void this.addCurve(t,f);if(o=d.index,d.error>=u)break;l=this.reparameterize(i,n,h,f),u=d.error}var _=a[o-1].subtract(a[o+1]);this.fitCubic(t,e,i,o,r,_),this.fitCubic(t,e,o,n,_.negate(),s)}else{var g=a[i],v=a[n],p=g.getDistance(v)/3;this.addCurve(t,[g,g.add(r.normalize(p)),v.add(s.normalize(p)),v])}},addCurve:function(t,e){t[t.length-1].setHandleOut(e[1].subtract(e[0])),t.push(new T(e[3],e[2].subtract(e[3])))},generateBezier:function(t,e,i,n,r){for(var s=Math.abs,a=this.points,o=a[t],h=a[e],u=[[0,0],[0,0]],l=[0,0],c=0,f=e-t+1;c<f;c++){var d=i[c],_=1-d,g=3*d*_,v=_*_*_,p=g*_,m=g*d,y=d*d*d,w=n.normalize(p),x=r.normalize(m),b=a[t+c].subtract(o.multiply(v+p)).subtract(h.multiply(m+y));u[0][0]+=w.dot(w),u[0][1]+=w.dot(x),u[1][0]=u[0][1],u[1][1]+=x.dot(x),l[0]+=w.dot(b),l[1]+=x.dot(b)}var C,S,P=u[0][0]*u[1][1]-u[1][0]*u[0][1];if(s(P)>1e-12){var I=u[0][0]*l[1]-u[1][0]*l[0];C=(l[0]*u[1][1]-l[1]*u[0][1])/P,S=I/P}else{var M=u[0][0]+u[0][1],T=u[1][0]+u[1][1];C=S=s(M)>1e-12?l[0]/M:s(T)>1e-12?l[1]/T:0}var z,k,O=h.getDistance(o),A=1e-12*O;if(C<A||S<A)C=S=O/3;else{var L=h.subtract(o);z=n.normalize(C),k=r.normalize(S),z.dot(L)-k.dot(L)>O*O&&(C=S=O/3,z=k=null)}return[o,o.add(z||n.normalize(C)),h.add(k||r.normalize(S)),h]},reparameterize:function(t,e,i,n){for(r=t;r<=e;r++)i[r-t]=this.findRoot(n,this.points[r],i[r-t]);for(var r=1,s=i.length;r<s;r++)if(i[r]<=i[r-1])return!1;return!0},findRoot:function(t,e,i){for(var n=[],r=[],s=0;s<=2;s++)n[s]=t[s+1].subtract(t[s]).multiply(3);for(s=0;s<=1;s++)r[s]=n[s+1].subtract(n[s]).multiply(2);var a=this.evaluate(3,t,i),o=this.evaluate(2,n,i),h=this.evaluate(1,r,i),l=a.subtract(e),c=o.dot(o)+l.dot(h);return u.isZero(c)?i:i-l.dot(o)/c},evaluate:function(t,e,i){for(var n=e.slice(),r=1;r<=t;r++)for(var s=0;s<=t-r;s++)n[s]=n[s].multiply(1-i).add(n[s+1].multiply(i));return n[0]},chordLengthParameterize:function(t,e){for(var i=[0],n=t+1;n<=e;n++)i[n-t]=i[n-t-1]+this.points[n].getDistance(this.points[n-1]);for(var n=1,r=e-t;n<=r;n++)i[n]/=i[r];return i},findMaxError:function(t,e,i,n){for(var r=Math.floor((e-t+1)/2),s=0,a=t+1;a<e;a++){var o=this.evaluate(3,i,n[a-t]).subtract(this.points[a]),h=o.x*o.x+o.y*o.y;h>=s&&(s=h,r=a)}return{error:s,index:r}}}),j=w.extend({_class:"TextItem",_applyMatrix:!1,_canApplyMatrix:!1,_serializeFields:{content:null},_boundsOptions:{stroke:!1,handle:!1},initialize:function(t){this._content="",this._lines=[];var i=t&&r.isPlainObject(t)&&t.x===e&&t.y===e;this._initialize(i&&t,!i&&c.read(arguments))},_equals:function(t){return this._content===t._content},copyContent:function(t){this.setContent(t._content)},getContent:function(){return this._content},setContent:function(t){this._content=""+t,this._lines=this._content.split(/\r\n|\n|\r/gm),this._changed(265)},isEmpty:function(){return!this._content},getCharacterStyle:"#getStyle",setCharacterStyle:"#setStyle",getParagraphStyle:"#getStyle",setParagraphStyle:"#setStyle"}),E=j.extend({_class:"PointText",initialize:function(){j.apply(this,arguments)},getPoint:function(){var t=this._matrix.getTranslation();return new f(t.x,t.y,this,"setPoint")},setPoint:function(){var t=c.read(arguments);this.translate(t.subtract(this._matrix.getTranslation()))},_draw:function(t,e,i){if(this._content){this._setStyles(t,e,i);var n=this._lines,r=this._style,s=r.hasFill(),a=r.hasStroke(),o=r.getLeading(),h=t.shadowColor;t.font=r.getFontStyle(),t.textAlign=r.getJustification();for(var u=0,l=n.length;u<l;u++){t.shadowColor=h;var c=n[u];s&&(t.fillText(c,0,0),t.shadowColor="rgba(0,0,0,0)"),a&&t.strokeText(c,0,0),t.translate(0,o)}}},_getBounds:function(t,e){var i=this._style,n=this._lines,r=n.length,s=i.getJustification(),a=i.getLeading(),o=this.getView().getTextWidth(i.getFontStyle(),n),h=0;"left"!==s&&(h-=o/("center"===s?2:1));var u=new g(h,r?-.75*a:0,o,r*a);return t?t._transformBounds(u,u):u}}),F=r.extend(new function(){function t(t){var n,r=t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);if(r){n=[0,0,0];for(s=0;s<3;s++){h=r[s+1];n[s]=parseInt(1==h.length?h+h:h,16)/255}}else if(r=t.match(/^rgba?\((.*)\)$/))for(var s=0,o=(n=r[1].split(",")).length;s<o;s++){var h=+n[s];n[s]=s<3?h/255:h}else if(i){var u=a[t];if(!u){e||((e=Q.getContext(1,1)).globalCompositeOperation="copy"),e.fillStyle="rgba(0,0,0,0)",e.fillStyle=t,e.fillRect(0,0,1,1);var l=e.getImageData(0,0,1,1).data;u=a[t]=[l[0]/255,l[1]/255,l[2]/255]}n=u.slice()}else n=[0,0,0];return n}var e,n={gray:["gray"],rgb:["red","green","blue"],hsb:["hue","saturation","brightness"],hsl:["hue","saturation","lightness"],gradient:["gradient","origin","destination","highlight"]},s={},a={},o=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]],u={"rgb-hsb":function(t,e,i){var n=Math.max(t,e,i),r=n-Math.min(t,e,i);return[0===r?0:60*(n==t?(e-i)/r+(e<i?6:0):n==e?(i-t)/r+2:(t-e)/r+4),0===n?0:r/n,n]},"hsb-rgb":function(t,e,i){t=(t/60%6+6)%6;var n=Math.floor(t),r=t-n,s=[i,i*(1-e),i*(1-e*r),i*(1-e*(1-r))];return[s[(n=o[n])[0]],s[n[1]],s[n[2]]]},"rgb-hsl":function(t,e,i){var n=Math.max(t,e,i),r=Math.min(t,e,i),s=n-r,a=0===s,o=(n+r)/2;return[a?0:60*(n==t?(e-i)/s+(e<i?6:0):n==e?(i-t)/s+2:(t-e)/s+4),a?0:o<.5?s/(n+r):s/(2-n-r),o]},"hsl-rgb":function(t,e,i){if(t=(t/360%1+1)%1,0===e)return[i,i,i];for(var n=[t+1/3,t,t-1/3],r=i<.5?i*(1+e):i+e-i*e,s=2*i-r,a=[],o=0;o<3;o++){var h=n[o];h<0&&(h+=1),h>1&&(h-=1),a[o]=6*h<1?s+6*(r-s)*h:2*h<1?r:3*h<2?s+(r-s)*(2/3-h)*6:s}return a},"rgb-gray":function(t,e,i){return[.2989*t+.587*e+.114*i]},"gray-rgb":function(t){return[t,t,t]},"gray-hsb":function(t){return[0,0,t]},"gray-hsl":function(t){return[0,0,t]},"gradient-rgb":function(){return[]},"rgb-gradient":function(){return[]}};return r.each(n,function(t,e){s[e]=[],r.each(t,function(t,i){var a=r.capitalize(t),o=/^(hue|saturation)$/.test(t),h=s[e][i]="gradient"===t?function(t){var e=this._components[0];return t=R.read(Array.isArray(t)?t:arguments,0,{readNull:!0}),e!==t&&(e&&e._removeOwner(this),t&&t._addOwner(this)),t}:"gradient"===e?function(){return c.read(arguments,0,{readNull:"highlight"===t,clone:!0})}:function(t){return null==t||isNaN(t)?0:t};this["get"+a]=function(){return this._type===e||o&&/^hs[bl]$/.test(this._type)?this._components[i]:this._convert(e)[i]},this["set"+a]=function(t){this._type===e||o&&/^hs[bl]$/.test(this._type)||(this._components=this._convert(e),this._properties=n[e],this._type=e),this._components[i]=h.call(this,t),this._changed()}},this)},{_class:"Color",_readIndex:!0,initialize:function e(i){var a,o,h,u,l=arguments,c=this.__read,f=0;Array.isArray(i)&&(i=(l=i)[0]);var d=null!=i&&typeof i;if("string"===d&&i in n&&(a=i,i=l[1],Array.isArray(i)?(o=i,h=l[2]):(c&&(f=1),l=r.slice(l,1),d=typeof i)),!o){if(u="number"===d?l:"object"===d&&null!=i.length?i:null){a||(a=u.length>=3?"rgb":"gray");var _=n[a].length;h=u[_],c&&(f+=u===arguments?_+(null!=h?1:0):1),u.length>_&&(u=r.slice(u,0,_))}else if("string"===d)a="rgb",4===(o=t(i)).length&&(h=o[3],o.length--);else if("object"===d)if(i.constructor===e){if(a=i._type,o=i._components.slice(),h=i._alpha,"gradient"===a)for(var g=1,v=o.length;g<v;g++){var p=o[g];p&&(o[g]=p.clone())}}else if(i.constructor===R)a="gradient",u=l;else{var m=n[a="hue"in i?"lightness"in i?"hsl":"hsb":"gradient"in i||"stops"in i||"radial"in i?"gradient":"gray"in i?"gray":"rgb"],y=s[a];this._components=o=[];for(var g=0,v=m.length;g<v;g++)null==(w=i[m[g]])&&!g&&"gradient"===a&&"stops"in i&&(w={stops:i.stops,radial:i.radial}),null!=(w=y[g].call(this,w))&&(o[g]=w);h=i.alpha}c&&a&&(f=1)}if(this._type=a||"rgb",!o){this._components=o=[];for(var g=0,v=(y=s[this._type]).length;g<v;g++){var w=y[g].call(this,u&&u[g]);null!=w&&(o[g]=w)}}return this._components=o,this._properties=n[this._type],this._alpha=h,c&&(this.__read=f),this},set:"#initialize",_serialize:function(t,e){var i=this.getComponents();return r.serialize(/^(gray|rgb)$/.test(this._type)?i:[this._type].concat(i),t,!0,e)},_changed:function(){this._canvasStyle=null,this._owner&&this._owner._changed(65)},_convert:function(t){var e;return this._type===t?this._components.slice():(e=u[this._type+"-"+t])?e.apply(this,this._components):u["rgb-"+t].apply(this,u[this._type+"-rgb"].apply(this,this._components))},convert:function(t){return new F(t,this._convert(t),this._alpha)},getType:function(){return this._type},setType:function(t){this._components=this._convert(t),this._properties=n[t],this._type=t},getComponents:function(){var t=this._components.slice();return null!=this._alpha&&t.push(this._alpha),t},getAlpha:function(){return null!=this._alpha?this._alpha:1},setAlpha:function(t){this._alpha=null==t?null:Math.min(Math.max(t,0),1),this._changed()},hasAlpha:function(){return null!=this._alpha},equals:function(t){var e=r.isPlainValue(t,!0)?F.read(arguments):t;return e===this||e&&this._class===e._class&&this._type===e._type&&this.getAlpha()===e.getAlpha()&&r.equals(this._components,e._components)||!1},toString:function(){for(var t=this._properties,e=[],i="gradient"===this._type,n=h.instance,r=0,s=t.length;r<s;r++){var a=this._components[r];null!=a&&e.push(t[r]+": "+(i?a:n.number(a)))}return null!=this._alpha&&e.push("alpha: "+n.number(this._alpha)),"{ "+e.join(", ")+" }"},toCSS:function(t){function e(t){return Math.round(255*(t<0?0:t>1?1:t))}var i=this._convert("rgb"),n=t||null==this._alpha?1:this._alpha;return i=[e(i[0]),e(i[1]),e(i[2])],n<1&&i.push(n<0?0:n),t?"#"+((1<<24)+(i[0]<<16)+(i[1]<<8)+i[2]).toString(16).slice(1):(4==i.length?"rgba(":"rgb(")+i.join(",")+")"},toCanvasStyle:function(t,e){if(this._canvasStyle)return this._canvasStyle;if("gradient"!==this._type)return this._canvasStyle=this.toCSS();var i,n=this._components,r=n[0],s=r._stops,a=n[1],o=n[2],h=n[3],u=e&&e.inverted();if(u&&(a=u._transformPoint(a),o=u._transformPoint(o),h&&(h=u._transformPoint(h))),r._radial){var l=o.getDistance(a);if(h){var c=h.subtract(a);c.getLength()>l&&(h=a.add(c.normalize(l-.1)))}var f=h||a;i=t.createRadialGradient(f.x,f.y,0,a.x,a.y,l)}else i=t.createLinearGradient(a.x,a.y,o.x,o.y);for(var d=0,_=s.length;d<_;d++){var g=s[d],v=g._offset;i.addColorStop(null==v?d/(_-1):v,g._color.toCanvasStyle())}return this._canvasStyle=i},transform:function(t){if("gradient"===this._type){for(var e=this._components,i=1,n=e.length;i<n;i++){var r=e[i];t._transformPoint(r,r,!0)}this._changed()}},statics:{_types:n,random:function(){var t=Math.random;return new F(t(),t(),t())}}})},new function(){var t={add:function(t,e){return t+e},subtract:function(t,e){return t-e},multiply:function(t,e){return t*e},divide:function(t,e){return t/e}};return r.each(t,function(t,e){this[e]=function(e){e=F.read(arguments);for(var i=this._type,n=this._components,r=e._convert(i),s=0,a=n.length;s<a;s++)r[s]=t(n[s],r[s]);return new F(i,r,null!=this._alpha?t(this._alpha,e.getAlpha()):null)}},{})}),R=r.extend({_class:"Gradient",initialize:function(t,e){this._id=l.get(),t&&r.isPlainObject(t)&&(this.set(t),t=e=null),null==this._stops&&this.setStops(t||["white","black"]),null==this._radial&&this.setRadial("string"==typeof e&&"radial"===e||e||!1)},_serialize:function(t,e){return e.add(this,function(){return r.serialize([this._stops,this._radial],t,!0,e)})},_changed:function(){for(var t=0,e=this._owners&&this._owners.length;t<e;t++)this._owners[t]._changed()},_addOwner:function(t){this._owners||(this._owners=[]),this._owners.push(t)},_removeOwner:function(t){var i=this._owners?this._owners.indexOf(t):-1;-1!=i&&(this._owners.splice(i,1),this._owners.length||(this._owners=e))},clone:function(){for(var t=[],e=0,i=this._stops.length;e<i;e++)t[e]=this._stops[e].clone();return new R(t,this._radial)},getStops:function(){return this._stops},setStops:function(t){if(t.length<2)throw new Error("Gradient stop list needs to contain at least two stops.");var i=this._stops;if(i)for(var n=0,r=i.length;n<r;n++)i[n]._owner=e;for(var n=0,r=(i=this._stops=q.readList(t,0,{clone:!0})).length;n<r;n++)i[n]._owner=this;this._changed()},getRadial:function(){return this._radial},setRadial:function(t){this._radial=t,this._changed()},equals:function(t){if(t===this)return!0;if(t&&this._class===t._class){var e=this._stops,i=t._stops,n=e.length;if(n===i.length){for(var r=0;r<n;r++)if(!e[r].equals(i[r]))return!1;return!0}}return!1}}),q=r.extend({_class:"GradientStop",initialize:function(t,i){var n=t,r=i;"object"==typeof t&&i===e&&(Array.isArray(t)&&"number"!=typeof t[0]?(n=t[0],r=t[1]):("color"in t||"offset"in t||"rampPoint"in t)&&(n=t.color,r=t.offset||t.rampPoint||0)),this.setColor(n),this.setOffset(r)},clone:function(){return new q(this._color.clone(),this._offset)},_serialize:function(t,e){var i=this._color,n=this._offset;return r.serialize(null==n?[i]:[i,n],t,!0,e)},_changed:function(){this._owner&&this._owner._changed(65)},getOffset:function(){return this._offset},setOffset:function(t){this._offset=t,this._changed()},getRampPoint:"#getOffset",setRampPoint:"#setOffset",getColor:function(){return this._color},setColor:function(){var t=F.read(arguments,0,{clone:!0});t&&(t._owner=this),this._color=t,this._changed()},equals:function(t){return t===this||t&&this._class===t._class&&this._color.equals(t._color)&&this._offset==t._offset||!1}}),V=r.extend(new function(){var t={fillColor:null,fillRule:"nonzero",strokeColor:null,strokeWidth:1,strokeCap:"butt",strokeJoin:"miter",strokeScaling:!0,miterLimit:10,dashOffset:0,dashArray:[],shadowColor:null,shadowBlur:0,shadowOffset:new c,selectedColor:null},i=r.set({},t,{fontFamily:"sans-serif",fontWeight:"normal",fontSize:12,leading:null,justification:"left"}),n=r.set({},i,{fillColor:new F}),s={strokeWidth:97,strokeCap:97,strokeJoin:97,strokeScaling:105,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},a={beans:!0},o={_class:"Style",beans:!0,initialize:function(e,r,s){this._values={},this._owner=r,this._project=r&&r._project||s||paper.project,this._defaults=!r||r instanceof x?i:r instanceof j?n:t,e&&this.set(e)}};return r.each(i,function(t,i){var n=/Color$/.test(i),h="shadowOffset"===i,u=r.capitalize(i),l=s[i],f="set"+u,d="get"+u;o[f]=function(t){var r=this._owner,s=r&&r._children;if(s&&s.length>0&&!(r instanceof N))for(var a=0,o=s.length;a<o;a++)s[a]._style[f](t);else if(i in this._defaults){var h=this._values[i];h!==t&&(n&&(h&&h._owner!==e&&(h._owner=e),t&&t.constructor===F&&(t._owner&&(t=t.clone()),t._owner=r)),this._values[i]=t,r&&r._changed(l||65))}},o[d]=function(t){var s,a=this._owner,o=a&&a._children;if(i in this._defaults&&(!o||!o.length||t||a instanceof N))if((s=this._values[i])===e)(s=this._defaults[i])&&s.clone&&(s=s.clone());else{var u=n?F:h?c:null;!u||s&&s.constructor===u||(this._values[i]=s=u.read([s],0,{readNull:!0,clone:!0}),s&&n&&(s._owner=a))}else if(o)for(var l=0,f=o.length;l<f;l++){var _=o[l]._style[d]();if(l){if(!r.equals(s,_))return e}else s=_}return s},a[d]=function(t){return this._style[d](t)},a[f]=function(t){this._style[f](t)}}),r.each({Font:"FontFamily",WindingRule:"FillRule"},function(t,e){var i="get"+e,n="set"+e;o[i]=a[i]="#get"+t,o[n]=a[n]="#set"+t}),w.inject(a),o},{set:function(t){var e=t instanceof V,i=e?t._values:t;if(i)for(var n in i)if(n in this._defaults){var r=i[n];this[n]=r&&e&&r.clone?r.clone():r}},equals:function(t){function i(t,i,n){var s=t._values,a=i._values,o=i._defaults;for(var h in s){var u=s[h],l=a[h];if(!(n&&h in a||r.equals(u,l===e?o[h]:l)))return!1}return!0}return t===this||t&&this._class===t._class&&i(this,t)&&i(t,this,!0)||!1},hasFill:function(){var t=this.getFillColor();return!!t&&t.alpha>0},hasStroke:function(){var t=this.getStrokeColor();return!!t&&t.alpha>0&&this.getStrokeWidth()>0},hasShadow:function(){var t=this.getShadowColor();return!!t&&t.alpha>0&&(this.getShadowBlur()>0||!this.getShadowOffset().isZero())},getView:function(){return this._project._view},getFontStyle:function(){var t=this.getFontSize();return this.getFontWeight()+" "+t+(/[a-z]/i.test(t+"")?" ":"px ")+this.getFontFamily()},getFont:"#getFontFamily",setFont:"#setFontFamily",getLeading:function t(){var e=t.base.call(this),i=this.getFontSize();return/pt|em|%|px/.test(i)&&(i=this.getView().getPixelSize(i)),null!=e?e:1.2*i}}),H=new function(){function t(t,e,i,n){for(var r=["","webkit","moz","Moz","ms","o"],s=e[0].toUpperCase()+e.substring(1),a=0;a<6;a++){var o=r[a],h=o?o+s:e;if(h in t){if(!i)return t[h];t[h]=n;break}}}return{getStyles:function(t){var e=t&&9!==t.nodeType?t.ownerDocument:t,i=e&&e.defaultView;return i&&i.getComputedStyle(t,"")},getBounds:function(t,e){var i,n=t.ownerDocument,r=n.body,s=n.documentElement;try{i=t.getBoundingClientRect()}catch(t){i={left:0,top:0,width:0,height:0}}var a=i.left-(s.clientLeft||r.clientLeft||0),o=i.top-(s.clientTop||r.clientTop||0);if(!e){var h=n.defaultView;a+=h.pageXOffset||s.scrollLeft||r.scrollLeft,o+=h.pageYOffset||s.scrollTop||r.scrollTop}return new g(a,o,i.width,i.height)},getViewportBounds:function(t){var e=t.ownerDocument,i=e.defaultView,n=e.documentElement;return new g(0,0,i.innerWidth||n.clientWidth,i.innerHeight||n.clientHeight)},getOffset:function(t,e){return H.getBounds(t,e).getPoint()},getSize:function(t){return H.getBounds(t,!0).getSize()},isInvisible:function(t){return H.getSize(t).equals(new d(0,0))},isInView:function(t){return!H.isInvisible(t)&&H.getViewportBounds(t).intersects(H.getBounds(t,!0))},isInserted:function(t){return n.body.contains(t)},getPrefixed:function(e,i){return e&&t(e,i)},setPrefixed:function(e,i,n){if("object"==typeof i)for(var r in i)t(e,r,!0,i[r]);else t(e,i,!0,n)}}},Z={add:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.addEventListener(r[s],n,!1)},remove:function(t,e){if(t)for(var i in e)for(var n=e[i],r=i.split(/[\s,]+/g),s=0,a=r.length;s<a;s++)t.removeEventListener(r[s],n,!1)},getPoint:function(t){var e=t.targetTouches?t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0]:t;return new c(e.pageX||e.clientX+n.documentElement.scrollLeft,e.pageY||e.clientY+n.documentElement.scrollTop)},getTarget:function(t){return t.target||t.srcElement},getRelatedTarget:function(t){return t.relatedTarget||t.toElement},getOffset:function(t,e){return Z.getPoint(t).subtract(H.getOffset(e||Z.getTarget(t)))}};Z.requestAnimationFrame=new function(){function t(){var e=s;s=[];for(var i=0,a=e.length;i<a;i++)e[i]();(r=n&&s.length)&&n(t)}var e,n=H.getPrefixed(i,"requestAnimationFrame"),r=!1,s=[];return function(i){s.push(i),n?r||(n(t),r=!0):e||(e=setInterval(t,1e3/60))}};var U=r.extend(s,{_class:"View",initialize:function t(e,r){function s(t){return r[t]||parseInt(r.getAttribute(t),10)}function o(){var t=H.getSize(r);return t.isNaN()||t.isZero()?new d(s("width"),s("height")):t}var h;if(i&&r){this._id=r.getAttribute("id"),null==this._id&&r.setAttribute("id",this._id="view-"+t._id++),Z.add(r,this._viewEvents);if(H.setPrefixed(r.style,{userDrag:"none",userSelect:"none",touchCallout:"none",contentZooming:"none",tapHighlightColor:"rgba(0,0,0,0)"}),a.hasAttribute(r,"resize")){var u=this;Z.add(i,this._windowEvents={resize:function(){u.setViewSize(o())}})}if(h=o(),a.hasAttribute(r,"stats")&&"undefined"!=typeof Stats){this._stats=new Stats;var l=this._stats.domElement,c=l.style,f=H.getOffset(r);c.position="absolute",c.left=f.x+"px",c.top=f.y+"px",n.body.appendChild(l)}}else h=new d(r),r=null;this._project=e,this._scope=e._scope,this._element=r,this._pixelRatio||(this._pixelRatio=i&&i.devicePixelRatio||1),this._setElementSize(h.width,h.height),this._viewSize=h,t._views.push(this),t._viewsById[this._id]=this,(this._matrix=new p)._owner=this,t._focused||(t._focused=this),this._frameItems={},this._frameItemCount=0,this._itemEvents={native:{},virtual:{}},this._autoUpdate=!paper.agent.node,this._needsUpdate=!1},remove:function(){if(!this._project)return!1;U._focused===this&&(U._focused=null),U._views.splice(U._views.indexOf(this),1),delete U._viewsById[this._id];var t=this._project;return t._view===this&&(t._view=null),Z.remove(this._element,this._viewEvents),Z.remove(i,this._windowEvents),this._element=this._project=null,this.off("frame"),this._animate=!1,this._frameItems={},!0},_events:r.each(w._itemHandlers.concat(["onResize","onKeyDown","onKeyUp"]),function(t){this[t]={}},{onFrame:{install:function(){this.play()},uninstall:function(){this.pause()}}}),_animate:!1,_time:0,_count:0,getAutoUpdate:function(){return this._autoUpdate},setAutoUpdate:function(t){this._autoUpdate=t,t&&this.requestUpdate()},update:function(){},draw:function(){this.update()},requestUpdate:function(){if(!this._requested){var t=this;Z.requestAnimationFrame(function(){if(t._requested=!1,t._animate){t.requestUpdate();var e=t._element;H.getPrefixed(n,"hidden")&&"true"!==a.getAttribute(e,"keepalive")||!H.isInView(e)||t._handleFrame()}t._autoUpdate&&t.update()}),this._requested=!0}},play:function(){this._animate=!0,this.requestUpdate()},pause:function(){this._animate=!1},_handleFrame:function(){paper=this._scope;var t=Date.now()/1e3,e=this._last?t-this._last:0;this._last=t,this.emit("frame",new r({delta:e,time:this._time+=e,count:this._count++})),this._stats&&this._stats.update()},_animateItem:function(t,e){var i=this._frameItems;e?(i[t._id]={item:t,time:0,count:0},1==++this._frameItemCount&&this.on("frame",this._handleFrameItems)):(delete i[t._id],0==--this._frameItemCount&&this.off("frame",this._handleFrameItems))},_handleFrameItems:function(t){for(var e in this._frameItems){var i=this._frameItems[e];i.item.emit("frame",new r(t,{time:i.time+=t.delta,count:i.count++}))}},_changed:function(){this._project._changed(2049),this._bounds=this._decomposed=e},getElement:function(){return this._element},getPixelRatio:function(){return this._pixelRatio},getResolution:function(){return 72*this._pixelRatio},getViewSize:function(){var t=this._viewSize;return new _(t.width,t.height,this,"setViewSize")},setViewSize:function(){var t=d.read(arguments),e=t.subtract(this._viewSize);e.isZero()||(this._setElementSize(t.width,t.height),this._viewSize.set(t),this._changed(),this.emit("resize",{size:t,delta:e}),this._autoUpdate&&this.update())},_setElementSize:function(t,e){var i=this._element;i&&(i.width!==t&&(i.width=t),i.height!==e&&(i.height=e))},getBounds:function(){return this._bounds||(this._bounds=this._matrix.inverted()._transformBounds(new g(new c,this._viewSize))),this._bounds},getSize:function(){return this.getBounds().getSize()},isVisible:function(){return H.isInView(this._element)},isInserted:function(){return H.isInserted(this._element)},getPixelSize:function(t){var e,i=this._element;if(i){var r=i.parentNode,s=n.createElement("div");s.style.fontSize=t,r.appendChild(s),e=parseFloat(H.getStyles(s).fontSize),r.removeChild(s)}else e=parseFloat(e);return e},getTextWidth:function(t,e){return 0}},r.each(["rotate","scale","shear","skew"],function(t){var e="rotate"===t;this[t]=function(){var i=(e?r:c).read(arguments),n=c.read(arguments,0,{readNull:!0});return this.transform((new p)[t](i,n||this.getCenter(!0)))}},{_decompose:function(){return this._decomposed||(this._decomposed=this._matrix.decompose())},translate:function(){var t=new p;return this.transform(t.translate.apply(t,arguments))},getCenter:function(){return this.getBounds().getCenter()},setCenter:function(){var t=c.read(arguments);this.translate(this.getCenter().subtract(t))},getZoom:function(){var t=this._decompose(),e=t&&t.scaling;return e?(e.x+e.y)/2:0},setZoom:function(t){this.transform((new p).scale(t/this.getZoom(),this.getCenter()))},getRotation:function(){var t=this._decompose();return t&&t.rotation},setRotation:function(t){var e=this.getRotation();null!=e&&null!=t&&this.rotate(t-e)},getScaling:function(){var t=this._decompose(),i=t&&t.scaling;return i?new f(i.x,i.y,this,"setScaling"):e},setScaling:function(){var t=this.getScaling(),e=c.read(arguments,0,{clone:!0,readNull:!0});t&&e&&this.scale(e.x/t.x,e.y/t.y)},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments)},transform:function(t){this._matrix.append(t)},scrollBy:function(){this.translate(c.read(arguments).negate())}}),{projectToView:function(){return this._matrix._transformPoint(c.read(arguments))},viewToProject:function(){return this._matrix._inverseTransform(c.read(arguments))},getEventPoint:function(t){return this.viewToProject(Z.getOffset(t,this._element))}},{statics:{_views:[],_viewsById:{},_id:0,create:function(t,e){return n&&"string"==typeof e&&(e=n.getElementById(e)),new(i?W:U)(t,e)}}},new function(){function t(t){var e=Z.getTarget(t);return e.getAttribute&&U._viewsById[e.getAttribute("id")]}function e(){var t=U._focused;if(!t||!t.isVisible())for(var e=0,i=U._views.length;e<i;e++)if((t=U._views[e]).isVisible()){U._focused=h=t;break}}function r(t,e,i){t._handleMouseEvent("mousemove",e,i)}function s(t,e,i,n,r,s,a){function o(t,i){if(t.responds(i)){if(h||(h=new X(i,n,r,e||t,s?r.subtract(s):null)),t.emit(i,h)&&(I=!0,h.prevented&&(M=!0),h.stopped))return u=!0}else{var a=T[i];if(a)return o(t,a)}}for(var h,u=!1;t&&t!==a&&!o(t,i);)t=t._parent;return u}function a(t,e,i,n,r,a){return t._project.removeOn(i),M=I=!1,b&&s(b,null,i,n,r,a)||e&&e!==b&&!e.isDescendant(b)&&s(e,null,i,n,r,a,b)||s(t,b||e||t,i,n,r,a)}if(i){var o,h,u,l,c,f=!1,d=!1,_=i.navigator;_.pointerEnabled||_.msPointerEnabled?(u="pointerdown MSPointerDown",l="pointermove MSPointerMove",c="pointerup pointercancel MSPointerUp MSPointerCancel"):(u="touchstart",l="touchmove",c="touchend touchcancel","ontouchstart"in i&&_.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)||(u+=" mousedown",l+=" mousemove",c+=" mouseup"));var g={},v={mouseout:function(t){var e=U._focused,i=Z.getRelatedTarget(t);if(e&&(!i||"HTML"===i.nodeName)){var n=Z.getOffset(t,e._element),s=n.x,a=Math.abs,o=a(s),h=o-(1<<25);n.x=a(h)<o?h*(s<0?-1:1):s,r(e,t,e.viewToProject(n))}},scroll:e};g[u]=function(e){var i=U._focused=t(e);f||(f=!0,i._handleMouseEvent("mousedown",e))},v[l]=function(i){var n=U._focused;if(!d){var s=t(i);s?n!==s&&(n&&r(n,i),o||(o=n),n=U._focused=h=s):h&&h===n&&(o&&!o.isInserted()&&(o=null),n=U._focused=o,o=null,e())}n&&r(n,i)},v[u]=function(){d=!0},v[c]=function(t){var e=U._focused;e&&f&&e._handleMouseEvent("mouseup",t),d=f=!1},Z.add(n,v),Z.add(i,{load:e});var p,m,y,w,x,b,C,S,P,I=!1,M=!1,T={doubleclick:"click",mousedrag:"mousemove"},z=!1,k={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}};return{_viewEvents:g,_handleMouseEvent:function(t,e,i){function n(t){return r.virtual[t]||l.responds(t)||u&&u.responds(t)}var r=this._itemEvents,o=r.native[t],h="mousemove"===t,u=this._scope.tool,l=this;h&&f&&n("mousedrag")&&(t="mousedrag"),i||(i=this.getEventPoint(e));var c=this.getBounds().contains(i),d=o&&c&&l._project.hitTest(i,{tolerance:0,fill:!0,stroke:!0}),_=d&&d.item||null,g=!1,v={};if(v[t.substr(5)]=!0,o&&_!==x&&(x&&s(x,null,"mouseleave",e,i),_&&s(_,null,"mouseenter",e,i),x=_),z^c&&(s(this,null,c?"mouseenter":"mouseleave",e,i),p=c?this:null,g=!0),!c&&!v.drag||i.equals(y)||(a(this,_,h?t:"mousemove",e,i,y),g=!0),z=c,v.down&&c||v.up&&m){if(a(this,_,t,e,i,m),v.down){if(P=_===C&&Date.now()-S<300,w=C=_,!M&&_){for(var T=_;T&&!T.responds("mousedrag");)T=T._parent;T&&(b=_)}m=i}else v.up&&(M||_!==w||(S=Date.now(),a(this,_,P?"doubleclick":"click",e,i,m),P=!1),w=b=null);z=!1,g=!0}y=i,g&&u&&(I=u._handleMouseEvent(t,e,i,v)||I),(I&&!v.move||v.down&&n("mouseup"))&&e.preventDefault()},_handleKeyEvent:function(t,e,i,n){function r(r){r.responds(t)&&(paper=a,r.emit(t,s=s||new J(t,e,i,n)))}var s,a=this._scope,o=a.tool;this.isVisible()&&(r(this),o&&o.responds(t)&&r(o))},_countItemEvent:function(t,e){var i=this._itemEvents,n=i.native,r=i.virtual;for(var s in k)n[s]=(n[s]||0)+(k[s][t]||0)*e;r[t]=(r[t]||0)+e},statics:{updateFocus:e}}}}),W=U.extend({_class:"CanvasView",initialize:function(t,e){if(!(e instanceof i.HTMLCanvasElement)){var n=d.read(arguments,1);if(n.isZero())throw new Error("Cannot create CanvasView with the provided argument: "+r.slice(arguments,1));e=Q.getCanvas(n)}var s=this._context=e.getContext("2d");if(s.save(),this._pixelRatio=1,!/^off|false$/.test(a.getAttribute(e,"hidpi"))){var o=i.devicePixelRatio||1,h=H.getPrefixed(s,"backingStorePixelRatio")||1;this._pixelRatio=o/h}U.call(this,t,e),this._needsUpdate=!0},remove:function t(){return this._context.restore(),t.base.call(this)},_setElementSize:function t(e,i){var n=this._pixelRatio;if(t.base.call(this,e*n,i*n),1!==n){var r=this._element,s=this._context;if(!a.hasAttribute(r,"resize")){var o=r.style;o.width=e+"px",o.height=i+"px"}s.restore(),s.save(),s.scale(n,n)}},getPixelSize:function t(e){var i,n=paper.agent;if(n&&n.firefox)i=t.base.call(this,e);else{var r=this._context,s=r.font;r.font=e+" serif",i=parseFloat(r.font),r.font=s}return i},getTextWidth:function(t,e){var i=this._context,n=i.font,r=0;i.font=t;for(var s=0,a=e.length;s<a;s++)r=Math.max(r,i.measureText(e[s]).width);return i.font=n,r},update:function(){if(!this._needsUpdate)return!1;var t=this._project,e=this._context,i=this._viewSize;return e.clearRect(0,0,i.width+1,i.height+1),t&&t.draw(e,this._matrix,this._pixelRatio),this._needsUpdate=!1,!0}}),G=r.extend({_class:"Event",initialize:function(t){this.event=t,this.type=t&&t.type},prevented:!1,stopped:!1,preventDefault:function(){this.prevented=!0,this.event.preventDefault()},stopPropagation:function(){this.stopped=!0,this.event.stopPropagation()},stop:function(){this.stopPropagation(),this.preventDefault()},getTimeStamp:function(){return this.event.timeStamp},getModifiers:function(){return $.modifiers}}),J=G.extend({_class:"KeyEvent",initialize:function(t,e,i,n){this.type=t,this.event=e,this.key=i,this.character=n},toString:function(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }"}}),$=new function(){function t(t){var i=t.key||t.keyIdentifier;return i=/^U\+/.test(i)?String.fromCharCode(parseInt(i.substr(2),16)):/^Arrow[A-Z]/.test(i)?i.substr(5):"Unidentified"===i||i===e?String.fromCharCode(t.keyCode):i,h[i]||(i.length>1?r.hyphenate(i):i.toLowerCase())}function s(t,e,i,n){var o,h=U._focused;if(l[e]=t,t?c[e]=i:delete c[e],e.length>1&&(o=r.camelize(e))in f){f[o]=t;var u=paper&&paper.agent;if("meta"===o&&u&&u.mac)if(t)a={};else{for(var d in a)d in c&&s(!1,d,a[d],n);a=null}}else t&&a&&(a[e]=i);h&&h._handleKeyEvent(t?"keydown":"keyup",n,e,i)}var a,o,h={"\t":"tab"," ":"space","\b":"backspace","":"delete",Spacebar:"space",Del:"delete",Win:"meta",Esc:"escape"},u={tab:"\t",space:" ",enter:"\r"},l={},c={},f=new r({shift:!1,control:!1,alt:!1,meta:!1,capsLock:!1,space:!1}).inject({option:{get:function(){return this.alt}},command:{get:function(){var t=paper&&paper.agent;return t&&t.mac?this.meta:this.control}}});return Z.add(n,{keydown:function(e){var i=t(e),n=paper&&paper.agent;i.length>1||n&&n.chrome&&(e.altKey||n.mac&&e.metaKey||!n.mac&&e.ctrlKey)?s(!0,i,u[i]||(i.length>1?"":i),e):o=i},keypress:function(e){if(o){var i=t(e),n=e.charCode,r=n>=32?String.fromCharCode(n):i.length>1?"":i;i!==o&&(i=r.toLowerCase()),s(!0,i,r,e),o=null}},keyup:function(e){var i=t(e);i in c&&s(!1,i,c[i],e)}}),Z.add(i,{blur:function(t){for(var e in c)s(!1,e,c[e],t)}}),{modifiers:f,isDown:function(t){return!!l[t]}}},X=G.extend({_class:"MouseEvent",initialize:function(t,e,i,n,r){this.type=t,this.event=e,this.point=i,this.target=n,this.delta=r},toString:function(){return"{ type: '"+this.type+"', point: "+this.point+", target: "+this.target+(this.delta?", delta: "+this.delta:"")+", modifiers: "+this.getModifiers()+" }"}}),Y=G.extend({_class:"ToolEvent",_item:null,initialize:function(t,e,i){this.tool=t,this.type=e,this.event=i},_choosePoint:function(t,e){return t||(e?e.clone():null)},getPoint:function(){return this._choosePoint(this._point,this.tool._point)},setPoint:function(t){this._point=t},getLastPoint:function(){return this._choosePoint(this._lastPoint,this.tool._lastPoint)},setLastPoint:function(t){this._lastPoint=t},getDownPoint:function(){return this._choosePoint(this._downPoint,this.tool._downPoint)},setDownPoint:function(t){this._downPoint=t},getMiddlePoint:function(){return!this._middlePoint&&this.tool._lastPoint?this.tool._point.add(this.tool._lastPoint).divide(2):this._middlePoint},setMiddlePoint:function(t){this._middlePoint=t},getDelta:function(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta},setDelta:function(t){this._delta=t},getCount:function(){return this.tool[/^mouse(down|up)$/.test(this.type)?"_downCount":"_moveCount"]},setCount:function(t){this.tool[/^mouse(down|up)$/.test(this.type)?"downCount":"count"]=t},getItem:function(){if(!this._item){var t=this.tool._scope.project.hitTest(this.getPoint());if(t){for(var e=t.item,i=e._parent;/^(Group|CompoundPath)$/.test(i._class);)e=i,i=i._parent;this._item=e}}return this._item},setItem:function(t){this._item=t},toString:function(){return"{ type: "+this.type+", point: "+this.getPoint()+", count: "+this.getCount()+", modifiers: "+this.getModifiers()+" }"}}),K=(o.extend({_class:"Tool",_list:"tools",_reference:"tool",_events:["onMouseDown","onMouseUp","onMouseDrag","onMouseMove","onActivate","onDeactivate","onEditOptions","onKeyDown","onKeyUp"],initialize:function(t){o.call(this),this._moveCount=-1,this._downCount=-1,this.set(t)},getMinDistance:function(){return this._minDistance},setMinDistance:function(t){this._minDistance=t,null!=t&&null!=this._maxDistance&&t>this._maxDistance&&(this._maxDistance=t)},getMaxDistance:function(){return this._maxDistance},setMaxDistance:function(t){this._maxDistance=t,null!=this._minDistance&&null!=t&&t<this._minDistance&&(this._minDistance=t)},getFixedDistance:function(){return this._minDistance==this._maxDistance?this._minDistance:null},setFixedDistance:function(t){this._minDistance=this._maxDistance=t},_handleMouseEvent:function(t,e,i,n){function r(t,e){var r=i,s=a?c._point:c._downPoint||r;if(a){if(c._moveCount&&r.equals(s))return!1;if(s&&(null!=t||null!=e)){var o=r.subtract(s),h=o.getLength();if(h<(t||0))return!1;e&&(r=s.add(o.normalize(Math.min(h,e))))}c._moveCount++}return c._point=r,c._lastPoint=s||r,n.down&&(c._moveCount=-1,c._downPoint=r,c._downCount++),!0}function s(){o&&(l=c.emit(t,new Y(c,t,e))||l)}paper=this._scope,n.drag&&!this.responds(t)&&(t="mousemove");var a=n.move||n.drag,o=this.responds(t),h=this.minDistance,u=this.maxDistance,l=!1,c=this;if(n.down)r(),s();else if(n.up)r(null,u),s();else if(o)for(;r(h,u);)s();return l}}),{request:function(e){var i=new t.XMLHttpRequest;return i.open((e.method||"get").toUpperCase(),e.url,r.pick(e.async,!0)),e.mimeType&&i.overrideMimeType(e.mimeType),i.onload=function(){var t=i.status;0===t||200===t?e.onLoad&&e.onLoad.call(i,i.responseText):i.onerror()},i.onerror=function(){var t=i.status,n='Could not load "'+e.url+'" (Status: '+t+")";if(!e.onError)throw new Error(n);e.onError(n,t)},i.send(null)}}),Q={canvases:[],getCanvas:function(t,e){if(!i)return null;var r,s=!0;"object"==typeof t&&(e=t.height,t=t.width),this.canvases.length?r=this.canvases.pop():(r=n.createElement("canvas"),s=!1);var a=r.getContext("2d");if(!a)throw new Error("Canvas "+r+" is unable to provide a 2D context.");return r.width===t&&r.height===e?s&&a.clearRect(0,0,t+1,e+1):(r.width=t,r.height=e),a.save(),r},getContext:function(t,e){var i=this.getCanvas(t,e);return i?i.getContext("2d"):null},release:function(t){var e=t&&t.canvas?t.canvas:t;e&&e.getContext&&(e.getContext("2d").restore(),this.canvases.push(e))}},tt=new function(){function t(t,e,i){return.2989*t+.587*e+.114*i}function e(e,i,n,r){var s=r-t(e,i,n),r=t(d=e+s,_=i+s,g=n+s),a=v(d,_,g),o=p(d,_,g);if(a<0){var h=r-a;d=r+(d-r)*r/h,_=r+(_-r)*r/h,g=r+(g-r)*r/h}if(o>255){var u=255-r,l=o-r;d=r+(d-r)*u/l,_=r+(_-r)*u/l,g=r+(g-r)*u/l}}function i(t,e,i){return p(t,e,i)-v(t,e,i)}function n(t,e,i,n){var r,s=[t,e,i],a=p(t,e,i),o=v(t,e,i);r=0===v(o=o===t?0:o===e?1:2,a=a===t?0:a===e?1:2)?1===p(o,a)?2:1:0,s[a]>s[o]?(s[r]=(s[r]-s[o])*n/(s[a]-s[o]),s[a]=n):s[r]=s[a]=0,s[o]=0,d=s[0],_=s[1],g=s[2]}var s,a,o,h,u,l,c,f,d,_,g,v=Math.min,p=Math.max,m=Math.abs,y={multiply:function(){d=u*s/255,_=l*a/255,g=c*o/255},screen:function(){d=u+s-u*s/255,_=l+a-l*a/255,g=c+o-c*o/255},overlay:function(){d=u<128?2*u*s/255:255-2*(255-u)*(255-s)/255,_=l<128?2*l*a/255:255-2*(255-l)*(255-a)/255,g=c<128?2*c*o/255:255-2*(255-c)*(255-o)/255},"soft-light":function(){var t=s*u/255;d=t+u*(255-(255-u)*(255-s)/255-t)/255,_=(t=a*l/255)+l*(255-(255-l)*(255-a)/255-t)/255,g=(t=o*c/255)+c*(255-(255-c)*(255-o)/255-t)/255},"hard-light":function(){d=s<128?2*s*u/255:255-2*(255-s)*(255-u)/255,_=a<128?2*a*l/255:255-2*(255-a)*(255-l)/255,g=o<128?2*o*c/255:255-2*(255-o)*(255-c)/255},"color-dodge":function(){d=0===u?0:255===s?255:v(255,255*u/(255-s)),_=0===l?0:255===a?255:v(255,255*l/(255-a)),g=0===c?0:255===o?255:v(255,255*c/(255-o))},"color-burn":function(){d=255===u?255:0===s?0:p(0,255-255*(255-u)/s),_=255===l?255:0===a?0:p(0,255-255*(255-l)/a),g=255===c?255:0===o?0:p(0,255-255*(255-c)/o)},darken:function(){d=u<s?u:s,_=l<a?l:a,g=c<o?c:o},lighten:function(){d=u>s?u:s,_=l>a?l:a,g=c>o?c:o},difference:function(){(d=u-s)<0&&(d=-d),(_=l-a)<0&&(_=-_),(g=c-o)<0&&(g=-g)},exclusion:function(){d=u+s*(255-u-u)/255,_=l+a*(255-l-l)/255,g=c+o*(255-c-c)/255},hue:function(){n(s,a,o,i(u,l,c)),e(d,_,g,t(u,l,c))},saturation:function(){n(u,l,c,i(s,a,o)),e(d,_,g,t(u,l,c))},luminosity:function(){e(u,l,c,t(s,a,o))},color:function(){e(s,a,o,t(u,l,c))},add:function(){d=v(u+s,255),_=v(l+a,255),g=v(c+o,255)},subtract:function(){d=p(u-s,0),_=p(l-a,0),g=p(c-o,0)},average:function(){d=(u+s)/2,_=(l+a)/2,g=(c+o)/2},negation:function(){d=255-m(255-s-u),_=255-m(255-a-l),g=255-m(255-o-c)}},w=this.nativeModes=r.each(["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","darker","copy","xor"],function(t){this[t]=!0},{}),x=Q.getContext(1,1);x&&(r.each(y,function(t,e){var i="darken"===e,n=!1;x.save();try{x.fillStyle=i?"#300":"#a00",x.fillRect(0,0,1,1),x.globalCompositeOperation=e,x.globalCompositeOperation===e&&(x.fillStyle=i?"#a00":"#300",x.fillRect(0,0,1,1),n=x.getImageData(0,0,1,1).data[0]!==i?170:51)}catch(t){}x.restore(),w[e]=n}),Q.release(x)),this.process=function(t,e,i,n,r){var v=e.canvas,p="normal"===t;if(p||w[t])i.save(),i.setTransform(1,0,0,1,0,0),i.globalAlpha=n,p||(i.globalCompositeOperation=t),i.drawImage(v,r.x,r.y),i.restore();else{var m=y[t];if(!m)return;for(var x=i.getImageData(r.x,r.y,v.width,v.height),b=x.data,C=e.getImageData(0,0,v.width,v.height).data,S=0,P=b.length;S<P;S+=4){s=C[S],u=b[S],a=C[S+1],l=b[S+1],o=C[S+2],c=b[S+2],h=C[S+3],f=b[S+3],m();var I=h*n/255,M=1-I;b[S]=I*d+M*u,b[S+1]=I*_+M*l,b[S+2]=I*g+M*c,b[S+3]=h*n+M*f}i.putImageData(x,r.x,r.y)}}},et=new function(){function t(t,e,i){for(var n in e){var r=e[n],a=s[n];"number"==typeof r&&i&&(r=i.number(r)),a?t.setAttributeNS(a,n,r):t.setAttribute(n,r)}return t}var e="http://www.w3.org/2000/svg",i="http://www.w3.org/2000/xmlns",r="http://www.w3.org/1999/xlink",s={href:r,xlink:i,xmlns:i+"/","xmlns:xlink":i+"/"};return{svg:e,xmlns:i,xlink:r,create:function(i,r,s){return t(n.createElementNS(e,i),r,s)},get:function(t,e){var i=s[e],n=i?t.getAttributeNS(i,e):t.getAttribute(e);return"null"===n?null:n},set:t}},it=r.each({fillColor:["fill","color"],fillRule:["fill-rule","string"],strokeColor:["stroke","color"],strokeWidth:["stroke-width","number"],strokeCap:["stroke-linecap","string"],strokeJoin:["stroke-linejoin","string"],strokeScaling:["vector-effect","lookup",{true:"none",false:"non-scaling-stroke"},function(t,e){return!e&&(t instanceof A||t instanceof C||t instanceof j)}],miterLimit:["stroke-miterlimit","number"],dashArray:["stroke-dasharray","array"],dashOffset:["stroke-dashoffset","number"],fontFamily:["font-family","string"],fontWeight:["font-weight","string"],fontSize:["font-size","number"],justification:["text-anchor","lookup",{left:"start",center:"middle",right:"end"}],opacity:["opacity","number"],blendMode:["mix-blend-mode","style"]},function(t,e){var i=r.capitalize(e),n=t[2];this[e]={type:t[1],property:e,attribute:t[0],toSVG:n,fromSVG:n&&r.each(n,function(t,e){this[t]=e},{}),exportFilter:t[3],get:"get"+i,set:"set"+i}},{});return new function(){function e(t,e,i){var n=new r,s=t.getTranslation();if(e){var a=(t=t._shiftless())._inverseTransform(s);n[i?"cx":"x"]=a.x,n[i?"cy":"y"]=a.y,s=null}if(!t.isIdentity()){var o=t.decompose();if(o){var h=[],l=o.rotation,c=o.scaling,f=o.skewing;s&&!s.isZero()&&h.push("translate("+v.point(s)+")"),l&&h.push("rotate("+v.number(l)+")"),u.isZero(c.x-1)&&u.isZero(c.y-1)||h.push("scale("+v.point(c)+")"),f.x&&h.push("skewX("+v.number(f.x)+")"),f.y&&h.push("skewY("+v.number(f.y)+")"),n.transform=h.join(" ")}else n.transform="matrix("+t.getValues().join(",")+")"}return n}function i(t,i){for(var n=e(t._matrix),r=t._children,s=et.create("g",n,v),a=0,o=r.length;a<o;a++){var h=r[a],u=d(h,i);if(u)if(h.isClipMask()){var l=et.create("clipPath");l.appendChild(u),c(h,l,"clip"),et.set(s,{"clip-path":"url(#"+l.id+")"})}else s.appendChild(u)}return s}function n(t){var i=t._type,n=t._radius,r=e(t._matrix,!0,"rectangle"!==i);if("rectangle"===i){i="rect";var s=t._size,a=s.width,o=s.height;r.x-=a/2,r.y-=o/2,r.width=a,r.height=o,n.isZero()&&(n=null)}return n&&("circle"===i?r.r=n:(r.rx=n.width,r.ry=n.height)),et.create(i,r,v)}function s(t){var e=o(t,"color");if(!e){var i,n=t.getGradient(),r=n._radial,s=t.getOrigin(),a=t.getDestination();if(r){i={cx:s.x,cy:s.y,r:s.getDistance(a)};var h=t.getHighlight();h&&(i.fx=h.x,i.fy=h.y)}else i={x1:s.x,y1:s.y,x2:a.x,y2:a.y};i.gradientUnits="userSpaceOnUse",e=et.create((r?"radial":"linear")+"Gradient",i,v);for(var u=n._stops,l=0,f=u.length;l<f;l++){var d=u[l],_=d._color,g=_.getAlpha(),p=d._offset;i={offset:null==p?l/(f-1):p},_&&(i["stop-color"]=_.toCSS(!0)),g<1&&(i["stop-opacity"]=g),e.appendChild(et.create("stop",i,v))}c(t,e,"color")}return"url(#"+e.id+")"}function a(t,e,i){var n={},a=!i&&t.getParent(),o=[];return null!=t._name&&(n.id=t._name),r.each(it,function(e){var i=e.get,h=e.type,u=t[i]();if(e.exportFilter?e.exportFilter(t,u):!a||!r.equals(a[i](),u)){if("color"===h&&null!=u){var l=u.getAlpha();l<1&&(n[e.attribute+"-opacity"]=l)}"style"===h?o.push(e.attribute+": "+u):n[e.attribute]=null==u?"none":"color"===h?u.gradient?s(u,t):u.toCSS(!0):"array"===h?u.join(","):"lookup"===h?e.toSVG[u]:u}}),o.length&&(n.style=o.join(";")),1===n.opacity&&delete n.opacity,t._visible||(n.visibility="hidden"),et.set(e,n,v)}function o(t,e){return m||(m={ids:{},svgs:{}}),t&&m.svgs[e+"-"+(t._id||t.__id||(t.__id=l.get("svg")))]}function c(t,e,i){m||o();var n=m.ids[i]=(m.ids[i]||0)+1;e.id=i+"-"+n,m.svgs[i+"-"+(t._id||t.__id)]=e}function f(e,i){var n=e,r=null;if(m){n="svg"===e.nodeName.toLowerCase()&&e;for(var s in m.svgs)r||(n||(n=et.create("svg")).appendChild(e),r=n.insertBefore(et.create("defs"),n.firstChild)),r.appendChild(m.svgs[s]);m=null}return i.asString?(new t.XMLSerializer).serializeToString(n):n}function d(t,e,i){var n=x[t._class],r=n&&n(t,e);if(r){var s=e.onExport;s&&(r=s(t,r,e)||r);var o=JSON.stringify(t._data);o&&"{}"!==o&&"null"!==o&&r.setAttribute("data-paper-data",o)}return r&&a(t,r,i)}function _(t){return t||(t={}),v=new h(t.precision),t}var v,m,x={Group:i,Layer:i,Raster:function(t,i){var n=e(t._matrix,!0),r=t.getSize(),s=t.getImage();return n.x-=r.width/2,n.y-=r.height/2,n.width=r.width,n.height=r.height,n.href=0==i.embedImages&&s&&s.src||t.toDataURL(),et.create("image",n,v)},Path:function(t,i){var r=i.matchShapes;if(r){var s=t.toShape(!1);if(s)return n(s)}var a,o=t._segments,h=o.length,u=e(t._matrix);if(r&&h>=2&&!t.hasHandles())if(h>2){a=t._closed?"polygon":"polyline";for(var l=[],c=0;c<h;c++)l.push(v.point(o[c]._point));u.points=l.join(" ")}else{a="line";var f=o[0]._point,d=o[1]._point;u.set({x1:f.x,y1:f.y,x2:d.x,y2:d.y})}else a="path",u.d=t.getPathData(null,i.precision);return et.create(a,u,v)},Shape:n,CompoundPath:function(t,i){var n=e(t._matrix),r=t.getPathData(null,i.precision);return r&&(n.d=r),et.create("path",n,v)},SymbolItem:function(t,i){var n=e(t._matrix,!0),r=t._definition,s=o(r,"symbol"),a=r._item,h=a.getBounds();return s||((s=et.create("symbol",{viewBox:v.rectangle(h)})).appendChild(d(a,i)),c(r,s,"symbol")),n.href="#"+s.id,n.x+=h.x,n.y+=h.y,n.width=h.width,n.height=h.height,n.overflow="visible",et.create("use",n,v)},PointText:function(t){var i=et.create("text",e(t._matrix,!0),v);return i.textContent=t._content,i}};w.inject({exportSVG:function(t){return t=_(t),f(d(this,t,!0),t)}}),y.inject({exportSVG:function(t){t=_(t);var i=this._children,n=this.getView(),s=r.pick(t.bounds,"view"),a=t.matrix||"view"===s&&n._matrix,o=a&&p.read([a]),h="view"===s?new g([0,0],n.getViewSize()):"content"===s?w._getBounds(i,o,{stroke:!0}).rect:g.read([s],0,{readNull:!0}),u={version:"1.1",xmlns:et.svg,"xmlns:xlink":et.xlink};h&&(u.width=h.width,u.height=h.height,(h.x||h.y)&&(u.viewBox=v.rectangle(h)));var l=et.create("svg",u,v),c=l;o&&!o.isIdentity()&&(c=l.appendChild(et.create("g",e(o),v)));for(var m=0,y=i.length;m<y;m++)c.appendChild(d(i[m],t,!0));return f(l,t)}})},new function(){function s(t,e,i,n,r){var s=et.get(t,e),a=null==s?n?null:i?"":0:i?s:parseFloat(s);return/%\s*$/.test(s)?a/100*(r?1:z[/x|^width/.test(e)?"width":"height"]):a}function a(t,e,i,n,r){return e=s(t,e||"x",!1,n,r),i=s(t,i||"y",!1,n,r),!n||null!=e&&null!=i?new c(e,i):null}function o(t,e,i,n,r){return e=s(t,e||"width",!1,n,r),i=s(t,i||"height",!1,n,r),!n||null!=e&&null!=i?new d(e,i):null}function h(t,e,i){return"none"===t?null:"number"===e?parseFloat(t):"array"===e?t?t.split(/[\s,]+/g).map(parseFloat):[]:"color"===e?P(t)||t:"lookup"===e?i[t]:t}function u(t,e,i,n){var r=t.childNodes,s="clippath"===e,a="defs"===e,o=new x,h=o._project,u=h._currentStyle,l=[];if(s||a||(o=b(o,t,n),h._currentStyle=o._style.clone()),n)for(var c=t.querySelectorAll("defs"),f=0,d=c.length;f<d;f++)M(c[f],i,!1);for(var f=0,d=r.length;f<d;f++){var _,g=r[f];1!==g.nodeType||/^defs$/i.test(g.nodeName)||!(_=M(g,i,!1))||_ instanceof I||l.push(_)}return o.addChildren(l),s&&(o=b(o.reduce(),t,n)),h._currentStyle=u,(s||a)&&(o.remove(),o=null),o}function l(t,e){for(var i=t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),n=[],r=0,s=i.length;r<s;r+=2)n.push(new c(parseFloat(i[r]),parseFloat(i[r+1])));var a=new L(n);return"polygon"===e&&a.closePath(),a}function f(t,e){var i,n=(s(t,"href",!0)||"").substring(1),r="radialgradient"===e;if(n)(i=k[n].getGradient())._radial^r&&((i=i.clone())._radial=r);else{for(var o=t.childNodes,h=[],u=0,l=o.length;u<l;u++){var c=o[u];1===c.nodeType&&h.push(b(new q,c))}i=new R(h,r)}var f,d,_,g="userSpaceOnUse"!==s(t,"gradientUnits",!0);return r?(d=(f=a(t,"cx","cy",!1,g)).add(s(t,"r",!1,!1,g),0),_=a(t,"fx","fy",!0,g)):(f=a(t,"x1","y1",!1,g),d=a(t,"x2","y2",!1,g)),b(new F(i,f,d,_),t)._scaleToBounds=g,null}function _(t,e,i,n){if(t.transform){for(var r=(n.getAttribute(i)||"").split(/\)\s*/g),s=new p,a=0,o=r.length;a<o;a++){var h=r[a];if(!h)break;for(var u=h.split(/\(\s*/),l=u[0],c=u[1].split(/[\s,]+/g),f=0,d=c.length;f<d;f++)c[f]=parseFloat(c[f]);switch(l){case"matrix":s.append(new p(c[0],c[1],c[2],c[3],c[4],c[5]));break;case"rotate":s.rotate(c[0],c[1],c[2]);break;case"translate":s.translate(c[0],c[1]);break;case"scale":s.scale(c);break;case"skewX":s.skew(c[0],0);break;case"skewY":s.skew(0,c[0])}}t.transform(s)}}function v(t,e,i){var n="fill-opacity"===i?"getFillColor":"getStrokeColor",r=t[n]&&t[n]();r&&r.setAlpha(parseFloat(e))}function m(t,i,n){var s=t.attributes[i],a=s&&s.value;if(!a){var o=r.camelize(i);(a=t.style[o])||n.node[o]===n.parent[o]||(a=n.node[o])}return a?"none"===a?null:a:e}function b(t,i,n){if(i.style){var s=i.parentNode,a={node:H.getStyles(i)||{},parent:!n&&!/^defs$/i.test(s.tagName)&&H.getStyles(s)||{}};r.each(N,function(n,r){var s=m(i,r,a);t=s!==e&&n(t,s,r,i,a)||t})}return t}function P(t){var e=t&&t.match(/\((?:["'#]*)([^"')]+)/),n=e&&e[1],r=n&&k[i?n.replace(i.location.href.split("#")[0]+"#",""):n];return r&&r._scaleToBounds&&((r=r.clone())._scaleToBounds=!0),r}function M(t,e,i){var s,a,h,u=t.nodeName.toLowerCase(),l="#document"!==u,c=n.body;i&&l&&(z=paper.getView().getSize(),z=o(t,null,null,!0)||z,s=et.create("svg",{style:"stroke-width: 1px; stroke-miterlimit: 10"}),a=t.parentNode,h=t.nextSibling,s.appendChild(t),c.appendChild(s));var f=paper.settings,d=f.applyMatrix,_=f.insertItems;f.applyMatrix=!1,f.insertItems=!1;var g=O[u],v=g&&g(t,u,e,i)||null;if(f.insertItems=_,f.applyMatrix=d,v){!l||v instanceof x||(v=b(v,t,i));var p=e.onImport,m=l&&t.getAttribute("data-paper-data");p&&(v=p(t,v,e)||v),e.expandShapes&&v instanceof C&&(v.remove(),v=v.toPath()),m&&(v._data=JSON.parse(m))}return s&&(c.removeChild(s),a&&(h?a.insertBefore(t,h):a.appendChild(t))),i&&(k={},v&&r.pick(e.applyMatrix,d)&&v.matrix.apply(!0,!0)),v}function T(i,r,s){function a(n){try{var a="object"==typeof n?n:(new t.DOMParser).parseFromString(n,"image/svg+xml");if(!a.nodeName)throw a=null,new Error("Unsupported SVG source: "+i);paper=h,u=M(a,r,!0),r&&!1===r.insert||s._insertItem(e,u);var l=r.onLoad;l&&l(u,n)}catch(t){o(t)}}function o(t,e){var i=r.onError;if(!i)throw new Error(t);i(t,e)}if(!i)return null;r="function"==typeof r?{onLoad:r}:r||{};var h=paper,u=null;if("string"!=typeof i||/^.*</.test(i)){if("undefined"!=typeof File&&i instanceof File){var l=new FileReader;return l.onload=function(){a(l.result)},l.onerror=function(){o(l.error)},l.readAsText(i)}a(i)}else{var c=n.getElementById(i);c?a(c):K.request({url:i,async:!0,onLoad:a,onError:o})}return u}var z,k={},O={"#document":function(t,e,i,n){for(var r=t.childNodes,s=0,a=r.length;s<a;s++){var o=r[s];if(1===o.nodeType)return M(o,i,n)}},g:u,svg:u,clippath:u,polygon:l,polyline:l,path:function(t){return A.create(t.getAttribute("d"))},lineargradient:f,radialgradient:f,image:function(t){var e=new S(s(t,"href",!0));return e.on("load",function(){var e=o(t);this.setSize(e);var i=this._matrix._transformPoint(a(t).add(e.divide(2)));this.translate(i)}),e},symbol:function(t,e,i,n){return new I(u(t,e,i,n),!0)},defs:u,use:function(t){var e=(s(t,"href",!0)||"").substring(1),i=k[e],n=a(t);return i?i instanceof I?i.place(n):i.clone().translate(n):null},circle:function(t){return new C.Circle(a(t,"cx","cy"),s(t,"r"))},ellipse:function(t){return new C.Ellipse({center:a(t,"cx","cy"),radius:o(t,"rx","ry")})},rect:function(t){return new C.Rectangle(new g(a(t),o(t)),o(t,"rx","ry"))},line:function(t){return new L.Line(a(t,"x1","y1"),a(t,"x2","y2"))},text:function(t){var e=new E(a(t).add(a(t,"dx","dy")));return e.setContent(t.textContent.trim()||""),e}},N=r.set(r.each(it,function(t){this[t.attribute]=function(e,i){if(e[t.set]&&(e[t.set](h(i,t.type,t.fromSVG)),"color"===t.type)){var n=e[t.get]();if(n&&n._scaleToBounds){var r=e.getBounds();n.transform((new p).translate(r.getPoint()).scale(r.getSize()))}}}},{}),{id:function(t,e){k[e]=t,t.setName&&t.setName(e)},"clip-path":function(t,e){var i=P(e);if(i){if((i=i.clone()).setClipMask(!0),!(t instanceof x))return new x(i,t);t.insertChild(0,i)}},gradientTransform:_,transform:_,"fill-opacity":v,"stroke-opacity":v,visibility:function(t,e){t.setVisible&&t.setVisible("visible"===e)},display:function(t,e){t.setVisible&&t.setVisible(null!==e)},"stop-color":function(t,e){t.setColor&&t.setColor(e)},"stop-opacity":function(t,e){t._color&&t._color.setAlpha(parseFloat(e))},offset:function(t,e){if(t.setOffset){var i=e.match(/(.*)%$/);t.setOffset(i?i[1]/100:parseFloat(e))}},viewBox:function(t,e,i,n,r){var s,a=new g(h(e,"array")),u=o(n,null,null,!0);if(t instanceof x){var l=u?u.divide(a.getSize()):1,c=(new p).scale(l).translate(a.getPoint().negate());s=t}else t instanceof I&&(u&&a.setSize(u),s=t._item);if(s){if("visible"!==m(n,"overflow",r)){var f=new C.Rectangle(a);f.setClipMask(!0),s.addChild(f)}c&&s.transform(c)}}});w.inject({importSVG:function(t,e){return T(t,e,this)}}),y.inject({importSVG:function(t,e){return this.activate(),T(t,e,this)}})},(paper=new(a.inject(r.exports,{Base:r,Numerical:u,Key:$,DomEvent:Z,DomElement:H,document:n,window:i,Symbol:I,PlacedSymbol:P}))).agent.node&&require("./node/extend.js")(paper),"function"==typeof define&&define.amd?define("paper",paper):"object"==typeof module&&module&&(module.exports=paper),paper}.call(this,"object"==typeof self?self:null);/*
Script: RectanglePacker.js
	An algorithm implementation in JavaScript for rectangle packing.

Author:
	IvÃ¡n Montes <drslump@drslump.biz>, <http://blog.netxus.es>

License:
	LGPL - Lesser General Public License

Credits:
	- Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
*/

/*
	Class: NETXUS.RectanglePacker
	A class that finds an 'efficient' position for a rectangle inside another rectangle
	without overlapping the space already taken.
	
	Algorithm based on <http://www.blackpawn.com/texts/lightmaps/default.html>
	
	It uses a binary tree to partition the space of the parent rectangle and allocate the 
	passed rectangles by dividing the partitions into filled and empty.
*/


// Create a NETXUS namespace object if it doesn't exists
if (typeof NETXUS === 'undefined')
	var NETXUS = function() {};		
	

/*	
	Constructor: NETXUS.RectanglePacker
	Initializes the object with the given maximum dimensions
	
	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
		
*/	
NETXUS.RectanglePacker = function ( width, height ) {
	
	this.root = {};

	// initialize
	this.reset( width, height );	
}


/*
	Resets the object to its initial state by initializing the internal variables

	Parameters:
	
		width - The containing rectangle maximum width as integer
		height - The containing rectangle maximum height as integer
*/
NETXUS.RectanglePacker.prototype.reset = function ( width, height ) {
	this.root.x = 0;
	this.root.y = 0;
	this.root.w = width;
	this.root.h = height;
	delete this.root.lft;
	delete this.root.rgt;
	
	this.usedWidth = 0;
	this.usedHeight = 0;	
}
	

/*
	Returns the actual used dimensions of the containing rectangle.
	
	Returns:
	
		A object composed of the properties: 'w' for width and 'h' for height. 
*/
NETXUS.RectanglePacker.prototype.getDimensions = function () {
	return { w: this.usedWidth, h: this.usedHeight };	
}
	
	
/*
 	Finds a suitable place for the given rectangle
 	
	Parameters:
	
		w - The rectangle width as integer.
		h - The rectangle height as integer.
		
	Returns:
	
		If there is room for the rectangle then returns the coordinates as an object 
		composed of 'x' and 'y' properties. 
		If it doesn't fit returns null
*/  	
NETXUS.RectanglePacker.prototype.findCoords = function ( w, h ) {
	
	// private function to traverse the node tree by recursion
	function recursiveFindCoords ( node, w, h ) {

		// private function to clone a node coords and size
		function cloneNode ( node ) {
			return {
				x: node.x,
				y: node.y,
				w: node.w,
				h: node.h	
			};
		}		
		
		// if we are not at a leaf then go deeper
		if ( node.lft ) {
			// check first the left branch if not found then go by the right
			var coords = recursiveFindCoords( node.lft, w, h );
			return coords ? coords : recursiveFindCoords( node.rgt, w, h );	
		}
		else
		{
			// if already used or it's too big then return
			if ( node.used || w > node.w || h > node.h )
				return null;
				
			// if it fits perfectly then use this gap
			if ( w == node.w && h == node.h ) {
				node.used = true;
				return { x: node.x, y: node.y };
			}
			
			// initialize the left and right leafs by clonning the current one
			node.lft = cloneNode( node );
			node.rgt = cloneNode( node );
			
			// checks if we partition in vertical or horizontal
			if ( node.w - w > node.h - h ) {
				node.lft.w = w;
				node.rgt.x = node.x + w;
				node.rgt.w = node.w - w;	
			} else {
				node.lft.h = h;
				node.rgt.y = node.y + h;
				node.rgt.h = node.h - h;							
			}
			
			return recursiveFindCoords( node.lft, w, h );		
		}
	}
		
	// perform the search
	var coords = recursiveFindCoords( this.root, w, h );
	// if fitted then recalculate the used dimensions
	if (coords) {
		if ( this.usedWidth < coords.x + w )
			this.usedWidth = coords.x + w;
		if ( this.usedHeight < coords.y + h )
			this.usedHeight = coords.y + h;
	}
	return coords;
}

function UnionFind(count) {
	this.roots = new Array(count);
	this.ranks = new Array(count);
	
	for(var i=0; i<count; ++i) {
		this.roots[i] = i;
		this.ranks[i] = 0;
	}
}
// Two calls find(x) always return the same result, if link(..) has not been called in between (unique representatives)
UnionFind.prototype.find = function(x) {
	var x0 = x;
	var roots = this.roots;
	while(roots[x] != x)  x = roots[x];
  
	while(roots[x0] != x) {
		var y = roots[x0];
		roots[x0] = x;
		x0 = y;
	} 
	return x;
}

UnionFind.prototype.link = function(x, y) {
	var xr = this.find(x), yr = this.find(y);
	if(xr == yr)  return;

	var ranks = this.ranks, roots = this.roots, xd = ranks[xr], yd = ranks[yr];
 
	if     (xd < yd) {  roots[xr] = yr;  }
	else if(yd < xd) {  roots[yr] = xr;  }
	else {  roots[yr] = xr;  ++ranks[xr];  }
}

var ICC=function(){var d=new Int16Array(1),b=new Uint8Array(d.buffer);function p(k,g){return k[g]<<8|k[g+1]}function w(k,g){b[0]=k[g+1];
b[1]=k[g];return d[0]}function f(k,g){return k[g]<<24|k[g+1]<<16|k[g+2]<<8|k[g+3]}function o(k,g,D){var L="";
for(var s=0;s<D;s++)L+=String.fromCharCode(k[g+s]);return L}function z(k,g,D){var L=[];for(var s=0;s<D;
s++)L.push(String.fromCharCode(k[g+s]));return L}function c(k,g,D){var L="";for(var s=0;s<D;s++){var C=k[g++]<<8|k[g++];
L+=String.fromCharCode(C)}return L}function i(k){var g=new Uint8Array(k);return{header:v(g,0),tags:H(g,128)}}function v(k,g){var D=o,L=f,s={cmmType:D(k,4,4),version:k[8]+"."+(k[9]>>>4)+"."+(k[9]&15),profileClass:D(k,12,4),spaceIn:D(k,16,4),spaceOut:D(k,20,4),date:p(k,24),platform:D(k,40,4),flags:L(k,44),deviceManufac:D(k,48,4),deviceModel:L(k,52),deviceAttribs:[L(k,56),L(k,60)],rendIntent:L(k,64),illuminant:R(k,68),creator:D(k,80,4)};
for(var C=0;C<5;C++)s.date+="."+p(k,26+2*C);return s}function H(k,g){var D=f,L={},s=D(k,g);g+=4;for(var C=0;
C<s;C++){var m=o(k,g,4);g+=4;var e=D(k,g);g+=4;var O=D(k,g);g+=4;L[m]=Q(k,e,O)}return L}function Q(k,g,D){var L=o(k,g,4),s={v:L,H:D};
g+=4;g+=4;if(L=="mluc"){var C=[];for(var m=0;m<D;m++)C.push(k[g-8+m])}if(L=="mluc")t(s,k,g,D);else if(L=="text")I(s,k,g,D);
else if(L=="desc")q(s,k,g,D);else if(L=="mAB ")J(s,k,g,D);else if(L=="mft1")K(s,k,g,D);else if(L=="mft2")P(s,k,g,D);
else if(L=="XYZ ")l(s,k,g,D);else if(L=="para")y(s,k,g,D);else if(L=="curv")A(s,k,g,D);else if(L=="sf32")B(s,k,g,D);
if((s.H&3)!=0)s.H+=4-(s.H&3);return s}function t(k,g,D,L){var s=D-8,C=f(g,D);D+=4;var m=f(g,D);D+=4;
k.g=[];for(var e=0;e<C;e++){var O={};k.g.push(O);O.code=o(g,D,4);var j=f(g,D+4),u=f(g,D+8);D+=12;O.text=c(g,s+u,j>>>1)}}function q(k,g,D,L){var s=f(g,D);
D+=4;k.r=o(g,D,s-1);D+=s;var C=f(g,D);D+=4;var m=f(g,D);D+=4;k.d=c(g,D,m);D+=m;var e=p(g,D);D+=2;var O=g[D];
D++;k.s=o(g,D,O)}function J(k,g,D,L){var s=D-8;k.j=g[D];D++;k.h=g[D];D++;D+=2;var C=f(g,D);D+=4;var m=f(g,D);
D+=4;var e=f(g,D);D+=4;var O=f(g,D);D+=4;var j=f(g,D);D+=4;if(C!=0){k.c=[];D=s+C;for(var u=0;u<k.h;u++){var E=Q(g,D,0);
D+=E.H;k.c.push(E)}}if(m!=0){k.q=[];for(var u=0;u<12;u++)k.q.push(a(g,s+m+u*4))}if(e!=0){k.w=[];D=s+e;
for(var u=0;u<k.h;u++){var E=Q(g,D,0);D+=E.H;k.w.push(E)}}if(O!=0){k.I=[];D=s+O;k.f=[];for(var u=0;u<k.j;
u++)k.f.push(g[D+u]);D+=16;var M=g[D];D+=4;var r=k.h;for(var u=0;u<k.j;u++)r*=k.f[u];if(M==1)for(var u=0;
u<r;u++)k.I.push(g[D+u]*(1/255));if(M==2)for(var u=0;u<r;u++)k.I.push(p(g,D+2*u)*(1/65535))}if(j!=0){k.p=[];
D=s+j;for(var u=0;u<k.j;u++){var E=Q(g,D,0);D+=E.H;k.p.push(E)}}}function K(k,g,D,L){h(k,g,D);D+=40;
k.G=G(g,D,k.j,256);D+=k.j*256;k.I=[];var s=Math.round(Math.pow(k.l,k.j))*k.h;for(var C=0;C<s;C++)k.I.push(g[D+C]*(1/255));
D+=s;k.e=G(g,D,k.h,256);D+=k.h*256}function P(k,g,D,L){h(k,g,D);D+=40;var s=p(g,D);D+=2;var C=p(g,D);
D+=2;k.G=n(g,D,k.j,s);D+=2*k.j*s;k.I=[];var m=Math.round(Math.pow(k.l,k.j))*k.h;for(var e=0;e<m;e++)k.I.push(p(g,D+e*2)*(1/65535));
D+=m*2;k.e=n(g,D,k.h,C);D+=2*k.h*C}function h(k,g,D){k.j=g[D];D++;k.h=g[D];D++;k.l=g[D];D++;D++;k.q=[];
for(var L=0;L<9;L++){k.q.push(a(g,D));D+=4}}function G(k,g,D,L){var s=[];for(var C=0;C<D;C++){var m=[];
s.push(m);for(var e=0;e<L;e++){m.push(k[g]*(1/255));g++}}return s}function n(k,g,D,L){var s=[];for(var C=0;
C<D;C++){var m=[];s.push(m);for(var e=0;e<L;e++){m.push(p(k,g)*(1/65535));g+=2}}return s}function y(k,g,D,L){k.z=p(g,D);
D+=2;D+=2;var s=[1,3,4,5,7];k.g=[];for(var C=0;C<s[k.z];C++)k.g.push(a(g,D+C*4))}function A(k,g,D,L){var s=f(g,D);
D+=4;k.g=[];if(s==1)k.g.push(F(g,D));else for(var C=0;C<s;C++)k.g.push(p(g,D+C*2)*(1/65535));k.H=12+2*s}function l(k,g,D){k.value=R(g,D)}function I(k,g,D,L){k.value=o(g,D,L-9)}function F(k,g){return k[g]+k[g+1]/256}function a(k,g){return w(k,g)+p(k,g+2)*(1/65536)}function R(k,g){var D=[];
for(var L=0;L<3;L++)D.push(a(k,g+L*4));return D}function B(k,g,D,L){var s=L/4-2;k.value=[];for(var C=0;
C<s;C++)k.value.push(a(g,D+C*4))}return{R:i}}();ICC.U=function(){var d=[.9672,1,.81427],b={D:[3.1338561,-1.6168667,-.4906146,-.9787684,1.9161415,.033454,.0719453,-.2289914,1.4052427],t:[.4360747,.3850649,.14308038,.2225045,.7168786,.0606169,.0139322,.0971045,.7141733],n:function(l){return l<.0031308?12.92*l:1.055*Math.pow(l,1/2.4)-.055},K:function(l){return l<.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)},J:function(l,I,F){var a=b.b[0],R=b.b[1];
l=a[~~(l*1e3)];I=a[~~(I*1e3)];F=a[~~(F*1e3)];var B=b.t,g=B[0]*l+B[1]*I+B[2]*F,D=B[3]*l+B[4]*I+B[5]*F,L=B[6]*l+B[7]*I+B[8]*F;
return b.u(g,D,L)},u:function(l,F,a,R){if(R==null)R=d;l=l*(1/R[0]);F=F*(1/R[1]);a=a*(1/R[2]);var B=b.b[1],g=B[~~(l*1e3)],D=B[~~(F*1e3)],L=B[~~(a*1e3)];
return{m:116*D-16,C:500*(g-D),a:200*(D-L)}},F:function(l,I,F,a){if(a==null)a=d;var R=903.3,B=.008856,g=(l+16)/116,D=g*g*g,L=g-F/200,s=L*L*L,C=I/500+g,m=C*C*C,e=s>B?s:(116*L-16)/R,O=D>B?D:(116*g-16)/R,u=m>B?m:(116*C-16)/R,E=u*a[0],M=O*a[1],F=e*a[2],r=b.D,N=[r[0]*E+r[1]*M+r[2]*F,r[3]*E+r[4]*M+r[5]*F,r[6]*E+r[7]*M+r[8]*F];
for(var x=0;x<3;x++)N[x]=Math.max(0,Math.min(1,b.n(N[x])));return{k:N[0],l:N[1],a:N[2]}}};b.b=function(){var l=[],I=[];
for(var F=0;F<2e3;F++){var a=F/1e3;l[F]=b.K(a);I[F]=a>.008856?Math.pow(a,1/3):(903.3*a+16)*(1/116)}return[l,I]}();
function p(l,I){var F=1/(l-1),a=[];for(var R=0;R<l;R++)for(var B=0;B<l;B++)for(var g=0;g<l;g++){if(I==3)a.push(R*F,B*F,g*F);
else for(var D=0;D<l;D++)a.push(R*F,B*F,g*F,D*F)}return a}function w(l,I){var F=l.tags,a=l.header,R=a.spaceIn.toLowerCase(),B=a.spaceOut.toLowerCase(),g=R=="cmyk"?4:3,D=p(I,g),L=F.wtpt?F.wtpt.value:null;
if(R=="cmyk")L=null;for(var s=0;s<D.length;s+=g){if(R=="rgb "){}else if(R=="cmyk"){}else if(R=="lab ")f(D,s,b.J(D[s],D[s+1],D[s+2]));
else throw R;if(F.rTRC){var C=F.rTRC,m=F.gTRC,e=F.bTRC;H(D,s,C,m,e)}if(F.rXYZ){var C=F.rXYZ.value,m=F.gXYZ.value,e=F.bXYZ.value;
i(D,s,C,m,e)}if(F.A2B0){var O=F.A2B0,j=O.v;if(j=="mAB ")z(D,s,O);else if(j=="mft1"||j=="mft2")o(D,s,O);
else throw j}if(B=="rgb "){}else if(B=="xyz "||B=="lab "){if(B=="xyz ")f(D,s,b.u(D[s],D[s+1],D[s+2],L));
var u=b.F(D[s]*100,-128+255*D[s+1],-128+255*D[s+2],L);D[s]=u.k;D[s+1]=u.l;D[s+2]=u.a}else throw B}return D}function f(l,I,F){l[I]=F.m/100;
l[I+1]=(128+F.C)/255;l[I+2]=(128+F.a)/255}function o(l,I,F){for(var a=0;a<F.j;a++)l[I+a]=t(l[I+a],F.G[a]);
if(F.j==3)K(l,I,F.I,F.l);if(F.j==4)J(l,I,F.I,F.l)}function z(l,I,F){if(F.I)K(l,I,F.I,F.f[0]);if(F.w)H(l,I,F.w[0],F.w[1],F.w[2]);
if(F.q)c(l,I,F.q)}function c(l,I,F){var a=l[I],R=l[I+1],B=l[I+2];l[I]=Math.max(0,Math.min(1,F[0]*a+F[1]*R+F[2]*B+F[9]));
l[I+1]=Math.max(0,Math.min(1,F[3]*a+F[4]*R+F[5]*B+F[10]));l[I+2]=Math.max(0,Math.min(1,F[6]*a+F[7]*R+F[8]*B+F[11]))}function i(l,I,F,a,R){var B=l[I],g=l[I+1],D=l[I+2];
l[I]=B*F[0]+g*a[0]+D*R[0];l[I+1]=B*F[1]+g*a[1]+D*R[1];l[I+2]=B*F[2]+g*a[2]+D*R[2]}function v(l,I,F){var a=l[I],R=l[I+1],B=l[I+2];
l[I]=a*F[0]+R*F[1]+B*F[2];l[I+1]=a*F[3]+R*F[4]+B*F[5];l[I+2]=a*F[6]+R*F[7]+B*F[8]}function H(l,I,F,a,R){l[I]=Q(l[I],F);
l[I+1]=Q(l[I+1],a);l[I+2]=Q(l[I+2],R)}function Q(l,I){var F=I.v,a=I.g;if(F=="curv")return t(l,a);else if(F=="para")return q(l,a);
else throw F}function t(l,I){var F=I.length;if(F==0)return l;if(F==1)return Math.pow(l,I[0]);var a=l*(F-1)*.99999,R=~~a,B=a-R;
return(1-B)*I[R]+B*I[R+1]}function q(l,I){var F=I.length,a=l,R=I[0],B=I[1],g=I[2],D=I[3],L=I[4],s=I[5],C=I[6];
if(F==1)a=Math.pow(l,R);else if(F==3)a=l>=-g/B?Math.pow(B*l+g,R):0;else if(F==4)a=l>=-g/B?Math.pow(B*l+g,R)+D:D;
else if(F==5)a=l>=L?Math.pow(B*l+g,R):D*l;else if(F==7)a=l>=L?Math.pow(B*l+g,R)+s:D*l+C;return a}function J(l,I,F,a){var R=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B=a-1.000001,g=B*l[I+0],D=B*l[I+1],L=B*l[I+2],s=B*l[I+3],C=~~g;
P(D,L,s+C*a*a*a,a,F,R,3);R[12]=R[0];R[13]=R[1];R[14]=R[2];P(D,L,s+(C+1)*a*a*a,a,F,R,3);h(12,0,R,g-C,0,R);
l[I]=R[0];l[I+1]=R[1];l[I+2]=R[2]}function K(l,I,F,a){var R=[0,0,0,0,0,0,0,0,0,0,0,0],B=a-1.000001,g=B*l[I+0],D=B*l[I+1],L=B*l[I+2];
P(g,D,L,a,F,R,3);l[I]=R[0];l[I+1]=R[1];l[I+2]=R[2]}function P(l,I,F,a,R,B,g){var D=~~l,L=~~I,s=~~F,C=g*a*a,m=g*(s+a*L+a*a*D),e=g*(s+a*(L+1)+a*a*D);
h(m,m+g,R,F-s,0,B);h(e,e+g,R,F-s,3,B);h(m+C,m+g+C,R,F-s,6,B);h(e+C,e+g+C,R,F-s,9,B);h(0,3,B,I-L,0,B);
h(6,9,B,I-L,6,B);h(0,6,B,l-D,0,B)}function h(l,I,F,a,R,B){var g=1-a;B[R+0]=g*F[l]+a*F[I];B[R+1]=g*F[l+1]+a*F[I+1];
B[R+2]=g*F[l+2]+a*F[I+2]}function G(l,I){var F=I*I*I,a=new Uint8Array(F*4);for(var R=0;R<F;R++){var B=R*3,g=B+R,D=Math.max(0,Math.min(1,l[B])),L=Math.max(0,Math.min(1,l[B+1])),s=Math.max(0,Math.min(1,l[B+2]));
a[g]=~~(.5+D*255);a[g+1]=~~(.5+L*255);a[g+2]=~~(.5+s*255);a[g+3]=255;l[B]=D;l[B+1]=L;l[B+2]=s}return a}function n(l,I,F,a){var R=[0,0,0,0,0,0,0,0,0,0,0,0],B=(I-1.000001)/255,g=F.length;
for(var D=0;D<g;D+=4){var L=B*F[D],s=B*F[D+1],C=B*F[D+2];P(L,s,C,I,l,R,3);a[D]=~~(.5+R[0]*255);a[D+1]=~~(.5+R[1]*255);
a[D+2]=~~(.5+R[2]*255)}}function y(l,I,F,a){var R=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B=(I-1.000001)/255,g=F.length,D=I*I*I;
for(var L=0;L<g;L+=4){var s=B*F[L],C=B*F[L+1],m=B*F[L+2],e=B*F[L+3],O=~~s;P(C,m,e+O*D,I,l,R,4);R[12]=R[0];
R[13]=R[1];R[14]=R[2];P(C,m,e+(O+1)*D,I,l,R,4);h(12,0,R,s-O,0,R);a[L]=~~(.5+R[0]*255);a[L+1]=~~(.5+R[1]*255);
a[L+2]=~~(.5+R[2]*255)}}function A(l){var I=l.tags.desc;if(I.r)return I.r;return I.g[0].text}return{rgba8LUT:G,sampleLUT:w,applyLUT:n,applyLUT4:y,profileName:A}}()/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();var EXRLoader={parse:function(e){var r={FloatType:1,UnsignedByteType:2,HalfFloatType:3,RGBEFormat:4};this.type=r.FloatType;var a=65536,n=a>>3,t=14,i=65537,o=1<<t,f=o-1,l=32768,u=65535,s=59,v=63,c=2+v-s,h=8,w=4,p=4,y=2,d=1,g=0,A=1,S=0,U=1,b=2,m=Math.pow(2.7182818,2.2),M=new DataView(new ArrayBuffer(8));function C(e){if(0===e)return[e,0];M.setFloat64(0,e);var r=M.getUint32(0)>>>20&2047;0===r&&(M.setFloat64(0,e*Math.pow(2,64)),r=(M.getUint32(0)>>>20&2047)-64);var a=r-1022;return[function(e,r){for(var a=Math.min(3,Math.ceil(Math.abs(r)/1023)),n=e,t=0;t<a;t++)n*=Math.pow(2,Math.floor((r+t)/a));return n}(e,-a),a]}var O={l:0,c:0,lc:0};function I(e,r,a,n,t){for(;a<e;)r=r<<8|te(n,t),a+=8;a-=e,O.l=r>>a&(1<<e)-1,O.c=r,O.lc=a}var E=new Array(59);function R(e,r,a,n,t,o,f){for(var l=a,u=0,h=0;t<=o;t++){if(l.value-a.value>n)return!1;I(6,u,h,e,l);var w=O.l;if(u=O.c,h=O.lc,f[t]=w,w==v){if(l.value-a.value>n)throw"Something wrong with hufUnpackEncTable";I(8,u,h,e,l);var p=O.l+c;if(u=O.c,h=O.lc,t+p>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}else if(w>=s){if(t+(p=w-s+2)>o+1)throw"Something wrong with hufUnpackEncTable";for(;p--;)f[t++]=0;t--}}!function(e){for(var r=0;r<=58;++r)E[r]=0;for(r=0;r<i;++r)E[e[r]]+=1;var a=0;for(r=58;r>0;--r){var n=a+E[r]>>1;E[r]=a,a=n}for(r=0;r<i;++r){var t=e[r];t>0&&(e[r]=t|E[t]++<<6)}}(f)}function x(e){return 63&e}function P(e){return e>>6}var z={c:0,lc:0};function N(e,r,a,n){e=e<<8|te(a,n),r+=8,z.c=e,z.lc=r}var T={c:0,lc:0};function k(e,r,a,n,t,i,o,f,l,u){if(e==r){n<8&&(N(a,n,t,o),a=z.c,n=z.lc);var s=a>>(n-=8);s=new Uint8Array([s])[0];if(l.value+s>u)return!1;for(var v=f[l.value-1];s-- >0;)f[l.value++]=v}else{if(!(l.value<u))return!1;f[l.value++]=e}T.c=a,T.lc=n}function _(e){return 65535&e}function D(e){var r=_(e);return r>32767?r-65536:r}var F={a:0,b:0};function B(e,r){var a=D(e),n=D(r),t=a+(1&n)+(n>>1),i=t,o=t-n;F.a=i,F.b=o}function L(e,r){var a=_(e),n=_(r),t=a-(n>>1)&u,i=n+t-l&u;F.a=i,F.b=t}function X(e,r,a,n,t,i,o){for(var f,l=o<16384,u=a>t?t:a,s=1;s<=u;)s<<=1;for(f=s>>=1,s>>=1;s>=1;){for(var v,c,h,w,p=0,y=p+i*(t-f),d=i*s,g=i*f,A=n*s,S=n*f;p<=y;p+=g){for(var U=p,b=p+n*(a-f);U<=b;U+=S){var m=U+A,M=(C=U+d)+A;l?(B(e[U+r],e[C+r]),v=F.a,h=F.b,B(e[m+r],e[M+r]),c=F.a,w=F.b,B(v,c),e[U+r]=F.a,e[m+r]=F.b,B(h,w),e[C+r]=F.a,e[M+r]=F.b):(L(e[U+r],e[C+r]),v=F.a,h=F.b,L(e[m+r],e[M+r]),c=F.a,w=F.b,L(v,c),e[U+r]=F.a,e[m+r]=F.b,L(h,w),e[C+r]=F.a,e[M+r]=F.b)}if(a&s){var C=U+d;l?B(e[U+r],e[C+r]):L(e[U+r],e[C+r]),v=F.a,e[C+r]=F.b,e[U+r]=v}}if(t&s)for(U=p,b=p+n*(a-f);U<=b;U+=S){m=U+A;l?B(e[U+r],e[m+r]):L(e[U+r],e[m+r]),v=F.a,e[m+r]=F.b,e[U+r]=v}f=s,s>>=1}return p}function V(e,r,a,n,l,u){var s=a.value,v=ne(r,a),c=ne(r,a);a.value+=4;var h=ne(r,a);if(a.value+=4,v<0||v>=i||c<0||c>=i)throw"Something wrong with HUF_ENCSIZE";var w=new Array(i),p=new Array(o);if(function(e){for(var r=0;r<o;r++)e[r]={},e[r].len=0,e[r].lit=0,e[r].p=null}(p),R(e,0,a,n-(a.value-s),v,c,w),h>8*(n-(a.value-s)))throw"Something wrong with hufUncompress";!function(e,r,a,n){for(;r<=a;r++){var i=P(e[r]),o=x(e[r]);if(i>>o)throw"Invalid table entry";if(o>t){if((s=n[i>>o-t]).len)throw"Invalid table entry";if(s.lit++,s.p){var f=s.p;s.p=new Array(s.lit);for(var l=0;l<s.lit-1;++l)s.p[l]=f[l]}else s.p=new Array(1);s.p[s.lit-1]=r}else if(o){var u=0;for(l=1<<t-o;l>0;l--){var s;if((s=n[(i<<t-o)+u]).len||s.p)throw"Invalid table entry";s.len=o,s.lit=r,u++}}}}(w,v,c,p),function(e,r,a,n,i,o,l,u,s,v){for(var c=0,h=0,w=u,p=Math.trunc(i.value+(o+7)/8);i.value<p;)for(N(c,h,a,i),c=z.c,h=z.lc;h>=t;)if((A=r[c>>h-t&f]).len)h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;else{if(!A.p)throw"hufDecode issues";var y;for(y=0;y<A.lit;y++){for(var d=x(e[A.p[y]]);h<d&&i.value<p;)N(c,h,a,i),c=z.c,h=z.lc;if(h>=d&&P(e[A.p[y]])==(c>>h-d&(1<<d)-1)){h-=d,k(A.p[y],l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc;break}}if(y==A.lit)throw"hufDecode issues"}var g=8-o&7;for(c>>=g,h-=g;h>0;){var A;if(!(A=r[c<<t-h&f]).len)throw"hufDecode issues";h-=A.len,k(A.lit,l,c,h,a,0,i,s,v,w),c=T.c,h=T.lc}}(w,p,e,0,a,h,c,u,l,{value:0})}function Z(e){for(var r=1;r<e.length;r++){var a=e[r-1]+e[r]-128;e[r]=a}}function H(e,r){for(var a=0,n=Math.floor((e.length+1)/2),t=0,i=e.length-1;!(t>i||(r[t++]=e[a++],t>i));)r[t++]=e[n++]}function W(e){for(var r=e.byteLength,a=new Array,n=0,t=new DataView(e);r>0;){var i=t.getInt8(n++);if(i<0){r-=(f=-i)+1;for(var o=0;o<f;o++)a.push(t.getUint8(n++))}else{var f=i;r-=2;var l=t.getUint8(n++);for(o=0;o<f+1;o++)a.push(l)}}return a}function G(e,r,a){for(var n,t=1;t<64;)65280==(n=r[e.value])?t=64:n>>8==255?t+=255&n:(a[t]=n,t++),e.value++}function Y(e,r){r[0]=le(e[0]),r[1]=le(e[1]),r[2]=le(e[5]),r[3]=le(e[6]),r[4]=le(e[14]),r[5]=le(e[15]),r[6]=le(e[27]),r[7]=le(e[28]),r[8]=le(e[2]),r[9]=le(e[4]),r[10]=le(e[7]),r[11]=le(e[13]),r[12]=le(e[16]),r[13]=le(e[26]),r[14]=le(e[29]),r[15]=le(e[42]),r[16]=le(e[3]),r[17]=le(e[8]),r[18]=le(e[12]),r[19]=le(e[17]),r[20]=le(e[25]),r[21]=le(e[30]),r[22]=le(e[41]),r[23]=le(e[43]),r[24]=le(e[9]),r[25]=le(e[11]),r[26]=le(e[18]),r[27]=le(e[24]),r[28]=le(e[31]),r[29]=le(e[40]),r[30]=le(e[44]),r[31]=le(e[53]),r[32]=le(e[10]),r[33]=le(e[19]),r[34]=le(e[23]),r[35]=le(e[32]),r[36]=le(e[39]),r[37]=le(e[45]),r[38]=le(e[52]),r[39]=le(e[54]),r[40]=le(e[20]),r[41]=le(e[22]),r[42]=le(e[33]),r[43]=le(e[38]),r[44]=le(e[46]),r[45]=le(e[51]),r[46]=le(e[55]),r[47]=le(e[60]),r[48]=le(e[21]),r[49]=le(e[34]),r[50]=le(e[37]),r[51]=le(e[47]),r[52]=le(e[50]),r[53]=le(e[56]),r[54]=le(e[59]),r[55]=le(e[61]),r[56]=le(e[35]),r[57]=le(e[36]),r[58]=le(e[48]),r[59]=le(e[49]),r[60]=le(e[57]),r[61]=le(e[58]),r[62]=le(e[62]),r[63]=le(e[63])}function j(e){for(var r=.5*Math.cos(.7853975),a=.5*Math.cos(.196349375),n=.5*Math.cos(.39269875),t=.5*Math.cos(3*3.14159/16),i=.5*Math.cos(.981746875),o=.5*Math.cos(3*3.14159/8),f=.5*Math.cos(1.374445625),l=new Array(4),u=new Array(4),s=new Array(4),v=new Array(4),c=0;c<8;++c){var h=8*c;l[0]=n*e[h+2],l[1]=o*e[h+2],l[2]=n*e[h+6],l[3]=o*e[h+6],u[0]=a*e[h+1]+t*e[h+3]+i*e[h+5]+f*e[h+7],u[1]=t*e[h+1]-f*e[h+3]-a*e[h+5]-i*e[h+7],u[2]=i*e[h+1]-a*e[h+3]+f*e[h+5]+t*e[h+7],u[3]=f*e[h+1]-i*e[h+3]+t*e[h+5]-a*e[h+7],s[0]=r*(e[h+0]+e[h+4]),s[3]=r*(e[h+0]-e[h+4]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[h+0]=v[0]+u[0],e[h+1]=v[1]+u[1],e[h+2]=v[2]+u[2],e[h+3]=v[3]+u[3],e[h+4]=v[3]-u[3],e[h+5]=v[2]-u[2],e[h+6]=v[1]-u[1],e[h+7]=v[0]-u[0]}for(var w=0;w<8;++w)l[0]=n*e[16+w],l[1]=o*e[16+w],l[2]=n*e[48+w],l[3]=o*e[48+w],u[0]=a*e[8+w]+t*e[24+w]+i*e[40+w]+f*e[56+w],u[1]=t*e[8+w]-f*e[24+w]-a*e[40+w]-i*e[56+w],u[2]=i*e[8+w]-a*e[24+w]+f*e[40+w]+t*e[56+w],u[3]=f*e[8+w]-i*e[24+w]+t*e[40+w]-a*e[56+w],s[0]=r*(e[w]+e[32+w]),s[3]=r*(e[w]-e[32+w]),s[1]=l[0]+l[3],s[2]=l[1]-l[2],v[0]=s[0]+s[1],v[1]=s[3]+s[2],v[2]=s[3]-s[2],v[3]=s[0]-s[1],e[0+w]=v[0]+u[0],e[8+w]=v[1]+u[1],e[16+w]=v[2]+u[2],e[24+w]=v[3]+u[3],e[32+w]=v[3]-u[3],e[40+w]=v[2]-u[2],e[48+w]=v[1]-u[1],e[56+w]=v[0]-u[0]}function q(e){for(var r=0;r<64;++r){var a=e[0][r],n=e[1][r],t=e[2][r];e[0][r]=a+1.5747*t,e[1][r]=a-.1873*n-.4682*t,e[2][r]=a+1.8556*n}}function J(e,r,a){for(var n=0;n<64;++n)r[a+n]=ue(K(e[n]))}function K(e){return e<=1?Math.sign(e)*Math.pow(Math.abs(e),2.2):Math.sign(e)*Math.pow(m,Math.abs(e)-1)}function Q(e){var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)}function $(e){var r=e.viewer,a={value:e.offset.value},n=new Uint8Array(e.width*e.lines*(we.channels.length*e.type*y)),t={version:oe(r,a),unknownUncompressedSize:oe(r,a),unknownCompressedSize:oe(r,a),acCompressedSize:oe(r,a),dcCompressedSize:oe(r,a),rleCompressedSize:oe(r,a),rleUncompressedSize:oe(r,a),rleRawSize:oe(r,a),totalAcUncompressedCount:oe(r,a),totalDcUncompressedCount:oe(r,a),acCompression:oe(r,a)};if(t.version<2)throw"EXRLoader.parse: "+we.compression+" version "+t.version+" is unsupported";for(var i=new Array,o=se(r,a)-y;o>0;){var f=ee(r.buffer,a),l=ie(r,a),u=l>>2&3,s=new Int8Array([(l>>4)-1])[0],v=ie(r,a);i.push({name:f,index:s,type:v,compression:u}),o-=f.length+3}for(var c=we.channels,h=new Array(e.channels),w=0;w<e.channels;++w){var p=h[w]={},d=c[w];p.name=d.name,p.compression=S,p.decoded=!1,p.type=d.pixelType,p.pLinear=d.pLinear,p.width=e.width,p.height=e.lines}for(var m={idx:new Array(3)},M=0;M<e.channels;++M)for(p=h[M],w=0;w<i.length;++w){var C=i[w];p.name==C.name&&(p.compression=C.compression,C.index>=0&&(m.idx[C.index]=M),p.offset=M)}if(t.acCompressedSize>0)switch(t.acCompression){case g:var O=new Uint16Array(t.totalAcUncompressedCount);V(e.array,r,a,t.acCompressedSize,O,t.totalAcUncompressedCount);break;case A:var I=e.array.slice(a.value,a.value+t.totalAcUncompressedCount);O=new Uint16Array(pako.inflate(I).buffer);a.value+=t.totalAcUncompressedCount}if(t.dcCompressedSize>0){var E={array:e.array,offset:a,size:t.dcCompressedSize},R=new Uint16Array(Q(E).buffer);a.value+=t.dcCompressedSize}if(t.rleRawSize>0){I=e.array.slice(a.value,a.value+t.rleCompressedSize);var x=W(pako.inflate(I).buffer);a.value+=t.rleCompressedSize}var P=0,z=new Array(h.length);for(w=0;w<z.length;++w)z[w]=new Array;for(var N=0;N<e.lines;++N)for(var T=0;T<h.length;++T)z[T].push(P),P+=h[T].width*e.type*y;!function(e,r,a,n,t,i){for(var o=new DataView(i.buffer),f=a[e.idx[0]].width,l=a[e.idx[0]].height,u=Math.floor(f/8),s=Math.ceil(f/8),v=Math.ceil(l/8),c=f-8*(s-1),h=l-8*(v-1),w={value:0},p=new Array(3),d=new Array(3),g=new Array(3),A=new Array(3),S=new Array(3),U=0;U<3;++U)S[U]=r[e.idx[U]],p[U]=U<1?0:p[U-1]+s*v,d[U]=new Float32Array(64),g[U]=new Uint16Array(64),A[U]=new Uint16Array(64*s);for(var b=0;b<v;++b){var m=8;b==v-1&&(m=h);for(var M=8,C=0;C<s;++C){for(C==s-1&&(M=c),U=0;U<3;++U)g[U].fill(0),g[U][0]=t[p[U]++],G(w,n,g[U]),Y(g[U],d[U]),j(d[U]);for(q(d),U=0;U<3;++U)J(d[U],A[U],64*C)}var O=0;for(U=0;U<3;++U){for(var I=a[e.idx[U]].type,E=8*b;E<8*b+m;++E)for(O=S[U][E],C=0;C<u;++C){var R=64*C+8*(7&E);o.setUint16(O+0*y*I,A[U][R+0],!0),o.setUint16(O+1*y*I,A[U][R+1],!0),o.setUint16(O+2*y*I,A[U][R+2],!0),o.setUint16(O+3*y*I,A[U][R+3],!0),o.setUint16(O+4*y*I,A[U][R+4],!0),o.setUint16(O+5*y*I,A[U][R+5],!0),o.setUint16(O+6*y*I,A[U][R+6],!0),o.setUint16(O+7*y*I,A[U][R+7],!0),O+=8*y*I}if(u!=s)for(E=8*b;E<8*b+m;++E){O=S[U][E]+8*u*y*I,R=64*u+8*(7&E);for(var x=0;x<M;++x)o.setUint16(O+x*y*I,A[U][R+x],!0)}}}var P=new Uint16Array(f);for(o=new DataView(i.buffer),U=0;U<3;++U)if(a[e.idx[U]].decoded=!0,I=a[e.idx[U]].type,2==a[U].type)for(E=0;E<l;++E){for(O=S[U][E],x=0;x<f;++x)P[x]=o.getUint16(O+x*y*I,!0);for(x=0;x<f;++x)o.setFloat32(O+x*y*I,le(P[x]),!0)}}(m,z,h,O,R,n);for(w=0;w<h.length;++w){if(!(p=h[w]).decoded)switch(p.compression){case b:var k=0,_=0;for(N=0;N<e.lines;++N){for(var D=z[w][k],F=0;F<p.width;++F){for(var B=0;B<y*p.type;++B)n[D++]=x[_+B*p.width*p.height];_++}k++}break;case U:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(n.buffer)}function ee(e,r){for(var a=new Uint8Array(e),n=0;0!=a[r.value+n];)n+=1;var t=(new TextDecoder).decode(a.slice(r.value,r.value+n));return r.value=r.value+n+1,t}function re(e,r){var a=e.getUint32(0,!0);return r.value=r.value+h,a}function ae(e,r){var a=e.getInt32(r.value,!0);return r.value=r.value+p,a}function ne(e,r){var a=e.getUint32(r.value,!0);return r.value=r.value+p,a}function te(e,r){var a=e[r.value];return r.value=r.value+d,a}function ie(e,r){var a=e.getUint8(r.value);return r.value=r.value+d,a}function oe(e,r){var a=Number(e.getBigInt64(r.value,!0));return r.value+=h,a}function fe(e,r){var a=e.getFloat32(r.value,!0);return r.value+=w,a}function le(e){var r=(31744&e)>>10,a=1023&e;return(e>>15?-1:1)*(r?31===r?a?NaN:1/0:Math.pow(2,r-15)*(1+a/1024):a/1024*6103515625e-14)}function ue(e){M.setFloat32(0,e);var r=M.getInt32(0),a=r>>16&32768,n=r>>12&2047,t=r>>23&255;return t<103?a:t>142?(a|=31744,a|=(255==t?0:1)&&8388607&r):t<113?a|=((n|=2048)>>114-t)+(n>>113-t&1):(a|=t-112<<10|n>>1,a+=1&n)}function se(e,r){var a=e.getUint16(r.value,!0);return r.value+=y,a}function ve(e,r,a,n,t){return"string"===n||"stringvector"===n||"iccProfile"===n?function(e,r,a){var n=(new TextDecoder).decode(new Uint8Array(e).slice(r.value,r.value+a));return r.value=r.value+a,n}(r,a,t):"chlist"===n?function(e,r,a,n){for(var t=a.value,i=[];a.value<t+n-1;){var o=ee(r,a),f=ae(e,a),l=ie(e,a);a.value+=3;var u=ae(e,a),s=ae(e,a);i.push({name:o,pixelType:f,pLinear:l,xSampling:u,ySampling:s})}return a.value+=1,i}(e,r,a,t):"chromaticities"===n?function(e,r){return{redX:fe(e,r),redY:fe(e,r),greenX:fe(e,r),greenY:fe(e,r),blueX:fe(e,r),blueY:fe(e,r),whiteX:fe(e,r),whiteY:fe(e,r)}}(e,a):"compression"===n?function(e,r){return["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"][ie(e,r)]}(e,a):"box2i"===n?function(e,r){return{xMin:ne(e,r),yMin:ne(e,r),xMax:ne(e,r),yMax:ne(e,r)}}(e,a):"lineOrder"===n?function(e,r){return["INCREASING_Y"][ie(e,r)]}(e,a):"float"===n?fe(e,a):"v2f"===n?function(e,r){return[fe(e,r),fe(e,r)]}(e,a):"v3f"===n?function(e,r){return[fe(e,r),fe(e,r),fe(e,r)]}(e,a):"int"===n?ae(e,a):"rational"===n?function(e,r){return[ae(e,r),ne(e,r)]}(e,a):"timecode"===n?function(e,r){return[ne(e,r),ne(e,r)]}(e,a):(a.value+=t,void console.log("Cannot parse value for unsupported type: "+n))}var ce=new DataView(e),he=new Uint8Array(e),we={};ce.getUint32(0,!0),ce.getUint8(4,!0),ce.getUint8(5,!0);for(var pe={value:8},ye=!0;ye;){var de=ee(e,pe);if(0==de)ye=!1;else{var ge=ve(ce,e,pe,ee(e,pe),ne(ce,pe));we[de]=ge}}var Ae,Se,Ue,be,me=we.dataWindow.yMax+1;switch(we.compression){case"NO_COMPRESSION":Se=1,Ae=function(e){return new DataView(e.array.buffer,e.offset.value,e.size)};break;case"RLE_COMPRESSION":Se=1,Ae=function(e){var r=e.viewer.buffer.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(W(r)),n=new Uint8Array(a.length);return Z(a),H(a,n),new DataView(n.buffer)};break;case"ZIPS_COMPRESSION":Se=1,Ae=Q;break;case"ZIP_COMPRESSION":Se=16,Ae=Q;break;case"PXR24_COMPRESSION":Se=16,Ae=function(e){for(var r=e.array.slice(e.offset.value,e.offset.value+e.size),a=new Uint8Array(pako.inflate(r).buffer),n=new Uint8Array(a.length),t=n,i=Ee,o=0;o<t.length;o+=2*i){for(var f=0;f<i;f++)t[o+2*f]=a[o+f+i],t[o+2*f+1]=a[o+f];var l=new Uint16Array(t.buffer,o,i);for(f=1;f<i;f++)l[f]=l[f-1]+l[f]&65535}return new DataView(n.buffer)};break;case"PIZ_COMPRESSION":Se=32,Ae=function(e){for(var r=e.viewer,t={value:e.offset.value},i=e.width*Se*(we.channels.length*e.type),o=new Uint16Array(i),f=new Uint8Array(n),l=0,u=new Array(e.channels),s=0;s<e.channels;s++)u[s]={},u[s].start=l,u[s].end=u[s].start,u[s].nx=e.width,u[s].ny=e.lines,u[s].size=e.type,l+=u[s].nx*u[s].ny*u[s].size;var v=se(r,t),c=se(r,t);if(c>=n)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(v<=c)for(s=0;s<c-v+1;s++)f[s+v]=ie(r,t);var h=new Uint16Array(a),w=function(e,r){for(var n=0,t=0;t<a;++t)(0==t||e[t>>3]&1<<(7&t))&&(r[n++]=t);for(var i=n-1;n<a;)r[n++]=0;return i}(f,h),p=ne(r,t);for(V(e.array,r,t,p,o,l),s=0;s<e.channels;++s)for(var d=u[s],g=0;g<u[s].size;++g)X(o,d.start+g,d.nx,d.size,d.ny,d.nx*d.size,w);!function(e,r,a){for(var n=0;n<a;++n)r[n]=e[r[n]]}(h,o,l);for(var A=0,S=new Uint8Array(o.buffer.byteLength),U=0;U<e.lines;U++)for(var b=0;b<e.channels;b++){var m=(d=u[b]).nx*d.size,M=new Uint8Array(o.buffer,d.end*y,m*y);S.set(M,A),A+=m*y,d.end+=m}return new DataView(S.buffer)};break;case"DWAA_COMPRESSION":Se=32,Ae=$;break;case"DWAB_COMPRESSION":Se=256,Ae=$;break;default:throw"EXRLoader.parse: "+we.compression+" is unsupported"}var Me=we.channels[0].pixelType;if(1===Me)switch(this.type){case r.UnsignedByteType:case r.FloatType:be=function(e,r){return le(se(e,r))},Ue=y;break;case r.HalfFloatType:be=se,Ue=y}else{if(2!==Me)throw"EXRLoader.parse: unsupported pixelType "+Me+" for "+we.compression+".";switch(this.type){case r.UnsignedByteType:case r.FloatType:be=fe,Ue=w;break;case r.HalfFloatType:be=function(e,r){return ue(fe(e,r))},Ue=w}}for(var Ce=me/Se,Oe=0;Oe<Ce;Oe++)re(ce,pe);var Ie=we.dataWindow,Ee=Ie.xMax-Ie.xMin+1,Re=Ie.yMax-Ie.yMin+1,xe=Ee*Re*4;switch(this.type){case r.UnsignedByteType:case r.FloatType:var Pe=new Float32Array(xe);we.channels.length<4&&Pe.fill(1,0,xe);break;case r.HalfFloatType:Pe=new Uint16Array(xe);we.channels.length<4&&Pe.fill(15360,0,xe);break;default:console.error("THREE.EXRLoader: unsupported type: ",this.type)}for(var ze,Ne,Te={R:0,G:1,B:2,A:3},ke={size:0,width:Ee,lines:Se,offset:pe,array:he,viewer:ce,type:Me,channels:we.channels.length},_e={value:0},De=0;De<Re/Se;De++){ze=ne(ce,pe),xe=ne(ce,pe),ke.lines=ze+Se>Re?Re-ze:Se,ke.offset=pe,ke.size=xe,Ne=Ae(ke),pe.value+=xe;for(var Fe=0;Fe<Se;Fe++){var Be=Fe+De*Se;if(Be>=Re)break;for(var Le=0;Le<we.channels.length;Le++)for(var Xe=Te[we.channels[Le].name],Ve=0;Ve<Ee;Ve++){var Ze=Fe*(we.channels.length*Ee)+Le*Ee+Ve;_e.value=Ze*Ue;var He=be(Ne,_e);Pe[4*Ee*(Re-1-Be)+4*Ve+Xe]=He}}}if(this.type===r.UnsignedByteType){xe=Pe.length;for(var We,Ge=new Uint8Array(xe),Ye=0;Ye<Re;++Ye)for(var je=0;je<Ee;++je){var qe=Pe[Oe=Ye*Ee*4+4*je],Je=Pe[Oe+1],Ke=Pe[Oe+2];if((We=Ke>(We=qe>Je?qe:Je)?Ke:We)<1e-32)Ge[Oe]=Ge[Oe+1]=Ge[Oe+2]=Ge[Oe+3]=0;else{var Qe=C(We);We=256*Qe[0]/We,Ge[Oe]=qe*We,Ge[Oe+1]=Je*We,Ge[Oe+2]=Ke*We,Ge[Oe+3]=Qe[1]+128}}Pe=Ge}var $e=this.type===r.UnsignedByteType?r.RGBEFormat:r.RGBAFormat;return{header:we,width:Ee,height:Re,data:Pe,format:$e,type:this.type}}};
