const { asClass } = require("awilix");

module.exports = {
  get_user_details_service: asClass(require("./get-user-details-service")).scoped(),
  patch_user_details_service: asClass(require("./patch-user-details-service")).scoped(),
  set_user_image_service: asClass(require("./set-user-image-service")).scoped(),
  remove_user_image_service: asClass(require("./remove-user-image-service")).scoped(),
};
