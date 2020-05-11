'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var gsap=require('gsap'),confetti=_interopDefault(require('canvas-confetti')),nanoid=require('nanoid');var script = {
  name: "VueConfettiButton",
  // vue component name
  props: {
    id: {
      type: String
    },
    variant: {
      type: String
    }
  },
  data: function data() {
    return {
      nanoid: nanoid.nanoid(),
      bounding: null
    };
  },
  computed: {
    uid: function uid() {
      return !this.id ? this.nanoid : "".concat(this.id, "-").concat(this.nanoid);
    }
  },
  mounted: function mounted() {
    var button = document.querySelector("#button-".concat(this.uid));
    var bounding = button.getBoundingClientRect();
    this.bounding = bounding;
    this.emitter = confetti.create(button.querySelector("#canvas-".concat(this.uid)));
  },
  methods: {
    click: function click(e) {
      var _this = this;

      var button = document.querySelector("#button-".concat(this.uid));
      button.classList.add("success");
      gsap.gsap.to(button, {
        "--icon-x": -3,
        "--icon-y": 3,
        "--z-before": 0,
        duration: 0.2,
        onComplete: function onComplete() {
          _this.emitter({
            spread: 200,
            decay: 0.6,
            angle: 95,
            origin: {
              x: 0,
              y: 1
            },
            particleCount: 100,
            ticks: 50,
            shapes: ["circle"]
          });

          gsap.gsap.to(button, {
            "--icon-x": 0,
            "--icon-y": 0,
            "--z-before": -6,
            duration: 1,
            ease: "elastic.out(1, .5)",
            onComplete: function onComplete() {
              button.classList.remove("success");
            }
          });
        }
      });
    },
    mouseMove: function mouseMove(e) {
      var button = document.querySelector("#button-".concat(this.uid));
      var dy = (e.clientY - this.bounding.top - this.bounding.height / 2) / -1;
      var dx = (e.clientX - this.bounding.left - this.bounding.width / 2) / 10;
      dy = dy > 10 ? 10 : dy < -10 ? -10 : dy;
      dx = dx > 4 ? 4 : dx < -4 ? -4 : dx;
      button.style.setProperty("--rx", dy);
      button.style.setProperty("--ry", dx);
    },
    mouseLeave: function mouseLeave(e) {
      var button = document.querySelector("#button-".concat(this.uid));
      button.style.setProperty("--rx", 0);
      button.style.setProperty("--ry", 0);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "button",
    class: {
      white: _vm.variant === 'white',
      grey: _vm.variant === 'grey'
    },
    attrs: {
      "id": "button-" + _vm.uid
    },
    on: {
      "click": _vm.click,
      "mouseleave": _vm.mouseLeave,
      "mousemove": _vm.mouseMove
    }
  }, [_vm._ssrNode("<div class=\"icon\">", "</div>", [_vm._t("cannon", [_c('div', {
    staticClass: "cannon"
  })]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"confetti\">", "</div>", [_vm._t("confetti", [_c('svg', {
    attrs: {
      "viewBox": "0 0 18 16"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "1 10 4 7 4 5 6 1"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7"
    }
  })]), _vm._v(" "), _c('i'), _c('i'), _c('i'), _c('i'), _c('i'), _c('i')]), _vm._ssrNode(" <canvas" + _vm._ssrAttr("id", "canvas-" + _vm.uid) + " class=\"emitter\"></canvas>")], 2)], 2), _vm._ssrNode(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-68f2ba9e_0", {
    source: ".button[data-v-68f2ba9e]{--background:#1e2235;--color:#f6f8ff;--shadow:rgba(0, 9, 61, 0.24);--cannon-dark:#a6accd;--cannon-light:#f6f8ff;--cannon-shadow:rgba(13, 15, 24, 0.9);--confetti-1:#892ab8;--confetti-2:#ea4c89;--confetti-3:#ffff04;--confetti-4:#4af2fd;--z-before:-6;display:block;outline:0;cursor:pointer;position:relative;border:0;background:0 0;padding:9px 22px 9px 16px;line-height:26px;font-family:inherit;font-weight:600;font-size:14px;color:var(--color);-webkit-appearance:none;-webkit-tap-highlight-color:transparent;transition:transform var(--transform-duration,.4s);will-change:transform;transform-style:preserve-3d;transform:perspective(440px) rotateX(calc(var(--rx,0) * 1deg)) rotateY(calc(var(--ry,0) * 1deg)) translateZ(0)}.button[data-v-68f2ba9e]:hover{--transform-duration:0.16s}.button.success[data-v-68f2ba9e]{--confetti-scale:0;--stroke-dashoffset:15}.button[data-v-68f2ba9e]:before{content:\"\";position:absolute;left:0;top:0;right:0;bottom:0;border-radius:12px;transform:translateZ(calc(var(--z-before) * 1px));background:var(--background);box-shadow:0 4px 8px var(--shadow)}.button .icon[data-v-68f2ba9e],.button span[data-v-68f2ba9e]{display:inline-block;vertical-align:top;position:relative;z-index:1}.button .icon[data-v-68f2ba9e]{--z:2px;width:24px;height:14px;margin:8px 16px 0 0;transform:translate(calc(var(--icon-x,0) * 1px),calc(var(--icon-y,0) * 1px)) translateZ(2px)}.button .icon .confetti[data-v-68f2ba9e]{position:absolute;left:17px;bottom:9px}.button .icon .confetti svg[data-v-68f2ba9e]{width:18px;height:16px;display:block;stroke-width:1px;fill:none;stroke-linejoin:round;stroke-linecap:round}.button .icon .confetti svg *[data-v-68f2ba9e]{transition:stroke-dashoffset .2s;stroke-dasharray:15 20;stroke-dashoffset:var(--stroke-dashoffset,0);stroke:var(--stroke-all,var(--stroke,var(--confetti-2)))}.button .icon .confetti svg[data-v-68f2ba9e] :nth-child(2){--stroke:var(--confetti-3)}.button .icon .confetti svg[data-v-68f2ba9e] :nth-child(3){--stroke:var(--confetti-1)}.button .icon .confetti .emitter[data-v-68f2ba9e]{position:absolute;left:4px;bottom:4px;pointer-events:none}.button .icon .confetti .emitter div[data-v-68f2ba9e]{width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:1px;position:absolute;left:0;top:0;transform-style:preserve-3d;background:var(--confetti-all,var(--b,none))}.button .icon .confetti i[data-v-68f2ba9e]{width:4px;height:4px;display:block;transform:scale(var(--confetti-scale,.5));position:absolute;transition:transform .25s;left:var(--left,-1px);top:var(--top,3px);border-radius:var(--border-radius,1px);background:var(--confetti-background,var(--confetti-3))}.button .icon .confetti i[data-v-68f2ba9e]:nth-child(2){--left:9px;--top:-1px;--border-radius:2px;--confetti-background:var(--confetti-4)}.button .icon .confetti i[data-v-68f2ba9e]:nth-child(3){--left:5px;--top:3px;--confetti-background:var(--confetti-1)}.button .icon .confetti i[data-v-68f2ba9e]:nth-child(4){--left:10px;--top:14px;--confetti-background:var(--confetti-2)}.button .icon .confetti i[data-v-68f2ba9e]:nth-child(5){--left:9px;--top:7px;--confetti-background:var(--confetti-4)}.button .icon .confetti i[data-v-68f2ba9e]:nth-child(6){--left:6px;--top:8px;--border-radius:2px;--confetti-background:var(--confetti-2)}.button .icon .cannon[data-v-68f2ba9e]{position:relative;width:24px;height:14px;transform:translate(0,3px) rotate(-45deg);filter:drop-shadow(-2px 2px 2px var(--cannon-shadow))}.button .icon .cannon[data-v-68f2ba9e]:after,.button .icon .cannon[data-v-68f2ba9e]:before{content:\"\";display:block;height:14px}.button .icon .cannon[data-v-68f2ba9e]:before{background:linear-gradient(var(--cannon-dark),var(--cannon-light) 50%,var(--cannon-dark));width:100%;-webkit-clip-path:polygon(25px -1px,0 52%,25px 15px);clip-path:polygon(25px -1px,0 52%,25px 15px)}.button .icon .cannon[data-v-68f2ba9e]:after{width:6px;position:absolute;right:-3px;top:0;border-radius:50%;box-shadow:inset 0 0 0 .5px var(--cannon-light);background:linear-gradient(90deg,var(--cannon-dark),var(--cannon-light))}.button.white[data-v-68f2ba9e]{--background:#fff;--color:#1e2235;--border:#e1e6f9;--shadow:none;--cannon-dark:#103fc5;--cannon-light:#275efe;--cannon-shadow:rgba(0, 9, 61, 0.2)}.button.white[data-v-68f2ba9e]:before{box-shadow:inset 0 0 0 1px var(--border)}.button.grey[data-v-68f2ba9e]{--background:#404660;--cannon-shadow:rgba(13, 15, 24, 0.2);--cannon-dark:#d1d6ee;--cannon-light:#ffffff}html[data-v-68f2ba9e]{box-sizing:border-box;-webkit-font-smoothing:antialiased}*[data-v-68f2ba9e]{box-sizing:inherit}[data-v-68f2ba9e]:after,[data-v-68f2ba9e]:before{box-sizing:inherit}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-68f2ba9e";
/* module identifier */

var __vue_module_identifier__ = "data-v-68f2ba9e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueConfettiButton(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("VueConfettiButton", __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;