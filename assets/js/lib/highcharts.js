/*
 Highcharts JS v6.0.5 (2018-01-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (S, L) { "object" === typeof module && module.exports ? module.exports = S.document ? L(S) : L : S.Highcharts = L(S); })("undefined" !== typeof window ? window : this, function (S) {
    var L = function () {
        var a = "undefined" === typeof S ? window : S, A = a.document, H = a.navigator && a.navigator.userAgent || "", F = A && A.createElementNS && !!A.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, q = /(edge|msie|trident)/i.test(H) && !a.opera, h = /Firefox/.test(H), l = h && 4 > parseInt(H.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : { product: "Highcharts", version: "6.0.5", deg2rad: 2 * Math.PI / 360, doc: A, hasBidiBug: l, hasTouch: A && void 0 !== A.documentElement.ontouchstart, isMS: q, isWebKit: /AppleWebKit/.test(H), isFirefox: h, isChrome: -1 !== H.indexOf("Chrome"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(H), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: F, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { }, charts: [] };
    }();
    (function (a) {
        a.timers = [];
        var A = a.charts, H = a.doc, F = a.win;
        a.error = function (q, h) { q = a.isNumber(q) ? "Highcharts error #" + q + ": www.highcharts.com/errors/" + q : q; if (h)
            throw Error(q); F.console && console.log(q); };
        a.Fx = function (a, h, l) { this.options = h; this.elem = a; this.prop = l; };
        a.Fx.prototype = { dSetter: function () { var a = this.paths[0], h = this.paths[1], l = [], t = this.now, n = a.length, v; if (1 === t)
                l = this.toD;
            else if (n === h.length && 1 > t)
                for (; n--;)
                    v = parseFloat(a[n]), l[n] = isNaN(v) ? h[n] : t * parseFloat(h[n] - v) + v;
            else
                l = h; this.elem.attr("d", l, null, !0); }, update: function () {
                var a = this.elem, h = this.prop, l = this.now, t = this.options.step;
                if (this[h + "Setter"])
                    this[h + "Setter"]();
                else
                    a.attr ? a.element && a.attr(h, l, null, !0) : a.style[h] = l + this.unit;
                t && t.call(a, l, this);
            }, run: function (q, h, l) {
                var t = this, n = t.options, v = function (a) { return v.stopped ? !1 : t.step(a); }, u = F.requestAnimationFrame || function (a) { setTimeout(a, 13); }, b = function () { for (var d = 0; d < a.timers.length; d++)
                    a.timers[d]() || a.timers.splice(d--, 1); a.timers.length && u(b); };
                q === h ? (delete n.curAnim[this.prop], n.complete && 0 === a.keys(n.curAnim).length &&
                    n.complete.call(this.elem)) : (this.startTime = +new Date, this.start = q, this.end = h, this.unit = l, this.now = this.start, this.pos = 0, v.elem = this.elem, v.prop = this.prop, v() && 1 === a.timers.push(v) && u(b));
            }, step: function (q) {
                var h = +new Date, l, t = this.options, n = this.elem, v = t.complete, u = t.duration, b = t.curAnim;
                n.attr && !n.element ? q = !1 : q || h >= u + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l = b[this.prop] = !0, a.objectEach(b, function (a) { !0 !== a && (l = !1); }), l && v && v.call(n), q = !1) : (this.pos = t.easing((h - this.startTime) /
                    u), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0);
                return q;
            }, initPath: function (q, h, l) {
                function t(a) { var b, c; for (f = a.length; f--;)
                    b = "M" === a[f] || "L" === a[f], c = /[a-zA-Z]/.test(a[f + 3]), b && c && a.splice(f + 1, 0, a[f + 1], a[f + 2], a[f + 1], a[f + 2]); }
                function n(a, b) { for (; a.length < c;) {
                    a[0] = b[c - a.length];
                    var d = a.slice(0, e);
                    [].splice.apply(a, [0, 0].concat(d));
                    r && (d = a.slice(a.length - e), [].splice.apply(a, [a.length, 0].concat(d)), f--);
                } a[0] = "M"; }
                function v(a, b) {
                    for (var f = (c - a.length) / e; 0 < f && f--;)
                        m = a.slice().splice(a.length /
                            w - e, e * w), m[0] = b[c - e - f * e], g && (m[e - 6] = m[e - 2], m[e - 5] = m[e - 1]), [].splice.apply(a, [a.length / w, 0].concat(m)), r && f--;
                }
                h = h || "";
                var u, b = q.startX, d = q.endX, g = -1 < h.indexOf("C"), e = g ? 7 : 3, c, m, f;
                h = h.split(" ");
                l = l.slice();
                var r = q.isArea, w = r ? 2 : 1, K;
                g && (t(h), t(l));
                if (b && d) {
                    for (f = 0; f < b.length; f++)
                        if (b[f] === d[0]) {
                            u = f;
                            break;
                        }
                        else if (b[0] === d[d.length - b.length + f]) {
                            u = f;
                            K = !0;
                            break;
                        }
                    void 0 === u && (h = []);
                }
                h.length && a.isNumber(u) && (c = l.length + u * w * e, K ? (n(h, l), v(l, h)) : (n(l, h), v(h, l)));
                return [h, l];
            } };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter =
            function () { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0); };
        a.merge = function () { var q, h = arguments, l, t = {}, n = function (l, q) { "object" !== typeof l && (l = {}); a.objectEach(q, function (b, d) { !a.isObject(b, !0) || a.isClass(b) || a.isDOMElement(b) ? l[d] = q[d] : l[d] = n(l[d] || {}, b); }); return l; }; !0 === h[0] && (t = h[1], h = Array.prototype.slice.call(h, 2)); l = h.length; for (q = 0; q < l; q++)
            t = n(t, h[q]); return t; };
        a.pInt = function (a, h) { return parseInt(a, h || 10); };
        a.isString = function (a) {
            return "string" ===
                typeof a;
        };
        a.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a; };
        a.isObject = function (q, h) { return !!q && "object" === typeof q && (!h || !a.isArray(q)); };
        a.isDOMElement = function (q) { return a.isObject(q) && "number" === typeof q.nodeType; };
        a.isClass = function (q) { var h = q && q.constructor; return !(!a.isObject(q, !0) || a.isDOMElement(q) || !h || !h.name || "Object" === h.name); };
        a.isNumber = function (a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a; };
        a.erase =
            function (a, h) { for (var l = a.length; l--;)
                if (a[l] === h) {
                    a.splice(l, 1);
                    break;
                } };
        a.defined = function (a) { return void 0 !== a && null !== a; };
        a.attr = function (q, h, l) { var t; a.isString(h) ? a.defined(l) ? q.setAttribute(h, l) : q && q.getAttribute && (t = q.getAttribute(h)) : a.defined(h) && a.isObject(h) && a.objectEach(h, function (a, l) { q.setAttribute(l, a); }); return t; };
        a.splat = function (q) { return a.isArray(q) ? q : [q]; };
        a.syncTimeout = function (a, h, l) { if (h)
            return setTimeout(a, h, l); a.call(0, l); };
        a.extend = function (a, h) {
            var l;
            a || (a = {});
            for (l in h)
                a[l] =
                    h[l];
            return a;
        };
        a.pick = function () { var a = arguments, h, l, t = a.length; for (h = 0; h < t; h++)
            if (l = a[h], void 0 !== l && null !== l)
                return l; };
        a.css = function (q, h) { a.isMS && !a.svg && h && void 0 !== h.opacity && (h.filter = "alpha(opacity\x3d" + 100 * h.opacity + ")"); a.extend(q.style, h); };
        a.createElement = function (q, h, l, t, n) { q = H.createElement(q); var v = a.css; h && a.extend(q, h); n && v(q, { padding: 0, border: "none", margin: 0 }); l && v(q, l); t && t.appendChild(q); return q; };
        a.extendClass = function (q, h) {
            var l = function () { };
            l.prototype = new q;
            a.extend(l.prototype, h);
            return l;
        };
        a.pad = function (a, h, l) { return Array((h || 2) + 1 - String(a).length).join(l || 0) + a; };
        a.relativeLength = function (a, h, l) { return /%$/.test(a) ? h * parseFloat(a) / 100 + (l || 0) : parseFloat(a); };
        a.wrap = function (a, h, l) { var t = a[h]; a[h] = function () { var a = Array.prototype.slice.call(arguments), v = arguments, u = this; u.proceed = function () { t.apply(u, arguments.length ? arguments : v); }; a.unshift(t); a = l.apply(this, a); u.proceed = null; return a; }; };
        a.formatSingle = function (q, h, l) {
            var t = /\.([0-9])/, n = a.defaultOptions.lang;
            /f$/.test(q) ?
                (l = (l = q.match(t)) ? l[1] : -1, null !== h && (h = a.numberFormat(h, l, n.decimalPoint, -1 < q.indexOf(",") ? n.thousandsSep : ""))) : h = (l || a.time).dateFormat(q, h);
            return h;
        };
        a.format = function (q, h, l) { for (var t = "{", n = !1, v, u, b, d, g = [], e; q;) {
            t = q.indexOf(t);
            if (-1 === t)
                break;
            v = q.slice(0, t);
            if (n) {
                v = v.split(":");
                u = v.shift().split(".");
                d = u.length;
                e = h;
                for (b = 0; b < d; b++)
                    e && (e = e[u[b]]);
                v.length && (e = a.formatSingle(v.join(":"), e, l));
                g.push(e);
            }
            else
                g.push(v);
            q = q.slice(t + 1);
            t = (n = !n) ? "}" : "{";
        } g.push(q); return g.join(""); };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
        };
        a.normalizeTickInterval = function (q, h, l, t, n) { var v, u = q; l = a.pick(l, 1); v = q / l; h || (h = n ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === l ? h = a.grep(h, function (a) { return 0 === a % 1; }) : .1 >= l && (h = [1 / l]))); for (t = 0; t < h.length && !(u = h[t], n && u * l >= q || !n && v <= (h[t] + (h[t + 1] || h[t])) / 2); t++)
            ; return u = a.correctFloat(u * l, -Math.round(Math.log(.001) / Math.LN10)); };
        a.stableSort = function (a, h) {
            var l = a.length, t, n;
            for (n = 0; n < l; n++)
                a[n].safeI = n;
            a.sort(function (a, n) {
                t = h(a, n);
                return 0 === t ?
                    a.safeI - n.safeI : t;
            });
            for (n = 0; n < l; n++)
                delete a[n].safeI;
        };
        a.arrayMin = function (a) { for (var h = a.length, l = a[0]; h--;)
            a[h] < l && (l = a[h]); return l; };
        a.arrayMax = function (a) { for (var h = a.length, l = a[0]; h--;)
            a[h] > l && (l = a[h]); return l; };
        a.destroyObjectProperties = function (q, h) { a.objectEach(q, function (a, t) { a && a !== h && a.destroy && a.destroy(); delete q[t]; }); };
        a.discardElement = function (q) { var h = a.garbageBin; h || (h = a.createElement("div")); q && h.appendChild(q); h.innerHTML = ""; };
        a.correctFloat = function (a, h) {
            return parseFloat(a.toPrecision(h ||
                14));
        };
        a.setAnimation = function (q, h) { h.renderer.globalAnimation = a.pick(q, h.options.chart.animation, !0); };
        a.animObject = function (q) { return a.isObject(q) ? a.merge(q) : { duration: q ? 500 : 0 }; };
        a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };
        a.numberFormat = function (q, h, l, t) {
            q = +q || 0;
            h = +h;
            var n = a.defaultOptions.lang, v = (q.toString().split(".")[1] || "").split("e")[0].length, u, b, d = q.toString().split("e");
            -1 === h ? h = Math.min(v, 20) : a.isNumber(h) ? h && d[1] && 0 > d[1] &&
                (u = h + +d[1], 0 <= u ? (d[0] = (+d[0]).toExponential(u).split("e")[0], h = u) : (d[0] = d[0].split(".")[0] || 0, q = 20 > h ? (d[0] * Math.pow(10, d[1])).toFixed(h) : 0, d[1] = 0)) : h = 2;
            b = (Math.abs(d[1] ? d[0] : q) + Math.pow(10, -Math.max(h, v) - 1)).toFixed(h);
            v = String(a.pInt(b));
            u = 3 < v.length ? v.length % 3 : 0;
            l = a.pick(l, n.decimalPoint);
            t = a.pick(t, n.thousandsSep);
            q = (0 > q ? "-" : "") + (u ? v.substr(0, u) + t : "");
            q += v.substr(u).replace(/(\d{3})(?=\d)/g, "$1" + t);
            h && (q += l + b.slice(-h));
            d[1] && 0 !== +q && (q += "e" + d[1]);
            return q;
        };
        Math.easeInOutSine = function (a) {
            return -.5 *
                (Math.cos(Math.PI * a) - 1);
        };
        a.getStyle = function (q, h, l) { if ("width" === h)
            return Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q, "padding-right"); if ("height" === h)
            return Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q, "padding-top") - a.getStyle(q, "padding-bottom"); F.getComputedStyle || a.error(27, !0); if (q = F.getComputedStyle(q, void 0))
            q = q.getPropertyValue(h), a.pick(l, "opacity" !== h) && (q = a.pInt(q)); return q; };
        a.inArray = function (q, h) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(h, q);
        };
        a.grep = function (q, h) { return (a.filterPolyfill || Array.prototype.filter).call(q, h); };
        a.find = Array.prototype.find ? function (a, h) { return a.find(h); } : function (a, h) { var l, t = a.length; for (l = 0; l < t; l++)
            if (h(a[l], l))
                return a[l]; };
        a.map = function (a, h) { for (var l = [], t = 0, n = a.length; t < n; t++)
            l[t] = h.call(a[t], a[t], t, a); return l; };
        a.keys = function (q) { return (a.keysPolyfill || Object.keys).call(void 0, q); };
        a.reduce = function (q, h, l) { return (a.reducePolyfill || Array.prototype.reduce).call(q, h, l); };
        a.offset = function (a) {
            var h = H.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : { top: 0, left: 0 };
            return { top: a.top + (F.pageYOffset || h.scrollTop) - (h.clientTop || 0), left: a.left + (F.pageXOffset || h.scrollLeft) - (h.clientLeft || 0) };
        };
        a.stop = function (q, h) { for (var l = a.timers.length; l--;)
            a.timers[l].elem !== q || h && h !== a.timers[l].prop || (a.timers[l].stopped = !0); };
        a.each = function (q, h, l) { return (a.forEachPolyfill || Array.prototype.forEach).call(q, h, l); };
        a.objectEach = function (a, h, l) { for (var t in a)
            a.hasOwnProperty(t) && h.call(l, a[t], t, a); };
        a.addEvent = function (q, h, l) { var t, n, v = q.addEventListener || a.addEventListenerPolyfill; q.hcEvents && !Object.prototype.hasOwnProperty.call(q, "hcEvents") && (n = {}, a.objectEach(q.hcEvents, function (a, b) { n[b] = a.slice(0); }), q.hcEvents = n); t = q.hcEvents = q.hcEvents || {}; v && v.call(q, h, l, !1); t[h] || (t[h] = []); t[h].push(l); return function () { a.removeEvent(q, h, l); }; };
        a.removeEvent = function (q, h, l) {
            function t(b, g) { var e = q.removeEventListener || a.removeEventListenerPolyfill; e && e.call(q, b, g, !1); }
            function n() {
                var b, g;
                q.nodeName && (h ? (b = {}, b[h] = !0) : b = u,
                    a.objectEach(b, function (a, b) { if (u[b])
                        for (g = u[b].length; g--;)
                            t(b, u[b][g]); }));
            }
            var v, u = q.hcEvents, b;
            u && (h ? (v = u[h] || [], l ? (b = a.inArray(l, v), -1 < b && (v.splice(b, 1), u[h] = v), t(h, l)) : (n(), u[h] = [])) : (n(), q.hcEvents = {}));
        };
        a.fireEvent = function (q, h, l, t) {
            var n;
            n = q.hcEvents;
            var v, u;
            l = l || {};
            if (H.createEvent && (q.dispatchEvent || q.fireEvent))
                n = H.createEvent("Events"), n.initEvent(h, !0, !0), a.extend(n, l), q.dispatchEvent ? q.dispatchEvent(n) : q.fireEvent(h, n);
            else if (n)
                for (n = n[h] || [], v = n.length, l.target || a.extend(l, { preventDefault: function () {
                        l.defaultPrevented =
                            !0;
                    }, target: q, type: h }), h = 0; h < v; h++)
                    (u = n[h]) && !1 === u.call(q, l) && l.preventDefault();
            t && !l.defaultPrevented && t(l);
        };
        a.animate = function (q, h, l) {
            var t, n = "", v, u, b;
            a.isObject(l) || (b = arguments, l = { duration: b[2], easing: b[3], complete: b[4] });
            a.isNumber(l.duration) || (l.duration = 400);
            l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine;
            l.curAnim = a.merge(h);
            a.objectEach(h, function (b, g) {
                a.stop(q, g);
                u = new a.Fx(q, l, g);
                v = null;
                "d" === g ? (u.paths = u.initPath(q, q.d, h.d), u.toD = h.d, t = 0, v = 1) : q.attr ?
                    t = q.attr(g) : (t = parseFloat(a.getStyle(q, g)) || 0, "opacity" !== g && (n = "px"));
                v || (v = b);
                v && v.match && v.match("px") && (v = v.replace(/px/g, ""));
                u.run(t, v, n);
            });
        };
        a.seriesType = function (q, h, l, t, n) { var v = a.getOptions(), u = a.seriesTypes; v.plotOptions[q] = a.merge(v.plotOptions[h], l); u[q] = a.extendClass(u[h] || function () { }, t); u[q].prototype.type = q; n && (u[q].prototype.pointClass = a.extendClass(a.Point, n)); return u[q]; };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), h = 0;
            return function () {
                return "highcharts-" +
                    a + "-" + h++;
            };
        }();
        F.jQuery && (F.jQuery.fn.highcharts = function () { var q = [].slice.call(arguments); if (this[0])
            return q[0] ? (new (a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : A[a.attr(this[0], "data-highcharts-chart")]; });
    })(L);
    (function (a) {
        var A = a.each, H = a.isNumber, F = a.map, q = a.merge, h = a.pInt;
        a.Color = function (l) { if (!(this instanceof a.Color))
            return new a.Color(l); this.init(l); };
        a.Color.prototype = { parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (a) { return [h(a[1]), h(a[2]), h(a[3]), parseFloat(a[4], 10)]; } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) { return [h(a[1]), h(a[2]), h(a[3]), 1]; } }], names: { none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000" }, init: function (l) {
                var h, n, v, u;
                if ((this.input = l = this.names[l && l.toLowerCase ? l.toLowerCase() : ""] || l) && l.stops)
                    this.stops = F(l.stops, function (b) { return new a.Color(b[1]); });
                else if (l && l.charAt && "#" === l.charAt() && (h = l.length, l = parseInt(l.substr(1), 16), 7 === h ? n = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1] : 4 === h && (n = [(l & 3840) >> 4 | (l & 3840) >> 8, (l & 240) >> 4 | l & 240, (l & 15) << 4 | l & 15, 1])), !n)
                    for (v = this.parsers.length; v-- && !n;)
                        u = this.parsers[v], (h = u.regex.exec(l)) && (n = u.parse(h));
                this.rgba = n || [];
            }, get: function (a) {
                var l = this.input, n = this.rgba, h;
                this.stops ? (h = q(l), h.stops = [].concat(h.stops), A(this.stops, function (n, b) { h.stops[b] = [h.stops[b][0], n.get(a)]; })) : h = n && H(n[0]) ? "rgb" === a || !a && 1 === n[3] ? "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")" : "a" === a ? n[3] : "rgba(" + n.join(",") + ")" : l;
                return h;
            }, brighten: function (a) { var l, n = this.rgba; if (this.stops)
                A(this.stops, function (n) { n.brighten(a); });
            else if (H(a) && 0 !== a)
                for (l = 0; 3 > l; l++)
                    n[l] += h(255 * a), 0 > n[l] && (n[l] = 0), 255 < n[l] && (n[l] = 255); return this; }, setOpacity: function (a) { this.rgba[3] = a; return this; }, tweenTo: function (a, h) {
                var n = this.rgba, l = a.rgba;
                l.length && n && n.length ? (a = 1 !== l[3] || 1 !== n[3], h = (a ? "rgba(" : "rgb(") + Math.round(l[0] + (n[0] - l[0]) * (1 - h)) + "," + Math.round(l[1] + (n[1] - l[1]) * (1 - h)) + "," + Math.round(l[2] + (n[2] - l[2]) * (1 - h)) + (a ? "," + (l[3] + (n[3] -
                    l[3]) * (1 - h)) : "") + ")") : h = a.input || "none";
                return h;
            } };
        a.color = function (l) { return new a.Color(l); };
    })(L);
    (function (a) {
        var A, H, F = a.addEvent, q = a.animate, h = a.attr, l = a.charts, t = a.color, n = a.css, v = a.createElement, u = a.defined, b = a.deg2rad, d = a.destroyObjectProperties, g = a.doc, e = a.each, c = a.extend, m = a.erase, f = a.grep, r = a.hasTouch, w = a.inArray, K = a.isArray, z = a.isFirefox, I = a.isMS, D = a.isObject, C = a.isString, y = a.isWebKit, G = a.merge, B = a.noop, J = a.objectEach, E = a.pick, k = a.pInt, p = a.removeEvent, M = a.stop, O = a.svg, N = a.SVG_NS, P = a.symbolSizes, Q = a.win;
        A = a.SVGElement = function () { return this; };
        c(A.prototype, { opacity: 1, SVG_NS: N, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "), init: function (a, k) { this.element = "span" === k ? v(k) : g.createElementNS(this.SVG_NS, k); this.renderer = a; }, animate: function (x, k, b) { k = a.animObject(E(k, this.renderer.globalAnimation, !0)); 0 !== k.duration ? (b && (k.complete = b), q(this, x, k)) : (this.attr(x, null, b), k.step && k.step.call(this)); return this; },
            colorGradient: function (x, k, b) {
                var p = this.renderer, c, f, m, d, r, N, R, y, g, B, w = [], O;
                x.radialGradient ? f = "radialGradient" : x.linearGradient && (f = "linearGradient");
                f && (m = x[f], r = p.gradients, R = x.stops, B = b.radialReference, K(m) && (x[f] = m = { x1: m[0], y1: m[1], x2: m[2], y2: m[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === f && B && !u(m.gradientUnits) && (d = m, m = G(m, p.getRadialAttr(B, d), { gradientUnits: "userSpaceOnUse" })), J(m, function (a, x) { "id" !== x && w.push(x, a); }), J(R, function (a) { w.push(a); }), w = w.join(","), r[w] ? B = r[w].attr("id") :
                    (m.id = B = a.uniqueKey(), r[w] = N = p.createElement(f).attr(m).add(p.defs), N.radAttr = d, N.stops = [], e(R, function (x) { 0 === x[1].indexOf("rgba") ? (c = a.color(x[1]), y = c.get("rgb"), g = c.get("a")) : (y = x[1], g = 1); x = p.createElement("stop").attr({ offset: x[0], "stop-color": y, "stop-opacity": g }).add(N); N.stops.push(x); })), O = "url(" + p.url + "#" + B + ")", b.setAttribute(k, O), b.gradient = w, x.toString = function () { return O; });
            }, applyTextOutline: function (x) {
                var k = this.element, b, p, c, f, d;
                -1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g, this.renderer.getContrast(k.style.fill)));
                x = x.split(" ");
                p = x[x.length - 1];
                if ((c = x[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    x = [].slice.call(k.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, k) { return 2 * x + k; });
                    for (d = x.length; d--;)
                        b = x[d], "highcharts-text-outline" === b.getAttribute("class") && m(x, k.removeChild(b));
                    f = k.firstChild;
                    e(x, function (a, x) {
                        0 === x && (a.setAttribute("x", k.getAttribute("x")), x = k.getAttribute("y"), a.setAttribute("y", x || 0), null === x && k.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        h(a, { "class": "highcharts-text-outline",
                            fill: p, stroke: p, "stroke-width": c, "stroke-linejoin": "round" });
                        k.insertBefore(a, f);
                    });
                }
            }, attr: function (a, k, b, p) {
                var x, c = this.element, e, f = this, m, d;
                "string" === typeof a && void 0 !== k && (x = a, a = {}, a[x] = k);
                "string" === typeof a ? f = (this[a + "Getter"] || this._defaultGetter).call(this, a, c) : (J(a, function (x, k) {
                    m = !1;
                    p || M(this, k);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(k) && (e || (this.symbolAttr(a), e = !0), m = !0);
                    !this.rotation || "x" !== k && "y" !== k || (this.doTransform = !0);
                    m || (d = this[k + "Setter"] ||
                        this._defaultSetter, d.call(this, x, k, c), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(k) && this.updateShadows(k, x, d));
                }, this), this.afterSetters());
                b && b.call(this);
                return f;
            }, afterSetters: function () { this.doTransform && (this.updateTransform(), this.doTransform = !1); }, updateShadows: function (a, k, b) { for (var x = this.shadows, p = x.length; p--;)
                b.call(x[p], "height" === a ? Math.max(k - (x[p].cutHeight || 0), 0) : "d" === a ? this.d : k, a, x[p]); }, addClass: function (a, k) {
                var x = this.attr("class") || "";
                -1 === x.indexOf(a) &&
                    (k || (a = (x + (x ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this;
            }, hasClass: function (a) { return -1 !== w(a, (this.attr("class") || "").split(" ")); }, removeClass: function (a) { return this.attr("class", (this.attr("class") || "").replace(a, "")); }, symbolAttr: function (a) { var x = this; e("x y r start end width height innerR anchorX anchorY".split(" "), function (k) { x[k] = E(a[k], x[k]); }); x.attr({ d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x) }); }, clip: function (a) {
                return this.attr("clip-path", a ? "url(" +
                    this.renderer.url + "#" + a.id + ")" : "none");
            }, crisp: function (a, k) { var x; k = k || a.strokeWidth || 0; x = Math.round(k) % 2 / 2; a.x = Math.floor(a.x || this.x || 0) + x; a.y = Math.floor(a.y || this.y || 0) + x; a.width = Math.floor((a.width || this.width || 0) - 2 * x); a.height = Math.floor((a.height || this.height || 0) - 2 * x); u(a.strokeWidth) && (a.strokeWidth = k); return a; }, css: function (a) {
                var x = this.styles, b = {}, p = this.element, e, f = "", m, d = !x, r = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                x && J(a, function (a, k) { a !== x[k] && (b[k] = a, d = !0); });
                d && (x && (a = c(x, b)), e = this.textWidth = a && a.width && "auto" !== a.width && "text" === p.nodeName.toLowerCase() && k(a.width), this.styles = a, e && !O && this.renderer.forExport && delete a.width, p.namespaceURI === this.SVG_NS ? (m = function (a, x) { return "-" + x.toLowerCase(); }, J(a, function (a, x) { -1 === w(x, r) && (f += x.replace(/([A-Z])/g, m) + ":" + a + ";"); }), f && h(p, "style", f)) : n(p, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this;
            }, strokeWidth: function () {
                return this["stroke-width"] ||
                    0;
            }, on: function (a, k) { var x = this, b = x.element; r && "click" === a ? (b.ontouchstart = function (a) { x.touchEventFired = Date.now(); a.preventDefault(); k.call(b, a); }, b.onclick = function (a) { (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && k.call(b, a); }) : b["on" + a] = k; return this; }, setRadialReference: function (a) { var x = this.renderer.gradients[this.element.gradient]; this.element.radialReference = a; x && x.radAttr && x.animate(this.renderer.getRadialAttr(a, x.radAttr)); return this; }, translate: function (a, k) { return this.attr({ translateX: a, translateY: k }); }, invert: function (a) { this.inverted = a; this.updateTransform(); return this; }, updateTransform: function () {
                var a = this.translateX || 0, k = this.translateY || 0, b = this.scaleX, p = this.scaleY, c = this.inverted, e = this.rotation, f = this.matrix, m = this.element;
                c && (a += this.width, k += this.height);
                a = ["translate(" + a + "," + k + ")"];
                u(f) && a.push("matrix(" + f.join(",") + ")");
                c ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + E(this.rotationOriginX, m.getAttribute("x"), 0) + " " + E(this.rotationOriginY, m.getAttribute("y") || 0) + ")");
                (u(b) || u(p)) && a.push("scale(" + E(b, 1) + " " + E(p, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "));
            }, toFront: function () { var a = this.element; a.parentNode.appendChild(a); return this; }, align: function (a, k, b) {
                var x, p, c, e, f = {};
                p = this.renderer;
                c = p.alignedObjects;
                var d, r;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = k, !b || C(b))
                        this.alignTo = x = b || "renderer", m(c, this), c.push(this), b = null;
                }
                else
                    a = this.alignOptions, k = this.alignByTranslate, x = this.alignTo;
                b = E(b, p[x], p);
                x = a.align;
                p = a.verticalAlign;
                c = (b.x || 0) + (a.x || 0);
                e = (b.y || 0) + (a.y || 0);
                "right" === x ? d = 1 : "center" === x && (d = 2);
                d && (c += (b.width - (a.width || 0)) / d);
                f[k ? "translateX" : "x"] = Math.round(c);
                "bottom" === p ? r = 1 : "middle" === p && (r = 2);
                r && (e += (b.height - (a.height || 0)) / r);
                f[k ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](f);
                this.placed = !0;
                this.alignAttr = f;
                return this;
            }, getBBox: function (a, k) {
                var x, p = this.renderer, f, m = this.element, d = this.styles, r, N = this.textStr, y, g = p.cache, B = p.cacheKeys, G;
                k = E(k, this.rotation);
                f = k * b;
                r = d && d.fontSize;
                u(N) && (G = N.toString(), -1 === G.indexOf("\x3c") && (G = G.replace(/[0-9]/g, "0")), G += ["", k || 0, r, d && d.width, d && d.textOverflow].join());
                G && !a && (x = g[G]);
                if (!x) {
                    if (m.namespaceURI === this.SVG_NS || p.forExport) {
                        try {
                            (y = this.fakeTS && function (a) { e(m.querySelectorAll(".highcharts-text-outline"), function (x) { x.style.display = a; }); }) && y("none"), x = m.getBBox ? c({}, m.getBBox()) : { width: m.offsetWidth, height: m.offsetHeight }, y && y("");
                        }
                        catch (W) { }
                        if (!x || 0 > x.width)
                            x = { width: 0, height: 0 };
                    }
                    else
                        x = this.htmlGetBBox();
                    p.isSVG &&
                        (a = x.width, p = x.height, d && "11px" === d.fontSize && 17 === Math.round(p) && (x.height = p = 14), k && (x.width = Math.abs(p * Math.sin(f)) + Math.abs(a * Math.cos(f)), x.height = Math.abs(p * Math.cos(f)) + Math.abs(a * Math.sin(f))));
                    if (G && 0 < x.height) {
                        for (; 250 < B.length;)
                            delete g[B.shift()];
                        g[G] || B.push(G);
                        g[G] = x;
                    }
                }
                return x;
            }, show: function (a) { return this.attr({ visibility: a ? "inherit" : "visible" }); }, hide: function () { return this.attr({ visibility: "hidden" }); }, fadeOut: function (a) { var x = this; x.animate({ opacity: 0 }, { duration: a || 150, complete: function () { x.attr({ y: -9999 }); } }); },
            add: function (a) { var x = this.renderer, k = this.element, b; a && (this.parentGroup = a); this.parentInverted = a && a.inverted; void 0 !== this.textStr && x.buildText(this); this.added = !0; if (!a || a.handleZ || this.zIndex)
                b = this.zIndexSetter(); b || (a ? a.element : x.box).appendChild(k); if (this.onAdd)
                this.onAdd(); return this; }, safeRemoveChild: function (a) { var x = a.parentNode; x && x.removeChild(a); }, destroy: function () {
                var a = this, k = a.element || {}, b = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup, p = k.ownerSVGElement, c = a.clipPath;
                k.onclick =
                    k.onmouseout = k.onmouseover = k.onmousemove = k.point = null;
                M(a);
                c && p && (e(p.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) { var k = a.getAttribute("clip-path"), x = c.element.id; (-1 < k.indexOf("(#" + x + ")") || -1 < k.indexOf('("#' + x + '")')) && a.removeAttribute("clip-path"); }), a.clipPath = c.destroy());
                if (a.stops) {
                    for (p = 0; p < a.stops.length; p++)
                        a.stops[p] = a.stops[p].destroy();
                    a.stops = null;
                }
                a.safeRemoveChild(k);
                for (a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;)
                    k = b.parentGroup, a.safeRemoveChild(b.div), delete b.div,
                        b = k;
                a.alignTo && m(a.renderer.alignedObjects, a);
                J(a, function (k, x) { delete a[x]; });
                return null;
            }, shadow: function (a, k, b) {
                var x = [], p, c, f = this.element, e, m, d, r;
                if (!a)
                    this.destroyShadows();
                else if (!this.shadows) {
                    m = E(a.width, 3);
                    d = (a.opacity || .15) / m;
                    r = this.parentInverted ? "(-1,-1)" : "(" + E(a.offsetX, 1) + ", " + E(a.offsetY, 1) + ")";
                    for (p = 1; p <= m; p++)
                        c = f.cloneNode(0), e = 2 * m + 1 - 2 * p, h(c, { isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": d * p, "stroke-width": e, transform: "translate" + r, fill: "none" }), b && (h(c, "height", Math.max(h(c, "height") - e, 0)), c.cutHeight = e), k ? k.element.appendChild(c) : f.parentNode && f.parentNode.insertBefore(c, f), x.push(c);
                    this.shadows = x;
                }
                return this;
            }, destroyShadows: function () { e(this.shadows || [], function (a) { this.safeRemoveChild(a); }, this); this.shadows = void 0; }, xGetter: function (a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a); }, _defaultGetter: function (a) {
                a = E(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a =
                    parseFloat(a));
                return a;
            }, dSetter: function (a, k, b) { a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"); this[k] !== a && (b.setAttribute(k, a), this[k] = a); }, dashstyleSetter: function (a) {
                var x, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (x =
                        a.length; x--;)
                        a[x] = k(a[x]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a);
                }
            }, alignSetter: function (a) { this.alignValue = a; this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[a]); }, opacitySetter: function (a, k, b) { this[k] = a; b.setAttribute(k, a); }, titleSetter: function (a) {
                var k = this.element.getElementsByTagName("title")[0];
                k || (k = g.createElementNS(this.SVG_NS, "title"), this.element.appendChild(k));
                k.firstChild && k.removeChild(k.firstChild);
                k.appendChild(g.createTextNode(String(E(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")));
            }, textSetter: function (a) { a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)); }, fillSetter: function (a, k, b) { "string" === typeof a ? b.setAttribute(k, a) : a && this.colorGradient(a, k, b); }, visibilitySetter: function (a, k, b) { "inherit" === a ? b.removeAttribute(k) : this[k] !== a && b.setAttribute(k, a); this[k] = a; }, zIndexSetter: function (a, b) {
                var p = this.renderer, x = this.parentGroup, c = (x || p).element || p.box, f, e = this.element, m, d, p = c === p.box;
                f = this.added;
                var r;
                u(a) && (e.zIndex = a, a = +a, this[b] === a && (f = !1), this[b] = a);
                if (f) {
                    (a = this.zIndex) && x && (x.handleZ = !0);
                    b = c.childNodes;
                    for (r = b.length - 1; 0 <= r && !m; r--)
                        if (x = b[r], f = x.zIndex, d = !u(f), x !== e)
                            if (0 > a && d && !p && !r)
                                c.insertBefore(e, b[r]), m = !0;
                            else if (k(f) <= a || d && (!u(a) || 0 <= a))
                                c.insertBefore(e, b[r + 1] || null), m = !0;
                    m || (c.insertBefore(e, b[p ? 3 : 0] || null), m = !0);
                }
                return m;
            }, _defaultSetter: function (a, k, b) { b.setAttribute(k, a); } });
        A.prototype.yGetter = A.prototype.xGetter;
        A.prototype.translateXSetter =
            A.prototype.translateYSetter = A.prototype.rotationSetter = A.prototype.verticalAlignSetter = A.prototype.rotationOriginXSetter = A.prototype.rotationOriginYSetter = A.prototype.scaleXSetter = A.prototype.scaleYSetter = A.prototype.matrixSetter = function (a, k) { this[k] = a; this.doTransform = !0; };
        A.prototype["stroke-widthSetter"] = A.prototype.strokeSetter = function (a, k, b) {
            this[k] = a;
            this.stroke && this["stroke-width"] ? (A.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0) : "stroke-width" === k && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1);
        };
        H = a.SVGRenderer = function () { this.init.apply(this, arguments); };
        c(H.prototype, { Element: A, SVG_NS: N, init: function (a, k, b, p, c, f) {
                var x;
                p = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }).css(this.getStyle(p));
                x = p.element;
                a.appendChild(x);
                h(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && h(x, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = x;
                this.boxWrapper = p;
                this.alignedObjects =
                    [];
                this.url = (z || y) && g.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highcharts 6.0.5"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = f;
                this.forExport = c;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(k, b, !1);
                var e;
                z && a.getBoundingClientRect && (k = function () {
                    n(a, { left: 0, top: 0 });
                    e = a.getBoundingClientRect();
                    n(a, { left: Math.ceil(e.left) - e.left + "px", top: Math.ceil(e.top) - e.top + "px" });
                }, k(), this.unSubPixelFix = F(Q, "resize", k));
            }, getStyle: function (a) { return this.style = c({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a); }, setStyle: function (a) { this.boxWrapper.css(this.getStyle(a)); }, isHidden: function () { return !this.boxWrapper.getBBox().width; }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients ||
                    {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null;
            }, createElement: function (a) { var k = new this.Element; k.init(this, a); return k; }, draw: B, getRadialAttr: function (a, k) { return { cx: a[0] - a[2] / 2 + k.cx * a[2], cy: a[1] - a[2] / 2 + k.cy * a[2], r: k.r * a[2] }; }, getSpanWidth: function (a) { return a.getBBox(!0).width; }, applyEllipsis: function (a, k, b, p) {
                var c = a.rotation, x = b, f, e = 0, m = b.length, d = function (a) { k.removeChild(k.firstChild); a && k.appendChild(g.createTextNode(a)); }, r;
                a.rotation = 0;
                x = this.getSpanWidth(a, k);
                if (r = x > p) {
                    for (; e <= m;)
                        f = Math.ceil((e + m) / 2), x = b.substring(0, f) + "\u2026", d(x), x = this.getSpanWidth(a, k), e === m ? e = m + 1 : x > p ? m = f - 1 : e = f;
                    0 === m && d("");
                }
                a.rotation = c;
                return r;
            }, escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;" }, buildText: function (a) {
                var b = a.element, p = this, c = p.forExport, x = E(a.textStr, "").toString(), m = -1 !== x.indexOf("\x3c"), d = b.childNodes, r, y, B, G, z = h(b, "x"), M = a.styles, P = a.textWidth, l = M && M.lineHeight, D = M && M.textOutline, u = M && "ellipsis" === M.textOverflow, C = M && "nowrap" === M.whiteSpace, v = M && M.fontSize, I, t, K = d.length, M = P && !a.added && this.box, Q = function (a) { var c; c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : v || p.style.fontSize || 12; return l ? k(l) : p.fontMetrics(c, a.getAttribute("style") ? a : b).h; }, q = function (a, k) { J(p.escapes, function (b, p) { k && -1 !== w(b, k) || (a = a.toString().replace(new RegExp(b, "g"), p)); }); return a; };
                I = [x, u, C, l, D, v, P].join();
                if (I !== a.textCache) {
                    for (a.textCache = I; K--;)
                        b.removeChild(d[K]);
                    m || D || u || P || -1 !== x.indexOf(" ") ?
                        (r = /<.*class="([^"]+)".*>/, y = /<.*style="([^"]+)".*>/, B = /<.*href="([^"]+)".*>/, M && M.appendChild(b), x = m ? x.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [x], x = f(x, function (a) { return "" !== a; }), e(x, function (k, x) {
                            var f, m = 0;
                            k = k.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            f = k.split("|||");
                            e(f, function (k) {
                                if ("" !== k || 1 === f.length) {
                                    var e = {}, d = g.createElementNS(p.SVG_NS, "tspan"), w, M;
                                    r.test(k) && (w = k.match(r)[1], h(d, "class", w));
                                    y.test(k) && (M = k.match(y)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), h(d, "style", M));
                                    B.test(k) && !c && (h(d, "onclick", 'location.href\x3d"' + k.match(B)[1] + '"'), h(d, "class", "highcharts-anchor"), n(d, { cursor: "pointer" }));
                                    k = q(k.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== k) {
                                        d.appendChild(g.createTextNode(k));
                                        m ? e.dx = 0 : x && null !== z && (e.x = z);
                                        h(d, e);
                                        b.appendChild(d);
                                        !m &&
                                            t && (!O && c && n(d, { display: "block" }), h(d, "dy", Q(d)));
                                        if (P) {
                                            e = k.replace(/([^\^])-/g, "$1- ").split(" ");
                                            w = 1 < f.length || x || 1 < e.length && !C;
                                            var l = [], D, J = Q(d), E = a.rotation;
                                            for (u && (G = p.applyEllipsis(a, d, k, P)); !u && w && (e.length || l.length);)
                                                a.rotation = 0, D = p.getSpanWidth(a, d), k = D > P, void 0 === G && (G = k), k && 1 !== e.length ? (d.removeChild(d.firstChild), l.unshift(e.pop())) : (e = l, l = [], e.length && !C && (d = g.createElementNS(N, "tspan"), h(d, { dy: J, x: z }), M && h(d, "style", M), b.appendChild(d)), D > P && (P = D)), e.length && d.appendChild(g.createTextNode(e.join(" ").replace(/- /g, "-")));
                                            a.rotation = E;
                                        }
                                        m++;
                                    }
                                }
                            });
                            t = t || b.childNodes.length;
                        }), G && a.attr("title", q(a.textStr, ["\x26lt;", "\x26gt;"])), M && M.removeChild(b), D && a.applyTextOutline && a.applyTextOutline(D)) : b.appendChild(g.createTextNode(q(x)));
                }
            }, getContrast: function (a) { a = t(a).rgba; return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"; }, button: function (a, k, b, p, e, f, d, m, r) {
                var x = this.label(a, k, b, r, null, null, null, null, "button"), y = 0;
                x.attr(G({ padding: 8, r: 2 }, e));
                var N, g, B, w;
                e = G({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333",
                        cursor: "pointer", fontWeight: "normal" } }, e);
                N = e.style;
                delete e.style;
                f = G(e, { fill: "#e6e6e6" }, f);
                g = f.style;
                delete f.style;
                d = G(e, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, d);
                B = d.style;
                delete d.style;
                m = G(e, { style: { color: "#cccccc" } }, m);
                w = m.style;
                delete m.style;
                F(x.element, I ? "mouseover" : "mouseenter", function () { 3 !== y && x.setState(1); });
                F(x.element, I ? "mouseout" : "mouseleave", function () { 3 !== y && x.setState(y); });
                x.setState = function (a) {
                    1 !== a && (x.state = y = a);
                    x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" +
                        ["normal", "hover", "pressed", "disabled"][a || 0]);
                    x.attr([e, f, d, m][a || 0]).css([N, g, B, w][a || 0]);
                };
                x.attr(e).css(c({ cursor: "default" }, N));
                return x.on("click", function (a) { 3 !== y && p.call(x, a); });
            }, crispLine: function (a, k) { a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - k % 2 / 2); a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + k % 2 / 2); return a; }, path: function (a) { var k = { fill: "none" }; K(a) ? k.d = a : D(a) && c(k, a); return this.createElement("path").attr(k); }, circle: function (a, k, b) {
                a = D(a) ? a : { x: a, y: k, r: b };
                k = this.createElement("circle");
                k.xSetter =
                    k.ySetter = function (a, k, b) { b.setAttribute("c" + k, a); };
                return k.attr(a);
            }, arc: function (a, k, b, p, c, e) { D(a) ? (p = a, k = p.y, b = p.r, a = p.x) : p = { innerR: p, start: c, end: e }; a = this.symbol("arc", a, k, b, b, p); a.r = b; return a; }, rect: function (a, k, b, p, c, e) { c = D(a) ? a.r : c; var f = this.createElement("rect"); a = D(a) ? a : void 0 === a ? {} : { x: a, y: k, width: Math.max(b, 0), height: Math.max(p, 0) }; void 0 !== e && (a.strokeWidth = e, a = f.crisp(a)); a.fill = "none"; c && (a.r = c); f.rSetter = function (a, k, b) { h(b, { rx: a, ry: a }); }; return f.attr(a); }, setSize: function (a, k, b) {
                var p = this.alignedObjects, c = p.length;
                this.width = a;
                this.height = k;
                for (this.boxWrapper.animate({ width: a, height: k }, { step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }); }, duration: E(b, !0) ? void 0 : 0 }); c--;)
                    p[c].align();
            }, g: function (a) { var k = this.createElement("g"); return a ? k.attr({ "class": "highcharts-" + a }) : k; }, image: function (a, k, b, p, e) {
                var f = { preserveAspectRatio: "none" };
                1 < arguments.length && c(f, { x: k, y: b, width: p, height: e });
                f = this.createElement("image").attr(f);
                f.element.setAttributeNS ?
                    f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
                return f;
            }, symbol: function (a, k, b, p, f, d) {
                var m = this, x, r = /^url\((.*?)\)$/, y = r.test(a), N = !y && (this.symbols[a] ? a : "circle"), B = N && this.symbols[N], G = u(k) && B && B.call(this.symbols, Math.round(k), Math.round(b), p, f, d), w, O;
                B ? (x = this.path(G), x.attr("fill", "none"), c(x, { symbolName: N, x: k, y: b, width: p, height: f }), d && c(x, d)) : y && (w = a.match(r)[1], x = this.image(w), x.imgwidth = E(P[w] && P[w].width, d && d.width), x.imgheight =
                    E(P[w] && P[w].height, d && d.height), O = function () { x.attr({ width: x.width, height: x.height }); }, e(["width", "height"], function (a) { x[a + "Setter"] = function (a, k) { var b = {}, p = this["img" + k], c = "width" === k ? "translateX" : "translateY"; this[k] = a; u(p) && (this.element && this.element.setAttribute(k, p), this.alignByTranslate || (b[c] = ((this[k] || 0) - p) / 2, this.attr(b))); }; }), u(k) && x.attr({ x: k, y: b }), x.isImg = !0, u(x.imgwidth) && u(x.imgheight) ? O() : (x.attr({ width: 0, height: 0 }), v("img", { onload: function () {
                        var a = l[m.chartIndex];
                        0 === this.width &&
                            (n(this, { position: "absolute", top: "-999em" }), g.body.appendChild(this));
                        P[w] = { width: this.width, height: this.height };
                        x.imgwidth = this.width;
                        x.imgheight = this.height;
                        x.element && O();
                        this.parentNode && this.parentNode.removeChild(this);
                        m.imgCount--;
                        if (!m.imgCount && a && a.onload)
                            a.onload();
                    }, src: w }), this.imgCount++));
                return x;
            }, symbols: { circle: function (a, k, b, p) { return this.arc(a + b / 2, k + p / 2, b / 2, p / 2, { start: 0, end: 2 * Math.PI, open: !1 }); }, square: function (a, k, b, p) { return ["M", a, k, "L", a + b, k, a + b, k + p, a, k + p, "Z"]; }, triangle: function (a, k, b, p) { return ["M", a + b / 2, k, "L", a + b, k + p, a, k + p, "Z"]; }, "triangle-down": function (a, k, b, p) { return ["M", a, k, "L", a + b, k, a + b / 2, k + p, "Z"]; }, diamond: function (a, k, b, p) { return ["M", a + b / 2, k, "L", a + b, k + p / 2, a + b / 2, k + p, a, k + p / 2, "Z"]; }, arc: function (a, k, b, p, c) {
                    var e = c.start, f = c.r || b, d = c.r || p || b, m = c.end - .001;
                    b = c.innerR;
                    p = E(c.open, .001 > Math.abs(c.end - c.start - 2 * Math.PI));
                    var r = Math.cos(e), x = Math.sin(e), y = Math.cos(m), m = Math.sin(m);
                    c = .001 > c.end - e - Math.PI ? 0 : 1;
                    f = ["M", a + f * r, k + d * x, "A", f, d, 0, c, 1, a + f * y, k + d * m];
                    u(b) && f.push(p ? "M" : "L", a + b *
                        y, k + b * m, "A", b, b, 0, c, 0, a + b * r, k + b * x);
                    f.push(p ? "" : "Z");
                    return f;
                }, callout: function (a, k, b, p, c) {
                    var e = Math.min(c && c.r || 0, b, p), f = e + 6, d = c && c.anchorX;
                    c = c && c.anchorY;
                    var m;
                    m = ["M", a + e, k, "L", a + b - e, k, "C", a + b, k, a + b, k, a + b, k + e, "L", a + b, k + p - e, "C", a + b, k + p, a + b, k + p, a + b - e, k + p, "L", a + e, k + p, "C", a, k + p, a, k + p, a, k + p - e, "L", a, k + e, "C", a, k, a, k, a + e, k];
                    d && d > b ? c > k + f && c < k + p - f ? m.splice(13, 3, "L", a + b, c - 6, a + b + 6, c, a + b, c + 6, a + b, k + p - e) : m.splice(13, 3, "L", a + b, p / 2, d, c, a + b, p / 2, a + b, k + p - e) : d && 0 > d ? c > k + f && c < k + p - f ? m.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, k + e) : m.splice(33, 3, "L", a, p / 2, d, c, a, p / 2, a, k + e) : c && c > p && d > a + f && d < a + b - f ? m.splice(23, 3, "L", d + 6, k + p, d, k + p + 6, d - 6, k + p, a + e, k + p) : c && 0 > c && d > a + f && d < a + b - f && m.splice(3, 3, "L", d - 6, k, d, k - 6, d + 6, k, b - e, k);
                    return m;
                } }, clipRect: function (k, b, p, c) { var e = a.uniqueKey(), f = this.createElement("clipPath").attr({ id: e }).add(this.defs); k = this.rect(k, b, p, c, 0).add(f); k.id = e; k.clipPath = f; k.count = 0; return k; }, text: function (a, k, b, p) {
                var c = {};
                if (p && (this.allowHTML || !this.forExport))
                    return this.html(a, k, b);
                c.x = Math.round(k || 0);
                b && (c.y =
                    Math.round(b));
                if (a || 0 === a)
                    c.text = a;
                a = this.createElement("text").attr(c);
                p || (a.xSetter = function (a, k, b) { var p = b.getElementsByTagName("tspan"), c, e = b.getAttribute(k), f; for (f = 0; f < p.length; f++)
                    c = p[f], c.getAttribute(k) === e && c.setAttribute(k, a); b.setAttribute(k, a); });
                return a;
            }, fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? k(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return { h: b, b: Math.round(.8 *
                        b), f: a };
            }, rotCorr: function (a, k, p) { var c = a; k && p && (c = Math.max(c * Math.cos(k * b), 4)); return { x: -a / 3 * Math.sin(k * b), y: c }; }, label: function (k, b, f, d, m, r, y, N, B) {
                var x = this, g = x.g("button" !== B && "label"), w = g.text = x.text("", 0, 0, y).attr({ zIndex: 1 }), O, M, z = 0, n = 3, P = 0, l, D, h, J, E, C = {}, v, I, t = /^url\((.*?)\)$/.test(d), K = t, Q, q, R, T;
                B && g.addClass("highcharts-" + B);
                K = t;
                Q = function () { return (v || 0) % 2 / 2; };
                q = function () {
                    var a = w.element.style, k = {};
                    M = (void 0 === l || void 0 === D || E) && u(w.textStr) && w.getBBox();
                    g.width = (l || M.width || 0) + 2 * n + P;
                    g.height =
                        (D || M.height || 0) + 2 * n;
                    I = n + x.fontMetrics(a && a.fontSize, w).b;
                    K && (O || (g.box = O = x.symbols[d] || t ? x.symbol(d) : x.rect(), O.addClass(("button" === B ? "" : "highcharts-label-box") + (B ? " highcharts-" + B + "-box" : "")), O.add(g), a = Q(), k.x = a, k.y = (N ? -I : 0) + a), k.width = Math.round(g.width), k.height = Math.round(g.height), O.attr(c(k, C)), C = {});
                };
                R = function () { var a = P + n, k; k = N ? 0 : I; u(l) && M && ("center" === E || "right" === E) && (a += { center: .5, right: 1 }[E] * (l - M.width)); if (a !== w.x || k !== w.y)
                    w.attr("x", a), void 0 !== k && w.attr("y", k); w.x = a; w.y = k; };
                T = function (a, k) { O ? O.attr(a, k) : C[a] = k; };
                g.onAdd = function () { w.add(g); g.attr({ text: k || 0 === k ? k : "", x: b, y: f }); O && u(m) && g.attr({ anchorX: m, anchorY: r }); };
                g.widthSetter = function (k) { l = a.isNumber(k) ? k : null; };
                g.heightSetter = function (a) { D = a; };
                g["text-alignSetter"] = function (a) { E = a; };
                g.paddingSetter = function (a) { u(a) && a !== n && (n = g.padding = a, R()); };
                g.paddingLeftSetter = function (a) { u(a) && a !== P && (P = a, R()); };
                g.alignSetter = function (a) { a = { left: 0, center: .5, right: 1 }[a]; a !== z && (z = a, M && g.attr({ x: h })); };
                g.textSetter = function (a) {
                    void 0 !== a && w.textSetter(a);
                    q();
                    R();
                };
                g["stroke-widthSetter"] = function (a, k) { a && (K = !0); v = this["stroke-width"] = a; T(k, a); };
                g.strokeSetter = g.fillSetter = g.rSetter = function (a, k) { "r" !== k && ("fill" === k && a && (K = !0), g[k] = a); T(k, a); };
                g.anchorXSetter = function (a, k) { m = g.anchorX = a; T(k, Math.round(a) - Q() - h); };
                g.anchorYSetter = function (a, k) { r = g.anchorY = a; T(k, a - J); };
                g.xSetter = function (a) { g.x = a; z && (a -= z * ((l || M.width) + 2 * n)); h = Math.round(a); g.attr("translateX", h); };
                g.ySetter = function (a) { J = g.y = Math.round(a); g.attr("translateY", J); };
                var U = g.css;
                return c(g, { css: function (a) {
                        if (a) {
                            var k = {};
                            a = G(a);
                            e(g.textProps, function (b) { void 0 !== a[b] && (k[b] = a[b], delete a[b]); });
                            w.css(k);
                        }
                        return U.call(g, a);
                    }, getBBox: function () { return { width: M.width + 2 * n, height: M.height + 2 * n, x: M.x - n, y: M.y - n }; }, shadow: function (a) { a && (q(), O && O.shadow(a)); return g; }, destroy: function () { p(g.element, "mouseenter"); p(g.element, "mouseleave"); w && (w = w.destroy()); O && (O = O.destroy()); A.prototype.destroy.call(g); g = x = q = R = T = null; } });
            } });
        a.Renderer = H;
    })(L);
    (function (a) {
        var A = a.attr, H = a.createElement, F = a.css, q = a.defined, h = a.each, l = a.extend, t = a.isFirefox, n = a.isMS, v = a.isWebKit, u = a.pick, b = a.pInt, d = a.SVGRenderer, g = a.win, e = a.wrap;
        l(a.SVGElement.prototype, { htmlCss: function (a) { var b = this.element; if (b = a && "SPAN" === b.tagName && a.width)
                delete a.width, this.textWidth = b, this.updateTransform(); a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"); this.styles = l(this.styles, a); F(this.element, a); return this; }, htmlGetBBox: function () { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight }; },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, e = this.element, f = this.translateX || 0, d = this.translateY || 0, g = this.x || 0, n = this.y || 0, z = this.textAlign || "left", l = { left: 0, center: .5, right: 1 }[z], D = this.styles, C = D && D.whiteSpace;
                    F(e, { marginLeft: f, marginTop: d });
                    this.shadows && h(this.shadows, function (a) { F(a, { marginLeft: f + 1, marginTop: d + 1 }); });
                    this.inverted && h(e.childNodes, function (b) { a.invertChild(b, e); });
                    if ("SPAN" === e.tagName) {
                        var D = this.rotation, y = this.textWidth && b(this.textWidth), G = [D, z, e.innerHTML,
                            this.textAlign].join(), B;
                        (B = y !== this.oldTextWidth) && !(B = y > this.oldTextWidth) && ((B = this.textPxLength) || (F(e, { width: "", whiteSpace: C || "nowrap" }), B = e.offsetWidth), B = B > y);
                        B && /[ \-]/.test(e.textContent || e.innerText) && (F(e, { width: y + "px", display: "block", whiteSpace: C || "normal" }), this.oldTextWidth = y);
                        G !== this.cTT && (C = a.fontMetrics(e.style.fontSize).b, q(D) && D !== (this.oldRotation || 0) && this.setSpanRotation(D, l, C), this.getSpanCorrection(this.textPxLength || e.offsetWidth, C, l, D, z));
                        F(e, { left: g + (this.xCorr || 0) + "px",
                            top: n + (this.yCorr || 0) + "px" });
                        this.cTT = G;
                        this.oldRotation = D;
                    }
                }
                else
                    this.alignOnAdd = !0;
            }, setSpanRotation: function (a, b, e) { var c = {}, f = this.renderer.getTransformKey(); c[f] = c.transform = "rotate(" + a + "deg)"; c[f + (t ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + e + "px"; F(this.element, c); }, getSpanCorrection: function (a, b, e) { this.xCorr = -a * e; this.yCorr = -b; } });
        l(d.prototype, { getTransformKey: function () {
                return n && !/Edge/.test(g.navigator.userAgent) ? "-ms-transform" : v ? "-webkit-transform" : t ? "MozTransform" : g.opera ? "-o-transform" :
                    "";
            }, html: function (a, b, f) {
                var c = this.createElement("span"), d = c.element, m = c.renderer, g = m.isSVG, n = function (a, b) { h(["opacity", "visibility"], function (c) { e(a, c + "Setter", function (a, c, e, f) { a.call(this, c, e, f); b[e] = c; }); }); };
                c.textSetter = function (a) { a !== d.innerHTML && delete this.bBox; this.textStr = a; d.innerHTML = u(a, ""); c.doTransform = !0; };
                g && n(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) { "align" === b && (b = "textAlign"); c[b] = a; c.doTransform = !0; };
                c.attr({ text: a, x: Math.round(b), y: Math.round(f) }).css({ fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize, position: "absolute" });
                d.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                c.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1); };
                g && (c.add = function (a) {
                    var b, e = m.box.parentNode, f = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;)
                                f.push(a), a = a.parentGroup;
                            h(f.reverse(), function (a) {
                                function d(k, b) { a[b] = k; "translateX" === b ? m.left = k + "px" : m.top = k + "px"; a.doTransform = !0; }
                                var m, k = A(a.element, "class");
                                k && (k = { className: k });
                                b = a.div = a.div || H("div", k, { position: "absolute",
                                    left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, b || e);
                                m = b.style;
                                l(a, { classSetter: function (a) { return function (k) { this.element.setAttribute("class", k); a.className = k; }; }(b), on: function () { f[0].div && c.on.apply({ element: f[0].div }, arguments); return a; }, translateXSetter: d, translateYSetter: d });
                                n(a, m);
                            });
                        }
                    }
                    else
                        b = e;
                    b.appendChild(d);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c;
                });
                return c;
            } });
    })(L);
    (function (a) {
        var A = a.defined, H = a.each, F = a.extend, q = a.merge, h = a.pick, l = a.timeUnits, t = a.win;
        a.Time = function (a) { this.update(a, !1); };
        a.Time.prototype = { defaultOptions: {}, update: function (n) {
                var l = h(n && n.useUTC, !0), u = this;
                this.options = n = q(!0, this.options || {}, n);
                this.Date = n.Date || t.Date;
                this.timezoneOffset = (this.useUTC = l) && n.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(l && !n.getTimezoneOffset && !n.timezone)) || this.timezoneOffset ? (this.get = function (a, d) {
                    var b = d.getTime(), e = b - u.getTimezoneOffset(d);
                    d.setTime(e);
                    a = d["getUTC" + a]();
                    d.setTime(b);
                    return a;
                }, this.set = function (b, d, g) { var e; if (-1 !== a.inArray(b, ["Milliseconds", "Seconds", "Minutes"]))
                    d["set" + b](g);
                else
                    e = u.getTimezoneOffset(d), e = d.getTime() - e, d.setTime(e), d["setUTC" + b](g), b = u.getTimezoneOffset(d), e = d.getTime() + b, d.setTime(e); }) : l ? (this.get = function (a, d) { return d["getUTC" + a](); }, this.set = function (a, d, g) { return d["setUTC" + a](g); }) : (this.get = function (a, d) { return d["get" + a](); }, this.set = function (a, d, g) { return d["set" + a](g); });
            }, makeTime: function (n, l, u, b, d, g) { var e, c, m; this.useUTC ? (e = this.Date.UTC.apply(0, arguments), c = this.getTimezoneOffset(e), e += c, m = this.getTimezoneOffset(e), c !== m ? e += m - c : c - 36E5 === this.getTimezoneOffset(e - 36E5) && (a.isChrome || a.isMS) && (e -= 36E5)) : e = (new this.Date(n, l, h(u, 1), h(b, 0), h(d, 0), h(g, 0))).getTime(); return e; }, timezoneOffsetFunction: function () {
                var n = this, l = this.options, h = t.moment;
                if (!this.useUTC)
                    return function (a) { return 6E4 * (new Date(a)).getTimezoneOffset(); };
                if (l.timezone) {
                    if (h)
                        return function (a) { return 6E4 * -h.tz(a, l.timezone).utcOffset(); };
                    a.error(25);
                }
                return this.useUTC && l.getTimezoneOffset ? function (a) { return 6E4 * l.getTimezoneOffset(a); } : function () { return 6E4 * (n.timezoneOffset || 0); };
            }, dateFormat: function (n, l, h) {
                if (!a.defined(l) || isNaN(l))
                    return a.defaultOptions.lang.invalidDate || "";
                n = a.pick(n, "%Y-%m-%d %H:%M:%S");
                var b = this, d = new this.Date(l), g = this.get("Hours", d), e = this.get("Day", d), c = this.get("Date", d), m = this.get("Month", d), f = this.get("FullYear", d), r = a.defaultOptions.lang, w = r.weekdays, u = r.shortWeekdays, z = a.pad, d = a.extend({ a: u ? u[e] : w[e].substr(0, 3), A: w[e], d: z(c), e: z(c, 2, " "), w: e, b: r.shortMonths[m], B: r.months[m], m: z(m + 1), y: f.toString().substr(2, 2), Y: f, H: z(g), k: g, I: z(g % 12 || 12), l: g % 12 || 12, M: z(b.get("Minutes", d)), p: 12 > g ? "AM" : "PM", P: 12 > g ? "am" : "pm", S: z(d.getSeconds()), L: z(Math.round(l % 1E3), 3) }, a.dateFormats);
                a.objectEach(d, function (a, c) { for (; -1 !== n.indexOf("%" + c);)
                    n = n.replace("%" + c, "function" === typeof a ? a.call(b, l) : a); });
                return h ? n.substr(0, 1).toUpperCase() + n.substr(1) : n;
            }, getTimeTicks: function (a, v, u, b) {
                var d = this, g = [], e = {}, c, m = new d.Date(v), f = a.unitRange, r = a.count || 1, w;
                if (A(v)) {
                    d.set("Milliseconds", m, f >= l.second ? 0 : r * Math.floor(d.get("Milliseconds", m) / r));
                    f >= l.second && d.set("Seconds", m, f >= l.minute ? 0 : r * Math.floor(d.get("Seconds", m) / r));
                    f >= l.minute && d.set("Minutes", m, f >= l.hour ? 0 : r * Math.floor(d.get("Minutes", m) / r));
                    f >= l.hour && d.set("Hours", m, f >= l.day ? 0 : r * Math.floor(d.get("Hours", m) / r));
                    f >= l.day && d.set("Date", m, f >= l.month ? 1 : r * Math.floor(d.get("Date", m) / r));
                    f >= l.month && (d.set("Month", m, f >= l.year ? 0 : r * Math.floor(d.get("Month", m) / r)), c = d.get("FullYear", m));
                    f >= l.year && d.set("FullYear", m, c - c % r);
                    f === l.week && d.set("Date", m, d.get("Date", m) - d.get("Day", m) + h(b, 1));
                    c = d.get("FullYear", m);
                    b = d.get("Month", m);
                    var n = d.get("Date", m), z = d.get("Hours", m);
                    v = m.getTime();
                    d.variableTimezone && (w = u - v > 4 * l.month || d.getTimezoneOffset(v) !== d.getTimezoneOffset(u));
                    m = m.getTime();
                    for (v = 1; m < u;)
                        g.push(m), m = f === l.year ? d.makeTime(c + v * r, 0) : f === l.month ? d.makeTime(c, b + v * r) : !w || f !== l.day && f !== l.week ? w && f === l.hour && 1 < r ? d.makeTime(c, b, n, z + v * r) : m + f * r : d.makeTime(c, b, n + v * r * (f === l.day ? 1 : 7)),
                            v++;
                    g.push(m);
                    f <= l.hour && 1E4 > g.length && H(g, function (a) { 0 === a % 18E5 && "000000000" === d.dateFormat("%H%M%S%L", a) && (e[a] = "day"); });
                }
                g.info = F(a, { higherRanks: e, totalRange: f * r });
                return g;
            } };
    })(L);
    (function (a) {
        var A = a.color, H = a.merge;
        a.defaultOptions = { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: {}, time: a.Time.prototype.defaultOptions, chart: { borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null,
                height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: { enabled: !0, align: "center", layout: "horizontal", labelFormatter: function () { return this.name; }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", fontSize: "12px",
                    fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: { enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: A("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e', shadow: !0,
                style: { color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap" } }, credits: { enabled: !0, href: "http://www.highcharts.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };
        a.setOptions = function (A) { a.defaultOptions = H(!0, a.defaultOptions, A); a.time.update(H(a.defaultOptions.global, a.defaultOptions.time), !1); return a.defaultOptions; };
        a.getOptions = function () { return a.defaultOptions; };
        a.defaultPlotOptions =
            a.defaultOptions.plotOptions;
        a.time = new a.Time(H(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (A, q, h) { return a.time.dateFormat(A, q, h); };
    })(L);
    (function (a) {
        var A = a.correctFloat, H = a.defined, F = a.destroyObjectProperties, q = a.isNumber, h = a.merge, l = a.pick, t = a.deg2rad;
        a.Tick = function (a, l, h, b) { this.axis = a; this.pos = l; this.type = h || ""; this.isNewLabel = this.isNew = !0; h || b || this.addLabel(); };
        a.Tick.prototype = { addLabel: function () {
                var a = this.axis, v = a.options, u = a.chart, b = a.categories, d = a.names, g = this.pos, e = v.labels, c = a.tickPositions, m = g === c[0], f = g === c[c.length - 1], d = b ? l(b[g], d[g], g) : g, b = this.label, c = c.info, r;
                a.isDatetimeAxis && c && (r = v.dateTimeLabelFormats[c.higherRanks[g] || c.unitName]);
                this.isFirst = m;
                this.isLast = f;
                v = a.labelFormatter.call({ axis: a, chart: u, isFirst: m, isLast: f, dateTimeLabelFormat: r, value: a.isLog ? A(a.lin2log(d)) : d, pos: g });
                if (H(b))
                    b && b.attr({ text: v });
                else {
                    if (this.label = b = H(v) && e.enabled ? u.renderer.text(v, 0, 0, e.useHTML).css(h(e.style)).add(a.labelGroup) : null)
                        b.textPxLength = b.getBBox().width;
                    this.rotation = 0;
                }
            }, getLabelSize: function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0; }, handleOverflow: function (a) {
                var n = this.axis, h = n.options.labels, b = a.x, d = n.chart.chartWidth, g = n.chart.spacing, e = l(n.labelLeft, Math.min(n.pos, g[3])), g = l(n.labelRight, Math.max(n.isRadial ? 0 : n.pos + n.len, d - g[1])), c = this.label, m = this.rotation, f = { left: 0, center: .5, right: 1 }[n.labelAlign || c.attr("align")], r = c.getBBox().width, w = n.getSlotWidth(), K = w, z = 1, I, D = {};
                if (m || !1 === h.overflow)
                    0 > m && b - f * r < e ?
                        I = Math.round(b / Math.cos(m * t) - e) : 0 < m && b + f * r > g && (I = Math.round((d - b) / Math.cos(m * t)));
                else if (d = b + (1 - f) * r, b - f * r < e ? K = a.x + K * (1 - f) - e : d > g && (K = g - a.x + K * f, z = -1), K = Math.min(w, K), K < w && "center" === n.labelAlign && (a.x += z * (w - K - f * (w - Math.min(r, K)))), r > K || n.autoRotation && (c.styles || {}).width)
                    I = K;
                I && (D.width = I, (h.style || {}).textOverflow || (D.textOverflow = "ellipsis"), c.css(D));
            }, getPosition: function (a, l, h, b) {
                var d = this.axis, g = d.chart, e = b && g.oldChartHeight || g.chartHeight;
                return { x: a ? d.translate(l + h, null, null, b) + d.transB : d.left +
                        d.offset + (d.opposite ? (b && g.oldChartWidth || g.chartWidth) - d.right - d.left : 0), y: a ? e - d.bottom + d.offset - (d.opposite ? d.height : 0) : e - d.translate(l + h, null, null, b) - d.transB };
            }, getLabelPosition: function (a, l, h, b, d, g, e, c) {
                var m = this.axis, f = m.transA, r = m.reversed, w = m.staggerLines, n = m.tickRotCorr || { x: 0, y: 0 }, z = d.y, u = b || m.reserveSpaceDefault ? 0 : -m.labelOffset * ("center" === m.labelAlign ? .5 : 1);
                H(z) || (z = 0 === m.side ? h.rotation ? -8 : -h.getBBox().height : 2 === m.side ? n.y + 8 : Math.cos(h.rotation * t) * (n.y - h.getBBox(!1, 0).height / 2));
                a = a +
                    d.x + u + n.x - (g && b ? g * f * (r ? -1 : 1) : 0);
                l = l + z - (g && !b ? g * f * (r ? 1 : -1) : 0);
                w && (h = e / (c || 1) % w, m.opposite && (h = w - h - 1), l += m.labelOffset / w * h);
                return { x: a, y: Math.round(l) };
            }, getMarkPath: function (a, l, h, b, d, g) { return g.crispLine(["M", a, l, "L", a + (d ? 0 : -h), l + (d ? h : 0)], b); }, renderGridLine: function (a, l, h) {
                var b = this.axis, d = b.options, g = this.gridLine, e = {}, c = this.pos, m = this.type, f = b.tickmarkOffset, r = b.chart.renderer, w = m ? m + "Grid" : "grid", n = d[w + "LineWidth"], z = d[w + "LineColor"], d = d[w + "LineDashStyle"];
                g || (e.stroke = z, e["stroke-width"] = n, d &&
                    (e.dashstyle = d), m || (e.zIndex = 1), a && (e.opacity = 0), this.gridLine = g = r.path().attr(e).addClass("highcharts-" + (m ? m + "-" : "") + "grid-line").add(b.gridGroup));
                if (!a && g && (a = b.getPlotLinePath(c + f, g.strokeWidth() * h, a, !0)))
                    g[this.isNew ? "attr" : "animate"]({ d: a, opacity: l });
            }, renderMark: function (a, h, u) {
                var b = this.axis, d = b.options, g = b.chart.renderer, e = this.type, c = e ? e + "Tick" : "tick", m = b.tickSize(c), f = this.mark, r = !f, w = a.x;
                a = a.y;
                var n = l(d[c + "Width"], !e && b.isXAxis ? 1 : 0), d = d[c + "Color"];
                m && (b.opposite && (m[0] = -m[0]), r && (this.mark =
                    f = g.path().addClass("highcharts-" + (e ? e + "-" : "") + "tick").add(b.axisGroup), f.attr({ stroke: d, "stroke-width": n })), f[r ? "attr" : "animate"]({ d: this.getMarkPath(w, a, m[0], f.strokeWidth() * u, b.horiz, g), opacity: h }));
            }, renderLabel: function (a, h, u, b) {
                var d = this.axis, g = d.horiz, e = d.options, c = this.label, m = e.labels, f = m.step, d = d.tickmarkOffset, r = !0, w = a.x;
                a = a.y;
                c && q(w) && (c.xy = a = this.getLabelPosition(w, a, c, g, m, d, b, f), this.isFirst && !this.isLast && !l(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !l(e.showLastLabel, 1) ? r = !1 :
                    !g || m.step || m.rotation || h || 0 === u || this.handleOverflow(a), f && b % f && (r = !1), r && q(a.y) ? (a.opacity = u, c[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (c.attr("y", -9999), this.isNewLabel = !0));
            }, render: function (a, h, u) { var b = this.axis, d = b.horiz, g = this.getPosition(d, this.pos, b.tickmarkOffset, h), e = g.x, c = g.y, b = d && e === b.pos + b.len || !d && c === b.pos ? -1 : 1; u = l(u, 1); this.isActive = !0; this.renderGridLine(h, u, b); this.renderMark(g, u, b); this.renderLabel(g, h, u, a); this.isNew = !1; }, destroy: function () { F(this, this.axis); } };
    })(L);
    var V = function (a) {
        var A = a.addEvent, H = a.animObject, F = a.arrayMax, q = a.arrayMin, h = a.color, l = a.correctFloat, t = a.defaultOptions, n = a.defined, v = a.deg2rad, u = a.destroyObjectProperties, b = a.each, d = a.extend, g = a.fireEvent, e = a.format, c = a.getMagnitude, m = a.grep, f = a.inArray, r = a.isArray, w = a.isNumber, K = a.isString, z = a.merge, I = a.normalizeTickInterval, D = a.objectEach, C = a.pick, y = a.removeEvent, G = a.splat, B = a.syncTimeout, J = a.Tick, E = function () { this.init.apply(this, arguments); };
        a.extend(E.prototype, { defaultOptions: { dateTimeLabelFormats: { millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y" }, endOnTick: !1, labels: { enabled: !0, style: { color: "#666666", cursor: "default", fontSize: "11px" }, x: 0 }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999",
                lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb" }, defaultYAxisOptions: { endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, maxPadding: .05, minPadding: .05, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { allowOverlap: !1, enabled: !1, formatter: function () { return a.numberFormat(this.total, -1); }, style: { fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
            defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, init: function (a, b) {
                var k = b.isX, p = this;
                p.chart = a;
                p.horiz = a.inverted && !p.isZAxis ? !k : k;
                p.isXAxis = k;
                p.coll = p.coll || (k ? "xAxis" : "yAxis");
                p.opposite = b.opposite;
                p.side = b.side || (p.horiz ? p.opposite ? 0 : 2 : p.opposite ? 1 : 3);
                p.setOptions(b);
                var c = this.options, e = c.type;
                p.labelFormatter = c.labels.formatter ||
                    p.defaultLabelFormatter;
                p.userOptions = b;
                p.minPixelPadding = 0;
                p.reversed = c.reversed;
                p.visible = !1 !== c.visible;
                p.zoomEnabled = !1 !== c.zoomEnabled;
                p.hasNames = "category" === e || !0 === c.categories;
                p.categories = c.categories || p.hasNames;
                p.names = p.names || [];
                p.plotLinesAndBandsGroups = {};
                p.isLog = "logarithmic" === e;
                p.isDatetimeAxis = "datetime" === e;
                p.positiveValuesOnly = p.isLog && !p.allowNegativeLog;
                p.isLinked = n(c.linkedTo);
                p.ticks = {};
                p.labelEdge = [];
                p.minorTicks = {};
                p.plotLinesAndBands = [];
                p.alternateBands = {};
                p.len = 0;
                p.minRange =
                    p.userMinRange = c.minRange || c.maxZoom;
                p.range = c.range;
                p.offset = c.offset || 0;
                p.stacks = {};
                p.oldStacks = {};
                p.stacksTouched = 0;
                p.max = null;
                p.min = null;
                p.crosshair = C(c.crosshair, G(a.options.tooltip.crosshairs)[k ? 0 : 1], !1);
                b = p.options.events;
                -1 === f(p, a.axes) && (k ? a.axes.splice(a.xAxis.length, 0, p) : a.axes.push(p), a[p.coll].push(p));
                p.series = p.series || [];
                a.inverted && !p.isZAxis && k && void 0 === p.reversed && (p.reversed = !0);
                D(b, function (a, k) { A(p, k, a); });
                p.lin2log = c.linearToLogConverter || p.lin2log;
                p.isLog && (p.val2lin = p.log2lin,
                    p.lin2val = p.lin2log);
            }, setOptions: function (a) { this.options = z(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], z(t[this.coll], a)); }, defaultLabelFormatter: function () {
                var k = this.axis, b = this.value, c = k.chart.time, f = k.categories, d = this.dateTimeLabelFormat, m = t.lang, r = m.numericSymbols, m = m.numericSymbolMagnitude || 1E3, y = r && r.length, g, w = k.options.labels.format, k = k.isLog ?
                    Math.abs(b) : k.tickInterval;
                if (w)
                    g = e(w, this, c);
                else if (f)
                    g = b;
                else if (d)
                    g = c.dateFormat(d, b);
                else if (y && 1E3 <= k)
                    for (; y-- && void 0 === g;)
                        c = Math.pow(m, y + 1), k >= c && 0 === 10 * b % c && null !== r[y] && 0 !== b && (g = a.numberFormat(b / c, -1) + r[y]);
                void 0 === g && (g = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return g;
            }, getSeriesExtremes: function () {
                var a = this, p = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                b(a.series, function (k) {
                    if (k.visible ||
                        !p.options.chart.ignoreHiddenSeries) {
                        var b = k.options, c = b.threshold, e;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= c && (c = null);
                        if (a.isXAxis)
                            b = k.xData, b.length && (k = q(b), e = F(b), w(k) || k instanceof Date || (b = m(b, w), k = q(b), e = F(b)), b.length && (a.dataMin = Math.min(C(a.dataMin, b[0], k), k), a.dataMax = Math.max(C(a.dataMax, b[0], e), e)));
                        else if (k.getExtremes(), e = k.dataMax, k = k.dataMin, n(k) && n(e) && (a.dataMin = Math.min(C(a.dataMin, k), k), a.dataMax = Math.max(C(a.dataMax, e), e)), n(c) && (a.threshold = c), !b.softThreshold || a.positiveValuesOnly)
                            a.softThreshold =
                                !1;
                    }
                });
            }, translate: function (a, b, c, e, f, d) { var k = this.linkedParent || this, p = 1, m = 0, r = e ? k.oldTransA : k.transA; e = e ? k.oldMin : k.min; var y = k.minPixelPadding; f = (k.isOrdinal || k.isBroken || k.isLog && f) && k.lin2val; r || (r = k.transA); c && (p *= -1, m = k.len); k.reversed && (p *= -1, m -= p * (k.sector || k.len)); b ? (a = (a * p + m - y) / r + e, f && (a = k.lin2val(a))) : (f && (a = k.val2lin(a)), a = w(e) ? p * (a - e) * r + m + p * y + (w(d) ? r * d : 0) : void 0); return a; }, toPixels: function (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos); }, toValue: function (a, b) {
                return this.translate(a -
                    (b ? 0 : this.pos), !0, !this.horiz, null, !0);
            }, getPlotLinePath: function (a, b, c, e, f) {
                var k = this.chart, p = this.left, d = this.top, m, r, y = c && k.oldChartHeight || k.chartHeight, g = c && k.oldChartWidth || k.chartWidth, N;
                m = this.transB;
                var B = function (a, k, b) { if (a < k || a > b)
                    e ? a = Math.min(Math.max(k, a), b) : N = !0; return a; };
                f = C(f, this.translate(a, null, null, c));
                f = Math.min(Math.max(-1E5, f), 1E5);
                a = c = Math.round(f + m);
                m = r = Math.round(y - f - m);
                w(f) ? this.horiz ? (m = d, r = y - this.bottom, a = c = B(a, p, p + this.width)) : (a = p, c = g - this.right, m = r = B(m, d, d + this.height)) :
                    (N = !0, e = !1);
                return N && !e ? null : k.renderer.crispLine(["M", a, m, "L", c, r], b || 1);
            }, getLinearTickPositions: function (a, b, c) { var k, p = l(Math.floor(b / a) * a); c = l(Math.ceil(c / a) * a); var e = [], f; l(p + a) === p && (f = 20); if (this.single)
                return [b]; for (b = p; b <= c;) {
                e.push(b);
                b = l(b + a, f);
                if (b === k)
                    break;
                k = b;
            } return e; }, getMinorTickInterval: function () { var a = this.options; return !0 === a.minorTicks ? C(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval; }, getMinorTickPositions: function () {
                var a = this, p = a.options, c = a.tickPositions, e = a.minorTickInterval, f = [], d = a.pointRangePadding || 0, m = a.min - d, d = a.max + d, r = d - m;
                if (r && r / e < a.len / 3)
                    if (a.isLog)
                        b(this.paddedTicks, function (k, b, p) { b && f.push.apply(f, a.getLogTickPositions(e, p[b - 1], p[b], !0)); });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval())
                        f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), m, d, p.startOfWeek));
                    else
                        for (p = m + (c[0] - m) % e; p <= d && p !== f[0]; p += e)
                            f.push(p);
                0 !== f.length && a.trimTicks(f);
                return f;
            }, adjustForMinRange: function () {
                var a = this.options, p = this.min, c = this.max, e, f, d, m, r, y, g, w;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (n(a.min) || n(a.max) ? this.minRange = null : (b(this.series, function (a) { y = a.xData; for (m = g = a.xIncrement ? 1 : y.length - 1; 0 < m; m--)
                    if (r = y[m] - y[m - 1], void 0 === d || r < d)
                        d = r; }), this.minRange = Math.min(5 * d, this.dataMax - this.dataMin)));
                c - p < this.minRange && (f = this.dataMax - this.dataMin >= this.minRange, w = this.minRange, e = (w - c + p) / 2, e = [p - e, C(a.min, p - e)], f && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), p = F(e), c = [p + w, C(a.max, p + w)], f && (c[2] = this.isLog ?
                    this.log2lin(this.dataMax) : this.dataMax), c = q(c), c - p < w && (e[0] = c - w, e[1] = C(a.min, c - w), p = F(e)));
                this.min = p;
                this.max = c;
            }, getClosest: function () { var a; this.categories ? a = 1 : b(this.series, function (k) { var b = k.closestPointRange, p = k.visible || !k.chart.options.chart.ignoreHiddenSeries; !k.noSharedTooltip && n(b) && p && (a = n(a) ? Math.min(a, b) : b); }); return a; }, nameToX: function (a) {
                var k = r(this.categories), b = k ? this.categories : this.names, c = a.options.x, e;
                a.series.requireSorting = !1;
                n(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() :
                    k ? f(a.name, b) : C(b["s" + a.name], -1));
                -1 === c ? k || (e = b.length) : e = c;
                void 0 !== e && (this.names[e] = a.name, this.names["s" + a.name] = e);
                return e;
            }, updateNames: function () { var a = this, p = this.names, c = p.length; if (0 < c) {
                for (; c--;)
                    delete p["s" + p[c]];
                p.length = 0;
                this.minRange = this.userMinRange;
                b(this.series || [], function (k) { k.xIncrement = null; if (!k.points || k.isDirtyData)
                    k.processData(), k.generatePoints(); b(k.points, function (b, p) { var c; b.options && (c = a.nameToX(b), void 0 !== c && c !== b.x && (b.x = c, k.xData[p] = c)); }); });
            } }, setAxisTranslation: function (a) {
                var k = this, c = k.max - k.min, e = k.axisPointRange || 0, f, d = 0, m = 0, r = k.linkedParent, y = !!k.categories, g = k.transA, w = k.isXAxis;
                if (w || y || e)
                    f = k.getClosest(), r ? (d = r.minPointOffset, m = r.pointRangePadding) : b(k.series, function (a) { var b = y ? 1 : w ? C(a.options.pointRange, f, 0) : k.axisPointRange || 0; a = a.options.pointPlacement; e = Math.max(e, b); k.single || (d = Math.max(d, K(a) ? 0 : b / 2), m = Math.max(m, "on" === a ? 0 : b)); }), r = k.ordinalSlope && f ? k.ordinalSlope / f : 1, k.minPointOffset = d *= r, k.pointRangePadding = m *= r, k.pointRange = Math.min(e, c), w && (k.closestPointRange =
                        f);
                a && (k.oldTransA = g);
                k.translationSlope = k.transA = g = k.options.staticScale || k.len / (c + m || 1);
                k.transB = k.horiz ? k.left : k.bottom;
                k.minPixelPadding = g * d;
            }, minFromRange: function () { return this.max - this.range; }, setTickInterval: function (k) {
                var p = this, e = p.chart, f = p.options, d = p.isLog, m = p.log2lin, r = p.isDatetimeAxis, y = p.isXAxis, B = p.isLinked, G = f.maxPadding, h = f.minPadding, z = f.tickInterval, D = f.tickPixelInterval, J = p.categories, E = p.threshold, u = p.softThreshold, t, v, q, K;
                r || J || B || this.getTickAmount();
                q = C(p.userMin, f.min);
                K =
                    C(p.userMax, f.max);
                B ? (p.linkedParent = e[p.coll][f.linkedTo], e = p.linkedParent.getExtremes(), p.min = C(e.min, e.dataMin), p.max = C(e.max, e.dataMax), f.type !== p.linkedParent.options.type && a.error(11, 1)) : (!u && n(E) && (p.dataMin >= E ? (t = E, h = 0) : p.dataMax <= E && (v = E, G = 0)), p.min = C(q, t, p.dataMin), p.max = C(K, v, p.dataMax));
                d && (p.positiveValuesOnly && !k && 0 >= Math.min(p.min, C(p.dataMin, p.min)) && a.error(10, 1), p.min = l(m(p.min), 15), p.max = l(m(p.max), 15));
                p.range && n(p.max) && (p.userMin = p.min = q = Math.max(p.dataMin, p.minFromRange()),
                    p.userMax = K = p.max, p.range = null);
                g(p, "foundExtremes");
                p.beforePadding && p.beforePadding();
                p.adjustForMinRange();
                !(J || p.axisPointRange || p.usePercentage || B) && n(p.min) && n(p.max) && (m = p.max - p.min) && (!n(q) && h && (p.min -= m * h), !n(K) && G && (p.max += m * G));
                w(f.softMin) && !w(p.userMin) && (p.min = Math.min(p.min, f.softMin));
                w(f.softMax) && !w(p.userMax) && (p.max = Math.max(p.max, f.softMax));
                w(f.floor) && (p.min = Math.max(p.min, f.floor));
                w(f.ceiling) && (p.max = Math.min(p.max, f.ceiling));
                u && n(p.dataMin) && (E = E || 0, !n(q) && p.min < E && p.dataMin >=
                    E ? p.min = E : !n(K) && p.max > E && p.dataMax <= E && (p.max = E));
                p.tickInterval = p.min === p.max || void 0 === p.min || void 0 === p.max ? 1 : B && !z && D === p.linkedParent.options.tickPixelInterval ? z = p.linkedParent.tickInterval : C(z, this.tickAmount ? (p.max - p.min) / Math.max(this.tickAmount - 1, 1) : void 0, J ? 1 : (p.max - p.min) * D / Math.max(p.len, D));
                y && !k && b(p.series, function (a) { a.processData(p.min !== p.oldMin || p.max !== p.oldMax); });
                p.setAxisTranslation(!0);
                p.beforeSetTickPositions && p.beforeSetTickPositions();
                p.postProcessTickInterval && (p.tickInterval =
                    p.postProcessTickInterval(p.tickInterval));
                p.pointRange && !z && (p.tickInterval = Math.max(p.pointRange, p.tickInterval));
                k = C(f.minTickInterval, p.isDatetimeAxis && p.closestPointRange);
                !z && p.tickInterval < k && (p.tickInterval = k);
                r || d || z || (p.tickInterval = I(p.tickInterval, null, c(p.tickInterval), C(f.allowDecimals, !(.5 < p.tickInterval && 5 > p.tickInterval && 1E3 < p.max && 9999 > p.max)), !!this.tickAmount));
                this.tickAmount || (p.tickInterval = p.unsquish());
                this.setTickPositions();
            }, setTickPositions: function () {
                var a = this.options, b, c = a.tickPositions;
                b = this.getMinorTickInterval();
                var e = a.tickPositioner, f = a.startOnTick, d = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && n(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, f, d);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c ||
                    e || this.adjustTickAmount());
            }, trimTicks: function (a, b, c) { var k = a[0], e = a[a.length - 1], p = this.minPointOffset || 0; if (!this.isLinked) {
                if (b && -Infinity !== k)
                    this.min = k;
                else
                    for (; this.min - p > a[0];)
                        a.shift();
                if (c)
                    this.max = e;
                else
                    for (; this.max + p < a[a.length - 1];)
                        a.pop();
                0 === a.length && n(k) && !this.options.tickPositions && a.push((e + k) / 2);
            } }, alignToOthers: function () {
                var a = {}, c, e = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || this.isLog || b(this.chart[this.coll], function (k) {
                    var b = k.options, b = [k.horiz ?
                            b.left : b.top, b.width, b.height, b.pane].join();
                    k.series.length && (a[b] ? c = !0 : a[b] = 1);
                });
                return c;
            }, getTickAmount: function () { var a = this.options, b = a.tickAmount, c = a.tickPixelInterval; !n(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2); !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1); 4 > b && (this.finalTickAmt = b, b = 5); this.tickAmount = b; }, adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, e = this.finalTickAmt, f = b && b.length, d = C(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (f < c) {
                        for (; b.length < c;)
                            b.length % 2 || this.min === d ? b.push(l(b[b.length - 1] + a)) : b.unshift(l(b[0] - a));
                        this.transA *= (f - 1) / (c - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1];
                    }
                    else
                        f > c && (this.tickInterval *= 2, this.setTickPositions());
                    if (n(e)) {
                        for (a = c = b.length; a--;)
                            (3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0;
                    }
                }
            }, setScale: function () {
                var a, c;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                c = this.len !==
                    this.oldAxisLength;
                b(this.series, function (b) { if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)
                    a = !0; });
                c || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
            },
            setExtremes: function (a, c, e, f, m) { var k = this, p = k.chart; e = C(e, !0); b(k.series, function (a) { delete a.kdTree; }); m = d(m, { min: a, max: c }); g(k, "setExtremes", m, function () { k.userMin = a; k.userMax = c; k.eventArgs = m; e && p.redraw(f); }); }, zoom: function (a, b) {
                var k = this.dataMin, c = this.dataMax, e = this.options, f = Math.min(k, C(e.min, k)), e = Math.max(c, C(e.max, c));
                if (a !== this.min || b !== this.max)
                    this.allowZoomOutside || (n(k) && (a < f && (a = f), a > e && (a = e)), n(c) && (b < f && (b = f), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, { trigger: "zoom" });
                return !0;
            }, setAxisSize: function () {
                var b = this.chart, c = this.options, e = c.offsets || [0, 0, 0, 0], f = this.horiz, d = this.width = Math.round(a.relativeLength(C(c.width, b.plotWidth - e[3] + e[1]), b.plotWidth)), m = this.height = Math.round(a.relativeLength(C(c.height, b.plotHeight - e[0] + e[2]), b.plotHeight)), r = this.top = Math.round(a.relativeLength(C(c.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)), c = this.left = Math.round(a.relativeLength(C(c.left, b.plotLeft + e[3]), b.plotWidth, b.plotLeft));
                this.bottom =
                    b.chartHeight - m - r;
                this.right = b.chartWidth - d - c;
                this.len = Math.max(f ? d : m, 0);
                this.pos = f ? c : r;
            }, getExtremes: function () { var a = this.isLog, b = this.lin2log; return { min: a ? l(b(this.min)) : this.min, max: a ? l(b(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax }; }, getThreshold: function (a) { var b = this.isLog, k = this.lin2log, c = b ? k(this.min) : this.min, b = b ? k(this.max) : this.max; null === a ? a = c : c > a ? a = c : b < a && (a = b); return this.translate(a, 0, 1, 0, 1); }, autoLabelAlign: function (a) {
                a = (C(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center";
            }, tickSize: function (a) { var b = this.options, k = b[a + "Length"], c = C(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0); if (c && k)
                return "inside" === b[a + "Position"] && (k = -k), [k, c]; }, labelMetrics: function () { var a = this.tickPositions && this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label); }, unsquish: function () {
                var a = this.options.labels, c = this.horiz, e = this.tickInterval, f = e, d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e), m, r = a.rotation, y = this.labelMetrics(), g, w = Number.MAX_VALUE, B, G = function (a) { a /= d || 1; a = 1 < a ? Math.ceil(a) : 1; return a * e; };
                c ? (B = !a.staggerLines && !a.step && (n(r) ? [r] : d < C(a.autoRotationLimit, 80) && a.autoRotation)) && b(B, function (a) { var b; if (a === r || a && -90 <= a && 90 >= a)
                    g = G(Math.abs(y.h / Math.sin(v * a))), b = g + Math.abs(a / 360), b < w && (w = b, m = a, f = g); }) : a.step || (f = G(y.h));
                this.autoRotation = B;
                this.labelRotation = C(m, r);
                return f;
            }, getSlotWidth: function () {
                var a = this.chart, b = this.horiz, c = this.options.labels, e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), f = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / e || !b && (c.style && parseInt(c.style.width, 10) || f && f - a.spacing[3] || .33 * a.chartWidth);
            }, renderUnsquish: function () {
                var a = this.chart, c = a.renderer, e = this.tickPositions, f = this.ticks, d = this.options.labels, m = this.horiz, r = this.getSlotWidth(), y = Math.max(1, Math.round(r - 2 * (d.padding || 5))), g = {}, w = this.labelMetrics(), B = d.style &&
                    d.style.textOverflow, G, l, h = 0, z;
                K(d.rotation) || (g.rotation = d.rotation || 0);
                b(e, function (a) { (a = f[a]) && a.label && a.label.textPxLength > h && (h = a.label.textPxLength); });
                this.maxLabelLength = h;
                if (this.autoRotation)
                    h > y && h > w.h ? g.rotation = this.labelRotation : this.labelRotation = 0;
                else if (r && (G = y, !B))
                    for (l = "clip", y = e.length; !m && y--;)
                        if (z = e[y], z = f[z].label)
                            z.styles && "ellipsis" === z.styles.textOverflow ? z.css({ textOverflow: "clip" }) : z.textPxLength > r && z.css({ width: r + "px" }), z.getBBox().height > this.len / e.length - (w.h - w.f) &&
                                (z.specificTextOverflow = "ellipsis");
                g.rotation && (G = h > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, B || (l = "ellipsis"));
                if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation))
                    g.align = this.labelAlign;
                b(e, function (a) { var b = (a = f[a]) && a.label; b && (b.attr(g), !G || d.style && d.style.width || !(G < b.textPxLength || "SPAN" === b.element.tagName) || b.css({ width: G, textOverflow: b.specificTextOverflow || l }), delete b.specificTextOverflow, a.rotation = g.rotation); });
                this.tickRotCorr = c.rotCorr(w.b, this.labelRotation ||
                    0, 0 !== this.side);
            }, hasData: function () { return this.hasVisibleSeries || n(this.min) && n(this.max) && this.tickPositions && 0 < this.tickPositions.length; }, addTitle: function (a) {
                var b = this.chart.renderer, k = this.horiz, c = this.opposite, e = this.options.title, f;
                this.axisTitle || ((f = e.textAlign) || (f = (k ? { low: "left", middle: "center", high: "right" } : { low: c ? "right" : "left", middle: "center", high: c ? "left" : "right" })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({ zIndex: 7, rotation: e.rotation || 0, align: f }).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                e.style.width || this.isRadial || this.axisTitle.css({ width: this.len });
                this.axisTitle[a ? "show" : "hide"](!0);
            }, generateTick: function (a) { var b = this.ticks; b[a] ? b[a].addLabel() : b[a] = new J(this, a); }, getOffset: function () {
                var a = this, c = a.chart, e = c.renderer, f = a.options, d = a.tickPositions, m = a.ticks, r = a.horiz, y = a.side, g = c.inverted && !a.isZAxis ? [1, 0, 3, 2][y] : y, w, B, G = 0, l, h = 0, z = f.title, E = f.labels, J = 0, u = c.axisOffset, c = c.clipOffset, t = [-1, 1, 1, -1][y], I = f.className, q = a.axisParent, K = this.tickSize("tick");
                w = a.hasData();
                a.showAxis = B = w || C(f.showEmpty, !0);
                a.staggerLines = a.horiz && E.staggerLines;
                a.axisGroup || (a.gridGroup = e.g("grid").attr({ zIndex: f.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(q), a.axisGroup = e.g("axis").attr({ zIndex: f.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(q), a.labelGroup = e.g("axis-labels").attr({ zIndex: E.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (I || "")).add(q));
                w || a.isLinked ? (b(d, function (b, c) { a.generateTick(b, c); }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === y || 2 === y || { 1: "left", 3: "right" }[y] === a.labelAlign, C(E.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && b(d, function (a) { J = Math.max(m[a].getLabelSize(), J); }), a.staggerLines && (J *= a.staggerLines), a.labelOffset = J * (a.opposite ? -1 : 1)) : D(m, function (a, b) { a.destroy(); delete m[b]; });
                z && z.text && !1 !== z.enabled && (a.addTitle(B), B && !1 !== z.reserveSpace && (a.titleOffset = G = a.axisTitle.getBBox()[r ? "height" : "width"], l = z.offset, h = n(l) ?
                    0 : C(z.margin, r ? 5 : 10)));
                a.renderLine();
                a.offset = t * C(f.offset, u[y]);
                a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                e = 0 === y ? -a.labelMetrics().h : 2 === y ? a.tickRotCorr.y : 0;
                h = Math.abs(J) + h;
                J && (h = h - e + t * (r ? C(E.y, a.tickRotCorr.y + 8 * t) : E.x));
                a.axisTitleMargin = C(l, h);
                u[y] = Math.max(u[y], a.axisTitleMargin + G + t * a.offset, h, w && d.length && K ? K[0] + t * a.offset : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                c[g] = Math.max(c[g], f);
            }, getLinePath: function (a) {
                var b = this.chart, c = this.opposite, k = this.offset, e = this.horiz, f = this.left +
                    (c ? this.width : 0) + k, k = b.chartHeight - this.bottom - (c ? this.height : 0) + k;
                c && (a *= -1);
                return b.renderer.crispLine(["M", e ? this.left : f, e ? k : this.top, "L", e ? b.chartWidth - this.right : f, e ? k : b.chartHeight - this.bottom], a);
            }, renderLine: function () { this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 })); }, getTitlePosition: function () {
                var a = this.horiz, b = this.left, c = this.top, e = this.len, f = this.options.title, d = a ? b : c, m = this.opposite, r = this.offset, y = f.x || 0, g = f.y || 0, w = this.axisTitle, B = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, w), w = Math.max(w.getBBox(null, 0).height - B.h - 1, 0), e = { low: d + (a ? 0 : e), middle: d + e / 2, high: d + (a ? e : 0) }[f.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + [-w, w, B.f, -w][this.side];
                return { x: a ? e + y : b + (m ? this.width : 0) + r + y, y: a ? b + g - (m ? this.height : 0) + r : e + g };
            }, renderMinorTick: function (a) {
                var b = this.chart.hasRendered && w(this.oldMin), c = this.minorTicks;
                c[a] || (c[a] = new J(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1);
            }, renderTick: function (a, b) { var c = this.isLinked, e = this.ticks, k = this.chart.hasRendered && w(this.oldMin); if (!c || a >= this.min && a <= this.max)
                e[a] || (e[a] = new J(this, a)), k && e[a].isNew && e[a].render(b, !0, .1), e[a].render(b); }, render: function () {
                var c = this, e = c.chart, f = c.options, d = c.isLog, m = c.lin2log, r = c.isLinked, y = c.tickPositions, g = c.axisTitle, G = c.ticks, l = c.minorTicks, h = c.alternateBands, z = f.stackLabels, n = f.alternateGridColor, E = c.tickmarkOffset, C = c.axisLine, u = c.showAxis, t = H(e.renderer.globalAnimation), I, q;
                c.labelEdge.length = 0;
                c.overlap = !1;
                b([G, l, h], function (a) { D(a, function (a) { a.isActive = !1; }); });
                if (c.hasData() || r)
                    c.minorTickInterval && !c.categories && b(c.getMinorTickPositions(), function (a) { c.renderMinorTick(a); }), y.length && (b(y, function (a, b) { c.renderTick(a, b); }), E && (0 === c.min || c.single) && (G[-1] || (G[-1] = new J(c, -1, null, !0)), G[-1].render(-1))), n && b(y, function (b, k) {
                        q = void 0 !== y[k + 1] ? y[k + 1] + E : c.max - E;
                        0 === k %
                            2 && b < c.max && q <= c.max + (e.polar ? -E : E) && (h[b] || (h[b] = new a.PlotLineOrBand(c)), I = b + E, h[b].options = { from: d ? m(I) : I, to: d ? m(q) : q, color: n }, h[b].render(), h[b].isActive = !0);
                    }), c._addedPlotLB || (b((f.plotLines || []).concat(f.plotBands || []), function (a) { c.addPlotBandOrLine(a); }), c._addedPlotLB = !0);
                b([G, l, h], function (a) {
                    var b, c = [], k = t.duration;
                    D(a, function (a, b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b)); });
                    B(function () { for (b = c.length; b--;)
                        a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]]); }, a !==
                        h && e.hasRendered && k ? k : 0);
                });
                C && (C[C.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(C.strokeWidth()) }), C.isPlaced = !0, C[u ? "show" : "hide"](!0));
                g && u && (f = c.getTitlePosition(), w(f.y) ? (g[g.isNew ? "attr" : "animate"](f), g.isNew = !1) : (g.attr("y", -9999), g.isNew = !0));
                z && z.enabled && c.renderStackTotals();
                c.isDirty = !1;
            }, redraw: function () { this.visible && (this.render(), b(this.plotLinesAndBands, function (a) { a.render(); })); b(this.series, function (a) { a.isDirty = !0; }); }, keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) { var c = this, e = c.stacks, k = c.plotLinesAndBands, d; a || y(c); D(e, function (a, b) { u(a); e[b] = null; }); b([c.ticks, c.minorTicks, c.alternateBands], function (a) { u(a); }); if (k)
                for (a = k.length; a--;)
                    k[a].destroy(); b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) { c[a] && (c[a] = c[a].destroy()); }); for (d in c.plotLinesAndBandsGroups)
                c.plotLinesAndBandsGroups[d] = c.plotLinesAndBandsGroups[d].destroy(); D(c, function (a, b) { -1 === f(b, c.keepProps) && delete c[b]; }); }, drawCrosshair: function (a, b) {
                var c, e = this.crosshair, f = C(e.snap, !0), k, d = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (n(b) || !f) ? (f ? n(b) && (k = this.isXAxis ? b.plotX : this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), n(k) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : C(b.stackY, b.y)), null, null, null, k) || null), n(c) ? (b = this.categories && !this.isRadial, d || (this.cross = d = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({ zIndex: C(e.zIndex, 2) }).add(), d.attr({ stroke: e.color || (b ? h("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": C(e.width, 1) }).css({ "pointer-events": "none" }), e.dashStyle && d.attr({ dashstyle: e.dashStyle })), d.show().attr({ d: c }), b && !e.width && d.attr({ "stroke-width": this.transA }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair();
            }, hideCrosshair: function () { this.cross && this.cross.hide(); } });
        return a.Axis = E;
    }(L);
    (function (a) {
        var A = a.Axis, H = a.getMagnitude, F = a.normalizeTickInterval, q = a.timeUnits;
        A.prototype.getTimeTicks =
            function () { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments); };
        A.prototype.normalizeTimeTickInterval = function (a, l) {
            var h = l || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            l = h[h.length - 1];
            var n = q[l[0]], v = l[1], u;
            for (u = 0; u < h.length && !(l = h[u], n = q[l[0]], v = l[1], h[u + 1] && a <= (n * v[v.length - 1] + q[h[u + 1][0]]) / 2); u++)
                ;
            n === q.year && a < 5 * n && (v = [1, 2,
                5]);
            a = F(a / n, v, "year" === l[0] ? Math.max(H(a / n), 1) : 1);
            return { unitRange: n, count: a, unitName: l[0] };
        };
    })(L);
    (function (a) {
        var A = a.Axis, H = a.getMagnitude, F = a.map, q = a.normalizeTickInterval, h = a.pick;
        A.prototype.getLogTickPositions = function (a, t, n, v) {
            var l = this.options, b = this.len, d = this.lin2log, g = this.log2lin, e = [];
            v || (this._minorAutoInterval = null);
            if (.5 <= a)
                a = Math.round(a), e = this.getLinearTickPositions(a, t, n);
            else if (.08 <= a)
                for (var b = Math.floor(t), c, m, f, r, w, l = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; b < n +
                    1 && !w; b++)
                    for (m = l.length, c = 0; c < m && !w; c++)
                        f = g(d(b) * l[c]), f > t && (!v || r <= n) && void 0 !== r && e.push(r), r > n && (w = !0), r = f;
            else
                t = d(t), n = d(n), a = v ? this.getMinorTickInterval() : l.tickInterval, a = h("auto" === a ? null : a, this._minorAutoInterval, l.tickPixelInterval / (v ? 5 : 1) * (n - t) / ((v ? b / this.tickPositions.length : b) || 1)), a = q(a, null, H(a)), e = F(this.getLinearTickPositions(a, t, n), g), v || (this._minorAutoInterval = a / 5);
            v || (this.tickInterval = a);
            return e;
        };
        A.prototype.log2lin = function (a) { return Math.log(a) / Math.LN10; };
        A.prototype.lin2log =
            function (a) { return Math.pow(10, a); };
    })(L);
    (function (a, A) {
        var H = a.arrayMax, F = a.arrayMin, q = a.defined, h = a.destroyObjectProperties, l = a.each, t = a.erase, n = a.merge, v = a.pick;
        a.PlotLineOrBand = function (a, b) { this.axis = a; b && (this.options = b, this.id = b.id); };
        a.PlotLineOrBand.prototype = { render: function () {
                var h = this, b = h.axis, d = b.horiz, g = h.options, e = g.label, c = h.label, m = g.to, f = g.from, r = g.value, w = q(f) && q(m), l = q(r), z = h.svgElem, t = !z, D = [], C = g.color, y = v(g.zIndex, 0), G = g.events, D = { "class": "highcharts-plot-" + (w ? "band " : "line ") +
                        (g.className || "") }, B = {}, J = b.chart.renderer, E = w ? "bands" : "lines", k = b.log2lin;
                b.isLog && (f = k(f), m = k(m), r = k(r));
                l ? (D = { stroke: C, "stroke-width": g.width }, g.dashStyle && (D.dashstyle = g.dashStyle)) : w && (C && (D.fill = C), g.borderWidth && (D.stroke = g.borderColor, D["stroke-width"] = g.borderWidth));
                B.zIndex = y;
                E += "-" + y;
                (C = b.plotLinesAndBandsGroups[E]) || (b.plotLinesAndBandsGroups[E] = C = J.g("plot-" + E).attr(B).add());
                t && (h.svgElem = z = J.path().attr(D).add(C));
                if (l)
                    D = b.getPlotLinePath(r, z.strokeWidth());
                else if (w)
                    D = b.getPlotBandPath(f, m, g);
                else
                    return;
                t && D && D.length ? (z.attr({ d: D }), G && a.objectEach(G, function (a, b) { z.on(b, function (a) { G[b].apply(h, [a]); }); })) : z && (D ? (z.show(), z.animate({ d: D })) : (z.hide(), c && (h.label = c = c.destroy())));
                e && q(e.text) && D && D.length && 0 < b.width && 0 < b.height && !D.flat ? (e = n({ align: d && w && "center", x: d ? !w && 4 : 10, verticalAlign: !d && w && "middle", y: d ? w ? 16 : 10 : w ? 6 : -4, rotation: d && !w && 90 }, e), this.renderLabel(e, D, w, y)) : c && c.hide();
                return h;
            }, renderLabel: function (a, b, d, g) {
                var e = this.label, c = this.axis.chart.renderer;
                e || (e = { align: a.textAlign ||
                        a.align, rotation: a.rotation, "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "") }, e.zIndex = g, this.label = e = c.text(a.text, 0, 0, a.useHTML).attr(e).add(), e.css(a.style));
                g = b.xBounds || [b[1], b[4], d ? b[6] : b[1]];
                b = b.yBounds || [b[2], b[5], d ? b[7] : b[2]];
                d = F(g);
                c = F(b);
                e.align(a, !1, { x: d, y: c, width: H(g) - d, height: H(b) - c });
                e.show();
            }, destroy: function () { t(this.axis.plotLinesAndBands, this); delete this.axis; h(this); } };
        a.extend(A.prototype, { getPlotBandPath: function (a, b) {
                var d = this.getPlotLinePath(b, null, null, !0), g = this.getPlotLinePath(a, null, null, !0), e = [], c = this.horiz, m = 1, f;
                a = a < this.min && b < this.min || a > this.max && b > this.max;
                if (g && d)
                    for (a && (f = g.toString() === d.toString(), m = 0), a = 0; a < g.length; a += 6)
                        c && d[a + 1] === g[a + 1] ? (d[a + 1] += m, d[a + 4] += m) : c || d[a + 2] !== g[a + 2] || (d[a + 2] += m, d[a + 5] += m), e.push("M", g[a + 1], g[a + 2], "L", g[a + 4], g[a + 5], d[a + 4], d[a + 5], d[a + 1], d[a + 2], "z"), e.flat = f;
                return e;
            }, addPlotBand: function (a) { return this.addPlotBandOrLine(a, "plotBands"); }, addPlotLine: function (a) { return this.addPlotBandOrLine(a, "plotLines"); },
            addPlotBandOrLine: function (h, b) { var d = (new a.PlotLineOrBand(this, h)).render(), g = this.userOptions; d && (b && (g[b] = g[b] || [], g[b].push(h)), this.plotLinesAndBands.push(d)); return d; }, removePlotBandOrLine: function (a) { for (var b = this.plotLinesAndBands, d = this.options, g = this.userOptions, e = b.length; e--;)
                b[e].id === a && b[e].destroy(); l([d.plotLines || [], g.plotLines || [], d.plotBands || [], g.plotBands || []], function (b) { for (e = b.length; e--;)
                b[e].id === a && t(b, b[e]); }); }, removePlotBand: function (a) { this.removePlotBandOrLine(a); },
            removePlotLine: function (a) { this.removePlotBandOrLine(a); } });
    })(L, V);
    (function (a) {
        var A = a.each, H = a.extend, F = a.format, q = a.isNumber, h = a.map, l = a.merge, t = a.pick, n = a.splat, v = a.syncTimeout, u = a.timeUnits;
        a.Tooltip = function () { this.init.apply(this, arguments); };
        a.Tooltip.prototype = { init: function (a, d) { this.chart = a; this.options = d; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = d.split && !a.inverted; this.shared = d.shared || this.split; }, cleanSplit: function (a) {
                A(this.chart.series, function (b) {
                    var d = b &&
                        b.tt;
                    d && (!d.isActive || a ? b.tt = d.destroy() : d.isActive = !1);
                });
            }, getLabel: function () { var a = this.chart.renderer, d = this.options; this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({ padding: d.padding, r: d.borderRadius }), this.label.attr({ fill: d.backgroundColor, "stroke-width": d.borderWidth }).css(d.style).shadow(d.shadow)), this.label.attr({ zIndex: 8 }).add()); return this.label; }, update: function (a) {
                this.destroy();
                l(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, l(!0, this.options, a));
            }, destroy: function () { this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()); clearTimeout(this.hideTimer); clearTimeout(this.tooltipTimeout); }, move: function (a, d, g, e) {
                var b = this, m = b.now, f = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - m.x) || 1 < Math.abs(d - m.y)), r = b.followPointer || 1 < b.len;
                H(m, { x: f ? (2 * m.x + a) / 3 : a, y: f ? (m.y + d) / 2 : d, anchorX: r ? void 0 : f ? (2 * m.anchorX + g) / 3 : g, anchorY: r ? void 0 : f ?
                        (m.anchorY + e) / 2 : e });
                b.getLabel().attr(m);
                f && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { b && b.move(a, d, g, e); }, 32));
            }, hide: function (a) { var b = this; clearTimeout(this.hideTimer); a = t(a, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = v(function () { b.getLabel()[a ? "fadeOut" : "hide"](); b.isHidden = !0; }, a)); }, getAnchor: function (a, d) {
                var b, e = this.chart, c = e.inverted, m = e.plotTop, f = e.plotLeft, r = 0, w = 0, l, z;
                a = n(a);
                b = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d =
                    e.pointer.normalize(d)), b = [d.chartX - e.plotLeft, d.chartY - m]);
                b || (A(a, function (a) { l = a.series.yAxis; z = a.series.xAxis; r += a.plotX + (!c && z ? z.left - f : 0); w += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!c && l ? l.top - m : 0); }), r /= a.length, w /= a.length, b = [c ? e.plotWidth - w : r, this.shared && !c && 1 < a.length && d ? d.chartY - m : c ? e.plotHeight - r : w]);
                return h(b, Math.round);
            }, getPosition: function (a, d, g) {
                var b = this.chart, c = this.distance, m = {}, f = b.inverted && g.h || 0, r, w = ["y", b.chartHeight, d, g.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight], h = ["x", b.chartWidth, a, g.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth], l = !this.followPointer && t(g.ttBelow, !b.inverted === !!g.negative), n = function (a, b, e, d, k, p) { var r = e < d - c, y = d + c + e < b, g = d - c - e; d += c; if (l && y)
                    m[a] = d;
                else if (!l && r)
                    m[a] = g;
                else if (r)
                    m[a] = Math.min(p - e, 0 > g - f ? g : g - f);
                else if (y)
                    m[a] = Math.max(k, d + f + e > b ? d : d + f);
                else
                    return !1; }, D = function (a, b, e, f) { var k; f < c || f > b - c ? k = !1 : m[a] = f < e / 2 ? 1 : f > b - e / 2 ? b - e - 2 : f - e / 2; return k; }, C = function (a) { var b = w; w = h; h = b; r = a; }, y = function () {
                    !1 !== n.apply(0, w) ? !1 !== D.apply(0, h) ||
                        r || (C(!0), y()) : r ? m.x = m.y = 0 : (C(!0), y());
                };
                (b.inverted || 1 < this.len) && C();
                y();
                return m;
            }, defaultFormatter: function (a) { var b = this.points || n(this), g; g = [a.tooltipFooterHeaderFormatter(b[0])]; g = g.concat(a.bodyFormatter(b)); g.push(a.tooltipFooterHeaderFormatter(b[0], !0)); return g; }, refresh: function (a, d) {
                var b, e = this.options, c, m = a, f, r = {}, w = [];
                b = e.formatter || this.defaultFormatter;
                var r = this.shared, h;
                e.enabled && (clearTimeout(this.hideTimer), this.followPointer = n(m)[0].series.tooltipOptions.followPointer, f = this.getAnchor(m, d), d = f[0], c = f[1], !r || m.series && m.series.noSharedTooltip ? r = m.getLabelConfig() : (A(m, function (a) { a.setState("hover"); w.push(a.getLabelConfig()); }), r = { x: m[0].category, y: m[0].y }, r.points = w, m = m[0]), this.len = w.length, r = b.call(r, this), h = m.series, this.distance = t(h.tooltipOptions.distance, 16), !1 === r ? this.hide() : (b = this.getLabel(), this.isHidden && b.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(r, n(a)) : (e.style.width || b.css({ width: this.chart.spacingBox.width }), b.attr({ text: r && r.join ? r.join("") : r }), b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" +
                    t(m.colorIndex, h.colorIndex)), b.attr({ stroke: e.borderColor || m.color || h.color || "#666666" }), this.updatePosition({ plotX: d, plotY: c, negative: m.negative, ttBelow: m.ttBelow, h: f[2] || 0 })), this.isHidden = !1));
            }, renderSplit: function (b, d) {
                var g = this, e = [], c = this.chart, m = c.renderer, f = !0, r = this.options, w = 0, h = this.getLabel();
                a.isString(b) && (b = [!1, b]);
                A(b.slice(0, d.length + 1), function (a, b) {
                    if (!1 !== a) {
                        b = d[b - 1] || { isHeader: !0, plotX: d[0].plotX };
                        var l = b.series || g, z = l.tt, y = b.series || {}, G = "highcharts-color-" + t(b.colorIndex, y.colorIndex, "none");
                        z || (l.tt = z = m.label(null, null, null, "callout", null, null, r.useHTML).addClass("highcharts-tooltip-box " + G).attr({ padding: r.padding, r: r.borderRadius, fill: r.backgroundColor, stroke: r.borderColor || b.color || y.color || "#333333", "stroke-width": r.borderWidth }).add(h));
                        z.isActive = !0;
                        z.attr({ text: a });
                        z.css(r.style).shadow(r.shadow);
                        a = z.getBBox();
                        y = a.width + z.strokeWidth();
                        b.isHeader ? (w = a.height, y = Math.max(0, Math.min(b.plotX + c.plotLeft - y / 2, c.chartWidth - y))) : y = b.plotX + c.plotLeft - t(r.distance, 16) -
                            y;
                        0 > y && (f = !1);
                        a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0);
                        a -= c.plotTop;
                        e.push({ target: b.isHeader ? c.plotHeight + w : a, rank: b.isHeader ? 1 : 0, size: l.tt.getBBox().height + 1, point: b, x: y, tt: z });
                    }
                });
                this.cleanSplit();
                a.distribute(e, c.plotHeight + w);
                A(e, function (a) {
                    var b = a.point, e = b.series;
                    a.tt.attr({ visibility: void 0 === a.pos ? "hidden" : "inherit", x: f || b.isHeader ? a.x : b.plotX + c.plotLeft + t(r.distance, 16), y: a.pos + c.plotTop, anchorX: b.isHeader ? b.plotX + c.plotLeft : b.plotX + e.xAxis.pos, anchorY: b.isHeader ? a.pos +
                            c.plotTop - 15 : b.plotY + e.yAxis.pos });
                });
            }, updatePosition: function (a) { var b = this.chart, g = this.getLabel(), g = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a); this.move(Math.round(g.x), Math.round(g.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop); }, getDateFormat: function (a, d, g, e) {
                var b = this.chart.time, m = b.dateFormat("%m-%d %H:%M:%S.%L", d), f, r, w = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, h = "millisecond";
                for (r in u) {
                    if (a === u.week && +b.dateFormat("%w", d) === g && "00:00:00.000" === m.substr(6)) {
                        r =
                            "week";
                        break;
                    }
                    if (u[r] > a) {
                        r = h;
                        break;
                    }
                    if (w[r] && m.substr(w[r]) !== "01-01 00:00:00.000".substr(w[r]))
                        break;
                    "week" !== r && (h = r);
                }
                r && (f = e[r]);
                return f;
            }, getXDateFormat: function (a, d, g) { d = d.dateTimeLabelFormats; var b = g && g.closestPointRange; return (b ? this.getDateFormat(b, a.x, g.options.startOfWeek, d) : d.day) || d.year; }, tooltipFooterHeaderFormatter: function (a, d) {
                d = d ? "footer" : "header";
                var b = a.series, e = b.tooltipOptions, c = e.xDateFormat, m = b.xAxis, f = m && "datetime" === m.options.type && q(a.key), r = e[d + "Format"];
                f && !c && (c = this.getXDateFormat(a, e, m));
                f && c && A(a.point && a.point.tooltipDateKeys || ["key"], function (a) { r = r.replace("{point." + a + "}", "{point." + a + ":" + c + "}"); });
                return F(r, { point: a, series: b }, this.chart.time);
            }, bodyFormatter: function (a) { return h(a, function (a) { var b = a.series.tooltipOptions; return (b[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, b[(a.point.formatPrefix || "point") + "Format"]); }); } };
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.attr, F = a.charts, q = a.color, h = a.css, l = a.defined, t = a.each, n = a.extend, v = a.find, u = a.fireEvent, b = a.isNumber, d = a.isObject, g = a.offset, e = a.pick, c = a.splat, m = a.Tooltip;
        a.Pointer = function (a, b) { this.init(a, b); };
        a.Pointer.prototype = { init: function (a, b) { this.options = b; this.chart = a; this.runChartClick = b.chart.events && !!b.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; m && (a.tooltip = new m(a, b.tooltip), this.followTouchMove = e(b.tooltip.followTouchMove, !0)); this.setDOMEvents(); }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, f = c.zoomType || "", b = b.inverted;
                /touch/.test(a.type) &&
                    (f = e(c.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert = f && !b || a && b;
                this.hasZoom = a || f;
            }, normalize: function (a, b) { var c; c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a; b || (this.chartPosition = b = g(this.chart.container)); return n(a, { chartX: Math.round(c.pageX - b.left), chartY: Math.round(c.pageY - b.top) }); }, getCoordinates: function (a) {
                var b = { xAxis: [], yAxis: [] };
                t(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ?
                            "chartX" : "chartY"]) });
                });
                return b;
            }, findNearestKDPoint: function (a, b, c) { var e; t(a, function (a) { var f = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y"); a = a.searchPoint(c, f); if ((f = d(a, !0)) && !(f = !d(e, !0)))
                var f = e.distX - a.distX, m = e.dist - a.dist, r = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex), f = 0 < (0 !== f && b ? f : 0 !== m ? m : 0 !== r ? r : e.series.index > a.series.index ? -1 : 1); f && (e = a); }); return e; }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;)
                    b = a.point, a = a.parentNode;
                return b;
            }, getChartCoordinatesFromPoint: function (a, b) { var c = a.series, f = c.xAxis, c = c.yAxis, d = e(a.clientX, a.plotX); if (f && c)
                return b ? { chartX: f.len + f.pos - d, chartY: c.len + c.pos - a.plotY } : { chartX: d + f.pos, chartY: a.plotY + c.pos }; }, getHoverData: function (b, c, m, g, h, l, n) {
                var f, y = [], r = n && n.isBoosting;
                g = !(!g || !b);
                n = c && !c.stickyTracking ? [c] : a.grep(m, function (a) { return a.visible && !(!h && a.directTouch) && e(a.options.enableMouseTracking, !0) && a.stickyTracking; });
                c = (f = g ? b : this.findNearestKDPoint(n, h, l)) && f.series;
                f && (h && !c.noSharedTooltip ?
                    (n = a.grep(m, function (a) { return a.visible && !(!h && a.directTouch) && e(a.options.enableMouseTracking, !0) && !a.noSharedTooltip; }), t(n, function (a) { var b = v(a.points, function (a) { return a.x === f.x && !a.isNull; }); d(b) && (r && (b = a.getPoint(b)), y.push(b)); })) : y.push(f));
                return { hoverPoint: f, hoverSeries: c, hoverPoints: y };
            }, runPointActions: function (b, c) {
                var f = this.chart, d = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0, m = d ? d.shared : !1, r = c || f.hoverPoint, g = r && r.series || f.hoverSeries, g = this.getHoverData(r, g, f.series, !!c ||
                    g && g.directTouch && this.isDirectTouch, m, b, { isBoosting: f.isBoosting }), h, r = g.hoverPoint;
                h = g.hoverPoints;
                c = (g = g.hoverSeries) && g.tooltipOptions.followPointer;
                m = m && g && !g.noSharedTooltip;
                if (r && (r !== f.hoverPoint || d && d.isHidden)) {
                    t(f.hoverPoints || [], function (b) { -1 === a.inArray(b, h) && b.setState(); });
                    t(h || [], function (a) { a.setState("hover"); });
                    if (f.hoverSeries !== g)
                        g.onMouseOver();
                    f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                    if (!r.series)
                        return;
                    r.firePointEvent("mouseOver");
                    f.hoverPoints = h;
                    f.hoverPoint =
                        r;
                    d && d.refresh(m ? h : r, b);
                }
                else
                    c && d && !d.isHidden && (r = d.getAnchor([{}], b), d.updatePosition({ plotX: r[0], plotY: r[1] }));
                this.unDocMouseMove || (this.unDocMouseMove = A(f.container.ownerDocument, "mousemove", function (b) { var c = F[a.hoverChartIndex]; if (c)
                    c.pointer.onDocumentMouseMove(b); }));
                t(f.axes, function (c) { var f = e(c.crosshair.snap, !0), d = f ? a.find(h, function (a) { return a.series[c.coll] === c; }) : void 0; d || !f ? c.drawCrosshair(b, d) : c.hideCrosshair(); });
            }, reset: function (a, b) {
                var e = this.chart, f = e.hoverSeries, d = e.hoverPoint, m = e.hoverPoints, g = e.tooltip, r = g && g.shared ? m : d;
                a && r && t(c(r), function (b) { b.series.isCartesian && void 0 === b.plotX && (a = !1); });
                if (a)
                    g && r && (g.refresh(r), d && (d.setState(d.state, !0), t(e.axes, function (a) { a.crosshair && a.drawCrosshair(null, d); })));
                else {
                    if (d)
                        d.onMouseOut();
                    m && t(m, function (a) { a.setState(); });
                    if (f)
                        f.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(e.axes, function (a) { a.hideCrosshair(); });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null;
                }
            }, scaleGroups: function (a, b) { var c = this.chart, e; t(c.series, function (f) { e = a || f.getPlotBox(); f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(e), f.markerGroup && (f.markerGroup.attr(e), f.markerGroup.clip(b ? c.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(e)); }); c.clipRect.attr(b || c.clipBox); }, dragStart: function (a) { var b = this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX = this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY; }, drag: function (a) {
                var b = this.chart, c = b.options.chart, e = a.chartX, f = a.chartY, d = this.zoomHor, m = this.zoomVert, g = b.plotLeft, y = b.plotTop, h = b.plotWidth, l = b.plotHeight, n, E = this.selectionMarker, k = this.mouseDownX, p = this.mouseDownY, t = c.panKey && a[c.panKey + "Key"];
                E && E.touch || (e < g ? e = g : e > g + h && (e = g + h), f < y ? f = y : f > y + l && (f = y + l), this.hasDragged = Math.sqrt(Math.pow(k - e, 2) + Math.pow(p - f, 2)), 10 < this.hasDragged && (n = b.isInsidePlot(k - g, p - y), b.hasCartesianSeries && (this.zoomX || this.zoomY) && n && !t && !E && (this.selectionMarker = E = b.renderer.rect(g, y, d ? 1 : h, m ? 1 : l, 0).attr({ fill: c.selectionMarkerFill || q("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker", zIndex: 7 }).add()), E && d && (e -= k, E.attr({ width: Math.abs(e), x: (0 < e ? 0 : e) + k })), E && m && (e = f - p, E.attr({ height: Math.abs(e), y: (0 < e ? 0 : e) + p })), n && !E && c.panning && b.pan(a, c.panning)));
            }, drop: function (a) {
                var c = this, e = this.chart, f = this.hasPinched;
                if (this.selectionMarker) {
                    var d = { originalEvent: a, xAxis: [], yAxis: [] }, m = this.selectionMarker, g = m.attr ? m.attr("x") : m.x, C = m.attr ? m.attr("y") : m.y, y = m.attr ? m.attr("width") : m.width, G = m.attr ? m.attr("height") : m.height, B;
                    if (this.hasDragged || f)
                        t(e.axes, function (b) { if (b.zoomEnabled && l(b.min) && (f || c[{ xAxis: "zoomX", yAxis: "zoomY" }[b.coll]])) {
                            var e = b.horiz, k = "touchend" === a.type ? b.minPixelPadding : 0, m = b.toValue((e ? g : C) + k), e = b.toValue((e ? g + y : C + G) - k);
                            d[b.coll].push({ axis: b, min: Math.min(m, e), max: Math.max(m, e) });
                            B = !0;
                        } }), B && u(e, "selection", d, function (a) { e.zoom(n(a, f ? { animation: !1 } : null)); });
                    b(e.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    f && this.scaleGroups();
                }
                e && b(e.index) && (h(e.container, { cursor: e._cursor }), e.cancelClick = 10 < this.hasDragged,
                    e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []);
            }, onContainerMouseDown: function (a) { 2 !== a.button && (a = this.normalize(a), this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a)); }, onDocumentMouseUp: function (b) { F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b); }, onDocumentMouseMove: function (a) { var b = this.chart, c = this.chartPosition; a = this.normalize(a, c); !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset(); },
            onContainerMouseLeave: function (b) { var c = F[a.hoverChartIndex]; c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null); }, onContainerMouseMove: function (b) { var c = this.chart; l(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index); b = this.normalize(b); b.returnValue = !1; "mousedown" === c.mouseIsDown && this.drag(b); !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b); },
            inClass: function (a, b) { for (var c; a;) {
                if (c = H(a, "class")) {
                    if (-1 !== c.indexOf(b))
                        return !0;
                    if (-1 !== c.indexOf("highcharts-container"))
                        return !1;
                }
                a = a.parentNode;
            } }, onTrackerMouseOut: function (a) { var b = this.chart.hoverSeries; a = a.relatedTarget || a.toElement; this.isDirectTouch = !1; if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))
                b.onMouseOut(); }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, e = b.plotLeft, f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (u(c.series, "click", n(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (n(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && u(b, "click", a)));
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container, e = c.ownerDocument;
                c.onmousedown = function (a) { b.onContainerMouseDown(a); };
                c.onmousemove = function (a) { b.onContainerMouseMove(a); };
                c.onclick = function (a) { b.onContainerClick(a); };
                this.unbindContainerMouseLeave =
                    A(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = A(e, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function (a) { b.onContainerTouchStart(a); }, c.ontouchmove = function (a) { b.onContainerTouchMove(a); }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = A(e, "touchend", b.onDocumentTouchEnd)));
            }, destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp =
                    a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) { b[c] = null; });
            } };
    })(L);
    (function (a) {
        var A = a.charts, H = a.each, F = a.extend, q = a.map, h = a.noop, l = a.pick;
        F(a.Pointer.prototype, { pinchTranslate: function (a, h, l, q, b, d) { this.zoomHor && this.pinchTranslateDirection(!0, a, h, l, q, b, d); this.zoomVert && this.pinchTranslateDirection(!1, a, h, l, q, b, d); }, pinchTranslateDirection: function (a, h, l, q, b, d, g, e) {
                var c = this.chart, m = a ? "x" : "y", f = a ? "X" : "Y", r = "chart" + f, w = a ? "width" : "height", n = c["plot" + (a ? "Left" : "Top")], z, t, D = e || 1, C = c.inverted, y = c.bounds[a ? "h" : "v"], G = 1 === h.length, B = h[0][r], J = l[0][r], E = !G && h[1][r], k = !G && l[1][r], p;
                l = function () { !G && 20 < Math.abs(B - E) && (D = e || Math.abs(J - k) / Math.abs(B - E)); t = (n - J) / D + B; z = c["plot" + (a ? "Width" : "Height")] / D; };
                l();
                h = t;
                h < y.min ? (h = y.min, p = !0) : h + z > y.max && (h = y.max - z, p = !0);
                p ? (J -= .8 * (J - g[m][0]), G || (k -= .8 * (k - g[m][1])), l()) : g[m] = [J, k];
                C || (d[m] = t - n, d[w] = z);
                d = C ? 1 / D : D;
                b[w] = z;
                b[m] = h;
                q[C ? a ? "scaleY" : "scaleX" :
                    "scale" + f] = D;
                q["translate" + f] = d * n + (J - d * B);
            }, pinch: function (a) {
                var n = this, t = n.chart, u = n.pinchDown, b = a.touches, d = b.length, g = n.lastValidTouch, e = n.hasZoom, c = n.selectionMarker, m = {}, f = 1 === d && (n.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || n.runChartClick), r = {};
                1 < d && (n.initiated = !0);
                e && n.initiated && !f && a.preventDefault();
                q(b, function (a) { return n.normalize(a); });
                "touchstart" === a.type ? (H(b, function (a, b) { u[b] = { chartX: a.chartX, chartY: a.chartY }; }), g.x = [u[0].chartX, u[1] && u[1].chartX], g.y = [u[0].chartY,
                    u[1] && u[1].chartY], H(t.axes, function (a) { if (a.zoomEnabled) {
                    var b = t.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, e = a.toPixels(l(a.options.min, a.dataMin)), d = a.toPixels(l(a.options.max, a.dataMax)), f = Math.max(e, d);
                    b.min = Math.min(a.pos, Math.min(e, d) - c);
                    b.max = Math.max(a.pos + a.len, f + c);
                } }), n.res = !0) : n.followTouchMove && 1 === d ? this.runPointActions(n.normalize(a)) : u.length && (c || (n.selectionMarker = c = F({ destroy: h, touch: !0 }, t.plotBox)), n.pinchTranslate(u, b, m, c, r, g), n.hasPinched = e, n.scaleGroups(m, r), n.res && (n.res =
                    !1, this.reset(!1, 0)));
            }, touch: function (h, n) {
                var q = this.chart, t, b;
                if (q.index !== a.hoverChartIndex)
                    this.onContainerMouseLeave({ relatedTarget: !0 });
                a.hoverChartIndex = q.index;
                1 === h.touches.length ? (h = this.normalize(h), (b = q.isInsidePlot(h.chartX - q.plotLeft, h.chartY - q.plotTop)) && !q.openMenu ? (n && this.runPointActions(h), "touchmove" === h.type && (n = this.pinchDown, t = n[0] ? 4 <= Math.sqrt(Math.pow(n[0].chartX - h.chartX, 2) + Math.pow(n[0].chartY - h.chartY, 2)) : !1), l(t, !0) && this.pinch(h)) : n && this.reset()) : 2 === h.touches.length &&
                    this.pinch(h);
            }, onContainerTouchStart: function (a) { this.zoomOption(a); this.touch(a, !0); }, onContainerTouchMove: function (a) { this.touch(a); }, onDocumentTouchEnd: function (h) { A[a.hoverChartIndex] && A[a.hoverChartIndex].pointer.drop(h); } });
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.charts, F = a.css, q = a.doc, h = a.extend, l = a.noop, t = a.Pointer, n = a.removeEvent, v = a.win, u = a.wrap;
        if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
            var b = {}, d = !!v.PointerEvent, g = function () {
                var c = [];
                c.item = function (a) { return this[a]; };
                a.objectEach(b, function (a) { c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }); });
                return c;
            }, e = function (b, e, d, h) { "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !H[a.hoverChartIndex] || (h(b), h = H[a.hoverChartIndex].pointer, h[e]({ type: d, target: b.currentTarget, preventDefault: l, touches: g() })); };
            h(t.prototype, { onContainerPointerDown: function (a) { e(a, "onContainerTouchStart", "touchstart", function (a) { b[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget }; }); }, onContainerPointerMove: function (a) {
                    e(a, "onContainerTouchMove", "touchmove", function (a) { b[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; b[a.pointerId].target || (b[a.pointerId].target = a.currentTarget); });
                }, onDocumentPointerUp: function (a) { e(a, "onDocumentTouchEnd", "touchend", function (a) { delete b[a.pointerId]; }); }, batchMSEvents: function (a) { a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(q, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp); } });
            u(t.prototype, "init", function (a, b, e) { a.call(this, b, e); this.hasZoom && F(b.container, { "-ms-touch-action": "none", "touch-action": "none" }); });
            u(t.prototype, "setDOMEvents", function (a) { a.apply(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(A); });
            u(t.prototype, "destroy", function (a) { this.batchMSEvents(n); a.call(this); });
        }
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.css, F = a.discardElement, q = a.defined, h = a.each, l = a.isFirefox, t = a.marginNames, n = a.merge, v = a.pick, u = a.setAnimation, b = a.stableSort, d = a.win, g = a.wrap;
        a.Legend = function (a, b) { this.init(a, b); };
        a.Legend.prototype = { init: function (a, b) { this.chart = a; this.setOptions(b); b.enabled && (this.render(), A(this.chart, "endResize", function () { this.legend.positionCheckboxes(); })); }, setOptions: function (a) {
                var b = v(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = n(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = v(a.symbolWidth, 16);
                this.pages =
                    [];
            }, update: function (a, b) { var c = this.chart; this.setOptions(n(!0, this.options, a)); this.destroy(); c.isDirtyLegend = c.isDirtyBox = !0; v(b, !0) && c.redraw(); }, colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options, e = a.legendItem, d = a.legendLine, g = a.legendSymbol, h = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : h, l = b ? a.color || h : h, n = a.options && a.options.marker, D = { fill: l };
                e && e.css({ fill: c, color: c });
                d && d.attr({ stroke: l });
                g && (n && g.isMarker && (D = a.pointAttribs(),
                    b || (D.stroke = D.fill = h)), g.attr(D));
            }, positionItem: function (a) { var b = this.options, e = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, g = d[0], d = d[1], h = a.checkbox; (a = a.legendGroup) && a.element && a.translate(b ? g : this.legendWidth - g - 2 * e - 4, d); h && (h.x = g, h.y = d); }, destroyItem: function (a) { var b = a.checkbox; h(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) { a[b] && (a[b] = a[b].destroy()); }); b && F(a.checkbox); }, destroy: function () {
                function a(a) { this[a] && (this[a] = this[a].destroy()); }
                h(this.getAllItems(), function (b) {
                    h(["legendItem",
                        "legendGroup"], a, b);
                });
                h("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null;
            }, positionCheckboxes: function () { var a = this.group && this.group.alignAttr, b, d = this.clipHeight || this.legendHeight, f = this.titleHeight; a && (b = a.translateY, h(this.allItems, function (c) { var e = c.checkbox, m; e && (m = b + f + e.y + (this.scrollOffset || 0) + 3, H(e, { left: a.translateX + c.checkboxOffset + e.x - 20 + "px", top: m + "px", display: m > b - 6 && m < b + d - 6 ? "" : "none" })); }, this)); }, renderTitle: function () {
                var a = this.options, b = this.padding, d = a.title, f = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }).css(d.style).add(this.group)), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: f }));
                this.titleHeight = f;
            }, setText: function (b) { var c = this.options; b.legendItem.attr({ text: c.labelFormat ? a.format(c.labelFormat, b, this.chart.time) : c.labelFormatter.call(b) }); }, renderItem: function (a) {
                var b = this.chart, e = b.renderer, d = this.options, g = "horizontal" === d.layout, h = this.symbolWidth, l = d.symbolPadding, z = this.itemStyle, q = this.itemHiddenStyle, D = this.padding, C = g ? v(d.itemDistance, 20) : 0, y = !d.rtl, G = d.width, B = d.itemMarginBottom || 0, J = this.itemMarginTop, E = a.legendItem, k = !a.series, p = !k && a.series.drawLegendSymbol ? a.series : a, t = p.options, u = this.createCheckboxForItem && t && t.showCheckbox, t = h + l + C + (u ? 20 : 0), N = d.useHTML, P = a.options.className;
                E || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + p.type + "-series highcharts-color-" + a.colorIndex +
                    (P ? " " + P : "") + (k ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = E = e.text("", y ? h + l : -l, this.baseline || 0, N).css(n(a.visible ? z : q)).attr({ align: y ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (h = z.fontSize, this.fontMetrics = e.fontMetrics(h, E), this.baseline = this.fontMetrics.f + 3 + J, E.attr("y", this.baseline)), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, p.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, E, N), u && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                z.width || E.css({ width: (d.itemWidth || d.width || b.spacingBox.width) - t });
                this.setText(a);
                e = E.getBBox();
                z = a.checkboxOffset = d.itemWidth || a.legendItemWidth || e.width + t;
                this.itemHeight = e = Math.round(a.legendItemHeight || e.height || this.symbolHeight);
                g && this.itemX - D + z > (G || b.spacingBox.width - 2 * D - d.x) && (this.itemX = D, this.itemY += J + this.lastLineHeight + B, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, z);
                this.lastItemY = J + this.itemY + B;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += z : (this.itemY += J + e + B, this.lastLineHeight = e);
                this.offsetWidth = G || Math.max((g ? this.itemX - D - (a.checkbox ? 0 : C) : z) + D, this.offsetWidth);
            }, getAllItems: function () { var a = []; h(this.chart.series, function (b) { var c = b && b.options; b && v(c.showInLegend, q(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b))); }); return a; }, getAlignment: function () {
                var a = this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) +
                    a.layout.charAt(0);
            }, adjustMargins: function (a, b) { var c = this.chart, e = this.options, d = this.getAlignment(); d && h([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, m) { f.test(d) && !q(a[m]) && (c[t[m]] = Math.max(c[t[m]], c.legend[(m + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][m] * e[m % 2 ? "x" : "y"] + v(e.margin, 12) + b[m] + (0 === m ? c.titleOffset + c.options.title.margin : 0))); }); }, render: function () {
                var a = this, c = a.chart, d = c.renderer, f = a.group, g, l, q, z, t = a.box, D = a.options, C = a.padding;
                a.itemX = C;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                f || (a.group = f = d.g("legend").attr({ zIndex: 7 }).add(), a.contentGroup = d.g().attr({ zIndex: 1 }).add(f), a.scrollGroup = d.g().add(a.contentGroup));
                a.renderTitle();
                g = a.getAllItems();
                b(g, function (a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0); });
                D.reversed && g.reverse();
                a.allItems = g;
                a.display = l = !!g.length;
                a.lastLineHeight = 0;
                h(g, function (b) { a.renderItem(b); });
                q = (D.width || a.offsetWidth) + C;
                z = a.lastItemY + a.lastLineHeight + a.titleHeight;
                z = a.handleOverflow(z);
                z += C;
                t || (a.box = t = d.rect().addClass("highcharts-legend-box").attr({ r: D.borderRadius }).add(f), t.isNew = !0);
                t.attr({ stroke: D.borderColor, "stroke-width": D.borderWidth || 0, fill: D.backgroundColor || "none" }).shadow(D.shadow);
                0 < q && 0 < z && (t[t.isNew ? "attr" : "animate"](t.crisp.call({}, { x: 0, y: 0, width: q, height: z }, t.strokeWidth())), t.isNew = !1);
                t[l ? "show" : "hide"]();
                a.legendWidth = q;
                a.legendHeight = z;
                h(g, function (b) { a.positionItem(b); });
                l && (d = c.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (d = n(d, { y: d.y + c.titleOffset +
                        c.options.title.margin })), f.align(n(D, { width: q, height: z }), !0, d));
                c.isResizing || this.positionCheckboxes();
            }, handleOverflow: function (a) {
                var b = this, e = this.chart, d = e.renderer, g = this.options, l = g.y, n = this.padding, e = e.spacingBox.height + ("top" === g.verticalAlign ? -l : l) - n, l = g.maxHeight, z, q = this.clipRect, D = g.navigation, C = v(D.animation, !0), y = D.arrowSize || 12, G = this.nav, B = this.pages, J, E = this.allItems, k = function (a) {
                    "number" === typeof a ? q.attr({ height: a }) : q && (b.clipRect = q.destroy(), b.contentGroup.clip());
                    b.contentGroup.div &&
                        (b.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto");
                };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (e /= 2);
                l && (e = Math.min(e, l));
                B.length = 0;
                a > e && !1 !== D.enabled ? (this.clipHeight = z = Math.max(e - 20 - this.titleHeight - n, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = a, h(E, function (a, b) {
                    var c = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height), d = B.length;
                    if (!d || c - B[d - 1] > z && (J || c) !== B[d - 1])
                        B.push(J || c), d++;
                    a.pageIx = d - 1;
                    J && (E[b - 1].pageIx = d - 1);
                    b === E.length - 1 && c + e - B[d - 1] > z && (B.push(c), a.pageIx = d);
                    c !== J && (J = c);
                }), q || (q = b.clipRect = d.clipRect(0, n, 9999, 0), b.contentGroup.clip(q)), k(z), G || (this.nav = G = d.g().attr({ zIndex: 1 }).add(this.group), this.up = d.symbol("triangle", 0, 0, y, y).on("click", function () { b.scroll(-1, C); }).add(G), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").css(D.style).add(G), this.down = d.symbol("triangle-down", 0, 0, y, y).on("click", function () { b.scroll(1, C); }).add(G)), b.scroll(0), a = e) : G && (k(), this.nav = G.destroy(), this.scrollGroup.attr({ translateY: 1 }),
                    this.clipHeight = 0);
                return a;
            }, scroll: function (a, b) {
                var c = this.pages, d = c.length;
                a = this.currentPage + a;
                var e = this.clipHeight, g = this.options.navigation, h = this.pager, l = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== b && u(b, this.chart), this.nav.attr({ translateX: l, translateY: e + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), h.attr({ text: a + "/" + d }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === d ? "highcharts-legend-nav-inactive" :
                        "highcharts-legend-nav-active" }), this.up.attr({ fill: 1 === a ? g.inactiveColor : g.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === d ? g.inactiveColor : g.activeColor }).css({ cursor: a === d ? "default" : "pointer" }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = a, this.positionCheckboxes());
            } };
        a.LegendSymbolMixin = { drawRectangle: function (a, b) {
                var c = a.symbolHeight, d = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(d ?
                    (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, d ? c : a.symbolWidth, c, v(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(b.legendGroup);
            }, drawLineMarker: function (a) {
                var b = this.options, d = b.marker, e = a.symbolWidth, g = a.symbolHeight, h = g / 2, l = this.chart.renderer, z = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var q;
                q = { "stroke-width": b.lineWidth || 0 };
                b.dashStyle && (q.dashstyle = b.dashStyle);
                this.legendLine = l.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(q).add(z);
                d &&
                    !1 !== d.enabled && (b = Math.min(v(d.radius, h), h), 0 === this.symbol.indexOf("url") && (d = n(d, { width: g, height: g }), b = 0), this.legendSymbol = d = l.symbol(this.symbol, e / 2 - b, a - b, 2 * b, 2 * b, d).addClass("highcharts-point").add(z), d.isMarker = !0);
            } };
        (/Trident\/7\.0/.test(d.navigator.userAgent) || l) && g(a.Legend.prototype, "positionItem", function (a, b) { var c = this, d = function () { b._legendItemPos && a.call(c, b); }; d(); setTimeout(d); });
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.animate, F = a.animObject, q = a.attr, h = a.doc, l = a.Axis, t = a.createElement, n = a.defaultOptions, v = a.discardElement, u = a.charts, b = a.css, d = a.defined, g = a.each, e = a.extend, c = a.find, m = a.fireEvent, f = a.grep, r = a.isNumber, w = a.isObject, K = a.isString, z = a.Legend, I = a.marginNames, D = a.merge, C = a.objectEach, y = a.Pointer, G = a.pick, B = a.pInt, J = a.removeEvent, E = a.seriesTypes, k = a.splat, p = a.syncTimeout, M = a.win, O = a.Chart = function () { this.getArgs.apply(this, arguments); };
        a.chart = function (a, b, c) { return new O(a, b, c); };
        e(O.prototype, { callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (K(a[0]) || a[0].nodeName)
                    this.renderTo =
                        a.shift();
                this.init(a[0], a[1]);
            }, init: function (b, c) {
                var d, e, k = b.series, f = b.plotOptions || {};
                b.series = null;
                d = D(n, b);
                for (e in d.plotOptions)
                    d.plotOptions[e].tooltip = f[e] && D(f[e].tooltip) || void 0;
                d.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                d.series = b.series = k;
                this.userOptions = b;
                e = d.chart;
                k = e.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = { h: {}, v: {} };
                this.labelCollectors = [];
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.time = b.time &&
                    a.keys(b.time).length ? new a.Time(b.time) : a.time;
                this.hasCartesianSeries = e.showAxes;
                var g = this;
                g.index = u.length;
                u.push(g);
                a.chartCount++;
                k && C(k, function (a, b) { A(g, b, a); });
                g.xAxis = [];
                g.yAxis = [];
                g.pointCount = g.colorCounter = g.symbolCounter = 0;
                g.firstRender();
            }, initSeries: function (b) { var c = this.options.chart; (c = E[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0); c = new c; c.init(this, b); return c; }, orderSeries: function (a) { var b = this.series; for (a = a || 0; a < b.length; a++)
                b[a] && (b[a].index = a, b[a].name = b[a].getName()); },
            isInsidePlot: function (a, b, c) { var d = c ? b : a; a = c ? a : b; return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight; }, redraw: function (b) {
                var c = this.axes, d = this.series, k = this.pointer, f = this.legend, p = this.isDirtyLegend, h, y, l = this.hasCartesianSeries, G = this.isDirtyBox, r, B = this.renderer, n = B.isHidden(), E = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                n && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;)
                    if (r = d[b], r.options.stacking && (h = !0, r.isDirty)) {
                        y = !0;
                        break;
                    }
                if (y)
                    for (b = d.length; b--;)
                        r =
                            d[b], r.options.stacking && (r.isDirty = !0);
                g(d, function (a) { a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), p = !0); a.isDirtyData && m(a, "updatedData"); });
                p && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
                h && this.getStacks();
                l && g(c, function (a) { a.updateNames(); a.setScale(); });
                this.getMargins();
                l && (g(c, function (a) { a.isDirty && (G = !0); }), g(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, E.push(function () { m(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes())); delete a.eventArgs; }));
                    (G || h) && a.redraw();
                }));
                G && this.drawChartBox();
                m(this, "predraw");
                g(d, function (a) { (G || a.isDirty) && a.visible && a.redraw(); a.isDirtyData = !1; });
                k && k.reset(!0);
                B.draw();
                m(this, "redraw");
                m(this, "render");
                n && this.temporaryDisplay(!0);
                g(E, function (a) { a.call(); });
            }, get: function (a) { function b(b) { return b.id === a || b.options && b.options.id === a; } var d, e = this.series, k; d = c(this.axes, b) || c(this.series, b); for (k = 0; !d && k < e.length; k++)
                d = c(e[k].points || [], b); return d; }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = k(b.xAxis ||
                    {}), b = b.yAxis = k(b.yAxis || {});
                g(c, function (a, b) { a.index = b; a.isX = !0; });
                g(b, function (a, b) { a.index = b; });
                c = c.concat(b);
                g(c, function (b) { new l(a, b); });
            }, getSelectedPoints: function () { var a = []; g(this.series, function (b) { a = a.concat(f(b.data || [], function (a) { return a.selected; })); }); return a; }, getSelectedSeries: function () { return f(this.series, function (a) { return a.selected; }); }, setTitle: function (a, b, c) {
                var d = this, e = d.options, k;
                k = e.title = D({ style: { color: "#333333", fontSize: e.isStock ? "16px" : "18px" } }, e.title, a);
                e = e.subtitle =
                    D({ style: { color: "#666666" } }, e.subtitle, b);
                g([["title", a, k], ["subtitle", b, e]], function (a, b) { var c = a[0], e = d[c], k = a[1]; a = a[2]; e && k && (d[c] = e = e.destroy()); a && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), d[c].update = function (a) { d.setTitle(!b && a, b && a); }, d[c].css(a.style)); });
                d.layOutTitles(c);
            }, layOutTitles: function (a) {
                var b = 0, c, d = this.renderer, k = this.spacingBox;
                g(["title", "subtitle"], function (a) {
                    var c = this[a], f = this.options[a];
                    a = "title" ===
                        a ? -3 : f.verticalAlign ? 0 : b + 2;
                    var g;
                    c && (g = f.style.fontSize, g = d.fontMetrics(g, c).b, c.css({ width: (f.width || k.width + f.widthAdjust) + "px" }).align(e({ y: a + g }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + c.getBBox(f.useHTML).height)));
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw());
            }, getChartSize: function () {
                var b = this.options.chart, c = b.width, b = b.height, e = this.renderTo;
                d(c) || (this.containerWidth =
                    a.getStyle(e, "width"));
                d(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
            }, temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;)
                        c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (h.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        h.body.contains(c) || c.parentNode ||
                            (c.hcOrigDetached = !0, h.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached)
                            c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === h.body)
                            break;
                    }
            }, setClassName: function (a) { this.container.className = "highcharts-container " + (a || ""); }, getContainer: function () {
                var b, c = this.options, d = c.chart, k, f;
                b = this.renderTo;
                var g = a.uniqueKey(), m;
                b || (this.renderTo = b = d.renderTo);
                K(b) && (this.renderTo = b = h.getElementById(b));
                b || a.error(13, !0);
                k = B(q(b, "data-highcharts-chart"));
                r(k) && u[k] && u[k].hasRendered && u[k].destroy();
                q(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                d.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                k = this.chartWidth;
                f = this.chartHeight;
                m = e({ position: "relative", overflow: "hidden", width: k + "px", height: f + "px", textAlign: "left", lineHeight: "normal", zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, d.style);
                this.container = b = t("div", { id: g }, m, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[d.renderer] || a.Renderer)(b, k, f, null, d.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(d.className);
                this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index;
            }, getMargins: function (a) {
                var b = this.spacing, c = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !d(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins();
            }, getAxisMargins: function () { var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin; a.hasCartesianSeries && g(a.axes, function (a) { a.visible && a.getOffset(); }); g(I, function (e, k) { d(c[k]) || (a[e] += b[k]); }); a.setChartSize(); }, reflow: function (b) {
                var c = this, e = c.options.chart, k = c.renderTo, f = d(e.width) && d(e.height), g = e.width || a.getStyle(k, "width"), e = e.height || a.getStyle(k, "height"), k = b ? b.target : M;
                if (!f && !c.isPrinting && g && e && (k === M || k === h)) {
                    if (g !== c.containerWidth || e !== c.containerHeight)
                        clearTimeout(c.reflowTimeout), c.reflowTimeout = p(function () { c.container && c.setSize(void 0, void 0, !1); }, b ? 100 : 0);
                    c.containerWidth = g;
                    c.containerHeight = e;
                }
            }, initReflow: function () { var a = this, b; b = A(M, "resize", function (b) { a.reflow(b); }); A(a, "destroy", b); }, setSize: function (c, d, e) {
                var k = this, f = k.renderer;
                k.isResizing +=
                    1;
                a.setAnimation(e, k);
                k.oldChartHeight = k.chartHeight;
                k.oldChartWidth = k.chartWidth;
                void 0 !== c && (k.options.chart.width = c);
                void 0 !== d && (k.options.chart.height = d);
                k.getChartSize();
                c = f.globalAnimation;
                (c ? H : b)(k.container, { width: k.chartWidth + "px", height: k.chartHeight + "px" }, c);
                k.setChartSize(!0);
                f.setSize(k.chartWidth, k.chartHeight, e);
                g(k.axes, function (a) { a.isDirty = !0; a.setScale(); });
                k.isDirtyLegend = !0;
                k.isDirtyBox = !0;
                k.layOutTitles();
                k.getMargins();
                k.redraw(e);
                k.oldChartHeight = null;
                m(k, "resize");
                p(function () {
                    k &&
                        m(k, "endResize", null, function () { --k.isResizing; });
                }, F(c).duration);
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, d = this.chartWidth, k = this.chartHeight, e = this.options.chart, f = this.spacing, m = this.clipOffset, p, h, y, l;
                this.plotLeft = p = Math.round(this.plotLeft);
                this.plotTop = h = Math.round(this.plotTop);
                this.plotWidth = y = Math.max(0, Math.round(d - p - this.marginRight));
                this.plotHeight = l = Math.max(0, Math.round(k - h - this.marginBottom));
                this.plotSizeX = b ? l : y;
                this.plotSizeY = b ? y : l;
                this.plotBorderWidth = e.plotBorderWidth ||
                    0;
                this.spacingBox = c.spacingBox = { x: f[3], y: f[0], width: d - f[3] - f[1], height: k - f[0] - f[2] };
                this.plotBox = c.plotBox = { x: p, y: h, width: y, height: l };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, m[3]) / 2);
                c = Math.ceil(Math.max(d, m[0]) / 2);
                this.clipBox = { x: b, y: c, width: Math.floor(this.plotSizeX - Math.max(d, m[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, m[2]) / 2 - c)) };
                a || g(this.axes, function (a) { a.setAxisSize(); a.setAxisTranslation(); });
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                g(["margin", "spacing"], function (c) { var d = b[c], k = w(d) ? d : [d, d, d, d]; g(["Top", "Right", "Bottom", "Left"], function (d, e) { a[c][e] = G(b[c + d], k[e]); }); });
                g(I, function (b, c) { a[b] = G(a.margin[c], a.spacing[c]); });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0];
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, k = this.chartBackground, e = this.plotBackground, f = this.plotBorder, g, m = this.plotBGImage, p = a.backgroundColor, h = a.plotBackgroundColor, y = a.plotBackgroundImage, l, G = this.plotLeft, r = this.plotTop, B = this.plotWidth, n = this.plotHeight, E = this.plotBox, z = this.clipRect, q = this.clipBox, w = "animate";
                k || (this.chartBackground = k = b.rect().addClass("highcharts-background").add(), w = "attr");
                g = a.borderWidth || 0;
                l = g + (a.shadow ? 8 : 0);
                p = { fill: p || "none" };
                if (g || k["stroke-width"])
                    p.stroke = a.borderColor, p["stroke-width"] = g;
                k.attr(p).shadow(a.shadow);
                k[w]({ x: l / 2, y: l / 2, width: c - l - g % 2, height: d - l - g % 2, r: a.borderRadius });
                w = "animate";
                e || (w = "attr", this.plotBackground = e = b.rect().addClass("highcharts-plot-background").add());
                e[w](E);
                e.attr({ fill: h || "none" }).shadow(a.plotShadow);
                y && (m ? m.animate(E) : this.plotBGImage = b.image(y, G, r, B, n).add());
                z ? z.animate({ width: q.width, height: q.height }) : this.clipRect = b.clipRect(q);
                w = "animate";
                f || (w = "attr", this.plotBorder = f = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
                f.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });
                f[w](f.crisp({ x: G, y: r, width: B, height: n }, -f.strokeWidth()));
                this.isDirtyBox = !1;
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, d = a.options.series, k, e;
                g(["inverted", "angular", "polar"], function (f) { c = E[b.type || b.defaultSeriesType]; e = b[f] || c && c.prototype[f]; for (k = d && d.length; !e && k--;)
                    (c = E[d[k].type]) && c.prototype[f] && (e = !0); a[f] = e; });
            }, linkSeries: function () {
                var a = this, b = a.series;
                g(b, function (a) { a.linkedSeries.length = 0; });
                g(b, function (b) {
                    var c = b.options.linkedTo;
                    K(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible));
                });
            }, renderSeries: function () { g(this.series, function (a) { a.translate(); a.render(); }); }, renderLabels: function () { var a = this, b = a.options.labels; b.items && g(b.items, function (c) { var d = e(b.style, c.style), k = B(d.left) + a.plotLeft, f = B(d.top) + a.plotTop + 12; delete d.left; delete d.top; a.renderer.text(c.html, k, f).attr({ zIndex: 2 }).css(d).add(); }); }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, d, k, e;
                this.setTitle();
                this.legend = new z(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                g(a, function (a) { a.setScale(); });
                this.getAxisMargins();
                k = 1.1 < c / this.plotWidth;
                e = 1.05 < d / this.plotHeight;
                if (k || e)
                    g(a, function (a) { (a.horiz && k || !a.horiz && e) && a.setTickInterval(!0); }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && g(a, function (a) { a.visible && a.render(); });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0;
            }, addCredits: function (a) { var b = this; a = D(!0, this.options.credits, a); a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { a.href && (M.location.href = a.href); }).attr({ align: a.position.align, zIndex: 8 }).css(a.style).add().align(a.position), this.credits.update = function (a) { b.credits = b.credits.destroy(); b.addCredits(a); }); }, destroy: function () {
                var b = this, c = b.axes, d = b.series, k = b.container, e, f = k && k.parentNode;
                m(b, "destroy");
                b.renderer.forExport ? a.erase(u, b) : u[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                J(b);
                for (e = c.length; e--;)
                    c[e] = c[e].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (e = d.length; e--;)
                    d[e] = d[e].destroy();
                g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) { var c = b[a]; c && c.destroy && (b[a] = c.destroy()); });
                k && (k.innerHTML = "", J(k), f && v(k));
                C(b, function (a, c) { delete b[c]; });
            }, firstRender: function () { var a = this, b = a.options; if (!a.isReadyToRender || a.isReadyToRender()) {
                a.getContainer();
                m(a, "init");
                a.resetMargins();
                a.setChartSize();
                a.propFromSeries();
                a.getAxes();
                g(b.series || [], function (b) { a.initSeries(b); });
                a.linkSeries();
                m(a, "beforeRender");
                y && (a.pointer = new y(a, b));
                a.render();
                if (!a.renderer.imgCount && a.onload)
                    a.onload();
                a.temporaryDisplay(!0);
            } }, onload: function () {
                g([this.callback].concat(this.callbacks), function (a) { a && void 0 !== this.index && a.apply(this, [this]); }, this);
                m(this, "load");
                m(this, "render");
                d(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null;
            } });
    })(L);
    (function (a) {
        var A, H = a.each, F = a.extend, q = a.erase, h = a.fireEvent, l = a.format, t = a.isArray, n = a.isNumber, v = a.pick, u = a.removeEvent;
        a.Point = A = function () { };
        a.Point.prototype = { init: function (a, d, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, g);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color =
                    this.color || d[a.colorCounter], d = d.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = v(this.colorIndex, g);
                a.chart.pointCount++;
                return this;
            }, applyOptions: function (a, d) {
                var b = this.series, e = b.options.pointValKey || b.pointValKey;
                a = A.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                e && (this.y = this[e]);
                this.isNull = v(this.isValid && !this.isValid(), null === this.x || !n(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && b.xAxis && b.xAxis.hasNames && (this.x = b.xAxis.nameToX(this));
                void 0 === this.x && b && (this.x = void 0 === d ? b.autoIncrement(this) : d);
                return this;
            }, optionsToObject: function (a) {
                var b = {}, g = this.series, e = g.options.keys, c = e || g.pointArrayMap || ["y"], m = c.length, f = 0, h = 0;
                if (n(a) || null === a)
                    b[c[0]] = a;
                else if (t(a))
                    for (!e && a.length > m && (g = typeof a[0], "string" === g ? b.name = a[0] : "number" === g && (b.x = a[0]), f++); h < m;)
                        e && void 0 === a[f] || (b[c[h]] = a[f]), f++, h++;
                else
                    "object" ===
                        typeof a && (b = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return b;
            }, getClassName: function () { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : ""); }, getZone: function () {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", g = 0, e;
                for (e = d[g]; this[a] >= e.value;)
                    e = d[++g];
                e && e.color && !this.options.color && (this.color = e.color);
                return e;
            }, destroy: function () { var a = this.series.chart, d = a.hoverPoints, g; a.pointCount--; d && (this.setState(), q(d, this), d.length || (a.hoverPoints = null)); if (this === a.hoverPoint)
                this.onMouseOut(); if (this.graphic || this.dataLabel)
                u(this), this.destroyElements(); this.legendItem && a.legend.destroyItem(this); for (g in this)
                this[g] = null; }, destroyElements: function () {
                for (var a = ["graphic",
                    "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, g = 6; g--;)
                    d = a[g], this[d] && (this[d] = this[d].destroy());
            }, getLabelConfig: function () { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal }; }, tooltipFormatter: function (a) {
                var b = this.series, g = b.tooltipOptions, e = v(g.valueDecimals, ""), c = g.valuePrefix || "", m = g.valueSuffix || "";
                H(b.pointArrayMap || ["y"], function (b) {
                    b =
                        "{point." + b;
                    if (c || m)
                        a = a.replace(b + "}", c + b + "}" + m);
                    a = a.replace(b + "}", b + ":,." + e + "f}");
                });
                return l(a, { point: this, series: this.series }, b.chart.time);
            }, firePointEvent: function (a, d, g) { var b = this, c = this.series.options; (c.point.events[a] || b.options && b.options.events && b.options.events[a]) && this.importEvents(); "click" === a && c.allowPointSelect && (g = function (a) { b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey); }); h(this, a, d, g); }, visible: !0 };
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.animObject, F = a.arrayMax, q = a.arrayMin, h = a.correctFloat, l = a.defaultOptions, t = a.defaultPlotOptions, n = a.defined, v = a.each, u = a.erase, b = a.extend, d = a.fireEvent, g = a.grep, e = a.isArray, c = a.isNumber, m = a.isString, f = a.merge, r = a.objectEach, w = a.pick, K = a.removeEvent, z = a.splat, I = a.SVGElement, D = a.syncTimeout, C = a.win;
        a.Series = a.seriesType("line", null, { lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", enabledThreshold: 2, radius: 4, states: { normal: {}, hover: { animation: { duration: 50 }, enabled: !0,
                        radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { align: "center", formatter: function () { return null === this.y ? "" : a.numberFormat(this.y, -1); }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { normal: {}, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { marker: {} } },
            stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x" }, { isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function (a, c) {
                var d = this, e, f = a.series, k;
                d.chart = a;
                d.options = c = d.setOptions(c);
                d.linkedSeries = [];
                d.bindAxes();
                b(d, { name: c.name, state: "", visible: !1 !== c.visible, selected: !0 === c.selected });
                e = c.events;
                r(e, function (a, b) { A(d, b, a); });
                if (e && e.click || c.point && c.point.events && c.point.events.click ||
                    c.allowPointSelect)
                    a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                v(d.parallelArrays, function (a) { d[a + "Data"] = []; });
                d.setData(c.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (k = f[f.length - 1]);
                d._i = w(k && k._i, -1) + 1;
                a.orderSeries(this.insert(f));
            }, insert: function (a) { var b = this.options.index, d; if (c(b)) {
                for (d = a.length; d--;)
                    if (b >= w(a[d].options.index, a[d]._i)) {
                        a.splice(d + 1, 0, this);
                        break;
                    }
                -1 === d && a.unshift(this);
                d += 1;
            }
            else
                a.push(this); return w(d, a.length - 1); }, bindAxes: function () {
                var b = this, c = b.options, d = b.chart, e;
                v(b.axisTypes || [], function (f) { v(d[f], function (a) { e = a.options; if (c[f] === e.index || void 0 !== c[f] && c[f] === e.id || void 0 === c[f] && 0 === e.index)
                    b.insert(a.series), b[f] = a, a.isDirty = !0; }); b[f] || b.optionalAxis === f || a.error(18, !0); });
            }, updateParallelArrays: function (a, b) { var d = a.series, e = arguments, f = c(b) ? function (c) { var e = "y" === c && d.toYData ? d.toYData(a) : a[c]; d[c + "Data"][b] = e; } : function (a) { Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(e, 2)); }; v(d.parallelArrays, f); }, autoIncrement: function () {
                var a = this.options, b = this.xIncrement, c, d = a.pointIntervalUnit, e = this.chart.time, b = w(b, a.pointStart, 0);
                this.pointInterval = c = w(this.pointInterval, a.pointInterval, 1);
                d && (a = new e.Date(b), "day" === d ? e.set("Date", a, e.get("Date", a) + c) : "month" === d ? e.set("Month", a, e.get("Month", a) + c) : "year" === d && e.set("FullYear", a, e.get("FullYear", a) + c), c = a.getTime() - b);
                this.xIncrement = b + c;
                return b;
            }, setOptions: function (a) {
                var b = this.chart, c = b.options, d = c.plotOptions, e = (b.userOptions || {}).plotOptions || {}, k = d[this.type];
                this.userOptions =
                    a;
                b = f(k, d.series, a);
                this.tooltipOptions = f(l.tooltip, l.plotOptions.series && l.plotOptions.series.tooltip, l.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = w(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === k.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor &&
                    !b.negativeFillColor || b.zones || a.push({ value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative", color: b.negativeColor, fillColor: b.negativeFillColor });
                a.length && n(a[a.length - 1].value) && a.push({ color: this.color, fillColor: this.fillColor });
                return b;
            }, getName: function () { return this.name || "Series " + (this.index + 1); }, getCyclic: function (a, b, c) {
                var d, e = this.chart, k = this.userOptions, f = a + "Index", g = a + "Counter", m = c ? c.length : w(e.options.chart[a + "Count"], e[a + "Count"]);
                b || (d = w(k[f], k["_" + f]),
                    n(d) || (e.series.length || (e[g] = 0), k["_" + f] = d = e[g] % m, e[g] += 1), c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b;
            }, getColor: function () { this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors); }, getSymbol: function () { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols); }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, setData: function (b, d, f, g) {
                var h = this, k = h.points, p = k && k.length || 0, l, y = h.options, r = h.chart, n = null, G = h.xAxis, B = y.turboThreshold, z = this.xData, q = this.yData, D = (l = h.pointArrayMap) && l.length;
                b = b || [];
                l = b.length;
                d = w(d, !0);
                if (!1 !== g && l && p === l && !h.cropped && !h.hasGroupedData && h.visible)
                    v(b, function (a, b) { k[b].update && a !== y.data[b] && k[b].update(a, !1, null, !1); });
                else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    v(this.parallelArrays, function (a) { h[a + "Data"].length = 0; });
                    if (B && l > B) {
                        for (f = 0; null === n && f < l;)
                            n = b[f], f++;
                        if (c(n))
                            for (f = 0; f < l; f++)
                                z[f] = this.autoIncrement(), q[f] = b[f];
                        else if (e(n))
                            if (D)
                                for (f = 0; f < l; f++)
                                    n =
                                        b[f], z[f] = n[0], q[f] = n.slice(1, D + 1);
                            else
                                for (f = 0; f < l; f++)
                                    n = b[f], z[f] = n[0], q[f] = n[1];
                        else
                            a.error(12);
                    }
                    else
                        for (f = 0; f < l; f++)
                            void 0 !== b[f] && (n = { series: h }, h.pointClass.prototype.applyOptions.apply(n, [b[f]]), h.updateParallelArrays(n, f));
                    q && m(q[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = b;
                    for (f = p; f--;)
                        k[f] && k[f].destroy && k[f].destroy();
                    G && (G.minRange = G.userMinRange);
                    h.isDirty = r.isDirtyBox = !0;
                    h.isDirtyData = !!k;
                    f = !1;
                }
                "point" === y.legendType && (this.processData(), this.generatePoints());
                d &&
                    r.redraw(f);
            }, processData: function (b) {
                var c = this.xData, d = this.yData, e = c.length, f;
                f = 0;
                var k, g, m = this.xAxis, h, l = this.options;
                h = l.cropThreshold;
                var y = this.getExtremesFromAll || l.getExtremesFromAll, r = this.isCartesian, l = m && m.val2lin, n = m && m.isLog, z = this.requireSorting, q, w;
                if (r && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !b)
                    return !1;
                m && (b = m.getExtremes(), q = b.min, w = b.max);
                if (r && this.sorted && !y && (!h || e > h || this.forceCrop))
                    if (c[e - 1] < q || c[0] > w)
                        c = [], d = [];
                    else if (c[0] < q || c[e - 1] > w)
                        f = this.cropData(this.xData, this.yData, q, w), c = f.xData, d = f.yData, f = f.start, k = !0;
                for (h = c.length || 1; --h;)
                    e = n ? l(c[h]) - l(c[h - 1]) : c[h] - c[h - 1], 0 < e && (void 0 === g || e < g) ? g = e : 0 > e && z && (a.error(15), z = !1);
                this.cropped = k;
                this.cropStart = f;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = g;
            }, cropData: function (a, b, c, d) { var e = a.length, k = 0, f = e, g = w(this.cropShoulder, 1), m; for (m = 0; m < e; m++)
                if (a[m] >= c) {
                    k = Math.max(0, m - g);
                    break;
                } for (c = m; c < e; c++)
                if (a[c] > d) {
                    f = c + g;
                    break;
                } return { xData: a.slice(k, f), yData: b.slice(k, f), start: k, end: f }; }, generatePoints: function () {
                var a = this.options, b = a.data, c = this.data, d, e = this.processedXData, k = this.processedYData, f = this.pointClass, g = e.length, m = this.cropStart || 0, h, l = this.hasGroupedData, a = a.keys, r, n = [], q;
                c || l || (c = [], c.length = b.length, c = this.data = c);
                a && l && (this.options.keys = !1);
                for (q = 0; q < g; q++)
                    h = m + q, l ? (r = (new f).init(this, [e[q]].concat(z(k[q]))), r.dataGroup = this.groupMap[q]) : (r = c[h]) || void 0 === b[h] || (c[h] = r = (new f).init(this, b[h], e[q])), r && (r.index = h, n[q] = r);
                this.options.keys = a;
                if (c && (g !== (d = c.length) || l))
                    for (q = 0; q < d; q++)
                        q !== m || l ||
                            (q += g), c[q] && (c[q].destroyElements(), c[q].plotX = void 0);
                this.data = c;
                this.points = n;
            }, getExtremes: function (a) {
                var b = this.yAxis, d = this.processedXData, f, g = [], k = 0;
                f = this.xAxis.getExtremes();
                var m = f.min, h = f.max, l, y, r, n;
                a = a || this.stackedYData || this.processedYData || [];
                f = a.length;
                for (n = 0; n < f; n++)
                    if (y = d[n], r = a[n], l = (c(r, !0) || e(r)) && (!b.positiveValuesOnly || r.length || 0 < r), y = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[n + 1] || y) >= m && (d[n - 1] || y) <= h, l && y)
                        if (l = r.length)
                            for (; l--;)
                                "number" ===
                                    typeof r[l] && (g[k++] = r[l]);
                        else
                            g[k++] = r;
                this.dataMin = q(g);
                this.dataMax = F(g);
            }, translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, b = a.stacking, d = this.xAxis, e = d.categories, f = this.yAxis, k = this.points, g = k.length, m = !!this.modifyValue, l = a.pointPlacement, r = "between" === l || c(l), q = a.threshold, z = a.startFromThreshold ? q : 0, D, C, t, v, u = Number.MAX_VALUE;
                "between" === l && (l = .5);
                c(l) && (l *= w(a.pointRange || d.pointRange));
                for (a = 0; a < g; a++) {
                    var I = k[a], K = I.x, A = I.y;
                    C = I.low;
                    var F = b && f.stacks[(this.negStacks && A < (z ? 0 : q) ? "-" : "") + this.stackKey], H;
                    f.positiveValuesOnly && null !== A && 0 >= A && (I.isNull = !0);
                    I.plotX = D = h(Math.min(Math.max(-1E5, d.translate(K, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                    b && this.visible && !I.isNull && F && F[K] && (v = this.getStackIndicator(v, K, this.index), H = F[K], A = H.points[v.key], C = A[0], A = A[1], C === z && v.key === F[K].base && (C = w(q, f.min)), f.positiveValuesOnly && 0 >= C && (C = null), I.total = I.stackTotal = H.total, I.percentage = H.total && I.y / H.total * 100, I.stackY = A, H.setOffset(this.pointXOffset ||
                        0, this.barW || 0));
                    I.yBottom = n(C) ? Math.min(Math.max(-1E5, f.translate(C, 0, 1, 0, 1)), 1E5) : null;
                    m && (A = this.modifyValue(A, I));
                    I.plotY = C = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, f.translate(A, 0, 1, 0, 1)), 1E5) : void 0;
                    I.isInside = void 0 !== C && 0 <= C && C <= f.len && 0 <= D && D <= d.len;
                    I.clientX = r ? h(d.translate(K, 0, 0, 0, 1, l)) : D;
                    I.negative = I.y < (q || 0);
                    I.category = e && void 0 !== e[I.x] ? e[I.x] : I.x;
                    I.isNull || (void 0 !== t && (u = Math.min(u, Math.abs(D - t))), t = D);
                    I.zone = this.zones.length && I.getZone();
                }
                this.closestPointRangePx =
                    u;
            }, getValidPoints: function (a, b) { var c = this.chart; return g(a || this.points || [], function (a) { return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull; }); }, setClip: function (a) {
                var b = this.chart, c = this.options, d = b.renderer, e = b.inverted, k = this.clipBox, f = k || b.clipBox, g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(), m = b[g], h = b[g + "m"];
                m || (a && (f.width = 0, e && (f.x = b.plotSizeX), b[g + "m"] = h = d.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth :
                    b.chartHeight)), b[g] = m = d.clipRect(f), m.count = { length: 0 });
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || k ? m : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey = g);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && g && b[g] && (k || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())));
            }, animate: function (a) {
                var b = this.chart, c = H(this.options.animation), d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) &&
                    a.animate({ width: b.plotSizeX, x: 0 }, c), b[d + "m"] && b[d + "m"].animate({ width: b.plotSizeX + 99, x: 0 }, c), this.animate = null);
            }, afterAnimate: function () { this.setClip(); d(this, "afterAnimate"); this.finishedAnimating = !0; }, drawPoints: function () {
                var a = this.points, b = this.chart, c, d, e, k, f = this.options.marker, g, m, h, l = this[this.specialGroup] || this.markerGroup, r, n = w(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++)
                        d =
                            a[c], k = d.graphic, g = d.marker || {}, m = !!d.marker, e = n && void 0 === g.enabled || g.enabled, h = d.isInside, e && !d.isNull ? (e = w(g.symbol, this.symbol), r = this.markerAttribs(d, d.selected && "select"), k ? k[h ? "show" : "hide"](!0).animate(r) : h && (0 < r.width || d.hasImage) && (d.graphic = k = b.renderer.symbol(e, r.x, r.y, r.width, r.height, m ? g : f).add(l)), k && k.attr(this.pointAttribs(d, d.selected && "select")), k && k.addClass(d.getClassName(), !0)) : k && (d.graphic = k.destroy());
            }, markerAttribs: function (a, b) {
                var c = this.options.marker, d = a.marker || {}, e = d.symbol || c.symbol, k = w(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], k = w(b && b.radius, c && c.radius, k + (c && c.radiusPlus || 0)));
                a.hasImage = e && 0 === e.indexOf("url");
                a.hasImage && (k = 0);
                a = { x: Math.floor(a.plotX) - k, y: a.plotY - k };
                k && (a.width = a.height = 2 * k);
                return a;
            }, pointAttribs: function (a, b) {
                var c = this.options.marker, d = a && a.options, e = d && d.marker || {}, k = this.color, f = d && d.color, g = a && a.color, d = w(e.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                k = f || a || g || k;
                a = e.fillColor || c.fillColor || k;
                k = e.lineColor ||
                    c.lineColor || k;
                b && (c = c.states[b], b = e.states && e.states[b] || {}, d = w(b.lineWidth, c.lineWidth, d + w(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, k = b.lineColor || c.lineColor || k);
                return { stroke: k, "stroke-width": d, fill: a };
            }, destroy: function () {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(C.navigator.userAgent), e, f, k = a.data || [], g, m;
                d(a, "destroy");
                K(a);
                v(a.axisTypes || [], function (b) { (m = a[b]) && m.series && (u(m.series, a), m.isDirty = m.forceRedraw = !0); });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (f = k.length; f--;)
                    (g = k[f]) && g.destroy && g.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                r(a, function (a, b) { a instanceof I && !a.survive && (e = c && "group" === b ? "hide" : "destroy", a[e]()); });
                b.hoverSeries === a && (b.hoverSeries = null);
                u(b.series, a);
                b.orderSeries();
                r(a, function (b, c) { delete a[c]; });
            }, getGraphPath: function (a, b, c) {
                var d = this, e = d.options, k = e.step, f, g = [], m = [], h;
                a = a || d.points;
                (f = a.reversed) && a.reverse();
                (k = { right: 1, center: 2 }[k] || k && 3) && f && (k = 4 - k);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                v(a, function (f, l) { var p = f.plotX, r = f.plotY, y = a[l - 1]; (f.leftCliff || y && y.rightCliff) && !c && (h = !0); f.isNull && !n(b) && 0 < l ? h = !e.connectNulls : f.isNull && !b ? h = !0 : (0 === l || h ? l = ["M", f.plotX, f.plotY] : d.getPointSpline ? l = d.getPointSpline(a, f, l) : k ? (l = 1 === k ? ["L", y.plotX, r] : 2 === k ? ["L", (y.plotX + p) / 2, y.plotY, "L", (y.plotX + p) / 2, r] : ["L", p, y.plotY], l.push("L", p, r)) : l = ["L", p, r], m.push(f.x), k && m.push(f.x), g.push.apply(g, l), h = !1); });
                g.xMap = m;
                return d.graphPath = g;
            }, drawGraph: function () {
                var a = this, b = this.options, c = (this.gappedPath ||
                    this.getGraphPath).call(this), d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                v(this.zones, function (c, e) { d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle]); });
                v(d, function (d, e) {
                    var k = d[0], f = a[k];
                    f ? (f.endX = a.preventGraphAnimation ? null : c.xMap, f.animate({ d: c })) : c.length && (a[k] = a.chart.renderer.path(c).addClass(d[1]).attr({ zIndex: 1 }).add(a.group), f = { stroke: d[2], "stroke-width": b.lineWidth, fill: a.fillGraph &&
                            a.color || "none" }, d[3] ? f.dashstyle = d[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[k].attr(f).shadow(2 > e && b.shadow));
                    f && (f.startX = c.xMap, f.isArea = c.isArea);
                });
            }, applyZones: function () {
                var a = this, b = this.chart, c = b.renderer, d = this.zones, e, k, f = this.clips || [], g, m = this.graph, h = this.area, l = Math.max(b.chartWidth, b.chartHeight), r = this[(this.zoneAxis || "y") + "Axis"], n, q, z = b.inverted, D, C, t, u, I = !1;
                d.length && (m || h) && r && void 0 !== r.min && (q = r.reversed, D = r.horiz, m && m.hide(), h && h.hide(),
                    n = r.getExtremes(), v(d, function (d, p) {
                    e = q ? D ? b.plotWidth : 0 : D ? 0 : r.toPixels(n.min);
                    e = Math.min(Math.max(w(k, e), 0), l);
                    k = Math.min(Math.max(Math.round(r.toPixels(w(d.value, n.max), !0)), 0), l);
                    I && (e = k = r.toPixels(n.max));
                    C = Math.abs(e - k);
                    t = Math.min(e, k);
                    u = Math.max(e, k);
                    r.isXAxis ? (g = { x: z ? u : t, y: 0, width: C, height: l }, D || (g.x = b.plotHeight - g.x)) : (g = { x: 0, y: z ? u : t, width: l, height: C }, D && (g.y = b.plotWidth - g.y));
                    z && c.isVML && (g = r.isXAxis ? { x: 0, y: q ? t : u, height: g.width, width: b.chartWidth } : { x: g.y - b.plotLeft - b.spacingBox.x, y: 0, width: g.height,
                        height: b.chartHeight });
                    f[p] ? f[p].animate(g) : (f[p] = c.clipRect(g), m && a["zone-graph-" + p].clip(f[p]), h && a["zone-area-" + p].clip(f[p]));
                    I = d.value > n.max;
                }), this.clips = f);
            }, invertGroups: function (a) { function b() { v(["group", "markerGroup"], function (b) { c[b] && (d.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)); }); } var c = this, d = c.chart, e; c.xAxis && (e = A(d, "resize", b), A(c, "destroy", e), b(a), c.invertGroups = b); }, plotGroup: function (a, b, c, d, e) {
                var f = this[a], g = !f;
                g && (this[a] = f = this.chart.renderer.g().attr({ zIndex: d || .1 }).add(e));
                f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (n(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr({ visibility: c })[g ? "attr" : "animate"](this.getPlotBox());
                return f;
            }, getPlotBox: function () {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 };
            }, render: function () {
                var a = this, b = a.chart, c, d = a.options, e = !!a.animate && b.renderer.isSVG && H(d.animation).duration, f = a.visible ? "inherit" : "hidden", g = d.zIndex, m = a.hasRendered, h = b.seriesGroup, l = b.inverted;
                c = a.plotGroup("group", "series", f, g, h);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, h);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === d.clip || a.sharedClipKey || m || c.clip(b.clipRect);
                e && a.animate();
                m || (a.animationTimeout = D(function () { a.afterAnimate(); }, e));
                a.isDirty = !1;
                a.hasRendered = !0;
            }, redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
                c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: w(d && d.left, a.plotLeft), translateY: w(e && e.top, a.plotTop) }));
                this.translate();
                this.render();
                b && delete this.kdTree;
            }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (a, b) { var c = this.xAxis, d = this.yAxis, e = this.chart.inverted; return this.searchKDTree({ clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos }, b); }, buildKDTree: function () {
                function a(c, d, e) {
                    var f, k;
                    if (k = c && c.length)
                        return f = b.kdAxisArray[d % e], c.sort(function (a, b) { return a[f] - b[f]; }), k = Math.floor(k / 2), { point: c[k], left: a(c.slice(0, k), d + 1, e), right: a(c.slice(k +
                                1), d + 1, e) };
                }
                this.buildingKdTree = !0;
                var b = this, c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                D(function () { b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c); b.buildingKdTree = !1; }, b.options.kdNow ? 0 : 1);
            }, searchKDTree: function (a, b) {
                function c(a, b, k, m) {
                    var h = b.point, l = d.kdAxisArray[k % m], p, r, q = h;
                    r = n(a[e]) && n(h[e]) ? Math.pow(a[e] - h[e], 2) : null;
                    p = n(a[f]) && n(h[f]) ? Math.pow(a[f] - h[f], 2) : null;
                    p = (r || 0) + (p || 0);
                    h.dist = n(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    h.distX = n(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    l = a[l] - h[l];
                    p = 0 > l ? "left" : "right";
                    r = 0 > l ? "right" : "left";
                    b[p] && (p = c(a, b[p], k + 1, m), q = p[g] < q[g] ? p : h);
                    b[r] && Math.sqrt(l * l) < q[g] && (a = c(a, b[r], k + 1, m), q = a[g] < q[g] ? a : q);
                    return q;
                }
                var d = this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], g = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree)
                    return c(a, this.kdTree, b, b);
            } });
    })(L);
    (function (a) {
        var A = a.Axis, H = a.Chart, F = a.correctFloat, q = a.defined, h = a.destroyObjectProperties, l = a.each, t = a.format, n = a.objectEach, v = a.pick, u = a.Series;
        a.StackItem = function (a, d, g, e, c) { var b = a.chart.inverted; this.axis = a; this.isNegative = g; this.options = d; this.x = e; this.total = null; this.points = {}; this.stack = c; this.rightCliff = this.leftCliff = 0; this.alignOptions = { align: d.align || (b ? g ? "left" : "right" : "center"), verticalAlign: d.verticalAlign || (b ? "middle" : g ? "bottom" : "top"), y: v(d.y, b ? 4 : g ? 14 : -6), x: v(d.x, b ? g ? -6 : 6 : 0) }; this.textAlign = d.textAlign || (b ? g ? "right" : "left" : "center"); };
        a.StackItem.prototype = { destroy: function () {
                h(this, this.axis);
            }, render: function (a) { var b = this.axis.chart, g = this.options, e = g.format, e = e ? t(e, this, b.time) : g.formatter.call(this); this.label ? this.label.attr({ text: e, visibility: "hidden" }) : this.label = b.renderer.text(e, null, null, g.useHTML).css(g.style).attr({ align: this.textAlign, rotation: g.rotation, visibility: "hidden" }).add(a); }, setOffset: function (a, d) {
                var b = this.axis, e = b.chart, c = b.translate(b.usePercentage ? 100 : this.total, 0, 0, 0, 1), b = b.translate(0), b = Math.abs(c - b);
                a = e.xAxis[0].translate(this.x) + a;
                c = this.getStackBox(e, this, a, c, d, b);
                if (d = this.label)
                    d.align(this.alignOptions, null, c), c = d.alignAttr, d[!1 === this.options.crop || e.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0);
            }, getStackBox: function (a, d, g, e, c, m) { var b = d.axis.reversed, h = a.inverted; a = a.plotHeight; d = d.isNegative && !b || !d.isNegative && b; return { x: h ? d ? e : e - m : g, y: h ? a - g - c : d ? a - e - m : a - e, width: h ? m : c, height: h ? c : m }; } };
        H.prototype.getStacks = function () {
            var a = this;
            l(a.yAxis, function (a) { a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks); });
            l(a.series, function (b) {
                !b.options.stacking ||
                    !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + v(b.options.stack, ""));
            });
        };
        A.prototype.buildStacks = function () { var a = this.series, d = v(this.options.reversedStacks, !0), g = a.length, e; if (!this.isXAxis) {
            this.usePercentage = !1;
            for (e = g; e--;)
                a[d ? e : g - e - 1].setStackedPoints();
            for (e = 0; e < g; e++)
                a[e].modifyStacks();
        } };
        A.prototype.renderStackTotals = function () {
            var a = this.chart, d = a.renderer, g = this.stacks, e = this.stackTotalGroup;
            e || (this.stackTotalGroup = e = d.g("stack-labels").attr({ visibility: "visible",
                zIndex: 6 }).add());
            e.translate(a.plotLeft, a.plotTop);
            n(g, function (a) { n(a, function (a) { a.render(e); }); });
        };
        A.prototype.resetStacks = function () { var a = this, d = a.stacks; a.isXAxis || n(d, function (b) { n(b, function (d, c) { d.touched < a.stacksTouched ? (d.destroy(), delete b[c]) : (d.total = null, d.cumulative = null); }); }); };
        A.prototype.cleanStacks = function () { var a; this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), n(a, function (a) { n(a, function (a) { a.cumulative = a.total; }); })); };
        u.prototype.setStackedPoints = function () {
            if (this.options.stacking &&
                (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var b = this.processedXData, d = this.processedYData, g = [], e = d.length, c = this.options, m = c.threshold, f = v(c.startFromThreshold && m, 0), h = c.stack, c = c.stacking, l = this.stackKey, n = "-" + l, z = this.negStacks, t = this.yAxis, D = t.stacks, C = t.oldStacks, y, u, B, J, E, k, p;
                t.stacksTouched += 1;
                for (E = 0; E < e; E++)
                    k = b[E], p = d[E], y = this.getStackIndicator(y, k, this.index), J = y.key, B = (u = z && p < (f ? 0 : m)) ? n : l, D[B] || (D[B] = {}), D[B][k] || (C[B] && C[B][k] ? (D[B][k] = C[B][k], D[B][k].total =
                        null) : D[B][k] = new a.StackItem(t, t.options.stackLabels, u, k, h)), B = D[B][k], null !== p ? (B.points[J] = B.points[this.index] = [v(B.cumulative, f)], q(B.cumulative) || (B.base = J), B.touched = t.stacksTouched, 0 < y.index && !1 === this.singleStacks && (B.points[J][0] = B.points[this.index + "," + k + ",0"][0])) : B.points[J] = B.points[this.index] = null, "percent" === c ? (u = u ? l : n, z && D[u] && D[u][k] ? (u = D[u][k], B.total = u.total = Math.max(u.total, B.total) + Math.abs(p) || 0) : B.total = F(B.total + (Math.abs(p) || 0))) : B.total = F(B.total + (p || 0)), B.cumulative = v(B.cumulative, f) + (p || 0), null !== p && (B.points[J].push(B.cumulative), g[E] = B.cumulative);
                "percent" === c && (t.usePercentage = !0);
                this.stackedYData = g;
                t.oldStacks = {};
            }
        };
        u.prototype.modifyStacks = function () { var a = this, d = a.stackKey, g = a.yAxis.stacks, e = a.processedXData, c, m = a.options.stacking; a[m + "Stacker"] && l([d, "-" + d], function (b) { for (var d = e.length, f, h; d--;)
            if (f = e[d], c = a.getStackIndicator(c, f, a.index, b), h = (f = g[b] && g[b][f]) && f.points[c.key])
                a[m + "Stacker"](h, f, d); }); };
        u.prototype.percentStacker = function (a, d, g) {
            d = d.total ? 100 / d.total :
                0;
            a[0] = F(a[0] * d);
            a[1] = F(a[1] * d);
            this.stackedYData[g] = a[1];
        };
        u.prototype.getStackIndicator = function (a, d, g, e) { !q(a) || a.x !== d || e && a.key !== e ? a = { x: d, index: 0, key: e } : a.index++; a.key = [g, d, a.index].join(); return a; };
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.animate, F = a.Axis, q = a.createElement, h = a.css, l = a.defined, t = a.each, n = a.erase, v = a.extend, u = a.fireEvent, b = a.inArray, d = a.isNumber, g = a.isObject, e = a.isArray, c = a.merge, m = a.objectEach, f = a.pick, r = a.Point, w = a.Series, K = a.seriesTypes, z = a.setAnimation, I = a.splat;
        v(a.Chart.prototype, { addSeries: function (a, b, c) { var d, e = this; a && (b = f(b, !0), u(e, "addSeries", { options: a }, function () { d = e.initSeries(a); e.isDirtyLegend = !0; e.linkSeries(); b && e.redraw(c); })); return d; }, addAxis: function (a, b, d, e) { var g = b ? "xAxis" : "yAxis", m = this.options; a = c(a, { index: this[g].length, isX: b }); b = new F(this, a); m[g] = I(m[g] || {}); m[g].push(a); f(d, !0) && this.redraw(e); return b; }, showLoading: function (a) {
                var b = this, c = b.options, d = b.loadingDiv, e = c.loading, f = function () {
                    d && h(d, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth +
                            "px", height: b.plotHeight + "px" });
                };
                d || (b.loadingDiv = d = q("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = q("span", { className: "highcharts-loading-inner" }, null, d), A(b, "redraw", f));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                h(d, v(e.style, { zIndex: 10 }));
                h(b.loadingSpan, e.labelStyle);
                b.loadingShown || (h(d, { opacity: 0, display: "" }), H(d, { opacity: e.style.opacity || .5 }, { duration: e.showDuration || 0 }));
                b.loadingShown = !0;
                f();
            }, hideLoading: function () {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", H(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { h(b, { display: "none" }); } }));
                this.loadingShown = !1;
            }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "), update: function (a, e, g) {
                var h = this, r = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" }, n = a.chart, q, k, p = [];
                if (n) {
                    c(!0, h.options.chart, n);
                    "className" in n && h.setClassName(n.className);
                    if ("inverted" in n || "polar" in n)
                        h.propFromSeries(), q = !0;
                    "alignTicks" in n && (q = !0);
                    m(n, function (a, c) {
                        -1 !== b("chart." + c, h.propsRequireUpdateSeries) && (k = !0);
                        -1 !== b(c, h.propsRequireDirtyBox) &&
                            (h.isDirtyBox = !0);
                    });
                    "style" in n && h.renderer.setStyle(n.style);
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && c(!0, this.options.plotOptions, a.plotOptions);
                m(a, function (a, c) { if (h[c] && "function" === typeof h[c].update)
                    h[c].update(a, !1);
                else if ("function" === typeof h[r[c]])
                    h[r[c]](a); "chart" !== c && -1 !== b(c, h.propsRequireUpdateSeries) && (k = !0); });
                t("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (t(I(a[b]), function (a, c) {
                        (c = l(a.id) && h.get(a.id) || h[b][c]) && c.coll === b && (c.update(a, !1), g && (c.touched = !0));
                        if (!c && g)
                            if ("series" === b)
                                h.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b)
                                h.addAxis(a, "xAxis" === b, !1).touched = !0;
                    }), g && t(h[b], function (a) { a.touched ? delete a.touched : p.push(a); }));
                });
                t(p, function (a) { a.remove(!1); });
                q && t(h.axes, function (a) { a.update({}, !1); });
                k && t(h.series, function (a) { a.update({}, !1); });
                a.loading && c(!0, h.options.loading, a.loading);
                q = n && n.width;
                n = n && n.height;
                d(q) && q !== h.chartWidth || d(n) && n !== h.chartHeight ? h.setSize(q, n) : f(e, !0) && h.redraw();
            }, setSubtitle: function (a) {
                this.setTitle(void 0, a);
            } });
        v(r.prototype, { update: function (a, b, c, d) {
                function e() {
                    h.applyOptions(a);
                    null === h.y && k && (h.graphic = k.destroy());
                    g(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = k.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    l = h.index;
                    m.updateParallelArrays(h, l);
                    n.data[l] = g(n.data[l], !0) || g(a, !0) ? h.options : a;
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (r.isDirtyBox = !0);
                    "point" === n.legendType &&
                        (r.isDirtyLegend = !0);
                    b && r.redraw(c);
                }
                var h = this, m = h.series, k = h.graphic, l, r = m.chart, n = m.options;
                b = f(b, !0);
                !1 === d ? e() : h.firePointEvent("update", { options: a }, e);
            }, remove: function (a, c) { this.series.removePoint(b(this, this.series.data), a, c); } });
        v(w.prototype, { addPoint: function (a, b, c, d) {
                var e = this.options, g = this.data, h = this.chart, k = this.xAxis, k = k && k.hasNames && k.names, m = e.data, l, r, n = this.xData, q, z;
                b = f(b, !0);
                l = { series: this };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                z = l.x;
                q = n.length;
                if (this.requireSorting &&
                    z < n[q - 1])
                    for (r = !0; q && n[q - 1] > z;)
                        q--;
                this.updateParallelArrays(l, "splice", q, 0, 0);
                this.updateParallelArrays(l, q);
                k && l.name && (k[z] = l.name);
                m.splice(q, 0, a);
                r && (this.data.splice(q, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(l, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(d);
            }, removePoint: function (a, b, c) {
                var d = this, e = d.data, g = e[a], h = d.points, k = d.chart, m = function () {
                    h && h.length === e.length &&
                        h.splice(a, 1);
                    e.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(g || { series: d }, "splice", a, 1);
                    g && g.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    b && k.redraw();
                };
                z(c, k);
                b = f(b, !0);
                g ? g.firePointEvent("remove", null, m) : m();
            }, remove: function (a, b, c) { function d() { e.destroy(); g.isDirtyLegend = g.isDirtyBox = !0; g.linkSeries(); f(a, !0) && g.redraw(b); } var e = this, g = e.chart; !1 !== c ? u(e, "remove", null, d) : d(); }, update: function (a, b) {
                var d = this, e = d.chart, g = d.userOptions, h = d.oldType || d.type, m = a.type || g.type || e.options.chart.type, k = K[h].prototype, l, r = ["group", "markerGroup", "dataLabelsGroup"], n = ["navigatorSeries", "baseSeries"], q = d.finishedAnimating && { animation: !1 };
                if (Object.keys && "data" === Object.keys(a).toString())
                    return this.setData(a.data, b);
                n = r.concat(n);
                t(n, function (a) { n[a] = d[a]; delete d[a]; });
                a = c(g, q, { index: d.index, pointStart: d.xData[0] }, { data: d.options.data }, a);
                d.remove(!1, null, !1);
                for (l in k)
                    d[l] = void 0;
                v(d, K[m || h].prototype);
                t(n, function (a) { d[a] = n[a]; });
                d.init(e, a);
                a.zIndex !== g.zIndex && t(r, function (b) { d[b] && d[b].attr({ zIndex: a.zIndex }); });
                d.oldType = h;
                e.linkSeries();
                f(b, !0) && e.redraw(!1);
            } });
        v(F.prototype, { update: function (a, b) { var d = this.chart; a = d.options[this.coll][this.options.index] = c(this.userOptions, a); this.destroy(!0); this.init(d, v(a, { events: void 0 })); d.isDirtyBox = !0; f(b, !0) && d.redraw(); }, remove: function (a) {
                for (var b = this.chart, c = this.coll, d = this.series, g = d.length; g--;)
                    d[g] && d[g].remove(!1);
                n(b.axes, this);
                n(b[c], this);
                e(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                t(b[c], function (a, b) {
                    a.options.index =
                        b;
                });
                this.destroy();
                b.isDirtyBox = !0;
                f(a, !0) && b.redraw();
            }, setTitle: function (a, b) { this.update({ title: a }, b); }, setCategories: function (a, b) { this.update({ categories: a }, b); } });
    })(L);
    (function (a) {
        var A = a.color, H = a.each, F = a.map, q = a.pick, h = a.Series, l = a.seriesType;
        l("area", "line", { softThreshold: !1, threshold: 0 }, { singleStacks: !1, getStackPoints: function (h) {
                var l = [], t = [], u = this.xAxis, b = this.yAxis, d = b.stacks[this.stackKey], g = {}, e = this.index, c = b.series, m = c.length, f, r = q(b.options.reversedStacks, !0) ? 1 : -1, w;
                h = h || this.points;
                if (this.options.stacking) {
                    for (w = 0; w < h.length; w++)
                        h[w].leftNull = h[w].rightNull = null, g[h[w].x] = h[w];
                    a.objectEach(d, function (a, b) { null !== a.total && t.push(b); });
                    t.sort(function (a, b) { return a - b; });
                    f = F(c, function () { return this.visible; });
                    H(t, function (a, c) {
                        var h = 0, n, q;
                        if (g[a] && !g[a].isNull)
                            l.push(g[a]), H([-1, 1], function (b) {
                                var h = 1 === b ? "rightNull" : "leftNull", l = 0, z = d[t[c + b]];
                                if (z)
                                    for (w = e; 0 <= w && w < m;)
                                        n = z.points[w], n || (w === e ? g[a][h] = !0 : f[w] && (q = d[a].points[w]) && (l -= q[1] - q[0])), w += r;
                                g[a][1 === b ? "rightCliff" : "leftCliff"] =
                                    l;
                            });
                        else {
                            for (w = e; 0 <= w && w < m;) {
                                if (n = d[a].points[w]) {
                                    h = n[1];
                                    break;
                                }
                                w += r;
                            }
                            h = b.translate(h, 0, 1, 0, 1);
                            l.push({ isNull: !0, plotX: u.translate(a, 0, 0, 0, 1), x: a, plotY: h, yBottom: h });
                        }
                    });
                }
                return l;
            }, getGraphPath: function (a) {
                var l = h.prototype.getGraphPath, t = this.options, u = t.stacking, b = this.yAxis, d, g, e = [], c = [], m = this.index, f, r = b.stacks[this.stackKey], w = t.threshold, A = b.getThreshold(t.threshold), z, t = t.connectNulls || "percent" === u, I = function (d, g, h) {
                    var l = a[d];
                    d = u && r[l.x].points[m];
                    var n = l[h + "Null"] || 0;
                    h = l[h + "Cliff"] || 0;
                    var q, z, l = !0;
                    h || n ? (q = (n ? d[0] : d[1]) + h, z = d[0] + h, l = !!n) : !u && a[g] && a[g].isNull && (q = z = w);
                    void 0 !== q && (c.push({ plotX: f, plotY: null === q ? A : b.getThreshold(q), isNull: l, isCliff: !0 }), e.push({ plotX: f, plotY: null === z ? A : b.getThreshold(z), doCurve: !1 }));
                };
                a = a || this.points;
                u && (a = this.getStackPoints(a));
                for (d = 0; d < a.length; d++)
                    if (g = a[d].isNull, f = q(a[d].rectPlotX, a[d].plotX), z = q(a[d].yBottom, A), !g || t)
                        t || I(d, d - 1, "left"), g && !u && t || (c.push(a[d]), e.push({ x: d, plotX: f, plotY: z })), t || I(d, d + 1, "right");
                d = l.call(this, c, !0, !0);
                e.reversed =
                    !0;
                g = l.call(this, e, !0, !0);
                g.length && (g[0] = "L");
                g = d.concat(g);
                l = l.call(this, c, !1, t);
                g.xMap = d.xMap;
                this.areaPath = g;
                return l;
            }, drawGraph: function () {
                this.areaPath = [];
                h.prototype.drawGraph.apply(this);
                var a = this, l = this.areaPath, v = this.options, u = [["area", "highcharts-area", this.color, v.fillColor]];
                H(this.zones, function (b, d) { u.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + b.className, b.color || a.color, b.fillColor || v.fillColor]); });
                H(u, function (b) {
                    var d = b[0], g = a[d];
                    g ? (g.endX = a.preventGraphAnimation ?
                        null : l.xMap, g.animate({ d: l })) : (g = a[d] = a.chart.renderer.path(l).addClass(b[1]).attr({ fill: q(b[3], A(b[2]).setOpacity(q(v.fillOpacity, .75)).get()), zIndex: 0 }).add(a.group), g.isArea = !0);
                    g.startX = l.xMap;
                    g.shiftUnit = v.step ? 2 : 1;
                });
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(L);
    (function (a) {
        var A = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, { getPointSpline: function (a, F, q) {
                var h = F.plotX, l = F.plotY, t = a[q - 1];
                q = a[q + 1];
                var n, v, u, b;
                if (t && !t.isNull && !1 !== t.doCurve && !F.isCliff && q && !q.isNull && !1 !== q.doCurve &&
                    !F.isCliff) {
                    a = t.plotY;
                    u = q.plotX;
                    q = q.plotY;
                    var d = 0;
                    n = (1.5 * h + t.plotX) / 2.5;
                    v = (1.5 * l + a) / 2.5;
                    u = (1.5 * h + u) / 2.5;
                    b = (1.5 * l + q) / 2.5;
                    u !== n && (d = (b - v) * (u - h) / (u - n) + l - b);
                    v += d;
                    b += d;
                    v > a && v > l ? (v = Math.max(a, l), b = 2 * l - v) : v < a && v < l && (v = Math.min(a, l), b = 2 * l - v);
                    b > q && b > l ? (b = Math.max(q, l), v = 2 * l - b) : b < q && b < l && (b = Math.min(q, l), v = 2 * l - b);
                    F.rightContX = u;
                    F.rightContY = b;
                }
                F = ["C", A(t.rightContX, t.plotX), A(t.rightContY, t.plotY), A(n, h), A(v, l), h, l];
                t.rightContX = t.rightContY = null;
                return F;
            } });
    })(L);
    (function (a) {
        var A = a.seriesTypes.area.prototype, H = a.seriesType;
        H("areaspline", "spline", a.defaultPlotOptions.area, { getStackPoints: A.getStackPoints, getGraphPath: A.getGraphPath, drawGraph: A.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle });
    })(L);
    (function (a) {
        var A = a.animObject, H = a.color, F = a.each, q = a.extend, h = a.isNumber, l = a.merge, t = a.pick, n = a.Series, v = a.seriesType, u = a.svg;
        v("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 },
                select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }, { cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { n.prototype.init.apply(this, arguments); var a = this, d = a.chart; d.hasRendered && F(d.series, function (b) { b.type === a.type && (b.isDirty = !0); }); }, getColumnMetrics: function () {
                var a = this, d = a.options, g = a.xAxis, e = a.yAxis, c = g.reversed, h, f = {}, l = 0;
                !1 === d.grouping ? l = 1 : F(a.chart.series, function (b) { var c = b.options, d = b.yAxis, g; b.type !== a.type || !b.visible && a.chart.options.chart.ignoreHiddenSeries || e.len !== d.len || e.pos !== d.pos || (c.stacking ? (h = b.stackKey, void 0 === f[h] && (f[h] = l++), g = f[h]) : !1 !== c.grouping && (g = l++), b.columnIndex = g); });
                var n = Math.min(Math.abs(g.transA) * (g.ordinalSlope || d.pointRange || g.closestPointRange || g.tickInterval || 1), g.len), q = n * d.groupPadding, z = (n - 2 * q) / (l || 1), d = Math.min(d.maxPointWidth || g.len, t(d.pointWidth, z * (1 - 2 * d.pointPadding)));
                a.columnMetrics = { width: d, offset: (z - d) / 2 + (q + ((a.columnIndex || 0) + (c ? 1 : 0)) * z - n / 2) * (c ? -1 : 1) };
                return a.columnMetrics;
            }, crispCol: function (a, d, g, e) { var b = this.chart, h = this.borderWidth, f = -(h % 2 ? .5 : 0), h = h % 2 ? .5 : 1; b.inverted && b.renderer.isVML && (h += 1); this.options.crisp && (g = Math.round(a + g) + f, a = Math.round(a) + f, g -= a); e = Math.round(d + e) + h; f = .5 >= Math.abs(d) && .5 < e; d = Math.round(d) + h; e -= d; f && e && (--d, e += 1); return { x: a, y: d, width: g, height: e }; }, translate: function () {
                var a = this, d = a.chart, h = a.options, e = a.dense = 2 > a.closestPointRange * a.xAxis.transA, e = a.borderWidth = t(h.borderWidth, e ? 0 : 1), c = a.yAxis, m = h.threshold, f = a.translatedThreshold = c.getThreshold(m), l = t(h.minPointLength, 5), q = a.getColumnMetrics(), u = q.width, z = a.barW = Math.max(u, 1 + 2 * e), v = a.pointXOffset = q.offset;
                d.inverted && (f -= .5);
                h.pointPadding && (z = Math.ceil(z));
                n.prototype.translate.apply(a);
                F(a.points, function (b) {
                    var e = t(b.yBottom, f), h = 999 + Math.abs(e), h = Math.min(Math.max(-h, b.plotY), c.len + h), g = b.plotX + v, r = z, n = Math.min(h, e), q, k = Math.max(h, e) - n;
                    l &&
                        Math.abs(k) < l && (k = l, q = !c.reversed && !b.negative || c.reversed && b.negative, b.y === m && a.dataMax <= m && c.min < m && (q = !q), n = Math.abs(n - f) > l ? e - l : f - (q ? l : 0));
                    b.barX = g;
                    b.pointWidth = u;
                    b.tooltipPos = d.inverted ? [c.len + c.pos - d.plotLeft - h, a.xAxis.len - g - r / 2, k] : [g + r / 2, h + c.pos - d.plotTop, k];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [g, f, r, 0] : [g, n, r, k]);
                });
            }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data"); },
            pointAttribs: function (a, d) {
                var b = this.options, e, c = this.pointAttrToOptions || {};
                e = c.stroke || "borderColor";
                var h = c["stroke-width"] || "borderWidth", f = a && a.color || this.color, r = a && a[e] || b[e] || this.color || f, n = a && a[h] || b[h] || this[h] || 0, c = b.dashStyle;
                a && this.zones.length && (f = a.getZone(), f = a.options.color || f && f.color || this.color);
                d && (a = l(b.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, f = a.color || void 0 !== d && H(f).brighten(a.brightness).get() || f, r = a[e] || r, n = a[h] || n, c = a.dashStyle || c);
                e = { fill: f,
                    stroke: r, "stroke-width": n };
                c && (e.dashstyle = c);
                return e;
            }, drawPoints: function () {
                var a = this, d = this.chart, g = a.options, e = d.renderer, c = g.animationLimit || 250, m;
                F(a.points, function (b) {
                    var f = b.graphic;
                    if (h(b.plotY) && null !== b.y) {
                        m = b.shapeArgs;
                        if (f)
                            f[d.pointCount < c ? "animate" : "attr"](l(m));
                        else
                            b.graphic = f = e[b.shapeType](m).add(b.group || a.group);
                        g.borderRadius && f.attr({ r: g.borderRadius });
                        f.attr(a.pointAttribs(b, b.selected && "select")).shadow(g.shadow, null, g.stacking && !g.borderRadius);
                        f.addClass(b.getClassName(), !0);
                    }
                    else
                        f && (b.graphic = f.destroy());
                });
            }, animate: function (a) { var b = this, h = this.yAxis, e = b.options, c = this.chart.inverted, m = {}, f = c ? "translateX" : "translateY", l; u && (a ? (m.scaleY = .001, a = Math.min(h.pos + h.len, Math.max(h.pos, h.toPixels(e.threshold))), c ? m.translateX = a - h.len : m.translateY = a, b.group.attr(m)) : (l = b.group.attr(f), b.group.animate({ scaleY: 1 }, q(A(b.options.animation), { step: function (a, c) { m[f] = l + c.pos * (h.pos - l); b.group.attr(m); } })), b.animate = null)); }, remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && F(d.series, function (b) { b.type === a.type && (b.isDirty = !0); });
                n.prototype.remove.apply(a, arguments);
            } });
    })(L);
    (function (a) { a = a.seriesType; a("bar", "column", null, { inverted: !0 }); })(L);
    (function (a) {
        var A = a.Series;
        a = a.seriesType;
        a("scatter", "line", { lineWidth: 0, findNearestPointBy: "xy", marker: { enabled: !0 }, tooltip: { headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e" } }, { sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && A.prototype.drawGraph.call(this); } });
    })(L);
    (function (a) {
        var A = a.deg2rad, H = a.isNumber, F = a.pick, q = a.relativeLength;
        a.CenteredSeriesMixin = { getCenter: function () {
                var a = this.options, l = this.chart, t = 2 * (a.slicedOffset || 0), n = l.plotWidth - 2 * t, l = l.plotHeight - 2 * t, v = a.center, v = [F(v[0], "50%"), F(v[1], "50%"), a.size || "100%", a.innerSize || 0], u = Math.min(n, l), b, d;
                for (b = 0; 4 > b; ++b)
                    d = v[b], a = 2 > b || 2 === b && /%$/.test(d), v[b] = q(d, [n, l, u, v[2]][b]) + (a ? t : 0);
                v[3] > v[2] && (v[3] = v[2]);
                return v;
            }, getStartAndEndRadians: function (a, l) { a = H(a) ? a : 0; l = H(l) && l > a && 360 > l - a ? l : a + 360; return { start: A * (a + -90), end: A * (l + -90) }; } };
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.CenteredSeriesMixin, F = a.defined, q = a.each, h = a.extend, l = H.getStartAndEndRadians, t = a.inArray, n = a.noop, v = a.pick, u = a.Point, b = a.Series, d = a.seriesType, g = a.setAnimation;
        d("pie", "line", { center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { distance: 30,
                enabled: !0, formatter: function () { return this.point.isNull ? void 0 : this.point.name; }, x: 0 }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, states: { hover: { brightness: .1 } } }, { isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function (a) {
                var b = this, d = b.points, e = b.startAngleRad;
                a || (q(d, function (a) { var c = a.graphic, d = a.shapeArgs; c && (c.attr({ r: a.startR || b.center[3] / 2, start: e, end: e }), c.animate({ r: d.r, start: d.start, end: d.end }, b.options.animation)); }), b.animate = null);
            }, updateTotals: function () { var a, b = 0, d = this.points, f = d.length, h, g = this.options.ignoreHiddenPoint; for (a = 0; a < f; a++)
                h = d[a], b += g && !h.visible ? 0 : h.isNull ? 0 : h.y; this.total = b; for (a = 0; a < f; a++)
                h = d[a], h.percentage = 0 < b && (h.visible || !g) ? h.y / b * 100 : 0, h.total = b; }, generatePoints: function () {
                b.prototype.generatePoints.call(this);
                this.updateTotals();
            }, translate: function (a) {
                this.generatePoints();
                var b = 0, d = this.options, e = d.slicedOffset, h = e + (d.borderWidth || 0), g, n, q, t = l(d.startAngle, d.endAngle), u = this.startAngleRad = t.start, t = (this.endAngleRad = t.end) - u, C = this.points, y, G = d.dataLabels.distance, d = d.ignoreHiddenPoint, B, A = C.length, E;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) { q = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1)); return a[0] + (c ? -1 : 1) * Math.cos(q) * (a[2] / 2 + d.labelDistance); };
                for (B = 0; B < A; B++) {
                    E = C[B];
                    E.labelDistance = v(E.options.dataLabels && E.options.dataLabels.distance, G);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, E.labelDistance);
                    g = u + b * t;
                    if (!d || E.visible)
                        b += E.percentage / 100;
                    n = u + b * t;
                    E.shapeType = "arc";
                    E.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * g) / 1E3, end: Math.round(1E3 * n) / 1E3 };
                    q = (n + g) / 2;
                    q > 1.5 * Math.PI ? q -= 2 * Math.PI : q < -Math.PI / 2 && (q += 2 * Math.PI);
                    E.slicedTranslation = { translateX: Math.round(Math.cos(q) * e), translateY: Math.round(Math.sin(q) * e) };
                    n = Math.cos(q) * a[2] /
                        2;
                    y = Math.sin(q) * a[2] / 2;
                    E.tooltipPos = [a[0] + .7 * n, a[1] + .7 * y];
                    E.half = q < -Math.PI / 2 || q > Math.PI / 2 ? 1 : 0;
                    E.angle = q;
                    g = Math.min(h, E.labelDistance / 5);
                    E.labelPos = [a[0] + n + Math.cos(q) * E.labelDistance, a[1] + y + Math.sin(q) * E.labelDistance, a[0] + n + Math.cos(q) * g, a[1] + y + Math.sin(q) * g, a[0] + n, a[1] + y, 0 > E.labelDistance ? "center" : E.half ? "right" : "left", q];
                }
            }, drawGraph: null, drawPoints: function () {
                var a = this, b = a.chart.renderer, d, f, g, l, n = a.options.shadow;
                n && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group));
                q(a.points, function (c) {
                    f =
                        c.graphic;
                    if (c.isNull)
                        f && (c.graphic = f.destroy());
                    else {
                        l = c.shapeArgs;
                        d = c.getTranslate();
                        var e = c.shadowGroup;
                        n && !e && (e = c.shadowGroup = b.g("shadow").add(a.shadowGroup));
                        e && e.attr(d);
                        g = a.pointAttribs(c, c.selected && "select");
                        f ? f.setRadialReference(a.center).attr(g).animate(h(l, d)) : (c.graphic = f = b[c.shapeType](l).setRadialReference(a.center).attr(d).add(a.group), c.visible || f.attr({ visibility: "hidden" }), f.attr(g).attr({ "stroke-linejoin": "round" }).shadow(n, e));
                        f.addClass(c.getClassName());
                    }
                });
            }, searchPoint: n,
            sortByAngle: function (a, b) { a.sort(function (a, c) { return void 0 !== a.angle && (c.angle - a.angle) * b; }); }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: H.getCenter, getSymbol: n }, { init: function () { u.prototype.init.apply(this, arguments); var a = this, b; a.name = v(a.name, "Slice"); b = function (b) { a.slice("select" === b.type); }; A(a, "select", b); A(a, "unselect", b); return a; }, isValid: function () { return a.isNumber(this.y, !0) && 0 <= this.y; }, setVisible: function (a, b) {
                var c = this, d = c.series, e = d.chart, h = d.options.ignoreHiddenPoint;
                b = v(b, h);
                a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible : a, d.options.data[t(c, d.data)] = c.options, q(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) { if (c[b])
                    c[b][a ? "show" : "hide"](!0); }), c.legendItem && e.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), h && (d.isDirty = !0), b && e.redraw());
            }, slice: function (a, b, d) {
                var c = this.series;
                g(d, c.chart);
                v(b, !0);
                this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
                c.options.data[t(this, c.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
            }, getTranslate: function () { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 }; }, haloPath: function (a) { var b = this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, { innerR: this.shapeArgs.r - 1, start: b.start, end: b.end }); } });
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.arrayMax, F = a.defined, q = a.each, h = a.extend, l = a.format, t = a.map, n = a.merge, v = a.noop, u = a.pick, b = a.relativeLength, d = a.Series, g = a.seriesTypes, e = a.stableSort;
        a.distribute = function (a, b) {
            function c(a, b) { return a.target - b.target; }
            var d, h = !0, g = a, l = [], m;
            m = 0;
            for (d = a.length; d--;)
                m += a[d].size;
            if (m > b) {
                e(a, function (a, b) { return (b.rank || 0) - (a.rank || 0); });
                for (m = d = 0; m <= b;)
                    m += a[d].size, d++;
                l = a.splice(d - 1, a.length);
            }
            e(a, c);
            for (a = t(a, function (a) { return { size: a.size, targets: [a.target], align: u(a.align, .5) }; }); h;) {
                for (d = a.length; d--;)
                    h = a[d], m = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, m - h.size *
                        h.align), b - h.size);
                d = a.length;
                for (h = !1; d--;)
                    0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size, a[d - 1].targets = a[d - 1].targets.concat(a[d].targets), a[d - 1].align = .5, a[d - 1].pos + a[d - 1].size > b && (a[d - 1].pos = b - a[d - 1].size), a.splice(d, 1), h = !0);
            }
            d = 0;
            q(a, function (a) { var b = 0; q(a.targets, function () { g[d].pos = a.pos + b; b += g[d].size; d++; }); });
            g.push.apply(g, l);
            e(g, c);
        };
        d.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" ===
                    b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0;
            }
            var d = this, e = d.chart, h = d.options, g = h.dataLabels, t = d.points, z, v, D = d.hasRendered || 0, C, y, G = u(g.defer, !!h.animation), B = e.renderer;
            if (g.enabled || d._hasPointLabels)
                d.dlProcessOptions && d.dlProcessOptions(g), y = d.plotGroup("dataLabelsGroup", "data-labels", G && !D ? "hidden" : "visible", g.zIndex || 6), G && (y.attr({ opacity: +D }), D || A(d, "afterAnimate", function () {
                    d.visible && y.show(!0);
                    y[h.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 });
                })), v = g, q(t, function (c) {
                    var f, k = c.dataLabel, m, q, r = c.connector, t = !k, w;
                    z = c.dlOptions || c.options && c.options.dataLabels;
                    (f = u(z && z.enabled, v.enabled) && !c.isNull) && (f = !0 === b(c, z || g));
                    f && (g = n(v, z), m = c.getLabelConfig(), w = g[c.formatPrefix + "Format"] || g.format, C = F(w) ? l(w, m, e.time) : (g[c.formatPrefix + "Formatter"] || g.formatter).call(m, g), w = g.style, m = g.rotation, w.color = u(g.color, w.color, d.color, "#000000"), "contrast" === w.color && (c.contrastColor = B.getContrast(c.color || d.color), w.color = g.inside || 0 > u(c.labelDistance, g.distance) || h.stacking ? c.contrastColor : "#000000"), h.cursor && (w.cursor = h.cursor), q = { fill: g.backgroundColor, stroke: g.borderColor, "stroke-width": g.borderWidth, r: g.borderRadius || 0, rotation: m, padding: g.padding, zIndex: 1 }, a.objectEach(q, function (a, b) { void 0 === a && delete q[b]; }));
                    !k || f && F(C) ? f && F(C) && (k ? q.text = C : (k = c.dataLabel = m ? B.text(C, 0, -9999).addClass("highcharts-data-label") : B.label(C, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label"), k.addClass(" highcharts-data-label-color-" + c.colorIndex + " " + (g.className ||
                        "") + (g.useHTML ? "highcharts-tracker" : ""))), k.attr(q), k.css(w).shadow(g.shadow), k.added || k.add(y), d.alignDataLabel(c, k, g, null, t)) : (c.dataLabel = k = k.destroy(), r && (c.connector = r.destroy()));
                });
        };
        d.prototype.alignDataLabel = function (a, b, d, e, g) {
            var c = this.chart, f = c.inverted, l = u(a.dlBox && a.dlBox.centerX, a.plotX, -9999), m = u(a.plotY, -9999), n = b.getBBox(), q, r = d.rotation, t = d.align, w = this.visible && (a.series.forceDL || c.isInsidePlot(l, Math.round(m), f) || e && c.isInsidePlot(l, f ? e.x + 1 : e.y + e.height - 1, f)), v = "justify" === u(d.overflow, "justify");
            if (w && (q = d.style.fontSize, q = c.renderer.fontMetrics(q, b).b, e = h({ x: f ? this.yAxis.len - m : l, y: Math.round(f ? this.xAxis.len - l : m), width: 0, height: 0 }, e), h(d, { width: n.width, height: n.height }), r ? (v = !1, l = c.renderer.rotCorr(q, r), l = { x: e.x + d.x + e.width / 2 + l.x, y: e.y + d.y + { top: 0, middle: .5, bottom: 1 }[d.verticalAlign] * e.height }, b[g ? "attr" : "animate"](l).attr({ align: t }), m = (r + 720) % 360, m = 180 < m && 360 > m, "left" === t ? l.y -= m ? n.height : 0 : "center" === t ? (l.x -= n.width / 2, l.y -= n.height / 2) : "right" === t && (l.x -= n.width, l.y -= m ? 0 : n.height)) :
                (b.align(d, null, e), l = b.alignAttr), v ? a.isLabelJustified = this.justifyDataLabel(b, d, l, n, e, g) : u(d.crop, !0) && (w = c.isInsidePlot(l.x, l.y) && c.isInsidePlot(l.x + n.width, l.y + n.height)), d.shape && !r))
                b[g ? "attr" : "animate"]({ anchorX: f ? c.plotWidth - a.plotY : a.plotX, anchorY: f ? c.plotHeight - a.plotX : a.plotY });
            w || (b.attr({ y: -9999 }), b.placed = !1);
        };
        d.prototype.justifyDataLabel = function (a, b, d, e, h, g) {
            var c = this.chart, f = b.align, l = b.verticalAlign, m, n, q = a.box ? 0 : a.padding || 0;
            m = d.x + q;
            0 > m && ("right" === f ? b.align = "left" : b.x = -m, n = !0);
            m = d.x + e.width - q;
            m > c.plotWidth && ("left" === f ? b.align = "right" : b.x = c.plotWidth - m, n = !0);
            m = d.y + q;
            0 > m && ("bottom" === l ? b.verticalAlign = "top" : b.y = -m, n = !0);
            m = d.y + e.height - q;
            m > c.plotHeight && ("top" === l ? b.verticalAlign = "bottom" : b.y = c.plotHeight - m, n = !0);
            n && (a.placed = !g, a.align(b, null, h));
            return n;
        };
        g.pie && (g.pie.prototype.drawDataLabels = function () {
            var b = this, e = b.data, f, h = b.chart, g = b.options.dataLabels, l = u(g.connectorPadding, 10), n = u(g.connectorWidth, 1), t = h.plotWidth, v = h.plotHeight, C, y = b.center, G = y[2] / 2, B = y[1], A, E, k, p, M = [[], []], O, N, P, L, x = [0, 0, 0, 0];
            b.visible && (g.enabled || b._hasPointLabels) && (q(e, function (a) { a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1); }), d.prototype.drawDataLabels.apply(b), q(e, function (a) { a.dataLabel && a.visible && (M[a.half].push(a), a.dataLabel._pos = null); }), q(M, function (c, d) {
                var e, m, n = c.length, r = [], z;
                if (n)
                    for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (e = Math.max(0, B - G - b.maxLabelDistance), m = Math.min(B +
                        G + b.maxLabelDistance, h.plotHeight), q(c, function (a) { 0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, B - G - a.labelDistance), a.bottom = Math.min(B + G + a.labelDistance, h.plotHeight), z = a.dataLabel.getBBox().height || 21, a.positionsIndex = r.push({ target: a.labelPos[1] - a.top + z / 2, size: z, rank: a.y }) - 1); }), a.distribute(r, m + z - e)), L = 0; L < n; L++)
                        f = c[L], m = f.positionsIndex, k = f.labelPos, A = f.dataLabel, P = !1 === f.visible ? "hidden" : "inherit", N = e = k[1], r && F(r[m]) && (void 0 === r[m].pos ? P = "hidden" : (p = r[m].size, N = f.top + r[m].pos)), delete f.positionIndex,
                            O = g.justify ? y[0] + (d ? -1 : 1) * (G + f.labelDistance) : b.getX(N < f.top + 2 || N > f.bottom - 2 ? e : N, d, f), A._attr = { visibility: P, align: k[6] }, A._pos = { x: O + g.x + ({ left: l, right: -l }[k[6]] || 0), y: N + g.y - 10 }, k.x = O, k.y = N, u(g.crop, !0) && (E = A.getBBox().width, e = null, O - E < l ? (e = Math.round(E - O + l), x[3] = Math.max(e, x[3])) : O + E > t - l && (e = Math.round(O + E - t + l), x[1] = Math.max(e, x[1])), 0 > N - p / 2 ? x[0] = Math.max(Math.round(-N + p / 2), x[0]) : N + p / 2 > v && (x[2] = Math.max(Math.round(N + p / 2 - v), x[2])), A.sideOverflow = e);
            }), 0 === H(x) || this.verifyDataLabelOverflow(x)) && (this.placeDataLabels(),
                n && q(this.points, function (a) { var c; C = a.connector; if ((A = a.dataLabel) && A._pos && a.visible && 0 < a.labelDistance) {
                    P = A._attr.visibility;
                    if (c = !C)
                        a.connector = C = h.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), C.attr({ "stroke-width": n, stroke: g.connectorColor || a.color || "#666666" });
                    C[c ? "attr" : "animate"]({ d: b.connectorPath(a.labelPos) });
                    C.attr("visibility", P);
                }
                else
                    C && (a.connector = C.destroy()); }));
        }, g.pie.prototype.connectorPath = function (a) {
            var b = a.x, c = a.y;
            return u(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]];
        }, g.pie.prototype.placeDataLabels = function () {
            q(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({ width: b._attr.width + "px", textOverflow: "ellipsis" }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a),
                    b.moved = !0) : b && b.attr({ y: -9999 }));
            }, this);
        }, g.pie.prototype.alignDataLabel = v, g.pie.prototype.verifyDataLabelOverflow = function (a) {
            var c = this.center, d = this.options, e = d.center, h = d.minSize || 80, g, l = null !== d.size;
            l || (null !== e[0] ? g = Math.max(c[2] - Math.max(a[1], a[3]), h) : (g = Math.max(c[2] - a[1] - a[3], h), c[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = Math.max(Math.min(g, c[2] - Math.max(a[0], a[2])), h) : (g = Math.max(Math.min(g, c[2] - a[0] - a[2]), h), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = Math.min(b(d.innerSize || 0, g), g), this.translate(c),
                this.drawDataLabels && this.drawDataLabels()) : l = !0);
            return l;
        });
        g.column && (g.column.prototype.alignDataLabel = function (a, b, e, g, h) {
            var c = this.chart.inverted, f = a.series, l = a.dlBox || a.shapeArgs, m = u(a.below, a.plotY > u(this.translatedThreshold, f.yAxis.len)), q = u(e.inside, !!this.options.stacking);
            l && (g = n(l), 0 > g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - f.yAxis.len, 0 < l && (g.height -= l), c && (g = { x: f.yAxis.len - g.y - g.height, y: f.xAxis.len - g.x - g.width, width: g.height, height: g.width }), q || (c ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y +=
                m ? g.height : 0, g.height = 0)));
            e.align = u(e.align, !c || q ? "center" : m ? "right" : "left");
            e.verticalAlign = u(e.verticalAlign, c || q ? "middle" : m ? "top" : "bottom");
            d.prototype.alignDataLabel.call(this, a, b, e, g, h);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({ color: a.contrastColor });
        });
    })(L);
    (function (a) {
        var A = a.Chart, H = a.each, F = a.objectEach, q = a.pick;
        a = a.addEvent;
        a(A.prototype, "render", function () {
            var a = [];
            H(this.labelCollectors || [], function (h) { a = a.concat(h()); });
            H(this.yAxis || [], function (h) {
                h.options.stackLabels &&
                    !h.options.stackLabels.allowOverlap && F(h.stacks, function (h) { F(h, function (h) { a.push(h.label); }); });
            });
            H(this.series || [], function (h) { var l = h.options.dataLabels, n = h.dataLabelCollections || ["dataLabel"]; (l.enabled || h._hasPointLabels) && !l.allowOverlap && h.visible && H(n, function (l) { H(h.points, function (h) { h[l] && (h[l].labelrank = q(h.labelrank, h.shapeArgs && h.shapeArgs.height), a.push(h[l])); }); }); });
            this.hideOverlappingLabels(a);
        });
        A.prototype.hideOverlappingLabels = function (a) {
            var h = a.length, q, n, v, u, b, d, g, e, c, m = function (a, b, c, d, e, g, h, l) { return !(e > a + c || e + h < a || g > b + d || g + l < b); };
            for (n = 0; n < h; n++)
                if (q = a[n])
                    q.oldOpacity = q.opacity, q.newOpacity = 1, q.width || (v = q.getBBox(), q.width = v.width, q.height = v.height);
            a.sort(function (a, b) { return (b.labelrank || 0) - (a.labelrank || 0); });
            for (n = 0; n < h; n++)
                for (v = a[n], q = n + 1; q < h; ++q)
                    if (u = a[q], v && u && v !== u && v.placed && u.placed && 0 !== v.newOpacity && 0 !== u.newOpacity && (b = v.alignAttr, d = u.alignAttr, g = v.parentGroup, e = u.parentGroup, c = 2 * (v.box ? 0 : v.padding || 0), b = m(b.x + g.translateX, b.y + g.translateY, v.width - c, v.height -
                        c, d.x + e.translateX, d.y + e.translateY, u.width - c, u.height - c)))
                        (v.labelrank < u.labelrank ? v : u).newOpacity = 0;
            H(a, function (a) { var b, c; a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () { a.hide(); }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0); });
        };
    })(L);
    (function (a) {
        var A = a.addEvent, H = a.Chart, F = a.createElement, q = a.css, h = a.defaultOptions, l = a.defaultPlotOptions, t = a.each, n = a.extend, v = a.fireEvent, u = a.hasTouch, b = a.inArray, d = a.isObject, g = a.Legend, e = a.merge, c = a.pick, m = a.Point, f = a.Series, r = a.seriesTypes, w = a.svg, K;
        K = a.TrackerMixin = { drawTrackerPoint: function () {
                var a = this, b = a.chart.pointer, c = function (a) { var c = b.getPointFromEvent(a); void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a)); };
                t(a.points, function (a) { a.graphic && (a.graphic.element.point = a); a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a); });
                a._hasTracking || (t(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) { b.onTrackerMouseOut(a); });
                        if (u)
                            a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(q).css({ cursor: a.options.cursor });
                    }
                }), a._hasTracking = !0);
            }, drawTrackerGraph: function () {
                var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, l = f.options.tooltip.snap, k = a.tracker, m, n = function () { if (f.hoverSeries !== a)
                    a.onMouseOver(); }, q = "rgba(192,192,192," + (w ? .0001 : .002) + ")";
                if (e && !c)
                    for (m = e + 1; m--;)
                        "M" === d[m] && d.splice(m + 1, 0, d[m + 1] - l, d[m + 2], "L"), (m && "M" === d[m] || m === e) && d.splice(m, 0, "L", d[m - 2] + l, d[m - 1]);
                k ? k.attr({ d: d }) : a.graph && (a.tracker = h.path(d).attr({ "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: q, fill: c ? q : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * l), zIndex: 2 }).add(a.group), t([a.tracker, a.markerGroup], function (a) { a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function (a) { g.onTrackerMouseOut(a); }); b.cursor && a.css({ cursor: b.cursor }); if (u)
                    a.on("touchstart", n); }));
            } };
        r.column && (r.column.prototype.drawTracker = K.drawTrackerPoint);
        r.pie && (r.pie.prototype.drawTracker = K.drawTrackerPoint);
        r.scatter && (r.scatter.prototype.drawTracker = K.drawTrackerPoint);
        n(g.prototype, { setItemEvents: function (a, b, c) {
                var d = this, f = d.chart.renderer.boxWrapper, g = "highcharts-legend-" + (a instanceof m ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () { a.setState("hover"); f.addClass(g); b.css(d.options.itemHoverStyle); }).on("mouseout", function () { b.css(e(a.visible ? d.itemStyle : d.itemHiddenStyle)); f.removeClass(g); a.setState(); }).on("click", function (b) { var c = function () { a.setVisible && a.setVisible(); }; f.removeClass(g); b = { browserEvent: b }; a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : v(a, "legendItemClick", b, c); });
            }, createCheckboxForItem: function (a) { a.checkbox = F("input", { type: "checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container); A(a.checkbox, "click", function (b) { v(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () { a.select(); }); }); } });
        h.legend.itemStyle.cursor =
            "pointer";
        n(H.prototype, { showResetZoom: function () { var a = this, b = h.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox"; this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () { a.zoomOut(); }, d, e && e.hover).attr({ align: c.position.align, title: b.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f); }, zoomOut: function () { var a = this; v(a, "selection", { resetSelection: !0 }, function () { a.zoom(); }); }, zoom: function (a) {
                var b, e = this.pointer, f = !1, g;
                !a || a.resetSelection ? (t(this.axes, function (a) { b = a.zoom(); }), e.initiated = !1) : t(a.xAxis.concat(a.yAxis), function (a) { var c = a.axis; e[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (f = !0)); });
                g = this.resetZoomButton;
                f && !g ? this.showResetZoom() : !f && d(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(c(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && t(d, function (a) { a.setState(); });
                t("xy" === b ? [1, 0] : [1], function (b) {
                    b =
                        c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], k = (b.pointRange || 0) / 2, h = b.getExtremes(), l = b.toValue(g - f, !0) + k, m = b.toValue(g + b.len - f, !0) - k, n = m < l, g = n ? m : l, l = n ? l : m, m = Math.min(h.dataMin, k ? h.min : b.toValue(b.toPixels(h.min) - b.minPixelPadding)), k = Math.max(h.dataMax, k ? h.max : b.toValue(b.toPixels(h.max) + b.minPixelPadding)), n = m - g;
                    0 < n && (l += n, g = m);
                    n = l - k;
                    0 < n && (l = k, g -= n);
                    b.series.length && g !== h.min && l !== h.max && (b.setExtremes(g, l, !1, !1, { trigger: "pan" }), e = !0);
                    c[d] =
                        f;
                });
                e && c.redraw(!1);
                q(c.container, { cursor: "move" });
            } });
        n(m.prototype, { select: function (a, d) { var e = this, f = e.series, g = f.chart; a = c(a, !e.selected); e.firePointEvent(a ? "select" : "unselect", { accumulate: d }, function () { e.selected = e.options.selected = a; f.options.data[b(e, f.data)] = e.options; e.setState(a && "select"); d || t(g.getSelectedPoints(), function (a) { a.selected && a !== e && (a.selected = a.options.selected = !1, f.options.data[b(a, f.data)] = a.options, a.setState(""), a.firePointEvent("unselect")); }); }); }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this);
            }, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); t(a.hoverPoints || [], function (a) { a.setState(); }); a.hoverPoints = a.hoverPoint = null; }, importEvents: function () { if (!this.hasImportedEvents) {
                var b = this, c = e(b.series.options.point, b.options).events;
                b.events = c;
                a.objectEach(c, function (a, c) { A(b, c, a); });
                this.hasImportedEvents = !0;
            } }, setState: function (a, b) {
                var d = Math.floor(this.plotX), e = this.plotY, f = this.series, g = f.options.states[a || "normal"] || {}, h = l[f.type].marker && f.options.marker, m = h && !1 === h.enabled, q = h && h.states && h.states[a || "normal"] || {}, k = !1 === q.enabled, p = f.stateMarkerGraphic, r = this.marker || {}, t = f.chart, u = f.halo, v, w = h && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (k || m && !1 === q.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                    w && (v = f.markerAttribs(this, a));
                    if (this.graphic)
                        this.state && this.graphic.removeClass("highcharts-point-" +
                            this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(f.pointAttribs(this, a), c(t.options.chart.animation, g.animation)), v && this.graphic.animate(v, c(t.options.chart.animation, q.animation, h.animation)), p && p.hide();
                    else {
                        if (a && q) {
                            h = r.symbol || f.symbol;
                            p && p.currentSymbol !== h && (p = p.destroy());
                            if (p)
                                p[b ? "animate" : "attr"]({ x: v.x, y: v.y });
                            else
                                h && (f.stateMarkerGraphic = p = t.renderer.symbol(h, v.x, v.y, v.width, v.height).add(f.markerGroup), p.currentSymbol = h);
                            p && p.attr(f.pointAttribs(this, a));
                        }
                        p && (p[a && t.isInsidePlot(d, e, t.inverted) ? "show" : "hide"](), p.element.point = this);
                    }
                    (d = g.halo) && d.size ? (u || (f.halo = u = t.renderer.path().add((this.graphic || p).parentGroup)), u.show()[b ? "animate" : "attr"]({ d: this.haloPath(d.size) }), u.attr({ "class": "highcharts-halo highcharts-color-" + c(this.colorIndex, f.colorIndex) }), u.point = this, u.attr(n({ fill: this.color || f.color, "fill-opacity": d.opacity, zIndex: -1 }, d.attributes))) : u && u.point && u.point.haloPath && u.animate({ d: u.point.haloPath(0) }, null, u.hide);
                    this.state = a;
                }
            },
            haloPath: function (a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a); } });
        n(f.prototype, { onMouseOver: function () { var a = this.chart, b = a.hoverSeries; if (b && b !== this)
                b.onMouseOut(); this.options.events.mouseOver && v(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this; }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d)
                    d.onMouseOut();
                this && a.events.mouseOut && v(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState();
            }, setState: function (a) {
                var b = this, d = b.options, e = b.graph, f = d.states, g = d.lineWidth, d = 0;
                a = a || "";
                if (b.state !== a && (t([b.group, b.markerGroup, b.dataLabelsGroup], function (c) { c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a)); }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)), e && !e.dashstyle))
                    for (g = { "stroke-width": g }, e.animate(g, c(f[a || "normal"] && f[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + d];)
                        b["zone-graph-" + d].attr(g), d += 1;
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) { if (c[a])
                    c[a][f](); });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)
                    c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking &&
                    t(d.series, function (a) { a.options.stacking && a.visible && (a.isDirty = !0); });
                t(c.linkedSeries, function (b) { b.setVisible(a, !1); });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                v(c, f);
            }, show: function () { this.setVisible(!0); }, hide: function () { this.setVisible(!1); }, select: function (a) { this.selected = a = void 0 === a ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); v(this, a ? "select" : "unselect"); }, drawTracker: K.drawTrackerGraph });
    })(L);
    (function (a) {
        var A = a.Chart, H = a.each, F = a.inArray, q = a.isArray, h = a.isObject, l = a.pick, t = a.splat;
        A.prototype.setResponsive = function (h) {
            var l = this.options.responsive, n = [], b = this.currentResponsive;
            l && l.rules && H(l.rules, function (b) { void 0 === b._id && (b._id = a.uniqueKey()); this.matchResponsiveRule(b, n, h); }, this);
            var d = a.merge.apply(0, a.map(n, function (b) { return a.find(l.rules, function (a) { return a._id === b; }).chartOptions; })), n = n.toString() || void 0;
            n !== (b && b.ruleIds) && (b && this.update(b.undoOptions, h), n ? (this.currentResponsive = { ruleIds: n, mergedOptions: d, undoOptions: this.currentOptions(d) }, this.update(d, h)) :
                this.currentResponsive = void 0);
        };
        A.prototype.matchResponsiveRule = function (a, h) { var n = a.condition; (n.callback || function () { return this.chartWidth <= l(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= l(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= l(n.minWidth, 0) && this.chartHeight >= l(n.minHeight, 0); }).call(this) && h.push(a._id); };
        A.prototype.currentOptions = function (l) {
            function n(b, d, g, e) {
                var c;
                a.objectEach(b, function (a, b) {
                    if (!e && -1 < F(b, ["series", "xAxis", "yAxis"]))
                        for (a = t(a), g[b] = [], c = 0; c < a.length; c++)
                            d[b][c] &&
                                (g[b][c] = {}, n(a[c], d[b][c], g[b][c], e + 1));
                    else
                        h(a) ? (g[b] = q(a) ? [] : {}, n(a, d[b] || {}, g[b], e + 1)) : g[b] = d[b] || null;
                });
            }
            var u = {};
            n(l, this.options, u, 0);
            return u;
        };
    })(L);
    return L;
});
