
var Sprodname=document.querySelector('#Spname');
var ProductName=[];

var db;
var dbName='InventoryManage';
var request=indexedDB.open(dbName,2);
var StoreName='InventoryData';

request.onsuccess=function(event){

    console.log('Database open successfully!')
    db=event.target.result;
     Readall(); 
     fillarray()
    }

request.onerror=function(error){
    console.log('Database not open due to some errors!');
}

request.onupgradeneeded=function(event){
    
    console.log('onupgradeneeded running!')
    var myDb=event.target.result;
    if(!myDb.objectStoreNames.contains(StoreName))
    myDb.createObjectStore(StoreName,{keyPath:'id',autoIncrement:true});
}
function Readall(){
    var trans = db.transaction(StoreName).objectStore(StoreName);
    trans.openCursor().onsuccess =function(event){
        var cursor=event.target.result;
        var tabody=document.querySelector('#tubody');
        if(cursor){
           
             var tr=document.createElement('tr');
             var td=document.createElement('td');
                 td.innerText=cursor.value.id;
             var td2=document.createElement('td');
                 td2.innerText=cursor.value.productname;
             var td3=document.createElement('td');
                 td3.innerText=cursor.value.productsupplier;
             var td4=document.createElement('td');
                 td4.innerText=cursor.value.productreserv;
             var td5=document.createElement('td');
                 td5.innerText=cursor.value.productavail;
             var td6=document.createElement('td');
                 td6.innerText=`${cursor.value.productprice} PKR`;
            //  tr.appendChild(td);
             tr.appendChild(td2);
             tr.appendChild(td3);
             tr.appendChild(td4);
             tr.appendChild(td5);
             tr.appendChild(td6);
             tabody.appendChild(tr);   
                cursor.continue();
            }
    }
}
function fillarray(){
    var transaction=db.transaction(StoreName,'readwrite').objectStore(StoreName);
        transaction.openCursor().onsuccess=(e)=>{
        var cursor=e.target.result;
        if(cursor){
            console.log(cursor.value.productname);
            ProductName.push(cursor.value.productname);
            cursor.continue();
            return ProductName;
        }
    }
}

function filteritems(){
  
    var filterValue = document.getElementById('Spname');
            var newFilterArray = ProductName.filter(function(value,index) {
                var newValue = value.toLowerCase();
                var filtered = filterValue.value.toLowerCase();
                return (newValue.search(filtered) != -1) //newValue.includes(filterValue.value.toLowerCase());
            })
            // console.log(newFilterArray)
            renderArray(newFilterArray)
           if(!filterValue.value){
               newFilterArray=[];
               renderArray(newFilterArray);
           }
}
function renderArray(array) {
    var tablem=document.getElementById('tablepadding');
    tablem.style.marginTop=`0px`
   
    var items = '';
    // TodoArray = ["abc","cde","aaa","bbb"]            
    // array.forEach(function ( val,index, arrayItSelf) {
    //     items += "<li>" + val + "</li>"
    // });
    var margin=60;
    for (var i = 0; i < array.length; i++) {
        items += `<span class='new badge green'>${array[i]}</span> `
        tablem.style.marginTop=`${++margin}px`
    }
    document.getElementById("record").innerHTML = items;
}