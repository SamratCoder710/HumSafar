const Campground = require('../models/campground');
const {cloudinary} = require('../cloudinary');
module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {  
    res.render('campgrounds/new.ejs');
};

module.exports.showCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if (!campground) {
        throw new AppError('Campground Not found', 404);
    }
    res.render('campgrounds/show.ejs', { campground });
};

module.exports.createCampground = async (req, res, next) => {
    const camp = new Campground(req.body.campgrounds);
    camp.images = req.files.map(f => ({url:f.path , filename:f.filename }));
    camp.author = req.user._id;
    await camp.save();
    req.flash('success','Successfully made a new Campground!!!');
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if(!camp){
        req.flash('error','Cannot find that Camground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit.ejs', { camp });
};

module.exports.updateCampground = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campgrounds });
    const imgs = req.files.map(f => ({url:f.path , filename:f.filename }));
    camp.images.push(...imgs);
    await camp.save();
    if(req.body.deleteImages){
    for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename);
    }
    await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success','Successfully Updated Campground!')
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted campground');
    res.redirect(`/campgrounds`);
};
