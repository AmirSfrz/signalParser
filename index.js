const provider = require('./main/expressProvider')

provider.get('/', (req, res) => {
  res.send('Hello World!')
});

provider.post('/signal360', function (req, res) {
 
  let reqData = req.body.data.toString();
  let parsedData = parseSignal360Data(reqData);

  res.send(parsedData);
});


function parseSignal360Data(data){
  var str = data.replace('#', 'Symbol:').replace('Posted from', 'PostedFrom:');
  
  for(let i=0;i< str.length;i++){
    str = str.replace('\n\n', ',');
  }
  for(let i=0;i< str.length;i++){
    str = str.replace(' ', '');
  }
  let arrayOfKeyValues = str.split(',');
  let modifiedArray =  new Array();
  console.log(arrayOfKeyValues);
  for(let i=0;i< arrayOfKeyValues.length;i++){
      let arrayValues = arrayOfKeyValues[i].split(':');
      let arrayString = '';
      if (arrayValues[1].includes('-')){
        let secondPart = arrayValues[1];
        for(let i=0;i< secondPart.length;i++){
          secondPart = secondPart.replace('-', ',');
        }
        arrayString ='"'+arrayValues[0]+'"'+':'+'['+secondPart+']';
      } else {
        arrayString ='"'+arrayValues[0]+'"'+':'+'"'+arrayValues[1]+'"';
      }
      modifiedArray.push(arrayString);
  }
  let jsonDataString = '{'+modifiedArray.toString()+'}';
  let jsonData = JSON.parse(jsonDataString);
  return jsonData;
}