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
  var word    = new Audio("snd/barney/" + x + ".wav");
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
      arr[index] = new Audio("snd/barney/" + item + ".wav");
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
  var availableTags = ["aimforhead", "aintgoin", "aintscared", "alreadyasked", "ambush", "badarea", "badfeeling", "ba_another", "ba_attack1", "ba_attack2", "ba_bring", "ba_buttugly", "ba_close", "ba_die1", "ba_die2", "ba_die3", "ba_dontmake", "ba_dotoyou", "ba_duty", "ba_endline", "ba_firepl", "ba_friends", "ba_gotone", "ba_iwish", "ba_later", "ba_pain1", "ba_pain2", "ba_pain3", "ba_pissme", "ba_post", "ba_raincheck", "ba_seethat", "ba_somuch", "ba_stepoff", "ba_tomb", "ba_uwish", "ba_watchit", "ba_whatyou", "ba_whoathere", "beertopside", "bequiet", "bigmess", "bigplace", "c1a0_ba_button", "c1a0_ba_desk", "c1a0_ba_headdown", "c1a0_ba_hevno", "c1a0_ba_hevyes", "c1a0_ba_late", "c1a1_ba_glad", "c1a2_ba_2zomb", "c1a2_ba_4zomb", "c1a2_ba_bullsquid", "c1a2_ba_climb", "c1a2_ba_goforit", "c1a2_ba_slew", "c1a2_ba_surface", "c1a2_ba_top", "c1a4_ba_octo1", "c1a4_ba_octo2", "c1a4_ba_octo3", "c1a4_ba_octo4", "c1a4_ba_wisp", "c2a1_ba_again", "c2a1_ba_hub1a", "c2a1_ba_hub2a", "c2a2_ba_launch", "c2a3_ba_assn", "c2a4_ba_1tau", "c2a4_ba_3tau", "c2a4_ba_5tau", "c2a4_ba_alive", "c2a4_ba_arg1a", "c2a4_ba_arg3a", "c2a4_ba_arg5a", "c2a4_ba_longnite", "c2a4_ba_steril", "c2a4_ba_teach", "c2a5_ba_helpme", "c2a5_ba_letout", "c2a5_ba_rpg", "c2a5_ba_sniped", "c2a_ba_hub1a", "c3a1_ba_1sat", "c3a1_ba_3sat", "c3a1_ba_5sat", "c3a2_ba_2surv", "c3a2_ba_4surv", "c3a2_ba_6surv", "c3a2_ba_8surv", "c3a2_ba_stay", "cantfigure", "checkwounds", "coldone", "crewdied", "diebloodsucker", "dobettertogether", "dontaskme", "dontbet", "dontbuyit", "dontfigure", "dontguess", "donthurtem", "dontreckon", "getanyworse", "gettingcloser", "gladof38", "gladtolendhand", "guyresponsible", "hardtosay", "haybuddy", "hayfella", "hearsomething", "hearsomething2", "hellonicesuit", "helpothers", "heybuddy", "heyfella", "hitbad", "howdy", "howyoudoing", "icanhear", "iguess", "illwait", "imdead", "imhit", "imwithyou", "ireckon", "iwaithere", "justdontknow", "leavealone", "letsgo", "letsmoveit", "luckwillturn", "maybe", "missingleg", "mrfreeman", "nodrill", "nope", "nosir", "notelling", "noway", "openfire", "realbadwound", "rightway", "seeya", "slowingyoudown", "somethingdied", "somethingmoves", "somethingstinky", "soundsbad", "soundsright", "standback", "standguard", "stench", "stop1", "stop2", "stophere", "survive", "targetpractice", "teamup1", "teamup2", "thinking", "waitin", "wayout", "whatgood", "whatisthat", "whatsgoingon", "workingonstuff", "yessir", "youbet", "youeverseen", "yougotit", "youhearthat", "youneedmedic", "youtalkmuch", "yup"];

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