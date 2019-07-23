var stop = false;

function stop2speak() {
// the easy way out
  location.reload();
}

function showHelp() {
  document.getElementById("helpwindow").style.display = "inline"; 
}

function hideHelp() {
  document.getElementById("helpwindow").style.display = "none"; 
}

function addWord(x) {
// add words from dictionary at cursor position
  var $txt = jQuery("#input");
  var caretPos = $txt[0].selectionStart;
  var textAreaTxt = $txt.val();
  var txtToAdd = x +" ";
  $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
}

function speakWord(x) {
// speak word on right click
  document.oncontextmenu = function() { return false; }
  var word    = new Audio("snd/police/" + x + ".wav");
  var volume  = document.getElementById("volume").value / 100;
  word.volume = volume;
  word.play();
}

function text2speech() {
// process text
  var text      = document.getElementById("input").value;
      text      = text.replace(" . ", " pause ");
      text      = text.replace("."  , " pause ");
      text      = text.replace(","  , " pause ");
      text      = text.replace(";"  , " pause ");
      text      = text.replace(/(\r\n|\n|\r)/gm, " pause ");
      text      = text.replace(/ {1,}/g," ");
      text      = text.trim();
  var words     = text.split(' ');
  var volume    = document.getElementById("volume").value / 100;
  var counter   = -1;

  if (words[0].length > 0) {
    function addType(item, index, arr) {
    // add path & type, create audio
      arr[index] = new Audio("snd/police/" + item + ".wav");
    }

    words.forEach(addType);

    function playSnd() {
    // play wavs
      document.getElementById("play").style.display = "none";
      document.getElementById("stop").style.display = "inline";
      counter++;
      if (counter == words.length) {
        document.getElementById("play").style.display = "inline";
        document.getElementById("stop").style.display = "none";
        return;
      };
      words[counter].addEventListener('ended', playSnd);
      words[counter].volume = volume;
      if (stop == false) {
        words[counter].play();
      } else {
        document.getElementById("play").style.display = "inline";
        document.getElementById("stop").style.display = "none";
        words[counter].stop();
      };
  }

    playSnd();
  }
}

$( function() {
// autocomplete
  var availableTags = ["alien1", "alien2", "alien3", "alien4", "answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7", "asshole", "bravopost", "bravopostisinposition", "charge1", "charge2", "charge3", "charge4", "charge5", "check1", "check2", "check3", "check4", "check5", "check6", "check7", "check8", "clear1", "clear10", "clear11", "clear12", "clear2", "clear3", "clear4", "clear5", "clear6", "clear7", "clear8", "clear9", "cover1", "cover2", "cover3", "cover4", "cover5", "cover6", "damnit", "deltateam", "die1", "die2", "die3", "gethim", "gren1", "gren2", "gren3", "gren4", "gren5", "gren6", "gr_mgun1", "gr_mgun2", "gr_reload1", "idle1", "idle2", "idle3", "inposition", "killthatbastard", "medic", "neutralise", "pain1", "pain2", "pain3", "pain4", "pain5", "player1", "player2", "player3", "player4", "player5", "player6", "player7", "quest1", "quest10", "quest11", "quest12", "quest2", "quest3", "quest4", "quest5", "quest6", "quest7", "quest8", "quest9", "shit", "sonofabitch", "squad", "suckitdown", "target", "taunt1", "taunt2", "taunt3", "taunt4", "taunt5", "taunt6", "throw1", "throw2", "throw3", "throw4", "youasshole"];

  function split(val) {return val.split(" ");}
  function extractLast(term) {return split( term ).pop();}

  $( "#input" )
    .on( "keydown", function(event) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
        $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      }
    )
    .autocomplete({
      minLength: 0,
      source: function(request, response) {
      response( $.ui.autocomplete.filter(availableTags, extractLast( request.term )));
    },
    focus: function() {
      return false;
    },
    select: function(event, ui) {
      var terms = split( this.value );
      terms.pop();
      terms.push( ui.item.value );
      terms.push( "" );
      this.value = terms.join( " " );
      return false;}
    });
  });