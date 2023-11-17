import Route from "@ioc:Adonis/Core/Route";

Route.group(function () {
  Route.resource("coments", "Coment/ComentController").apiOnly();
}).middleware("auth");
