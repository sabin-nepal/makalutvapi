const Sequelize = require("sequelize");
const db = require("../../config/db");
const { User } = require('../User')
const Category = require("../Category")
var slugify = require('slugify')

const Video = db.define("video", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.STRING,
  slug: Sequelize.STRING,
  video: Sequelize.STRING,
  thumbnail: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

Video.beforeSave(async function (video) {
  try {
    const slug = slugify(video.title);
    const count = await Video.count({
    		  where: {
    		    title: video.title,
    		  },
    		});
	if(!count)
		video.slug = slug;
	else{		
		const i = count + 1;
		video.slug = slug+'-'+i; 
	}
  } catch (e) {
    console.log(e)
    throw new Error();
  }
});
Video.belongsTo(User, {
  foreignKey: {
    type: Sequelize.UUID
  }
});
Video.belongsToMany(Category, { through: 'CategoryVideo' });
Category.belongsToMany(Video, { through: 'CategoryVideo' });
exports.Video = Video;
exports.Category = Category;