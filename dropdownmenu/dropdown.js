// Menu Items
const listitems = (Array.from(document.querySelectorAll(".listitem")))
for (let i in listitems){
    document.getElementById(listitems[i].id).addEventListener("mouseenter", menuItemEnter);
}
document.querySelector(".container").addEventListener("mouseleave", menuItemLeave);

// click Item
function menuItemEnter() {
    const submenu = document.querySelector(".menu__sub");
    submenu.style.display = "block";
    populateCategories('top');
    populateCategories('additional');
}

// Populate Categories 
function populateCategories(category){
    
    const activeMenuItemName = active.innerHTML
    api.get(HOST + 'categories', {category, menuItem: activeMenuItemName}, function(categories){
        let newCategories = '';
        for(let i in categories){
           const categoryElement = `
            <li class="menu__sub__categories__item">
            <a href="#" class="menu__sub__categories__item__link">${categories[i]}</a>
            </li>
            `;
           newCategories += categoryElement;
        }
       
        const element = document.querySelector(`.menu__sub__categories__items--${category}`)
        element.innerHTML = newCategories;
    });
   
    
};

let active = null;

function onMenuItemMouseEnter(item) {
  if (active) {
    active.classList.remove("menu__main__item--active");
  }
  active = item;
  item.classList.add("menu__main__item--active");
  menuItemEnter();
}

const menuItems = document.getElementsByClassName("link");
for (const menuItem of menuItems) {
   menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem)
}
// Leave Item
function menuItemLeave() {
    const submenu = document.querySelector(".menu__sub");
    submenu.style.display = "none";
}

//SERVER 
const HOST = 'server.com/';

const api = {
    get : getFunction
};
const endpoints = {
    "/categories": {
      "get": getCategories
    }
}

function getCategories(data) {
    if (data.category == 'top') {
      if (data.menuItem == 'Motors') {
        return [
          'Car',
          'Motorcycle',
          'Plane',
          'Trucks',
          'Wheels'
        ];
      }
      if (data.menuItem == 'Fashion') {
        return [
          'Women\'s tops',
          'Men\'s tops',
          'Jeans',
          'Hats'
        ];
      }
      return [
        'Server apple',
        'Server banana',
        'Server pear',
        'Server orange'
      ];
    }
    if (data.category == 'additional') {
      if (data.menuItem == 'Motors') {
        return [
          'Tires',
          'Windshields',
          'Ski racks',
          'Doors',
          'Windows'
        ];
      }
      if (data.menuItem == 'Fashion') {
        return [
          'On sale',
          'Red stuff',
          'Gucci',
          'New Arrivals'
        ];
      }
      return [
        'Server square',
        'Server circle',
        'Server oval',
        'Server diamond'
      ];
    }
    return [];
  }
function getFunction (url, data, callback){
    
    const domain = url.substring(0, url.indexOf("/"));
    const endpoint = url.substring(url.indexOf("/"), url.length);
    callback(endpoints[endpoint]["get"](data))
}

function deactivateMenuItem() {
  console.log("Write your code here");
  active.classList.remove("menu__main__item--active");
}
 
const submenu = document.getElementsByClassName("menu__sub")[0];

submenu.onmouseleave = deactivateMenuItem;