/*!
 * pixi-filters - v1.0.6
 * Compiled Wed Aug 31 2016 08:40:39 GMT-0400 (EDT)
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i;i="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,i.tiltshift=t()}}(function(){return function t(i,e,r){function n(l,s){if(!e[l]){if(!i[l]){var f="function"==typeof require&&require;if(!s&&f)return f(l,!0);if(o)return o(l,!0);var u=new Error("Cannot find definition '"+l+"'");throw u.code="MODULE_NOT_FOUND",u}var a=e[l]={exports:{}};i[l][0].call(a.exports,function(t){var e=i[l][1][t];return n(e?e:t)},a,a.exports,t,i,e,r)}return e[l].exports}for(var o="function"==typeof require&&require,l=0;l<r.length;l++)n(r[l]);return n}({1:[function(t,i,e){if("undefined"==typeof PIXI)throw new Error("pixi.js is required to be included")},{}],2:[function(t,i,e){function r(){PIXI.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n"),this.uniforms.blur=100,this.uniforms.gradientBlur=600,this.uniforms.start=new PIXI.Point(0,window.innerHeight/2),this.uniforms.end=new PIXI.Point(600,window.innerHeight/2),this.uniforms.delta=new PIXI.Point(30,30),this.uniforms.texSize=new PIXI.Point(window.innerWidth,window.innerHeight),this.updateDelta()}r.prototype=Object.create(PIXI.Filter.prototype),r.prototype.constructor=r,i.exports=r,r.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},Object.defineProperties(r.prototype,{blur:{get:function(){return this.uniforms.blur},set:function(t){this.uniforms.blur=t}},gradientBlur:{get:function(){return this.uniforms.gradientBlur},set:function(t){this.uniforms.gradientBlur=t}},start:{get:function(){return this.uniforms.start},set:function(t){this.uniforms.start=t,this.updateDelta()}},end:{get:function(){return this.uniforms.end},set:function(t){this.uniforms.end=t,this.updateDelta()}}})},{}],3:[function(t,i,e){function r(){PIXI.Filter.call(this),this.tiltShiftXFilter=new n,this.tiltShiftYFilter=new o}var n=t("./TiltShiftXFilter"),o=t("./TiltShiftYFilter");r.prototype=Object.create(PIXI.Filter.prototype),r.prototype.constructor=r,i.exports=r,r.prototype.apply=function(t,i,e){var r=t.getRenderTarget(!0);this.tiltShiftXFilter.apply(t,i,r),this.tiltShiftYFilter.apply(t,r,e),t.returnRenderTarget(r)},Object.defineProperties(r.prototype,{blur:{get:function(){return this.tiltShiftXFilter.blur},set:function(t){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=t}},gradientBlur:{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(t){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=t}},start:{get:function(){return this.tiltShiftXFilter.start},set:function(t){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=t}},end:{get:function(){return this.tiltShiftXFilter.end},set:function(t){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=t}}})},{"./TiltShiftXFilter":4,"./TiltShiftYFilter":5}],4:[function(t,i,e){function r(){n.call(this)}var n=t("./TiltShiftAxisFilter");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,i.exports=r,r.prototype.updateDelta=function(){var t=this.uniforms.end.x-this.uniforms.start.x,i=this.uniforms.end.y-this.uniforms.start.y,e=Math.sqrt(t*t+i*i);this.uniforms.delta.x=t/e,this.uniforms.delta.y=i/e}},{"./TiltShiftAxisFilter":2}],5:[function(t,i,e){function r(){n.call(this)}var n=t("./TiltShiftAxisFilter");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,i.exports=r,r.prototype.updateDelta=function(){var t=this.uniforms.end.x-this.uniforms.start.x,i=this.uniforms.end.y-this.uniforms.start.y,e=Math.sqrt(t*t+i*i);this.uniforms.delta.x=-i/e,this.uniforms.delta.y=t/e}},{"./TiltShiftAxisFilter":2}],6:[function(t,i,e){t("../check");var r={TiltShiftFilter:t("./TiltShiftFilter"),TiltShiftXFilter:t("./TiltShiftFilter"),TiltShiftYFilter:t("./TiltShiftFilter"),TiltShiftAxisFilter:t("./TiltShiftAxisFilter")};Object.assign(PIXI.filters,r),"undefined"!=typeof i&&i.exports&&(i.exports=r)},{"../check":1,"./TiltShiftAxisFilter":2,"./TiltShiftFilter":3}]},{},[6])(6)});
//# sourceMappingURL=tiltshift.js.map
