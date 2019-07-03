


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

module.exports = {

  Start:function(portNumber, Path)
  {
    http.createServer(function (req, res) {
  
      try {
          
        
      if (req.url == '/fileupload') {
    
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
    
            console.log(files);
            console.log(err);
            console.log(fields);
    
            try
            {
              var oldpath = files.filetoupload.path;
              var suffix = files.filetoupload.name.substr(files.filetoupload.name.lastIndexOf("."));
              var time = new Date().getTime();
              var newpath = "";
              if(!Path.endsWith("/"))
              {
                newpath = Path+ '/' + time.toString() + suffix;
              }
              else
              {
                newpath = Path + time.toString() + suffix;
              }
              console.log(newpath);
              fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.setHeader("file-namex",time.toString() + suffix);
                res.write('File uploaded and moved!');
                
                res.end();
              });
            }
        catch{ console.log("error during doenloading")}
          
     });
      } else {
        try
        {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
    
        return res.end();
        }
        catch
        {
          console.log('could not return response!!');
          return null;
        }
      }
    
    } 
    catch (error) {
      
    }
    }).listen(portNumber);
  }

}


























// const contentType = require('content-type')
// const express = require('express')
// const { writeFile } = require('fs')
// const getRawBody = require('raw-body')
// const uuidv4 = require('uuid/v4')
// const multer  = require('multer')
// // const upload = multer({ dest: 'tmp/multipart/' })

// const app = express()

// const helloMessage = 'Hi! The server is listening on port 3000. Use the React Native app to start an upload.'

// app.get('/', function (req, res) {
//   res.send(helloMessage)
// })
// var extension = "unknown";

// app.post('/', function (req, res, next) {

//   extension = req.headers['file-extension'];
//   getRawBody(req, {
//     length: req.headers['content-length'],
//     limit: '50mb',
//     encoding: contentType.parse(req).parameters.charset
//   }, function (err, string) {
//     if (err) return next(err)

//     const savePath = `uploads/${new Date().getTime()}.${extension}`
//     console.log(`Writing to: ${savePath}`)

//     writeFile(savePath, string, 'binary', function (err) {
//       if (err) {
//         console.log('Write error:', err)
//         res.status = 500
//       } else {
//         console.log('Wrote file.')
//         res.status = 202
//         res.setHeader("file-namex",savePath.split("/").pop())
//       }
//       res.end()
//     })
//   })
// })

// app.listen(3000, function () {
//   console.log(helloMessage)
// })