window.defer.push(() => {
    let lastScrollTop = 0,
        tmp = 0;
    const w = window,
        int = (i) => {
            return Number(i);
        },
        scrollSpy = () => {
            if (w.getViewport().w < int("960")) {
                const st = w.getScroll().y;

                if (w.one(".menu") && st > lastScrollTop && st > w.one(".menu").clientHeight * int("2")) {
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
    tmp = new w.SmoothScroll({"header": "[data-gumshoe]"});
    scrollSpy();
    w.on(window, "scroll resize", scrollSpy);
    w.on(w.all(".row,.flex"), "scroll", scrollSpy);
    w.lazyLoad();
    w.on(w, "hashchange", w.lazyLoad);
    w.interactiveMD();
    w.NProgress.done();
});