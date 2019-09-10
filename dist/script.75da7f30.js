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
var qA = 0;
var qB = 0;
var qC = 0;
var qD = 0;
var qE = 0;
var qF = 0;
var qG = 0;
var qH = 0;
var qI = 0;
var turnCounter = 1;
var scoreX = 0;
var scoreO = 0;
var lastWin = 0;
var roundCounter = 0;
var fieldCounter = 0;

function scoreCheck() {
  if (qA + qB + qC === 3 || qA + qD + qG === 3 || qA + qE + qI === 3 || qB + qE + qH === 3 || qC + qF + qI === 3 || qD + qE + qF === 3 || qG + qH + qI === 3 || qG + qE + qC === 3) {
    $("#XWins").slideDown();
    scoreX++;
    roundCounter++;
    turnCounter = 0; //Ends game

    lastWin = 1;
    $(".playAgain").fadeIn(1000);
    $("#bonesScore").text("".concat(scoreX));
  }

  if (qA + qB + qC === -3 || qA + qD + qG === -3 || qA + qE + qI === -3 || qB + qE + qH === -3 || qC + qF + qI === -3 || qD + qE + qF === -3 || qG + qH + qI === -3 || qG + qE + qC === -3) {
    $("#OWins").slideDown();
    scoreO++;
    roundCounter++;
    turnCounter = 0; //Ends game

    lastWin = -1;
    $(".playAgain").fadeIn(1000);
    $("#skullScore").text("".concat(scoreO));
  }

  if (fieldCounter == 9) {
    $("#winning").text("CAT'S GAME!").show(500);
    roundCounter++;
    turnCounter = 0; //Ends game

    $(".playAgain").fadeIn(1000);
  }

  if (scoreX == 2 || roundCounter == 3 && scoreX > scoreO) {
    $("#winning").text("TEAM BONES WINS!").show(500);
    turnCounter = 0; //Ends game

    $(".playAgain").hide();
  }

  if (scoreO == 2 || roundCounter == 3 && scoreX < scoreO) {
    $("#winning").text("TEAM SKULL WINS!").show(500);
    turnCounter = 0; //Ends game

    $(".playAgain").hide();
  }

  if (roundCounter == 3 && scoreX == scoreO) {
    $("#winning").text("OH NO! Is it a draw? Is it a tie? NAH... IT IS \"CAT'S GAME!\"").show(500);
    $(".playAgain").hide();
  }
}

function roundDisplay() {
  var round = roundCounter;

  if (round == 0) {
    $("#round").text('First Round').fadeIn();
  }

  if (round == 1) {
    $("#round").text("Second Round").fadeIn();
  }

  if (round == 2) {
    $("#round").text("Third Round").fadeIn();
  }
}

function turn() {
  if (turnCounter === -1) {
    $("#skullTurn").show(500);
    $("#bonesTurn").hide(500);
    $("#noTurn").hide(500);
  }

  if (turnCounter === 1) {
    $("#bonesTurn").show(500);
    $("#skullTurn").hide(500);
    $("#noTurn").hide(500);
  }

  if (turnCounter === 0) {
    $("#noTurn").show(500);
    $("#bonesTurn").hide(500);
    $("#skullTurn").hide(500);
  }
}

$(document).ready(function () {
  $("#XWins").hide();
  $("#OWins").hide();
  $("#skullTurn").hide();
  $("#bonesTurn").hide();
  $("#noTurn").hide();
  $(".playAgain").hide();
  turn();
  roundDisplay();
  $("#fieldA").click(function () {
    if ($("#fieldA").text() == "") {
      if (turnCounter === 1) {
        $("#fieldA").text('X').hide().slideDown(700);
        qA += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldA").text('O').hide().slideDown(700);
        qA -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldB").click(function () {
    if ($("#fieldB").text() == "") {
      if (turnCounter === 1) {
        $("#fieldB").text('X').hide().slideDown(700);
        qB += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldB").text('O').hide().slideDown(700);
        qB -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldC").click(function () {
    if ($("#fieldC").text() == "") {
      if (turnCounter === 1) {
        $("#fieldC").text('X').hide().slideDown(700);
        qC += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldC").text('O').hide().slideDown(700);
        qC -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldD").click(function () {
    if ($("#fieldD").text() == "") {
      if (turnCounter === 1) {
        $("#fieldD").text('X').hide().slideDown(700);
        qD += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldD").text('O').hide().slideDown(700);
        qD -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldE").click(function () {
    if ($("#fieldE").text() == "") {
      if (turnCounter === 1) {
        $("#fieldE").text('X').hide().slideDown(700);
        qE += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldE").text('O').hide().slideDown(700);
        qE -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldF").click(function () {
    if ($("#fieldF").text() == "") {
      if (turnCounter === 1) {
        $("#fieldF").text('X').hide().slideDown(700);
        qF += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldF").text('O').hide().slideDown(700);
        qF -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldG").click(function () {
    if ($("#fieldG").text() == "") {
      if (turnCounter === 1) {
        $("#fieldG").text('X').hide().slideDown(700);
        qG += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldG").text('O').hide().slideDown(700);
        qG -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldH").click(function () {
    if ($("#fieldH").text() == "") {
      if (turnCounter === 1) {
        $("#fieldH").text('X').hide().slideDown(700);
        qH += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldH").text('O').hide().slideDown(700);
        qH -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $("#fieldI").click(function () {
    if ($("#fieldI").text() == "") {
      if (turnCounter === 1) {
        $("#fieldI").text('X').hide().slideDown(700);
        qI += 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      } else if (turnCounter === -1) {
        $("#fieldI").text('O').hide().slideDown(700);
        qI -= 1;
        turnCounter = turnCounter * -1;
        fieldCounter++;
        scoreCheck();
      }
    }

    turn();
  });
  $(".playAgain").click(function () {
    $("#fieldA").text("");
    $("#fieldB").text('');
    $("#fieldC").text('');
    $("#fieldD").text('');
    $("#fieldE").text('');
    $("#fieldF").text('');
    $("#fieldG").text('');
    $("#fieldH").text('');
    $("#fieldI").text('');
    qA = 0;
    qB = 0;
    qC = 0;
    qD = 0;
    qE = 0;
    qE = 0;
    qF = 0;
    qG = 0;
    qH = 0;
    qI = 0;
    $("#XWins").slideUp();
    $("#OWins").slideUp();
    $(".playAgain").fadeOut(1000);
    $("#winning").fadeOut(1000);

    if (lastWin === 1) {
      turnCounter = -1;
    }

    if (lastWin === -1) {
      turnCounter = 1;
    }

    if (lastWin === 0) {
      turnCounter = -1;
    }

    lastWin = 0;
    fieldCounter = 0;
    turn();
    roundDisplay();
  });
  $(".restart").click(function () {
    $("#fieldA").text("");
    $("#fieldB").text('');
    $("#fieldC").text('');
    $("#fieldD").text('');
    $("#fieldE").text('');
    $("#fieldF").text('');
    $("#fieldG").text('');
    $("#fieldH").text('');
    $("#fieldI").text('');
    qA = 0;
    qB = 0;
    qC = 0;
    qD = 0;
    qE = 0;
    qE = 0;
    qF = 0;
    qG = 0;
    qH = 0;
    qI = 0;
    $("#XWins").slideUp();
    $("#OWins").slideUp();
    $(".playAgain").fadeOut(1000);
    $("#winning").fadeOut(1000);
    turnCounter = 1;
    scoreX = 0;
    scoreO = 0;
    lastWin = 0;
    fieldCounter = 0;
    roundCounter = 0;
    $("#bonesScore").text("".concat(scoreX));
    $("#skullScore").text("".concat(scoreX));
    turn();
    roundDisplay();
  });
});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49442" + '/');

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