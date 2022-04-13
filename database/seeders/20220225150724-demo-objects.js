module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Objects', [{
				campoObject: '',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		], {})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Objects', null, {})
	}
}
