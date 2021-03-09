const Bootcamp = require('../models/Bootcamp');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find();
		res.status(200).json({
			success: true,
			count: bootcamps.length,
			data: bootcamps,
			msg: 'Returned all bootcamp records',
		});
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};

// @desc      Get singe bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (!bootcamp) {
			return res.status(400).json({
				success: false,
				msg: `Could not find bootcamp with the id ${req.params.id}`,
			});
		}
		res.status(200).json({
			success: true,
			data: bootcamp,
			msg: `Found bootcamp: ${req.params.id}`,
		});
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};

// @desc      Get create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);
		res.status(201).json({
			success: true,
			data: bootcamp,
			msg: 'Bootcamp has been created!',
		});
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!bootcamp) {
			return res.status(400).json({
				success: false,
				msg: `Could not find bootcamp with the id ${req.params.id}`,
			});
		}

		res.status(200).json({
			success: true,
			data: bootcamp,
			msg: `Updated bootcamp ${req.params.id}`,
		});
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};

// @desc      Delete bootcamp
// @route     Delete /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

		if (!bootcamp) {
			return res.status(400).json({
				success: false,
				msg: `Could not find bootcamp with the id ${req.params.id}`,
			});
		}

		res.status(200).json({
			success: true,
			data: {},
			msg: `Deleted bootcamp ${req.params.id}`,
		});
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};
