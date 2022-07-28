const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const currentPage = document.querySelector('body').id;

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }

    if (e.key === 'ArrowRight') {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }

    if (e.key === 'ArrowLeft') {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const tabContainer = targetTab.parentNode;
    const tabPosition = targetTab.dataset.position;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    showContent(tabPosition, currentPage);
}

function showContent(tabPosition, page) {
    fetch('../data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (page === 'destination') {
                document.querySelector('#destination-name').innerHTML = data.destinations[tabPosition].name;
                document.querySelector('#destination-description').innerHTML = data.destinations[tabPosition].description;
                document.querySelector('#stats-dist').innerHTML = data.destinations[tabPosition].distance;
                document.querySelector('#stats-time').innerHTML = data.destinations[tabPosition].travel;
                document.querySelector('#destination-image').setAttribute('src', data.destinations[tabPosition].images.png);
            }

            if (page === 'crew') {
                document.querySelector('#crew-role').innerHTML = data.crew[tabPosition].role;
                document.querySelector('#crew-name').innerHTML = data.crew[tabPosition].name;
                document.querySelector('#crew-bio').innerHTML = data.crew[tabPosition].bio;
                document.querySelector('#crew-image').setAttribute('src', data.crew[tabPosition].images.png);

            }
        });
}

