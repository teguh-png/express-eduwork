const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

const index = (req, res) => {
    const {search} = req.query;
    if (search) {
        Product.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: `%${search}%`
                }
            }
        })
        .then((result) => {
            res.send({
                status: 'success',
                response: result
            });
        }).catch((error) => {
            res.send({
                status: 'failed',
                response: error
            })
        });
    } else {
        Product.findAll()
        .then((result) => {
            res.send({
                status: 'success',
                response: result
            });
        }).catch((error) => {
            res.send({
                status: 'failed',
                response: error
            })
        });
    };
};

const view = (req, res) => {
    Product.findByPk(req.params.id)
    .then(result => {
        res.send({
            status: 'success',
            response: result
        });
    }).catch((error) => {
        res.send({
            status: 'failed',
            response: error
        })
    });
};

const store = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file; 
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({
            users_id: parseInt(users_id),
            name: name,
            price: price,
            stock: stock,
            status: status,
            image_url: `http://localhost:3000/public/${image.originalname}`
        })
        .then(result => {
            res.send({
                status: 'success',
                response: result
            });
        }).catch((error) => {
            res.send({
                status: 'failed',
                response: error
            })
        });
    }
}

const update = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let values = {
        users_id: parseInt(users_id),
        name: name,
        price: price,
        stock: stock,
        status: status
    };
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        values.image_url = `http://localhost:3000/public/${image.originalname}`;
    }
    Product.update(values, {
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.send({
            status: 'success',
            response: result
        });
    }).catch((error) => {
        res.send({
            status: 'failed',
            response: error
        })
    });
}

const destroy = (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.send({
            status: 'success',
            response: result
        });
    }).catch((error) => {
        res.send({
            status: 'failed',
            response: error
        })
    });
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}