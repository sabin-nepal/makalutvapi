/*const Sequelize = require("sequelize");
const db = require("../config/db");

const Video = db.define("video", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  type: Sequelize.STRING,
});

Category.beforeSave(async function (category) {
  try {
    const slug = slugify(category.title);
    const count = await Category.count({
    		  where: {
    		    title: title,
    		  },
    		});
	if(!count)
		category.slug = slug;
	else{		
		const i = count + 1;
		category.slug = slug+'-'+i; 
	}
  } catch (e) {
    throw new Error();
  }
});
module.exports = Category;*/