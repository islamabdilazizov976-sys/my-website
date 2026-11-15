// Visual scroll-depth readout and test-mode flags. Sends no analytics events itself.
(function () {
    var meter = document.querySelector('.scroll-meter');
    var bar = document.querySelector('.progress');
    var value = document.querySelector('.scroll-meter output');
    if (!meter || !bar || !value) return;

    var flags = window.__gaMode || {};
    if (flags.internal || flags.debug) {
        var f = document.createElement('span');
        f.className = 'mode-flag';
        f.textContent = [flags.internal ? 'internal' : '', flags.debug ? 'debug' : ''].filter(Boolean).join(' + ');
        meter.appendChild(f);
    }

    function update() {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100;
        bar.style.width = pct + '%';
        value.textContent = pct + '%';
        meter.classList.toggle('reached', pct >= 90);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
