import Route from "@ioc:Adonis/Core/Route";

Route.group(function () {
  Route.resource("articels", "Articel/ArticelController").apiOnly();
}).middleware("auth");
