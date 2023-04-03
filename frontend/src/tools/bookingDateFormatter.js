const bookingDateFormatter = (dateStr) => {
    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date(dateStr)
    const formattedDate = date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return formattedDate;
}


module.exports = bookingDateFormatter
