export default {
    truncate: function (str, length) {
        length = length || 80

        if (length < str.length) {
            let rawTruncatedStr = str.substr(0, length)
            let whitespaceIndex = str.lastIndexOf(' ')

            if (whitespaceIndex > -1) {
                rawTruncatedStr = rawTruncatedStr.substr(0, rawTruncatedStr.lastIndexOf(' '))
            }
            return rawTruncatedStr + '...'
        } else {
            return str
        }
    }
}
