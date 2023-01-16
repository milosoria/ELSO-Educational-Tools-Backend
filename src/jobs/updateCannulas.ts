import cron from 'node-cron'

class CloseBidsScheduler {
    static async updateCannulas() {
        const bidsToClose = await Bid.findAll({
            where: {
                status: 'open',
                deadline: {
                    [Op.lt]: new Date(),
                },
            },
        })
        await Promise.all(
            bidsToClose.map((bid) => bid.update({ status: 'closed' }))
        )
    }

    static start() {
        cron.schedule('*/1 * * * *', async () => {
            await CloseBidsScheduler.closeBids()
        })
    }
}

module.exports = CloseBidsSche
