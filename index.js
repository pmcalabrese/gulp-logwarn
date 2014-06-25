var es = require('event-stream');
var colors = require('colors');

module.exports = function(subString) {

  var defaultSubstrings = ["console.log","$log"];
  var substrings = defaultSubstrings.concat(subString)

  /** Function count the occurrences of substring in a string;
   * @param {String} string   Required. The string;
   * @param {String} subString    Required. The string to search for;
   * @param {Boolean} allowOverlapping    Optional. Default: false;
   */
  function occurrences(file, subString2, allowOverlapping){

      // file.contents = new Buffer(String(file.contents).toString());
      var string = file.contents.toString();
      var message = "";
      var m = 0;

      for (var i = substrings.length - 1; i >= 0; i--) {
        if(substrings[i].length<=0) return string.length+1;
        var n=0, pos=0;
        var step=(allowOverlapping)?(1):(substrings[i].length);
        while(true){
            pos=string.indexOf(substrings[i],pos);
            if(pos>=0){ n++; pos+=step; } else break;
        }
        m = m + n;
        if (n > 0) {
          message =  message + "    "+ n + " " + "'" + substrings[i] + "'" + ",\n";
        };
      };
      var finalMessage = file.path+" ("+m+")\n" + message;
      if (m === 0) {
        console.log(finalMessage.green);
      } else {
        console.log(finalMessage.red);
      }
      message = "";

      return(n);
  }


  return es.map(occurrences);
};
