'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Plates', [{
      sellerid: 1,
      name: 'Panino fritto wurstel patatine',
      details: 'Sandwich frito de vienesas y papas fritas',
      price: 1990,
      has_img: true,
      img_url: 'https://assets.eldesconcierto.cl/2018/06/FireShot-Capture-397-Dgxv0uHWAAAl5fa.jpg__-https___pbs.twimg_.com_media_Dgxv0uHWAAAl5fa.jpg_large.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {sellerid: 2,
      name: 'Hamburguesa vegetariana',
      details: 'Hamburguesa de soja y quinoa',
      price: 4500,
      has_img: true,
      img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMrmI8VkA36eeL_uM3enembKRFnym9zKvDIUfUu9AjfKR2jPCoE9FXkYhcYUSZ7LImu_o&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {sellerid: 2,
      name: 'Hamburguesa BBQ',
      details: 'Hamburguesa de carne con salsa BBQ y queso',
      price: 4750,
      has_img: true,
      img_url: 'https://chefeel.com/chefgeneralfiles/2021/07/front-view-burger-on-stand-scaled.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Plates', null, {});
  }
};