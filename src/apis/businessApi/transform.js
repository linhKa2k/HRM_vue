import moment from 'moment'

export const transformBusiness = (data) => {
    if (!data) {
        return
    } else {
        const skip = data.skip
        const listData = data.listAccount.map((item, key) => {
            return {
                STT: key + 1 + skip,
                _id: item._id,
                userName: item.userName,
                createAt: moment(item.createdAt).format('L'),
                isActive: item.isActive,
                date: moment(item.date).format("YYYY-MM-DD"),
                passWord: item.passWord
            }
        })
        const totalPage = data.totalPage
        return {
            listData,
            skip,
            totalPage
        }
    }
}