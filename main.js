let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catagory = document.getElementById('catagory')
let btnCreat = document.getElementById('btn-creat')
let tamp;
let mood = 'creat'

//get totle
function totle() {
    if (price.value != '') {
        let reselt = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = reselt;
        total.style.backgroundColor = 'green'
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = 'red'
    }
}
//creat prodect

let dataProdect;
if (localStorage.prodect != null) {
    dataProdect = JSON.parse(localStorage.prodect);

} else {
    dataProdect = [];
};


btnCreat.onclick = function () {
    let ProdectElement = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        catagory: catagory.value,
        total: total.innerHTML

    }
    //number of prodect (count)
    if(title.value!=''&&
         price.value!=''&&
        price.value>0 &&
         taxes.value>=0 &&
         ads.value>=0  &&
         discount.value>=0  &&
         catagory.value!=''&&
       count.value >0 &&
       count.value<100
    ){

        if (mood === 'creat') {
            if (ProdectElement.count > 1) {
                for (let i = 0; i < ProdectElement.count; i++) {
                    dataProdect.push(ProdectElement);
                }
            }
            else {
                dataProdect.push(ProdectElement);
            }
        } else {
            dataProdect[tamp] = ProdectElement;
            mood = 'creat';
            btnCreat.innerHTML = 'creat';
            count.style.display = 'block'
        }
        clearProdect();
    }

    localStorage.setItem('prodect', JSON.stringify(dataProdect));
    showData();
   

}

//clear prodect
function clearProdect() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    catagory.value = '';
    total.innerHTML = '';
}
//show data 
function showData() {
    let table = '';
    for (let i = 0; i < dataProdect.length; i++) {
        table += `<tr>
            <td data-label="ID">${i + 1}</td>
            <td data-label="Title">${dataProdect[i].title}</td>
            <td data-label="Price">${dataProdect[i].price}</td>
            <td data-label="Taxes">${dataProdect[i].taxes}</td>
            <td data-label="Ads">${dataProdect[i].ads}</td>
            <td data-label="Discount">${dataProdect[i].discount}</td>
            <td data-label="Count">${dataProdect[i].count}</td>
            <td data-label="Category">${dataProdect[i].catagory}</td>
            <td data-label="Update"><button onclick="updateData(${i})">update</button></td>
            <td data-label="Delete"><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('btnDelete');
    if (dataProdect.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">deleteAll (${dataProdect.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData();
//Delete
function deleteData(i) {
    dataProdect.splice(i, 1);
    localStorage.prodect = JSON.stringify(dataProdect);
    showData();
}
//deleteAll
function deleteAll() {
    localStorage.clear();
    dataProdect.splice(0);
    showData();
}
//updateData
function updateData(i) {
    title.value = dataProdect[i].title;
    price.value = dataProdect[i].price;
    taxes.value = dataProdect[i].taxes;
    ads.value = dataProdect[i].ads;
    discount.value = dataProdect[i].discount;
    totle();
    catagory.value = dataProdect[i].catagory;
    count.style.display = 'none';
    mood = 'update'
    btnCreat.innerHTML = 'update'
     tamp = i;
     scroll({
        top:0,
        behavior:'smooth'
     })
}
//search data
let searchM='search-title';
function searchMood(id){
    let search=document.getElementById('search');
if(id=='search-title'){
    searchM='title';
   
}else{
    searchM='category'
}
 search.placeholder='search by '+searchM;

search.focus();
search.value='';
showData();

}
function searchData(value){
    let table='';
if(searchM=='title'){
    for (let i = 0; i < dataProdect.length; i++) {
        if(dataProdect[i].title.toLowerCase().includes(value.toLowerCase())){
        table += `<tr>
            <td>${i}</td>
            <td>${dataProdect[i].title}</td>
            <td>${dataProdect[i].price}</td>
            <td>${dataProdect[i].taxes}</td>
            <td>${dataProdect[i].ads}</td>
            <td>${dataProdect[i].discount}</td>
            <td>${dataProdect[i].count}</td>
            <td>${dataProdect[i].catagory}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
    }}
    
}else{
    for (let i = 0; i < dataProdect.length; i++) {
        if(dataProdect[i].catagory.toLowerCase().includes(value.toLowerCase())){
        table += `<tr>
            <td>${i}</td>
            <td>${dataProdect[i].title}</td>
            <td>${dataProdect[i].price}</td>
            <td>${dataProdect[i].taxes}</td>
            <td>${dataProdect[i].ads}</td>
            <td>${dataProdect[i].discount}</td>
            <td>${dataProdect[i].count}</td>
            <td>${dataProdect[i].catagory}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>`;
    }}

}
document.getElementById('tbody').innerHTML = table;
}