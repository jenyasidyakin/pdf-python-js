let fs = require('fs');
const path = require('path'); 
const download = require('image-downloader');
let data = fs.readFileSync('books.json','utf8')
data = JSON.parse(data);
let books = data['responseObject'];
let urlBase = "http://apitest.wizdi.school/";



bookStructure(books);

function makeDir(path_to,name){
    path_to = path.join(path_to, name)
    fs.mkdirSync(path_to, (err) => { 
        if (err) { 
            return console.error(err); 
        } 
        //console.log('Directory created successfully!'); 
    }); 
    console.log("makeDir");
    return path_to;
}



function bookStructure(books){
    
    let books_path = makeDir('./','books');

    let books_len = books.length;


    

    for(let i = 0; i < books_len;i++ ){
        let name = books[i]['name'];
        let pages = books[i]['pages'];
        let bookId = books[i]["bookId"];

        let pages_path = makeDir(books_path,'book_'+i );
        

        pageStructure(name,pages,bookId,pages_path);
        
    }
}

function pageStructure(name,pages,bookId,pages_path){
    //[ 'pageId', 'number', 'imagePath' ]
    let pages_len = pages.length;
    for(let i = 0; i < pages.length;i++ ){

        let pageId = pages[i]['pageId']
        let pageNumber = pages[i]['number']
        let imagePath = pages[i]['imagePath'];  

        let page_path = makeDir(pages_path,'page_'+i );

        createPage(pageId,pageNumber,imagePath,page_path);
        
    }
}

function createPage(pageId,pageNumber,imagePath,page_path){
    url = urlBase+imagePath;
    options = {
        url:url,
        dest: page_path+'/'+pageNumber+'.png'
    }
    download.image(options)
    .then(({ filename, image }) => {
        console.log('Saved to', filename) 
    }).catch((err) => console.error(err))
    console.log(pageId);
    console.log(pageNumber);
    console.log(imagePath);
}