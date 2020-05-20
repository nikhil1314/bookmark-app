//list for form submit
document.getElementById('my-form').addEventListener('submit',savebookmark);
function savebookmark(e){
//get form values
var sitename=document.getElementById('sitename').value;
var siteurl=document.getElementById('siteurl').value;

if(!validationform(sitename,siteurl)){
    return false;
}


var bookmark={
    name:sitename,
    url:siteurl
}
/*
//local storage
localStorage.setItem('test', 'hello world');
console.log(localStorage.getItem('test'));
localStorage.removitem('test');
console.log(localStorage.getItem('test'));
*/
//test if bookmark  is null
if(localStorage.getItem('bookmarks')===null){
    var bookmarks=[];
    //add to array
    bookmarks.push(bookmark);
    //set to localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
      //get bookmarks from localstorage
      var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
      //add bookmark to array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById("my-form").reset();

    //re-fetch bookmarks

    fetchbookmarks();


//preventdefault
    e.preventDefault();
}
function deletebookmark(url){
    //get bookmarks from localstorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //loop throught bookmarks
    for(var i=0;i< bookmarks.length;i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }

    }
    //re-set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //re-fetch for bookmarks
    //fetchbookmarks();

}

 function fetchbookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
   //get output id
   var bookmarksresults=document.getElementById('bookmarkresults');
   //build output
   bookmarksresults.innerHTML='';
   for(var i=0;i< bookmarks.length;i++){
       var name=bookmarks[i].name;
       var url=bookmarks[i].url;

       bookmarksresults.innerHTML+= '<div class="well">'+
                                    '<h3>'+name+
                                    '<a class="btn btn-default" target="_blank" href="'+url+'">visit</a>'+
                                    '<a onClick="deletebookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">delete</a>' +
                                    '<h3>'+
                                    '</div>';

   }


}
//validation form
function validationform(sitename, siteurl){
    if(!sitename || !siteurl){
        alert('please fill the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteurl.match(regex)){
        alert('please use a valid url');
        return false;
    }

    return true;
    
}