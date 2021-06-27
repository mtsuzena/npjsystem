const db = require("../models");
const Document = db.document;

exports.saveDocument = function (document) {
	return Document.create(document);
};

exports.updateDocument = function (document) {
    document.save();
};

exports.getDocument = function (id) {
    return Document.findByPk(id);
};