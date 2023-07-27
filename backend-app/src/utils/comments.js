// validateComment, validateScore

const validateComment = (comment) => {
    // size greater than 0
    if (comment.length > 0) {
        return true;
    }
    return false;
};

const validateScore = (score) => {
    // score is an integer
    if (score % 1 === 0) {
        // score is between 1 and 10
        if (score >= 1 && score <= 10) {
            return true;
        }
    }
    return false;
};

module.exports = { validateComment, validateScore };