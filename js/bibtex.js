/* BibTeX show/hide + copy-to-clipboard for publication entries.
   No dependencies. Entries stay collapsed until the user clicks "BibTeX". */
(function () {
    'use strict';

    function panelFor(toggle) {
        return document.getElementById(toggle.getAttribute('aria-controls'));
    }

    function setOpen(toggle, panel, open) {
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.classList.toggle('is-open', open);
    }

    function flash(button, message) {
        var original = button.getAttribute('data-label') || button.textContent;
        button.setAttribute('data-label', original);
        button.textContent = message;
        window.setTimeout(function () {
            button.textContent = original;
        }, 1200);
    }

    /* execCommand fallback for browsers without the async clipboard API
       (and for pages not served over https). */
    function legacyCopy(text) {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.top = '-1000px';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        var ok = false;
        try {
            ok = document.execCommand('copy');
        } catch (err) {
            ok = false;
        }
        document.body.removeChild(area);
        return ok;
    }

    function copyText(text, button) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                function () { flash(button, 'Copied!'); },
                function () { flash(button, legacyCopy(text) ? 'Copied!' : 'Press Ctrl+C'); }
            );
        } else {
            flash(button, legacyCopy(text) ? 'Copied!' : 'Press Ctrl+C');
        }
    }

    document.addEventListener('click', function (event) {
        var target = event.target;
        if (!target || typeof target.closest !== 'function') {
            return;
        }

        var toggle = target.closest('.bib-toggle');
        if (toggle) {
            event.preventDefault();
            var panel = panelFor(toggle);
            if (panel) {
                setOpen(toggle, panel, panel.hidden);
            }
            return;
        }

        var button = target.closest('.bib-copy');
        if (button) {
            event.preventDefault();
            var block = button.closest('.bib');
            var code = block && block.querySelector('code');
            if (code) {
                copyText(code.textContent, button);
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var toggles = document.querySelectorAll('.bib-toggle');
        for (var i = 0; i < toggles.length; i++) {
            var panel = panelFor(toggles[i]);
            if (panel) {
                setOpen(toggles[i], panel, false);
            }
        }
    });
})();