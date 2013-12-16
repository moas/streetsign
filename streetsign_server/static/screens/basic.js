/************************************************************

    StreetSign Digital Signage Project
     (C) Copyright 2013 Daniel Fairhead

    StreetSign is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    StreetSign is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with StreetSign.  If not, see <http://www.gnu.org/licenses/>.

    ---------------------------------
    screens output, this theme (basic) specifics (zonehtml, post fadein/out)

*************************************************************/

// Returns the HTML for a zone area
// TODO: This should really be templated out.
function zone_html(id, top, left, bottom, right, css, type) {
    console.log('TYPE: zone_' + type + '...');
    return ('<div id="_zone_'+id+'" class="zone zone_'+type+'" style="'
            +'left:' + left
            +';right:' + right
            +';bottom:' + bottom
            +';top:' + top + '"></div>');
}

/***************************************************************************/

function post_fadeout(post, fadetime, andthen) {
    if (!andthen) { andthen = function() {}; }

    fadetime = 1 * fadetime;

    if ((fadetime === undefined)||(isNaN(fadetime))) { fadetime = 0; }

    if (('type' in post.zone) && (post.zone.type == 'scroll')) {
        // do scroll stuff.
        $(post.zone.el).transition({'opacity': 0}, 500, function() {
            $(post._el).css('opacity', 0);
            $(post.zone.el).css('opacity', 1.0);
            andthen()
            });
        //andthen();
    } else {
        $(post._el).transition({'opacity':0}, fadetime, andthen);
    }
}

function post_fadein(post, fadetime, andthen) {
    var distance;

    if (!andthen) { andthen = function() {}; }

    if (post.zone.hasOwnProperty('type') && (post.zone.type == 'scroll')) {
        distance = $(post._el).width() + $(post.zone.el).width() + 20;

        // This is odd..
        //$(post._el).fadeIn(0, andthen);
        //$(post._el).css('left', $(post.zone.el).width() + 10);
        
        $(post._el).css({'left': $(post.zone.el).width() + 10, 'opacity': 1.0});

        $(post._el).transition({'left': 0 - ($(post._el).width() + 10)}, distance * 17, 'linear'  );
        post.display_time = distance * 17;

        andthen();

        // do scroll stuff.
    } else {
        fadetime = 1 * fadetime;
        if ((fadetime === undefined)||(isNaN(fadetime))) { fadetime = 0; }
        $(post._el).transition({'opacity':1.0}, fadetime, andthen);
    }
}

