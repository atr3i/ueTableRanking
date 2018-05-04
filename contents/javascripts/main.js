// TOGGLE BUTTON (Collapsed mobile table)
function accordionFunction(event) {

    var acordionButton = this.event.currentTarget;

    var row = acordionButton.parentNode.parentNode;

    var col = acordionButton.parentNode;

    var showingItem = row.getAttribute('data-show');

    var childrenCount = parseInt(row.getAttribute('data-children'));

    var targetSibling = row.nextSibling.nextSibling;

    if (showingItem && showingItem == 'true') {
       row.children[0].setAttribute('rowspan', 1);
       col.setAttribute('rowspan', 1);
       acordionButton.setAttribute('aria-expanded', false);
    } else {
        row.children[0].setAttribute('rowspan', childrenCount + 1);
        col.setAttribute('rowspan', childrenCount + 1);
        acordionButton.setAttribute('aria-expanded', true);
    }
    
    for (let i = 0; i < childrenCount; i++) {
        if (showingItem && showingItem == 'true') {
            row.setAttribute('data-show', 'false');
        } else {
            row.setAttribute('data-show', 'true');
        }
        targetSibling.classList.toggle('is-hidden');
        targetSibling = targetSibling.nextSibling.nextSibling;
    }
}


