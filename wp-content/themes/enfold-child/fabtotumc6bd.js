jQuery( document ).ready(function() {
	neutralizeLegacyAjax();
	repairStoreLinks();
	initArchiveBanner();
	fabSearch.init();
	repairFabtotumLinks();
});

function neutralizeLegacyAjax() {
	if (window.avia_framework_globals) {
		window.avia_framework_globals.ajaxurl = '';
	}
	if (window.pum_vars) {
		window.pum_vars.ajaxurl = '';
		window.pum_vars.restapi = '';
	}
	if (window.yikes_mailchimp_ajax) {
		window.yikes_mailchimp_ajax.ajax_url = '';
		window.yikes_mailchimp_ajax.preloader_url = '';
	}
	if (window.form_submission_helpers) {
		window.form_submission_helpers.ajax_url = '';
		window.form_submission_helpers.preloader_url = '';
	}
	if (window.icl_vars) {
		window.icl_vars.ajax_url = '';
	}
	if (window.ajaxurl) {
		window.ajaxurl = '';
	}
	if (window.jQuery) {
		if (window.jQuery.AviaAjaxSearch) {
			window.jQuery.AviaAjaxSearch.prototype.try_search = function() {};
			window.jQuery.AviaAjaxSearch.prototype.do_search = function() {};
		}
		window.jQuery('form#searchform, .widget_search form, #header .avia-search-tooltip form').addClass('av_disable_ajax_search');
		window.jQuery(document).off('keyup', '#s');
		window.jQuery('form').each(function() {
			var f = window.jQuery(this);
			var act = f.attr('action');
			if (act && act.indexOf('fabtotum.com') !== -1) {
				f.attr('action', '#');
			}
		});
	}
}

function repairFabtotumLinks() {
	var rootPath = (typeof fabSearch !== 'undefined' && fabSearch.rootPath) ? fabSearch.rootPath : '';
	jQuery('a[href*="fabtotum.com"]').not('a[href*="store.fabtotum.com"], a[href*="my.fabtotum.com"], a[href*="fabtotum.cc"]').each(function() {
		var link = jQuery(this);
		var href = link.attr('href');
		if (!href) return;
		var path = href.replace(/^https?:\/\/(?:www\.)?fabtotum\.com\/?/i, '');
		if (!path || path === '') {
			link.attr('href', rootPath + 'index.html');
		} else if (path === 'it/' || path === 'it') {
			link.attr('href', rootPath + 'it.html');
		} else if (path.indexOf('wp-content/') === 0 || path.indexOf('wp-includes/') === 0) {
			link.attr('href', rootPath + path);
		} else {
			var clean = path.split('?')[0].split('#')[0];
			if (clean.slice(-1) === '/') {
				clean += 'index.html';
			} else if (clean.indexOf('.html') === -1 && clean.indexOf('.') === -1) {
				clean += '/index.html';
			}
			link.attr('href', rootPath + clean);
		}
	});
}

function repairStoreLinks()
{
	var cookie_language = getCookie('store');
	var browser_lang = navigator.language || navigator.userLanguage; 
	var regex = /https:\/\/store.fabtotum.com\/(\w+)\//gi;
	
    jQuery.each( jQuery( document ).find('a'), function(i, item) {
		var link = jQuery(this);
		var href = link.attr('href');
		m = regex.exec(href);

		if( m !== null){
			if(cookie_language != ''){
				var key_to_replace = '';
				switch(cookie_language){
					case 'it': key_to_replace = 'it'; break;
					case 'eu': key_to_replace = 'eu'; break;
					case 'intl': key_to_replace = 'intl'; break;
					default: key_to_replace = 'eu';
				}
				link.attr('href', href.replace(m[1], key_to_replace));
			} else {
				var key_to_replace = '';
				var do_replace = false;
				switch(browser_lang){
					case 'it':
						key_to_replace = 'it';
						do_replace = true;
						break;
				}
				if(do_replace) link.attr('href', href.replace(m[1], key_to_replace));
			}
		}
		regex.lastIndex = 0;
	});	
}

function getCookie(cookiename) 
{
	var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
	return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function initArchiveBanner() {
	try {
		if (window.sessionStorage && window.sessionStorage.getItem('fab_archive_dismissed')) {
			return;
		}
		var isItalian = document.documentElement.lang && document.documentElement.lang.indexOf('it') === 0;
		var banner = document.createElement('div');
		banner.className = 'fab-archive-banner';
		if (isItalian) {
			banner.innerHTML = '<span>&#128230; <strong>Archivio Storico FABtotum</strong> &mdash; Preservato a fini di consultazione e documentazione. Per firmware, guide e software attivi della community, visita il <a href="https://github.com/opentotum" target="_blank" rel="noopener noreferrer">Progetto OpenTotum</a>.</span><button class="fab-archive-close" title="Chiudi" aria-label="Chiudi">&times;</button>';
		} else {
			banner.innerHTML = '<span>&#128230; <strong>FABtotum Historical Archive</strong> &mdash; Preserved for reference and community documentation. For active firmware, guides, and software, visit the <a href="https://github.com/opentotum" target="_blank" rel="noopener noreferrer">OpenTotum Project</a>.</span><button class="fab-archive-close" title="Dismiss" aria-label="Dismiss">&times;</button>';
		}
		var closeBtn = banner.querySelector('.fab-archive-close');
		if (closeBtn) {
			closeBtn.onclick = function() {
				banner.remove();
				try {
					if (window.sessionStorage) {
						window.sessionStorage.setItem('fab_archive_dismissed', '1');
					}
				} catch(e) {}
			};
		}
		document.body.appendChild(banner);
	} catch(e) {}
}

/* ==========================================================================
   Static Client-Side Search Engine for FABtotum Historical Archive
   ========================================================================== */
var fabSearch = {
	index: null,
	isOpen: false,
	selectedIndex: 0,
	currentResults: [],
	rootPath: '',

	init: function() {
		var self = this;
		var scriptTag = document.querySelector('script[src*="fabtotumc6bd.js"]');
		if (scriptTag) {
			var src = scriptTag.getAttribute('src');
			var idx = src.indexOf('wp-content/');
			if (idx !== -1) {
				self.rootPath = src.substring(0, idx);
			}
		}

		self.buildModal();

		// Intercept clicks on header search button, footer search form and inputs
		jQuery(document).on('click', '#menu-item-search a, a[href="#search"], #searchsubmit, input#s', function(e) {
			e.preventDefault();
			e.stopPropagation();
			self.open();
		});

		// Keyboard triggers: Ctrl+K / Cmd+K / "/"
		jQuery(document).on('keydown', function(e) {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				self.isOpen ? self.close() : self.open();
			} else if (e.key === '/' && !self.isOpen && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
				e.preventDefault();
				self.open();
			} else if (e.key === 'Escape' && self.isOpen) {
				e.preventDefault();
				self.close();
			}
		});

		// Preload index in background
		self.loadIndex();
	},


	buildModal: function() {
		var self = this;
		var html = [
			'<div class="fab-search-modal-backdrop" id="fabSearchBackdrop">',
			'  <div class="fab-search-dialog" role="dialog" aria-modal="true" aria-label="Search Archive">',
			'    <div class="fab-search-header">',
			'      <span class="fab-search-icon">&#128269;</span>',
			'      <input type="text" class="fab-search-input" id="fabSearchInput" placeholder="Search archive (e.g. nozzles, laser, milling, firmware)..." autocomplete="off" spellcheck="false" />',
			'      <button class="fab-search-esc" id="fabSearchClose">ESC</button>',
			'    </div>',
			'    <div class="fab-search-results" id="fabSearchResults"></div>',
			'    <div class="fab-search-footer">',
			'      <div class="fab-search-footer-keys">',
			'        <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate</span>',
			'        <span><kbd>Enter</kbd> Open</span>',
			'        <span><kbd>Esc</kbd> Close</span>',
			'      </div>',
			'      <span>FABtotum Archive Search</span>',
			'    </div>',
			'  </div>',
			'</div>'
		].join('\n');

		jQuery('body').append(html);

		var backdrop = jQuery('#fabSearchBackdrop');
		var input = jQuery('#fabSearchInput');

		backdrop.on('click', function(e) {
			if (e.target === this) self.close();
		});

		jQuery('#fabSearchClose').on('click', function(e) {
			e.preventDefault();
			self.close();
		});

		input.on('input', function() {
			self.query(this.value.trim());
		});

		input.on('keydown', function(e) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				self.moveSelection(1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				self.moveSelection(-1);
			} else if (e.key === 'Enter') {
				e.preventDefault();
				if (self.currentResults[self.selectedIndex]) {
					window.location.href = self.rootPath + self.currentResults[self.selectedIndex].u;
				}
			}
		});
	},

	loadingCallbacks: [],
	isLoading: false,

	loadIndex: function(callback) {
		var self = this;
		if (self.index) {
			if (callback) callback();
			return;
		}
		if (window.FAB_SEARCH_INDEX) {
			self.index = window.FAB_SEARCH_INDEX;
			if (callback) callback();
			return;
		}

		if (callback) {
			self.loadingCallbacks.push(callback);
		}

		if (self.isLoading) {
			return;
		}
		self.isLoading = true;

		var fireCallbacks = function() {
			self.isLoading = false;
			while (self.loadingCallbacks.length > 0) {
				var cb = self.loadingCallbacks.shift();
				try { cb(); } catch(e) {}
			}
		};

		// 1. Try dynamic script tag loading (works on file:/// protocol without CORS restriction)
		var jsPath = self.rootPath + 'search-index.js';
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = jsPath;
		script.onload = function() {
			if (window.FAB_SEARCH_INDEX) {
				self.index = window.FAB_SEARCH_INDEX;
				fireCallbacks();
			} else {
				self.loadIndexFallback(fireCallbacks);
			}
		};
		script.onerror = function() {
			self.loadIndexFallback(fireCallbacks);
		};
		document.head.appendChild(script);
	},

	loadIndexFallback: function(callback) {
		var self = this;
		var indexPath = self.rootPath + 'search-index.json';
		jQuery.ajax({
			url: indexPath,
			dataType: 'json',
			cache: true,
			success: function(data) {
				self.index = data;
				if (callback) callback();
			},
			error: function() {
				self.isLoading = false;
				jQuery('#fabSearchResults').html('<div class="fab-search-empty">Could not load search index.<br><small>If browsing locally via file://, please ensure search-index.js is present.</small></div>');
			}
		});
	},

	open: function() {
		var self = this;
		self.isOpen = true;
		jQuery('#fabSearchBackdrop').addClass('is-open');
		var input = jQuery('#fabSearchInput');
		setTimeout(function() { input.focus(); }, 50);

		if (!self.index) {
			jQuery('#fabSearchResults').html('<div class="fab-search-empty">Loading search index...</div>');
		}

		self.loadIndex(function() {
			var currentVal = input.val().trim();
			if (!currentVal) {
				self.showInitial();
			} else {
				self.query(currentVal);
			}
		});
	},

	close: function() {
		this.isOpen = false;
		jQuery('#fabSearchBackdrop').removeClass('is-open');
	},

	showInitial: function() {
		var self = this;
		var isItalian = document.documentElement.lang && document.documentElement.lang.indexOf('it') === 0;
		var topPicks = self.index ? self.index.filter(function(item) {
			return isItalian ? item.l === 'it' : item.l === 'en';
		}).slice(0, 6) : [];

		self.renderResults(topPicks, '');
	},

	query: function(q) {
		var self = this;
		if (!self.index) {
			jQuery('#fabSearchResults').html('<div class="fab-search-empty">Loading search index...</div>');
			self.loadIndex(function() {
				self.query(q);
			});
			return;
		}
		if (!q) {
			self.showInitial();
			return;
		}

		var isItalian = document.documentElement.lang && document.documentElement.lang.indexOf('it') === 0;
		var terms = q.toLowerCase().split(/\s+/).filter(Boolean);

		var scored = [];
		for (var i = 0; i < self.index.length; i++) {
			var item = self.index[i];
			var score = 0;
			var tLow = item.t.toLowerCase();
			var cLow = item.c.toLowerCase();
			var kLow = item.k;

			var allMatch = true;
			for (var j = 0; j < terms.length; j++) {
				var term = terms[j];
				var termMatch = false;
				if (tLow.indexOf(term) !== -1) {
					score += 60;
					termMatch = true;
				}
				if (cLow.indexOf(term) !== -1) {
					score += 25;
					termMatch = true;
				}
				if (kLow.indexOf(term) !== -1) {
					score += 15;
					termMatch = true;
				}
				if (!termMatch) {
					allMatch = false;
					break;
				}
			}

			if (allMatch) {
				if (tLow === q.toLowerCase()) score += 100;
				else if (tLow.indexOf(q.toLowerCase()) !== -1) score += 40;

				if (isItalian && item.l === 'it') score += 20;
				if (!isItalian && item.l === 'en') score += 20;

				scored.push({ item: item, score: score });
			}
		}

		scored.sort(function(a, b) { return b.score - a.score; });
		var results = scored.slice(0, 10).map(function(s) { return s.item; });
		self.renderResults(results, q);
	},

	renderResults: function(results, q) {
		var self = this;
		self.currentResults = results;
		self.selectedIndex = 0;
		var container = jQuery('#fabSearchResults');

		if (!results.length) {
			container.html('<div class="fab-search-empty">No results found for "<strong>' + self.escapeHtml(q) + '</strong>".<br><small>Try keywords like <em>nozzle, laser, milling, calibration, firmware</em>.</small></div>');
			return;
		}

		var html = '';
		for (var i = 0; i < results.length; i++) {
			var item = results[i];
			var selClass = (i === 0) ? ' is-selected' : '';
			var langBadge = item.l === 'it' ? '<span class="fab-search-item-badge lang-it">IT</span>' : '<span class="fab-search-item-badge lang-en">EN</span>';
			var href = self.rootPath + item.u;

			html += '<a href="' + href + '" class="fab-search-item' + selClass + '" data-index="' + i + '">';
			html += '  <div class="fab-search-item-top">';
			html += '    <div class="fab-search-item-title">' + self.highlight(item.t, q) + '</div>';
			html += '    <div><span class="fab-search-item-badge">' + self.escapeHtml(item.c) + '</span> ' + langBadge + '</div>';
			html += '  </div>';
			html += '  <div class="fab-search-item-snippet">' + self.highlight(item.s, q) + '</div>';
			html += '</a>';
		}

		container.html(html);

		container.find('.fab-search-item').on('mouseenter', function() {
			var idx = parseInt(jQuery(this).attr('data-index'), 10);
			self.setSelection(idx);
		});
	},

	moveSelection: function(delta) {
		var self = this;
		if (!self.currentResults.length) return;
		var newIdx = self.selectedIndex + delta;
		if (newIdx < 0) newIdx = 0;
		if (newIdx >= self.currentResults.length) newIdx = self.currentResults.length - 1;
		self.setSelection(newIdx);
	},

	setSelection: function(idx) {
		this.selectedIndex = idx;
		var items = jQuery('#fabSearchResults .fab-search-item');
		items.removeClass('is-selected');
		var selected = items.filter('[data-index="' + idx + '"]').addClass('is-selected');
		if (selected.length) {
			var el = selected[0];
			el.scrollIntoView({ block: 'nearest' });
		}
	},

	highlight: function(text, q) {
		if (!q || !text) return this.escapeHtml(text);
		var terms = q.split(/\s+/).filter(Boolean);
		var pattern = terms.map(function(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
		var regex = new RegExp('(' + pattern + ')', 'gi');
		var escaped = this.escapeHtml(text);
		return escaped.replace(regex, '<mark class="fab-search-item-match">$1</mark>');
	},

	escapeHtml: function(str) {
		if (!str) return '';
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
};
