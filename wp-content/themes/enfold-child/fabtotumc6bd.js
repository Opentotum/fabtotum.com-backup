jQuery( document ).ready(function() {
	repairStoreLinks();
});




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
				
			
			
			if(cookie_language != ''){ //if is set cookie language from store
				
				var key_to_replace = '';
				
				switch(cookie_language){
					case 'it':
						key_to_replace = 'it';
						break;
					case 'eu':
						key_to_replace = 'eu';
						break;
					case 'intl':
						key_to_replace = 'intl';
						break;
					default:
						key_to_replace = 'eu';
				}
				link.attr('href', href.replace(m[1], key_to_replace));
			}else{
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
			
			
			/*
			if(geoip_country_code == 'it'){
				key_to_change = 'it';
			}else{
				key_to_change = geo_ip_continent;
				
				if(geo_ip_continent != 'eu'){
					geo_ip_continent = 'intl';
				}
			}*/
			
			
		}
		
		regex.lastIndex = 0;
		
	});	
}

function getCookie(cookiename) 
{
	// Get name followed by anything except a semicolon
	var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
	// Return everything after the equal sign, or an empty string if the cookie name not found
	return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}