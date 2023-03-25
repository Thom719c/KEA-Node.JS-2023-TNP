// Fetch the pages from the API
fetch('/api/pages')
.then(response => response.json())
.then(pages => {
    // Add a list item for each page to the navbar dropdown menu
    const dropdownPages = document.getElementById('dropdown-pages');
    pages.forEach(page => {
        const listItem = document.createElement('li');
        const aLink = document.createElement('a');
        aLink.href = `/page/${page.id}`;
        aLink.innerText = page.title;
        aLink.classList.add('dropdown-item');
        listItem.appendChild(aLink);
        dropdownPages.appendChild(listItem);
    });
    // Navigate to the selected page when a dropdown item is clicked
    dropdownPages.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedPageId = event.target.getAttribute('href').substring(1);
        window.location.href = `/${selectedPageId}`;
    });
});