// Lenis 1.3.26, extracted unchanged from the reference runtime.
// Original scroll configuration is in site.js.
var t = "1.3.26";
        function i(e, t, i) { return Math.max(e, Math.min(t, i)); }
        var r = class {
            isRunning = !1;
            value = 0;
            from = 0;
            to = 0;
            currentTime = 0;
            lerp;
            duration;
            easing;
            onUpdate;
            advance(e) { if (!this.isRunning)
                return; let t = !1; if (this.duration && this.easing) {
                this.currentTime += e;
                let r = i(0, this.currentTime / this.duration, 1), o = (t = r >= 1) ? 1 : this.easing(r);
                this.value = this.from + (this.to - this.from) * o;
            }
            else if (this.lerp) {
                var r, o, s, n;
                this.value = (r = this.value, o = this.to, s = 60 * this.lerp, (1 - (n = 1 - Math.exp(-s * e))) * r + n * o), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0);
            }
            else
                this.value = this.to, t = !0; t && this.stop(), this.onUpdate?.(this.value, t); }
            stop() { this.isRunning = !1; }
            fromTo(e, t, { lerp: i, duration: r, easing: o, onStart: s, onUpdate: n }) { this.from = this.value = e, this.to = t, this.lerp = i, this.duration = r, this.easing = o, this.currentTime = 0, this.isRunning = !0, s?.(), this.onUpdate = n; }
        }, o = class {
            width = 0;
            height = 0;
            scrollHeight = 0;
            scrollWidth = 0;
            debouncedResize;
            wrapperResizeObserver;
            contentResizeObserver;
            constructor(e, t, { autoResize: i = !0, debounce: r = 250 } = {}) { this.wrapper = e, this.content = t, i && (this.debouncedResize = function (e, t) { let i; return function (...r) { clearTimeout(i), i = setTimeout(() => { i = void 0, e.apply(this, r); }, t); }; }(this.resize, r), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize(); }
            destroy() { this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize); }
            resize = () => { this.onWrapperResize(), this.onContentResize(); };
            onWrapperResize = () => { this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight); };
            onContentResize = () => { this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth); };
            get limit() { return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height }; }
        }, s = class {
            events = {};
            emit(e, ...t) { let i = this.events[e] || []; for (let e = 0, r = i.length; e < r; e++)
                i[e]?.(...t); }
            on(e, t) { return this.events[e] ? this.events[e].push(t) : this.events[e] = [t], () => { this.events[e] = this.events[e]?.filter(e => t !== e); }; }
            off(e, t) { this.events[e] = this.events[e]?.filter(e => t !== e); }
            destroy() { this.events = {}; }
        };
        let n = 100 / 6, l = { passive: !1 };
        function a(e, t) { return 1 === e ? n : 2 === e ? t : 1; }
        var c = class {
            touchStart = { x: 0, y: 0 };
            lastDelta = { x: 0, y: 0 };
            window = { width: 0, height: 0 };
            emitter = new s;
            constructor(e, t = { wheelMultiplier: 1, touchMultiplier: 1 }) { this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, l), this.element.addEventListener("touchstart", this.onTouchStart, l), this.element.addEventListener("touchmove", this.onTouchMove, l), this.element.addEventListener("touchend", this.onTouchEnd, l); }
            on(e, t) { return this.emitter.on(e, t); }
            destroy() { this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, l), this.element.removeEventListener("touchstart", this.onTouchStart, l), this.element.removeEventListener("touchmove", this.onTouchMove, l), this.element.removeEventListener("touchend", this.onTouchEnd, l); }
            onTouchStart = e => { let { clientX: t, clientY: i } = e.targetTouches ? e.targetTouches[0] : e; this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: e }); };
            onTouchMove = e => { let { clientX: t, clientY: i } = e.targetTouches ? e.targetTouches[0] : e, r = -(t - this.touchStart.x) * this.options.touchMultiplier, o = -(i - this.touchStart.y) * this.options.touchMultiplier; this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = { x: r, y: o }, this.emitter.emit("scroll", { deltaX: r, deltaY: o, event: e }); };
            onTouchEnd = e => { this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: e }); };
            onWheel = e => { let { deltaX: t, deltaY: i, deltaMode: r } = e, o = a(r, this.window.width), s = a(r, this.window.height); t *= o, i *= s, t *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", { deltaX: t, deltaY: i, event: e }); };
            onWindowResize = () => { this.window = { width: window.innerWidth, height: window.innerHeight }; };
        };
        let h = e => Math.min(1, 1.001 - 2 ** (-10 * e));
        var d = class {
            _isScrolling = !1;
            _isStopped = !1;
            _isLocked = !1;
            _preventNextNativeScrollEvent = !1;
            _resetVelocityTimeout = null;
            _rafId = null;
            _isDraggingSelection = !1;
            reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            isTouching;
            isIos;
            time = 0;
            userData = {};
            lastVelocity = 0;
            velocity = 0;
            direction = 0;
            options;
            targetScroll;
            animatedScroll;
            animate = new r;
            emitter = new s;
            dimensions;
            virtualScroll;
            constructor({ wrapper: e = window, content: i = document.documentElement, eventsTarget: r = e, smoothWheel: s = !0, syncTouch: n = !1, syncTouchLerp: l = .075, touchInertiaExponent: a = 1.7, duration: d, easing: u, lerp: p = .1, infinite: m = !1, orientation: f = "vertical", gestureOrientation: g = "horizontal" === f ? "both" : "vertical", touchMultiplier: v = 1, wheelMultiplier: x = 1, autoResize: y = !0, prevent: w, virtualScroll: b, overscroll: S = !0, autoRaf: j = !1, anchors: N = !1, autoToggle: E = !1, allowNestedScroll: _ = !1, __experimental__naiveDimensions: C = !1, naiveDimensions: R = C, stopInertiaOnNavigate: O = !1, respectReducedMotion: T = !0 } = {}) { window.lenisVersion = t, window.lenis || (window.lenis = {}), window.lenis.version = t, "horizontal" === f && (window.lenis.horizontal = !0), !0 === n && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), e && e !== document.documentElement || (e = window), "number" == typeof d && "function" != typeof u ? u = h : "function" == typeof u && "number" != typeof d && (d = 1), this.options = { wrapper: e, content: i, eventsTarget: r, smoothWheel: s, syncTouch: n, syncTouchLerp: l, touchInertiaExponent: a, duration: d, easing: u, lerp: p, infinite: m, gestureOrientation: g, orientation: f, touchMultiplier: v, wheelMultiplier: x, autoResize: y, prevent: w, virtualScroll: b, overscroll: S, autoRaf: j, anchors: N, autoToggle: E, allowNestedScroll: _, naiveDimensions: R, stopInertiaOnNavigate: O, respectReducedMotion: T }, this.dimensions = new o(e, i, { autoResize: y }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new c(r, { touchMultiplier: v, wheelMultiplier: x }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf)); }
            destroy() { this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId); }
            on(e, t) { return this.emitter.on(e, t); }
            off(e, t) { return this.emitter.off(e, t); }
            onScrollEnd = e => { e instanceof CustomEvent || "smooth" !== this.isScrolling && !1 !== this.isScrolling || e.stopPropagation(); };
            dispatchScrollendEvent = () => { this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", { bubbles: this.options.wrapper === window, detail: { lenisScrollEnd: !0 } })); };
            get overflow() { let e = this.isHorizontal ? "overflow-x" : "overflow-y"; return getComputedStyle(this.rootElement)[e]; }
            checkOverflow() { ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart(); }
            onTransitionEnd = e => { e.propertyName?.includes("overflow") && e.target === this.rootElement && this.checkOverflow(); };
            setScroll(e) { this.isHorizontal ? this.options.wrapper.scrollTo({ left: e, behavior: "instant" }) : this.options.wrapper.scrollTo({ top: e, behavior: "instant" }); }
            onClick = e => { let t = e.composedPath().filter(e => e instanceof HTMLAnchorElement && e.href).map(e => new URL(e.href)), i = new URL(window.location.href); if (this.options.anchors) {
                let e = t.find(e => i.host === e.host && i.pathname === e.pathname && e.hash);
                if (e) {
                    let t = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0, i = decodeURIComponent(e.hash);
                    this.scrollTo(i, t);
                    return;
                }
            } if (this.options.stopInertiaOnNavigate && t.some(e => i.host === e.host && i.pathname !== e.pathname))
                return void this.reset(); };
            onPointerDown = e => { 1 === e.button && this.reset(); };
            isTouchOnSelectionHandle(e) { let t = window.getSelection(); if (!t || t.isCollapsed || 0 === t.rangeCount)
                return !1; let i = e.targetTouches[0] ?? e.changedTouches[0]; if (!i)
                return !1; let r = t.getRangeAt(0).getClientRects(); if (0 === r.length)
                return !1; let o = r[0], s = r[r.length - 1], n = 40 >= Math.hypot(i.clientX - o.left, i.clientY - o.top), l = 40 >= Math.hypot(i.clientX - s.right, i.clientY - s.bottom); return n || l; }
            onVirtualScroll = e => { if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(e))
                return; let { deltaX: t, deltaY: i, event: r } = e; if (this.emitter.emit("virtual-scroll", { deltaX: t, deltaY: i, event: r }), r.ctrlKey || r.lenisStopPropagation)
                return; let o = r.type.includes("touch"), s = r.type.includes("wheel"); if (o && this.isIos && ("touchstart" === r.type && (this._isDraggingSelection = this.isTouchOnSelectionHandle(r)), this._isDraggingSelection)) {
                "touchend" === r.type && (this._isDraggingSelection = !1);
                return;
            } this.isTouching = "touchstart" === r.type || "touchmove" === r.type; let n = 0 === t && 0 === i; if (this.options.syncTouch && o && "touchstart" === r.type && n && !this.isStopped && !this.isLocked)
                return void this.reset(); let l = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === t; if (n || l)
                return; let a = r.composedPath(); a = a.slice(0, a.indexOf(this.rootElement)); let c = this.options.prevent, h = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical"; if (a.find(e => e instanceof HTMLElement && ("function" == typeof c && c?.(e) || e.hasAttribute?.("data-lenis-prevent") || "vertical" === h && e.hasAttribute?.("data-lenis-prevent-vertical") || "horizontal" === h && e.hasAttribute?.("data-lenis-prevent-horizontal") || o && e.hasAttribute?.("data-lenis-prevent-touch") || s && e.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(e, { deltaX: t, deltaY: i }))))
                return; if (this.isStopped || this.isLocked) {
                r.cancelable && r.preventDefault();
                return;
            } if (!(this.options.syncTouch && o || this.options.smoothWheel && s)) {
                this.isScrolling = "native", this.animate.stop(), r.lenisStopPropagation = !0;
                return;
            } let d = i; "both" === this.options.gestureOrientation ? d = Math.abs(i) > Math.abs(t) ? i : t : "horizontal" === this.options.gestureOrientation && (d = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (r.lenisStopPropagation = !0), r.cancelable && r.preventDefault(); let u = o && this.options.syncTouch, p = o && "touchend" === r.type; p && (d = Math.sign(d) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d, { programmatic: !1, ...u ? { lerp: p ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing } }); };
            resize() { this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit(); }
            emit() { this.emitter.emit("scroll", this); }
            onNativeScroll = () => { if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
                this._preventNextNativeScrollEvent = !1;
                return;
            } if (!1 === this.isScrolling || "native" === this.isScrolling) {
                let e = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => { this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit(); }, 400));
            } };
            reset() { this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop(); }
            start() { if (this.isStopped) {
                if (this.options.autoToggle)
                    return void this.rootElement.style.removeProperty("overflow");
                this.internalStart();
            } }
            internalStart() { this.isStopped && (this.reset(), this.isStopped = !1, this.emit()); }
            stop() { if (!this.isStopped) {
                if (this.options.autoToggle)
                    return void this.rootElement.style.setProperty("overflow", "clip");
                this.internalStop();
            } }
            internalStop() { this.isStopped || (this.reset(), this.isStopped = !0, this.emit()); }
            raf = e => { let t = e - (this.time || e); this.time = e, this.animate.advance(.001 * t), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf)); };
            scrollTo(e, { offset: t = 0, immediate: r = !1, lock: o = !1, programmatic: s = !0, lerp: n = s ? this.options.lerp : void 0, duration: l = s ? this.options.duration : void 0, easing: a = s ? this.options.easing : void 0, onStart: c, onComplete: d, force: u = !1, userData: p } = {}) { if (this.prefersReducedMotion && (s ? r = !0 : (n = 1, l = void 0, a = void 0)), (this.isStopped || this.isLocked) && !u)
                return; let m = e, f = t; if ("string" == typeof m && ["top", "left", "start", "#"].includes(m))
                m = 0;
            else if ("string" == typeof m && ["bottom", "right", "end"].includes(m))
                m = this.limit;
            else {
                let e = null;
                if ("string" == typeof m ? (e = m.startsWith("#") ? document.getElementById(m.slice(1)) : document.querySelector(m)) || ("#top" === m ? m = 0 : console.warn("Lenis: Target not found", m)) : m instanceof HTMLElement && m?.nodeType && (e = m), e) {
                    if (this.options.wrapper !== window) {
                        let e = this.rootElement.getBoundingClientRect();
                        f -= this.isHorizontal ? e.left : e.top;
                    }
                    let t = e.getBoundingClientRect(), i = getComputedStyle(e), r = this.isHorizontal ? Number.parseFloat(i.scrollMarginLeft) : Number.parseFloat(i.scrollMarginTop), o = getComputedStyle(this.rootElement), s = this.isHorizontal ? Number.parseFloat(o.scrollPaddingLeft) : Number.parseFloat(o.scrollPaddingTop);
                    m = (this.isHorizontal ? t.left : t.top) + this.animatedScroll - (Number.isNaN(r) ? 0 : r) - (Number.isNaN(s) ? 0 : s);
                }
            } if ("number" == typeof m) {
                if (m += f, this.options.infinite) {
                    if (s) {
                        this.targetScroll = this.animatedScroll = this.scroll;
                        let e = m - this.animatedScroll;
                        e > this.limit / 2 ? m -= this.limit : e < -this.limit / 2 && (m += this.limit);
                    }
                }
                else
                    m = i(0, m, this.limit);
                if (m === this.targetScroll) {
                    c?.(this), d?.(this);
                    return;
                }
                if (this.userData = p ?? {}, r) {
                    this.animatedScroll = this.targetScroll = m, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => { this.dispatchScrollendEvent(); });
                    return;
                }
                s || (this.targetScroll = m), "number" == typeof l && "function" != typeof a ? a = h : "function" == typeof a && "number" != typeof l && (l = 1), this.animate.fromTo(this.animatedScroll, m, { duration: l, easing: a, lerp: n, onStart: () => { o && (this.isLocked = !0), this.isScrolling = "smooth", c?.(this); }, onUpdate: (e, t) => { this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = e - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = e, this.setScroll(this.scroll), s && (this.targetScroll = e), t || this.emit(), t && (this.reset(), this.emit(), d?.(this), this.userData = {}, requestAnimationFrame(() => { this.dispatchScrollendEvent(); }), this.preventNextNativeScrollEvent()); } });
            } }
            preventNextNativeScrollEvent() { this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => { this._preventNextNativeScrollEvent = !1; }); }
            hasNestedScroll(e, { deltaX: t, deltaY: i }) { let r, o, s, n, l, a, c, h, d, u, p, m, f, g, v, x, y = Date.now(); e._lenis || (e._lenis = {}); let w = e._lenis; if (y - (w.time ?? 0) > 2e3) {
                w.time = Date.now();
                let t = window.getComputedStyle(e);
                if (w.computedStyle = t, r = ["auto", "overlay", "scroll"].includes(t.overflowX), o = ["auto", "overlay", "scroll"].includes(t.overflowY), l = ["auto"].includes(t.overscrollBehaviorX), a = ["auto"].includes(t.overscrollBehaviorY), w.hasOverflowX = r, w.hasOverflowY = o, !(r || o))
                    return !1;
                c = e.scrollWidth, h = e.scrollHeight, d = e.clientWidth, u = e.clientHeight, s = c > d, n = h > u, w.isScrollableX = s, w.isScrollableY = n, w.scrollWidth = c, w.scrollHeight = h, w.clientWidth = d, w.clientHeight = u, w.hasOverscrollBehaviorX = l, w.hasOverscrollBehaviorY = a;
            }
            else
                s = w.isScrollableX, n = w.isScrollableY, r = w.hasOverflowX, o = w.hasOverflowY, c = w.scrollWidth, h = w.scrollHeight, d = w.clientWidth, u = w.clientHeight, l = w.hasOverscrollBehaviorX, a = w.hasOverscrollBehaviorY; if (!(r && s || o && n))
                return !1; let b = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical"; if ("horizontal" === b)
                p = Math.round(e.scrollLeft), m = c - d, f = t, g = r, v = s, x = l;
            else {
                if ("vertical" !== b)
                    return !1;
                p = Math.round(e.scrollTop), m = h - u, f = i, g = o, v = n, x = a;
            } return !x && (p >= m || p <= 0) || (f > 0 ? p < m : p > 0) && g && v; }
            get rootElement() { return this.options.wrapper === window ? document.documentElement : this.options.wrapper; }
            get limit() { return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]; }
            get isHorizontal() { return "horizontal" === this.options.orientation; }
            get actualScroll() { let e = this.options.wrapper; return this.isHorizontal ? e.scrollX ?? e.scrollLeft : e.scrollY ?? e.scrollTop; }
            get scroll() { var e; return this.options.infinite ? (this.animatedScroll % (e = this.limit) + e) % e : this.animatedScroll; }
            get progress() { return 0 === this.limit ? 1 : this.scroll / this.limit; }
            get isScrolling() { return this._isScrolling; }
            set isScrolling(e) { this._isScrolling !== e && (this._isScrolling = e, this.updateClassName()); }
            get isStopped() { return this._isStopped; }
            set isStopped(e) { this._isStopped !== e && (this._isStopped = e, this.updateClassName()); }
            get isLocked() { return this._isLocked; }
            set isLocked(e) { this._isLocked !== e && (this._isLocked = e, this.updateClassName()); }
            get isSmooth() { return "smooth" === this.isScrolling; }
            get prefersReducedMotion() { return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches; }
            get className() { let e = "lenis"; return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), "smooth" === this.isScrolling && (e += " lenis-smooth"), e; }
            updateClassName() { this.cleanUpClassName(), this.className.split(" ").forEach(e => { this.rootElement.classList.add(e); }); }
            cleanUpClassName() { for (let e of Array.from(this.rootElement.classList))
                ("lenis" === e || e.startsWith("lenis-")) && this.rootElement.classList.remove(e); }
        };
export default d;
