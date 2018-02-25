window.defer.push(() => {
    let tmp = 0,
        isMapboxLoaded = 0,
        stackOf_HeroAni = [],
        recentlySubmitted = 0;
    const w = window,
        hero = w.one('.hero .title span'),
        cForm = w.one('#cForm'),
        SUBMIT_RECENTLY = {
            id: 'cFormModal',
            header: 'Ooops',
            body: 'It looks like you already sent us a message (this is needed to prevent spam), but worry not, as soon as you close this message, you can sent me another message.'
        },
        SUBMIT_SENDING = {
            id: 'cFormModal',
            header: 'Sending Message',
            body: 'Did you know, that your message is travelling via Internet to my slack channel in less than a second!'
        },
        SUBMIT_INVALID = {
            id: 'cFormModal',
            header: 'Invalid Response',
            body: 'Invalid response from server, in case of emergency you can call my number.'
        },
        SUBMIT_SENT = {
            id: 'cFormModal',
            header: 'Message Sent',
            body: 'Your message has been sent, please wait for the next reply.'
        },
        SUBMIT_FAILED = {
            id: 'cFormModal',
            header: 'Failed',
            body: 'Unable to sent your message, probably network connection issue.'
        },

        /* = hero typing animation = */
        mouseTrigger_HeroAni = () => {
            const ani = (hero) => {
                if (stackOf_HeroAni && stackOf_HeroAni.length) {
                    hero.innerHTML = stackOf_HeroAni.pop();
                    w.timeout_HeroAni = w.setTimeout(() => {
                        ani(hero);
                    }, 200);
                }
            };

            w.clearTimeout(w.timeout_HeroAni);
            stackOf_HeroAni = w.anisequence.reverse().slice(0, w.anisequence.length - stackOf_HeroAni.length);
            ani(hero);
        },

        /* = mapbox = */
        tryMapbox = () => {
            if (isMapboxLoaded || w.queryStringToObject().nomap) {
                return;
            }
            if (w.isElementInViewport(w.one('#map')) && window.mapboxgl) {
                w.mapboxgl.accessToken = w.TOKEN_MAPBOX;
                const lnlt = [w.GEO.center.long, w.GEO.center.lat],
                    map = new w.mapboxgl.Map({
                        container: 'map',
                        center: lnlt,
                        zoom: w.GEO.center.zoom,
                        attributionControl: false,
                        logoPosition: 'bottom-right',
                        style: 'mapbox://styles/mapbox/streets-v9'
                    });

                tmp = new w.mapboxgl.Marker().setLngLat(lnlt).addTo(map);

                w.on(w.one('.mapboxgl-marker'), 'click', () => {
                    open(w.URL_GOOGLE_MAPS, '_blank =_').focus();
                });
                isMapboxLoaded = 1;
            }
        },

        /* = contact form = */
        submitCForm = (e, $ = e.target.elements) => {
            e.preventDefault();
            if (recentlySubmitted) {
                tmp = new w.Modal(SUBMIT_RECENTLY, () => {
                    w.removeClass(cForm, 'recently-submitted');
                    recentlySubmitted = !1;
                });
            } else {
                tmp = new w.Modal(SUBMIT_SENDING);
                fetch(w.URL_SLACK_WEBHOOK, {
                    method: 'POST',
                    body: JSON.stringify({
                        attachments: [{
                            fallback: `New message from — ${$.name.value}\nJOB — ${$.job.value}\nEMAIL — ${$.email.value}\nMessage — ${$.msg.value}`,
                            color: '#36a64f',
                            pretext: 'New message',
                            author_name: $.name.value,
                            author_link: `mailto:${$.email.value}`,
                            author_icon: `https://www.gravatar.com/avatar/${w.md5($.email.value.trim().toLowerCase())}`,
                            title: `JOB — ${$.job.value}`,
                            title_link: `mailto:${$.email.value}`,
                            fields: [{
                                title: 'Message',
                                value: $.msg.value,
                                short: false
                            }],
                            text: '',
                            image_url: '',
                            thumb_url: '',
                            footer_icon: 'https://slack.com/favicon.ico',
                            footer: location.href,
                            ts: 1e-3 * Date.now()
                        }]
                    }),
                }).then((response) => {
                    if (response.ok) {
                        w.addClass(cForm, 'recently-submitted');
                        cForm.reset();
                        recentlySubmitted = !0;
                        tmp = new w.Modal(SUBMIT_SENT);
                    } else {
                        tmp = new w.Modal(SUBMIT_INVALID);
                    }

                    return response.text();
                }, (error) => {
                    console.warn(error.message);
                    tmp = new w.Modal(SUBMIT_FAILED);
                });
            }

            return false;
        },

        /* = app icon clicked = */
        appIconClicked = (e, $ = e.target) => {
            e.preventDefault();
            while (!$.href) {
                $ = $.parentNode;
            }
            const dest = `#${$.href.split('#')[1]}`,
                selected = $.parentNode,
                delay = w.one('.sliding .modal-wrapper.open') ? 800 : 0;

            if (w.hasClass($, 'close') || w.hasClass(w.one(dest), 'open')) {

                /* = ONCLOSE = */
                w.removeClass(w.all('.sliding .modal-wrapper'), 'open');
                setTimeout(() => {
                    w.removeClass(w.all('.sliding .app-list'), 'active');
                    w.removeClass(w.all('.sliding .app-list'), 'blur');
                }, delay);
            } else if (!w.hasClass(w.one(dest), 'open')) {

                /* = ONOPEN = */
                w.removeClass(w.all('.sliding .modal-wrapper'), 'open');
                w.removeClass(w.all('.sliding .app-list'), 'active');
                w.addClass(w.all('.sliding .app-list'), 'blur');
                setTimeout(() => {
                    w.addClass(w.one(dest), 'open');
                }, delay);
                w.addClass(selected, 'active');
                w.removeClass(selected, 'blur');

                /* = skip lazyload & remove unload on this particular img = */
                tmp = w.one(`${dest} .gallery .ratio img`);
                w.removeClass(tmp, 'unload');
                if (tmp && tmp.dataset.src) {
                    tmp.src = tmp.dataset.src;
                    w.Reflect.deleteProperty(tmp.dataset, 'src');
                    w.removeClass(tmp, 'lazyload');
                }
            }
            w.lazyLoad();

            return false;
        },

        /* = gallery nav clicked = */
        galleryNavClicked = (e, $ = e.target) => {
            e.preventDefault();
            try {
                let idx = w.hasClass($, 'prev') ? -1 : 1,
                    newImg = $,
                    img = $;
                const gallery = $.parentNode,
                    list = JSON.parse(gallery.dataset.img),
                    last = list.length - 1,
                    activeIdx = Number(gallery.dataset.idx) || 0;

                idx += activeIdx;
                idx = idx < 0 ? last : idx;
                idx = idx > last ? 0 : idx;
                img = w.one(`img[src="${list[activeIdx]}"]`, gallery);
                newImg = w.one(`img[src="${list[idx]}"]`, gallery);
                if (newImg) {
                    w.removeClass(newImg, 'unload');
                    w.addClass(img, 'unload');
                } else {
                    newImg = w.stringToDOM('<img alt="Gallery image" class="ease unload">');
                    newImg.src = list[idx];
                    img.parentNode.appendChild(newImg);
                    w.addClass(img, 'waitload');
                    w.on(newImg, 'load', () => {
                        w.removeClass(img, 'waitload');
                        w.removeClass(newImg, 'unload');
                        w.addClass(img, 'unload');
                    });
                }
                gallery.dataset.idx = idx;
            } catch (err) {
                console.error(err);
            }

            return false;
        };

    w.on(hero, 'mouseover mouseout', mouseTrigger_HeroAni);

    /* = parallax = */
    w.on(window, 'scroll resize', () => {
        hero.style.top = `${Math.floor(w.getScroll().y / 2)}px`;
    });

    w.on(w.all('.sliding .modal-wrapper .close, .sliding a.app-icon'), 'click', appIconClicked, false);

    w.on(w.all('.gallery .prev, .gallery .next'), 'click', galleryNavClicked, false);

    w.on(w.one('.gallery .unload'), 'load', (e, $ = e.target) => {
        w.removeClass($, 'unload');
    });

    tryMapbox();

    w.on(window, 'scroll resize', tryMapbox);

    w.on(cForm, 'submit', submitCForm, false);
});
window.tmp = window.runDefer ? window.runDefer() : () => { };
window.Reflect.deleteProperty(window, 'tmp');