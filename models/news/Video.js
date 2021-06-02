const Sequelize = require("sequelize");
const db = require("../../config/db");
const { User } = require('../User')
const Category = require("../Category")
const Media = require("../Media")
var slugify = require('slugify')

const Video = db.define("video", {
  id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  title: Sequelize.TEXT,
  slug : Sequelize.TEXT,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active',
  },
});

Video.beforeSave(async function (video) {
  try {
    const slug = slugify(video.title,{
            replacement: '-',
            remove: '?',     
          });;
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

//with media
Video.belongsTo(Media,{
  as : 'media',
  foreignKey: {
    name: 'videoId'
  }
  });
Video.belongsTo(Media,{
  as : 'thumbnail',
  foreignKey: {
    name: 'thumbnailId'
  }
  }
);
//with category
Video.belongsToMany(Category, { through: 'CategoryVideo' });
Category.belongsToMany(Video, { through: 'CategoryVideo' });

exports.Video = Video;
exports.Category = Category;