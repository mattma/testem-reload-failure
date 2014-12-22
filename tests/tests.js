define("rocksTest/resolver", ["exports", "ember/resolver"], function (exports, _emberResolver) {
  "use strict";

  var Resolver = _emberResolver["default"];


  var resolver = Resolver.create();

  resolver.namespace = {
    modulePrefix: "rocks"
  };

  exports["default"] = resolver;
});
define("rocksTest/start-app", ["exports", "ember", "rocks/app", "rocks/router"], function (exports, _ember, _rocksApp, _rocksRouter) {
  "use strict";

  var Ember = _ember["default"];
  var Application = _rocksApp["default"];
  var Router = _rocksRouter["default"];


  function startApp(attrs) {
    var App;

    var attributes = Ember.merge({
      rootElement: "#ember-testing",
      LOG_ACTIVE_GENERATION: false,
      LOG_VIEW_LOOKUPS: false,
      LOG_MODULE_RESOLVER: false,
      LOG_TRANSITIONS: false,
      LOG_TRANSITIONS_INTERNAL: false
    }, attrs);

    // It won't update the URL, Not leak the app state
    Router.reopen({
      location: "none"
    });

    Ember.run(function () {
      App = Application.create(attributes);
      App.setupForTesting();
      App.injectTestHelpers();
    });

    // this shouldn't be needed, i want to be able to "start an app at a specific URL"
    App.reset();

    return App;
  };

  exports["default"] = startApp;
});
define("rocksTest/test-helper", ["exports", "./resolver", "ember-mocha"], function (exports, _resolver, _emberMocha) {
  "use strict";

  var resolver = _resolver["default"];
  var setResolver = _emberMocha.setResolver;


  setResolver(resolver);

  document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

  $(document).ready(function () {
    // load up the application testing code
    // from `tests/integration` and `tests/unit`
    // by matching the `require.registry` definition
    require("ember-rocks/test-loader")["default"].load();

    mocha.run();
  });
});


define("rocksTest/home-test", ["exports", "ember", "rocksTest/start-app"], function (exports, _ember, _rocksTestStartApp) {
  "use strict";

  var Ember = _ember["default"];
  var startApp = _rocksTestStartApp["default"];


  describe("Integration Test", function () {
    var App;

    before(function () {
      App = startApp();
    });

    after(function () {
      Ember.run(App, App.destroy);
    });

    describe("Homepage", function () {
      it("should have a page title", function () {
        visit("/").then(function () {
          // failing test below
          // find("h2").text().should.equal("Home Page ");

          // passing tests below
          find("h2").text().should.equal(" Home Page ");
          find("h1 a").text().should.equal(" Ember Rocks ");
        });
      });
    });
  });
});
