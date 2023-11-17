import Route from "@ioc:Adonis/Core/Route";

Route.group(function () {
  Route.resource("categories", "Category/CategoryController").apiOnly();
}).middleware("auth");
