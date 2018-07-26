import cloudinary from "cloudinary";

cloudinary.config({ 
  cloud_name: 'deekntpbm', 
  api_key: '933855846636449', 
  api_secret: '0DgTWBziE7529hegGn4bonejsJc' 
});

export default function upload(file,cb){
	cloudinary.uploader.upload(file, function(result) { 
	  return cb(result)
	});
}