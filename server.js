let fs = require('fs');
const path = require('path'); 
const download = require('image-downloader');
let data = fs.readFileSync('books.json','utf8')
data = JSON.parse(data);
let books = data['responseObject'];
//console.log(  books[0]['pages'].length );
let urlBase = "http://apitest.wizdi.school/";

//fs.mkdirSync("./book");
fs.mkdirSync("./book/inbook");
//bookStructure(books);
function bookStructure(books){
    fs.mkdirSync(path.join(__dirname, 'books'), (err) => { 
        if (err) { 
            return console.error(err); 
        } 
        //console.log('Directory created successfully!'); 
    }); 

    let books_len = books.length;
    let path_to = path.join(__dirname, 'books');
    for(let i = 0; i < books_len;i++ ){
        let name = books[i]['name'];
        let pages = books[i]['pages'];
        let bookId = books[i]["bookId"];

        fs.mkdirSync(path.join(path_to, 'book_'+i), (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            //console.log('Directory created successfully!'); 
        }); 

        
        pageStructure(name,pages,bookId);
        break;
    }
}

function pageStructure(name,pages,bookId){
    //[ 'pageId', 'number', 'imagePath' ]
    let pages_len = pages.length;
    for(let i = 0; i < pages.length;i++ ){
        let pageId = pages[i]['pageId']
        let pageNumber = pages[i]['number']
        let imagePath = pages[i]['imagePath'];   
        createPage(pageId,pageNumber,imagePath);
        
    }
}

function createPage(pageId,pageNumber,imagePath){
    url = urlBase+imagePath;
    options = {
        url:url,
        dest: './'+pageNumber+'.png'
    }
    download.image(options)
    .then(({ filename, image }) => {
        console.log('Saved to', filename) 
    }).catch((err) => console.error(err))
    console.log(pageId);
    console.log(pageNumber);
    console.log(imagePath);
}