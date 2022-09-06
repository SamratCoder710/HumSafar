const express = require('express');
const router = express.Router();
const wrapAync = require('../utils/wrapAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const {storage} = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({storage});

router.route('/')
    .get(wrapAync(campgrounds.index))
    .post(isLoggedIn,upload.array('image') , validateCampground,wrapAync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAync(campgrounds.renderEditForm));

router.route('/:id')
    .get( wrapAync(campgrounds.showCampground))
    .put( isLoggedIn, isAuthor,upload.array('image'), validateCampground, wrapAync(campgrounds.updateCampground))
    .delete( isLoggedIn, isAuthor, wrapAync(campgrounds.deleteCampground));


module.exports = router;