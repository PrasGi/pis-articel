import Route from "@ioc:Adonis/Core/Route";

Route.group(function () {
  Route.delete("/", "User/UsersController.destroyAll").as("users.destroyAll");
}).prefix("users");
Route.resource("users", "User/UsersController").apiOnly();
