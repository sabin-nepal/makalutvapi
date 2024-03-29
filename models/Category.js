const Sequelize = require("sequelize");
const db = require("../config/db");
var slugify = require('slugify')

const Category = db.define("category", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug: Sequelize.TEXT,
  type: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

Category.beforeSave(async function (category) {
  try {
    const slug = slugify(category.title,{
        replacement: '-',
        remove: '?',     
      });;
    const count = await Category.count({
    		  where: {
    		    title: category.title,
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
module.exports = Category;