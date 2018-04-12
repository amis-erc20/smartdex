//
// jquery.ajaxSubmit.js - Effortlessly submit forms using AJAX and JSON
//
// Developed by Cory LaViska for A Beautiful Site, LLC
//
// Licensed under the MIT license: http://opensource.org/licenses/MIT
//
jQuery && function (a) {
    "use strict";
    function t() { var t = this, s = a(t).data("options.ajaxSubmit"); a(t).addClass("ajaxSubmit-busy").find(s.loader).prop("hidden", !1); }
    function s(t) { a(this).data("options.ajaxSubmit", t).on("submit.ajaxSubmit", c); }
    function e() { a(this).removeData("options.ajaxSubmit").off(".ajaxSubmit"); }
    function i() { a(this).addClass("ajaxSubmit-disabled").find(":input").prop("disabled", !0); }
    function n() { a(this).removeClass("ajaxSubmit-disabled").find(":input").prop("disabled", !1); }
    function l() { var t = this, s = a(t).data("options.ajaxSubmit"); a(t).find(".ajaxSubmit-invalid").each(function () { var e = this; a(e).removeClass("ajaxSubmit-invalid"), s.hideInvalid.call(t, e); }); }
    function o() { var t = this, s = a(t).data("options.ajaxSubmit"); a(t).find(s.message).text("").prop("hidden", !0); }
    function r() { f.call(this), l.call(this), o.call(this), this.reset(); }
    function d(t) { var s = this, e = a(s).data("options.ajaxSubmit"); a.each(t, function (t, i) { var n = a(s).find(':input[name="' + i + '"]').get(0); a(n).addClass("ajaxSubmit-invalid"), e.showInvalid.call(s, n); }); }
    function u(t, s) { var e = this, i = a(e).data("options.ajaxSubmit"); a(e).find(i.message).removeClass(s ? i.messageErrorClasses : i.messageSuccessClasses).addClass(s ? i.messageSuccessClasses : i.messageErrorClasses).text(t).prop("hidden", !1); }
    function c(s) { var e = this, i = a(e).data("options.ajaxSubmit"); s.preventDefault(), a(e).is(".ajaxSubmit-busy") || i.before.call(e) !== !1 && (o.call(e), l.call(e), t.call(e), a.ajax({ url: "function" == typeof i.url ? i.url.call(e) : i.url, type: "function" == typeof i.method ? i.method.call(e) : i.method, data: "function" == typeof i.data ? i.data.call(e) : i.data, headers: i.headers, dataType: "json" }).done(function (a) { f.call(e), a && a.message && u.call(e, a.message, !0), a && a.invalid && a.invalid.length && d.call(e, a.invalid), i.success.call(e, a), i.after.call(e, a); }).fail(function (a, t, s) { var n = a.responseJSON; f.call(e), n && n.message && u.call(e, n.message, !1), n && n.invalid && n.invalid.length && d.call(e, n.invalid), i.error.call(e, n, s), i.after.call(e, n); })); }
    function f() { var t = this, s = a(t).data("options.ajaxSubmit"); a(t).removeClass("ajaxSubmit-busy").find(s.loader).prop("hidden", !0); }
    a.ajaxSubmit = { defaults: { url: function () { return a(this).attr("action"); }, method: function () { return a(this).attr("method"); }, headers: void 0, data: function () { return a(this).serialize(); }, after: function () { }, before: function () { }, error: function () { }, success: function () { }, loader: ".form-loader", message: ".form-message", messageErrorClasses: "alert alert-danger", messageSuccessClasses: "alert alert-success", hideInvalid: function (t) { a(t).removeClass("is-invalid"); }, showInvalid: function (t) { a(t).addClass("is-invalid"); } } }, a.extend(a.fn, { ajaxSubmit: function (l, o) { switch ("object" == typeof l && (o = l), l) {
            case "busy": return a(this).each(o === !1 ? f : t);
            case "destroy": return a(this).each(e);
            case "disable": return a(this).each(o === !1 ? n : i);
            case "reset": return a(this).each(r);
            default: return a(this).each(function () { s.call(this, a.extend({}, a.ajaxSubmit.defaults, o)); });
        } } });
}(jQuery);
