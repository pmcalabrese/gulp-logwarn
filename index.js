var es = require('event-stream');
var colors = require('colors');

module.exports = function(subString) {

  var subString = typeof subString === "undefined" ? [] : subString;
  var defaultSubstrings = ["console.log","$log"];
  var substrings = defaultSubstrings.concat(subString)
  console.log("subString: ",substrings);

  function occurrences(file){

      // file.contents = new Buffer(String(file.contents).toString());
      if (file.isNull()) {
         // Do nothing if no contents
      }

      if (file.isBuffer()) {
        var string = file.contents.toString();
        string = string.toString('utf8').split(/\r\n|[\n\r\u0085\u2028\u2029]/g);
        var message = "";
        var m = 0;
        var n=0, pos=0;
        var sc = 0;
        while(sc < string.length){
          for (var i = substrings.length - 1; i >= 0; i--) {
            var step=substrings[i].length;

            pos=string[sc].indexOf(substrings[i],pos);
            if(pos>=0){
              n++;
              message = message + "    "+ "["+(sc+1)+"] "+ substrings[i] + " ,\n";
            };
          };
          sc++;
        }
        m = m + n;

        var finalMessage = file.path+" ("+m+")\n" + message;
        if (m === 0) {
          console.log(finalMessage.green);
        } else {
          console.log(finalMessage.red);
        }
        message = "";
        return n;
      }
  }

  return es.map(occurrences);
};
