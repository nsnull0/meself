window.defer.push(() => {
    let lastScrollTop = 0,
        toggle = 0,
        anchor = 0,
        scroll = 0;
    const w = window,
        scrollSpy = () => {
            if (w.getViewport().w < 960) {
                const st = w.getScroll().y;

                if (w.one(".menu") && st > lastScrollTop && st > w.one(".menu").clientHeight * 2) {
                    w.addClass(w.one(".menu"), "folded");
                } else {
                    w.removeClass(w.one(".menu"), "folded");
                }
                lastScrollTop = st;
            } else {
                w.removeClass(w.one(".menu"), "folded");
            }
            w.lazyLoad();
        };

    w.NProgress.start();
    w.gumshoe.init({"selectorHeader": "[data-gumshoe]"});
    scroll = new w.SmoothScroll();
    (($ = "[data-scroll]", opts = {}) => {
        w.on(w, "click", (e) => {
            toggle = e.target.closest($);
            anchor = toggle ? w.one(toggle.hash) : false;
            if (!anchor || !toggle || toggle.tagName.toLowerCase() !== "a") {
                return;
            }
            e.preventDefault();
            scroll.animateScroll(anchor, toggle, opts);
        }, false);
    })();
    scrollSpy();
    w.on(w, "scroll resize", scrollSpy);
    w.on(w.all(".row,.flex"), "scroll", scrollSpy);
    w.lazyLoad();
    w.on(w, "hashchange", w.lazyLoad);
    w.interactiveMD();
    w.NProgress.done();
});