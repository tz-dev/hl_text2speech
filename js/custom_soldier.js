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
  var word    = new Audio("snd/soldier/" + x + ".wav");
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
      arr[index] = new Audio("snd/soldier/" + item + ".wav");
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
  var availableTags = ["a!", "a", "affirmative!", "affirmative", "alert!", "alert", "alertone", "alien!", "alien", "all!", "all", "am!", "am", "anything!", "are!", "are", "area!", "area", "ass!", "ass", "at!", "away!", "backup!", "backup", "bag!", "bastard!", "bastard", "blow!", "bogies!", "bogies", "bravo!", "bravo", "c2a2_hg_chat1a", "c2a2_hg_chat2a", "c2a2_hg_chat3a", "c2a2_hg_chat4a", "c2a2_hg_chat5a", "c2a3_ambush_fx", "c2a3_ambush_vox", "c2a3_hg_1drag", "c2a3_hg_2drag", "c2a3_hg_3drag", "c2a3_hg_4drag", "c2a3_hg_5drag", "c2a3_hg_laugh", "c2a5_hg_abandon", "c2a5_hg_lebuz", "call!", "casualties!", "charlie!", "charlie", "check!", "check", "checking!", "checking", "clear!", "clear", "clik", "command!", "command", "continue!", "continue", "control!", "control", "cover!", "covermyass!", "covermyass", "creeps!", "creeps", "damn!", "damn", "delta!", "delta", "die1", "die2", "die3", "die4", "die5", "die6", "die7", "down!", "down", "east!", "east", "echo!", "echo", "eight", "eighty", "eightymeters", "eliminate", "everything", "fall!", "fifty", "fiftymeters", "fight!", "fight", "fire!", "fire", "five!", "five", "fivemeters", "force!", "force", "formation!", "formation", "fortymeters", "four!", "four", "foxtrot!", "foxtrot", "freeman!", "freeman", "get!", "go!", "go", "god!", "god", "going!", "going", "got!", "got", "grenade!", "gr_alert1", "gr_die1", "gr_die2", "gr_die3", "gr_idle1", "gr_idle2", "gr_idle3", "gr_loadtalk", "gr_mgun1", "gr_mgun2", "gr_mgun3", "gr_pain1", "gr_pain2", "gr_pain3", "gr_pain4", "gr_pain5", "gr_reload1", "gr_step1", "gr_step2", "gr_step3", "gr_step4", "guard!", "guard", "have!", "have", "he!", "heavy!", "heavy", "hell!", "hell", "here!", "here", "hg_civvies", "hg_sucks", "hold!", "hold", "hole!", "hole", "hostile!", "hostile", "hostiles!", "hostiles", "hot!", "hot", "hundred", "hundredmeters", "i!", "i", "in!", "in", "is!", "is", "kick!", "lay!", "left!", "left", "lets!", "lets", "level!", "level", "lookout!", "lookout", "main", "mainobjective", "maintain!", "maintain", "maintarget", "meters", "mission!", "mission", "mister!", "mister", "mother!", "move!", "move", "movein!", "movein", "movement!", "movement", "moves!", "moves", "my!", "my", "need!", "negative!", "negative", "neutralize!", "neutralized!", "niner!", "niner", "no!", "no", "north!", "north", "nothing!", "nothing", "objective!", "objective", "objectiveone", "of!", "of", "off1", "off2", "off3", "oh!", "ok!", "ok", "on1", "on2", "one!", "one", "onedown", "onefiftymeters", "onehundred", "orders!", "orders", "our!", "out!", "out", "over!", "over", "pain1", "pain2", "pain3", "patrol!", "patrol", "people!", "people", "position!", "position", "post!", "post", "private!", "private", "quiet!", "quiet", "radio!", "radio", "recon!", "recon", "request!", "right!", "right", "roger!", "roger", "sector!", "sector", "secure!", "secure", "seven", "seventy", "seventymeters", "shit!", "shit", "shot!", "shot", "sign!", "sign", "signs!", "signs", "silence!", "silence", "sir!", "sir", "six!", "six", "sixty", "sixtymeters", "soldier.txt", "some!", "some", "something!", "something", "south!", "south", "squad!", "squad", "stay!", "stay", "suppressing!", "sweep!", "sweep", "take!", "tango!", "tango", "target!", "target", "targetone", "team!", "team", "ten", "tenmeters", "that!", "that", "the!", "the", "there!", "there", "these!", "these", "thirty", "thirtymeters", "this!", "this", "those!", "those", "three!", "three", "threehundred", "tight!", "tight", "twenty", "twentymeters", "two!", "two", "twohundred", "twohundredmeters", "uhh", "under!", "up!", "up", "we!", "we've!", "we've", "we", "weapons!", "weapons", "weird!", "weird", "west!", "west", "will!", "yeah!", "yeah", "yes!", "yes", "yessir!", "yessir", "you!", "you", "your!", "your", "zero!", "zero", "zipline1", "zipline2", "zipline_clip1", "zipline_clip2", "zipline_clothing1", "zipline_clothing2", "zipline_hitground1", "zipline_hitground2", "zone!", "zone", "zulu!", "zulu"];

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