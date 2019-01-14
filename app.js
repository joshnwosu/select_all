
let startArray = [
  { text: 'Meet up with guys at work', checked: false, id: 1 },
  { text: 'Search item lists', checked: false, id: 2 },
  { text: 'Become a software engineer', checked: false, id: 3 },
  { text: 'Dance in the rain', checked: false, id: 4 },
  { text: 'Always be happy', checked: false, id: 5 },
  { text: 'Smile for no reason', checked: false, id: 6 },
  { text: 'Be a giver', checked: false, id: 7 },
  { text: 'Cherish what you have', checked: false, id: 8 },
  { text: 'Learn from your mistakes', checked: false, id: 9 },
  { text: 'I\'m gonna make it', checked: false, id: 10 }
];

let selectedList = [] // array or holder for selected lists;
let selectLengthArr = [] // array or holder for selected lists;
let searchArray = [];

let id_name = 'list-id',
    item_name = 'list-item',

    storedId = localStorage.getItem(id_name),
    storedItem = JSON.parse(localStorage.getItem(item_name));

function Build() {
  this.data = {
    newId: parseInt(storedId) || 11,
    list: storedItem || startArray,
    check: true
  }

  this.selectLength();
  this.renderItem(this.data.list);

}

Build.prototype.renderTemplate = function(item, index) {
  let template = `
      <li onclick="b.check(${item.id})">
        <span class="text">
        <index>${index+1}.</index> ${item.text}
        </span>
        <span class="icon checkbox">
          <i class="${item.checked ? 'ion-android-checkbox-outline' : 'ion-android-checkbox-outline-blank'}"></i>
        </span>
      </li>
    `;
  return template;
}

Build.prototype.renderItem = function(list) {
  let template = list.map((el, idx)=> {
    return this.renderTemplate(el, idx);
  }).join('');
  document.querySelector('ul.list').innerHTML = template;
}

Build.prototype.check = function(id) {
  let el = this.data.list.find((x)=> x.id === id);
  el.checked = !el.checked;
  this.data.check == false ? this.data.check = true : '';
  document.querySelector('.slct-all .icon i').setAttribute('class', 'ion-android-checkbox-outline-blank');
  // loop and check

  selectLengthArr = [];

  let y = this.data.list;
  // let y = searchArray
  y.forEach(x=> {
    if (x.checked)
      selectLengthArr.push(x);
  });

  if (selectLengthArr.length == startArray.length) {
    this.data.check = false;
    document.querySelector('.slct-all .icon i').setAttribute('class', 'ion-android-checkbox-outline');
  }

  this.renderItem(this.data.list);
  this.filterSearch();
}

Build.prototype.pushSelect = function() {
  selectedList = [];
  let y = searchArray;
  y.forEach(x => {
    if (x.checked)
      selectedList.push(x);
  });
  console.log(selectedList)
}

Build.prototype.selectAll = function() {
  selectLengthArr = []

  let el = document.querySelector('.slct-all .icon i'),
      y = this.data.list;

  if (this.data.check) {
    el.setAttribute('class', 'ion-android-checkbox-outline');
    for (let i = 0; i < y.length; i++) {
      y[i].checked = true;
      if (y[i].checked) {
        selectLengthArr.push(y[i]);
      }
    }
    this.data.check = false;
  }
  
  else if (!this.data.check) {
    el.setAttribute('class', 'ion-android-checkbox-outline-blank');
    for (let i = 0; i < y.length; i++) {
      y[i].checked = false;
    }
    this.data.check = true;
  }

  this.filterSearch();
  this.selectLength();
  
}

Build.prototype.selectLength = function() {
 
  selectedList = [];
  let y = searchArray;
  y.forEach(x => {
    if (x.checked)
      selectedList.push(x);
  });

  document.querySelector('header .slct').innerHTML = `${selectedList.length} Selected`;
}

Build.prototype.filterSearch = function() {
  searchArray = []
  let input = document.querySelector("input[name=filter-search]"),
      filter = input.value.toUpperCase(),
      ul = document.querySelector('ul.list')

  for (let i = 0; i < startArray.length; i++) {
    let arr = startArray[i];
    // let arr1 = startArray[i].id
    let text = startArray[i].text;

    if(text.toUpperCase().indexOf(filter) > -1) {
      searchArray.push(arr)
    }

  }
  this.renderItem(searchArray);
  this.selectLength();
}

const b = new Build();
