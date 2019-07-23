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
  var word    = new Audio("snd/female/" + x + ".wav");
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
      arr[index] = new Audio("snd/female/" + item + ".wav");
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
  var availableTags = ["a", "accelerating", "accelerator", "accepted", "access", "acknowledge", "acknowledged", "acquired", "acquisition", "across", "activate", "activated", "activity", "adios", "administration", "advanced", "after", "agent", "alarm", "alert", "alien", "aligned", "all", "alpha", "am", "amigo", "ammunition", "an", "and", "announcement", "anomalous", "antenna", "any", "apprehend", "approach", "are", "area", "arm", "armed", "armor", "armory", "arrest", "ass", "at", "atomic", "attention", "authorize", "authorized", "automatic", "away", "b", "back", "backman", "bad", "bag", "bailey", "barracks", "base", "bay", "be", "been", "before", "beyond", "biohazard", "biological", "birdwell", "black", "blast", "blocked", "bloop", "blue", "bottom", "bravo", "breach", "breached", "break", "bridge", "bust", "but", "button", "buzwarn", "bypass", "c", "cable", "call", "called", "canal", "cap", "captain", "capture", "ceiling", "celsius", "center", "centi", "central", "chamber", "charlie", "check", "checkpoint", "chemical", "cleanup", "clear", "clearance", "close", "code", "coded", "collider", "command", "communication", "complex", "computer", "condition", "containment", "contamination", "control", "coolant", "coomer", "core", "correct", "corridor", "crew", "cross", "cryogenic", "d", "damage", "damaged", "danger", "day", "deactivated", "decompression", "decontamination", "defense", "degrees", "delta", "denied", "deploy", "deployed", "destroy", "destroyed", "detain", "detected", "detonation", "device", "did", "die", "dimensional", "dirt", "disengaged", "dish", "disposal", "distance", "distortion", "do", "doctor", "door", "down", "dual", "duct", "e", "east", "echo", "ed", "effect", "egress", "eight", "eighteen", "eighty", "electric", "electromagnetic", "elevator", "eleven", "eliminate", "emergency", "energy", "engage", "engaged", "engine", "enter", "entry", "environment", "error", "escape", "evacuate", "exchange", "exit", "expect", "experiment", "experimental", "explode", "explosion", "exposure", "exterminate", "extinguish", "extinguisher", "extreme", "f", "facility", "fahrenheit", "failed", "failure", "farthest", "fast", "feet", "field", "fifteen", "fifth", "fifty", "final", "fine", "fire", "first", "five", "flooding", "floor", "fool", "for", "forbidden", "force", "forms", "found", "four", "fourteen", "fourth", "fourty", "foxtrot", "freeman", "freezer", "from", "front", "fuel", "g", "get", "go", "going", "good", "goodbye", "gordon", "got", "government", "granted", "great", "green", "grenade", "guard", "gulf", "gun", "guthrie", "handling", "hangar", "has", "have", "hazard", "head", "health", "heat", "helicopter", "helium", "hello", "help", "here", "hide", "high", "highest", "hit", "hole", "hostile", "hot", "hotel", "hour", "hours", "hundred", "hydro", "i", "idiot", "illegal", "immediate", "immediately", "in", "inches", "india", "ing", "inoperative", "inside", "inspection", "inspector", "interchange", "intruder", "invalid", "invasion", "is", "it", "johnson", "juliet", "key", "kill", "kilo", "kit", "lab", "lambda", "laser", "last", "launch", "leak", "leave", "left", "legal", "level", "lever", "lie", "lieutenant", "life", "light", "lima", "liquid", "loading", "locate", "located", "location", "lock", "locked", "locker", "lockout", "lower", "lowest", "magnetic", "main", "maintenance", "malfunction", "man", "mass", "materials", "maximum", "may", "medical", "men", "mercy", "mesa", "message", "meter", "micro", "middle", "mike", "miles", "military", "milli", "million", "minefield", "minimum", "minutes", "mister", "mode", "motor", "motorpool", "move", "must", "nearest", "nice", "nine", "nineteen", "ninety", "no", "nominal", "north", "not", "november", "now", "number", "objective", "observation", "of", "officer", "ok", "on", "one", "open", "operating", "operations", "operative", "option", "order", "organic", "oscar", "out", "outside", "over", "overload", "override", "pacify", "pain", "pal", "panel", "percent", "perimeter", "permitted", "personnel", "pipe", "plant", "platform", "please", "point", "portal", "power", "presence", "press", "primary", "proceed", "processing", "progress", "proper", "propulsion", "prosecute", "protective", "push", "quantum", "quebec", "question", "questioning", "quick", "quit", "radiation", "radioactive", "rads", "rapid", "reach", "reached", "reactor", "red", "relay", "released", "remaining", "renegade", "repair", "report", "reports", "required", "research", "resevoir", "resistance", "right", "rocket", "roger", "romeo", "room", "round", "run", "safe", "safety", "sargeant", "satellite", "save", "science", "scream", "screen", "search", "second", "secondary", "seconds", "sector", "secure", "secured", "security", "select", "selected", "service", "seven", "seventeen", "seventy", "severe", "sewage", "sewer", "shield", "shipment", "shock", "shoot", "shower", "shut", "side", "sierra", "sight", "silo", "six", "sixteen", "sixty", "slime", "slow", "soldier", "some", "someone", "something", "son", "sorry", "south", "squad", "square", "stairway", "status", "sterile", "sterilization", "storage", "sub", "subsurface", "sudden", "suit", "superconducting", "supercooled", "supply", "surface", "surrender", "surround", "surrounded", "switch", "system", "systems", "tactical", "take", "talk", "tango", "tank", "target", "team", "temperature", "temporal", "ten", "terminal", "terminated", "termination", "test", "that", "the", "then", "there", "third", "thirteen", "thirty", "this", "those", "thousand", "threat", "three", "through", "time", "to", "top", "topside", "touch", "towards", "track", "train", "transportation", "truck", "tunnel", "turn", "turret", "twelve", "twenty", "two", "unauthorized", "under", "uniform", "unlocked", "until", "up", "upper", "uranium", "us", "usa", "use", "used", "user", "vacate", "valid", "vapor", "vent", "ventillation", "victor", "violated", "violation", "voltage", "vox_login", "walk", "wall", "want", "wanted", "warm", "warn", "warning", "waste", "water", "we", "weapon", "west", "whiskey", "white", "wilco", "will", "with", "without", "xeno", "yankee", "yards", "year", "yellow", "yes", "you", "your", "yourself", "zero", "zone", "zulu", "_comma", "_period", "_fuzz", "_beep", "_bizwarn", "_buzwarn", "_dadeda", "_deeoo", "_doop", "_woop"];

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