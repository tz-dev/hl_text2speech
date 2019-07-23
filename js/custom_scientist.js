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
  var word    = new Audio("snd/scientist/" + x + ".wav");
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
      arr[index] = new Audio("snd/scientist/" + item + ".wav");
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
  var availableTags = ["absolutely", "absolutelynot", "administrator", "afellowsci", "ahfreeman", "alienappeal", "alientrick", "allnominal", "alright", "analysis", "announcer", "areyouthink", "asexpected", "beenaburden", "beverage", "bloodsample", "c1a0_sci_bigday", "c1a0_sci_catscream", "c1a0_sci_crit1a", "c1a0_sci_crit2a", "c1a0_sci_crit3a", "c1a0_sci_ctrl1a", "c1a0_sci_ctrl2a", "c1a0_sci_ctrl3a", "c1a0_sci_ctrl4a", "c1a0_sci_dis10a", "c1a0_sci_dis11a", "c1a0_sci_dis12a", "c1a0_sci_dis13a", "c1a0_sci_dis14a", "c1a0_sci_dis15a", "c1a0_sci_dis16a", "c1a0_sci_dis17a", "c1a0_sci_dis1a", "c1a0_sci_dis1b", "c1a0_sci_dis1c", "c1a0_sci_dis1d", "c1a0_sci_dis2a", "c1a0_sci_dis3a", "c1a0_sci_dis4a", "c1a0_sci_dis5a", "c1a0_sci_dis6a", "c1a0_sci_dis7a", "c1a0_sci_dis8a", "c1a0_sci_dis9a", "c1a0_sci_disa", "c1a0_sci_getaway", "c1a0_sci_gm", "c1a0_sci_gm1", "c1a0_sci_itsyou", "c1a0_sci_lock1a", "c1a0_sci_lock2a", "c1a0_sci_lock3a", "c1a0_sci_lock4a", "c1a0_sci_lock5a", "c1a0_sci_lock6a", "c1a0_sci_lock7a", "c1a0_sci_lock8a", "c1a0_sci_mumble", "c1a0_sci_samp", "c1a0_sci_scanrpt", "c1a0_sci_stall", "c1a0_sci_stayback", "c1a1_sci_1scan", "c1a1_sci_2scan", "c1a1_sci_3scan", "c1a1_sci_4scan", "c1a1_sci_5scan", "c1a2_sci_1zomb", "c1a2_sci_3zomb", "c1a2_sci_5zomb", "c1a2_sci_6zomb", "c1a2_sci_dangling", "c1a2_sci_darkroom", "c1a2_sci_elevator", "c1a2_sci_lounge", "c1a2_sci_transm", "c1a3_sci_1man", "c1a3_sci_atlast", "c1a3_sci_rescued", "c1a3_sci_silo1a", "c1a3_sci_silo2a", "c1a3_sci_team", "c1a3_sci_thankgod", "c1a4_sci_blind", "c1a4_sci_gener", "c1a4_sci_pwr", "c1a4_sci_pwroff", "c1a4_sci_rocket", "c1a4_sci_tent", "c1a4_sci_trainend", "c1a4_sci_trust", "c2a3_sci_icky", "c2a3_sci_track", "c2a4_sci_2tau", "c2a4_sci_4tau", "c2a4_sci_alldie", "c2a4_sci_arg2a", "c2a4_sci_arg4a", "c2a4_sci_letout", "c2a4_sci_scanner", "c2a4_sci_sugicaloff", "c2a4_sci_surgury", "c2a5_sci_boobie", "c2a5_sci_lebuz", "c3a1_sci_2sat", "c3a1_sci_4sat", "c3a1_sci_6sat", "c3a1_sci_dome", "c3a1_sci_done", "c3a2_sci_1glu", "c3a2_sci_1surv", "c3a2_sci_2glu", "c3a2_sci_3glu", "c3a2_sci_3surv", "c3a2_sci_5surv", "c3a2_sci_7surv", "c3a2_sci_flood", "c3a2_sci_fool", "c3a2_sci_forever", "c3a2_sci_linger", "c3a2_sci_ljump", "c3a2_sci_notyet", "c3a2_sci_portal", "c3a2_sci_portopen", "c3a2_sci_position", "c3a2_sci_shower", "c3a2_sci_straws", "c3a2_sci_uphere", "cantbeserious", "cantbeworse", "canttakemore", "cascade", "catchone", "chaostheory", "checkatten", "completelywrong", "containfail", "correcttheory", "cough", "delayagain", "didyouhear", "dinner", "dontconcur", "dontgothere", "dontknow", "dontwantdie", "donuteater", "doyousmell", "evergetout", "everseen", "excellentteam", "excuse", "fascinating", "fellowscientist", "fine", "freeman", "freemanalive", "fusionshunt", "getoutalive", "getoutofhere", "goodpaper", "goodtoseeyou", "gottogetout", "greetings", "greetings2", "headcrab", "heal1", "heal2", "heal3", "heal4", "heal5", "hearsomething", "hello", "hello2", "hellofreeman", "hellofromlab", "hellothere", "hideglasses", "holdstill", "hopenominal", "hopeyouknow", "howinteresting", "hungryyet", "ibelieveso", "idontthinkso", "ihearsomething", "illwait", "illwaithere", "importantspecies", "improbable", "imsure", "inconclusive", "inmesstoo", "ipredictedthis", "istay", "iwounded", "iwounded2", "iwoundedbad", "justasked", "lambdalab", "leadtheway", "leavingme", "letmehelp", "letsgo", "letstrythis", "letyouin", "limitsok", "lowervoice", "luckwillchange", "madness", "needsleep", "neverseen", "newhevsuit", "newsample", "nodoubt", "nogrant", "noguess", "noidea", "noo", "nooo", "noplease", "notcertain", "nothostile", "notsure", "odorfromyou", "ofcourse", "ofcoursenot", "okgetout", "okihope", "organicmatter", "overhere", "peculiarmarks", "peculiarodor", "perfectday", "perhaps", "positively", "protectme", "purereadings", "recalculate", "reconsider", "repeat", "reportflux", "rescueus", "ridiculous", "right", "rightwayout", "rumorclean", "rumourclean", "runtest", "sci_1thou", "sci_2thou", "sci_3thou", "sci_4thou", "sci_5thou", "sci_aftertest", "sci_alone", "sci_bother", "sci_busy", "sci_die1", "sci_die2", "sci_die3", "sci_die4", "sci_dragoff", "sci_fear1", "sci_fear10", "sci_fear11", "sci_fear12", "sci_fear13", "sci_fear14", "sci_fear15", "sci_fear2", "sci_fear3", "sci_fear4", "sci_fear5", "sci_fear6", "sci_fear7", "sci_fear8", "sci_fear9", "sci_pain1", "sci_pain10", "sci_pain2", "sci_pain3", "sci_pain4", "sci_pain5", "sci_pain6", "sci_pain7", "sci_pain8", "sci_pain9", "sci_somewhere", "scream01", "scream02", "scream03", "scream04", "scream05", "scream06", "scream07", "scream08", "scream09", "scream1", "scream10", "scream11", "scream12", "scream13", "scream14", "scream15", "scream16", "scream17", "scream18", "scream19", "scream2", "scream20", "scream21", "scream22", "scream23", "scream24", "scream25", "scream3", "scream4", "scream5", "scream6", "scream7", "seeheadcrab", "seencup", "shakeunification", "shutdownchart", "shutup", "shutup2", "simulation", "slowingyou", "smellburn", "sneeze", "softethics", "somethingfoul", "sorryimleaving", "startle1", "startle2", "startle3", "startle4", "startle5", "startle6", "startle7", "startle8", "startle9", "statusreport", "stench", "stimulating", "stop1", "stop2", "stop3", "stop4", "stopasking", "stopattacking", "survival", "thatsodd", "theoretically", "thiswillhelp", "tunedtoday", "tunnelcalc", "uselessphd", "ushouldsee", "waithere", "weartie", "whatissound", "whatnext", "whatyoudoing", "whoareyou", "whocansay", "whoresponsible", "whyaskme", "whyleavehere", "yees", "yes", "yes2", "yes3", "yesihope", "yesletsgo", "yesok", "youinsane", "youlookbad", "youlookbad2", "youneedmedic", "youwounded", "_.txt", "_comma"];

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