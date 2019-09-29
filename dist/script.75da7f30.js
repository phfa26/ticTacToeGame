// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var clickCounter = {
  fieldA: 0,
  fieldB: 0,
  fieldC: 0,
  fieldD: 0,
  fieldE: 0,
  fieldF: 0,
  fieldG: 0,
  fieldH: 0,
  fieldI: 0 // Every playing field has a initial value of zero, once it is played the value may change to 1 or -1, depending on the players turn.
  //If a possible win sum is equal to 3, team X wins, if it is -3, team O wins.

};
var turnCounter = 1; //This acts as a switch, if it is set to be 1 it is team X turns, -1 for O team turn, else for no turn.

var scoreX = 0;
var scoreO = 0;
var lastWin = 0;
var roundCounter = 0;
var fieldCounter = 0;
var isMatchWon = false;

function charPick() {
  $(".play, .start").hide();
  $(".charPick").fadeIn();

  function showStart() {
    if ($("#OPick").text() !== "" && $("#XPick").text() !== "") {
      $(".start").fadeIn();
    }
  }

  $(".pickX").click(function () {
    $('#XPick').text($(this).text());
    showStart();
  });
  $(".pickO").click(function () {
    $('#OPick').text($(this).text());
    showStart();
  });
}

function scoreCheck() {
  if (clickCounter.fieldA + clickCounter.fieldB + clickCounter.fieldC === 3 || clickCounter.fieldA + clickCounter.fieldD + clickCounter.fieldG === 3 || clickCounter.fieldA + clickCounter.fieldE + clickCounter.fieldI === 3 || clickCounter.fieldB + clickCounter.fieldE + clickCounter.fieldH === 3 || clickCounter.fieldC + clickCounter.fieldF + clickCounter.fieldI === 3 || clickCounter.fieldD + clickCounter.fieldE + clickCounter.fieldF === 3 || clickCounter.fieldG + clickCounter.fieldH + clickCounter.fieldI === 3 || clickCounter.fieldG + clickCounter.fieldE + clickCounter.fieldC === 3) {
    $("#XWins").slideDown();
    scoreX++;
    roundCounter++;
    turnCounter = 0;
    lastWin = 1;
    isMatchWon = true;
    $(".playAgain").fadeIn(1000);
    $("#bonesScore").text("".concat(scoreX));
  }

  if (clickCounter.fieldA + clickCounter.fieldB + clickCounter.fieldC === -3 || clickCounter.fieldA + clickCounter.fieldD + clickCounter.fieldG === -3 || clickCounter.fieldA + clickCounter.fieldE + clickCounter.fieldI === -3 || clickCounter.fieldB + clickCounter.fieldE + clickCounter.fieldH === -3 || clickCounter.fieldC + clickCounter.fieldF + clickCounter.fieldI === -3 || clickCounter.fieldD + clickCounter.fieldE + clickCounter.fieldF === -3 || clickCounter.fieldG + clickCounter.fieldH + clickCounter.fieldI === -3 || clickCounter.fieldG + clickCounter.fieldE + clickCounter.fieldC === -3) {
    $("#OWins").slideDown();
    scoreO++;
    roundCounter++;
    turnCounter = 0;
    lastWin = -1;
    isMatchWon = true;
    $(".playAgain").fadeIn(1000);
    $("#skullScore").text("".concat(scoreO));
  } else if (fieldCounter == 9 && isMatchWon === false) {
    $("#winning").text("CAT'S GAME! - ROUND DRAWN").show(500);
    roundCounter++;
    turnCounter = 0;
    $(".playAgain").fadeIn(1000);
  }

  if (scoreX == 2 || roundCounter == 3 && scoreX > scoreO) {
    $("#winning").text("TEAM BONES WINS!").show(500);
    turnCounter = 0;
    $(".playAgain").hide();
  }

  if (scoreO == 2 || roundCounter == 3 && scoreX < scoreO) {
    $("#winning").text("TEAM SKULLS WINS!").show(500);
    turnCounter = 0;
    $(".playAgain").hide();
  }

  if (roundCounter == 3 && scoreX == scoreO) {
    $("#winning").text("IT IS A \"CAT'S GAME!\" - MATCH DRAWN").show(500);
    $(".playAgain").hide();
  }
}

function roundDisplay() {
  var roundMessages = ['1st Round', '2nd round', '3rd round'];

  for (message in roundMessages) {
    if (message == roundCounter) {
      $("#round").text(roundMessages[message]).fadeIn();
    }

    ;
  }
} //Based on the round counter, a message is displayed on screen as a round counter.


function turn() {
  if (turnCounter === -1) {
    $("#skullTurn").show(500);
    $("#bonesTurn, #noTurn").hide(500);
  }

  if (turnCounter === 1) {
    $("#bonesTurn").show(500);
    $("#skullTurn, #noTurn").hide(500);
  }

  if (turnCounter === 0) {
    $("#noTurn").show(500);
    $("#bonesTurn, #skullTurn").hide(500);
  }
} //Displays wich player is the turn based on the turnCounter that switchs according to last winner or draw. 
//Also controls the animation effects times with jquery.


$(document).ready(function () {
  $("#XWins, #OWins, #skullTurn, #bonesTurn, #noTurn, .playAgain").hide();
  $("html, body").animate({
    scrollTop: 0
  }, 1000);
  turn();
  roundDisplay();
  charPick();
  $(".start").click(function () {
    //Displays the gamimg area and hides the icon selection screen.
    $(".play").show(500);
    $(".charPick").hide(500);
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 115
    }, 1000);
  });
  $(".field").click(function () {
    if ($(this).text() == "") {
      if (turnCounter === 1) {
        $(this).text($('#XPick').text()).hide().slideDown(700);
        UpdateClickCounter(this.id, +1);
      } else if (turnCounter === -1) {
        $(this).text($('#OPick').text()).hide().slideDown(700);
        UpdateClickCounter(this.id, -1);
      }
    }

    turn();
  });
  $(".playAgain").click(function () {
    //Calls up to action the NEXT ROUND button, case there is a next round.
    $(".field").text("");

    for (key in clickCounter) {
      clickCounter[key] = 0;
    }

    $("html, body").animate({
      scrollTop: 115
    }, 1000);
    $("#XWins, #OWins").slideUp();
    $(".playAgain, #winning").fadeOut(1000);

    if (lastWin === 1 || lastWin === -1) {
      turnCounter = lastWin * -1;
    }

    if (lastWin === 0) {
      turnCounter = -1;
    }

    lastWin = 0;
    fieldCounter = 0;
    isMatchWon = false;
    turn();
    roundDisplay();
  });
  $(".restart").click(function () {
    //Reset all game and variables to starting values. Also hides gaming area and call back up the icon selection screen.
    $(".field, #XPick, #OPick").text("");

    for (key in clickCounter) {
      clickCounter[key] = 0;
    }

    $("#XWins, #OWins").slideUp();
    $(".playAgain, #winning").fadeOut(1000);
    turnCounter = 1;
    scoreX = 0;
    scoreO = 0;
    lastWin = 0;
    fieldCounter = 0;
    roundCounter = 0;
    bonesToken = "";
    skullsToken = "";
    isMatchWon = false;
    $("#bonesScore, #skullScore").text("".concat(scoreX));
    turn();
    roundDisplay();
    charPick();
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
  });
});

function UpdateClickCounter(id, amount) {
  for (key in clickCounter) {
    // Iterates our object that keep track of the users points.
    if (key === id) {
      clickCounter[key] += amount;
    }
  }

  turnCounter = turnCounter * -1;
  fieldCounter++;
  scoreCheck();
}
/*Thank you!
Writen by: Paulo Henrique F. do Amaral
General Assembly Software Engineering Student
Sydney, NSW, Australia
Sep, 2019.

Special thanks to the instructors:

Aaron Cox,
Yianni Moustakas,
Fede Lopez.

For all your help and patience 

Cheers.*/
},{}],"../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59266" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map