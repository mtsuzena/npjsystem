const db = require("../models");
const Process = db.process;

exports.getProcesses = function () {
    return Process.findAll({
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist,
                include: [
                    {
                        model: db.process,
                        include: [
                            {
                                model: db.user
                            },
                            {
                                model: db.customer
                            },
                        ]
                    },
                    {
                        model: db.document
                    },
                    {
                        model: db.user,
                        attributes: ['id', 'name', 'lastName']
                    },
                ]
            },
            {
                model: db.processMovement,
                include: [
                    {
                        model: db.user,
                        attributes: ['name', 'imgSrc']
                    }
                ]
            },
            {
                model: db.audiencia,
                include: [
                    {
                        model: db.testemunhaAudiencia,
                    }
                ]
            }
        ]
    });
};

exports.getProcess = function (id) {
    return Process.findByPk(id, {
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist,
                include: [
                    {
                        model: db.process,
                        include: [
                            {
                                model: db.user
                            },
                            {
                                model: db.customer
                            },
                        ]
                    },
                    {
                        model: db.document
                    },
                    {
                        model: db.user,
                        attributes: ['id', 'name', 'lastName']
                    },
                ]
            },
            {
                model: db.processMovement,
                include: [
                    {
                        model: db.user,
                        attributes: ['name', 'imgSrc']
                    }
                ]
            },
            {
                model: db.audiencia,
                include: [
                    {
                        model: db.testemunhaAudiencia,
                    }
                ]
            }
        ]
    });
};

exports.getProcessesByUserId = function (userId) {
    return Process.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist,
                include: [
                    {
                        model: db.process,
                        include: [
                            {
                                model: db.user
                            },
                            {
                                model: db.customer
                            },
                        ]
                    },
                    {
                        model: db.document
                    },
                    {
                        model: db.user,
                        attributes: ['id', 'name', 'lastName']
                    },
                ]
            },
            {
                model: db.processMovement,
                include: [
                    {
                        model: db.user,
                        attributes: ['name', 'imgSrc']
                    }
                ]
            },
            {
                model: db.audiencia,
                include: [
                    {
                        model: db.testemunhaAudiencia,
                    }
                ]
            }
        ]
    });
};

exports.getProcessByProcessNumber = function (processNumber) {
    return Process.findOne({
        where: {
            number: processNumber
        },
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist,
                include: [
                    {
                        model: db.process,
                        include: [
                            {
                                model: db.user
                            },
                            {
                                model: db.customer
                            },
                        ]
                    },
                    {
                        model: db.document
                    },
                    {
                        model: db.user,
                        attributes: ['id', 'name', 'lastName']
                    },
                ]
            },
            {
                model: db.processMovement,
                include: [
                    {
                        model: db.user,
                        attributes: ['name', 'imgSrc']
                    }
                ]
            },
            {
                model: db.audiencia,
                include: [
                    {
                        model: db.testemunhaAudiencia,
                    }
                ]
            }
        ]
    });
};

exports.getProcessByNumber = function (number) {
    return Process.findOne({
        where: {
            number: number
        },
        include: [
            {
                model: db.user
            },
            {
                model: db.customer
            },
            {
                model: db.processType
            },
            {
                model: db.processChecklist,
                include: [
                    {
                        model: db.process,
                        include: [
                            {
                                model: db.user
                            },
                            {
                                model: db.customer
                            },
                        ]
                    },
                    {
                        model: db.document
                    },
                    {
                        model: db.user,
                        attributes: ['id', 'name', 'lastName']
                    },
                ]
            },
            {
                model: db.processMovement,
                include: [
                    {
                        model: db.user,
                        attributes: ['name', 'imgSrc']
                    }
                ]
            },
            {
                model: db.audiencia,
                include: [
                    {
                        model: db.testemunhaAudiencia,
                    }
                ]
            }
        ]
    });
};

exports.saveProcess = function (process) {
    return Process.create(process);
};

exports.deleteProcess = function (id) {
    return Process.destroy({
        where: {
            id: id
        }
    })
};

exports.updateProcess = function (process) {
    process.save();
};