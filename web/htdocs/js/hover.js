
function isset(v) {
    return typeof(v) !== 'undefined' && v !== null;
}

function pageWidth() {
  if(window.innerWidth !== null  && typeof window.innerWidth !== 'undefined')
    return window.innerWidth;
  else if(document.documentElement && document.documentElement.clientWidth)
    return document.documentElement.clientWidth;
  else if(document.body !== null)
    return document.body.clientWidth;
  else
    return null;
}

function pageHeight() {
  if(window.innerHeight !== null && typeof window.innerHeight !== 'undefined')
  	return window.innerHeight;
  else if(document.documentElement && document.documentElement.clientHeight)
  	return document.documentElement.clientHeight;
  else if(document.body !== null)
    return document.body.clientHeight;
  else
    return null;
}

var _hoverMenu = null;

function hoverOpen() {
    return _hoverMenu !== null;
}

function hoverHide() {
    _hoverMenu.style.display = 'none';
    document.body.style.cursor = 'auto';
}

function hoverShow(x, y, code) {
    // Hide all other hover menus
    if(hoverOpen())
        hoverHide();

    var hoverSpacer = 5;
    var minWidth = 400;

    // document.body.scrollTop does not work in IE
    var scrollTop = document.body.scrollTop ? document.body.scrollTop :
    document.documentElement.scrollTop;
    var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft :
    document.documentElement.scrollLeft;

    if(_hoverMenu === null) {
        _hoverMenu = document.createElement('div');
        _hoverMenu.style.position = 'absolute';
        _hoverMenu.style.width = 'auto';
				document.body.appendChild(_hoverMenu);
		}
    _hoverMenu.innerHTML = code;
    
    // Change cursor to "hand" when displaying hover menu
    document.body.style.cursor = 'pointer';

    // hide the menu first to avoid an "up-then-over" visual effect
    _hoverMenu.style.display = 'none';
    _hoverMenu.style.left = (x + hoverSpacer + scrollLeft) + 'px';
    _hoverMenu.style.top = (y + hoverSpacer + scrollTop) + 'px';
    _hoverMenu.style.display = '';

    /**
     * Check if the menu is "in screen" or too large.
     * If there is some need for reposition try to reposition the hover menu
     */

    var hoverLeft = parseInt(_hoverMenu.style.left.replace('px', ''));
    var screenWidth = pageWidth();
    var hoverPosAndSizeOk = true;
    if(!hoverMenuInScreen(_hoverMenu, hoverSpacer))
        hoverPosAndSizeOk = false;

    if(!hoverPosAndSizeOk) {
        _hoverMenu.style.left = (x - hoverSpacer - _hoverMenu.clientWidth) + 'px';

        if(hoverMenuInScreen(_hoverMenu, hoverSpacer))
            hoverPosAndSizeOk = true;
    }

    // And if the hover menu is still not on the screen move it to the left edge
    // and fill the whole screen width
    if(!hoverMenuInScreen(_hoverMenu, hoverSpacer)) {
        _hoverMenu.style.left = hoverSpacer + scrollLeft + 'px';
        _hoverMenu.style.width = pageWidth() - (2*hoverSpacer) + 'px';
    }

    var hoverTop = parseInt(_hoverMenu.style.top.replace('px', ''));
    // Only move the menu to the top when the new top will not be
    // out of sight
    if(hoverTop +_hoverMenu.clientHeight > pageHeight() && hoverTop -_hoverMenu.clientHeight >= 0)
        _hoverMenu.style.top = hoverTop -_hoverMenu.clientHeight - hoverSpacer + 'px';
    hoverTop = null;

    return false;
}

function hoverMenuInScreen(hoverMenu, hoverSpacer) {
    var hoverLeft = parseInt(hoverMenu.style.left.replace('px', ''));
    var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft :
    document.documentElement.scrollLeft;

    if(hoverLeft + hoverMenu.clientWidth >= pageWidth() - scrollLeft)
        return false;

    if(hoverLeft - hoverSpacer < 0)
        return false;

    scrollLeft = null;
    hoverLeft = null;
    hoverMenu = null;
    return true;
}

function displayHoverMenu(event, code) {
  // IE is evil and doesn't pass the event object
  if(!isset(event))
    event = window.event;

  hoverShow(event.clientX, event.clientY, code);
}

