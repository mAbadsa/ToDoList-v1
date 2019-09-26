

exports.getDate = function () {

    const toDay = new Date();

    const option = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    return toDay.toLocaleDateString('en-US', option);
}