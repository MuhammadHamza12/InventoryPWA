// fill selectbox

    
//Constructor
function ProductData(Pname,Psup,Preser,Pavail,Pitemp){
    this.Pname=Pname;
    this.Psup=Psup;
    this.Preser=Preser;
    this.Pavail=avail;
    this.Pitemp=Pitemp;
}
var GetId=id=>document.querySelector('#'+id);
// get all element
var prodname=document.getElementById('productname');
var prodid=GetId('prodid');
var suplier=GetId('supplier');
var reserve=GetId('reserve');
var avail=GetId('avail');
var itemprice=GetId('itemprice');
var dprdname=GetId('dproductname');
var dprodid=GetId('dprodid');
var dsuplier=GetId('dsupplier');
var dreserve=GetId('dreserve');
var davail=GetId('davail');
var ditemprice=GetId('ditemprice');
var uprdname=GetId('uproductname');
var uprodid=GetId('uprodid');
var usuplier=GetId('usupplier');
var ureserve=GetId('ureserve');
var uavail=GetId('uavail');
var uitemprice=GetId('uitemprice')
var dform='formlable';
var uform='formlable2';
// Form on submit object
var getForm=GetId('addsubmit');
    getForm.addEventListener('submit',()=>{
        console.log('working')
        var fprodname=prodname.value;
        var fsuplier=suplier.value;
        var freserve=reserve.value;
        var favail=avail.value;
        var fitemprice=itemprice.value;

//  var Productobj=new ProductData(fprodname,fsuplier,freserve,favail,fitemprice);
 var ProductData={
     productname:fprodname,
     productsupplier:fsuplier,
     productreserv:freserve,
     productavail:favail,
     productprice:fitemprice
 }    
AddData(ProductData);    
    })
// delete data 
$("#selectbox").on('change', function() {
    var select=document.querySelector('#selectbox');
    var selectvalue= parseInt(select.value);
    setValues(selectvalue,dprdname,dprodid,dreserve,dsuplier,ditemprice,davail,dform);
 
var delte=document.querySelector('#btndelete');

    delte.addEventListener('click',()=>{
       DeleteRec(selectvalue);
    });
});
//logout button
var btnlogout=document.querySelector('#btnlogout');
    btnlogout.addEventListener('click',()=>{
        window.location.replace('index.html');    
    })

    var btnlogout1=document.querySelector('#btnlogout1');
    btnlogout1.addEventListener('click',()=>{
        window.location.replace('index.html');
    })

//end
//end delete data
// update data
$("#uselect").on('change', function() {

    var select=document.querySelector('#uselect');
    var selectvalue= parseInt(select.value);
    setValues(selectvalue,uprdname,uprodid,ureserve,usuplier,uitemprice,uavail,uform);
var btnupdate=document.querySelector('#btnupdate');
    btnupdate.addEventListener('click',()=>{
        
        var newprod=uprdname.value;
        var newsup=usuplier.value;
        var newreserv=ureserve.value;
        var newavail=uavail.value;
        var newprice=uitemprice.value;

         updatedata(selectvalue,newprod,newsup,newreserv,newavail,newprice);
         uprdname.value="";
         ureserve.value="";
         usuplier.value="";
         uitemprice.value="";
         uavail.value="";
         var select = $('#uselect');
         $("form select").val("");
         
         select.prop('selectedIndex', 0); //Sets the first option as selected
         select.material_select();        //Update material select
    
            window.location.reload();
        
        })
});
function setValues(id,prodname,prodid,preserve,Psup,pitemprice,Pavail,formid){
    var form=document.getElementById(formid);
    var getele=form.getElementsByTagName('label');
    for(var i=0;i<getele.length-1;i++){
        getele[i].remove();
    }
    var trans=db.transaction(StoreName).objectStore(StoreName);
    trans.openCursor().onsuccess =function(event){
        var cursor=event.target.result;
        if(cursor){
        if(cursor.value.id == id){
                prodname.value=cursor.value.productname;
                prodid.value=cursor.value.id;
                preserve.value=cursor.value.productreserv;
                Psup.value=cursor.value.productsupplier;
                pitemprice.value=cursor.value.productprice;
                Pavail.value=cursor.value.productavail;
            }
            cursor.continue();
    }   
}
}  
//deleteall
var deleletall=document.querySelector('#btndeleteall');
    deleletall.addEventListener('click',()=>{
        Deleteall();
        window.location.reload();
    })
function DeletePro(){
    // fillselectid('dselect');
    
    
}
function getallid(id){
    $(document).ready(function() {
        var select = document.getElementById(id);
        var trans = db.transaction(StoreName).objectStore(StoreName);
        trans.openCursor().onsuccess =function(event){
        var i=0;    
            var cursor=event.target.result;
            if(cursor){
                var cretele=document.createElement('option');
                cretele.innerHTML=cursor.value.id;
                select.appendChild(cretele);
                $('select').material_select();
                cursor.continue();
            }
        }
      });
}
// Database connection work
var db;
var dbName='InventoryManage';
var request=indexedDB.open(dbName,2);
var StoreName='InventoryData';

request.onsuccess=function(event){

    console.log('Database open successfully!')
    db=event.target.result;
     Readall(); 
     getallid('selectbox');
      getallid('uselect');
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

function AddData(dataObj){
    var trans = db.transaction(StoreName, 'readwrite')
    var Store=trans.objectStore(StoreName);
    
    var addreq=Store.add(dataObj);
    addreq.onsuccess=function(){
        console.log('Data has been successfully Added to '+StoreName);       
        window.location.reload();
    }
    addreq.onerror=function(error){
        console.log('some error occur during insertion! '+error);
    }
}


var getselect=document.getElementById('selectbox');
    getselect.addEventListener('change',()=>{
        console.log('wokring')
        console.log($('#selectbox option:selected').val());      
    })


function Readall(){
    var trans = db.transaction(StoreName).objectStore(StoreName);
    trans.openCursor().onsuccess =function(event){
        var cursor=event.target.result;
        var tabody=document.querySelector('#tabody');
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
             tr.appendChild(td);
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
function Readone(id){
    var trans=db.transaction(StoreName).objectStore(StoreName);
    trans.openCursor().onsuccess =function(event){
        var cursor=event.target.result;
        if(cursor){
        if(cursor.value.id == id){
                console.log(cursor.value.name);
            }
            cursor.continue();
    }   
}
}
function DeleteRec(id){

    var trans=db.transaction(StoreName,'readwrite')
    var deleteobstore=trans.objectStore(StoreName);
    var deletereq=deleteobstore.delete(id);

    trans.oncomplete=(e)=>{
        console.log('transaction complete!');
    }

    deletereq.onsuccess=e=>{
    console.log('delete Record successfully');
    window.location.reload();
}



}

function Deleteall(){
    var trans=db.transaction(StoreName,'readwrite')
    var deleteobstore=trans.objectStore(StoreName);
    var deletereq=deleteobstore.clear()

    trans.oncomplete=(e)=>{
        console.log('transaction complete!');
    }
    deletereq.onsuccess=e=>{
    console.log('delete Record successfully');
    }

}
function updatedata(id,prodname,suplier,reserve,available,itemprice){
    var trans=db.transaction(StoreName,'readwrite');
     var objectStore=trans.objectStore(StoreName);
    objectStore.openCursor().onsuccess =function(event){
        var cursor=event.target.result;
        if(cursor){
        if(cursor.value.id == id){
               var updatedata= cursor.value;
               updatedata.productname=prodname;
               updatedata.productsupplier=suplier;
               updatedata.productreserv=reserve;
               updatedata.productavail=available;
               updatedata.productprice=itemprice;
               cursor.update(updatedata);
            }
            cursor.continue(); }   
    
        }
     
}
function editDataDB(data) {
    var trans = db.transaction(StoreName, 'readwrite')
    var objectStore = trans.objectStore(StoreName);
}